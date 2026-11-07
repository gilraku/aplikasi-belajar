// Algoritma dan Pemrograman — Pertemuan 7: Perulangan while & do-while, break, continue
const Q = (q, opts, ans, exp) => ({ q, opts, ans, exp });
const LAB = require("./lab_alp.js");
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓" })) });
module.exports = {
  id: "p7", nomor: 7, judul: "Perulangan while & do-while", ujian: "UTS",
  hero: {
    badge: "Dosen: Muhamad Rosidin, M.Kom.",
    title: "Ulangi Selama Masih Perlu",
    text: "<strong>while</strong> mengecek syarat <strong>sebelum</strong> mengulang, <strong>do-while</strong> mengecek <strong>sesudah</strong> sehingga pasti jalan minimal sekali. Ditambah <strong>break</strong>, <strong>continue</strong>, <strong>nested while</strong>, dan misi untuk <strong>Tugas Nested</strong>."
  },
  cheatsheet: [
    { type: "callout", tone: "tip", heading: "Ide besarnya dalam satu kalimat", html: "Gunakan <strong>for</strong> bila jumlah putaran diketahui, <strong>while</strong> bila berhentinya bergantung pada keadaan, dan <strong>do-while</strong> bila badan harus dijalankan <strong>minimal sekali</strong> (misal menu)." },
    { type: "table", label: "Interaktif 1 • Tiga Perulangan", title: "Perbandingan for, while, do-while", headers: ["Aspek", "for", "while", "do-while"],
      rows: [["Pengecekan kondisi", "Di awal", "Di awal", "Di <strong>akhir</strong>"], ["Minimal dijalankan", "0 kali", "0 kali", "<strong>1 kali</strong>"], ["Letak init & step", "Dalam kurung for", "Sebelum loop & di badan", "Sebelum loop & di badan"], ["Titik koma setelah kondisi", "—", "Tidak boleh", "<strong>Wajib</strong>: <code>} while (n &gt; 0);</code>"], ["Cocok untuk", "Jumlah putaran tetap", "Sampai kejadian tertentu", "Menu, validasi masukan"]],
      modes: [{ label: "Beda utama", target: "row", row: 1, title: "Kondisi awal false", text: "while tidak menjalankan badan sama sekali; do-while tetap menjalankannya sekali." },
        { label: "Jebakan tanda baca", target: "row", row: 3, title: "; pada while vs do-while", text: "<code>while (n &gt; 0);</code> membuat loop kosong (sering jadi infinite loop). Pada do-while, ; setelah <code>while (…)</code> justru wajib." }] },
    { type: "table", label: "Interaktif 2 • break vs continue", title: "Mengendalikan Loop dari Dalam", headers: ["Perintah", "Efek", "Contoh slide (n = 10..1)"],
      rows: [["<code>break;</code>", "Keluar dari loop seketika (juga dari switch)", "Berhenti saat n == 3: 10 … 3 countdown aborted!"], ["<code>continue;</code>", "Lewati sisa badan, lanjut ke putaran berikutnya", "Lewati n == 5: 10 9 8 7 6 4 3 2 1 FIRE!"]],
      modes: [{ label: "Di for", target: "row", row: 1, title: "continue tetap menjalankan step", text: "Pada for, continue melompat ke step (n--). ➕ Pada while, step di badan bisa ikut terlewati sehingga terjadi infinite loop. Hati-hati." }] },
    { type: "code", lang: "cpp", label: "Interaktif 3 • Bentuk Umum", title: "while dan do-while", file: "bentuk.cpp", code: `while (kondisi) {
    pernyataan;
}

do {
    pernyataan;
} while (kondisi);   // titik koma wajib`, note: "Ingat: kondisi while dicek di depan; do-while di belakang." }
  ],
  simulator: [
    { type: "trace-lab", label: "Lab Algoritma • Telusuri Loop", title: "while vs do-while, Langkah demi Langkah", desc: "Dua versi hitung mundur dari slide berjalan berdampingan. Tebak dulu, lalu tekan <strong>Langkah Berikutnya</strong> dan perhatikan kapan kondisi dicek di masing-masing versi.", tip: "Ini penelusuran yang sudah disiapkan, bukan compiler C++ sungguhan.", cases: LAB.P7 },
    ex("Permainan Interaktif 1 • Tebak Keluaran", "Apa yang Dicetak?", ["Kode", "Keluaran"], ["1 2 3", "3 2 1", "10", "(tidak ada)", "1 2 4 5", "1 2"], [
      ["int i = 1; while (i <= 3) { cout << i << \" \"; i++; }", "1 2 3"], ["int i = 3; while (i > 0) { cout << i << \" \"; i--; }", "3 2 1"], ["int i = 10; while (i < 5) { cout << i; i++; }", "(tidak ada)"], ["int i = 10; do { cout << i; i++; } while (i < 5);", "10"], ["for (int i = 1; i <= 5; i++) { if (i == 3) continue; cout << i << \" \"; }", "1 2 4 5"], ["for (int i = 1; i <= 5; i++) { if (i == 3) break; cout << i << \" \"; }", "1 2"]]),
    { type: "playground", lang: "cpp", label: "Tugas Nested • Cek Misi", title: "Pola Angka dengan while dan for", desc: "Tugas dari slide: <em>“Membuat program sederhana dengan pengulangan while dan for yang dapat memberikan output sebagai berikut! Batas Nilai &gt;= 5 (5, 6, 7, 8, 9, 10, dst)”</em>. Tiga pola keluarannya ada di tab Materi. Tugas dinilai, jadi tidak ada contoh jawaban; misi di bawah hanya memeriksa unsur wajibnya.", file: "tugas_nested.cpp",
      starter: "// Tugas Nested: pola angka dengan while dan for\n// Batas >= 5\n\n",
      tasks: [
        { label: "`#include <iostream>` dan `int main()`", regex: "#include\\s*<iostream>[\\s\\S]*int\\s+main\\s*\\(", cs: true },
        { label: "Batas/tinggi diminta dari pengguna (`cin >>`)", regex: "cin\\s*>>\\s*[A-Za-z_]", cs: true },
        { label: "Memeriksa syarat batas minimal 5", regex: "(>=\\s*5|<\\s*5|>\\s*4|<=\\s*4)\\b", cs: true },
        { label: "Memakai perulangan `while`", regex: "\\bwhile\\s*\\(", cs: true },
        { label: "Memakai perulangan `for`", regex: "\\bfor\\s*\\(", cs: true },
        { label: "Ada loop di dalam loop (nested)", regex: "\\b(for|while)\\s*\\([^)]*\\)\\s*\\{[^}]*\\b(for|while)\\s*\\(", cs: true },
        { label: "Pindah baris dengan `endl` atau `\\n`", regex: "(endl|\\\\n)", cs: true },
        { label: "Ditutup `return 0;`", regex: "return\\s+0\\s*;", cs: true },
        { label: "Tidak ada petik melengkung “ ”", regex: "^[^“”‘’]*$" }
      ] }
  ],
  flashcards: [
    { tag: "while", q: "Kapan kondisi while dicek?", a: "Sebelum badan dijalankan (pre-test)." },
    { tag: "while", q: "Badan while minimal dijalankan?", a: "0 kali." },
    { tag: "do-while", q: "Kapan kondisi do-while dicek?", a: "Di akhir badan (post-test)." },
    { tag: "do-while", q: "Badan do-while minimal dijalankan?", a: "1 kali." },
    { tag: "do-while", q: "Tanda baca wajib di akhir do-while?", a: "Titik koma: } while (kondisi);" },
    { tag: "break", q: "Fungsi break di loop?", a: "Keluar dari loop seketika." },
    { tag: "continue", q: "Fungsi continue?", a: "Lewati sisa badan, lanjut ke putaran berikutnya." },
    { tag: "Konsep", q: "Kapan pakai while, bukan for?", a: "Saat jumlah putaran tidak diketahui, berhenti bergantung keadaan." },
    { tag: "Konsep", q: "Kapan pakai do-while?", a: "Saat badan harus jalan minimal sekali: menu, validasi masukan." },
    { tag: "Nested", q: "Nested while di slide berapa kali loop luar?", a: "10 kali (outer 1..10), loop dalam inner <= outer." }
  ],
  quiz: [
    Q("Pada while, kondisi diperiksa…", ["Sebelum badan dijalankan", "Sesudah badan dijalankan", "Hanya sekali", "Tidak pernah"], 0, "while = pre-test."),
    Q("Perulangan yang badannya pasti dijalankan minimal satu kali adalah…", ["do-while", "while", "for", "Semua"], 0, "Kondisi dicek di akhir."),
    Q("Penulisan do-while yang benar adalah…", ["do { … } while (n > 0);", "do { … } while (n > 0)", "do (n > 0) { … }", "while { … } do (n > 0);"], 0, "Titik koma di akhir wajib."),
    Q("int n = 0; while (n > 0) { cout << n; n--; } mencetak…", ["Tidak ada", "0", "-1", "Tak terhingga"], 0, "Kondisi langsung false."),
    Q("int n = 0; do { cout << n; n--; } while (n > 0); mencetak…", ["0", "Tidak ada", "0 -1", "Tak terhingga"], 0, "Jalan sekali, lalu kondisi false."),
    Q("Dalam contoh while slide, bagian yang berperan sebagai step adalah…", ["n--", "n > 0", "cin >> n", "cout << n"], 0, "Step membuat syarat suatu saat false."),
    Q("while (n > 0) { cout << n; } tanpa mengubah n menyebabkan…", ["Infinite loop", "Loop berjalan sekali", "Error kompilasi", "Tidak berjalan"], 0, "Syarat tidak pernah berubah."),
    Q("Perintah untuk keluar dari perulangan seketika adalah…", ["break", "continue", "return 1", "exit loop"], 0, "break juga dipakai di switch."),
    Q("Perintah untuk melewati sisa badan dan lanjut ke putaran berikutnya adalah…", ["continue", "break", "skip", "next"], 0, "continue."),
    Q("for (n = 10; n > 0; n--) { if (n == 5) continue; cout << n << \" \"; } tidak mencetak angka…", ["5", "10", "1", "4"], 0, "n == 5 dilewati."),
    Q("for (n = 10; n > 0; n--) { cout << n << \" \"; if (n == 3) break; } angka terakhir yang dicetak adalah…", ["3", "4", "1", "2"], 0, "cout dulu, baru break."),
    Q("Perulangan paling tepat untuk menu yang harus tampil minimal sekali adalah…", ["do-while", "for", "while", "switch"], 0, "Menu tampil dulu, lalu ditanya mau ulang atau tidak."),
    Q("Perulangan paling tepat untuk membaca angka sampai pengguna mengetik 0 adalah…", ["while (atau do-while)", "for dengan jumlah tetap", "switch", "if"], 0, "Jumlah putaran tidak diketahui."),
    Q("Pada nested while slide, inner dimulai dari 1 setiap putaran outer karena…", ["int inner = 1; ditulis di dalam badan outer", "inner otomatis direset", "inner variabel global", "outer++"], 0, "Kalau inner dideklarasikan di luar, baris kedua dst tidak tercetak."),
    Q("Keluaran nested while slide (outer 1..10, inner <= outer) berbentuk…", ["Segitiga angka 1, 1 2, 1 2 3, …", "Persegi 10×10", "Satu baris 1..10", "Segitiga terbalik"], 0, "Baris ke-n berisi 1..n."),
    Q("Pernyataan slide “Blok statement tidak harus ada” pada while berarti…", ["while (kondisi); sah, tetapi berisiko infinite loop", "while tidak butuh kondisi", "while selalu kosong", "while tidak bisa diberi { }"], 0, "Jika kondisi tidak berubah sendiri, loop kosong tidak pernah berhenti."),
    Q("Header yang salah ketik di slide do-while adalah…", ["<iotream.h.h>", "<iostream>", "<string>", "<cmath>"], 0, "Seharusnya <iostream>."),
    Q("Kode for berikut setara dengan while: for (int i = 0; i < 3; i++) cout << i;", ["int i = 0; while (i < 3) { cout << i; i++; }", "while (i < 3) cout << i;", "int i = 0; while (i < 3) cout << i;", "do { cout << i; } while (i < 3);"], 0, "Init sebelum loop, step di akhir badan.")
  ],
  ringkasan: `*RANGKUMAN P7 ALGORITMA & PEMROGRAMAN*
🔁 while (kondisi) { … } → cek dulu, bisa 0 kali
🔂 do { … } while (kondisi); → jalan dulu, minimal 1 kali, ; wajib
🧭 for = jumlah tetap • while = sampai kejadian • do-while = menu/validasi
⛔ break → keluar loop • ⏭️ continue → lompat ke putaran berikutnya
⚠️ Infinite loop: step lupa, while (…); dengan titik koma
🪆 Nested while slide: outer 1..10, inner 1..outer → segitiga angka
🛠️ Koreksi slide: <iostream.h>, <iotream.h.h>, printf tanpa <cstdio>, petik melengkung
📝 Tugas Nested: while + for, batas ≥ 5, tiga pola angka`
};
