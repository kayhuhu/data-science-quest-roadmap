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
  assert.ok(roadmap.weeks.every((week) => week.overview?.sourceOrder));
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
  const styles = await readFile(new URL("app/globals.css", templateRoot), "utf8");

  assert.match(route, /initialWeek/);
  assert.match(app, /setSelectedWeek/);
  assert.doesNotMatch(app, /window\.open/);
  assert.match(center, /Teoria e Aplicação Bancária/);
  assert.match(center, /Como validar esta técnica nesta semana/);
  assert.match(center, /ORDEM OFICIAL DO PLANEJAMENTO/);
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
  assert.match(syllabus, /onSelectWeek\(roadmap\.weeks\[item\.week - 1\]\)/);
  assert.match(syllabus, /setBlock\(item\.block\)/);

  assert.match(guides, /gh repo create kayhuhu/);
  assert.match(guides, /python -m venv \.venv/);
  assert.match(guides, /requirements\.txt/);
  assert.match(guides, /buildProjectAiPrompt/);
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
