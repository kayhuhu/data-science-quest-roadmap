"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Filter, Search, ShieldCheck, Sparkles } from "lucide-react";
import {
  blockPalette,
  nextMasteryStatus,
  roadmap,
  statusLabel,
  type MasteryStatus,
  type RoadmapWeek,
} from "@/lib/quest-data";
import type { QuestWorkspace } from "@/lib/use-quest-workspace";

type SyllabusViewProps = {
  workspace: QuestWorkspace;
  onUpdate: (recipe: (current: QuestWorkspace) => QuestWorkspace) => void;
  onSelectWeek: (week: RoadmapWeek) => void;
};

export function SyllabusView({ workspace, onUpdate, onSelectWeek }: SyllabusViewProps) {
  const [query, setQuery] = useState("");
  const [block, setBlock] = useState("todos");
  const [statusFilter, setStatusFilter] = useState<MasteryStatus | "todos">("todos");
  const filtered = useMemo(
    () => roadmap.syllabus.filter((item) => {
      const status = workspace.syllabusStatus[item.id] ?? "nao-iniciado";
      return (block === "todos" || item.block === block) &&
        (statusFilter === "todos" || status === statusFilter) &&
        item.text.toLocaleLowerCase("pt-BR").includes(query.toLocaleLowerCase("pt-BR"));
    }),
    [block, query, statusFilter, workspace.syllabusStatus],
  );

  const counts = (["nao-iniciado", "vermelho", "amarelo", "verde", "revisao"] as MasteryStatus[])
    .reduce<Record<string, number>>((result, status) => {
      result[status] = roadmap.syllabus.filter((item) => (workspace.syllabusStatus[item.id] ?? "nao-iniciado") === status).length;
      return result;
    }, {});
  const weeksInOrder = roadmap.weeks
    .map((week) => ({ week, items: filtered.filter((item) => item.week === week.number) }))
    .filter((group) => group.items.length > 0);

  const cycleStatus = (id: string) => {
    onUpdate((current) => {
      const previous = current.syllabusStatus[id] ?? "nao-iniciado";
      const next = nextMasteryStatus(previous);
      return {
        ...current,
        syllabusStatus: { ...current.syllabusStatus, [id]: next },
      };
    });
  };

  return (
    <div className="view-stack syllabus-view">
      <header className="page-intro">
        <div><span className="eyebrow"><ShieldCheck size={14} /> FONTE OFICIAL · ITAÚ UNIBANCO</span><h1>Ementa semanal em checklist</h1><p>{roadmap.metrics.syllabusItems} itens oficiais, apresentados na ordem canônica das {roadmap.metrics.weeks} semanas. Marque seu domínio e abra qualquer semana sem sair da tela.</p></div>
        <div className="audit-badge"><Sparkles size={18} /><div><strong>Auditoria íntegra</strong><span>{roadmap.metrics.blocks} blocos · {roadmap.metrics.weeks} semanas · {roadmap.metrics.answers} respostas</span></div></div>
      </header>

      <section className="mastery-overview">
        {(["nao-iniciado", "vermelho", "amarelo", "verde", "revisao"] as MasteryStatus[]).map((status) => (
          <button key={status} className={`mastery-stat ${status} ${statusFilter === status ? "active" : ""}`} onClick={() => setStatusFilter(statusFilter === status ? "todos" : status)}>
            <span>{statusLabel(status)}</span><strong>{counts[status]}</strong><small>itens</small>
          </button>
        ))}
      </section>

      <section className="filter-bar">
        <label className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar tema, algoritmo ou métrica..." /></label>
        <label className="select-field"><Filter size={16} /><select value={block} onChange={(event) => setBlock(event.target.value)}><option value="todos">Todos os blocos</option>{roadmap.blocks.map((item) => <option key={item.title} value={item.title}>{item.title}</option>)}</select></label>
        <span className="result-count">{filtered.length} de {roadmap.metrics.syllabusItems} itens</span>
      </section>

      <p className="syllabus-navigation-help">Clique no círculo para avançar o status. Clique no cabeçalho da semana para abrir sua central completa nesta mesma tela.</p>

      <section className="weekly-syllabus-checklist">
        {weeksInOrder.map(({ week, items }) => {
          const completed = items.filter((item) => (workspace.syllabusStatus[item.id] ?? "nao-iniciado") === "verde").length;
          return <article className="syllabus-week-group" key={week.number} style={{ "--week-color": blockPalette[week.block] ?? "#4dd7fa" } as React.CSSProperties}>
            <button className="syllabus-week-header" onClick={() => onSelectWeek(week)}>
              <span>S{week.number.toString().padStart(2, "0")}</span>
              <div><small>{week.blocks.join(" + ")}</small><strong>{week.title}</strong><p>{week.overview.summary}</p></div>
              <em>{completed}/{items.length} verdes</em>
            </button>
            <div className="syllabus-week-items">
              {items.map((item) => {
                const status = workspace.syllabusStatus[item.id] ?? "nao-iniciado";
                return <div className={`syllabus-check-item ${status}`} key={item.id}>
                  <button className="syllabus-check-control" onClick={() => cycleStatus(item.id)} aria-label={`Alterar status de ${item.text}: ${statusLabel(status)}`}><span>{status === "verde" ? <CheckCircle2 size={18} /> : <i />}</span></button>
                  <div><strong>{item.text}</strong><small>{statusLabel(status)} · {item.id.toUpperCase()}</small></div>
                  <button className="block-chip block-chip-button" style={{ "--chip-color": blockPalette[item.block] ?? "#4dd7fa" } as React.CSSProperties} onClick={() => setBlock(item.block)}>{item.block}</button>
                </div>;
              })}
            </div>
          </article>;
        })}
        {weeksInOrder.length === 0 && <div className="empty-panel"><Search size={30} /><h3>Nenhum item neste filtro</h3><p>Limpe a busca ou selecione todos os blocos e status.</p></div>}
      </section>
    </div>
  );
}
