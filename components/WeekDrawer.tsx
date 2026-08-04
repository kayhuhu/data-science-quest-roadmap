"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  BookOpenCheck,
  Check,
  CheckCircle2,
  Circle,
  Clock3,
  ExternalLink,
  FolderGit2,
  ListChecks,
  MessageCircleQuestion,
  NotebookPen,
  Play,
  Target,
  X,
} from "lucide-react";
import { ProjectGuidePanel } from "@/components/ProjectGuidePanel";
import { getProjectGuide } from "@/lib/project-guides";
import {
  blockPalette,
  nextMasteryStatus,
  roadmap,
  statusLabel,
  type MasteryStatus,
  type RoadmapWeek,
} from "@/lib/quest-data";
import type { QuestWorkspace } from "@/lib/use-quest-workspace";

type WeekDrawerProps = {
  week: RoadmapWeek | null;
  workspace: QuestWorkspace;
  onClose: () => void;
  onUpdate: (recipe: (current: QuestWorkspace) => QuestWorkspace) => void;
  onNavigate: (view: string) => void;
  onSelectWeek: (week: RoadmapWeek) => void;
};

const tabs = ["Visão geral", "Plano de 7 dias", "Ementa", "Conteúdo", "Materiais", "Projeto completo", "Sabatina"] as const;

function splitIntoStudyDays(week: RoadmapWeek) {
  const chunks = [week.content.slice(0, 2), week.content.slice(2, 4), week.content.slice(4, 6), week.content.slice(6)];
  return [
    { day: "Dia 1", focus: "Diagnóstico", tasks: [week.objective, ...week.syllabus.map((item) => `Avaliar domínio: ${item}`)] },
    { day: "Dia 2", focus: "Fundamentos", tasks: chunks[0] },
    { day: "Dia 3", focus: "Conexões e fórmulas", tasks: chunks[1] },
    { day: "Dia 4", focus: "Aplicação guiada", tasks: chunks[2] },
    { day: "Dia 5", focus: "Prática", tasks: chunks[3].length ? chunks[3] : ["Resolver exercícios e explicar os conceitos sem consultar."] },
    { day: "Dia 6", focus: "Projeto", tasks: [`Executar as etapas iniciais de “${week.project.title}”.`, "Registrar decisões, testes e evidências no repositório."] },
    { day: "Dia 7", focus: "Defesa e revisão", tasks: ["Responder as dez perguntas da sabatina antes de revelar as respostas.", "Revisar erros, finalizar o README e atualizar o domínio da semana."] },
  ];
}

function videoData(item: string) {
  const url = item.match(/\((https?:\/\/[^)]+)\)/)?.[1];
  return { label: item.replace(/\s*\(https?:.*$/, ""), url };
}

export function WeekDrawer({ week, workspace, onClose, onUpdate, onNavigate, onSelectWeek }: WeekDrawerProps) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Visão geral");
  const [revealed, setRevealed] = useState<number | null>(null);
  const guide = useMemo(() => week ? getProjectGuide(week) : null, [week]);
  const studyDays = useMemo(() => week ? splitIntoStudyDays(week) : [], [week]);
  if (!week || !guide) return null;

  const weekKey = String(week.number);
  const status = workspace.weekStatus[weekKey] ?? "nao-iniciado";
  const checkedSteps = workspace.projectChecklist?.[weekKey] ?? [];
  const color = blockPalette[week.block] ?? "#4dd7fa";
  const previousWeek = week.number > 1 ? roadmap.weeks[week.number - 2] : null;
  const nextWeek = week.number < roadmap.weeks.length ? roadmap.weeks[week.number] : null;

  const setStatus = (next: MasteryStatus) => {
    onUpdate((current) => ({
      ...current,
      weekStatus: { ...current.weekStatus, [weekKey]: next },
      xp: current.xp + (next === "verde" && status !== "verde" ? 250 : 0),
    }));
  };

  const cycleSyllabusStatus = (text: string) => {
    const item = roadmap.syllabus.find((candidate) => candidate.week === week.number && candidate.text === text);
    if (!item) return;
    onUpdate((current) => {
      const previous = current.syllabusStatus[item.id] ?? "nao-iniciado";
      const next = nextMasteryStatus(previous);
      return {
        ...current,
        syllabusStatus: { ...current.syllabusStatus, [item.id]: next },
        xp: current.xp + (next === "verde" && previous !== "verde" ? 25 : 0),
      };
    });
  };

  return (
    <div className="drawer-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="week-drawer week-drawer-complete" role="dialog" aria-modal="true" aria-label={`Central da Semana ${week.number}`}>
        <button className="icon-button drawer-close" onClick={onClose} aria-label="Fechar"><X size={20} /></button>

        <header className="drawer-header drawer-header-complete" style={{ "--week-color": color } as React.CSSProperties}>
          <div className="drawer-week-number"><span>SEMANA</span><strong>{week.number.toString().padStart(2, "0")}</strong></div>
          <div className="drawer-week-copy">
            <span className="eyebrow" style={{ color }}>{week.block}</span>
            <h2>{week.title}</h2>
            <p>{week.period}</p>
          </div>
          <div className="drawer-week-navigation" aria-label="Navegar entre semanas">
            <button disabled={!previousWeek} onClick={() => previousWeek && onSelectWeek(previousWeek)}><ArrowLeft size={15} /><span>Anterior</span></button>
            <strong>{week.number} / 22</strong>
            <button disabled={!nextWeek} onClick={() => nextWeek && onSelectWeek(nextWeek)}><span>Próxima</span><ArrowRight size={15} /></button>
          </div>
        </header>

        <nav className="drawer-tabs" aria-label="Seções da semana">
          {tabs.map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}{item === "Projeto completo" && <small>{checkedSteps.length}/{guide.steps.length}</small>}</button>)}
        </nav>

        <div className="drawer-body drawer-body-complete">
          {tab === "Visão geral" && (
            <div className="drawer-section-stack">
              <section className="drawer-objective" style={{ borderLeftColor: color }}>
                <span>OBJETIVO DE DOMÍNIO</span>
                <h3>{week.objective}</h3>
              </section>

              <section className="week-summary-grid">
                <article><BookOpenCheck size={18} /><div><strong>{week.syllabus.length}</strong><span>itens da ementa</span></div></article>
                <article><ListChecks size={18} /><div><strong>{week.content.length}</strong><span>tópicos de estudo</span></div></article>
                <article><FolderGit2 size={18} /><div><strong>{checkedSteps.length}/{guide.steps.length}</strong><span>etapas do projeto</span></div></article>
                <article><MessageCircleQuestion size={18} /><div><strong>10</strong><span>perguntas de defesa</span></div></article>
              </section>

              <div className="drawer-grid">
                <section className="drawer-panel">
                  <div className="panel-title"><Target size={17} /><strong>O que estudar primeiro</strong></div>
                  <ol className="overview-priority-list">{week.content.slice(0, 5).map((item, index) => <li key={item}><span>{index + 1}</span>{item}</li>)}</ol>
                  <button className="text-button" onClick={() => setTab("Plano de 7 dias")}>Abrir plano completo <ArrowRight size={15} /></button>
                </section>
                <section className="drawer-panel status-panel">
                  <div className="panel-title"><Clock3 size={17} /><strong>Status de domínio</strong></div>
                  <span className={`status-pill ${status}`}>{statusLabel(status)}</span>
                  <div className="mastery-buttons">{(["vermelho", "amarelo", "verde", "revisao"] as MasteryStatus[]).map((item) => <button key={item} className={status === item ? "selected" : ""} onClick={() => setStatus(item)}>{statusLabel(item)}</button>)}</div>
                  <small>Marque verde somente quando conseguir explicar, aplicar, interpretar, implementar e responder.</small>
                </section>
              </div>

              <section className="project-banner project-banner-complete">
                <span className="project-symbol"><FolderGit2 size={23} /></span>
                <div><small>PROJETO DA SEMANA</small><strong>{week.project.title}</strong><span>{guide.businessQuestion}</span></div>
                <button className="secondary-button" onClick={() => setTab("Projeto completo")}>Ver passo a passo <ArrowRight size={15} /></button>
              </section>
            </div>
          )}

          {tab === "Plano de 7 dias" && (
            <div className="drawer-section-stack">
              <header className="drawer-section-intro"><span>ROTEIRO EXECUTÁVEL</span><h3>Exatamente o que fazer em cada dia</h3><p>Use o plano como orientação. Se tiver menos dias, junte os dias 2–3 e 4–5, mas preserve projeto e sabatina.</p></header>
              <section className="drawer-day-grid">
                {studyDays.map((day) => <article key={day.day}><header><span>{day.day}</span><strong>{day.focus}</strong></header><ul>{day.tasks.map((task) => <li key={task}><Circle size={10} />{task}</li>)}</ul></article>)}
              </section>
              <section className="drawer-panel expected-output">
                <div className="panel-title"><CheckCircle2 size={17} /><strong>Entregas para encerrar a semana</strong></div>
                <ul className="delivery-list">{week.project.deliverables.map((item) => <li key={item}><span><Check size={14} /></span>{item}</li>)}</ul>
              </section>
            </div>
          )}

          {tab === "Ementa" && (
            <div className="drawer-section-stack">
              <header className="drawer-section-intro"><span>FONTE OFICIAL</span><h3>Ementa correspondente à Semana {week.number}</h3><p>Clique em cada item para atualizar seu nível de domínio. O texto é mantido como aparece no roadmap oficial.</p></header>
              <section className="drawer-syllabus-list">
                {week.syllabus.length ? week.syllabus.map((text) => {
                  const item = roadmap.syllabus.find((candidate) => candidate.week === week.number && candidate.text === text);
                  const itemStatus = item ? workspace.syllabusStatus[item.id] ?? "nao-iniciado" : "nao-iniciado";
                  return <button key={text} onClick={() => cycleSyllabusStatus(text)}><i className={`mastery-dot ${itemStatus}`} /><span><strong>{text}</strong><small>{item ? item.id.toUpperCase() : `SEMANA ${week.number}`}</small></span><em>{statusLabel(itemStatus)}</em></button>;
                }) : <div className="drawer-empty-state"><CheckCircle2 size={24} /><strong>Semana de consolidação</strong><p>Nenhum item novo foi introduzido; revise os domínios anteriores por meio do projeto e da sabatina.</p></div>}
              </section>
              <button className="secondary-button drawer-inline-action" onClick={() => onNavigate("ementa")}><BookOpenCheck size={16} /> Voltar à ementa completa</button>
            </div>
          )}

          {tab === "Conteúdo" && (
            <div className="drawer-section-stack">
              <header className="drawer-section-intro"><span>CONTEÚDO CANÔNICO</span><h3>O que precisa ser visto e praticado</h3><p>Cada tópico precisa deixar uma evidência: explicação curta, exercício resolvido, implementação ou análise.</p></header>
              <section className="content-timeline content-timeline-complete">
                {week.content.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{item}</strong><small>Entender → praticar → explicar → registrar evidência</small></div><button aria-label={`Criar anotação sobre ${item}`} onClick={() => onNavigate("estudio")}><NotebookPen size={16} /></button></article>)}
              </section>
            </div>
          )}

          {tab === "Materiais" && (
            <div className="drawer-section-stack">
              <header className="drawer-section-intro"><span>BIBLIOTECA DA SEMANA</span><h3>Leitura e aulas para destravar</h3><p>Comece pelos tópicos do plano e consulte estes recursos conforme a necessidade.</p></header>
              <section className="resource-list">
                {week.materials.map((item, index) => <article key={item}><span><BookMarked size={18} /></span><div><small>MATERIAL {index + 1}</small><strong>{item}</strong></div></article>)}
                {week.videos.map((item, index) => { const video = videoData(item); return <article key={item}><span><Play size={18} /></span><div><small>VÍDEO {index + 1}</small><strong>{video.label}</strong></div>{video.url && <a href={video.url} aria-label={`Abrir ${video.label}`}><ExternalLink size={15} /></a>}</article>; })}
                <div className="copyright-note">Trechos e referências podem ser registrados nas notas. Livros e PDFs protegidos não são republicados.</div>
              </section>
            </div>
          )}

          {tab === "Projeto completo" && <ProjectGuidePanel week={week} workspace={workspace} onUpdate={onUpdate} />}

          {tab === "Sabatina" && (
            <div className="drawer-section-stack">
              <header className="drawer-section-intro"><span>DEFESA ORAL</span><h3>Dez perguntas para provar domínio</h3><p>Responda antes de revelar. Se não conseguir explicar com clareza, registre a lacuna e volte ao tópico correspondente.</p></header>
              <section className="question-list">
                {week.sabatina.map((item, index) => <article key={item.question} className={revealed === index ? "revealed" : ""}><span className="question-index">{index + 1}</span><div><strong>{item.question}</strong>{revealed === index && <p>{item.answer}</p>}</div><button onClick={() => setRevealed(revealed === index ? null : index)}>{revealed === index ? "Ocultar" : "Ver resposta"}</button></article>)}
                <button className="primary-button" onClick={() => onNavigate("sabatina")}><MessageCircleQuestion size={17} /> Iniciar treino completo</button>
              </section>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
