// Alat bersama Algoritma dan Pemrograman P9–P15 (menuju UAS): pembuat blok materi, cheat sheet, dan kuis.
// Bagian bertanda ➕ bukan dari modul. Kekeliruan modul ditandai dengan kotak "Catatan untuk ujian".
const e = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const c = s => "<code>" + e(s) + "</code>";
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const ul = items => `<ul class="list-disc pl-5 space-y-1">${items.map(x => `<li>${x}</li>`).join("")}</ul>`;
const salah = items => tip("Kesalahan yang sering terjadi", ul(items), "warn");
const modul = items => tip("Catatan untuk ujian: kekeliruan atau penyederhanaan di modul", Array.isArray(items) ? ul(items) : items, "rose");
const code = (file, src, note, title, label) => ({ type: "code", lang: "cpp", label: label || "Contoh Kode", title, file, code: src, note });
const tbl = (title, headers, rows, modes, label) => ({ type: "table", label: label || "Tabel Interaktif", title, headers, rows, ...(modes ? { modes } : {}) });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([cell, a]) => ({ cells: [cell], fields: [{ options: opts, answer: a }], ok: "✓" })) });
const Q = (q, opts, ans, exp) => ({ q, opts, ans, exp });
// Tautan ke pelajaran section Struktur Data & Algoritma
const sda = (id, teks) => `<a href="#/c/struktur-data-algoritma/m/${id}">${teks}</a>`;
const lab = (cases, title, desc, label) => ({ type: "trace-lab", label: label || "Lab Algoritma • Telusuri Kode", title, desc, tip: "Ini penelusuran yang sudah disiapkan, bukan compiler C++ sungguhan.", cases });
const algo = (algoId, data, target, title, desc) => ({ type: "algo-lab", algo: algoId, data, ...(target != null ? { target } : {}), label: "Lab Algoritma • Batang Bergerak", title, desc });

module.exports = { e, c, A, tip, ul, salah, modul, code, tbl, rv, ex, Q, sda, lab, algo };
