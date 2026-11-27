// Algoritma dan Pemrograman — Pertemuan 13: Sorting (Pengurutan) (menuju UAS)
// Sumber: slide "Pertemuan 13 - Sorting" (Muhamad Rosidin, mengacu Levitin 2012). Bagian bertanda ➕ bukan dari modul.
const { tip, code, tbl, ex, Q, lab, algo, sda } = require("./alp_uas_util.js");
const LAB = require("./lab_alp_uas.js");
const DATA = [90, 50, 70, 95, 30, 35, 15];

module.exports = {
  id: "p13", nomor: 13, judul: "Sorting: Selection Sort & Bubble Sort", ujian: "UAS",
  hero: {
    badge: "Dosen: Muhamad Rosidin, M.Kom.",
    title: "Mengurutkan dengan Brute Force",
    text: "Definisi <strong>algoritma</strong> (Levitin), contoh <strong>FPB Euclid</strong>, lalu dua algoritma pengurutan brute force: <strong>selection sort</strong> (cari terkecil, taruh di depan) dan <strong>bubble sort</strong> (tukar tetangga, terbesar naik ke belakang)."
  },
  cheatsheet: [
    tip("Ide besarnya dalam satu kalimat", "<strong>Selection sort</strong>: tiap putaran cari indeks <strong>terkecil</strong> lalu tukar <strong>sekali</strong> dengan elemen ke-i. <strong>Bubble sort</strong>: bandingkan <strong>tetangga</strong>, tukar kalau belum urut, sehingga yang <strong>terbesar</strong> naik ke belakang. Keduanya butuh n − 1 putaran dan O(n²)."),
    code("pseudocode.txt", `SelectionSort(A[0..n-1])          BubbleSort(A[0..n-1])
for i ← 0 to n-2 do               for i ← 0 to n-2 do
    min ← i                           for j ← 0 to n-2-i do
    for j ← i+1 to n-1 do                 if A[j+1] < A[j]
        if A[j] < A[min] min ← j              swap A[j] and A[j+1]
    swap A[i] and A[min]`, "← berarti \"isi dengan\". \"to\" termasuk batasnya.", "Pseudocode Slide", "Interaktif 1 • Pseudocode"),
    tbl("Data Slide 90 50 70 95 30 35 15", ["Putaran", "Selection sort", "Bubble sort"], [
      ["1", "15 | 50 70 95 30 35 90", "50 70 90 30 35 15 | 95"],
      ["2", "15 30 | 70 95 50 35 90", "50 70 30 35 15 | 90 95"],
      ["3", "15 30 35 | 95 50 70 90", "50 30 35 15 | 70 90 95"],
      ["4", "15 30 35 50 | 95 70 90", "30 35 15 | 50 70 90 95"],
      ["5", "15 30 35 50 70 | 95 90", "30 15 | 35 50 70 90 95"],
      ["6", "15 30 35 50 70 90 | 95", "15 | 30 35 50 70 90 95"]
    ], [
      { label: "Arah tumbuh", target: "col", col: 1, title: "Selection: urut dari kiri", text: "Setiap putaran satu elemen terkecil berikutnya terkunci di kiri garis |." },
      { label: "Bubble", target: "col", col: 2, title: "Bubble: urut dari kanan", text: "Setiap putaran satu elemen terbesar berikutnya terkunci di kanan garis |." }
    ], "Interaktif 2 • Jejak"),
    tbl("Algoritma & Euclid", ["Konsep", "Isi"], [
      ["Algoritma (Levitin 2012)", "Urutan instruksi yang jelas untuk memperoleh output yang diperlukan dari setiap input sah dalam waktu terbatas"],
      ["Brute force", "Pendekatan paling mudah, mengandalkan tenaga komputer, bukan kecerdikan"],
      ["Euclid", "while n ≠ 0: r ← m mod n, m ← n, n ← r; return m. FPB(60, 24) = 12"]
    ], null, "Interaktif 3 • Konsep")
  ],
  simulator: [
    algo("selection", DATA, null, "Selection Sort dengan Data Slide", `Batang yang ditukar bergerak, baris kode C++ yang sedang jalan menyala. Pilih "Tebak dulu" untuk menjawab sebelum langkahnya dibuka. Pelajaran lengkapnya: ${sda("selection-sort", "Selection Sort")}.`),
    algo("bubble", DATA, null, "Bubble Sort dengan Data Slide", `Perhatikan elemen terbesar terdorong ke kanan di setiap putaran. Pelajaran lengkapnya: ${sda("bubble-sort", "Bubble Sort")}.`),
    lab(LAB.P13, "Algoritma Euclid (FPB)", "Contoh algoritma pembuka slide P13. Tekan <strong>Langkah Berikutnya</strong> dan perhatikan m, n, r bergeser."),
    ex("Permainan Interaktif 1 • Putaran Berikutnya", "Data 40 25 10 30: Isi Setelah Putaran Pertama?", ["Algoritma", "Hasil putaran 1"], ["10 25 40 30", "25 10 30 40", "10 25 30 40", "25 40 10 30"], [
      ["Selection sort", "10 25 40 30"], ["Bubble sort", "25 10 30 40"]
    ]),
    ex("Permainan Interaktif 2 • Ciri Algoritma", "Selection atau Bubble?", ["Pernyataan", "Algoritma"], ["Selection sort", "Bubble sort", "Keduanya"], [
      ["Mencari elemen terkecil lalu menukarnya dengan elemen pertama", "Selection sort"],
      ["Membandingkan elemen yang berdekatan", "Bubble sort"],
      ["Elemen terbesar \"naik\" ke posisi terakhir", "Bubble sort"],
      ["Paling banyak satu pertukaran per putaran", "Selection sort"],
      ["Termasuk pendekatan brute force", "Keduanya"],
      ["Untuk n data butuh n − 1 putaran", "Keduanya"]
    ])
  ],
  flashcards: [
    { tag: "Algoritma", q: "Definisi algoritma (Levitin 2012)?", a: "Urutan instruksi yang jelas (logis) untuk menyelesaikan masalah: memperoleh output dari setiap input logis dalam waktu terbatas." },
    { tag: "Algoritma", q: "Makna \"komputer\" sebelum era elektronik?", a: "Seseorang yang melakukan perhitungan numerik." },
    { tag: "Algoritma", q: "Arti nonambiguity?", a: "Setiap langkah algoritma harus jelas, tidak bermakna ganda." },
    { tag: "Euclid", q: "Langkah algoritma Euclid?", a: "Jika n = 0 FPB = m; jika tidak r = m mod n, m = n, n = r, ulangi." },
    { tag: "Brute force", q: "Apa itu brute force?", a: "Pendekatan paling mudah; \"force\" mengacu pada komputer, bukan kecerdasan." },
    { tag: "Selection", q: "Cara kerja selection sort?", a: "Cari elemen terkecil, tukar dengan elemen pertama; ulangi dari elemen ke-2, dan seterusnya." },
    { tag: "Bubble", q: "Cara kerja bubble sort?", a: "Bandingkan elemen berdekatan, tukar jika belum urut; terbesar \"bubble up\" ke posisi terakhir." },
    { tag: "Bubble", q: "Syarat tukar di pseudocode bubble sort slide?", a: "if A[j+1] < A[j] swap A[j] and A[j+1]." },
    { tag: "Putaran", q: "Berapa putaran untuk n data?", a: "n − 1 (i = 0 sampai n − 2)." },
    { tag: "Efisiensi", q: "Perbandingan selection/bubble sort untuk n data?", a: "n(n−1)/2, kompleksitas O(n²). Untuk 7 data: 21." }
  ],
  quiz: [
    Q("Menurut Levitin (2012), algoritma adalah…", ["Urutan instruksi yang jelas untuk menyelesaikan masalah dalam waktu terbatas", "Bahasa pemrograman tingkat tinggi", "Perangkat keras komputer", "Kumpulan data yang terurut"], 0, "Output untuk setiap input logis dalam waktu terbatas."),
    Q("Sebelum era perangkat elektronik, kata \"computer\" bermakna…", ["Seseorang yang melakukan perhitungan numerik", "Mesin hitung mekanik", "Kalkulator", "Programmer"], 0, "Slide P13."),
    Q("Setiap langkah algoritma harus jelas. Istilahnya adalah…", ["Nonambiguity", "Brute force", "Recursion", "Sorting"], 0, "Hal penting nomor 1."),
    Q("Pada algoritma Euclid, jika n = 0 maka…", ["FPB adalah m, lalu berhenti", "FPB adalah 0", "Bagi m dengan n", "Tukar m dan n"], 0, "Langkah 1."),
    Q("FPB(60, 24) dengan algoritma Euclid adalah…", ["12", "6", "24", "4"], 0, "60 mod 24 = 12, 24 mod 12 = 0."),
    Q("Brute force adalah pendekatan yang…", ["Paling mudah untuk menyelesaikan masalah, mengandalkan kemampuan komputer", "Paling cerdas dan tercepat", "Hanya untuk pencarian", "Tidak bisa diimplementasikan"], 0, "Kata force mengacu pada komputer."),
    Q("Dua algoritma pengurutan brute force yang dibahas slide adalah…", ["Selection sort dan bubble sort", "Merge sort dan quick sort", "Binary search dan linear search", "Insertion sort dan heap sort"], 0, "Brute force sederhana."),
    Q("Selection sort bekerja dengan…", ["Mencari elemen terkecil lalu menukarnya dengan elemen pertama", "Membandingkan elemen berdekatan", "Membagi data menjadi dua", "Menyisipkan elemen ke tempatnya"], 0, "Lalu ulangi dari elemen ke-2."),
    Q("Bubble sort bekerja dengan…", ["Membandingkan elemen-elemen yang berdekatan dan menukarnya jika belum urut", "Mencari elemen terkecil", "Membagi dua data", "Menghitung FPB"], 0, "Elemen terbesar naik ke posisi terakhir."),
    Q("Pada selection sort, variabel min menyimpan…", ["Indeks elemen terkecil", "Nilai elemen terbesar", "Jumlah putaran", "Elemen pertama"], 0, "if A[j] < A[min] min ← j."),
    Q("Pada pseudocode bubble sort slide, loop dalam berjalan dari j ← 0 sampai…", ["n − 2 − i", "n − 1", "n", "i + 1"], 0, "Bagian kanan yang sudah urut tidak disentuh."),
    Q("Data 90 50 70 95 30 35 15 diurutkan dengan selection sort. Hasil setelah putaran pertama adalah…", ["15 50 70 95 30 35 90", "50 70 90 30 35 15 95", "15 30 70 95 50 35 90", "50 90 70 95 30 35 15"], 0, "15 ditukar dengan 90."),
    Q("Data 90 50 70 95 30 35 15 diurutkan dengan bubble sort. Hasil setelah putaran pertama adalah…", ["50 70 90 30 35 15 95", "15 50 70 95 30 35 90", "50 90 70 95 30 35 15", "15 30 35 50 70 90 95"], 0, "95 naik ke posisi terakhir."),
    Q("Pada bubble sort, setelah putaran pertama elemen yang pasti berada di posisi akhirnya adalah…", ["Elemen terbesar", "Elemen terkecil", "Elemen tengah", "Elemen pertama"], 0, "Bubble up."),
    Q("Untuk mengurutkan 7 data, selection sort membutuhkan berapa putaran?", ["6", "7", "21", "49"], 0, "n − 1."),
    Q("Jumlah perbandingan bubble sort (versi slide) untuk 7 data adalah…", ["21", "49", "7", "6"], 0, "6 + 5 + 4 + 3 + 2 + 1."),
    Q("Algoritma yang melakukan paling banyak satu pertukaran per putaran adalah…", ["Selection sort", "Bubble sort", "Keduanya banyak", "Tidak ada"], 0, "Tukar sekali setelah loop j selesai."),
    Q("Pertukaran dua elemen A[j] dan A[j+1] yang benar di C++ adalah…", ["tmp = A[j]; A[j] = A[j+1]; A[j+1] = tmp;", "A[j] = A[j+1]; A[j+1] = A[j];", "A[j] == A[j+1];", "swap = A[j] + A[j+1];"], 0, "Butuh variabel bantu.")
  ],
  ringkasan: `*RANGKUMAN P13 ALGORITMA & PEMROGRAMAN: SORTING*
📘 Algoritma (Levitin) = instruksi jelas → output untuk setiap input sah, waktu terbatas
🔢 Euclid: while n≠0 { r=m%n; m=n; n=r } → FPB(60,24) = 12
💪 Brute force = cara paling mudah, andalkan tenaga komputer
🔍 Selection: cari INDEKS terkecil, tukar SEKALI dengan A[i] → urut tumbuh dari kiri
🫧 Bubble: bandingkan tetangga, if A[j+1] < A[j] tukar → terbesar naik ke kanan
🔁 n data = n−1 putaran • perbandingan n(n−1)/2 (7 data = 21) • O(n²)
📊 Data slide 90 50 70 95 30 35 15 → 15 30 35 50 70 90 95
🛠️ Koreksi slide: baris "15 35 35…" seharusnya "15 30 35…"; komentar bubble sort tertulis "selection sort"`
};
