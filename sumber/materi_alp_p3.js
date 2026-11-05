// Materi Lengkap Algoritma & Pemrograman P3
const { C, box, arrow, path, poly, svg, text: text0, diagram } = require("./svg.js");
// teks tanpa pemisah baris "|" (agar operator || dan | tetap tampil)
const text = (x, y, t, o = {}) => String(t).includes("|") ? `<text x="${x}" y="${y}" text-anchor="${o.anchor || "middle"}" dominant-baseline="middle" font-size="${o.size || 14}" font-weight="${o.weight || 700}" fill="${o.color || "#0f172a"}">${String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</text>` : text0(x, y, t, o);
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓" })) });
const code = (file, src, note, title) => ({ type: "code", lang: "cpp", label: "Contoh Kode", title, file, code: src, note });

const lv = [["( )", "Kurung", "slate", "kurung"], ["!  ++  --  -  (cast)", "Unary", "violet", "unary"], ["*  /  %", "Perkalian", "sky", "kali"], ["+  -", "Penjumlahan", "sky", "tambah"], ["<<  >>", "Geser bit", "slate", "geser"], ["<  <=  >  >=", "Perbandingan", "amber", "banding"], ["==  !=", "Kesamaan", "amber", "sama"], ["&&", "DAN", "emerald", "and"], ["||", "ATAU", "emerald", "or"], ["?:", "Ternary", "rose", "tern"], ["=  +=  -=  *=  …", "Penugasan", "slate", "assign"]];
const prec = diagram({
  label: "Diagram Interaktif ➕", title: "Tangga Prioritas Operator", desc: "Semakin atas semakin dulu dikerjakan. Klik setiap anak tangga.", minw: 520,
  svg: svg(760, lv.length * 38 + 20,
    lv.map(([op, nm, tone, p], i) => { const y = 10 + i * 38, x = 60 + i * 14;
      return box(x, y, 420, 32, "", tone, p, { r: 8 }) + `<g data-part="${p}">` + text(x + 16, y + 16, op, { size: 15, anchor: "start", color: C[tone][2] }) + text(x + 404, y + 16, nm, { size: 13, anchor: "end", color: C[tone][2], weight: 600 }) + "</g>"; }).join("") +
    text(30, 26, "kuat", { size: 12, color: "#475569" }) + arrow(30, 40, 30, lv.length * 38 - 10) + text(30, lv.length * 38 + 6, "lemah", { size: 12, color: "#475569" }) +
    text(650, 60, "10 + 3 * 2", { size: 16, color: "#0f172a" }) + text(650, 88, "= 10 + 6 = 16", { size: 14, color: "#0369a1" }) +
    text(650, 150, "a > 0 && b > 0 || c", { size: 14, color: "#0f172a" }) + text(650, 176, "= ((a>0) && (b>0)) || c", { size: 13, color: "#047857" })
  ),
  parts: [
    { id: "kurung", label: "( )", title: "Kurung selalu menang", text: "Kalau ragu, beri kurung. <code>(a + b) * 2</code> jelas maksudnya." },
    { id: "unary", label: "Unary", title: "Operator satu operand", text: "<code>!</code>, <code>++</code>, <code>--</code>, tanda negatif, dan casting <code>(float)</code> dikerjakan sebelum aritmetika. <code>-a * b</code> = <code>(-a) * b</code>." },
    { id: "kali", label: "* / %", title: "Setingkat, dari kiri ke kanan", text: "<code>20 / 4 * 2</code> = <code>(20 / 4) * 2</code> = 10, bukan 2.5." },
    { id: "tambah", label: "+ -", title: "Setelah perkalian", text: "Sama seperti matematika sekolah." },
    { id: "geser", label: "<< >>", title: "Geser bit", text: "Itu sebabnya <code>cout &lt;&lt; a + b;</code> aman (+ lebih kuat), tetapi <code>cout &lt;&lt; a &amp;&amp; b;</code> perlu kurung." },
    { id: "banding", label: "< >", title: "Perbandingan", text: "Dikerjakan setelah aritmetika: <code>a + 1 &gt; b * 2</code> membandingkan dua hasil hitung." },
    { id: "sama", label: "== !=", title: "Kesamaan", text: "Sedikit lebih lemah dari &lt; &gt;." },
    { id: "and", label: "&&", title: "DAN lebih kuat dari ATAU", text: "<code>a || b &amp;&amp; c</code> dibaca <code>a || (b &amp;&amp; c)</code>." },
    { id: "or", label: "||", title: "ATAU", text: "Hampir paling lemah. Beri kurung agar maksudmu jelas." },
    { id: "tern", label: "?:", title: "Ternary", text: "Kondisi di kiri dihitung dulu seluruhnya." },
    { id: "assign", label: "=", title: "Penugasan paling akhir", text: "<code>x = a + b * c;</code>: semua dihitung dulu, baru hasilnya disimpan ke x. Satu-satunya yang dikerjakan dari kanan ke kiri: <code>a = b = 0;</code>." }
  ]
});

const bits = (v) => v.toString(2).padStart(4, "0").split("");
const rowsB = [["a = 12", 12, "sky", "a"], ["b = 10", 10, "amber", "b"], ["a & b = 8", 8, "emerald", "and"], ["a | b = 14", 14, "violet", "or"], ["a ^ b = 6", 6, "rose", "xor"]];
const bitw = diagram({
  label: "Diagram Interaktif ➕", title: "Operator Bitwise Bekerja per Bit", desc: "Slide hanya memberi tautan; ini contohnya. Klik setiap baris hasil.", minw: 520,
  svg: svg(700, rowsB.length * 52 + 20,
    rowsB.map(([nm, v, tone, p], i) => { const y = 10 + i * 52;
      return `<g data-part="${p}">` + text(140, y + 22, nm, { size: 16, anchor: "end", color: C[tone][2] }) + bits(v).map((b, j) => box(170 + j * 56, y, 48, 44, b, b === "1" ? tone : "white", null, { size: 18, r: 6 })).join("") + "</g>"; }).join("") +
    path("M160,112 H400", { noArrow: true, color: "#0f172a" }) +
    text(560, 38, "bit:  8 4 2 1", { size: 13, color: "#64748b" }) + text(560, 140, "1 jika keduanya 1", { size: 13, color: C.emerald[2] }) + text(560, 192, "1 jika salah satu 1", { size: 13, color: C.violet[2] }) + text(560, 244, "1 jika berbeda", { size: 13, color: C.rose[2] })
  ),
  parts: [
    { id: "a", label: "a", title: "12 = 1100₂", text: "8 + 4 = 12." },
    { id: "b", label: "b", title: "10 = 1010₂", text: "8 + 2 = 10." },
    { id: "and", label: "&", title: "AND bit", text: "Hanya kolom 8 yang sama-sama 1 → 1000₂ = 8." },
    { id: "or", label: "|", title: "OR bit", text: "Kolom 8, 4, 2 → 1110₂ = 14." },
    { id: "xor", label: "^", title: "XOR bit", text: "Kolom yang berbeda: 4 dan 2 → 0110₂ = 6. ➕ Jangan tertukar: <code>^</code> di C++ bukan pangkat. Untuk pangkat pakai <code>pow(2, 3)</code> dari &lt;cmath&gt;." }
  ]
});

const W3 = (x, title, tone, part, body) => `<g data-part="${part}">` + box(x, 10, 230, 36, title, tone, null, { size: 15, r: 8 }) + body + "</g>";
const ctrl = diagram({
  label: "Diagram Interaktif", title: "Tiga Struktur Kontrol Statement", desc: "Peta pertemuan berikutnya. Klik setiap struktur.", minw: 640,
  svg: svg(780, 330,
    W3(15, "Runtunan", "sky", "seq", [0, 1, 2].map(i => box(60, 70 + i * 80, 140, 44, "Langkah " + (i + 1), "sky", null, { size: 14 }) + (i < 2 ? arrow(130, 114 + i * 80, 130, 148 + i * 80) : "")).join("")) +
    W3(275, "Percabangan (P4–P5)", "violet", "sel", poly("390,70 460,115 390,160 320,115", "violet", null, "kondisi?", 390, 115, { size: 13 }) + path("M320,115 H300 V200") + path("M460,115 H480 V200") + box(255, 202, 90, 40, "A", "violet", null, {}) + box(435, 202, 90, 40, "B", "violet", null, {}) + text(305, 100, "ya", { size: 12, color: "#475569" }) + text(478, 100, "tidak", { size: 12, color: "#475569" }) + text(390, 280, "if • if-else • else-if • switch", { size: 13, color: C.violet[2] })) +
    W3(535, "Perulangan (P6–P7)", "emerald", "loop", poly("650,70 720,115 650,160 580,115", "emerald", null, "syarat?", 650, 115, { size: 13 }) + arrow(650, 160, 650, 196) + box(590, 198, 120, 40, "badan", "emerald", null, {}) + path("M590,218 H560 V115 H578") + path("M720,115 H750 V290", {}) + text(668, 178, "ya", { size: 12, color: "#475569" }) + text(740, 100, "tidak", { size: 12, color: "#475569" }) + text(650, 280, "for • while • do-while", { size: 13, color: C.emerald[2] }))
  ),
  parts: [
    { id: "seq", label: "Runtunan", title: "Dikerjakan berurutan", text: "Semua program P2 dan P3 adalah runtunan: baris dikerjakan dari atas ke bawah, masing-masing tepat sekali." },
    { id: "sel", label: "Percabangan", title: "Memilih satu jalan", text: "Hasil operator perbandingan/logika dari pertemuan ini menentukan jalan mana yang diambil. P4: if, if-else, else-if. P5: switch-case." },
    { id: "loop", label: "Perulangan", title: "Mengulang selama syarat benar", text: "Panah kembali ke atas adalah ciri perulangan. P6: for. P7: while dan do-while." }
  ]
});

module.exports = [
  A("Operator dan Operand", `<p><strong>Operator</strong> adalah simbol khusus yang menyuruh compiler mengolah data secara matematis atau logis. Data yang diolah disebut <strong>operand</strong>. Pada <code>A + B</code>, operand-nya A dan B, operatornya +.</p>
<p>Berdasarkan jumlah operand, operator dibagi tiga: <strong>unary</strong> (satu), <strong>binary</strong> (dua), dan <strong>ternary</strong> (tiga). Berdasarkan fungsinya, slide membagi menjadi aritmetika, compound assignment, increment/decrement, perbandingan, logika, bitwise, ternary, dan koma.</p>`, "Bagian 1"),
  A("Aritmetika dan Jebakan Pembagian", `<p>Lima operator aritmetika: <code>+ - * / %</code>. Semuanya binary. Yang paling sering menimbulkan <strong>logic error</strong> adalah <code>/</code>:</p>
<ul><li><code>7 / 2</code> → <strong>3</strong> (int dibagi int, desimal dibuang)</li><li><code>7.0 / 2</code> → <strong>3.5</strong></li><li><code>(float)7 / 2</code> → <strong>3.5</strong> ➕ (casting: mengubah tipe sementara)</li><li><code>float r = 7 / 2;</code> → <strong>3</strong>! Pembagian sudah terjadi sebagai int sebelum disimpan ke float.</li><li>➕ Membagi bilangan bulat dengan 0 menyebabkan program berhenti (runtime error).</li></ul>`, "Bagian 2"),
  code("rata.cpp", `#include <iostream>
using namespace std;

int main() {
    int uts = 7, uas = 8;
    cout << (uts + uas) / 2   << endl;  // 7   (salah)
    cout << (uts + uas) / 2.0 << endl;  // 7.5 (benar)
    cout << 17 % 5 << endl;             // 2
    return 0;
}`, "Inilah “logic error” yang muncul di P1: compiler tidak protes, tetapi hasilnya salah.", "Membuktikan Jebakan Pembagian"),
  prec,
  tip("Koreksi dan catatan slide", "<ul><li>Contoh ternary <code>(nilai &gt; nilai_bawah) ? lulus : tidak;</code> dan padanan if-nya <code>{“lulus”}</code> bukan kode yang bisa dijalankan. Bentuk yang benar: <code>string ket = (nilai &gt; nilai_bawah) ? \"lulus\" : \"tidak lulus\";</code></li><li>“Operator aritmetika memerlukan satu operator untuk dua operand”: maksudnya satu operator <em>di antara</em> dua operand.</li><li>Logical operator bukan untuk “memeriksa kesamaan nilai”; itu tugas <code>==</code>. Operator logika menggabungkan dua kondisi.</li><li>Ditulis “Bistwise” dan “Tenary”: yang benar <strong>bitwise</strong> dan <strong>ternary</strong>.</li></ul>", "warn"),
  { type: "table", label: "Tabel Interaktif", title: "Tabel Kebenaran Operator Logika (A = 1, B = 0 seperti di slide)", headers: ["A", "B", "A && B", "A || B", "!A"],
    rows: [["1", "1", "1", "1", "0"], ["1", "0", "0", "1", "0"], ["0", "1", "0", "1", "1"], ["0", "0", "0", "0", "1"]],
    modes: [{ label: "Kasus slide", target: "row", row: 1, title: "A = 1, B = 0", text: "A && B = 0, A || B = 1, !A = 0, !B = 1." },
      { label: "➕ Short-circuit", target: "col", col: 2, title: "&& berhenti di false pertama", text: "Kalau kiri sudah 0, kanan tidak dihitung lagi. Berguna untuk <code>b != 0 &amp;&amp; a / b &gt; 2</code>: pembagian dengan 0 tidak pernah terjadi." }] },
  bitw,
  { type: "table", label: "Tabel Interaktif", title: "Daftar Lengkap Operator Bitwise (a = 12, b = 10)", headers: ["Operator", "Nama", "Contoh", "Hasil"],
    rows: [["<code>&amp;</code>", "AND", "<code>a &amp; b</code>", "8"], ["<code>|</code>", "OR", "<code>a | b</code>", "14"], ["<code>^</code>", "XOR", "<code>a ^ b</code>", "6"], ["<code>~</code>", "NOT (unary)", "<code>~a</code>", "-13"], ["<code>&lt;&lt;</code>", "Geser kiri", "<code>a &lt;&lt; 1</code>", "24 (× 2)"], ["<code>&gt;&gt;</code>", "Geser kanan", "<code>a &gt;&gt; 2</code>", "3 (÷ 4)"]],
    modes: [{ label: "Mengapa -13?", target: "row", row: 3, title: "~ membalik semua 32 bit", text: "➕ Termasuk bit tanda, sehingga ~x = −x − 1. Cukup diketahui; jarang dipakai di soal dasar." }] },
  A("Operator Koma", `<p>Operator koma memisahkan beberapa ekspresi di tempat yang hanya mengharapkan satu ekspresi. Semua dikerjakan dari kiri, tetapi <strong>nilai yang dipakai hanya ekspresi paling kanan</strong>.</p>
<p>Pada <code>a = (b=3, b+2, c=10);</code>: b diisi 3, lalu b+2 dihitung (hasil 5 dibuang), lalu c diisi 10. Nilai paling kanan, 10, masuk ke a. Hasil akhir a = 10, b = 3, c = 10. ➕ Kurung di sini penting; tanpa kurung, <code>a = b = 3</code> dikerjakan dulu karena = lebih kuat dari koma. Pemakaian koma paling umum ada di <code>for</code> (P6): <code>for (n = 0, i = 100; n != i; n++, i--)</code>.</p>`, "Bagian 3"),
  ex("Latihan", "Prefix atau Postfix? (x = 4 setiap baris)", ["Kode", "Yang dicetak"], ["3", "4", "5"], [
    ["cout << x++;", "4"], ["cout << ++x;", "5"], ["cout << x--;", "4"], ["cout << --x;", "3"], ["x++; cout << x;", "5"]]),
  ctrl,
  rv("Uji Pemahaman", "Jawab Dulu, Lalu Buka", [
    { prompt: "float hasil = 9 / 2; cout << hasil; → ?", answer: "4", reason: "9 / 2 dihitung sebagai int dulu. Tulis 9.0 / 2." },
    { prompt: "Kenapa if (x = 0) tidak pernah dijalankan?", answer: "x diisi 0, dan 0 dianggap false", reason: "Seharusnya ==. Banyak compiler memberi peringatan untuk ini." },
    { prompt: "Tulis kondisi: umur antara 17 dan 25 (inklusif).", answer: "umur >= 17 && umur <= 25", reason: "Bentuk 17 <= umur <= 25 dari matematika tidak bekerja seperti yang diharapkan di C++." }
  ])
];
