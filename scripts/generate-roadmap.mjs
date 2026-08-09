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
})));

function buildStudyPrompt(spec, officialTopics) {
  return `Atue como mentor de Ciência de Dados aplicado ao setor bancário e examinador de uma vaga de Cientista de Dados I. Crie um MATERIAL DIDÁTICO COMPLETO, claro e pronto para ser exportado em PDF, sobre a Semana ${spec.number}: “${spec.title}”.

ITENS OFICIAIS DESTA SEMANA (cubra cada item separadamente e sem omissões):
${officialTopics.map((topic, index) => `${index + 1}. ${topic}`).join("\n")}

OBJETIVO: ${spec.summary}

META DE PROFUNDIDADE: eu preciso dominar tudo o que é necessário para explicar, escolher e aplicar o tema no dia a dia. Não transforme o material em uma disciplina acadêmica de matemática. Use fórmulas somente quando ajudarem a intuição e explique cada símbolo em linguagem simples; não exija derivações longas.

Para CADA item oficial, organize obrigatoriamente:
1. o que é, em linguagem simples, seguido da definição técnica correta;
2. por que existe e qual problema resolve;
3. como funciona, com a intuição e as etapas do mecanismo;
4. quando usar e quais sinais indicam que é uma boa escolha;
5. quando não usar, hipóteses, limitações e alternativa mais adequada;
6. como aparece em um pipeline real de Ciência de Dados: dados de entrada, preparação, treino/consulta, saída, métrica e validação;
7. exemplo prático bancário em crédito, fraude, risco, cobrança, propensão ou operações, deixando explícitas a decisão e o valor de negócio;
8. exemplo executável em Python, pandas ou SQL, conforme o tema, com explicação linha a linha e interpretação do resultado;
9. erro comum de prova ou projeto e como detectá-lo;
10. uma pergunta no estilo da prova e uma pergunta oral de sabatina, ambas com resposta ideal objetiva.

Depois dos itens, acrescente:
- uma comparação clara entre os métodos da semana e uma árvore de decisão “quando escolher qual”;
- um estudo de caso bancário completo, do problema ao monitoramento, incluindo leakage, desbalanceamento, estabilidade e custo quando forem pertinentes;
- vinte exercícios misturando conceito, interpretação, ordem correta do pipeline e cenários práticos, com gabarito comentado;
- dez perguntas de sabatina no estilo recebido: definição, finalidade, comparação, pré-processamento, métrica, validação, limitação e aplicação bancária;
- um resumo de uma página, glossário e checklist “sei explicar / escolher / aplicar / validar / criticar”.

Use estes pontos como núcleo: ${spec.content.join("; ")}.
Intuição técnica de apoio, apenas quando útil: ${spec.formula}.
Contexto bancário indispensável: ${spec.bankApplication}
PROTOCOLO DE AVALIAÇÃO DESTA SEMANA: ${spec.evaluationFocus.join("; ")}

Priorize interpretação de métricas, análise exploratória, outliers, dados desbalanceados, SQL, pandas e entendimento prático de classificação, regressão e agrupamento sempre que esses assuntos se conectarem à semana. Não invente referências, não trate correlação como causalidade e não entregue apenas listas. Explique o raciocínio entre etapas. Ao final, faça uma auditoria indicando onde cada item oficial foi coberto.`;
}

function buildSabatinaPrompt(spec, officialTopics) {
  return `Atue como entrevistador técnico de um grande banco para uma vaga de Cientista de Dados I. Simule uma sabatina aplicada sobre a Semana ${spec.number} — ${spec.title} e estes itens oficiais: ${officialTopics.join("; ")}.

AVALIAÇÃO TRANSVERSAL OBRIGATÓRIA: ${spec.evaluationFocus.join("; ")}.

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
  const officialText = syllabus.filter((item) => item.week === spec.number).map((item) => item.text).join("; ");
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
      answer: `A métrica deve refletir o tipo de saída e o custo do erro. Eu compararia baseline, treino, validação e, quando houver tempo, out-of-time; também verificaria estabilidade por segmento. Critérios desta semana: ${spec.evaluationFocus.join("; ")}.`,
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
  const officialTopics = syllabus.filter((item) => item.week === spec.number).map((item) => item.text);
  const [repo, title, objective, deliverables] = spec.project;
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
    theoryAndBanking: {
      foundations: [
        { title: "O que é e por que existe", body: spec.foundation },
        { title: "Como funciona na prática", body: spec.mechanism },
        { title: "Hipóteses, limites e senso crítico", body: `A técnica só é defensável quando suas hipóteses são verificadas. Nesta semana, investigue especialmente: ${spec.pitfalls.join("; ")}. Registre a limitação e uma alternativa antes de recomendar uso.` },
      ],
      mathematics: { latex: spec.formula, explanation: spec.mathExplanation },
      validation: spec.evaluationFocus,
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
  sourceVersion: "v16 — 61 itens com estudo aplicado + avaliações finais",
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

const expected = { weeks: 24, blocks: 13, syllabusItems: 61, projects: 24, questions: 240, answers: 240 };
for (const [key, value] of Object.entries(expected)) {
  if (roadmap.metrics[key] !== value) throw new Error(`Auditoria falhou em ${key}: esperado ${value}, recebido ${roadmap.metrics[key]}`);
}
if (new Set(weeks.map((week) => week.number)).size !== 24) throw new Error("Semanas duplicadas ou ausentes.");
if (weeks.some((week) => !officialBlocks.some((block) => block.title === week.block))) throw new Error("Semana vinculada a bloco não oficial.");
if (weeks.some((week) => !week.blocks.length || !week.overview.officialTopics.length || !week.theoryAndBanking.validation.length)) throw new Error("Toda semana deve registrar blocos, itens oficiais e protocolo de avaliação.");
if (weeks.some((week) => week.sabatina.length !== 10)) throw new Error("Cada semana deve ter exatamente dez perguntas de sabatina.");

await writeFile(new URL("../data/roadmap.json", import.meta.url), `${JSON.stringify(roadmap, null, 2)}\n`, "utf8");
console.log("Roadmap v16 íntegro:", roadmap.metrics);
