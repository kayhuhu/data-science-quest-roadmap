import roadmapJson from "@/data/roadmap.json";

export type MasteryStatus = "nao-iniciado" | "vermelho" | "amarelo" | "verde" | "revisao";

export type RoadmapWeek = {
  number: number;
  title: string;
  period: string;
  block: string;
  blocks: string[];
  objective: string;
  syllabus: string[];
  content: string[];
  overview: {
    summary: string;
    officialTopics: string[];
    outcomes: string[];
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
  prompts: {
    study: string;
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
  };
  sabatina: Array<{ question: string; answer: string }>;
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
  };
  blocks: Array<{ id: number; title: string; weekNumbers: number[] }>;
  syllabus: Array<{ id: string; text: string; block: string; week: number }>;
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
  const end = new Date("2027-01-17T23:59:59-03:00");
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
