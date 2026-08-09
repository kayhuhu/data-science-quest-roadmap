import assessmentJson from "@/data/assessments.json";

export type AssessmentQuestion = {
  id: string;
  sourceQuestion: number;
  question: string;
  options: string[];
  correctIndex: number;
  topic: string;
  week: number;
  block: string;
  syllabusItem: string | null;
  model: string | null;
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

const inferBlock = (topic: string) => /sql|banco/i.test(topic) ? "BANCO DE DADOS" : /regress/i.test(topic) ? "REGRESSÃO" : /class|árvore|naive|svm|knn/i.test(topic) ? "CLASSIFICAÇÃO" : /cluster|agrup|k-means/i.test(topic) ? "AGRUPAMENTO" : /estat|probab|distrib/i.test(topic) ? "ESTATÍSTICA BÁSICA" : "OUTROS";
const inferModel = (topic: string) => /regressão logística/i.test(topic) ? "Regressão Logística" : /regressão/i.test(topic) ? "Regressão" : /árvore/i.test(topic) ? "Árvore" : /naive/i.test(topic) ? "Naive Bayes" : /svm/i.test(topic) ? "SVM" : /knn/i.test(topic) ? "KNN" : /k-means/i.test(topic) ? "K-means" : null;

type RawAssessment = Omit<Assessment, "questions"> & { questions: Array<Omit<AssessmentQuestion, "block" | "syllabusItem" | "model">> };

export const assessmentBank = (assessmentJson.assessments as RawAssessment[]).map((assessment) => ({
  ...assessment,
  questions: assessment.questions.map((question) => ({ ...question, block: inferBlock(question.topic), syllabusItem: null, model: inferModel(question.topic) })),
})) as Assessment[];

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
