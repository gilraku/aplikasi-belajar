// Dasar-dasar Sistem Informasi — Pertemuan 7: Pengelolaan Data & Informasi (sumber: modul BAB 7)
const HI = ["Field", "Record", "File", "Database"];
const PR = ["Data redundancy", "Data inconsistency", "Program-data dependence", "Lack of flexibility", "Poor security", "Lack of data sharing"];
const ROLE = ["System analyst", "Database administrator", "Operator", "Network specialist"];
const Q = [
  ["Di bawah ini adalah permasalahan pemrosesan file tradisional, KECUALI …", ["Data redundancy", "Data inconsistency", "Program-data dependence", "Lack of knowledge", "Poor security"], 3, "Masalah modul: redundancy & inconsistency, program-data dependence, lack of flexibility, poor security, lack of data sharing & availability. <em>(Latihan 2 modul no. 1)</em>", ["Ada.", "Ada.", "Ada.", "Benar, tidak ada.", "Ada."]],
  ["Seorang ahli dalam menjabarkan permasalahan yang terjadi di perusahaan berkaitan dengan sistem komputernya disebut …", ["System analyst", "Programmer", "Business analyst", "Network specialist", "Operator"], 0, "<em>(Latihan 2 no. 2)</em>", ["Benar.", "Menulis program.", "Tidak dibahas modul.", "Jaringan.", "Menjalankan komputer skala besar."]],
  ["Orang yang menjalankan komputer skala besar seperti server atau mainframe di pusat komputasi perusahaan disebut …", ["System analyst", "Programmer", "Operator", "Business analyst", "Network specialist"], 2, "<em>(Latihan 2 no. 3)</em>", ["Bukan.", "Bukan.", "Benar.", "Bukan.", "Bukan."]],
  ["Orang yang bertanggung jawab memastikan jaringan perusahaan sesuai prosedur yang berlaku adalah …", ["Programmer", "System analyst", "Operator", "Business analyst", "Network specialist"], 4, "<em>(Latihan 2 no. 4)</em>", ["Bukan.", "Bukan.", "Bukan.", "Bukan.", "Benar."]],
  ["Orang yang bertanggung jawab atas implementasi, perencanaan, operasi, dan keamanan data perusahaan disebut …", ["Database administrator", "System analyst", "Operator", "Business analyst", "Network specialist"], 0, "<em>(Latihan 2 no. 5)</em>", ["Benar.", "Bukan.", "Bukan.", "Bukan.", "Bukan."]],
  ["Urutan hierarki data dari yang paling kecil ke paling besar adalah …", ["Field → record → file → database", "Record → field → file → database", "Database → file → record → field", "File → field → record → database", "Field → file → record → database"], 0, "", ["Benar.", "Field lebih kecil dari record.", "Terbalik (besar ke kecil).", "Keliru.", "Keliru."]],
  ["Kumpulan dari fields disebut …", ["Record", "File", "Database", "Entity", "Attribute"], 0, "", ["Benar.", "Kumpulan record sejenis.", "Kumpulan file terkait.", "Objek yang disimpan.", "Ciri entitas."]],
  ["Menurut modul, database adalah …", ["Group of related files", "Group of records of same type", "Kumpulan karakter", "Kumpulan fields", "Person, place, thing"], 0, "", ["Benar.", "File.", "Field.", "Record.", "Entity."]],
  ["Mahasiswa, ruang kelas, dan mata kuliah yang datanya disimpan disebut …", ["Entity", "Attribute", "Field", "Record", "File"], 0, "Entity = person, place, thing.", ["Benar.", "Ciri dari entitas.", "Bukan.", "Bukan.", "Bukan."]],
  ["Date dan Grade pada entitas COURSE adalah contoh …", ["Attribute", "Entity", "Record", "File", "Database"], 0, "Contoh di modul.", ["Benar.", "COURSE-nya yang entity.", "Bukan.", "Bukan.", "Bukan."]],
  ["Alamat mahasiswa tercatat “Jl. Melati 5” di bagian akademik tetapi “Jl. Mawar 9” di bagian keuangan. Masalah ini adalah …", ["Data inconsistency", "Data redundancy", "Poor security", "Lack of flexibility", "Program-data dependence"], 0, "Atribut sama, nilai berbeda.", ["Benar.", "Redundancy = duplikasinya; nilai berbeda = inconsistency.", "Bukan.", "Bukan.", "Bukan."]],
  ["Perubahan format tanggal pada file mengharuskan semua program yang membaca file tersebut ikut diubah. Ini masalah …", ["Program-data dependence", "Data redundancy", "Poor security", "Lack of data sharing", "Data inconsistency"], 0, "", ["Benar.", "Bukan.", "Bukan.", "Bukan.", "Bukan."]],
  ["Penyebab utama masalah pada traditional file processing menurut modul adalah …", ["File dikelola terpisah oleh departemen yang berbeda", "Komputer terlalu lambat", "Tidak ada internet", "Terlalu banyak operator", "Data selalu terenkripsi"], 0, "", ["Benar.", "Bukan.", "Bukan.", "Bukan.", "Bukan."]],
  ["Network specialist biasanya bekerja sama dengan … untuk menyatukan sumber daya komputasi perusahaan.", ["System analyst", "Operator", "Database administrator", "Data entry", "Manajer pemasaran"], 0, "", ["Benar.", "Bukan.", "Bukan.", "Bukan.", "Bukan."]],
  ["➕ Solusi utama untuk masalah traditional file processing adalah …", ["Pendekatan database dengan DBMS", "Menambah jumlah file", "Menyimpan data di kertas", "Setiap departemen membuat file sendiri", "Menghapus data lama"], 0, "DBMS memusatkan data sehingga redundansi berkurang, konsisten, aman, dan bisa dibagi.", ["Benar.", "Memperparah.", "Mundur.", "Itu penyebab masalahnya.", "Bukan solusi."]]
];

module.exports = {
  id: "p7",
  nomor: 7,
  judul: "Pengelolaan Data & Informasi",
  ujian: "UTS",
  hero: {
    badge: "Materi 7 • Dasar-dasar SI",
    title: "Dari Field sampai Database",
    text: "Pahami <strong>hierarki data</strong> (field, record, file, database), <strong>entity & attribute</strong>, <strong>masalah traditional file processing</strong>, dan <strong>4 peran information specialist</strong>."
  },
  cheatsheet: [
    {
      type: "flow",
      label: "Interaktif 1 • Hierarki Data (File Organization Concept)",
      title: "Dari Kecil ke Besar",
      items: ["➕ Bit/byte (karakter)", "FIELD: kumpulan karakter", "RECORD: kumpulan field", "FILE: kumpulan record sejenis", "DATABASE: kumpulan file yang saling terkait"],
      highlight: 2,
      note: "Contoh: field <code>nama</code> = “Gilang” → satu record = data satu mahasiswa (NIM, nama, prodi) → file mahasiswa = semua record mahasiswa → database kampus = file mahasiswa + file mata kuliah + file nilai."
    },
    {
      type: "table",
      label: "Interaktif 2 • Istilah Penting",
      title: "Field, Record, File, Database, Entity, Attribute",
      headers: ["Istilah", "Arti (modul)", "Contoh"],
      rows: [
        ["Field", "Kumpulan dari karakter", "<code>nim</code>, <code>nama</code>"],
        ["Record", "Kumpulan dari fields; <strong>menggambarkan sebuah entity</strong>", "Satu baris data mahasiswa"],
        ["File", "Group of records of <strong>same type</strong>", "File semua mahasiswa"],
        ["Database", "Group of <strong>related files</strong>", "File mahasiswa + mata kuliah + nilai"],
        ["Entity", "Person, place, thing yang informasinya disimpan", "Mahasiswa, ruang, COURSE"],
        ["Attribute", "Tiap karakteristik/kualitas yang menggambarkan entity", "Date dan Grade pada entity COURSE"]
      ],
      modes: [
        { label: "Hubungan", target: "none", title: "Entity ↔ record, attribute ↔ field", text: "Satu <strong>record</strong> menggambarkan satu <strong>entity</strong>; setiap <strong>attribute</strong> entity disimpan sebagai <strong>field</strong>. Ini sama dengan baris dan kolom di tabel Basis Data." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 3 • Masalah Traditional File Processing",
      title: "Kenapa File Terpisah per Departemen Bermasalah?",
      headers: ["Masalah", "Arti", "Contoh"],
      rows: [
        ["Data redundancy", "Duplikasi data: data yang sama disimpan berulang", "Alamat mahasiswa disimpan di file akademik, keuangan, dan perpustakaan"],
        ["Data inconsistency", "Atribut sama tetapi <strong>nilainya berbeda</strong>", "Alamat di akademik “Jl. Melati”, di keuangan “Jl. Mawar”"],
        ["Program-data dependence", "Perubahan program menuntut perubahan data yang diakses (dan sebaliknya)", "Format tanggal diubah → semua program pembaca ikut diubah"],
        ["Lack of flexibility", "Sulit membuat laporan baru / permintaan mendadak", "Rektor minta laporan gabungan, harus dibuat program baru"],
        ["Poor security", "Sulit mengatur siapa boleh mengakses apa", "File nilai bisa disalin siapa saja"],
        ["Lack of data sharing & availability", "Data sulit dibagi antar departemen", "Bagian keuangan tidak bisa melihat data KRS"]
      ],
      modes: [
        { label: "➕ Koreksi modul", target: "row", row: 0, title: "Definisi redundancy", text: "Modul menulis redundancy sebagai “banyak duplikasi data dalam <em>satu field yang sama</em>”. Pengertian yang lebih tepat: <strong>data yang sama disimpan di lebih dari satu tempat/file</strong>. Redundansi inilah yang kemudian memicu <strong>inconsistency</strong> ketika salah satu salinan diubah." },
        { label: "Jebakan", target: "none", title: "Pengecoh “kecuali”", text: "<strong>Lack of knowledge</strong>, lack of hardware, high speed → bukan masalah di modul." },
        { label: "➕ Solusinya", target: "none", title: "Pendekatan database (DBMS)", text: "Data disimpan <strong>terpusat</strong> dan dikelola DBMS: redundansi berkurang, data konsisten, akses bisa diatur (security), dan bisa dibagi ke semua bagian. Lanjutannya di mata kuliah Basis Data." }
      ]
    },
    {
      type: "cards",
      label: "Interaktif 4 • Information Specialist",
      title: "4 Peran Pengelola Data & Informasi",
      cols: 2,
      items: [
        { badge: "System Analyst", tone: "indigo", title: "Ahli menjabarkan masalah", text: "Menjabarkan permasalahan perusahaan yang berkaitan dengan <strong>sistem komputer</strong> yang digunakan." },
        { badge: "Database Administrator", tone: "emerald", title: "Penjaga data", text: "Memastikan <strong>implementasi, perencanaan, operasi, dan keamanan</strong> data perusahaan." },
        { badge: "Operator", tone: "amber", title: "Menjalankan mesin besar", text: "Menjalankan komputer skala besar (<strong>server, mainframe</strong>) dan <strong>memonitor penggunaan hardware</strong>." },
        { badge: "Network Specialist", tone: "sky", title: "Penjaga jaringan", text: "Memastikan <strong>jaringan</strong> sesuai prosedur; bekerja sama dengan <strong>system analyst</strong> menyatukan sumber daya komputasi." },
        { badge: "➕ Programmer", tone: "violet", title: "Penulis program", text: "Menerjemahkan rancangan system analyst menjadi program. Disebut sebagai elemen people di P5." },
        { badge: "➕ CIO", tone: "rose", title: "Chief Information Officer", text: "Manajer puncak yang memimpin seluruh fungsi SI/TI organisasi." }
      ]
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Permainan 1 • Hierarki Data",
      title: "Ini Tingkat yang Mana?",
      headers: ["Contoh", "Tingkat"],
      rows: [
        { cells: ["“2024310045” (isi kolom NIM)"], fields: [{ options: HI, answer: "Field" }], ok: "✓" },
        { cells: ["2024310045 | Gilang | Sistem Informasi"], fields: [{ options: HI, answer: "Record" }], ok: "✓ Satu entitas." },
        { cells: ["Seluruh data mahasiswa angkatan 2024"], fields: [{ options: HI, answer: "File" }], ok: "✓ Record sejenis." },
        { cells: ["Data mahasiswa + dosen + mata kuliah + nilai yang saling terkait"], fields: [{ options: HI, answer: "Database" }], ok: "✓" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Diagnosis Masalah File Tradisional",
      title: "Kampus “Serba Terpisah”",
      headers: ["Gejala", "Masalah"],
      rows: [
        { cells: ["Nama mahasiswa disimpan di 4 file berbeda"], fields: [{ options: PR, answer: "Data redundancy" }], ok: "✓" },
        { cells: ["Nama yang sama ditulis “Gilang S.” di satu file dan “Gilang Swandaru” di file lain"], fields: [{ options: PR, answer: "Data inconsistency" }], ok: "✓" },
        { cells: ["Menambah kolom email memaksa semua program akademik diubah"], fields: [{ options: PR, answer: "Program-data dependence" }], ok: "✓" },
        { cells: ["Laporan mendadak untuk akreditasi butuh dua minggu karena harus dibuat program baru"], fields: [{ options: PR, answer: "Lack of flexibility" }], ok: "✓" },
        { cells: ["File nilai di komputer bersama bisa disalin siapa saja"], fields: [{ options: PR, answer: "Poor security" }], ok: "✓" },
        { cells: ["Bagian keuangan tidak bisa melihat status KRS mahasiswa"], fields: [{ options: PR, answer: "Lack of data sharing" }], ok: "✓" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 3 • Siapa yang Bertugas?",
      title: "Information Specialist",
      headers: ["Tugas", "Peran"],
      rows: [
        { cells: ["Mengatur hak akses dan backup database nilai"], fields: [{ options: ROLE, answer: "Database administrator" }], ok: "✓" },
        { cells: ["Menganalisis kenapa proses KRS online sering error dan merumuskan kebutuhannya"], fields: [{ options: ROLE, answer: "System analyst" }], ok: "✓" },
        { cells: ["Menjalankan dan memantau server di ruang data center"], fields: [{ options: ROLE, answer: "Operator" }], ok: "✓" },
        { cells: ["Memastikan Wi-Fi dan jaringan antar gedung sesuai prosedur"], fields: [{ options: ROLE, answer: "Network specialist" }], ok: "✓" }
      ]
    }
  ],
  flashcards: [
    { tag: "Hierarki", q: "Urutan hierarki data?", a: "Field → record → file → database (➕ diawali bit/byte/karakter)." },
    { tag: "Hierarki", q: "Field, record, file, database?", a: "Field: kumpulan karakter • Record: kumpulan field • File: record sejenis • Database: file-file yang saling terkait." },
    { tag: "Entity", q: "Entity vs attribute?", a: "Entity: person, place, thing yang informasinya disimpan. Attribute: karakteristik yang menggambarkan entity (Date, Grade pada COURSE)." },
    { tag: "Masalah", q: "Masalah traditional file processing?", a: "Data redundancy & inconsistency, program-data dependence, lack of flexibility, poor security, lack of data sharing & availability." },
    { tag: "Masalah", q: "Redundancy vs inconsistency?", a: "Redundancy: data sama disimpan berulang. Inconsistency: atribut sama tetapi nilainya berbeda." },
    { tag: "Masalah", q: "Program-data dependence?", a: "Perubahan program membutuhkan perubahan pada data yang diakses program (dan sebaliknya)." },
    { tag: "Penyebab", q: "Mengapa traditional file processing bermasalah?", a: "File dikelola terpisah oleh departemen yang berbeda." },
    { tag: "Peran", q: "Tugas system analyst?", a: "Ahli menjabarkan permasalahan perusahaan yang berkaitan dengan sistem komputer." },
    { tag: "Peran", q: "Tugas database administrator?", a: "Memastikan implementasi, perencanaan, operasi, dan keamanan data." },
    { tag: "Peran", q: "Tugas operator?", a: "Menjalankan komputer skala besar (server, mainframe) dan memonitor penggunaan hardware." },
    { tag: "Peran", q: "Tugas network specialist?", a: "Memastikan jaringan sesuai prosedur; bekerja sama dengan system analyst." },
    { tag: "➕ Solusi", q: "Solusi masalah file tradisional?", a: "Pendekatan database dengan DBMS: data terpusat, konsisten, aman, bisa dibagi." }
  ],
  quiz: Q.map(([q, opts, ans, exp, optExp]) => ({ q, opts, ans, exp, optExp })),
  ringkasan: `*RANGKUMAN KILAT UTS — DASAR-DASAR SI P7*
📚 *Pengelolaan Data & Informasi*

1️⃣ Hierarki: Field (karakter) → Record (fields, gambarkan entity) → File (record sejenis) → Database (file terkait).
2️⃣ Entity: orang/tempat/benda. Attribute: cirinya (Date, Grade pada COURSE).
3️⃣ Masalah file tradisional (file terpisah per departemen): redundancy & inconsistency • program-data dependence • lack of flexibility • poor security • lack of data sharing & availability. (Lack of knowledge ✗)
4️⃣ Information specialist: System analyst (jabarkan masalah) • DBA (implementasi, perencanaan, operasi, keamanan data) • Operator (server/mainframe, monitor hardware) • Network specialist (jaringan, kerja sama dengan analis).
➕ Solusi: DBMS. ➕ Redundancy lebih tepat = data sama di banyak tempat.`
};
