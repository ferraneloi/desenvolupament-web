import { useState, useEffect, useRef, useCallback } from "react";
import Editor from "@monaco-editor/react";
import {
  Play, RotateCcw, Download, Plus, Trash2, FileText, FileCode,
  FileCog, FolderOpen, ChevronRight, ChevronDown, Maximize2, Minimize2,
  RefreshCw, X, PanelLeftClose, PanelLeftOpen, Moon, Sun, AlertCircle
} from "lucide-react";
import JSZip from "jszip";

// ─── Constants ────────────────────────────────────────────────
const STORAGE_KEY = "aula-playground-projects";
const ACTIVE_KEY = "aula-playground-active";

const DEFAULT_FILES = {
  "index.html": {
    name: "index.html",
    language: "html",
    content: `<!DOCTYPE html>
<html lang="ca">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles.css">
  <script src="script.js" defer><\/script>
  <title>El meu projecte</title>
</head>
<body>
  <h1>Hola, món!</h1>
  <p>Edita els fitxers i mira el resultat a la dreta.</p>
  <button id="boto">Prem-me</button>
</body>
</html>`,
  },
  "styles.css": {
    name: "styles.css",
    language: "css",
    content: `body {
  font-family: Arial, sans-serif;
  padding: 30px;
  color: #23302b;
}

h1 {
  color: royalblue;
}

button {
  margin-top: 16px;
  padding: 8px 18px;
  background: royalblue;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
}

button:hover {
  background: #1a5bbf;
}`,
  },
  "script.js": {
    name: "script.js",
    language: "javascript",
    content: `const boto = document.querySelector('#boto');

boto.addEventListener('click', () => {
  alert('Hola des de JavaScript!');
});`,
  },
};

const DEFAULT_PROJECT = {
  id: "default",
  name: "El meu projecte",
  files: DEFAULT_FILES,
  activeFile: "index.html",
};

// ─── Helpers ──────────────────────────────────────────────────
function getFileIcon(name) {
  if (name.endsWith(".html")) return <FileText size={14} className="text-orange-400" />;
  if (name.endsWith(".css")) return <FileCog size={14} className="text-blue-400" />;
  if (name.endsWith(".js")) return <FileCode size={14} className="text-yellow-400" />;
  return <FileText size={14} className="text-gray-400" />;
}

function getLanguage(filename) {
  if (filename.endsWith(".html")) return "html";
  if (filename.endsWith(".css")) return "css";
  if (filename.endsWith(".js")) return "javascript";
  return "plaintext";
}

function buildPreview(files) {
  const html = files["index.html"]?.content || "";
  const css = files["styles.css"]?.content || "";
  const js = files["script.js"]?.content || "";

  // Inject CSS and JS into the HTML
  let doc = html;

  // Replace <link rel="stylesheet" href="styles.css"> with inline style
  doc = doc.replace(
    /<link\s[^>]*href=["']styles\.css["'][^>]*>/gi,
    `<style>\n${css}\n</style>`
  );

  // Replace <script src="script.js" ...></script> with inline script
  doc = doc.replace(
    /<script\s[^>]*src=["']script\.js["'][^>]*><\/script>/gi,
    `<script>\ntry{\n${js}\n}catch(e){console.error(e);}\n<\/script>`
  );

  return doc;
}

function readProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [DEFAULT_PROJECT];
}

function saveProjects(projects) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {}
}

// ─── Main Component ───────────────────────────────────────────
export default function VSCodePlayground({ initialFiles = null }) {
  const [projects, setProjects] = useState(() => readProjects());
  const [activeProjectId, setActiveProjectId] = useState(
    () => localStorage.getItem(ACTIVE_KEY) || "default"
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [previewFullscreen, setPreviewFullscreen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [previewDoc, setPreviewDoc] = useState("");
  const [consoleMessages, setConsoleMessages] = useState([]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [showNewFile, setShowNewFile] = useState(false);
  const [renaming, setRenaming] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const iframeRef = useRef(null);
  const debounceRef = useRef(null);

  const project = projects.find((p) => p.id === activeProjectId) || projects[0];
  const activeFile = project?.activeFile || "index.html";
  const files = project?.files || DEFAULT_FILES;
  const currentFile = files[activeFile];

  // Load initial files from URL params (tutorial integration)
  useEffect(() => {
    if (!initialFiles) return;
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === "tutorial");
      const tpl = { id: "tutorial", name: "Tutorial", files: initialFiles, activeFile: Object.keys(initialFiles)[0] };
      if (idx >= 0) return prev.map((p) => (p.id === "tutorial" ? tpl : p));
      return [tpl, ...prev];
    });
    setActiveProjectId("tutorial");
  }, [initialFiles]);

  // Build preview
  const refresh = useCallback(() => {
    if (!project) return;
    setPreviewDoc(buildPreview(project.files));
    setIsDirty(false);
    setConsoleMessages([]);
  }, [project]);

  useEffect(() => {
    if (autoRefresh) {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(refresh, 600);
    } else {
      setIsDirty(true);
    }
    return () => clearTimeout(debounceRef.current);
  }, [files, autoRefresh, refresh]);

  // Handle console messages from iframe
  useEffect(() => {
    function onMessage(e) {
      if (e.data?.type === "console") {
        setConsoleMessages((m) => [...m.slice(-49), e.data]);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Persist
  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(ACTIVE_KEY, activeProjectId);
  }, [activeProjectId]);

  function updateFile(filename, content) {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === activeProjectId
          ? { ...p, files: { ...p.files, [filename]: { ...p.files[filename], content } } }
          : p
      )
    );
  }

  function setActiveFile(filename) {
    setProjects((prev) =>
      prev.map((p) => (p.id === activeProjectId ? { ...p, activeFile: filename } : p))
    );
  }

  function addFile() {
    if (!newFileName.trim()) return;
    const name = newFileName.trim();
    if (files[name]) return;
    const language = getLanguage(name);
    const content =
      language === "html" ? '<!DOCTYPE html>\n<html lang="ca">\n<head>\n  <meta charset="UTF-8">\n  <title>Nova pàgina</title>\n</head>\n<body>\n  \n</body>\n</html>'
      : language === "css" ? "/* Estils */\n"
      : language === "javascript" ? "// Codi JavaScript\n"
      : "";
    setProjects((prev) =>
      prev.map((p) =>
        p.id === activeProjectId
          ? { ...p, files: { ...p.files, [name]: { name, language, content } }, activeFile: name }
          : p
      )
    );
    setNewFileName("");
    setShowNewFile(false);
  }

  function deleteFile(filename) {
    if (Object.keys(files).length <= 1) return;
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== activeProjectId) return p;
        const newFiles = { ...p.files };
        delete newFiles[filename];
        const newActive = p.activeFile === filename ? Object.keys(newFiles)[0] : p.activeFile;
        return { ...p, files: newFiles, activeFile: newActive };
      })
    );
  }

  function renameFile(oldName, newName) {
    if (!newName || oldName === newName || files[newName]) return;
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== activeProjectId) return p;
        const newFiles = {};
        for (const [k, v] of Object.entries(p.files)) {
          if (k === oldName) {
            newFiles[newName] = { ...v, name: newName, language: getLanguage(newName) };
          } else {
            newFiles[k] = v;
          }
        }
        return { ...p, files: newFiles, activeFile: p.activeFile === oldName ? newName : p.activeFile };
      })
    );
    setRenaming(null);
  }

  function newProject() {
    const id = `project-${Date.now()}`;
    const p = { id, name: "Projecte nou", files: { ...DEFAULT_FILES }, activeFile: "index.html" };
    setProjects((prev) => [...prev, p]);
    setActiveProjectId(id);
  }

  function resetProject() {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === activeProjectId
          ? { ...DEFAULT_PROJECT, id: activeProjectId, name: p.name }
          : p
      )
    );
  }

  async function downloadZip() {
    const zip = new JSZip();
    for (const [name, file] of Object.entries(files)) {
      zip.file(name, file.content);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.name.replace(/\s+/g, "-")}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const monacoTheme = isDark ? "vs-dark" : "vs";
  const bgClass = isDark ? "bg-[#1e1e1e] text-[#d4d4d4]" : "bg-white text-[#1e1e1e]";

  return (
    <div className={`flex h-screen flex-col ${isDark ? "dark" : ""}`}>
      {/* Top bar */}
      <div className="flex h-10 items-center gap-2 border-b border-[#2f363b] bg-[#1a1f23] px-3 text-[#c9d1cd]">
        <button
          className="rounded p-1 hover:bg-white/10"
          onClick={() => setSidebarOpen((v) => !v)}
          title="Explorador"
        >
          {sidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
        </button>
        <span className="font-mono text-xs">{project?.name || "Playground"}</span>

        <div className="ml-auto flex items-center gap-1">
          <label className="flex cursor-pointer items-center gap-1.5 text-xs">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded"
            />
            Actualització automàtica
          </label>
          {!autoRefresh && isDirty && (
            <button
              className="flex items-center gap-1 rounded bg-primary px-2 py-0.5 text-xs font-medium text-white hover:bg-primary/80"
              onClick={refresh}
            >
              <Play size={11} /> Executa
            </button>
          )}
          <button
            className="rounded p-1 hover:bg-white/10"
            onClick={() => setIsDark((d) => !d)}
            title="Mode clar/fosc"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            className="rounded p-1 hover:bg-white/10"
            onClick={downloadZip}
            title="Descarrega ZIP"
          >
            <Download size={15} />
          </button>
          <button
            className="rounded p-1 hover:bg-white/10"
            onClick={resetProject}
            title="Reinicia projecte"
          >
            <RotateCcw size={15} />
          </button>
          <button
            className="rounded p-1 hover:bg-white/10"
            onClick={newProject}
            title="Nou projecte"
          >
            <Plus size={15} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: file explorer */}
        {sidebarOpen && (
          <aside className="flex w-52 flex-col border-r border-[#2f363b] bg-[#1a1f23] text-[#c9d1cd]">
            {/* Projects selector */}
            <div className="border-b border-[#2f363b] px-3 py-2">
              <select
                className="w-full bg-transparent font-mono text-xs text-[#c9d1cd] outline-none"
                value={activeProjectId}
                onChange={(e) => setActiveProjectId(e.target.value)}
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#1a1f23]">
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Files */}
            <div className="flex-1 overflow-y-auto py-2">
              <div className="mb-1 flex items-center justify-between px-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9aa3a0]">
                  FITXERS
                </span>
                <button
                  className="rounded p-0.5 hover:bg-white/10"
                  onClick={() => setShowNewFile(true)}
                  title="Nou fitxer"
                >
                  <Plus size={13} />
                </button>
              </div>

              {showNewFile && (
                <div className="mx-2 mb-1 flex gap-1">
                  <input
                    autoFocus
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") addFile(); if (e.key === "Escape") setShowNewFile(false); }}
                    placeholder="fitxer.html"
                    className="flex-1 rounded bg-[#2c3339] px-2 py-1 font-mono text-xs outline-none"
                  />
                  <button className="rounded bg-primary px-1.5 text-xs text-white" onClick={addFile}>✓</button>
                </div>
              )}

              {Object.values(files).map((file) => (
                <div
                  key={file.name}
                  className={`group flex cursor-pointer items-center gap-2 px-3 py-1 ${
                    activeFile === file.name ? "bg-[#2c3339] text-white" : "hover:bg-[#2c3339]/50"
                  }`}
                  onClick={() => setActiveFile(file.name)}
                >
                  {getFileIcon(file.name)}
                  {renaming === file.name ? (
                    <input
                      autoFocus
                      type="text"
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") renameFile(file.name, renameValue); if (e.key === "Escape") setRenaming(null); }}
                      onBlur={() => renameFile(file.name, renameValue)}
                      className="flex-1 rounded bg-[#2c3339] px-1 font-mono text-xs outline-none"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className="flex-1 font-mono text-xs truncate">{file.name}</span>
                  )}
                  <div className="hidden gap-0.5 group-hover:flex">
                    <button
                      className="rounded p-0.5 hover:bg-white/10"
                      onClick={(e) => { e.stopPropagation(); setRenaming(file.name); setRenameValue(file.name); }}
                      title="Reanomena"
                    >
                      <FileText size={11} />
                    </button>
                    {Object.keys(files).length > 1 && (
                      <button
                        className="rounded p-0.5 hover:bg-red-500/30 hover:text-red-400"
                        onClick={(e) => { e.stopPropagation(); deleteFile(file.name); }}
                        title="Elimina"
                      >
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* Editor + Preview */}
        <div className={`flex flex-1 overflow-hidden ${previewFullscreen ? "flex-col" : ""}`}>
          {/* Editor panel */}
          {!previewFullscreen && (
            <div className="flex flex-1 flex-col overflow-hidden border-r border-[#2f363b]">
              {/* Tabs */}
              <div className="flex overflow-x-auto border-b border-[#2f363b] bg-[#1a1f23]">
                {Object.values(files).map((file) => (
                  <button
                    key={file.name}
                    className={`flex shrink-0 items-center gap-1.5 border-r border-[#2f363b] px-3 py-2 font-mono text-xs transition-colors ${
                      activeFile === file.name
                        ? "bg-[#1e1e1e] text-white"
                        : "text-[#9aa3a0] hover:bg-[#2c3339] hover:text-white"
                    }`}
                    onClick={() => setActiveFile(file.name)}
                  >
                    {getFileIcon(file.name)}
                    {file.name}
                  </button>
                ))}
              </div>

              {/* Monaco Editor */}
              <div className="flex-1">
                {currentFile && (
                  <Editor
                    height="100%"
                    language={currentFile.language}
                    value={currentFile.content}
                    theme={monacoTheme}
                    onChange={(value) => updateFile(activeFile, value ?? "")}
                    options={{
                      fontSize: 13,
                      lineHeight: 1.65,
                      fontFamily: "'JetBrains Mono', 'Cascadia Code', Consolas, monospace",
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      wordWrap: "on",
                      tabSize: 2,
                      automaticLayout: true,
                      bracketPairColorization: { enabled: true },
                      formatOnPaste: true,
                      suggest: { showKeywords: true },
                    }}
                  />
                )}
              </div>
            </div>
          )}

          {/* Preview panel */}
          <div className={`flex flex-col ${previewFullscreen ? "flex-1" : "w-1/2"} overflow-hidden`}>
            {/* Preview toolbar */}
            <div className="flex items-center gap-2 border-b border-[#2f363b] bg-[#1a1f23] px-3 py-2 text-xs text-[#c9d1cd]">
              <span className="font-mono uppercase tracking-wider text-[10px]">Resultat</span>
              {autoRefresh && (
                <span className="ml-1 inline-flex items-center gap-1 text-[10px] text-[#9dd0b5]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9dd0b5]" />
                  en directe
                </span>
              )}
              {isDirty && !autoRefresh && (
                <span className="ml-1 inline-flex items-center gap-1 text-[10px] text-yellow-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                  pendent
                </span>
              )}
              <div className="ml-auto flex items-center gap-1">
                <button
                  className="rounded p-1 hover:bg-white/10"
                  onClick={refresh}
                  title="Actualitza"
                >
                  <RefreshCw size={13} />
                </button>
                <button
                  className="rounded p-1 hover:bg-white/10"
                  onClick={() => setPreviewFullscreen((v) => !v)}
                  title={previewFullscreen ? "Redueix" : "Pantalla completa"}
                >
                  {previewFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                </button>
              </div>
            </div>

            {/* iframe preview */}
            <div className="flex-1 overflow-hidden">
              <iframe
                ref={iframeRef}
                className="h-full w-full border-0 bg-white"
                sandbox="allow-scripts allow-modals allow-forms allow-popups"
                srcDoc={previewDoc}
                title="Vista prèvia del projecte"
              />
            </div>

            {/* Console */}
            {consoleMessages.length > 0 && (
              <div className="max-h-28 overflow-y-auto border-t border-[#2f363b] bg-[#0d1117]">
                <div className="flex items-center justify-between px-3 py-1">
                  <span className="font-mono text-[10px] text-[#9aa3a0]">CONSOLA</span>
                  <button
                    className="text-[#9aa3a0] hover:text-white"
                    onClick={() => setConsoleMessages([])}
                  >
                    <X size={11} />
                  </button>
                </div>
                {consoleMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 px-3 py-0.5 font-mono text-[11px] ${
                      msg.level === "error" ? "text-red-400" : msg.level === "warn" ? "text-yellow-400" : "text-[#c9d1cd]"
                    }`}
                  >
                    <span className="text-[#9aa3a0]">&gt;</span>
                    <span>{msg.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex h-6 items-center justify-between border-t border-[#2f363b] bg-primary px-3 font-mono text-[10px] text-primary-foreground">
        <span>Aula HTML Playground</span>
        <span>{currentFile?.language?.toUpperCase() || ""}</span>
      </div>
    </div>
  );
}

