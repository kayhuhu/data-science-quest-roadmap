"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BookOpenCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  Circle,
  Clipboard,
  Clock3,
  ExternalLink,
  FileCode2,
  FolderGit2,
  GitBranch,
  ListChecks,
  Play,
  Rocket,
  Sparkles,
  Target,
  Terminal,
} from "lucide-react";
import { getProjectGuide } from "@/lib/project-guides";
import {
  blockPalette,
  nextMasteryStatus,
  roadmap,
  statusLabel,
  type RoadmapWeek,
} from "@/lib/quest-data";
import { useQuestWorkspace } from "@/lib/use-quest-workspace";

type WeekTab = "plano" | "projeto" | "sabatina";

const weekTabs: Array<{ id: WeekTab; label: string; icon: typeof BookOpen }> = [
  { id: "plano", label: "Plano da semana", icon: BookOpen },
  { id: "projeto", label: "Projeto passo a passo", icon: FolderGit2 },
  { id: "sabatina", label: "Sabatina", icon: Sparkles },
];

function splitIntoStudyDays(week: RoadmapWeek) {
  const content = week.content;
  const chunks = [content.slice(0, 2), content.slice(2, 4), content.slice(4, 6), content.slice(6)];
  return [
    { day: "Dia 1", focus: "Orientação e diagnóstico", tasks: [week.objective, ...week.syllabus.map((item) => `Diagnosticar domínio: ${item}`)] },
    { day: "Dia 2", focus: "Fundamentos", tasks: chunks[0] },
    { day: "Dia 3", focus: "Conexões e fórmulas", tasks: chunks[1] },
    { day: "Dia 4", focus: "Aplicação guiada", tasks: chunks[2] },
    { day: "Dia 5", focus: "Prática e implementação", tasks: chunks[3].length ? chunks[3] : ["Resolver exercícios e explicar os principais conceitos sem consultar."] },
    { day: "Dia 6", focus: "Projeto da semana", tasks: [`Executar as etapas 1 a 5 de “${week.project.title}”.`, "Registrar decisões, testes e evidências no repositório."] },
    { day: "Dia 7", focus: "Fechamento e defesa", tasks: ["Responder as 10 perguntas da sabatina antes de revelar o gabarito.", "Revisar erros, finalizar README e decidir o status de domínio da semana."] },
  ];
}

function extractVideo(item: string) {
  const url = item.match(/\((https?:\/\/[^)]+)\)/)?.[1];
  return { label: item.replace(/\s*\(https?:.*$/, ""), url };
}

export function WeekMissionPage({ week }: { week: RoadmapWeek }) {
  const { workspace, update, ready } = useQuestWorkspace();
  const [activeTab, setActiveTab] = useState<WeekTab>("plano");
  const [revealedAnswer, setRevealedAnswer] = useState<number | null>(null);
  const [copiedStep, setCopiedStep] = useState<string | null>(null);
  const guide = useMemo(() => getProjectGuide(week), [week]);
  const studyDays = useMemo(() => splitIntoStudyDays(week), [week]);
  const color = blockPalette[week.block] ?? "#4dd7fa";
  const weekKey = String(week.number);
  const checkedSteps = workspace.projectChecklist?.[weekKey] ?? [];
  const weekStatus = workspace.weekStatus[weekKey] ?? "nao-iniciado";
  const projectStatus = workspace.projectStatus[weekKey] ?? "planejado";

  const toggleProjectStep = (stepId: string) => {
    update((current) => {
      const currentSteps = current.projectChecklist?.[weekKey] ?? [];
      const nextSteps = currentSteps.includes(stepId)
        ? currentSteps.filter((id) => id !== stepId)
        : [...currentSteps, stepId];
      return {
        ...current,
        projectChecklist: { ...(current.projectChecklist ?? {}), [weekKey]: nextSteps },
      };
    });
  };

  const setSyllabusStatus = (text: string) => {
    const item = roadmap.syllabus.find((candidate) => candidate.week === week.number && candidate.text === text);
    if (!item) return;
    update((current) => {
      const previous = current.syllabusStatus[item.id] ?? "nao-iniciado";
      return { ...current, syllabusStatus: { ...current.syllabusStatus, [item.id]: nextMasteryStatus(previous) } };
    });
  };

  const copyCommands = async (id: string, commands: string) => {
    await navigator.clipboard.writeText(commands);
    setCopiedStep(id);
    window.setTimeout(() => setCopiedStep(null), 1600);
  };

  return (
    <div className="week-workspace" style={{ "--week-accent": color } as React.CSSProperties}>
      <header className="week-topbar">
        <Link href="/" className="week-brand"><span className="brand-mark"><i /><i /><i /><i /><b /></span><span><strong>Data Science</strong><em>Quest</em></span></Link>
        <Link href="/" className="week-back"><ArrowLeft size={16} /> Voltar ao mapa</Link>
      </header>

      <main className="week-page">
        <header className="week-hero">
          <div className="week-number-card"><small>SEMANA</small><strong>{String(week.number).padStart(2, "0")}</strong><span>{week.period}</span></div>
          <div className="week-hero-copy">
            <span className="eyebrow">{week.block}</span>
            <h1>{week.title}</h1>
            <p>{week.objective}</p>
            <div className="week-hero-actions">
              <button className={`status-pill ${weekStatus}`} disabled={!ready} onClick={() => update((current) => ({ ...current, weekStatus: { ...current.weekStatus, [weekKey]: nextMasteryStatus(weekStatus) } }))}>{statusLabel(weekStatus)} <ArrowRight size={14} /></button>
              <Link href="/pomodoro" target="_blank" className="secondary-button"><Play size={15} /> Iniciar foco</Link>
            </div>
          </div>
          <div className="week-progress-card">
            <span>PROJETO</span><strong>{checkedSteps.length} de {guide.steps.length} etapas</strong>
            <div className="wide-progress"><i style={{ width: `${checkedSteps.length / guide.steps.length * 100}%` }} /></div>
            <small>{projectStatus === "publicado" ? "Publicado" : projectStatus === "em-andamento" ? "Em andamento" : "Ainda não iniciado"}</small>
          </div>
        </header>

        <nav className="week-tabs" aria-label="Central da semana">
          {weekTabs.map((tab) => {
            const Icon = tab.icon;
            return <button key={tab.id} className={activeTab === tab.id ? "active" : ""} onClick={() => setActiveTab(tab.id)}><Icon size={17} />{tab.label}{tab.id === "projeto" && <span>{checkedSteps.length}/{guide.steps.length}</span>}</button>;
          })}
        </nav>

        {activeTab === "plano" && (
          <div className="week-tab-content study-plan-tab">
            <section className="week-section week-priority">
              <div className="week-section-heading"><span><Target size={18} /></span><div><small>COMECE POR AQUI</small><h2>O que você precisa dominar nesta semana</h2></div></div>
              <ol className="exact-content-list">{week.content.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>
            </section>

            <div className="week-two-columns">
              <section className="week-section official-syllabus">
                <div className="week-section-heading"><span><BookOpenCheck size={18} /></span><div><small>FONTE OFICIAL</small><h2>Ementa desta semana</h2></div></div>
                <p className="section-help">Clique no status para avançar de não iniciado até revisão. O texto abaixo é preservado da ementa.</p>
                <div className="official-items">
                  {week.syllabus.length ? week.syllabus.map((text) => {
                    const item = roadmap.syllabus.find((candidate) => candidate.week === week.number && candidate.text === text);
                    const status = item ? workspace.syllabusStatus[item.id] ?? "nao-iniciado" : "nao-iniciado";
                    return <button key={text} onClick={() => setSyllabusStatus(text)}><span className={`mastery-dot ${status}`} /> <strong>{text}</strong><small>{statusLabel(status)}</small></button>;
                  }) : <div className="no-new-syllabus"><CheckCircle2 size={20} /><p>Nenhum item novo. Esta semana consolida toda a ementa anterior.</p></div>}
                </div>
              </section>

              <section className="week-section weekly-output">
                <div className="week-section-heading"><span><CheckCircle2 size={18} /></span><div><small>SAÍDA ESPERADA</small><h2>Ao terminar, você entrega</h2></div></div>
                <ul>{week.project.deliverables.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
                <button className="text-button" onClick={() => setActiveTab("projeto")}>Ver projeto completo <ArrowRight size={15} /></button>
              </section>
            </div>

            <section className="week-section day-by-day">
              <div className="week-section-heading"><span><CalendarDays size={18} /></span><div><small>RITMO SUGERIDO</small><h2>Plano de sete dias</h2></div></div>
              <div className="day-grid">{studyDays.map((day) => <article key={day.day}><header><span>{day.day}</span><strong>{day.focus}</strong></header><ul>{day.tasks.map((task) => <li key={task}><Circle size={10} />{task}</li>)}</ul></article>)}</div>
            </section>

            <div className="week-two-columns resources-columns">
              <section className="week-section">
                <div className="week-section-heading"><span><BookOpen size={18} /></span><div><small>LEITURA</small><h2>Materiais indicados</h2></div></div>
                <ul className="resource-checklist">{week.materials.map((item) => <li key={item}><BookOpen size={14} />{item}</li>)}</ul>
              </section>
              <section className="week-section">
                <div className="week-section-heading"><span><Play size={18} /></span><div><small>VÍDEOS</small><h2>Aulas para destravar</h2></div></div>
                <div className="video-list">{week.videos.map((item) => { const video = extractVideo(item); return video.url ? <a key={item} href={video.url} target="_blank" rel="noreferrer"><span>{video.label}</span><ExternalLink size={14} /></a> : <span key={item}>{video.label}</span>; })}</div>
              </section>
            </div>
          </div>
        )}

        {activeTab === "projeto" && (
          <div className="week-tab-content project-guide-tab">
            <section className="project-kickoff">
              <div><span className="eyebrow"><Rocket size={14} /> PROJETO DA SEMANA</span><h2>{week.project.title}</h2><p>{week.project.objective}</p></div>
              <div className="repo-name"><GitBranch size={18} /><span>REPOSITÓRIO</span><strong>{week.project.repo}</strong></div>
            </section>

            <section className="project-brief-grid">
              <article><span><Target size={18} /></span><small>PERGUNTA DE NEGÓCIO</small><p>{guide.businessQuestion}</p></article>
              <article><span><FileCode2 size={18} /></span><small>PLANO DE DADOS</small><p>{guide.dataPlan}</p></article>
              <article><span><Terminal size={18} /></span><small>STACK SUGERIDA</small><div className="project-stack">{guide.stack.map((item) => <b key={item}>{item}</b>)}</div></article>
            </section>

            <section className="week-section start-now-panel">
              <div className="week-section-heading"><span><Clock3 size={18} /></span><div><small>PRIMEIROS 30 MINUTOS</small><h2>Comece sem ficar olhando para a tela em branco</h2></div></div>
              <ol>{guide.firstSession.map((item) => <li key={item}>{item}</li>)}</ol>
            </section>

            <section className="project-steps-section">
              <header><div><span className="eyebrow muted">EXECUÇÃO COMPLETA</span><h2>Passo a passo do projeto</h2><p>Marque cada etapa conforme produzir a evidência indicada.</p></div><strong>{Math.round(checkedSteps.length / guide.steps.length * 100)}%</strong></header>
              <div className="project-steps">
                {guide.steps.map((step) => {
                  const checked = checkedSteps.includes(step.id);
                  return <article key={step.id} className={checked ? "checked" : ""}>
                    <button className="step-check" onClick={() => toggleProjectStep(step.id)} aria-label={checked ? `Desmarcar ${step.title}` : `Concluir ${step.title}`}>{checked ? <CheckCircle2 size={22} /> : <Circle size={22} />}</button>
                    <div className="step-content"><header><h3>{step.title}</h3><span>{step.outcome}</span></header><ul>{step.actions.map((action) => <li key={action}>{action}</li>)}</ul>{step.commands && <div className="command-block"><div><Terminal size={14} /> comandos sugeridos <button onClick={() => void copyCommands(step.id, step.commands!)}><Clipboard size={13} />{copiedStep === step.id ? "Copiado" : "Copiar"}</button></div><pre><code>{step.commands}</code></pre></div>}<footer><strong>Evidência:</strong> {step.evidence}</footer></div>
                  </article>;
                })}
              </div>
            </section>

            <div className="week-two-columns project-finish-grid">
              <section className="week-section">
                <div className="week-section-heading"><span><ListChecks size={18} /></span><div><small>ESTRUTURA</small><h2>Como organizar o repositório</h2></div></div>
                <ul className="resource-checklist">{guide.repositoryStructure.map((item) => <li key={item}><FileCode2 size={14} />{item}</li>)}</ul>
              </section>
              <section className="week-section definition-done">
                <div className="week-section-heading"><span><CheckCircle2 size={18} /></span><div><small>DEFINITION OF DONE</small><h2>O projeto só termina quando...</h2></div></div>
                <ul>{guide.definitionOfDone.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul>
                <label>URL do repositório<input value={workspace.projectUrls[weekKey] ?? ""} onChange={(event) => update((current) => ({ ...current, projectUrls: { ...current.projectUrls, [weekKey]: event.target.value } }))} placeholder="https://github.com/usuario/repositorio" /></label>
                <select value={projectStatus} onChange={(event) => update((current) => ({ ...current, projectStatus: { ...current.projectStatus, [weekKey]: event.target.value as typeof projectStatus } }))}><option value="planejado">Planejado</option><option value="em-andamento">Em andamento</option><option value="publicado">Publicado</option></select>
              </section>
            </div>
          </div>
        )}

        {activeTab === "sabatina" && (
          <div className="week-tab-content week-sabatina-tab">
            <header><div><span className="eyebrow"><Sparkles size={14} /> DEFESA ORAL</span><h2>10 perguntas para provar domínio</h2><p>Responda em voz alta ou por escrito antes de abrir a resposta esperada.</p></div><Link href="/sabatina" target="_blank" className="primary-button">Abrir simulador <ArrowRight size={15} /></Link></header>
            <div className="week-question-list">{week.sabatina.map((item, index) => <article key={item.question} className={revealedAnswer === index ? "revealed" : ""}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.question}</h3>{revealedAnswer === index && <p>{item.answer}</p>}</div><button onClick={() => setRevealedAnswer(revealedAnswer === index ? null : index)}>{revealedAnswer === index ? "Ocultar resposta" : "Revelar resposta"}</button></article>)}</div>
          </div>
        )}
      </main>
    </div>
  );
}
