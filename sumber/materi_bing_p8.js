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
  A("Tentang UTS", `<p>Pertemuan 8 adalah <strong>UTS</strong> dengan cakupan materi P1–P7. Jadwal tutorial UTS: <strong>14 November 2026</strong>. Materinya berasal dari slide dosen (Parts of Speech) dan buku <strong>New Cutting Edge Elementary</strong>: Module 1, 3, 4, 5, dan 6.</p>
<p>Gunakan halaman ini sebagai peta, lalu ulangi kuis per pertemuan atau kerjakan bank soal gabungan di tab Kuis.</p>`, "Bagian 1"),
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
  ], 2)
];
