export function openPlaygroundPopup(url = "/playground") {
  if (typeof window === "undefined") return;
  const screenW = window.screen?.availWidth || window.innerWidth || 1280;
  const screenH = window.screen?.availHeight || window.innerHeight || 800;
  const width = Math.min(1400, Math.max(900, Math.floor(screenW * 0.92)));
  const height = Math.min(950, Math.max(650, Math.floor(screenH * 0.92)));
  const left = Math.max(0, Math.floor((screenW - width) / 2));
  const top = Math.max(0, Math.floor((screenH - height) / 2));

  const features = [
    `width=${width}`,
    `height=${height}`,
    `left=${left}`,
    `top=${top}`,
    "resizable=yes",
    "scrollbars=yes",
    "status=no",
    "toolbar=no",
    "menubar=no",
    "location=no",
  ].join(",");

  const popup = window.open(url, "AulaHTMLPlayground", features);
  if (popup && !popup.closed) {
    popup.focus();
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
