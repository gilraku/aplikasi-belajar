// Algoritma dan Pemrograman — Pertemuan 12: Fungsi Pustaka, Parameter, dan Variabel (menuju UAS)
// Sumber: slide "Fungsi" (Muhamad Rosidin). Contoh slide ditulis dalam C; versi C++ diberi tanda ➕.
const { tip, code, tbl, ex, Q, lab } = require("./alp_uas_util.js");
const LAB = require("./lab_alp_uas.js");

module.exports = {
  id: "p12", nomor: 12, judul: "Fungsi: Pustaka, Parameter & Variabel", ujian: "UAS",
  hero: {
    badge: "Dosen: Muhamad Rosidin, M.Kom.",
    title: "Fungsi Siap Pakai dan Fungsi Buatan Sendiri",
    text: "Fungsi <strong>pustaka</strong> untuk string, karakter, dan matematika; cara membuat fungsi sendiri dengan <strong>prototipe</strong>; bedanya <strong>parameter formal</strong> dan <strong>aktual</strong>; serta variabel <strong>lokal, global, dan static</strong>."
  },
  cheatsheet: [
    tip("Ide besarnya dalam satu kalimat", "Fungsi pustaka tinggal dipanggil setelah header-nya di-include; fungsi buatan sendiri dideklarasikan dengan <strong>prototipe</strong> (berakhir titik koma), nilai <strong>aktual</strong> disalin ke parameter <strong>formal</strong>, dan variabel <strong>static</strong> mempertahankan nilainya antarpanggilan."),
    tbl("Fungsi Pustaka di Slide", ["Kelompok (header)", "Fungsi", "Ingat"], [
      ["String (`string.h` / `cstring`)", "`strcpy(tujuan, asal)`, `strlen(s)`, `strcat(tujuan, sumber)`, `strupr(s)`, `strlwr(s)`", "strcat menyambung ke akhir; strupr/strlwr tidak standar"],
      ["Karakter (`ctype.h` / `cctype`)", "`islower(c)`, `isupper(c)`, `isdigit(c)`, `tolower(c)`, `toupper(c)`", "is…() → bukan nol = benar"],
      ["Matematik (`math.h` / `cmath`)", "`sqrt(x)`, `pow(x, y)`", "pow(3, 5) = 243"]
    ], null, "Interaktif 1 • Pustaka"),
    code("fungsi-sendiri.cpp", `int jumlah(int a, int b);        // prototipe = deklarasi (pakai ;)

int main() {
    int a = 4, b = 6;
    int c = jumlah(a, b);         // a, b = parameter AKTUAL
}

int jumlah(int x, int y) {       // definisi; x, y = parameter FORMAL
    return (x + y);
}`, "Prototipe di atas main, definisi boleh di bawah.", "Prototipe, Definisi, Parameter", "Interaktif 2 • Kode"),
    tbl("Tiga Jenis Variabel", ["Jenis", "Letak", "Umur nilai"], [
      ["Global", "Di luar fungsi", "Sepanjang program, bisa dipakai semua fungsi"],
      ["Lokal", "Di dalam fungsi", "Hilang saat fungsi selesai"],
      ["Static", "Di dalam fungsi, kata kunci `static`", "Dipertahankan walau sudah keluar dari blok"]
    ], null, "Interaktif 3 • Variabel")
  ],
  simulator: [
    lab(LAB.P12, "Parameter dan Static Langkah demi Langkah", "Kasus pertama: kapan x dan y muncul dan hilang. Kasus kedua: program faktorial slide dijalankan dengan dan tanpa <code>static</code> berdampingan."),
    ex("Permainan Interaktif 1 • Tebak Hasil Fungsi Pustaka", "Berapa Hasilnya?", ["Ekspresi", "Hasil"], ["'A'", "'a'", "'7'", "Benar (bukan 0)", "0 (salah)", "4", "9", "27", "243"], [
      ["toupper('a')", "'A'"], ["tolower('A')", "'a'"], ["toupper('7')", "'7'"], ["isdigit('7')", "Benar (bukan 0)"], ["isupper('a')", "0 (salah)"], ["islower('a')", "Benar (bukan 0)"], ["sqrt(16)", "4"], ["pow(3, 5)", "243"], ["strlen(\"Algoritma\")", "9"], ["strlen(\"Universitas Dian Nuswantoro\")", "27"]
    ]),
    ex("Permainan Interaktif 2 • Istilah", "Bagian yang Ditandai Disebut Apa?", ["Kode (bagian dalam [ ])", "Istilah"], ["Prototipe", "Definisi", "Parameter formal", "Parameter aktual", "Variabel global", "Variabel lokal", "Variabel static"], [
      ["[int jumlah(int a, int b);] di atas main", "Prototipe"], ["int jumlah(int [x], int [y]) { return (x+y); }", "Parameter formal"], ["c = jumlah([a], [b]);", "Parameter aktual"], ["[float p, l, t;] ditulis di luar semua fungsi", "Variabel global"], ["float proses(…) { [float v;] … }", "Variabel lokal"], ["[static long int fakto = 1;]", "Variabel static"], ["[int jumlah(int x, int y) { return (x+y); }]", "Definisi"]
    ]),
    { type: "playground", lang: "cpp", label: "Latihan 1 Slide • Cek Misi", title: "Nama: Panjang, Kapital, dan Huruf Kecil", desc: "Latihan 1 dari slide: <em>“1. Membaca karakter yang digunakan untuk membaca nama dari standar input. 2. Berapa banyak karakter dalam nama tersebut? 3. Tampilkan nama tersebut dalam bentuk uppercase/lowercase.”</em> Tulis versi C++. Misi diperiksa dari teks kode, bukan dengan menjalankannya.",
      starter: "// Latihan 1: nama, panjang, uppercase/lowercase\n#include <iostream>\n#include <cstring>\n#include <cctype>\nusing namespace std;\n\nint main() {\n    char nama[50];\n    \n    return 0;\n}\n",
      tasks: [
        { label: "Membaca nama dari input (`cin`)", regex: "cin\\s*(>>|\\.getline)", cs: true },
        { label: "Menghitung banyak karakter dengan `strlen`", regex: "strlen\\s*\\(", cs: true },
        { label: "Mengubah ke kapital (`toupper` atau `strupr`)", regex: "(toupper|strupr)\\s*\\(", cs: true },
        { label: "Mengubah ke huruf kecil (`tolower` atau `strlwr`)", regex: "(tolower|strlwr)\\s*\\(", cs: true },
        { label: "Memakai loop untuk mengubah per karakter", regex: "\\b(for|while)\\s*\\(", cs: true },
        { label: "Ditutup `return 0;`", regex: "return\\s+0\\s*;", cs: true }
      ] }
  ],
  flashcards: [
    { tag: "Konsep", q: "Fungsi minimal yang ada di setiap program C/C++?", a: "main()." },
    { tag: "Konsep", q: "Dua keuntungan fungsi menurut slide P12?", a: "Struktur jelas (readability tinggi) dan reusability (dapat digunakan kembali)." },
    { tag: "Klasifikasi", q: "Dua klasifikasi fungsi?", a: "Fungsi pustaka (sudah tersedia) dan fungsi yang dibuat programmer." },
    { tag: "String", q: "strcat(tujuan, sumber) berfungsi?", a: "Menambahkan string sumber ke bagian akhir string tujuan." },
    { tag: "String", q: "strupr dan strlwr?", a: "Mengubah semua huruf menjadi kapital / huruf kecil (tidak standar)." },
    { tag: "Karakter", q: "Header fungsi islower, isdigit, toupper?", a: "ctype.h (C++: cctype)." },
    { tag: "Karakter", q: "Nilai balik isdigit jika benar?", a: "Bukan nol." },
    { tag: "Matematik", q: "Header sqrt dan pow?", a: "math.h (C++: cmath)." },
    { tag: "Prototipe", q: "Apa itu prototipe fungsi?", a: "Pendeklarasian fungsi: tipe_fungsi nama_fungsi(parameter); diakhiri titik koma." },
    { tag: "Parameter", q: "Parameter formal vs aktual?", a: "Formal: di daftar parameter definisi fungsi. Aktual: yang dipakai saat pemanggilan." },
    { tag: "Variabel", q: "Variabel global, lokal, static?", a: "Global: di luar fungsi • Lokal: di dalam fungsi • Static: nilainya dipertahankan walau keluar dari blok." },
    { tag: "Rekursi", q: "Jejak factorial(4)?", a: "4 × 3 × 2 × 1 × factorial(0)=1 → 24." }
  ],
  quiz: [
    Q("Fungsi merupakan bagian program untuk mengerjakan tugas tertentu yang letaknya…", ["Terpisah dari program yang memanggilnya", "Selalu di dalam main", "Di file header saja", "Di akhir program saja"], 0, "Definisi slide P12."),
    Q("Dalam setiap program bahasa C, minimal terdapat satu fungsi yaitu…", ["main()", "printf()", "scanf()", "return()"], 0, "main wajib ada."),
    Q("Keuntungan fungsi: program mudah dibaca disebut…", ["Readability", "Reusability", "Portability", "Security"], 0, "Reusability = dapat digunakan kembali."),
    Q("Fungsi strcpy() digunakan untuk…", ["Menyalin string asal ke variabel tujuan", "Menghitung panjang string", "Menggabungkan dua string", "Mengubah ke kapital"], 0, "strcpy(var_tujuan, string_asal)."),
    Q("Fungsi untuk menambahkan string sumber ke bagian akhir string tujuan adalah…", ["strcat()", "strcpy()", "strlen()", "strupr()"], 0, "strcat(tujuan, sumber)."),
    Q("Fungsi untuk mengubah setiap huruf menjadi huruf kecil semua adalah…", ["strlwr()", "strupr()", "toupper()", "isupper()"], 0, "strlwr = lower."),
    Q("Fungsi operasi string tersimpan dalam header file…", ["string.h", "ctype.h", "math.h", "stdio.h"], 0, "Fungsi karakter di ctype.h, matematik di math.h."),
    Q("Fungsi isdigit() menghasilkan nilai benar (bukan nol) jika…", ["Karakter merupakan sebuah digit", "Karakter huruf kecil", "Karakter huruf kapital", "Karakter spasi"], 0, "'0' sampai '9'."),
    Q("Fungsi untuk mengubah huruf kecil menjadi huruf kapital adalah…", ["toupper()", "tolower()", "islower()", "strlwr()"], 0, "Per karakter."),
    Q("Hasil pow(3, 5) adalah…", ["243", "15", "125", "8"], 0, "3⁵ = 243 (contoh output slide: 243.00)."),
    Q("Bentuk umum pendeklarasian (prototipe) fungsi adalah…", ["tipe_fungsi nama_fungsi(parameter_fungsi);", "nama_fungsi tipe_fungsi;", "tipe_fungsi nama_fungsi(parameter_fungsi) { }", "call nama_fungsi;"], 0, "Prototipe diakhiri titik koma."),
    Q("Pada int jumlah(int x, int y) { return (x+y); }, x dan y disebut…", ["Parameter formal", "Parameter aktual", "Variabel global", "Variabel static"], 0, "Ada di daftar parameter definisi."),
    Q("Pada c = jumlah(a, b);, a dan b disebut…", ["Parameter aktual", "Parameter formal", "Prototipe", "Variabel static"], 0, "Dipakai saat pemanggilan."),
    Q("Variabel yang dideklarasikan di luar fungsi disebut…", ["Variabel global", "Variabel lokal", "Variabel static", "Parameter"], 0, "Bisa dipakai semua fungsi."),
    Q("Variabel yang nilainya tetap dipertahankan walaupun prosesnya telah keluar dari bloknya disebut…", ["Variabel static", "Variabel lokal", "Variabel global", "Parameter aktual"], 0, "static long int fakto = 1;"),
    Q("Contoh slide: faktorial(n) dengan static long int fakto = 1; dipanggil untuk i = 1..4. Hasil akhirnya…", ["24", "4", "10", "1"], 0, "fakto: 1, 2, 6, 24."),
    Q("Jika kata static dihapus dari contoh tersebut, hasil akhirnya menjadi…", ["4", "24", "0", "Error"], 0, "fakto selalu mulai dari 1, jadi hanya 1 × 4."),
    Q("Fungsi rekursif adalah fungsi yang…", ["Memanggil dirinya sendiri", "Memanggil main", "Tidak punya return", "Selalu static"], 0, "Contoh: factorial(N-1)."),
    Q("factorial(4) dengan definisi slide menghasilkan…", ["24", "10", "16", "4"], 0, "4 × 3 × 2 × 1 × 1.")
  ],
  ringkasan: `*RANGKUMAN P12 ALGORITMA & PEMROGRAMAN: FUNGSI PUSTAKA & PARAMETER*
🏠 Setiap program minimal punya main() • manfaat: readability + reusability
📚 String (string.h): strcpy, strlen, strcat, strupr, strlwr
🔤 Karakter (ctype.h): islower, isupper, isdigit (bukan nol = benar), tolower, toupper
➗ Matematik (math.h): sqrt, pow (3⁵ = 243)
📝 Prototipe: int jumlah(int a, int b);  ← titik koma
🎯 Formal = di definisi (x, y) • Aktual = saat dipanggil (a, b), nilainya disalin
🌍 Global di luar fungsi • 🏠 Lokal di dalam • 🧊 Static nilainya bertahan (faktorial 1,2,6,24)
🛠️ Slide memakai C: printf/scanf/getch, main() tanpa int`
};
