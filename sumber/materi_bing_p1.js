// Materi Lengkap Bahasa Inggris P1 — Parts of Speech
const { box, arrow, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const say = (label, title, items, cols) => ({ type: "say", label, title, cols, items: items.map(x => Array.isArray(x) ? { en: x[0], id: x[1], note: x[2] } : x) });
const free = (label, title, preview, rows) => ({ type: "exercise", label, title, preview, headers: ["Soal", "Jawaban"], rows: rows.map(([c, a, ok]) => ({ cells: [c], fields: [{ answer: a, placeholder: "ketik jawaban" }], ok: "✓ " + (ok || "Benar!") })) });

const sentence = diagram({
  label: "Diagram Interaktif", title: "Membedah Satu Kalimat", desc: "Klik setiap kata untuk melihat kelas katanya dan alasannya.", minw: 560,
  svg: svg(760, 230,
    box(10, 40, 90, 50, "Andi", "sky", "n1") + box(110, 40, 70, 50, "and", "rose", "cj") + box(190, 40, 70, 50, "his", "violet", "pr") +
    box(270, 40, 110, 50, "friends", "sky", "n2") + box(390, 40, 140, 50, "always study", "amber", "vb") + box(540, 40, 50, 50, "in", "slate", "pp") +
    box(600, 40, 60, 50, "the", "white", "ar") + box(670, 40, 80, 50, "library", "sky", "n3") +
    arrow(240, 130, 240, 95) + text(240, 150, "S (subjek) = Andi and his friends", { size: 13, color: "#475569" }) +
    arrow(460, 130, 460, 95) + text(460, 170, "V = study (+ adverb always)", { size: 13, color: "#475569" }) +
    arrow(670, 130, 670, 95) + text(640, 200, "Adv tempat = in the library", { size: 13, color: "#475569" })
  ),
  parts: [
    { id: "n1", label: "Noun", title: "Andi = proper noun", text: "Nama khusus orang, maka diawali huruf kapital." },
    { id: "cj", label: "Conjunction", title: "and = coordinating conjunction", text: "Salah satu FANBOYS. Menyambung dua noun yang setara: Andi + his friends." },
    { id: "pr", label: "Pronoun", title: "his = possessive", text: "Menggantikan “Andi's”. Slide dosen memberi label pronoun pada <em>his</em> di “Andi is driving his car”. ➕ Banyak buku menyebutnya <strong>possessive adjective/determiner</strong> karena selalu diikuti noun." },
    { id: "n2", label: "Noun", title: "friends = common, concrete noun", text: "Jamak dengan -s. Subjek menjadi jamak (Andi and his friends = they), maka verb tanpa -s: <em>study</em>." },
    { id: "vb", label: "Adverb + Verb", title: "always (adverb of frequency) + study (verb)", text: "<em>always</em> diletakkan <strong>sebelum</strong> verb utama. <em>study</em> = intransitive di kalimat ini (tidak ada objek)." },
    { id: "pp", label: "Preposition", title: "in = preposition of place", text: "Menghubungkan aksi dengan tempat." },
    { id: "ar", label: "Article", title: "the = article", text: "➕ Article (a/an/the): banyak tata bahasa memasukkannya ke adjective/determiner. Dibahas lagi di P2 dan P6." },
    { id: "n3", label: "Noun", title: "library = noun", text: "<em>in the library</em> secara keseluruhan berfungsi sebagai keterangan tempat (adverbial)." }
  ]
});

module.exports = [
  A("Mengapa Belajar Parts of Speech?", `<p>Di kamus, setiap kata diberi label seperti <em>n</em> (noun), <em>v</em> (verb), <em>adj</em>, <em>adv</em>. Label itu memberi tahu <strong>di mana kata boleh diletakkan</strong>. Kalau kita tahu kelas katanya, kita bisa menyusun kalimat yang benar walau kosakata masih sedikit.</p>
<p>Dosen menekankan bahwa kelas kata ditentukan oleh <strong>fungsi</strong>. <em>morning</em> adalah noun, tetapi <em>in the morning</em> menjadi adverb (keterangan waktu). Begitu juga keluarga kata: <em>provide</em> (verb) → <em>provided</em> → <em>providing</em> → <em>provision</em> (noun).</p>`, "Bagian 1"),
  sentence,
  A("Noun dan Pronoun", `<p><strong>Noun</strong> (kata benda) adalah kata untuk <strong>menamai</strong> sesuatu: orang (<em>teacher</em>), tempat (<em>library</em>), benda (<em>book</em>), hewan (<em>cat</em>), atau ide (<em>love</em>). Dalam kalimat, noun biasanya menjadi <strong>subjek</strong> (pelaku) atau <strong>objek</strong> (yang dikenai): <em><strong>The teacher</strong> reads <strong>a book</strong>.</em></p>
<p>Ciri cepat noun: bisa didahului <em>a/an/the</em> atau <em>my/your</em> (<em>a book, the library, my family</em>), dan banyak yang punya bentuk jamak (<em>book → books</em>).</p>
<p><strong>Pronoun</strong> (kata ganti) adalah kata yang <strong>menggantikan noun</strong> yang sudah disebut, supaya tidak diulang-ulang: <em>Andi is driving <strong>his</strong> car</em>, bukan <em>Andi is driving Andi's car</em>. Bentuk pronoun berubah sesuai posisinya: <em>he</em> untuk subjek, <em>him</em> untuk objek, <em>his</em> untuk milik (lihat tabel di bawah).</p>`, "Bagian 2"),
  { type: "table", label: "Tabel Interaktif", title: "Empat Jenis Noun (Slide Dosen)", headers: ["Jenis", "Artinya", "Contoh", "Cara mengenali"],
    rows: [
      ["Concrete", "Benda yang bisa ditangkap pancaindra (dilihat, disentuh, didengar, dicium, dirasa)", "book, cat, rain, coffee", "Bisa kamu tunjuk atau rasakan."],
      ["Abstract", "Ide, perasaan, atau keadaan yang tidak berwujud", "love, freedom, disappointment", "Tidak bisa disentuh. Banyak berakhiran -ness, -ment, -dom, -tion."],
      ["Common vs Proper", "Common = nama umum. Proper = nama khusus satu orang/tempat/benda", "city vs <strong>J</strong>akarta, country vs <strong>I</strong>ndonesia", "Proper noun selalu diawali huruf kapital."],
      ["Collective", "Satu kata untuk sekelompok orang/benda", "team, family, class, audience", "Bentuknya tunggal (a team), tetapi isinya banyak."]
    ],
    modes: [
      { label: "Bisa dua jenis", target: "col", col: 0, title: "Jenis noun tidak saling meniadakan", text: "Satu noun bisa masuk lebih dari satu jenis. <em>family</em> = common + collective + concrete. <em>Jakarta</em> = proper + concrete." },
      { label: "Jebakan abstract", target: "row", row: 1, title: "Abstract noun dari kata lain", text: "<em>disappoint</em> (verb) → <em>disappointment</em> (noun). <em>free</em> (adjective) → <em>freedom</em> (noun). Akhirannya mengubah kelas kata." }
    ] },
  { type: "table", label: "➕ Tambahan • Tabel Pronoun Lengkap", title: "Satu Orang, Lima Bentuk", headers: ["Subjek", "Objek", "Possessive adj.", "Possessive pron.", "Reflexive"],
    rows: [["I", "me", "my", "mine", "myself"], ["you", "you", "your", "yours", "yourself"], ["he", "him", "his", "his", "himself"], ["she", "her", "her", "hers", "herself"], ["it", "it", "its", "—", "itself"], ["we", "us", "our", "ours", "ourselves"], ["they", "them", "their", "theirs", "themselves"]],
    modes: [
      { label: "Posisi subjek", target: "col", col: 0, title: "Sebelum verb", text: "<strong>She</strong> likes coffee." },
      { label: "Posisi objek", target: "col", col: 1, title: "Sesudah verb / preposition", text: "I like <strong>her</strong>. Come with <strong>us</strong>." },
      { label: "Jebakan its", target: "row", row: 4, title: "its ≠ it's", text: "<em>its</em> = miliknya (The cat ate its food). <em>it's</em> = it is." }
    ] },
  A("Verb: Jantung Kalimat", `<p>Setiap kalimat lengkap butuh verb. Slide membaginya tiga:</p>
<ul><li><strong>Transitive</strong>: butuh objek. <em>She ate <strong>an apple</strong>.</em> Tanpa objek kalimat terasa menggantung (“She ate…” apa?).</li>
<li><strong>Intransitive</strong>: tanpa objek. <em>They are laughing.</em></li>
<li><strong>Auxiliary</strong>: kata kerja bantu <em>be, have, do</em> untuk membentuk tense, kalimat negatif, dan pertanyaan. <em>They <strong>are</strong> trying… / They <strong>were</strong> trying…</em></li></ul>
<p>Contoh dosen dengan <em>provide</em> (menyediakan): <em>I provide meals in the living room.</em> Polanya <strong>provide somebody with something</strong> atau <strong>provide something for somebody</strong>.</p>`, "Bagian 3"),
  tip("➕ Kata kerja yang bisa dua-duanya", "Banyak verb bisa transitive dan intransitive: <em>I <strong>eat</strong> rice</em> (transitive) vs <em>I <strong>eat</strong> at seven</em> (intransitive). Yang menentukan adalah ada/tidaknya objek <strong>di kalimat itu</strong>.", "info"),
  A("Adjective dan Adverb", `<p><strong>Adjective</strong> (kata sifat) adalah kata yang memberi keterangan tentang <strong>noun</strong>: seperti apa, berapa banyak, yang mana. Adjective muncul di dua posisi:</p>
<ul><li><strong>Sebelum noun</strong>: <em>a <strong>smart</strong> student</em>, <em><strong>three</strong> cats</em>.</li>
<li><strong>Sesudah <em>be</em></strong> (is/am/are/was/were) atau verb sejenis (look, feel, seem): <em>She is <strong>smart</strong>.</em> <em>You look <strong>tired</strong>.</em></li></ul>
<p>Adjective dalam bahasa Inggris <strong>tidak punya bentuk jamak</strong>: <em>two <strong>big</strong> houses</em>, bukan <em>bigs</em>.</p>
<p><strong>Adverb</strong> (kata keterangan) memberi keterangan tentang <strong>verb</strong>: bagaimana, di mana, kapan, atau seberapa sering sesuatu dilakukan. Adverb juga bisa menerangkan adjective atau adverb lain: <em><strong>very</strong> smart</em>, <em>runs <strong>very</strong> fast</em>.</p>
<p>Cara paling mudah membedakannya: <strong>cari kata yang diterangkan</strong>. Kalau yang diterangkan noun (orang/benda), itu adjective. Kalau yang diterangkan perbuatan (verb), itu adverb.</p>`, "Bagian 4"),
  { type: "table", label: "Tabel Interaktif", title: "Empat Jenis Adjective (Slide Dosen)", headers: ["Jenis", "Menjawab pertanyaan", "Contoh", "Catatan"],
    rows: [
      ["Descriptive", "Seperti apa?", "a <strong>beautiful</strong> garden, a <strong>smart</strong> girl", "Jenis paling umum: warna, ukuran, sifat, perasaan."],
      ["Quantitative", "Berapa banyak? Seberapa besar?", "<strong>one hundred</strong> students, <strong>some</strong> water, a <strong>colossal</strong> building", "Angka dan kata jumlah (some, many, few). Slide juga memasukkan kata ukuran/intensitas seperti colossal, intense."],
      ["Demonstrative", "Yang mana (menunjuk)?", "<strong>this</strong> book, <strong>those</strong> shoes", "Hanya adjective kalau langsung diikuti noun."],
      ["Interrogative", "Yang mana? (bertanya)", "<strong>Which</strong> bag is yours? <strong>Whose</strong> phone is this?", "Kata tanya yang diikuti noun: which, what, whose."]
    ],
    modes: [
      { label: "Posisi", target: "col", col: 2, title: "Di mana adjective diletakkan?", text: "Sebelum noun (<em>a smart girl</em>) atau sesudah <em>be</em> (<em>The girl is smart</em>). Demonstrative dan interrogative selalu sebelum noun." },
      { label: "Jebakan quantitative", target: "row", row: 1, title: "Angka juga adjective", text: "Pada <em>one hundred students</em>, <em>one hundred</em> menerangkan <em>students</em> (berapa banyak), jadi termasuk adjective." }
    ] },
  { type: "table", label: "Tabel Interaktif", title: "this/that/these/those: Adjective atau Pronoun?", headers: ["Kalimat", "Sesudahnya ada noun?", "Kelas kata"],
    rows: [
      ["<strong>This</strong> book is mine.", "Ya: book", "Demonstrative <strong>adjective</strong>"],
      ["<strong>This</strong> is mine.", "Tidak", "Demonstrative <strong>pronoun</strong>"],
      ["I like <strong>those</strong> shoes.", "Ya: shoes", "Demonstrative <strong>adjective</strong>"],
      ["I like <strong>those</strong>.", "Tidak", "Demonstrative <strong>pronoun</strong>"]
    ],
    modes: [
      { label: "Cara menguji", target: "col", col: 1, title: "Lihat satu kata sesudahnya", text: "Kalau langsung diikuti noun, kata itu sedang <em>menerangkan</em> noun tersebut, jadi adjective. Kalau berdiri sendiri, kata itu <em>menggantikan</em> noun, jadi pronoun." },
      { label: "Dekat/jauh", target: "col", col: 0, title: "Arti keempatnya", text: "<em>this</em> (dekat, satu), <em>these</em> (dekat, banyak), <em>that</em> (jauh, satu), <em>those</em> (jauh, banyak). Noun sesudahnya harus cocok: <em>this book</em>, <em>these books</em>." }
    ] },
  { type: "table", label: "Tabel Interaktif", title: "Empat Jenis Adverb (Slide Dosen)", headers: ["Jenis", "Menjawab pertanyaan", "Contoh", "Posisi biasanya"],
    rows: [
      ["Manner (cara)", "<strong>How?</strong> Bagaimana dilakukan?", "She sings <strong>beautifully</strong>. He drives <strong>carefully</strong>.", "Sesudah verb (atau sesudah objek)."],
      ["Place (tempat)", "<strong>Where?</strong> Di mana?", "Come <strong>here</strong>. They live <strong>abroad</strong>.", "Akhir kalimat."],
      ["Time (waktu)", "<strong>When?</strong> Kapan?", "I'll call you <strong>tomorrow</strong>. Do it <strong>now</strong>.", "Akhir kalimat (bisa juga di awal)."],
      ["Frequency (frekuensi)", "<strong>How often?</strong> Seberapa sering?", "I <strong>always</strong> wake up early. She is <strong>never</strong> late.", "Sebelum verb utama, tetapi sesudah <em>be</em>."]
    ],
    modes: [
      { label: "Catatan dosen", target: "row", row: 0, title: "What to do / How to do", text: "Verb menjawab <em>what to do</em> (melakukan apa: <em>sing</em>). Adverb of manner menjawab <em>how to do</em> (dengan cara apa: <em>beautifully</em>). Jadi kalau pertanyaannya “bagaimana caranya?”, jawabannya adverb of manner." },
      { label: "Urutan", target: "col", col: 3, title: "Kalau ada beberapa adverb", text: "Urutan yang lazim di akhir kalimat: <strong>manner → place → time</strong>. <em>She sang beautifully at the party last night.</em>" }
    ] },
  tip("Kesalahan yang sering terjadi", `<ul class="list-disc pl-5 space-y-1"><li><em>She sings <s>beautiful</s></em> → <em>She sings <strong>beautifully</strong></em>. Yang diterangkan <em>sings</em> (verb), jadi perlu adverb.</li>
<li><em>She looks <s>beautifully</s></em> → <em>She looks <strong>beautiful</strong></em>. Sesudah look/feel/seem/be yang diterangkan subjeknya (noun), jadi pakai adjective.</li>
<li><em>I <s>go always</s> to campus</em> → <em>I <strong>always go</strong> to campus</em>. Adverb of frequency sebelum verb utama.</li>
<li>Menganggap <em>this</em> selalu pronoun. Cek dulu apakah ada noun sesudahnya.</li></ul>`, "warn"),
  { type: "choices", style: "toggle", label: "➕ Tambahan • Bentuk -ly", title: "Adjective → Adverb", options: [
    { label: "Aturan umum", tone: "emerald", title: "Tambah -ly", code: "quick → quickly, happy → happily, careful → carefully", text: "Akhiran -y diganti -ily. Akhiran -le diganti -ly (gentle → gently)." },
    { label: "Tidak beraturan", tone: "rose", title: "Bentuk khusus", code: "good → well, fast → fast, hard → hard, late → late", text: "<em>He works <strong>hard</strong></em> (bekerja keras). <em>hardly</em> artinya “hampir tidak”, maknanya beda!" },
    { label: "Jebakan -ly", tone: "amber", title: "Berakhiran -ly tapi adjective", code: "friendly, lovely, lonely, ugly", text: "<em>a friendly teacher</em>. Tidak ada kata “friendlily”; pakai <em>in a friendly way</em>." }
  ] },
  A("Preposition dan Conjunction", `<p><strong>Preposition</strong> (kata depan) adalah kata pendek yang diletakkan <strong>sebelum noun/pronoun</strong> untuk menunjukkan hubungannya dengan bagian kalimat lain: kapan, di mana, atau ke arah mana. Preposition biasanya langsung diikuti noun atau pronoun: <em>in <strong>the library</strong></em>, <em>at <strong>7 o'clock</strong></em>, <em>with <strong>me</strong></em>. Dalam pertanyaan, noun-nya bisa sudah muncul lebih dulu sehingga preposition ada di akhir: <em><strong>Who</strong> are you talking <strong>to</strong>?</em></p>
<p>Slide membaginya tiga: <strong>waktu</strong> (<em>in 1990, on Sunday, at 7</em>), <strong>tempat</strong> (<em>in, on, at, by, under, above, between, among</em>), dan <strong>arah</strong> (<em>to, into, towards, along</em>). Bedanya: preposition tempat menjawab <em>where is it?</em> (posisinya diam), preposition arah menjawab <em>where is it going?</em> (bergerak).</p>
<p><strong>Conjunction</strong> (kata hubung) adalah kata yang <strong>menyambung</strong> dua kata, frasa, atau klausa. Klausa = bagian kalimat yang punya subjek + verb sendiri. Dosen menyebutnya “jembatan” (connector/bridging). Ada tiga jenis, lihat tabel di bawah.</p>`, "Bagian 5"),
  { type: "table", label: "Tabel Interaktif", title: "Tiga Jenis Conjunction", headers: ["Jenis", "Tugasnya", "Contoh", "Catatan"],
    rows: [
      ["Coordinating (FANBOYS)", "Menyambung dua bagian yang <strong>setara</strong> (sama-sama bisa berdiri sendiri)", "I like coffee, <strong>but</strong> I don't like tea.", "For, And, Nor, But, Or, Yet, So."],
      ["Subordinating", "Menyambung <strong>anak kalimat</strong> ke induk kalimat. Anak kalimat tidak bisa berdiri sendiri", "I stayed home <strong>because</strong> it was raining.", "after, although, as, because, before, if, when, while."],
      ["Correlative", "Selalu <strong>berpasangan</strong>", "<strong>Not only</strong> Rina <strong>but also</strong> Budi passed.", "either…or, neither…nor, both…and, not only…but also."]
    ],
    modes: [
      { label: "Uji setara", target: "row", row: 1, title: "Anak kalimat tidak bisa berdiri sendiri", text: "“because it was raining” saja terasa belum selesai, jadi itu anak kalimat. “I stayed home” bisa berdiri sendiri, jadi induk kalimat." },
      { label: "Pasangan", target: "row", row: 2, title: "Jangan tertukar pasangannya", text: "<em>neither</em> selalu dengan <em>nor</em>, <em>either</em> dengan <em>or</em>. Salah: <em>neither Rina or Budi</em>." }
    ] },
  tip("Daftar kata hubung berdasarkan fungsi (slide terakhir)", `Slide juga memberi kata hubung yang dikelompokkan menurut fungsinya dalam paragraf. <strong>Comparison</strong> (membandingkan): <em>similarly, in contrast</em>. <strong>Cause & effect</strong> (sebab-akibat): <em>because, therefore, as a result</em>. <strong>Illustration</strong> (memberi contoh): <em>for example, such as</em>. <strong>Addition</strong> (menambah): <em>and, also, moreover</em>. <strong>Opinion</strong>: <em>I think, in my view</em>. <strong>Conclusion</strong>: <em>to sum up</em>. Sebagian (therefore, moreover) sebenarnya adverb penghubung, bukan conjunction murni, sehingga biasanya diletakkan di awal kalimat baru: <em>It rained. <strong>Therefore</strong>, we stayed home.</em>`, "info"),
  { type: "diagram", label: "Diagram Interaktif", title: "in – on – at: dari Besar ke Kecil", desc: "Klik tiap tingkat. Semakin ke bawah semakin spesifik.", minw: 420,
    svg: svg(560, 250,
      box(20, 10, 520, 60, "IN: tahun, bulan, musim, bagian hari, kota/negara", "sky", "in", { size: 15 }) +
      box(90, 90, 380, 60, "ON: hari, tanggal, permukaan", "amber", "on", { size: 15 }) +
      box(170, 170, 220, 60, "AT: jam, titik tertentu", "rose", "at", { size: 15 })),
    parts: [
      { id: "in", label: "in", title: "Wadah besar", text: "in 2026, in November, in summer, in the morning, in Jakarta, in the library." },
      { id: "on", label: "on", title: "Hari dan permukaan", text: "on Sunday, on 14 November, on my birthday, on the table, on the wall." },
      { id: "at", label: "at", title: "Titik spesifik", text: "at 7 o'clock, at night (pengecualian!), at the weekend (British), at the station, at home." }
    ] },
  say("🔊 Pelafalan", "Dengarkan Istilah Kunci", [
    ["noun", "kata benda"], ["pronoun", "kata ganti"], ["verb", "kata kerja"], ["adjective", "kata sifat", "Tekanan di suku pertama: AD-jec-tive."], ["adverb", "kata keterangan", "Tekanan di suku pertama: AD-verb."], ["preposition", "kata depan", "Tekanan: prep-o-SI-tion."], ["conjunction", "kata hubung", "Tekanan: con-JUNC-tion."], ["provide", "menyediakan"], ["provision", "persediaan/ketentuan"], ["disappointment", "kekecewaan"], ["themselves", "mereka sendiri"], ["auxiliary", "bantu", "aux-IL-ia-ry"]
  ], 3),
  free("Latihan Isian", "Lengkapi dengan Kata yang Tepat", "Ketik satu kata saja.", [
    ["She hurt ___ (reflexive dari she).", "herself"],
    ["I was born ___ Sunday.", "on"],
    ["The meeting is ___ 9 o'clock.", "at"],
    ["Not only Rina ___ also Budi passed the test.", "but"],
    ["Mother provides her children ___ the best education.", "with"],
    ["He drives ___ (adverb dari careful).", "carefully"],
    ["I like coffee, ___ I don't like tea. (FANBOYS: pertentangan)", "but"],
    ["___ is your birthday? (kata tanya waktu)", ["When", "when"]]
  ])
];
