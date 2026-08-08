"""Importa o notebook fornecido e produz o banco estático usado pelo site.

Uso local:
    python scripts/import-assessments.py "C:/caminho/PROVA_ITAU_2.ipynb"

O JSON resultante é versionado; o notebook original não é necessário no deploy.
"""

from __future__ import annotations

import ast
import json
import re
import sys
from pathlib import Path


TOPICS = {
    **dict.fromkeys(range(1, 8), "Estatística básica"),
    **dict.fromkeys(range(8, 10), "Banco de dados e SQL"),
    **dict.fromkeys(range(10, 19), "Regressão"),
    **dict.fromkeys(range(19, 27), "Agrupamento"),
    **dict.fromkeys(range(27, 38), "Classificação e avaliação"),
}

WEEKS = {
    1: 2, 2: 2, 3: 2, 4: 2, 5: 1, 6: 1, 7: 1,
    8: 21, 9: 21, 10: 7, 11: 4, 12: 11, 13: 13, 14: 10,
    15: 10, 16: 10, 17: 15, 18: 15, 19: 17, 20: 19, 21: 19,
    22: 17, 23: 19, 24: 17, 25: 17, 26: 19, 27: 7, 28: 7,
    29: 7, 30: 14, 31: 14, 32: 22, 33: 22, 34: 16, 35: 6,
    36: 16, 37: 14,
}

DATASETS = {
    12: "/datasets/classificacao_Q2.csv",
    16: "/datasets/regressao_Q1.csv",
    17: "/datasets/regressao_Q2.csv",
    26: "/datasets/agrupamento.csv",
    31: "/datasets/classificacao_Q1.csv",
}


def extract_structured(cells: list[dict]) -> list[dict]:
    for cell in cells:
        if cell.get("cell_type") != "code":
            continue
        source = "".join(cell.get("source", []))
        if "questoes = [" not in source:
            continue
        tree = ast.parse(source)
        for node in tree.body:
            if isinstance(node, ast.Assign) and any(
                isinstance(target, ast.Name) and target.id == "questoes"
                for target in node.targets
            ):
                return ast.literal_eval(node.value)
    raise RuntimeError("Lista 'questoes' não encontrada no notebook.")


def clean_markdown(value: str) -> str:
    value = re.sub(r"```[\s\S]*?```", " ", value)
    value = re.sub(r"!\[[^\]]*\]\([^)]*\)", " ", value)
    value = re.sub(r"\[(.*?)\]\([^)]*\)", r"\1", value)
    value = value.replace("**", "").replace("___", " ").replace("---", " ")
    value = re.sub(r"^#+\s*", "", value, flags=re.MULTILINE)
    value = re.sub(r"^\s*[*-]\s+", "• ", value, flags=re.MULTILINE)
    value = re.sub(r"\n{3,}", "\n\n", value)
    return value.strip()


def extract_rationales(cells: list[dict]) -> dict[int, str]:
    result: dict[int, str] = {}
    for cell in cells:
        if cell.get("cell_type") != "markdown":
            continue
        source = "".join(cell.get("source", []))
        match = re.search(r"###\s*Questão\s+(\d+)", source, re.IGNORECASE)
        if not match:
            continue
        number = int(match.group(1))
        rationale = re.search(
            r"\*\*Racional[^:]*:\*\*\s*([\s\S]+)$", source, re.IGNORECASE
        )
        text = clean_markdown(rationale.group(1) if rationale else source)
        result[number] = text[:5000]
    return result


def answer_letter(options: list[str], correct: str) -> int:
    normalized = lambda value: re.sub(r"\s+", " ", str(value).strip().lower())
    wanted = normalized(correct)
    for index, option in enumerate(options):
        candidate = normalized(option)
        if candidate == wanted or wanted in candidate or candidate in wanted:
            return index
    raise ValueError(f"Resposta não encontrada nas alternativas: {correct!r}")


PDF_EXTRAS = [
    {
        "question": "Uma variável numérica tem forte assimetria à direita e valores extremos. Qual resumo central é mais robusto?",
        "options": ["Média", "Mediana", "Variância", "Amplitude"],
        "correctIndex": 1,
        "topic": "Estatística básica",
        "week": 1,
        "rationale": "A mediana depende da posição dos dados e sofre muito menos influência de extremos do que a média. No banco, isso é útil para renda, saldo e valor transacionado, que frequentemente têm cauda longa. A escolha não elimina a necessidade de mostrar dispersão e percentis.",
    },
    {
        "question": "Em uma árvore, aumentar muito a profundidade tende a produzir qual efeito?",
        "options": ["Aumentar viés e reduzir variância", "Reduzir viés e aumentar variância", "Eliminar overfitting", "Não alterar generalização"],
        "correctIndex": 1,
        "topic": "Classificação e avaliação",
        "week": 14,
        "rationale": "Uma árvore mais profunda representa padrões complexos e reduz o erro de treino, mas fica mais sensível à amostra. Isso costuma reduzir viés e aumentar variância. Profundidade deve ser escolhida com validação, poda e restrições de folha.",
    },
    {
        "question": "Um classificador acerta quase todos os negativos, mas encontra poucos positivos. Qual métrica evidencia diretamente essa falha?",
        "options": ["Recall", "Especificidade", "Acurácia", "R²"],
        "correctIndex": 0,
        "topic": "Classificação e avaliação",
        "week": 7,
        "rationale": "Recall mede a proporção dos positivos reais capturados. Em fraude ou inadimplência rara, acurácia pode permanecer alta mesmo com recall muito baixo. O ponto de corte deve equilibrar cobertura, precisão, custo e capacidade operacional.",
    },
    {
        "question": "Qual validação melhor representa um modelo que será aplicado em safras futuras?",
        "options": ["Split aleatório sem data", "Leave-one-out", "Out-of-time", "Treinar e testar na mesma base"],
        "correctIndex": 2,
        "topic": "Classificação e avaliação",
        "week": 6,
        "rationale": "Out-of-time treina no passado e avalia no futuro, aproximando a produção e expondo drift. Ainda pode ser combinado com validação interna para hiperparâmetros. A data de corte, maturação do alvo e disponibilidade de atributos devem ser documentadas.",
    },
    {
        "question": "Ao padronizar variáveis para Ridge, em que conjunto o scaler deve ser ajustado?",
        "options": ["Em toda a base", "Somente no teste", "Somente no treino de cada split/fold", "Depois de medir o teste"],
        "correctIndex": 2,
        "topic": "Regressão",
        "week": 10,
        "rationale": "Média e desvio são parâmetros aprendidos. Ajustá-los com teste ou validação deixa informação externa entrar no treino. Pipeline e validação cruzada garantem que o scaler seja recalculado dentro de cada fold.",
    },
    {
        "question": "Por que k-medoids costuma ser mais robusto a outliers do que k-means?",
        "options": ["Usa a média global", "Usa objetos reais como centros", "Ignora distância", "Sempre remove extremos"],
        "correctIndex": 1,
        "topic": "Agrupamento",
        "week": 17,
        "rationale": "O medoid é uma observação representativa e não é puxado livremente por um extremo como a média. Isso melhora robustez, embora tenha custo computacional maior. Outliers ainda devem ser investigados e podem representar um segmento legítimo.",
    },
    {
        "question": "Em um LEFT JOIN de clientes com transações, o que deve ser checado antes de agregar?",
        "options": ["Somente a ordenação", "A cardinalidade das chaves e possível multiplicação de linhas", "A cor do dashboard", "A normalidade do alvo"],
        "correctIndex": 1,
        "topic": "Banco de dados e SQL",
        "week": 21,
        "rationale": "Chaves não únicas podem criar junção N:M e inflar somas silenciosamente. Antes e depois do join, reconcilie linhas, clientes, chaves duplicadas, valores e cobertura. A granularidade esperada precisa estar escrita.",
    },
    {
        "question": "Um Gini de 0,50 equivale aproximadamente a qual AUC?",
        "options": ["0,50", "0,60", "0,75", "1,00"],
        "correctIndex": 2,
        "topic": "Classificação e avaliação",
        "week": 7,
        "rationale": "Na convenção usual, Gini = 2×AUC−1. Portanto AUC=(0,50+1)/2=0,75. Gini 50% não é aleatório; o aleatório tem AUC 50% e Gini 0%.",
    },
    {
        "question": "Qual situação caracteriza data leakage?",
        "options": ["Imputar dentro do pipeline", "Calcular a média antes de separar treino e teste", "Usar baseline", "Manter teste intocado"],
        "correctIndex": 1,
        "topic": "Classificação e avaliação",
        "week": 6,
        "rationale": "A média calculada na base completa carrega informação da validação/teste para o treino. O efeito pode parecer pequeno, mas invalida a independência da avaliação. Imputação, encoding, seleção e reamostragem pertencem ao pipeline de treino.",
    },
    {
        "question": "Depois do deploy, o score mantém AUC, mas as probabilidades previstas ficam sistematicamente baixas. O que degradou?",
        "options": ["Somente o ranking", "A calibração", "A sintaxe SQL", "O número de clusters"],
        "correctIndex": 1,
        "topic": "Classificação e avaliação",
        "week": 16,
        "rationale": "AUC mede ordenação e pode permanecer estável enquanto as probabilidades deixam de representar frequências observadas. Verifique curva de calibração, Brier/log loss e taxa de evento por faixa; recalibração pode ser suficiente se ranking e dados estiverem íntegros.",
    },
]


def build() -> dict:
    if len(sys.argv) != 2:
        raise SystemExit("Informe o caminho de PROVA_ITAU_2.ipynb.")
    notebook_path = Path(sys.argv[1])
    notebook = json.loads(notebook_path.read_text(encoding="utf-8"))
    cells = notebook["cells"]
    structured = extract_structured(cells)
    rationales = extract_rationales(cells)

    prova2 = []
    for number, item in enumerate(structured, 1):
        question = re.sub(r"^\d+\.\s*", "", item["pergunta"]).strip()
        options = [str(option).strip() for option in item["opcoes"]]
        prova2.append({
            "id": f"p2-{number:02d}",
            "sourceQuestion": number,
            "question": question,
            "options": options,
            "correctIndex": answer_letter(options, item["correta"]),
            "topic": TOPICS[number],
            "week": WEEKS[number],
            "rationale": rationales.get(number, f"A alternativa correta é {item['correta']}."),
            "dataset": DATASETS.get(number),
        })

    # O PDF é composto por screenshots. A versão web preserva os conceitos,
    # reorganiza os 37 itens coincidentes e acrescenta 10 itens visíveis no PDF.
    pdf_order = [5, 37, 10, 1, 2, 3, 4, 6, 7, 8, 9, 35, 11, 14, 15, 13, 16,
                 17, 18, 27, 28, 29, 30, 31, 34, 36, 12, 19, 20, 21, 22, 23,
                 24, 25, 26, 32, 33]
    prova1 = []
    for target_number, original_number in enumerate(pdf_order, 1):
        original = prova2[original_number - 1]
        prova1.append({
            **original,
            "id": f"p1-{target_number:02d}",
            "sourceQuestion": target_number,
            "rationale": f"Leitura orientada do item: {original['rationale']}",
        })
    for extra in PDF_EXTRAS:
        number = len(prova1) + 1
        prova1.append({
            "id": f"p1-{number:02d}",
            "sourceQuestion": number,
            "dataset": None,
            **extra,
        })

    return {
        "version": "2026-08-08",
        "assessments": [
            {
                "id": "prova-itau-1",
                "title": "Prova Itaú 1",
                "subtitle": "47 questões reconstruídas do PDF visual",
                "source": "PROVA_ITAU_1.pdf",
                "sourceFormat": "PDF com capturas de tela",
                "originNote": "Os conceitos e gabaritos foram preservados; a redação foi normalizada para leitura, acessibilidade e estudo no navegador.",
                "questions": prova1,
            },
            {
                "id": "prova-itau-2",
                "title": "Prova Itaú 2",
                "subtitle": "37 questões importadas do notebook",
                "source": "PROVA_ITAU_2.ipynb",
                "sourceFormat": "Jupyter Notebook",
                "originNote": "Alternativas, gabaritos e explicações analíticas foram convertidos em um simulado interativo.",
                "questions": prova2,
            },
        ],
    }


if __name__ == "__main__":
    output = Path(__file__).resolve().parents[1] / "data" / "assessments.json"
    output.write_text(json.dumps(build(), ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Gerado: {output}")

