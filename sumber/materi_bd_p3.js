// Materi Lengkap Basis Data P3: Perancangan dengan ERD
const { C, box, arrow, path, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a, ok, o]) => ({ cells: [c], fields: [{ options: o || opts, answer: a }], ok: ok || "✓" })) });
const oval = (cx, cy, rx, ry, t, tone, part, o = {}) => { const [f, s, c] = C[tone]; const e = (dx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx + dx}" ry="${ry + dx}" fill="${dx ? "none" : f}" stroke="${s}" stroke-width="2"${o.dash ? ' stroke-dasharray="6 4"' : ""}/>`;
  return `<g${part ? ` data-part="${part}"` : ""}>${o.double ? e(5) : ""}${e(0)}${text(cx, cy, t, { size: o.size || 12, color: c })}${o.under ? `<line x1="${cx - rx * 0.6}" y1="${cy + 9}" x2="${cx + rx * 0.6}" y2="${cy + 9}" stroke="${c}" stroke-width="1.5"${o.udash ? ' stroke-dasharray="4 3"' : ""}/>` : ""}</g>`; };
const diamond = (cx, cy, w, h, t, tone, part, o = {}) => { const [f, s, c] = C[tone]; const pts = d => `${cx},${cy - h / 2 + d} ${cx + w / 2 - d},${cy} ${cx},${cy + h / 2 - d} ${cx - w / 2 + d},${cy}`;
  return `<g${part ? ` data-part="${part}"` : ""}><polygon points="${pts(0)}" fill="${f}" stroke="${s}" stroke-width="2"/>${o.double ? `<polygon points="${pts(7)}" fill="none" stroke="${s}" stroke-width="2"/>` : ""}${text(cx, cy, t, { size: o.size || 13, color: c })}</g>`; };
const ent = (x, y, w, h, t, tone, part, o = {}) => box(x, y, w, h, t, tone, part, Object.assign({ r: 0, size: 14 }, o)) + (o.double ? `<rect x="${x + 5}" y="${y + 5}" width="${w - 10}" height="${h - 10}" fill="none" stroke="${C[tone][1]}" stroke-width="2"/>` : "");
const ln = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#64748b" stroke-width="2"/>`;
const lab = (x, y, t, col) => text(x, y, t, { size: 15, color: col || "#be123c" });

const erdPerpus = diagram({
  label: "Diagram Interaktif", title: "ERD Basis Data Perpustakaan (Gambar 3 Modul)", desc: "Dua entitas, satu relasi. Klik setiap bagian.", minw: 640,
  svg: svg(800, 330,
    ln(150, 165, 330, 165) + ln(470, 165, 650, 165) +
    [[60, 60, "id_buku", 1], [150, 40, "judul", 0], [240, 60, "pengarang", 0], [100, 270, "tahun", 0]].map(([x, y, t, k]) => ln(110, 165, x, y)).join("") +
    [[560, 60, "id_anggota", 1], [660, 40, "nama", 0], [745, 80, "prodi", 0]].map(([x, y]) => ln(690, 165, x, y)).join("") +
    ln(400, 165, 330, 270) + ln(400, 165, 470, 270) +
    ent(40, 140, 140, 50, "Buku", "sky", "buku") + ent(620, 140, 140, 50, "Anggota", "sky", "agt") +
    diamond(400, 165, 150, 80, "dipinjam", "amber", "rel") +
    oval(60, 60, 52, 22, "id_buku", "rose", "key", { under: true }) + oval(150, 40, 42, 20, "judul", "emerald", "atr") + oval(240, 60, 52, 22, "pengarang", "emerald", "atr") + oval(100, 270, 42, 20, "tahun", "emerald", "atr") +
    oval(560, 60, 58, 22, "id_anggota", "rose", "key", { under: true }) + oval(660, 40, 40, 20, "nama", "emerald", "atr") + oval(745, 80, 40, 20, "prodi", "emerald", "atr") +
    oval(330, 270, 58, 22, "tgl_pinjam", "violet", "relatr", { dash: true }) + oval(470, 270, 62, 22, "tgl_kembali", "violet", "relatr", { dash: true }) +
    lab(255, 150, "N") + lab(545, 150, "M")
  ),
  parts: [
    { id: "buku", label: "Buku", title: "Entitas Buku", text: "Kata benda tunggal. Nanti menjadi tabel <code>buku</code>." },
    { id: "agt", label: "Anggota", title: "Entitas Anggota", text: "Nanti menjadi tabel <code>anggota</code>." },
    { id: "key", label: "Atribut kunci", title: "id_buku & id_anggota", text: "Bergaris bawah: berbeda tiap baris, tidak berubah, pendek. Judul dan nama tidak dipilih karena bisa sama." },
    { id: "atr", label: "Atribut", title: "Atribut biasa", text: "Keterangan yang melekat pada entitas: judul, pengarang, tahun; nama, prodi." },
    { id: "rel", label: "Relasi", title: "Relasi dipinjam (N : M)", text: "Satu buku dipinjam banyak anggota (di waktu berbeda) → N; satu anggota meminjam banyak buku → M. ➕ Di Bab 4 relasi ini menjadi tabel <code>peminjaman</code> yang berisi id_buku, id_anggota, tgl_pinjam, tgl_kembali." },
    { id: "relatr", label: "Atribut relasi", title: "tgl_pinjam & tgl_kembali", text: "Milik peristiwa peminjaman, bukan milik buku atau anggota. Modul menggambarnya dengan elips putus-putus. ⚠️ Di slide gabungan/buku standar, elips putus-putus berarti atribut <em>turunan</em>; atribut relasi cukup elips biasa yang menempel pada belah ketupat." }
  ]
});

const mapping = diagram({
  label: "Diagram Interaktif", title: "Pemetaan Kardinalitas (Himpunan A ke B)", desc: "Setiap titik adalah satu baris. Klik setiap jenis.", minw: 640,
  svg: svg(800, 230, (() => {
    const panel = (x0, id, title, pairs, na, nb, tone) => {
      const ya = i => 60 + i * 38, yb = i => 60 + i * 38;
      let s = `<g data-part="${id}"><rect x="${x0}" y="10" width="185" height="210" rx="12" fill="${C[tone][0]}" stroke="${C[tone][1]}" stroke-width="2"/>`;
      s += text(x0 + 92, 32, title, { size: 15, color: C[tone][2] });
      s += pairs.map(([a, b]) => `<line x1="${x0 + 45}" y1="${ya(a)}" x2="${x0 + 140}" y2="${yb(b)}" stroke="#475569" stroke-width="2"/>`).join("");
      for (let i = 0; i < na; i++) s += `<circle cx="${x0 + 40}" cy="${ya(i)}" r="7" fill="#fff" stroke="#334155" stroke-width="2"/>`;
      for (let i = 0; i < nb; i++) s += `<circle cx="${x0 + 145}" cy="${yb(i)}" r="7" fill="#fff" stroke="#334155" stroke-width="2"/>`;
      return s + text(x0 + 40, 210, "A", { size: 12 }) + text(x0 + 145, 210, "B", { size: 12 }) + "</g>";
    };
    return panel(10, "oo", "1 : 1", [[0, 0], [1, 1], [2, 2]], 4, 4, "emerald") + panel(205, "om", "1 : N", [[0, 0], [0, 1], [1, 2], [2, 3]], 3, 4, "sky") +
      panel(400, "mo", "N : 1", [[0, 0], [1, 0], [2, 1], [3, 2]], 4, 3, "amber") + panel(595, "mm", "M : N", [[0, 0], [0, 2], [1, 1], [2, 0], [2, 3], [3, 2]], 4, 4, "rose");
  })()),
  parts: [
    { id: "oo", label: "1 : 1", title: "One to one", text: "Satu baris A berhubungan dengan paling banyak satu baris B, dan sebaliknya. Contoh: mahasiswa – KTM." },
    { id: "om", label: "1 : N", title: "One to many", text: "Satu baris A boleh berhubungan dengan banyak baris B, tetapi satu baris B hanya ke satu A. Contoh: petugas – anggota yang dilayani." },
    { id: "mo", label: "N : 1", title: "Many to one", text: "Kebalikan 1:N. Contoh: banyak buku – satu penerbit." },
    { id: "mm", label: "M : N", title: "Many to many", text: "Keduanya boleh banyak. Contoh: buku – anggota pada relasi dipinjam. Perlu tabel penghubung di Bab 4." }
  ]
});

const derajat = diagram({
  label: "Diagram Interaktif • Slide Gabungan", title: "Derajat Relasi: Unary, Binary, Ternary", desc: "Klik setiap contoh.", minw: 660,
  svg: svg(820, 260,
    `<g data-part="un">${ent(20, 150, 150, 50, "Pegawai", "violet", "")}<path d="M60,150 C40,60 130,40 150,80" fill="none" stroke="#64748b" stroke-width="2"/><path d="M150,110 L140,150" stroke="#64748b" stroke-width="2"/>${diamond(150, 90, 100, 50, "melapor", "violet", "")}${text(95, 235, "Unary", { size: 14, color: C.violet[2] })}</g>` +
    `<g data-part="bi">${ent(210, 150, 110, 50, "Pegawai", "emerald", "")}${ln(320, 175, 355, 175)}${diamond(395, 175, 80, 60, "kerja", "emerald", "")}${ln(435, 175, 470, 175)}${ent(470, 150, 120, 50, "Departemen", "emerald", "", { size: 12 })}${text(400, 235, "Binary", { size: 14, color: C.emerald[2] })}</g>` +
    `<g data-part="tri">${diamond(710, 110, 90, 60, "kerja", "amber", "")}${ent(625, 10, 100, 45, "Pegawai", "amber", "", { size: 12 })}${ent(625, 175, 90, 45, "Proyek", "amber", "", { size: 12 })}${ent(730, 175, 80, 45, "Kota", "amber", "", { size: 12 })}${ln(690, 55, 705, 80)}${ln(695, 135, 675, 175)}${ln(725, 135, 765, 175)}${text(720, 245, "Ternary", { size: 14, color: C.amber[2] })}</g>`
  ),
  parts: [
    { id: "un", label: "Unary", title: "Unary (derajat 1)", text: "Satu himpunan entitas berelasi dengan dirinya sendiri: pegawai melapor kepada pegawai lain. ➕ Label peran (role) seperti <em>manager</em> dan <em>worker</em> ditulis di garis untuk memperjelas." },
    { id: "bi", label: "Binary", title: "Binary (derajat 2)", text: "Dua himpunan entitas. Paling umum dipakai; semua contoh di modul P3 adalah binary." },
    { id: "tri", label: "Ternary", title: "Ternary (derajat 3)", text: "Tiga himpunan entitas berelasi bersamaan: pegawai bekerja pada proyek di kota tertentu. Jarang dalam praktik." }
  ]
});

const lemah = diagram({
  label: "Diagram Interaktif • Slide Gabungan", title: "Entitas Kuat dan Entitas Lemah", desc: "Contoh pinjaman bank dan cicilannya. Klik setiap bagian.", minw: 620,
  svg: svg(800, 230,
    ln(170, 120, 300, 120) + ln(460, 120, 600, 120) + ln(90, 120, 90, 50) + ln(690, 120, 640, 50) +
    ent(20, 95, 150, 50, "Loan", "sky", "kuat") + diamond(380, 120, 160, 80, "loan-payment", "amber", "idrel", { double: true, size: 12 }) +
    ent(600, 95, 180, 50, "Payment", "rose", "lemah", { double: true }) +
    oval(90, 40, 70, 22, "loan-number", "sky", "pk", { under: true }) + oval(640, 40, 78, 22, "payment-number", "rose", "disk", { under: true, udash: true, size: 11 }) + oval(760, 190, 36, 20, "amount", "emerald", "") +
    ln(760, 145, 760, 170) + text(230, 108, "1", { size: 15, color: "#be123c" }) + text(530, 108, "N", { size: 15, color: "#be123c" })
  ),
  parts: [
    { id: "kuat", label: "Entitas kuat", title: "Entitas kuat (Loan)", text: "Keberadaannya tidak bergantung pada entitas lain dan punya primary key sendiri (loan-number)." },
    { id: "lemah", label: "Entitas lemah", title: "Entitas lemah (Payment)", text: "Persegi panjang ganda. Cicilan ke-1, ke-2 … tidak bermakna tanpa pinjamannya." },
    { id: "idrel", label: "Relasi pengidentifikasi", title: "Belah ketupat ganda", text: "Relasi yang menghubungkan entitas lemah dengan entitas kuat pemiliknya." },
    { id: "disk", label: "Diskriminator", title: "Diskriminator (key parsial)", text: "payment-number digaris bawah putus-putus. Primary key Payment = (loan-number, payment-number)." },
    { id: "pk", label: "PK entitas kuat", title: "loan-number", text: "Primary key entitas kuat, ikut membentuk PK entitas lemah." }
  ]
});

const isa = diagram({
  label: "Diagram Interaktif • Slide Gabungan", title: "Spesialisasi dan Generalisasi (ISA)", desc: "Klik setiap tingkat.", minw: 560,
  svg: svg(760, 290,
    ent(300, 10, 160, 50, "Person", "indigo", "top") + ln(380, 60, 380, 95) +
    `<g data-part="isa"><polygon points="380,95 430,150 330,150" fill="${C.amber[0]}" stroke="${C.amber[1]}" stroke-width="2"/>${text(380, 130, "ISA", { size: 13, color: C.amber[2] })}</g>` +
    ln(350, 150, 200, 190) + ln(410, 150, 560, 190) +
    ent(120, 190, 160, 50, "Employee", "sky", "low") + ent(480, 190, 160, 50, "Customer", "sky", "low") +
    `<g data-part="dir">${arrow(720, 230, 720, 30)}${text(700, 260, "generalisasi ↑", { size: 12, color: "#475569", anchor: "end" })}${arrow(40, 30, 40, 230)}${text(60, 20, "↓ spesialisasi", { size: 12, color: "#475569", anchor: "start" })}</g>`
  ),
  parts: [
    { id: "top", label: "Level atas", title: "Himpunan entitas level atas", text: "Person: atribut umum seperti nama, alamat." },
    { id: "isa", label: "ISA", title: "Segitiga ISA", text: "Dibaca “is a”: customer <em>is a</em> person. Semua atribut dan relasi level atas diwariskan (inheritance) ke bawah." },
    { id: "low", label: "Level bawah", title: "Himpunan entitas level bawah", text: "Punya atribut tambahan sendiri: Employee punya gaji, Customer punya nomor pelanggan. Bisa dipecah lagi (officer, teller, secretary)." },
    { id: "dir", label: "Arah", title: "Spesialisasi vs generalisasi", text: "Spesialisasi = top-down (membagi). Generalisasi = bottom-up (menggabungkan entitas yang mirip menjadi satu induk)." }
  ]
});

const chenMartin = diagram({
  label: "Diagram Interaktif • Slide Gabungan", title: "Relasi yang Sama dalam Dua Notasi", desc: "Petugas melayani banyak Anggota (1 : N). Klik setiap gaya.", minw: 620,
  svg: svg(800, 260,
    `<g data-part="chen">${text(400, 18, "Versi Chen", { size: 14, color: C.indigo[2] })}${ln(170, 70, 320, 70)}${ln(480, 70, 630, 70)}${ent(30, 45, 140, 50, "Petugas", "indigo", "")}${diamond(400, 70, 160, 60, "melayani", "indigo", "")}${ent(630, 45, 140, 50, "Anggota", "indigo", "")}${text(245, 58, "1", { size: 15, color: "#be123c" })}${text(555, 58, "N", { size: 15, color: "#be123c" })}</g>` +
    `<g data-part="martin">${text(400, 135, "Versi Martin (Crow’s Foot)", { size: 14, color: C.emerald[2] })}<rect x="30" y="150" width="170" height="100" fill="${C.emerald[0]}" stroke="${C.emerald[1]}" stroke-width="2"/><line x1="30" y1="178" x2="200" y2="178" stroke="${C.emerald[1]}" stroke-width="2"/>${text(115, 164, "Petugas", { size: 13, color: C.emerald[2] })}${text(45, 198, "PK id_petugas", { size: 11, anchor: "start", weight: 600 })}${text(45, 220, "nama", { size: 11, anchor: "start", weight: 600 })}<rect x="600" y="150" width="170" height="100" fill="${C.emerald[0]}" stroke="${C.emerald[1]}" stroke-width="2"/><line x1="600" y1="178" x2="770" y2="178" stroke="${C.emerald[1]}" stroke-width="2"/>${text(685, 164, "Anggota", { size: 13, color: C.emerald[2] })}${text(615, 198, "PK id_anggota", { size: 11, anchor: "start", weight: 600 })}${text(615, 220, "FK id_petugas", { size: 11, anchor: "start", weight: 600 })}${ln(200, 200, 600, 200)}${ln(215, 190, 215, 210)}${ln(225, 190, 225, 210)}${ln(600, 200, 580, 188)}${ln(600, 200, 580, 212)}${ln(575, 190, 575, 210)}${text(400, 190, "melayani", { size: 12, color: "#475569", weight: 600 })}</g>`
  ),
  parts: [
    { id: "chen", label: "Chen", title: "Versi Chen", text: "Relasi = belah ketupat, kardinalitas ditulis sebagai 1, N, M di atas garis. Atribut digambar elips di luar kotak (tidak digambar di sini agar ringkas)." },
    { id: "martin", label: "Martin", title: "Versi Martin / Crow’s Foot", text: "Relasi = garis. Ujung bergaris dua (||) = tepat satu; ujung bercabang seperti kaki gagak = banyak. Atribut ditulis di dalam kotak. ➕ Notasi ini dipakai MySQL Workbench dan banyak aplikasi perancangan." }
  ]
});

const ruangBaca = diagram({
  label: "Diagram Interaktif • Pembahasan Mini-Case", title: "Contoh Jawaban ERD Pemesanan Ruang Baca", desc: "Bandingkan dengan gambarmu sendiri. Klik setiap bagian.", minw: 640,
  svg: svg(800, 310,
    ln(160, 160, 330, 160) + ln(470, 160, 640, 160) +
    [[50, 60], [150, 40], [240, 70]].map(([x, y]) => ln(100, 160, x, y)).join("") + [[580, 60], [700, 50]].map(([x, y]) => ln(700, 160, x, y)).join("") +
    ln(400, 160, 330, 260) + ln(400, 160, 470, 260) +
    ent(40, 135, 140, 50, "Ruang", "sky", "ent") + ent(640, 135, 140, 50, "Anggota", "sky", "ent") +
    diamond(400, 160, 150, 80, "memesan", "amber", "rel") +
    oval(50, 60, 50, 22, "no_ruang", "rose", "key", { under: true }) + oval(150, 40, 52, 20, "nama_ruang", "emerald", "atr", { size: 11 }) + oval(240, 70, 56, 22, "daya_tampung", "emerald", "atr", { size: 11 }) +
    oval(580, 60, 58, 22, "id_anggota", "rose", "key", { under: true }) + oval(700, 50, 40, 20, "nama", "emerald", "atr") +
    oval(330, 260, 50, 22, "tanggal", "violet", "ra", { dash: true }) + oval(470, 260, 40, 22, "jam", "violet", "ra", { dash: true }) +
    text(255, 146, "N", { size: 15, color: "#be123c" }) + text(545, 146, "M", { size: 15, color: "#be123c" })
  ),
  parts: [
    { id: "ent", label: "Entitas", title: "Langkah 1: kata benda", text: "Ruang (baca) dan Anggota." },
    { id: "atr", label: "Atribut", title: "Langkah 2: keterangan", text: "nama_ruang, daya_tampung milik Ruang; nama (dan prodi) milik Anggota." },
    { id: "rel", label: "Relasi", title: "Langkah 3 & 5: kata kerja + kardinalitas", text: "memesan. Satu ruang dipesan banyak anggota (hari berbeda), satu anggota boleh memesan berkali-kali → N : M." },
    { id: "key", label: "Kunci", title: "Langkah 4: atribut kunci", text: "no_ruang dan id_anggota: unik, pendek, tidak berubah." },
    { id: "ra", label: "Atribut relasi", title: "tanggal & jam milik relasi", text: "Bukan keterangan ruangnya, bukan keterangan orangnya, melainkan keterangan peristiwa pemesanan (digambar seperti modul)." }
  ]
});

// ---------- Tabel simbol ERD (Chen + Crow's Foot), simbol digambar SVG ----------
const SK = 'stroke="#17202a" stroke-width="2"';
const sym = (body) => `<svg viewBox="0 0 96 48" xmlns="http://www.w3.org/2000/svg" role="img">${body}</svg>`;
const st = (x, y, t, ex) => `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-size="11" font-weight="700" fill="#17202a"${ex || ""}>${t}</text>`;
const cfBar = x => `<line x1="${x}" y1="14" x2="${x}" y2="34" ${SK}/>`;
const cfO = x => `<circle cx="${x}" cy="24" r="6" fill="#fff" ${SK}/>`;
const cfFoot = `<line x1="72" y1="24" x2="90" y2="12" ${SK}/><line x1="72" y1="24" x2="90" y2="36" ${SK}/>`;
const cf = parts => sym(`<line x1="6" y1="24" x2="90" y2="24" ${SK}/>` + parts);
const simbolERD = {
  type: "symbols", label: "Tabel Simbol", title: "Simbol-simbol ERD", desc: "Semua simbol yang dipakai di modul dan slide, dalam satu tabel.",
  groups: [
    { label: "Notasi Chen (modul)", headers: ["Simbol", "Nama", "Artinya", "Contoh", "Nanti jadi"], tagLast: true, monoCol: true,
      note: "<strong>Perhatikan:</strong> modul P3 memakai elips putus-putus untuk atribut milik relasi (tgl_pinjam). Slide gabungan dan buku memakainya untuk atribut turunan. Ikuti modul saat mengerjakan tugas modul.",
      rows: [
        { svg: sym(`<rect x="8" y="10" width="80" height="28" fill="#fff" ${SK}/>` + st(48, 24, "Buku")), name: "Entitas", shape: "Persegi panjang", cells: ["Benda atau orang yang datanya disimpan. Ditulis kata benda tunggal.", "Buku, Anggota", "tabel"] },
        { svg: sym(`<rect x="6" y="8" width="84" height="32" fill="#fff" ${SK}/><rect x="11" y="13" width="74" height="22" fill="none" ${SK}/>` + st(48, 24, "Cicilan")), name: "Entitas lemah", shape: "Persegi panjang ganda", cells: ["Tidak bisa berdiri sendiri, bergantung pada entitas lain.", "Cicilan milik Pinjaman", "tabel dengan kunci gabungan"] },
        { svg: sym(`<ellipse cx="48" cy="24" rx="40" ry="15" fill="#fff" ${SK}/>` + st(48, 24, "judul")), name: "Atribut", shape: "Elips", cells: ["Keterangan milik entitas.", "judul, pengarang", "kolom"] },
        { svg: sym(`<ellipse cx="48" cy="24" rx="40" ry="15" fill="#fff" ${SK}/>` + st(48, 24, "id_buku", ' text-decoration="underline"')), name: "Atribut kunci", shape: "Elips, nama bergaris bawah", cells: ["Pembeda tiap baris. Satu per entitas.", "id_buku", "kunci primer"] },
        { svg: sym(`<ellipse cx="48" cy="24" rx="42" ry="17" fill="#fff" ${SK}/><ellipse cx="48" cy="24" rx="36" ry="12" fill="none" ${SK}/>` + st(48, 24, "no_hp")), name: "Atribut multi-value", shape: "Elips ganda", cells: ["Bisa berisi lebih dari satu nilai.", "no_hp", "tabel tersendiri"] },
        { svg: sym(`<ellipse cx="48" cy="24" rx="40" ry="15" fill="#fff" ${SK} stroke-dasharray="5 4"/>` + st(48, 24, "umur")), name: "Atribut turunan", shape: "Elips putus-putus", cells: ["Dihitung dari atribut lain, tidak perlu disimpan.", "umur dari tgl_lahir", "tidak disimpan"] },
        { svg: sym(`<line x1="48" y1="32" x2="20" y2="44" ${SK}/><line x1="48" y1="32" x2="76" y2="44" ${SK}/><ellipse cx="48" cy="18" rx="36" ry="13" fill="#fff" ${SK}/>` + st(48, 18, "alamat")), name: "Atribut komposit", shape: "Elips bercabang ke elips lain", cells: ["Bisa dipecah menjadi beberapa bagian.", "alamat → kota, provinsi", "beberapa kolom"] },
        { svg: sym(`<polygon points="48,6 88,24 48,42 8,24" fill="#fff" ${SK}/>` + st(48, 24, "pinjam")), name: "Relasi", shape: "Belah ketupat", cells: ["Hubungan antarentitas. Ditulis kata kerja.", "dipinjam, melayani", "kunci tamu / tabel penghubung"] },
        { svg: sym(`<polygon points="48,3 92,24 48,45 4,24" fill="#fff" ${SK}/><polygon points="48,10 78,24 48,38 18,24" fill="none" ${SK}/>` + st(48, 24, "punya")), name: "Relasi pengidentifikasi", shape: "Belah ketupat ganda", cells: ["Menghubungkan entitas lemah dengan pemiliknya.", "Pinjaman punya Cicilan", ""] },
        { svg: sym(`<line x1="6" y1="30" x2="90" y2="30" ${SK}/>` + st(16, 18, "1") + st(80, 18, "N")), name: "Garis + kardinalitas", shape: "Garis dengan 1, N, atau M", cells: ["Menghubungkan simbol. Angka di ujung garis menunjukkan berapa banyak yang boleh terhubung.", "1 : N, M : N", ""] }
      ] },
    { label: "Crow’s Foot / Martin (slide)", headers: ["Simbol", "Nama", "Artinya"],
      note: "Pada notasi ini relasi digambar sebagai garis saja (tanpa belah ketupat), dan simbol di ujung garis menggantikan tulisan 1, N, M.",
      rows: [
        { svg: cf(cfBar(74) + cfBar(82)), name: "Tepat satu", shape: "Dua garis tegak", cells: ["Harus ada, dan hanya satu."] },
        { svg: cf(cfO(68) + cfBar(82)), name: "Nol atau satu", shape: "Lingkaran + garis tegak", cells: ["Boleh tidak ada, paling banyak satu."] },
        { svg: cf(cfBar(66) + cfFoot), name: "Satu atau banyak", shape: "Garis tegak + kaki gagak", cells: ["Minimal satu, boleh banyak."] },
        { svg: cf(cfO(58) + cfFoot), name: "Nol atau banyak", shape: "Lingkaran + kaki gagak", cells: ["Boleh tidak ada, boleh banyak."] }
      ] }
  ]
};

module.exports = [
  A("Mengapa Perlu Dirancang Lebih Dulu", `<p>Bab 2 membahas satu tabel. Basis data sesungguhnya berisi <strong>banyak tabel yang saling berhubungan</strong>. Jika tabel dibuat langsung tanpa rencana, kesalahan baru ketahuan setelah data menumpuk, dan memperbaikinya mahal.</p>
<p><strong>ERD (Entity Relationship Diagram)</strong> adalah gambar rancangan basis data yang memperlihatkan benda apa yang datanya disimpan, keterangan yang melekat padanya, dan bagaimana benda-benda itu berhubungan. Slide gabungan menambahkan: model E-R memandang dunia nyata sebagai kumpulan <strong>objek dasar (entitas)</strong> dan <strong>relasi</strong> antarobjek, termasuk kelompok <em>object-based logical model</em> (semantic model).</p>
<p>Empat komponen konseptualnya: <strong>entitas, atribut, relationship, dan batasan</strong> (domain nilai atribut dan batasan kardinalitas).</p>`, "Bagian 1"),
  simbolERD,
  { type: "table", label: "Tabel Interaktif", title: "Istilah Kunci P3", headers: ["Istilah", "Arti"],
    rows: [["Entitas", "Objek di dunia nyata yang dapat dibedakan: orang, benda, tempat, kejadian"], ["Himpunan entitas", "Kumpulan entitas sejenis (semua mahasiswa)"], ["Entitas konkret / abstrak", "Konkret: mahasiswa, buku. Abstrak: pinjaman, jadwal, nilai"], ["Atribut", "Karakteristik entitas: identifier (key) atau descriptor"], ["Domain", "Batas nilai yang diperbolehkan bagi atribut"], ["Relasi", "Hubungan antar entitas (kata kerja)"], ["Kardinalitas", "Banyaknya baris yang boleh terhubung"], ["Derajat relasi", "Banyaknya himpunan entitas yang terlibat"]],
    modes: [{ label: "Entitas vs himpunan entitas", target: "row", row: 1, title: "Individu vs rumpun", text: "Entitas = satu individu (mahasiswa bernama Gilang). Himpunan entitas = rumpunnya (semua mahasiswa). Di ERD yang digambar adalah himpunan entitas; di tabel, satu entitas = satu baris." }] },
  A("Tiga Bahan Utama ERD", `<p><strong>Entitas</strong> ditulis kata benda tunggal (Buku, bukan Buku-buku) dan digambar persegi panjang. <strong>Atribut</strong> adalah keterangan entitas, digambar elips; atribut kunci tulisannya digarisbawahi. <strong>Relasi</strong> adalah hubungan antara entitas, hampir selalu kata kerja (dipinjam), digambar belah ketupat.</p>
<p>Ibarat tiga pertanyaan kepada petugas: laci apa saja yang ada? (entitas) kotak isian apa yang tercetak di kartu? (atribut) kartu laci ini terhubung ke laci mana? (relasi).</p>`, "Bagian 2"),
  { type: "table", label: "Tabel Interaktif • Slide Gabungan", title: "Tipe-tipe Atribut", headers: ["Pasangan", "Penjelasan", "Contoh"],
    rows: [["Simple vs komposit", "Tidak bisa dibagi vs bisa dibagi", "jenis_kelamin vs nama (depan + belakang)"], ["Single vs multi-valued", "Paling banyak satu nilai vs bisa lebih dari satu nilai sejenis", "tgl_lahir vs no_telepon"], ["Derived (turunan)", "Dihitung dari atribut lain", "umur dari tgl_lahir; IP dari nilai mata kuliah"], ["Mandatory vs non mandatory", "Wajib diisi (NOT NULL) vs boleh kosong (NULL)", "nama vs email cadangan"], ["Identifier vs descriptor", "Penanda unik (key) vs penjelas non-unik", "nim vs alamat"]],
    modes: [{ label: "Kaitan dengan P2", target: "row", row: 3, title: "Ingat NULL di P2", text: "Atribut mandatory nanti diberi constraint NOT NULL saat tabel dibuat." }] },
  erdPerpus,
  A("Kardinalitas", `<p><strong>Kardinalitas</strong> adalah keterangan tentang banyaknya baris yang boleh terhubung pada sebuah relasi, ditulis sebagai angka/huruf di atas garis penghubung. Modul menyebut tiga macam: <strong>satu ke satu, satu ke banyak, banyak ke banyak</strong>; slide gabungan menambahkan <strong>banyak ke satu</strong> (N : 1), yang sebenarnya 1 : N dibaca dari arah sebaliknya.</p>
<p>Cara menentukan: ajukan <strong>dua pertanyaan</strong>, dari kiri dan dari kanan. “Satu anggota bisa melakukan berapa peminjaman? Banyak. Satu peminjaman dilakukan oleh berapa anggota? Satu.” → 1 : N.</p>
<p>Slide gabungan juga menyebut dua cara menulis kardinalitas: <strong>Korth</strong> memakai garis berarah untuk “satu” dan tak berarah untuk “banyak”; <strong>Date</strong> menuliskan kardinalitas pada garis (cara yang dipakai modul).</p>`, "Bagian 3"),
  mapping,
  ex("Latihan Interaktif", "Kardinalitas Kehidupan Kampus", ["Hubungan", "Kardinalitas"], ["1 : 1", "1 : N", "M : N"], [
    ["Mahasiswa — mengambil — Mata kuliah", "M : N"],
    ["Prodi — memiliki — Mahasiswa", "1 : N"],
    ["Dosen — mengajar — Mata kuliah (satu matkul bisa tim dosen)", "M : N"],
    ["Mahasiswa — memiliki — Akun LMS", "1 : 1"],
    ["Penerbit — menerbitkan — Buku", "1 : N"]
  ]),
  derajat,
  A("Lima Langkah Menggambar ERD", `<p>Bahan bakunya satu paragraf cerita. (1) <strong>Cari kata benda</strong> yang datanya disimpan berulang → entitas. (2) <strong>Cari keterangannya</strong> → atribut. (3) <strong>Cari kata kerja</strong> yang menghubungkan dua entitas → relasi. (4) <strong>Tentukan atribut kunci</strong>, beri garis bawah. (5) <strong>Tentukan kardinalitas</strong> dengan dua pertanyaan.</p>
<p>Lalu periksa dengan empat pertanyaan: setiap entitas punya tepat satu atribut bergaris bawah? setiap relasi menghubungkan dua entitas (bukan entitas dengan atribut)? setiap garis penghubung sudah diberi kardinalitas? setiap atribut menempel pada entitas/relasi yang benar?</p>`, "Bagian 4"),
  { type: "table", label: "Tabel Interaktif", title: "Enam Kekeliruan Menggambar ERD (Modul)", headers: ["Kekeliruan", "Akibat", "Perbaikan"],
    rows: [["Entitas bernama jamak (Buku-buku)", "Bingung saat jadi tabel; satu baris = satu buku", "Kata benda tunggal"], ["Atribut digambar sebagai entitas", "Ada persegi panjang “judul” tanpa atribut", "Tanya: benda yang disimpan berulang, atau keterangan?"], ["Relasi dihubungkan ke atribut", "Garis berakhir di elips", "Relasi menghubungkan entitas"], ["Tidak ada atribut kunci", "Baris kembar tidak bisa dicegah", "Garis bawahi satu atribut per entitas"], ["Kardinalitas tidak ditulis", "Letak kunci tamu tidak diketahui", "Tulis 1, N, M di garis"], ["Relasi diberi nama kata benda", "Maksud hubungan tidak jelas", "Pakai kata kerja"]],
    modes: [{ label: "Yang paling fatal", target: "row", row: 4, title: "Kardinalitas", text: "Tanpa kardinalitas, ERD tidak bisa diubah menjadi tabel di Bab 4." }] },
  ruangBaca,
  A("Key dalam Model Relasional", `<p>Slide gabungan: <strong>key</strong> adalah satu atau gabungan atribut yang membedakan semua baris secara unik. <strong>Super key</strong> = kumpulan atribut apa pun yang unik; <strong>candidate key</strong> = super key yang minimal (tidak ada atribut yang bisa dibuang); <strong>primary key</strong> = candidate key yang dipilih. Kriteria pemilihan: <strong>lebih natural</strong> (sering dipakai sehari-hari), <strong>lebih ringkas</strong>, dan <strong>keunikan lebih terjamin</strong>.</p>
<p>➕ Hubungan ketiganya: setiap primary key adalah candidate key, dan setiap candidate key adalah super key, tetapi tidak sebaliknya.</p>`, "Bagian 5 • Slide Gabungan"),
  lemah,
  isa,
  A("Varian Relasi dan Agregasi", `<p><strong>Relasi tunggal</strong> (unary): entitas berelasi dengan dirinya. <strong>Relasi multi entitas</strong>: tiga himpunan entitas berelasi bersamaan (ternary). <strong>Relasi ganda</strong>: dua entitas punya lebih dari satu relasi, misalnya Pegawai <em>bekerja di</em> Departemen dan Pegawai <em>memimpin</em> Departemen.</p>
<p><strong>Agregasi</strong>: saat sebuah relasi (works-on) perlu berelasi lagi dengan entitas lain (manager), relasi itu dibungkus menjadi entitas abstrak agar tidak terjadi redundansi.</p>`, "Bagian 6 • Slide Gabungan"),
  chenMartin,
  rv("Cek Pemahaman", "Uji Cepat P3", [
    { prompt: "Atribut kunci digambar seperti apa?", answer: "Elips dengan tulisan bergaris bawah", reason: "Nanti menjadi kunci primer." },
    { prompt: "Mana yang candidate key tetapi bukan primary key pada mahasiswa(nim, email, nama)?", answer: "email", reason: "Unik dan minimal, tetapi nim yang dipilih." },
    { prompt: "Entitas lemah digambar dengan…", answer: "Persegi panjang ganda", reason: "Relasi pengidentifikasinya belah ketupat ganda." },
    { prompt: "Relasi Pegawai–melapor–Pegawai berderajat…", answer: "Unary", reason: "Satu himpunan entitas." }
  ])
];
