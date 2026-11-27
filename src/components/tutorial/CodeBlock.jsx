import { useState } from "react";
import { Check, Copy, Eye, EyeOff } from "lucide-react";
import { highlight } from "../../lib/highlightCode.js";

const CONSOLE_STYLE =
  "body{font:13px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;margin:0;padding:14px;background:#fff;color:#1d2723}" +
  "#out{display:grid;gap:0}" +
  ".line{padding:3px 0;border-bottom:1px solid #f1ece1;white-space:pre-wrap;word-break:break-word}" +
  ".line::before{content:'\\203A  ';color:#b85c3a}";

const PREVIEW_STYLE =
  "body{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;margin:0;padding:18px;background:#fff;color:#23302b;line-height:1.55}";

const HTML_CONSOLE_HELPER = [
  "<style>",
  ".__console_log_box{margin:16px 0 0;padding:10px 14px;background:#1d2723;color:#f6f3ed;border-radius:8px;font:12.5px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace}",
  ".__console_log_title{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#b85c3a;margin-bottom:4px}",
  ".__console_log_line{padding:2px 0;border-top:1px solid #2e3d37;word-break:break-word}",
  ".__console_log_line::before{content:'\\203A  ';color:#d97706}",
  "</style>",
  "<script>",
  "(function(){",
  "  var origLog = console.log.bind(console);",
  "  var origWarn = console.warn.bind(console);",
  "  var origError = console.error.bind(console);",
  "  function render(msg){",
  "    var box = document.getElementById('__html_console_box__');",
  "    if(!box){",
  "      box = document.createElement('div');",
  "      box.id = '__html_console_box__';",
  "      box.className = '__console_log_box';",
  "      box.innerHTML = '<div class=\"__console_log_title\">Sortida per consola (console.log)</div>';",
  "      (document.body || document.documentElement).appendChild(box);",
  "    }",
  "    var line = document.createElement('div');",
  "    line.className = '__console_log_line';",
  "    line.textContent = msg;",
  "    box.appendChild(line);",
  "  }",
  "  function fmt(args){",
  "    return Array.from(args).map(function(v){",
  "      if(typeof v==='string') return v;",
  "      if(v===null) return 'null';",
  "      if(v===undefined) return 'undefined';",
  "      try{return JSON.stringify(v)}catch(e){return String(v)}",
  "    }).join(' ');",
  "  }",
  "  console.log = function(){ render(fmt(arguments)); origLog.apply(console, arguments); };",
  "  console.warn = function(){ render(fmt(arguments)); origWarn.apply(console, arguments); };",
  "  console.error = function(){ render(fmt(arguments)); origError.apply(console, arguments); };",
  "})();",
  "<\/script>",
].join("\n");

function jsDoc(code) {
  return [
    '<!DOCTYPE html><html lang="ca"><head><meta charset="utf-8"><style>',
    CONSOLE_STYLE,
    "</style></head><body><div id=\"out\"></div><script>",
    'var __out = document.getElementById("out");',
    "function __show(v) {",
    '  var line = document.createElement("div");',
    '  line.className = "line";',
    "  var text;",
    '  if (typeof v === "string") text = v;',
    '  else if (v === null) text = "null";',
    '  else if (v === undefined) text = "undefined";',
    "  else { try { text = JSON.stringify(v); } catch (e) { text = String(v); } }",
    "  line.textContent = text;",
    "  __out.appendChild(line);",
    "}",
    '["log","info","warn","error"].forEach(function (m) {',
    "  var orig = console[m].bind(console);",
    "  console[m] = function () {",
    "    for (var i = 0; i < arguments.length; i++) __show(arguments[i]);",
    "    orig.apply(null, arguments);",
    "  };",
    "});",
    "try { (function () {",
    code,
    '})(); } catch (e) { __show("Error: " + e.message); }',
    "<\/script></body></html>",
  ].join("\n");
}

function buildPreviewDoc(code, lang, previewHtml, cssCode) {
  if (lang === "css") {
    if (previewHtml && /<html\b[^>]*>/i.test(previewHtml)) {
      const styleTag = `<style>\n${code}\n</style>`;
      if (/<head\b[^>]*>/i.test(previewHtml)) {
        return previewHtml.replace(/<head\b[^>]*>/i, `$&<base href="/">${styleTag}`);
      }
      return styleTag + previewHtml;
    }
    return [
      '<!DOCTYPE html><html lang="ca"><head><meta charset="utf-8"><base href="/"><style>',
      PREVIEW_STYLE,
      code,
      "</style></head><body>",
      previewHtml || "",
      "</body></html>",
    ].join("\n");
  }

  if (lang === "js") return jsDoc(code);

  if (lang === "html" || !lang) {
    let doc = code;
    if (cssCode) {
      const styleTag = `<style>\n${cssCode}\n</style>`;
      if (/<head\b[^>]*>/i.test(doc)) {
        doc = doc.replace(/<head\b[^>]*>/i, `$&${styleTag}`);
      } else {
        doc = styleTag + doc;
      }
    }
    if (!/<base\b/i.test(doc)) {
      if (/<head\b[^>]*>/i.test(doc)) {
        doc = doc.replace(/<head\b[^>]*>/i, '$&<base href="/">');
      } else {
        doc = '<base href="/">' + doc;
      }
    }
    if (/<script\b/i.test(doc)) {
      if (/<head\b[^>]*>/i.test(doc)) {
        doc = doc.replace(/<head\b[^>]*>/i, '$&' + HTML_CONSOLE_HELPER);
      } else {
        doc = HTML_CONSOLE_HELPER + doc;
      }
    }
    return doc;
  }

  return code;
}

export default function CodeBlock({
  code,
  lang = "html",
  title,
  preview = true,
  previewHtml,
  cssCode,
  cssTitle,
  tabsOrder = "html-first",
  defaultTab,
  htmlTitle,
  previewHeight,
}) {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const hasTabs = Boolean((lang === "css" && previewHtml) || (lang === "html" && cssCode));
  const initialTab = defaultTab || (tabsOrder === "html-first" ? "html" : lang === "css" ? "css" : "html");
  const [activeTab, setActiveTab] = useState(initialTab);

  let currentLang = lang;
  let currentCode = code;
  let currentTitle = title;

  if (hasTabs) {
    if (activeTab === "html") {
      currentLang = "html";
      currentCode = (lang === "html" ? code : previewHtml || "").trim();
      currentTitle = htmlTitle || (lang === "html" ? title : "index.html") || "index.html";
    } else {
      currentLang = "css";
      currentCode = (lang === "css" ? code : cssCode || "").trim();
      currentTitle = cssTitle || (lang === "css" ? title : "styles.css") || "styles.css";
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  const marked = highlight(currentCode, currentLang);
  const canPreview =
    preview !== false &&
    (lang === "html" ? /<[a-zA-Z!]/.test(code) : lang === "css" ? Boolean(previewHtml) : lang === "js");

  return (
    <div className="code-card">
      <div className="code-head">
        {hasTabs ? (
          <div className="code-tabs" role="tablist" aria-label="Llenguatge del codi">
            {tabsOrder === "html-first" ? (
              <>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "html"}
                  className={`code-tab ${activeTab === "html" ? "is-active" : ""}`}
                  onClick={() => setActiveTab("html")}
                >
                  HTML
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "css"}
                  className={`code-tab ${activeTab === "css" ? "is-active" : ""}`}
                  onClick={() => setActiveTab("css")}
                >
                  CSS
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "css"}
                  className={`code-tab ${activeTab === "css" ? "is-active" : ""}`}
                  onClick={() => setActiveTab("css")}
                >
                  CSS
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "html"}
                  className={`code-tab ${activeTab === "html" ? "is-active" : ""}`}
                  onClick={() => setActiveTab("html")}
                >
                  HTML
                </button>
              </>
            )}
          </div>
        ) : (
          <span className="code-lang">{lang}</span>
        )}
        {currentTitle ? <span className="code-title">{currentTitle}</span> : null}
        <div className="code-actions">
          {canPreview ? (
            <button
              type="button"
              className="code-btn"
              data-active={showPreview ? "true" : "false"}
              onClick={() => setShowPreview((v) => !v)}
              aria-pressed={showPreview}
            >
              {showPreview ? <EyeOff size={13} /> : <Eye size={13} />}
              <span>{showPreview ? "Amaga" : "Resultat"}</span>
            </button>
          ) : null}
          <button type="button" className="code-btn" onClick={copy}>
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span>{copied ? "Copiat" : "Copia"}</span>
          </button>
        </div>
      </div>

      <pre className="code-body shell-scroll">
        <code dangerouslySetInnerHTML={{ __html: marked }} />
      </pre>

      {showPreview ? (
        <iframe
          className="code-preview"
          style={previewHeight ? { height: previewHeight } : undefined}
          title="Resultat de l'exemple"
          sandbox="allow-scripts allow-forms allow-popups"
          srcDoc={buildPreviewDoc(code, lang, previewHtml, cssCode)}
        />
      ) : null}
    </div>
  );
}

