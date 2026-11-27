// Algoritma dan Pemrograman — Pertemuan 11: Fungsi (Dasar dan Rekursi) (menuju UAS)
// Sumber: modul "Fungsi" dan slide "Menguasai Fungsi C++: Dari Logika Dasar hingga Rekursi". Bagian bertanda ➕ bukan dari modul.
const { tip, code, tbl, ex, Q, lab } = require("./alp_uas_util.js");
const LAB = require("./lab_alp_uas.js");

module.exports = {
  id: "p11", nomor: 11, judul: "Fungsi: Dasar dan Rekursi", ujian: "UAS",
  hero: {
    badge: "Dosen: Muhamad Rosidin, M.Kom.",
    title: "Tulis Sekali, Panggil Berkali-kali",
    text: "Fungsi = blok kode bernama dengan <strong>input (parameter)</strong>, <strong>proses</strong>, dan <strong>output (nilai kembali)</strong>. Dibahas anatomi fungsi, empat bentuk deklarasi, fungsi <strong>built-in</strong>, dan <strong>rekursi</strong> (factorial, fibonacci, stack overflow)."
  },
  cheatsheet: [
    tip("Ide besarnya dalam satu kalimat", "Fungsi menerima <strong>parameter</strong>, menjalankan <strong>tubuh</strong>, lalu <strong>return</strong> hasil bertipe sesuai <strong>tipe pengembalian</strong> (void = tanpa hasil). Fungsi <strong>rekursif</strong> memanggil dirinya sendiri dan wajib punya <strong>base case</strong>."),
    code("anatomi.cpp", `float calculateArea(int radius) {   // tipe, nama, parameter
    float area = 3.14159 * radius * radius;   // tubuh
    return area;                     // pengembalian nilai
}

int factorial(int n) {
    if (n == 0) return 1;            // base case (rem)
    return n * factorial(n - 1);     // recursive case + call (gas)
}`, "Hafalkan lima bagian anatomi dan tiga bagian rekursi.", "Anatomi & Rekursi", "Interaktif 1 • Kode"),
    tbl("Empat Bentuk Deklarasi", ["Bentuk", "Contoh"], [
      ["Tanpa nilai balik, tanpa parameter", "`void printHello()`"],
      ["Mengembalikan nilai, tanpa parameter", "`int getAge()`"],
      ["Mengembalikan nilai, menerima parameter", "`float calculateArea(int radius)`"],
      ["Tanpa nilai balik, menerima parameter", "`void printFullName(string f, string l)`"]
    ], null, "Interaktif 2 • Deklarasi"),
    tbl("Built-in di Modul", ["Fungsi", "Kegunaan", "Contoh"], [
      ["`cout` / `cin`", "Output layar / input keyboard", "`cout << \"Hai\";`"],
      ["`strcpy` / `strlen`", "Salin string / panjang string", "`strlen(\"Hello\")` → 5"],
      ["`abs`", "Nilai absolut", "`abs(-15)` → 15"],
      ["`sqrt`", "Akar kuadrat", "`sqrt(16)` → 4"],
      ["`pow`", "Pangkat", "`pow(2, 3)` → 8"],
      ["`rand` / `round` / `max`", "Acak / bulatkan / terbesar dari dua", "`round(2.5)` → 3, `max(4, 9)` → 9"]
    ], null, "Interaktif 3 • Built-in"),
    tbl("Iterasi vs Rekursi", ["", "Iterasi", "Rekursi"], [
      ["Mengulang dengan", "Loop", "Memanggil diri sendiri"],
      ["Berhenti saat", "Kondisi false", "Base case"],
      ["Memori", "Hemat", "Berisiko stack overflow"],
      ["Cocok untuk", "Loop sederhana", "Tree/graph, logika bercabang"]
    ], null, "Interaktif 4 • Perbandingan")
  ],
  simulator: [
    lab(LAB.P11, "Rekursi Langkah demi Langkah", "Lihat <strong>tumpukan</strong> panggilan bertambah saat turun menuju base case, lalu dibongkar saat hasil dikembalikan."),
    ex("Permainan Interaktif 1 • Bagian Rekursi", "Baris Ini Bagian Apa?", ["Baris (fungsi factorial / fibonacci)", "Bagian"], ["Base case", "Recursive case", "Bukan rekursi"], [
      ["if (n == 0) return 1;", "Base case"],
      ["return n * factorial(n-1);", "Recursive case"],
      ["if (n <= 1) return n;", "Base case"],
      ["return fibonacci(n-1) + fibonacci(n-2);", "Recursive case"],
      ["for (int i = 0; i <= n; i++) cout << i;", "Bukan rekursi"]
    ]),
    ex("Permainan Interaktif 2 • Hasil Fungsi", "Berapa Hasilnya?", ["Ekspresi", "Hasil"], ["0", "3", "4", "5", "6", "8", "13", "15", "24"], [
      ["abs(-15)", "15"], ["sqrt(16)", "4"], ["pow(2, 3)", "8"], ["factorial(4)", "24"], ["factorial(3)", "6"], ["fibonacci(4)", "3"], ["fibonacci(7)", "13"], ["strlen(\"Hello\")", "5"], ["max(3, 0)", "3"]
    ]),
    ex("Permainan Interaktif 3 • Bentuk Fungsi", "Bentuk Deklarasinya?", ["Kepala fungsi", "Bentuk"], ["void, tanpa parameter", "Bernilai, tanpa parameter", "Bernilai, berparameter", "void, berparameter"], [
      ["void printHello()", "void, tanpa parameter"], ["int getAge()", "Bernilai, tanpa parameter"], ["float calculateArea(int radius)", "Bernilai, berparameter"], ["void printFullName(string firstName, string lastName)", "void, berparameter"], ["int addNumbers(int a, int b)", "Bernilai, berparameter"], ["void printString(string text)", "void, berparameter"]
    ])
  ],
  flashcards: [
    { tag: "Konsep", q: "Apa itu fungsi?", a: "Bagian kode program yang dapat digunakan berulang-ulang untuk melakukan tugas tertentu." },
    { tag: "Konsep", q: "Dua manfaat fungsi menurut slide?", a: "Efisiensi (mengurangi duplikasi kode) dan keterbacaan (mudah dibaca dan dimodifikasi)." },
    { tag: "Anatomi", q: "Lima bagian anatomi fungsi?", a: "Tipe data pengembalian, nama fungsi, parameter, tubuh fungsi, pengembalian nilai (return)." },
    { tag: "Anatomi", q: "Arti void?", a: "Fungsi tidak mengembalikan nilai." },
    { tag: "Built-in", q: "Contoh fungsi built-in di modul?", a: "cout, cin, strcpy, strlen, abs, sqrt, pow, rand, round, max." },
    { tag: "Rekursi", q: "Apa itu fungsi rekursif?", a: "Fungsi yang memanggil dirinya sendiri untuk menyelesaikan masalah." },
    { tag: "Rekursi", q: "Apa itu base case?", a: "Kondisi yang menghentikan rekursi dan mengembalikan hasil (\"rem darurat\")." },
    { tag: "Rekursi", q: "Apa itu recursive case?", a: "Kondisi saat fungsi memanggil dirinya sendiri dengan parameter berbeda (\"gas\")." },
    { tag: "Rekursi", q: "Base case factorial dan fibonacci di modul?", a: "factorial: if (n == 0) return 1;  fibonacci: if (n <= 1) return n;" },
    { tag: "Rekursi", q: "Apa itu stack overflow?", a: "Memori stack penuh karena rekursi tanpa henti (tanpa base case); program crash." },
    { tag: "Lanjutan", q: "Fungsi inline, friend, virtual, template?", a: "inline: disalin compiler agar cepat • friend: akses private class • virtual: bisa di-override • template: untuk berbagai tipe." },
    { tag: "Lanjutan", q: "Fungsi yang dijalankan pertama kali?", a: "main()." }
  ],
  quiz: [
    Q("Fungsi adalah…", ["Bagian dari kode program yang dapat digunakan berulang-ulang untuk melakukan tugas tertentu", "Kumpulan data bertipe sama", "Tipe data bentukan", "Perintah untuk mengulang"], 0, "Definisi modul."),
    Q("Kata kunci untuk fungsi yang tidak mengembalikan nilai adalah…", ["void", "int", "return", "null"], 0, "void printHello()."),
    Q("Pada float calculateArea(int radius), bagian int radius disebut…", ["Parameter", "Tipe pengembalian", "Nama fungsi", "Tubuh fungsi"], 0, "Data input."),
    Q("Pada float calculateArea(int radius), kata float menunjukkan…", ["Tipe data pengembalian", "Parameter", "Nama fungsi", "Nilai radius"], 0, "Menentukan jenis output."),
    Q("Fungsi int getAge() termasuk bentuk…", ["Mengembalikan nilai, tanpa parameter", "Tanpa nilai balik, tanpa parameter", "Mengembalikan nilai, menerima parameter", "Tanpa nilai balik, menerima parameter"], 0, "Empat arketipe deklarasi."),
    Q("Fungsi built-in untuk mengetahui panjang string adalah…", ["strlen", "strcpy", "sqrt", "pow"], 0, "strcpy untuk menyalin."),
    Q("Hasil pow(2, 3) adalah…", ["8", "6", "9", "5"], 0, "2³."),
    Q("Hasil abs(-15) adalah…", ["15", "-15", "0", "1"], 0, "Nilai absolut."),
    Q("Fungsi rekursif adalah fungsi yang…", ["Memanggil dirinya sendiri", "Tidak punya parameter", "Selalu bertipe void", "Dijalankan pertama kali"], 0, "Rekursi."),
    Q("Kondisi yang menghentikan rekursi disebut…", ["Base case", "Recursive case", "Recursive call", "Default case"], 0, "\"Rem darurat\"."),
    Q("Pada fungsi factorial modul, base case-nya adalah…", ["if (n == 0) return 1;", "return n * factorial(n-1);", "if (n <= 1) return n;", "for (i = 0; i < n; i++)"], 0, "Fibonacci: n <= 1."),
    Q("factorial(3) menghasilkan…", ["6", "3", "9", "1"], 0, "3 × 2 × 1 × 1."),
    Q("Program for (int i = 0; i < 10; i++) cout << fibonacci(i) << \" \"; mencetak…", ["0 1 1 2 3 5 8 13 21 34", "1 2 3 5 8 13 21 34 55 89", "1 1 2 3 5 8 13 21 34 55", "0 1 2 3 4 5 6 7 8 9"], 0, "fibonacci(0) = 0, fibonacci(1) = 1."),
    Q("Fungsi rekursif tanpa base case dapat menyebabkan…", ["Stack overflow", "Syntax error", "Output kosong yang aman", "Hasil 0"], 0, "Stack memori penuh, program crash."),
    Q("Dibanding rekursi, iterasi (looping) umumnya…", ["Lebih efisien memori", "Selalu lebih lambat", "Tidak bisa berhenti", "Butuh base case"], 0, "Slide: iterasi lebih efisien memori."),
    Q("Menurut slide, rekursi paling cocok untuk…", ["Struktur tree/graph", "Loop sederhana 1 sampai 10", "Mencetak satu baris", "Deklarasi variabel"], 0, "Iterasi untuk loop sederhana."),
    Q("Fungsi yang di-inline compiler saat kompilasi untuk mempercepat eksekusi disebut fungsi…", ["inline", "friend", "virtual", "template"], 0, "Tipe fungsi lanjutan."),
    Q("Fungsi yang dapat digunakan dengan tipe data berbeda-beda disebut fungsi…", ["template", "virtual", "inline", "main"], 0, "template <typename T>."),
    Q("Berapa kali fungsi fibonacci dipanggil untuk menghitung fibonacci(4) secara rekursif?", ["9", "4", "5", "8"], 0, "Lihat lab rekursi.")
  ],
  ringkasan: `*RANGKUMAN P11 ALGORITMA & PEMROGRAMAN: FUNGSI*
🧰 Fungsi = kode bernama, dipakai berulang • manfaat: efisiensi + keterbacaan
🦴 Anatomi: tipe kembalian • nama • (parameter) • { tubuh } • return
4️⃣ Bentuk: void f() • int f() • float f(int r) • void f(string a, string b)
📚 Built-in: cout, cin, strcpy, strlen, abs, sqrt, pow, rand, round, max
🔁 Rekursi = memanggil diri sendiri • base case (rem) • recursive case (gas) • recursive call
🧮 factorial(3) = 6 • fibonacci 0 1 1 2 3 5 8 13 21 34 • fib(4) = 9 panggilan
💥 Tanpa base case → stack overflow • iterasi hemat memori, rekursi untuk tree/graph
🧩 Lanjutan: inline, friend, virtual, template, main`
};
