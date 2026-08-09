import assert from "node:assert/strict";
import test from "node:test";
import { calculateWeekCompletion } from "../lib/week-completion.mjs";

const completeInput = {
  essentialIds: ["a", "b"],
  syllabusStatus: { a: "verde", b: "verde", optional: "nao-iniciado" },
  manualEssential: false,
  questionConfidence: [2, 2, 3, 2, 2, 3, 2, 2, 0, 0],
  practiceComplete: true,
  projectSteps: 3,
  explainReady: true,
  useReady: true,
  interpretationReady: true,
};

test("green requires every essential criterion and ignores optional content", () => {
  const result = calculateWeekCompletion(completeInput);
  assert.equal(result.sabatinaRate, 0.8);
  assert.equal(result.complete, true);
});

test("one missing essential item blocks green", () => {
  const result = calculateWeekCompletion({ ...completeInput, syllabusStatus: { a: "verde", b: "amarelo" } });
  assert.equal(result.criteria.essentialStudied, false);
  assert.equal(result.complete, false);
});

test("less than 80 percent confidence blocks green", () => {
  const result = calculateWeekCompletion({ ...completeInput, questionConfidence: [2, 2, 2, 2, 2, 2, 2, 0, 0, 0] });
  assert.equal(result.criteria.sabatinaReady, false);
  assert.equal(result.complete, false);
});
