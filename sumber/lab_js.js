// Lab JavaScript untuk PWD: memakai penelusur yang sama dengan Lab Algoritma (blok "trace-lab").
// Jejak dibuat saat build dari langkah-langkah di bawah; ini bukan JavaScript yang dijalankan di browser.
const { lab, out } = require("./lab_alp.js");

const P6 = lab([
  {
    label: "String + angka",
    intro: "Enam baris pendek yang menguji jebakan paling sering di P6: <code>+</code> pada string, <code>-</code>, <code>==</code>, dan <code>===</code>.",
    panes: [{
      kind: "seq", vars: {},
      code: ['const a = "2";', "const b = 3;", "console.log(a + b);", "console.log(a - b);", "console.log(a == 2);", "console.log(a === 2);"],
      before: [
        { line: 0, part: 'const a = "2";', run: () => ({ set: { a: '"2"' } }), note: 'a berisi <strong>string</strong> "2" (ada tanda kutip), bukan angka.' },
        { line: 1, part: "const b = 3;", run: () => ({ set: { b: "3" } }), note: "b berisi angka 3." },
        { line: 2, part: "a + b", run: () => out('"23"\n'), tag: "plus", note: 'Salah satu operand string, jadi <code>+</code> <strong>menyambung</strong>: "2" + 3 menjadi string "23".' },
        { line: 3, part: "a - b", run: () => out("-1\n"), tag: "minus", note: "<code>-</code> tidak dipakai untuk menyambung teks, jadi \"2\" diubah menjadi angka 2 dulu: 2 - 3 = -1." },
        { line: 4, part: "a == 2", c: { text: () => '"2" == 2', test: () => true }, run: () => out("true\n"), tag: "loose", note: "<code>==</code> mengubah tipe lebih dulu, jadi \"2\" dianggap sama dengan 2." },
        { line: 5, part: "a === 2", c: { text: () => '"2" === 2', test: () => false }, run: () => out("false\n"), tag: "strict", note: "<code>===</code> membandingkan nilai <strong>dan</strong> tipe. String lawan number, jadi false. Karena itu modul menyarankan selalu memakai <code>===</code>." }
      ],
      summary: () => "String + angka menyambung, tetapi - mengubah string menjadi angka. == mengubah tipe, === tidak."
    }],
    asks: [
      { at: "start", q: "Sebelum mulai, tebak keempat keluaran (urut dari atas).", opts: ['"23", -1, true, false', "5, -1, true, true", '"23", "2-3", true, false', "5, -1, true, false"], ans: 0, why: "+ menyambung karena ada string, - memaksa angka, == longgar, === ketat." },
      { at: "plus", q: 'Mana hasil dari "2" + 3?', opts: ["5", '"23"', "NaN"], ans: 1, why: "Jika salah satu sisi string, + menyambung teks." },
      { at: "strict", q: 'Apakah "2" === 2?', opts: ["true", "false"], ans: 1, why: "Tipenya berbeda (string dan number), jadi === langsung false." }
    ]
  },
  {
    label: "NaN dan nilai falsy",
    intro: "Hasil konversi yang gagal dan bagaimana <code>if</code> memperlakukannya.",
    panes: [{
      kind: "seq", vars: {},
      code: ['const umur = Number("dua puluh");', "console.log(umur);", "console.log(umur === NaN);", "console.log(isNaN(umur));", "if (umur) {", '  console.log("truthy");', "} else {", '  console.log("falsy");', "}"],
      before: [
        { line: 0, part: 'Number("dua puluh")', run: () => ({ set: { umur: "NaN" } }), tag: "nan", note: 'Teks "dua puluh" tidak bisa diubah menjadi angka, jadi hasilnya <code>NaN</code> (Not a Number).' },
        { line: 1, part: "console.log(umur);", run: () => out("NaN\n"), note: "Mencetak NaN." },
        { line: 2, part: "umur === NaN", c: { text: () => "NaN === NaN", test: () => false }, run: () => out("false\n"), tag: "nancmp", note: "NaN tidak sama dengan apa pun, termasuk dirinya sendiri, jadi perbandingan ini selalu false." },
        { line: 3, part: "isNaN(umur)", run: () => out("true\n"), note: "<code>isNaN()</code> adalah cara yang benar untuk memeriksa NaN." },
        { line: 4, part: "umur", tag: "falsy", if: { text: () => "Boolean(NaN)", test: () => false }, note: "NaN termasuk nilai <strong>falsy</strong>, jadi kondisi ini dianggap false dan cabang else yang dijalankan.", then: [{ line: 5, part: 'console.log("truthy");', run: () => out("truthy"), note: "Tidak dijalankan." }], else: [{ line: 7, part: 'console.log("falsy");', run: () => out("falsy"), note: "Mencetak falsy." }] }
      ],
      summary: () => "NaN bukan angka yang valid, tidak sama dengan dirinya sendiri, dan falsy. Periksa dengan isNaN()."
    }],
    asks: [
      { at: "start", q: "Tebak keempat keluarannya.", opts: ["NaN, false, true, falsy", "NaN, true, true, falsy", "20, false, false, truthy", "NaN, false, true, truthy"], ans: 0, why: "umur = NaN. NaN === NaN false, isNaN true, dan NaN itu falsy." },
      { at: "nancmp", q: "Mengapa NaN === NaN bernilai false?", opts: ["NaN tidak sama dengan apa pun, termasuk dirinya", "Karena tipe NaN berbeda", "Karena sintaksnya salah"], ans: 0, why: "Aturan bahasa: NaN tidak pernah sama dengan nilai apa pun. Gunakan isNaN()." }
    ]
  }
]);

const P7 = lab([
  {
    label: "Menyaring nilai lulus",
    intro: "Pola yang dipakai untuk memproses data tabel: ulangi isi array, periksa tiap elemen, lalu hitung yang lulus.",
    panes: [{
      kind: "for", vars: {},
      code: ["const nilai = [80, 55, 90];", "let lulus = 0;", "for (let i = 0; i < nilai.length; i++) {", "  if (nilai[i] >= 60) {", "    lulus++;", "  }", "}", "console.log(lulus);"],
      before: [
        { line: 0, part: "const nilai = [80, 55, 90];", run: () => ({ set: { nilai: "[80, 55, 90]" } }), note: "Array berisi tiga angka. Indeksnya 0, 1, 2." },
        { line: 1, part: "let lulus = 0;", run: () => ({ set: { lulus: 0 } }), note: "Penghitung dimulai dari 0." },
        { line: 2, part: "let i = 0", run: () => ({ set: { i: 0 } }), note: "Inisialisasi: i = 0 menunjuk elemen pertama." }
      ],
      cond: { line: 2, part: "i < nilai.length", text: v => `${v.i} < 3`, test: v => v.i < 3 },
      body: [
        { line: 3, part: "nilai[i] >= 60", tag: "cek", if: { text: v => `${[80, 55, 90][v.i]} >= 60`, test: v => [80, 55, 90][v.i] >= 60 }, then: [{ line: 4, part: "lulus++;", run: v => ({ set: { lulus: v.lulus + 1 } }), note: "Nilai memenuhi syarat, penghitung bertambah." }] }
      ],
      step: { line: 2, part: "i++", run: v => { v.i++; } },
      after: [{ line: 7, part: "console.log(lulus);", run: v => out(String(v.lulus)), note: "Setelah loop selesai, jumlah yang lulus dicetak." }]
    }],
    asks: [
      { at: "start", q: "Tebak nilai yang dicetak di akhir.", opts: ["3", "2", "1", "0"], ans: 1, why: "80 dan 90 memenuhi >= 60, sedangkan 55 tidak. Jadi lulus bernilai 2." },
      { at: "cond-last", q: "i sudah 3, padahal indeks terakhir adalah 2. Apa yang terjadi?", opts: ["Loop berhenti karena 3 < 3 false", "Elemen ke-3 tetap diperiksa", "Error karena indeks tidak ada"], ans: 0, why: "Kondisi dicek sebelum badan. 3 < 3 false, jadi nilai[3] yang tidak ada tidak pernah dibaca." }
    ]
  }
]);

module.exports = { P6, P7 };
