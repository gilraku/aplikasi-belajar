// Bahasa Inggris — Pertemuan 4: CPMK 1 (ulasan P1–P3). File modul P4 yang diunggah sama persis dengan P3 (Module 3).
// Bank soal = gabungan kuis P1–P3 diberi label + soal lintas. Latihan buatan sendiri, bukan soal ujian asli.
const Q = (q, opts, ans, exp) => ({ q, opts, ans, exp });
const clone = o => JSON.parse(JSON.stringify(o));
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a, h]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓ " + (h || "Benar!") })) });
const lintas = [
  Q("[Lintas] <em>She is an engineer.</em> Kelas kata <em>engineer</em> adalah…", ["Noun", "Verb", "Adjective", "Adverb"], 0, "P1 + P2: nama pekerjaan = noun, didahului article an."),
  Q("[Lintas] <em>They don't work on Sundays.</em> Kata <em>don't</em> berfungsi sebagai…", ["Auxiliary verb", "Main verb", "Preposition", "Conjunction"], 0, "P1 + P3: do/don't = auxiliary."),
  Q("[Lintas] Pilih kalimat yang benar…", ["Are you a student? Do you study law?", "Do you a student? Are you study law?", "Are you a student? Are you study law?", "Do you are a student? Do you study law?"], 0, "P2 + P3: be untuk keterangan, do untuk kata kerja."),
  Q("[Lintas] <em>We usually have lunch <u>at</u> half past twelve.</em> Kata <em>at</em> adalah…", ["Preposition of time", "Preposition of place", "Conjunction", "Adverb"], 0, "P1 + P3."),
  Q("[Lintas] Terjemahan “Saya tidak menikah dan saya tidak tinggal dengan orang tua.”", ["I'm not married and I don't live with my parents.", "I don't married and I'm not live with my parents.", "I'm not married and I'm not live with my parents.", "I not married and I don't lives with my parents."], 0, "P2 + P3."),
  Q("[Lintas] <em>Me, neither</em> adalah respons yang tepat untuk…", ["I'm not a teacher.", "I'm a teacher.", "I live in Jakarta.", "I get up early."], 0, "P3: setuju dengan kalimat negatif."),
  Q("[Lintas] <em>My friends and I</em> diganti dengan pronoun…", ["We", "They", "Us", "Our"], 0, "P1: aku + teman = we (subjek)."),
  Q("[Lintas] “Where ___ your parents live?” “They ___ in Surabaya.”", ["do / live", "are / live", "do / lives", "are / living"], 0, "P3: do + S + V1; they + V1."),
  Q("[Lintas] Kata yang memakai article <em>an</em>…", ["electrician", "lawyer", "shop assistant", "footballer"], 0, "P2: bunyi vokal e."),
  Q("[Lintas] <em>Most shops close at six, <u>but</u> supermarkets stay open twenty-four hours.</em> <em>but</em> termasuk…", ["Coordinating conjunction", "Subordinating conjunction", "Preposition", "Pronoun"], 0, "P1 + P3: FANBOYS.")
];
const bank = [1, 2, 3].flatMap(n => clone(require(`./data_bing_p${n}.js`).quiz).map(q => Object.assign(q, { q: `[P${n}] ${q.q}` }))).concat(lintas);
module.exports = {
  id: "p4", nomor: 4, judul: "CPMK 1: Ulasan P1–P3 (Parts of Speech, to be, Present Simple)", ujian: "CPMK 1",
  hero: {
    badge: "Materi 4 • CPMK 1",
    title: "Satu Halaman untuk Persiapan CPMK 1",
    text: "File modul P4 isinya sama dengan P3 (Module 3: Everyday Life), jadi pertemuan ini dijadikan <strong>ulasan CPMK 1</strong>: parts of speech, <strong>to be</strong>, <strong>a/an</strong>, negara & kebangsaan, <strong>present simple</strong>, jam, dan in/on/at. Tab Kuis berisi <strong>" + bank.length + " soal latihan</strong> gabungan (bukan soal ujian asli)."
  },
  cheatsheet: [
    { type: "callout", tone: "warn", heading: "Strategi CPMK 1", html: "Untuk setiap soal grammar, tanyakan tiga hal: (1) <strong>subjeknya siapa?</strong> (I / he-she-it / you-we-they), (2) <strong>ada kata kerja atau tidak?</strong> (tidak → be, ada → do), (3) <strong>kalimat apa?</strong> (+ / − / ?). Tiga pertanyaan itu menjawab sebagian besar soal P2–P3." },
    { type: "table", label: "Interaktif 1 • Peta Materi", title: "Apa yang Wajib Dikuasai", headers: ["P", "Topik", "Inti"],
      rows: [["1", "Parts of speech", "7 kelas kata; jenis noun/pronoun/verb/adjective/adverb; in/on/at; FANBOYS; morning vs in the morning"], ["2", "Module 1 People and places", "am/is/are, singkatan, Yes I am/No I'm not, Wh- questions, a/an + jobs, country–nationality, kapital"], ["3", "Module 3 Everyday life", "present simple I/you/we/they, do/don't, kolokasi kata kerja, jam past/to, in/on/at waktu, Me too/Me neither"]],
      modes: [
        { label: "Paling sering", target: "row", row: 1, title: "to be", text: "Hampir pasti keluar: memilih am/is/are, jawaban singkat, dan a/an." },
        { label: "Paling menjebak", target: "row", row: 2, title: "be vs do", text: "<em>Are you like…?</em> ✗ → <em>Do you like…?</em> ✓. Dan jam <em>half past nine</em> = 09.30." }
      ] },
    { type: "choices", style: "toggle", label: "Interaktif 2 • be atau do?", title: "Pohon Keputusan Membuat Pertanyaan", options: [
      { label: "Tanpa kata kerja", tone: "sky", title: "→ Am/Is/Are + S …?", code: "Are you from Bandung?  Is she a nurse?  Are they married?", text: "Jawaban: Yes, I am. / No, she isn't." },
      { label: "Dengan kata kerja", tone: "emerald", title: "→ Do + S + V1 …?", code: "Do you live in Bandung?  Do they work long hours?", text: "Jawaban: Yes, I do. / No, they don't." },
      { label: "Wh-", tone: "violet", title: "→ Wh + be/do + S …?", code: "Where are you from?  Where do you live?  What time do you get up?", text: "Kata tanya di depan, sisanya sama dengan pertanyaan yes/no." }
    ] },
    { type: "table", label: "Interaktif 3 • Kesalahan Klasik", title: "Salah → Benar", headers: ["❌ Salah", "✅ Benar", "Aturan"],
      rows: [["I student.", "I'm a student.", "be + a/an"], ["She from Italy.", "She's from Italy.", "wajib be"], ["Yes, I'm.", "Yes, I am.", "positif tidak disingkat di akhir"], ["I have 20 years.", "I'm 20.", "umur pakai be"], ["Are you live here?", "Do you live here?", "kata kerja → do"], ["I don't likes tea.", "I don't like tea.", "setelah don't → V1"], ["go to home", "go home", "home tanpa to"], ["in night", "at night", "pengecualian"], ["half past nine = 08.30", "half past nine = 09.30", "past = lewat"], ["an university", "a university", "dengar bunyinya"]],
      modes: [{ label: "P2", target: "row", row: 2, title: "Short answer", text: "Yes, I am / Yes, she is / Yes, they are." }, { label: "P3", target: "row", row: 4, title: "be vs do", text: "Hanya satu auxiliary per kalimat sederhana." }] },
    { type: "callout", tone: "info", heading: "Catatan file modul", html: "File <em>pertemuan4_binggris.pdf</em> yang diunggah identik dengan file P3 (Module 3, halaman 26–33). Kalau di LMS sebenarnya ada modul lain untuk P4 (mis. <strong>Module 2</strong> yang terlewat), kirimkan filenya supaya halaman ini bisa dilengkapi." }
  ],
  simulator: [
    ex("Permainan Interaktif 1 • Campuran P1–P3", "Pilih Jawaban yang Tepat", ["Kalimat", "Jawaban"], ["am", "is", "are", "do", "don't"], [
      ["___ you from Indonesia?", "are"], ["___ you speak English?", "do"], ["My sister ___ a nurse.", "is"], ["I ___ twenty years old.", "am"], ["We ___ have lunch at home.", "don't"], ["Where ___ your parents live?", "do"], ["Ben and Emily ___ English.", "are"], ["They ___ eat meat. They only eat fish.", "don't"]
    ]),
    { type: "detective", label: "Permainan Interaktif 2 • Detektif Grammar", title: "Temukan 5 Kesalahan di Paragraf Perkenalan", rules: ["be wajib ada", "a/an + pekerjaan", "do/don't + V1", "in/on/at waktu"],
      headers: ["Kalimat 1", "Kalimat 2", "Kalimat 3", "Kalimat 4"],
      rows: [["Hi! My name's Rina.", "I from Malang.", "I'm student.", "I'm nineteen."], ["I live with my parents.", "I don't works on Sunday.", "I get up at six.", "I go to campus in the morning."], ["I have lunch at one.", "I watch TV in night.", "Are you like music?", "Me too, I love music!"]],
      bugs: [
        { row: 0, col: 1, fixed: "I'm from Malang.", explain: "Tanpa kata kerja → wajib be: I'm from…" },
        { row: 0, col: 2, fixed: "I'm a student.", explain: "Pekerjaan tunggal wajib article a/an." },
        { row: 1, col: 1, fixed: "I don't work on Sundays.", explain: "Setelah don't kata kerja bentuk dasar. (on Sundays = setiap Minggu.)" },
        { row: 2, col: 1, fixed: "I watch TV at night.", explain: "in the morning/evening, tetapi at night." },
        { row: 2, col: 2, fixed: "Do you like music?", explain: "like adalah kata kerja → pertanyaan memakai Do." }
      ] },
    { type: "reveal", label: "Latihan 3 • Speaking Drill", title: "Jawab untuk Dirimu Sendiri (klik untuk contoh)", cols: 2, items: [
      { prompt: "What's your full name?", answer: "My full name's …", reason: "Jangan lupa eja: How do you spell that?" },
      { prompt: "Where are you from?", answer: "I'm from … in Indonesia.", reason: "from + kota/negara." },
      { prompt: "What's your job?", answer: "I'm a student. / I'm an IT student.", reason: "a/an!" },
      { prompt: "Do you live with your parents?", answer: "Yes, I do. / No, I don't.", reason: "Pertanyaan do → jawab do." },
      { prompt: "What time do you get up?", answer: "At about half past five.", reason: "at + jam." },
      { prompt: "Do you study at the weekend?", answer: "Yes, I do. I study on Saturdays.", reason: "on + hari." }
    ] }
  ],
  flashcards: [
    { tag: "CPMK 1", q: "Cek 3 langkah sebelum menjawab soal grammar?", a: "Subjek siapa? Ada kata kerja (do) atau tidak (be)? Kalimat +, −, atau ?" },
    { tag: "P1", q: "7 parts of speech?", a: "Noun, pronoun, verb, adjective, adverb, preposition, conjunction." },
    { tag: "P1", q: "FANBOYS?", a: "For, And, Nor, But, Or, Yet, So." },
    { tag: "P2", q: "Short answer untuk Is he married?", a: "Yes, he is. / No, he isn't." },
    { tag: "P2", q: "an atau a: engineer, doctor, actress, university?", a: "an engineer, a doctor, an actress, a university." },
    { tag: "P2", q: "Nationality: Turkey, Korea, Britain, Egypt?", a: "Turkish, Korean, British, Egyptian." },
    { tag: "P3", q: "Pertanyaan present simple untuk they?", a: "Do they + V1? Do they speak Italian?" },
    { tag: "P3", q: "2.45 dan 9.25?", a: "quarter to three; twenty-five past nine." },
    { tag: "P3", q: "at / on / in: night, Sunday, the evening?", a: "at night, on Sunday, in the evening." },
    { tag: "Jebakan", q: "Are you like coffee?", a: "Salah → Do you like coffee?" }
  ],
  quiz: bank,
  ringkasan: `*RANGKUMAN CPMK 1 BAHASA INGGRIS (P1–P3)*
1️⃣ Parts of speech: noun, pronoun, verb, adjective, adverb, preposition, conjunction (FANBOYS).
2️⃣ to be: I am / he-she-it is / you-we-they are. Yes, I am. No, I'm not.
3️⃣ a/an + pekerjaan (lihat bunyi): an engineer, a doctor, a university.
4️⃣ Country→nationality: Spanish, Chinese, Italian, French, Polish.
5️⃣ Present simple: I/you/we/they + V1, don't + V1, Do…? Yes, I do.
6️⃣ be (tanpa kata kerja) vs do (ada kata kerja).
7️⃣ Jam: past (≤30), to (>30), half past nine = 09.30. at night, on Sunday, in the morning.`
};
