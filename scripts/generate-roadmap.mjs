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
  return `Atue como professor universitário de Ciência de Dados, especialista quantitativo do setor bancário e examinador técnico rigoroso. Crie um MATERIAL DIDÁTICO COMPLETO, pronto para ser exportado em PDF, sobre a Semana ${spec.number}: “${spec.title}”.

ORDEM DO PLANEJAMENTO-FONTE: ${spec.sourceOrder}

EMENTA OFICIAL ASSOCIADA À SEMANA (preserve a ordem e diferencie os blocos):
${officialTopics.map((topic, index) => `${index + 1}. ${topic}`).join("\n")}

OBJETIVO: ${spec.summary}

O material deve ensinar do zero até o nível de prova e sabatina. Organize-o obrigatoriamente assim:
1. mapa conceitual e pré-requisitos;
2. fundamentação teórica profunda, definições formais, hipóteses e intuição;
3. desenvolvimento matemático passo a passo, com fórmulas em LaTeX, significado de cada símbolo e pelo menos dois exemplos numéricos resolvidos;
4. comparação entre métodos, critérios de escolha e situações em que cada um falha;
5. aplicação bancária detalhada em crédito, risco, fraude, cobrança, propensão ou operações, explicando a decisão e o valor de negócio;
6. exemplo em Python com código modular, type hints, docstrings, testes e interpretação do resultado;
7. armadilhas de prova, leakage, vieses, limitações, privacidade e governança;
8. vinte exercícios graduais com gabarito comentado;
9. dez perguntas de sabatina orientadas a cenários bancários, com resposta ideal;
10. resumo de uma página, glossário e checklist “sei explicar / calcular / implementar / aplicar / criticar”.

Use estes pontos como núcleo: ${spec.content.join("; ")}.
Formalização indispensável: ${spec.formula}.
Contexto bancário indispensável: ${spec.bankApplication}
PROTOCOLO DE AVALIAÇÃO DESTA SEMANA: ${spec.evaluationFocus.join("; ")}

Não seja superficial, não invente referências, não trate correlação como causalidade e não entregue apenas listas. Explique o raciocínio entre etapas. Quando uma hipótese não for satisfeita, mostre diagnóstico e alternativa. Ao final, faça uma auditoria dizendo explicitamente se cada item da ementa oficial foi coberto e em qual seção.`;
}

function buildSabatinaPrompt(spec, officialTopics) {
  return `Atue como entrevistador sênior de Ciência de Dados de um grande banco. Simule uma sabatina rigorosa sobre a Semana ${spec.number} — ${spec.title}, seguindo ${spec.sourceOrder} e estes itens oficiais: ${officialTopics.join("; ")}.

AVALIAÇÃO TRANSVERSAL OBRIGATÓRIA: ${spec.evaluationFocus.join("; ")}.

REGRAS DA SIMULAÇÃO:
- faça somente UMA pergunta por vez e espere minha resposta;
- use principalmente casos de crédito, fraude, cobrança, propensão, risco e operações;
- alterne definição, matemática, hipótese, escolha de método, implementação, validação, monitoramento e decisão de negócio;
- depois de cada resposta, dê nota de 0 a 10 em: precisão técnica, profundidade, aplicação bancária e comunicação;
- aponte erros factuais, omissões e jargões sem explicação;
- faça até duas perguntas de aprofundamento quando minha resposta estiver vaga;
- mostre uma resposta técnica ideal, curta e completa, somente depois da minha tentativa;
- registre minhas lacunas e, a cada cinco perguntas, gere um plano de revisão;
- não aceite uma métrica ou algoritmo sem eu justificar custo, hipótese, leakage, segmento, estabilidade e produção.

Comece pedindo que eu escolha o nível (fundamentos, prova ou sênior). Em seguida faça a primeira pergunta e pare. Não antecipe as próximas.`;
}

function buildSabatina(spec) {
  const [first, second, third, fourth, fifth] = spec.content;
  const [caseOne, caseTwo, caseThree] = spec.cases;
  const officialText = syllabus.filter((item) => item.week === spec.number).map((item) => item.text).join("; ");
  return [
    {
      question: `Defina o núcleo de “${spec.title}” sem usar jargão vazio e conecte-o à ementa oficial.`,
      answer: `${spec.foundation} Nesta semana, isso cobre explicitamente: ${officialText}.`,
    },
    {
      question: `Explique como ${first.toLocaleLowerCase("pt-BR")} funciona, quais entradas exige e qual resultado produz.`,
      answer: `${spec.mechanism} A resposta ideal deixa claras unidade de análise, parâmetros aprendidos, saída e hipótese de validade.`,
    },
    {
      question: `Escreva e interprete a principal formalização matemática da semana. O que cada termo significa?`,
      answer: `A formalização central é ${spec.formula}. ${spec.mathExplanation} Em uma sabatina, não basta recitar: relacione os termos ao dado e à decisão.`,
    },
    {
      question: `Em um banco, como você aplicaria ${second.toLocaleLowerCase("pt-BR")} sem gerar leakage?`,
      answer: `${spec.bankApplication} O procedimento deve separar desenvolvimento e avaliação, aprender transformações apenas no treino quando aplicável e respeitar a data em que cada informação estaria disponível.`,
    },
    {
      question: `Cenário: ${caseOne} Qual seria sua sequência de diagnóstico, método, validação e recomendação?`,
      answer: `Começaria definindo decisão, população, unidade, janela, baseline e custo. Depois aplicaria ${third}, validaria hipóteses e estabilidade, quantificaria incerteza e traduziria o resultado em ação. ${spec.bankApplication}`,
    },
    {
      question: `Compare ${third.toLocaleLowerCase("pt-BR")} com ${fourth.toLocaleLowerCase("pt-BR")}. Quando escolheria cada abordagem?`,
      answer: `A comparação deve considerar hipótese, escala, robustez, interpretabilidade, dados necessários e custo operacional. ${spec.mechanism} A escolha final precisa ser sustentada pela validação no cenário real, não por preferência pessoal.`,
    },
    {
      question: `Cenário: ${caseTwo} Que evidências fariam você rejeitar uma solução aparentemente boa?`,
      answer: `Eu rejeitaria a solução se houvesse leakage, hipótese estrutural violada, degradação out-of-time, instabilidade por segmento, custo superior ao benefício ou resultado irreproduzível. Riscos específicos: ${spec.pitfalls.join("; ")}.`,
    },
    {
      question: `Quais são as três armadilhas mais graves deste tema e como você as detectaria em código ou dados?`,
      answer: `${spec.pitfalls.map((pitfall, index) => `${index + 1}) ${pitfall}`).join("; ")}. Para detectá-las, eu criaria validações de schema/tempo, testes unitários, comparação treino-validação-OOT e análise de erros por segmento, registrando evidências no repositório.`,
    },
    {
      question: `Cenário: ${caseThree} Como você monitoraria a solução depois da implantação?`,
      answer: `Monitoraria qualidade e disponibilidade de entrada, mudança de população, métrica técnica adequada, resultado de negócio, latência/custo e desempenho por segmento. Definiria limites, responsável, frequência e ação de fallback antes da implantação.`,
    },
    {
      question: `Defenda em dois minutos uma decisão baseada em ${fifth.toLocaleLowerCase("pt-BR")} para um diretor de risco e depois diga a limitação mais importante.`,
      answer: `Estrutura ideal: decisão e impacto esperado primeiro; população e janela; método e baseline; evidência com incerteza; risco e segmento; recomendação, monitoramento e fallback. A limitação deve ser concreta e conectada a uma ação. ${spec.bankApplication}`,
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
      sourceOrder: spec.sourceOrder,
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
  sourceVersion: "v15 — 24 semanas na ordem Luiza + sabatina real e provas",
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
if (weeks.some((week) => !week.blocks.length || !week.overview.sourceOrder || !week.theoryAndBanking.validation.length)) throw new Error("Toda semana deve registrar blocos, ordem da fonte e protocolo de avaliação.");
if (weeks.some((week) => week.sabatina.length !== 10)) throw new Error("Cada semana deve ter exatamente dez perguntas de sabatina.");

await writeFile(new URL("../data/roadmap.json", import.meta.url), `${JSON.stringify(roadmap, null, 2)}\n`, "utf8");
console.log("Roadmap v15 íntegro:", roadmap.metrics);
