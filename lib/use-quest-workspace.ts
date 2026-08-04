"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MasteryStatus } from "@/lib/quest-data";

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

export const emptyWorkspace: QuestWorkspace = {
  version: 1,
  syllabusStatus: {},
  weekStatus: {},
  projectStatus: {},
  projectUrls: {},
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

function isWorkspace(value: unknown): value is QuestWorkspace {
  return Boolean(value && typeof value === "object" && (value as { version?: number }).version === 1);
}

export function useQuestWorkspace() {
  const [workspace, setWorkspace] = useState<QuestWorkspace>(emptyWorkspace);
  const [ready, setReady] = useState(false);
  const [saveState, setSaveState] = useState<"saved" | "saving" | "offline">("saving");
  const lastSaved = useRef("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/state?kind=workspace&key=main")
      .then(async (response) => {
        if (!response.ok) throw new Error("storage unavailable");
        return (await response.json()) as { records?: Array<{ value: unknown }> };
      })
      .then((data) => {
        if (cancelled) return;
        const stored = data.records?.[0]?.value;
        const next = isWorkspace(stored) ? stored : emptyWorkspace;
        setWorkspace(next);
        lastSaved.current = JSON.stringify(next);
        setSaveState("saved");
      })
      .catch(() => {
        if (!cancelled) setSaveState("offline");
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const serialized = JSON.stringify(workspace);
    if (serialized === lastSaved.current) return;
    setSaveState("saving");
    const timeout = window.setTimeout(() => {
      fetch("/api/state", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "workspace", key: "main", value: workspace }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("save failed");
          lastSaved.current = serialized;
          setSaveState("saved");
        })
        .catch(() => setSaveState("offline"));
    }, 600);
    return () => window.clearTimeout(timeout);
  }, [ready, workspace]);

  const update = useCallback((recipe: (current: QuestWorkspace) => QuestWorkspace) => {
    setWorkspace((current) => recipe(current));
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
