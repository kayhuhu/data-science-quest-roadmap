import roadmapJson from "@/data/roadmap.json";

export type MasteryStatus = "nao-iniciado" | "vermelho" | "amarelo" | "verde" | "revisao";

export type RoadmapWeek = {
  number: number;
  title: string;
  period: string;
  block: string;
  objective: string;
  syllabus: string[];
  content: string[];
  materials: string[];
  videos: string[];
  project: {
    repo: string;
    title: string;
    objective: string;
    deliverables: string[];
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
  "ESTATÍSTICA BÁSICA": "#4dd7fa",
  ÁLGEBRA: "#8b5cf6",
  "DATA PREP": "#34d399",
  PROGRAMAÇÃO: "#c084fc",
  "BANCO DE DADOS": "#fb923c",
  "REGRESSÃO + AVALIAÇÃO": "#fbbf24",
  "CLASSIFICAÇÃO + AVALIAÇÃO": "#fb7185",
  "AGRUPAMENTO + AVALIAÇÃO": "#a78bfa",
  "IA GENERATIVA": "#60a5fa",
  "PESQUISA OPERACIONAL, PROGRAMAÇÃO INTEIRA E MIP": "#fdba74",
  OUTROS: "#a3e635",
  CONSOLIDAÇÃO: "#94a3b8",
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
  if (date > end) return 22;
  const day = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
  return Math.min(22, Math.floor(day / 7) + 1);
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
