// Algoritma dan Pemrograman — Pertemuan 15: Implementasi Sequential Search (menuju UAS)
// Materi LMS P15 berjudul sama dengan P14. Sentinel dan Latihan 3 dari slide P14; program lengkap ditandai ➕.
const { tip, code, tbl, ex, Q, lab, sda } = require("./alp_uas_util.js");
const LAB = require("./lab_alp_uas.js");

module.exports = {
  id: "p15", nomor: 15, judul: "Implementasi Sequential Search & Sentinel", ujian: "UAS",
  hero: {
    badge: "Dosen: Muhamad Rosidin, M.Kom.",
    title: "Dari Pseudocode ke Program",
    text: "Teknik <strong>sentinel</strong> (elemen fiktif bernilai K di belakang tabel) memangkas perbandingan menjadi satu per putaran. Lalu sequential search ditulis sebagai <strong>fungsi C++</strong> lengkap, termasuk variasinya dan kesalahan yang paling sering terjadi."
  },
  cheatsheet: [
    tip("Ide besarnya dalam satu kalimat", "Sentinel: taruh <strong>A[n] = K</strong>, cari dengan <strong>while (A[i] != K)</strong> saja, lalu periksa sekali: <strong>i &lt; n</strong> = ketemu, <strong>i = n</strong> = yang cocok hanya sentinel (tidak ketemu). Array butuh <strong>n + 1</strong> tempat."),
    code("sentinel.cpp", `int cariSentinel(int A[], int n, int K) {   // A muat n + 1 elemen
    A[n] = K;              // sentinel
    int i = 0;
    while (A[i] != K)      // pasti berhenti
        i++;
    if (i < n) return i;   // ketemu di data asli
    return -1;             // yang cocok hanya sentinel
}`, "Pseudocode slide: A[n] ← K; i ← 0; while A[i] ≠ K do i ← i + 1; if i < n return i else return -1.", "Sentinel dalam C++", "Interaktif 1 • Kode"),
    tbl("Biasa vs Sentinel", ["", "Biasa", "Sentinel"], [
      ["Syarat while", "`i < n && A[i] != K`", "`A[i] != K`"],
      ["Perbandingan per putaran", "2", "1"],
      ["Latihan 3 ({3,1,2,4,6}, K = 5)", "12 perbandingan → −1", "7 perbandingan → −1"],
      ["Ukuran array", "n", "n + 1"]
    ], null, "Interaktif 2 • Perbandingan"),
    tbl("Jebakan Implementasi", ["Kode keliru", "Akibat"], [
      ["`if (A[i] == K) return i; else return -1;` di dalam loop", "Hanya A[0] yang diperiksa"],
      ["`int A[5]; A[5] = K;`", "Sentinel ditulis di luar array"],
      ["Sentinel tanpa cek `i < n`", "Semua pencarian dianggap ketemu"],
      ["`for (i = 0; i <= n; i++)`", "Membaca A[n]"]
    ], null, "Interaktif 3 • Jebakan")
  ],
  simulator: [
    lab(LAB.P15, "Sentinel Langkah demi Langkah", "Kasus pertama menjalankan versi biasa dan sentinel berdampingan pada Latihan 3. Hitung berapa perbandingan yang dihemat sentinel."),
    ex("Permainan Interaktif 1 • Sentinel", "A = {10, 12, 9, 7, 20}, n = 5, sentinel dipasang di A[5]", ["Kunci K", "Loop berhenti di i ="], ["0", "1", "2", "3", "4", "5"], [
      ["K = 10", "0"], ["K = 9", "2"], ["K = 20", "4"], ["K = 5 (tidak ada)", "5"], ["K = 12", "1"]
    ]),
    ex("Permainan Interaktif 2 • Bug atau Benar?", "Fungsi Cari: Mana yang Benar?", ["Kode", "Status"], ["Benar", "Bug"], [
      ["for (i = 0; i < n; i++) { if (A[i] == K) return i; } return -1;", "Benar"],
      ["for (i = 0; i < n; i++) { if (A[i] == K) return i; else return -1; }", "Bug"],
      ["int i = 0; while (i < n && A[i] != K) i++; return (i < n) ? i : -1;", "Benar"],
      ["int i = 0; while (A[i] != K && i < n) i++;", "Bug"],
      ["A[n] = K; int i = 0; while (A[i] != K) i++; return i;", "Bug"],
      ["for (i = 0; i <= n; i++) if (A[i] == K) return i;", "Bug"]
    ]),
    { type: "playground", lang: "cpp", label: "Latihan Implementasi • Cek Misi", title: "Program Sequential Search Lengkap", desc: `Tulis program yang membaca n data dan sebuah kunci, lalu mencetak indeksnya atau pesan tidak ditemukan. Boleh versi biasa atau sentinel. Misi diperiksa dari teks kode, bukan dengan menjalankannya. Untuk melihat jalannya langkah demi langkah, buka ${sda("pencarian-linear", "Pencarian Linear")}.`,
      starter: "// Sequential search\n#include <iostream>\nusing namespace std;\n\nint cari(int A[], int n, int K) {\n    \n}\n\nint main() {\n    int A[101], n, K;\n    \n    return 0;\n}\n",
      tasks: [
        { label: "Fungsi pencarian menerima array, n, dan K", regex: "int\\s+\\w+\\s*\\(\\s*int\\s+\\w+\\s*\\[\\s*\\]\\s*,\\s*int\\s+\\w+\\s*,\\s*int\\s+\\w+\\s*\\)", cs: true },
        { label: "Loop pencarian (`while` atau `for`)", regex: "\\b(while|for)\\s*\\(", cs: true },
        { label: "Membandingkan elemen dengan kunci (`!=` atau `==`)", regex: "\\[\\s*\\w+\\s*\\]\\s*(!=|==)\\s*\\w+", cs: true },
        { label: "Mengembalikan `-1` jika tidak ketemu", regex: "return\\s*-\\s*1\\s*;", cs: true },
        { label: "Membaca data dengan `cin` di dalam loop", regex: "(for|while)\\s*\\([^)]*\\)\\s*\\{?[^}]*cin\\s*>>", cs: true },
        { label: "Memanggil fungsi pencarian dari main", regex: "=\\s*\\w+\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*,\\s*\\w+\\s*\\)", cs: true },
        { label: "Memeriksa hasil -1 sebelum mencetak", regex: "(!=|==)\\s*-\\s*1", cs: true }
      ] }
  ],
  flashcards: [
    { tag: "Sentinel", q: "Apa itu sentinel?", a: "Elemen fiktif yang ditambahkan setelah elemen terakhir tabel, nilainya sama dengan kunci K." },
    { tag: "Sentinel", q: "Di indeks berapa sentinel dipasang?", a: "A[n], tepat setelah elemen terakhir A[n-1]." },
    { tag: "Sentinel", q: "Syarat while pada versi sentinel?", a: "while A[i] ≠ K (tanpa i < n)." },
    { tag: "Sentinel", q: "Setelah loop sentinel berhenti, bagaimana tahu ketemu atau tidak?", a: "i < n → ketemu di data asli; i = n → yang cocok hanya sentinel, return −1." },
    { tag: "Sentinel", q: "Keuntungan sentinel?", a: "Satu perbandingan per putaran (bukan dua)." },
    { tag: "Sentinel", q: "Syarat memakai sentinel?", a: "Array punya satu tempat cadangan (ukuran minimal n + 1)." },
    { tag: "Latihan", q: "Latihan 3: {3,1,2,4,6}, K = 5 dengan sentinel?", a: "A[5] = 5, loop berhenti di i = 5 = n → −1." },
    { tag: "Bug", q: "Bug \"else return -1\" di dalam loop?", a: "Fungsi berhenti di elemen pertama yang tidak cocok; return −1 harus setelah loop." },
    { tag: "Variasi", q: "Cara menghitung jumlah kemunculan K?", a: "Loop semua elemen tanpa berhenti; jumlah++ setiap A[i] == K." }
  ],
  quiz: [
    Q("Sentinel pada sequential search adalah…", ["Elemen fiktif setelah elemen terakhir yang nilainya sama dengan kunci", "Elemen pertama tabel", "Nilai -1", "Variabel penghitung i"], 0, "Slide P14."),
    Q("Pada tabel A[0..n-1], sentinel diletakkan di…", ["A[n]", "A[0]", "A[n-1]", "A[n+1]"], 0, "Setelah elemen terakhir."),
    Q("Dengan teknik sentinel, pencarian elemen…", ["Selalu ditemukan/cocok, lalu posisinya harus diperiksa", "Tidak pernah ditemukan", "Tidak perlu diperiksa lagi", "Hanya untuk data urut"], 0, "Cocok di data asli atau di sentinel."),
    Q("Syarat perulangan pada pseudocode sentinel adalah…", ["while A[i] ≠ K", "while i < n and A[i] ≠ K", "while i < n", "while A[i] = K"], 0, "i < n tidak perlu karena pasti berhenti."),
    Q("Pada versi sentinel, loop berhenti di i = n. Artinya…", ["Kunci tidak ditemukan, return -1", "Kunci ditemukan di indeks n", "Terjadi error", "Data harus diurutkan"], 0, "Yang cocok hanya sentinel."),
    Q("Latihan 3: A = {3, 1, 2, 4, 6}, K = 5, dengan sentinel. Isi A setelah sentinel dipasang adalah…", ["{3, 1, 2, 4, 6, 5}", "{5, 3, 1, 2, 4, 6}", "{3, 1, 2, 4, 5}", "{3, 1, 2, 4, 6, -1}"], 0, "A[5] ← 5."),
    Q("Latihan 3: output sequential search dengan sentinel adalah…", ["-1", "5", "4", "0"], 0, "Berhenti di i = 5 = n."),
    Q("Keuntungan utama sentinel dibanding versi biasa adalah…", ["Perbandingan per putaran berkurang dari dua menjadi satu", "Data tidak perlu disimpan di array", "Bisa mencari di data yang tidak ada", "Tidak perlu loop"], 0, "Syarat i < n hilang dari loop."),
    Q("Syarat array untuk memakai sentinel adalah…", ["Ada satu tempat cadangan setelah elemen terakhir", "Data harus urut", "Elemen harus unik", "Ukuran harus genap"], 0, "Minimal n + 1."),
    Q("Fungsi berikut: for (i=0; i<n; i++) { if (A[i]==K) return i; else return -1; } Kesalahannya…", ["Hanya elemen pertama yang diperiksa", "Tidak pernah berhenti", "Membaca A[n]", "Tidak ada kesalahan"], 0, "return -1 harus setelah loop."),
    Q("Untuk menghitung berapa kali K muncul di tabel, pencarian…", ["Harus memeriksa semua elemen tanpa berhenti saat cocok", "Berhenti di kecocokan pertama", "Memakai sentinel wajib", "Mengembalikan -1"], 0, "jumlah++ setiap cocok."),
    Q("Mencari siswa dengan no_induk tertentu pada array of struct kelas[], yang dibandingkan adalah…", ["kelas[i].no_induk != K", "kelas != K", "kelas[i] != K", "siswa.no_induk != K"], 0, "Bandingkan satu member."),
    Q("Pada pseudocode sentinel slide tertulis \"if i < n return I\". Huruf I seharusnya…", ["i (huruf kecil)", "n", "K", "-1"], 0, "C++ membedakan huruf besar dan kecil.")
  ],
  ringkasan: `*RANGKUMAN P15 ALGORITMA & PEMROGRAMAN: IMPLEMENTASI SEQUENTIAL SEARCH*
🛡️ Sentinel = elemen fiktif A[n] = K di belakang tabel
🔁 while A[i] ≠ K → 1 perbandingan/putaran (biasa: 2)
✅ Sesudah loop: i < n ketemu • i = n hanya sentinel → -1
✏️ Latihan 3: {3,1,2,4,6,5}, K=5 → berhenti i=5 → -1 (12 vs 7 perbandingan)
📦 Array harus muat n + 1
🐞 Bug klasik: else return -1 DI DALAM loop → hanya A[0] diperiksa
🧩 Variasi: hitung kemunculan, posisi terakhir, data urut (stop saat A[i] > K), array of struct`
};
