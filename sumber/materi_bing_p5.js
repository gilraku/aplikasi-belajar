// Materi Lengkap Bahasa Inggris P5 — Module 4 Loves and hates
const { box, arrow, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const say = (label, title, items, cols) => ({ type: "say", label, title, cols, items: items.map(x => Array.isArray(x) ? { en: x[0], id: x[1], note: x[2] } : x) });
const free = (label, title, preview, rows) => ({ type: "exercise", label, title, preview, headers: ["Soal", "Jawaban"], rows: rows.map(([c, a, ok]) => ({ cells: [c], fields: [{ answer: a, placeholder: "ketik jawaban" }], ok: "✓ " + (ok || "Benar!") })) });

const moveS = diagram({
  label: "Diagram Interaktif", title: "-s yang Berpindah ke does", desc: "Klik kotaknya. Huruf -s hanya muncul SATU kali di setiap kalimat.", minw: 520,
  svg: svg(720, 270,
    text(20, 35, "(+)", { anchor: "start", size: 16, color: "#475569" }) + box(60, 12, 110, 46, "She", "sky", "s") + box(180, 12, 150, 46, "like-S", "emerald", "v1") + box(340, 12, 150, 46, "London.", "slate", null) +
    text(20, 125, "(−)", { anchor: "start", size: 16, color: "#475569" }) + box(60, 102, 110, 46, "She", "sky", "s") + box(180, 102, 150, 46, "doe-S-n't", "rose", "neg") + box(340, 102, 110, 46, "like", "emerald", "v2") + box(460, 102, 120, 46, "London.", "slate", null) +
    text(20, 215, "(?)", { anchor: "start", size: 16, color: "#475569" }) + box(60, 192, 110, 46, "Doe-S", "rose", "q") + box(180, 192, 110, 46, "she", "sky", "s") + box(300, 192, 110, 46, "like", "emerald", "v2") + box(420, 192, 120, 46, "London?", "slate", null) +
    arrow(255, 60, 255, 98, { dash: "5 4" }) + arrow(200, 150, 120, 188, { dash: "5 4" }) +
    box(590, 192, 120, 46, "Yes, she does.", "amber", "ans", { size: 12 })
  ),
  parts: [
    { id: "s", label: "Subjek", title: "he / she / it", text: "Termasuk nama satu orang (Madonna, my father) atau satu benda (the film, the shop)." },
    { id: "v1", label: "Positif", title: "Kata kerja + s", text: "Tanpa auxiliary, -s menempel di kata kerja: likes, watches, studies, has." },
    { id: "neg", label: "Negatif", title: "doesn't membawa -s", text: "does = do + es. Karena -s sudah dibawa doesn't, kata kerja kembali ke bentuk dasar." },
    { id: "q", label: "Tanya", title: "Does membawa -s", text: "Does di depan subjek, kata kerja bentuk dasar. NOT: Does she likes?" },
    { id: "v2", label: "V1 dasar", title: "Tanpa -s", text: "like, watch, study, have (bukan has!): <em>Does she have a car?</em>" },
    { id: "ans", label: "Jawaban", title: "Short answer", text: "Yes, she does. / No, she doesn't. Jangan menjawab “Yes, she likes.”" }
  ]
});

module.exports = [
  A("Isi Module 4", `<p>Module 4 <em>Loves and hates</em> membahas: present simple untuk <em>he</em> dan <em>she</em>; <em>like … -ing</em>; pertanyaan; kata kerja aktivitas dan <em>adverbs of frequency</em>; listening tentang hal yang disukai/dibenci selebritas; bacaan <em>An American star in London … and a British star in Hollywood</em>; tugas mencari teman e-mail; dan real life: meminta dengan sopan.</p>
<p>Listening pembuka: selebritas yang suka atau benci <em>dog, doll, clown, crowd, spider, TV, flying, doing housework</em>. Contoh kalimat modul: <em>Cameron Diaz doesn't watch TV. Johnny Depp hates clowns. Dean Cain never goes on planes. Britney Spears has hundreds of dolls.</em></p>`, "Bagian 1"),
  moveS,
  A("Language Focus 1–2: he/she dan Pertanyaan", `<p>Positif: <em>He hates spiders. She loves dolls.</em> Negatif: <em>He doesn't like clowns. She doesn't watch TV.</em> Bentuk khusus: <em>have → has, go → goes, do → does</em>.</p>
<p>Pertanyaan: <em>Does she like London? — Yes, she does. Does she miss the USA? — No, she doesn't.</em> Wh-: <em>What does she think about British people? Where does she come from?</em></p>
<p>Latihan modul dengan Sarinder (teman dari Delhi yang tinggal di Brighton): pilih bentuk yang tepat, mis. <em>This <strong>is</strong> my friend Sarinder. He <strong>comes</strong> from Delhi… His parents <strong>are</strong> both doctors… They <strong>want</strong> to go back to India… Sarinder <strong>loves</strong> Brighton because he <strong>'s got</strong> lots of friends here.</em> Kuncinya: subjek tunggal (he) → -s; subjek jamak (his parents, they) → tanpa -s.</p>`, "Bagian 2"),
  tip("➕ Kalimat dengan subjek jamak tetap tanpa -s", "<em>My parents <strong>live</strong> in Delhi.</em> (bukan lives) — <em>Ben and Emily <strong>work</strong> in London.</em> Banyak salah karena lupa subjeknya dua orang.", "warn"),
  free("Latihan • Sarinder (gaya modul)", "Pilih Bentuk Kata Kerja yang Tepat", "Ketik bentuk yang benar.", [
    ["He ___ (come/comes) from Delhi in India.", "comes"], ["Now he ___ (live/lives) in Brighton.", "lives"], ["His parents ___ (is/are) both doctors.", "are"], ["After Sarinder ___ (finish/finishes) college, his parents want to go back.", "finishes"],
    ["Every year they ___ (go/goes) back to India.", "go"], ["Sometimes he ___ (miss/misses) his grandparents' big house.", "misses"], ["They ___ ('s got/'ve got) a fantastic garden.", "'ve got"]
  ]),
  A("Language Focus 3: Activity Verbs dan Adverbs of Frequency", `<p>Kata kerja aktivitas berpasangan dengan kata tertentu: <em>read a newspaper, go swimming, play football, write a letter, listen to the radio, watch television, go to school, visit friends, do nothing, have a meal</em>. Tambahan modul: <em>shopping, a magazine, the cinema, an e-mail, the guitar, CDs, a video, computer games, a restaurant, a shower, your relatives, your homework</em>.</p>
<p>Adverbs of frequency (<em>always, usually, often, sometimes, not … often, never</em>) diletakkan <strong>sebelum</strong> kata kerja di kalimat positif dan <strong>setelah</strong> <em>don't</em> di kalimat negatif. Pertanyaan modul: <em>Do you ever go to concerts? — Not often. How about you?</em></p>`, "Bagian 3"),
  { type: "diagram", label: "Diagram Interaktif", title: "Skala Adverbs of Frequency", desc: "Klik setiap titik pada skala.", minw: 520,
    svg: svg(720, 150,
      `<line x1="70" y1="70" x2="650" y2="70" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>` +
      [["never", 70, "slate", "nv", "0%"], ["not often", 186, "rose", "no", "20%"], ["sometimes", 302, "amber", "so", "40%"], ["often", 418, "sky", "of", "60%"], ["usually", 534, "violet", "us", "80%"], ["always", 650, "emerald", "al", "100%"]]
        .map(([t, x, c, p, pct]) => `<g data-part="${p}"><circle cx="${x}" cy="70" r="16" fill="#fff" stroke="#6366f1" stroke-width="3"/></g>` + box(x - 55, 100, 110, 34, t, c, p, { size: 13 }) + text(x, 35, pct, { size: 12, color: "#475569" })).join("")),
    parts: [
      { id: "nv", label: "never", title: "0%", text: "I never watch football on television. (never sudah negatif: jangan ditambah don't)" },
      { id: "no", label: "not often", title: "±20%", text: "I don't often write letters. / Not often. (jawaban singkat)" },
      { id: "so", label: "sometimes", title: "±40%", text: "Paling fleksibel: boleh di awal kalimat juga. <em>Sometimes I cook.</em>" },
      { id: "of", label: "often", title: "±60%", text: "I often go shopping on Saturday." },
      { id: "us", label: "usually", title: "±80%", text: "I usually listen to the radio in the car." },
      { id: "al", label: "always", title: "100%", text: "I always read the newspaper in the morning." }
    ] },
  A("Task: Find an E-mail Friend", `<p>Teresa (21 tahun, mahasiswi musik dari Cork, Irlandia) menulis profil di situs <em>Findmeafriend.com</em>: ia <strong>loves</strong> semua jenis musik, suka menulis dan bermain piano serta gitar, bioskop, membaca, internet, anjing, menyetir, keluar dengan teman, traveling, dan berbahasa Spanyol; ia <strong>hates</strong> sepak bola (dan semua olahraga), laba-laba, kucing, makan daging, dan tidak melakukan apa pun.</p>
<p>Ungkapan tugas: <em>Where is … from? How old is …? Is … a student? What … like? What languages … speak?</em> Diskusi: <em>I think … is best because (he likes music, too). … isn't good because (he doesn't like classical music). I agree / I don't agree. Maybe … Yes, but …</em></p>`, "Bagian 4"),
  A("Real Life: Asking Politely", `<p>Lima percakapan di café: <em>Excuse me. I'd like the bill, please. • Do you want milk? — No, thanks. I'm fine. • Excuse me. I'd like three lemonades, please. — Anything else? — No, thank you. • I'd like one of those, please. — The chocolate ones? — Yes, please. • Do you want a drink? — That's a good idea!</em></p>
<p>Intonasi: suara yang naik-turun lebar terdengar <strong>sopan</strong>; datar terdengar kasar atau bosan.</p>`, "Bagian 5"),
  { type: "choices", style: "toggle", label: "➕ Tambahan • Tingkat Kesopanan", title: "want vs would like", options: [
    { label: "Kurang sopan", tone: "rose", title: "I want …", code: "I want a coffee.", text: "Terdengar seperti menuntut, terutama ke pelayan." },
    { label: "Sopan", tone: "emerald", title: "I'd like … / Can I have …?", code: "I'd like a coffee, please. Can I have the bill, please?", text: "Standar di restoran dan toko." },
    { label: "Menawarkan", tone: "sky", title: "Would you like …?", code: "Would you like some milk? — Yes, please. / No, thank you.", text: "Lebih sopan dari Do you want …? (modul memakai keduanya)." }
  ] },
  say("🔊 Pelafalan", "Akhiran -s: /s/, /z/, /ɪz/", [
    { en: "books", id: "/s/" }, { en: "likes", id: "/s/" }, { en: "Mark's", id: "/s/" }, { en: "newspapers", id: "/z/" }, { en: "loves", id: "/z/" }, { en: "Anna's", id: "/z/" },
    { en: "places", id: "/ɪz/" }, { en: "watches", id: "/ɪz/" }, { en: "Tomas's", id: "/ɪz/" }, { en: "Excuse me. I'd like the bill, please.", id: "intonasi sopan" }, { en: "Do you want milk?", id: "naik di akhir" }, { en: "No, thanks. I'm fine.", id: "menolak sopan" }
  ], 3)
];
