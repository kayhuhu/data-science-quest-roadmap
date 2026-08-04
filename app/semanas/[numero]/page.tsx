import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WeekMissionPage } from "@/components/WeekMissionPage";
import { roadmap } from "@/lib/quest-data";

export function generateStaticParams() {
  return roadmap.weeks.map((week) => ({ numero: String(week.number) }));
}

export async function generateMetadata({ params }: { params: Promise<{ numero: string }> }): Promise<Metadata> {
  const { numero } = await params;
  const week = roadmap.weeks[Number(numero) - 1];
  if (!week) return {};
  return {
    title: `Semana ${week.number} — ${week.title}`,
    description: week.objective,
    alternates: { canonical: `/semanas/${week.number}` },
  };
}

export default async function WeekPage({ params }: { params: Promise<{ numero: string }> }) {
  const { numero } = await params;
  const weekNumber = Number(numero);
  if (!Number.isInteger(weekNumber) || weekNumber < 1 || weekNumber > 22) notFound();
  const week = roadmap.weeks[weekNumber - 1];
  if (!week) notFound();
  return <WeekMissionPage week={week} />;
}
