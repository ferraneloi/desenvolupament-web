import { useState, useEffect, useRef, useCallback } from "react";
import Editor from "@monaco-editor/react";
import {
  Play, RotateCcw, Download, Plus, Trash2, FileText, FileCode,
  FileCog, FolderOpen, ChevronRight, ChevronDown, Maximize2, Minimize2,
  RefreshCw, X, PanelLeftClose, PanelLeftOpen, Moon, Sun, Folder,
  FolderPlus, Upload
} from "lucide-react";
import JSZip from "jszip";

// ─── Constants ────────────────────────────────────────────────
const STORAGE_KEY = "aula-playground-projects";
const ACTIVE_KEY  = "aula-playground-active";

const DEFAULT_FILES = {
  "index.html": {
    name: "index.html",
    path: "index.html",
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
    path: "styles.css",
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
    path: "script.js",
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
  folders: [],
};

// ─── Helpers ──────────────────────────────────────────────────
function getFileIcon(name) {
  if (name.endsWith(".html")) return <FileText size={14} className="text-orange-400 shrink-0" />;
  if (name.endsWith(".css"))  return <FileCog size={14}  className="text-blue-400 shrink-0" />;
  if (name.endsWith(".js"))   return <FileCode size={14} className="text-yellow-400 shrink-0" />;
  return <FileText size={14} className="text-gray-400 shrink-0" />;
}

function getLanguage(filename) {
  if (filename.endsWith(".html")) return "html";
  if (filename.endsWith(".css"))  return "css";
  if (filename.endsWith(".js"))   return "javascript";
  if (filename.endsWith(".json")) return "json";
  return "plaintext";
}

function normPath(p) { return p.replace(/\\/g, "/").replace(/^\/+/, ""); }
function folderOf(path) { const i = path.lastIndexOf("/"); return i === -1 ? "" : path.slice(0, i + 1); }
function basename(path) { return path.split("/").pop(); }

// ─── Build virtual filesystem preview ────────────────────────
function buildPreview(files) {
  // Create Blob URLs for every file
  const blobMap = {};
  for (const [path, file] of Object.entries(files)) {
    const mime =
      path.endsWith(".html") ? "text/html; charset=utf-8" :
      path.endsWith(".css")  ? "text/css; charset=utf-8"  :
      path.endsWith(".js")   ? "text/javascript; charset=utf-8" :
      "text/plain; charset=utf-8";
    const blob = new Blob([file.content], { type: mime });
    blobMap[path] = URL.createObjectURL(blob);
  }

  let doc = files["index.html"]?.content || "<p>Cap fitxer index.html</p>";

  // Replace relative references to known file paths with their Blob URLs
  for (const [path, blobUrl] of Object.entries(blobMap)) {
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    doc = doc
      .replace(new RegExp(`(href|src)=["']${escaped}["']`, "g"), `$1="${blobUrl}"`)
      .replace(new RegExp(`url\\(['"]?${escaped}['"]?\\)`, "g"), `url('${blobUrl}')`);
  }

  // Inject navigation interceptor + console relay
  const helperScript = `<script>
(function(){
  var blobMap = ${JSON.stringify(blobMap)};
  // Intercept link clicks to relative HTML files
  document.addEventListener('click', function(e){
    var a = e.target.closest('a');
    if(!a) return;
    var href = a.getAttribute('href');
    if(!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('blob') || href.startsWith('mailto')) return;
    var target = href.replace(/^\\.\\//,'');
    if(blobMap[target]){ e.preventDefault(); location.href = blobMap[target]; }
  }, true);
  // Relay console to parent
  ['log','warn','error'].forEach(function(l){
    var orig = console[l].bind(console);
    console[l] = function(){
      var text = Array.from(arguments).map(function(v){
        try{ return typeof v==='string'?v:JSON.stringify(v); }catch(e){ return String(v); }
      }).join(' ');
      window.parent.postMessage({type:'console',level:l,text:text},'*');
      orig.apply(console,arguments);
    };
  });
})();
<\/script>`;

  if (doc.includes("</head>")) {
    doc = doc.replace("</head>", helperScript + "\n</head>");
  } else {
    doc = helperScript + doc;
  }

  return doc;
}

// ─── LocalStorage ─────────────────────────────────────────────
function readProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw).map((p) => ({
        ...p,
        folders: p.folders || [],
        files: Object.fromEntries(
          Object.entries(p.files || {}).map(([k, f]) => [k, { ...f, path: f.path || k }])
        ),
      }));
    }
  } catch {}
  return [DEFAULT_PROJECT];
}

function saveProjects(projects) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(projects)); } catch {}
}

// ─── Build nested tree from flat files map ────────────────────
function buildTree(files, folders) {
  const tree = { __files: [], __folders: {} };

  // Explicitly created folders (may be empty)
  for (const f of (folders || [])) {
    const parts = f.split("/").filter(Boolean);
    let node = tree;
    for (const part of parts) {
      if (!node.__folders[part]) node.__folders[part] = { __files: [], __folders: {} };
      node = node.__folders[part];
    }
  }

  for (const [path, file] of Object.entries(files)) {
    const parts = path.split("/");
    let node = tree;
    for (let i = 0; i < parts.length - 1; i++) {
      const p = parts[i];
      if (!node.__folders[p]) node.__folders[p] = { __files: [], __folders: {} };
      node = node.__folders[p];
    }
    node.__files.push(file);
  }
  return tree;
}

// ─── Recursive FileTree renderer ─────────────────────────────
function FileTreeNode({
  node, prefix, activeFile, onSelect,
  onRename, onDelete, renaming, renameValue, setRenameValue,
  onRenameCommit, onRenameCancel, collapsed, toggleCollapse,
  onAddFile, onDeleteFolder,
}) {
  const folderNames = Object.keys(node.__folders).sort();
  const files = [...node.__files].sort((a, b) => a.path.localeCompare(b.path));

  return (
    <>
      {folderNames.map((folderName) => {
        const folderPath = prefix ? `${prefix}/${folderName}` : folderName;
        const isOpen = !collapsed[folderPath];
        return (
          <div key={folderPath}>
            <div
              className="group flex cursor-pointer items-center gap-1 px-2 py-0.5 hover:bg-[#2c3339]/50"
              onClick={() => toggleCollapse(folderPath)}
            >
              {isOpen
                ? <ChevronDown size={11}  className="text-[#9aa3a0] shrink-0" />
                : <ChevronRight size={11} className="text-[#9aa3a0] shrink-0" />}
              {isOpen
                ? <FolderOpen size={13} className="text-yellow-300 shrink-0" />
                : <Folder     size={13} className="text-yellow-300 shrink-0" />}
              <span className="flex-1 font-mono text-xs truncate">{folderName}</span>
              <div className="hidden gap-0.5 group-hover:flex">
                <button
                  className="rounded p-0.5 hover:bg-white/10"
                  title="Nou fitxer dins"
                  onClick={(e) => { e.stopPropagation(); onAddFile(folderPath + "/"); }}
                >
                  <Plus size={10} />
                </button>
                <button
                  className="rounded p-0.5 hover:bg-red-500/30 hover:text-red-400"
                  title="Elimina carpeta"
                  onClick={(e) => { e.stopPropagation(); onDeleteFolder(folderPath); }}
                >
                  <Trash2 size={10} />
                </button>
              </div>
            </div>
            {isOpen && (
              <div className="pl-3 border-l border-[#2f363b]/60 ml-3">
                <FileTreeNode
                  node={node.__folders[folderName]}
                  prefix={folderPath}
                  activeFile={activeFile}
                  onSelect={onSelect}
                  onRename={onRename}
                  onDelete={onDelete}
                  renaming={renaming}
                  renameValue={renameValue}
                  setRenameValue={setRenameValue}
                  onRenameCommit={onRenameCommit}
                  onRenameCancel={onRenameCancel}
                  collapsed={collapsed}
                  toggleCollapse={toggleCollapse}
                  onAddFile={onAddFile}
                  onDeleteFolder={onDeleteFolder}
                />
              </div>
            )}
          </div>
        );
      })}
      {files.map((file) => (
        <div
          key={file.path}
          className={`group flex cursor-pointer items-center gap-1.5 px-3 py-0.5 ${
            activeFile === file.path ? "bg-[#2c3339] text-white" : "hover:bg-[#2c3339]/50"
          }`}
          onClick={() => onSelect(file.path)}
        >
          {getFileIcon(file.name)}
          {renaming === file.path ? (
            <input
              autoFocus
              type="text"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onRenameCommit(file.path, renameValue);
                if (e.key === "Escape") onRenameCancel();
              }}
              onBlur={() => onRenameCommit(file.path, renameValue)}
              className="flex-1 rounded bg-[#2c3339] px-1 font-mono text-xs outline-none"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="flex-1 font-mono text-xs truncate">{file.name}</span>
          )}
          <div className="hidden gap-0.5 group-hover:flex">
            <button
              className="rounded p-0.5 hover:bg-white/10"
              onClick={(e) => { e.stopPropagation(); onRename(file.path); }}
              title="Reanomena"
            >
              <FileText size={10} />
            </button>
            <button
              className="rounded p-0.5 hover:bg-red-500/30 hover:text-red-400"
              onClick={(e) => { e.stopPropagation(); onDelete(file.path); }}
              title="Elimina"
            >
              <Trash2 size={10} />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────
export default function VSCodePlayground({ initialFiles = null }) {
  const [projects, setProjects]           = useState(() => readProjects());
  const [activeProjectId, setActiveProjectId] = useState(
    () => localStorage.getItem(ACTIVE_KEY) || "default"
  );
  const [sidebarOpen, setSidebarOpen]         = useState(true);
  const [previewFullscreen, setPreviewFullscreen] = useState(false);
  const [isDark, setIsDark]               = useState(false);
  const [previewDoc, setPreviewDoc]       = useState("");
  const [consoleMessages, setConsoleMessages] = useState([]);
  const [autoRefresh, setAutoRefresh]     = useState(true);
  const [isDirty, setIsDirty]             = useState(false);

  // New item (file or folder)
  const [newItemTarget, setNewItemTarget] = useState("");
  const [newItemName, setNewItemName]     = useState("");
  const [newItemType, setNewItemType]     = useState("file");
  const [showNewItem, setShowNewItem]     = useState(false);

  // Rename
  const [renaming, setRenaming]           = useState(null);
  const [renameValue, setRenameValue]     = useState("");

  // Folder collapse
  const [collapsed, setCollapsed]         = useState({});

  const iframeRef      = useRef(null);
  const debounceRef    = useRef(null);
  const folderInputRef = useRef(null);

  const project     = projects.find((p) => p.id === activeProjectId) || projects[0];
  const activeFile  = project?.activeFile || "index.html";
  const files       = project?.files || DEFAULT_FILES;
  const folders     = project?.folders || [];
  const currentFile = files[activeFile];

  // ── Load tutorial files
  useEffect(() => {
    if (!initialFiles) return;
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === "tutorial");
      const tpl = { id: "tutorial", name: "Tutorial", files: initialFiles, activeFile: Object.keys(initialFiles)[0], folders: [] };
      if (idx >= 0) return prev.map((p) => (p.id === "tutorial" ? tpl : p));
      return [tpl, ...prev];
    });
    setActiveProjectId("tutorial");
  }, [initialFiles]);

  // ── Build preview
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

  // ── Console relay
  useEffect(() => {
    function onMessage(e) {
      if (e.data?.type === "console") {
        setConsoleMessages((m) => [...m.slice(-49), e.data]);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // ── Persist
  useEffect(() => { saveProjects(projects); }, [projects]);
  useEffect(() => { localStorage.setItem(ACTIVE_KEY, activeProjectId); }, [activeProjectId]);

  // ─── File mutations ──────────────────────────────────────────
  function updateFile(path, content) {
    setProjects((prev) =>
      prev.map((p) =>
        p.id !== activeProjectId ? p :
        { ...p, files: { ...p.files, [path]: { ...p.files[path], content } } }
      )
    );
  }

  function setActiveFile(path) {
    setProjects((prev) =>
      prev.map((p) => (p.id === activeProjectId ? { ...p, activeFile: path } : p))
    );
  }

  function openAddItem(type, folderPrefix = "") {
    setNewItemType(type);
    setNewItemTarget(folderPrefix);
    setNewItemName("");
    setShowNewItem(true);
  }

  function commitNewItem() {
    const rawName = newItemName.trim();
    if (!rawName) { setShowNewItem(false); return; }
    const path = normPath(newItemTarget + rawName);

    if (newItemType === "folder") {
      setProjects((prev) =>
        prev.map((p) =>
          p.id !== activeProjectId ? p :
          { ...p, folders: [...(p.folders || []).filter((f) => f !== path), path] }
        )
      );
    } else {
      if (files[path]) { setShowNewItem(false); return; }
      const language = getLanguage(path);
      const content =
        language === "html" ? '<!DOCTYPE html>\n<html lang="ca">\n<head>\n  <meta charset="UTF-8">\n  <title>Nova pàgina</title>\n</head>\n<body>\n  \n</body>\n</html>'
        : language === "css" ? "/* Estils */\n"
        : language === "javascript" ? "// Codi JavaScript\n"
        : "";
      setProjects((prev) =>
        prev.map((p) =>
          p.id !== activeProjectId ? p :
          {
            ...p,
            files: { ...p.files, [path]: { name: basename(path), path, language, content } },
            activeFile: path,
          }
        )
      );
    }
    setNewItemName("");
    setShowNewItem(false);
  }

  function deleteFile(path) {
    if (Object.keys(files).length <= 1) return;
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== activeProjectId) return p;
        const newFiles = { ...p.files };
        delete newFiles[path];
        const newActive = p.activeFile === path ? Object.keys(newFiles)[0] : p.activeFile;
        return { ...p, files: newFiles, activeFile: newActive };
      })
    );
  }

  function deleteFolder(folderPath) {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== activeProjectId) return p;
        const newFolders = (p.folders || []).filter(
          (f) => f !== folderPath && !f.startsWith(folderPath + "/")
        );
        const newFiles = {};
        for (const [k, v] of Object.entries(p.files)) {
          if (!k.startsWith(folderPath + "/")) newFiles[k] = v;
        }
        const newActive = newFiles[p.activeFile] ? p.activeFile : Object.keys(newFiles)[0] || "";
        return { ...p, folders: newFolders, files: newFiles, activeFile: newActive };
      })
    );
  }

  function renameFileCommit(oldPath, newName) {
    if (!newName || oldPath === newName || files[newName]) { setRenaming(null); return; }
    const folder  = folderOf(oldPath);
    const newPath = normPath(folder + newName);
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== activeProjectId) return p;
        const newFiles = {};
        for (const [k, v] of Object.entries(p.files)) {
          if (k === oldPath) {
            newFiles[newPath] = { ...v, name: basename(newPath), path: newPath, language: getLanguage(newPath) };
          } else {
            newFiles[k] = v;
          }
        }
        return { ...p, files: newFiles, activeFile: p.activeFile === oldPath ? newPath : p.activeFile };
      })
    );
    setRenaming(null);
  }

  // ─── Project mutations ───────────────────────────────────────
  function newProject() {
    const id = `project-${Date.now()}`;
    const p = { id, name: "Projecte nou", files: { ...DEFAULT_FILES }, activeFile: "index.html", folders: [] };
    setProjects((prev) => [...prev, p]);
    setActiveProjectId(id);
  }

  function resetProject() {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === activeProjectId ? { ...DEFAULT_PROJECT, id: activeProjectId, name: p.name } : p
      )
    );
  }

  // ─── Load local folder ───────────────────────────────────────
  async function handleFolderUpload(e) {
    const inputFiles = Array.from(e.target.files);
    if (!inputFiles.length) return;
    const newFiles  = {};
    const newFolders = new Set();
    for (const f of inputFiles) {
      const relativePath = normPath(f.webkitRelativePath || f.name);
      let text = "";
      try { text = await f.text(); } catch {}
      newFiles[relativePath] = { name: basename(relativePath), path: relativePath, language: getLanguage(relativePath), content: text };
      const parts = relativePath.split("/");
      for (let i = 1; i < parts.length; i++) newFolders.add(parts.slice(0, i).join("/"));
    }
    const rootName = inputFiles[0].webkitRelativePath?.split("/")[0] || "Carpeta carregada";
    const id = `project-${Date.now()}`;
    const p  = {
      id, name: rootName, files: newFiles,
      activeFile: newFiles["index.html"] ? "index.html" : Object.keys(newFiles)[0],
      folders: [...newFolders],
    };
    setProjects((prev) => [...prev, p]);
    setActiveProjectId(id);
    e.target.value = "";
  }

  // ─── Download ZIP with folder structure ──────────────────────
  async function downloadZip() {
    const zip = new JSZip();
    for (const [path, file] of Object.entries(files)) {
      zip.file(path, file.content);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url;
    a.download = `${project.name.replace(/\s+/g, "-")}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function toggleCollapse(path) {
    setCollapsed((c) => ({ ...c, [path]: !c[path] }));
  }

  const monacoTheme = isDark ? "vs-dark" : "vs";
  const tree = buildTree(files, folders);

  return (
    <div className={`flex h-screen flex-col ${isDark ? "dark" : ""}`}>
      {/* Top bar */}
      <div className="flex h-10 items-center gap-2 border-b border-[#2f363b] bg-[#1a1f23] px-3 text-[#c9d1cd]">
        <button className="rounded p-1 hover:bg-white/10" onClick={() => setSidebarOpen((v) => !v)} title="Explorador">
          {sidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
        </button>
        <span className="font-mono text-xs">{project?.name || "Playground"}</span>

        <div className="ml-auto flex items-center gap-1">
          <label className="flex cursor-pointer items-center gap-1.5 text-xs">
            <input type="checkbox" checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} className="rounded" />
            Actualització automàtica
          </label>
          {!autoRefresh && isDirty && (
            <button className="flex items-center gap-1 rounded bg-primary px-2 py-0.5 text-xs font-medium text-white hover:bg-primary/80" onClick={refresh}>
              <Play size={11} /> Executa
            </button>
          )}
          <button className="rounded p-1 hover:bg-white/10" onClick={() => setIsDark((d) => !d)} title="Mode clar/fosc">
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          {/* Load local folder */}
          <button className="rounded p-1 hover:bg-white/10" title="Carrega carpeta local" onClick={() => folderInputRef.current?.click()}>
            <Upload size={15} />
          </button>
          <input ref={folderInputRef} type="file" webkitdirectory="" multiple className="hidden" onChange={handleFolderUpload} />
          <button className="rounded p-1 hover:bg-white/10" onClick={downloadZip} title="Descarrega ZIP">
            <Download size={15} />
          </button>
          <button className="rounded p-1 hover:bg-white/10" onClick={resetProject} title="Reinicia projecte">
            <RotateCcw size={15} />
          </button>
          <button className="rounded p-1 hover:bg-white/10" onClick={newProject} title="Nou projecte">
            <Plus size={15} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="flex w-56 flex-col border-r border-[#2f363b] bg-[#1a1f23] text-[#c9d1cd]">
            {/* Project selector */}
            <div className="border-b border-[#2f363b] px-3 py-2">
              <select
                className="w-full bg-transparent font-mono text-xs text-[#c9d1cd] outline-none"
                value={activeProjectId}
                onChange={(e) => setActiveProjectId(e.target.value)}
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#1a1f23]">{p.name}</option>
                ))}
              </select>
            </div>

            {/* Files header */}
            <div className="flex items-center justify-between px-3 py-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9aa3a0]">FITXERS</span>
              <div className="flex gap-0.5">
                <button className="rounded p-0.5 hover:bg-white/10" onClick={() => openAddItem("file")} title="Nou fitxer">
                  <Plus size={13} />
                </button>
                <button className="rounded p-0.5 hover:bg-white/10" onClick={() => openAddItem("folder")} title="Nova carpeta">
                  <FolderPlus size={13} />
                </button>
              </div>
            </div>

            {/* New item input */}
            {showNewItem && (
              <div className="mx-2 mb-1 flex gap-1 items-center">
                {newItemType === "folder"
                  ? <Folder size={13} className="text-yellow-300 shrink-0" />
                  : getFileIcon(newItemName || "fitxer")}
                <input
                  autoFocus
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitNewItem();
                    if (e.key === "Escape") setShowNewItem(false);
                  }}
                  placeholder={newItemType === "folder" ? "nova-carpeta" : (newItemTarget || "") + "fitxer.html"}
                  className="flex-1 rounded bg-[#2c3339] px-2 py-1 font-mono text-xs outline-none"
                />
                <button className="rounded bg-primary px-1.5 text-xs text-white" onClick={commitNewItem}>✓</button>
              </div>
            )}

            {/* File tree */}
            <div className="flex-1 overflow-y-auto py-1">
              <FileTreeNode
                node={tree}
                prefix=""
                activeFile={activeFile}
                onSelect={setActiveFile}
                onRename={(path) => { setRenaming(path); setRenameValue(basename(path)); }}
                onDelete={deleteFile}
                renaming={renaming}
                renameValue={renameValue}
                setRenameValue={setRenameValue}
                onRenameCommit={renameFileCommit}
                onRenameCancel={() => setRenaming(null)}
                collapsed={collapsed}
                toggleCollapse={toggleCollapse}
                onAddFile={(prefix) => openAddItem("file", prefix)}
                onDeleteFolder={deleteFolder}
              />
            </div>
          </aside>
        )}

        {/* Editor + Preview */}
        <div className={`flex flex-1 overflow-hidden ${previewFullscreen ? "flex-col" : ""}`}>
          {/* Editor */}
          {!previewFullscreen && (
            <div className="flex flex-1 flex-col overflow-hidden border-r border-[#2f363b]">
              {/* Tabs */}
              <div className="flex overflow-x-auto border-b border-[#2f363b] bg-[#1a1f23]">
                {Object.values(files).map((file) => (
                  <button
                    key={file.path}
                    className={`flex shrink-0 items-center gap-1.5 border-r border-[#2f363b] px-3 py-2 font-mono text-xs transition-colors ${
                      activeFile === file.path
                        ? "bg-[#1e1e1e] text-white"
                        : "text-[#9aa3a0] hover:bg-[#2c3339] hover:text-white"
                    }`}
                    onClick={() => setActiveFile(file.path)}
                  >
                    {getFileIcon(file.name)}
                    {file.name}
                  </button>
                ))}
              </div>

              {/* Monaco */}
              <div className="flex-1">
                {currentFile && (
                  <Editor
                    height="100%"
                    language={currentFile.language}
                    value={currentFile.content}
                    theme={monacoTheme}
                    onChange={(value) => updateFile(activeFile, value ?? "")}
                    options={{
                      fontSize: 13, lineHeight: 1.65,
                      fontFamily: "'JetBrains Mono', 'Cascadia Code', Consolas, monospace",
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      wordWrap: "on", tabSize: 2,
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

          {/* Preview */}
          <div className={`flex flex-col ${previewFullscreen ? "flex-1" : "w-1/2"} overflow-hidden`}>
            <div className="flex items-center gap-2 border-b border-[#2f363b] bg-[#1a1f23] px-3 py-2 text-xs text-[#c9d1cd]">
              <span className="font-mono uppercase tracking-wider text-[10px]">Resultat</span>
              {autoRefresh && (
                <span className="ml-1 inline-flex items-center gap-1 text-[10px] text-[#9dd0b5]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9dd0b5]" /> en directe
                </span>
              )}
              {isDirty && !autoRefresh && (
                <span className="ml-1 inline-flex items-center gap-1 text-[10px] text-yellow-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" /> pendent
                </span>
              )}
              <div className="ml-auto flex items-center gap-1">
                <button className="rounded p-1 hover:bg-white/10" onClick={refresh} title="Actualitza">
                  <RefreshCw size={13} />
                </button>
                <button className="rounded p-1 hover:bg-white/10" onClick={() => setPreviewFullscreen((v) => !v)}
                  title={previewFullscreen ? "Redueix" : "Pantalla completa"}>
                  {previewFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <iframe
                ref={iframeRef}
                className="h-full w-full border-0 bg-white"
                sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
                srcDoc={previewDoc}
                title="Vista prèvia del projecte"
              />
            </div>

            {consoleMessages.length > 0 && (
              <div className="max-h-28 overflow-y-auto border-t border-[#2f363b] bg-[#0d1117]">
                <div className="flex items-center justify-between px-3 py-1">
                  <span className="font-mono text-[10px] text-[#9aa3a0]">CONSOLA</span>
                  <button className="text-[#9aa3a0] hover:text-white" onClick={() => setConsoleMessages([])}>
                    <X size={11} />
                  </button>
                </div>
                {consoleMessages.map((msg, i) => (
                  <div key={i} className={`flex gap-2 px-3 py-0.5 font-mono text-[11px] ${
                    msg.level === "error" ? "text-red-400" : msg.level === "warn" ? "text-yellow-400" : "text-[#c9d1cd]"
                  }`}>
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
