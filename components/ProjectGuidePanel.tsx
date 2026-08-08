"use client";

import { useMemo, useState } from "react";
import {
  Check,
  CheckCircle2,
  Circle,
  Clipboard,
  Clock3,
  FileCode2,
  GraduationCap,
  GitBranch,
  ListChecks,
  Rocket,
  Sparkles,
  Target,
  Terminal,
} from "lucide-react";
import { getProjectGuide } from "@/lib/project-guides";
import type { RoadmapWeek } from "@/lib/quest-data";
import type { QuestWorkspace } from "@/lib/use-quest-workspace";

type ProjectGuidePanelProps = {
  week: RoadmapWeek;
  workspace: QuestWorkspace;
  onUpdate: (recipe: (current: QuestWorkspace) => QuestWorkspace) => void;
  variant?: "dialog" | "page";
};

export function ProjectGuidePanel({ week, workspace, onUpdate, variant = "dialog" }: ProjectGuidePanelProps) {
  const [copiedStep, setCopiedStep] = useState<string | null>(null);
  const guide = useMemo(() => getProjectGuide(week), [week]);
  const checklistKey = String(week.number);
  const projectKey = week.project.repo;
  const checkedSteps = workspace.projectChecklist?.[checklistKey] ?? [];
  const projectStatus = workspace.projectStatus[projectKey] ?? "planejado";

  const toggleProjectStep = (stepId: string) => {
    onUpdate((current) => {
      const currentSteps = current.projectChecklist?.[checklistKey] ?? [];
      const nextSteps = currentSteps.includes(stepId)
        ? currentSteps.filter((id) => id !== stepId)
        : [...currentSteps, stepId];
      return { ...current, projectChecklist: { ...(current.projectChecklist ?? {}), [checklistKey]: nextSteps } };
    });
  };

  const copyCommands = async (id: string, commands: string) => {
    await navigator.clipboard.writeText(commands);
    setCopiedStep(id);
    window.setTimeout(() => setCopiedStep(null), 1500);
  };

  return (
    <div className={`drawer-section-stack project-detail project-detail-complete project-guide-panel variant-${variant}`}>
      <header className="drawer-project-header">
        <div>
          <span className="eyebrow"><Rocket size={14} /> PROJETO DA SEMANA {week.number}</span>
          <h3>{week.project.title}</h3>
          <p>{week.project.objective}</p>
        </div>
        <div className="drawer-repo-name"><GitBranch size={17} /><span>REPOSITÓRIO</span><strong>{week.project.repo}</strong></div>
      </header>

      <section className="project-learning-outcomes">
        <header><GraduationCap size={18} /><div><span>5 · PROJETO (ESTRUTURA COMPLETA CD)</span><h4>O que você saberá fazer ao concluir</h4></div></header>
        <ul>{guide.learningOutcomes.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul>
      </section>

      <section className="project-brief-grid drawer-project-brief">
        <article><span><Target size={18} /></span><small>PERGUNTA DE NEGÓCIO</small><p>{guide.businessQuestion}</p></article>
        <article><span><FileCode2 size={18} /></span><small>PLANO DE DADOS</small><p>{guide.dataPlan}</p></article>
        <article><span><Terminal size={18} /></span><small>STACK SUGERIDA</small><div className="project-stack">{guide.stack.map((item) => <b key={item}>{item}</b>)}</div></article>
      </section>

      <section className="drawer-panel project-first-session">
        <div className="panel-title"><Clock3 size={17} /><strong>Primeiros 30 minutos</strong></div>
        <ol>{guide.firstSession.map((item) => <li key={item}>{item}</li>)}</ol>
      </section>

      <section className="drawer-project-steps">
        <header>
          <div><span>EXECUÇÃO COMPLETA</span><h4>Passo a passo do início à publicação</h4></div>
          <strong>{Math.round(checkedSteps.length / guide.steps.length * 100)}%</strong>
        </header>
        <div className="wide-progress"><i style={{ width: `${checkedSteps.length / guide.steps.length * 100}%` }} /></div>
        {guide.steps.map((step) => {
          const checked = checkedSteps.includes(step.id);
          return (
            <article key={step.id} className={checked ? "checked" : ""}>
              <button className="drawer-step-check" onClick={() => toggleProjectStep(step.id)} aria-label={checked ? `Desmarcar ${step.title}` : `Concluir ${step.title}`}>{checked ? <CheckCircle2 size={22} /> : <Circle size={22} />}</button>
              <div className="drawer-step-content">
                <header><h5>{step.title}</h5><span>{step.outcome}</span></header>
                <ul>{step.actions.map((action) => <li key={action}>{action}</li>)}</ul>
                {step.commands && <div className="command-block"><div><Terminal size={14} /> comandos sugeridos <button onClick={() => void copyCommands(step.id, step.commands!)}><Clipboard size={13} />{copiedStep === step.id ? "Copiado" : "Copiar"}</button></div><pre><code>{step.commands}</code></pre></div>}
                <footer><strong>Evidência esperada:</strong> {step.evidence}</footer>
              </div>
            </article>
          );
        })}
      </section>

      <div className="drawer-grid project-finish-grid">
        <section className="drawer-panel">
          <div className="panel-title"><ListChecks size={17} /><strong>Estrutura do repositório</strong></div>
          <ul className="project-structure-list">{guide.repositoryStructure.map((item) => <li key={item}><FileCode2 size={13} />{item}</li>)}</ul>
        </section>
        <section className="drawer-panel project-done-panel">
          <div className="panel-title"><CheckCircle2 size={17} /><strong>Definition of done</strong></div>
          <ul>{guide.definitionOfDone.map((item) => <li key={item}><Check size={13} />{item}</li>)}</ul>
          <label>URL do repositório<input value={workspace.projectUrls[projectKey] ?? ""} onChange={(event) => onUpdate((current) => ({ ...current, projectUrls: { ...current.projectUrls, [projectKey]: event.target.value } }))} placeholder={`https://github.com/kayhuhu/${week.project.repo}`} /></label>
          <select value={projectStatus} onChange={(event) => onUpdate((current) => ({ ...current, projectStatus: { ...current.projectStatus, [projectKey]: event.target.value as "planejado" | "em-andamento" | "publicado" } }))}><option value="planejado">Planejado</option><option value="em-andamento">Em andamento</option><option value="publicado">Publicado</option></select>
        </section>
      </div>

      <section className="prompt-workbench project-ai-prompt">
        <header><div><Sparkles size={18} /><span>PROMPT PARA CODAR, REVISAR E DOCUMENTAR COM IA</span></div><button className="copy-prompt-button" onClick={() => void copyCommands("ai-prompt", guide.aiPrompt)}><Clipboard size={15} />{copiedStep === "ai-prompt" ? "Copiado!" : "Copiar prompt"}</button></header>
        <p>O prompt trabalha em fases, exige testes e documentação e impede que a IA despeje um projeto inteiro sem validação.</p>
        <pre>{guide.aiPrompt}</pre>
      </section>
    </div>
  );
}
