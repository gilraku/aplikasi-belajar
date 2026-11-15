// Simulator "Bedah Kasus" Basis Data (P8): konsep P2–P7 dalam cerita baru, seperti soal UTS
// (bengkel, klinik, hotel, notaris, minimarket, penerbit). Bukan dari modul LMS; kaidahnya mengikuti modul.
const ATURAN = ["Aturan pertama", "Aturan kedua (1:1)", "Aturan ketiga (1:N)", "Aturan keempat (M:N)", "Tidak ada aturan"];
const KARD = ["1 : 1", "1 : N", "M : N"];
const TABEL = ["1 tabel", "2 tabel", "3 tabel", "4 tabel"];
const ANOMALI = ["Anomali penyisipan", "Anomali pengubahan", "Anomali penghapusan"];
// Satu langkah = satu baris latihan: [no, pertanyaan, pilihan, jawaban, penjelasan bila benar]
// Urutan pilihan digeser per langkah supaya jawaban benar tidak selalu di posisi yang sama
const rot = (o, k) => o.slice(k % o.length).concat(o.slice(0, k % o.length));
const step = (no, q, options, answer, ok) => ({ cells: [no, q], fields: [{ options: options === KARD || options === TABEL || options === ATURAN || options === ANOMALI ? options : rot(options, Number(no) * 3 + 1), answer }], ok: "✓ " + ok });
const kasus = (label, cerita, steps, footer) => ({
  label,
  blocks: [
    { type: "callout", tone: "tip", heading: "Cerita", html: cerita },
    { type: "exercise", label: "Bedah langkah demi langkah", title: label.replace(/^\S+\s/, "") + ": dari Cerita ke Tabel", headers: ["#", "Pertanyaan", "Jawabanmu"], rows: steps, footer }
  ]
});

module.exports = {
  type: "tabs", label: "Simulator Bedah Kasus • Bukan dari modul LMS", title: "Konsep Sama, Cerita Baru",
  desc: "Soal ujian sering membungkus konsep P2–P7 dengan cerita baru. Pilih satu kasus, jawab tiap langkah, lalu klik Periksa. Kaidahnya sama dengan modul: kata benda → entitas (tunggal), kata kerja → relasi, kardinalitas menentukan aturan transformasi.",
  tabs: [
    kasus("🔧 Bengkel",
      "Bengkel mencatat setiap <strong>montir</strong> (kode montir, nama, nomor HP) dan setiap <strong>servis</strong> (nomor servis, tanggal, plat nomor, biaya jasa). <strong>Setiap servis dikerjakan oleh satu montir</strong>, sedangkan satu montir mengerjakan banyak servis.",
      [
        step("1", "Entitasnya (kata benda yang datanya disimpan)?", ["Montir dan Servis", "Montir dan Plat nomor", "Bengkel dan Tanggal", "Servis dan Biaya jasa"], "Montir dan Servis", "Plat nomor, tanggal, dan biaya jasa hanya keterangan (atribut) milik servis."),
        step("2", "Penulisan nama entitas yang benar?", ["Montir", "Para Montir", "Montir-montir", "Mengerjakan"], "Montir", "Nama entitas memakai kata benda tunggal."),
        step("3", "Relasinya?", ["mengerjakan", "montir", "servis", "tanggal"], "mengerjakan", "Relasi berupa kata kerja yang menghubungkan dua entitas."),
        step("4", "Kardinalitas Montir–Servis?", KARD, "1 : N", "Satu montir → banyak servis; satu servis → satu montir."),
        step("5", "Aturan transformasi untuk relasinya?", ATURAN, "Aturan ketiga (1:N)", "1:N: kunci sisi satu dititipkan ke sisi banyak, tanpa tabel baru."),
        step("6", "Berapa tabel yang dihasilkan?", TABEL, "2 tabel", "montir dan servis. Relasi 1:N tidak butuh tabel ketiga."),
        step("7", "Kunci tamu diletakkan di mana?", ["id_montir di tabel servis", "id_servis di tabel montir", "Tabel penghubung baru", "Tidak perlu kunci tamu"], "id_montir di tabel servis", "Kunci tamu selalu di sisi banyak (servis)."),
        step("8", "Keuntungan menyimpan id_montir, bukan nama montir, di tabel servis?", ["Perbaikan nama cukup sekali di tabel montir", "Jumlah barisnya berkurang", "Kunci primer tidak diperlukan", "Tabelnya lebih panjang"], "Perbaikan nama cukup sekali di tabel montir", "Tabel servis hanya menunjuk, tidak menyalin. Nama salah cukup diperbaiki di satu tempat."),
        step("9", "Tipe data nomor HP montir (contoh 0812…)?", ["VARCHAR(15)", "INT", "YEAR", "DATE"], "VARCHAR(15)", "Nomor HP tidak dihitung, diawali 0, dan bisa memuat tanda +, jadi disimpan sebagai teks.")
      ],
      "Skema akhir: <code>montir(id_montir, nama, no_hp)</code> • <code>servis(no_servis, id_montir*, tanggal, plat_nomor, biaya_jasa)</code>"),

    kasus("🩺 Klinik",
      "Klinik mencatat <strong>pasien</strong> (nomor rekam medis, nama, tanggal lahir) dan <strong>dokter</strong> (kode dokter, nama, spesialis). Setiap kali pasien <strong>berobat</strong>, dicatat tanggal dan keluhannya. Satu pasien bisa berobat ke banyak dokter, dan satu dokter melayani banyak pasien.",
      [
        step("1", "Entitasnya?", ["Pasien dan Dokter", "Pasien dan Keluhan", "Klinik dan Tanggal", "Dokter dan Spesialis"], "Pasien dan Dokter", "Keluhan dan spesialis adalah atribut."),
        step("2", "Relasinya?", ["berobat", "pasien", "keluhan", "spesialis"], "berobat", "Kata kerja yang menghubungkan Pasien dan Dokter."),
        step("3", "Kardinalitasnya?", KARD, "M : N", "Satu pasien → banyak dokter; satu dokter → banyak pasien."),
        step("4", "Tanggal dan keluhan termasuk atribut milik…", ["Relasi berobat", "Entitas Pasien", "Entitas Dokter", "Bukan atribut"], "Relasi berobat", "Tanggal berobat bukan milik pasien atau dokter, melainkan milik peristiwa berobat (elips putus-putus di ERD modul)."),
        step("5", "Aturan transformasi untuk kedua entitasnya?", ATURAN, "Aturan pertama", "Setiap entitas menjadi satu tabel."),
        step("6", "Aturan transformasi untuk relasinya?", ATURAN, "Aturan keempat (M:N)", "M:N membutuhkan tabel ketiga (tabel penghubung)."),
        step("7", "Berapa tabel yang dihasilkan?", TABEL, "3 tabel", "pasien, dokter, dan kunjungan."),
        step("8", "Mengapa relasi ini tidak cukup dengan dua tabel?", ["Tidak ada tempat yang tepat untuk menitipkan kuncinya", "DBMS membatasi jumlah tabel", "Kunci primer tidak boleh berulang", "Kedua entitas pasti berukuran sama"], "Tidak ada tempat yang tepat untuk menitipkan kuncinya", "Kalimat modul. Menitipkan id_dokter di tabel pasien gagal karena satu pasien bisa ke banyak dokter, padahal satu sel hanya boleh satu nilai."),
        step("9", "Jika semua disimpan dalam satu tabel kunjungan, dokter baru tidak bisa dicatat sebelum menangani pasien. Anomali apa?", ANOMALI, "Anomali penyisipan", "Data baru tidak bisa dimasukkan sebelum ada data lain.")
      ],
      "Skema akhir: <code>pasien(no_rm, nama, tgl_lahir)</code> • <code>dokter(id_dokter, nama, spesialis)</code> • <code>kunjungan(id_kunjungan, no_rm*, id_dokter*, tanggal, keluhan)</code>"),

    kasus("🏨 Hotel",
      "Hotel mencatat <strong>tamu</strong> (nomor identitas, nama, nomor HP) dan <strong>kamar</strong> (nomor kamar, tipe, harga per malam). Tamu <strong>memesan</strong> kamar untuk tanggal masuk dan tanggal keluar tertentu. Satu tamu bisa memesan banyak kamar, dan satu kamar dipesan banyak tamu pada waktu berbeda. Petugas juga ingin menyimpan kolom total bayar.",
      [
        step("1", "Kardinalitas Tamu–Kamar?", KARD, "M : N", "Pertanyaan dua arah: satu tamu → banyak kamar, satu kamar → banyak tamu."),
        step("2", "Berapa tabel yang dihasilkan?", TABEL, "3 tabel", "tamu, kamar, dan pemesanan (aturan pertama + aturan keempat)."),
        step("3", "Tanggal masuk dan tanggal keluar disimpan di tabel…", ["pemesanan", "tamu", "kamar", "Tidak disimpan"], "pemesanan", "Atribut milik relasi ikut masuk ke tabel penghubung."),
        step("4", "Tipe data tanggal masuk?", ["DATE", "YEAR", "INT", "CHAR(4)"], "DATE", "Tanggal lengkap (tahun-bulan-tanggal) memakai DATE."),
        step("5", "Tipe data harga per malam (contoh 350000)?", ["INT", "VARCHAR(10)", "DATE", "YEAR"], "INT", "Bilangan bulat yang memang dihitung."),
        step("6", "Kolom total bayar (harga × jumlah malam) sebaiknya…", ["Tidak disimpan, dihitung saat diperlukan", "Dijadikan kunci primer", "Disimpan sebagai teks", "Dipindah ke tabel tamu"], "Tidak disimpan, dihitung saat diperlukan", "Kolom turunan menjadi salah begitu harga atau tanggalnya berubah (melanggar 3NF)."),
        step("7", "Tabel pemesanan dipecah, tetapi tidak menyimpan nomor kamar. Apa akibatnya?", ["Tidak ada yang tahu kamar mana yang dipesan", "Tabel lebih rapi", "Data tamu hilang", "Harga otomatis dihitung"], "Tidak ada yang tahu kamar mana yang dipesan", "Setelah dipecah, kunci tamu wajib disisakan sebagai penghubung.")
      ],
      "Skema akhir: <code>tamu(no_identitas, nama, no_hp)</code> • <code>kamar(no_kamar, tipe, harga_per_malam)</code> • <code>pemesanan(id_pesan, no_identitas*, no_kamar*, tgl_masuk, tgl_keluar)</code>"),

    kasus("📜 Notaris",
      "Kantor notaris mencatat <strong>klien</strong> (NIK, nama, alamat) dan <strong>akta</strong> (nomor akta, jenis akta, tanggal). <strong>Satu akta dibuat untuk satu klien</strong>, dan satu klien bisa memiliki banyak akta. Setiap <strong>akta</strong> juga memiliki tepat satu <strong>salinan resmi</strong>, dan satu salinan resmi hanya untuk satu akta.",
      [
        step("1", "Penulisan nama entitas yang benar?", ["Akta", "Akta-akta", "Para Klien", "Membuat"], "Akta", "Kata benda tunggal: Akta, Klien."),
        step("2", "Kardinalitas Klien–Akta?", KARD, "1 : N", "Satu klien → banyak akta; satu akta → satu klien."),
        step("3", "Aturan transformasi Klien–Akta?", ATURAN, "Aturan ketiga (1:N)", "Kunci klien dititipkan di tabel akta."),
        step("4", "Kardinalitas Akta–Salinan resmi?", KARD, "1 : 1", "Satu akta → satu salinan; satu salinan → satu akta."),
        step("5", "Aturan transformasi Akta–Salinan resmi?", ATURAN, "Aturan kedua (1:1)", "Titipkan kunci salah satu tabel ke tabel lainnya."),
        step("6", "Tipe data nomor akta yang selalu 10 karakter dan wajib diisi?", ["CHAR(10) NOT NULL", "VARCHAR(10)", "INT NOT NULL", "DATE NOT NULL"], "CHAR(10) NOT NULL", "Teks dengan panjang tetap = CHAR(n); wajib diisi = NOT NULL."),
        step("7", "Alamat klien di sebuah baris diganti di tiga akta, tetapi satu terlewat. Anomali apa (bila alamat disalin ke tabel akta)?", ANOMALI, "Anomali pengubahan", "Data yang sama disimpan berulang, perubahan harus di banyak baris.")
      ],
      "Skema akhir: <code>klien(nik, nama, alamat)</code> • <code>akta(no_akta, nik*, jenis, tanggal)</code> • <code>salinan(id_salinan, no_akta*, …)</code>"),

    kasus("🛒 Minimarket",
      "Minimarket mencatat <strong>produk</strong> (kode produk, nama, harga satuan) dan <strong>transaksi</strong> (nomor transaksi, tanggal). Satu transaksi berisi banyak produk, dan satu produk muncul di banyak transaksi, masing-masing dengan <strong>jumlah</strong> yang dibeli. Saat ini semuanya ditulis dalam satu tabel penjualan beserta kolom total.",
      [
        step("1", "Kardinalitas Produk–Transaksi?", KARD, "M : N", "Satu transaksi → banyak produk; satu produk → banyak transaksi."),
        step("2", "Kolom jumlah (yang dibeli) disimpan di tabel…", ["Tabel penghubung detail transaksi", "Tabel produk", "Tabel transaksi", "Tidak disimpan"], "Tabel penghubung detail transaksi", "Jumlah bukan milik produk atau transaksi saja, melainkan milik pasangan keduanya."),
        step("3", "Dalam satu tabel penjualan, produk baru tidak bisa dicatat sebelum terjual. Anomali apa?", ANOMALI, "Anomali penyisipan", "Setelah dinormalkan, produk baru bisa dicatat tanpa menunggu transaksi."),
        step("4", "Menghapus satu transaksi ikut menghilangkan keterangan produk yang hanya terjual sekali. Anomali apa?", ANOMALI, "Anomali penghapusan", "Data yang masih diperlukan ikut terhapus."),
        step("5", "Tabel punya harga_satuan, jumlah, dan total. Perbaikannya?", ["Tidak menyimpan kolom total, menghitungnya saat diperlukan", "Menjadikan total kunci primer", "Mengubah jumlah menjadi teks", "Menggabungkan ketiganya menjadi satu kolom"], "Tidak menyimpan kolom total, menghitungnya saat diperlukan", "Total bergantung pada kolom bukan kunci (3NF). Hitung dengan SELECT harga_satuan * jumlah."),
        step("6", "Tabel detail memakai kunci gabungan (no_transaksi, kode_produk) tetapi memuat nama_produk. Bentuk normal mana yang dilanggar?", ["1NF", "2NF", "3NF", "Tidak ada"], "2NF", "nama_produk hanya bergantung pada sebagian kunci (kode_produk)."),
        step("7", "Berapa tabel setelah dinormalkan?", TABEL, "3 tabel", "produk, transaksi, dan detail_transaksi.")
      ],
      "Skema akhir: <code>produk(kode_produk, nama, harga_satuan)</code> • <code>transaksi(no_transaksi, tanggal)</code> • <code>detail_transaksi(no_transaksi*, kode_produk*, jumlah)</code>"),

    kasus("📰 Penerbit",
      "Sebuah penerbit mencatat <strong>penerbit</strong> (kode, nama, kota) dan <strong>majalah</strong> (kode majalah, judul, tahun terbit). <strong>Satu penerbit menerbitkan banyak majalah, satu majalah diterbitkan satu penerbit.</strong>",
      [
        step("1", "Aturan transformasi yang berlaku untuk relasinya?", ATURAN, "Aturan ketiga (1:N)", "1:N → kunci sisi satu dititipkan ke sisi banyak."),
        step("2", "Berapa tabel yang dihasilkan?", TABEL, "2 tabel", "penerbit dan majalah, tanpa tabel ketiga."),
        step("3", "Kunci tamunya?", ["kode_penerbit di tabel majalah", "kode_majalah di tabel penerbit", "Tabel penghubung", "Keduanya saling menyimpan"], "kode_penerbit di tabel majalah", "Sisi banyak = majalah."),
        step("4", "Tipe data tahun terbit (contoh 2024)?", ["YEAR", "DATE", "VARCHAR(50)", "CHAR(2)"], "YEAR", "Hanya tahun, empat digit."),
        step("5", "INSERT majalah dengan kode_penerbit 'PN99' ditolak. Sebabnya?", ["Penerbit PN99 tidak ada di tabel penerbit", "Judulnya terlalu pendek", "Tahunnya NULL", "Tabel majalah penuh"], "Penerbit PN99 tidak ada di tabel penerbit", "Integritas rujukan: isi kunci tamu harus ada di tabel induk (ERROR 1452)."),
        step("6", "Judul dan tahun terbit menjadi…", ["Atribut milik entitas Majalah", "Entitas", "Relasi", "Atribut milik relasi"], "Atribut milik entitas Majalah", "Keterangan yang melekat pada kata benda = atribut.")
      ],
      "Skema akhir: <code>penerbit(kode_penerbit, nama, kota)</code> • <code>majalah(kode_majalah, kode_penerbit*, judul, tahun_terbit)</code>")
  ]
};
