// Materi Lengkap Bahasa Inggris P3 — Module 3 Everyday life
const { box, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const say = (label, title, items, cols) => ({ type: "say", label, title, cols, items: items.map(x => Array.isArray(x) ? { en: x[0], id: x[1], note: x[2] } : x) });
const free = (label, title, preview, rows) => ({ type: "exercise", label, title, preview, headers: ["Soal", "Jawaban"], rows: rows.map(([c, a, ok]) => ({ cells: [c], fields: [{ answer: a, placeholder: "ketik jawaban" }], ok: "✓ " + (ok || "Benar!") })) });

// Jam analog: setengah kanan = past (hijau), setengah kiri = to (merah)
const cx = 260, cy = 195, r = 150;
const num = [...Array(12)].map((_, i) => { const a = (i + 1) * Math.PI / 6; return text(cx + Math.sin(a) * (r - 22), cy - Math.cos(a) * (r - 22), String(i + 1), { size: 16 }); }).join("");
const clock = diagram({
  label: "Diagram Interaktif", title: "Jam Analog: past dan to", desc: "Klik setiap bagian jam.", minw: 380,
  svg: svg(700, 390,
    `<g data-part="past"><path d="M${cx},${cy} L${cx},${cy - r} A${r},${r} 0 0 1 ${cx},${cy + r} Z" fill="#d1fae5" stroke="#10b981" stroke-width="2"/></g>` +
    `<g data-part="to"><path d="M${cx},${cy} L${cx},${cy + r} A${r},${r} 0 0 1 ${cx},${cy - r} Z" fill="#ffe4e6" stroke="#f43f5e" stroke-width="2"/></g>` +
    num + `<circle cx="${cx}" cy="${cy}" r="5" fill="#0f172a"/>` +
    box(cx - 50, cy - r - 34, 100, 26, "o'clock", "sky", "oc", { size: 12 }) +
    box(cx + r + 6, cy - 13, 96, 26, "quarter past", "emerald", "qp", { size: 11 }) +
    box(cx - 50, cy + r + 8, 100, 26, "half past", "amber", "hp", { size: 12 }) +
    box(cx - r - 102, cy - 13, 96, 26, "quarter to", "rose", "qt", { size: 11 }) +
    box(540, 60, 150, 70, "PAST|menit 1–30", "emerald", "past", { size: 14 }) + box(540, 160, 150, 70, "TO|menit 31–59", "rose", "to", { size: 14 }) +
    box(540, 260, 150, 70, "Contoh|10.40", "violet", "ex", { size: 14 })
  ),
  parts: [
    { id: "oc", label: "o'clock", title: "Tepat", text: "It's four o'clock. ➕ Untuk jam 12 siang: <em>midday/noon</em>, 12 malam: <em>midnight</em>." },
    { id: "past", label: "past", title: "Setengah kanan", text: "Menit + past + jam sekarang: five past six (6.05), twenty-five past three (3.25)." },
    { id: "qp", label: "quarter past", title: "Seperempat lewat", text: "8.15 = (a) quarter past eight." },
    { id: "hp", label: "half past", title: "Setengah lewat", text: "9.30 = half past nine. ⚠️ Bahasa Indonesia “setengah sepuluh”, bahasa Inggris “half past nine”. Jangan terjemahkan langsung!" },
    { id: "to", label: "to", title: "Setengah kiri", text: "Sisa menit + to + jam berikutnya: ten to four (3.50), five to ten (9.55)." },
    { id: "qt", label: "quarter to", title: "Seperempat lagi", text: "6.45 = (a) quarter to seven." },
    { id: "ex", label: "Contoh", title: "10.40", text: "Sisa 20 menit menuju 11 → <strong>twenty to eleven</strong>. Cara digital: ten forty." }
  ]
});

module.exports = [
  A("Isi Module 3", `<p>Module 3 <em>Everyday life</em> membahas <strong>present simple</strong> (positif, negatif, pertanyaan, jawaban singkat) untuk <em>I, you, we, they</em>; kosakata kata kerja umum; bacaan <em>Life in Britain</em>; listening <em>Life in Australia</em>; real life: hari dan jam; rutinitas harian; dan tugas mencari kesamaan dengan teman.</p>`, "Bagian 1"),
  A("Present Simple: Bentuk dan Fungsi", `<p>Present simple menyatakan <strong>kebiasaan</strong> (<em>I go to English classes on Tuesday</em>), <strong>keadaan tetap</strong> (<em>We live in a flat</em>), dan <strong>fakta umum</strong> (<em>Most shops open on Sunday</em>).</p>
<ul><li>(+) <em>I/You/We/They <strong>live</strong> in a house.</em></li><li>(−) <em>I/You/We/They <strong>don't</strong> have a big lunch.</em></li><li>(?) <em><strong>Do</strong> you speak English? — Yes, I do. / No, I don't.</em></li></ul>
<p>Untuk pertanyaan dan negatif kita butuh <strong>do/don't</strong> karena kata kerja biasa tidak bisa dibalik seperti <em>be</em>. Bandingkan: <em>Are you a student?</em> (be) vs <em>Do you study economics?</em> (kata kerja biasa).</p>`, "Bagian 2"),
  { type: "choices", style: "toggle", label: "➕ Tambahan • be vs do", title: "Kapan Are you…? Kapan Do you…?", options: [
    { label: "Ada kata kerja?", tone: "sky", title: "Tidak ada kata kerja → be", code: "Are you married? Is she a doctor? Are they at home?", text: "Kalau keterangannya kata sifat, pekerjaan, tempat, umur: pakai be." },
    { label: "Ada kata kerja", tone: "emerald", title: "Kata kerja biasa → do", code: "Do you work? Do they live here? Do you like pizza?", text: "Kalau ada kata kerja (work, live, like, go): pakai do." },
    { label: "Kesalahan umum", tone: "rose", title: "Jangan dicampur", code: "❌ Are you like pizza?  ❌ Do you are a student?  ❌ I am not like coffee.", text: "Benar: <em>Do you like pizza? Are you a student? I don't like coffee.</em>" }
  ] },
  A("Life in Britain dan Life in Australia", `<p>Bacaan modul menggambarkan kehidupan di Inggris (ringkasan): kebanyakan orang tinggal di <strong>rumah</strong>, bukan flat; pekerja kantor <strong>go to work</strong> sekitar jam sembilan dan <strong>finish</strong> jam lima atau enam; mereka tidak pulang untuk makan siang, cukup <strong>a snack</strong>, dan makan besar di malam hari. Anak <strong>start school</strong> pukul sembilan dan selesai sekitar half past three. Toko <strong>open</strong> jam sembilan dan <strong>close</strong> sekitar jam enam, banyak yang buka hari Minggu, beberapa supermarket buka 24 jam.</p>
<p>Listening <em>Life in Australia</em>: Nicky bertanya tentang rumah, jam sekolah dan kerja, makan siang, jam buka toko, pub, dan kegiatan akhir pekan. Pertanyaannya memakai pola <strong>Do + S + V1</strong> dan <strong>What time/When/What + do</strong>: <em>Do most people live in flats or houses? What time do children go to school? When do shops open and close?</em></p>`, "Bagian 3"),
  clock,
  { type: "table", label: "Latihan Jam", title: "Cocokkan Jam dengan Ucapannya", headers: ["Angka", "Ucapan", "Digital"],
    rows: [["9.55", "five to ten", "nine fifty-five"], ["7.15", "quarter past seven", "seven fifteen"], ["9.30", "half past nine", "nine thirty"], ["8.40", "twenty to nine", "eight forty"], ["6.45", "quarter to seven", "six forty-five"], ["12.05", "five past twelve", "twelve oh five"], ["2.45", "quarter to three", "two forty-five"], ["3.10", "ten past three", "three ten"]],
    modes: [{ label: "Jebakan to", target: "row", row: 3, title: "Jam berikutnya", text: "8.40 → to <strong>nine</strong>, bukan to eight." }, { label: "oh", target: "row", row: 5, title: "05 = oh five", text: "Pada cara digital, menit 01–09 dibaca dengan <em>oh</em>." }] },
  A("Daily Routines dan Find Things in Common", `<p>Kegiatan harian dari modul: <em>sleep, get up early, go to bed late, have breakfast/lunch/dinner, read the newspaper, go to school/university, catch the bus, go to work, come home, watch TV, have a bath, have a shower</em>.</p>
<p>Untuk mencari kesamaan: A: <em>I'm a student.</em> B: <em>Me, too.</em> • A: <em>I'm not married.</em> B: <em>Me, neither.</em> • A: <em>I don't have breakfast.</em> B: <em>Really? I do.</em> • A: <em>I get up very early.</em> B: <em>Oh, I don't.</em> Lalu laporkan: <em>We both live with our parents. We don't get up early.</em></p>`, "Bagian 4"),
  tip("➕ Adverb of frequency (pemanasan untuk P5)", "Untuk rutinitas kita sering menambah <strong>always, usually, often, sometimes, never</strong> sebelum kata kerja: <em>I usually get up at six. I never go to bed early.</em>", "info"),
  say("🔊 Pelafalan", "Silent Syllables & Kata Sulit", [
    { en: "chocolate", id: "2 suku: CHOC-late", note: "Suku tengah -o- tidak dibaca." }, { en: "breakfast", id: "BREK-fəst" }, { en: "camera", id: "CAM-ra" }, { en: "different", id: "DIF-rent" },
    { en: "restaurant", id: "REST-ront" }, { en: "favourite", id: "FAV-rit" }, { en: "Saturday", id: "SAT-ə-day" }, { en: "business", id: "BIZ-nis", note: "Huruf i pertama tidak dibaca." },
    { en: "comfortable", id: "COMF-tə-bəl" }, { en: "dictionary", id: "DIC-shə-nry" }, { en: "Wednesday", id: "WENZ-day", note: "d pertama dan e kedua tidak dibaca." }, { en: "What time do you get up?", id: "Do you = /djə/" }
  ], 4),
  free("Latihan • Tulis Rutinitasmu", "Lengkapi Paragraf (pola dari modul)", "Ketik satu kata yang tepat.", [
    ["I get ___ at about six o'clock.", "up"], ["I have breakfast ___ home.", "at"], ["I come home ___ about five o'clock.", "at"], ["I go to bed ___ eleven.", "at"],
    ["I go to English classes ___ Tuesday.", "on"], ["I study a lot ___ the evening.", "in"], ["I ___ (tidak) watch TV in the morning.", "don't"]
  ])
];
