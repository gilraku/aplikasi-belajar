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
    { id: "ar", label: "Article", title: "the = article", text: "➕ Article (a/an/the) tidak masuk 7 kelas di slide; banyak tata bahasa memasukkannya ke adjective/determiner. Dibahas lagi di P2 dan P6." },
    { id: "n3", label: "Noun", title: "library = noun", text: "<em>in the library</em> secara keseluruhan berfungsi sebagai keterangan tempat (adverbial)." }
  ]
});

module.exports = [
  A("Mengapa Belajar Parts of Speech?", `<p>Di kamus, setiap kata diberi label seperti <em>n</em> (noun), <em>v</em> (verb), <em>adj</em>, <em>adv</em>. Label itu memberi tahu <strong>di mana kata boleh diletakkan</strong>. Kalau kita tahu kelas katanya, kita bisa menyusun kalimat yang benar walau kosakata masih sedikit.</p>
<p>Dosen menekankan bahwa kelas kata ditentukan oleh <strong>fungsi</strong>. <em>morning</em> adalah noun, tetapi <em>in the morning</em> menjadi adverb (keterangan waktu). Begitu juga keluarga kata: <em>provide</em> (verb) → <em>provided</em> → <em>providing</em> → <em>provision</em> (noun).</p>`, "Bagian 1"),
  sentence,
  A("Noun dan Pronoun", `<p><strong>Noun</strong> menamai orang, tempat, benda, atau ide. Empat jenisnya: <strong>concrete</strong> (book, cat), <strong>abstract</strong> (love, freedom, disappointment), <strong>common vs proper</strong> (city vs London, bedanya huruf kapital), dan <strong>collective</strong> (team, family: bentuknya tunggal tapi artinya banyak).</p>
<p><strong>Pronoun</strong> menggantikan noun supaya tidak diulang-ulang: <em>Andi is driving <strong>his</strong> car</em>, bukan <em>Andi is driving Andi's car</em>.</p>`, "Bagian 2"),
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
  A("Adjective dan Adverb", `<p><strong>Adjective</strong> menjelaskan noun: descriptive (<em>beautiful, smart</em>), quantitative (<em>one hundred, intense</em>), demonstrative (<em>this book</em>), interrogative (<em>which bag?</em>). Dosen mengingatkan: <em>this/that/these/those</em> adalah adjective <strong>kalau diikuti noun</strong>, dan pronoun kalau berdiri sendiri.</p>
<p><strong>Adverb</strong> menjelaskan verb (cara, tempat, waktu, frekuensi): <em>happily, here, now, always</em>. Catatan dosen: “What to do / How to do” → adverb of manner menjawab <em>how?</em></p>`, "Bagian 4"),
  { type: "choices", style: "toggle", label: "➕ Tambahan • Bentuk -ly", title: "Adjective → Adverb", options: [
    { label: "Aturan umum", tone: "emerald", title: "Tambah -ly", code: "quick → quickly, happy → happily, careful → carefully", text: "Akhiran -y diganti -ily. Akhiran -le diganti -ly (gentle → gently)." },
    { label: "Tidak beraturan", tone: "rose", title: "Bentuk khusus", code: "good → well, fast → fast, hard → hard, late → late", text: "<em>He works <strong>hard</strong></em> (bekerja keras). <em>hardly</em> artinya “hampir tidak”, maknanya beda!" },
    { label: "Jebakan -ly", tone: "amber", title: "Berakhiran -ly tapi adjective", code: "friendly, lovely, lonely, ugly", text: "<em>a friendly teacher</em>. Tidak ada kata “friendlily”; pakai <em>in a friendly way</em>." }
  ] },
  A("Preposition dan Conjunction", `<p><strong>Preposition</strong> menunjukkan hubungan waktu (lahir <em>in</em> 1990, <em>on</em> a Sunday, <em>at</em> your prime), tempat (<em>in, on, at, by, under, above, between, among</em>), dan arah (<em>to, into, towards, along</em>).</p>
<p><strong>Conjunction</strong> adalah “jembatan” (connector/bridging): coordinating = <strong>FANBOYS</strong>; subordinating (<em>after, although, as, because, before</em>) menyambung anak kalimat ke induk kalimat; correlative berpasangan (<em>not only/but also, neither/nor, either/or</em>). Slide terakhir memberi daftar panjang kata hubung berdasarkan fungsi: comparison (<em>similarly, in contrast</em>), cause & effect (<em>because, therefore, as a result</em>), illustration (<em>for example, such as</em>), emphasis, addition (<em>and, also, moreover</em>), opinion (<em>I think, in my view</em>), conclusion (<em>to sum up</em>).</p>`, "Bagian 5"),
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
