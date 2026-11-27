// Algoritma dan Pemrograman — Pertemuan 14: Konsep Sequential Search (menuju UAS)
// Sumber: slide "Pertemuan 14 - Sequential Search" (Muhamad Rosidin, mengacu Levitin 2012). Bagian bertanda ➕ bukan dari modul.
const { tip, code, tbl, ex, Q, lab, algo, sda } = require("./alp_uas_util.js");
const LAB = require("./lab_alp_uas.js");

module.exports = {
  id: "p14", nomor: 14, judul: "Sequential Search: Konsep", ujian: "UAS",
  hero: {
    badge: "Dosen: Muhamad Rosidin, M.Kom.",
    title: "Cari dari Depan, Satu per Satu",
    text: "<strong>Sequential search</strong> membandingkan <strong>kunci K</strong> dengan elemen pertama sampai terakhir, dan berhenti begitu cocok. Hasilnya <strong>indeks</strong> elemen yang cocok, atau <strong>−1</strong> jika tidak ada. Termasuk pembahasan Latihan 1 dan 2 dari slide."
  },
  cheatsheet: [
    tip("Ide besarnya dalam satu kalimat", "Mulai i = 0; selama <strong>i &lt; n</strong> dan <strong>A[i] ≠ K</strong>, geser i; setelah berhenti, <strong>i &lt; n</strong> berarti ketemu di indeks i, selain itu kembalikan <strong>−1</strong>."),
    code("sequential-search.txt", `SequentialSearch(A[0..n-1], K)
i ← 0
while i < n and A[i] ≠ K do
    i ← i + 1
if i < n return i
else return -1

// C++
int i = 0;
while (i < n && A[i] != K) i++;
return (i < n) ? i : -1;`, "i < n ditulis di depan supaya A[n] tidak pernah dibaca.", "Pseudocode Slide → C++", "Interaktif 1 • Pseudocode"),
    tbl("Jawaban Latihan Slide", ["Latihan", "Tabel", "K", "Output", "Perbandingan A[i] ≠ K"], [
      ["1a", "{3, 1, 2, 4, 6}", "5", "−1 (tidak ada)", "5"],
      ["1b", "{10, 12, 9, 7, 20}", "9", "2", "3"],
      ["2a (diurutkan dulu)", "{1, 2, 3, 4, 6}", "5", "−1", "5 (➕ bisa berhenti di 6)"],
      ["2b (diurutkan dulu)", "{7, 9, 10, 12, 20}", "9", "1", "2"]
    ], [
      { label: "Indeks berubah", target: "row", row: 3, title: "Diurutkan → posisi bergeser", text: "Sebelum diurutkan 9 ada di indeks 2, sesudahnya di indeks 1. Outputnya posisi di tabel yang sedang dicari." }
    ], "Interaktif 2 • Latihan"),
    tbl("Dua Cara Berhenti", ["Case", "Kapan", "Hasil"], [
      ["Case 1", "Sudah sampai elemen terakhir, tidak ada yang cocok", "−1"],
      ["Case 2", "Kunci cocok dengan suatu elemen (sisa elemen tidak dibandingkan)", "Indeks elemen itu"]
    ], null, "Interaktif 3 • Konsep")
  ],
  simulator: [
    lab(LAB.P14, "Latihan 1 Langkah demi Langkah", "Pseudocode slide dijalankan pada dua tabel Latihan 1. Perhatikan syarat mana yang membuat loop berhenti."),
    algo("linear", [10, 12, 9, 7, 20], 9, "Sequential Search dengan Batang", `Tabel Latihan 1b. Isi angkamu sendiri di bawah lab untuk mencoba kasus lain. Pelajaran lengkapnya: ${sda("pencarian-linear", "Pencarian Linear")}.`),
    ex("Permainan Interaktif 1 • Tebak Output", "A = {4, 8, 15, 16, 23, 42}", ["Kunci K", "Output"], ["0", "1", "2", "3", "5", "-1"], [
      ["4", "0"], ["15", "2"], ["16", "3"], ["42", "5"], ["7", "-1"], ["8", "1"]
    ]),
    ex("Permainan Interaktif 2 • Berapa Perbandingan?", "A = {4, 8, 15, 16, 23, 42}: Berapa kali A[i] dibandingkan dengan K?", ["Kunci K", "Perbandingan"], ["1", "3", "4", "6"], [
      ["4 (kasus terbaik)", "1"], ["15", "3"], ["16", "4"], ["42 (di paling akhir)", "6"], ["7 (tidak ada)", "6"]
    ])
  ],
  flashcards: [
    { tag: "Konsep", q: "Sequential search termasuk pendekatan apa?", a: "Brute force." },
    { tag: "Konsep", q: "Apa yang dibandingkan dalam sequential search?", a: "Nilai kunci K dengan elemen tabel, mulai elemen pertama sampai terakhir." },
    { tag: "Konsep", q: "Kapan pencarian berhenti?", a: "Saat kunci cocok (tanpa membandingkan sisanya) atau semua elemen sudah dibandingkan." },
    { tag: "Output", q: "Output sequential search?", a: "Indeks elemen pertama yang cocok dengan K, atau −1 jika tidak ada." },
    { tag: "Pseudocode", q: "Syarat while di pseudocode slide?", a: "while i < n and A[i] ≠ K do i ← i + 1" },
    { tag: "Pseudocode", q: "Kenapa i < n ditulis lebih dulu?", a: "Agar A[n] (di luar array) tidak dibaca saat i = n; && berhenti di syarat pertama yang salah." },
    { tag: "Latihan", q: "{3,1,2,4,6}, K = 5?", a: "−1, setelah 5 perbandingan." },
    { tag: "Latihan", q: "{10,12,9,7,20}, K = 9?", a: "2, setelah 3 perbandingan." },
    { tag: "Efisiensi", q: "Perbandingan terbaik dan terburuk untuk n data?", a: "Terbaik 1 (di depan), terburuk n (di belakang atau tidak ada). O(n)." },
    { tag: "Data urut", q: "Perlukah data urut untuk sequential search?", a: "Tidak. Data urut hanya memungkinkan berhenti lebih awal (dan pencarian biner)." }
  ],
  quiz: [
    Q("Sequential search merupakan algoritma pencarian dengan pendekatan…", ["Brute force", "Divide and conquer", "Greedy", "Rekursif"], 0, "Slide P14."),
    Q("Proses sequential search membandingkan nilai kunci dengan…", ["Elemen pertama sampai elemen terakhir", "Elemen tengah lalu separuhnya", "Elemen terakhir saja", "Elemen acak"], 0, "Satu per satu dari depan."),
    Q("Sequential search berhenti tanpa membandingkan semua elemen jika…", ["Nilai kunci cocok dengan nilai elemen", "Tabel sudah urut", "Elemen pertama nol", "Kunci negatif"], 0, "Case 2."),
    Q("Pada pseudocode slide, output jika tidak ada elemen yang cocok adalah…", ["-1", "0", "n", "K"], 0, "else return -1."),
    Q("Output sequential search jika kunci ditemukan adalah…", ["Indeks elemen yang cocok", "Nilai kunci", "Jumlah elemen", "true"], 0, "if i < n return i."),
    Q("Syarat perulangan pada pseudocode slide adalah…", ["while i < n and A[i] ≠ K", "while i <= n or A[i] = K", "while A[i] = K", "for i ← n down to 0"], 0, "Geser selama masih ada data dan belum cocok."),
    Q("Tabel {3, 1, 2, 4, 6}, kunci K = 5. Output sequential search adalah…", ["-1", "4", "5", "3"], 0, "5 tidak ada di tabel."),
    Q("Tabel {10, 12, 9, 7, 20}, kunci K = 9. Output sequential search adalah…", ["2", "3", "9", "1"], 0, "A[2] = 9."),
    Q("Tabel {10, 12, 9, 7, 20}, K = 9. Berapa elemen yang dibandingkan?", ["3", "5", "2", "1"], 0, "10, 12, 9."),
    Q("Tabel {10, 12, 9, 7, 20} diurutkan naik lalu dicari K = 9. Outputnya…", ["1", "2", "0", "-1"], 0, "Urut: {7, 9, 10, 12, 20}."),
    Q("Setelah loop berhenti, kondisi yang menandakan kunci ditemukan adalah…", ["i < n", "i == n", "i > n", "A[i] == -1"], 0, "i = n berarti data habis."),
    Q("Penulisan syarat while dalam C++ yang aman adalah…", ["while (i < n && A[i] != K)", "while (A[i] != K && i < n)", "while (i <= n && A[i] != K)", "while (i < n || A[i] != K)"], 0, "Cek batas dulu."),
    Q("Jumlah perbandingan terburuk sequential search untuk n data adalah…", ["n", "1", "n/2", "log n"], 0, "Kunci di akhir atau tidak ada."),
    Q("Agar dapat dipakai, sequential search … data yang terurut.", ["Tidak membutuhkan", "Wajib membutuhkan", "Hanya bisa dipakai pada", "Selalu mengurutkan ulang"], 0, "Pencarian biner yang butuh data urut."),
    Q("Pada pseudocode, tanda ← berarti…", ["Mengisi nilai (assignment)", "Lebih kecil dari", "Membandingkan", "Kembali ke awal"], 0, "i ← i + 1 sama dengan i = i + 1.")
  ],
  ringkasan: `*RANGKUMAN P14 ALGORITMA & PEMROGRAMAN: SEQUENTIAL SEARCH*
🔎 Sequential search = brute force: bandingkan K dengan A[0], A[1], … satu per satu
🛑 Berhenti: cocok (Case 2) atau data habis (Case 1)
🧾 i ← 0; while i < n and A[i] ≠ K: i ← i+1; if i < n return i else return -1
⚠️ Tulis i < n di DEPAN supaya A[n] tidak dibaca
✏️ {3,1,2,4,6} K=5 → -1 • {10,12,9,7,20} K=9 → 2
📊 Terbaik 1, terburuk n perbandingan → O(n); data tidak perlu urut`
};
