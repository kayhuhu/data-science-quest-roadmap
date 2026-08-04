import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

test("ships Data Science Quest metadata and the requested visual stack", async () => {
  const layout = await readFile(new URL("app/layout.tsx", templateRoot), "utf8");
  const journey = await readFile(new URL("components/JourneyView.tsx", templateRoot), "utf8");
  assert.match(layout, /Data Science Quest/);
  assert.match(layout, /lang="pt-BR"/);
  assert.match(layout, /22 semanas para dominar a ementa/);
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
    weeks: 22,
    blocks: 12,
    syllabusItems: 72,
    projects: 22,
    questions: 220,
    answers: 220,
  });
  assert.equal(roadmap.weeks.length, 22);
  assert.ok(roadmap.weeks.every((week) => week.sabatina.length === 10));
  assert.ok(roadmap.weeks.every((week) => week.project.repo));
});

test("ships an integrated study center and a specific project guide for every week", async () => {
  const route = await readFile(new URL("app/[...slug]/page.tsx", templateRoot), "utf8");
  const app = await readFile(new URL("components/QuestApp.tsx", templateRoot), "utf8");
  const center = await readFile(new URL("components/WeekDrawer.tsx", templateRoot), "utf8");
  const syllabus = await readFile(new URL("components/SyllabusView.tsx", templateRoot), "utf8");
  const guides = await readFile(new URL("lib/project-guides.ts", templateRoot), "utf8");

  assert.match(route, /initialWeek/);
  assert.match(app, /setSelectedWeek/);
  assert.doesNotMatch(app, /window\.open/);
  assert.match(center, /Ementa correspondente à Semana/);
  assert.match(center, /Primeiros 30 minutos/);
  assert.match(center, /Passo a passo do início à publicação/);
  assert.match(syllabus, /onSelectWeek\(roadmap\.weeks\[item\.week - 1\]\)/);
  assert.match(syllabus, /setBlock\(item\.block\)/);

  const blueprintWeeks = [...guides.matchAll(/^\s{2}(\d+): \{$/gm)].map((match) => Number(match[1]));
  assert.deepEqual(blueprintWeeks, Array.from({ length: 22 }, (_, index) => index + 1));
  assert.ok((guides.match(/businessQuestion:/g) ?? []).length >= 22);
  assert.ok((guides.match(/implementation:/g) ?? []).length >= 22);
  assert.ok((guides.match(/validation:/g) ?? []).length >= 22);
  assert.ok((guides.match(/tests:/g) ?? []).length >= 22);
});
