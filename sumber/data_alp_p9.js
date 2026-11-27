// Algoritma dan Pemrograman — Pertemuan 9: Array (menuju UAS)
// Sumber: slide "Pertemuan 8 9 - Array" dan Tatap Maya 5 (Array). Bagian bertanda ➕ bukan dari modul.
const { c, tip, code, tbl, ex, Q, lab } = require("./alp_uas_util.js");
const LAB = require("./lab_alp_uas.js");

module.exports = {
  id: "p9", nomor: 9, judul: "Array", ujian: "UAS",
  hero: {
    badge: "Dosen: Muhamad Rosidin, M.Kom.",
    title: "Satu Nama, Banyak Data",
    text: "Array menyimpan banyak data <strong>bertipe sama</strong> secara berurutan, dibedakan oleh <strong>indeks yang dimulai dari 0</strong>. Pertemuan ini membahas deklarasi, inisialisasi, akses elemen, ukuran di memori, serta kenapa menyalin dan menjumlahkan array harus memakai <strong>loop</strong>."
  },
  cheatsheet: [
    tip("Ide besarnya dalam satu kalimat", "Array = kumpulan elemen <strong>bertipe sama</strong> dengan <strong>satu nama</strong>; elemen dipilih dengan indeks <strong>0 sampai ukuran − 1</strong>, dan diproses <strong>satu per satu</strong> (biasanya dengan for)."),
    tbl("Sintaks Inti", ["Keperluan", "Kode", "Catatan"], [
      ["Deklarasi", "`int angka[5];`", "Ukuran tetap, isi belum ditentukan"],
      ["Deklarasi + inisialisasi", "`int angka[5] = {10, 20, 30, 40, 50};`", "Nilai kurang → sisanya 0"],
      ["Mengisi elemen", "`angka[1] = 100;`", "Elemen kedua"],
      ["Membaca elemen", "`X = angka[2];`  `Y = angka[X+1];`", "Indeks boleh ekspresi"],
      ["Mengunjungi semua", "`for (i = 0; i < 5; i++) cout << angka[i];`", "Mulai 0, berhenti sebelum 5"],
      ["Menyalin", "`for (i = 0; i < 5; i++) a[i] = b[i];`", "`a = b;` salah"],
      ["Ukuran byte", "`sizeof(angka)` → 20", "Byte tipe × jumlah elemen"]
    ], [
      { label: "Batas indeks", target: "row", row: 3, title: "Jangan lewat ukuran − 1", text: "<code>int larik[10];</code>: <code>larik[9]</code> elemen terakhir, <code>larik[10]</code> salah. Compiler tidak menolaknya, jadi harus dijaga sendiri." }
    ], "Interaktif 1 • Sintaks"),
    tbl("Byte Total = Byte Tipe × Jumlah Elemen", ["Deklarasi", "Byte per elemen", "Total"], [
      ["`char karakter[5];`", "1", "5 byte"], ["`unsigned short int arrayku[5];`", "2", "10 byte"], ["`int angka[5];`", "4", "20 byte"], ["`float pecahan[5];`", "4", "20 byte"], ["`double d[5];`", "8", "40 byte"]
    ], null, "Interaktif 2 • Memori"),
    code("operasi-array.cpp", `int a[5], b[5] = {1, 2, 3, 4, 5};
for (int i = 0; i < 5; i++) a[i] = b[i];          // salin (bukan a = b)

int x[5] = {1, 3, 5, 7, 9}, y[5] = {2, 4, 6, 8, 10}, z[5];
for (int j = 0; j < 5; j++) z[j] = y[j] + x[j];   // {3, 7, 11, 15, 19}`, "Dua masalah di slide: assignment dan operasi vektor. Keduanya diselesaikan per elemen dengan for.", "Pola Wajib Hafal", "Interaktif 3 • Kode"),
    tip("Catatan modul", `Tatap Maya 5 menulis nama array dengan ${c("$")} di depan (${c("$angka")}) dan menyebut elemen boleh "tidak sama" tipenya. Di C++ keduanya keliru: nama ditulis tanpa $, dan semua elemen array bertipe sama. Penjelasan lengkap di tab Materi.`, "warn")
  ],
  simulator: [
    lab(LAB.P9, "Array Langkah demi Langkah", "Tiga program dari slide: menyalin array, menjumlahkan vektor, dan akses di luar batas. Tebak dulu, lalu tekan <strong>Langkah Berikutnya</strong> dan perhatikan isi array berubah satu elemen per putaran."),
    ex("Permainan Interaktif 1 • Benar atau Salah?", "int larik[10]; Pengaksesan Mana yang Sah?", ["Kode", "Status"], ["Benar", "Salah"], [
      ["larik[0] = 5;", "Benar"], ["larik[9] = larik[2];", "Benar"], ["larik[10] = 2;", "Salah"], ["larik[-1] = 0;", "Salah"], ["larik[3+4] = 1;", "Benar"], ["int a[3] = {1, 2, 3, 4};", "Salah"], ["int a[5], b[5]; a = b;", "Salah"], ["int a[] = {7, 8, 9};", "Benar"]
    ]),
    ex("Permainan Interaktif 2 • Hitung Ukuran", "Berapa Byte Totalnya? (pakai tabel modul)", ["Deklarasi", "Byte total"], ["5", "10", "20", "40", "80"], [
      ["char kode[5];", "5"], ["unsigned short int arrayku[5];", "10"], ["int angka[5];", "20"], ["float pecahan[5];", "20"], ["double nilai[10];", "80"], ["long long x[5];", "40"]
    ]),
    ex("Permainan Interaktif 3 • Tebak Isi", "int a[5] = {4, 9, 2, 7, 1}; Berapa Hasilnya?", ["Ekspresi", "Hasil"], ["1", "2", "4", "7", "9", "11"], [
      ["a[0]", "4"], ["a[4]", "1"], ["a[2] + a[1]", "11"], ["a[a[2]]", "2"], ["a[a[4] + 2]", "7"]
    ])
  ],
  flashcards: [
    { tag: "Konsep", q: "Apa itu array?", a: "Kumpulan elemen data bertipe sama yang dipanggil dengan nama yang sama, dibedakan oleh indeks." },
    { tag: "Indeks", q: "Indeks array dimulai dari?", a: "0. Indeks terakhir = ukuran − 1." },
    { tag: "Deklarasi", q: "Arti unsigned short int arrayku[5];", a: "Array arrayku berisi 5 elemen bertipe unsigned short int (masing-masing 2 byte)." },
    { tag: "Inisialisasi", q: "Kapan inisialisasi array dilakukan?", a: "Saat deklarasi variabel, dengan kurung kurawal: int a[4] = {2,4,6,8};" },
    { tag: "Memori", q: "Rumus byte total array?", a: "Jumlah byte tipe data × jumlah elemen." },
    { tag: "Memori", q: "Bagaimana array disimpan di memori?", a: "Berurutan (bersebelahan) mulai indeks 0; elemen pertama menempati alamat pertama." },
    { tag: "Akses", q: "Kenapa a = b; salah untuk array?", a: "Elemen array hanya bisa diakses satu per satu; salin dengan loop a[i] = b[i]." },
    { tag: "Akses", q: "int larik[10]; mana yang salah: larik[9] atau larik[10]?", a: "larik[10]. Indeks sah 0–9." },
    { tag: "sizeof", q: "sizeof(angka) untuk int angka[5]?", a: "20 byte: ukuran seluruh array, bukan satu elemen." },
    { tag: "Alamat", q: "Operator untuk mengambil alamat memori elemen?", a: "& (address of), misalnya &angka[0]." },
    { tag: "Vektor", q: "Cara menjumlahkan vektor c = a + b?", a: "for (j = 0; j < 5; j++) c[j] = b[j] + a[j];" },
    { tag: "Ukuran", q: "Bisakah ukuran array diubah setelah dibuat?", a: "Tidak. Ukuran ditentukan saat pembuatan." }
  ],
  quiz: [
    Q("Array adalah…", ["Kumpulan beberapa elemen data dengan tipe yang sama dan dipanggil dengan nama yang sama", "Kumpulan variabel berbeda tipe dalam satu record", "Fungsi yang memanggil dirinya sendiri", "Tipe data untuk satu karakter"], 0, "Definisi slide P8–9. Kumpulan berbeda tipe adalah struct."),
    Q("Indeks elemen pertama array di C++ adalah…", ["0", "1", "-1", "Bebas ditentukan"], 0, "Indeks selalu dimulai dari 0."),
    Q("unsigned short int arrayku[5]; memiliki elemen dengan indeks…", ["0 sampai 4", "1 sampai 5", "0 sampai 5", "1 sampai 4"], 0, "5 elemen → 0..4."),
    Q("Jika unsigned short int berukuran 2 byte, ukuran unsigned short int arrayku[5]; adalah…", ["10 byte", "5 byte", "2 byte", "7 byte"], 0, "2 × 5 = 10 byte."),
    Q("unsigned int myarray[4] = {2,4,6,8}; Elemen ke-2 (indeks 2) berisi…", ["6", "4", "8", "2"], 0, "Indeks 0 = 2, 1 = 4, 2 = 6, 3 = 8."),
    Q("int larik[10]; Pengaksesan yang SALAH adalah…", ["larik[10] = 2;", "larik[8] = 1;", "larik[9] = larik[2];", "larik[0] = 5;"], 0, "Indeks terbesar 9."),
    Q("int array1[5]; int array2[5] = {1,2,3,4,5}; Pernyataan yang SALAH adalah…", ["array1 = array2;", "array1[4] = array2[0];", "array1[0] = array2[4];", "array1[2] = array2[2];"], 0, "Array tidak bisa di-assign sekaligus."),
    Q("Cara menyalin seluruh elemen b ke a (5 elemen) adalah…", ["for (i = 0; i < 5; i++) a[i] = b[i];", "a = b;", "a[5] = b[5];", "copy(a) = b;"], 0, "Per elemen dengan loop for."),
    Q("a = [1,3,5,7,9], b = [2,4,6,8,10]. Hasil c = b + a per elemen adalah…", ["[3, 7, 11, 15, 19]", "[1, 3, 5, 7, 9, 2, 4, 6, 8, 10]", "[55]", "[2, 4, 6, 8, 10]"], 0, "Elemen dengan indeks sama dijumlahkan."),
    Q("Array disimpan di memori secara…", ["Berurutan, mulai dari indeks 0", "Acak", "Dari indeks terakhir", "Terpisah di beberapa file"], 0, "Bersebelahan."),
    Q("Jika int berukuran 4 byte dan angka[0] berada di alamat 1000, alamat angka[3] adalah…", ["1012", "1003", "1004", "1016"], 0, "1000 + 3 × 4."),
    Q("Fungsi untuk mengetahui ukuran memori array adalah…", ["sizeof", "strlen", "length", "size"], 0, "sizeof(array) = ukuran seluruh array."),
    Q("Operator untuk mencetak alamat memori elemen array adalah…", ["& (address of)", "* (bintang)", "% (modulus)", "# (pagar)"], 0, "cout << &angka[0];"),
    Q("Menurut tabel modul, ukuran tipe double adalah…", ["8 byte", "4 byte", "2 byte", "1 byte"], 0, "char 1, short 2, int 4, float 4, long 8, long long 8, double 8."),
    Q("Ukuran array setelah dibuat…", ["Tidak dapat diubah", "Bertambah otomatis", "Bisa dikurangi dengan delete", "Selalu 10"], 0, "Ditentukan saat pembuatan."),
    Q("Bagian array yang merupakan nomor unik tiap elemen dan dimulai dari 0 disebut…", ["Indeks", "Elemen", "Ukuran", "Tipe data"], 0, "Lima bagian: indeks, elemen, ukuran, tipe data, nama array."),
    Q("int a[5] = {10, 20}; Nilai a[4] adalah…", ["0", "20", "10", "Tidak menentu"], 0, "➕ Nilai yang tidak disebut diisi 0."),
    Q("string nama[3] = {\"Ani\", \"Budi\", \"Cici\"}; for (int i = 0; i < 3; i++) cout << nama[i] << \" \"; mencetak…", ["Ani Budi Cici", "Ani", "Cici Budi Ani", "nama nama nama"], 0, "Loop mengunjungi indeks 0, 1, 2.")
  ],
  ringkasan: `*RANGKUMAN P9 ALGORITMA & PEMROGRAMAN: ARRAY*
📦 Array = banyak data bertipe SAMA, satu nama, indeks mulai 0
🧾 int angka[5] = {10,20,30,40,50}; → indeks 0–4
📏 Byte total = byte tipe × jumlah elemen (short[5] = 10, int[5] = 20)
🧠 Disimpan berurutan di memori; &angka[0] = alamat, sizeof(angka) = 20
⛔ larik[10] pada int larik[10] → di luar batas (compiler tidak menolak!)
🔁 a = b; dan c = a + b; tidak bisa → pakai for per elemen
🛠️ Koreksi modul: nama array tanpa $, elemen harus satu tipe`
};
