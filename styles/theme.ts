const C = {
  bg: "#161b22",
  bgDeep: "#0d1117",
  bgCard: "#1c2330",
  bgHover: "#222c3a",
  border: "rgba(56,139,253,0.12)",
  borderHov: "rgba(56,139,253,0.35)",
  blue: "#58a6ff",
  blueDeep: "#1f6feb",
  blueGlow: "rgba(88,166,255,0.18)",
  text: "#e6edf3",
  textMid: "#8b949e",
  textDim: "#484f58",
  white: "#ffffff",
};

export function injectThemeVars() {
  const r = document.documentElement;
  r.style.setProperty("--bg", C.bg);
  r.style.setProperty("--bg-deep", C.bgDeep);
  r.style.setProperty("--bg-card", C.bgCard);
  r.style.setProperty("--bg-hover", C.bgHover);
  r.style.setProperty("--border", C.border);
  r.style.setProperty("--border-hov", C.borderHov);
  r.style.setProperty("--blue", C.blue);
  r.style.setProperty("--blue-deep", C.blueDeep);
  r.style.setProperty("--blue-glow", C.blueGlow);
  r.style.setProperty("--text", C.text);
  r.style.setProperty("--text-mid", C.textMid);
  r.style.setProperty("--text-dim", C.textDim);
  r.style.setProperty("--white", C.white);
}

export default C;
