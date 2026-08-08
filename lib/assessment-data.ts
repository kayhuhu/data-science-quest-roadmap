import assessmentJson from "@/data/assessments.json";

export type AssessmentQuestion = {
  id: string;
  sourceQuestion: number;
  question: string;
  options: string[];
  correctIndex: number;
  topic: string;
  week: number;
  rationale: string;
  dataset?: string | null;
};

export type Assessment = {
  id: "prova-itau-1" | "prova-itau-2";
  title: string;
  subtitle: string;
  source: string;
  sourceFormat: string;
  originNote: string;
  questions: AssessmentQuestion[];
};

export const assessmentBank = assessmentJson.assessments as Assessment[];

export const assessmentQuestionCount = assessmentBank.reduce(
  (total, assessment) => total + assessment.questions.length,
  0,
);

export const reconstructedDatasets = [
  { href: "/datasets/classificacao_Q1.csv", label: "classificacao_Q1.csv", use: "Árvore + log loss" },
  { href: "/datasets/classificacao_Q2.csv", label: "classificacao_Q2.csv", use: "Logística + AUC" },
  { href: "/datasets/regressao_Q1.csv", label: "regressao_Q1.csv", use: "Elastic Net + MSE" },
  { href: "/datasets/regressao_Q2.csv", label: "regressao_Q2.csv", use: "SVR linear + MSE" },
  { href: "/datasets/agrupamento.csv", label: "agrupamento.csv", use: "Hierárquico + silhueta" },
] as const;
