// Diagram bertahap (blok "bertahap") dan kode berpenjelas (blok "kode-jelas") untuk materi IT.
// Renderer-nya ada di web/src/scripts/bertahap.js. Di SVG, bagian yang menyala ditandai
// class="bt-part" data-s="<nomor langkah>"; .bt-hl / .bt-hl-line diberi warna stabilo saat langkahnya dipilih.

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const part = (s, inner) => `<g class="bt-part" data-s="${s}">${inner}</g>`;
const svgWrap = (w, h, inner, marker) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${marker ? '<defs><marker id="bt-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#17202a"/></marker></defs>' : ""}${inner}</svg>`;

// ---------- ERD Chen (BD P3, Gambar 3 modul), disusun vertikal agar terbaca di HP ----------
function erdChen() {
  const oval = (cx, cy, rx, t, s, o = {}) => {
    const ry = 17, tw = t.length * 6.3;
    return part(s, `<ellipse class="bt-hl" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/><ellipse class="bt-box" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"${o.dash ? ' stroke-dasharray="5 3.5"' : ""}/>` +
      `<text class="bt-t-row" x="${cx}" y="${cy + 4}" text-anchor="middle">${esc(t)}</text>` +
      (o.key ? `<line class="bt-ul" x1="${cx - tw / 2}" x2="${cx + tw / 2}" y1="${cy + 8}" y2="${cy + 8}"/>` : ""));
  };
  const line = (x1, y1, x2, y2, s) => part(s, `<path class="bt-hl-line" d="M${x1} ${y1} L${x2} ${y2}"/><path class="bt-wire" d="M${x1} ${y1} L${x2} ${y2}"/>`);
  const r1 = v => Math.round(v * 10) / 10;
  // garis dari tepi bentuk ke tepi elips, supaya tidak menembus tulisan saat bagian lain memudar
  const toOval = (cx, cy, hw, hh, x, y, rx, s) => {
    const dx = x - cx, dy = y - cy, t0 = Math.min(hw / Math.abs(dx || 1e-9), hh / Math.abs(dy || 1e-9)), t1 = 1 - 1 / Math.hypot(dx / rx, dy / 17);
    return line(r1(cx + dx * t0), r1(cy + dy * t0), r1(cx + dx * t1), r1(cy + dy * t1), s);
  };
  const ent = (x, y, t) => part("1", `<rect class="bt-hl" x="${x}" y="${y}" width="100" height="40"/><rect class="bt-box" x="${x}" y="${y}" width="100" height="40"/><text class="bt-t-head" x="${x + 50}" y="${y + 25}" text-anchor="middle">${t}</text>`);
  const B = [170, 90], G = [170, 360], D = [170, 225];
  const atrB = [[58, 30, 48, "id_buku", "3", 1], [170, 22, 34, "judul", "2"], [282, 30, 50, "pengarang", "2"], [58, 150, 34, "tahun", "2"]];
  const atrG = [[62, 422, 54, "id_anggota", "3", 1], [170, 440, 32, "nama", "2"], [282, 422, 34, "prodi", "2"]];
  const rel = [[52, 225, 46, "tgl_pinjam"], [288, 225, 48, "tgl_kembali"]];
  let o = "";
  o += atrB.map(([x, y, rx, , s]) => toOval(B[0], B[1], 50, 20, x, y, rx, s)).join("") + atrG.map(([x, y, rx, , s]) => toOval(G[0], G[1], 50, 20, x, y, rx, s)).join("");
  o += rel.map(([x, y, rx]) => toOval(D[0], D[1], 64, 33, x, y, rx, "5")).join("");
  o += line(170, 110, 170, 192, "4") + line(170, 258, 170, 340, "4");
  o += ent(120, 70, "Buku") + ent(120, 340, "Anggota");
  o += part("4", `<polygon class="bt-hl" points="170,192 234,225 170,258 106,225"/><polygon class="bt-box" points="170,192 234,225 170,258 106,225"/><text class="bt-t-head" x="170" y="229" text-anchor="middle">dipinjam</text>` +
    `<text class="bt-t-card" x="182" y="158">N</text><text class="bt-t-card" x="182" y="306">M</text>`);
  o += atrB.concat(atrG).map(([x, y, rx, t, s, k]) => oval(x, y, rx, t, s, { key: k })).join("");
  o += rel.map(([x, y, rx, t]) => oval(x, y, rx, t, "5", { dash: true })).join("");
  return svgWrap(340, 466, o);
}

// ---------- Tabel hasil transformasi + garis relasi (BD P4) ----------
// ents: [{ name, y, s (langkah untuk judul), all (langkah untuk seluruh isi, opsional), rows: [[kolom, "PK"|"FK"|"", langkah]] }]
// rels: [{ y1, y2, oneAt: "top"|"bottom", verb, vy }]
function tabelRelasi(ents, rels, h) {
  const X = 80, W = 190, HH = 28, RH = 22, cx = X + W / 2;
  let o = "";
  for (const e of ents) {
    const hgt = HH + e.rows.length * RH;
    o += part(e.s, `<rect class="bt-hl" x="${X}" y="${e.y}" width="${W}" height="${HH}" rx="8"/><text class="bt-t-head" x="${X + 12}" y="${e.y + 19}">${esc(e.name)}</text>`);
    e.rows.forEach(([t, key, s], i) => {
      const y = e.y + HH + i * RH, tw = t.length * 7.2;
      const ss = [s, e.all].filter(Boolean).join(" ");
      o += part(ss || "0", `<rect class="bt-hl${ss ? "" : " is-clear"}" x="${X + 1}" y="${y}" width="${W - 2}" height="${RH}"/>` +
        `<text class="bt-t-row" x="${X + 12}" y="${y + 15}">${esc(t)}</text>` +
        (key ? `<line class="bt-ul${key === "FK" ? " is-fk" : ""}" x1="${X + 12}" x2="${X + 12 + tw}" y1="${y + 18}" y2="${y + 18}"/><text class="bt-t-key" x="${X + W - 12}" y="${y + 15}" text-anchor="end">${key}</text>` : ""));
      o += `<line class="bt-rowline" x1="${X}" x2="${X + W}" y1="${y}" y2="${y}"/>`;
    });
    o += `<rect class="bt-box" x="${X}" y="${e.y}" width="${W}" height="${hgt}" rx="8"/>`;
  }
  for (const r of rels) {
    const top = r.oneAt === "top", one = top ? r.y1 : r.y2, many = top ? r.y2 : r.y1, dir = top ? -1 : 1;
    const foot = many + dir * 16, b1 = one - dir * 8, b2 = one - dir * 14;
    const marks = `M${cx - 9} ${b1} H${cx + 9} M${cx - 9} ${b2} H${cx + 9} M${cx} ${foot} L${cx - 11} ${many} M${cx} ${foot} L${cx + 11} ${many}`;
    o += part("3 4 5", `<path class="bt-hl-line" d="M${cx} ${r.y1} V${r.y2}"/><path class="bt-wire" d="M${cx} ${r.y1} V${r.y2}"/>`);
    o += part("4", `<path class="bt-hl-line" d="${marks}"/><path class="bt-wire" d="${marks}"/>` +
      `<text class="bt-t-card" x="${cx + 16}" y="${one - dir * 8 + 4}">1</text><text class="bt-t-card" x="${cx + 16}" y="${many + dir * 10 + 4}">N</text>`);
    o += part("4 5", `<text class="bt-t-lbl" x="${cx - 16}" y="${r.vy}" text-anchor="end">${esc(r.verb)}</text>`);
  }
  return svgWrap(350, h, o);
}

const erdTigaTabelSvg = tabelRelasi([
  { name: "buku", y: 10, s: "1", rows: [["id_buku", "PK", "2 3"], ["judul"], ["pengarang"], ["tahun"], ["stok"]] },
  { name: "peminjaman", y: 218, s: "5", all: "5", rows: [["id_pinjam", "PK", "2"], ["id_buku", "FK", "3"], ["id_anggota", "FK", "3"], ["tgl_pinjam"], ["tgl_kembali"]] },
  { name: "anggota", y: 426, s: "1", rows: [["id_anggota", "PK", "2 3"], ["nama"], ["prodi"], ["tgl_daftar"]] }
], [
  { y1: 148, y2: 218, oneAt: "top", verb: "dipinjam", vy: 187 },
  { y1: 356, y2: 426, oneAt: "bottom", verb: "meminjam", vy: 395 }
], 552);

// ---------- Alur satu kali Tambah data (PWD P13): Browser → PHP → MySQL → kembali ----------
function alurTambah() {
  const X = 95, W = 160, H = 54;
  const nodes = [
    { t: "Browser", s: "form Tambah", y: 8, st: "1 5" },
    { t: "Server · PHP", s: "crud-mahasiswa.php", y: 140, st: "2" },
    { t: "MySQL", s: "db_mahasiswa", y: 272, st: "4" }
  ];
  let o = "";
  for (const n of nodes) {
    o += part(n.st, `<rect class="bt-hl" x="${X}" y="${n.y}" width="${W}" height="${H}" rx="10"/><rect class="bt-box" x="${X}" y="${n.y}" width="${W}" height="${H}" rx="10"/>` +
      `<text class="bt-t-head" x="${X + W / 2}" y="${n.y + 23}" text-anchor="middle">${esc(n.t)}</text><text class="bt-t-mono" x="${X + W / 2}" y="${n.y + 41}" text-anchor="middle">${esc(n.s)}</text>`);
  }
  const lx = X + 48, rx = X + W - 48;
  const arrow = (x, y1, y2, s, num, l1, l2, side) => {
    const tx = side === "L" ? x - 10 : x + 10, anc = side === "L" ? "end" : "start", my = (y1 + y2) / 2;
    return part(s, `<path class="bt-hl-line" d="M${x} ${y1} V${y2}"/><path class="bt-wire" d="M${x} ${y1} V${y2}" marker-end="url(#bt-ah)"/>` +
      `<text class="bt-t-card" x="${tx}" y="${my - 4}" text-anchor="${anc}">${esc(num)}</text><text class="bt-t-mono" x="${tx}" y="${my + 10}" text-anchor="${anc}">${esc(l1)}</text>` +
      (l2 ? `<text class="bt-t-mono" x="${tx}" y="${my + 23}" text-anchor="${anc}">${esc(l2)}</text>` : ""));
  };
  o += arrow(lx, 8 + H + 2, 140 - 3, "1", "1 · POST", "nim, nama,", "jurusan, email", "L");
  o += arrow(lx, 140 + H + 2, 272 - 3, "3", "3 · query", "INSERT INTO", "mahasiswa", "L");
  o += arrow(rx, 272 - 2, 140 + H + 3, "4", "4 · hasil", "1 baris", "tersimpan", "R");
  o += arrow(rx, 140 - 2, 8 + H + 3, "5", "5 · response", "redirect,", "lalu GET", "R");
  o += part("2", `<text class="bt-t-mono is-key" x="${X + W + 8}" y="164">2 · $_POST</text><text class="bt-t-mono is-key" x="${X + W + 8}" y="178">terisi</text>`);
  return svgWrap(350, 336, o, true);
}

// ====================== Blok ======================

const bdErdChen = {
  type: "bertahap", label: "Diagram Bertahap", title: "ERD Basis Data Perpustakaan (Gambar 3 Modul)",
  desc: "Dua entitas, satu relasi. Klik satu langkah untuk menyorot bagiannya.",
  alt: "ERD notasi Chen: entitas Buku (id_buku, judul, pengarang, tahun) dan Anggota (id_anggota, nama, prodi) dihubungkan relasi dipinjam dengan kardinalitas N:M. Relasi punya atribut tgl_pinjam dan tgl_kembali (elips putus-putus).",
  svg: erdChen(), maxw: 340,
  steps: [
    { t: "Entitas", html: "<code>Buku</code> dan <code>Anggota</code>: kata benda tunggal, digambar persegi panjang. Nanti masing-masing menjadi tabel." },
    { t: "Atribut", html: "Elips berisi keterangan yang melekat pada entitas: judul, pengarang, tahun; nama, prodi." },
    { t: "Atribut kunci", html: "<code>id_buku</code> dan <code>id_anggota</code> bergaris bawah: berbeda tiap baris, tidak berubah, pendek. Judul dan nama tidak dipilih karena bisa sama." },
    { t: "Relasi dan kardinalitas", html: "Belah ketupat <em>dipinjam</em> (kata kerja). Satu buku dipinjam banyak anggota di waktu berbeda (N), satu anggota meminjam banyak buku (M). ➕ Di P4 relasi ini menjadi tabel <code>peminjaman</code>." },
    { t: "Atribut relasi", html: "<code>tgl_pinjam</code> dan <code>tgl_kembali</code> milik peristiwa peminjaman, bukan milik buku atau anggota. Modul menggambarnya dengan elips putus-putus. ⚠️ Di buku standar, elips putus-putus berarti atribut <em>turunan</em>; atribut relasi cukup elips biasa." }
  ]
};

const bdTigaTabel = {
  type: "bertahap", label: "Diagram Bertahap", title: "ERD Perpustakaan → 3 Tabel",
  desc: "Hasil aturan 1 dan 4. PK = garis bawah penuh, FK = garis bawah titik-titik. Klik satu langkah untuk menyorot bagiannya.",
  alt: "Tiga tabel: buku (id_buku PK, judul, pengarang, tahun, stok), peminjaman (id_pinjam PK, id_buku FK, id_anggota FK, tgl_pinjam, tgl_kembali), anggota (id_anggota PK, nama, prodi, tgl_daftar). Buku 1:N peminjaman, anggota 1:N peminjaman.",
  svg: erdTigaTabelSvg,
  steps: [
    { t: "Aturan 1: entitas → tabel", html: "Entitas Buku dan Anggota menjadi tabel <code>buku</code> dan <code>anggota</code>; atributnya menjadi kolom. Kolom <code>stok</code> dan <code>tgl_daftar</code> ditambahkan saat ditinjau." },
    { t: "Kunci primer", html: "Atribut kunci menjadi kunci primer: <code>id_buku</code>, <code>id_anggota</code>, dan <code>id_pinjam</code> milik tabel baru." },
    { t: "Kunci tamu", html: "<code>id_buku</code> dan <code>id_anggota</code> di peminjaman merujuk ke kunci primer tabel asalnya. Nilai yang tidak ada di tabel rujukan, misalnya BK999, ditolak dengan ERROR 1452." },
    { t: "Kardinalitas", html: "Dua garis = tepat satu, kaki gagak = banyak. Satu buku bisa muncul di banyak baris peminjaman, satu baris peminjaman menunjuk satu buku. Kunci tamu selalu berada di sisi banyak." },
    { t: "Aturan 4: M:N → tabel penghubung", html: "Relasi <em>dipinjam</em> menjadi tabel <code>peminjaman</code>: kunci primer sendiri, kedua kunci tamu, dan atribut relasi. <code>tgl_kembali</code> boleh NULL selama buku belum kembali." }
  ]
};

// Data contoh = isi tabel perpustakaan di modul (sama dengan SQL Lab P4)
const PJ = [["PJ0001", "BK002", "AG001", "2026-10-08"], ["PJ0002", "BK001", "AG002", "NULL"], ["PJ0003", "BK002", "AG003", "NULL"]];
const NAMA = { AG001: "Ahmad Fauzi", AG002: "Nur Aisyah", AG003: "Rangga Pratama" };
const JUDUL = { BK001: "Dasar Pemrograman Komputer", BK002: "Sistem Basis Data" };
const hasilAkhir = [["Rangga Pratama", "Sistem Basis Data"], ["Nur Aisyah", "Dasar Pemrograman Komputer"]];
const bdJoinJelas = {
  type: "kode-jelas", label: "Kode Berpenjelas", title: "JOIN Tiga Tabel, Dibaca Baris per Baris",
  desc: "Angka kuning = urutan MySQL mengerjakan klausa. Urutan tulis dan urutan kerja berbeda.",
  file: "belum-kembali.sql", lang: "sql",
  kode: [
    "SELECT a.nama, b.judul",
    "FROM peminjaman p",
    "JOIN anggota a ON p.id_anggota = a.id_anggota",
    "JOIN buku b    ON p.id_buku = b.id_buku",
    "WHERE p.tgl_kembali IS NULL",
    "ORDER BY a.nama DESC;"
  ],
  urut: [5, 1, 2, 3, 4, 6], urutan: ["FROM", "JOIN", "JOIN", "WHERE", "SELECT", "ORDER BY"],
  inti: { judul: "Siapa yang belum mengembalikan buku, urut nama Z ke A", html: "Ditulis mulai SELECT, tetapi MySQL mengerjakannya mulai FROM. Hasil akhir:",
    efek: { tabel: { kolom: ["nama", "judul"], baris: hasilAkhir } } },
  catatan: [
    { at: [0], judul: "Pilih kolom yang ditampilkan", arti: "Dari tabel gabungan, hanya <code>nama</code> (milik a) dan <code>judul</code> (milik b) yang dibawa ke hasil. Ditulis paling atas, tetapi dikerjakan setelah WHERE.",
      efek: { tabel: { kolom: ["nama", "judul"], baris: hasilAkhir.slice().reverse(), baru: ["nama", "judul"] }, note: "Tinggal 2 kolom, 2 baris." },
      keliru: "Memakai alias kolom buatan SELECT (<code>AS</code>) di WHERE. WHERE dikerjakan lebih dulu, jadi alias itu belum ada." },
    { at: [1], judul: "Tabel awal", arti: "Mulai dari tabel <code>peminjaman</code>. Huruf <code>p</code> adalah alias, jadi <code>p.id_buku</code> berarti kolom id_buku milik peminjaman.",
      efek: { tabel: { kolom: ["id_pinjam", "id_buku", "id_anggota", "tgl_kembali"], baris: PJ }, note: "3 baris peminjaman." },
      keliru: "Setelah memberi alias, tetap menulis <code>peminjaman.id_buku</code> di baris lain. MySQL menolaknya karena nama tabel sudah diganti alias." },
    { at: [2], judul: "Tempelkan data anggota", arti: "Setiap baris peminjaman dipasangkan dengan anggota yang <code>id_anggota</code>-nya sama. <code>JOIN</code> saja sama dengan <code>INNER JOIN</code>.",
      efek: { tabel: { kolom: ["id_pinjam", "id_buku", "tgl_kembali", "nama"], baris: PJ.map(r => [r[0], r[1], r[3], NAMA[r[2]]]), baru: ["nama"] }, note: "Kolom nama bertambah, baris tetap 3. AG004 (Dimas) tidak muncul karena belum pernah meminjam." },
      keliru: "Lupa <code>ON</code>. Tiap baris dipasangkan dengan semua anggota: 3 × 4 = 12 baris." },
    { at: [3], judul: "Tempelkan data buku", arti: "Dengan cara yang sama, judul diambil dari tabel <code>buku</code> berdasarkan <code>id_buku</code>.",
      efek: { tabel: { kolom: ["id_pinjam", "nama", "judul", "tgl_kembali"], baris: PJ.map(r => [r[0], NAMA[r[2]], JUDUL[r[1]], r[3]]), baru: ["judul"] } },
      keliru: "Memasangkan kolom yang tidak berhubungan, misalnya <code>p.id_anggota = b.id_buku</code>. Tidak ada nilai yang cocok, hasilnya kosong." },
    { at: [4], judul: "Saring baris", arti: "Hanya peminjaman yang <code>tgl_kembali</code>-nya masih NULL (buku belum dikembalikan) yang dipertahankan.",
      efek: { tabel: { kolom: ["id_pinjam", "nama", "judul", "tgl_kembali"], baris: PJ.map(r => [r[0], NAMA[r[2]], JUDUL[r[1]], r[3]]), hapus: [0] }, note: "PJ0001 sudah kembali, jadi dibuang. 3 baris menjadi 2." },
      keliru: "Menulis <code>= NULL</code>. Perbandingan dengan NULL tidak pernah benar, hasilnya selalu kosong. Pakai <code>IS NULL</code> (P2)." },
    { at: [5], judul: "Urutkan hasil", arti: "<code>DESC</code> mengurutkan dari Z ke A. Tanpa DESC dipakai <code>ASC</code> (bawaan), A ke Z.",
      efek: { tabel: { kolom: ["nama", "judul"], baris: hasilAkhir }, note: "Rangga sebelum Nur." },
      keliru: "Mengira hasil tanpa ORDER BY pasti urut. Urutannya tidak dijamin." }
  ]
};

const pwdFormJelas = {
  type: "kode-jelas", label: "Kode Berpenjelas", title: "Ambil, Bersihkan, Validasi: Dibaca Baris per Baris",
  desc: "Gabungan langkah 2a–2c. Contoh kiriman form: nama <code>&lt;b&gt;Ahmad&lt;/b&gt;</code>, email <code>ahmad@kampus</code>.",
  file: "proses.php", lang: "php",
  kode: [
    "<?php",
    "if ($_SERVER[\"REQUEST_METHOD\"] == \"POST\") {",
    "    $nama  = isset($_POST[\"nama\"]) ? $_POST[\"nama\"] : \"\";",
    "    $nama  = htmlspecialchars($nama, ENT_QUOTES, \"UTF-8\");",
    "    $email = $_POST[\"email\"] ?? \"\";",
    "    if (empty($nama)) {",
    "        echo \"Nama wajib diisi!\";",
    "    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {",
    "        echo \"Format email tidak valid!\";",
    "    } else {",
    "        echo \"<p>Terima kasih, $nama</p>\";",
    "    }",
    "}",
    "?>"
  ],
  inti: { judul: "Ambil → bersihkan → validasi, dengan isian yang salah",
    html: "<ol><li>Baris 2: hanya berjalan saat form dikirim (POST).</li><li>Baris 3–5: ambil isian, bersihkan nama.</li><li>Baris 6–11: cek wajib isi, lalu format email.</li></ol>",
    efek: { html: "Hasil di browser untuk contoh ini: <strong>Format email tidak valid!</strong>" } },
  catatan: [
    { at: [1], judul: "Hanya saat form dikirim", arti: "Blok ini berjalan kalau halaman diminta dengan POST, yaitu saat tombol kirim ditekan. Saat halaman baru dibuka (GET), validasi dilewati sehingga pesan error tidak muncul sebelum form diisi.",
      efek: { vars: [["REQUEST_METHOD", "\"POST\"", "baru"], ["hasil", "true, masuk ke blok"]] },
      keliru: "Menulis satu tanda <code>=</code>. Itu mengisi nilai, bukan membandingkan, sehingga syaratnya selalu benar." },
    { at: [2], judul: "Ambil dengan isset", arti: "Kalau kolom <code>nama</code> ikut terkirim, isinya diambil; kalau tidak, dipakai string kosong.",
      efek: { vars: [["$nama", "\"<b>Ahmad</b>\"", "baru"], ["$email", "belum ada", "belum"]] },
      keliru: "Langsung menulis <code>$_POST[\"nama\"]</code>. Kalau kolom itu tidak terkirim, muncul <em>Warning: Undefined array key \"nama\"</em>." },
    { at: [3], judul: "Bersihkan", arti: "Karakter khusus HTML diubah menjadi entitas, jadi tag yang diketik pengguna tampil sebagai tulisan, tidak dijalankan.",
      efek: { vars: [["$nama", "\"&lt;b&gt;Ahmad&lt;/b&gt;\"", "baru"]], note: "Di browser tampil sebagai tulisan &lt;b&gt;Ahmad&lt;/b&gt;, bukan huruf tebal." },
      keliru: "Mengira htmlspecialchars melindungi query database. Untuk query dipakai prepared statement (P13)." },
    { at: [4], judul: "Ambil email (bentuk singkat)", arti: "<code>??</code> adalah singkatan pola isset di baris 3: ambil kalau ada, kalau tidak pakai <code>\"\"</code>.",
      efek: { vars: [["$nama", "\"&lt;b&gt;Ahmad&lt;/b&gt;\""], ["$email", "\"ahmad@kampus\"", "baru"]] } },
    { at: [5, 6], judul: "Cek wajib isi", arti: "<code>empty</code> bernilai true kalau isinya kosong: <code>\"\"</code>, <code>null</code>, <code>0</code>, <code>\"0\"</code>, atau <code>false</code>.",
      efek: { vars: [["empty($nama)", "false, nama terisi", "baru"], ["lanjut ke", "elseif di baris 8"]] },
      keliru: "Memakai isset untuk field wajib. Kolom yang dikirim kosong tetap ada (isset true), jadi yang tepat empty." },
    { at: [7, 8], judul: "Cek format email", arti: "<code>filter_var</code> mengembalikan email itu kalau formatnya benar, atau <code>false</code> kalau salah. Tanda <code>!</code> membalik hasilnya.",
      efek: { vars: [["filter_var(...)", "false, tidak ada domain lengkap"], ["!false", "true", "baru"], ["browser", "Format email tidak valid!", "baru"]] },
      keliru: "Lupa tanda <code>!</code>. Pesan error justru muncul untuk email yang benar." },
    { at: [9, 10], judul: "Semua lolos", arti: "Bagian else hanya berjalan kalau kedua pemeriksaan lolos. <code>$nama</code> yang dicetak sudah dibersihkan di baris 4.",
      efek: { html: "Untuk contoh ini bagian else <strong>tidak</strong> berjalan. Dengan email <code>ahmad@kampus.ac.id</code>, browser menampilkan: Terima kasih, &lt;b&gt;Ahmad&lt;/b&gt;" } }
  ]
};

const pwdAlurTambah = {
  type: "bertahap", label: "Diagram Bertahap", title: "Satu Kali Tambah Data, dari Form sampai Tabel",
  desc: "Diagram menyala sendiri sekali saat digulir ke layar, lalu kembali utuh. Klik langkah untuk menyorot satu bagian.",
  alt: "Browser mengirim POST berisi nim, nama, jurusan, email ke crud-mahasiswa.php. PHP membaca $_POST lalu mengirim INSERT ke MySQL. MySQL menyimpan 1 baris dan membalas berhasil. PHP membalas browser dengan redirect, lalu browser membuka daftar dengan GET.",
  svg: alurTambah(), auto: true,
  steps: [
    { t: "Request POST", html: "Tombol Tambah (<code>name=\"create\"</code>) mengirim isi form ke <code>crud-mahasiswa.php</code>. Data ada di badan request, tidak tampil di URL." },
    { t: "PHP membaca", html: "Server menjalankan PHP. <code>isset($_POST[\"create\"])</code> bernilai true, dan isi form tersedia di <code>$_POST[\"nim\"]</code> dan seterusnya." },
    { t: "Query", html: "PHP mengirim <code>INSERT</code> ke MySQL lewat <code>$conn</code> dari config.php." },
    { t: "Tersimpan", html: "MySQL menambah satu baris (id dari AUTO_INCREMENT) lalu memberi tahu PHP bahwa query berhasil." },
    { t: "Response", html: "PHP membalas dengan <code>header(\"Location: crud-mahasiswa.php\")</code>. Browser membuka ulang halaman itu dengan GET dan menampilkan daftar terbaru. Kode PHP-nya tidak pernah sampai ke browser." }
  ]
};

const FORM = { nim: "2401010004", nama: "Dewi", jurusan: "MI", email: "dewi@kampus.ac.id" };
const pwdInsertJelas = {
  type: "kode-jelas", label: "Kode Berpenjelas", title: "Bagian Tambah, Dibaca Baris per Baris",
  desc: `Bagian Create dari versi rapi di bawah. Contoh kiriman form: nim <code>${FORM.nim}</code>, nama <code>${FORM.nama}</code>, jurusan <code>${FORM.jurusan}</code>, email <code>${FORM.email}</code>.`,
  file: "crud-mahasiswa.php", lang: "php",
  kode: [
    "<?php",
    "include 'config.php';",
    "if (isset($_POST[\"create\"])) {",
    "    $nim     = $_POST[\"nim\"];",
    "    $nama    = $_POST[\"nama\"];",
    "    $jurusan = $_POST[\"jurusan\"];",
    "    $email   = $_POST[\"email\"];",
    "    $stmt = mysqli_prepare($conn,\n        \"INSERT INTO mahasiswa (nim, nama, jurusan, email)\n         VALUES (?, ?, ?, ?)\");",
    "    mysqli_stmt_bind_param($stmt, \"ssss\",\n        $nim, $nama, $jurusan, $email);",
    "    if (mysqli_stmt_execute($stmt)) {",
    "        header(\"Location: crud-mahasiswa.php\");",
    "        exit;",
    "    }",
    "}",
    "?>"
  ],
  inti: { judul: "Tombol Tambah ditekan → data form masuk tabel → kembali ke daftar",
    html: "<ol><li>Baris 2: ambil koneksi <code>$conn</code> dari config.php.</li><li>Baris 3–7: kalau tombol <code>create</code> terkirim, salin isi form ke variabel.</li><li>Baris 8–10: siapkan INSERT bertanda <code>?</code>, isi, jalankan.</li><li>Baris 11–12: berhasil → arahkan ulang ke daftar, berhenti.</li></ol>" },
  catatan: [
    { at: [0], judul: "Mulai kode PHP", arti: "Teks setelah <code>&lt;?php</code> dijalankan server sebagai PHP sampai bertemu <code>?&gt;</code>. Browser tidak pernah melihat bagian ini.", efek: { html: "Belum ada variabel." } },
    { at: [1], judul: "Ambil koneksi database", arti: "Isi <code>config.php</code> seolah disalin ke sini, sehingga <code>$conn</code> langsung bisa dipakai.",
      efek: { vars: [["$conn", "koneksi ke db_mahasiswa", "baru"]] },
      keliru: "Menaruh <code>include</code> di bawah kode yang memakai <code>$conn</code> → <em>Undefined variable $conn</em>." },
    { at: [2], judul: "Cek tombol Tambah", arti: "<code>isset</code> bernilai true kalau <code>$_POST[\"create\"]</code> ada, artinya tombol dengan <code>name=\"create\"</code> yang ditekan. Saat halaman dibuka biasa (GET), blok ini dilewati.",
      efek: { vars: [["$conn", "koneksi ke db_mahasiswa"], ["isset(...)", "true, tombol create ikut terkirim", "baru"]] },
      keliru: "Lupa <code>name=\"create\"</code> pada tombol. isset selalu false dan tidak ada yang tersimpan." },
    { at: [3, 4, 5, 6], judul: "Salin isi form ke variabel", arti: "Kunci <code>$_POST</code> sama dengan atribut <code>name</code> tiap input. Empat baris ini satu langkah.",
      efek: { vars: [["$nim", `"${FORM.nim}"`, "baru"], ["$nama", `"${FORM.nama}"`, "baru"], ["$jurusan", `"${FORM.jurusan}"`, "baru"], ["$email", `"${FORM.email}"`, "baru"]] },
      keliru: "Kunci tidak sama persis dengan name, misalnya <code>$_POST[\"Nama\"]</code> untuk <code>name=\"nama\"</code> → <em>Undefined array key</em>." },
    { at: [7], judul: "Siapkan query", arti: "<code>mysqli_prepare</code> mengirim bentuk query ke MySQL. Tanda <code>?</code> adalah tempat nilai yang diisi belakangan.",
      efek: { vars: [["$stmt", "INSERT … VALUES (?, ?, ?, ?), belum dijalankan", "baru"]] },
      keliru: "Menempelkan <code>$nama</code> langsung ke string SQL. Nama seperti <code>Jum'at</code> merusak query dan membuka celah SQL injection." },
    { at: [8], judul: "Isi tanda tanya", arti: "<code>\"ssss\"</code> = empat nilai bertipe string, berurutan untuk keempat <code>?</code>. Huruf <code>i</code> dipakai untuk integer.",
      efek: { vars: [["$stmt", `? diisi: '${FORM.nim}', '${FORM.nama}', '${FORM.jurusan}', '${FORM.email}'`, "baru"], ["tabel", "belum berubah", "belum"]] },
      keliru: "Jumlah huruf tipe tidak sama dengan jumlah <code>?</code> atau jumlah variabel → error." },
    { at: [9], judul: "Jalankan", arti: "<code>mysqli_stmt_execute</code> benar-benar menjalankan INSERT dan bernilai true kalau berhasil.",
      efek: { vars: [["hasil", "true", "baru"], ["tabel mahasiswa", "bertambah 1 baris", "baru"]] } },
    { at: [10, 11], judul: "Arahkan ulang lalu berhenti", arti: "<code>header(\"Location: …\")</code> menyuruh browser membuka halaman daftar dengan GET. <code>exit</code> menghentikan sisa kode.",
      efek: { vars: [["browser", "membuka crud-mahasiswa.php (GET)", "baru"], ["sisa kode", "tidak dijalankan", "baru"]] },
      keliru: "Tanpa redirect, menekan refresh mengirim POST ulang dan data tersimpan dua kali." }
  ]
};

module.exports = { bdErdChen, bdTigaTabel, bdJoinJelas, pwdFormJelas, pwdAlurTambah, pwdInsertJelas };
