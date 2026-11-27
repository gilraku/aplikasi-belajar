// 📖 Materi Lengkap ALP P13–P15 (menuju UAS). Sumber: slide "Pertemuan 13 - Sorting" dan "Pertemuan 14 - Sequential Search"
// (Muhamad Rosidin, mengacu Levitin 2012). P15 menerapkan pseudocode P14 menjadi program C++ lengkap.
// Bagian bertanda ➕ bukan dari modul. Pelajaran langkah demi langkah ada di section Struktur Data & Algoritma (ditautkan).
const { e, c, A, tip, ul, salah, modul, code, tbl, rv, sda } = require("./alp_uas_util.js");
const M = {};

// Jejak pengurutan data slide (dihitung, bukan diketik) supaya tabel pasti benar
const DATA = [90, 50, 70, 95, 30, 35, 15];
function jejakSelection(a0) {
  const a = a0.slice(), rows = [[0, a.slice(), "Data awal"]];
  for (let i = 0; i < a.length - 1; i++) {
    let m = i;
    for (let j = i + 1; j < a.length; j++) if (a[j] < a[m]) m = j;
    const ket = m === i ? `${a[i]} sudah terkecil, tidak ditukar` : `Terkecil ${a[m]} ditukar dengan ${a[i]}`;
    [a[i], a[m]] = [a[m], a[i]];
    rows.push([i + 1, a.slice(), ket]);
  }
  return rows.map(([k, arr, ket], r) => [r ? `Putaran ${k} (i = ${k - 1})` : "Awal", arr.map((v, x) => (r && x < k ? `<strong>${v}</strong>` : String(v))).join(" ") + (r ? "" : ""), ket]);
}
function jejakBubble(a0) {
  const a = a0.slice(), n = a.length, rows = [["Awal", a.join(" "), "Data awal"]];
  let total = 0;
  for (let i = 0; i < n - 1; i++) {
    let t = 0;
    for (let j = 0; j < n - 1 - i; j++) if (a[j + 1] < a[j]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; t++; }
    total += t;
    rows.push([`Putaran ${i + 1} (i = ${i})`, a.slice(0, n - 1 - i).join(" ") + " | " + a.slice(n - 1 - i).map(v => `<strong>${v}</strong>`).join(" "), `${n - 1 - i} perbandingan, ${t} pertukaran; ${a[n - 1 - i]} naik ke posisi akhirnya`]);
  }
  return { rows, total };
}
const SEL = jejakSelection(DATA), BUB = jejakBubble(DATA);

// ───────────────────────────── P13 SORTING ─────────────────────────────
M.p13 = [
  A("Apa Itu Algoritma?", `<p>Slide P13 memakai definisi Levitin (2012): <strong>algoritma</strong> adalah urutan instruksi yang <strong>jelas</strong> (logis) untuk menyelesaikan suatu masalah, yaitu memperoleh output yang diperlukan untuk setiap input yang sah dalam <strong>waktu yang terbatas</strong>.</p>
<p>Kata "komputer" di sini berarti siapa pun yang menjalankan instruksi. Sebelum ada perangkat elektronik, <em>computer</em> berarti orang yang melakukan perhitungan numerik.</p>
<p>Alur konsepnya: <strong>Masalah</strong> → dirancang <strong>Algoritma</strong> → <strong>Input</strong> diproses oleh <strong>"Komputer"</strong> → <strong>Output</strong>.</p>`, "Bagian 1"),
  tbl("Lima Hal Penting dalam Penyelesaian Masalah dengan Algoritma", ["No", "Hal penting", "Contohnya"], [
    ["1", "Setiap langkah harus jelas (<em>nonambiguity</em>)", "\"Bagi m dengan n, simpan sisanya di r\", bukan \"kecilkan angkanya\""],
    ["2", "Rentang nilai input ditentukan secara rinci", "Euclid: input dua bilangan bulat positif bukan nol"],
    ["3", "Satu algoritma dapat digambarkan dengan beberapa cara", "Langkah bernomor, pseudocode, flowchart, kode C++"],
    ["4", "Satu masalah bisa diselesaikan beberapa algoritma", "Mengurutkan: selection sort, bubble sort, dan lainnya"],
    ["5", "Algoritma untuk masalah yang sama bisa berasal dari gagasan berbeda dan kecepatannya sangat berbeda", "Bubble sort vs merge sort untuk 10.000 data"]
  ]),
  A("Contoh: FPB dengan Algoritma Euclid", `<p>Langkah menghitung FPB dua bilangan m dan n:</p>
<ol class="list-decimal pl-5 space-y-1"><li>Jika n = 0, FPB adalah m, lalu berhenti. Jika tidak, lanjut ke langkah 2.</li><li>Bagi m dengan n, simpan sisa hasil bagi (remainder) di r.</li><li>Berikan nilai n ke m dan nilai r ke n, lalu kembali ke langkah 1.</li></ol>
<p>Pseudocode slide:</p>
<pre>while n ≠ 0 do
    r ← m mod n
    m ← n
    n ← r
return m</pre>
<p>Contoh FPB(60, 24): 60 mod 24 = 12 → (m, n) = (24, 12); 24 mod 12 = 0 → (12, 0); n = 0 sehingga FPB = <strong>12</strong>. Tanda ${c("←")} berarti "isi dengan" (di C++: ${c("=")}), dan ${c("mod")} di C++ ditulis ${c("%")}.</p>`, "Bagian 2"),

  A("Sorting dan Pendekatan Brute Force", `<p><strong>Sorting</strong> (pengurutan) adalah menyusun data menjadi urut, biasanya dari kecil ke besar (<em>ascending</em>). Data yang sudah urut lebih mudah dibaca dan lebih cepat dicari (lihat P14–P15).</p>
<p><strong>Brute force</strong> adalah pendekatan "paling mudah": langsung mencoba sesuai definisi masalah, mengandalkan tenaga (<em>force</em>) komputer, bukan kecerdikan. Paling mudah diimplementasikan, tetapi biasanya bukan yang tercepat. Dua algoritma pengurutan brute force di slide: <strong>selection sort</strong> dan <strong>bubble sort</strong>.</p>`, "Bagian 3"),

  A("Selection Sort: Pilih yang Terkecil", `<p>Cara kerja (slide):</p>
${ul([
    "Pindai seluruh elemen, cari yang <strong>terkecil</strong>, tukar dengan elemen <strong>pertama</strong>. Elemen pertama kini berada di posisi akhirnya (<em>sorted list</em>).",
    "Pindai lagi mulai elemen ke-2, cari terkecil dari n − 1 elemen sisanya, tukar dengan elemen kedua.",
    "Ulangi sampai seluruh elemen urut. Untuk n data cukup n − 1 putaran."
  ])}
<p>Dalam setiap putaran yang dicari adalah <strong>indeks</strong> terkecil (${c("min")}), bukan nilainya. Pertukaran hanya terjadi <strong>sekali</strong> per putaran, di akhir.</p>`, "Bagian 4"),
  code("selection-sort.cpp", `// Pseudocode slide:
// for i ← 0 to n-2 do
//     min ← i
//     for j ← i+1 to n-1 do
//         if A[j] < A[min] min ← j
//     swap A[i] and A[min]

void selectionSort(int A[], int n) {
    for (int i = 0; i <= n - 2; i++) {
        int min = i;
        for (int j = i + 1; j <= n - 1; j++) {
            if (A[j] < A[min]) min = j;
        }
        int tmp = A[i];          // swap A[i] dan A[min]
        A[i] = A[min];
        A[min] = tmp;
    }
}`, "\"to n-2\" pada pseudocode berarti batasnya ikut (≤), jadi di C++ ditulis i <= n - 2 atau i < n - 1."),
  tbl("Jejak Selection Sort pada Data Slide (90 50 70 95 30 35 15)", ["Tahap", "Isi array (tebal = sudah di posisi akhir)", "Yang terjadi"], SEL),

  A("Bubble Sort: Tukar yang Bersebelahan", `<p>Cara kerja (slide): bandingkan elemen yang <strong>berdekatan</strong> dan tukar jika belum urut. Dilakukan dari kiri ke kanan, sehingga elemen terbesar terdorong ("<em>bubble up</em>") ke posisi terakhir. Putaran berikutnya mendorong elemen terbesar ke-2, dan seterusnya. Setelah n − 1 putaran semua elemen urut.</p>
<p>Representasi putaran ke-i dari slide:</p>
<pre>A[0], …, A[j] ↔? A[j+1], …, A[n-i-1]  |  A[n-i] ≤ … ≤ A[n-1]</pre>
<p>Bagian kanan garis | sudah urut dan tidak disentuh lagi. Itu sebabnya loop dalam berjalan sampai ${c("n - 2 - i")}: setiap putaran, batas kanannya maju satu ke kiri.</p>`, "Bagian 5"),
  code("bubble-sort.cpp", `// Pseudocode slide:
// for i ← 0 to n-2 do
//     for j ← 0 to n-2-i do
//         if A[j+1] < A[j] swap A[j] and A[j+1]

void bubbleSort(int A[], int n) {
    for (int i = 0; i <= n - 2; i++) {
        for (int j = 0; j <= n - 2 - i; j++) {
            if (A[j + 1] < A[j]) {       // sama dengan A[j] > A[j+1]
                int tmp = A[j];
                A[j] = A[j + 1];
                A[j + 1] = tmp;
            }
        }
    }
}`, "Pertukaran butuh variabel bantu tmp. Menulis A[j] = A[j+1]; A[j+1] = A[j]; membuat kedua elemen bernilai sama."),
  tbl("Jejak Bubble Sort pada Data Slide (90 50 70 95 30 35 15)", ["Tahap", "Isi array ( | = batas bagian yang sudah urut)", "Yang terjadi"], BUB.rows),

  tbl("Selection Sort vs Bubble Sort (n = 7, data slide)", ["", "Selection sort", "Bubble sort"], [
    ["Ide", "Cari terkecil, taruh di depan", "Tukar tetangga, terbesar naik ke belakang"],
    ["Bagian yang urut tumbuh dari", "Kiri", "Kanan"],
    ["Perbandingan", "n(n−1)/2 = <strong>21</strong>", "n(n−1)/2 = <strong>21</strong>"],
    ["Pertukaran", "Maksimal 1 per putaran: <strong>6</strong>", `Bisa banyak per putaran: <strong>${BUB.total}</strong>`],
    ["Kompleksitas", "O(n²)", "O(n²)"]
  ], [
    { label: "Kenapa O(n²)?", target: "row", row: 4, title: "Loop di dalam loop", text: "Data 2 kali lebih banyak → perbandingan sekitar 4 kali lebih banyak. Untuk 1.000 data sekitar 500 ribu perbandingan. Cocok untuk data sedikit dan untuk belajar." }
  ]),
  tip("Lihat langkahnya bergerak", `<p>Batang yang ditukar, baris kode yang sedang jalan, dan isi variabel bisa diikuti langkah demi langkah di section Struktur Data & Algoritma: ${sda("selection-sort", "Selection Sort")}, ${sda("bubble-sort", "Bubble Sort")}. Tab Simulator pertemuan ini memakai lab yang sama dengan data slide. ➕ Algoritma pengurutan lain di luar modul: ${sda("insertion-sort", "Insertion Sort")}, ${sda("merge-sort", "Merge Sort")}, ${sda("quick-sort", "Quick Sort")}.</p>`),
  salah([
    `Selection sort: menukar setiap kali menemukan yang lebih kecil di dalam loop j. Itu menjadi algoritma lain dan pertukarannya jauh lebih banyak; tukar <strong>sekali</strong> setelah loop j selesai.`,
    `Selection sort: menyimpan nilai terkecil (${c("min = A[j]")}) alih-alih indeksnya, lalu tidak tahu posisi yang harus ditukar.`,
    `Bubble sort: loop dalam sampai ${c("j < n")} sehingga ${c("A[j+1]")} membaca di luar array.`,
    `Menukar tanpa variabel bantu.`,
    `Mengira putarannya n kali. Untuk n data cukup n − 1 putaran (i = 0 sampai n − 2).`
  ]),
  modul([
    `Contoh selection sort di slide punya salah ketik di dua baris terakhir: tertulis ${c("15 35 35 50 70 |95 90")} dan ${c("15 35 35 50 70 90 |95")}. Yang benar ${c("15 30 35 50 70 | 95 90")} dan ${c("15 30 35 50 70 90 | 95")} (angka 30 tidak hilang).`,
    `Komentar di pseudocode BubbleSort slide berbunyi "Mengurutkan array … dengan selection sort". Itu salinan dari slide sebelumnya; algoritmanya bubble sort.`,
    `Daftar isi slide melompat dari nomor 2 ke 4 (tidak ada nomor 3). Tidak ada materi yang hilang.`
  ]),
  rv("Uji Pemahaman", "Jawab Dulu, Lalu Buka", [
    { prompt: "Selection sort pada 40 25 10 30. Isi setelah putaran 1?", answer: "10 25 40 30", reason: "Terkecil (10) ditukar dengan elemen pertama (40)." },
    { prompt: "Bubble sort pada 40 25 10 30. Isi setelah putaran 1?", answer: "25 10 30 40", reason: "40↔25, 40↔10, 40↔30: 40 naik ke belakang." },
    { prompt: "FPB(48, 18) dengan Euclid?", answer: "6", reason: "48 mod 18 = 12, 18 mod 12 = 6, 12 mod 6 = 0." },
    { prompt: "Berapa putaran untuk mengurutkan 10 data?", answer: "9", reason: "n − 1 putaran." }
  ])
];

// ───────────────────────────── P14 SEQUENTIAL SEARCH ─────────────────────────────
M.p14 = [
  A("Sequential Search: Periksa Satu per Satu", `<p><strong>Sequential search</strong> (pencarian beruntun, disebut juga <em>linear search</em>) adalah algoritma pencarian <strong>brute force</strong>. Nilai yang dicari, disebut <strong>kunci</strong> (K), dibandingkan dengan elemen tabel <strong>mulai dari elemen pertama</strong>.</p>
<p>Proses berhenti karena salah satu dari dua hal:</p>
${ul(["<strong>Case 1:</strong> sudah dibandingkan sampai elemen terakhir dan tidak ada yang cocok (tidak ketemu).", "<strong>Case 2:</strong> kunci cocok dengan suatu elemen; pencarian langsung berhenti <strong>tanpa</strong> membandingkan sisa elemen."])}
<p><strong>Kapan dipakai:</strong> data tidak urut, datanya sedikit, atau hanya dicari sesekali. Data tidak perlu diurutkan dulu dan kodenya pendek.</p>`, "Bagian 1"),
  A("Pseudocode dan Artinya", `<pre>SequentialSearch(A[0..n-1], K)
// input : array A[0..n-1] dan kunci pencarian K
// output: indeks elemen pertama A yang cocok dengan K,
//         atau -1 jika tidak ada yang cocok
i ← 0
while i < n and A[i] ≠ K do
    i ← i + 1
if i < n return i
else return -1</pre>
${ul([
    `${c("i ← 0")}: mulai dari elemen pertama.`,
    `${c("while i < n and A[i] ≠ K")}: terus geser selama <strong>masih ada data</strong> dan elemen sekarang <strong>bukan</strong> kunci.`,
    `Loop berhenti karena ${c("i = n")} (data habis) atau ${c("A[i] = K")} (ketemu). Baris ${c("if i < n")} membedakan keduanya.`,
    `Hasilnya <strong>indeks</strong>, bukan nilai. ${c("-1")} dipilih sebagai tanda "tidak ada" karena tidak mungkin menjadi indeks.`
  ])}
<p>Urutan syarat penting: ${c("i < n")} ditulis <strong>di depan</strong>. Operator ${c("&&")} di C++ berhenti di syarat pertama yang salah, jadi saat ${c("i = n")}, ${c("A[n]")} (di luar array) tidak pernah dibaca.</p>`, "Bagian 2"),
  code("sequential-search.cpp", `#include <iostream>
using namespace std;

int sequentialSearch(int A[], int n, int K) {
    int i = 0;
    while (i < n && A[i] != K)
        i = i + 1;
    if (i < n) return i;
    else return -1;
}

int main() {
    int A[5] = {10, 12, 9, 7, 20};
    cout << sequentialSearch(A, 5, 9) << endl;   // 2
    cout << sequentialSearch(A, 5, 5) << endl;   // -1
    return 0;
}`, "Pseudocode slide ditulis ulang dalam C++: and → &&, ≠ → !=, ← → =."),

  A("Pembahasan Latihan 1", `<p>Soal slide: dua tabel berisi 5 integer. Lakukan sequential search dan jelaskan outputnya.</p>`, "Bagian 3"),
  tbl("Latihan 1a: A = {3, 1, 2, 4, 6}, K = 5", ["i", "A[i]", "i < n?", "A[i] ≠ K?", "Tindakan"], [
    ["0", "3", "ya", "ya", "geser"], ["1", "1", "ya", "ya", "geser"], ["2", "2", "ya", "ya", "geser"], ["3", "4", "ya", "ya", "geser"], ["4", "6", "ya", "ya", "geser"],
    ["5", "—", "<strong>tidak</strong>", "(tidak dicek)", "berhenti; i = n → <strong>return -1</strong>"]
  ]),
  tbl("Latihan 1b: A = {10, 12, 9, 7, 20}, K = 9", ["i", "A[i]", "i < n?", "A[i] ≠ K?", "Tindakan"], [
    ["0", "10", "ya", "ya", "geser"], ["1", "12", "ya", "ya", "geser"],
    ["2", "9", "ya", "<strong>tidak</strong>", "berhenti; i < n → <strong>return 2</strong>"]
  ]),
  tip("Penjelasan output", `<p><strong>1a:</strong> 5 tidak ada di tabel. Kelima elemen dibandingkan (Case 1), output ${c("-1")}.</p><p><strong>1b:</strong> 9 ditemukan di indeks 2 setelah 3 perbandingan (Case 2). Elemen 7 dan 20 tidak diperiksa. Outputnya indeks ${c("2")}, bukan nilai 9.</p>`, "ok"),

  A("Latihan 2: Diurutkan Dulu, Lalu Dicari", `<p>Soal slide meminta memakai selection sort dan bubble sort dalam proses pencarian. Artinya: tabel diurutkan dulu (hasil kedua algoritma sama), lalu dicari.</p>
${ul([
    `{3, 1, 2, 4, 6} → urut {1, 2, 3, 4, 6}. K = 5 tetap tidak ada → ${c("-1")}.`,
    `{10, 12, 9, 7, 20} → urut {7, 9, 10, 12, 20}. K = 9 ada di indeks ${c("1")} (sebelum diurutkan indeksnya 2, karena posisi data berubah).`
  ])}
<p>Sequential search tidak <em>membutuhkan</em> data urut. Keuntungan data urut: pencarian boleh berhenti begitu bertemu elemen yang <strong>lebih besar</strong> dari K (pada {1, 2, 3, 4, 6}, berhenti di 6 tanpa harus mencapai akhir tabel). ➕ Data urut juga memungkinkan ${sda("pencarian-biner", "pencarian biner")} yang jauh lebih cepat untuk data besar.</p>`, "Bagian 4"),
  tbl("Berapa Perbandingan yang Dibutuhkan?", ["Kasus", "Kapan terjadi", "Perbandingan untuk n data"], [
    ["Terbaik", "K ada di elemen pertama", "1"],
    ["Terburuk", "K di elemen terakhir atau tidak ada", "n"],
    ["Rata-rata (K ada)", "K di sembarang posisi", "sekitar n/2"]
  ], [
    { label: "O(n)", target: "row", row: 1, title: "Sebanding dengan banyak data", text: "Data 10 kali lebih banyak → perbandingan terburuk 10 kali lebih banyak. Disebut O(n)." }
  ]),
  tip("Lihat langkahnya bergerak", `<p>Pelajaran ${sda("pencarian-linear", "Pencarian Linear (Sequential Search)")} di section Struktur Data & Algoritma menjalankan pencarian langkah demi langkah dengan data pilihanmu sendiri. Versi <strong>sentinel</strong> dari slide P14 dibahas di P15.</p>`),
  salah([
    `Menulis ${c("A[i] != K && i < n")}: saat i = n, ${c("A[n]")} dibaca lebih dulu (di luar array).`,
    `Batas ${c("i <= n")}: satu langkah terlalu jauh.`,
    `Mengembalikan nilai, bukan indeks: output 9 untuk Latihan 1b.`,
    `Lupa membedakan dua sebab berhenti: tanpa ${c("if (i < n)")} setelah loop, "tidak ketemu" ikut dilaporkan sebagai indeks n.`
  ]),
  modul([
    `Latihan slide menulis "Tabel A[0..n]" dengan n = 5. Untuk 5 elemen indeksnya ${c("A[0..n-1]")} = A[0..4], sesuai pseudocode di slide yang sama.`,
    `Gambar Case 1 slide memakai tabel {1, 3, 2, 5, 4} dengan kunci 10. Kunci itu memang tidak ada, jadi semua elemen dibandingkan; gambarnya tidak salah, hanya tidak diberi keterangan "tidak ketemu".`
  ]),
  rv("Uji Pemahaman", "Jawab Dulu, Lalu Buka", [
    { prompt: "A = {4, 8, 15, 16, 23, 42}, K = 16. Output?", answer: "3", reason: "A[3] = 16, setelah 4 perbandingan." },
    { prompt: "A = {4, 8, 15}, K = 5. Berapa perbandingan A[i] ≠ K?", answer: "3", reason: "Ketiga elemen dibandingkan, lalu i = 3 = n membuat loop berhenti." },
    { prompt: "Kenapa -1 dipakai untuk \"tidak ketemu\"?", answer: "Tidak mungkin menjadi indeks", reason: "Indeks array selalu 0 ke atas." },
    { prompt: "Apakah sequential search butuh data urut?", answer: "Tidak", reason: "Pencarian biner yang butuh data urut." }
  ])
];

// ───────────────────────────── P15 IMPLEMENTASI ─────────────────────────────
M.p15 = [
  tip("Isi pertemuan ini", `<p>Materi P15 di LMS berjudul sama dengan P14 (Sequential Search). Pertemuan ini membahas bagian slide P14 yang belum dibahas, yaitu <strong>sentinel</strong> dan Latihan 3, lalu menerapkan semuanya menjadi program C++ lengkap. Bagian bertanda ➕ bukan dari slide.</p>`, "info"),
  A("Sequential Search dengan Sentinel", `<p><strong>Sentinel</strong> (penjaga) adalah elemen <strong>fiktif</strong> yang ditambahkan <strong>setelah elemen terakhir</strong> tabel, nilainya <strong>sama dengan kunci</strong> K.</p>
<p>Akibatnya pencarian <strong>selalu</strong> menemukan elemen yang cocok, paling jauh di posisi sentinel. Jadi syarat ${c("i < n")} tidak perlu dicek di setiap putaran. Setelah loop berhenti, posisinya diperiksa sekali: jika cocoknya di antara elemen tabel (${c("i < n")}) berarti ketemu; jika cocoknya di posisi sentinel (${c("i = n")}) berarti tidak ketemu.</p>
<pre>A[n] ← K
i ← 0
while A[i] ≠ K do
    i ← i + 1
if i < n return i
else return -1</pre>
<p><strong>Keuntungan:</strong> satu perbandingan per putaran, bukan dua. <strong>Syarat:</strong> array harus punya <strong>satu tempat cadangan</strong> (ukuran minimal n + 1), dan isi A[n] lama akan tertimpa.</p>`, "Bagian 1"),
  tbl("Latihan 3: A = {3, 1, 2, 4, 6}, K = 5, dengan Sentinel", ["i", "A[i]", "A[i] ≠ K?", "Tindakan"], [
    ["", "A[5] ← 5", "", "Pasang sentinel: A = {3, 1, 2, 4, 6, <strong>5</strong>}"],
    ["0", "3", "ya", "geser"], ["1", "1", "ya", "geser"], ["2", "2", "ya", "geser"], ["3", "4", "ya", "geser"], ["4", "6", "ya", "geser"],
    ["5", "5", "<strong>tidak</strong>", "berhenti; i = 5 = n → cocoknya sentinel → <strong>return -1</strong>"]
  ]),
  tbl("Biasa vs Sentinel (Latihan 3)", ["", "Tanpa sentinel", "Dengan sentinel"], [
    ["Syarat while", "`i < n && A[i] != K`", "`A[i] != K`"],
    ["Perbandingan per putaran", "2", "1"],
    ["Total perbandingan Latihan 3", "12 (11 di loop + 1 sesudahnya)", "7 (6 di loop + 1 sesudahnya)"],
    ["Ukuran array minimal", "n", "n + 1"]
  ]),

  A("➕ Program Lengkap", `<p>Program di bawah menggabungkan P9 (array), P11–P12 (fungsi, parameter), P14 (sequential search), dan sentinel. Data dan kunci dibaca dari pengguna.</p>`, "Bagian 2"),
  code("cari-sentinel.cpp", `#include <iostream>
using namespace std;

const int MAKS = 100;

// Mengembalikan indeks K di A[0..n-1], atau -1 jika tidak ada.
// A harus punya tempat untuk A[n] (sentinel).
int cariSentinel(int A[], int n, int K) {
    A[n] = K;                  // pasang sentinel
    int i = 0;
    while (A[i] != K)
        i++;
    if (i < n) return i;
    return -1;
}

int main() {
    int A[MAKS + 1];           // +1 untuk sentinel
    int n, K;
    cout << "Banyak data: "; cin >> n;
    for (int i = 0; i < n; i++) {
        cout << "A[" << i << "] = "; cin >> A[i];
    }
    cout << "Kunci yang dicari: "; cin >> K;

    int pos = cariSentinel(A, n, K);
    if (pos != -1) cout << K << " ditemukan di indeks " << pos << endl;
    else cout << K << " tidak ditemukan" << endl;
    return 0;
}`, "Coba dengan n = 5, data 3 1 2 4 6, kunci 5 → \"5 tidak ditemukan\". Kunci 4 → \"4 ditemukan di indeks 3\". (Batas n ≤ 100 belum dicek; tambahkan if sebagai latihan.)"),

  A("➕ Variasi yang Sering Diminta", `<p>Pola dasarnya sama (loop + bandingkan), hanya yang dilakukan saat cocok yang berbeda:</p>`, "Bagian 3"),
  tbl("Variasi Sequential Search", ["Kebutuhan", "Perubahan dari versi dasar"], [
    ["Hitung berapa kali K muncul", "Jangan berhenti saat cocok: `for (i = 0; i < n; i++) if (A[i] == K) jumlah++;`"],
    ["Tampilkan semua posisi K", "Sama, tetapi cetak `i` setiap kali cocok"],
    ["Posisi kemunculan terakhir", "Telusuri dari belakang: `i = n - 1; while (i >= 0 && A[i] != K) i--;`"],
    ["Data sudah urut naik", "Berhenti saat `A[i] > K`: `while (i < n && A[i] < K) i++;` lalu cek `A[i] == K`"],
    ["Cari di array of struct (P10)", "Bandingkan satu member: `while (i < n && kelas[i].no_induk != K) i++;`"]
  ]),
  code("cari-struct.cpp", `struct siswa { int no_induk; string nama; float nilai; };

int cariSiswa(siswa kelas[], int n, int noCari) {
    int i = 0;
    while (i < n && kelas[i].no_induk != noCari)
        i++;
    return (i < n) ? i : -1;
}
// pemakaian:
// int p = cariSiswa(kelas, 3, 2);
// if (p != -1) cout << kelas[p].nama;   // Tono Laksono`, "Yang dibandingkan member no_induk, yang ditampilkan member lain dari elemen yang sama."),
  salah([
    `Menaruh ${c("else return -1;")} <strong>di dalam</strong> loop:<br>${c("for (i = 0; i < n; i++) { if (A[i] == K) return i; else return -1; }")}<br>Fungsi berhenti di elemen pertama yang tidak cocok, jadi hanya A[0] yang pernah diperiksa. ${c("return -1")} harus ditulis <strong>setelah</strong> loop selesai.`,
    `Lupa tempat cadangan untuk sentinel: ${c("int A[5]")} lalu ${c("A[5] = K")} menulis di luar array.`,
    `Memakai sentinel tanpa cek ${c("i < n")} sesudah loop: setiap pencarian seolah-olah ketemu.`,
    `Mencetak ${c("pos")} tanpa memeriksa -1: "ditemukan di indeks -1".`
  ]),
  modul([`Pseudocode sentinel di slide diakhiri ${c("if i < n return I")} (huruf besar). Maksudnya ${c("return i")}; C++ membedakan huruf besar dan kecil.`]),
  rv("Uji Pemahaman", "Jawab Dulu, Lalu Buka", [
    { prompt: "Sentinel ditaruh di indeks berapa untuk n = 8?", answer: "A[8]", reason: "Setelah elemen terakhir A[7]." },
    { prompt: "Sentinel berhenti di i = n. Artinya?", answer: "Tidak ketemu", reason: "Yang cocok hanya elemen fiktif." },
    { prompt: "A = {10, 12, 9, 7, 20}, K = 9 dengan sentinel. Output?", answer: "2", reason: "Data asli cocok lebih dulu di indeks 2." },
    { prompt: "Untuk menghitung jumlah kemunculan K, loop boleh berhenti saat cocok?", answer: "Tidak", reason: "Semua elemen harus diperiksa." }
  ])
];

module.exports = M;
