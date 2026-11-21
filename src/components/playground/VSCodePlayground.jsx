import { useState, useEffect, useRef, useCallback } from "react";
import Editor from "@monaco-editor/react";
import {
  Play, RotateCcw, Download, Plus, Trash2, FileText, FileCode,
  FileCog, FolderOpen, ChevronRight, ChevronDown, Maximize2, Minimize2,
  RefreshCw, X, PanelLeftClose, PanelLeftOpen, Moon, Sun, Folder,
  FolderPlus, Upload, Code, Columns2, Eye, Image as ImageIcon, Music
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
  openTabs: ["index.html", "styles.css", "script.js"],
  folders: [],
};

// ─── Helpers ──────────────────────────────────────────────────
function getFileIcon(name) {
  const lower = name.toLowerCase();
  if (lower.endsWith(".html")) return <FileText size={14} className="text-orange-400 shrink-0" />;
  if (lower.endsWith(".css"))  return <FileCog size={14}  className="text-blue-400 shrink-0" />;
  if (lower.endsWith(".js"))   return <FileCode size={14} className="text-yellow-400 shrink-0" />;
  if (lower.endsWith(".json")) return <FileCode size={14} className="text-green-400 shrink-0" />;
  if (/\.(png|jpg|jpeg|gif|webp|svg|ico|bmp|avif)$/i.test(lower)) {
    return <ImageIcon size={14} className="text-emerald-400 shrink-0" />;
  }
  if (/\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(lower)) {
    return <Music size={14} className="text-purple-400 shrink-0" />;
  }
  return <FileText size={14} className="text-gray-400 shrink-0" />;
}

function getLanguage(filename) {
  if (filename.endsWith(".html")) return "html";
  if (filename.endsWith(".css"))  return "css";
  if (filename.endsWith(".js"))   return "javascript";
  if (filename.endsWith(".json")) return "json";
  return "plaintext";
}

function isBinaryFile(filename, mimeType = "") {
  const ext = filename.split(".").pop().toLowerCase();
  const binaryExts = [
    "png", "jpg", "jpeg", "gif", "webp", "ico", "bmp", "avif",
    "mp3", "wav", "ogg", "m4a", "aac", "flac",
    "mp4", "webm", "ogv",
    "pdf", "woff", "woff2", "ttf", "eot", "zip"
  ];
  if (binaryExts.includes(ext)) return true;
  if (mimeType.startsWith("image/") && ext !== "svg") return true;
  if (mimeType.startsWith("audio/") || mimeType.startsWith("video/")) return true;
  return false;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

function normPath(p) { return p.replace(/\\/g, "/").replace(/^\/+/, ""); }
function folderOf(path) { const i = path.lastIndexOf("/"); return i === -1 ? "" : path.slice(0, i + 1); }
function basename(path) { return path.split("/").pop(); }

// ─── Build virtual filesystem preview ────────────────────────
function buildPreview(files) {
  // Create Blob URLs for every file
  const blobMap = {};
  for (const [path, file] of Object.entries(files)) {
    if (file.isBinary && file.dataUrl) {
      try {
        const [header, base64] = file.dataUrl.split(",");
        const mime = header.match(/:(.*?);/)?.[1] || "application/octet-stream";
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mime });
        blobMap[path] = URL.createObjectURL(blob);
      } catch {
        blobMap[path] = file.dataUrl;
      }
    } else {
      const mime =
        path.endsWith(".html") ? "text/html; charset=utf-8" :
        path.endsWith(".css")  ? "text/css; charset=utf-8"  :
        path.endsWith(".js")   ? "text/javascript; charset=utf-8" :
        path.endsWith(".svg")  ? "image/svg+xml; charset=utf-8" :
        "text/plain; charset=utf-8";
      const blob = new Blob([file.content || ""], { type: mime });
      blobMap[path] = URL.createObjectURL(blob);
    }
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
      return JSON.parse(raw).map((p) => {
        const fileKeys = Object.keys(p.files || {});
        const openTabs = Array.isArray(p.openTabs)
          ? p.openTabs.filter((t) => p.files?.[t])
          : (fileKeys.length ? [p.activeFile && p.files?.[p.activeFile] ? p.activeFile : fileKeys[0]] : []);
        return {
          ...p,
          folders: p.folders || [],
          openTabs,
          files: Object.fromEntries(
            Object.entries(p.files || {}).map(([k, f]) => [k, { ...f, path: f.path || k }])
          ),
        };
      });
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

// ─── Recursive FileTree renderer (with drag-and-drop) ────────
function FileTreeNode({
  node, prefix, activeFile, onSelect,
  onRename, onDelete, renaming, renameValue, setRenameValue,
  onRenameCommit, onRenameCancel, collapsed, toggleCollapse,
  onAddFile, onDeleteFolder,
  dragItem, dropTarget, onDragStart, onDragEnd, onDragOver, onDrop,
}) {
  const folderNames = Object.keys(node.__folders).sort();
  const files = [...node.__files].sort((a, b) => a.path.localeCompare(b.path));

  return (
    <>
      {folderNames.map((folderName) => {
        const folderPath = prefix ? `${prefix}/${folderName}` : folderName;
        const isOpen = !collapsed[folderPath];
        const isDropTarget = dropTarget === folderPath;
        // Prevent dropping a folder into itself or a descendant
        const isSelf = dragItem?.type === "folder" &&
          (dragItem.path === folderPath || folderPath.startsWith(dragItem.path + "/"));
        return (
          <div key={folderPath}>
            <div
              draggable
              className={`group flex cursor-grab items-center gap-1 px-2 py-0.5 transition-colors
                ${isDropTarget && !isSelf ? "bg-blue-500/20 outline outline-1 outline-blue-400/50" : "hover:bg-[#2c3339]/50"}`}
              onClick={() => toggleCollapse(folderPath)}
              onDragStart={(e) => { e.stopPropagation(); onDragStart(e, "folder", folderPath); }}
              onDragEnd={onDragEnd}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.dataTransfer?.types?.includes("Files")) {
                  e.dataTransfer.dropEffect = "copy";
                  onDragOver(folderPath);
                } else if (!isSelf) {
                  e.dataTransfer.dropEffect = "move";
                  onDragOver(folderPath);
                }
              }}
              onDragLeave={(e) => { e.stopPropagation(); if (!e.currentTarget.contains(e.relatedTarget)) onDragOver(null); }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.dataTransfer?.files?.length > 0 || !isSelf) {
                  onDrop(e, folderPath);
                }
              }}
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
                  dragItem={dragItem}
                  dropTarget={dropTarget}
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                />
              </div>
            )}
          </div>
        );
      })}
      {files.map((file) => {
        const isDropTarget = dropTarget === ("__file__" + file.path);
        return (
          <div
            key={file.path}
            draggable
            title={file.path}
            className={`group flex cursor-grab items-center gap-1.5 px-3 py-0.5 transition-colors ${
              activeFile === file.path ? "bg-[#2c3339] text-white" :
              isDropTarget ? "bg-blue-500/20 outline outline-1 outline-blue-400/50" :
              "hover:bg-[#2c3339]/50"
            }`}
            onClick={() => onSelect(file.path)}
            onDragStart={(e) => { e.stopPropagation(); onDragStart(e, "file", file.path); }}
            onDragEnd={onDragEnd}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.dataTransfer?.types?.includes("Files")) {
                e.dataTransfer.dropEffect = "copy";
              } else {
                e.dataTransfer.dropEffect = "move";
              }
              onDragOver("__file__" + file.path);
            }}
            onDragLeave={(e) => { e.stopPropagation(); onDragOver(null); }}
            onDrop={(e) => { e.preventDefault(); e.stopPropagation(); onDrop(e, prefix); }}
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
        );
      })}
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
  const [viewMode, setViewMode]               = useState("split"); // "split" | "editor" | "preview"
  const [isDark, setIsDark]                   = useState(false);
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

  // Drag-and-drop
  const dragItem    = useRef(null);  // { type: "file"|"folder", path: string }
  const [dropTarget, setDropTarget] = useState(null); // folder path, "__file__path", "__root__", or null

  const iframeRef      = useRef(null);
  const debounceRef    = useRef(null);
  const folderInputRef = useRef(null);

  const project     = projects.find((p) => p.id === activeProjectId) || projects[0];
  const files       = project?.files || DEFAULT_FILES;
  const folders     = project?.folders || [];
  const openTabs    = project?.openTabs || (Object.keys(files).length ? [Object.keys(files)[0]] : []);
  const activeFile  = project?.activeFile !== undefined ? project.activeFile : (openTabs.length ? openTabs[0] : null);
  const currentFile = activeFile ? files[activeFile] : null;

  // ── Load tutorial files
  useEffect(() => {
    if (!initialFiles) return;
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === "tutorial");
      const fileKeys = Object.keys(initialFiles);
      const tpl = {
        id: "tutorial",
        name: "Tutorial",
        files: initialFiles,
        activeFile: fileKeys[0] || null,
        openTabs: fileKeys.slice(0, 4),
        folders: [],
      };
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

  function openFile(path) {
    if (!files[path]) return;
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== activeProjectId) return p;
        const currentTabs = p.openTabs || [];
        const nextTabs = currentTabs.includes(path) ? currentTabs : [...currentTabs, path];
        return { ...p, openTabs: nextTabs, activeFile: path };
      })
    );
  }

  function closeTab(path, e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== activeProjectId) return p;
        const currentTabs = p.openTabs || [];
        const tabIndex = currentTabs.indexOf(path);
        const nextTabs = currentTabs.filter((t) => t !== path);

        let nextActive = p.activeFile;
        if (p.activeFile === path) {
          if (nextTabs.length > 0) {
            const newIndex = Math.min(Math.max(0, tabIndex), nextTabs.length - 1);
            nextActive = nextTabs[newIndex];
          } else {
            nextActive = null;
          }
        }
        return { ...p, openTabs: nextTabs, activeFile: nextActive };
      })
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
        prev.map((p) => {
          if (p.id !== activeProjectId) return p;
          const nextTabs = (p.openTabs || []).includes(path) ? p.openTabs : [...(p.openTabs || []), path];
          return {
            ...p,
            files: { ...p.files, [path]: { name: basename(path), path, language, content } },
            openTabs: nextTabs,
            activeFile: path,
          };
        })
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
        const nextTabs = (p.openTabs || []).filter((t) => t !== path);
        const nextActive = p.activeFile === path ? (nextTabs[0] || Object.keys(newFiles)[0] || null) : p.activeFile;
        return { ...p, files: newFiles, openTabs: nextTabs, activeFile: nextActive };
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
        const nextTabs = (p.openTabs || []).filter((t) => !t.startsWith(folderPath + "/"));
        const newActive = newFiles[p.activeFile] ? p.activeFile : (nextTabs[0] || Object.keys(newFiles)[0] || null);
        return { ...p, folders: newFolders, files: newFiles, openTabs: nextTabs, activeFile: newActive };
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
        const nextTabs = (p.openTabs || []).map((t) => (t === oldPath ? newPath : t));
        return { ...p, files: newFiles, openTabs: nextTabs, activeFile: p.activeFile === oldPath ? newPath : p.activeFile };
      })
    );
    setRenaming(null);
  }

  // ─── Project mutations ───────────────────────────────────────
  function newProject() {
    const id = `project-${Date.now()}`;
    const p = {
      id,
      name: "Projecte nou",
      files: { ...DEFAULT_FILES },
      activeFile: "index.html",
      openTabs: ["index.html", "styles.css", "script.js"],
      folders: [],
    };
    setProjects((prev) => [...prev, p]);
    setActiveProjectId(id);
  }

  function resetProject() {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === activeProjectId
          ? {
              ...DEFAULT_PROJECT,
              id: activeProjectId,
              name: p.name,
              openTabs: ["index.html", "styles.css", "script.js"],
            }
          : p
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
      const isBin = isBinaryFile(f.name, f.type);
      let content = "";
      let dataUrl = "";
      if (isBin) {
        try {
          dataUrl = await readFileAsDataUrl(f);
          content = dataUrl;
        } catch {}
      } else {
        try {
          content = await readFileAsText(f);
        } catch {}
      }
      newFiles[relativePath] = {
        name: basename(relativePath),
        path: relativePath,
        language: getLanguage(relativePath),
        content,
        isBinary: isBin,
        dataUrl: isBin ? dataUrl : undefined,
      };
      const parts = relativePath.split("/");
      for (let i = 1; i < parts.length; i++) newFolders.add(parts.slice(0, i).join("/"));
    }
    const rootName = inputFiles[0].webkitRelativePath?.split("/")[0] || "Carpeta carregada";
    const id = `project-${Date.now()}`;
    const addedKeys = Object.keys(newFiles);
    const initialTabs = newFiles["index.html"]
      ? ["index.html", ...addedKeys.filter((k) => k !== "index.html").slice(0, 3)]
      : addedKeys.slice(0, 4);
    const p  = {
      id, name: rootName, files: newFiles,
      activeFile: newFiles["index.html"] ? "index.html" : Object.keys(newFiles)[0],
      openTabs: initialTabs,
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
      if (file.isBinary && file.dataUrl) {
        const base64Data = file.dataUrl.split(",")[1];
        if (base64Data) {
          zip.file(path, base64Data, { base64: true });
        } else {
          zip.file(path, file.content || "");
        }
      } else {
        zip.file(path, file.content || "");
      }
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

  // ─── Drag-and-drop handlers ──────────────────────────────────
  function handleDragStart(e, type, path) {
    dragItem.current = { type, path };
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", path); // needed for Firefox
  }

  function handleDragEnd() {
    dragItem.current = null;
    setDropTarget(null);
  }

  function handleDragOver(target) {
    setDropTarget(target);
  }

  async function handleExternalFilesDrop(fileList, targetFolder) {
    const rawFiles = Array.from(fileList || []);
    if (!rawFiles.length) return;

    // Normalize dest
    const dest = typeof targetFolder === "string" && targetFolder.startsWith("__file__")
      ? folderOf(targetFolder.slice("__file__".length)).replace(/\/$/, "")
      : (targetFolder === "__root__" ? "" : targetFolder ?? "");

    const newEntries = {};
    let lastActive = null;

    for (const f of rawFiles) {
      const name = f.name;
      const targetPath = normPath(dest ? `${dest}/${name}` : name);
      const isBin = isBinaryFile(name, f.type);
      let content = "";
      let dataUrl = "";

      if (isBin) {
        try {
          dataUrl = await readFileAsDataUrl(f);
          content = dataUrl;
        } catch (err) {
          console.error("Error llegint fitxer binari:", err);
          continue;
        }
      } else {
        try {
          content = await readFileAsText(f);
        } catch {
          content = "";
        }
      }

      newEntries[targetPath] = {
        name,
        path: targetPath,
        language: getLanguage(name),
        content,
        isBinary: isBin,
        dataUrl: isBin ? dataUrl : undefined,
        mimeType: f.type || undefined,
        size: f.size || undefined,
      };
      lastActive = targetPath;
    }

    if (!Object.keys(newEntries).length) return;

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== activeProjectId) return p;
        const updatedFiles = { ...p.files, ...newEntries };

        const parentFolders = [];
        for (const filePath of Object.keys(newEntries)) {
          const parts = filePath.split("/");
          for (let i = 1; i < parts.length; i++) {
            parentFolders.push(parts.slice(0, i).join("/"));
          }
        }
        const updatedFolders = [...new Set([...(p.folders || []), ...parentFolders])];

        const addedKeys = Object.keys(newEntries);
        const nextTabs = [...(p.openTabs || [])];
        for (const ak of addedKeys) {
          if (!nextTabs.includes(ak)) nextTabs.push(ak);
        }

        return {
          ...p,
          files: updatedFiles,
          folders: updatedFolders,
          openTabs: nextTabs,
          activeFile: lastActive || p.activeFile,
        };
      })
    );

    // Obrir la carpeta de destí per mostrar els nous fitxers
    if (dest) {
      const parts = dest.split("/");
      const toOpen = {};
      for (let i = 1; i <= parts.length; i++) {
        toOpen[parts.slice(0, i).join("/")] = false;
      }
      setCollapsed((c) => ({ ...c, ...toOpen }));
    }
  }

  // targetFolder: '' = root, 'css' = inside css/, etc.
  function handleDrop(e, targetFolder) {
    setDropTarget(null);

    // 1. Fitxers externs del sistema operatiu (imatges, àudios, documents)
    if (e?.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      handleExternalFilesDrop(e.dataTransfer.files, targetFolder);
      return;
    }

    // 2. Arrossegament intern de fitxers o carpetes del playground
    const item = dragItem.current;
    if (!item) return;

    // Normalize targetFolder (strip sentinel prefix if file was drop target)
    const dest = typeof targetFolder === "string" && targetFolder.startsWith("__file__")
      ? folderOf(targetFolder.slice("__file__".length)).replace(/\/$/, "")
      : (targetFolder === "__root__" ? "" : targetFolder ?? "");

    if (item.type === "file") {
      moveFile(item.path, dest);
    } else if (item.type === "folder") {
      moveFolder(item.path, dest);
    }
    dragItem.current = null;
  }

  function moveFile(oldPath, destFolder) {
    const name = basename(oldPath);
    const newPath = normPath(destFolder ? `${destFolder}/${name}` : name);
    if (newPath === oldPath || files[newPath]) return; // already there or conflict
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== activeProjectId) return p;
        const newFiles = { ...p.files };
        newFiles[newPath] = { ...newFiles[oldPath], path: newPath, name };
        delete newFiles[oldPath];
        const newActive = p.activeFile === oldPath ? newPath : p.activeFile;
        // Auto-register parent folder
        const parentFolders = [];
        const parts = newPath.split("/");
        for (let i = 1; i < parts.length; i++) parentFolders.push(parts.slice(0, i).join("/"));
        const newFolders = [...new Set([...(p.folders || []), ...parentFolders])];
        const nextTabs = (p.openTabs || []).map((t) => (t === oldPath ? newPath : t));
        return { ...p, files: newFiles, activeFile: newActive, folders: newFolders, openTabs: nextTabs };
      })
    );
  }

  function moveFolder(oldFolderPath, destParent) {
    // Prevent moving into self or descendant
    if (destParent === oldFolderPath || destParent.startsWith(oldFolderPath + "/")) return;
    const folderName = basename(oldFolderPath);
    const newFolderPath = normPath(destParent ? `${destParent}/${folderName}` : folderName);
    if (newFolderPath === oldFolderPath) return;

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== activeProjectId) return p;

        // Rename files
        const newFiles = {};
        for (const [k, v] of Object.entries(p.files)) {
          if (k === oldFolderPath || k.startsWith(oldFolderPath + "/")) {
            const relativePart = k.slice(oldFolderPath.length); // includes leading /
            const newKey = normPath(newFolderPath + relativePart);
            newFiles[newKey] = { ...v, path: newKey, name: basename(newKey) };
          } else {
            newFiles[k] = v;
          }
        }

        // Rename folder entries
        const newFoldersList = (p.folders || []).map((f) => {
          if (f === oldFolderPath || f.startsWith(oldFolderPath + "/")) {
            return normPath(newFolderPath + f.slice(oldFolderPath.length));
          }
          return f;
        });
        // Add new folder path if not already there
        if (!newFoldersList.includes(newFolderPath)) newFoldersList.push(newFolderPath);
        // Add parent folders of newFolderPath
        const parts = newFolderPath.split("/");
        for (let i = 1; i < parts.length; i++) {
          const p2 = parts.slice(0, i).join("/");
          if (!newFoldersList.includes(p2)) newFoldersList.push(p2);
        }

        const newActive = p.activeFile?.startsWith(oldFolderPath + "/")
          ? normPath(newFolderPath + p.activeFile.slice(oldFolderPath.length))
          : p.activeFile;

        const nextTabs = (p.openTabs || []).map((t) => {
          if (t === oldFolderPath || t.startsWith(oldFolderPath + "/")) {
            return normPath(newFolderPath + t.slice(oldFolderPath.length));
          }
          return t;
        });

        return { ...p, files: newFiles, folders: newFoldersList, activeFile: newActive, openTabs: nextTabs };
      })
    );
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

        {/* Selector de vista: Codi | Dividit | Resultat */}
        <div className="hidden sm:flex items-center rounded bg-[#2c3339]/70 p-0.5 text-xs text-[#9aa3a0] ml-2">
          <button
            type="button"
            className={`flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-mono transition-colors ${
              viewMode === "editor" ? "bg-primary text-white font-medium" : "hover:text-white"
            }`}
            onClick={() => setViewMode("editor")}
            title="Maximitza la vista del codi"
          >
            <Code size={12} /> Codi
          </button>
          <button
            type="button"
            className={`flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-mono transition-colors ${
              viewMode === "split" ? "bg-primary text-white font-medium" : "hover:text-white"
            }`}
            onClick={() => setViewMode("split")}
            title="Vista dividida (Codi i Resultat)"
          >
            <Columns2 size={12} /> Dividit
          </button>
          <button
            type="button"
            className={`flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-mono transition-colors ${
              viewMode === "preview" ? "bg-primary text-white font-medium" : "hover:text-white"
            }`}
            onClick={() => setViewMode("preview")}
            title="Maximitza la vista prèvia"
          >
            <Eye size={12} /> Resultat
          </button>
        </div>

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
            <div
              className="flex-1 overflow-y-auto py-1"
              onDragOver={(e) => {
                if (e.dataTransfer?.types?.includes("Files")) {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "copy";
                  if (!dropTarget) handleDragOver("__root__");
                }
              }}
              onDrop={(e) => {
                if (e.dataTransfer?.files?.length > 0 && (!dropTarget || dropTarget === "__root__")) {
                  e.preventDefault();
                  handleDrop(e, "__root__");
                }
              }}
            >
              <FileTreeNode
                node={tree}
                prefix=""
                activeFile={activeFile}
                onSelect={openFile}
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
                dragItem={dragItem.current}
                dropTarget={dropTarget}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
              {/* Root drop zone (move to root) */}
              <div
                className={`mt-1 mx-2 h-7 rounded text-[11px] font-mono flex items-center justify-center transition-colors border border-dashed ${
                  dropTarget === "__root__"
                    ? "bg-blue-500/20 text-blue-300 border-blue-400"
                    : "border-transparent text-[#64748b] hover:text-[#9aa3a0] hover:border-[#2f363b]"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer?.types?.includes("Files")) {
                    e.dataTransfer.dropEffect = "copy";
                  }
                  handleDragOver("__root__");
                }}
                onDragLeave={() => handleDragOver(null)}
                onDrop={(e) => { e.preventDefault(); handleDrop(e, "__root__"); }}
              >
                ↳ Deixa anar a l'arrel
              </div>
            </div>
          </aside>
        )}

        {/* Editor + Preview */}
        <div className="flex flex-1 overflow-hidden">
          {/* Editor */}
          {viewMode !== "preview" && (
            <div className={`flex flex-col overflow-hidden border-r border-[#2f363b] ${
              viewMode === "editor" ? "flex-1" : "flex-1"
            }`}>
              {/* Tabs + Actions */}
              <div className="flex items-center justify-between border-b border-[#2f363b] bg-[#1a1f23]">
                <div className="flex overflow-x-auto">
                  {openTabs.map((path) => {
                    const file = files[path];
                    if (!file) return null;
                    const isActive = activeFile === path;
                    const tooltipText = project?.name ? `${project.name} • ${file.path}` : file.path;
                    return (
                      <div
                        key={path}
                        className={`group flex shrink-0 cursor-pointer items-center gap-1.5 border-r border-[#2f363b] px-3 py-2 font-mono text-xs transition-colors ${
                          isActive
                            ? "bg-[#1e1e1e] text-white"
                            : "text-[#9aa3a0] hover:bg-[#2c3339] hover:text-white"
                        }`}
                        onClick={() => openFile(path)}
                        title={tooltipText}
                      >
                        {getFileIcon(file.name)}
                        <span className="truncate max-w-[130px]">{file.name}</span>
                        <button
                          type="button"
                          className={`rounded p-0.5 transition-colors hover:bg-white/20 hover:text-white ${
                            isActive ? "opacity-70 group-hover:opacity-100" : "opacity-0 group-hover:opacity-70"
                          }`}
                          onClick={(e) => closeTab(path, e)}
                          title="Tanca pestanya"
                        >
                          <X size={11} />
                        </button>
                      </div>
                    );
                  })}
                </div>
                {/* Editor actions: Maximitzar / Restaurar / Obrir preview */}
                <div className="flex items-center gap-1 px-2 shrink-0">
                  {viewMode === "editor" && (
                    <button
                      className="flex items-center gap-1 rounded px-2 py-0.5 text-xs text-[#9aa3a0] hover:bg-white/10 hover:text-white"
                      onClick={() => setViewMode("split")}
                      title="Obre la vista prèvia"
                    >
                      <Eye size={13} />
                      <span className="hidden md:inline text-[11px]">Resultat</span>
                    </button>
                  )}
                  <button
                    className="rounded p-1 text-[#9aa3a0] hover:bg-white/10 hover:text-white"
                    onClick={() => setViewMode((v) => (v === "editor" ? "split" : "editor"))}
                    title={viewMode === "editor" ? "Restaura la vista dividida" : "Maximitza la vista del codi"}
                  >
                    {viewMode === "editor" ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                  </button>
                </div>
              </div>

              {/* Monaco o Visualitzador Multimèdia */}
              <div className="flex-1 overflow-auto bg-[#1e1e1e]">
                {!currentFile ? (
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center text-[#9aa3a0]">
                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#2c3339]/60 text-[#c9d1cd] mb-3">
                      <FileCode size={32} />
                    </div>
                    <p className="font-mono text-sm text-[#c9d1cd]">Cap fitxer obert</p>
                    <p className="text-xs text-[#64748b] mt-1 max-w-xs">
                      Selecciona un fitxer a l'explorador de l'esquerra per visualitzar-lo o editar-lo.
                    </p>
                  </div>
                ) : currentFile.isBinary ? (
                    <div className="flex h-full flex-col items-center justify-center p-6 text-center text-[#c9d1cd]">
                      {/\.(png|jpg|jpeg|gif|webp|svg|ico|bmp|avif)$/i.test(currentFile.name) ? (
                        <div className="flex flex-col items-center gap-4 max-w-lg">
                          <div className="rounded-lg border border-[#2f363b] p-2 bg-[#14181b] shadow-lg max-h-[60vh] max-w-full overflow-hidden flex items-center justify-center">
                            <img
                              src={currentFile.dataUrl || currentFile.content}
                              alt={currentFile.name}
                              className="max-h-[55vh] max-w-full object-contain rounded"
                            />
                          </div>
                          <div className="font-mono text-xs text-[#9aa3a0]">
                            <span className="font-semibold text-white">{currentFile.name}</span>
                            <span className="mx-2">•</span>
                            <span>{currentFile.path}</span>
                          </div>
                          <p className="text-xs text-[#64748b]">
                            Imatge integrada al projecte. Utilitza-la a l'HTML amb <code className="text-[#9dd0b5]">&lt;img src="{currentFile.path}" alt="{currentFile.name}"&gt;</code>.
                          </p>
                        </div>
                      ) : /\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(currentFile.name) ? (
                        <div className="flex flex-col items-center gap-4 max-w-md p-6 rounded-xl border border-[#2f363b] bg-[#14181b] shadow-lg">
                          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-purple-500/20 text-purple-300">
                            <Music size={32} />
                          </div>
                          <div className="font-mono text-xs">
                            <div className="font-semibold text-white text-sm">{currentFile.name}</div>
                            <div className="text-[#9aa3a0] mt-1">{currentFile.path}</div>
                          </div>
                          <audio
                            controls
                            src={currentFile.dataUrl || currentFile.content}
                            className="w-full mt-2"
                          />
                          <p className="text-xs text-[#64748b]">
                            Àudio integrat al projecte. Reprodueix-lo a l'HTML amb <code className="text-[#9dd0b5]">&lt;audio src="{currentFile.path}" controls&gt;&lt;/audio&gt;</code>.
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <FileText size={48} className="text-[#9aa3a0]" />
                          <span className="font-mono text-sm">{currentFile.name}</span>
                          <span className="text-xs text-[#9aa3a0]">Fitxer binari ({currentFile.path})</span>
                        </div>
                      )}
                    </div>
                  ) : (
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
          {viewMode !== "editor" && (
            <div className={`flex flex-col overflow-hidden ${
              viewMode === "preview" ? "flex-1" : "w-1/2"
            }`}>
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
                  {viewMode === "preview" && (
                    <button
                      className="flex items-center gap-1 rounded px-2 py-0.5 text-xs text-[#9aa3a0] hover:bg-white/10 hover:text-white mr-1"
                      onClick={() => setViewMode("split")}
                      title="Obre el codi dels fitxers"
                    >
                      <Code size={13} />
                      <span className="hidden md:inline text-[11px]">Codi</span>
                    </button>
                  )}
                  <button className="rounded p-1 hover:bg-white/10" onClick={refresh} title="Actualitza">
                    <RefreshCw size={13} />
                  </button>
                  <button
                    className="rounded p-1 hover:bg-white/10"
                    onClick={() => setViewMode((v) => (v === "preview" ? "split" : "preview"))}
                    title={viewMode === "preview" ? "Restaura la vista dividida" : "Maximitza la vista prèvia"}
                  >
                    {viewMode === "preview" ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
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
          )}
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
