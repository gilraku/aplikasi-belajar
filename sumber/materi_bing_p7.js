// Materi Lengkap Bahasa Inggris P7 — Module 6 Eating and drinking
const { box, arrow, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const say = (label, title, items, cols) => ({ type: "say", label, title, cols, items: items.map(x => Array.isArray(x) ? { en: x[0], id: x[1], note: x[2] } : x) });
const free = (label, title, preview, rows) => ({ type: "exercise", label, title, preview, headers: ["Soal", "Jawaban"], rows: rows.map(([c, a, ok]) => ({ cells: [c], fields: [{ answer: a, placeholder: "ketik jawaban" }], ok: "✓ " + (ok || "Benar!") })) });

const nounMap = diagram({
  label: "Diagram Interaktif", title: "Satu Pertanyaan, Semua Aturan Ikut", desc: "Mulai dari atas: apakah noun-nya bisa dihitung? Klik setiap kotak.", minw: 560,
  svg: svg(760, 330,
    box(250, 10, 260, 50, "Bisa dihitung? (1, 2, 3…)", "violet", "q", { size: 15 }) +
    arrow(320, 60, 190, 100) + text(235, 75, "Ya", { size: 13, color: "#475569" }) + arrow(440, 60, 570, 100) + text(525, 75, "Tidak", { size: 13, color: "#475569" }) +
    box(60, 102, 260, 50, "COUNTABLE: egg, apple, biscuit", "emerald", "c", { size: 13 }) + box(440, 102, 260, 50, "UNCOUNTABLE: milk, butter, rice", "sky", "u", { size: 13 }) +
    box(20, 180, 160, 44, "a/an + tunggal", "emerald", "c1", { size: 13 }) + box(190, 180, 160, 44, "There are + jamak", "emerald", "c2", { size: 13 }) + box(100, 250, 180, 44, "How many …?", "emerald", "c3", { size: 13 }) +
    box(410, 180, 160, 44, "tanpa a/an & -s", "sky", "u1", { size: 13 }) + box(580, 180, 160, 44, "There's some …", "sky", "u2", { size: 13 }) + box(490, 250, 180, 44, "How much …?", "sky", "u3", { size: 13 }) +
    box(300, 250, 170, 44, "some/any: keduanya", "amber", "sa", { size: 13 })
  ),
  parts: [
    { id: "q", label: "Tes", title: "Bisa ditambah angka?", text: "Coba ucapkan “three ___”. <em>three eggs</em> ✓ → countable. <em>three milks</em> ✗ → uncountable." },
    { id: "c", label: "Countable", title: "Benda yang terpisah-pisah", text: "eggs, oranges, an apple, sausages, bread rolls, grapes, a banana, biscuits." },
    { id: "u", label: "Uncountable", title: "Cairan, bahan, massa, ide", text: "milk, butter, cereal, toast, jam, meat, cheese, yoghurt, orange juice, coffee, water, tea, fruit. Juga kata abstrak: money, music, work, traffic." },
    { id: "c1", label: "Article", title: "a/an", text: "There's <strong>an</strong> apple. There's <strong>a</strong> banana." }, { id: "c2", label: "Jamak", title: "There are", text: "There are eight eggs. There are some plants in the classroom." }, { id: "c3", label: "Tanya", title: "How many", text: "How many brothers and sisters have you got?" },
    { id: "u1", label: "Article", title: "Tanpa a/an", text: "❌ a milk ✅ some milk / a glass of milk ➕." }, { id: "u2", label: "Selalu tunggal", title: "There's", text: "There's some butter. There isn't any apple juice." }, { id: "u3", label: "Tanya", title: "How much", text: "How much water do you drink every day?" },
    { id: "sa", label: "some/any", title: "Dipakai untuk keduanya", text: "some/any dipakai dengan uncountable dan countable jamak: some fruit, some nuts; any milk, any eggs." }
  ]
});

module.exports = [
  A("Isi Module 6", `<p>Module 6 <em>Eating and drinking</em> membahas <em>There is</em> dan <em>There are</em>; <em>some</em> dan <em>any</em>; <em>How much</em> dan <em>How many</em>; kosakata makanan (countable & uncountable); listening <em>Breakfasts around the world</em>; reading <em>Food: Facts and myths</em>; tugas menemukan perbedaan dua gambar; dan real life: memesan makanan dan minuman.</p>
<p>Gambar pembuka adalah sarapan di restoran hotel: <em>milk, eggs, butter, cereal, oranges, jam, an apple, toast, bread rolls, meat, sausages, grapes, a banana, cheese, yoghurt, orange juice, coffee, water, tea, fruit, biscuits</em>.</p>`, "Bagian 1"),
  nounMap,
  A("There is / There are", `<p>Untuk menyebut apa yang ada di suatu tempat: <em>There's a banana</em> (tunggal), <em>There are eight eggs</em> (jamak), <em>There's some butter</em> (uncountable). Negatif sering dibuat dengan <strong>no</strong>: <em>There's no apple juice. There are no strawberries.</em></p>
<p>Pelafalan: bunyi akhir kata menyambung ke kata berikutnya (linking): <em>There's‿an apple. There‿are‿a lot of grapes.</em></p>`, "Bagian 2"),
  A("Breakfasts Around the World", `<p>Listening: lima orang bercerita tentang sarapan mereka, yaitu Kemal (mahasiswa dari Ankara, Turki), Mi-Kyung (Seoul, Korea Selatan), Dimitry (Moscow, Rusia), Sonia (Recife, Brasil utara), serta José dan Anita (Valencia, Spanyol). Pertanyaan diskusi: <em>What do you usually have for breakfast? Are the breakfasts in the recording the same or different from yours? Which ones would you like to try?</em></p>`, "Bagian 3"),
  tip("➕ Ceritakan sarapan Indonesia", "<em>In Indonesia, a lot of people have rice for breakfast. I usually have <strong>some</strong> fried rice and <strong>a</strong> cup of tea. I don't eat <strong>any</strong> bread in the morning.</em> Perhatikan some/any/a di kalimat ini.", "info"),
  A("Food: Facts and Myths (ringkasan)", `<p>Bacaan menguji enam anggapan tentang makan sehat:</p>
<ul><li><strong>Fruit juice is good for you</strong> — true and false: baik, tetapi bisa merusak gigi; jangan minum di antara jam makan, minum air saja (air tidak berkalori).</li><li><strong>It's okay not to eat breakfast</strong> — false: tanpa sarapan kita lapar lalu makan camilan manis; camilan sehat: kacang atau melon.</li><li><strong>Coffee and tea are bad for you</strong> — true and false: kopi jangan lebih dari dua cangkir sehari dan jangan sebelum tidur; teh umumnya baik, terutama teh hijau, tanpa susu dan gula.</li><li><strong>Vegetarian food is always healthy</strong> — false: bisa banyak keju dan minyak; yang penting sayur dan buah setiap hari.</li><li><strong>Carrots help you see in the dark</strong> — false: vitamin A baik untuk mata, tetapi tak ada yang bisa melihat dalam gelap.</li><li><strong>There are ‘good’ foods and ‘bad’ foods</strong> — false: yang ada pola makan baik dan buruk; makanlah seimbang.</li></ul>`, "Bagian 4"),
  A("some/any dan How much/How many", `<p>Grammar modul: <em>Have <strong>some</strong> orange juice with your breakfast. Don't drink <strong>any</strong> juice between meals. Water hasn't got <strong>any</strong> calories. If you want a snack, try <strong>some</strong> nuts.</em> Pertanyaan biasanya memakai any: <em>Is there any milk? Have we got any eggs?</em></p>
<p><em>How many</em> + countable (<em>How many McDonald's restaurants are there in the world?</em>); <em>How much</em> + uncountable (<em>How much rain is there in the Sahara desert every year?</em>).</p>`, "Bagian 5"),
  free("Latihan • some/any (Practice 1a modul)", "Lengkapi dengan some atau any", "Ketik some atau any.", [
    ["It isn't a good idea to drink ___ fruit juice between meals.", "any"], ["Water hasn't got ___ calories.", "any"], ["For a healthy snack, you can eat ___ nuts.", "some"], ["Don't drink ___ coffee before you go to bed.", "any"],
    ["Is there ___ sugar in your tea?", "any"], ["It's good to eat ___ pasta, rice or bread every day.", "some"]
  ]),
  A("Real Life: Ordering Food and Drink", `<p>Tiga percakapan di restoran burger, pizza, dan kafe. Kalimat penting (Exercise 3): <em>Can I take your <strong>order</strong>, please? • <strong>Can</strong> I have two Super King-Size burgers, please? • <strong>Anything</strong> to drink with that? • Eat in or take <strong>away</strong>? • Would you like anything <strong>else</strong>? • Can we <strong>have</strong> the bill, please? • <strong>Keep</strong> the change. • I'd like to <strong>order</strong> a pizza. • <strong>What size</strong> would you like? • How <strong>much</strong> is that altogether?</em></p>
<p>Kata internasional yang mirip bahasa Indonesia tetapi tekanannya berbeda: <em>restaurant, airport, hospital, café, hotel, university, snack bar, platform, terminal, college, information desk</em>.</p>`, "Bagian 6"),
  say("🔊 Pelafalan", "Kosakata Makanan & Restoran", [
    ["yoghurt", "YOG-ət"], ["cereal", "SIə-ri-əl"], ["biscuits", "BIS-kits"], ["sausages", "SOS-ij-iz"], ["vegetables", "VEJ-tə-bəlz", "3 suku: suku -e- kedua tidak dibaca."], ["sandwich", "SAN-wich"],
    ["mayonnaise", "may-ə-NAYZ"], ["spaghetti", "spə-GE-ti"], ["There's an apple.", "linking: there-zan"], ["Can I take your order, please?", "pelayan"], ["Eat in or take away?", "dibawa pulang?"], ["How much is that altogether?", "total harga"]
  ], 3)
];
