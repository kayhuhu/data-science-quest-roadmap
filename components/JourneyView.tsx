"use client";

import {
  ArrowRight,
  BrainCircuit,
  Clock3,
  ExternalLink,
  FolderGit2,
  MessageCircleQuestion,
  NotebookPen,
  Play,
  Sparkles,
  Target,
  TimerReset,
} from "lucide-react";
import { blockPalette, currentRoadmapWeek, roadmap, type RoadmapWeek } from "@/lib/quest-data";
import type { QuestWorkspace } from "@/lib/use-quest-workspace";

type JourneyViewProps = {
  workspace: QuestWorkspace;
  studySeconds: number;
  greenItems: number;
  onOpenWeek: (week: RoadmapWeek) => void;
  onNavigate: (view: string) => void;
  onStartFocus: () => void;
};

const quickActions = [
  { id: "pomodoro", label: "Iniciar foco", hint: "25 min", icon: Play },
  { id: "estudio", label: "Nova anotação", hint: "Markdown + LaTeX", icon: NotebookPen },
  { id: "flashcards", label: "Revisar cards", hint: "repetição espaçada", icon: BrainCircuit },
  { id: "sabatina", label: "Treinar sabatina", hint: "resposta em voz alta", icon: MessageCircleQuestion },
];

const productStack = ["CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vercel", "GitHub"];

export function JourneyView({
  workspace,
  studySeconds,
  greenItems,
  onOpenWeek,
  onNavigate,
  onStartFocus,
}: JourneyViewProps) {
  const currentWeekNumber = currentRoadmapWeek();
  const currentWeek = roadmap.weeks[currentWeekNumber - 1];
  const completedWeeks = Object.values(workspace.weekStatus).filter((status) => status === "verde").length;
  const publishedProjects = Object.values(workspace.projectStatus).filter((status) => status === "publicado").length;
  const studyHours = Math.floor(studySeconds / 3600);
  const rows = Array.from({ length: 4 }, (_, index) => roadmap.weeks.slice(index * 6, index * 6 + 6));

  return (
    <div className="view-stack journey-view journey-clean">
      <section className="journey-hero journey-hero-clean">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={14} /> JORNADA 2026 · 22 SEMANAS</span>
          <h1>Seu mapa para<br /><em>dominar e defender.</em></h1>
          <p>Escolha uma semana para abrir, em uma nova aba, o plano de estudo, a ementa oficial e o projeto completo.</p>
        </div>
        <article className="hero-current-week">
          <header><span>AGORA</span><strong>Semana {currentWeek.number}</strong></header>
          <small>{currentWeek.block}</small>
          <h2>{currentWeek.title}</h2>
          <p>{currentWeek.objective}</p>
          <button className="primary-button" onClick={() => onOpenWeek(currentWeek)}>Abrir plano da semana <ExternalLink size={15} /></button>
        </article>
      </section>

      <section className="journey-overview" aria-label="Resumo do progresso">
        <article><Target size={17} /><span><strong>{greenItems}/72</strong> itens verdes</span></article>
        <article><Clock3 size={17} /><span><strong>{studyHours}h</strong> de estudo</span></article>
        <article><FolderGit2 size={17} /><span><strong>{publishedProjects}/22</strong> projetos</span></article>
        <article><Sparkles size={17} /><span><strong>{completedWeeks}/22</strong> semanas verdes</span></article>
        <button onClick={onStartFocus}><TimerReset size={16} /> Foco de 25 min</button>
      </section>

      <section className="section-heading roadmap-heading-clean">
        <div><span className="eyebrow muted">MAPA DA JORNADA</span><h2>Clique em uma semana para abrir a central completa.</h2></div>
        <button className="text-button" onClick={() => onNavigate("ementa")}>Ver ementa completa <ArrowRight size={15} /></button>
      </section>

      <section className="quest-board quest-board-clean" aria-label="Roadmap de 22 semanas">
        <div className="board-skyline" aria-hidden="true"><span>Fundamentos</span><span>Modelagem</span><span>Inteligência</span><span>Consolidação</span></div>
        <div className="road-rows">
          {rows.map((row, rowIndex) => (
            <div className={`road-row ${rowIndex % 2 ? "reverse" : ""}`} key={rowIndex}>
              {row.map((week) => {
                const savedStatus = workspace.weekStatus[String(week.number)];
                const status = savedStatus ?? (week.number === currentWeekNumber ? "atual" : week.number < currentWeekNumber ? "disponivel" : "bloqueada");
                const color = blockPalette[week.block] ?? "#4dd7fa";
                return (
                  <button className={`week-node status-${status}`} style={{ "--node-color": color } as React.CSSProperties} key={week.number} onClick={() => onOpenWeek(week)} aria-label={`Abrir Semana ${week.number}: ${week.title} em nova aba`}>
                    <span className="node-beacon">{week.number === currentWeekNumber && <span className="avatar-dot"><Sparkles size={13} /></span>}<b>{week.number}</b></span>
                    <span className="node-copy"><small>{week.block}</small><strong>{week.title}</strong></span>
                    <ExternalLink className="node-open-icon" size={12} />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="board-legend"><span><i className="legend-current" /> Atual</span><span><i className="legend-open" /> Disponível</span><span><i className="legend-green" /> Verde</span><span><i className="legend-locked" /> Próxima</span></div>
      </section>

      <section className="journey-tools-clean">
        <div className="quick-action-grid quick-action-clean">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return <button key={action.id} className="quick-card" onClick={() => action.id === "pomodoro" ? onStartFocus() : onNavigate(action.id)}><Icon size={18} /><span><strong>{action.label}</strong><small>{action.hint}</small></span><ArrowRight size={14} /></button>;
          })}
        </div>
        <div className="stack-ribbon"><span>STACK</span>{productStack.map((technology) => <b key={technology}>{technology}</b>)}</div>
      </section>
    </div>
  );
}
