import { writeFile } from "node:fs/promises";
import { officialBlocks, weekSpecs } from "./roadmap-source.mjs";

const idPrefix = {
  "PROGRAMAÇÃO": "prog",
  "ESTATÍSTICA BÁSICA": "estat",
  "ÁLGEBRA": "alg",
  "AVALIAÇÃO DE MODELOS": "aval",
  "DATA PREP": "prep",
  "BANCO DE DADOS": "sql",
  "CLASSIFICAÇÃO": "class",
  "REGRESSÃO": "regr",
  "AGRUPAMENTO": "cluster",
  "IA GENERATIVA": "genai",
  "PESQUISA OPERACIONAL": "po",
  "PROGRAMAÇÃO INTEIRA": "pi",
  "MIP (MIXED INTEGER PROGRAM)": "mip",
};

const syllabus = officialBlocks.flatMap((block) => block.items.map(([text, week], index) => ({
  id: `${idPrefix[block.title]}-${String(index + 1).padStart(2, "0")}`,
  text,
  block: block.title,
  week,
  contentLevel: "essential",
})));

const practiceCodeByWeek = {
  1: ["python", "Resumo robusto de uma carteira", `import pandas as pd

saldos = pd.Series([100, 120, 150, 180, 5000])
print(saldos.agg(["mean", "median", "std"]))
print(saldos.quantile([.25, .75, .90]))`],
  2: ["python", "Probabilidade e simulação", `import numpy as np

rng = np.random.default_rng(42)
defaults = rng.binomial(n=100, p=0.04, size=10_000)
print(defaults.mean(), np.quantile(defaults, [.90, .95]))`],
  3: ["python", "Teste com efeito e intervalo", `from scipy.stats import ttest_ind

controle = [10, 11, 9, 12, 10]
tratamento = [12, 13, 11, 14, 12]
teste = ttest_ind(tratamento, controle, equal_var=False)
print(teste.statistic, teste.pvalue)`],
  4: ["python", "Escala e distância", `from sklearn.preprocessing import StandardScaler
from sklearn.metrics import pairwise_distances

Xz = StandardScaler().fit_transform(X)
distancias = pairwise_distances(Xz, metric="euclidean")`],
  5: ["python", "Preprocessing sem leakage", `from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline

numeric = Pipeline([("missing", SimpleImputer(strategy="median"))])
prep = ColumnTransformer([("num", numeric, colunas_numericas)])`],
  6: ["python", "PCA dentro do pipeline", `from sklearn.decomposition import PCA
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

pipe = Pipeline([("scale", StandardScaler()), ("pca", PCA(n_components=.90))])
X_reduzido = pipe.fit_transform(X_treino)`],
  7: ["python", "Leitura e validação simples", `import pandas as pd

df = pd.read_csv("dados.csv")
assert df["cliente_id"].notna().all()
assert df["cliente_id"].is_unique
print(df.dtypes, df.shape)`],
  8: ["sql", "Mart cliente-mês", `SELECT
  cliente_id,
  DATE_TRUNC('month', data_transacao) AS mes,
  COUNT(*) AS qtd_transacoes,
  SUM(valor) AS valor_total
FROM transacoes
GROUP BY cliente_id, DATE_TRUNC('month', data_transacao);`],
  9: ["python", "Regressão e interpretação do erro", `from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, root_mean_squared_error, r2_score

modelo = LinearRegression().fit(X_treino, y_treino)
pred = modelo.predict(X_teste)
print(mean_absolute_error(y_teste, pred), root_mean_squared_error(y_teste, pred), r2_score(y_teste, pred))`],
  10: ["python", "Champion/challenger de regressão", `from sklearn.model_selection import cross_validate
from sklearn.linear_model import Ridge

resultado = cross_validate(Ridge(alpha=1.0), X, y, cv=5,
                            scoring=["neg_mean_absolute_error", "r2"])
print(resultado["test_r2"].mean())`],
  11: ["python", "Classificação com threshold", `proba = modelo.predict_proba(X_teste)[:, 1]
threshold = 0.30
pred = (proba >= threshold).astype(int)
print("threshold", threshold, "alertas", pred.sum())`],
  12: ["python", "KNN com escala", `from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

modelo = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=7))
modelo.fit(X_treino, y_treino)`],
  13: ["python", "Árvore e Random Forest", `from sklearn.ensemble import RandomForestClassifier

modelo = RandomForestClassifier(n_estimators=300, max_depth=6,
                               class_weight="balanced", random_state=42)
modelo.fit(X_treino, y_treino)`],
  14: ["python", "Rede pequena com early stopping", `from sklearn.neural_network import MLPClassifier

modelo = MLPClassifier(hidden_layer_sizes=(32, 16), early_stopping=True,
                      random_state=42, max_iter=300)
modelo.fit(X_treino_escalado, y_treino)`],
  15: ["python", "K-means e silhouette", `from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

rotulos = KMeans(n_clusters=4, n_init=20, random_state=42).fit_predict(Xz)
print(silhouette_score(Xz, rotulos))`],
  16: ["python", "DBSCAN e ruído", `from sklearn.cluster import DBSCAN

rotulos = DBSCAN(eps=.6, min_samples=8).fit_predict(Xz)
print("ruído", (rotulos == -1).mean())`],
  17: ["python", "Similaridade entre textos", `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

X_texto = TfidfVectorizer().fit_transform(textos)
print(cosine_similarity(X_texto[0], X_texto[1:]).ravel())`],
  18: ["python", "Avaliação simples de retrieval", `recuperados = {"doc_2", "doc_7", "doc_9"}
relevantes = {"doc_2", "doc_9"}
recall_k = len(recuperados & relevantes) / len(relevantes)
print("Recall@k", recall_k)`],
  19: ["python", "Otimização com OR-Tools", `from ortools.linear_solver import pywraplp

solver = pywraplp.Solver.CreateSolver("SCIP")
x = solver.BoolVar("selecionar_cliente")
solver.Maximize(120 * x)
solver.Add(80 * x <= 100)
solver.Solve()`],
  20: ["python", "Série temporal sem embaralhar", `df = df.sort_values("data")
df["lag_1"] = df["volume"].shift(1)
treino = df[df["data"] < "2026-01-01"]
teste = df[df["data"] >= "2026-01-01"]`],
  21: ["python", "Combinação transparente de scores", `score_final = 0.6 * score_texto + 0.25 * score_imagem + 0.15 * score_fala
revisao_humana = score_final.between(0.40, 0.60)`],
  22: ["python", "Checklist reproduzível do capstone", `checks = {
    "schema_ok": validar_schema(df),
    "sem_leakage": validar_janelas(df),
    "baseline_comparado": metrica_modelo > metrica_baseline,
}
assert all(checks.values()), checks`],
};

const evaluationFor = (spec) => spec.evaluationFocus.length ? spec.evaluationFocus : [
  "Verificar qualidade dos dados, interpretar a saída, comparar um baseline e explicar limitações no contexto bancário.",
];

function buildStudyPrompt(spec, officialTopics) {
  const topics = officialTopics.length ? officialTopics : spec.content;
  const evaluationFocus = evaluationFor(spec);
  return `Você é um professor de Ciência de Dados especializado em ensinar iniciantes.

Estou estudando para uma vaga e uma prova de Cientista de Dados Júnior.

SEMANA ${spec.number}: ${spec.title}

Nesta semana preciso dominar:
${topics.map((topic, index) => `${index + 1}. ${topic}`).join("\n")}

OBJETIVO DA SEMANA: ${spec.summary}

Meu objetivo não é estudar matemática acadêmica pesada. Quero terminar o material conseguindo:
- explicar cada conceito com minhas palavras;
- entender por que ele existe;
- reconhecer quando é usado e quando não usar;
- interpretar resultados sem tirar conclusões indevidas;
- aplicar um exemplo simples em Python ou SQL;
- explicar um caso bancário;
- responder perguntas de sabatina e uma prova prática Júnior.

Crie uma apostila completa e didática, assumindo que começo sem conhecimento prévio. Para CADA conceito, siga obrigatoriamente:
1. O que é?
2. Intuição simples.
3. Por que existe?
4. Quando é usado em Ciência de Dados?
5. Exemplo prático bancário.
6. Como interpretar o resultado, gráfico ou métrica.
7. Quando usar.
8. Quando não usar.
9. Limitações e premissas.
10. Exemplo simples.
11. Implementação curta em Python ou SQL, quando aplicável.
12. Matemática essencial: fórmula, símbolos, parâmetros e interpretação da saída.
13. Erros comuns, principalmente de interpretação.
14. Relação com os outros conceitos da semana.
15. Perguntas de sabatina no estilo de uma entrevista real.
16. Respostas comentadas.

Use linguagem progressiva: INTUIÇÃO PRIMEIRO → TÉCNICA DEPOIS. Não use um termo técnico antes de explicá-lo. Coloque demonstrações, derivações e detalhes acadêmicos somente em uma seção recolhida chamada “Aprofundamento opcional — não necessário para concluir esta semana”.

Para modelos de Machine Learning, cubra também: tipo de problema; premissas; preprocessing; escala; categóricas; missings; outliers; desbalanceamento; hiperparâmetros e o que controlam; função de custo; métricas; validação; overfitting; underfitting; vantagens; desvantagens; alternativas; monitoramento em produção; e um exemplo pequeno em sklearn.

Inclua no final:
- resumo da semana e mapa mental;
- tabela “quando usar cada técnica”;
- exemplos bancários;
- checklist de domínio;
- 15 a 20 perguntas de sabatina com respostas completas;
- 5 exercícios práticos com gabarito;
- mini laboratório em Python ou SQL;
- conexão com o projeto “${spec.project[1]}”.

CONTEÚDOS ESSENCIAIS: ${spec.content.join("; ")}.
MATEMÁTICA DE APOIO: ${spec.formula}. Explique-a somente depois da intuição.
APLICAÇÃO BANCÁRIA: ${spec.bankApplication}
COMO VALIDAR: ${evaluationFocus.join("; ")}

MATERIAIS DE APOIO:
${[...spec.resources.books, ...spec.resources.videos, ...spec.resources.articles].map((item) => `- ${item}`).join("\n")}

Use os materiais como referência, mas não presuma que um material isolado contém tudo. Não invente fontes. Ao final, confirme onde cada item da semana foi coberto.`;
}

function buildPedagogy(spec, officialItems) {
  const essential = officialItems.length ? officialItems.map((item) => item.text) : spec.content.slice(0, 3);
  return {
    learningSections: (officialItems.length ? officialItems : spec.content.map((text, index) => ({ id: `week-${spec.number}-${index + 1}`, text }))).map((item, index) => ({
      id: item.id,
      officialItemId: officialItems.length ? item.id : null,
      title: item.text,
      contentLevel: index < essential.length ? "essential" : "important",
    })),
    levels: [
      { contentLevel: "essential", label: "ESSENCIAL PARA A PROVA", items: essential },
      { contentLevel: "important", label: "IMPORTANTE NA PRÁTICA", items: [spec.bankApplication, ...spec.evaluationFocus] },
      { contentLevel: "good_to_know", label: "BOM SABER", items: spec.content.filter((item) => !essential.includes(item)).slice(0, 3) },
      { contentLevel: "optional", label: "APROFUNDAMENTO OPCIONAL", items: [`Formalização de apoio: ${spec.formula}`, spec.mathExplanation] },
    ],
    completionCriteria: [
      "Todos os itens essenciais estudados e marcados como verdes",
      "Pelo menos 80% das perguntas essenciais respondidas com confiança",
      "Exercícios principais executados",
      "Parte mínima do projeto concluída",
      "Consigo dizer quando usar e quando não usar",
      "Consigo interpretar um resultado e dar um exemplo bancário",
    ],
  };
}

function buildPractice(spec) {
  const [language, title, code] = practiceCodeByWeek[spec.number];
  return {
    exercises: [
      `Explique com suas palavras: ${spec.content[0]}.`,
      `Dê um exemplo bancário e um contraexemplo para ${spec.content[1]}.`,
      `Execute o mini laboratório e interprete cada saída, sem apenas copiar o código.`,
      `Identifique um erro ou limitação em: ${spec.pitfalls[0]}.`,
      `Resolva uma questão prática escolhendo método, métrica e validação para: ${spec.cases[0]}.`,
    ],
    codeExamples: [{ language, title, code }],
    tasks: ["Executar o exemplo curto", "Alterar um parâmetro e comparar", "Registrar interpretação em uma nota", "Responder cinco perguntas sem consulta"],
    examPractice: `Em até 45 minutos, resolva um caso sobre “${spec.title}”, mostre o raciocínio, produza uma saída verificável e escreva uma recomendação de cinco linhas.`,
    notebook: `notebooks/semana-${String(spec.number).padStart(2, "0")}-pratica.ipynb`,
  };
}

function buildSabatinaPrompt(spec, officialTopics) {
  const evaluationFocus = evaluationFor(spec);
  return `Atue como entrevistador técnico de um grande banco para uma vaga de Cientista de Dados I. Simule uma sabatina aplicada sobre a Semana ${spec.number} — ${spec.title} e estes itens oficiais: ${officialTopics.join("; ")}.

AVALIAÇÃO TRANSVERSAL OBRIGATÓRIA: ${evaluationFocus.join("; ")}.

REGRAS DA SIMULAÇÃO:
- faça somente UMA pergunta por vez e espere minha resposta;
- use principalmente casos de crédito, fraude, cobrança, propensão, risco e operações;
- siga o estilo de uma prova real: pergunte o que é, para que serve, como funciona, quando usar, quando não usar, qual pré-processamento fazer e como validar;
- alterne comparação entre métodos, sequência de pipeline, métricas, desbalanceamento, validação, manutenção e decisão de negócio quando forem pertinentes;
- não cobre demonstrações matemáticas longas; cobre intuição correta e capacidade de tomar uma decisão;
- depois de cada resposta, dê nota de 0 a 10 em: precisão técnica, clareza, critério de escolha e aplicação bancária;
- aponte erros factuais, omissões e jargões sem explicação;
- faça até duas perguntas de aprofundamento quando minha resposta estiver vaga;
- mostre uma resposta técnica ideal, curta e completa, somente depois da minha tentativa;
- registre minhas lacunas e, a cada cinco perguntas, gere um plano de revisão;
- considere completa apenas uma resposta que cubra conceito, finalidade, quando usar, limite e um exemplo no banco;
- não aceite uma métrica ou algoritmo sem eu justificar custo do erro, leakage, segmento, estabilidade e produção.

Comece diretamente com uma pergunta fundamental, espere minha resposta e não antecipe as próximas.`;
}

function buildSabatina(spec) {
  const [first, second, third, fourth, fifth] = spec.content;
  const [caseOne, caseTwo, caseThree] = spec.cases;
  const officialText = syllabus.filter((item) => item.week === spec.number).map((item) => item.text).join("; ") || spec.content.join("; ");
  const evaluationFocus = evaluationFor(spec);
  return [
    {
      question: `O que é “${spec.title}”, para que serve e quais itens oficiais ele cobre?`,
      answer: `${spec.foundation} Na prática, é necessário conectar a definição a um problema que a abordagem resolve. Nesta semana, os itens são: ${officialText}.`,
    },
    {
      question: `Como ${first.toLocaleLowerCase("pt-BR")} funciona na prática e qual resultado entrega?`,
      answer: `${spec.mechanism} Uma boa resposta deixa claras a unidade de análise, as entradas, a transformação feita e como a saída será interpretada.`,
    },
    {
      question: `Quando ${second.toLocaleLowerCase("pt-BR")} é uma boa escolha e quando você evitaria essa abordagem?`,
      answer: `A escolha deve partir do tipo de problema, dos dados disponíveis, das hipóteses e do custo de errar. ${spec.mechanism} Eu evitaria a abordagem quando suas hipóteses ou limitações fossem incompatíveis com o caso e compararia uma alternativa com validação adequada.`,
    },
    {
      question: `Dê um exemplo de aplicação de ${second.toLocaleLowerCase("pt-BR")} no banco e explique qual decisão melhoraria.`,
      answer: `${spec.bankApplication} A resposta deve nomear população, dado de entrada, saída, ação tomada, custo do erro e valor de negócio — não apenas citar “crédito” ou “fraude”.`,
    },
    {
      question: `Cenário: ${caseOne} Qual seria a ordem correta do seu pipeline, da definição do problema até a avaliação?`,
      answer: `Eu definiria decisão, população, unidade de análise, janelas e custo do erro; separaria treino e avaliação antes de aprender transformações; aplicaria ${third}; compararia um baseline; validaria a métrica e os segmentos; e só então recomendaria uma ação. ${spec.bankApplication}`,
    },
    {
      question: `Compare ${third.toLocaleLowerCase("pt-BR")} com ${fourth.toLocaleLowerCase("pt-BR")}. Quando escolheria cada abordagem?`,
      answer: `Eu compararia objetivo, hipótese, escala, robustez, interpretabilidade, volume de dados e custo operacional. ${spec.mechanism} A escolha final precisa ser sustentada pela validação no cenário real, não por preferência pessoal.`,
    },
    {
      question: `Cenário: ${caseTwo} Qual métrica ou validação você escolheria e por que ela representa o objetivo real?`,
      answer: `A métrica deve refletir o tipo de saída e o custo do erro. Eu compararia baseline, treino, validação e, quando houver tempo, out-of-time; também verificaria estabilidade por segmento. Critérios desta semana: ${evaluationFocus.join("; ")}.`,
    },
    {
      question: `Quais sinais mostram que uma solução desta semana não deve ser usada ou está enganando você?`,
      answer: `Os principais alertas são: ${spec.pitfalls.map((pitfall, index) => `${index + 1}) ${pitfall}`).join("; ")}. Eu os procuraria na análise dos dados, na separação temporal, na comparação treino-validação, nos segmentos e na revisão do pipeline.`,
    },
    {
      question: `Cenário: ${caseThree} O resultado piorou depois da implantação. O que você verificaria antes de retreinar?`,
      answer: `Eu verificaria definição e qualidade da métrica, atraso do rótulo, disponibilidade e qualidade das entradas, mudança de população, segmentos, diferença entre pipeline de treino e produção e mudança na política do banco. Retreino só entra depois do diagnóstico.`,
    },
    {
      question: `Explique em dois minutos como você usaria ${fifth.toLocaleLowerCase("pt-BR")} para um gestor do banco, incluindo benefício, limite e monitoramento.`,
      answer: `Estrutura ideal: problema e decisão; por que o método serve; população e dados; evidência e baseline; benefício; principal limitação; e como monitorar ou recuar. ${spec.bankApplication}`,
    },
  ];
}

const weeks = weekSpecs.map((spec) => {
  const officialItems = syllabus.filter((item) => item.week === spec.number);
  const officialTopics = officialItems.map((item) => item.text);
  const [repo, title, objective, deliverables] = spec.project;
  const pedagogy = buildPedagogy(spec, officialItems);
  const evaluationFocus = evaluationFor(spec);
  return {
    number: spec.number,
    title: spec.title,
    period: spec.period,
    block: spec.block,
    blocks: spec.blocks,
    objective: spec.summary,
    syllabus: officialTopics,
    content: spec.content,
    overview: {
      summary: spec.summary,
      officialTopics,
      outcomes: spec.outcomes,
    },
    pedagogy,
    practice: buildPractice(spec),
    theoryAndBanking: {
      foundations: [
        { title: "O que é e por que existe", body: spec.foundation },
        { title: "Como funciona na prática", body: spec.mechanism },
        { title: "Hipóteses, limites e senso crítico", body: `A técnica só é defensável quando suas hipóteses são verificadas. Nesta semana, investigue especialmente: ${spec.pitfalls.join("; ")}. Registre a limitação e uma alternativa antes de recomendar uso.` },
      ],
      mathematics: { latex: spec.formula, explanation: spec.mathExplanation },
      validation: evaluationFocus,
      banking: {
        explanation: spec.bankApplication,
        cases: spec.cases.map((useCase, index) => ({
          title: `Caso bancário ${index + 1}`,
          scenario: useCase,
          businessValue: index === 0 ? "Melhorar a decisão principal com evidência quantitativa e critério de sucesso explícito." : index === 1 ? "Reduzir custo, risco ou retrabalho sem perder controle e explicabilidade." : "Antecipar falhas, priorizar investigação e criar monitoramento acionável.",
        })),
      },
    },
    resources: spec.resources,
    materials: spec.resources.books,
    videos: spec.resources.videos,
    prompts: {
      study: buildStudyPrompt(spec, officialTopics),
      sabatina: buildSabatinaPrompt(spec, officialTopics),
    },
    project: { repo, title, objective, deliverables, learningOutcomes: spec.outcomes },
    sabatina: buildSabatina(spec),
  };
});

const roadmap = {
  sourceVersion: "v17 — roadmap v12 em 22 semanas + pedagogia Júnior",
  syllabusVersion: "Ementa oficial fornecida em 08/08/2026",
  metrics: {
    weeks: weeks.length,
    blocks: officialBlocks.length,
    syllabusItems: syllabus.length,
    projects: weeks.length,
    questions: weeks.reduce((sum, week) => sum + week.sabatina.length, 0),
    answers: weeks.reduce((sum, week) => sum + week.sabatina.filter((item) => item.answer).length, 0),
  },
  blocks: officialBlocks.map((block, index) => ({ id: index + 1, title: block.title, weekNumbers: block.weekNumbers })),
  syllabus,
  weeks,
};

const expected = { weeks: 22, blocks: 13, syllabusItems: 61, projects: 22, questions: 220, answers: 220 };
for (const [key, value] of Object.entries(expected)) {
  if (roadmap.metrics[key] !== value) throw new Error(`Auditoria falhou em ${key}: esperado ${value}, recebido ${roadmap.metrics[key]}`);
}
if (new Set(weeks.map((week) => week.number)).size !== 22) throw new Error("Semanas duplicadas ou ausentes.");
if (weeks.some((week) => !week.blocks.length || !week.theoryAndBanking.validation.length)) throw new Error("Toda semana deve registrar blocos e protocolo de avaliação.");
if (weeks.some((week) => week.pedagogy.learningSections.length === 0 || week.practice.exercises.length < 5)) throw new Error("Toda semana deve possuir conteúdo pedagógico e prática.");
if (weeks.some((week) => week.sabatina.length !== 10)) throw new Error("Cada semana deve ter exatamente dez perguntas de sabatina.");

await writeFile(new URL("../data/roadmap.json", import.meta.url), `${JSON.stringify(roadmap, null, 2)}\n`, "utf8");
console.log("Roadmap v17 íntegro:", roadmap.metrics);
