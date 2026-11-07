// Materi Lengkap — Bahasa Indonesia P1–P3 (modul + pengayaan dari KBBI/EYD V, Chaer & Agustina, Badan Bahasa)
const { box, arrow, path, poly, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a, ok, o]) => ({ cells: [c], fields: [{ options: o || opts, answer: a }], ok: ok || "✓" })) });

// ---------- Diagram ----------
const linimasa = diagram({
  label: "Diagram Interaktif • Linimasa", title: "Tonggak Sejarah Bahasa Indonesia", minw: 600,
  svg: svg(860, 230,
    `<line x1="20" y1="115" x2="840" y2="115" stroke="#94a3b8" stroke-width="4"/>` +
    [["683–686", "Prasasti|Sriwijaya", "amber", "pr"], ["1522", "Daftar kata|Pigafetta", "amber", "pg"], ["1901", "Ejaan van|Ophuijsen", "sky", "vo"], ["1928", "Sumpah|Pemuda", "rose", "sp"], ["1938", "Kongres|Bahasa I", "violet", "k1"], ["1945", "UUD 1945|Pasal 36", "rose", "uud"], ["1947", "Ejaan|Soewandi", "sky", "es"], ["1972", "EYD", "sky", "eyd"], ["2015", "PUEBI", "sky", "pu"], ["2022", "EYD V", "emerald", "e5"], ["2023 ➕", "UNESCO", "violet", "un"]]
      .map(([y, t, c, id], i) => { const x = 20 + i * 75; const up = i % 2 === 0; return box(x, up ? 20 : 135, 70, 75, y + "|" + t, c, id, { size: 10 }) + `<line x1="${x + 35}" y1="${up ? 95 : 115}" x2="${x + 35}" y2="${up ? 115 : 135}" stroke="#94a3b8" stroke-width="2"/>`; }).join("")
  ),
  parts: [
    { id: "pr", label: "Prasasti", title: "Prasasti zaman Sriwijaya (abad VII)", text: "Ditulis dalam bahasa Melayu Kuno: Kedukan Bukit (683) ➕, Talang Tuo (684, Palembang), Karang Berahi (±686 ➕; modul: ±680, Jambi), Kota Kapur (686, Bangka). Bukti Melayu sudah dipakai sejak masa kerajaan." },
    { id: "pg", label: "Pigafetta", title: "Antonio Pigafetta (1522)", text: "Menyusun daftar kata Melayu yang dipakai di Maluku → bukti Melayu sebagai <em>lingua franca</em> (bahasa perhubungan antarsuku)." },
    { id: "vo", label: "1901", title: "Ejaan van Ophuijsen (1901)", text: "Disusun Ch. A. van Ophuijsen dibantu Engku Nawawi dan Moehammad Taib, dimuat dalam Kitab Logat Melayu. Ciri: j untuk y (jang), oe untuk u (itoe), tanda diakritik (ma’moer)." },
    { id: "sp", label: "1928", title: "Sumpah Pemuda, 28 Oktober 1928", text: "“Kami putra dan putri Indonesia menjunjung bahasa persatuan, bahasa Indonesia.” → kedudukan sebagai <strong>bahasa nasional/persatuan</strong>." },
    { id: "k1", label: "Kongres I", title: "Kongres Bahasa Indonesia I (Solo, 25–28 Juni 1938)", text: "Kongres pertama. Setelahnya rutin: II Medan 1954, III–X Jakarta (1978–2013). ➕ Kongres XI (2018) dan XII (2023) juga di Jakarta." },
    { id: "uud", label: "1945", title: "UUD 1945 Bab XV Pasal 36", text: "“Bahasa negara ialah bahasa Indonesia.” → kedudukan sebagai <strong>bahasa negara/resmi</strong>." },
    { id: "es", label: "1947", title: "Ejaan Republik/Soewandi (19 Maret 1947)", text: "oe → u; hamzah → k (rakyat); kata ulang boleh ditulis dengan angka 2 (anak2); di- ditulis serangkai baik awalan maupun kata depan." },
    { id: "eyd", label: "1972", title: "EYD (16 Agustus 1972)", text: "Diresmikan Presiden Soeharto (Keppres No. 57/1972). Direvisi 1987 dan 2009." },
    { id: "pu", label: "2015", title: "PUEBI (Permendikbud No. 50/2015)", text: "Pedoman Umum Ejaan Bahasa Indonesia, berlaku 2015–2022." },
    { id: "e5", label: "2022", title: "EYD Edisi V (2022)", text: "Keputusan Kepala Badan Bahasa No. 0424/I/BS.00.01/2022. Inilah ejaan yang berlaku sekarang." },
    { id: "un", label: "➕ UNESCO", title: "➕ Bahasa resmi Sidang Umum UNESCO (20 November 2023)", text: "Tidak ada di modul: bahasa Indonesia ditetapkan sebagai salah satu bahasa resmi Sidang Umum UNESCO. Bukti kedudukan internasional yang makin kuat." }
  ]
});

const kedudukan = diagram({
  label: "Diagram Interaktif • Peta Kedudukan & Fungsi", title: "Dua Kedudukan, Delapan Fungsi", minw: 560,
  svg: svg(800, 330,
    box(300, 10, 200, 50, "Bahasa Indonesia", "slate", null, { fill: "#0f172a", color: "#fff" }) +
    box(40, 90, 300, 60, "Bahasa NASIONAL (persatuan)|Sumpah Pemuda 1928", "rose", "nas", { size: 13 }) +
    box(460, 90, 300, 60, "Bahasa NEGARA (resmi)|UUD 1945 Pasal 36", "sky", "neg", { size: 13 }) +
    path("M400 60 L400 75 L190 75 L190 86") + path("M400 75 L610 75 L610 86") +
    box(10, 180, 175, 60, "Lambang|kebanggaan", "rose", "n1", { size: 12 }) + box(195, 180, 175, 60, "Lambang|identitas", "rose", "n2", { size: 12 }) +
    box(10, 255, 175, 60, "Alat pemersatu", "rose", "n3", { size: 12 }) + box(195, 255, 175, 60, "Penghubung antar-|daerah & budaya", "rose", "n4", { size: 12 }) +
    box(430, 180, 175, 60, "Bahasa resmi|kenegaraan", "sky", "g1", { size: 12 }) + box(615, 180, 175, 60, "Pengantar|pendidikan", "sky", "g2", { size: 12 }) +
    box(430, 255, 175, 60, "Perhubungan nasional|(pembangunan)", "sky", "g3", { size: 12 }) + box(615, 255, 175, 60, "Pengembangan|budaya & iptek", "sky", "g4", { size: 12 }) +
    arrow(190, 150, 190, 176) + arrow(610, 150, 610, 176)
  ),
  parts: [
    { id: "nas", label: "Nasional", title: "Kedudukan sebagai bahasa nasional", text: "Bersumber dari <strong>Sumpah Pemuda 1928</strong>, dirumuskan fungsinya dalam Seminar Politik Bahasa Nasional (Jakarta, 25–28 Februari 1975)." },
    { id: "neg", label: "Negara", title: "Kedudukan sebagai bahasa negara", text: "Bersumber dari <strong>UUD 1945 Bab XV Pasal 36</strong>. ➕ Diperkuat UU No. 24 Tahun 2009 tentang Bendera, Bahasa, dan Lambang Negara, serta Lagu Kebangsaan." },
    { id: "n1", label: "Kebanggaan", title: "Lambang kebanggaan nasional", text: "Kita bangga memakai bahasa sendiri, misalnya memakai bahasa Indonesia di forum internasional." },
    { id: "n2", label: "Identitas", title: "Lambang identitas nasional", text: "Bahasa Indonesia menjadi ciri pembeda bangsa Indonesia dari bangsa lain, seperti bendera dan lagu kebangsaan." },
    { id: "n3", label: "Pemersatu", title: "Alat pemersatu", text: "Menyatukan suku-suku dengan latar sosial, budaya, dan bahasa daerah yang berbeda." },
    { id: "n4", label: "Penghubung", title: "Alat perhubungan antardaerah dan antarbudaya", text: "Orang Aceh dan orang Papua bisa berkomunikasi dengan bahasa Indonesia." },
    { id: "g1", label: "Resmi", title: "Bahasa resmi kenegaraan", text: "Dipakai dalam upacara, dokumen, pidato, dan surat-menyurat resmi negara." },
    { id: "g2", label: "Pendidikan", title: "Bahasa pengantar pendidikan", text: "Bahasa pengantar di sekolah dan perguruan tinggi (termasuk kuliahmu)." },
    { id: "g3", label: "Pembangunan", title: "Alat perhubungan tingkat nasional", text: "Untuk perencanaan & pelaksanaan pembangunan dan pemerintahan." },
    { id: "g4", label: "Iptek", title: "Alat pengembangan kebudayaan dan iptek", text: "Bahasa untuk menulis buku, jurnal, dan istilah ilmiah." }
  ]
});

const komunikasi = diagram({
  label: "Diagram Interaktif • Proses Komunikasi", title: "Tiga Komponen Komunikasi (Chaer & Agustina)", minw: 520,
  svg: svg(760, 230,
    box(20, 80, 170, 70, "PENGIRIM|(sender)", "indigo", "snd") + box(295, 80, 170, 70, "INFORMASI|(pesan)", "amber", "msg") + box(570, 80, 170, 70, "PENERIMA|(receiver)", "emerald", "rcv") +
    arrow(190, 115, 291, 115) + arrow(465, 115, 566, 115) +
    box(295, 175, 170, 45, "ALAT: bahasa, tanda, gestur", "sky", "alat", { size: 11 }) +
    box(295, 10, 170, 45, "⚡ Gangguan/hambatan", "rose", "noise", { size: 12 }) +
    path("M655 150 L655 200 L105 200 L105 154", { color: "#64748b", dash: "6 4" }) + text(560, 214, "dua arah: bergantian peran", { size: 11, weight: 600, color: "#64748b" })
  ),
  parts: [
    { id: "snd", label: "Pengirim", title: "Partisipan: pengirim (sender)", text: "Pihak yang menyampaikan ide, gagasan, keterangan, atau pesan." },
    { id: "msg", label: "Informasi", title: "Informasi yang dikomunikasikan", text: "Berupa ide, gagasan, keterangan, pesan." },
    { id: "rcv", label: "Penerima", title: "Partisipan: penerima (receiver)", text: "Pada komunikasi <strong>searah</strong> (ceramah tanpa tanya-jawab) peran tetap; pada <strong>dua arah</strong> (rapat, diskusi) peran bergantian (garis putus-putus)." },
    { id: "alat", label: "Alat", title: "Alat komunikasi", text: "Lambang (bahasa → komunikasi verbal), tanda (rambu, gambar), gerak tubuh/gestur. Alat bukan bahasa (peluit, cahaya) → komunikasi nonverbal." },
    { id: "noise", label: "Gangguan", title: "Hambatan komunikasi", text: "Ketiadaan kesadaran salah satu pihak, pendengaran kurang baik, suara bising, kemampuan berbahasa kurang memadai." }
  ]
});

const ragamTree = diagram({
  label: "Diagram Interaktif • Peta Ragam Bahasa", title: "Lima Sudut Pandang Ragam Bahasa", minw: 600,
  svg: svg(860, 300,
    box(330, 10, 200, 50, "Ragam Bahasa", "slate", null, { fill: "#0f172a", color: "#fff" }) +
    [["Penutur", "indigo", "pen", "idiolek • dialek|kronolek • sosiolek"], ["Pemakaian", "sky", "pem", "fungsiolek|(ilmiah, sastra, jurnalistik…)"], ["Keformalan", "amber", "for", "beku • baku • usaha|santai • akrab"], ["Media", "emerald", "med", "lisan • tulis"], ["Pemerolehan", "violet", "pro", "B1/bahasa ibu • B2 •|B3 • bahasa asing"]]
      .map(([t, c, id, sub], i) => { const x = 10 + i * 170; return box(x, 100, 160, 50, t, c, id) + box(x, 175, 160, 80, sub, c, id, { size: 11, fill: "#ffffff" }) + path(`M430 60 L430 78 L${x + 80} 78 L${x + 80} 96`) + arrow(x + 80, 150, x + 80, 171); }).join("")
  ),
  parts: [
    { id: "pen", label: "Penutur", title: "Berdasarkan penutur", text: "<strong>Idiolek</strong> (perorangan: warna suara, gaya), <strong>dialek</strong> (wilayah: Jawa dialek Banyumas), <strong>kronolek</strong> (masa: bahasa tahun 30-an vs kini), <strong>sosiolek</strong> (status sosial: usia, pendidikan, pekerjaan)." },
    { id: "pem", label: "Pemakaian", title: "Berdasarkan pemakaian (fungsiolek)", text: "Bidang: ilmiah, sastra (estetis), jurnalistik (sederhana, komunikatif, ringkas), militer (ringkas, tegas, banyak akronim). Paling tampak dari kosakatanya." },
    { id: "for", label: "Keformalan", title: "Berdasarkan tingkat keformalan (Martin Joos)", text: "<strong>Beku</strong> (khotbah, upacara: pola tetap) → <strong>baku/resmi</strong> (akademik, rapat) → <strong>usaha/konsultatif</strong> (bisnis, paling operasional) → <strong>santai</strong> (kantin; bentuk alegro) → <strong>akrab</strong> (teman dekat; pendek-pendek)." },
    { id: "med", label: "Media", title: "Berdasarkan media", text: "<strong>Tulis</strong>: bergantung pada ejaan (kapital, tanda baca). <strong>Lisan</strong>: bergantung pada bunyi, tekanan, intonasi; ada homofon." },
    { id: "pro", label: "Pemerolehan", title: "Berdasarkan tahap pemerolehan", text: "Bahasa ibu = B1 (dipelajari pertama dari keluarga), lalu B2, B3. Bagi banyak anak Indonesia, bahasa Indonesia adalah B2. Bahasa asing = bahasa bangsa lain (bersifat politis)." }
  ]
});

const afiks = diagram({
  label: "Diagram Interaktif • Posisi Imbuhan", title: "Di Mana Imbuhan Menempel?", minw: 520,
  svg: svg(760, 260,
    [["Prefiks (awalan)", "indigo", "pre", [["ke-", "rose"], ["kasih", "slate"]], "kekasih"], ["Infiks (sisipan)", "sky", "inf", [["t", "slate"], ["-el-", "rose"], ["unjuk", "slate"]], "telunjuk"], ["Sufiks (akhiran)", "emerald", "suf", [["genang", "slate"], ["-an", "rose"]], "genangan"], ["Konfiks (apitan)", "amber", "kon", [["ke-", "rose"], ["adil", "slate"], ["-an", "rose"]], "keadilan"]]
      .map(([t, c, id, segs, res], i) => { const y = 10 + i * 62; let x = 230; const parts = segs.map(([s, sc]) => { const w = Math.max(50, s.length * 13 + 20); const b = box(x, y + 6, w, 40, s, sc, null, { size: 13, r: 6 }); x += w + 4; return b; }).join(""); return box(10, y, 200, 52, t, c, id, { size: 13 }) + parts + arrow(x + 6, y + 26, 560, y + 26) + box(570, y + 6, 170, 40, res, c, null, { size: 14 }); }).join("")
  ),
  parts: [
    { id: "pre", label: "Prefiks", title: "Prefiks/awalan", text: "Di depan kata dasar: me(N)-, ber-, di-, ke-, pe(N)-, per-, se-, ter-, a-, pra-, maha-, para-." },
    { id: "inf", label: "Infiks", title: "Infiks/sisipan", text: "Di tengah kata: -el- (telunjuk), -em- (gemetar), -er- (gerigi), -in- (kinerja)." },
    { id: "suf", label: "Sufiks", title: "Sufiks/akhiran", text: "Di belakang kata: -kan, -an, -i, -nya, -wan, -wati, -man, -is, -isasi." },
    { id: "kon", label: "Konfiks", title: "Konfiks/apitan", text: "Mengapit dan membentuk satu arti bersama: ke-an, per-an, pe(N)-an, ber-an. Modul juga menyebut kombinasi me-per-kan dan di-kan (➕ secara teknis ini gabungan imbuhan, bukan konfiks murni)." }
  ]
});

const peluluhan = diagram({
  label: "Diagram Interaktif • Rumus Peluluhan", title: "K-T-S-P Luluh, Kecuali Ada Gugus Konsonan", minw: 520,
  svg: svg(760, 250,
    box(10, 95, 150, 60, "meN- / peN-|+ kata dasar", "slate", null, { size: 13 }) +
    box(220, 20, 230, 60, "Huruf awal K, T, S, P|diikuti vokal", "emerald", "luluh", { size: 13 }) +
    box(220, 170, 230, 60, "K, T, S, P diikuti|konsonan (kr, tr, sp, pr)", "rose", "gugus", { size: 13 }) +
    path("M160 115 L190 115 L190 50 L216 50") + path("M190 135 L190 200 L216 200") +
    box(510, 20, 240, 60, "LULUH: mengonsumsi,|menelaah, menyurvei, memelihara", "emerald", "c1", { size: 11 }) +
    box(510, 170, 240, 60, "TIDAK luluh: mengkritik,|mentransfer, mensponsori, memprotes", "rose", "c2", { size: 11 }) +
    arrow(450, 50, 506, 50) + arrow(450, 200, 506, 200) +
    box(510, 100, 240, 50, "Khusus: pe(N) + protes = pemrotes", "amber", "khusus", { size: 11 })
  ),
  parts: [
    { id: "luluh", label: "KTSP + vokal", title: "Luluh", text: "Huruf awal k, t, s, p <strong>hilang</strong> dan diganti bunyi sengau: k→ng, t→n, s→ny, p→m. ➕ Termasuk kata serapan: mengonsumsi (bukan mengkonsumsi), memopulerkan, menyukseskan." },
    { id: "gugus", label: "Gugus konsonan", title: "Tidak luluh", text: "Jika k/t/s/p diikuti konsonan lain (gugus kr, tr, sp, pr, sk, st…), huruf awal <strong>tetap</strong>." },
    { id: "c1", label: "Contoh luluh", title: "Contoh luluh", text: "meN- + konsumsi → mengonsumsi • telaah → menelaah • survei → menyurvei • pelihara → memelihara." },
    { id: "c2", label: "Contoh tidak luluh", title: "Contoh tidak luluh", text: "mengkritik, mentransfer, mensponsori, memprotes; pengkritik, pentransfer." },
    { id: "khusus", label: "Pemrotes", title: "Kasus khusus: pemrotes", text: "Menurut aturan gugus mestinya “pemprotes”, tetapi bentuk baku KBBI adalah <strong>pemrotes</strong> (modul menjelaskan karena huruf p pada kata dasar sama dengan bunyi awalan pe-)." }
  ]
});


const ejaanDg = diagram({
  label: "Diagram Interaktif • Evolusi Ejaan", title: "Enam Tahap Ejaan dan Ciri Pembedanya", minw: 600,
  svg: svg(860, 170,
    [["1901", "van Ophuijsen", "amber", "a"], ["1947", "Soewandi", "sky", "b"], ["1959", "Melindo|(batal)", "slate", "c"], ["1972", "EYD", "indigo", "d"], ["2015", "PUEBI", "violet", "e"], ["2022", "EYD V", "emerald", "f"]]
      .map(([y, t, c, id], i) => { const x = 10 + i * 143; return box(x, 40, 125, 90, y + "|" + t, c, id, { size: 13, dash: id === "c" ? "6 4" : undefined }) + (i < 5 ? arrow(x + 125, 85, x + 141, 85) : ""); }).join("") +
    text(430, 155, "klik setiap kotak untuk melihat contoh tulisannya", { size: 11, weight: 600, color: "#64748b" })
  ),
  parts: [
    { id: "a", label: "van Ophuijsen", title: "Ejaan van Ophuijsen (1901–1947)", text: "<em>jang</em> (yang), <em>itoe</em> (itu), <em>tjinta</em> (cinta), <em>ma’moer</em> (makmur). Ciri: j = y, oe = u, tanda diakritik." },
    { id: "b", label: "Soewandi", title: "Ejaan Republik/Soewandi (1947–1972)", text: "<em>itu</em>, <em>rakjat</em>, <em>anak2</em>, <em>dirumah</em>. Ciri: oe → u, hamzah → k, angka 2 untuk ulang, di- selalu serangkai." },
    { id: "c", label: "Melindo", title: "Ejaan Melindo (1959, batal)", text: "Rancangan ejaan bersama Indonesia–Malaysia; batal karena situasi politik." },
    { id: "d", label: "EYD", title: "EYD (1972–2015)", text: "<em>yang, cinta, jalan, syarat, khas</em>; <em>di</em> kata depan dipisah. Direvisi 1987 & 2009." },
    { id: "e", label: "PUEBI", title: "PUEBI (2015–2022)", text: "Permendikbud No. 50/2015; ➕ menambah huruf diftong <em>ei</em> (survei) dan aturan huruf tebal." },
    { id: "f", label: "EYD V", title: "EYD Edisi V (2022–sekarang)", text: "Kembali memakai nama EYD; berlaku saat ini. ➕ Bisa dicek di laman ejaan.kemdikbud.go.id." }
  ]
});

// ---------- Materi ----------
const MB = module.exports = {
  p1: [
    A("Bahasa yang Lahir Sebelum Negaranya", `<p>Bahasa Indonesia punya sejarah unik: ia <strong>lahir lebih dulu</strong> daripada negara Indonesia. Bahasa persatuan diikrarkan pada <strong>28 Oktober 1928</strong>, sedangkan kemerdekaan baru diproklamasikan 17 tahun kemudian. Para perintis kemerdekaan sadar bahwa bangsa yang merdeka butuh <strong>kebudayaan yang dapat dibanggakan</strong>, dan bahasa bersama adalah fondasinya (Kridalaksana, 2018).</p>
<p>Menurut modul, pada tahun 2025 bahasa Indonesia sudah berusia <strong>97 tahun</strong> (dihitung dari 1928). Usia ini menuntut sikap pemakai yang dewasa: bangga, setia, dan cermat memakai bahasanya.</p>`, "Bagian 1 • Sejarah"),
    A("Mengapa Bahasa Melayu yang Dipilih?", `<p>Bahasa Indonesia sebagian besar berasal dari <strong>bahasa Melayu</strong>. Mengapa bukan bahasa Jawa yang penuturnya paling banyak? Modul memberi tiga alasan:</p>
<ol><li><strong>Sudah menjadi lingua franca</strong>: bahasa Melayu dipakai sebagai bahasa pengantar komunikasi di Nusantara jauh sebelum merdeka, terutama dalam perdagangan.</li><li><strong>Tidak mengenal tingkatan bahasa</strong>: bahasa Jawa punya ngoko–krama, bahasa Sunda punya undak-usuk. Melayu tidak, sehingga <strong>lebih demokratis</strong> dan mudah diterima suku lain.</li><li><strong>Diterima berbagai suku</strong> sebagai bahasa antarsuku.</li></ol>
<p>➕ Alasan tambahan yang sering disebut: struktur bahasa Melayu relatif <strong>sederhana dan mudah dipelajari</strong>, serta pemilihan bahasa “netral” mencegah kesan dominasi suku terbesar. Penerimaan suku Jawa yang mayoritas terhadap bahasa Melayu sering dipuji sebagai sikap besar demi persatuan.</p>`, "Bagian 2"),
    A("Bukti Bahasa Melayu Sudah Lama Dipakai", `<ul><li><strong>Prasasti zaman Sriwijaya (abad VII)</strong> berbahasa Melayu Kuno: Talang Tuo (684 M, ditemukan di Palembang 1920), Kota Kapur (686 M, Bangka, ditemukan 1892), Karang Berahi (±680 M menurut modul, Jambi, ditemukan 1904). ➕ Prasasti tertua yang sering disebut adalah <strong>Kedukan Bukit (683 M)</strong> di Palembang.</li><li><strong>Antonio Pigafetta</strong> (1491–1534), penulis perjalanan Magellan, menyusun daftar kata Melayu di Maluku pada <strong>1522</strong> dalam <em>Relazione del Primo Viaggio Intorno al Mondo</em>.</li><li><strong>Surat keputusan kolonial K.B. 1871 No. 104</strong>: pengajaran di sekolah bumiputra memakai bahasa daerah atau bahasa Melayu.</li></ul>
<p>Selain Melayu, kosakata bahasa Indonesia juga diperkaya bahasa <strong>Arab, Portugis, Belanda, Inggris, Sanskerta</strong>, dan bahasa daerah. Contoh: <em>kitab</em> (Arab), <em>meja</em> (Portugis), <em>kantor</em> (Belanda), <em>komputer</em> (Inggris), <em>bahasa</em> (Sanskerta), <em>nyeri</em> (Sunda).</p>`, "Bagian 3"),
    linimasa,
    A("Kedudukan Bahasa Indonesia", `<p>“Kedudukan” artinya <strong>status</strong> bahasa dibandingkan bahasa lain di Indonesia. Bahasa Indonesia punya dua kedudukan, dirumuskan dalam <strong>Seminar Politik Bahasa Nasional, Jakarta, 25–28 Februari 1975</strong>:</p>
<ol><li><strong>Bahasa nasional (persatuan)</strong>, bersumber dari ikrar ketiga <strong>Sumpah Pemuda 1928</strong>.</li><li><strong>Bahasa negara (resmi)</strong>, bersumber dari <strong>UUD 1945 Bab XV Pasal 36</strong>: “Bahasa negara ialah bahasa Indonesia.”</li></ol>
<p>Trik mengingat: <strong>Sumpah Pemuda → nasional</strong> (dari rakyat, sebelum merdeka); <strong>UUD → negara</strong> (dari negara, setelah merdeka).</p>
<p>Menurut Alwi dkk. (2003), penting tidaknya suatu bahasa diukur dari <strong>jumlah penutur, luas penyebaran, dan peran sebagai sarana ilmu, seni, dan budaya</strong>. Dari jumlah penutur asli, bahasa Indonesia kalah dari bahasa daerah tertentu (karena bahasa daerah adalah bahasa ibu), tetapi dari sisi sarana ilmu dan pemersatu, bahasa Indonesia jauh lebih penting.</p>`, "Bagian 4 • Kedudukan & Fungsi"),
    kedudukan,
    A("Lingkup Internasional", `<ul><li>Data Kemenlu (2012): <strong>4.463.950</strong> penutur asli di luar negeri, terbanyak ke-5 di luar negara asalnya.</li><li>Hingga 2025, penutur bahasa Indonesia di dunia mencapai sekitar <strong>300 juta</strong> jiwa.</li><li>Ho Chi Minh City (Vietnam) menjadikan bahasa Indonesia <strong>bahasa asing kedua</strong> sejak Desember 2007.</li><li>Diajarkan di Australia, Amerika, Kanada, Vietnam, Rusia, Korea, Jepang, Jerman. Di Australia, bahasa Indonesia termasuk bahasa asing yang paling diminati.</li><li>Program <strong>BIPA</strong> (Bahasa Indonesia bagi Penutur Asing): hingga Juni 2025 ada <strong>772 lembaga di 57 negara</strong>; pelajarnya dibagi tingkat <strong>pemula, menengah, lanjut</strong>.</li><li>➕ Sejak <strong>20 November 2023</strong>, bahasa Indonesia menjadi salah satu <strong>bahasa resmi Sidang Umum UNESCO</strong>.</li></ul>`, "Bagian 5"),
    A("Fungsi Bahasa", `<p><strong>Fungsi utama</strong> bahasa adalah <strong>alat komunikasi</strong>, lisan maupun tulisan. Fungsi ini mencakup lima fungsi dasar: <strong>expression</strong> (mengungkapkan diri), <strong>information</strong> (menyampaikan informasi), <strong>exploration</strong> (menjelajah/menjelaskan hal baru), <strong>persuasion</strong> (membujuk), dan <strong>entertainment</strong> (menghibur).</p>
<p>Menurut <strong>Chaer & Agustina (2004)</strong>, komunikasi bahasa terdiri atas dua aspek yang bekerja sama:</p>
<ul><li><strong>Aspek linguistik</strong>: tataran <strong>fonologis</strong> (bunyi), <strong>morfologis</strong> (bentuk kata), <strong>sintaksis</strong> (kalimat), yang bersama-sama membentuk <strong>semantik</strong> (makna).</li><li><strong>Aspek paralinguistik</strong>: (1) kualitas ujaran (suara tinggi, terputus-putus), (2) unsur suprasegmental (tekanan, nada, intonasi), (3) jarak dan gerak tubuh, (4) rabaan.</li></ul>
<p>Menurut <strong>Alwi dkk. (2003)</strong> ada empat fungsi bahasa: <strong>pemersatu</strong>, <strong>pemberi kekhasan</strong> (membedakan dari bahasa lain), <strong>pembawa kewibawaan</strong> (pilihan kata yang tepat menunjukkan wibawa penutur), dan <strong>kerangka acuan</strong> (acuan norma/kaidah masyarakat).</p>`, "Bagian 6"),
    komunikasi,
    { type: "table", label: "Tabel Interaktif", title: "Enam Fungsi Khusus Bahasa", headers: ["Bidang", "Peran bahasa", "Ciri/hal yang harus dijaga"],
      rows: [["Sosial", "Komunikasi antarmanusia di tempat tinggal & kerja", "Pesan tersampaikan dengan baik"], ["Pendidikan", "Menyampaikan ilmu pengetahuan", "Bahasa yang menjelaskan ilmu bahasa = <strong>fungsi metalingual</strong>"], ["Hukum", "Menjelaskan ketentuan & kaidah hukum", "Tanda baca, konjungsi, diksi <strong>denotatif</strong> agar tidak multitafsir"], ["Agama", "Menjelaskan ilmu & aturan agama dari bahasa lain (Arab)", "Salah terjemah → salah paham ajaran"], ["Pemerintahan", "Menjelaskan aturan ketatanegaraan", "Bahasa tertulis: UU, keppres, PP"], ["Militer", "Menyampaikan aturan kemiliteran", "Ringkas, tegas, banyak singkatan & akronim; sebagian rahasia"]],
      modes: [{ label: "Contoh hukum", target: "row", row: 2, title: "Satu koma bisa mengubah makna", text: "“Pelaku, yang masih di bawah umur, dibebaskan” (semua pelaku di bawah umur) berbeda dengan “Pelaku yang masih di bawah umur dibebaskan” (hanya yang di bawah umur)." },
        { label: "Potensi perubahan sosial", target: "none", title: "Kurniawan (2008)", text: "Bahasa Indonesia berpotensi menjadi alat perubahan sosial karena (1) terbukti mempersatukan, (2) <strong>demokratis</strong> (tanpa tingkat tutur), (3) <strong>terbuka</strong> (mudah menyerap unsur asing), (4) mulai <strong>mengglobal</strong>." }] },
    A("Ragam Bahasa", `<p>Ragam bahasa adalah <strong>variasi penggunaan bahasa</strong> oleh penuturnya. Bahasa baku hanyalah salah satu ragam, dipakai dalam suasana resmi. Ragam terbentuk secara <strong>alamiah</strong>, dipengaruhi lima faktor:</p>
<ol><li><strong>Letak geografis/daerah</strong>: pegunungan, pesisir, kota melahirkan ragam berbeda.</li><li><strong>Media/sarana</strong>: tulis vs lisan.</li><li><strong>Situasi/kondisi</strong>: santai vs resmi.</li><li><strong>Tingkat pendidikan</strong>.</li><li><strong>Jenis pekerjaan</strong>: istilah polisi berbeda dengan istilah guru.</li></ol>
<p>Jenis ragamnya dikelompokkan dari lima sudut pandang: <strong>penutur, pemakaian, keformalan, media, dan tahap pemerolehan</strong>. Klik diagram di bawah untuk rinciannya.</p>`, "Bagian 7 • Ragam"),
    ragamTree,
    A("Gaya Bahasa dan Etika Berkomunikasi", `<p>Kata <em>style</em> berasal dari bahasa Latin <em>stilus</em>, alat untuk menulis di lempengan lilin. Dalam komunikasi ada tiga gaya:</p>
<ul><li><strong>Gaya resmi</strong>: bentuk lengkap; amanat presiden, berita negara, khotbah, tajuk rencana, pidato, artikel serius.</li><li><strong>Gaya tak resmi</strong>: bahasa standar dalam kesempatan kurang formal; buku pegangan, artikel mingguan, perkuliahan, editorial, kolom.</li><li><strong>Gaya percakapan</strong>: kosakata populer, kadang tidak baku, ada pemendekan kata.</li></ul>
<p>Tiga etika komunikasi (Haryatmoko, 2007): (1) <strong>melindungi pihak yang lemah</strong>, (2) <strong>menyeimbangkan kebebasan berekspresi dan tanggung jawab</strong>, (3) <strong>menghindari dampak negatif/konflik</strong>. ➕ Di media sosial, etika ini berarti tidak merundung, memeriksa fakta sebelum membagikan, dan memilih kata yang santun.</p>`, "Bagian 8"),
    ex("Latihan Interaktif", "Ragam Apa Ini?", ["Contoh", "Ragam keformalan"], ["Beku", "Baku", "Usaha", "Santai", "Akrab"], [
      ["Teks Pembukaan UUD 1945 dibacakan dalam upacara", "Beku", "✓ Polanya tetap, tidak boleh diubah."],
      ["Mahasiswa mempresentasikan makalah di seminar", "Baku"],
      ["Negosiasi harga antara penjual dan pembeli grosir", "Usaha", "✓ Berorientasi hasil."],
      ["“Eh, udah makan belom? Ke kantin yuk!”", "Santai", "✓ Bentuk alegro & tidak baku."],
      ["Dua sahabat: “Gimana?” “Aman.” (sudah saling paham)", "Akrab", "✓ Pendek, tidak lengkap."]
    ])
  ],

  p2: [
    A("Apa Itu Ejaan?", `<p><strong>Ejaan</strong> adalah kaidah cara menggambarkan bunyi bahasa (kata, kalimat, paragraf) dalam bentuk <strong>tulisan</strong>, termasuk pemakaian <strong>tanda baca</strong>. Abidin (2019) menyebutnya seperangkat aturan penulisan bunyi menjadi huruf, kata, dan kalimat.</p>
<p>Pedoman ejaan disebut <strong>umum</strong> karena hanya mengatur hal yang bersifat umum; hal khusus yang belum diatur disesuaikan dengan bertitik tolak pada pedoman umum itu. Ejaan penting karena bahasa <strong>tulis</strong> tidak punya intonasi dan ekspresi wajah: pembaca hanya bisa mengandalkan huruf dan tanda baca untuk menangkap maksud penulis.</p>`, "Bagian 1"),
    A("Perjalanan Ejaan Bahasa Indonesia", `<ol><li><strong>Ejaan van Ophuijsen (1901–1947)</strong>: disusun Charles Adrian van Ophuijsen dibantu Engku Nawawi Gelar Soetan Ma’moer dan Moehammad Taib Soetan Ibrahim. Ciri: <em>j</em> untuk y (<em>jang, sajang</em>), <em>oe</em> untuk u (<em>itoe, oentoeng</em>), tanda diakritik/apostrof untuk bunyi ‘ain (<em>‘akal, sa’at</em>).</li><li><strong>Ejaan Republik/Soewandi (19 Maret 1947–1972)</strong>: oe → u; hamzah & bunyi sentak → k (<em>maklum, rakyat</em>); kata ulang boleh angka 2 (<em>anak2</em>); <em>di</em> selalu serangkai (<em>dirumah, ditulis</em>).</li><li><strong>Ejaan Melindo (1959)</strong>: hasil kerja sama Indonesia–Melayu (Slamet Mulyana & Syeh Nasir bin Ismail), <strong>batal</strong> diberlakukan karena situasi politik (➕ konfrontasi Indonesia–Malaysia).</li><li><strong>EYD (16 Agustus 1972–2015)</strong>: Keppres No. 57/1972. Direvisi 1987 dan 2009 (Permendiknas No. 46/2009).</li><li><strong>PUEBI (30 November 2015–2022)</strong>: Permendikbud No. 50/2015.</li><li><strong>EYD Edisi V (2022–sekarang)</strong>: Keputusan Kepala Badan Bahasa No. 0424/I/BS.00.01/2022.</li></ol>
<p>➕ Perubahan EYD 1972 yang paling terasa: <em>tj → c</em> (tjinta → cinta), <em>dj → j</em> (djalan → jalan), <em>j → y</em> (jang → yang), <em>nj → ny</em>, <em>sj → sy</em>, <em>ch → kh</em>; serta <em>di-</em> sebagai awalan ditulis serangkai, tetapi <em>di</em> sebagai kata depan ditulis terpisah (<em>ditulis</em> vs <em>di rumah</em>).</p>`, "Bagian 2"),
    ejaanDg,
    { type: "table", label: "Tabel Interaktif", title: "Satu Kalimat dalam Empat Ejaan", headers: ["Ejaan", "Tulisan"],
      rows: [["van Ophuijsen (1901)", "Itoe jang saja tjari di roemah."], ["Soewandi (1947)", "Itu jang saja tjari dirumah."], ["EYD (1972)", "Itu yang saya cari di rumah."], ["EYD V (2022)", "Itu yang saya cari di rumah."]],
      modes: [{ label: "Perhatikan", target: "row", row: 1, title: "oe sudah jadi u, tapi j & tj belum", text: "Ejaan Soewandi baru mengganti <em>oe</em> → <em>u</em>; perubahan <em>j → y</em> dan <em>tj → c</em> baru terjadi di EYD 1972. Kata depan <em>di</em> masih ditulis serangkai." }] },
    A("Huruf Kapital", `<p>Huruf kapital dipakai sebagai huruf pertama pada:</p>
<ol><li>Awal kalimat.</li><li>Petikan langsung: Pak Widodo berkata, “<strong>H</strong>ati-hati di perjalanan, Nak.”</li><li>Unsur agama, kitab suci, Tuhan, termasuk kata ganti Tuhan (Islam, Alquran, Tuhan Yang Maha Esa, ➕ “Engkaulah yang Maha…”, “rahmat-Nya”).</li><li>Gelar kehormatan, keturunan, keagamaan <strong>yang diikuti nama orang</strong> (Sultan Agung, Haji Ahmad Dahlan). Tanpa nama orang → kecil: “dilantik menjadi <strong>b</strong>upati”.</li><li>Jabatan <strong>yang diikuti nama orang/instansi/tempat</strong> (Bupati Magelang, Profesor Abdul Mu’ti).</li><li>Unsur nama orang, <strong>kecuali</strong> de, van, der, von, da, bin, binti (J.P. van Bronchost, Abdullah bin Rahmad). Nama orang sebagai satuan/jenis → kecil (mesin diesel, 10 ampere), tetapi singkatannya kapital (N, Pa).</li><li>Nama bangsa, suku, bahasa (suku Sunda, bahasa Indonesia); <strong>tidak</strong> jika menjadi kata turunan (pengindonesiaan, kejawa-jawaan).</li><li>Nama tahun, bulan, hari, hari raya, peristiwa sejarah (bulan Oktober, hari Jumat, Perang Dunia I).</li><li>Nama geografi (Danau Toba, Jalan Pahlawan, ukiran Jepara). <strong>Tidak</strong> jika unsur geografi tanpa nama diri (mendaki gunung) atau nama geografi sebagai penjelas jenis (apel malang, pisang ambon, petai cina).</li><li>Nama resmi negara, lembaga, dokumen resmi, kecuali kata tugas (Republik Indonesia).</li><li>Setiap unsur bentuk ulang sempurna dalam nama lembaga/dokumen/judul (Rancangan Undang-Undang Kelautan).</li><li>Semua kata dalam <strong>judul</strong> buku, majalah, makalah, kecuali kata tugas (di, ke, dari, dan, yang, untuk) yang tidak di awal.</li><li>Singkatan gelar, pangkat, sapaan (S.T., Sdr.).</li><li>Kata kekerabatan <strong>dalam penyapaan/pengacuan</strong> (“Surat Bapak sudah saya terima”), dan kata <strong>Anda</strong>.</li><li>Kata yang menjelaskan perincian: Keterangan, Catatan, Misalnya.</li></ol>`, "Bagian 3 • Huruf"),
    ex("Latihan Interaktif", "Kapital atau Tidak?", ["Kalimat", "Penulisan yang benar"], ["kapital", "kecil"], [
      ["Ia membeli ...pel malang di pasar.", "kecil", "✓ apel malang: nama geografi sebagai penjelas jenis."],
      ["Kami berlibur ke ...anau Toba.", "kapital", "✓ Unsur geografi diikuti nama diri."],
      ["Pamannya baru dilantik menjadi ...upati.", "kecil", "✓ Jabatan tanpa nama orang/tempat."],
      ["Rapat dibuka oleh ...ubernur Jawa Tengah.", "kapital", "✓ Jabatan diikuti nama tempat."],
      ["“Kapan ...apak berangkat?” tanya Rina kepada ayahnya.", "kapital", "✓ Kekerabatan dalam penyapaan."],
      ["Dia tidak mempunyai ...audara di Semarang.", "kecil", "✓ Bukan penyapaan."],
      ["Siti Zaenab ...inti Salim", "kecil", "✓ bin/binti ditulis kecil."],
      ["gerakan ...ejawa-jawaan", "kecil", "✓ Nama suku sebagai bentuk dasar kata turunan."]
    ]),
    A("Huruf Miring dan Huruf Tebal", `<ul><li><strong>Huruf miring</strong>: (1) judul buku, majalah, surat kabar yang dikutip (<em>Suara Pembaruan</em>); (2) menegaskan/mengkhususkan huruf, kata, kelompok kata; (3) nama ilmiah atau ungkapan asing yang belum disesuaikan (<em>Nigella sativa</em>, <em>online</em>). Dalam tulisan tangan, ganti dengan <u>garis bawah</u>.</li><li><strong>Huruf tebal</strong>: judul buku, bab, subbab, daftar isi, daftar tabel, daftar pustaka, indeks, lampiran. ➕ Huruf tebal <strong>tidak</strong> dipakai untuk menegaskan kata dalam kalimat; untuk itu pakai huruf miring.</li></ul>`, "Bagian 4"),
    A("Tanda Baca", `<p>Tujuh tanda baca utama di modul:</p>
<ul><li><strong>Titik (.)</strong>: akhir kalimat; di belakang angka/huruf dalam bagan/daftar; pemisah jam.menit.detik (pukul 1.35.20); pemisah ribuan yang menyatakan <strong>jumlah</strong> (23.500 jiwa) tetapi <strong>tidak</strong> untuk yang bukan jumlah (halaman 47564, tahun 2026); <strong>tidak</strong> di akhir judul dan di belakang alamat/tanggal surat.</li><li><strong>Koma (,)</strong>: perincian (kertas, pena, dan tinta); <strong>sebelum</strong> tetapi/melainkan/sedangkan; memisahkan <strong>anak kalimat yang mendahului</strong> induk kalimat (“Jika hujan, saya tidak datang”) tetapi <strong>tidak</strong> jika anak kalimat di belakang; setelah penghubung antarkalimat (Oleh karena itu, …); petikan langsung; alamat, tempat & tanggal; nama terbalik di daftar pustaka; sebelum gelar akademik (Embun Pagi, S.E.); desimal (12,5 m); mengapit aposisi.</li><li><strong>Titik koma (;)</strong>: memisahkan sumber kutipan; perincian yang sudah berkoma; klausa setara (“Ayah mengurus kebun; ibu memasak.”).</li><li><strong>Titik dua (:)</strong>: sebelum rincian setelah pernyataan lengkap (“…perabot: kursi, meja, lemari”) tetapi <strong>tidak</strong> jika rincian adalah pelengkap; pemerian (tempat : Gedung…); naskah drama; jilid:halaman, surat:ayat (Yasin: 11), kota:penerbit; jam (01:35:20); rasio (2:3).</li><li><strong>Tanda hubung (-)</strong>: kata ulang (anak-anak); tanggal dieja (17-8-2016); <strong>se-</strong> + kapital (se-Indonesia), <strong>ke-</strong> + angka (ke-2), angka + <strong>-an</strong> (2000-an), singkatan kapital + imbuhan (ber-KTP); unsur Indonesia + asing (di-<em>smash</em>).</li><li><strong>Tanda pisah (—)</strong>: mengapit sisipan penjelas; arti “sampai” (1990—2000, Jakarta—Bandung).</li><li><strong>Garis miring (/)</strong>: nomor surat; pengganti dan/atau/tiap (Rp150.000/meter).</li></ul>`, "Bagian 5 • Tanda Baca"),
    ex("Latihan Interaktif", "Pakai Koma atau Tidak?", ["Kalimat", "Koma di tanda ▢?"], ["pakai koma", "tanpa koma"], [
      ["Jika hari ini hujan▢ saya tidak akan datang.", "pakai koma", "✓ Anak kalimat mendahului induk."],
      ["Saya tidak akan datang▢ jika hari ini hujan.", "tanpa koma", "✓ Anak kalimat mengiringi induk."],
      ["Saya ingin datang▢ tetapi hari ini hujan.", "pakai koma", "✓ Sebelum tetapi."],
      ["Oleh karena itu▢ kita harus berhemat.", "pakai koma", "✓ Penghubung antarkalimat."],
      ["Kita memerlukan kursi▢ meja, dan lemari.", "pakai koma", "✓ Perincian."],
      ["Ia lulus dengan IPK 3▢75.", "pakai koma", "✓ Desimal pakai koma."]
    ]),
    A("Singkatan dan Akronim", `<ul><li>Nama orang, gelar, sapaan, pangkat: titik di tiap unsur (A.H. Nasution, Dr. = doktor, dr. = dokter).</li><li>Inisial nama orang: tanpa titik (SDD = Sapardi Djoko Damono).</li><li>Huruf awal tiap kata: kapital tanpa titik (PT, DPR, KTP).</li><li>Singkatan umum lebih dari dua huruf: satu titik di akhir (dst., dll., hlm., yth.). Singkatan dua huruf: titik di tiap huruf (a.n., s.d., u.p.).</li><li>Satuan ukuran, lambang kimia, mata uang: <strong>tanpa titik</strong> (Rp, km, kg, Cu). ➕ Penulisan uang: <strong>Rp50.000,00</strong> (tanpa spasi dan tanpa titik setelah Rp).</li><li>Akronim nama diri: huruf awal kapital (Bulog, Bappenas); akronim huruf awal semua → kapital semua (BIN); akronim bukan nama diri → kecil semua (iptek, rudal, tilang).</li></ul>`, "Bagian 6"),
    A("Angka dan Bilangan", `<ul><li>Bilangan yang dapat dinyatakan dengan <strong>satu atau dua kata</strong> ditulis dengan huruf (tiga kali, dua puluh orang), kecuali dalam perincian berurutan (52 setuju, 15 tidak, 5 abstain).</li><li>Angka untuk <strong>ukuran</strong> (0,5 sentimeter, 5 kg) dan <strong>nilai</strong> (Rp50.000,00, 50%).</li><li>Angka di <strong>awal kalimat</strong> ditulis dengan huruf, atau kalimatnya disusun ulang (“Panitia mengundang 2.500 orang” bukan “2.500 orang diundang panitia”).</li><li>Bilangan besar boleh sebagian huruf (7 triliun rupiah).</li><li>Alamat, nomor bagian karangan/kitab suci pakai angka (Bab II, Pasal 3).</li><li>Peraturan, akta, kuitansi: angka diikuti huruf dalam kurung (1 (satu) tahun; Rp200.000.000,00 (dua ratus juta rupiah)).</li><li>Bilangan tingkat: abad VII, abad ke-7, abad ketujuh (➕ bukan “abad ke-VII”).</li><li>Angka + -an: tanda hubung (5000-an, tahun 1990-an).</li><li>Bilangan sebagai nama geografi: huruf, serangkai (Rajaampat, Simpanglima).</li></ul>`, "Bagian 7"),
    rv("Cek Pemahaman", "Temukan Kesalahannya, Lalu Buka Jawabannya", [
      { prompt: "Harga buku itu Rp. 50.000", answer: "Rp50.000", reason: "Mata uang tanpa titik dan tanpa spasi." },
      { prompt: "Ia meraih juara ke 2 lomba se Jawa", answer: "ke-2 … se-Jawa", reason: "ke- + angka dan se- + kapital memakai tanda hubung." },
      { prompt: "15 mahasiswa hadir dalam rapat itu.", answer: "Lima belas mahasiswa …", reason: "Angka di awal kalimat ditulis dengan huruf." },
      { prompt: "Penduduk desa itu 23500 jiwa", answer: "23.500 jiwa", reason: "Bilangan yang menyatakan jumlah memakai titik ribuan." },
      { prompt: "Prof. Dr. Ir. Ahmad M.Kom.", answer: "Ahmad, M.Kom.", reason: "Koma di antara nama dan gelar akademik di belakangnya." },
      { prompt: "abad ke-VII", answer: "abad VII / abad ke-7", reason: "ke- tidak dipakai dengan angka Romawi." }
    ])
  ],

  p3: [
    A("Bagaimana Kata Terbentuk?", `<p>Kata dalam bahasa Indonesia terbentuk dari tiga unsur utama: <strong>kata dasar</strong>, <strong>kata serapan</strong>, dan <strong>imbuhan</strong>. Kata dasar adalah bentuk yang sudah sesuai ejaan, baik asli maupun serapan yang sudah diadaptasi. Dari kata dasar itulah lahir kata baru lewat pengimbuhan (afiksasi), ➕ pengulangan (reduplikasi), dan pemajemukan (komposisi).</p>`, "Bagian 1"),
    A("Kata Serapan dan Empat Cara Peminjaman", `<p>Bahasa Indonesia menyerap unsur dari bahasa Melayu, daerah, Arab, Portugis, Sanskerta, Prancis, Belanda, dan Inggris. Berdasarkan taraf penyerapannya ada dua golongan:</p>
<ol><li><strong>Belum sepenuhnya terserap</strong>: pengucapan dan penulisannya masih asing (<em>reshuffle, shuttle cock</em>). Ditulis miring.</li><li><strong>Sudah disesuaikan</strong> dengan kaidah bahasa Indonesia, ejaannya diubah seperlunya sehingga masih bisa dibandingkan dengan bentuk asalnya.</li></ol>
<p>Empat cara peminjaman:</p>
<ul><li><strong>Adopsi</strong>: bentuk dan makna diambil utuh (<em>supermarket, plaza</em>).</li><li><strong>Adaptasi</strong>: makna diambil, ejaan disesuaikan (<em>pluralization → pluralisasi, acceptability → akseptabilitas</em>).</li><li><strong>Penerjemahan</strong>: konsep dicari padanannya (<em>overlap → tumpang tindih, try out → uji coba</em>).</li><li><strong>Kreasi</strong>: mirip penerjemahan, tetapi bentuknya tidak harus sepadan jumlah katanya (<em>effective → berhasil guna, spare parts → suku cadang</em>).</li></ul>
<p>➕ Contoh padanan dari Badan Bahasa yang berguna untuk anak SI: <em>download → unduh, upload → unggah, gadget → gawai, online → daring, offline → luring, email → surel, password → kata sandi, hashtag → tagar, screenshot → tangkapan layar</em>.</p>`, "Bagian 2"),
    ex("Latihan Interaktif", "Cara Peminjaman yang Mana?", ["Asal → Indonesia", "Cara"], ["Adopsi", "Adaptasi", "Penerjemahan", "Kreasi"], [
      ["<em>plaza</em> → plaza", "Adopsi", "✓ Bentuk & makna utuh."],
      ["<em>standardization</em> → standardisasi", "Adaptasi", "✓ Ejaan disesuaikan."],
      ["<em>try out</em> → uji coba", "Penerjemahan", "✓"],
      ["<em>spare parts</em> → suku cadang", "Kreasi", "✓ Contoh modul."],
      ["<em>acceptability</em> → akseptabilitas", "Adaptasi", "✓"],
      ["<em>overlap</em> → tumpang tindih", "Penerjemahan", "✓"]
    ]),
    A("Imbuhan (Afiksasi)", `<p>Proses menambahkan imbuhan (afiks) pada bentuk dasar disebut <strong>afiksasi</strong>, hasilnya <strong>kata berimbuhan</strong>. Ada empat posisi imbuhan, lihat diagram:</p>`, "Bagian 3"),
    afiks,
    A("Imbuhan Asing dan Imbuhan Daerah", `<p>Selain imbuhan asli, bahasa Indonesia memakai:</p>
<ul><li><strong>Imbuhan asing</strong> (umumnya dari Inggris/Latin): multi-, anti-, semi-, non-, pra-, infra-, ultra-, bi-, ekstra-, intra-, -is, -isasi.</li><li><strong>Imbuhan daerah</strong> (umumnya dari Sanskerta): tuna-, nara-, pasca-, swa-, panca-, dasa-, sapta-, catur-, maha-, antar-.</li></ul>
<p><strong>Aturan penting:</strong> semua imbuhan ini ditulis <strong>serangkai</strong> dengan kata dasarnya: <em>multifungsi, antivirus, semipermanen, nonformal, pascapanen, tunawisma, swadaya, mahasiswa, antarkota</em>. Kesalahan yang sering muncul: “non formal”, “pasca sarjana”, “anti virus”.</p>
<p>➕ Pengecualian: jika diikuti kata berhuruf awal kapital atau singkatan, pakai tanda hubung: <em>non-Indonesia, pasca-PHK, anti-PKI</em>. Kata <em>Maha</em> untuk Tuhan yang diikuti kata dasar ditulis serangkai (<em>Mahakuasa</em>), tetapi dipisah jika diikuti kata berimbuhan (<em>Maha Pengasih</em>), dan khusus <em>Maha Esa</em> ditulis terpisah.</p>`, "Bagian 4"),
    A("Peluluhan meN- dan peN-", `<p>Imbuhan <strong>meN-</strong> dan <strong>peN-</strong> (N = bunyi sengau yang berubah-ubah: m, n, ng, ny, nge) paling sering membuat salah tulis. Aturannya:</p>
<ul><li>Jika kata dasar diawali <strong>K, T, S, P</strong> lalu <strong>vokal</strong>, huruf awal itu <strong>luluh</strong>: konsumsi → mengonsumsi, telaah → menelaah, survei → menyurvei, pelihara → memelihara.</li><li>Jika diawali <strong>gugus konsonan</strong> (kr, tr, sp, pr…), huruf awal <strong>tidak luluh</strong>: mengkritik, mentransfer, mensponsori, memprotes.</li><li>Kasus khusus: <strong>pemrotes</strong> (bukan pemprotes).</li></ul>
<p>➕ Variasi bentuk meN-: <em>me-</em> (melatih, merasa, menyanyi), <em>mem-</em> (membaca, memfitnah), <em>men-</em> (mendengar, mencari), <em>meng-</em> (menggali, mengambil), <em>meny-</em> (menyapu ← sapu), <em>menge-</em> untuk kata dasar satu suku kata (mengecat, mengebom, mengelas).</p>`, "Bagian 5"),
    peluluhan,
    ex("Latihan Interaktif", "Pilih Bentuk yang Baku", ["Kata dasar + imbuhan", "Bentuk baku"], [], [
      ["meN- + konsumsi", "mengonsumsi", "✓ k luluh.", ["mengonsumsi", "mengkonsumsi"]],
      ["meN- + pengaruh + -i", "memengaruhi", "✓ p luluh.", ["mempengaruhi", "memengaruhi"]],
      ["meN- + taat + -i", "menaati", "✓ t luluh.", ["mentaati", "menaati"]],
      ["meN- + protes", "memprotes", "✓ Gugus pr tidak luluh.", ["memrotes", "memprotes"]],
      ["meN- + sukses + -kan", "menyukseskan", "✓ s luluh.", ["mensukseskan", "menyukseskan"]],
      ["meN- + cat", "mengecat", "✓ Satu suku kata → menge-.", ["mencat", "mengecat"]],
      ["peN- + kritik", "pengkritik", "✓ Gugus kr.", ["pengritik", "pengkritik"]]
    ]),
    A("Diksi: Memilih Kata yang Tepat", `<p><strong>Diksi</strong> adalah pemilihan kata agar gagasan terungkap secara tepat, baik dari segi <strong>makna</strong> maupun <strong>nilai rasa</strong> (Sugihastuti & Saudah, 2019). Pertimbangkan <strong>situasi, tema, tujuan, dan lawan bicara</strong>.</p>
<p>Empat jenis makna yang perlu dipahami (Abidin, 2019):</p>
<ul><li><strong>Leksikal</strong>: makna menurut kamus (<em>kepala</em> = bagian tubuh di atas leher).</li><li><strong>Gramatikal</strong>: makna karena proses gramatikal/konteks (<em>berlari</em> = melakukan lari; <em>kepala sekolah</em>).</li><li><strong>Denotasi</strong>: makna sebenarnya tanpa nilai rasa (<em>kencing</em>).</li><li><strong>Konotasi</strong>: makna dengan nilai rasa positif/negatif (<em>ke belakang</em> lebih halus).</li></ul>
<p>Empat syarat diksi menurut modul:</p>
<ol><li><strong>Tepat</strong>: cermati sinonim (benar–betul), konotasi–denotasi, istilah asing (efektif–berhasil guna), kata umum–khusus (melihat → menatap, melirik, mengintip), dan kata mirip (<strong>intensif</strong> = sungguh-sungguh vs <strong>insentif</strong> = tambahan penghasilan).</li><li><strong>Lazim</strong>: umum dipakai dalam konteksnya (“Kucing Shinta <em>mati</em>”, bukan “<em>wafat</em>”).</li><li><strong>Hemat</strong>: tanpa kata mubazir (<em>agar supaya → agar; berbagai faktor-faktor → berbagai faktor; sejak dari → sejak; dan lain sebagainya → dan lain-lain/dan sebagainya</em>).</li><li><strong>Baku</strong>: sesuai kaidah (dibahas berikutnya).</li></ol>`, "Bagian 6 • Diksi"),
    rv("Cek Pemahaman", "Kalimat Ini Melanggar Syarat Diksi Apa?", [
      { prompt: "“Para hadirin sekalian dimohon berdiri.”", answer: "Tidak hemat", reason: "<em>para</em> dan <em>sekalian</em> sudah bermakna jamak: cukup “Hadirin dimohon berdiri.”" },
      { prompt: "“Ayam peliharaan Pak RT wafat semalam.”", answer: "Tidak lazim", reason: "<em>Wafat</em> untuk manusia terhormat; untuk hewan pakai <em>mati</em>." },
      { prompt: "“Karyawan berprestasi diberi intensif.”", answer: "Tidak tepat (kata mirip)", reason: "Yang dimaksud <em>insentif</em>." },
      { prompt: "“Kita harus menganalisa data ini.”", answer: "Tidak baku", reason: "Baku: <em>menganalisis</em> (dari analisis)." },
      { prompt: "“Dia naik ke atas panggung.”", answer: "Tidak hemat", reason: "<em>naik</em> sudah berarti ke atas." }
    ]),
    A("Kata Baku", `<p>Ragam formal memakai <strong>kata baku</strong>, ragam tidak formal boleh memakai kata tidak baku (Ermanto & Emidar, 2018). Kata baku adalah kata yang sesuai kaidah dan sudah diterima sebagai ragam resmi (Tantawi, 2019). Kata baku bisa berupa kata dasar dengan huruf yang tepat, kata berimbuhan sesuai kaidah, atau kata serapan yang sudah diadaptasi.</p>
<p>➕ Cara memeriksa: gunakan <strong>KBBI Daring</strong> (kbbi.kemdikbud.go.id). Jika kata yang dicari ditandai “bentuk tidak baku dari …”, gunakan bentuk yang ditunjuk.</p>
<p>➕ Pola yang membantu menghafal: <em>-asi/-isasi</em> dari -ation (organisasi); <em>-is</em> dari -ysis bukan “-a” (analisis, hipotesis, diagnosis); <em>-tas</em> dari -ty (aktivitas, kualitas, kreativitas); <em>kw</em> → <em>ku</em> (kualitas, kuitansi, frekuensi); <em>-ik</em> → <em>-ek</em> pada apotek; <em>praktik</em> bukan praktek; <em>teoretis</em> bukan teoritis.</p>`, "Bagian 7"),
    { type: "table", label: "Tabel Interaktif", title: "Kata Baku yang Paling Sering Salah", headers: ["Tidak baku", "Baku", "Tidak baku", "Baku"],
      rows: [["antri", "antre", "nafas", "napas"], ["apotik", "apotek", "nasehat", "nasihat"], ["analisa", "analisis", "obyek", "objek"], ["aktifitas", "aktivitas", "praktek", "praktik"], ["ijin", "izin", "resiko", "risiko"], ["jaman", "zaman", "sekedar", "sekadar"], ["kwalitas", "kualitas", "silahkan", "silakan"], ["merubah", "mengubah (ubah)", "sistim", "sistem"], ["hutang", "utang", "tehnik", "teknik"], ["karir", "karier", "jadual", "jadwal"], ["seksama", "saksama", "nampak", "tampak"], ["meminimalisir", "meminimalkan", "terlanjur", "telanjur"]],
      modes: [{ label: "Jebakan “merubah”", target: "row", row: 7, title: "rubah = hewan", text: "Kata dasarnya <em>ubah</em>, jadi meN- + ubah = <strong>mengubah</strong>. “Merubah” berarti menjadi rubah 🦊." },
        { label: "Jebakan “meminimalisir”", target: "row", row: 11, title: "Dari kata dasar minimal", text: "Bentuk baku: <strong>meminimalkan</strong>. Akhiran -isir berasal dari bahasa Belanda (-iseren) dan tidak baku." }] }
  ]
};

Object.assign(MB, require("./materi_bindo_p4.js"), require("./materi_bindo_p56.js"), require("./materi_bindo_p78.js"));
{ const TU = require("./materi_bindo_tutor.js"); MB.p2 = MB.p2.concat(TU.p2); MB.p3 = MB.p3.concat(TU.p3); }
