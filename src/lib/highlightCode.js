function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightTag(raw) {
  const match = raw.match(/^<(\/?)([a-zA-Z0-9-]+)([\s\S]*?)(\/?)>$/);
  if (!match) return escapeHtml(raw);

  const [, closing, name, rest, selfClose] = match;
  const attrs = escapeHtml(rest).replace(
    /([a-zA-Z-]+)(=)("[^"]*"|'[^']*')?/g,
    (whole, attr, eq, value) =>
      `<span class="tk-attr">${attr}</span>${eq}${value ? `<span class="tk-str">${value}</span>` : ""}`,
  );

  return (
    `<span class="tk-punct">${escapeHtml("<" + closing)}</span>` +
    `<span class="tk-tag">${name}</span>` +
    attrs +
    (selfClose ? `<span class="tk-punct">${escapeHtml(selfClose)}</span>` : "") +
    `<span class="tk-punct">&gt;</span>`
  );
}

export function highlightHtml(code) {
  const rule = /<!--[\s\S]*?-->|<!DOCTYPE[^>]*>|<\/?[a-zA-Z][^>]*>/g;
  let out = "";
  let last = 0;
  let match = rule.exec(code);

  while (match) {
    out += escapeHtml(code.slice(last, match.index));
    const raw = match[0];
    if (raw.startsWith("<!--")) {
      out += `<span class="tk-com">${escapeHtml(raw)}</span>`;
    } else if (raw.startsWith("<!")) {
      out += `<span class="tk-punct">${escapeHtml(raw)}</span>`;
    } else {
      out += highlightTag(raw);
    }
    last = match.index + raw.length;
    match = rule.exec(code);
  }

  return out + escapeHtml(code.slice(last));
}

export function highlightCss(code) {
  const rule = /(\/\*[\s\S]*?\*\/)|(#[0-9a-fA-F]{3,8}\b)|(\.[a-zA-Z][\w-]*|#[a-zA-Z][\w-]*)|([a-z-]+)(?=\s*:)/g;
  let out = "";
  let last = 0;
  let match = rule.exec(code);

  while (match) {
    out += escapeHtml(code.slice(last, match.index));
    let className = "tk-attr";
    if (match[1]) className = "tk-com";
    else if (match[2]) className = "tk-num";
    else if (match[3]) className = "tk-tag";
    out += `<span class="${className}">${escapeHtml(match[0])}</span>`;
    last = match.index + match[0].length;
    match = rule.exec(code);
  }

  return out + escapeHtml(code.slice(last));
}

const JS_RULE =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|(\b(?:const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|super|try|catch|finally|throw|typeof|instanceof|in|of|async|await|yield|import|export|from|delete|this|null|undefined|true|false)\b)/g;

export function highlightJs(code) {
  let out = "";
  let last = 0;
  JS_RULE.lastIndex = 0;
  let match = JS_RULE.exec(code);

  while (match) {
    out += escapeHtml(code.slice(last, match.index));
    let className = "tk-tag";
    if (match[1]) className = "tk-com";
    else if (match[2]) className = "tk-str";
    else if (match[3]) className = "tk-num";
    out += `<span class="${className}">${escapeHtml(match[0])}</span>`;
    last = match.index + match[0].length;
    match = JS_RULE.exec(code);
  }

  return out + escapeHtml(code.slice(last));
}

export function highlight(code, language) {
  if (language === "css") return highlightCss(code);
  if (language === "js" || language === "javascript") return highlightJs(code);
  if (language === "text") return escapeHtml(code);
  return highlightHtml(code);
}