import roadmapJson from "@/data/roadmap.json";

export type MasteryStatus = "nao-iniciado" | "vermelho" | "amarelo" | "verde" | "revisao";
export type ContentLevel = "essential" | "important" | "good_to_know" | "optional";

export type WeeklyFlashcard = {
  id: string;
  front: string;
  back: string;
  block: string;
  week: number;
  syllabusItem: string | null;
  concept: string;
  model: string | null;
  type: string;
  source: string;
};

export type RoadmapWeek = {
  number: number;
  title: string;
  period: string;
  block: string;
  blocks: string[];
  objective: string;
  whyThisMatters: string;
  dataScienceUse: string[];
  bankingContext: string;
  syllabus: string[];
  content: string[];
  studyScope: {
    concepts: string[];
    map: Array<{ name: string; what: string; why: string; banking: string; more: string }>;
    context: string[];
    exclusions: string[];
    appliedEvaluation: string[];
    crossReferences: Array<{ item: string; label: string }>;
  };
  overview: {
    summary: string;
    officialTopics: string[];
    outcomes: string[];
  };
  pedagogy: {
    learningSections: Array<{
      id: string;
      officialItemId: string | null;
      title: string;
      contentLevel: ContentLevel;
    }>;
    levels: Array<{ contentLevel: ContentLevel; label: string; items: string[] }>;
    completionCriteria: string[];
  };
  practice: {
    exercises: string[];
    codeExamples: Array<{ language: string; title: string; code: string }>;
    tasks: string[];
    examPractice: string;
    notebook: string;
  };
  miniLab: {
    title: string;
    objective: string;
    duration: string;
    kind: string;
    steps: string[];
    starterAssets: Array<{
      label: string;
      type: "csv" | "json" | "sql" | "sqlite" | "txt" | "md" | "ipynb" | "parquet";
      url: string;
      description: string;
    }>;
    practicePrompt: string;
    files: string[];
    readmeQuestions: string[];
    gitFlow: string[];
  };
  theoryAndBanking: {
    foundations: Array<{ title: string; body: string }>;
    mathematics: { latex: string; explanation: string };
    validation: string[];
    banking: {
      explanation: string;
      cases: Array<{ title: string; scenario: string; businessValue: string }>;
    };
  };
  resources: {
    books: string[];
    videos: string[];
    articles: string[];
  };
  materialsGuide: {
    primary: { name: string; reason: string; kind: string };
    books: Array<{ name: string; reason: string; kind: string }>;
    videos: Array<{ name: string; reason: string; level: string }>;
    complementary: Array<{ name: string; reason: string; kind: string }>;
  };
  prompts: {
    study: string;
    practice: string;
    sabatina: string;
  };
  materials: string[];
  videos: string[];
  project: {
    repo: string;
    title: string;
    objective: string;
    deliverables: string[];
    learningOutcomes: string[];
    portfolioMilestone: boolean;
  };
  sabatina: Array<{
    id: string;
    question: string;
    answer: string;
    block: string;
    week: number;
    syllabusItem: string | null;
    topic: string;
    model: string | null;
    questionType: string;
    source: string;
    sourceLabel: string;
    difficulty: string;
  }>;
  flashcards: WeeklyFlashcard[];
};

export type RoadmapData = {
  sourceVersion: string;
  syllabusVersion: string;
  metrics: {
    weeks: number;
    blocks: number;
    syllabusItems: number;
    projects: number;
    questions: number;
    answers: number;
    flashcards: number;
  };
  blocks: Array<{ id: number; title: string; weekNumbers: number[] }>;
  syllabus: Array<{
    id: string;
    text: string;
    block: string;
    week: number;
    coverageWeeks: number[];
    crossReference: string | null;
    contentLevel: ContentLevel;
    coveragePillars: string[];
  }>;
  weeks: RoadmapWeek[];
};

export const roadmap = roadmapJson as RoadmapData;

export const blockPalette: Record<string, string> = {
  PROGRAMAÇÃO: "#c084fc",
  "ESTATÍSTICA BÁSICA": "#4dd7fa",
  ÁLGEBRA: "#8b5cf6",
  "AVALIAÇÃO DE MODELOS": "#fbbf24",
  "DATA PREP": "#34d399",
  "BANCO DE DADOS": "#fb923c",
  CLASSIFICAÇÃO: "#fb7185",
  REGRESSÃO: "#f59e0b",
  AGRUPAMENTO: "#a78bfa",
  "IA GENERATIVA": "#60a5fa",
  "PESQUISA OPERACIONAL": "#fdba74",
  "PROGRAMAÇÃO INTEIRA": "#f97316",
  "MIP (MIXED INTEGER PROGRAM)": "#e879f9",
  OUTROS: "#38bdf8",
  CONSOLIDAÇÃO: "#34d399",
};

export function currentRoadmapWeek(today = new Date()) {
  const isoDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(today);
  const date = new Date(`${isoDate}T12:00:00-03:00`);
  const start = new Date("2026-08-03T00:00:00-03:00");
  const end = new Date("2026-12-31T23:59:59-03:00");
  if (date < start) return 1;
  if (date > end) return roadmap.weeks.length;
  const day = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
  return Math.min(roadmap.weeks.length, Math.floor(day / 7) + 1);
}

export function statusLabel(status: MasteryStatus) {
  return {
    "nao-iniciado": "Não iniciado",
    vermelho: "Vermelho",
    amarelo: "Amarelo",
    verde: "Verde",
    revisao: "Em revisão",
  }[status];
}

export function nextMasteryStatus(status: MasteryStatus): MasteryStatus {
  const order: MasteryStatus[] = ["nao-iniciado", "vermelho", "amarelo", "verde", "revisao"];
  return order[(order.indexOf(status) + 1) % order.length];
}
