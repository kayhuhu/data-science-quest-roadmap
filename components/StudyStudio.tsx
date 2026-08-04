"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";
import {
  BookOpenText,
  FileText,
  ImagePlus,
  ListFilter,
  NotebookPen,
  Plus,
  Save,
  Search,
  Sigma,
  Sparkles,
  Tags,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { roadmap } from "@/lib/quest-data";
import { loadStudyImage, saveStudyImage } from "@/lib/local-assets";
import type { QuestWorkspace } from "@/lib/use-quest-workspace";

type StudyStudioProps = {
  workspace: QuestWorkspace;
  onUpdate: (recipe: (current: QuestWorkspace) => QuestWorkspace) => void;
  saveState: "saved" | "saving" | "offline";
};

const starterBody = `# Nova anotação\n\nEscreva o conceito com suas próprias palavras.\n\n## O que preciso conseguir defender\n\n- [ ] Explicar sem consultar\n- [ ] Aplicar em um cenário bancário\n- [ ] Interpretar resultado e limitações\n`;

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function StoredMarkdownImage({ src, alt, ...props }: ComponentPropsWithoutRef<"img">) {
  const [localSource, setLocalSource] = useState<string | null>(null);
  const source = typeof src === "string" ? src : undefined;

  useEffect(() => {
    if (!source?.startsWith("/local-assets/")) return;
    let objectUrl: string | null = null;
    let cancelled = false;
    const id = source.slice("/local-assets/".length);
    void loadStudyImage(id).then((blob) => {
      if (!blob || cancelled) return;
      objectUrl = URL.createObjectURL(blob);
      setLocalSource(objectUrl);
    });
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [source]);

  if (source?.startsWith("/local-assets/") && !localSource) {
    return <span className="image-loading">Carregando imagem privada…</span>;
  }
  // Blob URLs do IndexedDB não podem passar pelo otimizador remoto do next/image.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} src={localSource ?? source} alt={alt ?? "Imagem da anotação"} />;
}

export function StudyStudio({ workspace, onUpdate, saveState }: StudyStudioProps) {
  const [selectedId, setSelectedId] = useState<string | null>(workspace.notes[0]?.id ?? null);
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const effectiveSelectedId = selectedId ?? workspace.notes[0]?.id ?? null;
  const selected = workspace.notes.find((note) => note.id === effectiveSelectedId) ?? null;
  const notes = workspace.notes.filter((note) => `${note.title} ${note.body}`.toLowerCase().includes(search.toLowerCase()));

  const createNote = () => {
    const note = {
      id: crypto.randomUUID(),
      title: "Anotação sem título",
      body: starterBody,
      week: 1,
      tags: ["em-estudo"],
      updatedAt: new Date().toISOString(),
    };
    onUpdate((current) => ({ ...current, notes: [note, ...current.notes], xp: current.xp + 5 }));
    setSelectedId(note.id);
    setMode("write");
  };

  const updateNote = (patch: Partial<NonNullable<typeof selected>>) => {
    if (!selected) return;
    onUpdate((current) => ({
      ...current,
      notes: current.notes.map((note) => note.id === selected.id ? { ...note, ...patch, updatedAt: new Date().toISOString() } : note),
    }));
  };

  const insertText = (value: string) => {
    if (!selected) return;
    const textarea = textareaRef.current;
    const start = textarea?.selectionStart ?? selected.body.length;
    const end = textarea?.selectionEnd ?? selected.body.length;
    updateNote({ body: `${selected.body.slice(0, start)}${value}${selected.body.slice(end)}` });
    window.setTimeout(() => {
      textarea?.focus();
      textarea?.setSelectionRange(start + value.length, start + value.length);
    }, 0);
  };

  const uploadImage = async (file: File | undefined) => {
    if (!file || !selected) return;
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      window.alert("Envie uma imagem JPG, PNG, WebP ou GIF.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      window.alert("A imagem deve ter no máximo 8 MB.");
      return;
    }
    setUploading(true);
    try {
      const result = await saveStudyImage(file);
      insertText(`\n![Descreva a imagem: ${result.fileName}](${result.url})\n*Legenda e fonte da imagem.*\n`);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Não foi possível enviar a imagem.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="studio-shell">
      <aside className="notes-sidebar">
        <div className="notes-sidebar-head"><div><span className="eyebrow muted">BIBLIOTECA</span><h2>Notas de estudo</h2></div><button className="square-button" onClick={createNote} aria-label="Nova nota"><Plus size={18} /></button></div>
        <label className="notes-search"><Search size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar nas notas" /></label>
        <div className="notes-filter"><button className="active"><FileText size={14} /> Todas <span>{workspace.notes.length}</span></button><button><ListFilter size={14} /> Favoritas</button></div>
        <div className="notes-list">
          {notes.length === 0 && <div className="empty-notes"><NotebookPen size={28} /><strong>Sua base começa aqui</strong><p>Crie notas próprias. Os livros continuam apenas como referência.</p><button onClick={createNote}>Criar primeira nota</button></div>}
          {notes.map((note) => (
            <button key={note.id} className={effectiveSelectedId === note.id ? "active" : ""} onClick={() => setSelectedId(note.id)}>
              <strong>{note.title}</strong><p>{note.body.replace(/[#>*$`\[\]]/g, " ").slice(0, 92)}</p><span>S{note.week.toString().padStart(2, "0")} · {new Date(note.updatedAt).toLocaleDateString("pt-BR")}</span>
            </button>
          ))}
        </div>
      </aside>

      <section className="editor-workspace">
        {!selected ? (
          <div className="studio-empty"><span><Sparkles size={30} /></span><h1>Construa seu segundo cérebro</h1><p>Registre explicações, fórmulas, trechos curtos e imagens vinculadas ao roadmap.</p><button className="primary-button" onClick={createNote}><Plus size={17} /> Criar anotação</button></div>
        ) : (
          <>
            <header className="editor-header">
              <div className="editor-title-block"><input value={selected.title} onChange={(event) => updateNote({ title: event.target.value })} aria-label="Título da nota" /><div><label>Semana <select value={selected.week} onChange={(event) => updateNote({ week: Number(event.target.value) })}>{roadmap.weeks.map((week) => <option key={week.number} value={week.number}>{week.number} · {week.title}</option>)}</select></label><span><Tags size={13} /> {selected.tags.join(", ")}</span></div></div>
              <div className={`save-indicator ${saveState}`}><Save size={14} />{saveState === "saved" ? "Salvo neste dispositivo" : saveState === "saving" ? "Salvando..." : "Falha ao salvar"}</div>
            </header>

            <div className="editor-toolbar">
              <div className="mode-switch"><button className={mode === "write" ? "active" : ""} onClick={() => setMode("write")}>Escrever</button><button className={mode === "preview" ? "active" : ""} onClick={() => setMode("preview")}>Visualizar</button></div>
              <div className="insert-tools">
                <button onClick={() => insertText("\n$$\nP(X \\le x) = F_X(x)\n$$\n")}><Sigma size={15} /> Fórmula</button>
                <button onClick={() => insertText("\n> **Trecho de leitura**\n> Cole somente um trecho curto e necessário.\n> \n> Fonte: Livro, capítulo, página.\n")}><BookOpenText size={15} /> Trecho</button>
                <label className={uploading ? "uploading" : ""}><ImagePlus size={15} />{uploading ? "Enviando..." : "Imagem"}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden onChange={(event) => void uploadImage(event.target.files?.[0])} /></label>
              </div>
            </div>

            <div className="editor-canvas">
              {mode === "write" ? (
                <textarea ref={textareaRef} value={selected.body} onChange={(event) => updateNote({ body: event.target.value })} spellCheck placeholder="Use Markdown, $$ LaTeX $$, listas, tabelas e blocos de código..." />
              ) : (
                <article className="markdown-preview"><ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={{ img: StoredMarkdownImage }}>{selected.body}</ReactMarkdown></article>
              )}
            </div>
            <footer className="editor-footer"><span>{selected.body.trim().split(/\s+/).filter(Boolean).length} palavras</span><span>Privada por padrão · salva neste dispositivo</span></footer>
          </>
        )}
      </section>
    </div>
  );
}
