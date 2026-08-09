"use client";

import { useMemo, useState, type ChangeEvent } from "react";
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
  GraduationCap,
  Landmark,
  Lightbulb,
  MessageCircleQuestion,
  Paperclip,
  Play,
  RefreshCcw,
  Sparkles,
  Target,
  TriangleAlert,
  X,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { ProjectGuidePanel } from "@/components/ProjectGuidePanel";
import { getProjectGuide } from "@/lib/project-guides";
import { modelStudyProfiles } from "@/lib/model-study-profiles";
import {
  blockPalette,
  nextMasteryStatus,
  roadmap,
  statusLabel,
  type ContentLevel,
  type MasteryStatus,
  type RoadmapWeek,
} from "@/lib/quest-data";
import { getSyllabusStudyEnhancement, syllabusStudyGuides } from "@/lib/syllabus-study-guides";
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

const tabs = ["APRENDER", "PRATICAR", "PROJETO", "SABATINA", "REVISAR", "PROGRESSO"] as const;
type Tab = (typeof tabs)[number];

const levelLabels: Record<ContentLevel, string> = {
  essential: "Essencial",
  important: "Importante",
  good_to_know: "Bom saber",
  optional: "Opcional",
};

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

function LevelBadge({ level }: { level: ContentLevel }) {
  return <span className={`content-level-badge level-${level}`}>{levelLabels[level]}</span>;
}

function LearningTopic({ item, index }: { item: (typeof roadmap.syllabus)[number]; index: number }) {
  const base = syllabusStudyGuides[item.id];
  if (!base) return null;
  const enhancement = getSyllabusStudyEnhancement(item.id);
  const model = modelStudyProfiles[item.id];
  return (
    <details className="weekly-learning-topic" open={index === 0}>
      <summary>
        <span className="topic-order">{String(index + 1).padStart(2, "0")}</span>
        <div><small>{item.block}</small><strong>{item.text}</strong></div>
        <LevelBadge level={item.contentLevel} />
      </summary>
      <div className="weekly-learning-content">
        <section className="learning-section lead"><span>ENTENDA PRIMEIRO</span><h4>O que é</h4><p>{base.what}</p></section>
        <section className="learning-section"><span>POR QUE IMPORTA</span><h4>Que problema resolve</h4><p>{base.why}</p></section>
        {enhancement.subtopics && (
          <section className="learning-section subtopic-section">
            <span>CONCEITOS QUE VOCÊ PRECISA DIFERENCIAR</span>
            <div className="subtopic-list">{enhancement.subtopics.map((subtopic) => (
              <article key={subtopic.title}><header><strong>{subtopic.title}</strong><LevelBadge level={subtopic.level} /></header><p>{subtopic.explanation}</p><small><Landmark size={15} />{subtopic.banking}</small></article>
            ))}</div>
          </section>
        )}
        <section className="learning-section decision-grid">
          <article className="use"><span>QUANDO USAR</span><p>{base.useWhen}</p></article>
          <article className="avoid"><span>QUANDO NÃO É INDICADO</span><p>{base.avoidWhen}</p></article>
        </section>
        <section className="learning-section bank"><span>APLICAÇÃO BANCÁRIA</span><h4>Como isso aparece no banco</h4><p>{base.bankExample}</p></section>
        <section className="learning-section"><span>INTERPRETAÇÃO</span><h4>Como ler e defender o resultado</h4><p>{enhancement.interpretation}</p></section>
        <section className="learning-section"><span>FLUXO PRÁTICO</span><h4>Da pergunta à decisão</h4><ol>{enhancement.workflow.map((step) => <li key={step}>{step}</li>)}</ol></section>
        {model && (
          <details className="model-checklist" open>
            <summary><Target size={18} /><div><span>CHECKLIST DE MODELO</span><strong>O que um Cientista de Dados Júnior precisa dominar</strong></div></summary>
            <div>
              <article><b>Preparação</b><p>{model.preparation}</p></article>
              <article><b>Escala</b><p>{model.scaling}</p></article>
              <article><b>Categorias e missings</b><p>{model.categoriesAndMissing}</p></article>
              <article><b>Desbalanceamento</b><p>{model.imbalance}</p></article>
              <article><b>Hiperparâmetros</b><p>{model.hyperparameters}</p></article>
              <article><b>Métricas e validação</b><p>{model.metricsAndValidation}</p></article>
              <article><b>Overfit e underfit</b><p>{model.overfitAndUnderfit}</p></article>
              <article><b>Vantagens, limites e alternativas</b><p>{model.strengthsAndLimits}</p></article>
              <article><b>Produção e monitoramento</b><p>{model.monitoring}</p></article>
            </div>
          </details>
        )}
        <section className="learning-section mistakes"><span>ERROS COMUNS</span><ul>{enhancement.commonErrors.map((error) => <li key={error}>{error}</li>)}</ul></section>
        <section className="learning-section code-hint"><span>IMPLEMENTAÇÃO MÍNIMA</span><pre><code>{enhancement.codeHint}</code></pre></section>
        <section className="learning-section exam"><span>PROVA E SABATINA</span><p>{base.examFocus}</p></section>
      </div>
    </details>
  );
}

export function WeekDrawer({ week, workspace, onClose, onUpdate, onNavigate, onSelectWeek }: WeekDrawerProps) {
  const [tab, setTab] = useState<Tab>("APRENDER");
  const [revealed, setRevealed] = useState<number | null>(null);
  const [pdfMessage, setPdfMessage] = useState("");
  const guide = useMemo(() => week ? getProjectGuide(week) : null, [week]);

  if (!week || !guide) return null;

  const weekKey = String(week.number);
  const status = workspace.weekStatus[weekKey] ?? "nao-iniciado";
  const evidence = workspace.weekEvidence[weekKey] ?? emptyEvidence;
  const checkedSteps = workspace.projectChecklist?.[weekKey] ?? [];
  const color = blockPalette[week.block] ?? "#4dd7fa";
  const officialItems = roadmap.syllabus.filter((item) => item.week === week.number);
  const previousWeek = week.number > 1 ? roadmap.weeks[week.number - 2] : null;
  const nextWeek = week.number < roadmap.weeks.length ? roadmap.weeks[week.number] : null;
  const completion = weekCompletionEvidence(workspace, week);
  const completedCriteria = Object.values(completion.criteria).filter(Boolean).length;
  const totalCriteria = Object.keys(completion.criteria).length;
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
  const setConfidence = (index: number, value: number) => onUpdate((current) => ({
    ...current,
    questionConfidence: { ...current.questionConfidence, [`${week.number}-${index + 1}`]: value },
  }));
  const toggleFlashcard = (index: number) => onUpdate((current) => {
    const id = `${week.number}-${index + 1}`;
    return { ...current, savedFlashcards: current.savedFlashcards.includes(id) ? current.savedFlashcards.filter((item) => item !== id) : [...current.savedFlashcards, id] };
  });
  const registerError = (index: number) => onUpdate((current) => {
    const question = week.sabatina[index];
    if (current.errors.some((error) => error.week === week.number && error.title === question.question)) return current;
    return { ...current, errors: [...current.errors, { id: crypto.randomUUID(), title: question.question, week: week.number, cause: "Não consegui explicar com segurança.", correction: question.answer, resolved: false, createdAt: new Date().toISOString() }] };
  });
  const changeWeek = (target: RoadmapWeek | null) => {
    if (!target) return;
    setTab("APRENDER");
    setRevealed(null);
    setPdfMessage("");
    onSelectWeek(target);
  };
  const attachPdf = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const metadata = await saveWeekPdf(week.number, file);
      onUpdate((current) => ({
        ...current,
        materialPdfs: { ...current.materialPdfs, [weekKey]: metadata },
        weekEvidence: { ...current.weekEvidence, [weekKey]: { ...(current.weekEvidence[weekKey] ?? emptyEvidence), materialGenerated: true } },
      }));
      setPdfMessage("PDF vinculado a esta semana.");
    } catch (error) {
      setPdfMessage(error instanceof Error ? error.message : "Não foi possível vincular o PDF.");
    }
    event.target.value = "";
  };
  const openPdf = async () => {
    try {
      const stored = await loadWeekPdf(week.number);
      if (!stored) throw new Error("Vincule o PDF novamente neste navegador.");
      const url = URL.createObjectURL(stored.blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.target = "_blank";
      anchor.rel = "noopener";
      anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (error) {
      setPdfMessage(error instanceof Error ? error.message : "Não foi possível abrir o PDF.");
    }
  };

  return (
    <div className="drawer-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="week-drawer week-drawer-complete weekly-study-page" role="dialog" aria-modal="true" aria-label={`Semana ${week.number}: ${week.title}`} style={{ "--week-color": color } as React.CSSProperties}>
        <button className="icon-button drawer-close" onClick={onClose} aria-label="Fechar semana"><X size={22} /></button>
        <header className="drawer-header drawer-header-complete weekly-study-header">
          <div className="drawer-week-number"><span>SEMANA</span><strong>{week.number.toString().padStart(2, "0")}</strong></div>
          <div className="drawer-week-copy"><span className="eyebrow">{week.blocks.join(" + ")}</span><h2>{week.title}</h2><p>{week.period}</p></div>
          <div className="weekly-header-metrics">
            <span><b>{completedCriteria}/{totalCriteria}</b> critérios</span>
            <span><b>{weekHours.toFixed(1)}h</b> estudadas</span>
            <span><b>{checkedSteps.length}/{guide.steps.length}</b> projeto</span>
            <span className={`status-pill ${completion.complete ? "verde" : status}`}>{completion.complete ? "Pronta para verde" : statusLabel(status)}</span>
          </div>
          <div className="drawer-week-navigation" aria-label="Navegar entre semanas">
            <button disabled={!previousWeek} onClick={() => changeWeek(previousWeek)}><ArrowLeft size={17} /><span>Anterior</span></button>
            <strong>{week.number} / {roadmap.metrics.weeks}</strong>
            <button disabled={!nextWeek} onClick={() => changeWeek(nextWeek)}><span>Próxima</span><ArrowRight size={17} /></button>
          </div>
        </header>

        <nav className="drawer-tabs weekly-six-tabs" aria-label="Seções da semana">
          {tabs.map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}{item === "PROJETO" && <small>{checkedSteps.length}/{guide.steps.length}</small>}</button>)}
        </nav>

        <div className="drawer-body drawer-body-complete weekly-study-body">
          {tab === "APRENDER" && (
            <div className="drawer-section-stack weekly-one-column">
              <header className="drawer-section-intro"><span>1 · APRENDER</span><h3>Entenda, aplique e saiba defender</h3><p>{week.overview.summary} Aqui a prioridade é entender <b>o que é, para que serve, quando usar, quando evitar e como interpretar no banco</b>.</p></header>
              <section className="weekly-objective-card"><Target size={23} /><div><span>OBJETIVO DA SEMANA</span><h4>{week.objective}</h4><ul>{week.overview.outcomes.map((outcome) => <li key={outcome}><Check size={17} />{outcome}</li>)}</ul></div></section>
              <section className="level-legend" aria-label="Níveis de profundidade"><strong>Nível esperado</strong>{(["essential", "important", "good_to_know", "optional"] as ContentLevel[]).map((level) => <LevelBadge key={level} level={level} />)}<p>O conteúdo opcional amplia repertório, mas <b>não bloqueia</b> a conclusão da semana.</p></section>

              {officialItems.length > 0 ? (
                <section className="weekly-learning-map">
                  <header><span>EMENTA OFICIAL</span><h4>{officialItems.length} {officialItems.length === 1 ? "item" : "itens"} para dominar nesta semana</h4><p>Abra um tema por vez. O conteúdo foi organizado em intuição → aplicação → interpretação → implementação.</p></header>
                  <div>{officialItems.map((item, index) => <LearningTopic key={item.id} item={item} index={index} />)}</div>
                </section>
              ) : (
                <section className="weekly-learning-map support-week">
                  <header><span>CONSOLIDAÇÃO APLICADA</span><h4>Competências que conectam a ementa</h4><p>Esta semana não adiciona um novo item oficial; ela integra os fundamentos já estudados.</p></header>
                  <div>{week.pedagogy.learningSections.map((item, index) => <article className="support-learning-card" key={item.id}><span>{String(index + 1).padStart(2, "0")}</span><div><LevelBadge level={item.contentLevel} /><h4>{item.title}</h4><p>{week.theoryAndBanking.foundations[index % week.theoryAndBanking.foundations.length]?.body ?? week.objective}</p></div></article>)}</div>
                </section>
              )}

              <details className="optional-depth-card">
                <summary><Sparkles size={20} /><div><LevelBadge level="optional" /><strong>Aprofundamento opcional — não necessário para concluir esta semana</strong></div><span>Abrir</span></summary>
                <div className="weekly-markdown"><ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>{`### Intuição matemática\n\n${week.theoryAndBanking.mathematics.explanation}\n\n$$${week.theoryAndBanking.mathematics.latex}$$\n\n- Explique os símbolos em linguagem simples.\n- Relacione a fórmula a uma decisão prática.\n- Não memorize a derivação se ela não mudar sua escolha.`}</ReactMarkdown></div>
              </details>

              <section className="ai-material-card">
                <header><Sparkles size={22} /><div><span>ESTUDAR COM IA</span><h4>Material completo para esta semana</h4><p>Gere um PDF didático no nível de Cientista de Dados Júnior: teoria necessária, prática, interpretação, aplicação bancária, código e sabatina.</p></div></header>
                <div className="week-action-row">
                  <CopyButton text={week.prompts.study} label="Copiar prompt" />
                  <button className="week-action-button" onClick={() => downloadPrompt(week.number, week.prompts.study)}><Download size={17} />Exportar .md</button>
                  <button className={`week-action-button ${evidence.materialGenerated ? "done" : ""}`} onClick={() => updateEvidence("materialGenerated", !evidence.materialGenerated)}><FileCheck2 size={17} />{evidence.materialGenerated ? "Material gerado" : "Marcar como gerado"}</button>
                  <label className="week-action-button file-button"><Paperclip size={17} />Vincular PDF<input type="file" accept="application/pdf" onChange={(event) => void attachPdf(event)} /></label>
                  {materialPdf && <button className="week-action-button" onClick={() => void openPdf()}><ExternalLink size={17} />Abrir PDF</button>}
                </div>
                {materialPdf && <p className="attached-file"><FileText size={16} />{materialPdf.fileName}</p>}
                {pdfMessage && <p className="pdf-message" role="status">{pdfMessage}</p>}
                <details className="prompt-preview"><summary>Ver prompt completo</summary><pre>{week.prompts.study}</pre></details>
              </section>

              <section className="weekly-materials">
                <details><summary><BookMarked size={19} /><strong>Livros e materiais-base</strong><span>{week.resources.books.length}</span></summary><ol>{week.resources.books.map((item) => <li key={item}>{item}</li>)}</ol></details>
                <details><summary><Play size={19} /><strong>Vídeos e aulas</strong><span>{week.resources.videos.length}</span></summary><ol>{week.resources.videos.map((item) => <li key={item}>{item}</li>)}</ol></details>
                <details><summary><FileText size={19} /><strong>Artigos e documentação</strong><span>{week.resources.articles.length}</span></summary><ol>{week.resources.articles.map((item) => <li key={item}>{item}</li>)}</ol></details>
              </section>
            </div>
          )}

          {tab === "PRATICAR" && (
            <div className="drawer-section-stack weekly-one-column">
              <header className="drawer-section-intro"><span>2 · PRATICAR</span><h3>Exercícios curtos antes do projeto</h3><p>Resolva com dados pequenos, explique cada decisão e só depois compare sua resposta com uma IA ou documentação.</p></header>
              <section className="practice-exercises"><header><Lightbulb size={21} /><div><span>EXERCÍCIOS GUIADOS</span><h4>Do entendimento à implementação</h4></div></header><ol>{week.practice.exercises.map((exercise) => <li key={exercise}>{exercise}</li>)}</ol></section>
              {week.practice.codeExamples.map((example) => <section className="practice-code" key={example.title}><header><Code2 size={19} /><div><span>EXEMPLO · {example.language}</span><h4>{example.title}</h4></div></header><pre><code>{example.code}</code></pre></section>)}
              <section className="practice-checklist"><header><CheckCircle2 size={21} /><div><span>ENTREGA MÍNIMA</span><h4>O que fazer no notebook</h4></div></header><p><code>{week.practice.notebook}</code></p><ul>{week.practice.tasks.map((task) => <li key={task}><Check size={17} />{task}</li>)}</ul><div className="exam-practice"><GraduationCap size={20} /><div><b>Treino de prova</b><p>{week.practice.examPractice}</p></div></div><button className={`primary-week-button ${evidence.practiceComplete ? "done" : ""}`} onClick={() => updateEvidence("practiceComplete", !evidence.practiceComplete)}>{evidence.practiceComplete ? <><Check size={18} />Prática concluída</> : "Marcar prática como concluída"}</button></section>
            </div>
          )}

          {tab === "PROJETO" && <ProjectGuidePanel week={week} workspace={workspace} onUpdate={onUpdate} />}

          {tab === "SABATINA" && (
            <div className="drawer-section-stack weekly-one-column">
              <header className="drawer-section-intro"><span>4 · SABATINA</span><h3>Explique como alguém que aplicaria amanhã</h3><p>Responda em voz alta: <b>o que é → para que serve → quando usar/evitar → como aplicar → como interpretar</b>. Depois revele a resposta e registre sua confiança.</p></header>
              <section className="weekly-sabatina-list">{week.sabatina.map((item, index) => {
                const questionId = `${week.number}-${index + 1}`;
                const confidence = workspace.questionConfidence[questionId] ?? 0;
                const saved = workspace.savedFlashcards.includes(questionId);
                return <article key={item.question} className={revealed === index ? "revealed" : ""}><header><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.question}</strong></header>{revealed === index && <div className="ideal-answer"><small>RESPOSTA TÉCNICA IDEAL</small><p>{item.answer}</p></div>}<div className="question-actions"><button onClick={() => setRevealed(revealed === index ? null : index)}>{revealed === index ? "Ocultar resposta" : "Ver resposta ideal"}</button><div className="confidence-control"><span>Minha confiança</span>{[1, 2, 3].map((value) => <button key={value} className={confidence === value ? "selected" : ""} onClick={() => setConfidence(index, value)}>{value}</button>)}</div><button className={saved ? "selected" : ""} onClick={() => toggleFlashcard(index)}>{saved ? "Flashcard salvo" : "Criar flashcard"}</button><button onClick={() => registerError(index)}>Registrar erro</button></div></article>;
              })}</section>
              <section className="prompt-workbench sabatina-prompt"><header><div><MessageCircleQuestion size={19} /><span>SIMULADOR RIGOROSO · UMA PERGUNTA POR VEZ</span></div><CopyButton text={week.prompts.sabatina} label="Copiar simulador" /></header><pre>{week.prompts.sabatina}</pre></section>
            </div>
          )}

          {tab === "REVISAR" && (
            <div className="drawer-section-stack weekly-one-column">
              <header className="drawer-section-intro"><span>5 · REVISAR</span><h3>Volte ao que ainda não está seguro</h3><p>A revisão reúne os itens oficiais pendentes, flashcards e erros da semana. Nada aqui altera as avaliações gerais de Sabatina Teste e Provas Teste.</p></header>
              <section className="review-summary-grid"><article><RefreshCcw size={22} /><strong>{officialItems.filter((item) => workspace.syllabusStatus[item.id] !== "verde").length}</strong><span>itens para revisar</span></article><article><MessageCircleQuestion size={22} /><strong>{savedQuestions.length}</strong><span>flashcards salvos</span></article><article><TriangleAlert size={22} /><strong>{weekErrors.length}</strong><span>erros abertos</span></article></section>
              <section className="review-list"><header><GraduationCap size={20} /><div><span>EMENTA DA SEMANA</span><h4>Atualize o domínio após explicar sem consultar</h4></div></header>{officialItems.length ? officialItems.map((item) => { const itemStatus = workspace.syllabusStatus[item.id] ?? "nao-iniciado"; return <button key={item.id} onClick={() => cycleSyllabus(item.id)}><i className={`mastery-dot ${itemStatus}`} /><span><strong>{item.text}</strong><small>{statusLabel(itemStatus)} · clique para alterar</small></span></button>; }) : <p>Esta é uma semana de integração. Revise os itens oficiais citados no projeto e na sabatina.</p>}</section>
              <section className="review-links"><button onClick={() => onNavigate("flashcards")}><MessageCircleQuestion size={19} /><span><b>Abrir central de flashcards</b><small>Revisão espaçada e respostas curtas</small></span><ArrowRight size={17} /></button><button onClick={() => onNavigate("erros")}><TriangleAlert size={19} /><span><b>Abrir caderno de erros</b><small>Corrija a causa, não apenas a resposta</small></span><ArrowRight size={17} /></button><button onClick={() => onNavigate("estudio")}><FileText size={19} /><span><b>Abrir estúdio</b><small>Notas, Markdown, fórmulas e imagens</small></span><ArrowRight size={17} /></button></section>
            </div>
          )}

          {tab === "PROGRESSO" && (
            <div className="drawer-section-stack weekly-one-column">
              <header className="drawer-section-intro"><span>6 · PROGRESSO</span><h3>Conclusão baseada em evidências</h3><p>Uma semana só fica verde quando você estudou a parte essencial, praticou, entregou o mínimo do projeto e consegue explicar, escolher e interpretar. Conteúdo opcional não bloqueia.</p></header>
              <section className="progress-hero"><div className="progress-ring" style={{ "--progress": `${Math.round((completedCriteria / totalCriteria) * 100)}%` } as React.CSSProperties}><strong>{Math.round((completedCriteria / totalCriteria) * 100)}%</strong><span>evidências</span></div><div><span>RESUMO</span><h4>{completedCriteria} de {totalCriteria} critérios cumpridos</h4><p>{weekHours.toFixed(1)} horas estudadas · {Math.round(completion.sabatinaRate * 100)}% da sabatina com confiança 2 ou 3 · {checkedSteps.length} etapas do projeto.</p></div></section>
              <section className="completion-criteria"><h4>Checklist obrigatório</h4>
                <label className={completion.criteria.essentialStudied ? "done" : ""}><input type="checkbox" checked={completion.criteria.essentialStudied} disabled={officialItems.length > 0} onChange={(event) => updateEvidence("essentialStudied", event.target.checked)} /><span><b>Conteúdo essencial estudado</b><small>{officialItems.length ? "Todos os itens oficiais desta semana precisam estar verdes na aba Revisar." : "Marque após revisar as competências integradoras."}</small></span></label>
                <label className={completion.criteria.sabatinaReady ? "done" : ""}><input type="checkbox" checked={completion.criteria.sabatinaReady} disabled readOnly /><span><b>Pelo menos 80% da sabatina com confiança</b><small>Use os níveis 2 ou 3 na aba Sabatina.</small></span></label>
                <label className={completion.criteria.practiceComplete ? "done" : ""}><input type="checkbox" checked={evidence.practiceComplete} onChange={(event) => updateEvidence("practiceComplete", event.target.checked)} /><span><b>Exercícios principais concluídos</b><small>Registre uma implementação mínima na aba Praticar.</small></span></label>
                <label className={completion.criteria.projectMinimum ? "done" : ""}><input type="checkbox" checked={completion.criteria.projectMinimum} disabled readOnly /><span><b>Entrega mínima do projeto</b><small>Conclua pelo menos três etapas do checklist do projeto.</small></span></label>
                {([["explainReady", "Consigo explicar o que é e para que serve"], ["useReady", "Consigo escolher quando usar e quando evitar"], ["interpretationReady", "Consigo interpretar e aplicar no banco"]] as Array<[keyof WeekEvidence, string]>).map(([field, label]) => <label key={field} className={evidence[field] ? "done" : ""}><input type="checkbox" checked={evidence[field]} onChange={(event) => updateEvidence(field, event.target.checked)} /><span><b>{label}</b><small>Autoavaliação consciente: marque somente se consegue responder sem ler.</small></span></label>)}
              </section>
              <section className="week-final-status"><div><span>STATUS DA SEMANA</span><strong className={`status-pill ${status}`}>{statusLabel(status)}</strong><p>{completion.complete ? "Todas as evidências foram cumpridas. Você pode concluir a semana." : "Ainda há critérios pendentes; o botão verde será liberado quando estiver pronta."}</p></div><button className="complete-week-button" disabled={!completion.complete} onClick={() => setStatus("verde")}><CheckCircle2 size={20} />Concluir semana em verde</button><div className="manual-statuses"><button onClick={() => setStatus("vermelho")}>Preciso reaprender</button><button onClick={() => setStatus("amarelo")}>Ainda insegura</button><button onClick={() => setStatus("revisao")}>Agendar revisão</button></div></section>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
