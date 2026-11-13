// Materi Lengkap Bahasa Inggris P8 — UTS (ulasan P1–P7)
const { box, arrow, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const say = (label, title, items, cols) => ({ type: "say", label, title, cols, items: items.map(x => Array.isArray(x) ? { en: x[0], id: x[1], note: x[2] } : x) });

const grammarMap = diagram({
  label: "Diagram Interaktif", title: "Peta Grammar UTS", desc: "Klik setiap kotak untuk ringkasan dan pertemuannya.", minw: 560,
  svg: svg(760, 300,
    box(290, 120, 180, 60, "KALIMAT|BAHASA INGGRIS", "violet", "core", { size: 15 }) +
    box(20, 20, 200, 56, "to be (P2)", "sky", "be", { size: 14 }) + box(280, 10, 200, 56, "Parts of speech (P1)", "slate", "pos", { size: 14 }) + box(540, 20, 200, 56, "Present simple (P3, P5)", "emerald", "ps", { size: 14 }) +
    box(20, 220, 200, 56, "can / can't (P6)", "rose", "can", { size: 14 }) + box(280, 230, 200, 56, "Articles (P2, P6)", "amber", "art", { size: 14 }) + box(540, 220, 200, 56, "Nouns & quantity (P7)", "indigo", "nq", { size: 14 }) +
    arrow(290, 130, 200, 80) + arrow(380, 120, 380, 70) + arrow(470, 130, 560, 80) + arrow(290, 170, 200, 220) + arrow(380, 180, 380, 226) + arrow(470, 170, 560, 220)
  ),
  parts: [
    { id: "core", label: "Inti", title: "Subjek + kata kerja + keterangan", text: "Setiap kalimat butuh subjek dan kata kerja (atau be). Semua topik UTS adalah variasi pola ini." },
    { id: "pos", label: "P1", title: "Parts of speech", text: "Kenali fungsi kata: noun, pronoun, verb, adjective, adverb, preposition, conjunction." },
    { id: "be", label: "P2", title: "to be", text: "am/is/are untuk nama, asal, umur, pekerjaan, status. Yes, I am / No, I'm not." },
    { id: "ps", label: "P3 & P5", title: "Present simple", text: "I/you/we/they + V1 (don't, Do…?). he/she/it + V-s (doesn't, Does…?). + like -ing dan adverbs of frequency." },
    { id: "can", label: "P6", title: "can / can't", text: "Semua subjek: can + V1. Can she…? Yes, she can. / It depends." },
    { id: "art", label: "P2 & P6", title: "Articles", text: "a/an: pertama/pekerjaan; the: sudah jelas/satu-satunya; zero: kota, negara biasa, hari, by bus, go home." },
    { id: "nq", label: "P7", title: "Countable / uncountable", text: "There's/There are, some/any, How much/How many." }
  ]
});

module.exports = [
  A("Tentang UTS", `<p>Pertemuan 8 adalah <strong>UTS</strong> dengan cakupan materi P1–P7. Menurut ketentuan resmi: <strong>15 soal pilihan ganda</strong> (A–D, satu jawaban benar), tingkat kesulitan mudah sampai menantang, waktu maksimal <strong>300 menit</strong> sejak percobaan dimulai. Soal menguji kemampuan mengenali struktur bahasa, memahami grammar, dan menerapkannya berdasarkan <strong>konteks bacaan</strong>.</p>
<p>Tabel di bawah memetakan setiap topik kisi-kisi ke pertemuan yang membahasnya di Sinau. Mulai dari topik yang belum kamu kuasai.</p>`, "Bagian 1"),

  {"type": "table", "label": "Tabel Interaktif", "title": "Kisi-kisi UTS dan Letak Materinya", "headers": ["Topik UTS", "Di Sinau", "Aturan inti"], "rows": [["Simple Present Tense", "P3 (I/you/we/they), P5 (he/she/it)", "S + V1; he/she/it + V-s; don't/doesn't + V1; Do/Does + S + V1?"], ["Adverbs of Frequency", "P5", "Sebelum verb biasa, sesudah be: <em>I always walk. She is never late.</em>"], ["Can dan Could", "P6", "can = bisa sekarang, could = bisa dulu; keduanya + V1, tanpa to, tanpa -s"], ["There is / There are", "P7", "is + tunggal/uncountable, are + jamak"], ["Like + Gerund", "P5", "like/love/hate + V-ing: <em>She likes dancing.</em>"], ["Countable & Uncountable Nouns", "P7", "Bisa dihitung (three eggs) atau tidak (milk, money)"], ["Demonstratives (this, that, these, those)", "P1", "this/these dekat, that/those jauh; these/those + jamak"], ["Articles (a, an)", "P2, P6", "Dipilih berdasarkan bunyi: an hour, a university"], ["Quantifiers (some, any, much, many)", "P7", "some positif, any negatif/tanya; many + countable, much + uncountable"], ["Reading comprehension", "P8 (latihan di bawah)", "Baca pertanyaan dulu, cari kata kunci di teks, perhatikan grammar di sekitarnya"]], "modes": [{"label": "Paling sering keluar", "target": "col", "col": 2, "title": "Fokus soal grammar", "text": "Hampir semua soal bisa dijawab dengan tiga pertanyaan: subjeknya apa (I, he/she, they)? Ada keterangan waktu lampau? Noun-nya countable atau uncountable?"}]},
  grammarMap,
  tip("Kesalahan yang paling sering dinilai salah", "<ul><li>Lupa be: <em>She from Italy</em> → <em>She's from Italy</em>.</li><li>Lupa a/an: <em>I'm student</em> → <em>I'm a student</em>.</li><li>Lupa -s: <em>He like football</em> → <em>He likes football</em>.</li><li>-s ganda: <em>Does she likes</em> → <em>Does she like</em>.</li><li>be + do bercampur: <em>Are you like…</em> → <em>Do you like…</em>.</li><li>can + to: <em>I can to swim</em> → <em>I can swim</em>.</li><li>much/many: <em>much friends</em> → <em>many friends</em>.</li><li>Jam: <em>half past nine</em> = 09.30.</li></ul>", "warn"),
  { type: "table", label: "Latihan Cepat", title: "Salah atau Benar? Klik Mode untuk Penjelasan", headers: ["Kalimat", "Status"],
    rows: [["My brother works in a hospital.", "✅"], ["Do your sister speak English?", "❌ Does your sister speak English?"], ["There are some milk in the fridge.", "❌ There's some milk…"], ["I can't drive a car, but I can ride a bicycle.", "✅"], ["She never goes on planes.", "✅"], ["How much brothers have you got?", "❌ How many brothers…"], ["They live in the Spain.", "❌ They live in Spain."], ["I'm an engineer and my wife is a doctor.", "✅"]],
    modes: [{ label: "P5", target: "row", row: 1, title: "does untuk he/she", text: "your sister = she → Does." }, { label: "P7", target: "row", row: 2, title: "milk uncountable", text: "Uncountable selalu tunggal → There's." }, { label: "P6", target: "row", row: 6, title: "Negara biasa", text: "Tanpa the, kecuali the USA/UK/UAE." }] },
  say("🔊 Pelafalan", "20 Kalimat Inti untuk Diulang Sebelum UTS", [
    ["My name's Gilang. I'm from Indonesia.", "P2"], ["I'm an information systems student.", "P2"], ["Are you married? No, I'm not.", "P2"], ["Where are you from?", "P2"],
    ["I get up at half past five.", "P3"], ["Do you live in a big city? Yes, I do.", "P3"], ["I don't have breakfast. Me, neither.", "P3"], ["What time is it? It's twenty to eleven.", "P3"],
    ["She lives in London and loves cycling.", "P5"], ["Does he like football? No, he doesn't.", "P5"], ["I usually listen to the radio in the car.", "P5"], ["Excuse me. I'd like the bill, please.", "P5"],
    ["She can take a bus, but she can't take a taxi.", "P6"], ["I go to work by bus.", "P6"], ["A return ticket to Glasgow, please.", "P6"], ["Your flight is delayed.", "P6"],
    ["There's some butter, but there aren't any eggs.", "P7"], ["How much water do you drink every day?", "P7"], ["Are you ready to order?", "P7"], ["How much is that altogether?", "P7"]
  ], 2),
  A("Reading Comprehension: Cara Mengerjakan", `<p>Soal reading memberi satu teks pendek lalu menanyakan isi teks atau grammar di dalamnya. Langkah yang efektif:</p>
<ol class="list-decimal pl-5 space-y-1"><li><strong>Baca pertanyaannya dulu</strong>, baru teksnya. Kamu jadi tahu informasi apa yang dicari.</li><li><strong>Cari kata kunci</strong> dari pertanyaan di dalam teks (nama, angka, hari, tempat). Jawaban biasanya ada di kalimat itu atau sesudahnya.</li><li><strong>Waspadai parafrasa</strong>: teks menulis <em>every morning</em>, pilihan jawaban menulis <em>daily</em>. Maknanya sama.</li><li><strong>Untuk soal grammar dalam teks</strong>, lihat subjek dan keterangan waktu di kalimat yang sama, lalu terapkan aturan P3–P7.</li><li><strong>Pilihan “not mentioned”</strong>: jawaban yang terdengar benar tetapi tidak tertulis di teks tetap salah.</li></ol>`, "Bagian Reading"),
  { type: "callout", tone: "info", heading: "Teks latihan: My Weekend", html: "<em>My name is Dewi. I'm a student at a university in Makassar. I live with my family in a small house near the beach. On weekdays I get up at half past five because my classes start at seven. I usually go to campus by bus, but on Fridays my brother takes me on his motorbike. On Saturdays I don't get up early. I like reading novels and I often go swimming with my friends. When I was a child, I couldn't swim, but now I can swim very well. There isn't any swimming pool near my house, so we swim in the sea. There are a lot of small cafés on the beach. My favourite café has some delicious fried bananas, but it doesn't have much space, so we often sit outside.</em>" },
  { type: "exercise", label: "Latihan Reading", title: "Jawab Berdasarkan Teks", headers: ["Pertanyaan", "Jawaban"], rows: [
    { cells: ["What time does Dewi get up on weekdays?"], fields: [{ options: ["05.30", "07.00", "06.30", "05.00"], answer: "05.30" }], ok: "✓ <em>half past five</em> = 05.30." },
    { cells: ["How does Dewi go to campus on Fridays?"], fields: [{ options: ["By motorbike", "By bus", "On foot", "By car"], answer: "By motorbike" }], ok: "✓ Biasanya by bus, tetapi hari Jumat kakaknya mengantar dengan motor. Perhatikan kata <em>but</em>." },
    { cells: ["Which statement is TRUE about Dewi?"], fields: [{ options: ["She can swim now.", "She could swim as a child.", "She swims in a pool.", "She hates reading."], answer: "She can swim now." }], ok: "✓ <em>When I was a child, I couldn't swim, but now I can swim very well.</em>" },
    { cells: ["“There isn't ___ swimming pool near my house.” Kata yang hilang adalah…"], fields: [{ options: ["any", "some", "many", "much"], answer: "any" }], ok: "✓ Kalimat negatif → any." },
    { cells: ["“…it doesn't have ___ space.” Kenapa much, bukan many?"], fields: [{ options: ["space uncountable", "space countable", "kalimat positif", "space jamak"], answer: "space uncountable" }], ok: "✓ space (ruang) tidak dihitung satu-dua, jadi much." },
    { cells: ["“I like ___ novels.” Bentuk yang benar…"], fields: [{ options: ["reading", "read", "reads", "to reading"], answer: "reading" }], ok: "✓ like + gerund." },
    { cells: ["Kata <em>often</em> di teks adalah…"], fields: [{ options: ["Adverb of frequency", "Adjective", "Demonstrative", "Article"], answer: "Adverb of frequency" }], ok: "✓ Menjawab how often?" }
  ] },
];
