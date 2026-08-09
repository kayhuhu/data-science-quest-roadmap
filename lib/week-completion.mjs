/** Regra pura e auditável para concluir uma semana. Conteúdo opcional não entra no cálculo. */
export function calculateWeekCompletion(input) {
  const essentialStudied = input.essentialIds.length
    ? input.essentialIds.every((id) => input.syllabusStatus[id] === "verde")
    : Boolean(input.manualEssential);
  const confidentAnswers = input.questionConfidence.filter((value) => value >= 2).length;
  const sabatinaRate = input.questionConfidence.length ? confidentAnswers / input.questionConfidence.length : 0;
  const criteria = {
    essentialStudied,
    sabatinaReady: sabatinaRate >= 0.8,
    practiceComplete: Boolean(input.practiceComplete),
    projectMinimum: input.projectSteps >= 3,
    flashcardsReviewed: input.totalFlashcards > 0 && input.reviewedFlashcards >= input.totalFlashcards,
    explainReady: Boolean(input.explainReady),
    useReady: Boolean(input.useReady),
    interpretationReady: Boolean(input.interpretationReady),
  };
  return { criteria, sabatinaRate, complete: Object.values(criteria).every(Boolean) };
}
