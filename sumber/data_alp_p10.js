// Algoritma dan Pemrograman — Pertemuan 10: Struct C++ (menuju UAS)
// Sumber: slide "Pertemuan 10 - Struct" dan Tatap Maya 6 (Struct). Bagian bertanda ➕ bukan dari modul.
const { tip, code, tbl, ex, Q, lab } = require("./alp_uas_util.js");
const LAB = require("./lab_alp_uas.js");

module.exports = {
  id: "p10", nomor: 10, judul: "Struct C++", ujian: "UAS",
  hero: {
    badge: "Dosen: Muhamad Rosidin, M.Kom.",
    title: "Satu Record, Banyak Tipe",
    text: "<strong>struct</strong> membuat tipe data baru yang mengelompokkan variabel <strong>berbeda tipe</strong> (nama, NIM, nilai) menjadi satu record. Pertemuan ini membahas deklarasi, <strong>object</strong>, operator titik, lima cara <strong>inisialisasi</strong>, dan alternatif struct."
  },
  cheatsheet: [
    tip("Ide besarnya dalam satu kalimat", "struct = <strong>rancangan</strong> tipe data berisi beberapa member; <strong>object</strong> dibuat dari rancangan itu, dan member-nya diakses dengan <strong>titik</strong>: <code>budi.nama</code>."),
    code("struct-inti.cpp", `struct Mahasiswa {          // nama struct (tipe baru)
    string nama;            // member / field
    string NIM;
    float nilai;
};                          // titik koma wajib

Mahasiswa mhs1;             // object
mhs1.nama = "John Doe";     // operator titik
Mahasiswa mhs2 = {"Ani", "123", 80};   // initializer list
Mahasiswa mhs3{"Budi", "456", 75};     // uniform initialization`, "Struct baru memakan memori setelah object dibuat.", "Bentuk Umum", "Interaktif 1 • Sintaks"),
    tbl("Lima Cara Inisialisasi", ["Cara", "Ciri", "Berlaku untuk"], [
      ["Isi per member setelah deklarasi", "`mhs1.nama = \"John Doe\";`", "Object itu"],
      ["Non-static member initialization", "Nilai ditulis di dalam struct: `string nama = \"kosong\";`", "Semua object"],
      ["Initializer list", "`= {…}` saat membuat object", "Object itu"],
      ["Uniform initialization", "`{…}` <strong>tanpa =</strong> (C++11)", "Object itu"],
      ["Konstruktor", "Fungsi bernama sama dengan struct", "Object itu"]
    ], [
      { label: "C++11 vs C++14", target: "row", row: 1, title: "Gabung dua cara", text: "Non-static member initialization + initializer list/uniform: ditolak di C++11, boleh sejak C++14." },
      { label: "Kosongkan ujung", target: "row", row: 2, title: "Hanya member paling kanan", text: "Member yang tidak diberi nilai harus yang paling bawah/kanan; isinya 0 atau string kosong." }
    ], "Interaktif 2 • Inisialisasi"),
    tbl("Struct dan Alternatifnya", ["", "Beda utama"], [
      ["array", "Tipe sama, diakses indeks"],
      ["class", "Akses bawaan private (struct: public); ada inheritance, polymorphism"],
      ["tuple", "Tipe berbeda tanpa nama, diakses get&lt;index&gt;"],
      ["map (dictionary)", "Pasangan key–value, diakses dengan key"],
      ["enum", "Hanya nilai konstan bernama"]
    ], null, "Interaktif 3 • Perbandingan")
  ],
  simulator: [
    lab(LAB.P10, "Object Struct Langkah demi Langkah", "Contoh program slide. Perhatikan kapan member mulai ada di memori dan bahwa setiap object menyimpan nilainya sendiri."),
    ex("Permainan Interaktif 1 • Cara Inisialisasi", "Cara Apa yang Dipakai?", ["Kode", "Cara"], ["Isi per member", "Non-static member", "Initializer list", "Uniform", "Konstruktor"], [
      ["siswa budi = {1, \"Budi Januar\", 75.5};", "Initializer list"],
      ["siswa tono{2, \"Tono Laksono\", 89.9};", "Uniform"],
      ["struct siswa { int no_induk = 0; string nama = \"kosong\"; };", "Non-static member"],
      ["Mahasiswa mhs1(\"John Doe\", \"12345678\", \"Teknik Informatika\");", "Konstruktor"],
      ["Mahasiswa mhs1; mhs1.nama = \"John Doe\";", "Isi per member"]
    ]),
    ex("Permainan Interaktif 2 • Sah atau Error?", "struct siswa { int no_induk; string nama; float nilai; };", ["Kode", "Status"], ["Sah", "Error"], [
      ["siswa budi; budi.nilai = 75.5;", "Sah"],
      ["siswa.nama = \"Ani\";", "Error"],
      ["siswa ani = {3, \"Ani\"};", "Sah"],
      ["siswa ani = {\"Ani\", 3, 80};", "Error"],
      ["siswa a, b; a = b;", "Sah"],
      ["siswa a, b; if (a == b) {}", "Error"],
      ["siswa budi; cout << budi;", "Error"],
      ["siswa kelas[3]; kelas[0].nama = \"Ani\";", "Sah"]
    ])
  ],
  flashcards: [
    { tag: "Konsep", q: "Apa itu struct?", a: "Keyword C/C++ untuk membuat tipe data baru yang mengelompokkan variabel dengan tipe berbeda." },
    { tag: "Istilah", q: "Apa itu member (field)?", a: "Variabel yang dideklarasikan di dalam struct." },
    { tag: "Istilah", q: "Apa itu object struct?", a: "Variabel yang dibuat dengan struct sebagai tipenya, misalnya siswa budi;" },
    { tag: "Akses", q: "Operator untuk mengakses member?", a: "Titik (member access operator): budi.nama" },
    { tag: "Sintaks", q: "Tanda wajib setelah kurung tutup struct?", a: "Titik koma: };" },
    { tag: "Sintaks", q: "Di mana nama_object bisa ditulis saat deklarasi?", a: "Setelah kurung tutup, sebelum titik koma: } adi, bambang;" },
    { tag: "Inisialisasi", q: "Non-static member initialization?", a: "Nilai awal ditulis di dalam rancangan struct; berlaku untuk semua object." },
    { tag: "Inisialisasi", q: "Beda initializer list dan uniform initialization?", a: "Uniform tidak memakai tanda = (siswa tono{…};), berasal dari C++11." },
    { tag: "Inisialisasi", q: "Member mana yang boleh tidak diberi nilai di initializer list?", a: "Member paling bawah/kanan." },
    { tag: "Alternatif", q: "Beda struct dan class menurut modul?", a: "Akses bawaan struct public, class private." },
    { tag: "Alternatif", q: "Header untuk tuple dan map di C++?", a: "<tuple> dan <map>." }
  ],
  quiz: [
    Q("struct digunakan untuk…", ["Mengelompokkan variabel dengan tipe data yang berbeda", "Menyimpan banyak data bertipe sama", "Mengulang perintah", "Memilih salah satu cabang"], 0, "Data bertipe sama = array."),
    Q("Variabel yang dideklarasikan di dalam struct disebut…", ["Member (field)", "Object", "Indeks", "Parameter"], 0, "Juga disebut field."),
    Q("Operator untuk mengakses member struct dari sebuah object adalah…", ["Titik ( . )", "Panah ( -> )", "Titik dua ( : )", "Ampersand ( & )"], 0, "Member access operator."),
    Q("Penulisan deklarasi struct yang benar adalah…", ["struct siswa { int no; string nama; };", "struct siswa ( int no; string nama; );", "siswa struct { int no; string nama; }", "struct { siswa int no; };"], 0, "Kurung kurawal dan titik koma di akhir."),
    Q("struct siswa { … } adi, bambang; Kata adi dan bambang adalah…", ["Object yang dideklarasikan di dalam deklarasi struct", "Member struct", "Nama struct", "Tipe data"], 0, "Object diletakkan setelah kurung tutup, sebelum titik koma."),
    Q("Sebelum ada object, member struct…", ["Tidak bisa digunakan, karena struct hanya rancangan", "Bisa langsung diisi", "Otomatis bernilai 0", "Menjadi variabel global"], 0, "Memori baru ada saat object dibuat."),
    Q("siswa budi; budi.nilai = 75.5; Pernyataan budi.nilai = 75.5 berarti…", ["Mengisi member nilai milik object budi", "Membuat struct baru bernama nilai", "Membandingkan budi dengan 75.5", "Mendeklarasikan budi"], 0, "object.member."),
    Q("Inisialisasi dengan memberi nilai awal di saat mendirikan member di dalam struct disebut…", ["Non-static member initialization", "Initializer list", "Uniform initialization", "Konstruktor"], 0, "Berlaku ke semua object."),
    Q("siswa budi = {1, \"Budi Januar\", 75.5}; adalah contoh…", ["Initializer list", "Uniform initialization", "Non-static member", "Konstruktor"], 0, "Memakai tanda =."),
    Q("siswa tono{2, \"Tono Laksono\", 89.9}; adalah contoh…", ["Uniform initialization", "Initializer list", "Non-static member", "Assignment per member"], 0, "Tanpa tanda =, sejak C++11."),
    Q("Pada initializer list, member yang boleh tidak diberi nilai awal adalah…", ["Member paling bawah/kanan", "Member paling atas", "Member di tengah", "Semua boleh dilewati sembarang"], 0, "Sama seperti argumen bawaan fungsi."),
    Q("Menggabungkan non-static member initialization dengan initializer list mulai diperbolehkan sejak…", ["C++14", "C++11", "C++98", "Tidak pernah boleh"], 0, "Di C++11 compiler menolaknya."),
    Q("Perbedaan utama struct dan class menurut modul adalah…", ["Akses default struct public, class private", "Struct tidak bisa berisi string", "Class tidak bisa punya member", "Struct hanya untuk angka"], 0, "Bisa diubah dengan public/private."),
    Q("Struct yang memiliki fungsi bernama sama dengan struct untuk mengisi member saat object dibuat memakai…", ["Konstruktor", "Destruktor", "Prototipe", "Sentinel"], 0, "Mahasiswa mhs1(\"John Doe\", …);"),
    Q("Alternatif struct yang menyimpan pasangan key-value adalah…", ["Dictionary (map)", "Tuple", "Enum", "Array"], 0, "C++: <map> atau unordered_map."),
    Q("Elemen tuple di C++ diakses dengan…", ["get<index>", "Nama member", "Operator titik", "Key"], 0, "Header <tuple>."),
    Q("Contoh data yang paling cocok disimpan dengan struct adalah…", ["Data satu mahasiswa: nama, NIM, nilai, jurusan", "40 nilai ujian", "Deret angka 1 sampai 100", "Satu karakter"], 0, "Beberapa data berbeda tipe milik satu hal.")
  ],
  ringkasan: `*RANGKUMAN P10 ALGORITMA & PEMROGRAMAN: STRUCT*
🧩 struct = tipe data baru berisi member berbeda tipe (satu record)
✍️ struct siswa { int no_induk; string nama; float nilai; };  ← titik koma wajib
👤 Object: siswa budi;  member: budi.nama (operator titik)
🎯 Inisialisasi: per member • non-static member (di rancangan, untuk semua) • initializer list = {…} • uniform {…} tanpa = • konstruktor
⚖️ Boleh kosongkan member paling kanan saja; gabung non-static + list boleh sejak C++14
🔁 Alternatif: class (default private), array (tipe sama), tuple (get<i>), map (key), enum (konstanta)`
};
