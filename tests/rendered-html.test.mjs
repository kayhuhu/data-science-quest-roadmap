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

test("ships the canonical 22-week roadmap with all 72 literal syllabus items", async () => {
  const roadmap = JSON.parse(await read("data/roadmap.json"));
  assert.deepEqual(roadmap.metrics, { weeks: 22, blocks: 14, syllabusItems: 72, projects: 6, questions: 220, answers: 220, flashcards: 176 });
  assert.match(roadmap.sourceVersion, /v18/);
  assert.equal(roadmap.weeks.length, 22);
  assert.equal(new Set(roadmap.weeks.map((week) => week.project.repo)).size, 22);
  assert.ok(roadmap.weeks.every((week) => week.sabatina.length === 10));
  assert.ok(roadmap.weeks.every((week) => week.pedagogy?.levels?.length === 4));
  assert.ok(roadmap.weeks.every((week) => week.practice?.exercises?.length >= 5 && week.practice.codeExamples.length));
  assert.ok(roadmap.weeks.every((week) => week.theoryAndBanking?.validation?.length));
  assert.ok(roadmap.weeks.every((week) => week.prompts?.study && week.prompts?.sabatina));
  assert.ok(roadmap.syllabus.every((item) => item.contentLevel === "essential"));
  assert.ok(roadmap.syllabus.every((item) => item.coveragePillars.length === 12 && item.coverageWeeks.length));
  assert.ok(roadmap.weeks.every((week) => week.flashcards.length >= 8 && week.flashcards.length <= 12));
  assert.deepEqual(roadmap.weeks.filter((week) => week.project.portfolioMilestone).map((week) => week.number), [6, 10, 13, 16, 18, 22]);
  assert.deepEqual(roadmap.weeks.map((week) => week.title), [
    "Propriedades de Distribuições",
    "Variáveis Aleatórias, FDP/FDA e Distribuições",
    "Testes de Hipóteses",
    "Álgebra",
    "Data Prep: Missings, Outliers e Categorização",
    "Data Prep: PCA, Associação e Seleção",
    "Programação",
    "Banco de Dados",
    "Regressão Linear e Resíduos",
    "Regularização, Árvore de Regressão e GLM",
    "Regressão Logística e Naive Bayes",
    "KNN e SVM",
    "Árvore de Classificação, Random Forest e Boosting",
    "Redes Neurais",
    "K-means, K-medoids e Número de Clusters",
    "DBSCAN, Hierárquico e GMM",
    "Fundamentos de IA Generativa, NLP, Transformers e Embeddings",
    "ICL, Prompt, RAG, Fine-tuning e Segurança",
    "Pesquisa Operacional, Programação Inteira e MIP",
    "Big Data, Grafos e Séries Temporais",
    "Anomalia, Text Mining, Deep Learning, Imagem e Speech",
    "Consolidação",
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

test("weekly study page has exactly four pedagogical tabs and full study controls", async () => {
  const [route, app, center, project, styles] = await Promise.all([
    read("app/[...slug]/page.tsx"), read("components/QuestApp.tsx"), read("components/WeekDrawer.tsx"),
    read("components/ProjectGuidePanel.tsx"), read("app/weekly-study.css"),
  ]);
  assert.match(route, /initialWeek/);
  assert.match(app, /setSelectedWeek/);
  assert.doesNotMatch(app, /window\.open/);
  assert.match(center, /const tabs = \["ESTUDAR", "PRATICAR", "SABATINA", "REVISAR"\]/);
  assert.equal((center.match(/tab === "(?:ESTUDAR|PRATICAR|SABATINA|REVISAR)"/g) ?? []).length, 4);
  for (const phrase of ["EMENTA DA SEMANA", "O QUE ESTUDAR", "Exemplo bancário", "Gerar apostila completa", "Anexar PDF", "Mini Lab", "Criar flashcard", "Critério de domínio"]) assert.match(center, new RegExp(phrase, "i"));
  assert.match(center, /saveWeekPdf/);
  assert.match(center, /weekCompletionEvidence/);
  assert.match(project, /Primeiros 30 minutos/);
  assert.match(project, /Passo a passo do início à publicação/);
  assert.match(project, /PROMPT PARA CODAR, REVISAR E DOCUMENTAR COM IA/);
  assert.match(styles, /--weekly-text:\s*17px/);
  assert.match(styles, /@media \(max-width: 700px\)/);
  assert.doesNotMatch(center, /ORDEM OFICIAL DO PLANEJAMENTO|Luiza p\.|PDF-base|sourceOrder/);

  assert.doesNotMatch(center, /tab === "PROJETO"|tab === "PROGRESSO"/);
});

test("AI prompts teach complete junior-level understanding with optional academic depth", async () => {
  const roadmap = JSON.parse(await read("data/roadmap.json"));
  for (const week of roadmap.weeks) {
    assert.match(week.prompts.study, /Cientista de Dados Júnior/);
    assert.match(week.prompts.study, /o que é e para que serve/i);
    assert.match(week.prompts.study, /quando usar e quando não usar/i);
    assert.match(week.prompts.study, /caso bancário concreto/i);
    assert.match(week.prompts.study, /aplicação mínima em Python ou SQL/i);
    assert.match(week.prompts.study, /matemática estritamente necessária/i);
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
