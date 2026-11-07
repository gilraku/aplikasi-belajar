// Lab Algoritma — penelusur loop C++ langkah demi langkah (blok "trace-lab").
// Tidak menjalankan C++ sungguhan: setiap program ditulis ulang sebagai langkah-langkah JS di bawah,
// lalu jejaknya (nilai variabel, hasil kondisi, keluaran) dibekukan menjadi data saat build.
//
// Bentuk satu langkah: { l: nomor baris (0-based, -1 = selesai), p: potongan kode yang distabilo,
//   v: nilai variabel, ch: variabel yang baru berubah, c: { t: teks kondisi, r: true/false }, o: keluaran, x: catatan, tag }
// Tag dipakai untuk menaruh pertanyaan "Tebak dulu": start, cond-first, cond-last, step-first, body-first, do, break, end.

function run(def) {
  const v = { ...(def.vars || {}) };
  const steps = [];
  let out = '', checks = 0, trues = 0, rounds = 0, broke = false;
  const push = (s, note, extra = {}) => steps.push({ l: s.line, p: s.part || null, v: { ...v }, o: out, x: note, ...extra });
  const exec = stmts => {
    for (const s of stmts || []) {
      if (s.if) {
        const r = !!s.if.test(v);
        push(s, s.note || `Kondisi if dicek: ${s.if.text(v)} bernilai ${r}. ` + (r ? 'Isi blok if dijalankan.' : 'Isi blok if dilewati.'), { c: { t: s.if.text(v), r }, tag: 'if' });
        if (r && exec(s.then) === 'break') return 'break';
        continue;
      }
      if (s.brk) { push(s, s.note || '<code>break</code>: loop langsung dihentikan. Step dan kondisi loop tidak dijalankan lagi.', { tag: 'break' }); return 'break'; }
      const before = { ...v };
      const r = (s.run && s.run(v)) || {};
      if (r.set) Object.assign(v, r.set);
      if (r.out != null) out += r.out;
      const ch = Object.keys(v).filter(k => v[k] !== before[k]);
      push(s, typeof s.note === 'function' ? s.note(v, before) : s.note, { ...(ch.length ? { ch } : {}), ...(s.tag ? { tag: s.tag } : {}) });
    }
  };
  const cond = () => {
    const c = def.cond, r = !!c.test(v), t = c.text(v);
    checks++; if (r) trues++;
    const lanjut = def.kind === 'do' ? 'Kembali ke awal <code>do</code>, badan diulang.' : 'Badan loop dijalankan.';
    const keluar = 'Loop selesai, lanjut ke baris setelah loop.';
    push(c, `Cek kondisi: ${t} bernilai <strong>${r}</strong>. ` + (r ? lanjut : keluar), { c: { t, r }, tag: checks === 1 ? 'cond-first' : 'cond' });
    return r;
  };
  exec(def.before);
  for (let guard = 0; guard < 100; guard++) {
    if (def.kind === 'do') {
      if (guard === 0) push(def.do, '<code>do</code>: masuk ke badan loop <strong>tanpa</strong> cek kondisi. Kondisi baru dicek di bagian akhir.', { tag: 'do' });
    } else if (!cond()) break;
    rounds++;
    const bodyStart = steps.length;
    if (exec(def.body) === 'break') { broke = true; break; }
    if (rounds === 1 && steps[bodyStart]) steps[bodyStart].tag = steps[bodyStart].tag || 'body-first';
    if (def.kind === 'for') {
      const before = { ...v }; def.step.run(v);
      const ch = Object.keys(v).filter(k => v[k] !== before[k]);
      push(def.step, `Step <code>${def.step.part}</code> dijalankan <strong>setelah</strong> badan loop, sebelum kondisi dicek lagi.`, { ch, tag: rounds === 1 ? 'step-first' : 'step' });
    }
    if (def.kind === 'do' && !cond()) break;
  }
  // tandai cek kondisi terakhir (yang false), kecuali loop berhenti karena break
  if (!broke) for (let i = steps.length - 1; i >= 0; i--) if (steps[i].c && /^cond/.test(steps[i].tag)) { steps[i].tag = 'cond-last'; break; }
  exec(def.after);
  steps.push({ l: -1, p: null, v: { ...v }, o: out, x: 'Program selesai.', tag: 'end' });
  return { title: def.title, code: def.code, steps, sum: { checks, trues, rounds, broke, kind: def.kind } };
}

// Pertanyaan "Tebak dulu" diselesaikan menjadi nomor langkah: muncul sebelum langkah itu dibuka.
function lab(cases) {
  return cases.map(c => {
    const panes = c.panes.map(run);
    const asks = {};
    (c.asks || []).forEach(a => {
      const k = a.at === 'start' ? 0 : panes[a.pane || 0].steps.findIndex(s => s.tag === a.at);
      if (k < 0) throw new Error(`lab_alp: tag "${a.at}" tidak ada di kasus "${c.label}"`);
      asks[k] = { q: a.q, opts: a.opts, ans: a.ans, why: a.why, ...(a.at === 'start' ? { later: true } : {}) };
    });
    return { label: c.label, intro: c.intro, panes, asks };
  });
}

const out = s => ({ out: s });

// ---------- P6: for ----------
const P6 = lab([
  {
    label: 'for naik 1–3',
    intro: 'Perhatikan urutan tiga bagian <code>for</code>: inisialisasi sekali, lalu bergantian cek kondisi → badan → step.',
    panes: [{
      kind: 'for', vars: {},
      code: ['for (int i = 1; i <= 3; i++) {', '    cout << i << " ";', '}', 'cout << "selesai";'],
      before: [{ line: 0, part: 'int i = 1', run: () => ({ set: { i: 1 } }), note: 'Inisialisasi <code>int i = 1</code> dijalankan <strong>sekali saja</strong>, sebelum cek kondisi pertama.' }],
      cond: { line: 0, part: 'i <= 3', text: v => `${v.i} <= 3`, test: v => v.i <= 3 },
      body: [{ line: 1, part: 'cout << i << " ";', run: v => out(v.i + ' '), note: v => `Mencetak nilai i saat ini, yaitu ${v.i}.` }],
      step: { line: 0, part: 'i++', run: v => { v.i++; } },
      after: [{ line: 3, part: 'cout << "selesai";', run: () => out('selesai'), note: 'Baris setelah loop dijalankan sekali.' }]
    }],
    asks: [
      { at: 'start', q: 'Sebelum mulai, tebak output akhirnya.', opts: ['1 2 3 selesai', '1 2 3 4 selesai', '0 1 2 3 selesai', '1 2 selesai'], ans: 0, why: 'i mulai dari 1 dan badan berjalan selama i <= 3, jadi yang tercetak 1, 2, 3.' },
      { at: 'step-first', q: 'Angka 1 sudah tercetak. Apa yang dijalankan berikutnya?', opts: ['Cek kondisi i <= 3', 'Step i++', 'Inisialisasi int i = 1 lagi'], ans: 1, why: 'Pada for, step dijalankan setelah badan selesai, baru kemudian kondisi dicek lagi. Inisialisasi tidak pernah diulang.' },
      { at: 'cond-last', q: 'Sekarang i = 4. Kondisi i <= 3 bernilai?', opts: ['true', 'false'], ans: 1, why: '4 <= 3 salah, jadi loop berhenti. Perhatikan: kondisi dicek 4 kali, padahal badan hanya jalan 3 kali.' }
    ]
  },
  {
    label: 'Hitung mundur (slide)',
    intro: 'Contoh dari slide. Step-nya <code>n--</code>, jadi nilai n turun setiap putaran.',
    panes: [{
      kind: 'for', vars: {},
      code: ['for (int n = 5; n > 0; n--) {', '    cout << n << " ";', '}', 'cout << "FIRE!";'],
      before: [{ line: 0, part: 'int n = 5', run: () => ({ set: { n: 5 } }), note: 'Inisialisasi: n mulai dari 5. Dijalankan sekali saja.' }],
      cond: { line: 0, part: 'n > 0', text: v => `${v.n} > 0`, test: v => v.n > 0 },
      body: [{ line: 1, part: 'cout << n << " ";', run: v => out(v.n + ' '), note: v => `Mencetak ${v.n}.` }],
      step: { line: 0, part: 'n--', run: v => { v.n--; } },
      after: [{ line: 3, part: 'cout << "FIRE!";', run: () => out('FIRE!'), note: 'Loop sudah selesai, baris ini dijalankan sekali.' }]
    }],
    asks: [
      { at: 'start', q: 'Tebak output akhirnya.', opts: ['5 4 3 2 1 FIRE!', '5 4 3 2 1 0 FIRE!', '4 3 2 1 FIRE!', '5 4 3 2 FIRE!'], ans: 0, why: 'Badan berjalan untuk n = 5, 4, 3, 2, 1. Saat n = 0, kondisi n > 0 sudah false.' },
      { at: 'cond-last', q: 'n sudah turun menjadi 0. Apakah 0 ikut tercetak?', opts: ['Ya, karena 0 masih angka', 'Tidak, karena 0 > 0 bernilai false'], ans: 1, why: 'Kondisi dicek sebelum badan. 0 > 0 salah, jadi badan tidak dijalankan untuk n = 0.' }
    ]
  },
  {
    label: 'Jebakan titik koma',
    intro: 'Ada titik koma tepat setelah <code>for (...)</code>. Lihat apa yang sebenarnya diulang.',
    panes: [{
      kind: 'for', vars: {},
      code: ['int i;', 'for (i = 0; i < 3; i++);', '{', '    cout << i << " ";', '}'],
      before: [
        { line: 0, part: 'int i;', note: 'Variabel i dibuat di luar for, jadi masih bisa dipakai setelah loop.' },
        { line: 1, part: 'i = 0', run: () => ({ set: { i: 0 } }), note: 'Inisialisasi: i = 0.' }
      ],
      cond: { line: 1, part: 'i < 3', text: v => `${v.i} < 3`, test: v => v.i < 3 },
      body: [{ line: 1, part: ';', note: 'Badan loop adalah <code>;</code> itu sendiri: pernyataan kosong. Tidak ada yang dicetak.' }],
      step: { line: 1, part: 'i++', run: v => { v.i++; } },
      after: [{ line: 3, part: 'cout << i << " ";', run: v => out(v.i + ' '), note: v => `Blok { } ini bukan bagian loop. Ia dijalankan sekali setelah loop selesai, saat i sudah ${v.i}.` }]
    }],
    asks: [
      { at: 'start', q: 'Tebak output program ini.', opts: ['0 1 2', '3', '0 1 2 3', 'Tidak ada output'], ans: 1, why: 'Titik koma membuat badan loop kosong. Blok { } hanya jalan sekali setelah loop, saat i sudah 3.' },
      { at: 'body-first', q: 'Kondisi 0 < 3 bernilai true. Apa badan loop-nya?', opts: ['cout << i << " ";', 'Titik koma (pernyataan kosong)', 'Blok { } di baris 3–5'], ans: 1, why: 'Titik koma setelah for (...) sudah menjadi badan loop. Blok { } di bawahnya berdiri sendiri.' }
    ]
  }
]);

// ---------- P7: while vs do-while, break ----------
const countdown = (n, kind) => kind === 'while' ? {
  title: 'while', kind: 'while', vars: {},
  code: [`int n = ${n};`, 'while (n > 0) {', '    cout << n << ", ";', '    n--;', '}', 'cout << "FIRE!";'],
  before: [{ line: 0, part: `int n = ${n};`, run: () => ({ set: { n } }), note: `n diisi ${n}.` }],
  cond: { line: 1, part: 'n > 0', text: v => `${v.n} > 0`, test: v => v.n > 0 },
  body: [
    { line: 2, part: 'cout << n << ", ";', run: v => out(v.n + ', '), note: v => `Mencetak ${v.n}.` },
    { line: 3, part: 'n--;', run: v => { v.n--; }, note: v => `n berkurang menjadi ${v.n}. Setelah ini kembali ke cek kondisi.` }
  ],
  after: [{ line: 5, part: 'cout << "FIRE!";', run: () => out('FIRE!'), note: 'Baris setelah loop.' }]
} : {
  title: 'do-while', kind: 'do', vars: {},
  code: [`int n = ${n};`, 'do {', '    cout << n << ", ";', '    n--;', '} while (n > 0);', 'cout << "FIRE!";'],
  before: [{ line: 0, part: `int n = ${n};`, run: () => ({ set: { n } }), note: `n diisi ${n}.` }],
  do: { line: 1, part: 'do' },
  cond: { line: 4, part: 'n > 0', text: v => `${v.n} > 0`, test: v => v.n > 0 },
  body: [
    { line: 2, part: 'cout << n << ", ";', run: v => out(v.n + ', '), note: v => `Mencetak ${v.n}.` },
    { line: 3, part: 'n--;', run: v => { v.n--; }, note: v => `n berkurang menjadi ${v.n}.` }
  ],
  after: [{ line: 5, part: 'cout << "FIRE!";', run: () => out('FIRE!'), note: 'Baris setelah loop.' }]
};

const P7 = lab([
  {
    label: 'while vs do-while, n = 3',
    intro: 'Dua versi hitung mundur dari slide, dijalankan bersamaan. Tombol Langkah menggerakkan keduanya.',
    panes: [countdown(3, 'while'), countdown(3, 'do')],
    asks: [
      { at: 'start', q: 'Dengan n = 3, apakah output kedua versi sama?', opts: ['Sama: 3, 2, 1, FIRE!', 'Beda: do-while mencetak 0 juga', 'Beda: while tidak mencetak apa-apa'], ans: 0, why: 'Kalau kondisi awal true, while dan do-while sama-sama jalan 3 kali. Bedanya hanya di urutan: while cek dulu, do-while cek di belakang.' },
      { at: 'do', pane: 1, q: 'Setelah int n = 3, langkah pertama do-while adalah?', opts: ['Cek n > 0', 'Langsung masuk badan loop'], ans: 1, why: 'do-while tidak mengecek apa pun di awal. Kondisinya ada di baris } while (n > 0);' }
    ]
  },
  {
    label: 'Kondisi awal salah, n = 0',
    intro: 'Kasus yang membedakan keduanya: kondisi <code>n &gt; 0</code> sudah salah sejak awal.',
    panes: [countdown(0, 'while'), countdown(0, 'do')],
    asks: [
      { at: 'start', q: 'Dengan n = 0, tebak output while | do-while.', opts: ['FIRE! | FIRE!', 'FIRE! | 0, FIRE!', '0, FIRE! | 0, FIRE!', 'Tidak ada output | FIRE!'], ans: 1, why: 'while mengecek dulu: 0 > 0 salah, badan dilewati. do-while menjalankan badan sekali dulu, jadi 0 tercetak sebelum kondisi dicek.' },
      { at: 'cond-last', pane: 0, q: 'while mengecek 0 > 0. Apakah badan loop-nya dijalankan?', opts: ['Ya, sekali', 'Tidak sama sekali'], ans: 1, why: 'Kondisi false sejak cek pertama, jadi while langsung lompat ke cout << "FIRE!".' }
    ]
  },
  {
    label: 'break di tengah loop',
    intro: 'Versi pendek contoh slide “countdown aborted”: loop dihentikan saat n = 3.',
    panes: [{
      kind: 'for', vars: {},
      code: ['for (int n = 5; n > 0; n--) {', '    cout << n << ", ";', '    if (n == 3) {', '        cout << "batal!";', '        break;', '    }', '}'],
      before: [{ line: 0, part: 'int n = 5', run: () => ({ set: { n: 5 } }), note: 'Inisialisasi: n = 5.' }],
      cond: { line: 0, part: 'n > 0', text: v => `${v.n} > 0`, test: v => v.n > 0 },
      body: [
        { line: 1, part: 'cout << n << ", ";', run: v => out(v.n + ', '), note: v => `Mencetak ${v.n}.` },
        { line: 2, part: 'n == 3', if: { text: v => `${v.n} == 3`, test: v => v.n === 3 }, then: [
          { line: 3, part: 'cout << "batal!";', run: () => out('batal!'), note: 'Pesan batal dicetak.' },
          { line: 4, part: 'break;', brk: true }
        ] }
      ],
      step: { line: 0, part: 'n--', run: v => { v.n--; } }
    }],
    asks: [
      { at: 'start', q: 'Tebak output akhirnya.', opts: ['5, 4, 3, batal!', '5, 4, batal!', '5, 4, 3,', '5, 4, 3, 2, 1, batal!'], ans: 0, why: 'Angka 3 tetap tercetak karena cout ada sebelum if. Setelah break, putaran untuk 2 dan 1 tidak pernah terjadi.' },
      { at: 'break', q: 'break dijalankan. Apa yang terjadi berikutnya?', opts: ['n-- lalu cek kondisi seperti biasa', 'Loop berhenti, lanjut ke baris setelah }', 'Kembali ke awal badan loop'], ans: 1, why: 'break keluar dari loop saat itu juga. Step n-- dan cek kondisi dilewati.' }
    ]
  }
]);

module.exports = { P6, P7 };
