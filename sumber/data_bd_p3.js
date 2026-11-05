// Basis Data — Pertemuan 3: Perancangan dengan ERD (modul Bab 3 + PPT + slide "ERD Materi Gabungan")
const opt = (o) => o;
module.exports = {
  id: "p3", nomor: 3, judul: "Perancangan dengan ERD", ujian: "CPMK 1",
  hero: {
    badge: "Penyusun Materi: Wicaksono Yuli Sulistyo, S.Kom., M.Kom., CSA.",
    title: "Gambar Dulu Denahnya, Baru Pesan Lemarinya",
    text: "Kuasai <strong>entitas, atribut, relasi</strong>, <strong>kardinalitas 1:1, 1:N, M:N</strong>, <strong>5 langkah menggambar ERD</strong>, serta materi gabungan: <strong>derajat relasi, jenis key, entitas lemah, spesialisasi, notasi Chen vs Martin</strong>."
  },
  cheatsheet: [
    { type: "callout", tone: "tip", heading: "ERD ibarat denah ruang arsip", html: "ERD (Entity Relationship Diagram) adalah <strong>gambar rancangan basis data</strong>, dibuat <strong>sebelum</strong> satu tabel pun dibuat. Di kertas, memindahkan lemari cukup dengan penghapus; kalau lemari sudah jadi dan kartunya penuh, memindahkannya berarti membongkar ruangan." },
    { type: "table", label: "Interaktif 1 • Notasi Chen", title: "Lambang-lambang ERD", headers: ["Lambang", "Arti", "Contoh"],
      rows: [["▭ Persegi panjang", "Entitas (kata benda tunggal)", "Buku, Anggota"], ["◯ Elips", "Atribut", "judul, pengarang"], ["◯ Elips + garis bawah", "Atribut kunci (→ kunci primer)", "id_buku"], ["◇ Belah ketupat", "Relasi (kata kerja)", "dipinjam, melayani"], ["◎ Elips ganda", "Atribut multi-valued", "no_telepon"], ["◌ Elips putus-putus", "Atribut turunan (slide gabungan) / atribut relasi (modul P3)", "umur; tgl_pinjam"], ["▭▭ Persegi panjang ganda", "Entitas lemah", "pembayaran cicilan"], ["— Garis", "Penghubung + kardinalitas di atasnya", "1, N, M"]],
      modes: [
        { label: "⚠️ Elips putus-putus", target: "row", row: 5, title: "Dua sumber, dua arti", text: "Modul P3 menggambar <code>tgl_pinjam</code>/<code>tgl_kembali</code> (atribut milik relasi) dengan elips putus-putus. Slide gabungan dan buku standar (Chen, Korth) memakai elips putus-putus untuk <strong>atribut turunan</strong>, sedangkan atribut relasi cukup elips biasa yang menempel ke belah ketupat. Saat mengerjakan tugas dari modul P3 ikuti modul, tetapi kenali dua arti ini supaya tidak terjebak." },
        { label: "Atribut kunci", target: "row", row: 2, title: "Satu per entitas", text: "Setiap entitas punya tepat satu atribut bergaris bawah. Nanti menjadi kunci primer di Bab 4." }
      ] },
    { type: "choices", label: "Interaktif 2 • Kardinalitas", title: "Berapa Banyak yang Boleh Terhubung?", desc: "Ajukan dua pertanyaan, satu dari kiri dan satu dari kanan. Klik tiap jenis:", style: "pills",
      options: [
        { label: "1 : 1", title: "Satu ke satu", code: "Anggota (1) —memiliki— (1) Kartu Anggota", text: "Satu anggota punya satu kartu, satu kartu milik satu anggota." },
        { label: "1 : N", title: "Satu ke banyak", code: "Petugas (1) —melayani— (N) Anggota", text: "Satu petugas melayani banyak anggota; satu anggota dilayani satu petugas tetap (cek pemahaman no. 3 modul)." },
        { label: "N : 1", title: "Banyak ke satu (slide gabungan)", code: "Buku (N) —diterbitkan— (1) Penerbit", text: "Sama dengan 1:N, hanya dibaca dari arah sebaliknya." },
        { label: "M : N", title: "Banyak ke banyak", code: "Buku (N) —dipinjam— (M) Anggota", text: "Satu buku dipinjam banyak anggota (di waktu berbeda), satu anggota meminjam banyak buku. Tidak bisa langsung jadi dua tabel: perlu tabel tambahan di tengah (Bab 4)." }
      ] },
    { type: "flow", label: "Interaktif 3 • 5 Langkah Menggambar ERD", title: "Dari Satu Paragraf Cerita ke ERD", items: ["Cari kata benda → entitas", "Cari keterangan → atribut", "Cari kata kerja → relasi", "Tentukan atribut kunci", "Tentukan kardinalitas"], highlight: 2, note: "Lalu periksa dengan 4 pertanyaan: tiap entitas punya tepat satu atribut kunci? tiap relasi menghubungkan dua entitas? tiap garis diberi kardinalitas? tiap atribut menempel di tempat yang benar?" },
    { type: "table", label: "Interaktif 4 • Contoh Modul", title: "Membedah Cerita Perpustakaan", headers: ["Kata dalam cerita", "Jenis", "Menjadi apa di ERD"],
      rows: [["buku", "kata benda", "Entitas Buku"], ["nomor buku, judul, pengarang, tahun terbit", "keterangan", "Atribut milik Buku"], ["anggota", "kata benda", "Entitas Anggota"], ["nomor anggota, nama, program studi", "keterangan", "Atribut milik Anggota"], ["meminjam, dipinjam", "kata kerja", "Relasi dipinjam"], ["tanggal peminjaman", "keterangan kejadian", "Atribut milik relasi"]],
      modes: [{ label: "Kenapa tanggal milik relasi?", target: "row", row: 5, title: "Slip peminjaman", text: "Tanggal pinjam bukan keterangan bukunya dan bukan keterangan orangnya, melainkan keterangan <strong>peristiwa</strong> peminjaman, seperti cap tanggal di slip." },
        { label: "Kardinalitasnya?", target: "row", row: 4, title: "N : M", text: "Satu buku dipinjam banyak anggota (N), satu anggota meminjam banyak buku (M) → banyak ke banyak." }] },
    { type: "row", cols: [1, 1], blocks: [
      { type: "cards", label: "Slide Gabungan • Key", title: "3 Macam Key", cols: 1, items: [
        { badge: "Super key", title: "Kumpulan atribut yang unik", text: "Satu atau lebih atribut yang membedakan setiap baris. Contoh: {nim}, {nim, nama}." },
        { badge: "Candidate key", tone: "sky", title: "Super key yang minimal", text: "Tidak ada atribut yang bisa dibuang. Contoh: {nim}, {email}." },
        { badge: "Primary key", tone: "indigo", title: "Candidate key yang dipilih", text: "Kriteria: lebih natural, lebih ringkas, keunikan lebih terjamin." }
      ] },
      { type: "cards", label: "Slide Gabungan • Derajat Relasi", title: "Berapa Entitas yang Terlibat?", cols: 1, items: [
        { badge: "Unary (1)", tone: "violet", title: "Entitas dengan dirinya sendiri", text: "Pegawai <em>melapor kepada</em> pegawai lain." },
        { badge: "Binary (2)", tone: "emerald", title: "Dua entitas (paling umum)", text: "Pegawai <em>bekerja di</em> Departemen." },
        { badge: "Ternary (3)", tone: "amber", title: "Tiga entitas sekaligus", text: "Pegawai <em>bekerja</em> pada Proyek di Kota." }
      ] }
    ] },
    { type: "cards", label: "Slide Gabungan • Varian", title: "Entitas & Relasi Khusus", cols: 2, items: [
      { badge: "Entitas lemah", tone: "rose", title: "Bergantung pada entitas kuat", text: "Tidak punya primary key sendiri; persegi panjang ganda, relasi pengidentifikasi belah ketupat ganda, diskriminator bergaris bawah putus-putus. PK = PK entitas kuat + diskriminator (loan-number, payment-number)." },
      { badge: "Spesialisasi", tone: "sky", title: "Top-down, segitiga ISA", text: "Person → Employee / Customer. Atribut level atas diwariskan (inheritance). Kebalikannya: <strong>generalisasi</strong> (bottom-up)." },
      { badge: "Relasi ganda", tone: "amber", title: "Dua entitas, lebih dari satu relasi", text: "Pegawai <em>bekerja di</em> Departemen dan Pegawai <em>memimpin</em> Departemen." },
      { badge: "Agregasi", tone: "violet", title: "Relasi diperlakukan sebagai entitas", text: "Dipakai untuk menghindari redundansi saat relasi perlu berelasi dengan entitas lain (works-on + manages)." }
    ] },
    { type: "table", label: "Interaktif 5 • Dua Gaya Gambar", title: "ERD Versi Chen vs Versi Martin", headers: ["Aspek", "Chen", "Martin (Crow’s Foot)"],
      rows: [["Relasi", "Belah ketupat", "Garis saja"], ["Atribut", "Elips di luar kotak", "Ditulis di dalam kotak entitas"], ["Kardinalitas", "Tulisan 1, N, M di garis", "Simbol di ujung garis (0, 1, *, kaki gagak)"], ["Dipakai", "Pengajaran (modul ini)", "Banyak aplikasi perancangan (MySQL Workbench ➕)"]],
      modes: [{ label: "Sejarah", target: "none", title: "Bachman → Chen → Martin", text: "Diagram pertama diresmikan Charles Bachman (1960-an). Dua versi paling umum: Peter Chen (1976) dan James Martin. Yang lebih umum diajarkan adalah Chen." }] }
  ],
  simulator: [
    { type: "exercise", label: "Permainan Interaktif 1 • Latihan Tingkat 1 Modul", title: "Entitas, Atribut, atau Relasi?", headers: ["Butir", "Jenis"],
      rows: [["Buku", "Entitas"], ["tahun terbit", "Atribut"], ["dipinjam", "Relasi"], ["nama anggota", "Atribut"], ["Petugas", "Entitas"], ["mengembalikan", "Relasi"]].map(([c, a]) => ({ cells: [c], fields: [{ options: ["Entitas", "Atribut", "Relasi"], answer: a }], ok: a === "Relasi" ? "✓ Kata kerja." : a === "Entitas" ? "✓ Kata benda yang datanya disimpan." : "✓ Keterangan." })) },
    { type: "exercise", label: "Permainan Interaktif 2 • Kardinalitas", title: "Tentukan Kardinalitasnya", desc: "Ajukan dua pertanyaan dari kedua arah.", headers: ["Aturan", "Kardinalitas"],
      rows: [["Satu petugas melayani banyak anggota; satu anggota dilayani satu petugas tetap", "1 : N"], ["Satu buku dipinjam banyak anggota; satu anggota meminjam banyak buku", "M : N"], ["Satu mahasiswa punya satu KTM; satu KTM milik satu mahasiswa", "1 : 1"], ["Satu ruang baca dipesan banyak kali oleh anggota berbeda; satu anggota boleh memesan banyak kali", "M : N"], ["Satu dosen wali membimbing banyak mahasiswa; satu mahasiswa punya satu dosen wali", "1 : N"], ["Satu prodi punya satu kaprodi; satu kaprodi memimpin satu prodi", "1 : 1"]]
        .map(([c, a]) => ({ cells: [c], fields: [{ options: ["1 : 1", "1 : N", "M : N"], answer: a }], ok: "✓" })) },
    { type: "reveal", label: "Permainan Interaktif 3 • Latihan Tingkat 2 Modul", title: "Temukan Kesalahan Gambar ERD Ini", items: [
      { prompt: "Entitas digambar elips, atribut digambar persegi panjang.", answer: "Lambang tertukar", reason: "Entitas = persegi panjang, atribut = elips." },
      { prompt: "Entitas diberi nama Buku-buku dan Anggota-anggota.", answer: "Nama jamak", reason: "Pakai kata benda tunggal: Buku, Anggota. Satu baris mewakili satu buku." },
      { prompt: "Relasi dipinjam dihubungkan langsung ke atribut judul.", answer: "Relasi ke atribut", reason: "Relasi selalu menghubungkan entitas (Buku), bukan atribut." },
      { prompt: "Tidak ada atribut yang diberi garis bawah.", answer: "Tidak ada atribut kunci", reason: "Pilih satu per entitas (id_buku, id_anggota) dan garis bawahi." },
      { prompt: "Relasi diberi nama “peminjaman”.", answer: "Relasi berupa kata benda", reason: "Pakai kata kerja: dipinjam, meminjam." },
      { prompt: "Garis penghubung tidak diberi tulisan apa pun.", answer: "Kardinalitas tidak ditulis", reason: "Tulis 1, N, atau M agar nanti letak kunci tamu bisa ditentukan." }
    ] },
    { type: "exercise", label: "Permainan Interaktif 4 • Mini-Case Modul", title: "Pemesanan Ruang Baca: Bedah Ceritanya", desc: "“Setiap ruang baca dicatat nomor ruang, nama ruang, dan daya tampungnya. Anggota dapat memesan ruang baca untuk tanggal dan jam tertentu. Satu ruang dapat dipesan anggota berbeda pada hari berbeda, dan satu anggota boleh memesan lebih dari satu kali.”", headers: ["Kata", "Menjadi"],
      rows: [["ruang baca", "Entitas"], ["nomor ruang", "Atribut kunci"], ["nama ruang, daya tampung", "Atribut entitas"], ["anggota", "Entitas"], ["memesan", "Relasi"], ["tanggal dan jam pemesanan", "Atribut relasi"], ["kardinalitas memesan", "M : N"]]
        .map(([c, a]) => ({ cells: [c], fields: [{ options: ["Entitas", "Atribut kunci", "Atribut entitas", "Relasi", "Atribut relasi", "1 : N", "M : N"], answer: a }], ok: "✓" })) },
    { type: "exercise", label: "Permainan Interaktif 5 • Slide Gabungan", title: "Jenis Key pada Tabel mahasiswa(nim, nik, email, nama)", desc: "nim, nik, dan email masing-masing unik; nama bisa kembar.", headers: ["Kumpulan atribut", "Jenis"],
      rows: [["{nim, nama}", "Super key saja", "✓ Unik, tetapi nama bisa dibuang → tidak minimal."], ["{email}", "Candidate key", "✓ Unik dan minimal, tetapi tidak dipilih."], ["{nim}", "Primary key", "✓ Candidate key yang paling natural dan ringkas."], ["{nama}", "Bukan key", "✓ Nama bisa sama."], ["{nik}", "Candidate key"]]
        .map(([c, a, ok]) => ({ cells: [c], fields: [{ options: ["Super key saja", "Candidate key", "Primary key", "Bukan key"], answer: a }], ok: ok || "✓" })) },
    { type: "reveal", label: "Cek Pemahaman Modul", title: "Jawab Dulu, Baru Buka", items: [
      { prompt: "Mengapa ERD digambar sebelum tabel dibuat?", answer: "Agar kesalahan ketahuan saat masih gambar", reason: "Memperbaiki cukup dengan penghapus; setelah data menumpuk, perbaikan sulit dan berisiko." },
      { prompt: "Lambang entitas, atribut, relasi, atribut kunci?", answer: "Persegi panjang, elips, belah ketupat, elips bergaris bawah", reason: "" },
      { prompt: "Satu petugas melayani banyak anggota, satu anggota dilayani satu petugas tetap.", answer: "1 : N", reason: "Angka 1 di sisi Petugas, N di sisi Anggota." },
      { prompt: "Mengapa tgl_pinjam menempel pada belah ketupat?", answer: "Milik peristiwa peminjaman", reason: "Bukan keterangan buku atau anggota." },
      { prompt: "“Perpustakaan mencatat judul, pengarang, dan tahun terbit setiap buku.”", answer: "Buku = entitas; judul, pengarang, tahun = atribut", reason: "" }
    ] }
  ],
  flashcards: [
    { tag: "Konsep", q: "Apa itu ERD dan kapan dibuat?", a: "Gambar rancangan basis data (entitas, atribut, relasi), dibuat <strong>sebelum</strong> tabel dibuat." },
    { tag: "Lambang", q: "Lambang entitas, atribut, relasi (Chen)?", a: "Persegi panjang, elips, belah ketupat. Atribut kunci = elips bergaris bawah." },
    { tag: "Aturan", q: "Entitas ditulis dengan kata apa? Relasi?", a: "Entitas = kata benda <strong>tunggal</strong> (Buku). Relasi = <strong>kata kerja</strong> (dipinjam)." },
    { tag: "Kardinalitas", q: "Apa itu kardinalitas?", a: "Banyaknya baris yang boleh terhubung pada sebuah relasi: 1:1, 1:N (N:1), M:N." },
    { tag: "Kardinalitas", q: "Kardinalitas Buku–dipinjam–Anggota?", a: "<strong>M : N</strong> (banyak ke banyak). Perlu tabel tambahan di tengah saat diubah jadi tabel (Bab 4)." },
    { tag: "Langkah", q: "5 langkah menggambar ERD?", a: "Cari kata benda → keterangan → kata kerja → atribut kunci → kardinalitas." },
    { tag: "Atribut", q: "tgl_pinjam milik siapa?", a: "Milik <strong>relasi</strong> dipinjam (peristiwa), bukan milik Buku atau Anggota." },
    { tag: "Gabungan", q: "Unary, binary, ternary?", a: "Derajat relasi: 1 entitas dengan dirinya, 2 entitas (paling umum), 3 entitas." },
    { tag: "Gabungan", q: "Super key vs candidate key vs primary key?", a: "Super = kumpulan atribut unik; candidate = super key minimal; primary = candidate yang dipilih (natural, ringkas, keunikan terjamin)." },
    { tag: "Gabungan", q: "Apa itu entitas lemah?", a: "Entitas tanpa primary key sendiri yang bergantung pada entitas kuat; persegi panjang ganda; PK = PK entitas kuat + diskriminator." },
    { tag: "Gabungan", q: "Spesialisasi vs generalisasi?", a: "Spesialisasi = top-down (Person → Employee, Customer), segitiga ISA. Generalisasi = bottom-up, kebalikannya." },
    { tag: "Gabungan", q: "Chen vs Martin?", a: "Chen: relasi belah ketupat, kardinalitas ditulis di garis. Martin: relasi berupa garis dengan simbol crow’s foot di ujungnya, atribut di dalam kotak." },
    { tag: "Gabungan", q: "Atribut mandatory vs non mandatory?", a: "Mandatory wajib diisi (NOT NULL); non mandatory boleh kosong (NULL)." }
  ],
  quiz: [
    { q: "ERD sebaiknya digambar…", opts: ["Setelah tabel terisi ribuan data", "Sebelum satu tabel pun dibuat", "Setelah MAMP terpasang", "Hanya jika ada error"], ans: 1, exp: "ERD adalah denah: kesalahan diperbaiki saat masih berupa gambar." },
    { q: "Dalam notasi Chen, entitas digambarkan dengan…", opts: ["Elips", "Belah ketupat", "Persegi panjang", "Segitiga"], ans: 2, exp: "Entitas = persegi panjang, atribut = elips, relasi = belah ketupat." },
    { q: "Atribut kunci pada ERD ditandai dengan…", opts: ["Elips ganda", "Tulisan bergaris bawah", "Warna merah", "Belah ketupat ganda"], ans: 1, exp: "Atribut kunci = elips yang tulisannya digarisbawahi; nanti menjadi kunci primer." },
    { q: "Nama entitas yang benar menurut modul adalah…", opts: ["Buku-buku", "Para Anggota", "Buku", "Meminjam"], ans: 2, exp: "Entitas memakai kata benda tunggal." },
    { q: "Nama relasi sebaiknya berupa…", opts: ["Kata kerja, misalnya dipinjam", "Kata benda jamak", "Nomor urut", "Nama tabel"], ans: 0, exp: "Relasi hampir selalu kata kerja: dipinjam, melayani, memesan." },
    { q: "Satu petugas melayani banyak anggota, tetapi satu anggota hanya dilayani satu petugas tetap. Kardinalitasnya…", opts: ["1 : 1", "1 : N", "M : N", "N : N : N"], ans: 1, exp: "1 di sisi Petugas, N di sisi Anggota." },
    { q: "Kardinalitas relasi dipinjam antara Buku dan Anggota pada ERD perpustakaan modul adalah…", opts: ["1 : 1", "1 : N", "N : 1", "Banyak ke banyak (N : M)"], ans: 3, exp: "Satu buku dipinjam banyak anggota, satu anggota meminjam banyak buku." },
    { q: "Kardinalitas banyak ke banyak saat diubah menjadi tabel memerlukan…", opts: ["Satu tabel tambahan di tengah", "Menghapus salah satu entitas", "Atribut multi-valued", "Kunci primer ganda di setiap tabel"], ans: 0, exp: "Dibahas di Bab 4: tabel penghubung (misalnya peminjaman)." },
    { q: "Atribut tgl_pinjam pada ERD perpustakaan menempel pada…", opts: ["Entitas Buku", "Entitas Anggota", "Relasi dipinjam", "Atribut judul"], ans: 2, exp: "Tanggal pinjam adalah keterangan peristiwa peminjaman." },
    { q: "Langkah pertama dari lima langkah menggambar ERD adalah…", opts: ["Menentukan kardinalitas", "Mencari kata benda dalam cerita", "Membuat tabel di MySQL", "Menentukan atribut kunci"], ans: 1, exp: "Kata benda → entitas, keterangan → atribut, kata kerja → relasi, lalu kunci dan kardinalitas." },
    { q: "Relasi “pegawai melapor kepada pegawai lain” termasuk derajat…", opts: ["Unary", "Binary", "Ternary", "Agregasi"], ans: 0, exp: "Unary: satu himpunan entitas berelasi dengan dirinya sendiri." },
    { q: "Kumpulan atribut minimal yang dapat membedakan setiap baris secara unik disebut…", opts: ["Super key", "Candidate key", "Foreign key", "Diskriminator"], ans: 1, exp: "Candidate key = super key yang minimal." },
    { q: "Berikut kriteria memilih primary key dari candidate key, kecuali…", opts: ["Lebih natural", "Lebih ringkas", "Keunikan lebih terjamin", "Paling panjang agar detail"], ans: 3, exp: "Tiga kriteria: natural, ringkas, keunikan terjamin." },
    { q: "Entitas yang tidak memiliki primary key sendiri dan keberadaannya bergantung pada entitas lain disebut…", opts: ["Entitas kuat", "Entitas lemah", "Entitas abstrak", "Himpunan entitas"], ans: 1, exp: "Digambar persegi panjang ganda dengan relasi belah ketupat ganda." },
    { q: "Proses desain top-down yang membagi Person menjadi Employee dan Customer disebut…", opts: ["Generalisasi", "Agregasi", "Spesialisasi", "Normalisasi"], ans: 2, exp: "Spesialisasi = top-down (segitiga ISA); generalisasi = bottom-up." },
    { q: "Perbedaan utama ERD versi Chen dan versi Martin terletak pada…", opts: ["Cara menggambarkan relasi/hubungan antar entitas", "Jumlah entitas yang boleh digambar", "Warna diagram", "Bahasa SQL yang dipakai"], ans: 0, exp: "Chen memakai belah ketupat dan tulisan 1/N/M; Martin memakai garis dengan simbol crow’s foot." },
    { q: "Atribut umur yang dihitung dari tanggal lahir menurut slide gabungan digambar dengan…", opts: ["Elips ganda", "Elips garis putus-putus", "Persegi panjang ganda", "Belah ketupat"], ans: 1, exp: "Elips putus-putus = atribut turunan (derived)." }
  ],
  ringkasan: `*RANGKUMAN BASIS DATA — PERTEMUAN 3*
📐 *Perancangan dengan ERD*

1️⃣ ERD = gambar rancangan basis data, dibuat SEBELUM tabel (ibarat denah ruang arsip).
2️⃣ Notasi Chen: entitas ▭ (kata benda tunggal) • atribut ◯ • relasi ◇ (kata kerja) • atribut kunci = garis bawah.
3️⃣ Kardinalitas: 1:1 • 1:N (N:1) • M:N. Tanyakan dari dua arah. M:N butuh tabel tambahan (Bab 4).
4️⃣ 5 langkah: kata benda → keterangan → kata kerja → atribut kunci → kardinalitas. Periksa dengan 4 pertanyaan.
5️⃣ ERD perpustakaan: Buku —dipinjam— Anggota (N:M); tgl_pinjam & tgl_kembali = atribut milik relasi.
6️⃣ Slide gabungan: derajat unary/binary/ternary • super/candidate/primary key (natural, ringkas, unik) • entitas lemah (▭▭) • spesialisasi/generalisasi (ISA) • agregasi • Chen vs Martin (crow’s foot).
⚠️ Elips putus-putus: atribut turunan (slide gabungan) vs atribut relasi (modul P3).`
};
