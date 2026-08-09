import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("ships Data Science Quest metadata and the requested visual stack", async () => {
  const [layout, journey] = await Promise.all([read("app/layout.tsx"), read("components/JourneyView.tsx")]);
  assert.match(layout, /Data Science Quest/);
  assert.match(layout, /lang="pt-BR"/);
  assert.match(layout, /22 semanas na ordem canônica/);
  for (const technology of ["CSS", "JavaScript", "TypeScript", "React", "Vercel"]) assert.match(journey, new RegExp(technology));
  assert.doesNotMatch(`${layout}\n${journey}`, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("ships the canonical v12 roadmap with 22 weeks, 22 projects and all 61 official items", async () => {
  const roadmap = JSON.parse(await read("data/roadmap.json"));
  assert.deepEqual(roadmap.metrics, { weeks: 22, blocks: 13, syllabusItems: 61, projects: 22, questions: 220, answers: 220 });
  assert.match(roadmap.sourceVersion, /v17/);
  assert.equal(roadmap.weeks.length, 22);
  assert.equal(new Set(roadmap.weeks.map((week) => week.project.repo)).size, 22);
  assert.ok(roadmap.weeks.every((week) => week.sabatina.length === 10));
  assert.ok(roadmap.weeks.every((week) => week.pedagogy?.levels?.length === 4));
  assert.ok(roadmap.weeks.every((week) => week.practice?.exercises?.length >= 5 && week.practice.codeExamples.length));
  assert.ok(roadmap.weeks.every((week) => week.theoryAndBanking?.validation?.length));
  assert.ok(roadmap.weeks.every((week) => week.prompts?.study && week.prompts?.sabatina));
  assert.ok(roadmap.syllabus.every((item) => item.contentLevel === "essential"));
  assert.deepEqual(roadmap.weeks.map((week) => week.title), [
    "Propriedades das distribuições e análise exploratória",
    "Variáveis aleatórias, FDP/FDA e distribuições da ementa",
    "Testes de hipótese, intervalos e decisão experimental",
    "Matrizes, vetores, álgebra matricial, distâncias e produto interno",
    "Missings, outliers e categorização",
    "Correlação, associação, PCA e seleção de variáveis",
    "Python, leitura/escrita, sklearn e engenharia mínima de projeto",
    "Modelo relacional, SQL, álgebra relacional e chaves",
    "Regressão linear, resíduos, métricas e validação",
    "Regularização, árvore de regressão e GLM",
    "Regressão logística e Naive Bayes",
    "KNN e SVM",
    "Árvore de classificação, Random Forest, Boosting e ensembles",
    "Redes neurais, deep learning e avaliação",
    "K-means, K-medoids e escolha do número de clusters",
    "DBSCAN, hierárquico, GMM e detecção de anomalia",
    "PLN, text mining, embeddings, Transformer e fundamentos de IA Generativa",
    "In Context Learning, Prompt, RAG, fine-tuning, quantization, RLHF e guardrails",
    "Programação linear, inteira, Branch-and-Bound, GAP e solvers",
    "Big Data, Spark/PySpark, Hadoop/Hive, grafos e séries temporais",
    "Ensembles, anomalias, text mining, deep learning, imagens e fala",
    "Capstone integrado, simulado prático e sabatina final",
  ]);
  assert.deepEqual(roadmap.weeks.map((week) => week.project.repo), [
    "01-banking-portfolio-eda", "02-banking-risk-distributions-lab", "03-banking-ab-test-credit-policy",
    "04-customer-similarity-linear-algebra", "05-banking-data-quality-pipeline", "06-feature-engineering-pca-selection",
    "07-banking-data-toolkit", "08-banking-sql-feature-mart", "09-credit-limit-regression",
    "10-loss-severity-model-benchmark", "11-default-propensity-probabilistic-models", "12-fraud-knn-svm-benchmark",
    "13-credit-risk-ensemble-challenge", "14-neural-network-risk-classifier", "15-customer-segmentation-kmeans",
    "16-behavior-clustering-anomaly-lab", "17-banking-complaints-embeddings", "18-bank-policy-rag-assistant",
    "19-credit-budget-optimization", "20-distributed-fraud-network-forecast", "21-multimodal-banking-triage",
    "22-banking-decision-platform-capstone",
  ]);
});

test("weekly study page has exactly the six pedagogical tabs and full study controls", async () => {
  const [route, app, center, project, studyGuides, modelProfiles, styles] = await Promise.all([
    read("app/[...slug]/page.tsx"), read("components/QuestApp.tsx"), read("components/WeekDrawer.tsx"),
    read("components/ProjectGuidePanel.tsx"), read("lib/syllabus-study-guides.ts"),
    read("lib/model-study-profiles.ts"), read("app/weekly-study.css"),
  ]);
  assert.match(route, /initialWeek/);
  assert.match(app, /setSelectedWeek/);
  assert.doesNotMatch(app, /window\.open/);
  assert.match(center, /const tabs = \["APRENDER", "PRATICAR", "PROJETO", "SABATINA", "REVISAR", "PROGRESSO"\]/);
  assert.equal((center.match(/tab === "(?:APRENDER|PRATICAR|PROJETO|SABATINA|REVISAR|PROGRESSO)"/g) ?? []).length, 6);
  for (const phrase of ["ENTENDA PRIMEIRO", "QUANDO NÃO É INDICADO", "APLICAÇÃO BANCÁRIA", "INTERPRETAÇÃO", "FLUXO PRÁTICO", "ERROS COMUNS", "Aprofundamento opcional", "Vincular PDF", "Criar flashcard", "Checklist obrigatório"]) assert.match(center, new RegExp(phrase));
  assert.match(center, /remarkGfm/);
  assert.match(center, /remarkMath/);
  assert.match(center, /saveWeekPdf/);
  assert.match(center, /weekCompletionEvidence/);
  assert.match(modelProfiles, /Overfit e underfit|overfitAndUnderfit/);
  assert.match(modelProfiles, /monitoring/);
  assert.match(project, /Primeiros 30 minutos/);
  assert.match(project, /Passo a passo do início à publicação/);
  assert.match(project, /PROMPT PARA CODAR, REVISAR E DOCUMENTAR COM IA/);
  assert.match(styles, /--weekly-text:17px/);
  assert.match(styles, /@media\(max-width:700px\)/);
  assert.doesNotMatch(center, /ORDEM OFICIAL DO PLANEJAMENTO|Luiza p\.|PDF-base|sourceOrder/);

  const roadmap = JSON.parse(await read("data/roadmap.json"));
  for (const item of roadmap.syllabus) assert.match(studyGuides, new RegExp(`"${item.id}"\\s*:`), `guia ausente para ${item.id}`);
});

test("AI prompts teach complete junior-level understanding with optional academic depth", async () => {
  const roadmap = JSON.parse(await read("data/roadmap.json"));
  for (const week of roadmap.weeks) {
    assert.match(week.prompts.study, /Cientista de Dados Júnior/);
    assert.match(week.prompts.study, /O que é\?/);
    assert.match(week.prompts.study, /Quando não usar/);
    assert.match(week.prompts.study, /Exemplo prático bancário/);
    assert.match(week.prompts.study, /Implementação curta em Python ou SQL/);
    assert.match(week.prompts.study, /Aprofundamento opcional/);
    assert.match(week.prompts.sabatina, /somente UMA pergunta por vez/);
  }
});

test("keeps final sabatina and both test exams general and independent of weeks", async () => {
  const [realSabatina, views, drawer, app] = await Promise.all([read("lib/real-sabatina.ts"), read("components/AssessmentViews.tsx"), read("components/WeekDrawer.tsx"), read("components/QuestApp.tsx")]);
  const assessments = JSON.parse(await read("data/assessments.json"));
  assert.equal((realSabatina.match(/q\("sr-\d+"/g) ?? []).length, 51);
  assert.match(realSabatina, /Gini de 50%/);
  assert.doesNotMatch(drawer, /realSabatinaForWeek|SABATINA REAL/);
  assert.match(app, /Sabatina teste/);
  assert.match(app, /Provas reais/);
  assert.match(views, /AVALIAÇÃO FINAL/);
  assert.doesNotMatch(views, /String\((?:question|item)\.week\)|Todas as semanas/);
  assert.deepEqual(assessments.assessments.map((item) => item.questions.length), [47, 37]);
  for (const dataset of ["classificacao_Q1.csv", "classificacao_Q2.csv", "regressao_Q1.csv", "regressao_Q2.csv", "agrupamento.csv"]) {
    const source = await read(`public/datasets/${dataset}`);
    assert.ok(source.split("\n").length > 100);
  }
});

test("XP remains derived from saved evidence", async () => {
  const workspace = await read("lib/use-quest-workspace.ts");
  assert.match(workspace, /function calculateQuestXp/);
  assert.match(workspace, /bestSabatinaByWeek/);
  assert.match(workspace, /calculateWeekCompletion/);
  assert.doesNotMatch(await read("components/WeekDrawer.tsx"), /xp:\s*current\.xp\s*\+/);
});
