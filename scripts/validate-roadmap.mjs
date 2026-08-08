import roadmap from "../data/roadmap.json" with { type: "json" };

const expected = { weeks: 24, blocks: 13, syllabusItems: 61, projects: 24, questions: 240, answers: 240 };
for (const [key, value] of Object.entries(expected)) {
  if (roadmap.metrics[key] !== value) {
    throw new Error(`Auditoria falhou em ${key}: esperado ${value}, recebido ${roadmap.metrics[key]}`);
  }
}
console.log("Roadmap v14 íntegro:", roadmap.metrics);
