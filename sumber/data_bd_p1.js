// Basis Data — Pertemuan 1: Konsep Dasar Basis Data dan DBMS (modul + PPT dosen, Bab 1)
module.exports = {
  id: "p1", nomor: 1, judul: "Konsep Dasar Basis Data dan DBMS", ujian: "CPMK 1",
  hero: {
    badge: "Penyusun Materi: Wicaksono Yuli Sulistyo, S.Kom., M.Kom., CSA.",
    title: "Dari Lemari Arsip Perpustakaan ke Tabel, DBMS, dan SQL",
    text: "Pahami bedanya <strong>data vs informasi</strong>, kenapa <strong>Excel saja tidak cukup</strong>, apa tugas <strong>DBMS</strong>, <strong>hierarki data</strong>, dan kenalan pertama dengan perintah <code>SELECT</code>."
  },
  cheatsheet: [
    { type: "choices", label: "Interaktif 1 • Data vs Informasi", title: "Beras dan Nasi", desc: "Klik saklar untuk membandingkan:", style: "toggle",
      options: [
        { label: "Data", tone: "amber", badge: "Beras", title: "Catatan mentah tanpa konteks", text: "Contoh: angka <code>2021</code>. Tahun berapa? Jumlah apa? Nomor apa? Belum bisa dipakai mengambil keputusan.", note: "Contoh lain: <code>BK003</code>, <code>Dewi Anggraini</code>, <code>2018</code>." },
        { label: "Informasi", tone: "emerald", badge: "Nasi", title: "Data yang sudah diberi konteks", text: "“Buku <em>Sistem Basis Data</em> karya Rina Kartika terbit 2021 dan tersisa 3 eksemplar.” Kalimat ini bisa dipakai untuk memutuskan: buku masih cukup baru untuk rujukan.", note: "Ciri informasi: berupa kalimat/keterangan utuh yang menjawab pertanyaan." }
      ] },
    { type: "table", label: "Interaktif 2 • Tabel Padanan (Dipakai sampai Bab 12)", title: "Lemari Arsip Perpustakaan = Basis Data", headers: ["Bagian lemari arsip", "Istilah basis data", "Contoh perpustakaan"],
      rows: [["Lemarinya", "Basis data", "perpustakaan"], ["Satu laci", "Tabel", "buku, anggota, peminjaman"], ["Satu kartu di dalam laci", "Baris (record)", "kartu buku BK002"], ["Kotak isian pada kartu", "Kolom (field)", "judul, pengarang, tahun, stok"], ["Nomor di sudut kartu", "Kunci primer", "id_buku"], ["Petugas pemegang kunci lemari", "DBMS", "MySQL"], ["Formulir permintaan buku", "Perintah SQL", "`SELECT * FROM buku;`"], ["Loket tempat menyerahkan formulir", "phpMyAdmin", "halaman di peramban"]],
      modes: [
        { label: "Yang paling sering tertukar", target: "row", row: 5, title: "DBMS ≠ basis data", text: "Basis data adalah <strong>lemarinya</strong> (isi data). DBMS adalah <strong>petugasnya</strong> (perangkat lunak yang menjaga dan melayani)." },
        { label: "phpMyAdmin itu apa?", target: "row", row: 7, title: "Loket, bukan DBMS", text: "phpMyAdmin hanyalah halaman web untuk mengirim perintah ke MySQL tanpa mengetik di terminal. DBMS-nya tetap MySQL." },
        { label: "Kunci primer", target: "row", row: 4, title: "Nomor unik tiap kartu", text: "Seperti nomor di sudut kartu: dibuat berbeda untuk setiap buku. Istilah resminya dibahas di Bab 2." }
      ] },
    { type: "cards", label: "Interaktif 3 • Kenapa Lembar Kerja (Excel) Tidak Cukup?", title: "4 Masalah Saat Data Membesar", cols: 2,
      items: [
        { badge: "1", tone: "rose", title: "Data berulang-ulang", text: "Nama pengarang diketik ulang tiap baris. “Rina Kartika” dan “Rina Kartka” dianggap dua orang." },
        { badge: "2", tone: "amber", title: "Data tidak seragam", text: "Pegawai A mengubah stok, pegawai B masih memegang berkas lama. Mana yang benar?" },
        { badge: "3", tone: "violet", title: "Sulit dipakai bersama", text: "Tiga orang membuka berkas yang sama; perubahan satu orang menimpa yang lain." },
        { badge: "4", tone: "sky", title: "Tidak ada penjaga aturan", text: "Kolom tahun bisa diisi “tahun lalu” atau dikosongkan, dan lembar kerja diam saja." }
      ] },
    { type: "callout", tone: "tip", heading: "Ibarat daftar hadir yang difotokopi", html: "Setiap orang mencoret di lembarnya sendiri. Saat dikumpulkan, tidak ada yang tahu coretan mana yang paling baru. Basis data + DBMS seperti lemari berpetugas: kartu aslinya hanya satu, dan hanya petugas yang berhak mengubahnya." },
    { type: "row", cols: [1, 1], blocks: [
      { type: "list", label: "Interaktif 4 • DBMS", title: "5 Tugas Petugas (DBMS)", items: ["Mencarikan data tanpa peminta perlu tahu letaknya di komputer", "Menolak data yang melanggar aturan (tahun diisi huruf)", "Mengatur giliran saat banyak orang mengubah data yang sama", "Mengatur siapa boleh melihat dan siapa boleh mengubah", "Membuat cadangan (backup) agar data tidak hilang"] },
      { type: "cards", label: "Contoh DBMS", title: "6 DBMS Populer", cols: 2, items: [
        { title: "MySQL", text: "Dipakai di matkul ini (paket MAMP + phpMyAdmin).", tone: "indigo" }, { title: "MariaDB", text: "Turunan MySQL." }, { title: "PostgreSQL", text: "Open source." }, { title: "Oracle Database", text: "Perusahaan besar." }, { title: "Microsoft SQL Server", text: "Ekosistem Microsoft." }, { title: "SQLite", text: "Ringan, di dalam aplikasi HP." }
      ] }
    ] },
    { type: "callout", tone: "info", heading: "Sistem basis data = seluruh ruang arsip", html: "Gabungan <strong>basis data</strong> (lemari), <strong>DBMS</strong> (petugas), <strong>perangkat keras</strong> (meja dan ruangan), dan <strong>orang-orang yang memakainya</strong> (pengunjung)." },
    { type: "flow", label: "Interaktif 5 • Hierarki Data", title: "Susunan Data dari yang Terkecil", desc: "Seperti buku: huruf → kata → kalimat → halaman → buku. Jenisnya tetap, yang berubah hanya cakupannya.",
      items: ["Karakter", "Kolom", "Baris", "Tabel", "Basis data"], highlight: 2, note: "Contoh: huruf <code>S</code> → kolom judul “Sistem Basis Data” → baris buku BK002 → tabel buku → basis data perpustakaan." },
    { type: "table", label: "Interaktif 6 • Kenalan dengan SQL", title: "Membaca <code>SELECT judul, stok FROM buku WHERE stok &lt; 3;</code>", headers: ["Bagian", "Artinya"],
      rows: [["`SELECT judul, stok`", "Tampilkan hanya kolom judul dan stok (`*` = semua kolom)"], ["`FROM buku`", "Dari tabel bernama buku"], ["`WHERE stok < 3`", "Khusus baris yang stoknya kurang dari 3"], ["`;`", "Perintah selesai. Kalau lupa, DBMS menunggu terus"]],
      modes: [{ label: "Hasilnya", target: "row", row: 2, title: "5 baris → 2 lolos saringan", text: "Jaringan Komputer Dasar (2) dan Statistika untuk Informatika (1). Inilah informasi: pertanyaan petugas terjawab seketika." }],
      defaultNote: "SQL dibaca “es-ki-el” atau “sikuel”. SQL bukan bahasa serba guna seperti Python; ia hanya mengurus data. Belum perlu dihafal, praktik mulai Bab 6." }
  ],
  simulator: [
    { type: "exercise", label: "Permainan Interaktif 1 • Latihan Tingkat 1 Modul", title: "Data atau Informasi?", headers: ["Butir", "Jenis"],
      rows: [["BK003", "Data", "✓ Kode saja, tanpa konteks."], ["Buku Jaringan Komputer Dasar tersisa dua eksemplar di rak.", "Informasi", "✓ Ada konteks: judul + stok."], ["2018", "Data", "✓ Angka mentah."], ["Ada dua judul buku yang stoknya kurang dari tiga eksemplar.", "Informasi", "✓ Hasil olahan yang menjawab pertanyaan."], ["Dewi Anggraini", "Data", "✓ Nama saja: pengarang? anggota? belum jelas."]]
        .map(([c, a, ok]) => ({ cells: [c], fields: [{ options: ["Data", "Informasi"], answer: a }], ok })) },
    { type: "detective", label: "Permainan Interaktif 2 • Latihan Tingkat 2 Modul", title: "Detektif: Rapikan Daftar Buku Petugas", desc: "Daftar petugas sudah dimasukkan ke tabel apa adanya. Klik <strong>sel yang bermasalah</strong> untuk memperbaikinya!",
      rules: ["Satu kotak isian hanya berisi <strong>satu keterangan</strong>.", "Isi satu kolom harus <strong>sejenis</strong> (tahun = angka, stok = angka).", "Setiap baris punya <strong>kode unik</strong> dan isian lengkap."],
      headers: ["id_buku", "judul", "pengarang", "tahun", "stok"],
      rows: [["BK002", "Sistem Basis Data - Rina Kartika", "", "2021", "sisa 3"], ["BK001", "Dasar Pemrograman Komputer", "Andi Wibowo", "dua ribu sembilan belas", "4"], ["BK003", "Jaringan Komputer Dasar", "Budi Santoso", "2018", "2"]],
      bugs: [
        { row: 0, col: 1, fixed: "Sistem Basis Data", explain: "✅ <strong>Judul dan pengarang tercampur</strong> dalam satu kotak. Judul saja yang masuk kolom judul." },
        { row: 0, col: 2, fixed: "Rina Kartika", explain: "✅ <strong>Pengarang dipindah</strong> ke kolomnya sendiri." },
        { row: 0, col: 4, fixed: "3", explain: "✅ <strong>Stok harus angka saja.</strong> Kata “sisa” membuat komputer tidak bisa menghitung." },
        { row: 1, col: 3, fixed: "2019", explain: "✅ <strong>Tahun ditulis angka.</strong> “dua ribu sembilan belas” tidak bisa diurutkan atau dibandingkan." }
      ] },
    { type: "terminal", label: "Permainan Interaktif 3 • Simulator SQL & Pesan Galat", title: "Coba Jalankan Perintah ke Basis Data perpustakaan", desc: "Klik skenario. Dua perintah berhasil, sisanya contoh kesalahan yang paling sering ditemui mulai Bab 6.", shell: "MariaDB [perpustakaan]>", header: "Terminal Simulasi Basis Data Perpustakaan",
      scenarios: [
        { label: "1. SELECT * FROM buku;", pill: "OK", ok: true, cmd: "SELECT * FROM buku;",
          res: "+---------+------------------------------+----------------+-------+------+\n| id_buku | judul                        | pengarang      | tahun | stok |\n+---------+------------------------------+----------------+-------+------+\n| BK001   | Dasar Pemrograman Komputer   | Andi Wibowo    |  2019 |    4 |\n| BK002   | Sistem Basis Data            | Rina Kartika   |  2021 |    3 |\n| BK003   | Jaringan Komputer Dasar      | Budi Santoso   |  2018 |    2 |\n| BK004   | Analisis Sistem Informasi    | Siti Nurhaliza |  2022 |    5 |\n| BK005   | Statistika untuk Informatika | Dewi Anggraini |  2020 |    1 |\n+---------+------------------------------+----------------+-------+------+\n5 rows in set",
          exp: "“Tampilkan semua kolom dari tabel buku.” Lima baris keluar. Baris paling atas bukan data, melainkan nama kolom." },
        { label: "2. Stok menipis (WHERE)", pill: "OK", ok: true, cmd: "SELECT judul, stok FROM buku WHERE stok < 3;",
          res: "+------------------------------+------+\n| judul                        | stok |\n+------------------------------+------+\n| Jaringan Komputer Dasar      |    2 |\n| Statistika untuk Informatika |    1 |\n+------------------------------+------+\n2 rows in set",
          exp: "Dari 5 baris, hanya 2 yang lolos saringan. Data diolah menjadi <strong>informasi</strong>." },
        { label: "3. Salah ketik SELCT", code: "1064", pill: "ERROR 1064", ok: false, cmd: "SELCT * FROM buku;", res: "ERROR 1064 (42000): You have an error in your SQL syntax; check the manual ... near 'SELCT * FROM buku' at line 1", exp: "<strong>Penyebab:</strong> kata perintah salah ketik. <strong>Perbaikan:</strong> periksa ejaan. 1064 hampir selalu berarti salah ketik." },
        { label: "4. Tabel bukku", code: "1146", pill: "ERROR 1146", ok: false, cmd: "SELECT * FROM bukku;", res: "ERROR 1146 (42S02): Table 'perpustakaan.bukku' doesn't exist", exp: "<strong>Penyebab:</strong> nama tabel salah. <strong>Perbaikan:</strong> nama tabel harus persis sama: <code>buku</code>." },
        { label: "5. Kolom judl", code: "1054", pill: "ERROR 1054", ok: false, cmd: "SELECT judl FROM buku;", res: "ERROR 1054 (42S22): Unknown column 'judl' in 'field list'", exp: "<strong>Penyebab:</strong> nama kolom salah ketik. <strong>Perbaikan:</strong> cek daftar kolom, betulkan menjadi <code>judul</code>." },
        { label: "6. Belum pilih database", code: "1046", pill: "ERROR 1046", ok: false, cmd: "SELECT * FROM buku;", res: "ERROR 1046 (3D000): No database selected", exp: "<strong>Penyebab:</strong> perintah dijalankan tanpa memilih basis data. <strong>Perbaikan:</strong> jalankan <code>USE perpustakaan;</code> atau klik nama basis data di sisi kiri phpMyAdmin." },
        { label: "7. Lupa titik koma", pill: "Menunggu…", ok: false, cmd: "SELECT * FROM buku", res: "    ->", exp: "<strong>Penyebab:</strong> belum ada <code>;</code>, jadi DBMS mengira perintah belum selesai dan menampilkan tanda <code>-&gt;</code>. <strong>Perbaikan:</strong> ketik <code>;</code> lalu Enter." }
      ] },
    { type: "exercise", label: "Permainan Interaktif 4 • Mini-Case Modul", title: "Kartu Anggota → Nama Kolom", desc: "Pilih nama kolom yang tepat (huruf kecil, tanpa spasi) untuk setiap keterangan di kartu anggota.", headers: ["Keterangan di kartu", "Nama kolom"],
      rows: [["Nomor anggota: AG001", "id_anggota"], ["Nama: Ahmad Fauzi", "nama"], ["Program studi: Sistem Informasi", "prodi"], ["Tanggal daftar: 12 September 2026", "tgl_daftar"], ["Nomor HP: 0812xxxxxxx", "nomor_hp"]]
        .map(([c, a]) => ({ cells: [c], fields: [{ options: ["id_anggota", "nama", "prodi", "tgl_daftar", "nomor_hp", "Nomor HP", "Tanggal Daftar"], answer: a }], ok: "✓" })) },
    { type: "reveal", label: "Mini-Case • Lanjutan", title: "Kolom Mana yang Jadi Penanda Unik?", items: [
      { prompt: "id_anggota, nama, prodi, tgl_daftar, nomor_hp: mana yang paling pantas jadi penanda unik?", answer: "id_anggota", reason: "Dibuat berbeda untuk setiap anggota, singkat, dan tidak berubah. Nama bisa kembar; banyak anggota satu prodi; nomor HP bisa ganti." },
      { prompt: "Urutkan dari terkecil: tabel, karakter, basis data, baris, kolom", answer: "Karakter → kolom → baris → tabel → basis data", reason: "Cek pemahaman nomor 4 di modul." }
    ] }
  ],
  flashcards: [
    { tag: "Konsep", q: "Apa beda data dan informasi?", a: "<strong>Data</strong> = catatan mentah tanpa konteks (2021). <strong>Informasi</strong> = data yang diberi konteks sehingga berguna untuk keputusan (“buku X terbit 2021”). Ibarat beras dan nasi." },
    { tag: "Definisi", q: "Apa itu basis data (versi modul P1)?", a: "Kumpulan data yang <strong>saling berhubungan</strong>, disimpan secara <strong>teratur</strong>, sehingga mudah dicari dan dapat dipakai bersama. Syaratnya: bentuk seragam + susunan teratur." },
    { tag: "Analogi", q: "Satu laci di lemari arsip padanannya apa?", a: "<strong>Tabel</strong> (misalnya tabel buku). Satu kartu = baris/record, kotak isian = kolom/field." },
    { tag: "Analogi", q: "Petugas pemegang kunci lemari arsip padanannya apa?", a: "<strong>DBMS</strong>, misalnya MySQL." },
    { tag: "Jebakan", q: "Apakah phpMyAdmin itu DBMS?", a: "<strong>Bukan.</strong> phpMyAdmin hanya loket (halaman web) untuk mengirim perintah. DBMS-nya MySQL." },
    { tag: "Konsep", q: "Sebutkan 4 masalah menyimpan data hanya di lembar kerja.", a: "Data berulang, data tidak seragam, sulit dipakai bersama, tidak ada penjaga aturan." },
    { tag: "DBMS", q: "Sebutkan 5 tugas DBMS.", a: "Mencarikan data, menolak data yang melanggar aturan, mengatur giliran, mengatur hak akses, membuat cadangan." },
    { tag: "Hierarki", q: "Urutan hierarki data dari terkecil?", a: "Karakter → kolom → baris → tabel → basis data." },
    { tag: "SQL", q: "Apa arti tanda * pada SELECT * FROM buku;?", a: "Semua kolom tanpa kecuali." },
    { tag: "Galat", q: "ERROR 1064 biasanya berarti apa?", a: "Salah ketik kata perintah (misalnya SELCT). 1146 = tabel tidak ada, 1054 = kolom tidak dikenal, 1046 = belum pilih database." },
    { tag: "Konsep", q: "Apa itu sistem basis data?", a: "Gabungan basis data, DBMS, perangkat keras, dan orang-orang yang memakainya (seluruh ruang arsip)." }
  ],
  quiz: [
    { q: "Secarik kertas hanya bertuliskan angka 2021. Angka itu termasuk…", opts: ["Informasi, karena berupa angka tahun", "Data, karena belum punya konteks", "Basis data, karena tersimpan di kertas", "Kunci primer"], ans: 1, exp: "Tanpa konteks (tahun apa? jumlah apa?) angka 2021 masih data mentah." },
    { q: "Ibarat yang dipakai modul untuk data dan informasi adalah…", opts: ["Beras dan nasi", "Lemari dan laci", "Petugas dan pengunjung", "Formulir dan loket"], ans: 0, exp: "Data = beras (belum bisa langsung dimakan), informasi = nasi." },
    { q: "Dua syarat agar sekumpulan data pantas disebut basis data adalah…", opts: ["Banyak dan mahal", "Bentuknya seragam dan susunannya teratur", "Disimpan di Excel dan dicetak", "Memakai warna dan gambar"], ans: 1, exp: "Catatan yang bentuknya beragam dan letaknya sembarangan tetap data, tetapi belum basis data." },
    { q: "Dalam padanan lemari arsip, “satu kartu di dalam laci” sama dengan…", opts: ["Tabel", "Kolom", "Baris (record)", "Basis data"], ans: 2, exp: "Lemari = basis data, laci = tabel, kartu = baris, kotak isian = kolom." },
    { q: "“Rina Kartika” dan “Rina Kartka” dianggap dua orang berbeda oleh komputer. Ini masalah lembar kerja yang disebut…", opts: ["Sulit dipakai bersama", "Data berulang-ulang", "Tidak ada penjaga aturan", "Data terlalu sedikit"], ans: 1, exp: "Nama diketik ulang di setiap baris sehingga rawan salah ketik." },
    { q: "Pegawai A mengubah stok, pegawai B masih memegang berkas lama. Ini contoh…", opts: ["Data tidak seragam", "Data berulang", "Hierarki data", "Kunci primer"], ans: 0, exp: "Berkas yang berbeda versi membuat angka yang benar tidak jelas." },
    { q: "Perangkat lunak yang menyimpan data, menjaga aturannya, dan melayani permintaan terhadap basis data disebut…", opts: ["phpMyAdmin", "SQL", "DBMS", "MAMP"], ans: 2, exp: "DBMS = Database Management System, ibarat petugas perpustakaan." },
    { q: "Berikut contoh DBMS, kecuali…", opts: ["MySQL", "PostgreSQL", "SQLite", "phpMyAdmin"], ans: 3, exp: "phpMyAdmin adalah halaman web pengelola MySQL, bukan DBMS." },
    { q: "Urutan hierarki data dari cakupan terkecil yang benar adalah…", opts: ["Kolom → karakter → baris → tabel → basis data", "Karakter → kolom → baris → tabel → basis data", "Karakter → baris → kolom → basis data → tabel", "Tabel → baris → kolom → karakter → basis data"], ans: 1, exp: "Huruf menyusun kolom, kolom menyusun baris, baris menyusun tabel, tabel menyusun basis data." },
    { q: "Arti perintah SELECT * FROM buku; adalah…", opts: ["Hapus semua isi tabel buku", "Tampilkan semua kolom dari tabel buku", "Buat tabel buku", "Tampilkan kolom bernama * saja"], ans: 1, exp: "* = semua kolom; FROM buku = dari tabel buku." },
    { q: "Perintah SELECT * FROM buku (tanpa ;) membuat DBMS…", opts: ["Langsung menampilkan hasil", "Menghapus tabel", "Menunggu terus karena perintah dianggap belum selesai", "Menampilkan ERROR 1146"], ans: 2, exp: "Titik koma menandakan perintah selesai." },
    { q: "Muncul pesan “ERROR 1146 Table 'perpustakaan.bukku' doesn't exist”. Penyebabnya…", opts: ["Kata SELECT salah ketik", "Nama tabel salah ketik", "Belum memilih database", "Lupa titik koma"], ans: 1, exp: "Tabelnya bernama buku, bukan bukku." },
    { q: "Pada tabel buku, kolom yang paling tepat dijadikan penanda unik adalah…", opts: ["judul", "pengarang", "id_buku", "tahun"], ans: 2, exp: "id_buku dibuat berbeda untuk setiap buku; judul bisa kembar, panjang, dan mudah salah ketik." },
    { q: "Gabungan basis data, DBMS, perangkat keras, dan orang-orang yang memakainya disebut…", opts: ["Sistem basis data", "Hierarki data", "Lembar kerja", "Perintah SQL"], ans: 0, exp: "Dalam ibarat, sistem basis data adalah seluruh ruang arsip." }
  ],
  ringkasan: `*RANGKUMAN BASIS DATA — PERTEMUAN 1*
📚 *Konsep Dasar Basis Data dan DBMS*

1️⃣ *Data vs Informasi:* data = catatan mentah (2021), informasi = data + konteks (“buku X terbit 2021”). Ibarat beras & nasi.
2️⃣ *Basis data:* kumpulan data yang saling berhubungan, disimpan teratur, mudah dicari & dipakai bersama. Syarat: bentuk seragam + susunan teratur.
3️⃣ *Padanan lemari arsip:* lemari = basis data • laci = tabel • kartu = baris • kotak isian = kolom • nomor sudut = kunci primer • petugas = DBMS • formulir = SQL • loket = phpMyAdmin.
4️⃣ *Lembar kerja tidak cukup:* data berulang, tidak seragam, sulit dipakai bersama, tanpa penjaga aturan.
5️⃣ *DBMS:* mencarikan data, menolak isian salah, mengatur giliran & hak akses, backup. Contoh: MySQL, MariaDB, PostgreSQL, Oracle, SQL Server, SQLite.
6️⃣ *Hierarki:* karakter → kolom → baris → tabel → basis data.
7️⃣ *SQL:* SELECT * FROM buku; • SELECT judul, stok FROM buku WHERE stok < 3;
8️⃣ *Galat:* 1064 salah ketik perintah • 1146 tabel tidak ada • 1054 kolom tidak dikenal • 1046 belum pilih database • lupa ; → menunggu.`
};
