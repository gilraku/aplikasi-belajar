// Diagram bertahap dan kode berpenjelas untuk Basis Data P9–P14 (menuju UAS).
// Format blok dan renderer: lihat bertahap_it.js dan web/src/scripts/bertahap.js.
// Isi tabel efek dihitung lab SQL (bd_uas_util.jalan), jadi selalu sama dengan Simulator.
const { tabelRelasi } = require("./bertahap_it.js");
const U = require("./bd_uas_util.js");
const { jalan, CREATE_PINJAM, PINJAM, values } = U;
const PREP13 = CREATE_PINJAM + "\nINSERT INTO peminjaman VALUES\n" + values(PINJAM) + ";";

// ---------- P9: UPDATE dan DELETE ----------
const B9 = s => jalan("lima", "SELECT id_buku, judul, stok FROM buku;", s);
const sebelum9 = B9("UPDATE buku SET stok = 5 WHERE id_buku = 'BK004';");
const sesudah9 = B9();
const tambah9 = B9("INSERT INTO buku VALUES ('BK006','Buku Uji Coba','Penulis Uji',2024,1);");
const iBK004 = sesudah9.rows.findIndex(r => r[0] === "BK004");
const bdP9Dml = {
  type: "kode-jelas", label: "Kode Berpenjelas", title: "UPDATE dan DELETE, Dibaca Baris per Baris",
  desc: "Empat perintah praktik modul pada tabel buku (lima baris). Kolom yang diwarnai = yang berubah.",
  file: "tab SQL phpMyAdmin", lang: "sql",
  kode: [
    "UPDATE buku SET stok = 6",
    "WHERE id_buku = 'BK004';",
    "INSERT INTO buku VALUES\n('BK006','Buku Uji Coba','Penulis Uji',2024,1);",
    "DELETE FROM buku\nWHERE id_buku = 'BK006';"
  ],
  inti: { judul: "Stok BK004 ditambah satu, lalu satu buku uji dimasukkan dan dihapus lagi", html: "Hasil akhirnya tetap lima baris; hanya stok BK004 yang berbeda dari awal.",
    efek: { tabel: { kolom: sesudah9.cols, baris: sesudah9.rows } } },
  catatan: [
    { at: [0], judul: "SET: kolom dan nilai barunya", arti: "<code>SET stok = 6</code> menyebut kolom yang diubah dan nilai barunya. Belum menyebut <em>baris mana</em>.",
      efek: { tabel: { kolom: sebelum9.cols, baris: sebelum9.rows.map(r => [r[0], r[1], "6"]), baru: ["stok"] }, note: "Kalau perintah berhenti di sini (tanpa WHERE), kelima baris menjadi 6: Query OK, 5 rows affected." },
      keliru: "Lupa WHERE pada UPDATE. Tidak ada pesan galat; seluruh baris berubah." },
    { at: [1], judul: "WHERE: baris mana yang dikenai", arti: "Hanya baris yang <code>id_buku</code>-nya BK004. Nomor buku unik (kunci primer), jadi tepat satu baris.",
      efek: { tabel: { kolom: sesudah9.cols, baris: sesudah9.rows, baru: ["stok"] }, note: `Stok BK004: ${sebelum9.rows[iBK004][2]} → ${sesudah9.rows[iBK004][2]}. Rows matched: 1  Changed: 1.` },
      keliru: "Menyaring dengan judul (<code>WHERE judul = …</code>). Judul bisa kembar, jadi lebih dari satu baris bisa ikut berubah." },
    { at: [2], judul: "INSERT: baris baru", arti: "Nilai ditulis berurutan sesuai urutan kolom tabel: teks dan tanggal berkutip tunggal, bilangan tanpa kutip.",
      efek: { tabel: { kolom: tambah9.cols, baris: tambah9.rows }, note: "Lima baris menjadi enam." },
      keliru: "Jumlah nilai tidak sama dengan jumlah kolom → ERROR 1136." },
    { at: [3], judul: "DELETE dengan WHERE", arti: "Menghapus baris yang memenuhi syarat; rangka tabel tetap ada.",
      efek: { tabel: { kolom: tambah9.cols, baris: tambah9.rows, hapus: [tambah9.rows.length - 1] }, note: "BK006 hilang, tabel kembali lima baris." },
      keliru: "<code>DELETE FROM buku;</code> tanpa WHERE mengosongkan seluruh isi. Beda dengan <code>DROP TABLE</code> yang menghapus tabelnya." }
  ]
};

// ---------- P13: skema tiga tabel dan CREATE TABLE peminjaman ----------
const bdP13Skema = {
  type: "bertahap", label: "Diagram Bertahap", title: "Skema Lengkap Perpustakaan",
  desc: "Tiga tabel yang dipakai P13–P14. PK = garis bawah penuh, FK = garis bawah titik-titik. Klik satu langkah untuk menyorot bagiannya.",
  alt: "Tabel induk buku (id_buku PK, judul, pengarang, tahun, stok) dan anggota (id_anggota PK, nama, prodi, tgl_daftar, status_aktif). Tabel anak peminjaman (id_pinjam PK, id_buku FK ke buku, id_anggota FK ke anggota, tgl_pinjam, tgl_kembali). Buku 1:N peminjaman, anggota 1:N peminjaman.",
  svg: tabelRelasi([
    { name: "buku · induk", y: 10, s: "1", rows: [["id_buku", "PK", "2 3"], ["judul"], ["pengarang"], ["tahun"], ["stok"]] },
    { name: "peminjaman · anak", y: 218, s: "5", all: "5", rows: [["id_pinjam", "PK", "2"], ["id_buku", "FK", "3"], ["id_anggota", "FK", "3"], ["tgl_pinjam"], ["tgl_kembali"]] },
    { name: "anggota · induk", y: 426, s: "1", rows: [["id_anggota", "PK", "2 3"], ["nama"], ["prodi"], ["tgl_daftar"], ["status_aktif"]] }
  ], [
    { y1: 148, y2: 218, oneAt: "top", verb: "dipinjam", vy: 187 },
    { y1: 356, y2: 426, oneAt: "bottom", verb: "meminjam", vy: 395 }
  ], 576),
  steps: [
    { t: "Tabel induk", html: "<code>buku</code> dan <code>anggota</code> adalah tabel yang <strong>ditunjuk</strong>. Keduanya harus dibuat lebih dulu (Bab 7–8)." },
    { t: "Kunci primer", html: "Setiap tabel punya kunci primer: <code>id_buku</code>, <code>id_anggota</code>, dan <code>id_pinjam</code>. Yang ditunjuk kunci tamu selalu kunci primer tabel induk." },
    { t: "Kunci tamu", html: "<code>peminjaman.id_buku</code> → <code>buku(id_buku)</code> dan <code>peminjaman.id_anggota</code> → <code>anggota(id_anggota)</code>. Tipe datanya sama: CHAR(5). Nilai yang tidak ada di induk ditolak (ERROR 1452)." },
    { t: "Satu ke banyak", html: "Satu buku bisa muncul di banyak baris peminjaman (BK002 dua kali), jadi kolom kunci tamu harus boleh berulang. Di DESCRIBE tertulis <code>MUL</code>, bukan PRI." },
    { t: "Tabel anak (penghubung)", html: "<code>peminjaman</code> memuat dua kunci tamu sekaligus, lahir dari relasi banyak ke banyak. <code>tgl_kembali</code> boleh NULL selama buku belum kembali." }
  ]
};

const D = sql => jalan("sepuluh", "DESCRIBE peminjaman;", sql);
const desc13 = D(CREATE_PINJAM);
const kol13 = desc13.cols.slice(0, 4);
const baris13 = desc13.rows.map(r => r.slice(0, 4));
const tanpaKey = baris13.map(r => [r[0], r[1], r[2], ""]);
const bdP13Create = {
  type: "kode-jelas", label: "Kode Berpenjelas", title: "Membuat Tabel Peminjaman, Dibaca Baris per Baris",
  desc: "Delapan baris di dalam kurung terbagi tiga kelompok: kolom, kunci primer, kunci tamu. Efek = hasil <code>DESCRIBE peminjaman;</code>",
  file: "tab SQL phpMyAdmin", lang: "sql",
  kode: CREATE_PINJAM.split("\n").reduce((a, l) => { if (/^\s+REFERENCES/.test(l)) a[a.length - 1] += "\n" + l; else a.push(l); return a; }, []),
  inti: { judul: "Tabel anak dengan dua kunci tamu", html: "Jalankan sesudah tabel <code>buku</code> dan <code>anggota</code> ada. Hasil DESCRIBE:",
    efek: { tabel: { kolom: kol13, baris: baris13 } } },
  catatan: [
    { at: [0], judul: "Nama tabel baru", arti: "Tabel anak dibuat paling akhir: <code>buku</code> dan <code>anggota</code> yang akan ditunjuk harus sudah ada.",
      efek: { html: "Belum ada kolom. Kalau tabel induk belum dibuat, perintah ini nanti ditolak ERROR 1005 errno 150." } },
    { at: [1, 2, 3, 4, 5], judul: "Lima baris pertama: kolom", arti: "Nama kolom, tipe, dan boleh/tidaknya kosong. <code>id_buku</code> dan <code>id_anggota</code> bertipe CHAR(5), sama persis dengan kolom yang akan ditunjuk.",
      efek: { tabel: { kolom: kol13, baris: tanpaKey }, note: "Hanya tgl_kembali yang boleh kosong (Null = YES)." },
      keliru: "Tipe kunci tamu berbeda dari induknya, misalnya INT untuk CHAR(5) → ERROR 1005 errno 150." },
    { at: [6], judul: "Baris keenam: kunci primer", arti: "<code>id_pinjam</code> menjadi penanda unik tiap peminjaman.",
      efek: { tabel: { kolom: kol13, baris: tanpaKey.map((r, i) => i === 0 ? baris13[0] : r), baru: ["Key"] } } },
    { at: [7, 8], judul: "Dua baris terakhir: kunci tamu", arti: "<code>FOREIGN KEY (kolom_anak) REFERENCES tabel_induk(kolom_induk)</code>. Satu menunjuk buku, satu menunjuk anggota. Ditulis sesudah seluruh kolom didaftarkan.",
      efek: { tabel: { kolom: kol13, baris: baris13, baru: ["Key"] }, note: "MUL = nilainya boleh berulang: satu buku dapat dipinjam berkali-kali." },
      keliru: "REFERENCES ke tabel yang belum dibuat, atau ke kolom yang bukan kunci primer (misalnya buku(pengarang)) → ERROR 1005 errno 150." }
  ]
};

// ---------- P14: tiga tabel + IS NULL ----------
const L = "lengkap";
const FROM14 = "FROM peminjaman AS p";
const J1 = " INNER JOIN anggota AS a ON p.id_anggota = a.id_anggota";
const J2 = " INNER JOIN buku AS b ON p.id_buku = b.id_buku";
const q = (sel, rest) => jalan(L, `SELECT ${sel} ${FROM14}${rest || ""} ORDER BY p.id_pinjam;`);
const t1 = q("p.id_pinjam, p.id_buku, p.id_anggota, p.tgl_kembali");
const t2 = q("p.id_pinjam, p.id_buku, a.nama, p.tgl_kembali", J1);
const t3 = q("p.id_pinjam, a.nama, b.judul, p.tgl_kembali", J1 + J2);
const akhir14 = jalan(L, "SELECT a.nama, b.judul, p.tgl_pinjam " + FROM14 + J1 + J2 + " WHERE p.tgl_kembali IS NULL ORDER BY p.tgl_pinjam;");
const bdP14Join = {
  type: "kode-jelas", label: "Kode Berpenjelas", title: "Tiga Tabel dan IS NULL, Dibaca Baris per Baris",
  desc: "Pertanyaan: buku apa saja yang sedang berada di tangan peminjam? Angka kuning = urutan DBMS mengerjakan klausa.",
  file: "tab SQL phpMyAdmin", lang: "sql",
  kode: [
    "SELECT a.nama, b.judul, p.tgl_pinjam",
    "FROM peminjaman AS p",
    "INNER JOIN anggota AS a ON p.id_anggota = a.id_anggota",
    "INNER JOIN buku AS b ON p.id_buku = b.id_buku",
    "WHERE p.tgl_kembali IS NULL",
    "ORDER BY p.tgl_pinjam;"
  ],
  urut: [5, 1, 2, 3, 4, 6], urutan: ["FROM", "JOIN anggota", "JOIN buku", "WHERE", "SELECT", "ORDER BY"],
  inti: { judul: "Empat buku sedang dipinjam", html: "Ditulis mulai SELECT, dikerjakan mulai FROM. Dua ON untuk tiga tabel. Hasil akhir:",
    efek: { tabel: { kolom: akhir14.cols, baris: akhir14.rows } } },
  catatan: [
    { at: [0], judul: "Pilih kolom yang ditampilkan", arti: "Dari hasil gabungan, hanya nama, judul, dan tanggal pinjam yang dibawa. Setiap kolom ditulis dengan alias tabelnya.",
      efek: { tabel: { kolom: akhir14.cols, baris: akhir14.rows, baru: akhir14.cols } },
      keliru: "Menulis <code>peminjaman.tgl_pinjam</code> padahal alias <code>p</code> sudah dipasang → ERROR 1054." },
    { at: [1], judul: "Tabel awal", arti: "Mulai dari <code>peminjaman</code> karena tabel inilah yang memuat kedua kunci tamu. <code>p</code> adalah alias.",
      efek: { tabel: { kolom: t1.cols, baris: t1.rows }, note: "Enam baris, isinya masih nomor penunjuk." } },
    { at: [2], judul: "Pasangkan dengan anggota", arti: "Setiap baris peminjaman dicarikan anggota yang <code>id_anggota</code>-nya sama, lalu nama anggota ditempelkan.",
      efek: { tabel: { kolom: t2.cols, baris: t2.rows, baru: ["nama"] }, note: "Kolom nama bertambah; baris tetap enam karena semua berpasangan." },
      keliru: "Lupa ON → perkalian silang 6 × 3 = 18 baris, tanpa pesan galat." },
    { at: [3], judul: "Pasangkan dengan buku", arti: "Dengan cara yang sama, judul diambil dari <code>buku</code> lewat <code>id_buku</code>. Tiga tabel → dua ON.",
      efek: { tabel: { kolom: t3.cols, baris: t3.rows, baru: ["judul"] } },
      keliru: "ON pada kolom keliru, misalnya <code>p.id_anggota = b.id_buku</code> → Empty set." },
    { at: [4], judul: "Saring yang belum kembali", arti: "<code>IS NULL</code> mencari kolom yang belum diisi.",
      efek: { tabel: { kolom: t3.cols, baris: t3.rows, hapus: t3.rows.map((r, i) => r[3] !== "NULL" ? i : -1).filter(i => i >= 0) }, note: "PJ0001 dan PJ0004 sudah kembali, jadi dibuang. Tersisa empat." },
      keliru: "<code>= NULL</code>: tidak galat, tetapi selalu nol baris." },
    { at: [5], judul: "Urutkan", arti: "Urut tanggal pinjam dari yang paling lama. Tanpa ORDER BY urutan hasil tidak dijamin.",
      efek: { tabel: { kolom: akhir14.cols, baris: akhir14.rows } } }
  ]
};

module.exports = { bdP9Dml, bdP13Skema, bdP13Create, bdP14Join };
