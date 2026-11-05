// Materi Lengkap Bahasa Indonesia P5–P6: Kalimat Efektif
const { C, box, arrow, path, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a, ok, o]) => ({ cells: [c], fields: [{ options: o || opts, answer: a }], ok: ok || "✓" })) });

// kalimat dipecah per fungsi: [teks, fungsi, tone, part]
const parse = (y, parts, x0 = 20) => { let x = x0; return parts.map(([t, f, tone, p]) => { const w = Math.max(70, t.length * 8.2 + 24); const g = box(x, y, w, 44, t, tone, p, { size: 13 }) + text(x + w / 2, y + 60, f, { size: 12, color: C[tone][2] }); x += w + 8; return g; }).join(""); };

const pola = diagram({
  label: "Diagram Interaktif", title: "Membedah Fungsi Kalimat", desc: "Tiga contoh dari Tabel 3 modul. Klik setiap warna.", minw: 640,
  svg: svg(800, 290,
    parse(15, [["Pak Raden", "S", "sky", "s"], ["memasukkan", "P", "emerald", "p"], ["uang", "O", "amber", "o"], ["ke bank", "K", "slate", "k"]]) +
    parse(110, [["Dia", "S", "sky", "s"], ["mengirimi", "P", "emerald", "p"], ["ibunya", "O", "amber", "o"], ["uang", "Pel", "violet", "pel"]]) +
    parse(205, [["Bella", "S", "sky", "s"], ["berjualan", "P", "emerald", "p"], ["suvenir", "Pel", "violet", "pel"]]) +
    text(620, 37, "S-P-O-K", { size: 14, color: "#334155" }) + text(620, 132, "S-P-O-Pel", { size: 14, color: "#334155" }) + text(620, 227, "S-P-Pel", { size: 14, color: "#334155" })
  ),
  parts: [
    { id: "s", label: "Subjek", title: "Yang dibicarakan", text: "Jawaban pertanyaan “siapa/apa yang …?”. Bisa nomina, frasa nomina, klausa, bahkan verba (Melukis hobiku)." },
    { id: "p", label: "Predikat", title: "Inti informasi", text: "Jawaban “mengapa/bagaimana subjek?”. me-…-kan/-i → menuntut objek; ber- → tidak." },
    { id: "o", label: "Objek", title: "Sasaran verba transitif", text: "Uji: Uang dimasukkan Pak Raden ke bank ✓ • Ibunya dikirimi uang ✓ → objek." },
    { id: "pel", label: "Pelengkap", title: "Melengkapi, bukan sasaran", text: "*Uang dikirimi … ✗, *Suvenir dijuali Bella ✗ → pelengkap. Letaknya di belakang O jika ada O." },
    { id: "k", label: "Keterangan", title: "Unsur tak wajib", text: "Bisa dipindah: Ke bank Pak Raden memasukkan uang. ➕ Uji keterangan: kalimat tetap utuh walau bagian itu dihapus." }
  ]
});

const jenisTree = diagram({
  label: "Diagram Interaktif", title: "Pohon Jenis Kalimat Berdasarkan Klausa", desc: "Klik setiap cabang.", minw: 640,
  svg: svg(800, 260,
    box(320, 10, 160, 44, "Kalimat", "slate", "kal", { size: 15 }) +
    path("M400,54 L400,72 L170,72 L170,90") + path("M400,72 L600,72 L600,90") +
    box(90, 92, 160, 44, "Tunggal (1 klausa)", "sky", "tung", { size: 13 }) + box(510, 92, 180, 44, "Majemuk (2+ klausa)", "emerald", "maj", { size: 13 }) +
    path("M600,136 L600,155 L430,155 L430,175") + path("M600,155 L600,175") + path("M600,155 L760,155 L760,175", { noArrow: false }) +
    box(355, 178, 150, 60, "Setara (KMS)|dan • tetapi • atau", "amber", "kms", { size: 12 }) + box(525, 178, 150, 60, "Bertingkat (KMB)|induk + anak", "violet", "kmb", { size: 12 }) + box(690, 178, 105, 60, "Campuran|(KMC)", "rose", "kmc", { size: 12 })
  ),
  parts: [
    { id: "kal", label: "Kalimat", title: "Dilihat dari jumlah klausa", text: "Klausa = S + P. Hitung jumlah predikat sebagai petunjuk awal." },
    { id: "tung", label: "Tunggal", title: "Satu klausa", text: "Ayah membakar ikan nila di dapur. Keterangan panjang tidak membuatnya majemuk." },
    { id: "maj", label: "Majemuk", title: "Dua klausa atau lebih", text: "Dibagi menurut hubungan antarklausanya." },
    { id: "kms", label: "KMS", title: "Setara", text: "Penjumlahan, pertentangan, pemilihan, penegasan. Tiap klausa bisa berdiri sendiri." },
    { id: "kmb", label: "KMB", title: "Bertingkat", text: "Anak kalimat menggantikan satu fungsi induk: subjek, predikat, objek, atau keterangan. Dibahas detail di P6." },
    { id: "kmc", label: "KMC", title: "Campuran", text: "Minimal dua induk + satu anak, atau satu induk + dua anak: Saya menulis surat dan adik menonton televisi ketika ayah pulang dari kantor." }
  ]
});

const perluasan = diagram({
  label: "Diagram Interaktif", title: "KMB: Anak Kalimat Mengisi Satu Fungsi Induk", desc: "Contoh dari catatan kelas. Klik setiap baris.", minw: 660,
  svg: svg(820, 330,
    [[15, "ps", "Perluasan subjek", [["Mobil yang akan diperbaiki", "S = anak kalimat", "violet"], ["harus diambil", "P", "emerald"], ["sekarang", "K", "slate"]]],
     [125, "po", "Perluasan objek", [["Hakim", "S", "sky"], ["memutuskan", "P", "emerald"], ["bahwa ia harus membayar denda", "O = anak kalimat", "violet"]]],
     [235, "pk", "Perluasan keterangan", [["Anton", "S", "sky"], ["tidak datang", "P", "emerald"], ["karena sakit hati", "K = anak kalimat", "violet"]]]]
      .map(([y, p, h, parts]) => `<g data-part="${p}">` + text(85, y + 22, h, { size: 12, color: "#475569" }) + parse(y, parts.map(([t, f, tone]) => [t, f, tone, null]), 165) + "</g>").join("")
  ),
  parts: [
    { id: "ps", label: "Subjek", title: "Anak kalimat dengan “yang”", text: "Induk: Mobil harus diambil sekarang. Anak: mobil akan diperbaiki. ➕ Contoh panjang dari kelas: Para karyawan yang sedang berkumpul … bersama direksi perusahaan akan menyampaikan usulan di ruang rapat." },
    { id: "po", label: "Objek", title: "Anak kalimat dengan “bahwa”", text: "Di dalam O ada s2 (ia), p2 (harus membayar), o2 (denda)." },
    { id: "pk", label: "Keterangan", title: "Anak kalimat dengan konjungsi sebab, syarat, waktu, tujuan, konsesif", text: "karena, jika, ketika, agar, walaupun. Subjek anak kalimat yang sama dengan induk boleh dilesapkan: (Anton) sakit hati." }
  ]
});

const P5 = [
  A("Apa Itu Kalimat?", `<p>Kalimat adalah satuan bahasa terkecil, lisan atau tulisan, yang mengungkapkan <strong>pikiran utuh</strong>. Sutan Takdir Alisjahbana menyebutnya deretan kata yang memiliki arti lengkap. Ciri tulisnya: diawali huruf kapital dan diakhiri tanda titik, tanya, atau seru; ciri lisannya: diawali dan diakhiri kesenyapan.</p>
<p>Abidin (2019) menambahkan dua ciri lain: mengandung pikiran utuh dan memiliki urutan logis, yaitu setiap kata atau kelompok kata mendukung fungsi S, P, O, atau K.</p>
<p>➕ <strong>Tambahan:</strong> bedakan <em>kalimat</em> dari <em>frasa</em>. “Hari Ulang Tahun ke-72 Republik Indonesia” hanyalah frasa (tidak ada predikat), jadi bukan kalimat walau diberi titik. Itulah jawaban latihan no. 10.</p>`, "Bagian A"),
  pola,
  A("Unsur Wajib dan Tak Wajib", `<p>Dalam <em>Barangkali mereka menghadiri pertemuan itu kemarin sore</em>, bagian <strong>mereka menghadiri pertemuan itu</strong> adalah unsur wajib; <em>barangkali</em> dan <em>kemarin sore</em> unsur tak wajib (bisa dihapus tanpa merusak kalimat).</p>
<p>➕ Uji tanya untuk menemukan fungsi: <strong>S</strong> menjawab “siapa/apa”, <strong>P</strong> menjawab “mengapa/bagaimana/apa”, <strong>O</strong> menjawab “apa/siapa” sesudah P, <strong>K</strong> menjawab “kapan, di mana, bagaimana, mengapa”.</p>`, "Bagian C"),
  ex("Latihan Interaktif", "Objek atau Pelengkap? (Uji Pemasifan)", ["Kalimat", "Kata yang ditanya → fungsi"], ["Objek", "Pelengkap"], [
    ["Ia mempelajari matematika. (matematika)", "Objek"], ["Ia belajar matematika. (matematika)", "Pelengkap"], ["Ia menjadi tentara. (tentara)", "Pelengkap"], ["Ayah memakan roti. (roti)", "Objek"], ["Ia membacakan adik sebuah cerita. (sebuah cerita)", "Pelengkap"], ["Ia membacakan adik sebuah cerita. (adik)", "Objek"]
  ]),
  jenisTree,
  { type: "table", label: "Tabel Interaktif", title: "Jenis Kalimat Berdasarkan Predikat", headers: ["Jenis", "Predikat", "Contoh"],
    rows: [["Verbal aktif transitif", "Kata kerja + O", "Adik memakan roti."], ["Verbal aktif intransitif", "Kata kerja tanpa O", "Adik makan. Paman berjualan bayam."], ["Verbal pasif di-", "di- + kata kerja", "Roti dimakan (oleh) adik."], ["Verbal pasif ter-", "ter- (tidak sengaja)", "Adik terjatuh dari tempat tidur."], ["Verbal pasif ke-an", "ke-an (mengalami)", "Adik kehujanan di jalan."], ["Nominal", "Kata benda", "Ayahku pengacara."], ["Adjektiva", "Kata sifat", "Adikku tinggi."], ["Numeral", "Kata bilangan", "Saudaraku dua."], ["Preposisional", "Frasa preposisi", "Ibu ke Jakarta."]],
    modes: [{ label: "➕ Pasif persona", target: "none", title: "Pasif tanpa di-", text: "Kalimat pasif juga bisa berbentuk <em>pelaku + kata kerja dasar</em>: <em>Hadiah itu kami kirimkan kemarin.</em> Pelaku (kami) harus menempel langsung pada kata kerja, tanpa disisipi kata lain." }] },
  A("Kalimat Efektif", `<p>Kalimat efektif mampu <strong>menimbulkan kembali gagasan</strong> di benak pembaca persis seperti di benak penulis. Ciri umumnya: padat, singkat, jelas, lengkap, tepat. <em>Jelas</em> = mudah dipahami, <em>singkat</em> = hemat kata, <em>tepat</em> = sesuai kaidah.</p>
<p>Tujuh syaratnya: <strong>kesepadanan</strong> (struktur lengkap), <strong>kecermatan</strong> (tidak ambigu), <strong>kehematan</strong> (tanpa kata mubazir), <strong>kelogisan</strong> (masuk akal), <strong>kepaduan</strong> (tidak bertele-tele, tanpa sisipan antara P dan O), <strong>keparalelan</strong> (bentuk sejajar), dan <strong>ketegasan</strong> (ide pokok menonjol).</p>`, "Bagian E"),
  { type: "table", label: "Tabel Interaktif", title: "➕ Daftar Kata Mubazir & Salah Kaprah yang Sering Diujikan", headers: ["Tidak efektif", "Efektif", "Alasan"],
    rows: [["agar supaya", "agar / supaya", "Sinonim berdampingan"], ["para tamu-tamu", "para tamu / tamu-tamu", "Jamak ganda"], ["sejak dari", "sejak / dari", "Sinonim"], ["dengan menggunakan pisau", "dengan pisau", "Kata berlebih"], ["membahas tentang", "membahas", "Sisipan antara P dan O"], ["merubah", "mengubah", "Kata dasar ubah"], ["mempertinggikan", "meninggikan / mempertinggi", "Imbuhan berlebih"], ["acuh (maksudnya tak peduli)", "tak acuh", "acuh = peduli"], ["ketiduran", "tertidur", "Tidak baku"], ["di mana (penghubung)", "yang / karena", "Bukan kata tanya"], ["daripada (bukan perbandingan)", "dari", "daripada hanya untuk membandingkan"], ["mempersingkat waktu", "menghemat waktu", "Kelogisan"]],
    modes: [{ label: "Paling sering keluar", target: "row", row: 0, title: "agar supaya & para …-…", text: "Muncul di latihan no. 19, 25, dan banyak soal UTS bahasa Indonesia." }] },
  ex("Latihan Interaktif", "Syarat Mana yang Dilanggar?", ["Kalimat", "Syarat"], ["Kesepadanan", "Kecermatan", "Kehematan", "Kelogisan", "Kepaduan", "Keparalelan"], [
    ["Karena dia tidak diajak, dia tidak ikut belajar.", "Kehematan"], ["Jurnal ini membahas tentang robotika.", "Kepaduan"], ["Dalam rapat itu membahas kenaikan BBM.", "Kesepadanan"], ["Kegiatan itu meliputi pembelian, menyimpan, dan distribusi.", "Keparalelan"], ["Kepada Bapak Rektor waktu dan tempat kami persilakan.", "Kelogisan"], ["Kucing makan tikus mati.", "Kecermatan"]
  ]),
  tip("⚠️ Catatan koreksi modul (ringkas)", "Contoh <em>Ahmad pulang bekerja (O)</em>: pulang tidak berobjek. • “Kalimat aktif ada tiga macam” di bagian pasif → maksudnya pasif. • Contoh repetisi diberi label TE/E, padahal repetisi adalah cara menegaskan. • Ringkasan menyebut S-P-O wajib; yang selalu wajib hanya S dan P. Rincian di tab Cheat Sheet.", "warn"),
  rv("Cek Pemahaman", "Jawab Dulu, Baru Buka", [
    { prompt: "“Kepada Bapak Rektor waktu dan tempat kami persilakan.” Apa yang keliru?", answer: "Yang dipersilakan Bapak Rektor, bukan waktu dan tempat", reason: "➕ Lebih logis: Bapak Rektor kami persilakan untuk memberikan sambutan." },
    { prompt: "“Kucing makan tikus mati.” Mengapa ambigu?", answer: "Yang mati bisa kucingnya (setelah makan) atau tikusnya", reason: "Perbaikan: Kucing makan tikus yang sudah mati." },
    { prompt: "Bentuk paralel: “pembelian, menyimpan, dan distribusi”?", answer: "pembelian, penyimpanan, dan pendistribusian", reason: "Semua nomina pe-an." }
  ])
];

const P6 = [
  A("Klausa: Inti Setiap Kalimat", `<p>Catatan kelas P6 mengulang inti P5 dengan sudut pandang baru: setiap kalimat dibangun dari <strong>klausa</strong> (S+P atau S+P+O). <em>Mereka(S) tertidur(P)</em> dan <em>Ia(S) menangis(P)</em> adalah klausa terkecil yang sudah utuh.</p>
<p>Dua pertanyaan analisis yang selalu dipakai dosen: (1) predikatnya butuh objek atau tidak (<strong>transitif/intransitif</strong>)? (2) ada berapa klausa (<strong>tunggal/majemuk</strong>), dan kalau majemuk bertingkat, fungsi mana yang diperluas?</p>`, "Bagian 1"),
  { type: "table", label: "Tabel Interaktif", title: "Pasangan Intransitif–Transitif", headers: ["Intransitif (tanpa O)", "Transitif (dengan O)"],
    rows: [["Ia menangis.", "Ia menangisi kepergian sahabatnya."], ["Kami berdiskusi tentang THR.", "Kami mendiskusikan THR."], ["Paman berjualan bayam.", "Paman menjual bayam."], ["Adik makan.", "Adik memakan roti."], ["Mereka bermain di lapangan.", "Mereka memainkan bola."]],
    modes: [{ label: "Pola imbuhan", target: "col", col: 1, title: "me-…-kan / me-…-i", text: "Imbuhan -kan dan -i hampir selalu membuat verba transitif. ➕ Pengecualian ada, tetapi pola ini cukup untuk soal UTS." },
      { label: "Pelengkap", target: "row", row: 2, title: "bayam = pelengkap", text: "Kalimat intransitif boleh diikuti pelengkap; bayam tidak bisa menjadi subjek pasif dari “berjualan”." }] },
  ex("Latihan Interaktif", "Lengkapi Predikatnya", ["Kalimat", "Predikat yang tepat"], null, [
    ["Para karyawan sedang … kualitas produk.", "membahas", "✓ Transitif langsung + O.", ["membahas", "membahas tentang", "bahas"]],
    ["Seluruh karyawan sedang … tentang THR.", "berdiskusi", "✓ Intransitif + “tentang”.", ["mendiskusikan", "berdiskusi", "diskusi"]],
    ["Nenek … masa lalunya.", "menceritakan", "✓", ["menceritakan", "menceritakan tentang", "bercerita"]],
    ["Ia … kepergian sahabatnya.", "menangisi", "✓", ["menangis", "menangisi", "menangiskan tentang"]]
  ]),
  perluasan,
  A("Induk Kalimat dan Anak Kalimat", `<p>Pada kalimat majemuk bertingkat, <strong>induk kalimat</strong> (klausa utama) bisa berdiri sendiri, sedangkan <strong>anak kalimat</strong> (klausa tambahan) bergantung padanya. Contoh dosen: <em>Anton tidak datang karena sakit hati</em> → induk <em>Anton tidak datang</em>, anak <em>(Anton) sakit hati</em>. Polanya S + P + K, dengan K berisi s2 + p2.</p>
<p>Anak kalimat boleh <strong>mendahului</strong> induk: <em>Walaupun sedang sakit, Arman tetap datang.</em> Maknanya sama dengan <em>Arman tetap datang walaupun sedang sakit.</em> ➕ Aturan EYD: bila anak kalimat di depan, pisahkan dengan <strong>koma</strong>; bila di belakang, tanpa koma.</p>
<p>➕ Jangan biarkan anak kalimat berdiri sendiri sebagai kalimat: <em>Walaupun sedang sakit.</em> (titik) bukan kalimat yang utuh karena induknya hilang.</p>`, "Bagian 2"),
  ex("Latihan Interaktif", "Kalimat Utuh atau Tidak?", ["Tulisan", "Penilaian"], ["Kalimat utuh", "Belum utuh (anak kalimat saja)"], [
    ["Karena hujan deras sejak pagi.", "Belum utuh (anak kalimat saja)"], ["Karena hujan deras sejak pagi, acara ditunda.", "Kalimat utuh"], ["Mahasiswa yang akan praktikum di laboratorium kimia.", "Belum utuh (anak kalimat saja)", "✓ Hanya subjek yang diperluas; predikatnya belum ada. Ini contoh di catatan kelas."], ["Mahasiswa akan praktikum di laboratorium kimia.", "Kalimat utuh"]
  ]),
  tip("➕ Cara cepat menganalisis kalimat panjang", "1) Cari predikat utama (biasanya kata kerja yang tidak diawali <em>yang</em>, <em>bahwa</em>, <em>karena</em>…). 2) Semua sebelum predikat = subjek (bisa panjang). 3) Cek apakah predikat butuh objek. 4) Konjungsi <em>yang</em> → perluasan S/O, <em>bahwa</em> → perluasan O, <em>karena/walaupun/agar/ketika</em> → perluasan K."),
  rv("Cek Pemahaman", "Jawab Dulu, Baru Buka", [
    { prompt: "Mengapa “Para karyawan sedang berkumpul untuk membahas kenaikan tunjangan … di ruang rapat” bukan perluasan subjek?", answer: "Karena “sedang berkumpul” adalah predikat induk, bukan anak kalimat dengan “yang”", reason: "Bandingkan dengan versi “Para karyawan yang sedang berkumpul … akan menyampaikan usulan”." },
    { prompt: "Rumah akan dibangun. Tunggal atau majemuk? Aktif atau pasif?", answer: "Tunggal, pasif (di-)", reason: "Satu klausa: Rumah (S) akan dibangun (P)." },
    { prompt: "Ubah ke perluasan objek: “Dosen mengumumkan sesuatu. Ujian diundur.”", answer: "Dosen mengumumkan bahwa ujian diundur.", reason: "" }
  ])
];

module.exports = { p5: P5, p6: P6 };
