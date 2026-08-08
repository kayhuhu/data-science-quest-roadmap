"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  Check,
  CheckCircle2,
  Clock3,
  FileJson,
  Flame,
  FolderGit2,
  Medal,
  MessageCircleQuestion,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Settings2,
  ShieldAlert,
  Sparkles,
  Target,
  TimerReset,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ProjectGuidePanel } from "@/components/ProjectGuidePanel";
import { blockPalette, currentRoadmapWeek, roadmap } from "@/lib/quest-data";
import { fullSabatinaAnswer, realSabatinaForWeek } from "@/lib/real-sabatina";
import { questXpBreakdown, type ErrorEntry, type QuestWorkspace } from "@/lib/use-quest-workspace";

type WorkspaceProps = {
  workspace: QuestWorkspace;
  onUpdate: (recipe: (current: QuestWorkspace) => QuestWorkspace) => void;
};

export function PomodoroView({ workspace, onUpdate }: WorkspaceProps) {
  const [minutes, setMinutes] = useState(workspace.settings.pomodoroMinutes);
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const [startedWith, setStartedWith] = useState(minutes * 60);
  const currentWeek = roadmap.weeks[currentRoadmapWeek() - 1];

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((value) => {
        if (value <= 1) {
          setRunning(false);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [running]);

  const chooseMode = (value: number) => {
    setMinutes(value);
    setSecondsLeft(value * 60);
    setStartedWith(value * 60);
    setRunning(false);
  };

  const register = () => {
    const elapsed = Math.max(60, startedWith - secondsLeft);
    onUpdate((current) => ({
      ...current,
      sessions: [{ id: crypto.randomUUID(), week: currentWeek.number, block: currentWeek.block, type: "foco", seconds: elapsed, createdAt: new Date().toISOString() }, ...current.sessions],
    }));
    chooseMode(minutes);
  };

  const total = minutes * 60;
  const elapsedPercent = Math.max(0, Math.min(100, ((total - secondsLeft) / total) * 100));

  return (
    <div className="focus-view view-stack">
      <header className="page-intro"><div><span className="eyebrow"><TimerReset size={14} /> SALA DE FOCO</span><h1>Tempo com intenção</h1><p>O cronômetro já nasce vinculado à missão atual e vira uma sessão real no seu histórico.</p></div><div className="focus-link"><span>MISSÃO ATUAL</span><strong>S{currentWeek.number.toString().padStart(2, "0")} · {currentWeek.block}</strong><small>{currentWeek.title}</small></div></header>
      <section className="focus-stage">
        <div className="timer-card">
          <div className="timer-modes">{[25, 50, 90].map((value) => <button key={value} className={minutes === value ? "active" : ""} onClick={() => chooseMode(value)}>{value === 25 ? "Clássico 25/5" : value === 50 ? "Profundo 50/10" : "Sessão livre"}</button>)}</div>
          <div className="timer-orbit" style={{ "--timer-progress": `${elapsedPercent * 3.6}deg` } as React.CSSProperties}><div><span>FOCO</span><strong>{String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:{String(secondsLeft % 60).padStart(2, "0")}</strong><small>{running ? "Proteja este bloco" : secondsLeft === 0 ? "Ciclo concluído" : "Pronto quando você estiver"}</small></div></div>
          <div className="timer-controls"><button className="secondary-button" onClick={() => chooseMode(minutes)}><RotateCcw size={17} /> Reiniciar</button><button className="focus-play" onClick={() => setRunning(!running)}>{running ? <Pause size={22} /> : <Play size={22} />}{running ? "Pausar" : "Iniciar foco"}</button></div>
          {startedWith - secondsLeft >= 60 && <button className="text-button register-session" onClick={register}><CheckCircle2 size={16} /> Finalizar e registrar {Math.floor((startedWith - secondsLeft) / 60)} min</button>}
        </div>
        <aside className="focus-sidebar">
          <div className="focus-intention"><span>INTENÇÃO DA SESSÃO</span><h3>{currentWeek.content[0]}</h3><p>Ao finalizar, registre uma nota: “o que eu consigo explicar agora?”</p></div>
          <div className="focus-stats"><article><Clock3 size={18} /><div><strong>{Math.floor(workspace.sessions.reduce((s, x) => s + x.seconds, 0) / 3600)}h</strong><span>acumuladas</span></div></article><article><Flame size={18} /><div><strong>{workspace.sessions.length}</strong><span>sessões</span></div></article><article><Zap size={18} /><div><strong>{workspace.xp}</strong><span>XP total</span></div></article></div>
          <div className="focus-tip"><Sparkles size={18} /><p>Comece pela entrega mais difícil. Materiais e vídeos servem ao projeto, não o contrário.</p></div>
        </aside>
      </section>
    </div>
  );
}

export function FlashcardsView({ workspace, onUpdate }: WorkspaceProps) {
  const cards = useMemo(() => roadmap.weeks.flatMap((week) => [
    ...week.sabatina.map((item, index) => ({ ...item, week: week.number, block: week.block, id: `${week.number}-${index + 1}` })),
    ...realSabatinaForWeek(week.number).map((item) => ({ question: item.question, answer: fullSabatinaAnswer(item), week: week.number, block: week.block, id: item.id })),
  ]), []);
  const firstPending = Math.max(0, cards.findIndex((card) => !workspace.reviewedFlashcards.includes(card.id)));
  const [index, setIndex] = useState(firstPending);
  const [revealed, setRevealed] = useState(false);
  const card = cards[index % cards.length];
  const reviewed = new Set(workspace.reviewedFlashcards).size;

  const rate = () => {
    onUpdate((current) => ({ ...current, reviewedFlashcards: current.reviewedFlashcards.includes(card.id) ? current.reviewedFlashcards : [...current.reviewedFlashcards, card.id] }));
    setIndex((value) => (value + 1) % cards.length);
    setRevealed(false);
  };

  return (
    <div className="cards-view view-stack">
      <header className="page-intro"><div><span className="eyebrow"><BrainCircuit size={14} /> REPETIÇÃO ESPAÇADA</span><h1>Revisão que fixa</h1><p>As {roadmap.metrics.questions} perguntas canônicas já estão prontas para treino. A resposta permanece oculta até sua tentativa.</p></div><div className="review-count"><strong>{cards.length - reviewed}</strong><span>pendentes</span><small>{reviewed} revisadas</small></div></header>
      <section className="flashcard-stage">
        <div className={`flashcard ${revealed ? "flipped" : ""}`}>
          <header><span>S{card.week.toString().padStart(2, "0")} · {card.block}</span><span>{index + 1}/{cards.length}</span></header>
          <div className="flashcard-body"><small>{revealed ? "RESPOSTA ESPERADA" : "PERGUNTA"}</small><h2>{revealed ? card.answer : card.question}</h2>{!revealed && <p>Responda em voz alta antes de revelar.</p>}</div>
          {!revealed ? <button className="primary-button" onClick={() => setRevealed(true)}>Revelar resposta <ArrowRight size={16} /></button> : <div className="rating-row"><button onClick={rate}><RotateCcw size={15} /> Novamente</button><button onClick={rate}><ShieldAlert size={15} /> Difícil</button><button onClick={rate}><Check size={15} /> Bom</button><button onClick={rate}><Sparkles size={15} /> Fácil</button></div>}
        </div>
        <aside className="review-sidebar"><span className="eyebrow muted">HOJE</span><h3>Ritmo de revisão</h3><div className="review-progress"><i style={{ width: `${Math.min(100, reviewed / cards.length * 100)}%` }} /></div><p>{reviewed} de {cards.length} cartões vistos.</p><ul><li><span className="dot red" /> Novos {cards.length - reviewed}</li><li><span className="dot yellow" /> Aprendendo {Math.min(reviewed, 30)}</li><li><span className="dot green" /> Maduros {Math.max(0, reviewed - 30)}</li></ul><div className="review-tip"><BookOpen size={17} /> Cards nunca marcam a ementa como verde sozinhos.</div></aside>
      </section>
    </div>
  );
}

export function SabatinaView({ workspace, onUpdate }: WorkspaceProps) {
  const [weekNumber, setWeekNumber] = useState(currentRoadmapWeek());
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const week = roadmap.weeks[weekNumber - 1];
  const questions = [
    ...week.sabatina,
    ...realSabatinaForWeek(weekNumber).map((item) => ({ question: item.question, answer: fullSabatinaAnswer(item) })),
  ];
  const item = questions[questionIndex % questions.length];

  const evaluate = (score: number) => {
    onUpdate((current) => ({
      ...current,
      sabatinaAttempts: [{ id: crypto.randomUUID(), week: weekNumber, score, createdAt: new Date().toISOString() }, ...current.sabatinaAttempts],
      errors: score <= 1 ? [{ id: crypto.randomUUID(), title: item.question, week: weekNumber, cause: answer || "Não soube responder.", correction: item.answer, resolved: false, createdAt: new Date().toISOString() }, ...current.errors] : current.errors,
    }));
    setQuestionIndex((value) => (value + 1) % questions.length);
    setAnswer("");
    setRevealed(false);
  };

  return (
    <div className="oral-view view-stack">
      <header className="page-intro"><div><span className="eyebrow"><MessageCircleQuestion size={14} /> MODO SABATINA</span><h1>Defenda seu raciocínio</h1><p>Uma pergunta por vez. Sua resposta vem antes do dicionário oficial.</p></div><label className="week-select">Semana<select value={weekNumber} onChange={(event) => { setWeekNumber(Number(event.target.value)); setQuestionIndex(0); setRevealed(false); }} >{roadmap.weeks.map((entry) => <option key={entry.number} value={entry.number}>{entry.number} · {entry.title}</option>)}</select></label></header>
      <section className="oral-stage">
        <div className="oral-card"><div className="oral-meta"><span>QUESTÃO {questionIndex + 1} DE {questions.length}</span><span>{week.block}</span></div><h2>{item.question}</h2><label>Sua resposta<textarea value={answer} disabled={revealed} onChange={(event) => setAnswer(event.target.value)} placeholder="Estruture: conceito → mecanismo → aplicação → limitação..." /></label>{!revealed ? <button className="primary-button" disabled={!answer.trim()} onClick={() => setRevealed(true)}>Confirmar e ver resposta <ArrowRight size={16} /></button> : <><div className="expected-answer"><span>RESPOSTA ESPERADA</span><p>{item.answer}</p></div><div className="self-rating"><span>Como você se saiu?</span><div><button onClick={() => evaluate(0)}><XCircle size={15} /> Não soube</button><button onClick={() => evaluate(1)}>Incompleta</button><button onClick={() => evaluate(2)}>Boa</button><button onClick={() => evaluate(3)}><Sparkles size={15} /> Excelente</button></div></div></>}</div>
        <aside className="oral-guide"><span className="eyebrow muted">ESTRUTURA FORTE</span><ol><li><span>1</span><div><strong>Defina</strong><p>Explique o conceito sem jargão vazio.</p></div></li><li><span>2</span><div><strong>Conecte</strong><p>Mostre custo, métrica ou parâmetro.</p></div></li><li><span>3</span><div><strong>Aplique</strong><p>Leve para um cenário bancário.</p></div></li><li><span>4</span><div><strong>Limite</strong><p>Diga quando a técnica falha.</p></div></li></ol><div className="oral-history"><BarChart3 size={17} /><span>{workspace.sabatinaAttempts.length} respostas registradas</span></div></aside>
      </section>
    </div>
  );
}

export function ProjectsView({ workspace, onUpdate }: WorkspaceProps) {
  const [selectedWeekNumber, setSelectedWeekNumber] = useState(currentRoadmapWeek());
  const [statusFilter, setStatusFilter] = useState<"todos" | "planejado" | "em-andamento" | "publicado">("todos");
  const selectedWeek = roadmap.weeks[selectedWeekNumber - 1];
  const visibleWeeks = roadmap.weeks.filter((week) => {
    const status = workspace.projectStatus[week.project.repo] ?? "planejado";
    return statusFilter === "todos" || status === statusFilter;
  });
  const previousWeek = selectedWeekNumber > 1 ? roadmap.weeks[selectedWeekNumber - 2] : null;
  const nextWeek = selectedWeekNumber < roadmap.weeks.length ? roadmap.weeks[selectedWeekNumber] : null;

  return (
    <div className="projects-view view-stack">
      <header className="page-intro">
        <div><span className="eyebrow"><FolderGit2 size={14} /> PORTFÓLIO DE EVIDÊNCIAS</span><h1>{roadmap.metrics.projects} projetos. Execução completa.</h1><p>Selecione um projeto para ver problema, dados, stack, primeiros 30 minutos, dez etapas, comandos, testes, evidências e critérios de conclusão.</p></div>
        <div className="project-summary"><strong>{Object.values(workspace.projectStatus).filter((value) => value === "publicado").length}/{roadmap.metrics.projects}</strong><span>publicados</span></div>
      </header>

      <section className="projects-workspace">
        <aside className="project-index">
          <header><div><span>PROJETOS</span><strong>Escolha a missão</strong></div><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}><option value="todos">Todos</option><option value="planejado">Planejados</option><option value="em-andamento">Em andamento</option><option value="publicado">Publicados</option></select></header>
          <div className="project-index-list">
            {visibleWeeks.map((week) => {
              const status = workspace.projectStatus[week.project.repo] ?? "planejado";
              const completed = workspace.projectChecklist?.[String(week.number)]?.length ?? 0;
              return (
                <button key={week.number} className={selectedWeekNumber === week.number ? "active" : ""} onClick={() => setSelectedWeekNumber(week.number)} style={{ "--project-color": blockPalette[week.block] ?? "#4dd7fa" } as React.CSSProperties}>
                  <span className="project-index-number">S{week.number.toString().padStart(2, "0")}</span>
                  <span className="project-index-copy"><small>{week.block}</small><strong>{week.project.title}</strong><em>{status === "planejado" ? "Planejado" : status === "em-andamento" ? "Em andamento" : "Publicado"} · {completed}/10 etapas</em></span>
                  <span className="project-index-progress"><i style={{ width: `${completed / 10 * 100}%` }} /></span>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="project-page-detail">
          <header className="project-page-toolbar">
            <div><span>PROJETO SELECIONADO</span><strong>Semana {selectedWeek.number} de {roadmap.metrics.weeks}</strong></div>
            <nav aria-label="Navegar entre projetos"><button disabled={!previousWeek} onClick={() => previousWeek && setSelectedWeekNumber(previousWeek.number)}><ArrowLeft size={15} /> Anterior</button><button disabled={!nextWeek} onClick={() => nextWeek && setSelectedWeekNumber(nextWeek.number)}>Próximo <ArrowRight size={15} /></button></nav>
          </header>
          <ProjectGuidePanel week={selectedWeek} workspace={workspace} onUpdate={onUpdate} variant="page" />
        </main>
      </section>
    </div>
  );
}

export function AnalyticsView({ workspace }: WorkspaceProps) {
  const data = roadmap.blocks.map((block) => ({
    name: block.title.length > 16 ? `${block.title.slice(0, 14)}…` : block.title,
    horas: Number((workspace.sessions.filter((session) => session.block === block.title).reduce((sum, session) => sum + session.seconds, 0) / 3600).toFixed(1)),
  }));
  const totalHours = workspace.sessions.reduce((sum, session) => sum + session.seconds, 0) / 3600;
  const green = Object.values(workspace.syllabusStatus).filter((value) => value === "verde").length;
  const successfulSabatina = workspace.sabatinaAttempts.filter((attempt) => attempt.score >= 2).length;
  return (
    <div className="analytics-view view-stack"><header className="page-intro"><div><span className="eyebrow"><BarChart3 size={14} /> ANALYTICS REAIS</span><h1>Esforço que vira domínio</h1><p>Os gráficos usam somente suas sessões, revisões e evidências — sem números decorativos.</p></div></header>
      <section className="analytics-kpis"><article><Clock3 size={19} /><span>Horas focadas</span><strong>{totalHours.toFixed(1)}h</strong><small>{workspace.sessions.length} sessões</small></article><article><Target size={19} /><span>Ementa verde</span><strong>{green}/{roadmap.metrics.syllabusItems}</strong><small>{Math.round(green / roadmap.metrics.syllabusItems * 100)}% dominado</small></article><article><MessageCircleQuestion size={19} /><span>Sabatina boa+</span><strong>{successfulSabatina}</strong><small>de {workspace.sabatinaAttempts.length} tentativas</small></article><article><FolderGit2 size={19} /><span>Projetos</span><strong>{Object.values(workspace.projectStatus).filter((s) => s === "publicado").length}/{roadmap.metrics.projects}</strong><small>publicados</small></article></section>
      <section className="analytics-grid"><article className="chart-panel"><div className="panel-heading"><div><span>HORAS POR BLOCO</span><h3>Distribuição do investimento</h3></div></div>{totalHours === 0 ? <div className="chart-empty"><BarChart3 size={30} /><strong>Seu gráfico começa na primeira sessão</strong><p>Use o Pomodoro ou registre foco para alimentar este painel.</p></div> : <ResponsiveContainer width="100%" height={320}><BarChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="#243b53" vertical={false} /><XAxis dataKey="name" stroke="#7890a8" fontSize={11} /><YAxis stroke="#7890a8" fontSize={11} /><Tooltip contentStyle={{ background: "#0e1b2a", border: "1px solid #243b53", borderRadius: 12 }} /><Bar dataKey="horas" fill="#4dd7fa" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer>}</article><article className="recommendation-panel"><span className="eyebrow muted">RECOMENDAÇÃO</span><h3>{workspace.sessions.length === 0 ? "Comece pequeno e registre." : workspace.notes.length === 0 ? "Transforme foco em memória." : green === 0 ? "Estudo feito; agora prove domínio." : "Continue defendendo decisões."}</h3><p>{workspace.sessions.length === 0 ? "Uma sessão de 25 minutos na Semana 1 já ativa seus dados reais." : workspace.notes.length === 0 ? "Você já estudou, mas ainda não criou notas. Registre a explicação com suas palavras." : green === 0 ? "Há atividade registrada, porém nenhum item verde. Escolha um item e valide os cinco critérios." : "Seu sistema está acumulando evidências. Priorize itens amarelos e perguntas fracas."}</p><div className="recommendation-rule"><Sparkles size={17} /> Regra determinística baseada no seu histórico.</div></article></section>
    </div>
  );
}

export function ErrorsView({ workspace, onUpdate }: WorkspaceProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [cause, setCause] = useState("");
  const [correction, setCorrection] = useState("");
  const add = () => {
    if (!title.trim() || !correction.trim()) return;
    const entry: ErrorEntry = { id: crypto.randomUUID(), title: title.trim(), week: currentRoadmapWeek(), cause: cause.trim(), correction: correction.trim(), resolved: false, createdAt: new Date().toISOString() };
    onUpdate((current) => ({ ...current, errors: [entry, ...current.errors] }));
    setTitle(""); setCause(""); setCorrection(""); setFormOpen(false);
  };
  return <div className="errors-view view-stack"><header className="page-intro"><div><span className="eyebrow"><ShieldAlert size={14} /> CADERNO DE ERROS</span><h1>Erro registrado vira repertório</h1><p>Capture a causa, a correção e um exemplo novo. Depois transforme a lacuna em revisão.</p></div><button className="primary-button" onClick={() => setFormOpen(!formOpen)}><Plus size={17} /> Registrar erro</button></header>{formOpen && <section className="error-form"><label>Título do erro<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex.: interpretei o p-valor como P(H0 verdadeira)" /></label><label>Por que aconteceu<textarea value={cause} onChange={(e) => setCause(e.target.value)} /></label><label>Correção e regra<textarea value={correction} onChange={(e) => setCorrection(e.target.value)} /></label><button className="primary-button" onClick={add}>Salvar no caderno</button></section>}<section className="error-list">{workspace.errors.length === 0 ? <div className="empty-panel"><ShieldAlert size={32} /><h3>Nenhum erro registrado</h3><p>Quando algo der errado em exercício, sabatina ou projeto, registre aqui.</p></div> : workspace.errors.map((entry) => <article key={entry.id} className={entry.resolved ? "resolved" : ""}><span className="error-week">S{entry.week.toString().padStart(2, "0")}</span><div><small>{new Date(entry.createdAt).toLocaleDateString("pt-BR")}</small><h3>{entry.title}</h3><p><strong>Causa:</strong> {entry.cause || "Não informada"}</p><p><strong>Correção:</strong> {entry.correction}</p></div><button onClick={() => onUpdate((current) => ({ ...current, errors: current.errors.map((item) => item.id === entry.id ? { ...item, resolved: !item.resolved } : item) }))}>{entry.resolved ? <RotateCcw size={16} /> : <CheckCircle2 size={16} />}{entry.resolved ? "Reabrir" : "Resolvido"}</button></article>)}</section></div>;
}

export function PracticalExamView({ workspace }: WorkspaceProps) {
  const [seconds, setSeconds] = useState(4 * 3600);
  const [running, setRunning] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  useEffect(() => { if (!running) return; const timer = window.setInterval(() => setSeconds((value) => value <= 1 ? 0 : value - 1), 1000); return () => window.clearInterval(timer); }, [running]);
  const questions = [
    ["estatistica", "Uma campanha elevou conversão de 8,1% para 8,8%. Desenhe o teste, estime o efeito e descreva a decisão."],
    ["sql", "Escreva a estratégia para montar uma linha por cliente-mês sem vazamento temporal nem multiplicação de joins."],
    ["modelo", "Compare logística e boosting para inadimplência: custo, validação, calibração, threshold e monitoramento."],
  ];
  const submit = () => setRunning(false);
  return <div className="exam-view view-stack"><header className="page-intro"><div><span className="eyebrow"><Clock3 size={14} /> SIMULADOR DE PROVA PRÁTICA</span><h1>Decida sob pressão, com método</h1><p>Até 4 horas. Respostas erradas podem anular corretas; deixar em branco é uma decisão válida.</p></div><div className={`exam-timer ${running ? "running" : ""}`}><span>TEMPO RESTANTE</span><strong>{String(Math.floor(seconds / 3600)).padStart(2, "0")}:{String(Math.floor(seconds % 3600 / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}</strong><button onClick={() => setRunning(!running)}>{running ? <Pause size={15} /> : <Play size={15} />}{running ? "Pausar" : "Começar"}</button></div></header><section className="exam-warning"><AlertTriangle size={20} /><p>Não avance até o fim sem responder: no teste original, chegar à última pergunta finaliza a prova automaticamente.</p></section><section className="exam-questions">{questions.map(([id, question], index) => <article key={id}><header><span>QUESTÃO {index + 1}</span><button onClick={() => setAnswers((current) => ({ ...current, [id]: "" }))}>Deixar em branco</button></header><h3>{question}</h3><textarea value={answers[id] ?? ""} onChange={(event) => setAnswers((current) => ({ ...current, [id]: event.target.value }))} placeholder="Hipóteses, passos, métricas, código/pseudocódigo e interpretação..." /></article>)}</section><button className="primary-button exam-submit" onClick={submit}>Finalizar tentativa <ArrowRight size={16} /></button><span className="attempt-note">{workspace.xp} XP calculados somente com evidências salvas; finalizar o formulário não duplica pontos.</span></div>;
}

export function AchievementsView({ workspace }: WorkspaceProps) {
  const hours = workspace.sessions.reduce((sum, session) => sum + session.seconds, 0) / 3600;
  const green = Object.values(workspace.weekStatus).filter((status) => status === "verde").length;
  const published = Object.values(workspace.projectStatus).filter((status) => status === "publicado").length;
  const xp = questXpBreakdown(workspace);
  const items = [
    ["Primeiro foco", "Registre sua primeira sessão", workspace.sessions.length > 0, TimerReset],
    ["Primeira semana verde", "Defenda uma missão completa", green > 0, Target],
    ["Construtor", "Publique seu primeiro projeto", published > 0, FolderGit2],
    ["10 horas", "Acumule dez horas focadas", hours >= 10, Clock3],
    ["Sabatina sem consulta", "Avalie uma resposta como excelente", workspace.sabatinaAttempts.some((item) => item.score === 3), MessageCircleQuestion],
    ["Capstone concluído", `Publique o Projeto ${roadmap.metrics.projects}`, workspace.projectStatus[roadmap.weeks.at(-1)!.project.repo] === "publicado", Trophy],
  ] as const;
  const xpItems = [["Ementa verde", xp.syllabus], ["Semanas verdes", xp.weeks], ["Etapas de projetos", xp.projectSteps], ["Projetos publicados", xp.publishedProjects], ["Tempo de foco", xp.focus], ["Flashcards únicos", xp.flashcards], ["Notas", xp.notes], ["Caderno de erros", xp.errors], ["Melhor sabatina/semana", xp.sabatina]] as const;
  return <div className="achievements-view view-stack"><header className="page-intro"><div><span className="eyebrow"><Medal size={14} /> CONQUISTAS</span><h1>Marcos, não distrações</h1><p>A gamificação reconhece prática real, domínio e evidência publicada.</p></div><div className="level-badge"><span>NÍVEL {Math.floor(workspace.xp / 500) + 1}</span><strong>{workspace.xp} XP</strong></div></header><section className="xp-ledger"><header><div><Zap size={18} /><span>EXTRATO DE XP</span></div><strong>{xp.total} XP verificáveis</strong></header><p>O total é recalculado pelas evidências salvas. Alternar um status ou repetir o mesmo cartão não gera XP duplicado.</p><div>{xpItems.map(([label, value]) => <article key={label}><span>{label}</span><strong>+{value}</strong></article>)}</div></section><section className="achievement-grid">{items.map(([title, description, unlocked, Icon]) => <article key={title} className={unlocked ? "unlocked" : "locked"}><span><Icon size={25} /></span><div><small>{unlocked ? "CONQUISTA DESBLOQUEADA" : "PRÓXIMO MARCO"}</small><h3>{title}</h3><p>{description}</p></div>{unlocked && <CheckCircle2 size={20} />}</article>)}</section></div>;
}

export function SettingsView({ workspace, onUpdate }: WorkspaceProps) {
  const exportData = () => {
    const blob = new Blob([JSON.stringify(workspace, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = `data-science-quest-backup-${new Date().toISOString().slice(0, 10)}.json`; anchor.click(); URL.revokeObjectURL(url);
  };
  return <div className="settings-view view-stack"><header className="page-intro"><div><span className="eyebrow"><Settings2 size={14} /> CONFIGURAÇÕES</span><h1>Seu ritmo, suas regras</h1><p>Preferências locais de experiência; dados de estudo permanecem no armazenamento privado.</p></div></header><section className="settings-grid"><article><span className="settings-icon"><Target size={20} /></span><div><h3>Meta semanal</h3><p>Horas de estudo planejadas.</p></div><input type="number" min="1" max="80" value={workspace.settings.weeklyGoalHours} onChange={(event) => onUpdate((current) => ({ ...current, settings: { ...current.settings, weeklyGoalHours: Number(event.target.value) } }))} /></article><article><span className="settings-icon"><TimerReset size={20} /></span><div><h3>Pomodoro padrão</h3><p>Duração do ciclo de foco.</p></div><select value={workspace.settings.pomodoroMinutes} onChange={(event) => onUpdate((current) => ({ ...current, settings: { ...current.settings, pomodoroMinutes: Number(event.target.value) } }))}><option value="25">25 minutos</option><option value="50">50 minutos</option><option value="90">90 minutos</option></select></article><article><span className="settings-icon"><FileJson size={20} /></span><div><h3>Backup pessoal</h3><p>Baixe somente seus registros em JSON.</p></div><button onClick={exportData}>Exportar</button></article><article><span className="settings-icon"><ShieldAlert size={20} /></span><div><h3>Privacidade</h3><p>Notas, sessões e imagens privadas por padrão.</p></div><span className="secure-label"><Check size={14} /> Protegido</span></article></section></div>;
}
