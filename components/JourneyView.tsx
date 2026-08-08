"use client";

import {
  Atom,
  ArrowRight,
  BookOpen,
  Braces,
  BrainCircuit,
  Clock3,
  Code2,
  FileCode2,
  Flame,
  FolderGit2,
  GitFork,
  Layers3,
  MessageCircleQuestion,
  NotebookPen,
  Play,
  Sparkles,
  Target,
  TimerReset,
  Triangle,
} from "lucide-react";
import { blockPalette, currentRoadmapWeek, roadmap, type RoadmapWeek } from "@/lib/quest-data";
import { realSabatinaForWeek, realSabatinaQuestions } from "@/lib/real-sabatina";
import type { QuestWorkspace } from "@/lib/use-quest-workspace";

type JourneyViewProps = {
  workspace: QuestWorkspace;
  studySeconds: number;
  greenItems: number;
  onSelectWeek: (week: RoadmapWeek) => void;
  onNavigate: (view: string) => void;
  onStartFocus: () => void;
};

const quickActions = [
  { id: "pomodoro", label: "Iniciar foco", hint: "25 min", icon: Play, accent: "cyan" },
  { id: "estudio", label: "Nova anotação", hint: "Markdown + LaTeX", icon: NotebookPen, accent: "violet" },
  { id: "flashcards", label: "Revisar cards", hint: `${roadmap.metrics.questions + realSabatinaQuestions.length} disponíveis`, icon: BrainCircuit, accent: "green" },
  { id: "sabatina", label: "Treinar sabatina", hint: "Resposta em voz alta", icon: MessageCircleQuestion, accent: "coral" },
];

const productStack = [
  { label: "CSS", detail: "Interface e responsividade", icon: Braces, tone: "css" },
  { label: "JavaScript", detail: "Interações", icon: Code2, tone: "javascript" },
  { label: "TypeScript", detail: "Código seguro", icon: FileCode2, tone: "typescript" },
  { label: "React", detail: "Componentes", icon: Atom, tone: "react" },
  { label: "Next.js", detail: "Aplicação full-stack", icon: Layers3, tone: "next" },
  { label: "Vercel", detail: "Deploy contínuo", icon: Triangle, tone: "vercel" },
  { label: "GitHub", detail: "Código versionado", icon: GitFork, tone: "github" },
] as const;

export function JourneyView({ workspace, studySeconds, greenItems, onSelectWeek, onNavigate, onStartFocus }: JourneyViewProps) {
  const currentWeekNumber = currentRoadmapWeek();
  const currentWeek = roadmap.weeks[currentWeekNumber - 1];
  const completedWeeks = Object.values(workspace.weekStatus).filter((status) => status === "verde").length;
  const hours = Math.floor(studySeconds / 3600);
  const minutes = Math.floor((studySeconds % 3600) / 60);
  const goalMinutes = workspace.settings.weeklyGoalHours * 60;
  const studyMinutes = Math.floor(studySeconds / 60);
  const goalPercent = Math.min(100, Math.round((studyMinutes / Math.max(goalMinutes, 1)) * 100));
  const rows = Array.from({ length: 4 }, (_, index) => roadmap.weeks.slice(index * 6, index * 6 + 6));

  return (
    <div className="view-stack journey-view">
      <section className="journey-hero">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={14} /> EXPEDIÇÃO 2026 · SEMANA {currentWeekNumber}</span>
          <h1>Sua jornada para<br /><em>defender decisões.</em></h1>
          <p>{roadmap.metrics.weeks} semanas na ordem do planejamento para transformar a ementa do Itaú em domínio prático, portfólio público e segurança na sabatina.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => onSelectWeek(currentWeek)}>Continuar missão <ArrowRight size={17} /></button>
            <button className="secondary-button" onClick={onStartFocus}><TimerReset size={17} /> Foco de 25 min</button>
          </div>
        </div>
        <div className="hero-orbit" aria-label={`${completedWeeks} de ${roadmap.metrics.weeks} semanas concluídas`}>
          <div className="orbit-ring" style={{ "--orbit-progress": `${(completedWeeks / roadmap.metrics.weeks) * 360}deg` } as React.CSSProperties}>
            <div className="orbit-core"><span>{completedWeeks}</span><small>de {roadmap.metrics.weeks}</small></div>
          </div>
          <div className="orbit-label"><Target size={15} /> progresso por domínio</div>
        </div>
      </section>

      <section className="mission-strip" aria-label="Resumo da missão">
        <div className="mission-stat"><span className="stat-icon cyan"><Target size={18} /></span><div><strong>{greenItems}<small>/{roadmap.metrics.syllabusItems}</small></strong><span>itens verdes</span></div></div>
        <div className="mission-stat"><span className="stat-icon violet"><Clock3 size={18} /></span><div><strong>{hours}h {minutes.toString().padStart(2, "0")}m</strong><span>tempo focado</span></div></div>
        <div className="mission-stat"><span className="stat-icon coral"><Flame size={18} /></span><div><strong>{workspace.sessions.length ? 1 : 0} dia</strong><span>sequência atual</span></div></div>
        <div className="mission-stat"><span className="stat-icon green"><FolderGit2 size={18} /></span><div><strong>{Object.values(workspace.projectStatus).filter((status) => status === "publicado").length}<small>/{roadmap.metrics.projects}</small></strong><span>projetos publicados</span></div></div>
        <div className="xp-stat" title="XP recalculado a partir das evidências salvas; ações repetidas não duplicam pontos."><span>NÍVEL {Math.floor(workspace.xp / 500) + 1}</span><strong>{workspace.xp} XP</strong><div className="mini-progress"><i style={{ width: `${workspace.xp % 500 / 5}%` }} /></div></div>
      </section>

      <section className="section-heading">
        <div><span className="eyebrow muted">MAPA DA EXPEDIÇÃO</span><h2>{roadmap.metrics.weeks} missões. Uma evolução contínua.</h2></div>
        <button className="text-button" onClick={() => onNavigate("ementa")}>Ver ementa completa <ArrowRight size={15} /></button>
      </section>

      <section className="roadmap-layout">
        <div className="quest-board" aria-label={`Roadmap de ${roadmap.metrics.weeks} semanas`}>
          <div className="board-skyline" aria-hidden="true"><span>Fundamentos</span><span>Modelagem</span><span>Inteligência</span><span>Consolidação</span></div>
          <div className="road-rows">
            {rows.map((row, rowIndex) => (
              <div className={`road-row ${rowIndex % 2 ? "reverse" : ""}`} key={rowIndex}>
                {row.map((week) => {
                  const savedStatus = workspace.weekStatus[String(week.number)];
                  const status = savedStatus ?? (week.number === currentWeekNumber ? "atual" : week.number < currentWeekNumber ? "disponivel" : "bloqueada");
                  const color = blockPalette[week.block] ?? "#4dd7fa";
                  return (
                    <button className={`week-node status-${status}`} style={{ "--node-color": color } as React.CSSProperties} key={week.number} onClick={() => onSelectWeek(week)} aria-label={`Semana ${week.number}: ${week.title}`}>
                      <span className="node-beacon">{week.number === currentWeekNumber && <span className="avatar-dot"><Sparkles size={13} /></span>}<b>{week.number}</b></span>
                      <span className="node-copy"><small>{week.block}</small><strong>{week.title}</strong></span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="board-legend"><span><i className="legend-current" /> Atual</span><span><i className="legend-open" /> Disponível</span><span><i className="legend-green" /> Verde</span><span><i className="legend-locked" /> Próxima</span></div>
        </div>

        <aside className="current-mission-card">
          <div className="mission-card-top"><span>MISSÃO ATUAL</span><b>SEMANA {currentWeek.number}</b></div>
          <div className="mission-color" style={{ background: blockPalette[currentWeek.block] }} />
          <small>{currentWeek.block}</small><h3>{currentWeek.title}</h3><p>{currentWeek.objective}</p>
          <div className="mission-goal"><div><span>Meta semanal</span><strong>{Math.floor(studyMinutes / 60)}h de {workspace.settings.weeklyGoalHours}h</strong></div><div className="wide-progress"><i style={{ width: `${goalPercent}%` }} /></div></div>
          <div className="mission-checklist"><span><BookOpen size={15} /> {currentWeek.content.length} tópicos</span><span><MessageCircleQuestion size={15} /> {currentWeek.sabatina.length + realSabatinaForWeek(currentWeek.number).length} perguntas</span><span><FolderGit2 size={15} /> {currentWeek.project.title}</span></div>
          <button className="primary-button full" onClick={() => onSelectWeek(currentWeek)}>Abrir central da semana <ArrowRight size={16} /></button>
        </aside>
      </section>

      <section className="section-heading compact"><div><span className="eyebrow muted">ATALHOS</span><h2>O que você quer avançar agora?</h2></div></section>
      <section className="quick-action-grid">
        {quickActions.map((action) => { const Icon = action.icon; return <button key={action.id} className="quick-card" onClick={() => action.id === "pomodoro" ? onStartFocus() : onNavigate(action.id)}><span className={`quick-icon ${action.accent}`}><Icon size={21} /></span><span><strong>{action.label}</strong><small>{action.hint}</small></span><ArrowRight size={17} /></button>; })}
      </section>

      <section className="stack-showcase" aria-labelledby="stack-title">
        <header><div><span className="eyebrow muted">STACK DO PRODUTO</span><h2 id="stack-title">Tecnologia visível, código aberto.</h2></div><p>Uma base moderna para estudar todos os dias e evoluir o projeto no GitHub.</p></header>
        <div className="stack-grid">{productStack.map((technology) => { const Icon = technology.icon; return <article className={`stack-card tone-${technology.tone}`} key={technology.label}><span><Icon size={20} /></span><div><strong>{technology.label}</strong><small>{technology.detail}</small></div></article>; })}</div>
      </section>
    </div>
  );
}
