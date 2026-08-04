"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Bell,
  BookOpenCheck,
  BrainCircuit,
  Bug,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Cloud,
  CloudOff,
  Command,
  FlaskConical,
  FolderGit2,
  LayoutDashboard,
  Medal,
  Menu,
  MessageCircleQuestion,
  Moon,
  NotebookPen,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Sun,
  TimerReset,
  X,
} from "lucide-react";
import { JourneyView } from "@/components/JourneyView";
import { WeekDrawer } from "@/components/WeekDrawer";
import { SyllabusView } from "@/components/SyllabusView";
import { StudyStudio } from "@/components/StudyStudio";
import {
  AchievementsView,
  AnalyticsView,
  ErrorsView,
  FlashcardsView,
  PomodoroView,
  PracticalExamView,
  ProjectsView,
  SabatinaView,
  SettingsView,
} from "@/components/LearningViews";
import { roadmap, type RoadmapWeek } from "@/lib/quest-data";
import { useQuestWorkspace } from "@/lib/use-quest-workspace";

type ActiveView =
  | "jornada"
  | "ementa"
  | "pomodoro"
  | "estudio"
  | "flashcards"
  | "sabatina"
  | "prova"
  | "projetos"
  | "analytics"
  | "erros"
  | "conquistas"
  | "configuracoes";

const navGroups = [
  {
    label: "JORNADA",
    items: [
      { id: "jornada", label: "Visão geral", icon: LayoutDashboard },
      { id: "ementa", label: "Ementa oficial", icon: BookOpenCheck, badge: "72" },
      { id: "projetos", label: "Projetos", icon: FolderGit2, badge: "22" },
    ],
  },
  {
    label: "ESTUDO",
    items: [
      { id: "pomodoro", label: "Sala de foco", icon: TimerReset },
      { id: "estudio", label: "Anotações", icon: NotebookPen },
      { id: "flashcards", label: "Flashcards", icon: BrainCircuit, badge: "220" },
      { id: "sabatina", label: "Sabatina", icon: MessageCircleQuestion },
      { id: "prova", label: "Prova prática", icon: FlaskConical },
    ],
  },
  {
    label: "EVOLUÇÃO",
    items: [
      { id: "analytics", label: "Analytics", icon: BarChart3 },
      { id: "erros", label: "Caderno de erros", icon: Bug },
      { id: "conquistas", label: "Conquistas", icon: Medal },
    ],
  },
] as const;

const mobileNav = ["jornada", "ementa", "pomodoro", "estudio", "flashcards"] as ActiveView[];

export function QuestApp({
  initialView = "jornada",
  initialWeek,
}: {
  initialView?: ActiveView;
  initialWeek?: number;
}) {
  const { workspace, update, ready, saveState, totals } = useQuestWorkspace();
  const [active, setActive] = useState<ActiveView>(initialView);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<RoadmapWeek | null>(
    initialWeek ? roadmap.weeks[initialWeek - 1] ?? null : null,
  );
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
        setSelectedWeek(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = workspace.settings.theme;
  }, [workspace.settings.theme]);

  const navigate = (view: string) => {
    setActive(view as ActiveView);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const commandResults = useMemo(() => {
    const query = commandQuery.trim().toLocaleLowerCase("pt-BR");
    if (!query) return [];
    const weeks = roadmap.weeks
      .filter((week) => `${week.number} ${week.title} ${week.block}`.toLocaleLowerCase("pt-BR").includes(query))
      .slice(0, 5)
      .map((week) => ({ id: `w-${week.number}`, type: "Semana", title: `Semana ${week.number} · ${week.title}`, action: () => setSelectedWeek(week) }));
    const syllabus = roadmap.syllabus
      .filter((item) => item.text.toLocaleLowerCase("pt-BR").includes(query))
      .slice(0, 5)
      .map((item) => ({ id: item.id, type: "Ementa", title: item.text, action: () => navigate("ementa") }));
    const questions = roadmap.weeks.flatMap((week) => week.sabatina.map((item, index) => ({ ...item, week: week.number, index })))
      .filter((item) => item.question.toLocaleLowerCase("pt-BR").includes(query))
      .slice(0, 4)
      .map((item) => ({ id: `q-${item.week}-${item.index}`, type: "Sabatina", title: item.question, action: () => navigate("sabatina") }));
    return [...weeks, ...syllabus, ...questions];
  }, [commandQuery]);

  const renderView = () => {
    const common = { workspace, onUpdate: update };
    switch (active) {
      case "ementa": return <SyllabusView {...common} />;
      case "pomodoro": return <PomodoroView {...common} />;
      case "estudio": return <StudyStudio {...common} saveState={saveState} />;
      case "flashcards": return <FlashcardsView {...common} />;
      case "sabatina": return <SabatinaView {...common} />;
      case "prova": return <PracticalExamView {...common} />;
      case "projetos": return <ProjectsView {...common} />;
      case "analytics": return <AnalyticsView {...common} />;
      case "erros": return <ErrorsView {...common} />;
      case "conquistas": return <AchievementsView {...common} />;
      case "configuracoes": return <SettingsView {...common} />;
      default:
        return <JourneyView workspace={workspace} studySeconds={totals.studySeconds} greenItems={totals.greenItems} onSelectWeek={setSelectedWeek} onNavigate={navigate} onStartFocus={() => navigate("pomodoro")} />;
    }
  };

  return (
    <div className={`quest-app ${collapsed ? "sidebar-collapsed" : ""}`}>
      <aside className={`main-sidebar ${mobileMenu ? "mobile-open" : ""}`}>
        <div className="brand-row">
          <button className="brand" onClick={() => navigate("jornada")} aria-label="Data Science Quest - Início">
            <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /><b /></span>
            {!collapsed && <span><strong>Data Science</strong><em>Quest</em></span>}
          </button>
          <button className="mobile-close" onClick={() => setMobileMenu(false)} aria-label="Fechar menu"><X size={19} /></button>
        </div>

        <nav className="sidebar-nav">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              {!collapsed && <span className="nav-group-label">{group.label}</span>}
              {group.items.map((item) => {
                const Icon = item.icon;
                return <button key={item.id} className={active === item.id ? "active" : ""} onClick={() => navigate(item.id)} title={collapsed ? item.label : undefined}><Icon size={18} /><span>{item.label}</span>{"badge" in item && <b>{item.badge}</b>}</button>;
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className={active === "configuracoes" ? "active" : ""} onClick={() => navigate("configuracoes")}><Settings2 size={18} /><span>Configurações</span></button>
          <button><CircleHelp size={18} /><span>Guia de uso</span></button>
          {!collapsed && <div className="source-seal"><Sparkles size={16} /><div><strong>roadmap-v12</strong><span>conteúdo auditado</span></div></div>}
        </div>
        <button className="collapse-button" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? "Expandir menu" : "Recolher menu"}>{collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}</button>
      </aside>

      <div className="app-column">
        <header className="topbar">
          <button className="mobile-menu-button" onClick={() => setMobileMenu(true)} aria-label="Abrir menu"><Menu size={20} /></button>
          <button className="global-search" onClick={() => setCommandOpen(true)}><Search size={17} /><span>Buscar semanas, temas, notas e perguntas...</span><kbd><Command size={12} /> K</kbd></button>
          <div className="topbar-actions">
            <span className={`sync-status ${saveState}`}>{saveState === "offline" ? <CloudOff size={15} /> : <Cloud size={15} />}{!collapsed && (saveState === "saved" ? "Sincronizado" : saveState === "saving" ? "Salvando" : "Reconectando")}</span>
            <button className="icon-button" onClick={() => update((current) => ({ ...current, settings: { ...current.settings, theme: current.settings.theme === "dark" ? "light" : "dark" } }))} aria-label="Alternar tema">{workspace.settings.theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</button>
            <button className="icon-button notification-button" aria-label="Notificações"><Bell size={18} /><i /></button>
            <button className="user-chip"><span>YK</span><div><strong>Explorador</strong><small>Nível {Math.floor(workspace.xp / 500) + 1}</small></div></button>
          </div>
        </header>

        <main className="app-main">
          {!ready ? <div className="app-loading"><span className="brand-mark"><i /><i /><i /><i /><b /></span><strong>Preparando sua expedição...</strong></div> : renderView()}
        </main>
      </div>

      <nav className="mobile-bottom-nav">
        {mobileNav.map((id) => {
          const item = navGroups.flatMap((group) => group.items).find((entry) => entry.id === id)!;
          const Icon = item.icon;
          return <button key={id} className={active === id ? "active" : ""} onClick={() => navigate(id)}><Icon size={19} /><span>{id === "jornada" ? "Início" : item.label.split(" ")[0]}</span></button>;
        })}
      </nav>
      <button className="floating-action" onClick={() => navigate("estudio")} aria-label="Criar anotação"><Plus size={22} /></button>

      <WeekDrawer week={selectedWeek} workspace={workspace} onClose={() => setSelectedWeek(null)} onUpdate={update} onNavigate={(view) => { setSelectedWeek(null); navigate(view); }} />

      {commandOpen && (
        <div className="command-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setCommandOpen(false)}>
          <section className="command-palette" role="dialog" aria-modal="true" aria-label="Busca global">
            <header><Search size={20} /><input autoFocus value={commandQuery} onChange={(event) => setCommandQuery(event.target.value)} placeholder="Digite um tema, semana ou pergunta..." /><kbd>ESC</kbd></header>
            <div className="command-results">
              {!commandQuery && <div className="command-empty"><Sparkles size={25} /><strong>Encontre qualquer ponto da jornada</strong><p>Experimente “p-valor”, “SVM”, “SQL” ou “RAG”.</p></div>}
              {commandQuery && commandResults.length === 0 && <div className="command-empty"><Search size={25} /><strong>Nenhum resultado</strong><p>Tente um termo mais amplo.</p></div>}
              {commandResults.map((result) => <button key={result.id} onClick={() => { result.action(); setCommandOpen(false); setCommandQuery(""); }}><span>{result.type}</span><strong>{result.title}</strong><ChevronRight size={16} /></button>)}
            </div>
            <footer><span><kbd>↵</kbd> abrir</span><span><kbd>ESC</kbd> fechar</span><span>{roadmap.metrics.weeks} semanas · {roadmap.metrics.questions} perguntas indexadas</span></footer>
          </section>
        </div>
      )}
    </div>
  );
}
