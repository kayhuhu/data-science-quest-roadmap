import type { MasteryStatus } from "@/lib/quest-data";

export function calculateWeekCompletion(input: {
  essentialIds: string[];
  syllabusStatus: Record<string, MasteryStatus>;
  manualEssential: boolean;
  questionConfidence: number[];
  practiceComplete: boolean;
  projectSteps: number;
  explainReady: boolean;
  useReady: boolean;
  interpretationReady: boolean;
}): {
  criteria: {
    essentialStudied: boolean;
    sabatinaReady: boolean;
    practiceComplete: boolean;
    projectMinimum: boolean;
    explainReady: boolean;
    useReady: boolean;
    interpretationReady: boolean;
  };
  sabatinaRate: number;
  complete: boolean;
};
