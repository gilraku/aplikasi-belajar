// Materi Lengkap Algoritma & Pemrograman P6
const { C, box, arrow, path, poly, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓" })) });
const code = (file, src, note, title) => ({ type: "code", lang: "cpp", label: "Contoh Kode", title, file, code: src, note });
const lb = (x, y, t, c) => text(x, y, t, { size: 13, color: c || "#475569" });
const num = (x, y, n) => `<circle cx="${x}" cy="${y}" r="13" fill="#4f46e5"/>` + text(x, y + 1, String(n), { size: 13, color: "#ffffff" });

const flow = diagram({
  label: "Diagram Interaktif", title: "Flowchart for: for (int n = 5; n > 0; n--)", desc: "Angka biru = urutan tahap dari slide. Klik setiap bagian.", minw: 520,
  svg: svg(700, 470,
    box(220, 10, 160, 40, "Mulai", "slate", null, { r: 20 }) + arrow(300, 50, 300, 74) +
    poly("240,78 360,78 390,118 360,158 240,158 210,118", "sky", "init", "int n = 5", 300, 118, { size: 15 }) + num(200, 90, 1) +
    arrow(300, 158, 300, 186) +
    poly("300,190 400,235 300,280 200,235", "amber", "cond", "n > 0 ?", 300, 235, { size: 15 }) + num(196, 200, 2) +
    arrow(300, 280, 300, 312) + lb(322, 296, "ya") +
    box(200, 316, 200, 44, "cout << n;", "emerald", "body", { size: 15 }) + num(186, 328, 3) +
    arrow(300, 360, 300, 386) +
    box(220, 390, 160, 40, "n--", "violet", "step", { size: 15 }) + num(206, 400, 4) +
    path("M220,410 H120 V235 H196") +
    path("M400,235 H560 V400") + lb(470, 222, "tidak") +
    box(480, 404, 160, 44, "cout << \"FIRE!\"", "rose", "exit", { size: 14 }) + num(470, 414, 5)
  ),
  parts: [
    { id: "init", label: "1 Inisialisasi", title: "Dijalankan sekali", text: "Memberi nilai awal counter. Simbol segi enam (preparation) lazim dipakai untuk ini." },
    { id: "cond", label: "2 Kondisi", title: "Dicek di awal setiap putaran", text: "Karena dicek <strong>sebelum</strong> badan, for bisa tidak berjalan sama sekali jika kondisi langsung false. Untuk n = 5: dicek 6 kali (5 true + 1 false)." },
    { id: "body", label: "3 Badan", title: "Pernyataan yang diulang", text: "Mencetak 5, 4, 3, 2, 1. ➕ Tambahkan <code>&lt;&lt; \" \"</code> agar angkanya tidak menempel." },
    { id: "step", label: "4 Step", title: "Mendekatkan ke berhenti", text: "Setelah badan, n berkurang 1, lalu kembali ke tahap 2. Panah balik inilah ciri perulangan." },
    { id: "exit", label: "5 Keluar", title: "Setelah kondisi false", text: "Saat n = 0, kondisi false, program keluar dan mencetak FIRE!" }
  ]
});

module.exports = [
  A("Mengapa Perlu Perulangan?", `<p>Bayangkan mencetak angka 1 sampai 1000. Tanpa perulangan, kamu menulis 1000 baris cout. Dengan perulangan cukup 2 baris. <strong>Pengulangan</strong> dilakukan untuk mengulang satu atau beberapa statement <strong>sebanyak n kali</strong> atau <strong>selama kondisi yang menjadi syarat terpenuhi</strong>.</p>
<p>Setiap perulangan punya tiga ciri:</p>
<ol><li><strong>Kondisi awal</strong> (titik awal).</li><li><strong>Syarat perulangan</strong>: selama terpenuhi, perulangan berjalan; berhenti saat tidak terpenuhi.</li><li><strong>Step</strong>: perubahan yang suatu saat membuat syarat menjadi false.</li></ol>
<p>C++ punya tiga cara: <code>for</code> (pertemuan ini), <code>while</code> dan <code>do-while</code> (P7).</p>`, "Bagian 1"),
  flow,
  code("countdown.cpp", `#include <iostream>
using namespace std;

int main() {
    for (int n = 5; n > 0; n--) {
        cout << n << " ";
    }
    cout << "FIRE!" << endl;
    return 0;
}`, "Contoh slide yang diperbaiki: <code>&lt;iostream.h&gt;</code> → <code>&lt;iostream&gt;</code>, baris nyasar <code>Cin&gt;&gt;x;</code> di luar main dihapus, <code>printf</code> (gaya C, butuh &lt;cstdio&gt;) diganti cout, petik melengkung diganti petik lurus. Keluaran: <code>5 4 3 2 1 FIRE!</code>", "Hitung Mundur (Diperbaiki dari Slide)"),
  { type: "table", label: "Tabel Jejak ➕", title: "Menjumlahkan 1 sampai 5: total += i", headers: ["Putaran", "i", "i <= 5?", "total sesudah"],
    rows: [["awal", "1", "", "0"], ["1", "1", "true", "1"], ["2", "2", "true", "3"], ["3", "3", "true", "6"], ["4", "4", "true", "10"], ["5", "5", "true", "15"], ["—", "6", "false → keluar", "15"]],
    modes: [{ label: "Kenapa total = 0 di awal?", target: "row", row: 0, title: "Inisialisasi akumulator", text: "Tanpa <code>int total = 0;</code>, total berisi angka sampah dan hasilnya kacau." },
      { label: "Nilai i setelah loop", target: "row", row: 6, title: "i = 6, bukan 5", text: "Kondisi baru false saat i sudah 6. Tabel jejak seperti ini adalah cara terbaik mencari logic error." }] },
  code("jumlah.cpp", `int n, total = 0;
cout << "Sampai berapa? ";
cin >> n;
for (int i = 1; i <= n; i++) {
    total += i;          // total = total + i
}
cout << "Jumlah 1.." << n << " = " << total;`, "➕ Pola “akumulator”: variabel penampung dimulai dari 0 lalu ditambah setiap putaran. Pola ini sangat sering keluar di soal.", "Akumulator"),
  A("Variasi Penulisan for", `<ul><li><strong>Bagian opsional</strong>: inisialisasi dan step boleh tidak ada, asal kedua titik koma tetap ditulis. <code>for (; n &lt; 10;)</code> atau <code>int n = 0; for (; n &lt; 10; n++)</code>.</li><li><strong>Lebih dari satu inisialisasi/step</strong> dengan koma: <code>for (n = 0, i = 100; n != i; n++, i--)</code> berulang <strong>50 kali</strong> karena n naik dan i turun sampai bertemu di 50.</li><li>➕ <code>for (;;)</code> tanpa kondisi = infinite loop, biasanya dihentikan dengan <code>break</code> (P7).</li></ul>`, "Bagian 2"),
  { type: "choices", label: "Interaktif • Slide “Kesetaraan for dan while”", title: "for dan while Bisa Saling Menggantikan", style: "toggle",
    options: [
      { label: "for", title: "Ketiga bagian dalam satu baris", code: "for (int i = 1; i <= 5; i++) {\n    cout << i;\n}", text: "Cocok ketika jumlah putaran sudah diketahui." },
      { label: "while", title: "Ketiga bagian tersebar", code: "int i = 1;          // inisialisasi\nwhile (i <= 5) {    // kondisi\n    cout << i;\n    i++;            // step\n}", text: "Hasilnya sama persis. Cocok ketika berhentinya bergantung pada kejadian (dibahas P7)." }
    ] },
  A("Loop Bersarang (Nested Loop)", `<p>Mirip <strong>nested if</strong>: loop di dalam loop lain. Untuk <strong>setiap satu putaran loop luar</strong>, loop dalam berjalan <strong>sampai selesai</strong>. Pola umum: loop luar = baris, loop dalam = isi tiap baris.</p>`, "Bagian 3"),
  code("segitiga.cpp", `#include <iostream>
using namespace std;

int main() {
    int x = 5;
    for (int i = 1; i <= x; i++) {        // baris
        for (int j = 1; j <= i; j++) {    // isi baris ke-i
            cout << "*";
        }
        cout << endl;                     // pindah baris
    }
    return 0;
}`, "Contoh slide (aslinya memakai printf dan &lt;stdio.h&gt; gaya C), ditulis ulang dengan cout. Keluaran: *, **, ***, ****, ***** pada 5 baris.", "Segitiga Bintang"),
  { type: "table", label: "Tabel Jejak", title: "Nested Loop x = 3", headers: ["i", "j berjalan", "Dicetak"],
    rows: [["1", "1", "*"], ["2", "1, 2", "**"], ["3", "1, 2, 3", "***"]],
    modes: [{ label: "Kunci pola", target: "col", col: 1, title: "Batas j bergantung i", text: "Karena kondisi dalam <code>j &lt;= i</code>, setiap baris lebih panjang satu. Ganti batasnya untuk pola lain (lihat Simulasi)." }] },
  code("perkalian.cpp", `for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= 5; j++) {
        cout << i * j << "\\t";
    }
    cout << endl;
}`, "➕ Tabel perkalian 5×5. <code>\\t</code> membuat kolom rapi.", "Tabel Perkalian"),
  ex("Latihan", "Pilih Kondisi Loop Dalam untuk Pola Ini (i = 1..4)", ["Pola", "Kondisi j"], ["j <= i", "j <= 4", "j <= 5 - i", "j <= 2 * i"], [
    ["* / ** / *** / ****", "j <= i"], ["**** / *** / ** / *", "j <= 5 - i"], ["** / **** / ****** / ********", "j <= 2 * i"], ["**** / **** / **** / ****", "j <= 4"]]),
  rv("Uji Pemahaman", "Jawab Dulu, Lalu Buka", [
    { prompt: "for (int i = 0; i < 3; i++); cout << i; Mengapa error?", answer: "Titik koma setelah for membuat badan kosong, dan i hanya dikenal di dalam for", reason: "Hapus ; dan pindahkan cout ke dalam { }." },
    { prompt: "Berapa kali kondisi dicek pada for (i = 1; i <= 4; i++)?", answer: "5 kali", reason: "4 kali true, 1 kali false." },
    { prompt: "Mengapa loop luar disebut “baris” pada pola segitiga?", answer: "cout << endl ada di loop luar, sesudah loop dalam", reason: "Setiap putaran luar mengakhiri satu baris." }
  ])
];
