"use client";

import { useState } from "react";
import {
  ArrowRight,
  BookMarked,
  Check,
  Clock3,
  ExternalLink,
  FolderGit2,
  ListChecks,
  MessageCircleQuestion,
  NotebookPen,
  Play,
  X,
} from "lucide-react";
import { blockPalette, statusLabel, type MasteryStatus, type RoadmapWeek } from "@/lib/quest-data";
import type { QuestWorkspace } from "@/lib/use-quest-workspace";

type WeekDrawerProps = {
  week: RoadmapWeek | null;
  workspace: QuestWorkspace;
  onClose: () => void;
  onUpdate: (recipe: (current: QuestWorkspace) => QuestWorkspace) => void;
  onNavigate: (view: string) => void;
};

const tabs = ["Visão geral", "Conteúdo", "Materiais", "Projeto", "Sabatina"] as const;

export function WeekDrawer({ week, workspace, onClose, onUpdate, onNavigate }: WeekDrawerProps) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Visão geral");
  const [revealed, setRevealed] = useState<number | null>(null);
  if (!week) return null;

  const status = workspace.weekStatus[String(week.number)] ?? "nao-iniciado";
  const color = blockPalette[week.block] ?? "#4dd7fa";
  const setStatus = (next: MasteryStatus) => {
    onUpdate((current) => ({
      ...current,
      weekStatus: { ...current.weekStatus, [String(week.number)]: next },
      xp: current.xp + (next === "verde" && status !== "verde" ? 250 : 0),
    }));
  };

  return (
    <div className="drawer-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="week-drawer" role="dialog" aria-modal="true" aria-label={`Semana ${week.number}`}>
        <button className="icon-button drawer-close" onClick={onClose} aria-label="Fechar"><X size={20} /></button>
        <header className="drawer-header" style={{ "--week-color": color } as React.CSSProperties}>
          <div className="drawer-week-number"><span>SEMANA</span><strong>{week.number.toString().padStart(2, "0")}</strong></div>
          <div>
            <span className="eyebrow" style={{ color }}>{week.block}</span>
            <h2>{week.title}</h2>
            <p>{week.period}</p>
          </div>
        </header>

        <nav className="drawer-tabs" aria-label="Conteúdo da semana">
          {tabs.map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}</button>)}
        </nav>

        <div className="drawer-body">
          {tab === "Visão geral" && (
            <>
              <section className="drawer-objective">
                <span>OBJETIVO DE DOMÍNIO</span>
                <h3>{week.objective}</h3>
              </section>
              <div className="drawer-grid">
                <section className="drawer-panel">
                  <div className="panel-title"><ListChecks size={17} /><strong>Ementa oficial</strong></div>
                  <ul className="clean-list">{week.syllabus.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul>
                </section>
                <section className="drawer-panel status-panel">
                  <div className="panel-title"><Clock3 size={17} /><strong>Status de domínio</strong></div>
                  <span className={`status-pill ${status}`}>{statusLabel(status)}</span>
                  <div className="mastery-buttons">
                    {(["vermelho", "amarelo", "verde", "revisao"] as MasteryStatus[]).map((item) => (
                      <button key={item} className={status === item ? "selected" : ""} onClick={() => setStatus(item)}>{statusLabel(item)}</button>
                    ))}
                  </div>
                  <small>Verde = explico, aplico, interpreto, implemento e respondo.</small>
                </section>
              </div>
              <section className="project-banner">
                <span className="project-symbol"><FolderGit2 size={23} /></span>
                <div><small>PROJETO DA SEMANA</small><strong>{week.project.title}</strong><span>{week.project.repo}</span></div>
                <button className="secondary-button" onClick={() => onNavigate("projetos")}>Abrir projeto <ArrowRight size={15} /></button>
              </section>
            </>
          )}

          {tab === "Conteúdo" && (
            <section className="content-timeline">
              {week.content.map((item, index) => (
                <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{item}</strong><small>Estude, pratique e registre uma evidência.</small></div><button aria-label="Abrir anotações" onClick={() => onNavigate("estudio")}><NotebookPen size={16} /></button></article>
              ))}
            </section>
          )}

          {tab === "Materiais" && (
            <div className="resource-list">
              {week.materials.map((item, index) => <article key={item}><span><BookMarked size={18} /></span><div><small>MATERIAL {index + 1}</small><strong>{item}</strong></div></article>)}
              {week.videos.map((item, index) => <article key={item}><span><Play size={18} /></span><div><small>VÍDEO {index + 1}</small><strong>{item.replace(/\s*\(https?:.*$/, "")}</strong></div><ExternalLink size={15} /></article>)}
              <div className="copyright-note">Trechos e referências podem ser registrados nas notas. Livros e PDFs protegidos não são republicados.</div>
            </div>
          )}

          {tab === "Projeto" && (
            <section className="project-detail">
              <span className="eyebrow muted">REPOSITÓRIO {week.project.repo}</span>
              <h3>{week.project.title}</h3>
              <p>{week.project.objective}</p>
              <h4>Entregas obrigatórias</h4>
              <ul className="delivery-list">{week.project.deliverables.map((item) => <li key={item}><span><Check size={14} /></span>{item}</li>)}</ul>
              <button className="primary-button" onClick={() => onNavigate("projetos")}>Gerenciar projeto <ArrowRight size={16} /></button>
            </section>
          )}

          {tab === "Sabatina" && (
            <section className="question-list">
              {week.sabatina.map((item, index) => (
                <article key={item.question} className={revealed === index ? "revealed" : ""}>
                  <span className="question-index">{index + 1}</span>
                  <div><strong>{item.question}</strong>{revealed === index && <p>{item.answer}</p>}</div>
                  <button onClick={() => setRevealed(revealed === index ? null : index)}>{revealed === index ? "Ocultar" : "Ver resposta"}</button>
                </article>
              ))}
              <button className="primary-button" onClick={() => onNavigate("sabatina")}><MessageCircleQuestion size={17} /> Iniciar treino completo</button>
            </section>
          )}
        </div>
      </aside>
    </div>
  );
}
