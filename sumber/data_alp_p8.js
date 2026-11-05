// Algoritma dan Pemrograman — Pertemuan 8: UTS (ulasan P1–P7)
// Bank soal = gabungan kuis P1–P7 diberi label + soal lintas materi. Latihan, bukan soal ujian asli.
const Q = (q, opts, ans, exp) => ({ q, opts, ans, exp });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓" })) });
const clone = o => JSON.parse(JSON.stringify(o));
const lintas = [
  Q("[Lintas] int a = 7, b = 2; float c = a / b; cout << c; mencetak…", ["3", "3.5", "4", "Error"], 0, "P2 + P3: a / b dihitung sebagai int sebelum disimpan ke float."),
  Q("[Lintas] for (int i = 1; i <= 10; i++) if (i % 4 == 0) cout << i << \" \"; mencetak…", ["4 8", "4 8 12", "1 4 8", "2 4 6 8 10"], 0, "P3 + P4 + P6: kelipatan 4 sampai 10."),
  Q("[Lintas] int x = 3; switch (x % 2) { case 0: cout << \"A\"; break; case 1: cout << \"B\"; } mencetak…", ["B", "A", "AB", "Tidak ada"], 0, "P3 + P5: 3 % 2 = 1."),
  Q("[Lintas] int n = 1; while (n < 20) n *= 3; cout << n; mencetak…", ["27", "9", "18", "20"], 0, "P3 + P7: 1 → 3 → 9 → 27 (27 tidak < 20, berhenti)."),
  Q("[Lintas] Simbol flowchart untuk kondisi perulangan while adalah…", ["Belah ketupat", "Persegi panjang", "Jajar genjang", "Oval"], 0, "P1 + P7: kondisi selalu keputusan."),
  Q("[Lintas] int t = 0; for (int i = 1; i <= 4; i++) t += i * i; cout << t; mencetak…", ["30", "10", "16", "20"], 0, "P3 + P6: 1 + 4 + 9 + 16."),
  Q("[Lintas] Kode yang PASTI menjalankan badan minimal sekali walau kondisi awal false adalah…", ["do { … } while (false);", "while (false) { … }", "for (; false;) { … }", "if (false) { … }"], 0, "P7."),
  Q("[Lintas] char g = 'B'; if (g == 'A') cout << 4; else if (g == 'B') cout << 3; else cout << 0; mencetak…", ["3", "4", "0", "43"], 0, "P2 + P4: char dibandingkan dengan petik satu."),
  Q("[Lintas] for (int i = 0; i < 3; i++) for (int j = 0; j < 2; j++) cout << \"*\"; mencetak berapa bintang?", ["6", "5", "3", "2"], 0, "P6: 3 × 2."),
  Q("[Lintas] Program berjalan tetapi rata-rata 7 dan 8 keluar 7. Jenis kesalahan dan perbaikannya…", ["Logic error, bagi dengan 2.0", "Syntax error, tambah titik koma", "Runtime error, ganti int main", "Tidak ada kesalahan"], 0, "P1 + P3.")
];
const bank = [1, 2, 3, 4, 5, 6, 7].flatMap(n => clone(require(`./data_alp_p${n}.js`).quiz).map(q => Object.assign(q, { q: `[P${n}] ${q.q}` }))).concat(lintas);
module.exports = {
  id: "p8", nomor: 8, judul: "UTS: Ulasan Materi P1–P7", ujian: "UTS",
  hero: {
    badge: "Materi 8 • Algoritma dan Pemrograman",
    title: "Satu Halaman untuk Semua Materi UTS",
    text: "Ulasan <strong>algoritma & flowchart</strong>, <strong>struktur program, variabel & tipe data</strong>, <strong>operator</strong>, <strong>if & switch</strong>, serta <strong>for, while, do-while</strong>. Tab Kuis berisi <strong>" + bank.length + " soal latihan</strong> gabungan (bukan soal ujian asli)."
  },
  cheatsheet: [
    { type: "callout", tone: "warn", heading: "Strategi UTS", html: "Soal pemrograman dasar hampir selalu berbentuk <strong>“apa keluaran kode ini?”</strong>. Jangan menebak: buat <strong>tabel jejak</strong> (nilai setiap variabel per baris/putaran) di kertas. Tiga jebakan terbesar: <strong>pembagian int</strong>, <strong>= vs ==</strong>, dan <strong>batas loop (&lt; vs &lt;=)</strong>." },
    { type: "table", label: "Interaktif 1 • Peta Materi", title: "Apa yang Wajib Dikuasai", headers: ["P", "Topik", "Inti"],
      rows: [["1", "Algoritma & pengenalan C++", "Al-Khwarizmi, pseudocode, simbol flowchart, compiler vs interpreter, jenis error"], ["2", "Struktur program & variabel", "#include, int main, komentar, aturan nama, int/float/double/char/string/bool, cin/cout"], ["3", "Operator", "/ dan %, ++ prefix/postfix, == vs =, && || !, bitwise, ternary, koma, prioritas"], ["4", "if", "if, if-else, else-if, nested if, rentang dengan &&"], ["5", "switch", "case, break, default, fall-through, hanya int/char"], ["6", "for", "init-kondisi-step, hitung putaran, nested for, pola bintang"], ["7", "while & do-while", "pre-test vs post-test, break, continue, nested while"]] },
    { type: "table", label: "Interaktif 2 • Jebakan Keluaran", title: "Kode Pendek yang Sering Diujikan", headers: ["Kode", "Keluaran", "P"],
      rows: [["<code>cout &lt;&lt; 7 / 2;</code>", "3", "3"], ["<code>cout &lt;&lt; 7 % 3;</code>", "1", "3"], ["<code>x = 5; cout &lt;&lt; x++; cout &lt;&lt; x;</code>", "56", "3"], ["<code>if (x = 0) cout &lt;&lt; \"A\"; else cout &lt;&lt; \"B\";</code>", "B", "3, 4"], ["<code>case 1: cout&lt;&lt;\"A\"; case 2: cout&lt;&lt;\"B\"; break;</code> (x = 1)", "AB", "5"], ["<code>for (i = 0; i &lt; 5; i++)</code>", "5 putaran", "6"], ["<code>int n = 0; do { cout &lt;&lt; n; } while (n &gt; 0);</code>", "0", "7"]] },
    { type: "table", label: "Interaktif 3 • Koreksi Slide", title: "Penulisan Slide yang Tidak Boleh Ditiru", headers: ["Di slide", "Yang benar"],
      rows: [["<code>#include &lt;iostream.h&gt;</code>, <code>main()</code>", "<code>#include &lt;iostream&gt;</code>, <code>using namespace std;</code>, <code>int main()</code>"], ["<code>Int main</code>, <code>If</code>, <code>Else</code>", "Huruf kecil: C++ case sensitive"], ["<code>float nilai = 80,1;</code>", "<code>80.1</code>"], ["Tipe <code>Boolean</code>", "<code>bool</code>"], ["Petik “ ” melengkung", "Petik lurus \" \""], ["Satu alamat memori = 1 bit", "1 byte"], ["Rentang C = 0–60 dan B = 60–79", "C = 0–59"]] }
  ],
  simulator: [
    ex("Permainan Interaktif 1 • Materi Pertemuan Berapa?", "Cocokkan", ["Konsep", "Pertemuan"], ["P1", "P2", "P3", "P4", "P5", "P6", "P7"], [
      ["Simbol jajar genjang", "P1"], ["getline(cin, nama)", "P2"], ["x++ vs ++x", "P3"], ["else if bertingkat", "P4"], ["fall-through", "P5"], ["for (n=0, i=100; n!=i; n++, i--)", "P6"], ["do { … } while (…);", "P7"], ["sizeof(int)", "P2"], ["Operator ternary ?:", "P3"], ["continue", "P7"]]),
    ex("Permainan Interaktif 2 • Tebak Keluaran Campuran", "Kerjakan dengan Tabel Jejak", ["Kode", "Keluaran"], ["2", "3", "6", "10", "12", "15", "AB"], [
      ["int a = 17; cout << a / 5;", "3"], ["int a = 17; cout << a % 5;", "2"], ["int s = 0; for (int i = 1; i <= 5; i++) s += i; cout << s;", "15"], ["int k = 0; for (int i = 0; i < 3; i++) for (int j = 0; j < 4; j++) k++; cout << k;", "12"], ["int x = 1; switch (x) { case 1: cout << \"A\"; case 2: cout << \"B\"; }", "AB"], ["int n = 1; while (n < 10) n *= 2; cout << n - 6;", "10"], ["int m = 4; cout << (m > 3 ? m + 2 : m - 2);", "6"]]),
    { type: "reveal", label: "Latihan Lisan", title: "Jelaskan dengan Kata-katamu, Lalu Buka", items: [
      { prompt: "Lima ciri algoritma (Knuth)?", answer: "Finite, definite, input, output, effective", reason: "P1." },
      { prompt: "Apa beda while dan do-while?", answer: "while cek di awal (bisa 0 kali); do-while cek di akhir (minimal 1 kali)", reason: "P7." },
      { prompt: "Kapan switch tidak bisa dipakai?", answer: "Untuk rentang, float, string, dan gabungan kondisi", reason: "P5." },
      { prompt: "Mengapa float r = 9 / 2; menghasilkan 4?", answer: "9 / 2 dihitung sebagai int dulu", reason: "P3." }
    ] }
  ],
  flashcards: [
    { tag: "P1", q: "Simbol flowchart: oval, persegi, jajar genjang, belah ketupat?", a: "Mulai/selesai, proses, input/output, keputusan." },
    { tag: "P1", q: "Compiler vs interpreter?", a: "Compiler: semua sekaligus → .exe. Interpreter: baris demi baris." },
    { tag: "P2", q: "Aturan nama variabel?", a: "Diawali huruf/_, tanpa spasi/simbol, bukan keyword, case sensitive." },
    { tag: "P2", q: "char vs string?", a: "'A' (1 karakter) vs \"Ani\" (teks)." },
    { tag: "P3", q: "17/5 dan 17%5?", a: "3 dan 2." },
    { tag: "P3", q: "Prioritas operator singkat?", a: "() → unary → * / % → + − → < > → == != → && → || → ?: → =" },
    { tag: "P4", q: "Rentang 60–79?", a: "n >= 60 && n <= 79" },
    { tag: "P5", q: "Tanpa break?", a: "Fall-through ke case berikutnya." },
    { tag: "P6", q: "Urutan for?", a: "Init sekali → cek → badan → step → cek …" },
    { tag: "P7", q: "break vs continue?", a: "break keluar loop; continue lompat ke putaran berikutnya." }
  ],
  quiz: bank,
  ringkasan: `*RANGKUMAN UTS ALGORITMA & PEMROGRAMAN*
P1 Algoritma (Al-Khwarizmi), pseudocode, flowchart (oval, persegi, jajar genjang, belah ketupat), C++ dikompilasi; error syntax/runtime/logic
P2 #include <iostream>, using namespace std;, int main(){…return 0;}; int, float (80.1), double, char 'A', string "A", bool; cin >>, cout <<
P3 / dan % (17/5=3, 17%5=2), x++ vs ++x, = vs ==, && || !, ternary, koma (ambil paling kanan), prioritas
P4 if, if-else, else-if (tepat satu), nested if, rentang pakai &&
P5 switch(int/char){case: …break; default:}, fall-through
P6 for(init; kondisi; step), i<n = n kali, nested for = pola
P7 while (cek awal), do-while (minimal 1×, ; wajib), break, continue`
};
