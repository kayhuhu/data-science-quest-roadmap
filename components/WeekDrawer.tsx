"use client";

import { useState, type ChangeEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  Check,
  CheckCircle2,
  Clipboard,
  Code2,
  Download,
  ExternalLink,
  FileCheck2,
  FileText,
  FolderTree,
  GraduationCap,
  MessageCircleQuestion,
  Paperclip,
  Play,
  RefreshCcw,
  Sparkles,
  TriangleAlert,
  X,
} from "lucide-react";
import {
  blockPalette,
  nextMasteryStatus,
  roadmap,
  statusLabel,
  type MasteryStatus,
  type RoadmapWeek,
} from "@/lib/quest-data";
import { loadWeekPdf, saveWeekPdf } from "@/lib/week-material-storage";
import {
  weekCompletionEvidence,
  type QuestWorkspace,
  type WeekEvidence,
} from "@/lib/use-quest-workspace";

type WeekDrawerProps = {
  week: RoadmapWeek | null;
  workspace: QuestWorkspace;
  onClose: () => void;
  onUpdate: (recipe: (current: QuestWorkspace) => QuestWorkspace) => void;
  onNavigate: (view: string) => void;
  onSelectWeek: (week: RoadmapWeek) => void;
};

const tabs = ["ESTUDAR", "PRATICAR", "SABATINA", "REVISAR"] as const;
type Tab = (typeof tabs)[number];

const emptyEvidence: WeekEvidence = {
  essentialStudied: false,
  practiceComplete: false,
  explainReady: false,
  useReady: false,
  interpretationReady: false,
  materialGenerated: false,
};

function CopyButton({ text, label = "Copiar" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return <button className="week-action-button" onClick={() => void copy()}><Clipboard size={17} />{copied ? "Copiado!" : label}</button>;
}

function downloadPrompt(week: number, prompt: string) {
  const blob = new Blob([prompt], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `semana-${String(week).padStart(2, "0")}-prompt-estudo.md`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function WeekDrawer({ week, workspace, onClose, onUpdate, onNavigate, onSelectWeek }: WeekDrawerProps) {
  const [tab, setTab] = useState<Tab>("ESTUDAR");
  const [revealedQuestion, setRevealedQuestion] = useState<number | null>(null);
  const [revealedCard, setRevealedCard] = useState<string | null>(null);
  const [pdfMessage, setPdfMessage] = useState("");

  if (!week) return null;

  const weekKey = String(week.number);
  const status = workspace.weekStatus[weekKey] ?? "nao-iniciado";
  const evidence = workspace.weekEvidence[weekKey] ?? emptyEvidence;
  const completedLabSteps = workspace.projectChecklist?.[weekKey] ?? [];
  const color = blockPalette[week.block] ?? "#4dd7fa";
  const officialItems = roadmap.syllabus.filter((item) => item.week === week.number);
  const previousWeek = week.number > 1 ? roadmap.weeks[week.number - 2] : null;
  const nextWeek = week.number < roadmap.weeks.length ? roadmap.weeks[week.number] : null;
  const completion = weekCompletionEvidence(workspace, week);
  const completedCriteria = Object.values(completion.criteria).filter(Boolean).length;
  const totalCriteria = Object.keys(completion.criteria).length;
  const progress = Math.round((completedCriteria / totalCriteria) * 100);
  const weekHours = workspace.sessions.filter((session) => session.week === week.number).reduce((sum, session) => sum + session.seconds, 0) / 3600;
  const savedQuestions = week.sabatina.filter((_, index) => workspace.savedFlashcards.includes(`${week.number}-${index + 1}`));
  const weekErrors = workspace.errors.filter((error) => error.week === week.number && !error.resolved);
  const materialPdf = workspace.materialPdfs[weekKey];

  const setStatus = (next: MasteryStatus) => onUpdate((current) => ({ ...current, weekStatus: { ...current.weekStatus, [weekKey]: next } }));
  const updateEvidence = (field: keyof WeekEvidence, value: boolean) => onUpdate((current) => ({
    ...current,
    weekEvidence: { ...current.weekEvidence, [weekKey]: { ...(current.weekEvidence[weekKey] ?? emptyEvidence), [field]: value } },
  }));
  const cycleSyllabus = (id: string) => onUpdate((current) => ({
    ...current,
    syllabusStatus: { ...current.syllabusStatus, [id]: nextMasteryStatus(current.syllabusStatus[id] ?? "nao-iniciado") },
  }));
  const toggleLabStep = (index: number) => onUpdate((current) => {
    const stepId = String(index);
    const currentSteps = current.projectChecklist?.[weekKey] ?? [];
    const nextSteps = currentSteps.includes(stepId) ? currentSteps.filter((step) => step !== stepId) : [...currentSteps, stepId];
    return { ...current, projectChecklist: { ...current.projectChecklist, [weekKey]: nextSteps } };
  });
  const setConfidence = (index: number, value: number) => onUpdate((current) => ({
    ...current,
    questionConfidence: { ...current.questionConfidence, [`${week.number}-${index + 1}`]: value },
  }));
  const toggleQuestionFlashcard = (index: number) => onUpdate((current) => {
    const id = `${week.number}-${index + 1}`;
    return { ...current, savedFlashcards: current.savedFlashcards.includes(id) ? current.savedFlashcards.filter((item) => item !== id) : [...current.savedFlashcards, id] };
  });
  const toggleReviewedFlashcard = (id: string) => onUpdate((current) => ({
    ...current,
    reviewedFlashcards: current.reviewedFlashcards.includes(id) ? current.reviewedFlashcards.filter((item) => item !== id) : [...current.reviewedFlashcards, id],
  }));
  const registerError = (index: number) => onUpdate((current) => {
    const question = week.sabatina[index];
    if (current.errors.some((error) => error.week === week.number && error.title === question.question)) return current;
    return { ...current, errors: [...current.errors, { id: crypto.randomUUID(), title: question.question, week: week.number, cause: "Não consegui explicar com segurança.", correction: question.answer, responseGiven: "Não registrada", correctResponse: question.answer, conceptualError: "Rever conceito, escolha e aplicação.", topic: question.topic, syllabusItem: question.syllabusItem, nextReview: new Date(Date.now() + 86_400_000).toISOString(), resolved: false, createdAt: new Date().toISOString() }] };
  });
  const changeWeek = (target: RoadmapWeek | null) => {
    if (!target) return;
    setTab("ESTUDAR");
    setRevealedQuestion(null);
    setRevealedCard(null);
    setPdfMessage("");
    onSelectWeek(target);
  };
  const attachPdf = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const metadata = await saveWeekPdf(week.number, file);
      onUpdate((current) => ({ ...current, materialPdfs: { ...current.materialPdfs, [weekKey]: metadata } }));
      setPdfMessage("PDF anexado a esta semana.");
    } catch (error) {
      setPdfMessage(error instanceof Error ? error.message : "Não foi possível anexar o PDF.");
    }
    event.target.value = "";
  };
  const openPdf = async () => {
    try {
      const stored = await loadWeekPdf(week.number);
      if (!stored) throw new Error("Anexe o PDF novamente neste navegador.");
      const url = URL.createObjectURL(stored.blob);
      window.open(url, "_blank", "noopener,noreferrer");
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (error) {
      setPdfMessage(error instanceof Error ? error.message : "Não foi possível abrir o PDF.");
    }
  };

  return (
    <div className="drawer-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="week-drawer week-drawer-complete weekly-study-page weekly-four-tab-page" role="dialog" aria-modal="true" aria-label={`Semana ${week.number}: ${week.title}`} style={{ "--week-color": color } as React.CSSProperties}>
        <button className="icon-button drawer-close" onClick={onClose} aria-label="Fechar semana"><X size={22} /></button>

        <header className="weekly-study-header weekly-compact-header">
          <div className="drawer-week-number"><span>SEMANA</span><strong>{week.number.toString().padStart(2, "0")}</strong></div>
          <div className="drawer-week-copy"><span className="eyebrow">{week.blocks.join(" + ")}</span><h2>{week.title}</h2><p>{week.period}</p></div>
          <div className="weekly-header-metrics">
            <span className={`status-pill ${status}`}>{statusLabel(status)}</span>
            <span><b>{progress}%</b> progresso</span>
            <span><b>{weekHours.toFixed(1)}h</b> estudadas</span>
          </div>
          <details className="header-progress-panel">
            <summary><span>Detalhes do progresso</span><b>{completedCriteria}/{totalCriteria}</b></summary>
            <div className="header-progress-content">
              <div className="compact-progress-bar"><i style={{ width: `${progress}%` }} /></div>
              <ul>
                <li className={completion.criteria.essentialStudied ? "done" : ""}><Check size={15} />Ementa estudada</li>
                <li className={completion.criteria.practiceComplete ? "done" : ""}><Check size={15} />Mini Lab concluído</li>
                <li className={completion.criteria.sabatinaReady ? "done" : ""}><Check size={15} />Sabatina essencial</li>
                <li className={completion.criteria.flashcardsReviewed ? "done" : ""}><Check size={15} />Flashcards essenciais</li>
                <li className={completion.criteria.projectMinimum ? "done" : ""}><Check size={15} />Entrega mínima</li>
                <li className={completion.criteria.explainReady ? "done" : ""}><Check size={15} />Explicar</li>
                <li className={completion.criteria.useReady ? "done" : ""}><Check size={15} />Aplicar</li>
                <li className={completion.criteria.interpretationReady ? "done" : ""}><Check size={15} />Interpretar</li>
              </ul>
              <button className="complete-week-button" disabled={!completion.complete} onClick={() => setStatus("verde")}><CheckCircle2 size={18} />Concluir semana</button>
            </div>
          </details>
        </header>

        <nav className="drawer-tabs weekly-four-tabs" aria-label="Seções da semana">
          {tabs.map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}</button>)}
        </nav>

        <div className="week-navigation-strip" aria-label="Navegar entre semanas">
          <button disabled={!previousWeek} onClick={() => changeWeek(previousWeek)}><ArrowLeft size={16} />Semana anterior</button>
          <span>{week.number} de {roadmap.metrics.weeks}</span>
          <button disabled={!nextWeek} onClick={() => changeWeek(nextWeek)}>Próxima semana<ArrowRight size={16} /></button>
        </div>

        <div className="drawer-body drawer-body-complete weekly-study-body">
          {tab === "ESTUDAR" && (
            <div className="drawer-section-stack weekly-one-column">
              <header className="drawer-section-intro"><span>1 · ESTUDAR</span><h3>O que exatamente aprender esta semana?</h3><p>A ementa vem primeiro. Depois, use o mapa enxuto para entender o suficiente para aplicar, interpretar e responder na sabatina.</p></header>

              <section className="weekly-syllabus-focus">
                <header><GraduationCap size={22} /><div><span>EMENTA DA SEMANA</span><h4>{officialItems.length ? `${officialItems.length} itens oficiais` : "Semana de consolidação"}</h4></div></header>
                {officialItems.length ? <div className="syllabus-checklist">{officialItems.map((item) => {
                  const itemStatus = workspace.syllabusStatus[item.id] ?? "nao-iniciado";
                  return <button key={item.id} onClick={() => cycleSyllabus(item.id)}><i className={`mastery-dot ${itemStatus}`} /><span><b>{item.text}</b><small>{item.block} · {statusLabel(itemStatus)}</small></span></button>;
                })}</div> : <p>Nenhum tópico novo: audite, recupere lacunas e conecte os itens oficiais já estudados.</p>}
                {week.studyScope.appliedEvaluation.length > 0 && <div className="applicable-evaluation"><span>AVALIAÇÃO APLICÁVEL</span>{week.studyScope.appliedEvaluation.map((item) => <b key={item}>{item}</b>)}</div>}
              </section>

              <section className="compact-study-map">
                <header><span>O QUE ESTUDAR</span><h4>Mapa dos conceitos necessários</h4><p>Leia a ideia central; abra “Ver mais” somente quando precisar.</p></header>
                <div>{week.studyScope.map.map((concept) => <article key={concept.name}>
                  <h4>{concept.name}</h4>
                  <p><b>O que é:</b> {concept.what}</p>
                  <p><b>Por que importa em Ciência de Dados:</b> {concept.why}</p>
                  <p className="banking-example"><b>Exemplo bancário:</b> {concept.banking}</p>
                  {concept.more && <details><summary>Ver mais</summary><p>{concept.more}</p></details>}
                </article>)}</div>
              </section>

              <section className="ai-material-card">
                <header><Sparkles size={22} /><div><span>ESTUDAR COM IA</span><h4>Gerar apostila completa da semana</h4><p>Do conhecimento zero ao nível Júnior: teoria, Ciência de Dados, prática, interpretação, matemática necessária, banco e sabatina.</p></div></header>
                <div className="week-action-row">
                  <CopyButton text={week.prompts.study} label="Copiar prompt" />
                  <button className="week-action-button" onClick={() => downloadPrompt(week.number, week.prompts.study)}><Download size={17} />Baixar prompt .md</button>
                  <label className="week-action-button file-button"><Paperclip size={17} />Anexar PDF<input type="file" accept="application/pdf" onChange={(event) => void attachPdf(event)} /></label>
                  {materialPdf && <button className="week-action-button" onClick={() => void openPdf()}><ExternalLink size={17} />Abrir PDF anexado</button>}
                  <button className={`week-action-button ${evidence.materialGenerated ? "done" : ""}`} onClick={() => updateEvidence("materialGenerated", !evidence.materialGenerated)}><FileCheck2 size={17} />{evidence.materialGenerated ? "Material estudado" : "Marcar material como estudado"}</button>
                </div>
                {materialPdf && <p className="attached-file"><FileText size={16} />{materialPdf.fileName}</p>}
                {pdfMessage && <p className="pdf-message" role="status">{pdfMessage}</p>}
                <details className="prompt-preview"><summary>Ver prompt</summary><pre>{week.prompts.study}</pre></details>
              </section>

              <section className="weekly-materials curated-materials">
                <header><BookMarked size={20} /><div><span>MATERIAIS</span><h4>Uma rota principal, sem excesso de links</h4></div></header>
                <div className="material-shortlist">
                  <article><BookMarked size={18} /><span>Material principal</span><b>{week.resources.books[0]}</b></article>
                  <article><FileText size={18} /><span>Material complementar</span><b>{week.resources.articles[0]}</b></article>
                  <article><Play size={18} /><span>Vídeo principal</span><b>{week.resources.videos[0]}</b></article>
                </div>
                <details><summary>Ver todos os materiais</summary><div className="all-materials"><section><b>Livros</b><ul>{week.resources.books.map((item) => <li key={item}>{item}</li>)}</ul></section><section><b>Vídeos</b><ul>{week.resources.videos.map((item) => <li key={item}>{item}</li>)}</ul></section><section><b>Artigos</b><ul>{week.resources.articles.map((item) => <li key={item}>{item}</li>)}</ul></section></div></details>
              </section>
            </div>
          )}

          {tab === "PRATICAR" && (
            <div className="drawer-section-stack weekly-one-column">
              <header className="drawer-section-intro"><span>2 · PRATICAR</span><h3>Como provar que realmente entendeu?</h3><p>Faça uma entrega pequena e interpretável em {week.miniLab.duration}. O objetivo é praticar os itens da semana, não montar uma aplicação de produção.</p></header>
              <section className="mini-lab-card">
                <header><Code2 size={23} /><div><span>MINI LAB DA SEMANA · {week.miniLab.duration}</span><h4>{week.miniLab.title}</h4><p>{week.miniLab.objective}</p></div></header>
                <ol className="mini-lab-steps">{week.miniLab.steps.map((step, index) => <li key={step} className={completedLabSteps.includes(String(index)) ? "done" : ""}><button onClick={() => toggleLabStep(index)}><i>{completedLabSteps.includes(String(index)) ? <Check size={16} /> : index + 1}</i><span>{step}</span></button></li>)}</ol>
                <div className="lab-delivery"><FolderTree size={20} /><div><span>ENTREGA TÍPICA</span><pre>{week.miniLab.files.join("\n")}</pre></div></div>
                <button className={`primary-week-button ${evidence.practiceComplete ? "done" : ""}`} onClick={() => updateEvidence("practiceComplete", !evidence.practiceComplete)}>{evidence.practiceComplete ? <><Check size={18} />Mini Lab concluído</> : "Marcar Mini Lab como concluído"}</button>
              </section>
              <details className="practice-details" open><summary><FileText size={19} />O que escrever no README</summary><ol>{week.miniLab.readmeQuestions.map((question) => <li key={question}>{question}</li>)}</ol></details>
              <details className="practice-details"><summary><Code2 size={19} />Exemplo mínimo de código</summary>{week.practice.codeExamples.map((example) => <section className="practice-code" key={example.title}><header><span>{example.language}</span><h4>{example.title}</h4></header><pre><code>{example.code}</code></pre></section>)}</details>
              <details className="practice-details"><summary><FolderTree size={19} />Versionar no GitHub, passo a passo</summary><ol>{week.miniLab.gitFlow.map((command) => <li key={command}>{command.startsWith("git ") ? <code>{command}</code> : command}</li>)}</ol></details>
              {week.project.portfolioMilestone && <section className="portfolio-milestone"><Sparkles size={21} /><div><span>MARCO DE PORTFÓLIO OPCIONAL</span><h4>{week.project.title}</h4><p>{week.project.objective}</p><button onClick={() => onNavigate("projetos")}>Abrir projeto maior<ArrowRight size={16} /></button></div></section>}
            </div>
          )}

          {tab === "SABATINA" && (
            <div className="drawer-section-stack weekly-one-column">
              <header className="drawer-section-intro"><span>3 · SABATINA</span><h3>Defenda a aplicação, não apenas a definição</h3><p>Responda em voz alta: o que é, para que serve, quando usar ou evitar, como interpretar e como aplicar no banco.</p></header>
              <section className="weekly-sabatina-list">{week.sabatina.map((item, index) => {
                const questionId = `${week.number}-${index + 1}`;
                const confidence = workspace.questionConfidence[questionId] ?? 0;
                const saved = workspace.savedFlashcards.includes(questionId);
                return <article key={item.id} className={revealedQuestion === index ? "revealed" : ""}>
                  <header><span>{String(index + 1).padStart(2, "0")}</span><div><div className="question-metadata"><small>{item.sourceLabel}</small><small>{item.questionType}</small><small>{item.difficulty}</small></div><strong>{item.question}</strong></div></header>
                  {revealedQuestion === index && <div className="ideal-answer"><small>RESPOSTA TÉCNICA IDEAL</small><p>{item.answer}</p></div>}
                  <div className="question-actions"><button onClick={() => setRevealedQuestion(revealedQuestion === index ? null : index)}>{revealedQuestion === index ? "Ocultar resposta" : "Ver resposta ideal"}</button><div className="confidence-control"><span>Confiança</span>{[1, 2, 3].map((value) => <button key={value} className={confidence === value ? "selected" : ""} onClick={() => setConfidence(index, value)}>{value}</button>)}</div><button className={saved ? "selected" : ""} onClick={() => toggleQuestionFlashcard(index)}>{saved ? "Flashcard salvo" : "Criar flashcard"}</button><button onClick={() => registerError(index)}>Registrar erro</button></div>
                </article>;
              })}</section>
              <section className="prompt-workbench sabatina-prompt"><header><div><MessageCircleQuestion size={19} /><span>SIMULADOR · UMA PERGUNTA POR VEZ</span></div><CopyButton text={week.prompts.sabatina} label="Copiar simulador" /></header><pre>{week.prompts.sabatina}</pre></section>
            </div>
          )}

          {tab === "REVISAR" && (
            <div className="drawer-section-stack weekly-one-column">
              <header className="drawer-section-intro"><span>4 · REVISAR</span><h3>Recupere o conteúdo sem consultar</h3><p>Use flashcards atômicos, revisite erros e confirme o domínio com critérios compactos.</p></header>
              <section className="review-summary-grid"><article><RefreshCcw size={22} /><strong>{officialItems.filter((item) => workspace.syllabusStatus[item.id] !== "verde").length}</strong><span>itens pendentes</span></article><article><MessageCircleQuestion size={22} /><strong>{week.flashcards.length}</strong><span>flashcards-semente</span></article><article><TriangleAlert size={22} /><strong>{weekErrors.length}</strong><span>erros abertos</span></article></section>
              <section className="weekly-flashcards"><header><MessageCircleQuestion size={20} /><div><span>FLASHCARDS DA SEMANA</span><h4>Uma ideia por cartão</h4></div></header><div>{week.flashcards.map((card) => {
                const reviewed = workspace.reviewedFlashcards.includes(card.id);
                return <article key={card.id} className={reviewed ? "reviewed" : ""}><button className="flashcard-face" onClick={() => setRevealedCard(revealedCard === card.id ? null : card.id)}><span>{card.type}</span><strong>{card.front}</strong>{revealedCard === card.id && <p>{card.back}</p>}<small>{revealedCard === card.id ? "Ocultar resposta" : "Revelar resposta"}</small></button><button className="flashcard-review" onClick={() => toggleReviewedFlashcard(card.id)}>{reviewed ? <><Check size={16} />Revisado</> : "Marcar revisado"}</button></article>;
              })}</div></section>
              <details className="completion-criteria compact-mastery"><summary><CheckCircle2 size={20} />Critério de domínio da semana</summary>
                <label className={completion.criteria.essentialStudied ? "done" : ""}><input type="checkbox" checked={completion.criteria.essentialStudied} disabled={officialItems.length > 0} onChange={(event) => updateEvidence("essentialStudied", event.target.checked)} /><span><b>Ementa oficial estudada</b><small>{officialItems.length ? "Marque os itens como verdes na aba Estudar." : "Confirme a consolidação dos itens anteriores."}</small></span></label>
                {([['explainReady', 'Consigo explicar o que é e para que serve'], ['useReady', 'Consigo escolher quando usar e quando não usar'], ['interpretationReady', 'Consigo interpretar e aplicar em um caso bancário']] as Array<[keyof WeekEvidence, string]>).map(([field, label]) => <label key={field} className={evidence[field] ? "done" : ""}><input type="checkbox" checked={evidence[field]} onChange={(event) => updateEvidence(field, event.target.checked)} /><span><b>{label}</b><small>Marque somente se consegue responder sem ler.</small></span></label>)}
              </details>
              <section className="review-links"><button onClick={() => onNavigate("flashcards")}><MessageCircleQuestion size={19} /><span><b>Abrir central de flashcards</b><small>{savedQuestions.length} perguntas salvas nesta semana</small></span><ArrowRight size={17} /></button><button onClick={() => onNavigate("erros")}><TriangleAlert size={19} /><span><b>Abrir caderno de erros</b><small>Corrija a causa do erro</small></span><ArrowRight size={17} /></button><button onClick={() => onNavigate("estudio")}><FileText size={19} /><span><b>Abrir estúdio</b><small>Notas, fórmulas e imagens</small></span><ArrowRight size={17} /></button></section>
              <section className="manual-statuses review-statuses"><button onClick={() => setStatus("vermelho")}>Preciso reaprender</button><button onClick={() => setStatus("amarelo")}>Ainda insegura</button><button onClick={() => setStatus("revisao")}>Agendar revisão</button></section>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
