// Materi Lengkap Bahasa Inggris P2 — Module 1 People and places
const { box, arrow, path, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const say = (label, title, items, cols, desc) => ({ type: "say", label, title, desc, cols, items: items.map(x => Array.isArray(x) ? { en: x[0], id: x[1], note: x[2] } : x) });
const free = (label, title, preview, rows) => ({ type: "exercise", label, title, preview, headers: ["Soal", "Jawaban"], rows: rows.map(([c, a, ok]) => ({ cells: [c], fields: [{ answer: a, placeholder: "ketik jawaban" }], ok: "✓ " + (ok || "Benar!") })) });

const flip = diagram({
  label: "Diagram Interaktif", title: "Dari Pernyataan ke Pertanyaan", desc: "Klik setiap kotak. Kuncinya: to be melompat ke depan subjek.", minw: 520,
  svg: svg(720, 300,
    text(20, 30, "Pernyataan", { anchor: "start", size: 14, color: "#475569" }) +
    box(20, 50, 120, 50, "She", "sky", "s") + box(150, 50, 90, 50, "is", "rose", "be") + box(250, 50, 200, 50, "from Italy.", "emerald", "c") +
    path("M195,100 C195,150 80,150 80,185") +
    text(20, 175, "Yes/No", { anchor: "start", size: 14, color: "#475569" }) +
    box(20, 190, 90, 50, "Is", "rose", "be") + box(120, 190, 120, 50, "she", "sky", "s") + box(250, 190, 200, 50, "from Italy?", "emerald", "c") +
    box(480, 190, 220, 50, "Yes, she is. / No, she isn't.", "amber", "ans", { size: 13 }) + arrow(450, 215, 476, 215) +
    text(20, 268, "Wh-", { anchor: "start", size: 14, color: "#475569" }) +
    box(60, 250, 110, 44, "Where", "violet", "wh") + box(180, 250, 70, 44, "is", "rose", "be") + box(260, 250, 100, 44, "she", "sky", "s") + box(370, 250, 100, 44, "from?", "emerald", "c")
  ),
  parts: [
    { id: "s", label: "Subjek", title: "Pelaku", text: "I, you, he, she, it, we, they, atau nama (Carla, Ben and Emily)." },
    { id: "be", label: "to be", title: "am / is / are", text: "Di pernyataan, be <strong>setelah</strong> subjek. Di pertanyaan, be <strong>sebelum</strong> subjek. Bahasa Inggris tidak membuat pertanyaan hanya dengan intonasi naik seperti “Kamu dari Italia?”." },
    { id: "c", label: "Keterangan", title: "Pelengkap", text: "Asal (from Italy), umur (twenty-two), pekerjaan (a student), status (married/single), tempat (at the airport)." },
    { id: "ans", label: "Jawaban", title: "Short answer", text: "Ulangi subjek + be. Positif tidak disingkat (Yes, she is), negatif boleh (No, she isn't)." },
    { id: "wh", label: "Wh-word", title: "Kata tanya di paling depan", text: "What (apa), Where (di mana/dari mana), How old (berapa umur), Who (siapa). Pola: <strong>Wh + be + subjek</strong>." }
  ]
});

module.exports = [
  A("Isi Module 1", `<p>Modul dari buku <strong>New Cutting Edge Elementary</strong> (Cunningham & Moor, Longman) ini mencakup: <em>be</em> (positif, negatif, pertanyaan, jawaban singkat) untuk informasi pribadi; article <em>a/an</em> + pekerjaan; kosakata nama, negara, dan kebangsaan; kuis pengetahuan umum; tugas mencari informasi dari dokumen; dan <em>Real life</em>: menjawab pertanyaan saat mengisi formulir.</p>
<p>Percakapan pembuka modul: Emily, Carla (dari Milan), Ben, dan Ariel (dari Buenos Aires). Perhatikan ungkapan <em>Hi, Carla. How are you? — Fine, thanks. — This is Ben. — Nice to meet you. — Nice to meet you, too. — Really? Manchester's a fantastic city.</em></p>`, "Bagian 1"),
  A("Language Focus 1–2: to be untuk Info Pribadi", `<p>To be dipakai untuk <strong>identitas dan keadaan</strong>: nama (<em>His name's Andrei</em>), asal (<em>He's from Russia</em>), umur (<em>He's nineteen</em> — bukan <em>He has nineteen years</em>), status (<em>She's married / He's single</em>), lokasi (<em>She's at the airport</em>), dan pekerjaan (<em>He's a student at Moscow University</em>).</p>
<p>Negatif: tambah <strong>not</strong> setelah be: <em>She isn't on holiday. She's on business. They aren't married. They're friends.</em></p>`, "Bagian 2"),
  tip("Kesalahan khas penutur bahasa Indonesia", "<ul><li>❌ <em>I 20 years old</em> → ✅ <em>I'm 20 (years old).</em></li><li>❌ <em>She from Bandung</em> → ✅ <em>She's from Bandung.</em></li><li>❌ <em>I have 20 years</em> (terjemahan bahasa Spanyol/Prancis) → ✅ <em>I'm 20.</em></li><li>❌ <em>My name is Gilang. My name's is…</em> → cukup <em>My name's Gilang.</em></li></ul>", "warn"),
  flip,
  A("Language Focus 3: a/an + Jobs", `<p>Dengan pekerjaan, bahasa Inggris memakai <em>a/an</em>: <strong>an</strong> + bunyi vokal (<em>He's an engineer. She's an actress.</em>) dan <strong>a</strong> + bunyi lain (<em>I'm a waiter. He's a police officer.</em>). Kosakata modul: footballer, musician, engineer, lawyer, police officer, PA (personal assistant), singer, electrician, shop assistant, doctor, nurse, actor/actress, waiter/waitress, businessman/businesswoman.</p>`, "Bagian 3"),
  { type: "table", label: "➕ Tambahan • Pekerjaan di Bidang Sistem Informasi", title: "Kosakata untuk Memperkenalkan Pekerjaanmu", headers: ["Pekerjaan", "Article", "Arti"],
    rows: [["IT student", "an", "mahasiswa TI"], ["information systems student", "an", "mahasiswa sistem informasi"], ["programmer", "a", "pemrogram"], ["web developer", "a", "pengembang web"], ["system analyst", "a", "analis sistem"], ["database administrator", "a", "admin basis data"], ["UI/UX designer", "a", "desainer UI/UX (“you-eye”)"], ["accountant", "an", "akuntan"], ["entrepreneur", "an", "wirausahawan"]],
    modes: [{ label: "Jebakan", target: "row", row: 6, title: "UI dibaca /ju:/", text: "Huruf U dibaca “you” → bunyi konsonan → <strong>a</strong> UI designer." }, { label: "Kamu", target: "row", row: 1, title: "Contoh", text: "<em>I'm an information systems student at Universitas Siber Muhammadiyah.</em>" }] },
  A("Language Focus 4: Personal Questions", `<p>Modul memberi delapan pertanyaan survei pasar beserta jawaban yang tepat:</p>
<ul><li>What's your full name? — It's William Anthony Barker.</li><li>Where are you from? — I'm from Wellington in New Zealand.</li><li>Are you here on holiday? — Yes, I am.</li><li>How old are you? — I'm twenty-six.</li><li>What's your job? — I'm a musician.</li><li>Are you married? — No, I'm not.</li><li>What's your address in England? — It's 25 Manor Road, London N10.</li><li>What's your telephone number? — It's 020 7535 3555.</li></ul>
<p>Pola: pertanyaan <em>What/Where/How old</em> dijawab dengan informasi; pertanyaan <em>Are you…?</em> dijawab Yes/No.</p>`, "Bagian 4"),
  { type: "choices", style: "pills", label: "➕ Tambahan • Membaca Angka & Ejaan", title: "Real Life: Nomor Telepon, Email, dan Mengeja", options: [
    { label: "Nomor telepon", tone: "sky", title: "Dibaca satu per satu", code: "0812 3456 7700", text: "“oh-eight-one-two, three-four-five-six, seven-seven-oh-oh” atau “double seven, double oh”. Angka 0 biasa dibaca <strong>oh</strong>." },
    { label: "Email", tone: "emerald", title: "Simbol email", code: "s.rahman@firstserve.com", text: "@ = <strong>at</strong>, . = <strong>dot</strong>, _ = underscore, - = dash/hyphen: “s dot rahman at firstserve dot com”." },
    { label: "Mengeja", tone: "amber", title: "Huruf yang sering tertukar", code: "A /eɪ/  E /i:/  I /aɪ/  G /dʒi:/  J /dʒeɪ/  Y /waɪ/  R /ɑ:/", text: "Orang Indonesia sering tertukar E–I dan G–J. Latihan: eja nama lengkapmu dalam bahasa Inggris." },
    { label: "Gelar", tone: "violet", title: "Mr / Mrs / Ms / Miss", code: "Mr Burden, Mrs Ream, Ms Davis", text: "Mr = pria; Mrs = wanita menikah; Miss = belum menikah; Ms = netral (paling aman di email resmi). Dipakai dengan <strong>surname</strong>, bukan first name." }
  ] },
  say("🔊 Pelafalan", "Negara & Kebangsaan (perhatikan tekanan)", [
    { en: "Italy", id: "IT-a-ly" }, { en: "Italian", id: "i-TAL-ian", note: "Tekanan pindah! ITaly → iTALian." }, { en: "Japan", id: "ja-PAN" }, { en: "Japanese", id: "ja-pa-NESE", note: "Akhiran -ese selalu bertekanan." },
    { en: "Britain", id: "BRI-tain" }, { en: "British", id: "BRI-tish" }, { en: "America", id: "a-ME-ri-ca", note: "Huruf a pertama = schwa /ə/." }, { en: "American", id: "a-ME-ri-can" },
    { en: "Germany", id: "GER-ma-ny" }, { en: "Egypt", id: "E-gypt" }, { en: "Thailand", id: "THAI-land", note: "th dibaca /t/ biasa." }, { en: "Indonesian", id: "in-do-NE-sian" }
  ], 4),
  say("🔊 Pelafalan", "Ungkapan Perkenalan", [
    ["Hello, my name's Gilang. What's your name?", "Halo, nama saya Gilang. Siapa namamu?"], ["Nice to meet you.", "Senang bertemu denganmu."], ["Where are you from?", "Dari mana asalmu?", "Di pertanyaan Wh-, intonasi turun di akhir."], ["Are you married?", "Apakah kamu sudah menikah?", "Pertanyaan yes/no, intonasi naik di akhir."], ["How do you spell that?", "Bagaimana mengejanya?"], ["Sorry, I don't understand.", "Maaf, saya tidak mengerti."]
  ], 2),
  free("Latihan • Tulis Paragraf Perkenalan", "Lengkapi Paragraf tentang Jamie (data dari modul)", "Data: James Stuart Burden, lahir 24 Aug 1986 di Glasgow, British, mahasiswa Art History di University of Glasgow, tinggal di 33b Park Street, Glasgow. Ketik satu kata.", [
    ["His ___ is James Stuart Burden. (nama)", "name"], ["He's ___. (kebangsaan)", "British"], ["He's ___ Glasgow. (asal)", "from"],
    ["He's ___ student at the University of Glasgow.", "a"], ["___ address is 33b Park Street, Glasgow.", "His"], ["___ e-mail address is j.burden@glas.ac.uk.", "His"]
  ])
];
