// Helper kecil untuk menggambar diagram SVG interaktif (bagian yang bisa diklik memakai data-part).
const C = {
  indigo: ["#eef2ff", "#6366f1", "#312e81"], sky: ["#e0f2fe", "#0ea5e9", "#0c4a6e"], emerald: ["#d1fae5", "#10b981", "#064e3b"],
  amber: ["#fef3c7", "#f59e0b", "#78350f"], rose: ["#ffe4e6", "#f43f5e", "#881337"], violet: ["#ede9fe", "#8b5cf6", "#4c1d95"],
  slate: ["#f1f5f9", "#94a3b8", "#0f172a"], white: ["#ffffff", "#cbd5e1", "#0f172a"]
};
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// teks multi-baris: lines dipisah "|"
function text(x, y, t, o = {}) {
  const lines = String(t).split("|"); const fs = o.size || 14; const lh = fs * 1.25;
  const y0 = y - (lines.length - 1) * lh / 2;
  return `<text x="${x}" y="${y0}" text-anchor="${o.anchor || "middle"}" dominant-baseline="middle" font-size="${fs}" font-weight="${o.weight || 700}" fill="${o.color || "#0f172a"}">${lines.map((l, i) => `<tspan x="${x}" dy="${i ? lh : 0}">${esc(l)}</tspan>`).join("")}</text>`;
}
function box(x, y, w, h, t, tone = "indigo", part, o = {}) {
  const [f, s, c] = C[tone];
  return `<g${part ? ` data-part="${part}"` : ""}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r == null ? 12 : o.r}" fill="${o.fill || f}" stroke="${s}" stroke-width="${o.sw || 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}/>${t ? text(x + w / 2, y + h / 2, t, { size: o.size, color: o.color || c, weight: o.weight }) : ""}</g>`;
}
function arrow(x1, y1, x2, y2, o = {}) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.color || "#475569"}" stroke-width="${o.w || 2.5}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""} marker-end="url(#ah)"/>`;
}
function path(d, o = {}) { return `<path d="${d}" fill="none" stroke="${o.color || "#475569"}" stroke-width="${o.w || 2.5}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}${o.noArrow ? "" : ' marker-end="url(#ah)"'}/>`; }
function poly(points, tone, part, t, tx, ty, o = {}) {
  const [f, s, c] = C[tone];
  return `<g${part ? ` data-part="${part}"` : ""}><polygon points="${points}" fill="${f}" stroke="${s}" stroke-width="2"/>${t ? text(tx, ty, t, { size: o.size, color: c }) : ""}</g>`;
}
function svg(w, h, body) {
  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img"><defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#475569"/></marker></defs>${body}</svg>`;
}
const diagram = (o) => ({ type: "diagram", label: o.label, title: o.title, desc: o.desc, svg: o.svg, parts: o.parts, maxw: o.maxw, minw: o.minw });
module.exports = { C, text, box, arrow, path, poly, svg, diagram };
