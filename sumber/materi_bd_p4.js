// Materi Lengkap Basis Data P4: Dari ERD ke Tabel + SQL DML
const { C, box, arrow, path, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a, ok, o]) => ({ cells: [c], fields: [{ options: o || opts, answer: a }], ok: ok || "✓" })) });
const ln = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#64748b" stroke-width="2"/>`;

// tabel kecil: judul + baris kolom; k = 'pk' | 'fk' | ''
const tbl = (x, y, w, name, cols, tone, part) => {
  const [f, s, c] = C[tone]; const h = 30 + cols.length * 24;
  let g = `<g data-part="${part}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#fff" stroke="${s}" stroke-width="2"/><rect x="${x}" y="${y}" width="${w}" height="28" rx="6" fill="${f}" stroke="${s}" stroke-width="2"/>${text(x + w / 2, y + 14, name, { size: 14, color: c })}`;
  cols.forEach(([n, k], i) => { const cy = y + 42 + i * 24; const tw = n.length * 7.6;
    g += text(x + 14, cy, n, { anchor: "start", size: 13, color: k === "pk" ? "#be123c" : k === "fk" ? "#7c3aed" : "#334155" });
    if (k) g += `<line x1="${x + 14}" y1="${cy + 9}" x2="${x + 14 + tw}" y2="${cy + 9}" stroke="${k === "pk" ? "#be123c" : "#7c3aed"}" stroke-width="1.5"${k === "fk" ? ' stroke-dasharray="3 3"' : ""}/>`; });
  return g + "</g>";
};

const tigaTabel = diagram({
  label: "Diagram Interaktif", title: "ERD Perpustakaan → 3 Tabel", desc: "Hasil aturan 1 dan 4. Klik tabel, kunci, atau panah rujukan.", minw: 680,
  svg: svg(820, 260,
    tbl(20, 40, 210, "buku", [["id_buku", "pk"], ["judul"], ["pengarang"], ["tahun"], ["stok"]], "sky", "buku") +
    tbl(305, 40, 210, "peminjaman", [["id_pinjam", "pk"], ["id_buku", "fk"], ["id_anggota", "fk"], ["tgl_pinjam"], ["tgl_kembali"]], "amber", "pinjam") +
    tbl(590, 40, 210, "anggota", [["id_anggota", "pk"], ["nama"], ["prodi"], ["tgl_daftar"]], "sky", "agt") +
    `<g data-part="fk1">${path("M305,106 L262,106 L262,82 L234,82", { color: "#7c3aed" })}</g>` +
    `<g data-part="fk2">${path("M515,130 L548,130 L548,82 L586,82", { color: "#7c3aed" })}</g>` +
    text(410, 230, "PK = garis bawah penuh (merah) • FK = garis bawah titik-titik (ungu) • panah = merujuk", { size: 12, color: "#475569" })
  ),
  parts: [
    { id: "buku", label: "buku", title: "Aturan 1: entitas Buku → tabel buku", text: "Atribut menjadi kolom, id_buku menjadi kunci primer. Kolom <code>stok</code> ditambahkan saat ditinjau (jumlah eksemplar)." },
    { id: "agt", label: "anggota", title: "Aturan 1: entitas Anggota → tabel anggota", text: "Kolom <code>tgl_daftar</code> ditambahkan saat ditinjau." },
    { id: "pinjam", label: "peminjaman", title: "Aturan 4: relasi M:N → tabel penghubung", text: "Berisi PK sendiri (id_pinjam), kedua kunci tamu, dan atribut milik relasi (tgl_pinjam, tgl_kembali). <code>tgl_kembali</code> boleh NULL selama buku belum kembali." },
    { id: "fk1", label: "id_buku → buku", title: "Kunci tamu id_buku", text: "Setiap nilai id_buku di peminjaman harus ada di buku.id_buku (integritas rujukan). BK999 → ERROR 1452." },
    { id: "fk2", label: "id_anggota → anggota", title: "Kunci tamu id_anggota", text: "Slip cukup menulis AG001, tidak menyalin nama. Ganti nama cukup di satu tempat." }
  ]
});

const aturan = diagram({
  label: "Diagram Interaktif", title: "Empat Aturan Transformasi", desc: "Bentuk ERD di kiri, hasil tabel di kanan. Klik setiap aturan.", minw: 640,
  svg: svg(800, 420,
    [["a1", 20, "Aturan 1 • Entitas", "Buku", "buku(id_buku, judul, …)", "sky"],
     ["a2", 120, "Aturan 2 • 1 : 1", "Anggota —1— memiliki —1— Kartu", "kartu(id_kartu, …, id_anggota*)", "emerald"],
     ["a3", 220, "Aturan 3 • 1 : N", "Penerbit —1— menerbitkan —N— Buku", "buku(id_buku, …, id_penerbit*)", "amber"],
     ["a4", 320, "Aturan 4 • M : N", "Buku —M— ditulis —N— Pengarang", "buku_pengarang(id_buku*, id_pengarang*)", "violet"]]
      .map(([p, y, h, erd, hasil, tone]) => `<g data-part="${p}">` + box(20, y, 300, 76, h + "|" + erd, tone, null, { size: 13 }) + arrow(330, y + 38, 420, y + 38) + box(430, y, 350, 76, hasil, tone, null, { size: 13 }) + "</g>").join("")
  ),
  parts: [
    { id: "a1", label: "Aturan 1", title: "Setiap entitas → satu tabel", text: "Nama tabel dari nama entitas (huruf kecil), atribut → kolom, atribut kunci → kunci primer." },
    { id: "a2", label: "Aturan 2", title: "1:1 → titip salah satu kunci", text: "Bebas dititipkan ke salah satu sisi. Lazimnya ke tabel yang ‘bergantung’ (kartu bergantung pada anggota). ➕ Beri batasan UNIQUE pada kunci tamu itu agar satu anggota tidak punya dua kartu." },
    { id: "a3", label: "Aturan 3", title: "1:N → kunci sisi satu ke sisi banyak", text: "id_penerbit dititipkan ke buku. Jika terbalik (id_buku di penerbit), satu sel penerbit harus menampung banyak buku → melanggar aturan satu sel satu nilai." },
    { id: "a4", label: "Aturan 4", title: "M:N → tabel penghubung", text: "Tabel baru berisi kedua kunci tamu (+ atribut relasi bila ada). ➕ Kunci primernya bisa id sendiri (id_pinjam) atau gabungan kedua FK (composite key) bila pasangan itu memang hanya muncul sekali." }
  ]
});

const sqlTree = diagram({
  label: "Diagram Interaktif", title: "Peta Perintah SQL", desc: "Empat kelompok. DML adalah fokus pertemuan ini.", minw: 620,
  svg: svg(800, 250,
    box(330, 15, 140, 46, "SQL", "slate", "sql", { size: 16 }) +
    [[20, "DDL", "CREATE|ALTER • DROP", "violet", "ddl"], [220, "DML", "INSERT • SELECT|UPDATE • DELETE", "emerald", "dml"], [420, "DCL", "GRANT|REVOKE", "amber", "dcl"], [620, "TCL", "COMMIT • ROLLBACK|SAVEPOINT", "sky", "tcl"]]
      .map(([x, h, t, tone, p]) => path(`M400,61 L400,90 L${x + 80},90 L${x + 80},112`) + box(x, 115, 160, 40, h, tone, p, { size: 15 }) + text(x + 80, 195, t, { size: 12, color: "#334155" })).join("")
  ),
  parts: [
    { id: "sql", label: "SQL", title: "Structured Query Language", text: "Bahasa standar untuk berbicara dengan DBMS relasional (MySQL, PostgreSQL, SQL Server, Oracle)." },
    { id: "ddl", label: "DDL", title: "Data Definition Language", text: "Mengatur <strong>struktur</strong>: membuat, mengubah, menghapus tabel. ALTER mengubah struktur, bukan isi." },
    { id: "dml", label: "DML", title: "Data Manipulation Language", text: "Mengolah <strong>isi</strong>: menambah, membaca, mengubah, menghapus baris. ➕ Sebagian buku memisahkan SELECT sebagai DQL (Data Query Language); slide memasukkannya ke DML." },
    { id: "dcl", label: "DCL", title: "Data Control Language", text: "Hak akses: GRANT memberi, REVOKE mencabut." },
    { id: "tcl", label: "TCL", title: "Transaction Control Language", text: "COMMIT menyimpan, ROLLBACK membatalkan, SAVEPOINT memberi titik simpan di tengah transaksi." }
  ]
});

const hapus = diagram({
  label: "Diagram Interaktif", title: "DELETE vs TRUNCATE vs DROP", desc: "Apa yang tersisa setelah perintah dijalankan?", minw: 600,
  svg: svg(800, 230,
    [[20, "DELETE … WHERE", "amber", "del", [1, 0, 1, 0], true], [290, "TRUNCATE TABLE", "rose", "tr", [0, 0, 0, 0], true], [560, "DROP TABLE", "violet", "dr", null, false]]
      .map(([x, h, tone, p, rows, struct]) => {
        let g = `<g data-part="${p}">` + box(x, 10, 220, 40, h, tone, null, { size: 14 });
        if (struct) { g += `<rect x="${x + 20}" y="65" width="180" height="24" fill="#e2e8f0" stroke="#64748b"/>` + text(x + 110, 77, "struktur tetap", { size: 11, color: "#334155" });
          rows.forEach((r, i) => g += `<rect x="${x + 20}" y="${89 + i * 24}" width="180" height="24" fill="${r ? "#fff" : "#fee2e2"}" stroke="#94a3b8"${r ? "" : ' stroke-dasharray="4 3"'}/>` + text(x + 110, 101 + i * 24, r ? "baris tersisa" : "dihapus", { size: 11, color: r ? "#334155" : "#be123c" })); }
        else g += `<rect x="${x + 20}" y="65" width="180" height="120" fill="none" stroke="#7c3aed" stroke-dasharray="6 4"/>` + text(x + 110, 125, "tabel hilang|(isi + struktur)", { size: 12, color: "#7c3aed" });
        return g + text(x + 110, 210, p === "del" ? "bisa ROLLBACK" : p === "tr" ? "tidak bisa ROLLBACK" : "DDL • buat ulang", { size: 12, color: "#475569" }) + "</g>"; }).join("")
  ),
  parts: [
    { id: "del", label: "DELETE", title: "DELETE (DML)", text: "Menghapus baris yang memenuhi WHERE. Tanpa WHERE: semua baris, tetapi struktur tetap. Dalam transaksi masih bisa di-ROLLBACK." },
    { id: "tr", label: "TRUNCATE", title: "TRUNCATE", text: "Mengosongkan seluruh isi sekaligus, lebih cepat, tanpa kondisi. Menurut slide tidak bisa di-ROLLBACK. ➕ Di MySQL, TRUNCATE juga mengembalikan AUTO_INCREMENT ke awal." },
    { id: "dr", label: "DROP", title: "DROP (DDL)", text: "Menghapus tabel beserta strukturnya. Untuk dipakai lagi, harus CREATE TABLE ulang." }
  ]
});

const transaksi = diagram({
  label: "Diagram Interaktif", title: "Alur Transaksi: COMMIT atau ROLLBACK", desc: "Contoh latihan no. 5 slide. Klik setiap langkah.", minw: 640,
  svg: svg(800, 230,
    box(10, 80, 130, 56, "START|TRANSACTION", "slate", "start", { size: 12 }) + arrow(140, 108, 175, 108) +
    box(180, 80, 170, 56, "DELETE FROM mahasiswa|WHERE angkatan=2022", "amber", "dml", { size: 11 }) +
    path("M350,100 L400,40 L440,40") + path("M350,116 L400,176 L440,176") +
    box(445, 15, 130, 50, "COMMIT;", "emerald", "commit", { size: 14 }) + box(445, 151, 130, 50, "ROLLBACK;", "rose", "rb", { size: 14 }) +
    arrow(575, 40, 610, 40) + arrow(575, 176, 610, 176) +
    box(615, 15, 175, 50, "Dian terhapus|permanen (3 baris)", "emerald", null, { size: 12 }) + box(615, 151, 175, 50, "Dian kembali|(tetap 4 baris)", "rose", null, { size: 12 })
  ),
  parts: [
    { id: "start", label: "START TRANSACTION", title: "➕ Wajib di MySQL", text: "MySQL memakai autocommit: tiap perintah langsung tersimpan. START TRANSACTION mematikannya sampai COMMIT atau ROLLBACK." },
    { id: "dml", label: "Perubahan", title: "Perubahan sementara", text: "Selama transaksi, perubahan belum permanen bagi pemakai lain." },
    { id: "commit", label: "COMMIT", title: "Simpan permanen", text: "Setelah COMMIT, perubahan tidak bisa dibatalkan dengan ROLLBACK." },
    { id: "rb", label: "ROLLBACK", title: "Batalkan", text: "Kembali ke kondisi COMMIT terakhir. Berlaku untuk DML (INSERT/UPDATE/DELETE), tidak untuk TRUNCATE atau DDL." }
  ]
});

module.exports = [
  A("Mengapa ERD Harus Diubah Menjadi Tabel?", `<p>ERD adalah gambar rancangan; DBMS seperti MySQL tidak menyimpan gambar, ia menyimpan <strong>tabel</strong>. Pertemuan ini menjembatani keduanya: setiap kotak, elips, dan belah ketupat di ERD diterjemahkan menjadi tabel, kolom, dan kunci.</p>
<p>Untuk menuliskan rancangan tabel secara ringkas dipakai <strong>skema relasi</strong>: <code>nama_tabel(kolom1, kolom2, …)</code>. Kunci primer diberi garis bawah <strong>penuh</strong>, kunci tamu garis bawah <strong>titik-titik</strong>. Saat mengetik tanpa garis bawah, kebiasaan umum adalah menebalkan PK dan memberi bintang (*) pada FK.</p>`, "Bagian 1"),
  A("Kunci Tamu dan Integritas Rujukan", `<p><strong>Kunci tamu</strong> (foreign key, FK) adalah kolom di satu tabel yang isinya menunjuk kunci primer di tabel lain. Ibaratnya slip peminjaman yang hanya menulis nomor buku dan nomor anggota: tidak perlu menyalin judul dan nama.</p>
<p>Manfaatnya: data tidak berulang (P2: redundansi → inkonsistensi), dan perbaikan cukup di satu tempat. Aturan yang menjaganya disebut <strong>integritas rujukan</strong> (referential integrity): DBMS menolak nilai FK yang tidak ada di tabel rujukan dengan <code>ERROR 1452 … a foreign key constraint fails</code>.</p>
<p>➕ <strong>Tambahan:</strong> integritas rujukan juga bekerja ke arah sebaliknya. Menghapus buku BK002 yang masih dirujuk peminjaman akan ditolak (<code>ERROR 1451 Cannot delete or update a parent row</code>), kecuali FK dibuat dengan <code>ON DELETE CASCADE</code> atau <code>ON DELETE SET NULL</code>.</p>`, "Bagian 2"),
  aturan,
  ex("Latihan Interaktif", "Ke Tabel Mana Kunci Dititipkan?", ["Relasi", "Letak kunci tamu"], null, [
    ["Prodi 1:N Mahasiswa", "id_prodi di tabel mahasiswa", "✓ Sisi satu → sisi banyak.", ["id_prodi di tabel mahasiswa", "id_mahasiswa di tabel prodi", "Tabel penghubung"]],
    ["Mahasiswa M:N Mata kuliah", "Tabel penghubung krs", "✓ krs(id_krs, nim*, kode_mk*, semester).", ["nim di tabel mata_kuliah", "kode_mk di tabel mahasiswa", "Tabel penghubung krs"]],
    ["Dosen 1:N Kelas (satu kelas satu dosen)", "id_dosen di tabel kelas", "✓", ["id_dosen di tabel kelas", "id_kelas di tabel dosen", "Tabel penghubung"]],
    ["Mahasiswa 1:1 Akun LMS", "Salah satu (lazimnya nim di akun)", "✓ Aturan 2: bebas, lazimnya ke tabel yang bergantung.", ["Salah satu (lazimnya nim di akun)", "Wajib tabel penghubung", "Tidak perlu kunci tamu"]]
  ]),
  tigaTabel,
  { type: "table", label: "Tabel Interaktif", title: "Isi Tabel peminjaman (Modul)", mono: true, headers: ["id_pinjam", "id_buku", "id_anggota", "tgl_pinjam", "tgl_kembali"],
    rows: [["PJ0001", "BK002", "AG001", "2026-10-01", "2026-10-08"], ["PJ0002", "BK001", "AG002", "2026-10-02", "NULL"], ["PJ0003", "BK002", "AG003", "2026-10-05", "NULL"]],
    modes: [{ label: "BK002 dua kali", target: "col", col: 1, title: "Kunci tamu boleh berulang", text: "BK002 dipinjam AG001 dan AG003. Karena itu DESCRIBE menandainya MUL, bukan PRI." },
      { label: "NULL", target: "col", col: 4, title: "Belum dikembalikan", text: "PJ0002 dan PJ0003 masih dipinjam. NULL ≠ tanggal kosong '' ≠ 0." },
      { label: "Pinjam BK999?", target: "none", title: "Ditolak", text: "BK999 tidak ada di tabel buku → ERROR 1452." }] },
  { type: "table", label: "Tabel Interaktif", title: "Lima Kekeliruan Transformasi (Modul)", headers: ["Kekeliruan", "Akibat", "Perbaikan"],
    rows: [["Mengisi FK dengan nilai yang tidak ada", "ERROR 1452", "Isi tabel rujukan dulu (buku, anggota), baru peminjaman"], ["M:N dipaksa menjadi 2 tabel", "Satu sel berisi banyak nilai", "Buat tabel penghubung"], ["FK diletakkan di sisi yang salah (1:N)", "Sisi satu harus menampung banyak nilai", "Kunci sisi satu → sisi banyak"], ["Atribut relasi dimasukkan ke tabel entitas", "tgl_pinjam di buku hanya bisa satu tanggal", "Masukkan ke tabel penghubung"], ["Nama FK berbeda dari PK rujukan", "Membingungkan saat membaca/menggabung", "Pakai nama yang sama (id_buku ↔ id_buku)"]],
    modes: [{ label: "Urutan isi data", target: "row", row: 0, title: "Induk dulu, anak kemudian", text: "Tabel yang dirujuk (induk) diisi lebih dulu. Saat menghapus sebaliknya: anak dulu, induk kemudian." }] },
  A("SQL dan Kelompok Perintahnya", `<p>Setelah tabel ada, kita berbicara dengan DBMS memakai <strong>SQL</strong>. Perintahnya dikelompokkan menjadi DDL (struktur), DML (isi), DCL (hak akses), dan TCL (transaksi). Pertemuan ini berfokus pada <strong>DML</strong> dan sedikit TCL.</p>`, "Bagian 3"),
  sqlTree,
  { type: "table", label: "Tabel Interaktif", title: "Tabel Contoh: mahasiswa (Slide)", mono: true, headers: ["nim", "nama", "jurusan", "angkatan", "ipk"],
    rows: [["2301001", "Andi Pratama", "Sistem Informasi", "2023", "3.45"], ["2301002", "Budi Santoso", "Sistem Informasi", "2023", "3.10"], ["2301003", "Citra Dewi", "Teknik Informatika", "2023", "3.78"], ["2201004", "Dian Permata", "Sistem Informasi", "2022", "3.25"]],
    modes: [{ label: "WHERE jurusan='Sistem Informasi'", target: "col", col: 2, title: "3 baris lolos", text: "Andi, Budi, Dian." }, { label: "ipk ≥ 3.50", target: "row", row: 2, title: "Hanya Citra", text: "3.78." }, { label: "angkatan = 2022", target: "row", row: 3, title: "Dian", text: "Baris yang dihapus pada latihan no. 5." }] },
  { type: "code", label: "Contoh Kode", title: "INSERT: Tiga Bentuk", file: "insert.sql", code: `-- 1. dengan daftar kolom (disarankan)
INSERT INTO mahasiswa (nim, nama, jurusan, angkatan, ipk)
VALUES ('2301005', 'Eka Saputra', 'Sistem Informasi', 2023, 3.60);

-- 2. banyak baris sekaligus
INSERT INTO mahasiswa (nim, nama, jurusan, angkatan, ipk) VALUES
('2301006', 'Fajar', 'Teknik Informatika', 2023, 3.20),
('2301007', 'Gita',  'Sistem Informasi',   2023, 3.55);

-- 3. tanpa daftar kolom: urutan harus sama persis dengan struktur tabel
INSERT INTO mahasiswa VALUES ('2301008', 'Hana', 'Sistem Informasi', 2023, 3.40);`, note: "Jumlah & urutan nilai = jumlah & urutan kolom. Teks dan tanggal pakai kutip tunggal. Kolom NOT NULL wajib diisi (kecuali punya DEFAULT). PK tidak boleh kembar (ERROR 1062)." },
  { type: "code", label: "Contoh Kode", title: "SELECT: Memilih, Menyaring, Mengurutkan", file: "select.sql", code: `SELECT * FROM mahasiswa;                         -- semua kolom
SELECT nama, ipk FROM mahasiswa;                 -- kolom tertentu
SELECT * FROM mahasiswa WHERE ipk BETWEEN 3.00 AND 3.50;
SELECT * FROM mahasiswa WHERE jurusan IN ('Sistem Informasi', 'Teknik Informatika');
SELECT * FROM mahasiswa WHERE nama LIKE '%a';    -- diakhiri huruf a
SELECT * FROM peminjaman WHERE tgl_kembali IS NULL;  -- bukan = NULL!
SELECT DISTINCT jurusan FROM mahasiswa;
SELECT nama, ipk FROM mahasiswa ORDER BY ipk DESC LIMIT 3;`, note: "➕ Untuk NULL wajib IS NULL / IS NOT NULL; tulisan <code>= NULL</code> tidak pernah bernilai benar. ➕ LIKE: % = nol atau lebih karakter, _ = tepat satu karakter." },
  ex("Latihan Interaktif", "Operator WHERE yang Tepat", ["Kebutuhan", "Operator"], ["BETWEEN", "IN", "LIKE", "IS NULL"], [
    ["IPK dari 3.00 sampai 3.50", "BETWEEN"], ["Jurusan SI atau TI", "IN"], ["Nama diawali huruf C", "LIKE"], ["Buku yang belum dikembalikan", "IS NULL"]
  ]),
  { type: "code", label: "Contoh Kode", title: "UPDATE dan DELETE dengan Aman", file: "ubah_hapus.sql", code: `-- 1. lihat dulu baris yang akan kena
SELECT * FROM mahasiswa WHERE nim = '2301002';
-- 2. baru ubah dengan WHERE yang sama
UPDATE mahasiswa SET ipk = 3.35 WHERE nim = '2301002';
-- mengubah beberapa kolom sekaligus
UPDATE mahasiswa SET jurusan = 'Teknik Informatika', angkatan = 2024 WHERE nim = '2301005';

DELETE FROM mahasiswa WHERE angkatan = 2022;`, note: "UPDATE/DELETE tanpa WHERE mengenai semua baris dan MySQL tidak memberi peringatan. ➕ MySQL Workbench menyalakan <em>safe update mode</em> yang menolak UPDATE/DELETE tanpa WHERE pada kunci." },
  hapus,
  transaksi,
  tip("➕ Tambahan: urutan penulisan klausa SELECT", "SELECT kolom → FROM tabel → WHERE kondisi → ORDER BY kolom → LIMIT n. Menukar urutan (misalnya ORDER BY sebelum WHERE) menghasilkan ERROR 1064."),
  rv("Cek Pemahaman", "Jawab Dulu, Baru Buka", [
    { prompt: "Tulis skema relasi untuk relasi Buku M:N Pengarang.", answer: "buku(id_buku, …) • pengarang(id_pengarang, nama, …) • buku_pengarang(id_buku*, id_pengarang*)", reason: "Aturan 4." },
    { prompt: "Mengapa tabel anggota harus diisi sebelum peminjaman?", answer: "Karena peminjaman merujuk anggota", reason: "Kalau AG001 belum ada, INSERT peminjaman → ERROR 1452." },
    { prompt: "Perintah apa untuk melihat buku yang belum kembali?", answer: "SELECT * FROM peminjaman WHERE tgl_kembali IS NULL;", reason: "Hasil: PJ0002 dan PJ0003." },
    { prompt: "Apa beda ALTER dan UPDATE?", answer: "ALTER (DDL) mengubah struktur; UPDATE (DML) mengubah isi", reason: "Misalnya ALTER menambah kolom stok, UPDATE mengubah angka stok." }
  ]),
  tip("CPMK 1", "Buka tab <strong>Kuis</strong> untuk bank soal P1–P4. Fokus yang sering keluar: data vs informasi, hierarki data, aturan tabel relasional, tipe data & NULL, notasi ERD dan kardinalitas, 4 aturan transformasi, kunci tamu, serta bentuk INSERT/SELECT/UPDATE/DELETE.", "warn")
];
