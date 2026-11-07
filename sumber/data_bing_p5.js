// Bahasa Inggris — Pertemuan 5: New Cutting Edge Elementary, Module 4 "Loves and hates"
const LAB3 = require("./lab_tahap3.js");
const Q = (q, opts, ans, exp) => ({ q, opts, ans, exp });
const ex = (label, title, headers, opts, rows, preview) => ({ type: "exercise", label, title, preview, headers, rows: rows.map(([c, a, h]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓ " + (h || "Benar!") })) });
const free = (label, title, preview, rows) => ({ type: "exercise", label, title, preview, headers: ["Soal", "Jawaban"], rows: rows.map(([c, a, ok]) => ({ cells: [c], fields: [{ answer: a, placeholder: "ketik jawaban" }], ok: "✓ " + (ok || "Benar!") })) });
module.exports = {
  id: "p5", nomor: 5, judul: "Module 4: Loves and Hates (Present Simple he/she, like + -ing)", ujian: "UTS",
  hero: {
    badge: "New Cutting Edge Elementary • Module 4",
    title: "Ceritakan Apa yang Disukai Orang Lain",
    text: "<strong>Present simple he/she/it</strong> (verb + -s, doesn't, Does…?), <strong>like/love/hate + -ing</strong>, kata kerja aktivitas, <strong>adverbs of frequency</strong>, serta <strong>meminta dengan sopan</strong> (I'd like…, Do you want…?)."
  },
  cheatsheet: [
    { type: "callout", tone: "tip", heading: "Aturan emas Module 4", html: "Untuk <strong>he / she / it</strong> (satu orang/benda selain I dan you), kata kerja positif mendapat <strong>-s/-es</strong>: <em>He hates spiders. She loves dolls.</em> Di negatif dan pertanyaan, <strong>-s pindah ke does</strong>: <em>He <strong>doesn't</strong> like clowns. <strong>Does</strong> she like London?</em>" },
    { type: "table", label: "Interaktif 1 • Pola he/she", title: "Present Simple untuk he / she / it", headers: ["Bentuk", "Rumus", "Contoh"],
      rows: [["Positif (+)", "S + V1-s/es", "She lives in London. He watches TV."], ["Negatif (−)", "S + doesn't + V1", "She doesn't watch TV. (= does not)"], ["Pertanyaan (?)", "Does + S + V1 …?", "Does she miss the USA?"], ["Jawaban singkat", "Yes, she does. / No, she doesn't.", "Does she like London? Yes, she does."], ["Wh- question", "Wh + does + S + V1?", "Where does she come from? What does she think about British people?"]],
      modes: [
        { label: "Jebakan utama", target: "row", row: 2, title: "Tidak ada -s ganda", text: "❌ <em>Does she likes?</em> ✅ <em>Does she like?</em> (NOT: Does she likes?) — catatan langsung dari modul." },
        { label: "Negatif", target: "row", row: 1, title: "doesn't + V1", text: "❌ <em>She doesn't watches</em> ✅ <em>She doesn't watch</em>." },
        { label: "Irregular", target: "row", row: 0, title: "have, go, do", text: "have → <strong>has</strong> (She has hundreds of dolls), go → <strong>goes</strong>, do → <strong>does</strong> (He often does the housework)." }
      ] },
    { type: "table", label: "Interaktif 2 • Ejaan -s / -es / -ies", title: "Aturan Menambah -s (Study modul)", headers: ["Akhiran kata kerja", "Aturan", "Contoh"],
      rows: [["Kebanyakan kata kerja", "+ s", "work → works, know → knows, run → runs"], ["-ss, -sh, -ch, -x, -o", "+ es", "watch → watches, finish → finishes, miss → misses, go → goes, do → does"], ["Konsonan + y", "y → ies", "fly → flies, study → studies, carry → carries"], ["Vokal + y", "+ s", "play → plays, stay → stays, say → says"]],
      modes: [
        { label: "Pelafalan /s/", target: "row", row: 0, title: "Tiga bunyi -s", text: "/s/ books, likes • /z/ loves, newspapers • /ɪz/ watches, places. Bunyi /ɪz/ muncul setelah s, sh, ch, x." },
        { label: "Jebakan y", target: "row", row: 3, title: "play ≠ plaies", text: "Sebelum y ada vokal (a) → cukup tambah s: plays." }
      ] },
    { type: "choices", style: "toggle", label: "Interaktif 3 • like + -ing", title: "Love / Like / Don't mind / Hate", options: [
      { label: "❤️❤️ love", tone: "rose", title: "love + noun / -ing", code: "She loves cycling in London parks.", text: "Sangat suka." },
      { label: "❤️ like", tone: "emerald", title: "like + -ing", code: "Do you like cooking? — No, I don't. I hate it.", text: "Suka. Setelah like/love/hate, kata kerja berikutnya biasanya <strong>-ing</strong>." },
      { label: "😐 okay", tone: "amber", title: "I think … is okay / don't mind ➕", code: "I think swimming is okay. I don't mind cooking.", text: "Biasa saja." },
      { label: "💔 hate", tone: "slate", title: "hate / don't like", code: "He hates spiders. Harrison Ford doesn't like doing housework.", text: "Tidak suka / benci." }
    ] },
    { type: "table", label: "Interaktif 4 • Adverbs of Frequency", title: "Dari 0% sampai 100%", headers: ["Adverb", "Kira-kira", "Contoh"],
      rows: [["always", "100%", "I always read the newspaper in the morning."], ["usually", "±80%", "I usually listen to the radio in the car."], ["often", "±60%", "I often go shopping on Saturday."], ["sometimes", "±40%", "We sometimes eat out."], ["not … often", "±20%", "I don't often write letters."], ["never", "0%", "I never watch football on television."]],
      modes: [
        { label: "Posisi", target: "col", col: 2, title: "Sebelum kata kerja utama", text: "Adverb of frequency diletakkan <strong>sebelum</strong> verb di kalimat positif, dan <strong>setelah don't/doesn't</strong> di kalimat negatif: <em>I don't often…</em>." },
        { label: "➕ Dengan be", target: "row", row: 0, title: "Setelah be", text: "Dengan to be, adverb diletakkan <strong>setelah</strong> be: <em>She is always late.</em>" },
        { label: "Jebakan never", target: "row", row: 5, title: "never sudah negatif", text: "❌ <em>I don't never…</em> ✅ <em>I never…</em>" }
      ] },
    { type: "list", label: "Ringkas • Kosakata & Ungkapan", title: "Activities, Asking Politely", groups: [
      { title: "Verb + noun (Language focus 3)", tone: "emerald", items: ["read a newspaper / a magazine", "go swimming / shopping; go to school / the cinema", "play football / the guitar / computer games", "write a letter / an e-mail", "listen to the radio / CDs", "watch television / a video", "visit friends / your relatives", "have a meal / a shower", "do nothing / your homework"] },
      { title: "Asking politely (Real life)", tone: "sky", items: ["Excuse me. I'd like the bill, please.", "I'd like three lemonades, please.", "I'd like one of those, please. — The chocolate ones? — Yes, please.", "Do you want milk? — No, thanks. I'm fine.", "Do you want a drink? — That's a good idea!", "Anything else? — No, thank you. / Of course, sir. Just a minute."] }
    ] }
  ],
  simulator: [
    LAB3.EN_P5,
    free("Permainan Interaktif 1 • Bentuk he/she", "Tulis Bentuk he/she Kata Kerja", "Contoh: know → knows.", [
      ["study", "studies"], ["listen", "listens"], ["watch", "watches"], ["do", "does"], ["hate", "hates"], ["go", "goes"], ["work", "works"], ["have", "has"], ["fly", "flies"], ["play", "plays"], ["miss", "misses"], ["carry", "carries"]
    ]),
    ex("Permainan Interaktif 2 • do / does / don't / doesn't", "Lengkapi Auxiliary", ["Kalimat", "Auxiliary"], ["do", "does", "don't", "doesn't"], [
      ["‘___ you like swimming?’ ‘No, I don't.’", "do"], ["What time ___ the film finish?", "does"], ["‘Do your parents live near here?’ ‘Yes, they ___.’", "do"], ["Where ___ your boyfriend work?", "does"],
      ["‘Does your mother speak English?’ ‘No, she ___.’", "doesn't"], ["Cameron Diaz ___ watch TV.", "doesn't"], ["I ___ like clowns.", "don't"], ["___ Madonna miss the USA?", "does"]
    ]),
    free("Permainan Interaktif 3 • Adverb di Tempat yang Benar", "Susun Kalimat", "Contoh: in the evening / never / Ellen / studies → Ellen never studies in the evening.", [
      ["me / you / listen to / never", ["You never listen to me"]], ["I / catch / don't / the bus / often", ["I don't often catch the bus"]], ["me / usually / on Sunday / my sister / visits", ["My sister usually visits me on Sunday"]], ["is / she / late / always", ["She is always late"]]
    ]),
    ex("Permainan Interaktif 4 • Asking Politely", "Pasangkan Kalimat Percakapan", ["Kalimat pertama", "Respons"], ["Yes, please.", "It's okay, I've got one, thank you.", "Of course. Just one minute.", "Large ones or small ones?"], [
      ["Do you want the sugar?", "Yes, please."], ["Do you want a dictionary?", "It's okay, I've got one, thank you."], ["I'd like another coffee, please.", "Of course. Just one minute."], ["I'd like two chocolate ice creams.", "Large ones or small ones?"]
    ]),
    { type: "reveal", label: "Latihan 5 • Reading: Star di Luar Negeri", title: "Siapa? Madonna (American star in London) atau Catherine Zeta Jones (British star in Hollywood)?", desc: "Ringkasan teks modul: Madonna tinggal di London dengan suaminya, sutradara Guy Ritchie; ia suka teater, seni, arsitektur, dan pub; suka bersepeda di taman London bersama anak-anaknya; merindukan teman di AS. Catherine berasal dari kota biasa Swansea di Wales, tinggal di Beverly Hills dengan suaminya Michael Douglas; masih suka rugby Wales dan merindukan keluarganya.", cols: 2, items: [
      { prompt: "Who goes to the pub a lot?", answer: "Madonna", reason: "“We often go to our local pub with friends.”" },
      { prompt: "Who comes from an ordinary town?", answer: "Catherine Zeta Jones", reason: "Swansea in Wales." },
      { prompt: "Who likes cycling with her children?", answer: "Madonna", reason: "Cycling in London parks." },
      { prompt: "Who loves rugby?", answer: "Catherine Zeta Jones", reason: "She still loves Welsh rugby." },
      { prompt: "Who thinks Americans work very hard?", answer: "Madonna", reason: "“Americans work more than the British…”" },
      { prompt: "Who misses her family?", answer: "Catherine Zeta Jones", reason: "Ia sering pulang dan membeli rumah di Swansea." }
    ] }
  ],
  flashcards: [
    { tag: "Grammar", q: "Positif he/she untuk like, watch, study, have?", a: "likes, watches, studies, has." },
    { tag: "Grammar", q: "Negatif present simple he/she?", a: "S + doesn't + V1: She doesn't watch TV." },
    { tag: "Jebakan", q: "Does she likes London?", a: "Salah → Does she like London? (-s hanya sekali, di does)." },
    { tag: "Grammar", q: "Short answer Does he…?", a: "Yes, he does. / No, he doesn't." },
    { tag: "Ejaan", q: "Kapan -es?", a: "Setelah -ss, -sh, -ch, -x, -o: misses, finishes, watches, goes." },
    { tag: "Ejaan", q: "Kapan -ies?", a: "Konsonan + y: study → studies, fly → flies. Vokal + y cukup -s: plays." },
    { tag: "Pelafalan", q: "3 bunyi akhiran -s?", a: "/s/ books, likes • /z/ loves, newspapers • /ɪz/ watches, places." },
    { tag: "Grammar", q: "Kata kerja setelah like/love/hate?", a: "Bentuk -ing: I love swimming. She hates doing housework." },
    { tag: "Adverb", q: "Urutan frekuensi?", a: "always > usually > often > sometimes > not often > never." },
    { tag: "Adverb", q: "Posisi adverb of frequency?", a: "Sebelum kata kerja utama; setelah be; setelah don't (I don't often…)." },
    { tag: "Kosakata", q: "play / go / do + ?", a: "play football/the guitar; go swimming/shopping; do your homework/nothing." },
    { tag: "Real life", q: "Meminta dengan sopan di café?", a: "I'd like (= I would like) …, please. Excuse me. I'd like the bill, please." },
    { tag: "Real life", q: "Menawarkan sesuatu?", a: "Do you want …? (lebih sopan ➕: Would you like …?)" },
    { tag: "Real life", q: "Menolak tawaran dengan sopan?", a: "No, thanks. I'm fine. / It's okay, I've got one, thank you." }
  ],
  quiz: [
    Q("She ___ in London with her husband.", ["lives", "live", "living", "is live"], 0, "she + V1-s."),
    Q("He ___ hundreds of dolls.", ["has", "haves", "have", "is have"], 0, "have → has."),
    Q("Harrison Ford often ___ the housework.", ["does", "do", "dos", "doing"], 0, "do → does."),
    Q("Bentuk he/she dari <em>study</em>…", ["studies", "studys", "studyes", "study"], 0, "Konsonan + y → ies."),
    Q("Bentuk he/she dari <em>play</em>…", ["plays", "plaies", "playes", "play"], 0, "Vokal + y → s."),
    Q("Bentuk he/she dari <em>watch</em>…", ["watches", "watchs", "watchies", "watch"], 0, "-ch → es."),
    Q("Cameron Diaz ___ TV.", ["doesn't watch", "don't watch", "doesn't watches", "not watch"], 0, "she + doesn't + V1."),
    Q("“___ she like London?” “Yes, she does.”", ["Does", "Do", "Is", "Has"], 0, "Pertanyaan he/she memakai does."),
    Q("Pertanyaan yang benar…", ["Does she miss the USA?", "Does she misses the USA?", "Do she miss the USA?", "Is she miss the USA?"], 0, "Does + S + V1."),
    Q("“Does your mother speak English?” “No, ___.”", ["she doesn't", "she don't", "she isn't", "she not"], 0, "Short answer dengan doesn't."),
    Q("“Where ___ Catherine Zeta Jones come from?”", ["does", "do", "is", "has"], 0, "Wh + does + S + V1."),
    Q("Kata yang akhiran -s nya dibaca /ɪz/…", ["watches", "likes", "loves", "books"], 0, "Setelah ch → /ɪz/."),
    Q("Do you like ___?", ["cooking", "cook", "to cooking", "cooks"], 0, "like + -ing."),
    Q("Posisi adverb yang benar…", ["I usually listen to the radio in the car.", "I listen usually to the radio in the car.", "Usually I listen to the radio usually.", "I listen to the radio in the car usually always."], 0, "Adverb sebelum kata kerja utama."),
    Q("Kalimat yang benar…", ["I don't often write letters.", "I often don't write letters.", "I don't write often letters.", "I write don't often letters."], 0, "don't + often + V1 (pola modul)."),
    Q("Kalimat yang benar…", ["She is always late.", "She always is late.", "Always she late.", "She late always is."], 0, "Adverb setelah be."),
    Q("“Never” berarti…", ["0% / tidak pernah", "100%", "kadang-kadang", "biasanya"], 0, "never = tidak pernah."),
    Q("Pasangan kata yang benar…", ["play the guitar", "go the guitar", "do the guitar", "listen the guitar"], 0, "play + alat musik/olahraga."),
    Q("Pasangan kata yang benar…", ["listen to the radio", "listen the radio", "watch to the radio", "hear to the radio"], 0, "listen to + sesuatu."),
    Q("Di café, cara sopan meminta tagihan…", ["Excuse me. I'd like the bill, please.", "Give me the bill!", "I want bill.", "Bill, now."], 0, "I'd like = I would like (sopan)."),
    Q("“Do you want milk?” Penolakan sopan…", ["No, thanks. I'm fine.", "No, I don't want you.", "Yes, I'm fine.", "No milk!"], 0, "Ungkapan dari modul."),
    Q("Teresa: “I HATE football… spiders, cats, eating meat.” Pernyataan yang benar…", ["Teresa doesn't like cats.", "Teresa likes football.", "Teresa loves eating meat.", "Teresa doesn't hate spiders."], 0, "Dari profil Findmeafriend.com di modul.")
  ],
  ringkasan: `*RANGKUMAN P5 BAHASA INGGRIS: LOVES AND HATES*
1️⃣ he/she/it + V1-s: lives, watches (-es), studies (-ies), plays, has, goes, does.
2️⃣ (−) doesn't + V1 • (?) Does + S + V1? • Yes, she does / No, she doesn't. (NOT Does she likes)
3️⃣ like/love/hate + -ing: I love swimming. He hates doing housework.
4️⃣ always > usually > often > sometimes > not often > never. Posisi: sebelum verb, setelah be, setelah don't.
5️⃣ play football, go swimming, do homework, listen to the radio.
6️⃣ Sopan: I'd like …, please. Do you want …? No, thanks. I'm fine.`
};
