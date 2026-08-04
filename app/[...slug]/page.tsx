import { QuestApp } from "@/components/QuestApp";

const viewByRoute = {
  app: "jornada",
  roadmap: "jornada",
  blocos: "jornada",
  ementa: "ementa",
  estudos: "pomodoro",
  pomodoro: "pomodoro",
  anotacoes: "estudio",
  flashcards: "flashcards",
  sabatina: "sabatina",
  "prova-pratica": "prova",
  projetos: "projetos",
  analytics: "analytics",
  "caderno-de-erros": "erros",
  conquistas: "conquistas",
  configuracoes: "configuracoes",
  portfolio: "projetos",
  login: "configuracoes",
} as const;

export default async function RoutedQuestPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const section = slug[0] ?? "app";
  const initialWeek = section === "semanas" ? Number(slug[1]) : undefined;
  const initialView = section === "semanas"
    ? "jornada"
    : viewByRoute[section as keyof typeof viewByRoute] ?? "jornada";
  return (
    <QuestApp
      initialView={initialView}
      initialWeek={Number.isInteger(initialWeek) && initialWeek! >= 1 && initialWeek! <= 22 ? initialWeek : undefined}
    />
  );
}
