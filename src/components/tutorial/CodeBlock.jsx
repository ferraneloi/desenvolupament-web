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

function buildPreviewDoc(code, lang, previewHtml) {
  if (lang === "css") {
    return [
      '<!DOCTYPE html><html lang="ca"><head><meta charset="utf-8"><style>',
      PREVIEW_STYLE,
      code,
      "</style></head><body>",
      previewHtml || "",
      "</body></html>",
    ].join("\n");
  }

  if (lang === "js") return jsDoc(code);

  return code;
}

export default function CodeBlock({ code, lang = "html", title, preview = true, previewHtml }) {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  const marked = highlight(code, lang);
  const canPreview =
    preview !== false &&
    (lang === "html" ? /<[a-zA-Z!]/.test(code) : lang === "css" ? Boolean(previewHtml) : lang === "js");

  return (
    <div className="code-card">
      <div className="code-head">
        <span className="code-lang">{lang}</span>
        {title ? <span className="code-title">{title}</span> : null}
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
          title="Resultat de l'exemple"
          sandbox="allow-scripts allow-forms allow-popups"
          srcDoc={buildPreviewDoc(code, lang, previewHtml)}
        />
      ) : null}
    </div>
  );
}

