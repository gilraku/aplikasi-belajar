// Basis Data — Pertemuan 5: Normalisasi Data
const T = (head, rows, foot) => { const w = head.map((h, i) => Math.max(h.length, ...rows.map(r => String(r[i]).length))); const line = "+" + w.map(n => "-".repeat(n + 2)).join("+") + "+"; const fmt = r => "| " + r.map((c, i) => String(c).padEnd(w[i])).join(" | ") + " |"; return [line, fmt(head), line, ...rows.map(fmt), line, foot || (rows.length + (rows.length === 1 ? " row" : " rows") + " in set")].join("\n"); };
module.exports = {
  id: "p5", nomor: 5, judul: "Normalisasi Data", ujian: "UTS",
  hero: {
    badge: "Penyusun Materi: Wicaksono Yuli Sulistyo, S.Kom., M.Kom., CSA.",
    title: "Satu Tabel Raksasa Itu Berbahaya",
    text: "Kenali <strong>redundansi</strong> dan <strong>tiga anomali</strong>, pahami <strong>ketergantungan fungsional</strong>, lalu rapikan tabel bertahap lewat <strong>1NF, 2NF, 3NF</strong>. Hasil akhirnya sama dengan transformasi ERD di Pertemuan 4."
  },
  cheatsheet: [
    { type: "callout", tone: "tip", heading: "Ide besarnya dalam satu kalimat", html: "<strong>Redundansi</strong> (keterangan yang sama ditulis berulang) adalah sumber semua <strong>anomali</strong>. Normalisasi memisahkan setiap kelompok keterangan ke tabelnya sendiri, sehingga setiap fakta hanya disimpan <strong>di satu tempat</strong>." },
    { type: "table", label: "Interaktif 1 • Tabel Gabungan", title: "peminjaman_kacau: Satu Tabel untuk Segalanya", mono: true,
      headers: ["id_pinjam", "id_buku", "judul", "pengarang", "id_anggota", "nama_anggota"],
      rows: [["PJ0001", "BK002", "Sistem Basis Data", "Rina Kartika", "AG001", "Ahmad Fauzi"], ["PJ0002", "BK001", "Dasar Pemrograman Komputer", "Andi Wibowo", "AG002", "Nur Aisyah"], ["PJ0003", "BK002", "Sistem Basis Data", "Rina Kartika", "AG003", "Rangga Pratama"]],
      modes: [{ label: "Redundansi", target: "row", row: 2, title: "BK002 ditulis dua kali", text: "Judul dan pengarang BK002 muncul di baris 1 dan 3. Sepuluh peminjaman = sepuluh salinan." },
        { label: "Judul ikut id_buku", target: "col", col: 2, title: "Milik tabel buku", text: "Judul ditentukan oleh id_buku, bukan oleh id_pinjam." },
        { label: "Nama ikut id_anggota", target: "col", col: 5, title: "Milik tabel anggota", text: "Nama ditentukan oleh id_anggota." }] },
    { type: "cards", label: "Interaktif 2 • Tiga Anomali", title: "Kejanggalan Saat Data Diubah, Ditambah, Dihapus", cols: 3, items: [
      { badge: "Pengubahan", tone: "amber", title: "Update anomaly", text: "Judul BK002 diperbaiki di satu baris saja → satu buku punya dua judul. Tanpa pesan galat!" },
      { badge: "Penyisipan", tone: "sky", title: "Insert anomaly", text: "Buku baru belum pernah dipinjam tidak bisa dicatat: id_pinjam wajib diisi (ERROR 1364)." },
      { badge: "Penghapusan", tone: "rose", title: "Delete anomaly", text: "Hapus satu-satunya peminjaman BK001 → keterangan buku BK001 ikut hilang." }
    ] },
    { type: "choices", label: "Interaktif 3 • Ketergantungan Fungsional", title: "Kalau A Diketahui, B Pasti Bisa Ditentukan", desc: "Ditulis A → B. Klik setiap penentu:", style: "pills",
      options: [
        { label: "id_buku →", title: "id_buku → judul, pengarang", code: "BK002 → Sistem Basis Data, Rina Kartika", text: "Sebut nomor induk buku, petugas langsung tahu judul dan pengarangnya. Kelompok ini menjadi tabel <code>buku</code>." },
        { label: "id_anggota →", title: "id_anggota → nama, prodi", code: "AG001 → Ahmad Fauzi, Sistem Informasi", text: "Kelompok ini menjadi tabel <code>anggota</code>." },
        { label: "id_pinjam →", title: "id_pinjam → tgl_pinjam, id_buku, id_anggota", code: "PJ0001 → 2026-10-01, BK002, AG001", text: "Yang tersisa di <code>peminjaman</code> hanya nomor penunjuk dan tanggal." },
        { label: "Bukan FD", title: "nama_anggota ↛ id_anggota", code: "Ahmad Fauzi → ?", text: "Dua anggota bisa bernama sama, jadi nama tidak menentukan nomor. Penentu yang baik selalu unik." }
      ] },
    { type: "table", label: "Interaktif 4 • Tiga Tahap", title: "1NF → 2NF → 3NF", headers: ["Bentuk", "Syarat", "Cara memenuhinya"],
      rows: [["1NF", "Setiap sel satu nilai, tidak ada kelompok kolom berulang", "Pecah sel bernilai banyak menjadi baris tersendiri"], ["2NF", "Sudah 1NF + setiap kolom bukan kunci bergantung pada SELURUH kunci primer", "Pindahkan kolom yang bergantung pada sebagian kunci ke tabel baru"], ["3NF", "Sudah 2NF + tidak ada kolom bukan kunci yang bergantung pada kolom bukan kunci lain", "Pindahkan kolom yang bergantung pada kolom bukan kunci ke tabel baru"]],
      modes: [{ label: "2NF & kunci gabungan", target: "row", row: 1, title: "Baru terasa pada kunci gabungan", text: "Jika kunci primer hanya satu kolom, 2NF otomatis terpenuhi. Contoh pelanggaran: kunci (id_pinjam, id_buku), tetapi judul hanya bergantung pada id_buku." },
        { label: "3NF = transitif", target: "row", row: 2, title: "Ketergantungan transitif", text: "id_denda → id_anggota → nama. Nama bergantung pada kunci <em>lewat</em> id_anggota, jadi nama dipindah ke tabel anggota." },
        { label: "Jembatan keledai", target: "none", title: "“The key, the whole key, and nothing but the key”", text: "➕ 1NF: bergantung pada kunci. 2NF: pada <strong>seluruh</strong> kunci. 3NF: <strong>hanya</strong> pada kunci." }] },
    { type: "flow", label: "Interaktif 5 • Dua Jalan, Satu Hasil", title: "Normalisasi Perpustakaan", items: ["Belum normal: sel ganda + pengulangan", "1NF: sel ganda dipecah jadi baris", "2NF & 3NF: keterangan buku → buku, anggota → anggota", "Hasil: buku, anggota, peminjaman"], highlight: 3, note: "Normalisasi = merapikan lemari yang sudah berantakan; ERD = menggambar denah sebelum lemari diisi. Hasilnya sama dengan P4." },
    { type: "callout", tone: "warn", heading: "➕ Catatan tentang tahap 1NF di modul", html: "Saat sel <code>BK003, BK005</code> dipecah menjadi dua baris, id_pinjam <strong>PJ0011 ikut kembar</strong>. Modul memilih “menyesuaikan nomor peminjaman” (memberi nomor baru). Cara buku teks yang umum: kunci 1NF menjadi <strong>kunci gabungan (id_pinjam, id_buku)</strong>. Di situlah 2NF berperan: judul hanya bergantung pada id_buku (sebagian kunci) sehingga dipindah ke tabel buku. Kalau id_pinjam tetap dijadikan kunci tunggal tanpa diubah → ERROR 1062 Duplicate entry." },
    { type: "table", label: "Interaktif 6 • Kesalahan Umum", title: "Enam Kekeliruan Saat Menormalkan", headers: ["Kekeliruan", "Perbaikan"],
      rows: [["ERROR 1364 Field 'id_pinjam' doesn't have a default value", "Pisahkan keterangan buku ke tabelnya sendiri"], ["ERROR 1062 Duplicate entry", "Pilih kolom yang benar-benar unik sebagai PK tabel hasil pemecahan"], ["Sel berisi banyak nilai dibiarkan", "Pecah jadi baris sebelum ke 2NF"], ["Menyimpan kolom hasil hitungan (total)", "Hitung saat diperlukan, jangan disimpan"], ["Memecah tabel tanpa meninggalkan kunci tamu", "Sisakan FK di tabel yang merujuk"], ["Memecah terlalu jauh", "Berhenti di 3NF selama tak ada anomali tersisa"]],
      defaultNote: "Dua baris pertama adalah pesan galat sungguhan; sisanya kekeliruan berpikir tanpa pesan apa pun." }
  ],
  simulator: [
    { type: "exercise", label: "Permainan Interaktif 1 • Latihan Tingkat 1 Modul", title: "Anomali Apa Ini?", headers: ["Keadaan", "Jenis anomali"],
      rows: [["Prodi baru tidak dapat didaftarkan sebelum ada anggota yang masuk ke prodi itu", "Penyisipan"], ["Nama pengarang diperbaiki di tiga baris, tetapi terlewat di baris keempat", "Pengubahan"], ["Membatalkan satu-satunya peminjaman sebuah buku membuat keterangan buku itu hilang", "Penghapusan"], ["Alamat penerbit berubah dan harus diubah di puluhan baris buku", "Pengubahan"]]
        .map(([c, a]) => ({ cells: [c], fields: [{ options: ["Pengubahan", "Penyisipan", "Penghapusan"], answer: a }], ok: "✓" })) },
    { type: "terminal", label: "Permainan Interaktif 2 • Demonstrasi Modul", title: "Picu Ketiga Anomali pada peminjaman_kacau", desc: "Jalankan berurutan. Perhatikan: dua anomali terjadi <strong>tanpa</strong> pesan galat.", shell: "MariaDB [perpustakaan]>", header: "Tabel gabungan peminjaman_kacau",
      scenarios: [
        { label: "1. Keadaan awal", pill: "3 rows", ok: true, cmd: "SELECT id_pinjam, id_buku, judul, id_anggota FROM peminjaman_kacau;", res: T(["id_pinjam", "id_buku", "judul", "id_anggota"], [["PJ0001", "BK002", "Sistem Basis Data", "AG001"], ["PJ0002", "BK001", "Dasar Pemrograman Komputer", "AG002"], ["PJ0003", "BK002", "Sistem Basis Data", "AG003"]]), exp: "Keterangan BK002 tertulis dua kali: itulah redundansi." },
        { label: "2. Anomali pengubahan", pill: "tanpa galat!", ok: false, cmd: "UPDATE peminjaman_kacau SET judul = 'Sistem Basis Data Edisi 2'\nWHERE id_pinjam = 'PJ0001';\nSELECT id_buku, judul FROM peminjaman_kacau WHERE id_buku = 'BK002';", res: "Query OK, 1 row affected\n" + T(["id_buku", "judul"], [["BK002", "Sistem Basis Data Edisi 2"], ["BK002", "Sistem Basis Data"]]), exp: "Satu buku, dua judul. DBMS menganggap perintahnya sah, jadi tidak ada yang memperingatkan." },
        { label: "3. Anomali penyisipan", code: "1364", pill: "ERROR 1364", ok: false, cmd: "INSERT INTO peminjaman_kacau (id_buku, judul, pengarang)\nVALUES ('BK006','Basis Data Terapan','Hendra Gunawan');", res: "ERROR 1364 (HY000): Field 'id_pinjam' doesn't have a default value", exp: "Buku baru belum pernah dipinjam, padahal setiap baris wajib punya nomor peminjaman." },
        { label: "4. Anomali penghapusan", pill: "BK001 hilang", ok: false, cmd: "DELETE FROM peminjaman_kacau WHERE id_pinjam = 'PJ0002';\nSELECT id_buku, judul FROM peminjaman_kacau;", res: "Query OK, 1 row affected\n" + T(["id_buku", "judul"], [["BK002", "Sistem Basis Data Edisi 2"], ["BK002", "Sistem Basis Data"]]), exp: "Yang dihapus hanya peminjamannya, tetapi keterangan buku BK001 ikut lenyap." },
        { label: "5. Setelah dinormalkan", pill: "aman", ok: true, cmd: "INSERT INTO buku VALUES ('BK006','Basis Data Terapan','Hendra Gunawan',2025,2);\nUPDATE buku SET judul = 'Sistem Basis Data Edisi 2' WHERE id_buku = 'BK002';", res: "Query OK, 1 row affected\nQuery OK, 1 row affected\nRows matched: 1  Changed: 1  Warnings: 0", exp: "Pada tiga tabel hasil P4: buku baru bisa dicatat tanpa peminjaman, dan judul cukup diubah di satu baris." }
      ] },
    { type: "detective", label: "Permainan Interaktif 3 • Mini-Case Modul", title: "Detektif: Catatan Denda Keterlambatan", desc: "Klik sel yang menunjukkan masalah normalisasi (pengulangan atau kolom hitungan).",
      rules: ["Keterangan anggota cukup disimpan sekali di tabel anggota.", "Keterangan buku cukup disimpan sekali di tabel buku.", "Kolom yang bisa dihitung dari kolom lain tidak disimpan."],
      headers: ["id_denda", "id_anggota", "nama_anggota", "prodi", "id_buku", "judul", "hari_telat", "tarif", "total"],
      rows: [["DN001", "AG001", "Ahmad Fauzi", "Sistem Informasi", "BK002", "Sistem Basis Data", "3", "1000", "3000"], ["DN002", "AG001", "Ahmad Fauzi", "Sistem Informasi", "BK004", "Analisis Sistem", "2", "1000", "2000"], ["DN003", "AG003", "Rangga P.", "Teknik Informatika", "BK002", "Sistem Basis Data", "5", "1000", "5000"]],
      bugs: [
        { row: 1, col: 2, fixed: "→ tabel anggota", explain: "✅ Nama (dan prodi) Ahmad Fauzi ditulis ulang. id_anggota → nama, prodi; pindahkan ke tabel anggota." },
        { row: 2, col: 5, fixed: "→ tabel buku", explain: "✅ Judul BK002 ditulis ulang. id_buku → judul; pindahkan ke tabel buku." },
        { row: 0, col: 8, fixed: "hapus kolom", explain: "✅ total = hari_telat × tarif. Kalau tarif diubah, total jadi salah. Hitung saat diperlukan: <code>SELECT hari_telat * tarif AS total …</code>" }
      ] },
    { type: "exercise", label: "Permainan Interaktif 4 • Bentuk Normal", title: "Bentuk Normal Mana yang Dilanggar?", headers: ["Keadaan", "Melanggar"],
      rows: [["Sel daftar_buku berisi “BK001, BK002, BK003”", "1NF"], ["Kunci (id_pinjam, id_buku); kolom judul hanya bergantung pada id_buku", "2NF"], ["Tabel denda(id_denda, id_anggota, nama_anggota, …): nama bergantung pada id_anggota", "3NF"], ["Tabel pesanan punya harga_satuan, jumlah, dan total", "3NF"], ["Kolom telepon1, telepon2, telepon3 (kelompok kolom berulang)", "1NF"]]
        .map(([c, a]) => ({ cells: [c], fields: [{ options: ["1NF", "2NF", "3NF"], answer: a }], ok: "✓" })) },
    { type: "reveal", label: "Latihan & Mini-Case", title: "Coba Dulu di Kertas, Lalu Buka", items: [
      { prompt: "Tingkat 2: rak(id_rak, nama_rak, lantai, daftar_buku) dengan daftar_buku “BK001, BK002, BK003”. Hasil 3NF?", answer: "rak(id_rak, nama_rak, lantai) • buku(id_buku, judul, …, id_rak*)", reason: "Satu rak menampung banyak buku (1:N), jadi id_rak dititipkan ke tabel buku, bukan daftar buku di tabel rak." },
      { prompt: "Mini-case denda: hasil 3NF?", answer: "anggota(id_anggota, nama, prodi) • buku(id_buku, judul, …) • denda(id_denda, id_anggota*, id_buku*, hari_telat, tarif)", reason: "Kolom total dihapus. ➕ tarif tetap di denda karena tarif bisa berubah dari waktu ke waktu; yang dicatat tarif saat denda terjadi." },
      { prompt: "Praktik terpandu: tulis minimal tiga kalimat ketergantungan fungsional.", answer: "id_buku → judul • id_anggota → nama_anggota • id_pinjam → id_anggota, tgl_pinjam", reason: "Hasil skemanya sama dengan P4: buku, anggota, peminjaman." },
      { prompt: "Mengapa anomali pengubahan lebih berbahaya daripada pesan galat?", answer: "Karena tidak ada pesan apa pun", reason: "Data sudah salah tanpa ada yang memperingatkan; baru ketahuan berbulan-bulan kemudian." }
    ] }
  ],
  flashcards: [
    { tag: "P5", q: "Apa itu normalisasi?", a: "Memecah tabel yang berantakan menjadi beberapa tabel yang rapi sehingga setiap fakta disimpan di satu tempat." },
    { tag: "P5", q: "Apa itu redundansi?", a: "Keterangan yang sama ditulis berulang di banyak baris. Sumber semua anomali." },
    { tag: "P5", q: "Tiga jenis anomali?", a: "Pengubahan (update), penyisipan (insert), penghapusan (delete)." },
    { tag: "P5", q: "Contoh anomali penyisipan di perpustakaan?", a: "Buku baru tidak bisa dicatat sebelum dipinjam karena id_pinjam wajib diisi (ERROR 1364)." },
    { tag: "P5", q: "Contoh anomali penghapusan?", a: "Menghapus satu-satunya peminjaman BK001 ikut menghapus keterangan buku BK001." },
    { tag: "P5", q: "Apa itu ketergantungan fungsional?", a: "Kalau nilai kolom A diketahui, nilai kolom B pasti bisa ditentukan (A → B). Contoh: id_buku → judul." },
    { tag: "P5", q: "Syarat 1NF?", a: "Setiap sel berisi satu nilai dan tidak ada kelompok kolom berulang." },
    { tag: "P5", q: "Syarat 2NF?", a: "Sudah 1NF dan setiap kolom bukan kunci bergantung pada seluruh kunci primer. Terasa pada kunci gabungan." },
    { tag: "P5", q: "Syarat 3NF?", a: "Sudah 2NF dan tidak ada kolom bukan kunci yang bergantung pada kolom bukan kunci lain (tanpa ketergantungan transitif)." },
    { tag: "P5", q: "Apa itu kunci gabungan?", a: "Kunci primer yang tersusun dari dua kolom atau lebih, misalnya (id_pinjam, id_buku)." },
    { tag: "P5", q: "Mengapa kolom total sebaiknya tidak disimpan?", a: "Nilainya bisa dihitung (hari_telat × tarif) dan menjadi salah begitu salah satu kolom asal berubah." },
    { tag: "P5", q: "Mengapa hasil normalisasi = hasil ERD P4?", a: "Keduanya berangkat dari kenyataan yang sama: keterangan apa bergantung pada apa." }
  ],
  quiz: [
    { q: "Keterangan yang sama ditulis berulang-ulang di banyak baris disebut…", opts: ["Redundansi", "Normalisasi", "Integritas", "Kunci gabungan"], ans: 0, exp: "Redundansi adalah sumber anomali." },
    { q: "Judul BK002 diperbaiki di satu baris saja sehingga satu buku punya dua judul. Ini anomali…", opts: ["Penyisipan", "Pengubahan", "Penghapusan", "Rujukan"], ans: 1, exp: "Update anomaly." },
    { q: "Buku baru tidak bisa dicatat sebelum ada yang meminjamnya. Ini anomali…", opts: ["Penyisipan", "Pengubahan", "Penghapusan", "Transitif"], ans: 0, exp: "Insert anomaly; ERROR 1364." },
    { q: "Menghapus satu-satunya peminjaman BK001 ikut menghilangkan keterangan BK001. Ini anomali…", opts: ["Penyisipan", "Pengubahan", "Penghapusan", "Duplikasi"], ans: 2, exp: "Delete anomaly." },
    { q: "Mengapa anomali pengubahan berbahaya?", opts: ["Karena selalu memunculkan ERROR 1064", "Karena tidak memunculkan pesan galat apa pun", "Karena menghapus tabel", "Karena mematikan server"], ans: 1, exp: "DBMS menganggap perintahnya sah." },
    { q: "“Kalau id_buku diketahui, judul pasti bisa ditentukan” adalah contoh…", opts: ["Ketergantungan fungsional", "Anomali", "Kunci tamu", "Redundansi"], ans: 0, exp: "id_buku → judul." },
    { q: "Pernyataan yang BUKAN ketergantungan fungsional yang benar adalah…", opts: ["id_buku → judul", "id_anggota → nama", "nama_anggota → id_anggota", "id_pinjam → tgl_pinjam"], ans: 2, exp: "Dua anggota bisa bernama sama." },
    { q: "Syarat 1NF adalah…", opts: ["Setiap sel hanya berisi satu nilai", "Tidak ada ketergantungan transitif", "Semua kolom bergantung pada seluruh kunci", "Setiap tabel punya kunci tamu"], ans: 0, exp: "Plus tidak ada kelompok kolom berulang." },
    { q: "Syarat 2NF baru terasa gunanya bila…", opts: ["Tabel tidak punya kunci", "Kunci primer berupa kunci gabungan", "Tabel hanya satu kolom", "Semua kolom bertipe teks"], ans: 1, exp: "Kunci satu kolom otomatis memenuhi 2NF." },
    { q: "Kunci (id_pinjam, id_buku), tetapi judul hanya bergantung pada id_buku. Bentuk normal yang dilanggar…", opts: ["1NF", "2NF", "3NF", "Tidak ada"], ans: 1, exp: "Ketergantungan parsial." },
    { q: "Tabel punya harga_satuan, jumlah, dan total. Menurut modul melanggar…", opts: ["1NF", "2NF", "3NF", "Integritas rujukan"], ans: 2, exp: "total bergantung pada kolom bukan kunci; hapus dan hitung saat perlu." },
    { q: "Sel daftar_buku berisi “BK001, BK002, BK003” melanggar…", opts: ["1NF", "2NF", "3NF", "Tidak melanggar"], ans: 0, exp: "Satu sel banyak nilai." },
    { q: "Hasil normalisasi tabel peminjaman perpustakaan adalah…", opts: ["Satu tabel peminjaman_1nf", "Tabel buku, anggota, peminjaman", "Tabel buku dan anggota saja", "Empat tabel termasuk tabel judul"], ans: 1, exp: "Sama dengan hasil transformasi ERD P4." },
    { q: "Memecah tabel tetapi tidak menyisakan kunci tamu berakibat…", opts: ["Tabel lebih cepat", "Tabel hasil pemecahan tidak bisa dihubungkan kembali", "Muncul ERROR 1364", "Tidak ada akibat"], ans: 1, exp: "Sisakan FK di tabel yang merujuk." },
    { q: "Batas normalisasi yang dianjurkan modul untuk basis data sehari-hari adalah…", opts: ["1NF", "2NF", "3NF", "Setiap kolom satu tabel"], ans: 2, exp: "Memecah terlalu jauh membuat basis data sulit dipakai." },
    { q: "ERROR 1364 Field 'id_pinjam' doesn't have a default value muncul saat…", opts: ["Menyisipkan buku baru ke tabel gabungan tanpa id_pinjam", "Nama tabel salah", "PK kembar", "Lupa titik koma"], ans: 0, exp: "Bukti nyata anomali penyisipan." }
  ],
  ringkasan: `*RANGKUMAN BASIS DATA — PERTEMUAN 5*
🧹 *Normalisasi Data*

1️⃣ Redundansi = keterangan sama ditulis berulang → sumber anomali.
2️⃣ 3 anomali (tanpa pesan galat!): pengubahan (dua judul), penyisipan (buku baru tak bisa dicatat, ERROR 1364), penghapusan (keterangan buku ikut hilang).
3️⃣ Ketergantungan fungsional A → B: kalau A diketahui, B pasti bisa ditentukan (id_buku → judul).
4️⃣ 1NF: satu sel satu nilai. 2NF: bergantung pada SELURUH kunci (terasa pada kunci gabungan). 3NF: tak ada kolom bukan kunci → kolom bukan kunci.
5️⃣ Jangan simpan kolom hitungan (total). Sisakan kunci tamu. Berhenti di 3NF.
6️⃣ Hasil: buku, anggota, peminjaman = sama dengan ERD P4.`
};
