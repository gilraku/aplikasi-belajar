// Materi Basis Data Pertemuan 2, dikonversi dari aplikasi asli ke format data.
module.exports = {
  id: "sif002-basis-data",
  nama: "Basis Data",
  kampus: "Universitas Siber Muhammadiyah",
  prodi: "PJJ Sistem Informasi",
  dosen: "Wicaksono Yuli Sulistyo, S.Kom., M.Kom., CSA.",
  meetings: [{
    id: "p2",
    nomor: 2,
    judul: "Model Data Relasional & Sistem Basis Data",
    ujian: "CPMK 1",
    hero: {
      badge: "Penyusun Materi: Wicaksono Yuli Sulistyo, S.Kom., M.Kom., CSA.",
      title: "Pahami Konsep dalam 10 Menit tanpa Hafalan Mati!",
      text: "Klik tombol-tombol interaktif di bawah ini untuk membedah <strong>anatomi tabel</strong>, <strong>perbedaan NULL vs 0</strong>, <strong>alasan pemilihan tipe data &amp; kunci primer</strong>, serta <strong>konsep sistem basis data</strong>."
    },
    cheatsheet: [
      {
        type: "table",
        label: "Interaktif 1 • Anatomi Model Relasional",
        title: "Bedah Bagian-Bagian <code>tabel buku</code>",
        desc: "Klik tombol sorotan di bawah untuk melihat bagian tabel beserta jebakan soal UTS-nya:",
        tip: "💡 Kata “Relasional” berasal dari kata <em>Relation</em> = Tabel!",
        headers: ["id_buku", "judul", "pengarang", "tahun", "stok"],
        keyCol: 0,
        rows: [
          ["BK001", "Dasar Pemrograman Komputer", "Andi Wibowo", "2019", "4"],
          ["BK002", "Sistem Basis Data", "Rina Kartika", "2021", "3"],
          ["BK003", "Jaringan Komputer Dasar", "Budi Santoso", "2018", "2"],
          ["BK004", "Analisis Sistem Informasi", "Siti Nurhaliza", "2022", "5"],
          ["BK005", "Statistika untuk Informatika", "Dewi Anggraini", "2020", "1"]
        ],
        modes: [
          { label: "1. Sorot Baris Judul (Header)", target: "header",
            title: "1. Baris Judul (Header Row) — BUKAN DATA!",
            text: "Baris paling atas berisi nama kolom (<code>id_buku</code>, <code>judul</code>, <code>pengarang</code>, <code>tahun</code>, <code>stok</code>). <strong>Jebakan UTS:</strong> Jika sebuah tabel tampak memiliki 6 baris di layar, maka jumlah data bukunya hanya <strong>5 baris data</strong> karena baris judul tidak pernah ikut dihitung sebagai data! Ibarat cetakan label pada kartu katalog kosong." },
          { label: "🔑 2. Sorot Kunci Primer (Primary Key)", target: "col", col: 0,
            title: "2. Kunci Primer (Primary Key) — Kolom id_buku",
            text: "Kolom penanda unik setiap baris. Nilainya <strong>wajib berbeda antar baris</strong> dan <strong>tidak boleh kosong (NOT NULL)</strong>. Mengapa bukan <code>judul</code>? Karena: (1) Dua buku bisa berjudul sama, (2) Judul panjang & rawan salah ketik, (3) Judul bisa berubah pada cetakan berikutnya. Kolom unik lain yang juga layak jadi kunci primer disebut <strong>Kunci Kandidat</strong> (contoh: Nomor ISBN)." },
          { label: "📏 3. Sorot Satu Baris Data", target: "row", row: 1,
            title: "3. Satu Baris Data (Record / Tuple)",
            text: "Mendatar disebut baris. Satu baris memuat keterangan lengkap dari satu buku (misalnya seluruh data buku <code>BK002</code>). Sesuai <strong>Aturan ke-4</strong>, urutan baris tidak berarti apa-apa: buku <code>BK003</code> dipindah ke paling atas tetaplah buku yang sama." },
          { label: "🎯 4. Sorot Satu Sel (Nilai Tunggal)", target: "cell", row: 1, col: 2,
            title: "4. Satu Sel (Pertemuan 1 Baris & 1 Kolom)",
            text: "Kotak yang disorot (<code>Rina Kartika</code>) adalah satu sel. Sesuai <strong>Aturan ke-1 (Nilai Tunggal)</strong>, satu sel hanya boleh berisi <strong>satu keterangan saja</strong>. Tidak boleh menulis dua nama pengarang sekaligus seperti <em>\"Rina Kartika, Andi Wibowo\"</em> di dalam satu sel." },
          { label: "🔄 Reset Tampilan", target: "none",
            title: "Tampilan Normal: 5 Baris Data & 5 Kolom",
            text: "Model data relasional menyimpan data dalam tabel seragam agar komputer bisa mencari, menyaring, dan menghitungnya tanpa menebak-nebak. Urutan baris maupun urutan kolom bebas diubah tanpa mengubah arti tabel." }
        ],
        notes: [
          { title: "📌 Berapa Jumlah Data di Atas?", text: "Tampak 6 baris di layar, tetapi isinya adalah <strong>5 baris data</strong> + 1 baris judul. Baris judul tidak pernah dihitung sebagai data!" },
          { title: "🚫 Mengapa Bukan <code>judul</code> Kunci Primernya?", text: "1) Dua buku bisa berjudul sama, 2) Panjang &amp; rawan salah ketik, 3) Judul bisa berubah pada cetakan berikutnya." },
          { title: "🏅 Apa itu Kunci Kandidat?", text: "Kolom lain yang juga unik dan layak menjadi kunci primer, contohnya <strong>Nomor ISBN</strong> pada buku." }
        ]
      },
      {
        type: "row",
        cols: [5, 7],
        blocks: [
          {
            type: "choices",
            label: "Interaktif 2 • Konsep Langganan UTS",
            title: "Bedanya <code>stok = 0</code> vs <code>stok = NULL</code>",
            desc: "Klik saklar di bawah untuk melihat kondisi nyata di rak perpustakaan:",
            style: "toggle",
            options: [
              { label: "Saat stok = 0", tone: "indigo", badge: "stok = 0", title: "Sudah Dihitung → Hasilnya Nol",
                text: "<strong>Artinya di Perpustakaan:</strong> Bukunya memang ada di koleksi perpustakaan dan sudah dihitung oleh petugas, tetapi saat ini <strong>sedang habis dipinjam semua</strong> (tersisa 0 eksemplar di rak).",
                note: "Kartu Katalog: Kotak stok sudah ditulis angka <strong>0</strong> oleh petugas." },
              { label: "Saat stok = NULL", tone: "rose", badge: "stok = NULL", title: "Belum Diisi → Belum Diketahui",
                text: "<strong>Artinya di Perpustakaan:</strong> <strong>Tidak ada yang tahu berapa jumlah stoknya</strong> karena petugas belum pernah menghitungnya atau kotaknya belum sempat diisi.",
                note: "Kartu Katalog: Kotak isian stok masih <strong>putih bersih (kosong)</strong>." }
            ],
            footer: "<strong>Ingat juga:</strong> <code>NULL</code> bukan angka <code>0</code> dan bukan pula karakter spasi (<code>' '</code>). Aturan larangan mengisi <code>NULL</code> pada kolom disebut <strong>Constraint</strong> (<code>NOT NULL</code>)."
          },
          {
            type: "choices",
            label: "Interaktif 3 • 5 Tipe Data Dasar MySQL",
            title: "Pilih Tipe Data yang Tepat &amp; Hindari Jebakan <code>nomor_hp</code>",
            desc: "Klik salah satu tipe data di bawah untuk melihat kapan harus dipakai:",
            style: "pills",
            options: [
              { label: "CHAR(n)", title: "CHAR(n) — Teks dengan Panjang Selalu Tetap/Sama", code: "id_buku CHAR(5) → selalu 5 karakter (BK001, BK002) atau nomor_rak CHAR(3) → (R01, R02)", text: "Digunakan untuk kode unik atau penanda yang jumlah huruf/karakternya selalu seragam pada setiap baris." },
              { label: "VARCHAR(n)", title: "VARCHAR(n) — Teks yang Panjangnya Berubah-ubah (Maksimal n Huruf)", code: "judul VARCHAR(80), pengarang VARCHAR(50), nomor_hp VARCHAR(15)", text: "Digunakan untuk teks seperti judul buku, nama orang, nama penerbit, atau nomor HP yang panjang pendeknya bervariasi di setiap baris hingga batas angka di dalam kurung." },
              { label: "INT", title: "INT — Bilangan Bulat (Tanpa Koma)", code: "stok INT, jumlah_halaman INT", text: "Khusus untuk angka bulat yang memang menyatakan kuantitas/jumlah dan dapat dihitung secara matematis." },
              { label: "YEAR", title: "YEAR — Khusus Empat Digit Angka Tahun", code: "tahun YEAR, tahun_cetak YEAR (contoh isian: 2021)", text: "Hanya menerima angka tahun (4 digit). Jika diisi teks seperti \"dua ribu\" atau \"tahun lalu\", DBMS langsung menolak dengan ERROR 1366." },
              { label: "DATE", title: "DATE — Tanggal Lengkap (Tahun-Bulan-Tanggal)", code: "tgl_daftar DATE, tanggal_masuk DATE (format: YYYY-MM-DD)", text: "Digunakan ketika kolom perlu menyimpan informasi tanggal, bulan, dan tahun secara lengkap." },
              { label: "⚠️ Jebakan UTS: nomor_hp", tone: "rose", title: "⚠️ JEBAKAN UTS: Mengapa nomor_hp Wajib VARCHAR dan Bukan INT?", code: "nomor_hp VARCHAR(15) → Contoh: \"08123456789\" atau \"+628123456789\"", text: "Ada 3 alasan mutlak yang wajib kamu tulis saat UTS: (1) Nomor HP tidak pernah dihitung secara matematis (tidak pernah dijumlah/dikali), (2) Nomor HP diawali angka nol (08...) yang akan HILANG jika disimpan sebagai bilangan INT, dan (3) Kadang memuat karakter tanda tambah (+) pada kode negara (+62)." }
            ]
          }
        ]
      },
      {
        type: "reveal",
        label: "Uji Cepat",
        title: "Latihan Tingkat 1: Tebak Tipe Data Kolom",
        desc: "Klik nama kolom untuk melihat tipe datanya:",
        items: [
          { prompt: "1. nomor_rak (R01, R02)", answer: "CHAR(3)", reason: "Selalu tetap 3 karakter seperti R01, R02" },
          { prompt: "2. jumlah_halaman", answer: "INT", reason: "Berupa bilangan bulat jumlah halaman buku" },
          { prompt: "3. tanggal_masuk", answer: "DATE", reason: "Memuat tanggal, bulan, dan tahun lengkap" },
          { prompt: "4. nama_penerbit", answer: "VARCHAR(50)", reason: "Panjang teks nama penerbit berbeda-beda" },
          { prompt: "5. tahun_cetak (contoh: 2024)", answer: "YEAR", reason: "Hanya menyimpan 4 digit angka tahun cetak" }
        ]
      },
      {
        type: "tabs",
        label: "Interaktif 4 • Rangkuman Materi Slide Pertemuan 2",
        title: "Definisi, Tujuan Objektif, Operasi Dasar, &amp; Sistem Basis Data",
        tabs: [
          { label: "🗄️ 1. Analogi Lemari Arsip & Definisi", blocks: [
            { type: "callout", tone: "info", title: "Analogi Utama: Lemari Arsip → Basis Data di Harddisk",
              html: "Di dalam <strong>Lemari Arsip</strong> terdapat Arsip Pegawai, Arsip Pembelian, Arsip Produksi, dan Arsip Penjualan. Di dalam <strong>Harddisk (DISK)</strong>, keempatnya menjadi <em>file pegawai, file pembelian, file produksi, dan file penjualan</em>.<ul><li><strong>Prinsip Utama:</strong> Pengaturan data/arsip secara rapi.</li><li><strong>Tujuan Utama:</strong> Kemudahan dan kecepatan dalam pengambilan kembali (pencarian) data/arsip.</li><li><strong>Perbedaan:</strong> Media penyimpanan yang digunakan (fisik vs elektronik/disk), yang melahirkan perbedaan jumlah dan metode penyimpanan.</li></ul>" },
            { type: "cards", title: "2 Definisi Formal Basis Data (Wajib Ingat untuk UTS):", cols: 2, items: [
              { title: "Definisi 1 (Anti-Redundansi)", text: "Kumpulan data yang saling berhubungan yang disimpan secara bersama sedemikian rupa dan <strong>tanpa pengulangan (redundansi) yang tidak perlu</strong>, untuk memenuhi berbagai kebutuhan." },
              { title: "Definisi 2 (Bangunan Data)", text: "Kumpulan <em>file</em> yang mempunyai kaitan antara satu <em>file</em> dengan <em>file</em> lain (disimpan dalam media elektronik) sehingga membentuk satu bangunan data untuk menginformasikan satu perusahaan/instansi." }
            ] }
          ] },
          { label: "🎯 2. 7 Tujuan Objektif Basis Data", blocks: [
            { type: "cards", cols: 4, items: [
              { badge: "1. Speed", title: "Kecepatan & Kemudahan", text: "Menyimpan, memanipulasi, dan menampilkan kembali data jauh lebih cepat daripada arsip manual." },
              { badge: "2. Space", title: "Efisiensi Ruang Simpan", text: "Menekan pengulangan data (redundansi) dengan menerapkan pengkodean/relasi antar tabel." },
              { badge: "3. Accuracy", title: "Keakuratan", text: "Penerapan aturan tipe data, keunikan kunci primer, dan constraint mencegah masuknya data salah." },
              { badge: "4. Availability", title: "Ketersediaan", text: "Data dapat dipilah menjadi data utama/aktif dan data historis sehingga selalu tersedia saat dibutuhkan." },
              { badge: "5. Completeness", title: "Kelengkapan", text: "Struktur tabel maupun isi data dapat terus ditambah untuk mengakomodasi kebutuhan baru." },
              { badge: "6. Security", title: "Keamanan", text: "Menentukan siapa pemakai yang boleh mengakses basis data beserta jenis operasi yang diizinkan." },
              { badge: "7. Sharability", title: "Kebersamaan Pemakaian (Multi-user)", text: "Basis data dapat digunakan oleh beberapa pemakai dan berbagai lokasi secara bersamaan tanpa saling merusak data." }
            ] }
          ] },
          { label: "⚙️ 3. 8 Operasi Dasar Basis Data", blocks: [
            { type: "list", groups: [
              { title: "Kelompok Operasi Struktur (DDL)", items: [
                "<strong>1. create database</strong> → Membuat lemari arsip/basis data baru",
                "<strong>2. drop database</strong> → Menghapus basis data beserta seluruh isinya",
                "<strong>3. create table</strong> → Membuat tabel/file baru di dalam basis data",
                "<strong>4. drop table</strong> → Menghapus tabel dari basis data" ] },
              { title: "Kelompok Manipulasi Isi Data (DML / CRUD)", tone: "emerald", items: [
                "<strong>5. insert</strong> → Menambahkan baris data baru ke tabel",
                "<strong>6. retrieve / search</strong> → Mencari &amp; mengambil data dari tabel",
                "<strong>7. update</strong> → Mengubah/memperbarui nilai data yang sudah ada",
                "<strong>8. delete</strong> → Menghapus baris data dari tabel" ] }
            ] }
          ] },
          { label: "🖥️ 4. 6 Komponen Sistem & Peran DBMS", blocks: [
            { type: "cards", cols: 3, items: [
              { badge: "1. Hardware", title: "Perangkat Keras" },
              { badge: "2. Operating System", title: "Sistem Operasi" },
              { badge: "3. Database", title: "Basis Data (Tabel)" },
              { badge: "4. DBMS (Inti)", title: "Pengelola Basis Data", tone: "indigo" },
              { badge: "5. User", title: "Pemakai" },
              { badge: "6. Aplikasi Lain", title: "(Bersifat Opsional)" }
            ] },
            { type: "flow", title: "Bagaimana DBMS Menghubungkan Pemakai dengan Data?",
              desc: "DBMS menjadi <strong>perantara</strong> sehingga beberapa pemakai atau program (Pemakai 1, Pemakai 2, Pemakai 3) dapat mengakses dan memanipulasi <em>file 1 s.d. file 5</em> (tabel-tabel) dalam basis data secara bersamaan.",
              arrow: "↔", items: ["User 1, 2, 3", "DBMS", "Basis Data"], highlight: 1 }
          ] }
        ]
      }
    ],
    simulator: [
      {
        type: "detective",
        label: "Permainan Interaktif 1 • Latihan Tingkat 2 Modul",
        title: "Detektif Tabel: Temukan &amp; Perbaiki 3 Pelanggaran Aturan!",
        desc: "Tabel di bawah ini melanggar <strong>3 aturan tabel yang baik</strong>. Klik langsung pada <strong>sel yang bermasalah (berwarna merah)</strong> untuk memperbaikinya!",
        rules: [
          "Satu sel hanya berisi <strong>satu nilai tunggal</strong>.",
          "Semua nilai dalam satu kolom harus <strong>sejenis</strong>.",
          "Setiap baris harus <strong>berbeda/unik</strong> (Kunci Primer).",
          "<strong>Urutan baris</strong> bebas / tidak mengubah arti.",
          "<strong>Urutan kolom</strong> bebas / tidak mengubah arti."
        ],
        headers: ["id_buku (PK)", "judul", "pengarang", "tahun"],
        rows: [
          ["BK001", "Dasar Pemrograman", "Andi Wibowo", "2019"],
          ["BK001", "Sistem Basis Data", "Rina Kartika, Andi Wibowo", "2021"],
          ["BK003", "Jaringan Komputer", "Budi Santoso", "tahun lalu"]
        ],
        bugs: [
          { row: 1, col: 0, fixed: "BK002", explain: "✅ <strong>Pelanggaran Diperbaiki (Kunci Primer / Aturan 3):</strong> Kode <code>BK001</code> tadi dipakai dua kali! Kunci primer tidak boleh kembar, sehingga baris kedua diubah menjadi <code>BK002</code>." },
          { row: 1, col: 2, fixed: "Rina Kartika", explain: "✅ <strong>Pelanggaran Diperbaiki (Aturan 1 — Satu Sel Satu Nilai):</strong> Tadi sel pengarang berisi dua nama sekaligus (<em>\"Rina Kartika, Andi Wibowo\"</em>). Satu sel wajib hanya menyimpan satu nilai tunggal!" },
          { row: 2, col: 3, fixed: "2025", explain: "✅ <strong>Pelanggaran Diperbaiki (Aturan 2 — Satu Kolom Sejenis):</strong> Kolom <code>tahun</code> bertipe angka tahun (<code>YEAR</code>), tidak boleh diisi teks <em>\"tahun lalu\"</em>. Sudah diganti menjadi angka tahun <code>2025</code>." }
        ]
      },
      {
        type: "row",
        cols: [5, 7],
        label: "Permainan Interaktif 2 • Simulator MySQL / MariaDB",
        title: "Laboratorium <code>DESCRIBE buku;</code> &amp; 6 Pesan Galat (Error) DBMS",
        desc: "Di UTS, kamu sering diminta menebak mengapa sebuah perintah <code>INSERT</code> ditolak oleh DBMS. Klik tombol skenario untuk menjalankan simulasi!",
        blocks: [
          {
            type: "table",
            title: "Hasil Perintah: <code>DESCRIBE buku;</code>",
            desc: "Klik header kolom untuk penjelasan.",
            mono: true,
            headers: [
              { label: "Field", note: "<strong>Field:</strong> Menunjukkan nama kolom pada tabel (<code>id_buku</code>, <code>judul</code>, <code>pengarang</code>, <code>tahun</code>, <code>stok</code>)." },
              { label: "Type", note: "<strong>Type:</strong> Menunjukkan tipe data kolom beserta batas panjangnya (misal <code>varchar(80)</code> berarti maksimal 80 karakter)." },
              { label: "Null", note: "<strong>Null:</strong> Bernilai <code>NO</code> artinya kolom tersebut DILARANG dikosongkan. Jika diisi <code>NULL</code>, akan muncul <code>ERROR 1048</code>." },
              { label: "Key", note: "<strong>Key:</strong> Tanda <code>PRI</code> menandakan bahwa kolom <code>id_buku</code> adalah Kunci Primer (Primary Key)." },
              { label: "Default", note: "<strong>Default:</strong> Nilai cadangan bila kolom tidak diisi. Tertulis <code>NULL</code> artinya tidak ada nilai cadangan." }
            ],
            keyCol: 0,
            rows: [
              ["id_buku", "char(5)", "NO", "PRI", "NULL"],
              ["judul", "varchar(80)", "NO", "", "NULL"],
              ["pengarang", "varchar(50)", "NO", "", "NULL"],
              ["tahun", "year(4)", "NO", "", "NULL"],
              ["stok", "int(11)", "NO", "", "NULL"]
            ],
            defaultNote: "💡 <strong>Catatan Penting Modul:</strong> Angka dalam kurung pada <code>year(4)</code> dan <code>int(11)</code> adalah lebar tampilan bawaan MariaDB. Pada MySQL 8 (MAMP), hanya tertulis <code>year</code> dan <code>int</code>."
          },
          {
            type: "terminal",
            title: "Pilih Skenario Uji Coba Perintah SQL:",
            shell: "mysql>",
            header: "Terminal Simulasi Basis Data Perpustakaan",
            scenarios: [
              { label: "1. Uji Kunci Primer Kembar ('BK002')", code: "1062", pill: "ERROR 1062", ok: false,
                cmd: "INSERT INTO buku VALUES ('BK002','Basis Data Lanjut','Ahmad Fauzi',2023,2);",
                res: "ERROR 1062 (23000): Duplicate entry 'BK002' for key 'PRIMARY'",
                exp: "<strong>Penyebab:</strong> Nilai kunci primer <code>'BK002'</code> sudah dipakai oleh baris lain (buku Sistem Basis Data).<br><strong>Perbaikan:</strong> Ganti dengan nomor <code>id_buku</code> baru yang belum pernah dipakai, misalnya <code>'BK006'</code>." },
              { label: "2. Uji Kosongkan Pengarang (NULL)", code: "1048", pill: "ERROR 1048", ok: false,
                cmd: "INSERT INTO buku VALUES ('BK006','Buku Tanpa Pengarang',NULL,2023,2);",
                res: "ERROR 1048 (23000): Column 'pengarang' cannot be null",
                exp: "<strong>Penyebab:</strong> Kolom <code>pengarang</code> bertanda <code>Null: NO</code> (dilarang kosong), tetapi diisi dengan <code>NULL</code>.<br><strong>Perbaikan:</strong> Isi kolom pengarang dengan teks yang sah, atau ubah aturan kolom bila memang boleh kosong." },
              { label: "3. Uji Isi Tahun dengan 'dua ribu'", code: "1366", pill: "ERROR 1366", ok: false,
                cmd: "INSERT INTO buku VALUES ('BK006','Buku Uji','Uji Coba','dua ribu',2);",
                res: "ERROR 1366 (22007): Incorrect integer value: 'dua ribu' for column `perpustakaan`.`buku`.`tahun` at row 1",
                exp: "<strong>Penyebab:</strong> Kolom <code>tahun</code> bertipe bilangan/tahun (<code>YEAR</code>), tetapi diisi dengan teks <code>'dua ribu'</code>.<br><strong>Perbaikan:</strong> Isi dengan angka 4 digit tanpa tanda kutip, misalnya <code>2020</code>." },
              { label: "4. Uji id_buku Kepanjangan ('BK0006')", code: "1406", pill: "ERROR 1406", ok: false,
                cmd: "INSERT INTO buku VALUES ('BK0006','Basis Data Lanjut','Ahmad Fauzi',2023,2);",
                res: "ERROR 1406 (22001): Data too long for column 'id_buku' at row 1",
                exp: "<strong>Penyebab:</strong> Isian <code>'BK0006'</code> terdiri dari 6 huruf, melebihi batas tipe data <code>id_buku CHAR(5)</code>.<br><strong>Perbaikan:</strong> Perpendek isiannya menjadi 5 karakter (<code>'BK006'</code>) atau perbesar batas panjang kolom." },
              { label: "5. Uji Jumlah Nilai Kurang (4 Nilai)", code: "1136", pill: "ERROR 1136", ok: false,
                cmd: "INSERT INTO buku VALUES ('BK006','Basis Data Lanjut','Ahmad Fauzi',2023);",
                res: "ERROR 1136 (21S01): Column count doesn't match value count at row 1",
                exp: "<strong>Penyebab:</strong> Tabel <code>buku</code> punya 5 kolom, tetapi perintah di atas hanya memasukkan 4 nilai (nilai <code>stok</code> tertinggal).<br><strong>Perbaikan:</strong> Hitung ulang agar jumlah nilai yang dimasukkan sama persis (5 nilai untuk 5 kolom)." },
              { label: "6. Uji Pasang 2 Kunci Primer", code: "1068", pill: "ERROR 1068", ok: false,
                cmd: "ALTER TABLE buku ADD PRIMARY KEY (judul);",
                res: "ERROR 1068 (42000): Multiple primary key defined",
                exp: "<strong>Penyebab:</strong> Mencoba menetapkan dua kolom berbeda sebagai kunci primer dalam satu tabel.<br><strong>Perbaikan:</strong> Satu tabel hanya boleh memiliki satu kunci primer (<code>id_buku</code> saja)." },
              { label: "✅ 7. Uji Perintah INSERT yang Mematuhi Semua Aturan", code: "OK", pill: "QUERY OK", ok: true,
                cmd: "INSERT INTO buku VALUES ('BK006','Basis Data Lanjut','Ahmad Fauzi',2023,2);",
                res: "Query OK, 1 row affected (0.004 sec)",
                exp: "<strong>Berhasil Tersimpan!</strong> Seluruh aturan dipenuhi: <code>'BK006'</code> unik dan pas 5 karakter, tidak ada kolom wajib yang <code>NULL</code>, tahun berupa angka <code>2023</code>, dan jumlah nilai pas 5 kolom." }
            ]
          }
        ]
      },
      {
        type: "exercise",
        label: "Permainan Interaktif 3 • Mini-Case Perpustakaan (Bagian 8 Modul)",
        title: "Rancang Struktur <code>tabel anggota</code> dari Kartu Anggota",
        desc: "Pilih Tipe Data dan Kunci Primer yang paling tepat untuk setiap isian pada Kartu Anggota di bawah ini:",
        preview: "🪪 KARTU ANGGOTA PERPUSTAKAAN\nNomor anggota  : AG001\nNama           : Ahmad Fauzi\nProgram studi  : Sistem Informasi\nTanggal daftar : 12 September 2026\nNomor HP       : 0812xxxxxxx",
        headers: ["Keterangan Kartu", "Nama Kolom", "Pilih Tipe Data", "Kunci Primer?"],
        rows: [
          { cells: ["Nomor anggota (<code>AG001</code>)", "<code>id_anggota</code>"],
            fields: [ { options: ["CHAR(5)", "INT", "DATE"], answer: "CHAR(5)" },
                      { options: [{ value: "PK", label: "🔑 YA (Primary Key)" }, { value: "NO", label: "Bukan PK" }], answer: "PK", noPlaceholder: true } ],
            ok: "✓ Tepat! Selalu 5 karakter (AG001) & menjadi Primary Key" },
          { cells: ["Nama (<code>Ahmad Fauzi</code>)", "<code>nama</code>"],
            fields: [ { options: ["CHAR(5)", "VARCHAR(50)", "INT"], answer: "VARCHAR(50)" },
                      { options: [{ value: "NO", label: "Bukan PK (Wajib Isi / NOT NULL)" }, { value: "PK", label: "🔑 YA (Primary Key)" }], answer: "NO", noPlaceholder: true } ],
            ok: "✓ Tepat! Nama bisa kembar sehingga bukan PK",
            hints: [ { field: 1, value: "PK", msg: "✗ Nama tidak boleh jadi Kunci Primer karena dua anggota bisa bernama sama." } ] },
          { cells: ["Program studi (<code>Sistem Informasi</code>)", "<code>prodi</code>"],
            fields: [ { options: ["VARCHAR(40)", "YEAR", "INT"], answer: "VARCHAR(40)" },
                      { options: [{ value: "NO", label: "Bukan PK (Wajib Isi / NOT NULL)" }, { value: "PK", label: "🔑 YA (Primary Key)" }], answer: "NO", noPlaceholder: true } ],
            ok: "✓ Tepat! Panjang teks prodi bervariasi" },
          { cells: ["Tanggal daftar (<code>12 Sep 2026</code>)", "<code>tgl_daftar</code>"],
            fields: [ { options: ["YEAR", "DATE", "INT"], answer: "DATE" },
                      { options: [{ value: "NO", label: "Bukan PK (Wajib Isi / NOT NULL)" }, { value: "PK", label: "🔑 YA (Primary Key)" }], answer: "NO", noPlaceholder: true } ],
            ok: "✓ Tepat! Tanggal lengkap memakai DATE" },
          { cells: ["Nomor HP (<code>0812xxxxxxx</code>)", "<code>nomor_hp</code>"],
            fields: [ { options: [{ value: "INT", label: "INT (Bilangan Bulat)" }, { value: "VARCHAR(15)", label: "VARCHAR(15) (Teks Berubah-ubah)" }, "YEAR"], answer: "VARCHAR(15)" },
                      { options: [{ value: "NO", label: "Bukan PK (Boleh NULL / Wajib Isi)" }, { value: "PK", label: "🔑 YA (Primary Key)" }], answer: "NO", noPlaceholder: true } ],
            ok: "✓ Tepat! Nomor HP wajib VARCHAR agar angka 0 di depan tidak hilang",
            hints: [ { field: 0, value: "INT", msg: "✗ Hati-hati jebakan UTS! Nomor HP jangan memakai INT karena angka 0 di depan akan hilang." } ] }
        ]
      }
    ],
    flashcards: [
      { tag: "Jebakan UTS #1", q: "Sebuah tabel buku tampak memiliki 6 baris di layar monitor. Berapa jumlah data buku yang sebenarnya tersimpan?", a: "<strong>5 data buku.</strong> Baris paling atas adalah <strong>baris judul</strong> yang hanya berisi nama kolom, bukan data, sehingga tidak ikut dihitung." },
      { tag: "Kunci Primer", q: "Sebutkan 3 alasan mengapa kolom \"judul\" TIDAK dipilih sebagai Kunci Primer pada tabel buku!", a: "1) Dua buku bisa berjudul sama.<br>2) Judul panjang dan rawan salah ketik.<br>3) Judul dapat berubah pada cetakan berikutnya, sedangkan kunci primer harus tetap." },
      { tag: "NULL vs 0", q: "Apa perbedaan arti antara stok bernilai 0 dengan stok bernilai NULL pada tabel buku?", a: "<strong>Stok = 0:</strong> Sudah dihitung dan hasilnya memang nol (misal bukunya sedang habis dipinjam semua).<br><strong>Stok = NULL:</strong> Belum diisi / belum diketahui jumlahnya karena belum pernah dihitung." },
      { tag: "Tipe Data", q: "Kolom nomor_hp anggota (\"0812xxxxxxx\") sebaiknya bertipe VARCHAR atau INT? Jelaskan 3 alasannya!", a: "<strong>Wajib VARCHAR!</strong> Karena: 1) Tidak pernah dihitung secara matematis, 2) Diawali angka nol (08...) yang akan hilang bila disimpan sebagai INT, 3) Kadang memuat tanda tambah (+62)." },
      { tag: "Aturan Tabel", q: "Sebutkan 5 aturan tabel yang baik dalam model data relasional!", a: "1) Satu sel satu nilai tunggal.<br>2) Semua nilai dalam satu kolom sejenis.<br>3) Setiap baris berbeda/unik (tidak ada baris kembar).<br>4) Urutan baris bebas.<br>5) Urutan kolom bebas." },
      { tag: "Istilah Kunci", q: "Apa perbedaan antara Kunci Primer (Primary Key) dan Kunci Kandidat (Candidate Key)?", a: "<strong>Kunci Primer:</strong> Kolom yang resmi dipilih menjadi penanda unik (contoh: <code>id_buku</code>).<br><strong>Kunci Kandidat:</strong> Kolom lain yang sebenarnya juga unik dan layak menjadi kunci primer (contoh: nomor <code>ISBN</code>)." },
      { tag: "Kode Error SQL", q: "Apa arti pesan galat ERROR 1062, ERROR 1048, dan ERROR 1366 pada MySQL?", a: "• <strong>1062 (Duplicate entry):</strong> Nilai kunci primer kembar.<br>• <strong>1048 (Cannot be null):</strong> Kolom wajib isi malah diberi NULL.<br>• <strong>1366 (Incorrect integer):</strong> Kolom angka/tahun diisi teks." },
      { tag: "Kode Error SQL", q: "Apa arti pesan galat ERROR 1406, ERROR 1136, dan ERROR 1068 pada MySQL?", a: "• <strong>1406 (Data too long):</strong> Teks melebihi batas karakter kolom.<br>• <strong>1136 (Column count):</strong> Jumlah nilai tidak sama dengan jumlah kolom.<br>• <strong>1068 (Multiple PK):</strong> Mendefinisikan lebih dari 1 kunci primer." },
      { tag: "Konsep Slide", q: "Apa prinsip utama, tujuan utama, dan perbedaan antara Lemari Arsip dengan Basis Data?", a: "• <strong>Prinsip Utama:</strong> Pengaturan data/arsip.<br>• <strong>Tujuan Utama:</strong> Kemudahan &amp; kecepatan pengambilan kembali data.<br>• <strong>Perbedaan:</strong> Media penyimpanan yang digunakan (lemari fisik vs disk elektronik)." },
      { tag: "7 Tujuan Objektif", q: "Sebutkan 7 Tujuan Objektif Basis Data!", a: "1) <strong>Speed</strong> (Kecepatan &amp; kemudahan)<br>2) <strong>Space</strong> (Efisiensi ruang simpan)<br>3) <strong>Accuracy</strong> (Keakuratan)<br>4) <strong>Availability</strong> (Ketersediaan)<br>5) <strong>Completeness</strong> (Kelengkapan)<br>6) <strong>Security</strong> (Keamanan)<br>7) <strong>Sharability</strong> (Kebersamaan pemakaian)." },
      { tag: "Sistem Basis Data", q: "Sebutkan 6 Komponen Utama Sistem Basis Data!", a: "1) Perangkat Keras (Hardware)<br>2) Sistem Operasi (Operating System)<br>3) Basis Data (Database)<br>4) Sistem Pengelola Basis Data (DBMS)<br>5) Pemakai (User)<br>6) Aplikasi Lain (opsional)." },
      { tag: "Perintah SQL", q: "Apa fungsi perintah DESCRIBE buku; dan apa arti kolom Null: NO serta Key: PRI?", a: "Menampilkan <strong>struktur/susunan kolom tabel</strong> (bukan isi datanya).<br>• <code>Null: NO</code> berarti kolom dilarang dikosongkan.<br>• <code>Key: PRI</code> berarti kolom tersebut adalah Kunci Primer." }
    ],
    quiz: [
      { q: "Sebuah tabel buku pada layar komputer menampilkan 8 baris secara keseluruhan (termasuk bagian paling atas yang bertuliskan id_buku, judul, pengarang, tahun, stok). Berapa jumlah baris data buku yang sebenarnya tersimpan?",
        opts: ["8 baris data buku", "7 baris data buku, karena baris paling atas adalah baris judul yang berisi nama kolom dan bukan data", "9 baris data buku", "Tidak dapat dihitung tanpa perintah INSERT"], ans: 1,
        exp: "Baris paling atas adalah baris judul (header) yang berisi nama kolom, bukan data. Jadi 8 baris di layar dikurangi 1 baris judul = 7 baris data." },
      { q: "Pada tabel buku, sebuah baris memiliki nilai stok = 0, sedangkan baris buku lain memiliki nilai stok = NULL. Manakah pernyataan yang paling tepat menjelaskan perbedaan keduanya?",
        opts: ["Keduanya sama saja, artinya buku tersebut tidak ada di perpustakaan", "Stok 0 berarti belum pernah dihitung, sedangkan stok NULL berarti bukunya hilang", "Stok 0 berarti jumlahnya sudah diketahui/dihitung dan hasilnya nol (misal habis dipinjam), sedangkan stok NULL berarti belum diisi karena jumlahnya belum diketahui", "Stok NULL berarti bernilai spasi kosong"], ans: 2,
        exp: "Angka 0 berarti sudah dihitung dan hasilnya memang nol (habis dipinjam), sedangkan NULL adalah tanda bahwa sel belum diisi sehingga nilainya belum diketahui." },
      { q: "Mengapa kolom nomor_hp anggota perpustakaan (contoh: 08123456789) wajib menggunakan tipe data VARCHAR dan TIDAK disarankan menggunakan INT?",
        opts: ["Karena tipe data INT hanya bisa menampung maksimal 4 angka", "Karena nomor HP tidak dihitung secara matematis, diawali angka 0 yang akan hilang jika disimpan sebagai INT, dan bisa memuat karakter + (seperti +62)", "Karena VARCHAR otomatis menjumlahkan nomor telepon", "Karena INT hanya boleh dipakai untuk Kunci Primer"], ans: 1,
        exp: "Jika disimpan sebagai bilangan (INT), angka nol di depan (0812...) akan hilang menjadi 812..., selain itu nomor HP tidak pernah dioperasikan secara matematis dan bisa memuat tanda +." },
      { q: "Petugas perpustakaan menjalankan perintah: INSERT INTO buku VALUES ('BK002','Basis Data Lanjut','Ahmad Fauzi',2023,2); Padahal kode BK002 sudah digunakan oleh buku Sistem Basis Data. Pesan galat (error) manakah yang akan dikeluarkan oleh MySQL/MariaDB?",
        opts: ["ERROR 1048 (23000): Column 'id_buku' cannot be null", "ERROR 1366 (22007): Incorrect integer value", "ERROR 1062 (23000): Duplicate entry 'BK002' for key 'PRIMARY'", "ERROR 1136: Column count doesn't match value count"], ans: 2,
        exp: "ERROR 1062 (Duplicate entry ... for key PRIMARY) muncul ketika nilai kunci primer yang dimasukkan sudah dipakai oleh baris lain." },
      { q: "Seorang mahasiswa mengisi dua nama penulis sekaligus, yaitu \"Rina Kartika, Andi Wibowo\", ke dalam satu sel pada kolom pengarang. Aturan tabel yang baik nomor berapakah yang dilanggar?",
        opts: ["Aturan 1: Satu sel hanya boleh berisi satu nilai tunggal", "Aturan 2: Semua nilai dalam satu kolom harus sejenis", "Aturan 4: Urutan baris tidak berarti apa-apa", "Aturan 5: Urutan kolom tidak berarti apa-apa"], ans: 0,
        exp: "Aturan pertama tabel yang baik mewajibkan satu sel (pertemuan satu baris dan satu kolom) hanya berisi satu keterangan/nilai tunggal saja." },
      { q: "Manakah di bawah ini yang merupakan alasan tepat mengapa kolom \"judul\" TIDAK dipilih sebagai Kunci Primer (Primary Key) pada tabel buku?",
        opts: ["Karena kolom judul bertipe VARCHAR dan VARCHAR dilarang menjadi kunci primer", "Karena dua buku bisa saja berjudul sama, judul panjang sehingga rawan salah ketik, dan judul bisa berubah pada cetakan berikutnya", "Karena judul buku selalu bernilai NULL", "Karena kolom judul terletak di kolom kedua"], ans: 1,
        exp: "Penanda unik (Kunci Primer) tidak boleh kembar, tidak boleh rawan salah ketik, dan tidak boleh berubah. Dua buku cetakan berbeda bisa memiliki judul yang sama." },
      { q: "Untuk menyimpan kolom \"nomor_rak\" yang panjangnya selalu tetap 3 karakter (seperti R01, R02) dan kolom \"tgl_daftar\" yang memuat tanggal, bulan, serta tahun lengkap, pasangan tipe data apakah yang paling tepat?",
        opts: ["VARCHAR(80) dan YEAR", "CHAR(3) dan DATE", "INT dan YEAR", "DATE dan CHAR(5)"], ans: 1,
        exp: "Teks yang panjangnya selalu sama/tetap menggunakan CHAR(n) → CHAR(3), sedangkan tanggal lengkap (tanggal, bulan, tahun) menggunakan DATE." },
      { q: "Ketika petugas menjalankan perintah INSERT INTO buku VALUES ('BK006','Buku Uji','Uji Coba','dua ribu',2); muncul pesan ERROR 1366: Incorrect integer value: 'dua ribu' for column 'tahun'. Mengapa hal ini terjadi?",
        opts: ["Karena kode BK006 terlalu panjang", "Karena kolom tahun bertipe YEAR (hanya menerima angka tahun), tetapi diisi dengan teks 'dua ribu' (melanggar aturan nilai sejenis dalam satu kolom)", "Karena kolom tahun adalah Kunci Primer", "Karena jumlah kolom tidak sesuai"], ans: 1,
        exp: "Kolom tahun bertipe YEAR sehingga hanya menerima bilangan bulat tahun (misalnya 2020). Mengisi teks \"dua ribu\" ditolak oleh DBMS dengan ERROR 1366." },
      { q: "Berdasarkan materi Sistem Basis Data, komponen manakah yang bertugas menjadi perantara sehingga beberapa pemakai (user) atau program dapat mengakses dan memanipulasi tabel-tabel dalam basis data secara bersamaan?",
        opts: ["DBMS (Database Management System)", "Lemari Arsip Fisik", "Baris Judul (Header)", "Kunci Kandidat"], ans: 0,
        exp: "DBMS (Database Management System) adalah perangkat lunak pengelola yang menjadi perantara antara basis data di disk dengan para pemakai/program aplikasi." },
      { q: "Basis data dirancang untuk menghilangkan pengulangan data (redundansi) yang tidak perlu sehingga menghemat tempat penyimpanan, serta memungkinkan data dipakai bersama oleh banyak pengguna sekaligus. Dalam 7 Tujuan Objektif Basis Data, kedua hal ini disebut...",
        opts: ["Speed dan Completeness", "Space (Efisiensi Ruang Penyimpanan) dan Sharability (Kebersamaan Pemakaian)", "Security dan Availability", "Hardware dan Operating System"], ans: 1,
        exp: "Penghematan ruang penyimpanan dengan menekan redundansi disebut Space, sedangkan pemakaian bersama oleh banyak pengguna disebut Sharability." }
    ],
    ringkasan: `*RANGKUMAN KILAT UTS BASIS DATA — PERTEMUAN 2*
📚 *Model Data Relasional & Sistem Basis Data*

1️⃣ *Anatomi Tabel & Jebakan Baris Judul:*
• Kata *Relasional* berasal dari *Relation* = Tabel (Baris mendatar & Kolom menurun).
• *JEBAKAN UTS:* Baris paling atas adalah *Baris Judul* (berisi nama kolom, BUKAN data). Jika di layar tampak 6 baris, maka jumlah datanya hanya *5 baris data*!

2️⃣ *5 Aturan Tabel yang Baik:*
1. Satu sel hanya berisi *satu nilai tunggal* (tidak boleh 2 pengarang di 1 sel).
2. Semua nilai dalam satu kolom harus *sejenis* (kolom tahun wajib angka tahun).
3. Setiap baris harus *berbeda/unik* (ada Kunci Primer).
4. *Urutan baris* tidak mengubah arti tabel.
5. *Urutan kolom* tidak mengubah arti tabel.

3️⃣ *Kunci Primer (Primary Key) vs Kunci Kandidat:*
• *Kunci Primer (id_buku):* Penanda unik, tidak boleh kembar & tidak boleh kosong (NOT NULL).
• Mengapa bukan *judul*? (1) Dua buku bisa berjudul sama, (2) Rawan salah ketik karena panjang, (3) Bisa berubah di cetakan berikutnya.
• *Kunci Kandidat:* Kolom lain yang juga layak jadi kunci primer (contoh: Nomor ISBN).

4️⃣ *5 Tipe Data & Jebakan Nomor HP:*
• *CHAR(n):* Teks panjang selalu tetap (id_buku CHAR(5), nomor_rak CHAR(3)).
• *VARCHAR(n):* Teks panjang berubah-ubah (judul VARCHAR(80), nomor_hp VARCHAR(15)).
• *INT:* Bilangan bulat (stok INT, jumlah_halaman INT).
• *YEAR:* Tahun 4 digit (tahun YEAR).
• *DATE:* Tanggal lengkap (tgl_daftar DATE).
• ⚠️ *Mengapa nomor_hp wajib VARCHAR & bukan INT?* Karena tidak dihitung matematis, diawali angka 0 yang akan hilang jika memakai INT, dan bisa memuat tanda + (+62).

5️⃣ *Perbedaan stok = 0 vs stok = NULL:*
• *stok = 0:* Sudah dihitung dan hasilnya memang nol (bukunya sedang habis dipinjam).
• *stok = NULL:* Sel belum diisi karena belum pernah dihitung/belum diketahui.

6️⃣ *6 Kode Error DBMS yang Wajib Hafal:*
• *ERROR 1062:* Duplicate entry (Nilai kunci primer kembar).
• *ERROR 1048:* Column cannot be null (Kolom wajib isi diberi NULL).
• *ERROR 1366:* Incorrect integer value (Kolom angka/tahun diisi teks).
• *ERROR 1406:* Data too long (Isian melebihi batas panjang karakter kolom).
• *ERROR 1136:* Column count doesn't match (Jumlah nilai tidak sama dengan jumlah kolom).
• *ERROR 1068:* Multiple primary key defined (Memasang >1 kunci primer).

7️⃣ *Konsep Sistem Basis Data (Slide):*
• *7 Tujuan Objektif:* Speed, Space, Accuracy, Availability, Completeness, Security, Sharability.
• *8 Operasi Dasar:* create database, drop database, create table, drop table, insert, retrieve/search, update, delete.
• *6 Komponen:* Hardware, OS, Database, DBMS (perantara multi-user), User, Aplikasi Lain (opsional).`
  }]
};
