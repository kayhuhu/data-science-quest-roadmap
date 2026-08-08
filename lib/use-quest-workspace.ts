"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { roadmap, type MasteryStatus } from "@/lib/quest-data";

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
};

export type QuestWorkspace = {
  version: 1;
  syllabusStatus: Record<string, MasteryStatus>;
  weekStatus: Record<string, MasteryStatus>;
  projectStatus: Record<string, "planejado" | "em-andamento" | "publicado">;
  projectUrls: Record<string, string>;
  projectChecklist?: Record<string, string[]>;
  notes: QuestNote[];
  sessions: StudySession[];
  errors: ErrorEntry[];
  reviewedFlashcards: string[];
  sabatinaAttempts: Array<{ id: string; week: number; score: number; createdAt: string }>;
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
  notes: [],
  sessions: [],
  errors: [],
  reviewedFlashcards: [],
  sabatinaAttempts: [],
  xp: 0,
  settings: {
    weeklyGoalHours: 10,
    pomodoroMinutes: 25,
    theme: "dark",
  },
};

const LOCAL_WORKSPACE_KEY = "data-science-quest:workspace:v1";

function isWorkspace(value: unknown): value is QuestWorkspace {
  return Boolean(value && typeof value === "object" && (value as { version?: number }).version === 1);
}

function normalizeWorkspace(value: unknown): QuestWorkspace {
  if (!isWorkspace(value)) return emptyWorkspace;
  const projectStatus = { ...value.projectStatus };
  const projectUrls = { ...value.projectUrls };
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
    settings: { ...emptyWorkspace.settings, ...value.settings },
  };
  return { ...normalized, xp: calculateQuestXp(normalized) };
}

export function useQuestWorkspace() {
  const [workspace, setWorkspace] = useState<QuestWorkspace>(emptyWorkspace);
  const [ready, setReady] = useState(false);
  const [saveState, setSaveState] = useState<"saved" | "saving" | "offline">("saving");
  const lastSaved = useRef("");

  useEffect(() => {
    let cancelled = false;
    try {
      const serialized = window.localStorage.getItem(LOCAL_WORKSPACE_KEY);
      const stored = serialized ? (JSON.parse(serialized) as unknown) : null;
      const next = normalizeWorkspace(stored);
      queueMicrotask(() => {
        if (cancelled) return;
        setWorkspace(next);
        lastSaved.current = JSON.stringify(next);
        setSaveState("saved");
        setReady(true);
      });
    } catch {
      queueMicrotask(() => {
        if (cancelled) return;
        setSaveState("offline");
        setReady(true);
      });
    }
    return () => { cancelled = true; };
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
