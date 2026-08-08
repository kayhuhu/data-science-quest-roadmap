import roadmap from "../data/roadmap.json" with { type: "json" };

const expected = { weeks: 22, blocks: 13, syllabusItems: 61, projects: 22, questions: 220, answers: 220 };
for (const [key, value] of Object.entries(expected)) {
  if (roadmap.metrics[key] !== value) {
    throw new Error(`Auditoria falhou em ${key}: esperado ${value}, recebido ${roadmap.metrics[key]}`);
  }
}
console.log("Roadmap v13 íntegro:", roadmap.metrics);
