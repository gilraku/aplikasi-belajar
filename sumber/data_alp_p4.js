// Algoritma dan Pemrograman — Pertemuan 4: Percabangan if, if-else, else-if
const Q = (q, opts, ans, exp) => ({ q, opts, ans, exp });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓" })) });
module.exports = {
  id: "p4", nomor: 4, judul: "Percabangan if, if-else, else-if", ujian: "CPMK 1",
  hero: {
    badge: "Dosen: Muhamad Rosidin, M.Kom.",
    title: "Program yang Bisa Memilih",
    text: "“<em>Jika hari hujan, maka saya membawa payung.</em>” Ubah kalimat seperti ini menjadi <strong>if</strong>, <strong>if-else</strong>, <strong>else-if</strong>, dan <strong>if bersarang</strong>. Di akhir ada misi untuk <strong>Tugas genap/ganjil</strong>."
  },
  cheatsheet: [
    { type: "callout", tone: "tip", heading: "Ide besarnya dalam satu kalimat", html: "Percabangan menjalankan suatu pernyataan <strong>hanya jika kondisi terpenuhi</strong> (true) atau tidak terpenuhi (false). Kondisinya ditulis dengan operator perbandingan dan logika dari P3." },
    { type: "table", label: "Interaktif 1 • Tiga Bentuk if", title: "Pilih Bentuk Sesuai Jumlah Pilihan", headers: ["Bentuk", "Kalimat sehari-hari", "Jumlah jalan"],
      rows: [["<code>if</code>", "Jika hujan, bawa payung", "1 (kalau false, tidak terjadi apa-apa)"], ["<code>if-else</code>", "Jika hujan bawa payung, jika tidak bawa topi", "2 (pasti salah satu)"], ["<code>if - else if - else</code>", "IPK > 3 puasa 3 hari, IPK 2,5–2,9 puasa 1 hari, selain itu …", "3 atau lebih (tepat satu yang jalan)"]],
      modes: [{ label: "Kapan pakai else-if", target: "row", row: 2, title: "Pilihan bertingkat", text: "Kondisi diperiksa dari atas. Begitu ada yang true, sisanya dilewati." }] },
    { type: "table", label: "Interaktif 2 • Sintaks", title: "Cara Menulis", headers: ["Bentuk", "Kode"],
      rows: [["if satu pernyataan", "<code>if (nilai &gt; 60) cout &lt;&lt; \"Lulus\";</code>"], ["if blok", "<code>if (nilai &gt; 60) { cout &lt;&lt; \"Lulus\"; bonus = 5; }</code>"], ["if-else", "<code>if (x &lt; 0) cout &lt;&lt; \"negatif\"; else cout &lt;&lt; \"positif\";</code>"], ["else-if", "<code>if (g &gt;= 80) … else if (g &gt;= 60) … else …</code>"]],
      modes: [{ label: "Wajib kurung kurawal", target: "row", row: 1, title: "Lebih dari satu pernyataan → { }", text: "Tanpa { }, hanya pernyataan pertama yang ikut if. ➕ Biasakan selalu memakai { } walau satu baris." }] },
    { type: "table", label: "Interaktif 3 • Kesalahan Umum", title: "Lima Kesalahan yang Sering Muncul", headers: ["Salah", "Benar", "Kenapa"],
      rows: [["<code>if (x = 5)</code>", "<code>if (x == 5)</code>", "= mengisi nilai, selalu true"], ["<code>if (x &gt; 0);</code>", "<code>if (x &gt; 0)</code>", "Titik koma membuat if kosong; blok di bawahnya selalu jalan"], ["<code>If</code> / <code>Else</code>", "<code>if</code> / <code>else</code>", "Case sensitive (ada di slide jawaban)"], ["<code>if (60 &lt;= n &lt;= 79)</code>", "<code>if (n &gt;= 60 &amp;&amp; n &lt;= 79)</code>", "Bentuk matematika tidak berlaku"], ["<code>else (x &lt; 0)</code>", "<code>else if (x &lt; 0)</code>", "else tidak punya kondisi"]] }
  ],
  simulator: [
    ex("Permainan Interaktif 1 • Jalur Mana?", "Kode: if (g >= 80) A; else if (g >= 60) B; else C;", ["Nilai g", "Hasil"], ["A", "B", "C"], [
      ["95", "A"], ["80", "A"], ["79", "B"], ["60", "B"], ["59", "C"], ["0", "C"], ["100", "A"]]),
    { type: "terminal", label: "Permainan Interaktif 2 • Simulator Kelulusan", title: "Program dari Latihan di Kelas", desc: "<code>if (a &gt; 60) cout &lt;&lt; \"Lulus\";</code> dicoba dengan berbagai masukan.", shell: "$", header: "./lulus",
      scenarios: [
        { label: "1. nilai 70", pill: "Lulus", ok: true, cmd: "Masukkan nilai a = 70", res: "Lulus", exp: "70 > 60 true, pernyataan dijalankan." },
        { label: "2. nilai 45", pill: "kosong", ok: false, cmd: "Masukkan nilai a = 45", res: "(tidak ada keluaran)", exp: "Dengan if saja, kondisi false berarti <strong>tidak terjadi apa-apa</strong>. Pengguna bingung. Inilah alasan memakai if-else." },
        { label: "3. nilai 60", pill: "kosong", ok: false, cmd: "Masukkan nilai a = 60", res: "(tidak ada keluaran)", exp: "Soal bilang “lebih dari 60”, jadi 60 tidak lulus. Kalau maksudnya “60 ke atas”, pakai <code>&gt;=</code>. Perhatikan batas!" },
        { label: "4. Versi if-else, nilai 45", pill: "Tidak lulus", ok: true, cmd: "Masukkan nilai a = 45", res: "Tidak lulus", exp: "Tambahan <code>else cout &lt;&lt; \"Tidak lulus\";</code> membuat setiap masukan punya jawaban." }
      ] },
    { type: "playground", lang: "cpp", label: "Tugas P4 • Cek Misi", title: "Menentukan Bilangan Genap atau Ganjil", desc: "Tugas dari slide: <em>“Buatlah algoritma dan program dalam bahasa C++ untuk menentukan sebuah bilangan, apakah bilangan genap atau ganjil!”</em> Tugas dinilai, jadi tidak ada contoh jawaban. Buat algoritmanya dulu (pseudocode atau flowchart), lalu tulis programnya di sini dan klik <strong>Periksa Kode</strong>.", file: "tugas_p4.cpp",
      starter: "// Tugas P4: Genap atau Ganjil\n// Tulis algoritmamu sebagai komentar dulu, lalu programnya\n\n",
      tasks: [
        { label: "`#include <iostream>` dan `int main()`", regex: "#include\\s*<iostream>[\\s\\S]*int\\s+main\\s*\\(", cs: true },
        { label: "Bilangan diminta dari pengguna dengan `cin >>`", regex: "cin\\s*>>\\s*[A-Za-z_]", cs: true },
        { label: "Memakai operator aritmetika yang tepat untuk menguji genap/ganjil (lihat P3)", regex: "%\\s*2\\b", cs: true },
        { label: "Memakai `if` dengan perbandingan `==` atau `!=`", regex: "\\bif\\s*\\([^)]*(==|!=)", cs: true },
        { label: "Ada cabang `else`", regex: "\\belse\\b", cs: true },
        { label: "Menampilkan kata “genap”", regex: "\"[^\"]*genap[^\"]*\"" },
        { label: "Menampilkan kata “ganjil”", regex: "\"[^\"]*ganjil[^\"]*\"" },
        { label: "Ditutup `return 0;`", regex: "return\\s+0\\s*;", cs: true },
        { label: "Tidak ada petik melengkung “ ”", regex: "^[^“”‘’]*$" }
      ] }
  ],
  flashcards: [
    { tag: "Konsep", q: "Apa itu percabangan?", a: "Pernyataan yang dieksekusi hanya jika suatu kondisi terpenuhi atau tidak terpenuhi." },
    { tag: "Konsep", q: "Dua jenis pernyataan percabangan di C++?", a: "if dan switch." },
    { tag: "if", q: "Tiga bentuk if?", a: "if, if-else, if-else if-else." },
    { tag: "if", q: "Jika kondisi if false dan tidak ada else?", a: "Pernyataan dilewati; tidak terjadi apa-apa." },
    { tag: "else-if", q: "Berapa cabang yang dijalankan pada else-if?", a: "Tepat satu: kondisi true pertama dari atas (atau else)." },
    { tag: "Bentuk", q: "Kapan wajib { }?", a: "Saat isi cabang lebih dari satu pernyataan." },
    { tag: "Rentang", q: "Menulis 60 ≤ n ≤ 79?", a: "n >= 60 && n <= 79" },
    { tag: "Flowchart", q: "Simbol percabangan?", a: "Belah ketupat dengan dua jalan keluar (ya/tidak)." },
    { tag: "Bersarang", q: "Apa itu nested if?", a: "if di dalam if, untuk keputusan bertingkat (misal fakultas lalu prodi)." },
    { tag: "Tugas", q: "Inti logika genap/ganjil?", a: "Sisa bagi dengan 2 (operator %). Rumusnya kamu susun sendiri." }
  ],
  quiz: [
    Q("Percabangan adalah…", ["Pernyataan yang dieksekusi hanya jika kondisi terpenuhi atau tidak terpenuhi", "Pengulangan pernyataan", "Deklarasi variabel", "Pemanggilan pustaka"], 0, "Definisi dari slide."),
    Q("Kalimat “Jika hujan, saya membawa payung” paling tepat ditulis dengan…", ["if", "if-else", "else-if", "for"], 0, "Hanya ada satu pilihan tindakan."),
    Q("Kalimat “Jika hujan bawa payung, jika tidak bawa topi” ditulis dengan…", ["if-else", "if saja", "while", "switch tanpa default"], 0, "Dua pilihan, pasti salah satu."),
    Q("Pada if tanpa else, jika kondisi false maka…", ["Pernyataan di dalam if dilewati", "Program error", "Pernyataan tetap dijalankan", "Program berhenti"], 0, "Tidak terjadi apa-apa, lanjut ke baris setelah if."),
    Q("Kondisi if bernilai…", ["Boolean (true/false)", "String", "Karakter", "Selalu angka 1"], 0, "Hasil operator perbandingan/logika."),
    Q("int g = 85; if (g >= 80) cout << \"A\"; else if (g >= 60) cout << \"B\"; else cout << \"C\"; Hasilnya…", ["A", "B", "AB", "C"], 0, "Cabang pertama true, sisanya dilewati."),
    Q("Dengan kode yang sama, g = 60 menghasilkan…", ["B", "A", "C", "Tidak ada"], 0, "60 >= 60 true pada cabang kedua."),
    Q("Penulisan kondisi “nilai antara 60 dan 79” yang benar adalah…", ["nilai >= 60 && nilai <= 79", "60 <= nilai <= 79", "nilai >= 60 || nilai <= 79", "nilai = 60 && 79"], 0, "|| akan selalu true untuk hampir semua angka."),
    Q("if (x = 5) { … } akan…", ["Selalu dijalankan karena x diisi 5", "Dijalankan jika x bernilai 5", "Error kompilasi", "Tidak pernah dijalankan"], 0, "= adalah penugasan; 5 dianggap true."),
    Q("if (x > 0); { cout << \"positif\"; } akan…", ["Selalu mencetak positif", "Mencetak positif hanya jika x > 0", "Error", "Tidak mencetak apa pun"], 0, "Titik koma setelah if membuat if kosong."),
    Q("Yang BENAR tentang else adalah…", ["else tidak memiliki kondisi", "else harus diberi kondisi dalam kurung", "else boleh berdiri tanpa if", "else dijalankan jika if true"], 0, "Kondisi hanya untuk if dan else if."),
    Q("Header yang benar untuk program C++ modern adalah…", ["#include <iostream>", "#include <iostream.h>", "include iostream", "#import <iostream>"], 0, "iostream.h di slide adalah bentuk lama yang ditolak compiler modern."),
    Q("Simbol flowchart untuk if adalah…", ["Belah ketupat", "Jajar genjang", "Oval", "Persegi panjang"], 0, "Keputusan."),
    Q("Pada konversi nilai A = 80–100, B = 60–79, C = 0–60, masalahnya adalah…", ["Nilai 60 masuk B dan C sekaligus", "Nilai 100 tidak masuk", "Tidak ada masalah", "Nilai 80 tidak masuk"], 0, "Rentang di slide tumpang tindih; seharusnya C = 0–59."),
    Q("Pada else-if A/B/C, nilai 105 (di luar 0–100) sebaiknya…", ["Ditangkap else terakhir sebagai “error”", "Dianggap A", "Diabaikan", "Membuat program error"], 0, "Jawaban slide memakai else terakhir untuk error."),
    Q("Dua if terpisah dengan kondisi yang tumpang tindih berbeda dengan else-if karena…", ["Keduanya bisa sama-sama dijalankan", "Hanya satu yang dijalankan", "Tidak ada bedanya", "if kedua tidak pernah dijalankan"], 0, "Setiap if berdiri sendiri dan diperiksa semuanya."),
    Q("Struktur if di dalam if disebut…", ["Nested if", "Else-if", "Switch", "Loop"], 0, "Contoh: pilih fakultas dulu, lalu prodi."),
    Q("Operator yang tepat untuk menentukan bilangan habis dibagi 3 adalah…", ["%", "/", "*", "&&"], 0, "x % 3 == 0."),
    Q("int a = -1; if (a < 0) cout << \"negatif\"; else cout << \"positif\"; Hasil untuk a = 0 adalah…", ["positif", "negatif", "nol", "Tidak ada"], 0, "➕ 0 bukan negatif, tetapi juga bukan positif. Butuh else-if untuk nol."),
    Q("Kode yang benar menyimpan teks hasil percabangan adalah…", ["string ket; if (n < 0) ket = \"negatif\"; else ket = \"positif\";", "if (n < 0) ket = “negatif”;", "if n < 0 then ket = \"negatif\";", "ket = if (n < 0) \"negatif\";"], 0, "Variabel harus dideklarasikan dan memakai petik lurus.")
  ],
  ringkasan: `*RANGKUMAN P4 ALGORITMA & PEMROGRAMAN*
🔀 Percabangan: pernyataan dijalankan hanya jika kondisi terpenuhi
1️⃣ if (kondisi) { … } → false = dilewati
2️⃣ if (…) { … } else { … } → pasti salah satu
3️⃣ if … else if … else → tepat satu cabang, diperiksa dari atas
🪆 Nested if: if di dalam if (fakultas → prodi)
⚠️ = vs ==, titik koma setelah if, If/Else huruf besar, 60 <= n <= 79 → n >= 60 && n <= 79
🛠️ Koreksi slide: #include <iostream> + using namespace std; + int main()
📝 Tugas: genap/ganjil → pikirkan sisa bagi 2`
};
