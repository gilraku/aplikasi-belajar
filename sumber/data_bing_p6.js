// Bahasa Inggris — Pertemuan 6: New Cutting Edge Elementary, Module 5 "Getting from A to B"
const LAB3 = require("./lab_tahap3.js");
const Q = (q, opts, ans, exp) => ({ q, opts, ans, exp });
const ex = (label, title, headers, opts, rows, preview) => ({ type: "exercise", label, title, preview, headers, rows: rows.map(([c, a, h]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓ " + (h || "Benar!") })) });
module.exports = {
  id: "p6", nomor: 6, judul: "Module 5: Getting from A to B (can/can't, Articles, Transport)", ujian: "UTS",
  hero: {
    badge: "New Cutting Edge Elementary • Module 5",
    title: "Bepergian dengan Bahasa Inggris",
    text: "<strong>can / can't</strong> untuk kemampuan dan izin, article <strong>a/an, the, dan zero (tanpa article)</strong>, kosakata <strong>transportasi</strong> dan <strong>bandara</strong>, serta membeli <strong>tiket kereta</strong>."
  },
  cheatsheet: [
    { type: "callout", tone: "tip", heading: "Dua hal paling penting", html: "(1) <strong>can</strong> tidak pernah berubah dan selalu diikuti <strong>V1</strong>: <em>She can take a bus. She can't take a taxi.</em> (2) Article: <strong>a/an</strong> = salah satu/disebut pertama, <strong>the</strong> = yang sudah jelas/satu-satunya, <strong>tanpa article</strong> = nama kota/negara biasa, hari, makan, dan frasa tetap seperti <em>by bus, go home</em>." },
    { type: "table", label: "Interaktif 1 • can / can't", title: "Pola Modal can", headers: ["Bentuk", "Rumus", "Contoh"],
      rows: [["Positif (+)", "S + can + V1", "She can take a bus at twenty past three."], ["Negatif (−)", "S + can't (cannot) + V1", "She can't take a taxi because she's only got $25."], ["Pertanyaan (?)", "Can + S + V1 …?", "Can she take the subway to the airport?"], ["Jawaban singkat", "Yes, S can. / No, S can't.", "Can you travel by tram in New York? No, you can't."], ["Tidak pasti", "It depends.", "Can you find a taxi easily in Hamburg? It depends."]],
      modes: [
        { label: "Jebakan", target: "col", col: 1, title: "Tanpa -s, tanpa to", text: "❌ <em>She cans</em>, ❌ <em>She can to go</em>, ❌ <em>Does she can…?</em> ✅ <em>She can go. Can she go?</em>" },
        { label: "Fungsi", target: "row", row: 0, title: "Kemampuan & kemungkinan/izin", text: "Kemampuan: <em>I can drive.</em> Kemungkinan/izin: <em>You can't smoke on buses.</em>" },
        { label: "Pelafalan", target: "row", row: 1, title: "can vs can't", text: "Positif: can lemah /kən/. Negatif: can't panjang & bertekanan /kɑ:nt/ (British) atau /kænt/ (American)." }
      ] },
    { type: "table", label: "Interaktif 2 • a/an, the, zero", title: "Kapan Pakai Article? (Grammar modul)", headers: ["Pemakaian", "Article", "Contoh"],
      rows: [["Benda disebut pertama / salah satu", "a/an", "We've got a new car. He lives in an apartment in a big city."], ["Pekerjaan", "a/an", "He's a politician. She's a teacher. I'm an artist."], ["Satu-satunya / sudah jelas", "the", "It's the capital city. It's in the city centre. It's on the right/left."], ["Negara berbentuk gabungan/jamak", "the", "in the UAE, in the USA, in the UK"], ["Bagian hari", "the", "in the morning, in the afternoon (tetapi at the weekend)"], ["Nama orang", "—", "Salem, Mrs Wilson, Doctor Singh"], ["Kota & negara biasa", "—", "in Bangkok, in Dubai, in Spain"], ["Hari", "—", "on Saturday, from Monday to Friday"], ["Frasa tetap", "—", "go to work, go home, at school, by bus, by car, on foot"]],
      modes: [
        { label: "a/an", target: "col", col: 1, title: "Kolom article", text: "Perhatikan banyak baris yang kosong (—): itulah <strong>zero article</strong>." },
        { label: "Jebakan negara", target: "row", row: 3, title: "the USA tapi Spain", text: "the + negara yang namanya mengandung <em>States, Kingdom, Republic, Emirates</em> atau berbentuk jamak (the Philippines, the Netherlands)." },
        { label: "Jebakan by", target: "row", row: 8, title: "by bus, on foot", text: "❌ <em>by a bus</em>, ❌ <em>by foot</em>. ✅ <em>by bus, by car, by train, on foot</em>." }
      ] },
    { type: "table", label: "Interaktif 3 • Transport", title: "Kendaraan & Kata Kerjanya", headers: ["Kendaraan", "Kata kerja", "Contoh"],
      rows: [["car, taxi", "drive (pengemudi), take (penumpang)", "drive a car, take a taxi"], ["bicycle, motorbike, scooter", "ride", "ride a bicycle, ride a scooter"], ["bus, train, underground/subway, tram", "take, catch, get on/off", "take the subway, get on a train, get off a train"], ["aeroplane (plane)", "fly to", "fly to Atlanta"], ["ship, ferry", "take, go by", "go by ferry"], ["—", "walk to", "walk to work (bukan walk to in work)"]],
      modes: [
        { label: "drive vs ride", target: "row", row: 1, title: "ride = duduk di atas", text: "Kendaraan yang dinaiki dengan mengangkang (sepeda, motor, kuda) → <strong>ride</strong>. Mobil → <strong>drive</strong>." },
        { label: "get on vs get in", target: "row", row: 2, title: "➕ get on/off vs get in/out of", text: "Kendaraan besar yang bisa berdiri di dalamnya (bus, train, plane) → get on/off. Mobil, taksi → get in/out of." }
      ] },
    { type: "list", label: "Ringkas • Bandara & Tiket", title: "At the Airport • Buying a Ticket", groups: [
      { title: "Istilah bandara (modul)", tone: "sky", items: ["in transit = changing from one plane to another", "check in = show your ticket and passport at a desk", "boarding = getting on (a plane)", "is delayed = is late", "last call = final call", "proceed to = go to"] },
      { title: "Membeli tiket (Real life)", tone: "emerald", items: ["A ticket to Paris, please … the six o'clock train.", "Single or return? — Single.", "That's £94.50.", "Here you are. — Thank you. Sign there, please.", "Thanks. Which platform is it? — Platform eighteen.", "What time does it arrive?"] }
    ] }
  ],
  simulator: [
    ex("Permainan Interaktif 1 • a / an / the / —", "Salem Al-Romeithi dari Dubai (latihan gaya modul)", ["Kalimat", "Article"], ["a", "an", "the", "— (tanpa)"], [
      ["I live in ___ Dubai.", "— (tanpa)"], ["It's ___ fantastic city.", "a"], ["Most people come to work by ___ car.", "— (tanpa)"], ["It's very busy in ___ morning.", "the"],
      ["They come into ___ city centre.", "the"], ["I'm ___ engineer.", "an"], ["My journey to ___ work takes about twenty-five minutes.", "— (tanpa)"], ["I play golf at ___ weekend.", "the"],
      ["Salem lives in ___ United Arab Emirates.", "the"], ["He spends all his time playing ___ golf.", "— (tanpa)", "Olahraga tanpa article."]
    ]),
    ex("Permainan Interaktif 2 • Kata yang Berpasangan", "Pilih Kata yang Tepat (Exercise 6a modul)", ["Frasa", "Jawaban"], ["drive", "ride", "wait for", "get on", "get off", "fly to", "go by", "take", "walk to"], [
      ["___ a car", "drive"], ["___ a bicycle", "ride"], ["___ a train (menunggu)", "wait for"], ["___ a train (naik)", "get on"], ["___ a train (turun)", "get off"], ["___ Atlanta", "fly to"], ["___ underground", "go by"], ["___ a train or a bus", "take"], ["___ work", "walk to"]
    ]),
    ex("Permainan Interaktif 3 • Istilah Bandara", "Cocokkan Istilah dengan Artinya", ["Istilah", "Arti"], ["changing from one plane to another", "show your ticket and passport at a desk", "getting on (a plane)", "is late", "final call", "go to"], [
      ["in transit", "changing from one plane to another"], ["check in", "show your ticket and passport at a desk"], ["boarding", "getting on (a plane)"], ["is delayed", "is late"], ["last call", "final call"], ["proceed to", "go to"]
    ]),
    LAB3.EN_RUTE,
    { type: "reveal", label: "Latihan 5 • Real Life", title: "Susun Percakapan di Loket Tiket (urutan modul)", cols: 2, items: [
      { prompt: "1. Florence", answer: "A ticket to Paris, please … the six o'clock train.", reason: "Pembeli memulai." },
      { prompt: "2. Clerk", answer: "Single or return?", reason: "single = sekali jalan, return = pulang-pergi." },
      { prompt: "3. Florence", answer: "Single.", reason: "" },
      { prompt: "4. Clerk", answer: "That's £94.50.", reason: "ninety-four pounds fifty." },
      { prompt: "5. Florence", answer: "Here you are.", reason: "Saat menyerahkan uang/kartu." },
      { prompt: "6. Clerk", answer: "Thank you. Sign there, please.", reason: "" },
      { prompt: "7. Florence", answer: "Thanks. Which platform is it?", reason: "platform = peron." },
      { prompt: "8. Clerk", answer: "Platform eighteen.", reason: "" }
    ] }
  ],
  flashcards: [
    { tag: "Grammar", q: "Rumus can?", a: "S + can/can't + V1. Can + S + V1? Yes, I can / No, I can't." },
    { tag: "Jebakan", q: "She cans swim / She can to swim?", a: "Keduanya salah → She can swim." },
    { tag: "Jebakan", q: "Does she can drive?", a: "Salah → Can she drive?" },
    { tag: "Ungkapan", q: "Jawaban jika tidak pasti?", a: "It depends." },
    { tag: "Article", q: "Kapan a/an?", a: "Benda tunggal disebut pertama/salah satu, dan pekerjaan: a new car, an engineer." },
    { tag: "Article", q: "Kapan the?", a: "Satu-satunya/sudah jelas: the city centre, the capital, on the right, in the morning, the USA/UK/UAE." },
    { tag: "Article", q: "Zero article untuk…?", a: "Nama orang, kota, negara biasa, hari, olahraga, frasa tetap (go to work, go home, at school, by bus)." },
    { tag: "Jebakan", q: "by foot atau on foot?", a: "on foot. Kendaraan lain: by bus, by car, by train." },
    { tag: "Kosakata", q: "drive vs ride?", a: "drive a car/taxi; ride a bicycle/motorbike/scooter." },
    { tag: "Kosakata", q: "get on/off dipakai untuk…?", a: "bus, train, plane. (➕ car/taxi: get in/out of)." },
    { tag: "Bandara", q: "in transit, boarding, delayed?", a: "Pindah pesawat; naik ke pesawat; terlambat." },
    { tag: "Bandara", q: "check in?", a: "Menunjukkan tiket dan paspor di meja (counter)." },
    { tag: "Tiket", q: "single vs return?", a: "single = sekali jalan; return = pulang-pergi (AmE: one-way / round-trip ➕)." },
    { tag: "Angka", q: "1,000,000 dan 500,000?", a: "one million; five hundred thousand." }
  ],
  quiz: [
    Q("She ___ take a taxi because she's only got $25.", ["can't", "can", "doesn't can", "cans"], 0, "Tidak mampu (uang tidak cukup)."),
    Q("Pertanyaan yang benar…", ["Can she take the subway?", "Does she can take the subway?", "Can she takes the subway?", "She can take the subway?"], 0, "Can + S + V1."),
    Q("“Can you travel by tram in New York?” “No, ___.”", ["you can't", "you don't", "you aren't", "you not can"], 0, "Short answer can."),
    Q("Kalimat yang benar…", ["He can drive a car.", "He cans drive a car.", "He can to drive a car.", "He can drives a car."], 0, "can + V1."),
    Q("“Can you find a taxi easily in Hamburg?” Jawaban jika tidak selalu bisa…", ["It depends.", "Yes, I do.", "No, I don't.", "It can."], 0, "Ungkapan dari modul."),
    Q("We've got ___ new car.", ["a", "an", "the", "—"], 0, "Disebut pertama, tunggal."),
    Q("He's ___ politician.", ["a", "an", "the", "—"], 0, "Pekerjaan memakai a/an."),
    Q("It's ___ capital city.", ["the", "a", "an", "—"], 0, "Hanya ada satu ibu kota."),
    Q("They live in ___ USA.", ["the", "a", "—", "an"], 0, "the USA / the UK / the UAE."),
    Q("I live in ___ Spain.", ["—", "the", "a", "an"], 0, "Negara biasa tanpa article."),
    Q("I go to school ___ bus.", ["by", "on", "with", "in a"], 0, "by + kendaraan tanpa article."),
    Q("I go to work ___ foot.", ["on", "by", "with", "in"], 0, "on foot."),
    Q("Frasa yang benar…", ["go home", "go to the home", "go to a home", "go at home"], 0, "Frasa tetap tanpa article."),
    Q("Pasangan yang benar…", ["ride a bicycle", "drive a bicycle", "ride a car", "fly a bus"], 0, "ride untuk sepeda/motor."),
    Q("Kata kerja untuk turun dari kereta…", ["get off", "get out", "get down", "get away"], 0, "get on/off a train."),
    Q("<em>Boarding</em> artinya…", ["naik ke pesawat", "pindah pesawat", "terlambat", "panggilan terakhir"], 0, "boarding = getting on (a plane)."),
    Q("“Your flight <em>is delayed</em>” berarti penerbangan…", ["terlambat", "dibatalkan", "sudah berangkat", "pindah gerbang"], 0, "delayed = late."),
    Q("“Passengers in transit” adalah penumpang yang…", ["pindah dari satu pesawat ke pesawat lain", "baru tiba di tujuan akhir", "belum check in", "kehilangan bagasi"], 0, "in transit = changing planes."),
    Q("Di loket: “Single or return?” Florence hanya pergi, tidak kembali. Jawabannya…", ["Single.", "Return.", "Platform eighteen.", "Here you are."], 0, "single = sekali jalan."),
    Q("Kalimat yang diucapkan saat menyerahkan uang…", ["Here you are.", "There you go to.", "Take it you.", "Here is you."], 0, "Ungkapan standar."),
    Q("“Which platform is it?” Pertanyaan ini menanyakan…", ["nomor peron", "harga tiket", "jam berangkat", "tujuan"], 0, "platform = peron."),
    Q("Angka 9,000,000 dibaca…", ["nine million", "nine thousand", "nine hundred thousand", "ninety million"], 0, "million = juta.")
  ],
  ringkasan: `*RANGKUMAN P6 BAHASA INGGRIS: GETTING FROM A TO B*
1️⃣ can/can't + V1 (tanpa -s, tanpa to). Can she…? Yes, she can. / It depends.
2️⃣ a/an: disebut pertama, pekerjaan. the: satu-satunya/sudah jelas (the city centre, the USA, in the morning).
3️⃣ Tanpa article: nama, kota, negara biasa, hari, go to work, go home, by bus, on foot.
4️⃣ drive a car • ride a bicycle • take/catch a bus • get on/off a train • fly to.
5️⃣ Bandara: check in, boarding, in transit, delayed, last call, proceed to.
6️⃣ Tiket: Single or return? Which platform? What time does it arrive?`
};
