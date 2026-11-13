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
  A("Language Focus 1–2: to be untuk Info Pribadi", `<p><strong>To be</strong> adalah kata kerja <em>am / is / are</em>. Artinya kira-kira “adalah/berada”, tetapi dalam bahasa Indonesia sering tidak diterjemahkan sama sekali. Karena itu banyak yang lupa menulisnya. Aturannya: kalimat bahasa Inggris <strong>wajib punya verb</strong>. Kalau kalimat tidak punya kata kerja lain (tidak ada <em>eat, go, study</em>), isi dengan to be.</p>
<p>Kapan dipakai? Untuk menyebut <strong>identitas dan keadaan</strong>: nama (<em>His name's Andrei</em>), asal (<em>He's from Russia</em>), umur (<em>He's nineteen</em>), status (<em>She's married</em>), lokasi (<em>She's at the airport</em>), pekerjaan (<em>He's a student</em>), dan perasaan (<em>I'm tired</em>).</p>
<p>Bentuknya mengikuti subjek, lihat tabel. Dalam percakapan, to be hampir selalu <strong>disingkat</strong>: <em>I am → I'm, she is → she's, they are → they're</em>.</p>`, "Bagian 2"),
  { type: "table", label: "Tabel Interaktif", title: "am / is / are Mengikuti Subjek", headers: ["Subjek", "Positif (+)", "Negatif (−)", "Pertanyaan (?)"],
    rows: [
      ["I", "I<strong>'m</strong> (am) a student.", "I<strong>'m not</strong> married.", "<strong>Am</strong> I late?"],
      ["he / she / it / satu nama", "She<strong>'s</strong> (is) from Italy.", "She <strong>isn't</strong> on holiday.", "<strong>Is</strong> she from Italy?"],
      ["you / we / they / dua orang+", "They<strong>'re</strong> (are) friends.", "They <strong>aren't</strong> married.", "<strong>Are</strong> they students?"]
    ],
    modes: [
      { label: "Negatif", target: "col", col: 2, title: "Tambah not sesudah be", text: "<em>is not → isn't</em>, <em>are not → aren't</em>. Untuk <em>I</em> tidak ada “amn't”, jadi pakai <em>I'm not</em>." },
      { label: "Pertanyaan", target: "col", col: 3, title: "Be pindah ke depan subjek", text: "<em>She is from Italy</em> → <em>Is she from Italy?</em> Tidak perlu tambahan kata lain. Jawab singkat: <em>Yes, she is. / No, she isn't.</em>" },
      { label: "Dua orang", target: "row", row: 2, title: "Ben and Emily = they", text: "Dua nama yang digabung dengan <em>and</em> dihitung jamak: <em>Ben and Emily <strong>are</strong> from London.</em>" }
    ] },
  tip("Kesalahan khas penutur bahasa Indonesia", "<ul><li>❌ <em>I 20 years old</em> → ✅ <em>I'm 20 (years old).</em></li><li>❌ <em>She from Bandung</em> → ✅ <em>She's from Bandung.</em></li><li>❌ <em>I have 20 years</em> (terjemahan bahasa Spanyol/Prancis) → ✅ <em>I'm 20.</em></li><li>❌ <em>My name is Gilang. My name's is…</em> → cukup <em>My name's Gilang.</em></li></ul>", "warn"),
  flip,
  A("Language Focus 3: a/an + Jobs", `<p><strong>a/an</strong> artinya “sebuah/seorang”. Bahasa Inggris <strong>wajib</strong> memakai a/an sebelum pekerjaan tunggal, padahal bahasa Indonesia tidak: “Dia dokter” → <em>She's <strong>a</strong> doctor</em> (bukan <em>She's doctor</em>). Kalau jamak, a/an hilang: <em>They're doctors.</em></p>
<p>Memilih a atau an ditentukan oleh <strong>bunyi</strong> awal kata berikutnya, bukan hurufnya:</p>
<ul><li><strong>an</strong> + bunyi vokal (a, i, u, e, o): <em>an engineer, an actress, an IT student</em> (IT dibaca “ai-ti”), <em>an hour</em> (h tidak dibunyikan).</li>
<li><strong>a</strong> + bunyi konsonan: <em>a waiter, a police officer, a university</em> (dibaca “yu-ni…”, bunyi /j/), <em>a European</em>.</li></ul>
<p>Kosakata modul: footballer, musician, engineer, lawyer, police officer, PA (personal assistant), singer, electrician, shop assistant, doctor, nurse, actor/actress, waiter/waitress, businessman/businesswoman.</p>`, "Bagian 3"),
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
