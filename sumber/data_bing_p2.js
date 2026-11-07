// Bahasa Inggris — Pertemuan 2: New Cutting Edge Elementary, Module 1 "People and places"
const LAB3 = require("./lab_tahap3.js");
const Q = (q, opts, ans, exp) => ({ q, opts, ans, exp });
const ex = (label, title, headers, opts, rows, preview) => ({ type: "exercise", label, title, preview, headers, rows: rows.map(([c, a, h]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓ " + (h || "Benar!") })) });
const free = (label, title, preview, rows) => ({ type: "exercise", label, title, preview, headers: ["Soal", "Jawaban"], rows: rows.map(([c, a, ok]) => ({ cells: [c], fields: [{ answer: a, placeholder: "ketik jawaban" }], ok: "✓ " + (ok || "Benar!") })) });
module.exports = {
  id: "p2", nomor: 2, judul: "Module 1: People and Places (to be, a/an + jobs)", ujian: "CPMK 1",
  hero: {
    badge: "New Cutting Edge Elementary • Module 1",
    title: "Perkenalkan Dirimu dalam Bahasa Inggris",
    text: "Pakai <strong>to be</strong> (am/is/are) untuk nama, asal, umur, dan pekerjaan; <strong>a/an</strong> sebelum nama pekerjaan; nama <strong>negara & kebangsaan</strong>; serta bertanya dan menjawab data pribadi."
  },
  cheatsheet: [
    { type: "callout", tone: "tip", heading: "Satu rumus untuk seluruh modul", html: "<strong>Subjek + am/is/are + keterangan</strong>. <em>I'm Gilang. I'm from Indonesia. I'm twenty. I'm a student.</em> Bahasa Indonesia tidak butuh “adalah”, tetapi bahasa Inggris <strong>wajib</strong> punya to be kalau tidak ada kata kerja lain." },
    { type: "table", label: "Interaktif 1 • Tabel to be", title: "Bentuk Positif, Negatif, dan Singkatan", headers: ["Subjek", "Positif", "Singkatan", "Negatif", "Singkatan"],
      rows: [["I", "I am", "I'm", "I am not", "I'm not"], ["You", "you are", "you're", "you are not", "you aren't"], ["He", "he is", "he's", "he is not", "he isn't"], ["She", "she is", "she's", "she is not", "she isn't"], ["It", "it is", "it's", "it is not", "it isn't"], ["We", "we are", "we're", "we are not", "we aren't"], ["They", "they are", "they're", "they are not", "they aren't"]],
      modes: [
        { label: "Jebakan I", target: "row", row: 0, title: "Tidak ada “I amn't”", text: "Negatif singkat untuk I hanya <strong>I'm not</strong>." },
        { label: "is", target: "row", row: 2, title: "he/she/it/nama orang → is", text: "<em>Carla's from Italy</em> (= Carla is). Ingat: <em>'s</em> setelah nama bisa berarti <em>is</em>." },
        { label: "are", target: "row", row: 6, title: "you/we/they/dua orang → are", text: "<em>Ben and Emily are from Manchester.</em>" }
      ] },
    { type: "table", label: "Interaktif 2 • Pertanyaan & Jawaban Singkat", title: "Membalik Urutan untuk Bertanya", headers: ["Pernyataan", "Pertanyaan", "Jawaban singkat"],
      rows: [["You are married.", "Are you married?", "Yes, I am. / No, I'm not."], ["He is on holiday.", "Is he on holiday?", "Yes, he is. / No, he isn't."], ["They are from Tokyo.", "Are they from Tokyo?", "Yes, they are. / No, they aren't."], ["Your name is …", "What's your name?", "My name's … / I'm …"], ["You are 26.", "How old are you?", "I'm twenty-six."]],
      modes: [
        { label: "Yes/No", target: "col", col: 1, title: "be pindah ke depan", text: "Pertanyaan yes/no: <strong>Be + subjek + …?</strong>" },
        { label: "Jebakan", target: "col", col: 2, title: "Jangan singkat di jawaban positif", text: "<em>Yes, I am.</em> ✓ — <em>Yes, I'm.</em> ✗. Singkatan positif tidak boleh di akhir kalimat." },
        { label: "Wh-", target: "row", row: 3, title: "Question word + be + subjek", text: "What/Where/How old + is/are + subjek? Contoh: <em>Where are you from?</em>" }
      ] },
    { type: "choices", style: "toggle", label: "Interaktif 3 • a atau an?", title: "Article dengan Nama Pekerjaan", options: [
      { label: "an + bunyi vokal", tone: "emerald", title: "an", code: "an engineer, an actor, an electrician, an artist", text: "Dipakai sebelum kata yang <strong>diucapkan</strong> dengan bunyi vokal a, e, i, o, u." },
      { label: "a + bunyi konsonan", tone: "sky", title: "a", code: "a doctor, a waiter, a police officer, a lawyer", text: "Dipakai sebelum bunyi konsonan." },
      { label: "➕ Bunyi, bukan huruf", tone: "amber", title: "Yang dihitung bunyinya", code: "an hour, an honest man / a university, a European", text: "<em>hour</em> h-nya tidak dibaca → an. <em>university</em> dibaca /ju:/ → a." }
    ], footer: "Bahasa Indonesia: “Saya mahasiswa”. Bahasa Inggris wajib: <strong>I'm a student.</strong>" },
    { type: "table", label: "Interaktif 4 • Negara & Kebangsaan", title: "Country → Nationality", headers: ["Country", "Nationality", "Pola akhiran"],
      rows: [["Spain", "Spanish", "-ish"], ["Britain", "British", "-ish"], ["Poland", "Polish", "-ish"], ["Turkey", "Turkish", "-ish"], ["China", "Chinese", "-ese"], ["Japan", "Japanese", "-ese"], ["the USA", "American", "-(i)an"], ["Italy", "Italian", "-(i)an"], ["Korea", "Korean", "-(i)an"], ["Russia", "Russian", "-(i)an"], ["Australia", "Australian", "-(i)an"], ["Germany", "German", "-an"], ["France", "French", "khusus"], ["Indonesia ➕", "Indonesian", "-(i)an"]],
      modes: [
        { label: "Huruf kapital", target: "col", col: 1, title: "Selalu kapital", text: "Nationality dan bahasa selalu kapital: <em>English, Arabic, Indonesian</em>." },
        { label: "Jebakan", target: "row", row: 12, title: "France → French", text: "Bukan “Francish”. Thailand → Thai, Egypt → Egyptian juga sering muncul." }
      ] },
    { type: "list", label: "Ringkas • Ungkapan Kunci", title: "Percakapan Perkenalan", groups: [
      { title: "Menyapa & berkenalan", tone: "emerald", items: ["Hello, my name's … What's your name?", "Hi, I'm …", "Nice to meet you. — Nice to meet you, too.", "This is my friend Ariel. (memperkenalkan orang)"] },
      { title: "Bertanya data pribadi", tone: "sky", items: ["What's your full name / surname / first name?", "How do you spell it?", "Where are you from? Where's he from?", "What's your job? / How old is she? / Is she married?"] },
      { title: "Frasa penyelamat", tone: "amber", items: ["I don't know.", "Sorry, I don't understand.", "Could you repeat that, please? ➕"] }
    ] }
  ],
  simulator: [
    LAB3.EN_P2,
    ex("Permainan Interaktif 1 • am / is / are", "Pilih Bentuk to be yang Tepat", ["Kalimat", "to be"], ["am", "is", "are"], [
      ["I ___ from Milan.", "am"], ["Carla ___ from Italy.", "is"], ["Ben and Emily ___ English.", "are"], ["You ___ a student.", "are"],
      ["My teacher ___ from Scotland.", "is"], ["We ___ on holiday.", "are"], ["It ___ a fantastic city.", "is"], ["Toshi and Mariko ___ friends.", "are"]
    ]),
    ex("Permainan Interaktif 2 • a atau an?", "Lengkapi Nama Pekerjaan", ["Pekerjaan", "Article"], ["a", "an"], [
      ["___ engineer", "an"], ["___ musician", "a"], ["___ actress", "an"], ["___ footballer", "a"], ["___ electrician", "an"], ["___ shop assistant", "a"],
      ["___ police officer", "a"], ["___ nurse", "a"], ["___ hour ➕", "an", "h tidak dibaca."], ["___ university student ➕", "a", "u dibaca /ju:/."]
    ]),
    free("Permainan Interaktif 3 • Singkatan", "Tulis Ulang dengan Bentuk Singkat", "Contoh: She is on business → She's on business.", [
      ["He is a student.", ["He's a student.", "He's a student"]], ["I am not married.", ["I'm not married.", "I'm not married"]],
      ["We are not from Madrid.", ["We aren't from Madrid.", "We aren't from Madrid", "We're not from Madrid.", "We're not from Madrid"]],
      ["They are not American.", ["They aren't American.", "They aren't American", "They're not American.", "They're not American"]],
      ["She is not at school.", ["She isn't at school.", "She isn't at school", "She's not at school.", "She's not at school"]]
    ]),
    free("Permainan Interaktif 4 • Susun Pertanyaan", "Urutkan Kata Menjadi Pertanyaan", "Tulis lengkap dengan tanda tanya.", [
      ["you / a student / are ?", ["Are you a student?"]], ["from / is / Britain / your teacher ?", ["Is your teacher from Britain?"]],
      ["old / how / is / your mother ?", ["How old is your mother?"]], ["where / Manchester / 's ?", ["Where's Manchester?"]],
      ["your father / a businessman / is ?", ["Is your father a businessman?"]], ["what / your / e-mail address / 's ?", ["What's your e-mail address?"]]
    ]),
    { type: "reveal", label: "Latihan 5 • Membaca Dokumen (Task modul)", title: "Kartu Data Karyawan: Hana Antonia Vincent", desc: "Data dari modul: Full name Hana Antonia Vincent, 78A Elm Road, York; date of birth 22.11.79; born in Prague, Czech Republic; emergency contact Paul Vincent (husband), work number (01904) 776 544; doctor: Dr Jo Boxer. Benar atau salah?", cols: 2, items: [
      { prompt: "Her first name's Antonia.", answer: "False", reason: "First name = Hana. Antonia adalah nama tengah (middle name)." },
      { prompt: "Her surname's Vincent.", answer: "True", reason: "Surname/family name = nama belakang." },
      { prompt: "She's from Britain.", answer: "False", reason: "Lahir di Prague, Czech Republic. Ia tinggal di York, Inggris." },
      { prompt: "Paul Vincent is her husband.", answer: "True", reason: "Tertulis di kolom contact in an emergency." },
      { prompt: "His work number is 776544.", answer: "True", reason: "(01904) adalah kode area." },
      { prompt: "Her doctor's name is Dr Elm.", answer: "False", reason: "Dr Jo Boxer, di Elm Medical Centre." }
    ] }
  ],
  flashcards: [
    { tag: "Grammar", q: "to be untuk I / he-she-it / you-we-they?", a: "I am • he/she/it is • you/we/they are." },
    { tag: "Jebakan", q: "Yes, I'm. Benar?", a: "Salah. Jawaban singkat positif tidak disingkat: Yes, I am." },
    { tag: "Grammar", q: "Negatif singkat they are?", a: "they aren't / they're not." },
    { tag: "Grammar", q: "Kapan pakai an?", a: "Sebelum bunyi vokal: an engineer, an actor, an hour." },
    { tag: "Jebakan", q: "a university atau an university?", a: "a university, karena dibaca /ju:/ (bunyi konsonan y)." },
    { tag: "Kosakata", q: "Nationality dari Spain, China, the USA, France?", a: "Spanish, Chinese, American, French." },
    { tag: "Kosakata", q: "first name vs surname?", a: "First name = nama depan; surname/family name = nama belakang/keluarga." },
    { tag: "Ungkapan", q: "Respon “Nice to meet you.”?", a: "Nice to meet you, too." },
    { tag: "Ungkapan", q: "Memperkenalkan teman?", a: "This is my friend Ariel. She's from Buenos Aires." },
    { tag: "Grammar", q: "Urutan pertanyaan Wh- dengan be?", a: "Wh- + be + subjek: Where are you from? How old is she?" },
    { tag: "Penulisan", q: "Kata apa yang selalu kapital?", a: "I, nama orang, kota, negara, kebangsaan/bahasa (English), hari, bulan." },
    { tag: "Pelafalan", q: "Bunyi schwa /ə/?", a: "Bunyi lemah tanpa tekanan, mis. huruf a pertama di a-ME-ri-can, a doc-tor." },
    { tag: "Tanya", q: "Cara menanyakan ejaan?", a: "How do you spell it/that?" },
    { tag: "Jebakan", q: "'s pada “Carla's from Italy”?", a: "Singkatan is, bukan kepemilikan." }
  ],
  quiz: [
    Q("I ___ from Indonesia.", ["am", "is", "are", "be"], 0, "I selalu am."),
    Q("Ben and Emily ___ from Manchester.", ["are", "is", "am", "be"], 0, "Dua orang = they → are."),
    Q("Bentuk singkat dari <em>he is not</em> adalah…", ["he isn't", "he aren't", "he amn't", "he not"], 0, "is not → isn't."),
    Q("Jawaban singkat yang benar untuk “Are you married?” adalah…", ["No, I'm not.", "No, I amn't.", "Yes, I'm.", "No, I isn't."], 0, "Negatif boleh disingkat: I'm not. Positif: Yes, I am."),
    Q("She's ___ engineer.", ["an", "a", "the", "—"], 0, "engineer diawali bunyi vokal."),
    Q("He's ___ police officer.", ["a", "an", "the", "—"], 0, "police diawali bunyi konsonan."),
    Q("Yang benar adalah…", ["I'm a student.", "I'm student.", "I student.", "I am an student."], 0, "Pekerjaan tunggal wajib a/an."),
    Q("Nationality untuk <em>Japan</em> adalah…", ["Japanese", "Japanish", "Japan", "Japanian"], 0, "Japan → Japanese."),
    Q("Nationality untuk <em>France</em> adalah…", ["French", "Francish", "Franch", "Francese"], 0, "Bentuk khusus."),
    Q("Negara asal orang <em>Polish</em> adalah…", ["Poland", "Portugal", "Holland", "Polis"], 0, "Poland → Polish."),
    Q("“___ are you from?” “I'm from Jakarta.”", ["Where", "What", "How", "Who"], 0, "Menanyakan asal tempat."),
    Q("“___ old are you?” “I'm nineteen.”", ["How", "What", "Where", "Which"], 0, "How old = berapa umur."),
    Q("“___'s your job?” “I'm a waiter.”", ["What", "How", "Where", "Who"], 0, "What's your job?"),
    Q("Urutan yang benar: <em>from / is / Britain / your teacher ?</em>", ["Is your teacher from Britain?", "Your teacher is from Britain?", "Is from Britain your teacher?", "From Britain is your teacher?"], 0, "Yes/no question: Is + subjek + …?"),
    Q("Respon yang tepat untuk “Nice to meet you.”", ["Nice to meet you, too.", "Yes, I am.", "I'm fine.", "Thank you, goodbye."], 0, "Ungkapan balasan standar."),
    Q("Kalimat yang penulisan huruf kapitalnya benar…", ["Are you Mrs Ream?", "are you mrs ream?", "Are you mrs Ream?", "are You Mrs ream?"], 0, "Awal kalimat, gelar, dan nama orang kapital."),
    Q("Pada data “Full name: Hana Antonia Vincent”, <em>surname</em>-nya adalah…", ["Vincent", "Hana", "Antonia", "Hana Vincent"], 0, "Surname = nama belakang."),
    Q("“What's your surname?” “Barker.” Pertanyaan lanjutan untuk ejaan adalah…", ["How do you spell that?", "What do you spell?", "How are you spell it?", "Where is your spell?"], 0, "How do you spell that/it?"),
    Q("Toshi and Mariko aren't married. They ___ friends.", ["'re", "'s", "'m", "isn't"], 0, "They are → They're."),
    Q("Kalimat yang SALAH adalah…", ["She are on holiday.", "We're from Malaga.", "It's a fantastic city.", "You aren't Italian."], 0, "She → is."),
    Q("“Is she a doctor?” Jawaban negatif singkat yang benar…", ["No, she isn't.", "No, she not.", "No, she aren't.", "No, isn't she."], 0, "No, + subjek + isn't."),
    Q("Kata yang pelafalannya diawali bunyi vokal sehingga memakai <em>an</em>…", ["hour", "house", "university", "uniform"], 0, "h pada hour tidak dibaca.")
  ],
  ringkasan: `*RANGKUMAN P2 BAHASA INGGRIS: PEOPLE AND PLACES*
1️⃣ to be: I am • he/she/it is • you/we/they are. Singkat: I'm, he's, they're; negatif isn't/aren't, I'm not.
2️⃣ Tanya: Are you…? Is he…? Jawab: Yes, I am. / No, I'm not. (positif tidak disingkat)
3️⃣ Wh-: What's your name? Where are you from? How old are you? What's your job?
4️⃣ a/an + pekerjaan: an engineer, a doctor (lihat BUNYI-nya).
5️⃣ Country → nationality: Spain-Spanish, China-Chinese, Italy-Italian, France-French.
6️⃣ Kapital: I, nama, kota, negara, bahasa, hari, bulan.`
};
