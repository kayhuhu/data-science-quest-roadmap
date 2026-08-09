import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

test("ships Data Science Quest metadata and the requested visual stack", async () => {
  const layout = await readFile(new URL("app/layout.tsx", templateRoot), "utf8");
  const journey = await readFile(new URL("components/JourneyView.tsx", templateRoot), "utf8");
  assert.match(layout, /Data Science Quest/);
  assert.match(layout, /lang="pt-BR"/);
  assert.match(layout, /24 semanas na ordem do planejamento/);
  assert.match(journey, /CSS/);
  assert.match(journey, /JavaScript/);
  assert.match(journey, /TypeScript/);
  assert.match(journey, /React/);
  assert.match(journey, /Vercel/);
  assert.doesNotMatch(`${layout}\n${journey}`, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("ships the complete audited roadmap", async () => {
  const source = await readFile(new URL("data/roadmap.json", templateRoot), "utf8");
  const roadmap = JSON.parse(source);
  assert.deepEqual(roadmap.metrics, {
    weeks: 24,
    blocks: 13,
    syllabusItems: 61,
    projects: 24,
    questions: 240,
    answers: 240,
  });
  assert.equal(roadmap.weeks.length, 24);
  assert.ok(roadmap.weeks.every((week) => week.sabatina.length === 10));
  assert.ok(roadmap.weeks.every((week) => week.project.repo));
  assert.ok(roadmap.weeks.every((week) => week.overview?.officialTopics?.length));
  assert.ok(roadmap.weeks.every((week) => !("sourceOrder" in week.overview)));
  assert.ok(roadmap.weeks.every((week) => week.blocks?.length));
  assert.ok(roadmap.weeks.every((week) => week.theoryAndBanking?.validation?.length));
  assert.ok(roadmap.weeks.every((week) => week.theoryAndBanking?.banking?.cases?.length === 3));
  assert.ok(roadmap.weeks.every((week) => week.prompts?.study && week.prompts?.sabatina));
  assert.deepEqual(roadmap.blocks.map((block) => block.title), [
    "PROGRAMAÇÃO", "ESTATÍSTICA BÁSICA", "ÁLGEBRA", "AVALIAÇÃO DE MODELOS", "DATA PREP",
    "BANCO DE DADOS", "CLASSIFICAÇÃO", "REGRESSÃO", "AGRUPAMENTO", "IA GENERATIVA",
    "PESQUISA OPERACIONAL", "PROGRAMAÇÃO INTEIRA", "MIP (MIXED INTEGER PROGRAM)",
  ]);
  assert.deepEqual(roadmap.weeks.map((week) => week.title), [
    "Estatística descritiva e leitura inicial dos dados",
    "Probabilidade, distribuições e testes de hipótese",
    "Correlação, associação e fundamentos de álgebra",
    "Python, pandas e limpeza inicial",
    "Transformação, redução e seleção de variáveis",
    "Fluxo de projeto, validação e dados temporais",
    "Função de custo e métricas de avaliação",
    "Parâmetros, hiperparâmetros, viés e variância",
    "Regressão linear e análise de resíduos",
    "Regularização e modelos lineares generalizados",
    "Regressão logística",
    "Naive Bayes",
    "KNN",
    "Árvores de decisão para classificação e regressão",
    "SVM",
    "Random Forest e Boosting",
    "K-means e K-medoids",
    "DBSCAN e detecção de anomalias",
    "Agrupamento hierárquico",
    "Gaussian Mixture Models (GMM)",
    "Banco de dados, SQL e processamento distribuído",
    "Redes neurais, deep learning, imagens e fala",
    "IA Generativa, PLN, embeddings e text mining",
    "Pesquisa Operacional, Programação Inteira, MIP e grafos",
  ]);
});

test("ships an integrated study center and a specific project guide for every week", async () => {
  const route = await readFile(new URL("app/[...slug]/page.tsx", templateRoot), "utf8");
  const app = await readFile(new URL("components/QuestApp.tsx", templateRoot), "utf8");
  const center = await readFile(new URL("components/WeekDrawer.tsx", templateRoot), "utf8");
  const projectPanel = await readFile(new URL("components/ProjectGuidePanel.tsx", templateRoot), "utf8");
  const learningViews = await readFile(new URL("components/LearningViews.tsx", templateRoot), "utf8");
  const syllabus = await readFile(new URL("components/SyllabusView.tsx", templateRoot), "utf8");
  const guides = await readFile(new URL("lib/project-guides.ts", templateRoot), "utf8");
  const studyGuides = await readFile(new URL("lib/syllabus-study-guides.ts", templateRoot), "utf8");
  const styles = await readFile(new URL("app/globals.css", templateRoot), "utf8");
  const roadmap = JSON.parse(await readFile(new URL("data/roadmap.json", templateRoot), "utf8"));

  assert.match(route, /initialWeek/);
  assert.match(app, /setSelectedWeek/);
  assert.doesNotMatch(app, /window\.open/);
  assert.match(center, /Teoria e Aplicação Bancária/);
  assert.match(center, /Como validar esta técnica nesta semana/);
  assert.match(center, /MAPA APLICADO DA EMENTA/);
  assert.match(center, /O QUE É/);
  assert.match(center, /QUANDO NÃO USAR/);
  assert.match(center, /FOCO DE PROVA E SABATINA/);
  assert.doesNotMatch(center, /ORDEM OFICIAL DO PLANEJAMENTO|PDF-base|week\.overview\.sourceOrder/);
  assert.doesNotMatch(projectPanel, /overview\.sourceOrder|Ordem no planejamento/);
  assert.match(center, /Projeto \(Estrutura Completa CD\)/);
  assert.match(center, /Estudar com IA/);
  assert.equal((center.match(/^  "(?:Visão Geral|Teoria e Aplicação Bancária|Materiais|Estudar com IA|Projeto \(Estrutura Completa CD\)|Perguntas de Sabatina)",?$/gm) ?? []).length, 6);
  assert.match(center, /ProjectGuidePanel/);
  assert.match(projectPanel, /Primeiros 30 minutos/);
  assert.match(projectPanel, /Passo a passo do início à publicação/);
  assert.match(projectPanel, /PROMPT PARA CODAR, REVISAR E DOCUMENTAR COM IA/);
  assert.match(learningViews, /projects-workspace/);
  assert.match(learningViews, /ProjectGuidePanel/);
  assert.match(styles, /\.week-drawer-complete \{ width: 100vw/);
  assert.match(styles, /\.week-drawer-complete \.drawer-section-intro p \{ max-width: 900px; font-size: 15px/);
  assert.match(styles, /\.week-drawer-complete \.syllabus-learning-content p \{ font-size: 15px/);
  assert.match(syllabus, /onSelectWeek\(week\)/);
  assert.match(syllabus, /setBlock\(item\.block\)/);
  assert.match(syllabus, /weekly-syllabus-checklist/);

  assert.match(guides, /gh repo create kayhuhu/);
  assert.match(guides, /python -m venv \.venv/);
  assert.match(guides, /requirements\.txt/);
  assert.match(guides, /buildProjectAiPrompt/);
  assert.match(center, /syllabusStudyGuides/);
  assert.equal(roadmap.syllabus.length, 61);
  for (const item of roadmap.syllabus) {
    assert.match(studyGuides, new RegExp(`"${item.id}"\\s*:`), `guia aplicado ausente para ${item.id}`);
  }
});

test("weekly AI study and interview prompts prioritize applied understanding", async () => {
  const generator = await readFile(new URL("scripts/generate-roadmap.mjs", templateRoot), "utf8");
  const roadmap = JSON.parse(await readFile(new URL("data/roadmap.json", templateRoot), "utf8"));
  assert.doesNotMatch(generator, /professor universitário|Formalização indispensável|ORDEM DO PLANEJAMENTO-FONTE/);
  assert.match(generator, /quando não usar/);
  assert.match(generator, /pipeline real de Ciência de Dados/);
  assert.match(generator, /não cobre demonstrações matemáticas longas/);
  assert.ok(roadmap.weeks.every((week) => /Cientista de Dados I/.test(week.prompts.study)));
  assert.ok(roadmap.weeks.every((week) => /quando não usar/.test(week.prompts.study)));
  assert.ok(roadmap.weeks.every((week) => /estilo de uma prova real/.test(week.prompts.sabatina)));
});

test("ships the real interview bank, two interactive tests and reconstructed datasets", async () => {
  const realSabatina = await readFile(new URL("lib/real-sabatina.ts", templateRoot), "utf8");
  const assessments = JSON.parse(await readFile(new URL("data/assessments.json", templateRoot), "utf8"));
  const views = await readFile(new URL("components/AssessmentViews.tsx", templateRoot), "utf8");
  const drawer = await readFile(new URL("components/WeekDrawer.tsx", templateRoot), "utf8");
  const app = await readFile(new URL("components/QuestApp.tsx", templateRoot), "utf8");
  const styles = await readFile(new URL("app/globals.css", templateRoot), "utf8");

  assert.equal((realSabatina.match(/q\("sr-\d+"/g) ?? []).length, 51);
  assert.match(realSabatina, /Gini de 50%/);
  assert.match(realSabatina, /OVERSAMPLING|oversampling/i);
  assert.match(realSabatina, /coeficiente de silhueta/i);
  assert.doesNotMatch(drawer, /realSabatinaForWeek|SABATINA REAL/);
  assert.match(app, /Sabatina teste/);
  assert.match(app, /Provas reais/);
  assert.match(views, /AVALIAÇÃO FINAL/);
  assert.doesNotMatch(views, /String\((?:question|item)\.week\)|Todas as semanas/);
  assert.match(views, /MODO ESTUDO/);
  assert.match(views, /MODO SIMULADO/);
  assert.deepEqual(assessments.assessments.map((item) => item.questions.length), [47, 37]);
  assert.ok(assessments.assessments.every((item) => item.questions.every((question) => question.options.length >= 4 && question.rationale)));

  for (const dataset of ["classificacao_Q1.csv", "classificacao_Q2.csv", "regressao_Q1.csv", "regressao_Q2.csv", "agrupamento.csv"]) {
    const source = await readFile(new URL(`public/datasets/${dataset}`, templateRoot), "utf8");
    assert.ok(source.split("\n").length > 100, `${dataset} deve conter dados suficientes para prática`);
  }
  assert.doesNotMatch(styles, /\.quest-app :where\(p, li\)|\.quest-app :where\(button/);
});

test("XP is derived from saved evidence and cannot be farmed by toggling status", async () => {
  const workspace = await readFile(new URL("lib/use-quest-workspace.ts", templateRoot), "utf8");
  const components = await Promise.all([
    "components/WeekDrawer.tsx",
    "components/SyllabusView.tsx",
    "components/StudyStudio.tsx",
    "components/LearningViews.tsx",
  ].map((file) => readFile(new URL(file, templateRoot), "utf8")));
  assert.match(workspace, /function calculateQuestXp/);
  assert.match(workspace, /bestSabatinaByWeek/);
  assert.match(workspace, /new Set\(workspace\.reviewedFlashcards\)/);
  assert.doesNotMatch(components.join("\n"), /xp:\s*current\.xp\s*\+/);
});
