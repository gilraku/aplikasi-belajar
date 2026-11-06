// Materi Lengkap Bahasa Inggris P6 — Module 5 Getting from A to B
const { box, arrow, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const say = (label, title, items, cols) => ({ type: "say", label, title, cols, items: items.map(x => Array.isArray(x) ? { en: x[0], id: x[1], note: x[2] } : x) });
const free = (label, title, preview, rows) => ({ type: "exercise", label, title, preview, headers: ["Soal", "Jawaban"], rows: rows.map(([c, a, ok]) => ({ cells: [c], fields: [{ answer: a, placeholder: "ketik jawaban" }], ok: "✓ " + (ok || "Benar!") })) });

const airport = diagram({
  label: "Diagram Interaktif", title: "Perjalanan di Bandara", desc: "Klik setiap tahap dari pintu masuk sampai pesawat.", minw: 560,
  svg: svg(760, 210,
    box(10, 60, 120, 60, "Check-in|desk", "sky", "ci", { size: 14 }) + arrow(130, 90, 158, 90) +
    box(160, 60, 120, 60, "Security", "slate", "sec", { size: 14 }) + arrow(280, 90, 308, 90) +
    box(310, 60, 120, 60, "Departure|lounge", "amber", "dl", { size: 14 }) + arrow(430, 90, 458, 90) +
    box(460, 60, 120, 60, "Gate 24", "violet", "gate", { size: 14 }) + arrow(580, 90, 608, 90) +
    box(610, 60, 140, 60, "Boarding ✈", "emerald", "brd", { size: 14 }) +
    box(300, 150, 160, 44, "Transit / Delayed", "rose", "tr", { size: 13 }) +
    text(380, 30, "Itinerary Karen: AA100 JFK 18.30 → LHR 07.25 • BA0572 LHR 09.35 → Milan MXP 12.30", { size: 12, color: "#475569" })
  ),
  parts: [
    { id: "ci", label: "check in", title: "Check-in desk", text: "Tunjukkan tiket dan paspor, serahkan bagasi. Itinerary: <em>Check in by 16.30, American Airlines Desk, Terminal X</em>." },
    { id: "sec", label: "security", title: "Pemeriksaan keamanan", text: "Tas dipindai. ➕ Ungkapan: <em>Please put your bag on the belt. Take off your belt and shoes.</em>" },
    { id: "dl", label: "departure lounge", title: "Ruang tunggu", text: "Pantau papan: <em>delayed</em> (terlambat), <em>cancelled</em> (batal) ➕, <em>now boarding</em>." },
    { id: "gate", label: "gate", title: "Gerbang", text: "Pengumuman: <em>Flight AA100 to London Heathrow, please <strong>proceed to</strong> gate 24.</em> (proceed to = go to)" },
    { id: "brd", label: "boarding", title: "Naik pesawat", text: "<em>This is the <strong>last call</strong> for flight…</em> = panggilan terakhir. boarding = getting on a plane." },
    { id: "tr", label: "in transit", title: "Pindah pesawat", text: "Karen <strong>in transit</strong> di Heathrow: tiba 07.25 dari New York, lanjut BA0572 ke Milan 09.35." }
  ]
});

module.exports = [
  A("Isi Module 5", `<p>Module 5 <em>Getting from A to B</em> membahas <em>can</em> dan <em>can't</em>; article <em>a/an, the</em>, dan zero article; kosakata dan bacaan tentang transportasi (<em>Transport facts!</em>); listening di bandara; survei transportasi; dan real life: membeli tiket.</p>
<p>Kosakata kendaraan: <em>a motorbike, a bus, a train, a tram, a taxi, an aeroplane, a car, a ship, a scooter, a ferry, a bicycle, an underground / a subway train</em>. Frasa: <em>people waiting in a queue, passengers, a crowded train, travelling fast/slowly, bad traffic</em>. Cara bepergian: <em>by car, by bus, on foot</em>.</p>`, "Bagian 1"),
  A("Transport Facts! (ringkasan)", `<p>Teks modul berisi fakta angka, misalnya: kebanyakan negara menyetir di <strong>kanan</strong>, tetapi sejumlah negara (termasuk Jepang, India, Australia, Inggris) di <strong>kiri</strong> (➕ Indonesia juga di kiri); di Tokyo kereta bawah tanah tidak pernah ditunggu lebih dari beberapa menit tetapi sangat penuh; kereta Maglev Shanghai menempuh 30 km ke Bandara Pudong hanya dalam beberapa menit; Moscow Metro punya 165 stasiun dengan jutaan penumpang setiap hari; di Italia jutaan orang naik skuter.</p>
<p>Fokus bahasanya: membaca <strong>angka besar</strong> (<em>one million, one hundred million, five hundred thousand</em>) dan kata kerja yang berpasangan (<em>drive a car, ride a bicycle, wait for a train, get on/off a train, fly to Atlanta, go by underground, take a train or a bus, walk to work</em>).</p>`, "Bagian 2"),
  { type: "table", label: "➕ Tambahan • Membaca Angka Besar", title: "Angka dalam Bahasa Inggris", headers: ["Angka", "Dibaca", "Catatan"],
    rows: [["100", "one hundred / a hundred", "tanpa -s: two hundred"], ["1,000", "one thousand", "koma = pemisah ribuan"], ["500,000", "five hundred thousand", "bukan “five hundreds thousands”"], ["1,000,000", "one million", "juta"], ["77,000,000", "seventy-seven million", ""], ["1,000,000,000", "one billion", "miliar (bukan “milyar”)"], ["3.5", "three point five", "titik = desimal (kebalikan Indonesia!)"], ["£94.50", "ninety-four pounds fifty", "harga"]],
    modes: [{ label: "Jebakan", target: "row", row: 6, title: "Koma vs titik", text: "Indonesia: 3,5 dan 1.000. Inggris: 3.5 dan 1,000." }, { label: "Tanpa -s", target: "row", row: 2, title: "hundred/thousand/million", text: "Setelah angka, tidak jamak: two million people. Jamak hanya jika tanpa angka: <em>millions of people</em>." }] },
  A("Language Focus 1: can dan can't", `<p>Karen ada di Metropolitan Museum of Art, Manhattan. Ia punya <strong>$25</strong>, sekarang jam <strong>ten past three</strong>, dan harus tiba di JFK Airport <strong>half past four</strong>. Ada empat cara: taksi ($35 + tip), subway + bus (90 menit, $2), jalan kaki + subway + AirTrain (±1 jam 32 menit, $7), atau subway ke Grand Central lalu New York Airport Express bus (±1 jam, $2 + $13, berangkat tiap 20 menit).</p>
<p>Kesimpulan grammar modul: <em>She <strong>can</strong> take a bus at twenty past three. She <strong>can't</strong> take a taxi because she's only got $25. <strong>Can</strong> she take the subway to the airport?</em> — <em>can</em> sama untuk semua subjek dan diikuti kata kerja dasar.</p>`, "Bagian 3"),
  tip("➕ can untuk kemampuan diri", "Gunakan untuk CV/wawancara: <em>I can speak English and Indonesian. I can use Microsoft Excel. I can't drive, but I can ride a motorbike.</em>", "info"),
  A("Language Focus 2: Articles a/an, the, dan zero", `<p>Teks tentang Salem Al-Romeithi: 23 tahun, <strong>an engineer</strong>, tinggal bersama keluarga di rumah besar di <strong>Dubai</strong>, kota besar di <strong>the United Arab Emirates</strong>. Ia bekerja di perusahaan internasional dari <strong>Saturday</strong> sampai <strong>Wednesday</strong>, dan di <strong>weekend</strong> ia selalu bermain <strong>golf</strong>.</p>
<ul><li><strong>a/an</strong>: menyebut sesuatu pertama kali atau salah satu dari banyak; pekerjaan.</li><li><strong>the</strong>: sesuatu yang sudah jelas atau hanya satu (the capital city, the city centre, on the right); bagian hari (in the morning); negara gabungan (the UAE, the USA, the UK); <em>at the weekend</em>.</li><li><strong>tanpa article</strong>: nama orang, kota, negara biasa, hari; frasa tetap <em>go to work, go home, at school, by bus, by car, on foot</em>.</li></ul>`, "Bagian 4"),
  free("Latihan • Article", "Isi a, an, the, atau – (tanda strip untuk tanpa article)", "Ketik a / an / the / -", [
    ["He lives in ___ apartment in a big city.", "an"], ["___ Mrs Wilson is my teacher.", ["-", "—"]], ["It's on ___ left.", "the"], ["in ___ Bangkok", ["-", "—"]], ["in ___ UK", "the"], ["in ___ afternoon", "the"], ["from ___ Monday to Friday", ["-", "—"]], ["go to ___ work", ["-", "—"]]
  ]),
  airport,
  A("Real Life: Buying a Ticket", `<p>Florence di London ingin ke Paris. Urutan percakapan: <em>A ticket to Paris, please … the six o'clock train. — Single or return? — Single. — That's £94.50. — Here you are. — Thank you. Sign there, please. — Thanks. Which platform is it? — Platform eighteen.</em></p>
<p>Informasi yang biasa ditanyakan: tujuan, single/return, jam kereta, peron, jam tiba. Kalimat tanya: <em>How much is it? What time is the next train? Which platform is it? What time does it arrive?</em></p>`, "Bagian 5"),
  say("🔊 Pelafalan", "Transport & Travel", [
    ["aeroplane", "pesawat (BrE); AmE: airplane"], ["underground", "kereta bawah tanah (London)"], ["subway", "kereta bawah tanah (New York)"], ["queue", "antrean", "Dibaca /kju:/ seperti huruf Q."], ["She can take a bus.", "can lemah /kən/"], ["She can't take a taxi.", "can't kuat /kɑ:nt/"],
    ["A return ticket to Glasgow, please.", "tiket pulang-pergi"], ["Which platform is it?", "peron berapa?"], ["What time does it arrive?", "tiba jam berapa?"], ["Your flight is delayed.", "penerbangan terlambat"], ["Please proceed to gate twenty-four.", "menuju gerbang 24"], ["ninety-four pounds fifty", "£94.50"]
  ], 3)
];
