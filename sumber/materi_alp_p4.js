// Materi Lengkap Algoritma & Pemrograman P4
const { C, box, arrow, path, poly, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓" })) });
const code = (file, src, note, title) => ({ type: "code", lang: "cpp", label: "Contoh Kode", title, file, code: src, note });
const lb = (x, y, t) => text(x, y, t, { size: 13, color: "#475569" });

const dia = (cx, cy, t, tone, p) => poly(`${cx},${cy - 40} ${cx + 100},${cy} ${cx},${cy + 40} ${cx - 100},${cy}`, tone, p, t, cx, cy, { size: 15 });
const ladder = diagram({
  label: "Diagram Interaktif", title: "Flowchart else-if: Nilai Huruf", desc: "Kondisi diperiksa dari atas. Klik setiap bagian.", minw: 520,
  svg: svg(700, 410,
    dia(170, 60, "g ≥ 80?", "violet", "c1") + arrow(270, 60, 380, 60) + lb(320, 46, "ya") + box(384, 38, 140, 44, "cetak \"A\"", "emerald", "out", { size: 15 }) +
    arrow(170, 100, 170, 136) + lb(198, 118, "tidak") +
    dia(170, 180, "g ≥ 60?", "violet", "c2") + arrow(270, 180, 380, 180) + lb(320, 166, "ya") + box(384, 158, 140, 44, "cetak \"B\"", "sky", "out", { size: 15 }) +
    arrow(170, 220, 170, 256) + lb(198, 238, "tidak") +
    box(90, 260, 160, 44, "cetak \"C\"", "rose", "else", { size: 15 }) +
    path("M524,60 H620 V370 H564") + path("M524,180 H620", { noArrow: true }) + path("M170,304 V370 H380") +
    box(384, 350, 176, 40, "lanjut program", "slate", null, { size: 14 })
  ),
  parts: [
    { id: "c1", label: "Kondisi 1", title: "if (g >= 80)", text: "Diperiksa pertama. Kalau true, cetak A dan <strong>langsung keluar</strong> dari seluruh rangkaian." },
    { id: "c2", label: "Kondisi 2", title: "else if (g >= 60)", text: "Hanya diperiksa kalau kondisi 1 false. Karena itu cukup ditulis <code>g &gt;= 60</code>, tidak perlu <code>&amp;&amp; g &lt;= 79</code>: nilai ≥ 80 sudah tersaring di atas." },
    { id: "else", label: "else", title: "Semua sisanya", text: "Dijalankan kalau semua kondisi false. Tidak punya kondisi sendiri." },
    { id: "out", label: "Keluaran", title: "Tepat satu yang dicetak", text: "Apa pun nilainya, hanya satu kotak keluaran yang dilewati. Semua jalur bertemu lagi di “lanjut program”." }
  ]
});

module.exports = [
  A("Percabangan dalam Kehidupan Sehari-hari", `<p>Slide membuka dengan kalimat yang sudah kita pakai setiap hari:</p>
<ul><li>“Jika hari hujan, maka saya membawa payung.” → <strong>if</strong></li><li>“Jika hujan bawa payung, jika tidak bawa topi.” → <strong>if-else</strong></li><li>“Jika IPK di atas 3 puasa 3 hari, jika IPK 2,5–2,9 puasa 1 hari, jika kurang dari 2,5 puasa 3 hari dan memberi makan fakir miskin.” → <strong>else-if</strong></li></ul>
<p><strong>Percabangan</strong> adalah pernyataan yang memungkinkan suatu pernyataan dieksekusi hanya jika suatu kondisi terpenuhi atau tidak terpenuhi. C++ punya dua jenis: <strong>if</strong> (pertemuan ini) dan <strong>switch</strong> (P5).</p>`, "Bagian 1"),
  tip("➕ Uji logika contoh IPK", "Coba IPK tepat <strong>3,00</strong> atau <strong>2,95</strong>. “Di atas 3” tidak mencakup 3,00, dan 2,5–2,9 tidak mencakup 2,95. Keduanya tidak masuk cabang mana pun! Saat menulis program, pastikan rentang <strong>tidak bolong dan tidak tumpang tindih</strong>: <code>ipk &gt; 3</code>, <code>else if (ipk &gt;= 2.5)</code>, <code>else</code>.", "info"),
  A("Bentuk 1: if", `<p>Menjalankan pernyataan <strong>jika dan hanya jika</strong> kondisinya true. Jika false, pernyataan dilewati dan program lanjut ke baris berikutnya.</p>`, "Bagian 2"),
  code("lulus.cpp", `#include <iostream>
using namespace std;

int main() {
    int a;
    cout << "Masukkan nilai a = ";
    cin >> a;
    if (a > 60) {
        cout << "Lulus";
    }
    return 0;
}`, "Latihan di kelas, diperbaiki agar bisa dikompilasi: slide memakai <code>#include &lt;iostream.h&gt;</code> dan <code>main()</code> tanpa int (gaya Turbo C++ lama). Compiler modern seperti Dev-C++ menolak keduanya.", "if: Kelulusan (Diperbaiki dari Slide)"),
  A("Bentuk 2: if-else", `<p>Menjalankan satu pernyataan jika kondisi true, dan pernyataan <strong>lain</strong> jika false. Salah satu pasti dijalankan.</p>`, "Bagian 3"),
  code("tanda.cpp", `#include <iostream>
#include <string>
using namespace std;

int main() {
    int nilai;
    string ket;
    cout << "Bilangan = ";
    cin >> nilai;              // slide lupa membaca nilai
    if (nilai < 0)
        ket = "negatif";
    else
        ket = "positif";
    cout << "bilangan " << ket;
    return 0;
}`, "Koreksi slide: variabel <code>ket</code> belum dideklarasikan, <code>nilai</code> tidak pernah diisi, petik melengkung “ ”, dan hasilnya tidak ditampilkan. ➕ Bagaimana dengan 0? Dengan kode ini 0 dianggap positif. Kalau ingin tepat, tambahkan else-if untuk nol.", "if-else: Positif atau Negatif"),
  A("Bentuk 3: if - else if - else", `<p>Klausa else bisa berisi if-else lain sehingga terbentuk pilihan bertingkat. Kondisi diperiksa <strong>berurutan dari atas</strong>; begitu satu true, sisanya dilewati. <code>else</code> terakhir menangkap semua yang tidak cocok.</p>`, "Bagian 4"),
  ladder,
  code("konversi.cpp", `int grade = 68;
if (grade >= 80 && grade <= 100) {
    cout << "A";
} else if (grade >= 60 && grade <= 79) {
    cout << "B";
} else if (grade >= 0 && grade < 60) {
    cout << "C";
} else {
    cout << "error";
}`, "Jawaban latihan dari slide, dengan <code>If</code>/<code>Else</code> huruf besar dan petik melengkung diperbaiki. ➕ Soalnya menulis C = 0–60, padahal 60 sudah masuk B. Jawabannya sudah benar memakai &lt; 60. Rentang 0–100 dicek agar nilai seperti 105 atau −3 menjadi “error”.", "else-if: Konversi Nilai Huruf"),
  tip("Contoh slide yang membingungkan", "Contoh <code>int grade = 20; if (grade &gt;= 17) “Sudah cukup umur” …</code> memakai nama <code>grade</code> (nilai) untuk <strong>umur</strong>. Kodenya jalan, tetapi nama variabel sebaiknya sesuai isinya: <code>int umur = 20;</code>.", "warn"),
  { type: "choices", label: "Interaktif • Slide “Bagaimana Jika?”", title: "Dua if Terpisah vs else-if", desc: "Kondisinya sama, strukturnya beda. Misal g = 85.", style: "toggle",
    options: [
      { label: "Dua if terpisah", title: "Keduanya diperiksa", code: "if (g >= 80) cout << \"A\";\nif (g >= 60) cout << \"B\";\n\n// keluaran: AB", text: "Setiap if berdiri sendiri. 85 memenuhi keduanya, jadi A dan B sama-sama tercetak. Ini <strong>logic error</strong>." },
      { label: "else-if", title: "Hanya satu yang jalan", code: "if (g >= 80) cout << \"A\";\nelse if (g >= 60) cout << \"B\";\n\n// keluaran: A", text: "Begitu cabang pertama true, cabang kedua dilewati. Untuk pilihan yang saling meniadakan, gunakan else-if." }
    ] },
  A("➕ if Bersarang (Nested if)", `<p>Slide P3 memberi contoh kasus: pilih huruf fakultas dulu, lalu kode prodi.</p>
<ul><li>Huruf <strong>A</strong> → fakultas <strong>FTIK</strong>: 01 Informatika, 02 SI, 03 Adminkes</li><li>Huruf <strong>B</strong> → fakultas <strong>Febira</strong>: 01 Hukum, 02 Akuntansi, 03 Manajemen</li></ul>
<p>Ada dua tingkat keputusan, jadi if ditaruh <strong>di dalam</strong> if. Di bawah ini kerangka untuk fakultas A; lengkapi bagian B sendiri sebagai latihan.</p>`, "Bagian 5"),
  code("fakultas.cpp", `char fak;
int kode;
cout << "Huruf fakultas (A/B): ";  cin >> fak;
cout << "Kode prodi (1-3)     : ";  cin >> kode;

if (fak == 'A') {
    cout << "Fakultas FTIK, prodi ";
    if (kode == 1)      cout << "Informatika";
    else if (kode == 2) cout << "SI";
    else if (kode == 3) cout << "Adminkes";
    else                cout << "tidak dikenal";
} else if (fak == 'B') {
    // latihan: lengkapi untuk Febira
} else {
    cout << "Fakultas tidak dikenal";
}`, "Huruf memakai <code>char</code> dan petik satu. Kode 01 cukup dibaca sebagai angka 1. ➕ Untuk menerima huruf kecil juga: <code>fak == 'A' || fak == 'a'</code>.", "Kerangka Nested if"),
  ex("Latihan", "Lengkapi Kondisinya", ["Pernyataan", "Kondisi C++"], ["x % 3 == 0", "x >= 17 && x <= 25", "x < 0 || x > 100", "!(x == 0)", "x % 5 == 0"], [
    ["x habis dibagi 3", "x % 3 == 0"], ["x antara 17 dan 25", "x >= 17 && x <= 25"], ["x di luar 0–100", "x < 0 || x > 100"], ["x bukan nol", "!(x == 0)"], ["x kelipatan 5", "x % 5 == 0"]]),
  tip("Panduan Tugas P4 (tanpa jawaban)", "Tugas: <em>algoritma dan program C++ untuk menentukan bilangan genap atau ganjil</em>. Langkah yang disarankan: (1) tulis pseudocode atau gambar flowchart: masukan apa, keputusan apa, keluaran apa; (2) ingat operator dari P3 yang menghasilkan <strong>sisa bagi</strong>; (3) pilih bentuk if yang sesuai dengan jumlah kemungkinan hasil; (4) uji dengan 4, 7, 0, dan bilangan negatif seperti −3. Cek misimu di tab <strong>Simulasi</strong>.", "info"),
  rv("Uji Pemahaman", "Jawab Dulu, Lalu Buka", [
    { prompt: "Mengapa else-if kedua cukup menulis g >= 60, bukan g >= 60 && g < 80?", answer: "Nilai ≥ 80 sudah ditangkap cabang pertama", reason: "Cabang berikutnya hanya diperiksa jika cabang sebelumnya false." },
    { prompt: "if (n > 0) cout << \"A\"; cout << \"B\"; Untuk n = −1, apa yang tercetak?", answer: "B", reason: "Tanpa { }, hanya cout A yang ikut if. cout B selalu jalan." },
    { prompt: "Kapan memilih nested if dibanding else-if?", answer: "Saat keputusan kedua bergantung pada hasil keputusan pertama", reason: "Contoh: prodi baru ditentukan setelah fakultas diketahui." }
  ])
];
