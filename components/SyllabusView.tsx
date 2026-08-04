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

  const cycleStatus = (id: string) => {
    onUpdate((current) => {
      const previous = current.syllabusStatus[id] ?? "nao-iniciado";
      const next = nextMasteryStatus(previous);
      return {
        ...current,
        syllabusStatus: { ...current.syllabusStatus, [id]: next },
        xp: current.xp + (next === "verde" && previous !== "verde" ? 25 : 0),
      };
    });
  };

  return (
    <div className="view-stack syllabus-view">
      <header className="page-intro">
        <div><span className="eyebrow"><ShieldCheck size={14} /> FONTE OFICIAL · ITAÚ UNIBANCO</span><h1>Ementa auditável</h1><p>72 itens rastreados por semana, bloco e nível de domínio. Verde só conta quando você consegue defender.</p></div>
        <div className="audit-badge"><Sparkles size={18} /><div><strong>Auditoria íntegra</strong><span>22 semanas · 220 respostas · 22 projetos</span></div></div>
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

      <p className="syllabus-navigation-help">Clique no nome do bloco para filtrar a ementa. Clique em <strong>S01–S22</strong> para abrir a semana correspondente nesta mesma tela.</p>

      <section className="syllabus-table">
        <div className="syllabus-head"><span>Domínio</span><span>Item oficial</span><span>Bloco</span><span>Semana</span><span>Evidência</span></div>
        {filtered.map((item) => {
          const status = workspace.syllabusStatus[item.id] ?? "nao-iniciado";
          return (
            <article className="syllabus-row" key={item.id}>
              <button className={`mastery-toggle ${status}`} onClick={() => cycleStatus(item.id)} aria-label={`Alterar status: ${statusLabel(status)}`}><i />{statusLabel(status)}</button>
              <div className="syllabus-copy"><strong>{item.text}</strong><small>{item.id.toUpperCase()}</small></div>
              <button className="block-chip block-chip-button" style={{ "--chip-color": blockPalette[item.block] ?? "#4dd7fa" } as React.CSSProperties} onClick={() => setBlock(item.block)} title={`Filtrar pelo bloco ${item.block}`}>{item.block}</button>
              <button className="week-chip" onClick={() => onSelectWeek(roadmap.weeks[item.week - 1])} title={`Abrir a Semana ${item.week}`}>S{item.week.toString().padStart(2, "0")}</button>
              <button className="evidence-button"><CheckCircle2 size={15} /> Vincular</button>
            </article>
          );
        })}
      </section>
    </div>
  );
}
