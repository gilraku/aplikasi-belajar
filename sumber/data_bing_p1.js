// Bahasa Inggris — Pertemuan 1: Parts of Speech (slide dosen Septia Ayu Pratiwi, M.Pd)
const Q = (q, opts, ans, exp) => ({ q, opts, ans, exp });
const POS = ["Noun", "Pronoun", "Verb", "Adjective", "Adverb", "Preposition", "Conjunction"];
const ex = (label, title, headers, opts, rows, preview) => ({ type: "exercise", label, title, preview, headers, rows: rows.map(([c, a, h]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓ " + (h || "Benar!") })) });
module.exports = {
  id: "p1", nomor: 1, judul: "Parts of Speech (Kelas Kata)", ujian: "CPMK 1",
  hero: {
    badge: "Dosen: Septia Ayu Pratiwi, M.Pd",
    title: "Kenali Fungsi Kata, Bukan Sekadar Artinya",
    text: "<strong>Parts of speech</strong> adalah kategori yang mengelompokkan kata berdasarkan <strong>fungsinya dalam kalimat</strong>: noun, pronoun, verb, adjective, adverb, preposition, dan conjunction. Satu kata bisa berganti kelas tergantung posisinya."
  },
  cheatsheet: [
    { type: "callout", tone: "tip", heading: "Ide besarnya", html: "Jangan tanya “artinya apa?”, tapi <strong>“tugasnya apa di kalimat ini?”</strong>. Contoh dosen: <em>morning</em> = <strong>noun</strong>, tetapi <em>in the morning</em> = <strong>adverb (keterangan waktu)</strong>. Kata <em>provide</em> punya keluarga: <em>provide</em> (verb) → <em>provided</em> → <em>providing</em> → <em>provision</em> (noun)." },
    { type: "table", label: "Interaktif 1 • Peta 7 Kelas Kata", title: "Tujuh Parts of Speech dari Slide", headers: ["Kelas kata", "Fungsi", "Contoh"],
      rows: [
        ["Noun (kata benda)", "Nama orang, tempat, benda, ide", "book, cat, London, love"],
        ["Pronoun (kata ganti)", "Menggantikan noun", "I, you, he, she, it, we, they, myself, who, this"],
        ["Verb (kata kerja)", "Aksi atau keadaan", "eat, paint, throw, laugh, be, have, do"],
        ["Adjective (kata sifat)", "Menjelaskan noun", "beautiful, smart, tall, one hundred, which"],
        ["Adverb (kata keterangan)", "Menjelaskan verb/adjective/kalimat: cara, tempat, waktu, frekuensi", "happily, here, now, always"],
        ["Preposition (kata depan)", "Hubungan waktu, tempat, arah", "in, on, at, to, into, towards"],
        ["Conjunction (kata hubung)", "Menyambung kata/klausa (connector/bridging)", "and, but, because, either…or"]
      ],
      modes: [
        { label: "Inti kalimat", target: "row", row: 2, title: "Verb wajib ada", text: "Kalimat bahasa Inggris minimal punya <strong>subject + verb</strong>. Kalau tidak ada kata kerja, pakai <em>to be</em> (is/am/are)." },
        { label: "Sering tertukar", target: "row", row: 4, title: "Adjective vs adverb", text: "<em>She is quick</em> (adjective, menjelaskan <em>she</em>) vs <em>She runs quickly</em> (adverb, menjelaskan <em>runs</em>). Banyak adverb of manner = adjective + <strong>-ly</strong>." },
        { label: "Penyambung", target: "row", row: 6, title: "FANBOYS", text: "Coordinating conjunction dihafal dengan <strong>FANBOYS</strong>: For, And, Nor, But, Or, Yet, So." }
      ] },
    { type: "choices", style: "pills", label: "Interaktif 2 • Jenis-jenis Noun", title: "Empat Jenis Noun", options: [
      { label: "Concrete", tone: "sky", title: "Concrete noun", text: "Bisa disentuh, dilihat, dicium, dirasa, didengar: benda fisik, makhluk, sensasi.", code: "table, dog, rain, coffee" },
      { label: "Abstract", tone: "violet", title: "Abstract noun", text: "Ide, kualitas, atau keadaan yang tidak berwujud.", code: "love, freedom, disappointment" },
      { label: "Common vs Proper", tone: "amber", title: "Common vs proper noun", text: "Bedanya di <strong>huruf kapital</strong>. Common = nama umum (city, country). Proper = nama khusus, selalu kapital.", code: "city → Jakarta, country → Indonesia" },
      { label: "Collective", tone: "emerald", title: "Collective noun", text: "Bentuknya tunggal, tetapi maknanya sekelompok.", code: "team, family, class, audience" }
    ] },
    { type: "choices", style: "pills", label: "Interaktif 3 • Jenis-jenis Pronoun", title: "Empat Jenis Pronoun", options: [
      { label: "Personal", tone: "sky", title: "Personal pronoun", code: "I, you, he, she, it, we, they", text: "Kata ganti orang sebagai subjek. Contoh: <em>They read a book in the library.</em>" },
      { label: "Reflexive", tone: "violet", title: "Reflexive pronoun", code: "myself, yourself, himself, herself, itself, ourselves, yourselves, themselves", text: "Pelaku dan sasaran orang yang sama: <em>I taught myself English.</em>" },
      { label: "Interrogative", tone: "amber", title: "Interrogative pronoun", code: "who, what, which, whose (+ where, when, why, how)", text: "Untuk bertanya: <em>Who is he? When is your birthday?</em>", note: "➕ Secara tata bahasa ketat, <em>where/when/why/how</em> termasuk interrogative <strong>adverb</strong>; slide memasukkannya karena sama-sama kata tanya." },
      { label: "Demonstrative", tone: "emerald", title: "Demonstrative pronoun", code: "this, that, these, those", text: "Menunjuk: <em>this</em>/<em>these</em> dekat, <em>that</em>/<em>those</em> jauh. <em>This</em> + verb tunggal, <em>these</em> + verb jamak." }
    ] },
    { type: "table", label: "Interaktif 4 • Tiga Jenis Verb", title: "Transitive, Intransitive, Auxiliary", headers: ["Jenis", "Ciri", "Contoh"],
      rows: [
        ["Transitive", "Butuh objek langsung", "She ate <strong>an apple</strong>. They threw <strong>the ball</strong>."],
        ["Intransitive", "Tanpa objek", "The baby is sleeping. They laughed."],
        ["Auxiliary (be/have/do)", "Membantu membentuk tense, negatif, pertanyaan", "They <strong>are</strong> trying… / I <strong>don't</strong> know. / <strong>Have</strong> you eaten?"]
      ],
      modes: [
        { label: "Uji cepat", target: "row", row: 0, title: "Tanya “apa?”", text: "Setelah verb tanyakan <em>what?</em> Kalau ada jawabannya (ate <em>what?</em> → an apple), verb itu transitive." },
        { label: "Contoh dosen", target: "row", row: 0, title: "provide", text: "<em>Mother provides her children <strong>with</strong> the best education</em> = <em>Mother provides the best education <strong>for</strong> her children</em>. Provide someone <strong>with</strong> something / provide something <strong>for</strong> someone." },
        { label: "Bentuk be", target: "row", row: 2, title: "be lengkap", text: "is, am, are, was, were, be, been, being. have: have, has, had. do: do, does, did." }
      ] },
    { type: "list", label: "Ringkas • Adjective & Adverb", title: "Jenis Adjective dan Adverb", groups: [
      { title: "Adjective", tone: "amber", items: ["<strong>Descriptive</strong>: beautiful, smart, tall", "<strong>Quantitative</strong>: one hundred, colossal, intense", "<strong>Demonstrative</strong>: this/that/these/those + noun (this book)", "<strong>Interrogative</strong>: what/which/whose + noun (which bag?)"] },
      { title: "Adverb", tone: "sky", items: ["<strong>Manner</strong> (cara): happily, quickly, patiently", "<strong>Place</strong> (tempat): here, there, everywhere", "<strong>Time</strong> (waktu): now, then, daily", "<strong>Frequency</strong> (seberapa sering): always, never, sometimes, rarely"] }
    ] },
    { type: "table", label: "Interaktif 5 • Preposition & Conjunction", title: "Kata Depan dan Kata Hubung", headers: ["Kelompok", "Isi", "Contoh"],
      rows: [
        ["Preposition of time", "in (tahun/bulan/bagian hari), on (hari/tanggal), at (jam)", "in 1990, on Sunday, at 7 o'clock"],
        ["Preposition of place", "in, on, at, by, under, above, between, among", "at London, in the library, under the table"],
        ["Preposition of direction", "to, into, towards, along", "go to school, walk into the room"],
        ["Coordinating conjunction", "FANBOYS, menyambung klausa setara", "I'm tired, but I'm happy."],
        ["Subordinating conjunction", "Menyambung anak kalimat ke induk", "after, although, as, because, before"],
        ["Correlative conjunction", "Berpasangan", "not only…but also, neither…nor, either…or"]
      ],
      modes: [
        { label: "Jebakan dosen", target: "row", row: 1, title: "at London", text: "Di slide: <em>at</em> = preposition, <em>London</em> = noun, <em>at London</em> = keterangan tempat. ➕ Untuk kota, penutur asli lebih sering pakai <strong>in</strong> London (tinggal di dalam kota); <em>at</em> dipakai untuk titik/lokasi spesifik (at the station)." },
        { label: "Berpasangan", target: "row", row: 5, title: "Correlative", text: "Kata kerja mengikuti subjek terdekat: <em>Neither my friends nor <strong>my brother is</strong> here.</em>" }
      ] },
    { type: "callout", tone: "info", heading: "Tips belajar dari dosen", html: "Pakai kamus: <strong>Cambridge</strong>, <strong>Oxford</strong>, <strong>Merriam-Webster</strong> (gaya Amerika), Kamusku. Grammar: buku <strong>Betty Azar</strong>. Listening dari BBC Learning English / TED Talks: (1) dengar tanpa subtitle (biasakan aksen), (2) dengar dengan subtitle (pahami isi), (3) <strong>transcribing</strong>: tulis yang terdengar, lengkapi berkali-kali, lalu cocokkan dengan subtitle." }
  ],
  simulator: [
    ex("Permainan Interaktif 1 • Tebak Kelas Kata", "Kata yang Dicetak Tebal Termasuk…", ["Kalimat", "Kelas kata"], POS, [
      ["I read a <strong>book</strong> every night.", "Noun"],
      ["<strong>They</strong> study in the library.", "Pronoun"],
      ["She <strong>paints</strong> beautiful pictures.", "Verb"],
      ["He is a <strong>smart</strong> student.", "Adjective"],
      ["The children laughed <strong>happily</strong>.", "Adverb"],
      ["The cat is <strong>under</strong> the table.", "Preposition"],
      ["I like tea, <strong>but</strong> my sister likes coffee.", "Conjunction"],
      ["Andi is driving <strong>his</strong> car.", "Pronoun", "Possessive (his) termasuk pronoun di slide dosen."],
      ["We <strong>always</strong> have breakfast at home.", "Adverb", "Adverb of frequency."],
      ["<strong>Freedom</strong> is important.", "Noun", "Abstract noun."],
      ["I wake up early <strong>because</strong> I work at seven.", "Conjunction", "Subordinating conjunction."],
      ["She walked <strong>towards</strong> the door.", "Preposition", "Preposition of direction."]
    ]),
    ex("Permainan Interaktif 2 • Satu Kata, Banyak Kelas", "Kata yang Sama, Fungsi Berbeda", ["Kalimat", "Kelas kata"], POS, [
      ["The <strong>morning</strong> is cold.", "Noun"],
      ["I <strong>work</strong> in an office.", "Verb"],
      ["My <strong>work</strong> is interesting.", "Noun"],
      ["She is a <strong>fast</strong> runner.", "Adjective"],
      ["She runs <strong>fast</strong>.", "Adverb", "fast tidak ditambah -ly: bentuk adverb-nya tetap fast."],
      ["<strong>This</strong> is my bag.", "Pronoun", "Berdiri sendiri = demonstrative pronoun."],
      ["<strong>This</strong> bag is mine.", "Adjective", "Diikuti noun = demonstrative adjective."],
      ["I <strong>love</strong> music.", "Verb"],
      ["<strong>Love</strong> is patient.", "Noun"]
    ]),
    ex("Permainan Interaktif 3 • Transitive atau Intransitive?", "Butuh Objek atau Tidak?", ["Kalimat", "Jenis verb"], ["Transitive", "Intransitive"], [
      ["She <strong>ate</strong> an apple.", "Transitive"],
      ["The baby <strong>is sleeping</strong>.", "Intransitive"],
      ["They <strong>threw</strong> the ball.", "Transitive"],
      ["We <strong>laughed</strong> a lot.", "Intransitive", "a lot = keterangan, bukan objek."],
      ["I <strong>provide</strong> meals in the living room.", "Transitive"],
      ["He <strong>runs</strong> every morning.", "Intransitive"],
      ["My mother <strong>loves</strong> flowers.", "Transitive"]
    ]),
    { type: "reveal", label: "Latihan 4 • Analisis Kalimat (gaya dosen)", title: "Beri Label S, V, O, Adv", cols: 3, items: [
      { prompt: "Andi is driving his car.", answer: "S: Andi • V: is driving • O: his car", reason: "his = pronoun (possessive) yang menempel pada objek car." },
      { prompt: "They read a book in the library.", answer: "S: They • V: read • O: a book • Adv: in the library", reason: "in the library = keterangan tempat (preposition + noun)." },
      { prompt: "When is your birthday?", answer: "When = kata tanya • is = verb (be) • your birthday = subjek", reason: "Dalam pertanyaan dengan be, be maju ke depan subjek." },
      { prompt: "Mother provides her children with the best education.", answer: "S: Mother • V: provides • O: her children • with the best education", reason: "Pola: provide + orang + with + sesuatu." },
      { prompt: "They are trying to finish their programming projects.", answer: "S: They • Aux: are • V: trying • O: to finish…", reason: "are = auxiliary verb yang membentuk present continuous." },
      { prompt: "Saya sedang makan → ?", answer: "I am eating.", reason: "Contoh dosen: saya makan = I eat, saya sedang makan = I am eating (auxiliary be + -ing)." }
    ] }
  ],
  flashcards: [
    { tag: "Konsep", q: "Apa itu parts of speech?", a: "Kategori grammatical untuk mengelompokkan kata berdasarkan fungsinya dalam kalimat." },
    { tag: "Konsep", q: "Sebutkan 7 parts of speech di slide.", a: "Noun, pronoun, verb, adjective, adverb, preposition, conjunction. (➕ Kelas ke-8 yang sering disebut: interjection, mis. Wow! Oh!)" },
    { tag: "Noun", q: "Concrete vs abstract noun?", a: "Concrete bisa diindra (book, cat). Abstract berupa ide/keadaan (love, freedom, disappointment)." },
    { tag: "Noun", q: "Common vs proper noun dibedakan oleh…", a: "Huruf kapital. Proper noun (London, Indonesia) selalu diawali kapital." },
    { tag: "Noun", q: "Collective noun?", a: "Bentuk tunggal yang berarti kelompok: team, family, class." },
    { tag: "Pronoun", q: "Reflexive pronoun untuk they?", a: "themselves (we → ourselves, you jamak → yourselves)." },
    { tag: "Pronoun", q: "This/these vs that/those?", a: "This/these = dekat; that/those = jauh. This/that tunggal, these/those jamak." },
    { tag: "Verb", q: "Transitive verb?", a: "Verb yang butuh objek langsung: She ate an apple." },
    { tag: "Verb", q: "Tiga auxiliary verb utama?", a: "be (is/am/are/was/were/been/being), have (have/has/had), do (do/does/did)." },
    { tag: "Adjective", q: "Demonstrative adjective vs pronoun?", a: "Adjective diikuti noun (this book). Pronoun berdiri sendiri (This is mine)." },
    { tag: "Adverb", q: "Empat jenis adverb di slide?", a: "Manner (happily), place (here), time (now), frequency (always)." },
    { tag: "Jebakan", q: "morning vs in the morning?", a: "morning = noun; in the morning = adverb (keterangan waktu)." },
    { tag: "Preposition", q: "in / on / at untuk waktu?", a: "in 1990 / in May / in the morning; on Sunday / on 5 May; at 7 o'clock / at night." },
    { tag: "Conjunction", q: "FANBOYS?", a: "For, And, Nor, But, Or, Yet, So (coordinating conjunctions)." },
    { tag: "Conjunction", q: "Contoh correlative conjunction?", a: "not only…but also, neither…nor, either…or." },
    { tag: "Kosakata", q: "Keluarga kata provide?", a: "provide (V1), provided (V2/V3), providing (-ing), provision (noun)." }
  ],
  quiz: [
    Q("Parts of speech adalah…", ["Kategori kata berdasarkan fungsinya dalam kalimat", "Daftar kosakata sulit", "Cara mengucapkan kata", "Jenis-jenis kalimat"], 0, "Definisi dari slide: kategori grammatical berdasarkan fungsi kata."),
    Q("Kata <em>freedom</em> termasuk…", ["Abstract noun", "Concrete noun", "Adjective", "Verb"], 0, "Freedom adalah ide/keadaan, tidak bisa disentuh."),
    Q("Yang termasuk proper noun adalah…", ["London", "city", "book", "teacher"], 0, "Nama khusus diawali huruf kapital."),
    Q("<em>Team</em>, <em>family</em>, dan <em>class</em> adalah contoh…", ["Collective noun", "Abstract noun", "Proper noun", "Pronoun"], 0, "Bentuk tunggal, makna kelompok."),
    Q("Reflexive pronoun yang benar untuk <em>we</em> adalah…", ["ourselves", "ourself", "themselves", "us"], 0, "we → ourselves."),
    Q("<em>She ate an apple.</em> Kata kerja <em>ate</em> termasuk…", ["Transitive verb", "Intransitive verb", "Auxiliary verb", "Adverb"], 0, "Ada objek langsung: an apple."),
    Q("Kalimat dengan intransitive verb adalah…", ["The baby is sleeping.", "He painted a picture.", "They threw the ball.", "I eat rice."], 0, "Sleeping tidak membutuhkan objek."),
    Q("<em>They <u>are</u> trying to finish their projects.</em> Kata <em>are</em> berfungsi sebagai…", ["Auxiliary verb", "Main verb", "Noun", "Preposition"], 0, "are membantu membentuk present continuous."),
    Q("<em>He is a <u>tall</u> man.</em> Kata <em>tall</em> adalah…", ["Descriptive adjective", "Adverb of manner", "Noun", "Quantitative adjective"], 0, "Menjelaskan sifat noun man."),
    Q("<em>Which book do you want?</em> Kata <em>which</em> adalah…", ["Interrogative adjective", "Demonstrative pronoun", "Conjunction", "Adverb of place"], 0, "Which + noun (book) untuk bertanya."),
    Q("<em>She sings <u>beautifully</u>.</em> Kata <em>beautifully</em> termasuk…", ["Adverb of manner", "Adjective", "Adverb of time", "Noun"], 0, "Menjelaskan cara bernyanyi."),
    Q("Adverb of frequency adalah…", ["sometimes", "here", "quickly", "yesterday"], 0, "here = place, quickly = manner, yesterday = time."),
    Q("<em>in the morning</em> dalam kalimat berfungsi sebagai…", ["Adverb (keterangan waktu)", "Noun", "Verb", "Conjunction"], 0, "Contoh dosen: morning = noun, in the morning = adverb."),
    Q("Preposition yang tepat: I was born ___ 2005.", ["in", "on", "at", "to"], 0, "Tahun memakai in."),
    Q("Preposition yang tepat: The class starts ___ Monday.", ["on", "in", "at", "into"], 0, "Hari memakai on."),
    Q("<em>To, into, towards, along</em> adalah preposition of…", ["Direction", "Time", "Place", "Manner"], 0, "Menunjukkan arah tujuan."),
    Q("FANBOYS adalah singkatan…", ["Coordinating conjunctions", "Subordinating conjunctions", "Personal pronouns", "Auxiliary verbs"], 0, "For, And, Nor, But, Or, Yet, So."),
    Q("<em>I stayed at home <u>because</u> it was raining.</em> Kata <em>because</em> adalah…", ["Subordinating conjunction", "Coordinating conjunction", "Correlative conjunction", "Preposition"], 0, "Because mengawali anak kalimat."),
    Q("Pasangan correlative conjunction yang benar adalah…", ["neither … nor", "neither … or", "either … nor", "not only … and"], 0, "either…or, neither…nor, not only…but also."),
    Q("Pola yang benar dengan <em>provide</em> adalah…", ["Mother provides her children with the best education.", "Mother provides her children for the best education.", "Mother provides with her children the best education.", "Mother provide the best education to with her children."], 0, "provide + orang + with + sesuatu, atau provide + sesuatu + for + orang."),
    Q("<em>This</em> pada <em>This is my laptop</em> adalah…", ["Demonstrative pronoun", "Demonstrative adjective", "Personal pronoun", "Adverb"], 0, "Berdiri sendiri tanpa noun sesudahnya."),
    Q("Terjemahan yang benar untuk “Saya sedang makan” adalah…", ["I am eating.", "I eat.", "I eating.", "I am eat."], 0, "Present continuous: am + verb-ing.")
  ],
  ringkasan: `*RANGKUMAN P1 BAHASA INGGRIS: PARTS OF SPEECH*
📌 Parts of speech = kelompok kata menurut FUNGSI di kalimat.
1️⃣ Noun: concrete, abstract, common/proper (kapital), collective.
2️⃣ Pronoun: personal (I, you), reflexive (myself), interrogative (who), demonstrative (this/those).
3️⃣ Verb: transitive (butuh objek), intransitive, auxiliary (be/have/do).
4️⃣ Adjective: descriptive, quantitative, demonstrative, interrogative.
5️⃣ Adverb: manner, place, time, frequency.
6️⃣ Preposition: time (in/on/at), place, direction (to/into).
7️⃣ Conjunction: FANBOYS, subordinating (because), correlative (either…or).
⚠️ morning = noun, in the morning = adverb.`
};
