import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const sourcePath = resolve("data/roadmap-v12.md");
const outputPath = resolve("data/roadmap.json");
const source = (await readFile(sourcePath, "utf8")).replace(/\r\n/g, "\n");

const [weeksSource, answersSource = ""] = source.split("# Dicionário completo de respostas");

function section(body, heading) {
  const marker = `### ${heading}`;
  const start = body.indexOf(marker);
  if (start < 0) return "";
  const contentStart = start + marker.length;
  const rest = body.slice(contentStart);
  const next = rest.search(/\n###\s|\n##\s|\n#\s/);
  return (next < 0 ? rest : rest.slice(0, next)).trim();
}

function cleanInline(value) {
  return value
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function bullets(value) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^[-*]\s+/.test(line))
    .map((line) => cleanInline(line.replace(/^[-*]\s+/, "").replace(/^□\s*/, "")));
}

function numbered(value) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\d+\.\s+/.test(line))
    .map((line) => cleanInline(line.replace(/^\d+\.\s+/, "")));
}

const expectedAnswers = new Map();
const answerWeekMatches = [...answersSource.matchAll(/^## Semana (\d+) - .*$/gm)];
for (let index = 0; index < answerWeekMatches.length; index += 1) {
  const match = answerWeekMatches[index];
  const weekNumber = Number(match[1]);
  const start = match.index + match[0].length;
  const end = answerWeekMatches[index + 1]?.index ?? answersSource.length;
  const body = answersSource.slice(start, end);
  const questionMatches = [...body.matchAll(/^### (\d+)\.\s+(.+)$/gm)];
  const answers = [];
  for (let questionIndex = 0; questionIndex < questionMatches.length; questionIndex += 1) {
    const questionMatch = questionMatches[questionIndex];
    const answerStart = questionMatch.index + questionMatch[0].length;
    const answerEnd = questionMatches[questionIndex + 1]?.index ?? body.length;
    answers.push({
      number: Number(questionMatch[1]),
      question: cleanInline(questionMatch[2]),
      answer: cleanInline(body.slice(answerStart, answerEnd).replace(/\n+/g, " ")),
    });
  }
  expectedAnswers.set(weekNumber, answers);
}

const weekMatches = [...weeksSource.matchAll(/^## Semana (\d+) - (.+)$/gm)];
const weeks = [];

for (let index = 0; index < weekMatches.length; index += 1) {
  const match = weekMatches[index];
  const number = Number(match[1]);
  const title = cleanInline(match[2]);
  const start = match.index + match[0].length;
  const end = weekMatches[index + 1]?.index ?? weeksSource.length;
  const body = weeksSource.slice(start, end).trim();
  const period = cleanInline(body.match(/\*\*Período:\*\*\s*([^\n]+)/)?.[1] ?? "");
  const block = cleanInline(body.match(/\*\*Bloco:\*\*\s*([^\n]+)/)?.[1] ?? "").replace(/^BLOCO\s+\d+\s+-\s+/, "");
  const projectHeading = body.match(/### Projeto GitHub - `([^`]+)`/);
  const projectBody = section(body, projectHeading ? `Projeto GitHub - \`${projectHeading[1]}\`` : "Projeto GitHub");
  const projectTitle = cleanInline(projectBody.match(/\*\*Projeto:\*\*\s*([^\n]+)/)?.[1] ?? title);
  const projectObjective = cleanInline(projectBody.match(/\*\*Objetivo:\*\*\s*([^\n]+)/)?.[1] ?? "");
  const deliverablesStart = projectBody.indexOf("**Entregas:**");
  const deliverables = deliverablesStart >= 0 ? bullets(projectBody.slice(deliverablesStart + 12)) : [];
  const questions = numbered(section(body, "Sabatina"));
  const answers = expectedAnswers.get(number) ?? [];

  weeks.push({
    number,
    title,
    period,
    block,
    objective: cleanInline(section(body, "Objetivo").replace(/\n+/g, " ")),
    syllabus: bullets(section(body, "Ementa oficial")),
    content: bullets(section(body, "Conteúdo")),
    materials: bullets(section(body, "Materiais")),
    videos: bullets(section(body, "Vídeos")),
    project: {
      repo: projectHeading?.[1] ?? "",
      title: projectTitle,
      objective: projectObjective,
      deliverables,
    },
    sabatina: questions.map((question, questionIndex) => ({
      question,
      answer: answers[questionIndex]?.answer ?? "",
    })),
  });
}

const blocks = [...new Set(weeks.map((week) => week.block))].map((title, index) => ({
  id: index + 1,
  title,
  weekNumbers: weeks.filter((week) => week.block === title).map((week) => week.number),
}));

const syllabus = [];
const seenSyllabus = new Set();
for (const week of weeks) {
  for (const item of week.syllabus) {
    const key = item.toLocaleLowerCase("pt-BR");
    if (item === "Nenhum item novo." || seenSyllabus.has(key)) continue;
    seenSyllabus.add(key);
    syllabus.push({
      id: `ementa-${String(syllabus.length + 1).padStart(3, "0")}`,
      text: item,
      block: week.block,
      week: week.number,
    });
  }
}

const result = {
  sourceVersion: "roadmap-v12",
  syllabusVersion: "itau-data-scientist-original",
  metrics: {
    weeks: weeks.length,
    blocks: blocks.length,
    syllabusItems: syllabus.length,
    projects: weeks.filter((week) => week.project.repo).length,
    questions: weeks.reduce((sum, week) => sum + week.sabatina.length, 0),
    answers: weeks.reduce(
      (sum, week) => sum + week.sabatina.filter((item) => item.answer).length,
      0,
    ),
  },
  blocks,
  syllabus,
  weeks,
};

await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify(result.metrics));

if (
  result.metrics.weeks !== 22 ||
  result.metrics.projects !== 22 ||
  result.metrics.questions !== 220 ||
  result.metrics.answers !== 220
) {
  process.exitCode = 1;
}
