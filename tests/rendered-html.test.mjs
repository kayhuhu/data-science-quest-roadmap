import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

test("builds the Data Science Quest application metadata", async () => {
  const bundle = await readFile(new URL("dist/server/index.js", templateRoot), "utf8");
  assert.match(bundle, /Data Science Quest/);
  assert.match(bundle, /lang:\s*"pt-BR"/);
  assert.match(bundle, /22 semanas para dominar a ementa/);
  assert.doesNotMatch(bundle, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
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
