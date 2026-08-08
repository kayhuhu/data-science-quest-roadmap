"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  BookOpenCheck,
  Check,
  Clipboard,
  FileText,
  FolderGit2,
  GraduationCap,
  Landmark,
  Lightbulb,
  MessageCircleQuestion,
  Play,
  Scale,
  Sparkles,
  Target,
  TriangleAlert,
  X,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { ProjectGuidePanel } from "@/components/ProjectGuidePanel";
import { getProjectGuide } from "@/lib/project-guides";
import { fullSabatinaAnswer, realSabatinaForWeek } from "@/lib/real-sabatina";
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

const tabs = [
  "Visão Geral",
  "Teoria e Aplicação Bancária",
  "Materiais",
  "Estudar com IA",
  "Projeto (Estrutura Completa CD)",
  "Perguntas de Sabatina",
] as const;

type Tab = (typeof tabs)[number];

function CopyButton({ text, label = "Copiar prompt" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return <button className="copy-prompt-button" onClick={() => void copy()}><Clipboard size={15} />{copied ? "Copiado!" : label}</button>;
}

export function WeekDrawer({ week, workspace, onClose, onUpdate, onSelectWeek }: WeekDrawerProps) {
  const [tab, setTab] = useState<Tab>("Visão Geral");
  const [revealed, setRevealed] = useState<number | null>(null);
  const guide = useMemo(() => week ? getProjectGuide(week) : null, [week]);
  const realQuestions = useMemo(() => week ? realSabatinaForWeek(week.number) : [], [week]);
  const weeklyQuestions = useMemo(() => week ? [
    ...week.sabatina.map((item) => ({ ...item, source: "roadmap" as const, real: null })),
    ...realQuestions.map((item) => ({ question: item.question, answer: fullSabatinaAnswer(item), source: "real" as const, real: item })),
  ] : [], [realQuestions, week]);

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
            <span className="eyebrow" style={{ color }}>{week.blocks.join(" + ")}</span>
            <h2>{week.title}</h2>
            <p>{week.period}</p>
          </div>
          <div className="drawer-week-navigation" aria-label="Navegar entre semanas">
            <button disabled={!previousWeek} onClick={() => { if (previousWeek) { setTab("Visão Geral"); onSelectWeek(previousWeek); } }}><ArrowLeft size={15} /><span>Anterior</span></button>
            <strong>{week.number} / {roadmap.metrics.weeks}</strong>
            <button disabled={!nextWeek} onClick={() => { if (nextWeek) { setTab("Visão Geral"); onSelectWeek(nextWeek); } }}><span>Próxima</span><ArrowRight size={15} /></button>
          </div>
        </header>

        <nav className="drawer-tabs weekly-six-tabs" aria-label="Seções da semana">
          {tabs.map((item) => (
            <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>
              {item}
              {item === "Projeto (Estrutura Completa CD)" && <small>{checkedSteps.length}/{guide.steps.length}</small>}
            </button>
          ))}
        </nav>

        <div className="drawer-body drawer-body-complete">
          {tab === "Visão Geral" && (
            <div className="drawer-section-stack">
              <header className="drawer-section-intro">
                <span>1 · VISÃO GERAL</span>
                <h3>O que você precisa dominar nesta semana</h3>
                <p>{week.overview.summary}</p>
              </header>

              <section className="week-summary-grid">
                <article><BookOpenCheck size={18} /><div><strong>{week.overview.officialTopics.length}</strong><span>itens oficiais</span></div></article>
                <article><Target size={18} /><div><strong>{week.content.length}</strong><span>frentes de estudo</span></div></article>
                <article><FolderGit2 size={18} /><div><strong>{guide.steps.length}</strong><span>etapas do projeto</span></div></article>
                <article><MessageCircleQuestion size={18} /><div><strong>{weeklyQuestions.length}</strong><span>perguntas técnicas</span></div></article>
              </section>

              <section className="source-order-card">
                <span>ORDEM OFICIAL DO PLANEJAMENTO</span>
                <strong>{week.overview.sourceOrder}</strong>
                <p>Esta semana mantém a sequência do PDF-base; os blocos relacionados aparecem separados dentro do conteúdo.</p>
              </section>

              <div className="weekly-overview-grid">
                <section className="drawer-panel official-week-syllabus">
                  <div className="panel-title"><Scale size={17} /><strong>Ementa oficial desta semana</strong></div>
                  <p>Blocos vinculados: <b>{week.blocks.join(" + ")}</b>. Clique em um item para atualizar seu domínio.</p>
                  <div className="drawer-syllabus-list">
                    {week.overview.officialTopics.map((text) => {
                      const item = roadmap.syllabus.find((candidate) => candidate.week === week.number && candidate.text === text);
                      const itemStatus = item ? workspace.syllabusStatus[item.id] ?? "nao-iniciado" : "nao-iniciado";
                      return (
                        <button key={text} onClick={() => cycleSyllabusStatus(text)}>
                          <i className={`mastery-dot ${itemStatus}`} />
                          <span><strong>{text}</strong><small>{item?.id.toUpperCase()}</small></span>
                          <em>{statusLabel(itemStatus)}</em>
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section className="drawer-panel">
                  <div className="panel-title"><GraduationCap size={17} /><strong>Resultados de aprendizagem</strong></div>
                  <ul className="outcome-checklist">{week.overview.outcomes.map((outcome) => <li key={outcome}><Check size={14} />{outcome}</li>)}</ul>
                  <div className="week-status-control">
                    <span>Status geral</span><strong className={`status-pill ${status}`}>{statusLabel(status)}</strong>
                    <div className="mastery-buttons">{(["vermelho", "amarelo", "verde", "revisao"] as MasteryStatus[]).map((item) => <button key={item} className={status === item ? "selected" : ""} onClick={() => setStatus(item)}>{statusLabel(item)}</button>)}</div>
                  </div>
                </section>
              </div>

              <section className="drawer-panel">
                <div className="panel-title"><Lightbulb size={17} /><strong>Sequência recomendada</strong></div>
                <ol className="overview-priority-list">{week.content.map((item, index) => <li key={item}><span>{index + 1}</span>{item}</li>)}</ol>
              </section>
            </div>
          )}

          {tab === "Teoria e Aplicação Bancária" && (
            <div className="drawer-section-stack theory-banking-tab">
              <header className="drawer-section-intro">
                <span>2 · TEORIA E APLICAÇÃO BANCÁRIA</span>
                <h3>Fundamentação, matemática e valor de negócio</h3>
                <p>Estude o mecanismo antes da biblioteca. Depois, defenda como a técnica altera uma decisão real do banco.</p>
              </header>

              <section className="foundation-first-grid">
                <header><span>BASE DE CIENTISTA DE DADOS I</span><h4>Quatro respostas que precisam sair sem esforço</h4><p>Profundidade continua disponível abaixo; comece dominando significado, utilidade, funcionamento e aplicação.</p></header>
                <div>
                  <article><small>01 · O QUE É?</small><p>{week.theoryAndBanking.foundations[0]?.body}</p></article>
                  <article><small>02 · PARA QUE SERVE?</small><p>{week.overview.summary}</p></article>
                  <article><small>03 · COMO FUNCIONA?</small><p>{week.theoryAndBanking.foundations[1]?.body}</p></article>
                  <article><small>04 · COMO EU USARIA NO BANCO?</small><p>{week.theoryAndBanking.banking.explanation}</p></article>
                </div>
              </section>

              <section className="theory-foundation-grid">
                {week.theoryAndBanking.foundations.map((item, index) => (
                  <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h4>{item.title}</h4><p>{item.body}</p></article>
                ))}
              </section>

              <section className="math-foundation-card">
                <header><Sparkles size={18} /><div><span>FORMALIZAÇÃO ESSENCIAL</span><h4>O que a fórmula realmente diz</h4></div></header>
                <div className="math-render"><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{`$$${week.theoryAndBanking.mathematics.latex}$$`}</ReactMarkdown></div>
                <p>{week.theoryAndBanking.mathematics.explanation}</p>
              </section>

              <section className="validation-protocol-card">
                <header><Target size={18} /><div><span>AVALIAÇÃO TRANSVERSAL</span><h4>Como validar esta técnica nesta semana</h4></div></header>
                <ul>{week.theoryAndBanking.validation.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul>
                <p>O protocolo-base nasce nas semanas 6–8 e é reaplicado conforme o tipo de modelo: regressão, classificação ou agrupamento.</p>
              </section>

              <section className="banking-application-section">
                <header><Landmark size={20} /><div><span>ENFOQUE PRÁTICO · SETOR BANCÁRIO</span><h4>Da teoria para uma decisão de banco</h4><p>{week.theoryAndBanking.banking.explanation}</p></div></header>
                <div className="bank-case-grid">
                  {week.theoryAndBanking.banking.cases.map((item) => <article key={item.title}><small>{item.title}</small><strong>{item.scenario}</strong><p><b>Valor de negócio:</b> {item.businessValue}</p></article>)}
                </div>
              </section>
            </div>
          )}

          {tab === "Materiais" && (
            <div className="drawer-section-stack">
              <header className="drawer-section-intro"><span>3 · MATERIAIS</span><h3>Biblioteca orientada, sem virar lista infinita</h3><p>Os livros anteriores foram preservados; vídeos, artigos e documentação complementam pontos específicos.</p></header>
              <section className="materials-category-grid">
                <article><header><BookMarked size={18} /><div><span>BASE PRINCIPAL</span><h4>Livros e apostilas já indicados</h4></div></header><ol>{week.resources.books.map((item) => <li key={item}>{item}</li>)}</ol></article>
                <article><header><Play size={18} /><div><span>AULAS</span><h4>Vídeos e cursos</h4></div></header><ol>{week.resources.videos.map((item) => <li key={item}>{item}</li>)}</ol></article>
                <article><header><FileText size={18} /><div><span>APROFUNDAMENTO</span><h4>Artigos e documentação</h4></div></header><ol>{week.resources.articles.map((item) => <li key={item}>{item}</li>)}</ol></article>
              </section>
              <div className="copyright-note"><TriangleAlert size={15} /> Registre referências e seus próprios resumos. Não publique livros, PDFs protegidos nem dados bancários no GitHub.</div>
            </div>
          )}

          {tab === "Estudar com IA" && (
            <div className="drawer-section-stack">
              <header className="drawer-section-intro"><span>4 · ESTUDAR COM IA</span><h3>Prompt para gerar seu material completo em PDF</h3><p>Copie o texto inteiro. Ele obriga a IA a ensinar teoria, matemática, código, aplicação bancária e revisar a cobertura oficial.</p></header>
              <section className="prompt-workbench">
                <header><div><Sparkles size={18} /><span>PROMPT MESTRE · SEMANA {week.number}</span></div><CopyButton text={week.prompts.study} /></header>
                <pre>{week.prompts.study}</pre>
              </section>
              <section className="prompt-usage-guide"><strong>Como usar bem</strong><ol><li>Cole em um LLM com suporte a arquivos.</li><li>Anexe somente materiais que você tem direito de usar.</li><li>Peça a produção por capítulos se a resposta for cortada.</li><li>Exporte o resultado para PDF apenas depois de conferir fórmulas, fontes e exemplos.</li></ol></section>
            </div>
          )}

          {tab === "Projeto (Estrutura Completa CD)" && <ProjectGuidePanel week={week} workspace={workspace} onUpdate={onUpdate} />}

          {tab === "Perguntas de Sabatina" && (
            <div className="drawer-section-stack">
              <header className="drawer-section-intro"><span>6 · PERGUNTAS DE SABATINA</span><h3>Teoria pesada aplicada ao cotidiano bancário</h3><p>Responda em voz alta antes de revelar. Estruture: conceito → mecanismo → decisão → risco/limitação.</p></header>
              <section className="question-list weekly-question-list">
                {weeklyQuestions.map((item, index) => (
                  <article key={`${item.source}-${item.question}`} className={`${revealed === index ? "revealed" : ""} ${item.source === "real" ? "real-sabatina-weekly" : ""}`}>
                    <span className="question-index">{index + 1}</span>
                    <div>
                      <span className="weekly-question-source">{item.source === "real" ? `SABATINA REAL · ${item.real!.priority === "urgente" ? "REVISÃO URGENTE" : item.real!.priority === "reforcar" ? "REFORÇAR" : "MANTER"}` : "ROTEIRO DA SEMANA"}</span>
                      <strong>{item.question}</strong>
                      {revealed === index && (item.real ? <div className="weekly-real-answer"><p><b>Resposta direta:</b> {item.real.answer}</p><p><b>Por quê:</b> {item.real.reasoning}</p><p><b>No banco:</b> {item.real.banking}</p><p><b>Atenção:</b> {item.real.watchOut}</p></div> : <p>{item.answer}</p>)}
                    </div>
                    <button onClick={() => setRevealed(revealed === index ? null : index)}>{revealed === index ? "Ocultar resposta" : "Ver resposta ideal"}</button>
                  </article>
                ))}
              </section>
              <section className="prompt-workbench sabatina-prompt">
                <header><div><MessageCircleQuestion size={18} /><span>PROMPT DE SIMULAÇÃO RIGOROSA</span></div><CopyButton text={week.prompts.sabatina} label="Copiar simulador" /></header>
                <pre>{week.prompts.sabatina}</pre>
              </section>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
