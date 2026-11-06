// Bahasa Inggris — Pertemuan 8: UTS (ulasan P1–P7)
// Bank soal = gabungan kuis P1–P3 & P5–P7 diberi label (P4 berisi soal yang sama dengan P1–P3) + soal lintas. Latihan, bukan soal ujian asli.
const Q = (q, opts, ans, exp) => ({ q, opts, ans, exp });
const clone = o => JSON.parse(JSON.stringify(o));
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a, h]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓ " + (h || "Benar!") })) });
const lintas = [
  Q("[Lintas] “___ your brother like cooking?” “Yes, he ___. He ___ dinner every evening.”", ["Does / does / cooks", "Do / do / cook", "Does / likes / cook", "Is / is / cooks"], 0, "P5: he → does, short answer does, positif + s."),
  Q("[Lintas] <em>There ___ some milk, but there ___ any eggs.</em>", ["is / aren't", "are / isn't", "is / isn't", "are / aren't"], 0, "P7: milk uncountable (is), eggs jamak (aren't)."),
  Q("[Lintas] <em>She's ___ engineer and she goes to work ___ bus.</em>", ["an / by", "a / by", "an / on", "the / with"], 0, "P2 + P6."),
  Q("[Lintas] <em>My father can ___ but he can't ___ a motorbike.</em>", ["drive / ride", "drives / ride", "drive / drive", "to drive / to ride"], 0, "P6: can + V1; drive a car, ride a motorbike."),
  Q("[Lintas] <em>I usually ___ up at six, but my sister ___ gets up before eight.</em>", ["get / never", "gets / never", "get / don't never", "getting / not"], 0, "P3 + P5."),
  Q("[Lintas] Pilih kalimat yang benar…", ["How many students are there in your class?", "How much students are there in your class?", "How many student is there in your class?", "How much student are there?"], 0, "P7."),
  Q("[Lintas] <em>We have lunch ___ half past twelve ___ Mondays.</em>", ["at / on", "on / at", "in / on", "at / in"], 0, "P1 + P3."),
  Q("[Lintas] Kalimat yang memakai adverb of frequency di posisi yang benar…", ["He is never late, and he always does his homework.", "He never is late, and he does always his homework.", "He is late never, and always he does his homework always.", "Never he is late, and he does his homework always."], 0, "P5: setelah be, sebelum verb utama."),
  Q("[Lintas] Respon yang benar untuk “Would you like some coffee?”", ["Yes, please.", "Yes, I would like any.", "Yes, I like.", "Yes, I do coffee."], 0, "P5 + P7."),
  Q("[Lintas] <em>Andi and Rina ___ from Bali. ___ live in Denpasar.</em>", ["are / They", "is / They", "are / Them", "is / Their"], 0, "P1 + P2 + P3."),
  Q("[Lintas] <em>Excuse me. ___ the bill, please.</em>", ["I'd like", "I like", "I liking", "I want to liking"], 0, "P5."),
  Q("[Lintas] Kata <em>quickly</em> dalam <em>She can speak English quickly</em> adalah…", ["Adverb of manner", "Adjective", "Modal verb", "Noun"], 0, "P1 + P6.")
];
const bank = [1, 2, 3, 5, 6, 7].flatMap(n => clone(require(`./data_bing_p${n}.js`).quiz).map(q => Object.assign(q, { q: `[P${n}] ${q.q}` }))).concat(lintas);
module.exports = {
  id: "p8", nomor: 8, judul: "UTS: Ulasan Materi P1–P7", ujian: "UTS",
  hero: {
    badge: "Materi 8 • UTS Bahasa Inggris",
    title: "Satu Halaman untuk Semua Materi UTS",
    text: "Ulasan <strong>parts of speech</strong>, <strong>to be</strong>, <strong>present simple</strong> (semua subjek), <strong>adverbs of frequency</strong>, <strong>can/can't</strong>, <strong>articles</strong>, <strong>countable/uncountable, some/any, how much/many</strong>, serta ungkapan real life. Tab Kuis berisi <strong>" + bank.length + " soal latihan</strong> gabungan (bukan soal ujian asli). Jadwal tutorial UTS: <strong>14 November 2026</strong>."
  },
  cheatsheet: [
    { type: "callout", tone: "warn", heading: "Strategi UTS", html: "Sebagian besar soal grammar bisa dijawab dengan empat pertanyaan: (1) <strong>Subjeknya</strong> I, he/she/it, atau you/we/they? (2) <strong>Ada kata kerja?</strong> Tidak → be; ada → do/does; ada can → can + V1. (3) <strong>Kalimat apa?</strong> + / − / ?. (4) <strong>Noun-nya</strong> countable atau uncountable? (menentukan a/an, is/are, much/many)." },
    { type: "table", label: "Interaktif 1 • Peta Materi", title: "Apa yang Wajib Dikuasai", headers: ["P", "Topik", "Inti"],
      rows: [["1", "Parts of speech", "7 kelas kata, jenis-jenisnya, in/on/at, FANBOYS"], ["2", "M1 People and places", "am/is/are, short answers, a/an + jobs, nationalities"], ["3", "M3 Everyday life", "present simple I/you/we/they, do/don't, jam, Me too/neither"], ["4", "CPMK 1", "ulasan P1–P3 (modul sama dengan P3)"], ["5", "M4 Loves and hates", "he/she + s, does/doesn't, like + -ing, adverbs of frequency, I'd like"], ["6", "M5 Getting from A to B", "can/can't, a/an/the/zero, transport, airport, tickets"], ["7", "M6 Eating and drinking", "countable/uncountable, there is/are, some/any, how much/many, ordering"]],
      modes: [
        { label: "Paling sering keluar", target: "row", row: 4, title: "-s he/she", text: "Kesalahan nomor satu: lupa -s (she like ✗) atau -s ganda (does she likes ✗)." },
        { label: "Paling menjebak", target: "row", row: 6, title: "much/many & some/any", text: "money, water, homework → much; any di negatif dan pertanyaan, some untuk tawaran." }
      ] },
    { type: "table", label: "Interaktif 2 • Semua Bentuk Present", title: "be • do • does • can dalam Satu Tabel", headers: ["", "be", "present simple (I/you/we/they)", "present simple (he/she/it)", "can"],
      rows: [["+", "She is a nurse.", "They live here.", "He lives here.", "She can drive."], ["−", "She isn't a nurse.", "They don't live here.", "He doesn't live here.", "She can't drive."], ["?", "Is she a nurse?", "Do they live here?", "Does he live here?", "Can she drive?"], ["Short", "Yes, she is.", "Yes, they do.", "Yes, he does.", "Yes, she can."]],
      modes: [
        { label: "Lihat kolom he/she", target: "col", col: 3, title: "-s muncul sekali", text: "lives → doesn't live → Does he live?" },
        { label: "Lihat kolom can", target: "col", col: 4, title: "can tidak pernah berubah", text: "Tanpa do/does, tanpa -s, tanpa to." }
      ] },
    { type: "table", label: "Interaktif 3 • Penentu Noun", title: "Countable vs Uncountable", headers: ["", "Countable", "Uncountable"],
      rows: [["Article", "a/an (a banana)", "— (milk)"], ["There…", "There's a … / There are …", "There's some …"], ["some/any", "some eggs / any eggs", "some milk / any milk"], ["Jumlah", "How many …?", "How much …?"], ["Contoh", "egg, job, coin, student, flight", "milk, money, work, traffic, music"]],
      modes: [{ label: "Jebakan", target: "row", row: 4, title: "job vs work", text: "a job ✓, a work ✗. Coin countable, money uncountable." }] },
    { type: "list", label: "Ringkas • Ungkapan Real Life", title: "Kalimat Siap Pakai", groups: [
      { title: "Perkenalan (P2)", tone: "emerald", items: ["What's your name? How do you spell it?", "Where are you from? What's your job?", "Nice to meet you. — Nice to meet you, too."] },
      { title: "Waktu & rutinitas (P3)", tone: "sky", items: ["What time is it? It's quarter past eight.", "What time do you get up? At about seven.", "Me, too. / Me, neither."] },
      { title: "Café & restoran (P5, P7)", tone: "amber", items: ["I'd like the bill, please.", "Do you want milk? — No, thanks. I'm fine.", "Are you ready to order? Eat in or take away?", "How much is that altogether?"] },
      { title: "Bepergian (P6)", tone: "violet", items: ["A ticket to Paris, please. Single or return?", "Which platform is it? What time does it arrive?", "Your flight is delayed. Please proceed to gate 24."] }
    ] }
  ],
  simulator: [
    ex("Permainan Interaktif 1 • Campuran P2–P7", "Pilih Bentuk yang Tepat", ["Kalimat", "Jawaban"], ["is", "are", "do", "does", "can", "don't", "doesn't"], [
      ["___ your sister speak French?", "does"], ["My parents ___ from Medan.", "are"], ["___ you swim?", "can"], ["He ___ eat meat. He's vegetarian.", "doesn't"], ["Where ___ you live?", "do"], ["There ___ some cheese in the fridge.", "is"], ["We ___ have any eggs.", "don't"], ["What time ___ the train arrive?", "does"]
    ]),
    { type: "detective", label: "Permainan Interaktif 2 • Detektif Grammar", title: "Temukan 6 Kesalahan dalam E-mail Perkenalan", rules: ["he/she + s", "does + V1", "can + V1", "much/many", "article"],
      headers: ["Kalimat 1", "Kalimat 2", "Kalimat 3"],
      rows: [["Hi Teresa! My name's Budi.", "I'm IT student in Bandung.", "My sister live in Jakarta."], ["She works in a bank.", "Does she likes her job? Yes!", "I can to play the guitar."], ["I usually go to campus by the bus.", "I don't have much friends here.", "Please write soon!"]],
      bugs: [
        { row: 0, col: 1, fixed: "I'm an IT student in Bandung.", explain: "Pekerjaan wajib a/an; IT dibaca /aɪ ti:/ (bunyi vokal) → an." },
        { row: 0, col: 2, fixed: "My sister lives in Jakarta.", explain: "Subjek she (my sister) → kata kerja + s." },
        { row: 1, col: 1, fixed: "Does she like her job? Yes!", explain: "Setelah does, kata kerja bentuk dasar." },
        { row: 1, col: 2, fixed: "I can play the guitar.", explain: "can + V1 tanpa to." },
        { row: 2, col: 0, fixed: "I usually go to campus by bus.", explain: "by + kendaraan tanpa article." },
        { row: 2, col: 1, fixed: "I don't have many friends here.", explain: "friends countable jamak → many." }
      ] },
    { type: "reveal", label: "Latihan 3 • Speaking & Writing Drill", title: "Jawab Pertanyaan Ini (klik untuk contoh jawaban)", cols: 2, items: [
      { prompt: "Introduce yourself in three sentences.", answer: "My name's … I'm from … I'm an information systems student.", reason: "P2: be + a/an." },
      { prompt: "Describe your typical day.", answer: "I get up at half past five. I have breakfast at home. I study in the evening.", reason: "P3: present simple + jam." },
      { prompt: "What does your best friend like?", answer: "She loves watching films, but she doesn't like cooking.", reason: "P5: he/she + s, like + -ing." },
      { prompt: "How often do you go to the cinema?", answer: "I don't often go to the cinema. / I sometimes go on Saturdays.", reason: "P5: adverbs of frequency." },
      { prompt: "What can and can't you do in your city?", answer: "You can take a bus. You can't travel by tram.", reason: "P6: can/can't." },
      { prompt: "What is there in your kitchen?", answer: "There's some rice, but there isn't any milk. There are some eggs.", reason: "P7: there is/are, some/any." }
    ] }
  ],
  flashcards: [
    { tag: "UTS", q: "4 pertanyaan sebelum menjawab soal grammar?", a: "Subjek siapa? Ada kata kerja/can? Kalimat +, −, ?; noun countable atau uncountable?" },
    { tag: "P1", q: "morning vs in the morning?", a: "noun vs adverb (keterangan waktu)." },
    { tag: "P2", q: "Short answer Are you married?", a: "Yes, I am. / No, I'm not." },
    { tag: "P3", q: "10.40 dan 9.30?", a: "twenty to eleven; half past nine." },
    { tag: "P5", q: "Does she likes?", a: "Salah → Does she like?" },
    { tag: "P5", q: "Ejaan he/she: study, watch, play, have?", a: "studies, watches, plays, has." },
    { tag: "P5", q: "Posisi always/never?", a: "Sebelum verb utama, setelah be." },
    { tag: "P6", q: "can + ?", a: "V1 tanpa to: She can swim. Can she swim?" },
    { tag: "P6", q: "the USA tapi — Spain?", a: "the untuk negara gabungan/jamak (USA, UK, UAE); negara biasa tanpa article." },
    { tag: "P6", q: "by car, by bus, … foot?", a: "on foot." },
    { tag: "P7", q: "How much atau many: money, students, water, cups?", a: "much money, many students, much water, many cups." },
    { tag: "P7", q: "some atau any di pertanyaan?", a: "any (Is there any milk?), kecuali menawarkan: Would you like some tea?" }
  ],
  quiz: bank,
  ringkasan: `*RANGKUMAN UTS BAHASA INGGRIS (P1–P7)*
1️⃣ Parts of speech: noun, pronoun, verb, adjective, adverb, preposition, conjunction.
2️⃣ be: am/is/are • Yes, I am / No, I'm not • a/an + pekerjaan.
3️⃣ Present simple: I/you/we/they + V1, don't, Do…? • he/she/it + V-s, doesn't, Does…? (NOT does she likes)
4️⃣ like/love/hate + -ing • always > usually > often > sometimes > never.
5️⃣ can/can't + V1 • a/an, the (the USA, the city centre), tanpa article (by bus, go home).
6️⃣ Countable vs uncountable • There's/There are • some (+) any (−/?) • How many / How much.
7️⃣ Jam: past/to • at night, on Sunday, in the morning.
🗓️ Tutorial UTS: 14 November 2026.`
};
