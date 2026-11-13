import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";

const ELEMENTS = [
  {
    id: "a",
    label: "Enllaç",
    tag: "a",
    content: "Text de l'enllaç",
    attrs: [
      { name: "href", kind: "text", value: "https://developer.mozilla.org/ca/", defaultOn: true },
      { name: "target", kind: "choice", options: ["_self", "_blank"], value: "_blank", defaultOn: true },
      { name: "rel", kind: "text", value: "noopener" },
      { name: "title", kind: "text", value: "Text d'ajuda" },
      { name: "download", kind: "text", value: "apunts.pdf" },
    ],
  },
  {
    id: "img",
    label: "Imatge",
    tag: "img",
    void: true,
    attrs: [
      { name: "src", kind: "text", value: "https://picsum.photos/id/1025/240/160", defaultOn: true },
      { name: "alt", kind: "text", value: "Un gos petit mirant a càmera", defaultOn: true },
      { name: "width", kind: "choice", options: ["120", "240", "360"], value: "240" },
      { name: "loading", kind: "choice", options: ["eager", "lazy"], value: "lazy" },
      { name: "title", kind: "text", value: "Imatge d'exemple" },
    ],
  },
  {
    id: "input",
    label: "Camp",
    tag: "input",
    void: true,
    attrs: [
      { name: "type", kind: "choice", options: ["text", "email", "number", "date", "password", "search"], value: "email", defaultOn: true },
      { name: "placeholder", kind: "text", value: "nom@exemple.cat", defaultOn: true },
      { name: "required", kind: "boolean" },
      { name: "disabled", kind: "boolean" },
      { name: "maxlength", kind: "choice", options: ["8", "20", "60"], value: "20" },
    ],
  },
  {
    id: "button",
    label: "Botó",
    tag: "button",
    content: "Envia",
    attrs: [
      { name: "type", kind: "choice", options: ["submit", "button", "reset"], value: "button", defaultOn: true },
      { name: "disabled", kind: "boolean" },
      { name: "title", kind: "text", value: "Text d'ajuda" },
    ],
  },
  {
    id: "p",
    label: "Paràgraf",
    tag: "p",
    content: "Un paràgraf de text.",
    attrs: [
      { name: "tabindex", kind: "choice", options: ["0", "-1"], value: "0" },
      { name: "lang", kind: "choice", options: ["ca", "es", "en"], value: "ca" },
      { name: "title", kind: "text", value: "Text d'ajuda" },
      { name: "hidden", kind: "boolean" },
    ],
  },
];

const PREVIEW_STYLE = `body{font-family:system-ui,sans-serif;margin:0;padding:20px;color:#23302b}
a{color:#b85c3a}
p{margin:0;line-height:1.6}
input,button{font:inherit;padding:8px 10px;border:1px solid #c9c2b4;border-radius:8px;max-width:100%}
button{background:#b85c3a;color:#fff;border:0;padding:10px 16px;cursor:pointer}`;

function initialState() {
  const state = {};
  ELEMENTS.forEach((element) => {
    state[element.id] = {};
    element.attrs.forEach((attr) => {
      state[element.id][attr.name] = { enabled: Boolean(attr.defaultOn), value: attr.value || "" };
    });
  });
  return state;
}

function buildCode(element, values) {
  const parts = element.attrs
    .filter((attr) => values[attr.name]?.enabled)
    .map((attr) => (attr.kind === "boolean" ? attr.name : `${attr.name}="${values[attr.name].value}"`));
  const open = `<${element.tag}${parts.length ? " " + parts.join(" ") : ""}>`;
  if (element.void) return open;
  return `${open}${element.content || ""}</${element.tag}>`;
}

export default function AttributesExplorer() {
  const [elementId, setElementId] = useState("a");
  const [state, setState] = useState(initialState);
  const [copied, setCopied] = useState(false);

  const element = ELEMENTS.find((item) => item.id === elementId);
  const values = state[elementId];
  const code = useMemo(() => buildCode(element, values), [element, values]);
  const doc = `<!DOCTYPE html><html lang="ca"><head><meta charset="utf-8"><style>${PREVIEW_STYLE}</style></head><body>${code}</body></html>`;

  function update(name, patch) {
    setState((current) => ({
      ...current,
      [elementId]: { ...current[elementId], [name]: { ...current[elementId][name], ...patch } },
    }));
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex flex-wrap gap-2 border-b border-border p-3">
        {ELEMENTS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setElementId(item.id)}
            className={
              item.id === elementId
                ? "rounded-lg bg-primary px-3 py-1.5 font-mono text-xs text-primary-foreground"
                : "rounded-lg px-3 py-1.5 font-mono text-xs text-foreground/70 hover:bg-secondary"
            }
          >
            &lt;{item.tag}&gt;
          </button>
        ))}
      </div>

      <div className="grid gap-0 md:grid-cols-2">
        <div className="border-b border-border p-4 md:border-b-0 md:border-r">
          <p className="eyebrow mb-3">Atributs de &lt;{element.tag}&gt;</p>
          <div className="space-y-2.5">
            {element.attrs.map((attr) => {
              const current = values[attr.name];
              return (
                <div key={attr.name} className="flex flex-wrap items-center gap-2">
                  <label className="flex min-w-[122px] items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={current.enabled}
                      onChange={(event) => update(attr.name, { enabled: event.target.checked })}
                      className="h-3.5 w-3.5 accent-[hsl(var(--primary))]"
                    />
                    <span className="font-mono text-[12.5px]">{attr.name}</span>
                  </label>
                  {attr.kind === "boolean" ? (
                    <span className="text-xs text-muted-foreground">(booleà)</span>
                  ) : attr.kind === "choice" ? (
                    <select
                      value={current.value}
                      disabled={!current.enabled}
                      onChange={(event) => update(attr.name, { value: event.target.value })}
                      className="h-8 rounded-md border border-border bg-background px-2 font-mono text-xs disabled:opacity-40"
                    >
                      {attr.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={current.value}
                      disabled={!current.enabled}
                      onChange={(event) => update(attr.name, { value: event.target.value })}
                      className="h-8 min-w-0 flex-1 rounded-md border border-border bg-background px-2 font-mono text-xs disabled:opacity-40"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="eyebrow">Codi generat</p>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-[11.5px] text-foreground/70 hover:bg-secondary"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copiat" : "Copia"}
            </button>
          </div>
          <pre className="code-body shell-scroll mb-3 max-h-[92px] rounded-lg">
            <code>{code}</code>
          </pre>
          <p className="eyebrow mb-2">Resultat</p>
          <iframe
            title="Resultat dels atributs"
            sandbox="allow-scripts allow-forms allow-popups"
            srcDoc={doc}
            className="h-[132px] w-full rounded-lg border border-border bg-white"
          />
        </div>
      </div>
    </div>
  );
}