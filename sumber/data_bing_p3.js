// Bahasa Inggris — Pertemuan 3: New Cutting Edge Elementary, Module 3 "Everyday life"
const LAB3 = require("./lab_tahap3.js");
const Q = (q, opts, ans, exp) => ({ q, opts, ans, exp });
const ex = (label, title, headers, opts, rows, preview) => ({ type: "exercise", label, title, preview, headers, rows: rows.map(([c, a, h]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓ " + (h || "Benar!") })) });
const free = (label, title, preview, rows) => ({ type: "exercise", label, title, preview, headers: ["Soal", "Jawaban"], rows: rows.map(([c, a, ok]) => ({ cells: [c], fields: [{ answer: a, placeholder: "ketik jawaban" }], ok: "✓ " + (ok || "Benar!") })) });
module.exports = {
  id: "p3", nomor: 3, judul: "Module 3: Everyday Life (Present Simple I/you/we/they)", ujian: "CPMK 1",
  hero: {
    badge: "New Cutting Edge Elementary • Module 3",
    title: "Ceritakan Rutinitas Harianmu",
    text: "<strong>Present simple</strong> untuk kebiasaan dan fakta (I, you, we, they), <strong>do/don't</strong> untuk tanya dan negatif, kata kerja sehari-hari, <strong>jam dan hari</strong>, serta preposition <strong>in/on/at</strong>."
  },
  cheatsheet: [
    { type: "callout", tone: "tip", heading: "Kapan memakai present simple?", html: "Untuk hal yang <strong>rutin, kebiasaan, atau fakta umum</strong>: <em>I live in a flat. We go out a lot. Most British people live in houses.</em> Bukan untuk yang sedang terjadi sekarang (itu present continuous: <em>I'm eating</em>)." },
    { type: "table", label: "Interaktif 1 • Pola Present Simple", title: "I / You / We / They", headers: ["Bentuk", "Rumus", "Contoh"],
      rows: [["Positif (+)", "S + V1", "I live in Dubai. They speak Italian."], ["Negatif (−)", "S + don't + V1", "We don't have a big lunch. I don't work in an office."], ["Pertanyaan (?)", "Do + S + V1 …?", "Do you live in a flat? Do they go to school?"], ["Jawaban singkat", "Yes, S do. / No, S don't.", "Yes, I do. / No, we don't."], ["Wh- question", "Wh- + do + S + V1?", "What time do you get up? Where do you work?"]],
      modes: [
        { label: "Kata kerja", target: "col", col: 1, title: "V1 tanpa perubahan", text: "Untuk I/you/we/they, kata kerja tetap bentuk dasar. (Untuk he/she/it ditambah -s, dibahas di Module 4/P5.)" },
        { label: "do/don't", target: "row", row: 1, title: "don't = do not", text: "Setelah don't kata kerja tetap bentuk dasar: <em>I don't <strong>like</strong></em>, bukan <em>I don't likes</em>." },
        { label: "Pelafalan", target: "row", row: 2, title: "Do you = /djə/", text: "Diucapkan cepat dan lemah: “dyə live in a big city?”. Tekanan pada kata penting: <em>LIVE, BIG CITY</em>." }
      ] },
    { type: "table", label: "Interaktif 2 • Kolokasi Kata Kerja", title: "Kata Kerja Umum + Pasangannya", headers: ["Verb", "Pasangan dari modul"],
      rows: [["live", "in a flat, in a big city, in London, with my parents, in a small town"], ["work", "for a big company, long hours, in an office"], ["speak", "English, Russian, Chinese"], ["go", "to English classes, out a lot, to the cinema a lot"], ["study", "at university, a lot, economics, law"], ["eat", "fish, a lot of chocolate, in restaurants a lot, meat"], ["drink", "tea, coffee, beer, lemonade"]],
      modes: [
        { label: "Jebakan go", target: "row", row: 3, title: "go to vs go out", text: "<em>go <strong>to</strong> the cinema</em> (ke tempat), tetapi <em>go out</em> (keluar/jalan-jalan) dan <em>go home</em> (tanpa to!)." },
        { label: "Jebakan live", target: "row", row: 0, title: "live in / live with", text: "<em>in</em> + tempat, <em>with</em> + orang." }
      ] },
    { type: "choices", style: "pills", label: "Interaktif 3 • Membaca Jam", title: "Days and Times", options: [
      { label: "o'clock", tone: "sky", title: "Tepat", code: "4.00 = four o'clock", text: "It's four o'clock in London." },
      { label: "past", tone: "emerald", title: "Lewat (menit 1–30)", code: "6.05 = five past six • 8.15 = quarter past eight • 9.30 = half past nine", text: "Menit + <strong>past</strong> + jam yang sedang berjalan." },
      { label: "to", tone: "rose", title: "Kurang (menit 31–59)", code: "10.40 = twenty to eleven • 3.50 = ten to four • 9.55 = five to ten", text: "Sisa menit + <strong>to</strong> + jam <strong>berikutnya</strong>. ⚠️ half past nine = 09.30, bukan “setengah sembilan”!" },
      { label: "Digital", tone: "amber", title: "Cara cepat", code: "7.15 = seven fifteen • 2.45 = two forty-five", text: "Boleh dibaca langsung jam + menit." }
    ] },
    { type: "table", label: "Interaktif 4 • Preposition Waktu", title: "in / on / at", headers: ["Preposition", "Dipakai untuk", "Contoh"],
      rows: [["at", "jam, night, the weekend (BrE)", "at four o'clock, at night, at the weekend"], ["on", "hari, tanggal", "on Sunday, on Sundays, on 14 November"], ["in", "bagian hari, bulan, tahun", "in the morning, in the afternoon, in the evening"]],
      modes: [
        { label: "Jebakan", target: "row", row: 0, title: "at night", text: "in the morning/afternoon/evening, tetapi <strong>at night</strong>." },
        { label: "Kebiasaan", target: "row", row: 1, title: "on Sundays", text: "Hari + s = setiap hari itu: <em>Most shops open on Sundays.</em>" }
      ] },
    { type: "list", label: "Ringkas • Daily Routines", title: "Rutinitas Harian & Ungkapan", groups: [
      { title: "Kegiatan", tone: "emerald", items: ["get up (early), go to bed (late), sleep", "have breakfast / lunch / dinner", "go to school/university/work, catch the bus", "come home, watch TV, read the newspaper", "have a bath / have a shower"] },
      { title: "Mencari kesamaan", tone: "sky", items: ["Me, too. (setuju dengan kalimat positif)", "Me, neither. (setuju dengan kalimat negatif)", "Really? I do. / Oh, I don't. (berbeda)", "How about you?", "We both live with our parents."] },
      { title: "Hari", tone: "amber", items: ["Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday", "Selalu huruf kapital", "the weekend = Saturday & Sunday"] }
    ] }
  ],
  simulator: [
    LAB3.EN_P3,
    LAB3.EN_JAM,
    ex("Permainan Interaktif 1 • Me, too atau Me, neither?", "Setuju dengan Temanmu", ["Kalimat teman", "Responsmu (sama)"], ["Me, too.", "Me, neither."], [
      ["I'm a student.", "Me, too."], ["I don't have breakfast.", "Me, neither."], ["I'm not married.", "Me, neither."], ["I get up very early.", "Me, too."], ["I don't eat meat.", "Me, neither."], ["I live with my parents.", "Me, too."]
    ]),
    free("Permainan Interaktif 2 • Tulis Jamnya", "Ubah Angka Menjadi Kata", "Contoh: 9.55 → five to ten. Gunakan past/to.", [
      ["7.15", ["quarter past seven", "a quarter past seven"]], ["9.30", "half past nine"], ["8.40", "twenty to nine"], ["6.45", ["quarter to seven", "a quarter to seven"]], ["12.05", "five past twelve"], ["2.55", "five to three"], ["3.10", "ten past three"], ["9.35", "twenty-five to ten"]
    ]),
    ex("Permainan Interaktif 3 • in / on / at", "Lengkapi Preposition", ["Kalimat", "Preposition"], ["in", "on", "at"], [
      ["Do you catch a bus ___ the morning?", "in"], ["Where are you normally ___ four o'clock?", "at"], ["Do you study ___ the weekend?", "at", "British English: at the weekend (American: on the weekend)."],
      ["What time do you get up ___ Sundays?", "on"], ["Do you read in bed ___ night?", "at"], ["I have English lessons ___ Tuesday.", "on"], ["We watch TV ___ the evening.", "in"]
    ]),
    free("Permainan Interaktif 4 • do / don't", "Lengkapi Percakapan", "Ketik satu kata (Do/don't/do/live/…).", [
      ["A: ___ you eat meat? B: No, I don't. I only eat fish.", "Do"], ["A: Do your parents speak English? B: Yes, they ___.", "do"],
      ["A: Do you work for a big company? B: No, I ___. I work for a small company.", "don't"], ["A: Where ___ you work?", "do"],
      ["Most people ___ go home for lunch. (negatif)", "don't"], ["A: Do you and your friends go to the cinema a lot? B: Yes, we ___.", "do"]
    ]),
    { type: "reveal", label: "Latihan 5 • Life in Britain vs Indonesia", title: "Benar atau Salah untuk Britain? (ringkasan teks modul)", cols: 2, items: [
      { prompt: "Most British people live in flats.", answer: "False", reason: "Teks: most British people live in houses, and most houses have gardens." },
      { prompt: "Office workers start work at about nine.", answer: "True", reason: "Mulai sekitar 9, selesai sekitar 5–6 sore." },
      { prompt: "People usually go home for lunch.", answer: "False", reason: "Mereka tidak pulang; makan siang hanya a snack, makan besar di malam hari." },
      { prompt: "Children start school when they are four or five.", answer: "True", reason: "Masuk jam 9, pulang sekitar half past three, keluar sekolah umur 16–18." },
      { prompt: "Most shops open on Sunday.", answer: "True", reason: "Banyak supermarket buka 24 jam; pub dan restoran tutup sekitar jam 11 malam." },
      { prompt: "Bagaimana di Indonesia? Tulis satu kalimat.", answer: "Contoh: In Indonesia, most office workers start work at eight o'clock.", reason: "Latihan Practice 2a: bandingkan negaramu dengan Britain." }
    ] }
  ],
  flashcards: [
    { tag: "Grammar", q: "Rumus present simple (+) untuk I/you/we/they?", a: "S + V1: I live in a flat." },
    { tag: "Grammar", q: "Negatif present simple I/you/we/they?", a: "S + don't + V1: We don't have a big lunch." },
    { tag: "Grammar", q: "Pertanyaan present simple?", a: "Do + S + V1? Do you live in a big city? — Yes, I do. / No, I don't." },
    { tag: "Jebakan", q: "I don't likes coffee. Benar?", a: "Salah. Setelah don't selalu V1: I don't like coffee." },
    { tag: "Waktu", q: "8.15 dan 8.45 dalam kata?", a: "quarter past eight; quarter to nine." },
    { tag: "Jebakan", q: "half past nine = jam berapa?", a: "09.30 (lewat setengah jam dari 9), bukan 08.30." },
    { tag: "Waktu", q: "10.40 dalam kata?", a: "twenty to eleven." },
    { tag: "Preposition", q: "in/at untuk morning dan night?", a: "in the morning/afternoon/evening, tetapi at night." },
    { tag: "Preposition", q: "Hari memakai…?", a: "on: on Monday, on Sundays." },
    { tag: "Ungkapan", q: "Me, too vs Me, neither?", a: "Me, too = setuju kalimat positif. Me, neither = setuju kalimat negatif." },
    { tag: "Kosakata", q: "go home atau go to home?", a: "go home (tanpa to)." },
    { tag: "Kosakata", q: "have + makanan/aktivitas?", a: "have breakfast/lunch/dinner, have a bath, have a shower, have a snack." },
    { tag: "Ejaan", q: "Kata berhuruf ganda dari modul?", a: "Ganda: office, wallet, business, dinner, married, bottle, address, normally, tissues, waitress. Tunggal: cousin, holiday, camera, parents." },
    { tag: "Pelafalan", q: "Silent syllable di chocolate, different, restaurant?", a: "choc(o)late = 2 suku, diff(e)rent = 2, rest(au)rant = 2–3; Wed(nes)day juga!" }
  ],
  quiz: [
    Q("I ___ in a flat in the city centre.", ["live", "lives", "living", "am live"], 0, "I + V1."),
    Q("We ___ to the cinema a lot.", ["go", "goes", "are go", "going"], 0, "We + V1."),
    Q("Bentuk negatif yang benar…", ["They don't speak Italian.", "They doesn't speak Italian.", "They not speak Italian.", "They don't speaks Italian."], 0, "they + don't + V1."),
    Q("“___ you live in a big city?” “No, I don't.”", ["Do", "Are", "Does", "Is"], 0, "Pertanyaan present simple dengan you memakai do."),
    Q("“Do your parents speak English?” “Yes, ___.”", ["they do", "they are", "they speak", "they does"], 0, "Short answer: Yes, they do."),
    Q("“What time ___ you get up?” “At about seven o'clock.”", ["do", "are", "is", "does"], 0, "Wh- + do + you + V1."),
    Q("Pasangan kolokasi yang benar…", ["work long hours", "speak to English classes", "drink economics", "study fish"], 0, "work long hours / for a big company."),
    Q("Pilih yang benar…", ["go home", "go to home", "go at home", "go in home"], 0, "home tidak memakai to setelah go."),
    Q("6.05 dibaca…", ["five past six", "five to six", "six past five", "half past six"], 0, "Menit ≤ 30 → past."),
    Q("3.50 dibaca…", ["ten to four", "ten past three", "fifty to four", "ten to three"], 0, "Sisa 10 menit menuju jam 4."),
    Q("“It's half past nine.” Jamnya…", ["09.30", "08.30", "09.15", "09.45"], 0, "Setengah jam lewat dari jam 9."),
    Q("“It's quarter past eight.” Jamnya…", ["08.15", "07.45", "08.45", "08.25"], 0, "quarter = 15 menit."),
    Q("Do you study ___ the weekend?", ["at", "in", "on", "to"], 0, "British English di modul: at the weekend."),
    Q("What time do you get up ___ Sundays?", ["on", "in", "at", "to"], 0, "Hari memakai on."),
    Q("Do you read in bed ___ night?", ["at", "in", "on", "to"], 0, "at night (pengecualian)."),
    Q("A: “I don't have breakfast.” B (sama): “___”", ["Me, neither.", "Me, too.", "Me, also.", "Me, either not."], 0, "Kalimat negatif → Me, neither."),
    Q("A: “I live with my parents.” B (berbeda): “___”", ["Really? I don't.", "Me, too.", "Me, neither.", "Yes, I live."], 0, "Berbeda dari kalimat positif → I don't."),
    Q("Menurut teks Life in Britain, office workers biasanya makan siang…", ["hanya snack", "pulang ke rumah", "makan besar", "tidak makan"], 0, "They just have a snack at lunchtime."),
    Q("Kata yang TIDAK cocok (odd one out): coffee / meat / tea", ["meat", "coffee", "tea", "semua cocok"], 0, "coffee & tea minuman, meat makanan."),
    Q("Kalimat yang SALAH…", ["I doesn't work in an office.", "I don't work in an office.", "We work long hours.", "Do they eat fish?"], 0, "I memakai don't."),
    Q("Pasangan kata kerja yang berlawanan: start ↔ ___", ["finish", "open", "go", "eat"], 0, "start–finish, open–close, go to work–go home."),
    Q("Dalam “Do you live in a big city?”, kata yang diucapkan lemah /djə/ adalah…", ["Do you", "live", "big", "city"], 0, "Kata penting (live, big city) diberi tekanan.")
  ],
  ringkasan: `*RANGKUMAN P3 BAHASA INGGRIS: EVERYDAY LIFE*
1️⃣ Present simple = kebiasaan & fakta. I/you/we/they + V1.
2️⃣ (−) don't + V1 • (?) Do + S + V1? • Yes, I do. / No, I don't.
3️⃣ Kolokasi: live in/with, work for/long hours, go to/out/home, have breakfast/a shower.
4️⃣ Jam: five past six (6.05), quarter past eight, half past nine (9.30), twenty to eleven (10.40).
5️⃣ at four o'clock / at night / at the weekend • on Sunday(s) • in the morning.
6️⃣ Me, too (positif) • Me, neither (negatif).`
};
