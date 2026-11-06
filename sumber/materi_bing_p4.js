// Materi Lengkap Bahasa Inggris P4 — CPMK 1 (ulasan P1–P3)
const { box, arrow, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const say = (label, title, items, cols) => ({ type: "say", label, title, cols, items: items.map(x => Array.isArray(x) ? { en: x[0], id: x[1], note: x[2] } : x) });

const tree = diagram({
  label: "Diagram Interaktif", title: "Pohon Keputusan: Kalimat Present Simple", desc: "Klik setiap kotak, ikuti dari atas.", minw: 520,
  svg: svg(740, 330,
    box(250, 10, 220, 50, "Ada kata kerja (V)?", "violet", "q", { size: 15 }) +
    arrow(300, 60, 160, 110) + text(205, 80, "Tidak", { size: 13, color: "#475569" }) + arrow(420, 60, 560, 110) + text(515, 80, "Ya", { size: 13, color: "#475569" }) +
    box(40, 112, 240, 50, "Pakai be: am / is / are", "sky", "be", { size: 14 }) + box(440, 112, 240, 50, "Pakai do / don't (+ V1)", "emerald", "do", { size: 14 }) +
    box(0, 200, 140, 46, "+ I'm a student.", "sky", "bp", { size: 12 }) + box(180, 200, 150, 46, "− She isn't here.", "sky", "bn", { size: 12 }) + box(75, 262, 170, 46, "? Are you married?", "sky", "bq", { size: 12 }) +
    box(400, 200, 140, 46, "+ We live here.", "emerald", "dp", { size: 12 }) + box(580, 200, 155, 46, "− I don't eat meat.", "emerald", "dn", { size: 12 }) + box(475, 262, 170, 46, "? Do you work?", "emerald", "dq", { size: 12 }) +
    arrow(140, 162, 70, 198) + arrow(180, 162, 255, 198) + arrow(160, 162, 160, 260) + arrow(540, 162, 470, 198) + arrow(580, 162, 657, 198) + arrow(560, 162, 560, 260)
  ),
  parts: [
    { id: "q", label: "Langkah 1", title: "Cari kata kerja", text: "Kata kerja = aksi/kebiasaan (live, work, go, eat, like). Nama pekerjaan, umur, asal, kata sifat BUKAN kata kerja." },
    { id: "be", label: "be", title: "am / is / are", text: "Pilih sesuai subjek: I am, he/she/it is, you/we/they are." },
    { id: "do", label: "do", title: "do / don't", text: "Di P3 hanya I/you/we/they. Untuk he/she/it nanti memakai does/doesn't (P5)." },
    { id: "bp", label: "be +", title: "Positif", text: "S + be + keterangan." }, { id: "bn", label: "be −", title: "Negatif", text: "S + be + not: isn't, aren't, I'm not." }, { id: "bq", label: "be ?", title: "Tanya", text: "Be + S …? Jawab: Yes, I am." },
    { id: "dp", label: "do +", title: "Positif", text: "S + V1 (tanpa do)." }, { id: "dn", label: "do −", title: "Negatif", text: "S + don't + V1." }, { id: "dq", label: "do ?", title: "Tanya", text: "Do + S + V1? Jawab: Yes, I do / No, I don't." }
  ]
});

module.exports = [
  A("Tentang Pertemuan Ini", `<p>Pertemuan 4 adalah <strong>CPMK 1</strong> dengan cakupan materi P1–P4. File modul P4 yang diunggah ternyata <strong>sama persis</strong> dengan modul P3 (Module 3: <em>Everyday life</em>), jadi materinya sudah tercakup di P3. Halaman ini merangkum semua materi CPMK 1 dalam satu tempat, dengan latihan campuran.</p>`, "Bagian 1"),
  tree,
  A("Ringkasan P1: Parts of Speech", `<ul><li><strong>Noun</strong>: concrete, abstract, common/proper, collective.</li><li><strong>Pronoun</strong>: personal, reflexive, interrogative, demonstrative.</li><li><strong>Verb</strong>: transitive (butuh objek), intransitive, auxiliary (be/have/do).</li><li><strong>Adjective</strong> menjelaskan noun; <strong>adverb</strong> menjelaskan verb (manner, place, time, frequency).</li><li><strong>Preposition</strong>: time/place/direction. <strong>Conjunction</strong>: coordinating (FANBOYS), subordinating, correlative.</li></ul>`, "Bagian 2"),
  A("Ringkasan P2: People and Places", `<ul><li>to be untuk nama, asal, umur, pekerjaan, status: <em>I'm Rina. I'm from Malang. I'm nineteen. I'm a student. I'm single.</em></li><li>Short answers: <em>Yes, I am. / No, I'm not.</em></li><li>a/an + jobs berdasarkan bunyi.</li><li>Country → nationality dan aturan huruf kapital.</li></ul>`, "Bagian 3"),
  A("Ringkasan P3: Everyday Life", `<ul><li>Present simple I/you/we/they: V1, don't + V1, Do…?</li><li>Kolokasi: live in/with, work for/long hours, go to/out/home, have breakfast.</li><li>Jam: past/to, quarter, half.</li><li>at (jam, night, the weekend), on (hari), in (morning/afternoon/evening).</li><li>Me, too / Me, neither.</li></ul>`, "Bagian 4"),
  tip("Tips mengerjakan soal pilihan ganda", "Baca <strong>seluruh kalimat</strong> dulu, cari subjeknya, lalu coret opsi yang jelas salah bentuknya (mis. <em>I is</em>, <em>don't likes</em>). Untuk soal jam, tulis angkanya di kertas dan gambar jam kecil.", "warn"),
  say("🔊 Pelafalan", "Kalimat Inti CPMK 1", [
    ["Hello, my name's Rina. I'm from Malang.", "Perkenalan"], ["I'm an information systems student.", "an + bunyi vokal"], ["Are you married? No, I'm not.", "Short answer"], ["Do you live with your parents? Yes, I do.", "Present simple"],
    ["I get up at half past five.", "05.30"], ["I don't watch TV in the morning.", "Negatif"], ["Me, too.", "Setuju (positif)"], ["Me, neither.", "Setuju (negatif)"]
  ], 2)
];
