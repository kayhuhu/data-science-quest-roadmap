"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  FileQuestion,
  Filter,
  GraduationCap,
  MessageCircleQuestion,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  XCircle,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import {
  assessmentBank,
  assessmentQuestionCount,
  reconstructedDatasets,
  type Assessment,
} from "@/lib/assessment-data";
import {
  realSabatinaQuestions,
  sabatinaPriorityLabel,
  type SabatinaPriority,
} from "@/lib/real-sabatina";
import type { QuestWorkspace } from "@/lib/use-quest-workspace";

type AssessmentWorkspaceProps = {
  workspace: QuestWorkspace;
  onUpdate: (recipe: (current: QuestWorkspace) => QuestWorkspace) => void;
};

const priorityOrder: SabatinaPriority[] = ["urgente", "reforcar", "manter"];

export function SabatinaTestView({ workspace, onUpdate }: AssessmentWorkspaceProps) {
  const [priority, setPriority] = useState<SabatinaPriority | "todas">("todas");
  const [topic, setTopic] = useState("todos");
  const [block, setBlock] = useState("todos");
  const [questionType, setQuestionType] = useState("todos");
  const [wrongOnly, setWrongOnly] = useState(false);
  const [practicalOnly, setPracticalOnly] = useState(false);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [draft, setDraft] = useState("");

  const topics = useMemo(
    () => [...new Set(realSabatinaQuestions.map((item) => item.topic))],
    [],
  );
  const questions = useMemo(
    () => realSabatinaQuestions.filter((item) =>
      (priority === "todas" || item.priority === priority) &&
      (topic === "todos" || item.topic === topic) &&
      (block === "todos" || item.block === block) &&
      (questionType === "todos" || item.questionType === questionType) &&
      (!wrongOnly || workspace.sabatinaTestResults[item.id] === "wrong") &&
      (!practicalOnly || ["cenário prático", "pipeline", "interpretação de métrica"].includes(item.questionType))),
    [block, practicalOnly, priority, questionType, topic, workspace.sabatinaTestResults, wrongOnly],
  );
  const item = questions[index] ?? questions[0];

  const move = (direction: number) => {
    setIndex((current) => (current + direction + questions.length) % questions.length);
    setRevealed(false);
    setDraft("");
  };

  const chooseQuestion = (nextIndex: number) => {
    setIndex(nextIndex);
    setRevealed(false);
    setDraft("");
  };

  if (!item) return null;

  return (
    <div className="sabatina-test-view view-stack">
      <header className="page-intro sabatina-test-intro">
        <div>
          <span className="eyebrow"><MessageCircleQuestion size={15} /> SABATINA REAL · AVALIAÇÃO FINAL</span>
          <h1>Uma sabatina geral, depois da jornada</h1>
          <p>{realSabatinaQuestions.length} perguntas da entrevista real em uma avaliação única e independente das semanas. Use após concluir os estudos para testar domínio, aplicação bancária e comunicação.</p>
        </div>
        <div className="real-interview-score">
          <span>AVALIAÇÃO FINAL</span>
          <strong>{realSabatinaQuestions.length}</strong>
          <small>perguntas gerais</small>
        </div>
      </header>

      <section className="sabatina-filter-bar">
        <label><Filter size={16} /> Prioridade<select value={priority} onChange={(event) => { setPriority(event.target.value as SabatinaPriority | "todas"); chooseQuestion(0); }}><option value="todas">Todas</option>{priorityOrder.map((value) => <option value={value} key={value}>{sabatinaPriorityLabel[value]}</option>)}</select></label>
        <label>Tema<select value={topic} onChange={(event) => { setTopic(event.target.value); chooseQuestion(0); }}><option value="todos">Todos os temas</option>{topics.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label>Bloco<select value={block} onChange={(event) => { setBlock(event.target.value); chooseQuestion(0); }}><option value="todos">Todos</option>{[...new Set(realSabatinaQuestions.map((question) => question.block))].map((value) => <option key={value}>{value}</option>)}</select></label>
        <label>Tipo<select value={questionType} onChange={(event) => { setQuestionType(event.target.value); chooseQuestion(0); }}><option value="todos">Todos</option>{[...new Set(realSabatinaQuestions.map((question) => question.questionType))].map((value) => <option key={value}>{value}</option>)}</select></label>
        <label className="binary-filter"><input type="checkbox" checked={practicalOnly} onChange={(event) => { setPracticalOnly(event.target.checked); chooseQuestion(0); }} /> Só aplicação prática</label>
        <label className="binary-filter"><input type="checkbox" checked={wrongOnly} onChange={(event) => { setWrongOnly(event.target.checked); chooseQuestion(0); }} /> Só as que errei</label>
        <span>{questions.length} perguntas no filtro</span>
      </section>

      <section className="sabatina-test-workspace">
        <aside className="sabatina-question-index" aria-label="Índice de perguntas">
          <header><span>AVALIAÇÃO GERAL</span><strong>{index + 1} de {questions.length}</strong></header>
          <div>
            {questions.map((question, questionIndex) => (
              <button key={question.id} className={`${questionIndex === index ? "active" : ""} ${question.priority}`} onClick={() => chooseQuestion(questionIndex)}>
                <span>{String(questionIndex + 1).padStart(2, "0")}</span>
                <div><small>{question.topic}</small><strong>{question.question}</strong></div>
              </button>
            ))}
          </div>
        </aside>

        <main className="sabatina-answer-stage">
          <header className="sabatina-question-header">
            <div><span className={`real-question-priority ${item.priority}`}>{sabatinaPriorityLabel[item.priority]}</span><small>{item.topic}</small></div>
            <nav><button onClick={() => move(-1)}><ArrowLeft size={16} /> Anterior</button><button onClick={() => move(1)}>Próxima <ArrowRight size={16} /></button></nav>
          </header>

          <section className="sabatina-question-main">
            <span>PERGUNTA REAL {item.id.slice(3)}</span>
            <h2>{item.question}</h2>
            <label>Construa sua resposta antes de abrir o gabarito
              <textarea value={draft} onChange={(event) => setDraft(event.target.value)} disabled={revealed} placeholder="Comece com uma frase direta. Depois explique o mecanismo, dê um exemplo bancário e feche com uma limitação." />
            </label>
            {!revealed && <button className="primary-button sabatina-reveal" onClick={() => setRevealed(true)}><BookOpenCheck size={17} /> Ver resposta técnica completa</button>}
          </section>

          {revealed && (
            <section className="structured-answer">
              <article className="answer-opening"><span>RESPOSTA DIRETA · ABRA ASSIM</span><p>{item.answer}</p></article>
              <div>
                <article><span><GraduationCap size={17} /> COMO SUSTENTAR</span><p>{item.reasoning}</p></article>
                <article><span><Target size={17} /> APLICAÇÃO NO BANCO</span><p>{item.banking}</p></article>
              </div>
              <article className="answer-trap"><span><AlertTriangle size={17} /> ARMADILHA / APROFUNDAMENTO</span><p>{item.watchOut}</p></article>
              <footer className="sabatina-self-result"><span>Como foi sua resposta?</span><button onClick={() => { onUpdate((current) => ({ ...current, sabatinaTestResults: { ...current.sabatinaTestResults, [item.id]: "wrong" } })); move(1); }}><XCircle size={15} /> Preciso revisar</button><button onClick={() => { onUpdate((current) => ({ ...current, sabatinaTestResults: { ...current.sabatinaTestResults, [item.id]: "correct" } })); move(1); }}><CheckCircle2 size={15} /> Respondi bem</button></footer>
            </section>
          )}
        </main>
      </section>
    </div>
  );
}

type AssessmentMode = "estudo" | "simulado";

function AssessmentCard({ assessment, onStart }: { assessment: Assessment; onStart: (assessment: Assessment) => void }) {
  const topics = new Set(assessment.questions.map((question) => question.topic));
  return (
    <article className="assessment-card">
      <span><FileQuestion size={23} /></span>
      <small>{assessment.sourceFormat.toUpperCase()}</small>
      <h2>{assessment.title}</h2>
      <p>{assessment.subtitle}</p>
      <ul><li><Check size={14} /> {assessment.questions.length} questões clicáveis</li><li><Check size={14} /> {topics.size} áreas de conhecimento</li><li><Check size={14} /> Gabarito comentado item a item</li></ul>
      <button onClick={() => onStart(assessment)}>Abrir esta prova <ChevronRight size={17} /></button>
    </article>
  );
}

export function AssessmentHubView({ workspace, onUpdate }: AssessmentWorkspaceProps) {
  const [selectedId, setSelectedId] = useState<Assessment["id"] | null>(null);
  const [mode, setMode] = useState<AssessmentMode>("estudo");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [blockFilter, setBlockFilter] = useState("todos");
  const [weekFilter, setWeekFilter] = useState("todas");
  const [modelFilter, setModelFilter] = useState("todos");
  const [answerFilter, setAnswerFilter] = useState("todas");
  const assessment = assessmentBank.find((item) => item.id === selectedId);
  const question = assessment?.questions[index];

  const reset = (nextAssessment?: Assessment) => {
    if (nextAssessment) {
      setSelectedId(nextAssessment.id);
      setAnswers(workspace.examDrafts[nextAssessment.id] ?? {});
    } else {
      setAnswers({});
      if (assessment) onUpdate((current) => ({ ...current, examDrafts: { ...current.examDrafts, [assessment.id]: {} } }));
    }
    setIndex(0);
    setRevealed(false);
    setFinished(false);
  };

  const selectAnswer = (optionIndex: number) => {
    if (!question || (mode === "estudo" && revealed)) return;
    setAnswers((current) => {
      const next = { ...current, [question.id]: optionIndex };
      onUpdate((workspaceCurrent) => ({ ...workspaceCurrent, examDrafts: { ...workspaceCurrent.examDrafts, [assessment!.id]: next } }));
      return next;
    });
    if (mode === "estudo") setRevealed(true);
  };

  const goTo = (nextIndex: number) => {
    setIndex(nextIndex);
    setRevealed(mode === "estudo" && answers[assessment!.questions[nextIndex].id] !== undefined);
  };

  const finishAttempt = () => {
    if (!assessment || finished) return;
    const attemptCorrect = assessment.questions.filter((item) => answers[item.id] === item.correctIndex).length;
    onUpdate((current) => ({ ...current, examDrafts: { ...current.examDrafts, [assessment.id]: answers }, examAttempts: [{ id: crypto.randomUUID(), assessmentId: assessment.id, correct: attemptCorrect, answered: Object.keys(answers).length, total: assessment.questions.length, createdAt: new Date().toISOString() }, ...current.examAttempts] }));
    setFinished(true);
  };

  if (!assessment || !question) {
    return (
      <div className="assessment-hub view-stack">
        <header className="page-intro">
          <div><span className="eyebrow"><FileQuestion size={15} /> PROVAS REAIS · AVALIAÇÃO FINAL</span><h1>Duas provas gerais. {assessmentQuestionCount} questões.</h1><p>Esta área não pertence a nenhuma semana. Use no encerramento da jornada: modo estudo para correção imediata ou simulado para abrir o gabarito apenas no final. {workspace.examAttempts.length} tentativa(s) salva(s) neste dispositivo.</p></div>
          <div className="assessment-mode-toggle" aria-label="Modo da prova"><button className={mode === "estudo" ? "active" : ""} onClick={() => setMode("estudo")}><BookOpenCheck size={16} /> Modo estudo</button><button className={mode === "simulado" ? "active" : ""} onClick={() => setMode("simulado")}><Clock3 size={16} /> Modo simulado</button></div>
        </header>
        <section className="assessment-card-grid">{assessmentBank.map((item) => <AssessmentCard assessment={item} key={item.id} onStart={reset} />)}</section>
        <section className="dataset-library">
          <header><div><Download size={20} /><span>CSV QUE ESTAVAM AUSENTES</span></div><strong>5 bases didáticas prontas para praticar</strong></header>
          <p>Os arquivos originais não acompanharam o notebook. Estas bases reproduzíveis mantêm o formato de uso, mas podem gerar números diferentes do gabarito original.</p>
          <div>{reconstructedDatasets.map((dataset) => <a href={dataset.href} download key={dataset.href}><Download size={15} /><span><strong>{dataset.label}</strong><small>{dataset.use}</small></span></a>)}</div>
          <a className="dataset-readme" href="/datasets/LEIA-ME.txt" download>Baixar nota de metodologia</a>
        </section>
      </div>
    );
  }

  const correct = assessment.questions.filter((item) => answers[item.id] === item.correctIndex).length;
  const answered = Object.keys(answers).length;
  const selected = answers[question.id];
  const showAnswer = finished || (mode === "estudo" && revealed);
  const progress = answered / assessment.questions.length * 100;
  const visibleQuestionIndices = assessment.questions.map((item, itemIndex) => ({ item, itemIndex })).filter(({ item }) => {
    const chosen = answers[item.id];
    const state = chosen === undefined ? "unanswered" : chosen === item.correctIndex ? "correct" : "wrong";
    return (blockFilter === "todos" || item.block === blockFilter) && (weekFilter === "todas" || item.week === Number(weekFilter)) && (modelFilter === "todos" || item.model === modelFilter) && (answerFilter === "todas" || state === answerFilter);
  });

  if (finished) {
    return (
      <div className="assessment-results view-stack">
        <button className="assessment-back" onClick={() => setSelectedId(null)}><ArrowLeft size={16} /> Voltar para as provas</button>
        <section className="assessment-result-hero">
          <span><CheckCircle2 size={32} /></span><small>RESULTADO · {assessment.title.toUpperCase()}</small>
          <h1>{correct} de {assessment.questions.length}</h1>
          <p>{Math.round(correct / assessment.questions.length * 100)}% de acerto · {assessment.questions.length - answered} em branco</p>
          <div><button className="secondary-button" onClick={() => reset()}><RotateCcw size={16} /> Refazer</button><button className="primary-button" onClick={() => setSelectedId(null)}>Escolher outra prova</button></div>
        </section>
        <section className="assessment-review-list">
          <header><span>REVISÃO COMPLETA</span><strong>Abra cada questão para reler o raciocínio</strong></header>
          {assessment.questions.map((item, itemIndex) => {
            const chosen = answers[item.id];
            const isCorrect = chosen === item.correctIndex;
            return <details key={item.id} className={isCorrect ? "correct" : "wrong"}><summary><span>{isCorrect ? <CheckCircle2 size={17} /> : <XCircle size={17} />}</span><div><small>QUESTÃO {itemIndex + 1} · {item.topic}</small><strong>{item.question}</strong></div><em>{isCorrect ? "Correta" : chosen === undefined ? "Em branco" : "Revisar"}</em></summary><div className="assessment-review-body"><p><b>Sua resposta:</b> {chosen === undefined ? "Em branco" : item.options[chosen]}</p><p><b>Resposta correta:</b> {item.options[item.correctIndex]}</p><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{item.rationale}</ReactMarkdown></div></details>;
          })}
        </section>
      </div>
    );
  }

  return (
    <div className="interactive-assessment view-stack">
      <header className="assessment-run-header">
        <button className="assessment-back" onClick={() => setSelectedId(null)}><ArrowLeft size={16} /> Provas</button>
        <div><small>{mode === "estudo" ? "MODO ESTUDO · FEEDBACK IMEDIATO" : "MODO SIMULADO · GABARITO NO FINAL"}</small><h1>{assessment.title}</h1><p>{assessment.originNote}</p></div>
        <div className="assessment-run-progress"><span>{answered}/{assessment.questions.length} respondidas</span><div><i style={{ width: `${progress}%` }} /></div></div>
      </header>

      <section className="assessment-workspace">
        <aside className="assessment-palette">
          <header><span>QUESTÕES</span><strong>{index + 1}/{assessment.questions.length}</strong></header>
          <section className="assessment-question-filters"><label>Bloco<select value={blockFilter} onChange={(event) => setBlockFilter(event.target.value)}><option value="todos">Todos</option>{[...new Set(assessment.questions.map((item) => item.block))].map((value) => <option key={value}>{value}</option>)}</select></label><label>Semana<select value={weekFilter} onChange={(event) => setWeekFilter(event.target.value)}><option value="todas">Todas</option>{[...new Set(assessment.questions.map((item) => item.week))].sort((a, b) => a - b).map((value) => <option key={value} value={value}>S{value}</option>)}</select></label><label>Modelo<select value={modelFilter} onChange={(event) => setModelFilter(event.target.value)}><option value="todos">Todos</option>{[...new Set(assessment.questions.map((item) => item.model).filter(Boolean))].map((value) => <option key={value!}>{value}</option>)}</select></label><label>Resposta<select value={answerFilter} onChange={(event) => setAnswerFilter(event.target.value)}><option value="todas">Todas</option><option value="correct">Corretas</option><option value="wrong">Erradas</option><option value="unanswered">Não respondidas</option></select></label></section>
          <div>{visibleQuestionIndices.map(({ item, itemIndex }) => <button key={item.id} className={`${itemIndex === index ? "active" : ""} ${answers[item.id] !== undefined ? "answered" : ""}`} onClick={() => goTo(itemIndex)}>{itemIndex + 1}</button>)}</div>
          <footer><span><i className="current" /> Atual</span><span><i className="done" /> Respondida</span></footer>
        </aside>

        <main className="assessment-question-stage">
          <header><div><span>QUESTÃO {index + 1}</span><small>{question.topic}</small></div>{question.dataset && <a href={question.dataset} download><Download size={15} /> Baixar CSV didático</a>}</header>
          <h2>{question.question}</h2>
          <div className="assessment-options">
            {question.options.map((option, optionIndex) => {
              const chosen = selected === optionIndex;
              const isCorrect = optionIndex === question.correctIndex;
              const state = showAnswer ? isCorrect ? "correct" : chosen ? "wrong" : "" : chosen ? "selected" : "";
              return <button key={`${question.id}-${optionIndex}`} className={state} onClick={() => selectAnswer(optionIndex)}><span>{String.fromCharCode(65 + optionIndex)}</span><strong>{option}</strong>{showAnswer && isCorrect && <CheckCircle2 size={19} />}{showAnswer && chosen && !isCorrect && <XCircle size={19} />}</button>;
            })}
          </div>

          {showAnswer && <section className="assessment-rationale"><header><Sparkles size={17} /><span>GABARITO COMENTADO</span></header><strong>Resposta: {String.fromCharCode(65 + question.correctIndex)} · {question.options[question.correctIndex]}</strong><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{question.rationale}</ReactMarkdown>{question.dataset && <p className="dataset-warning"><AlertTriangle size={16} /> CSV reconstruído para prática: o fluxo é reproduzível, mas o número pode diferir do arquivo original.</p>}</section>}

          <footer className="assessment-navigation"><button disabled={index === 0} onClick={() => goTo(index - 1)}><ArrowLeft size={16} /> Anterior</button>{index < assessment.questions.length - 1 ? <button className="primary-button" onClick={() => goTo(index + 1)}>Próxima <ArrowRight size={16} /></button> : <button className="primary-button" onClick={finishAttempt}><CheckCircle2 size={16} /> Finalizar e corrigir</button>}</footer>
        </main>
      </section>

      {mode === "simulado" && <button className="finish-assessment-button" onClick={finishAttempt}><Play size={16} /> Finalizar agora e abrir gabarito</button>}
    </div>
  );
}
