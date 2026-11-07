// Bahasa Inggris — Pertemuan 7: New Cutting Edge Elementary, Module 6 "Eating and drinking"
const LAB3 = require("./lab_tahap3.js");
const Q = (q, opts, ans, exp) => ({ q, opts, ans, exp });
const ex = (label, title, headers, opts, rows, preview) => ({ type: "exercise", label, title, preview, headers, rows: rows.map(([c, a, h]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓ " + (h || "Benar!") })) });
const free = (label, title, preview, rows) => ({ type: "exercise", label, title, preview, headers: ["Soal", "Jawaban"], rows: rows.map(([c, a, ok]) => ({ cells: [c], fields: [{ answer: a, placeholder: "ketik jawaban" }], ok: "✓ " + (ok || "Benar!") })) });
module.exports = {
  id: "p7", nomor: 7, judul: "Module 6: Eating and Drinking (Countable/Uncountable, some/any)", ujian: "UTS",
  hero: {
    badge: "New Cutting Edge Elementary • Module 6",
    title: "Bicara tentang Makanan dan Memesan di Restoran",
    text: "<strong>Countable vs uncountable nouns</strong>, <strong>There is / There are</strong>, <strong>some / any</strong>, <strong>How much / How many</strong>, kosakata makanan, dan <strong>memesan makanan & minuman</strong>."
  },
  cheatsheet: [
    { type: "callout", tone: "tip", heading: "Kunci seluruh modul: bisa dihitung atau tidak?", html: "<strong>Countable</strong> (bisa dihitung, punya bentuk jamak): <em>an egg → two eggs, a banana, biscuits</em>. <strong>Uncountable</strong> (tidak dihitung, tanpa a/an, tanpa -s): <em>milk, butter, water, cheese, bread, rice</em>. Pilihan <em>is/are</em>, <em>some/any</em>, dan <em>much/many</em> semuanya bergantung pada ini." },
    { type: "table", label: "Interaktif 1 • Countable vs Uncountable", title: "Kosakata Makanan dari Modul", headers: ["Countable (bisa dihitung)", "Uncountable (tidak dihitung)"],
      rows: [["eggs, oranges, an apple, a banana", "milk, butter, cereal, jam, toast"], ["sausages, bread rolls, grapes, biscuits", "meat, cheese, yoghurt, fruit"], ["carrots, lemons, nuts", "orange juice, coffee, water, tea"], ["vegetables, noodles ➕", "rice, pasta, chocolate, grilled fish (sebagai makanan)"]],
      modes: [
        { label: "Countable", target: "col", col: 0, title: "a/an + jamak -s", text: "<em>There's an apple. There are eight eggs.</em>" },
        { label: "Uncountable", target: "col", col: 1, title: "Tanpa a/an, tanpa -s", text: "❌ <em>a milk, breads, rices</em>. ✅ <em>some milk, some bread, a glass of milk, a loaf of bread ➕</em>." },
        { label: "Jebakan", target: "row", row: 1, title: "fruit, bread", text: "<em>fruit</em> dan <em>bread</em> umumnya uncountable: <em>I eat a lot of fruit.</em> Yang countable: <em>an apple, a bread roll</em>." }
      ] },
    { type: "table", label: "Interaktif 2 • There is / There are", title: "Menyebut Apa yang Ada", headers: ["Jenis noun", "Positif", "Negatif"],
      rows: [["Countable tunggal", "There's a banana.", "There isn't a banana. / There's no banana."], ["Countable jamak", "There are eight eggs.", "There aren't any strawberries. / There are no strawberries."], ["Uncountable", "There's some butter.", "There isn't any apple juice. / There's no apple juice."]],
      modes: [
        { label: "is atau are?", target: "col", col: 1, title: "Lihat noun sesudahnya", text: "Tunggal & uncountable → <strong>There's</strong>; jamak → <strong>There are</strong>." },
        { label: "Pakai no", target: "col", col: 2, title: "no = not any", text: "Modul: kita sering membuat negatif dengan <em>no</em>: <em>There's no apple juice. There are no strawberries.</em> Jangan dobel: ❌ <em>There isn't no…</em>" },
        { label: "Pertanyaan", target: "row", row: 1, title: "Is there / Are there", text: "<em>Is there any milk? Are there any eggs?</em> — <em>Yes, there is/are. No, there isn't/aren't.</em>" }
      ] },
    { type: "choices", style: "toggle", label: "Interaktif 3 • some / any", title: "Kapan some, kapan any?", options: [
      { label: "+ some", tone: "emerald", title: "Kalimat positif", code: "Have some orange juice with your breakfast. If you want a snack, try some nuts.", text: "some + uncountable atau countable jamak." },
      { label: "− any", tone: "rose", title: "Kalimat negatif", code: "Don't drink any juice between meals. Water hasn't got any calories.", text: "any setelah not / -n't." },
      { label: "? any", tone: "sky", title: "Pertanyaan", code: "Is there any milk? Have we got any eggs?", text: "Pertanyaan umumnya memakai any." },
      { label: "➕ Menawarkan", tone: "amber", title: "Tawaran & permintaan → some", code: "Would you like some coffee? Can I have some water, please?", text: "Saat menawarkan atau meminta, pakai some walaupun kalimat tanya." }
    ] },
    { type: "table", label: "Interaktif 4 • How much / How many", title: "Menanyakan Jumlah", headers: ["Kata tanya", "Dipakai dengan", "Contoh dari modul"],
      rows: [["How many", "countable jamak", "How many McDonald's restaurants are there in the world? How many cups of coffee do you drink every day?"], ["How much", "uncountable", "How much blood is there in the human body? How much water do you drink every day?"], ["➕ How much (harga)", "menanyakan harga", "How much is that altogether? How much is it?"]],
      modes: [
        { label: "Jebakan", target: "row", row: 0, title: "cups of coffee", text: "coffee uncountable, tetapi <em>cups</em> countable → <strong>How many cups of coffee</strong>." },
        { label: "Jebakan", target: "row", row: 1, title: "money, homework, traffic", text: "Uncountable: How much money/homework/traffic? Countable: How many coins/brothers/students?" }
      ] },
    { type: "list", label: "Ringkas • Real Life", title: "Ordering Food and Drink", groups: [
      { title: "Pelayan", tone: "sky", items: ["Can I take your order, please?", "Are you ready to order?", "Anything to drink with that?", "Eat in or take away?", "Would you like anything else?", "What size would you like? ➕"] },
      { title: "Pelanggan", tone: "emerald", items: ["Can I have two Super King-Size burgers, please?", "I'd like to order a pizza.", "Yes, I'd like a cheese sandwich.", "A mineral water, please.", "How much is that altogether?", "Can we have the bill, please? • Keep the change."] }
    ] }
  ],
  simulator: [
    LAB3.EN_P7,
    ex("Permainan Interaktif 1 • Countable atau Uncountable?", "Kelompokkan Kata (Exercise 3a & Study modul)", ["Kata", "Jenis"], ["Countable", "Uncountable"], [
      ["egg", "Countable"], ["milk", "Uncountable"], ["butter", "Uncountable"], ["banana", "Countable"], ["biscuit", "Countable"], ["cheese", "Uncountable"],
      ["money", "Uncountable"], ["coin", "Countable"], ["traffic", "Uncountable"], ["flight", "Countable"], ["music", "Uncountable"], ["job", "Countable"], ["work", "Uncountable", "work (pekerjaan secara umum) uncountable; job countable."], ["chewing gum", "Uncountable"]
    ]),
    ex("Permainan Interaktif 2 • some / any", "Lengkapi Kalimat", ["Kalimat", "some/any"], ["some", "any"], [
      ["Are there ___ Mexican students in your class?", "any"], ["I'd like ___ water, please.", "some"], ["I haven't got ___ brothers or sisters.", "any"], ["I've got ___ e-mails from my students.", "some"],
      ["I'm sorry but there isn't ___ milk.", "any"], ["Are there ___ films on TV tonight?", "any"], ["For a healthy snack, you can eat ___ nuts.", "some"], ["Water hasn't got ___ calories.", "any"]
    ]),
    ex("Permainan Interaktif 3 • How much / How many", "Pilih Kata Tanya", ["Pertanyaan", "Kata tanya"], ["How much", "How many"], [
      ["___ brothers and sisters have you got?", "How many"], ["___ students are there in your class?", "How many"], ["___ money have you got with you today?", "How much"], ["___ languages can you speak?", "How many"],
      ["___ football do you watch on TV every week?", "How much"], ["___ homework is there tonight?", "How much"], ["___ water do you drink every day?", "How much"], ["___ hours' sleep do you have every night?", "How many"]
    ]),
    ex("Permainan Interaktif 4 • There is / There are", "Pilih Bentuk yang Tepat", ["Kalimat", "Jawaban"], ["There's", "There are", "There isn't", "There aren't"], [
      ["___ a banana on the table.", "There's"], ["___ eight eggs.", "There are"], ["___ some butter.", "There's"], ["___ any strawberries. (negatif)", "There aren't"], ["___ any apple juice. (negatif)", "There isn't"], ["___ a lot of restaurants in my town.", "There are"]
    ]),
    free("Permainan Interaktif 5 • Memesan Makanan", "Susun Percakapan (Practise 5 modul)", "Tulis kalimat lengkap.", [
      ["ready / order / you / Are / to ?", "Are you ready to order"], ["soup / can / Yes / some / have / chicken / please / I ?", ["Yes, can I have some chicken soup, please", "Yes can I have some chicken soup please"]],
      ["else / Anything ?", "Anything else"], ["sandwich / a / like / Yes / cheese / I'd", ["Yes, I'd like a cheese sandwich", "Yes I'd like a cheese sandwich"]], ["drink / you / Would / to / like / anything ?", "Would you like anything to drink"]
    ]),
    { type: "reveal", label: "Jawab dengan Kalimat Lengkap", title: "Cek Pemahaman Module 6, Lalu Buka", items: [
      { prompt: "Mengapa kita mengatakan “How many cups of coffee”, padahal coffee uncountable?", answer: "Karena yang dihitung adalah cups (cangkirnya), dan cup termasuk countable jamak.", reason: "Kalau menanyakan kopinya langsung: How much coffee do you drink?" },
      { prompt: "Apa beda “Is there any coffee?” dan “Would you like some coffee?”", answer: "any dipakai untuk bertanya (ada atau tidak), sedangkan some dipakai saat menawarkan atau meminta.", reason: "Can I have some water, please? juga memakai some." },
      { prompt: "Ubah menjadi negatif dengan no: “There isn't any milk.” dan “There aren't any eggs.”", answer: "There's no milk. • There are no eggs.", reason: "no = not any; jangan dobel negatif (✗ There isn't no milk)." },
      { prompt: "Apa yang salah pada kalimat “I'd like two breads and a milk”?", answer: "bread dan milk adalah uncountable (tanpa a/an dan tanpa -s).", reason: "Yang benar: some bread / two bread rolls dan some milk / a glass of milk." }
    ] }
  ],
  flashcards: [
    { tag: "Grammar", q: "Countable noun?", a: "Bisa dihitung, punya a/an dan bentuk jamak: an egg, two eggs." },
    { tag: "Grammar", q: "Uncountable noun?", a: "Tidak dihitung, tanpa a/an dan -s: milk, butter, water, rice, bread." },
    { tag: "Jebakan", q: "Bisakah uncountable dijamakkan?", a: "Tidak (dalam arti umum). Gunakan wadah: two glasses of milk, a cup of coffee." },
    { tag: "Grammar", q: "There's atau There are untuk butter?", a: "There's some butter (uncountable → is)." },
    { tag: "Grammar", q: "Negatif dengan no?", a: "There's no apple juice. There are no strawberries. (no = not any)" },
    { tag: "Grammar", q: "some vs any?", a: "some = positif; any = negatif & pertanyaan. (Menawarkan: Would you like some…?)" },
    { tag: "Grammar", q: "How much vs How many?", a: "How many + countable jamak; How much + uncountable (dan harga)." },
    { tag: "Jebakan", q: "How much cups of coffee?", a: "Salah → How many cups of coffee (cups countable)." },
    { tag: "Kosakata", q: "Contoh uncountable dari Study modul?", a: "money, traffic, economics, tennis, music, transport, work, chewing gum." },
    { tag: "Kosakata", q: "Plural tidak beraturan: person, woman, knife, wife, baby?", a: "people, women, knives, wives, babies." },
    { tag: "Reading", q: "Fakta modul: Is fruit juice good for you?", a: "True and false: baik, tetapi bisa merusak gigi; jangan minum jus di antara jam makan, minum air saja." },
    { tag: "Reading", q: "Carrots help you see in the dark?", a: "False. Wortel kaya vitamin A yang baik untuk mata, tetapi tidak ada yang bisa melihat dalam gelap." },
    { tag: "Real life", q: "Pertanyaan pelayan fast food tentang dibawa pulang?", a: "Eat in or take away?" },
    { tag: "Real life", q: "Menanyakan total harga?", a: "How much is that altogether?" }
  ],
  quiz: [
    Q("Yang termasuk uncountable noun adalah…", ["milk", "egg", "banana", "biscuit"], 0, "milk tidak dapat dihitung satu per satu."),
    Q("Yang termasuk countable noun adalah…", ["orange", "butter", "cheese", "water"], 0, "an orange, two oranges."),
    Q("Kata yang SALAH…", ["two breads", "two bread rolls", "some bread", "a lot of bread"], 0, "bread uncountable."),
    Q("___ a banana on the table.", ["There's", "There are", "There aren't", "Are there"], 0, "Countable tunggal."),
    Q("___ eight eggs in the picture.", ["There are", "There's", "There is", "It is"], 0, "Jamak → there are."),
    Q("___ some butter.", ["There's", "There are", "They are", "There have"], 0, "Uncountable → there's."),
    Q("Arti “There's no apple juice.”", ["Tidak ada jus apel.", "Ada sedikit jus apel.", "Jus apel itu tidak enak.", "Itu bukan jus apel."], 0, "no = not any."),
    Q("Have ___ orange juice with your breakfast.", ["some", "any", "a", "many"], 0, "Positif → some."),
    Q("Don't drink ___ juice between meals.", ["any", "some", "a", "many"], 0, "Negatif → any."),
    Q("“Is there ___ milk?”", ["any", "some", "a", "many"], 0, "Pertanyaan → any."),
    Q("I haven't got ___ brothers or sisters.", ["any", "some", "a", "much"], 0, "Negatif → any."),
    Q("Pelayan menawarkan: “Would you like ___ coffee?”", ["some", "any", "many", "a"], 0, "Menawarkan → some."),
    Q("___ water do you drink every day?", ["How much", "How many", "How long", "How often"], 0, "water uncountable."),
    Q("___ cups of coffee do you drink every day?", ["How many", "How much", "How long", "What"], 0, "cups countable."),
    Q("___ money have you got with you today?", ["How much", "How many", "How long", "Which"], 0, "money uncountable."),
    Q("Bentuk jamak dari <em>knife</em>…", ["knives", "knifes", "knifs", "knive"], 0, "-fe → -ves."),
    Q("Bentuk jamak dari <em>person</em>…", ["people", "persons", "peoples", "personnes"], 0, "Irregular plural."),
    Q("Menurut teks Food: Facts and myths, “It's okay not to eat breakfast” adalah…", ["False", "True", "True and false", "Tidak dibahas"], 0, "Tanpa sarapan kita lapar dan makan camilan manis."),
    Q("Menurut teks, “Vegetarian food is always healthy” adalah…", ["False", "True", "True and false", "Tidak dibahas"], 0, "Masakan vegetarian bisa banyak keju dan minyak."),
    Q("Pelayan: “Eat in or ___?”", ["take away", "take out of", "eat away", "go away"], 0, "British: take away (AmE: to go)."),
    Q("Pelanggan menanyakan total harga…", ["How much is that altogether?", "How many is that altogether?", "How much are you?", "What price is together?"], 0, "Ungkapan dari modul."),
    Q("Urutan yang benar: <em>ready / order / you / Are / to ?</em>", ["Are you ready to order?", "Are you to order ready?", "You are ready to order?", "Ready are you to order?"], 0, "Pertanyaan be: Are + you + ready + to order.")
  ],
  ringkasan: `*RANGKUMAN P7 BAHASA INGGRIS: EATING AND DRINKING*
1️⃣ Countable (an egg, two eggs) vs uncountable (milk, butter, rice, bread, money).
2️⃣ There's + tunggal/uncountable • There are + jamak • There's no… / There are no…
3️⃣ some (+), any (− dan ?), Would you like some…? (tawaran)
4️⃣ How many + jamak (cups, students) • How much + uncountable (water, money) & harga.
5️⃣ Plural khusus: people, women, knives, wives, babies.
6️⃣ Restoran: Are you ready to order? Can I have…? Eat in or take away? How much is that altogether?`
};
