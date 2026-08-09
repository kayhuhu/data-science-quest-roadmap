"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { roadmap, type MasteryStatus, type RoadmapWeek } from "@/lib/quest-data";
import { calculateWeekCompletion } from "@/lib/week-completion.mjs";

export type QuestNote = {
  id: string;
  title: string;
  body: string;
  week: number;
  tags: string[];
  updatedAt: string;
};

export type StudySession = {
  id: string;
  week: number;
  block: string;
  type: string;
  seconds: number;
  createdAt: string;
};

export type ErrorEntry = {
  id: string;
  title: string;
  week: number;
  cause: string;
  correction: string;
  resolved: boolean;
  createdAt: string;
  responseGiven?: string;
  correctResponse?: string;
  conceptualError?: string;
  topic?: string;
  syllabusItem?: string | null;
  nextReview?: string;
};

export type FlashcardState = "new" | "learning" | "due" | "late" | "mastered";

export type ManualFlashcard = {
  id: string;
  front: string;
  back: string;
  block: string;
  week: number;
  syllabusItem: string | null;
  concept: string;
  model: string | null;
  type: string;
  source: "manual";
};

export type WeekEvidence = {
  essentialStudied: boolean;
  practiceComplete: boolean;
  explainReady: boolean;
  useReady: boolean;
  interpretationReady: boolean;
  materialGenerated: boolean;
};

export type QuestWorkspace = {
  version: 1;
  syllabusStatus: Record<string, MasteryStatus>;
  weekStatus: Record<string, MasteryStatus>;
  projectStatus: Record<string, "planejado" | "em-andamento" | "publicado">;
  projectUrls: Record<string, string>;
  projectChecklist?: Record<string, string[]>;
  weekEvidence: Record<string, WeekEvidence>;
  materialPdfs: Record<string, { fileName: string; createdAt: string }>;
  questionConfidence: Record<string, number>;
  savedFlashcards: string[];
  notes: QuestNote[];
  sessions: StudySession[];
  errors: ErrorEntry[];
  reviewedFlashcards: string[];
  flashcardState: Record<string, FlashcardState>;
  manualFlashcards: ManualFlashcard[];
  sabatinaAttempts: Array<{ id: string; week: number; score: number; createdAt: string }>;
  sabatinaTestResults: Record<string, "correct" | "wrong">;
  examDrafts: Record<string, Record<string, number>>;
  examAttempts: Array<{ id: string; assessmentId: string; correct: number; answered: number; total: number; createdAt: string }>;
  xp: number;
  settings: {
    weeklyGoalHours: number;
    pomodoroMinutes: number;
    theme: "dark" | "light";
  };
};

export type QuestXpBreakdown = {
  syllabus: number;
  weeks: number;
  projectSteps: number;
  publishedProjects: number;
  focus: number;
  flashcards: number;
  notes: number;
  errors: number;
  sabatina: number;
  total: number;
};

export function questXpBreakdown(workspace: QuestWorkspace): QuestXpBreakdown {
  const bestSabatinaByWeek = new Map<number, number>();
  for (const attempt of workspace.sabatinaAttempts) {
    bestSabatinaByWeek.set(attempt.week, Math.max(bestSabatinaByWeek.get(attempt.week) ?? 0, attempt.score));
  }
  const breakdown = {
    syllabus: Object.values(workspace.syllabusStatus).filter((status) => status === "verde").length * 25,
    weeks: Object.values(workspace.weekStatus).filter((status) => status === "verde").length * 250,
    projectSteps: Object.values(workspace.projectChecklist ?? {}).reduce((sum, steps) => sum + new Set(steps).size * 10, 0),
    publishedProjects: Object.values(workspace.projectStatus).filter((status) => status === "publicado").length * 200,
    focus: workspace.sessions.reduce((sum, session) => sum + Math.max(5, Math.floor(session.seconds / 150)), 0),
    flashcards: new Set(workspace.reviewedFlashcards).size * 5,
    notes: workspace.notes.length * 5,
    errors: workspace.errors.reduce((sum, error) => sum + 5 + (error.resolved ? 15 : 0), 0),
    sabatina: [...bestSabatinaByWeek.values()].reduce((sum, score) => sum + score * 5, 0),
  };
  return { ...breakdown, total: Object.values(breakdown).reduce((sum, value) => sum + value, 0) };
}

export function calculateQuestXp(workspace: QuestWorkspace) {
  return questXpBreakdown(workspace).total;
}

export const emptyWorkspace: QuestWorkspace = {
  version: 1,
  syllabusStatus: {},
  weekStatus: {},
  projectStatus: {},
  projectUrls: {},
  projectChecklist: {},
  weekEvidence: {},
  materialPdfs: {},
  questionConfidence: {},
  savedFlashcards: [],
  notes: [],
  sessions: [],
  errors: [],
  reviewedFlashcards: [],
  flashcardState: {},
  manualFlashcards: [],
  sabatinaAttempts: [],
  sabatinaTestResults: {},
  examDrafts: {},
  examAttempts: [],
  xp: 0,
  settings: {
    weeklyGoalHours: 10,
    pomodoroMinutes: 25,
    theme: "dark",
  },
};

const LOCAL_WORKSPACE_KEY = "data-science-quest:workspace:v1";

const legacyProjectRepoMigration: Record<string, string> = {
  "eda-carteira-bancaria": "01-banking-portfolio-eda",
  "probabilidade-inferencia-credito": "02-banking-risk-distributions-lab",
  "associacao-algebra-clientes": "04-customer-similarity-linear-algebra",
  "pipeline-limpeza-pandas": "07-banking-data-toolkit",
  "transformacao-pca-features": "06-feature-engineering-pca-selection",
  "laboratorio-validacao-temporal": "09-credit-limit-regression",
  "laboratorio-metricas-validacao": "09-credit-limit-regression",
  "laboratorio-vies-variancia": "09-credit-limit-regression",
  "regressao-gasto-residuos": "09-credit-limit-regression",
  "champion-regressao-severidade": "10-loss-severity-model-benchmark",
  "pd-regressao-logistica": "11-default-propensity-probabilistic-models",
  "naive-bayes-triagem": "11-default-propensity-probabilistic-models",
  "knn-fraude-similaridade": "12-fraud-knn-svm-benchmark",
  "arvores-risco-severidade": "13-credit-risk-ensemble-challenge",
  "svm-risco-kernels": "12-fraud-knn-svm-benchmark",
  "ensembles-risco-credito": "13-credit-risk-ensemble-challenge",
  "segmentacao-clientes-acionavel": "15-customer-segmentation-kmeans",
  "dbscan-anomalias-transacoes": "16-behavior-clustering-anomaly-lab",
  "hierarquico-segmentos-empresas": "16-behavior-clustering-anomaly-lab",
  "gmm-segmentacao-probabilistica": "16-behavior-clustering-anomaly-lab",
  "mart-bancario-sql-pyspark": "08-banking-sql-feature-mart",
  "deep-learning-multimodal-bancario": "14-neural-network-risk-classifier",
  "rag-pln-governado": "18-bank-policy-rag-assistant",
  "otimizacao-mip-grafos": "19-credit-budget-optimization",
};

const projectStatusRank = { planejado: 0, "em-andamento": 1, publicado: 2 } as const;

function isWorkspace(value: unknown): value is QuestWorkspace {
  return Boolean(value && typeof value === "object" && (value as { version?: number }).version === 1);
}

function normalizeWorkspace(value: unknown): QuestWorkspace {
  if (!isWorkspace(value)) return emptyWorkspace;
  const projectStatus = { ...value.projectStatus };
  const projectUrls = { ...value.projectUrls };
  for (const [legacyRepo, currentRepo] of Object.entries(legacyProjectRepoMigration)) {
    const legacyStatus = projectStatus[legacyRepo];
    const currentStatus = projectStatus[currentRepo];
    if (legacyStatus && (!currentStatus || projectStatusRank[legacyStatus] > projectStatusRank[currentStatus])) {
      projectStatus[currentRepo] = legacyStatus;
    }
    if (!projectUrls[currentRepo] && projectUrls[legacyRepo]) projectUrls[currentRepo] = projectUrls[legacyRepo];
  }
  for (const week of roadmap.weeks) {
    const previousKey = String(week.number);
    const repoKey = week.project.repo;
    if (!projectStatus[repoKey] && projectStatus[previousKey]) projectStatus[repoKey] = projectStatus[previousKey];
    if (!projectUrls[repoKey] && projectUrls[previousKey]) projectUrls[repoKey] = projectUrls[previousKey];
    if (previousKey !== repoKey) {
      delete projectStatus[previousKey];
      delete projectUrls[previousKey];
    }
  }
  const normalized: QuestWorkspace = {
    ...emptyWorkspace,
    ...value,
    projectStatus,
    projectUrls,
    projectChecklist: value.projectChecklist ?? {},
    weekEvidence: value.weekEvidence ?? {},
    materialPdfs: value.materialPdfs ?? {},
    questionConfidence: value.questionConfidence ?? {},
    savedFlashcards: value.savedFlashcards ?? [],
    reviewedFlashcards: value.reviewedFlashcards ?? [],
    flashcardState: value.flashcardState ?? {},
    manualFlashcards: value.manualFlashcards ?? [],
    sabatinaAttempts: value.sabatinaAttempts ?? [],
    sabatinaTestResults: value.sabatinaTestResults ?? {},
    examDrafts: value.examDrafts ?? {},
    examAttempts: value.examAttempts ?? [],
    settings: { ...emptyWorkspace.settings, ...value.settings },
  };
  return { ...normalized, xp: calculateQuestXp(normalized) };
}

export function weekCompletionEvidence(workspace: QuestWorkspace, week: RoadmapWeek) {
  const weekKey = String(week.number);
  const evidence = workspace.weekEvidence[weekKey] ?? emptyWorkspace.weekEvidence[weekKey];
  const officialItems = roadmap.syllabus.filter((item) => item.week === week.number && item.contentLevel === "essential");
  return calculateWeekCompletion({
    essentialIds: officialItems.map((item) => item.id),
    syllabusStatus: workspace.syllabusStatus,
    manualEssential: Boolean(evidence?.essentialStudied),
    questionConfidence: week.sabatina.map((_, index) => workspace.questionConfidence[`${week.number}-${index + 1}`] ?? 0),
    practiceComplete: Boolean(evidence?.practiceComplete),
    projectSteps: workspace.projectChecklist?.[weekKey]?.length ?? 0,
    reviewedFlashcards: week.flashcards.filter((card) => workspace.reviewedFlashcards.includes(card.id)).length,
    totalFlashcards: week.flashcards.length,
    explainReady: Boolean(evidence?.explainReady),
    useReady: Boolean(evidence?.useReady),
    interpretationReady: Boolean(evidence?.interpretationReady),
  });
}

export function useQuestWorkspace() {
  const [workspace, setWorkspace] = useState<QuestWorkspace>(emptyWorkspace);
  const [ready, setReady] = useState(true);
  const [saveState, setSaveState] = useState<"saved" | "saving" | "offline">("saving");
  const lastSaved = useRef("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        const serialized = window.localStorage.getItem(LOCAL_WORKSPACE_KEY);
        const stored = serialized ? (JSON.parse(serialized) as unknown) : null;
        const next = normalizeWorkspace(stored);
        setWorkspace(next);
        lastSaved.current = JSON.stringify(next);
        setSaveState("saved");
        setReady(true);
      } catch {
        setSaveState("offline");
        setReady(true);
      }
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const serialized = JSON.stringify(workspace);
    if (serialized === lastSaved.current) return;
    setSaveState("saving");
    const timeout = window.setTimeout(() => {
      try {
        window.localStorage.setItem(LOCAL_WORKSPACE_KEY, serialized);
        lastSaved.current = serialized;
        setSaveState("saved");
      } catch {
        setSaveState("offline");
      }
    }, 600);
    return () => window.clearTimeout(timeout);
  }, [ready, workspace]);

  const update = useCallback((recipe: (current: QuestWorkspace) => QuestWorkspace) => {
    setWorkspace((current) => {
      const next = recipe(current);
      return { ...next, xp: calculateQuestXp(next) };
    });
  }, []);

  const totals = useMemo(() => {
    const studySeconds = workspace.sessions.reduce((sum, session) => sum + session.seconds, 0);
    const greenItems = Object.values(workspace.syllabusStatus).filter((status) => status === "verde").length;
    const publishedProjects = Object.values(workspace.projectStatus).filter(
      (status) => status === "publicado",
    ).length;
    return { studySeconds, greenItems, publishedProjects };
  }, [workspace]);

  return { workspace, setWorkspace, update, ready, saveState, totals };
}
