"use client";

import { ArrowRight, BrainCircuit, CheckCircle2, GitBranch, Layers3, Target } from "lucide-react";
import { roadmap, type RoadmapWeek } from "@/lib/quest-data";

const foundations = [
  ["Modelo", "Uma representação aprendida dos dados para estimar, classificar, agrupar ou apoiar uma decisão.", "Não é o algoritmo isolado: inclui dados, transformações, parâmetros e regra de uso."],
  ["Feature e target", "Features são entradas; target é o que o modelo supervisionado tenta prever.", "X costuma representar a matriz de features e y o vetor-alvo."],
  ["Supervisionado", "Aprende com exemplos que possuem resposta conhecida.", "Regressão prevê valor; classificação prevê classe ou probabilidade."],
  ["Não supervisionado", "Procura estrutura sem um target conhecido.", "Clustering cria grupos; o significado ainda precisa de interpretação."],
  ["Treino, validação e teste", "Treino ajusta; validação escolhe; teste estima o resultado final em dados não usados.", "Separar antes de aprender transformações reduz leakage."],
  ["Parâmetro e hiperparâmetro", "Parâmetro é aprendido; hiperparâmetro é configurado antes ou durante a busca.", "Coeficiente é parâmetro; profundidade máxima é hiperparâmetro."],
  ["Loss e métrica", "Loss orienta o ajuste; métrica mede qualidade para análise e decisão.", "Podem coincidir, mas não são sinônimos."],
  ["Overfit e underfit", "Overfit aprende ruído; underfit não captura o padrão necessário.", "Compare treino e validação e sempre use um baseline."],
];

const interfaces = [
  ["fit", "Aprende parâmetros usando os dados de treino."],
  ["transform", "Aplica uma transformação aprendida, como escala ou imputação."],
  ["predict", "Entrega a previsão final de classe ou valor."],
  ["predict_proba", "Entrega probabilidades por classe quando o estimador oferece essa interface."],
];

export function MlFundamentalsView({ onSelectWeek }: { onSelectWeek: (week: RoadmapWeek) => void }) {
  return (
    <div className="view-stack fundamentals-view">
      <section className="view-hero fundamentals-hero">
        <div><span className="eyebrow"><BrainCircuit size={14} /> CHECKPOINT ENTRE AS SEMANAS 8 E 9</span><h1>Fundamentos de Machine Learning</h1><p>Uma ponte curta para chegar à regressão sabendo ler X, y, treino, validação, pipeline e a interface do scikit-learn.</p></div>
        <button className="primary-button" onClick={() => onSelectWeek(roadmap.weeks[8])}>Depois, abrir Semana 9 <ArrowRight size={16} /></button>
      </section>

      <section className="fundamentals-callout"><Target size={22} /><div><span>OBJETIVO</span><h2>Reconhecer a linguagem comum dos modelos</h2><p>Ao terminar, você deve conseguir explicar o fluxo de um problema de ML sem confundir algoritmo, modelo, parâmetro, métrica ou conjunto de dados.</p></div></section>

      <section className="fundamentals-grid">{foundations.map(([title, description, detail]) => <article key={title}><span><CheckCircle2 size={17} /></span><h3>{title}</h3><p>{description}</p><small>{detail}</small></article>)}</section>

      <section className="pipeline-foundation">
        <header><GitBranch size={21} /><div><span>PIPELINE BÁSICO</span><h2>Da pergunta à avaliação</h2></div></header>
        <ol><li>Definir problema, população, unidade e custo do erro.</li><li>Separar X e y.</li><li>Dividir treino e avaliação antes de aprender transformações.</li><li>Ajustar preprocessing somente no treino.</li><li>Ajustar o modelo com <code>fit</code>.</li><li>Prever e comparar com um baseline.</li><li>Interpretar métrica, segmentos, limitações e uso no banco.</li></ol>
      </section>

      <section className="interface-table"><header><Layers3 size={21} /><div><span>INTERFACE DO SKLEARN</span><h2>Quatro verbos que aparecem toda hora</h2></div></header><div>{interfaces.map(([method, meaning]) => <article key={method}><code>{method}</code><p>{meaning}</p></article>)}</div></section>

      <section className="foundation-comparison"><h2>Resumo para a sabatina</h2><div className="table-scroll"><table><thead><tr><th>Pergunta</th><th>Resposta curta</th><th>Exemplo bancário</th></tr></thead><tbody><tr><td>Regressão ou classificação?</td><td>Valor contínuo versus classe/probabilidade.</td><td>Prever perda versus probabilidade de default.</td></tr><tr><td>Supervisionado ou não supervisionado?</td><td>Com target conhecido versus busca de estrutura sem target.</td><td>Score de fraude versus segmentação de clientes.</td></tr><tr><td>Loss ou métrica?</td><td>Otimiza o ajuste versus comunica qualidade.</td><td>Log loss no treino e Recall/Precision na decisão.</td></tr><tr><td>Validação aleatória ou temporal?</td><td>Depende de como novos dados chegarão.</td><td>Out-of-time para uma safra futura de crédito.</td></tr></tbody></table></div></section>

      <section className="foundation-next"><div><span>PRÓXIMO PASSO</span><h2>Agora sim: Regressão Linear</h2><p>Use essa linguagem na Semana 9 para montar X/y, separar treino e teste, ajustar, prever e interpretar MAE, RMSE, R² e resíduos.</p></div><button className="primary-button" onClick={() => onSelectWeek(roadmap.weeks[8])}>Abrir Semana 9 <ArrowRight size={16} /></button></section>
    </div>
  );
}
