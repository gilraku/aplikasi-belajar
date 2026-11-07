// Lab Algoritma — penelusur loop C++ langkah demi langkah (blok "trace-lab").
// Tidak menjalankan C++ sungguhan: setiap program ditulis ulang sebagai langkah-langkah JS di bawah,
// lalu jejaknya (nilai variabel, hasil kondisi, keluaran) dibekukan menjadi data saat build.
//
// Bentuk satu langkah: { l: nomor baris (0-based, -1 = selesai), p: potongan kode yang distabilo,
//   pl: 1 bila potongan dicari dari kanan (mis. titik koma terakhir), v: nilai variabel, ch: variabel yang baru berubah, c: { t: teks kondisi, r: true/false }, o: keluaran, x: catatan, tag }
// Tag dipakai untuk menaruh pertanyaan "Tebak dulu": start, cond-first, cond-last, step-first, body-first, do, break, end.

function run(def) {
  const v = { ...(def.vars || {}) };
  const steps = [];
  let out = '', checks = 0, trues = 0, rounds = 0, broke = false, ifChecks = 0, ifTrues = 0, fall = 0;
  const push = (s, note, extra = {}) => steps.push({ l: s.line, p: s.part || null, ...(s.lastPart ? { pl: 1 } : {}), v: { ...v }, o: out, x: note, ...extra });
  const exec = stmts => {
    for (const s of stmts || []) {
      if (s.if) {
        const r = !!s.if.test(v);
        ifChecks++; if (r) ifTrues++;
        const kata = s.kw || 'if';
        const lanjut = r ? (s.else ? 'Blok ini dijalankan, cabang <code>else</code> di bawahnya dilewati.' : 'Isi blok dijalankan.') : (s.else ? 'Lanjut ke cabang <code>else</code>.' : 'Isi blok dilewati.');
        push(s, (typeof s.note === 'function' ? s.note(v, r) : s.note) || `Kondisi <code>${kata}</code> dicek: ${s.if.text(v)} bernilai <strong>${r}</strong>. ` + lanjut, { c: { t: s.if.text(v), r }, tag: s.tag || 'if' });
        const res = r ? exec(s.then) : exec(s.else);
        if (res === 'break') return 'break';
        continue;
      }
      if (s.sw) {
        const val = s.sw.val(v);
        push(s, s.note || `Ekspresi <code>${s.sw.text}</code> dihitung sekali: nilainya <strong>${val}</strong>. Lalu dicocokkan dengan label <code>case</code> dari atas.`, { tag: 'sw' });
        let start = -1;
        for (let i = 0; i < s.cases.length && start < 0; i++) {
          const k = s.cases[i]; if (k.dflt) continue;
          const r = val === k.label;
          ifChecks++; if (r) ifTrues++;
          push(k, r ? `${val} cocok dengan <code>${k.part}</code>. Mulai menjalankan perintah dari sini.` : `${val} tidak cocok dengan <code>${k.part}</code>, lanjut ke label berikutnya.`, { c: { t: `${val} == ${k.label}`, r }, tag: r ? 'sw-match' : 'sw-miss' });
          if (r) start = i;
        }
        if (start < 0) {
          start = s.cases.findIndex(k => k.dflt);
          if (start >= 0) push(s.cases[start], 'Tidak ada label yang cocok, jadi eksekusi lompat ke <code>default</code>.', { tag: 'sw-default' });
        }
        if (start >= 0) for (let i = start; i < s.cases.length; i++) {
          if (i > start) { fall++; push(s.cases[i], `Belum bertemu <code>break</code>, jadi eksekusi <strong>jatuh</strong> ke <code>${s.cases[i].part}</code> tanpa mencocokkan labelnya (fall-through).`, { tag: fall === 1 ? 'fall-first' : 'fall' }); }
          if (exec(s.cases[i].body) === 'break') break;
        }
        continue;
      }
      if (s.brk) { push(s, s.note || (def.kind === 'seq' ? '<code>break</code>: keluar dari <code>switch</code>, lanjut ke baris setelah kurung kurawal penutupnya.' : '<code>break</code>: loop langsung dihentikan. Step dan kondisi loop tidak dijalankan lagi.'), { tag: s.tag || 'break' }); return 'break'; }
      const before = { ...v };
      const r = (s.run && s.run(v)) || {};
      if (r.set) Object.assign(v, r.set);
      if (r.out != null) out += r.out;
      const ch = Object.keys(v).filter(k => v[k] !== before[k]);
      push(s, typeof s.note === 'function' ? s.note(v, before) : s.note, { ...(ch.length ? { ch } : {}), ...(s.tag ? { tag: s.tag } : {}), ...(s.c ? { c: { t: s.c.text(v), r: !!s.c.test(v) } } : {}) });
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
  if (def.kind !== 'seq') for (let guard = 0; guard < 100; guard++) {
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
  // Program tanpa loop (if, switch, operator): ringkasan berupa kalimat, bukan hitungan putaran
  const text = def.kind === 'seq' ? (def.summary ? def.summary({ checks: ifChecks, trues: ifTrues, fall }) : `${ifChecks} kondisi dicek (${ifTrues} true, ${ifChecks - ifTrues} false).`) : undefined;
  return { title: def.title, code: def.code, steps, sum: { checks, trues, rounds, broke, kind: def.kind, ...(text ? { text } : {}) } };
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
      body: [{ line: 1, part: ';', lastPart: true, note: 'Badan loop adalah <code>;</code> itu sendiri: pernyataan kosong. Tidak ada yang dicetak.' }],
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


// ---------- P3: operator (tanpa loop) ----------
const P3 = lab([
  {
    label: 'Prioritas & pembagian',
    intro: 'Satu program kecil berisi jebakan operator yang paling sering keluar: prioritas <code>*</code>, sisa bagi <code>%</code>, pembagian bulat, dan <code>&amp;&amp;</code>.',
    panes: [{
      kind: 'seq', vars: {},
      code: ['int a = 10, b = 3;', 'int h = a + b * 2;', 'int s = a % b;', 'float r = a / b;', 'bool ok = a > b && b > 5;', 'cout << h << " " << s << " " << r << " " << ok;'],
      before: [
        { line: 0, part: 'int a = 10, b = 3;', run: () => ({ set: { a: 10, b: 3 } }), note: 'a dan b sama-sama bertipe <code>int</code>.' },
        { line: 1, part: 'b * 2', note: 'Operator <code>*</code> lebih kuat dari <code>+</code>, jadi <code>b * 2</code> dihitung dulu: 3 × 2 = 6.', tag: 'mul' },
        { line: 1, part: 'int h = a + b * 2;', run: () => ({ set: { h: 16 } }), note: 'Baru penjumlahan: 10 + 6 = 16, lalu disimpan ke h.' },
        { line: 2, part: 'int s = a % b;', run: () => ({ set: { s: 1 } }), note: '<code>%</code> adalah sisa bagi: 10 dibagi 3 = 3, sisa <strong>1</strong>.' },
        { line: 3, part: 'a / b', note: 'Kedua operand <code>int</code>, jadi ini <strong>pembagian bulat</strong>: 10 / 3 = 3. Bagian desimalnya dibuang.', tag: 'div' },
        { line: 3, part: 'float r = a / b;', run: () => ({ set: { r: 3 } }), note: 'r memang <code>float</code>, tetapi yang disimpan sudah 3. Agar hasilnya 3.33, salah satu operand harus desimal: <code>(float) a / b</code>.' },
        { line: 4, part: 'a > b', c: { text: () => '10 > 3', test: () => true }, note: 'Perbandingan dikerjakan sebelum <code>&amp;&amp;</code>. 10 &gt; 3 bernilai true.' },
        { line: 4, part: 'b > 5', c: { text: () => '3 > 5', test: () => false }, note: '3 &gt; 5 bernilai false.', tag: 'and' },
        { line: 4, part: 'bool ok = a > b && b > 5;', run: () => ({ set: { ok: 'false' } }), note: 'true <code>&amp;&amp;</code> false = <strong>false</strong>. Saat dicetak dengan cout, false tampil sebagai 0.' },
        { line: 5, part: 'cout << h << " " << s << " " << r << " " << ok;', run: () => out('16 1 3 0'), note: 'Keempat nilai dicetak, dipisah spasi.' }
      ],
      summary: () => 'Tiga jebakan sekaligus: * dikerjakan sebelum +, int / int membuang desimal, dan bool dicetak sebagai 1 atau 0.'
    }],
    asks: [
      { at: 'start', q: 'Sebelum mulai, tebak output akhirnya.', opts: ['16 1 3 0', '26 1 3.33 0', '16 1 3.33 0', '16 3 3 1'], ans: 0, why: 'h = 10 + 6 = 16, s = sisa 10 / 3 = 1, r = 3 karena pembagian bulat, dan ok = false yang dicetak 0.' },
      { at: 'mul', q: 'Pada a + b * 2, mana yang dihitung lebih dulu?', opts: ['a + b', 'b * 2'], ans: 1, why: 'Perkalian lebih kuat dari penjumlahan, sama seperti matematika sekolah.' },
      { at: 'div', q: 'a dan b sama-sama int. Berapa hasil a / b?', opts: ['3.33', '3', '4', '3.0'], ans: 1, why: 'int dibagi int menghasilkan int. Desimalnya dibuang, tidak dibulatkan.' }
    ]
  },
  {
    label: 'Prefix vs postfix',
    intro: 'Bedanya <code>x++</code> dan <code>++x</code> baru terasa saat nilainya langsung dipakai, misalnya disimpan ke variabel lain.',
    panes: [{
      kind: 'seq', vars: {},
      code: ['int x = 5;', 'int y = x++;', 'int z = ++x;', 'cout << x << " " << y << " " << z;'],
      before: [
        { line: 0, part: 'int x = 5;', run: () => ({ set: { x: 5 } }), note: 'x diisi 5.' },
        { line: 1, part: 'int y = x++;', run: () => ({ set: { y: 5 } }), note: '<strong>Postfix</strong> <code>x++</code>: nilai x saat ini (5) dipakai dulu untuk y.', tag: 'post' },
        { line: 1, part: 'x++', run: () => ({ set: { x: 6 } }), note: 'Setelah dipakai, barulah x naik menjadi 6.' },
        { line: 2, part: '++x', run: () => ({ set: { x: 7 } }), note: '<strong>Prefix</strong> <code>++x</code>: x dinaikkan lebih dulu menjadi 7.', tag: 'pre' },
        { line: 2, part: 'int z = ++x;', run: () => ({ set: { z: 7 } }), note: 'Nilai yang sudah naik (7) yang disimpan ke z.' },
        { line: 3, part: 'cout << x << " " << y << " " << z;', run: () => out('7 5 7'), note: 'Mencetak x, y, dan z.' }
      ],
      summary: () => 'Postfix: pakai dulu, baru naik. Prefix: naik dulu, baru dipakai. Kalau berdiri sendiri (<code>x++;</code>), keduanya sama saja.'
    }],
    asks: [
      { at: 'start', q: 'Tebak output akhirnya.', opts: ['7 5 7', '7 6 7', '6 5 6', '7 5 6'], ans: 0, why: 'y menerima 5 (nilai lama), x naik ke 6, lalu ++x menaikkan x ke 7 sebelum disimpan ke z.' },
      { at: 'post', q: 'x = 5. Berapa nilai y setelah int y = x++;?', opts: ['5', '6'], ans: 0, why: 'Postfix memakai nilai lama dulu. x baru naik setelahnya.' }
    ]
  }
]);

// ---------- P4: if, else-if, nested if ----------
const elseIf = g => ({
  kind: 'seq', vars: {},
  code: [`int g = ${g};`, 'if (g >= 80) {', '    cout << "A";', '} else if (g >= 60) {', '    cout << "B";', '} else {', '    cout << "C";', '}', 'cout << " selesai";'],
  before: [
    { line: 0, part: `int g = ${g};`, run: () => ({ set: { g } }), note: `g diisi ${g}.` },
    { line: 1, part: 'g >= 80', if: { text: v => `${v.g} >= 80`, test: v => v.g >= 80 }, tag: 'if1',
      then: [{ line: 2, part: 'cout << "A";', run: () => out('A'), note: 'Mencetak A. Semua cabang di bawahnya dilewati tanpa dicek.' }],
      else: [{ line: 3, part: 'g >= 60', kw: 'else if', if: { text: v => `${v.g} >= 60`, test: v => v.g >= 60 }, tag: 'if2',
        then: [{ line: 4, part: 'cout << "B";', run: () => out('B'), note: 'Mencetak B. Cabang <code>else</code> terakhir dilewati.' }],
        else: [
          { line: 5, part: 'else', note: 'Semua kondisi di atasnya false, jadi blok <code>else</code> dijalankan tanpa syarat.', tag: 'else' },
          { line: 6, part: 'cout << "C";', run: () => out('C'), note: 'Mencetak C.' }
        ] }] }
  ],
  after: [{ line: 8, part: 'cout << " selesai";', run: () => out(' selesai'), note: 'Baris setelah rangkaian if dijalankan seperti biasa.' }],
  summary: m => `${m.checks} kondisi dicek. Rangkaian else-if berhenti di kondisi true pertama, jadi tepat satu cabang yang dijalankan.`
});

const P4 = lab([
  {
    label: 'else-if, g = 75',
    intro: 'Konversi nilai huruf dari slide. Perhatikan kondisi mana saja yang benar-benar dicek.',
    panes: [elseIf(75)],
    asks: [
      { at: 'start', q: 'Dengan g = 75, tebak outputnya.', opts: ['B selesai', 'A selesai', 'AB selesai', 'C selesai'], ans: 0, why: '75 >= 80 salah, 75 >= 60 benar, jadi B. Cabang else tidak disentuh.' },
      { at: 'if2', q: 'g >= 80 bernilai false. Apa yang dicek berikutnya?', opts: ['g >= 60 (else if)', 'Langsung blok else', 'Program berhenti'], ans: 0, why: 'Kalau kondisi if salah, program pindah ke cabang else if berikutnya dan mengecek kondisinya.' }
    ]
  },
  {
    label: 'else-if, g = 40',
    intro: 'Nilai yang tidak memenuhi kondisi mana pun.',
    panes: [elseIf(40)],
    asks: [
      { at: 'start', q: 'Dengan g = 40, berapa kondisi yang dicek sebelum C tercetak?', opts: ['1', '2', '3'], ans: 1, why: 'g >= 80 dan g >= 60 sama-sama dicek dan false. else tidak punya kondisi, jadi langsung dijalankan.' }
    ]
  },
  {
    label: 'if terpisah vs else-if',
    intro: 'Dua program yang sekilas mirip, dijalankan bersamaan dengan g = 85.',
    panes: [{
      title: 'if terpisah', kind: 'seq', vars: {},
      code: ['int g = 85;', 'if (g >= 80) cout << "A";', 'if (g >= 60) cout << "B";'],
      before: [
        { line: 0, part: 'int g = 85;', run: () => ({ set: { g: 85 } }), note: 'g diisi 85.' },
        { line: 1, part: 'g >= 80', if: { text: v => `${v.g} >= 80`, test: v => v.g >= 80 }, then: [{ line: 1, part: 'cout << "A";', run: () => out('A'), note: 'Mencetak A.' }] },
        { line: 2, part: 'g >= 60', if: { text: v => `${v.g} >= 60`, test: v => v.g >= 60 }, tag: 'second', note: v => `if kedua <strong>berdiri sendiri</strong>, jadi tetap dicek: ${v.g} >= 60 bernilai true.`, then: [{ line: 2, part: 'cout << "B";', run: () => out('B'), note: 'Mencetak B juga.' }] }
      ],
      summary: m => `${m.checks} kondisi dicek, ${m.trues} di antaranya true, jadi dua huruf tercetak.`
    }, {
      title: 'else-if', kind: 'seq', vars: {},
      code: ['int g = 85;', 'if (g >= 80) cout << "A";', 'else if (g >= 60) cout << "B";'],
      before: [
        { line: 0, part: 'int g = 85;', run: () => ({ set: { g: 85 } }), note: 'g diisi 85.' },
        { line: 1, part: 'g >= 80', if: { text: v => `${v.g} >= 80`, test: v => v.g >= 80 },
          then: [{ line: 1, part: 'cout << "A";', run: () => out('A'), note: 'Mencetak A. Cabang else if dilewati tanpa dicek.' }],
          else: [{ line: 2, part: 'g >= 60', kw: 'else if', if: { text: v => `${v.g} >= 60`, test: v => v.g >= 60 }, then: [{ line: 2, part: 'cout << "B";', run: () => out('B') }] }] }
      ],
      summary: m => `Hanya ${m.checks} kondisi dicek. Begitu satu cabang true, sisanya dilewati.`
    }],
    asks: [
      { at: 'start', q: 'Dengan g = 85, tebak output if terpisah | else-if.', opts: ['AB | A', 'A | A', 'AB | AB', 'A | AB'], ans: 0, why: 'Dua if terpisah dicek masing-masing, jadi keduanya mencetak. Pada else-if, cabang kedua tidak pernah dicek karena cabang pertama sudah true.' }
    ]
  },
  {
    label: 'Nested if',
    intro: 'Syarat kedua (PIN) baru dicek kalau syarat pertama (user) lolos.',
    panes: [{
      kind: 'seq', vars: {},
      code: ['string user = "admin";', 'int pin = 1111;', 'if (user == "admin") {', '    if (pin == 1234) {', '        cout << "Masuk";', '    } else {', '        cout << "PIN salah";', '    }', '} else {', '    cout << "User tidak dikenal";', '}'],
      before: [
        { line: 0, part: 'string user = "admin";', run: () => ({ set: { user: '"admin"' } }), note: 'user diisi "admin".' },
        { line: 1, part: 'int pin = 1111;', run: () => ({ set: { pin: 1111 } }), note: 'pin diisi 1111.' },
        { line: 2, part: 'user == "admin"', if: { text: () => '"admin" == "admin"', test: () => true }, note: 'Kondisi luar dicek: user sama dengan "admin", bernilai <strong>true</strong>. Masuk ke blok dalam.',
          then: [{ line: 3, part: 'pin == 1234', if: { text: v => `${v.pin} == 1234`, test: v => v.pin === 1234 }, tag: 'inner', note: v => `Kondisi dalam dicek: ${v.pin} == 1234 bernilai <strong>false</strong>. Lanjut ke <code>else</code> milik if dalam.`,
            then: [{ line: 4, part: 'cout << "Masuk";', run: () => out('Masuk') }],
            else: [{ line: 6, part: 'cout << "PIN salah";', run: () => out('PIN salah'), note: 'Mencetak PIN salah. <code>else</code> milik if luar (baris 9) tidak ikut dijalankan.' }] }],
          else: [{ line: 9, part: 'cout << "User tidak dikenal";', run: () => out('User tidak dikenal') }] }
      ],
      summary: m => `${m.checks} kondisi dicek. Setiap <code>else</code> berpasangan dengan if terdekat di levelnya.`
    }],
    asks: [
      { at: 'start', q: 'user = "admin", pin = 1111. Tebak outputnya.', opts: ['PIN salah', 'Masuk', 'User tidak dikenal', 'PIN salah User tidak dikenal'], ans: 0, why: 'User cocok, jadi masuk ke if dalam. PIN tidak cocok, jadi else dalam yang jalan. else luar tidak tersentuh.' }
    ]
  }
]);

// ---------- P5: switch dan fall-through ----------
const sw = x => ({
  kind: 'seq', vars: {},
  code: [`int x = ${x};`, 'switch (x) {', '    case 1: cout << "Satu ";', '    case 2: cout << "Dua ";', '            break;', '    case 3: cout << "Tiga ";', '    default: cout << "Lainnya";', '}'],
  before: [
    { line: 0, part: `int x = ${x};`, run: () => ({ set: { x } }), note: `x diisi ${x}.` },
    { line: 1, part: 'switch (x)', sw: { text: 'x', val: v => v.x }, cases: [
      { line: 2, part: 'case 1:', label: 1, body: [{ line: 2, part: 'cout << "Satu ";', run: () => out('Satu '), note: 'Mencetak Satu. Perhatikan: case 1 tidak punya break.' }] },
      { line: 3, part: 'case 2:', label: 2, body: [
        { line: 3, part: 'cout << "Dua ";', run: () => out('Dua '), note: 'Mencetak Dua.' },
        { line: 4, part: 'break;', brk: true, tag: 'sw-break' }
      ] },
      { line: 5, part: 'case 3:', label: 3, body: [{ line: 5, part: 'cout << "Tiga ";', run: () => out('Tiga '), note: 'Mencetak Tiga. case 3 juga tidak punya break.' }] },
      { line: 6, part: 'default:', dflt: true, body: [{ line: 6, part: 'cout << "Lainnya";', run: () => out('Lainnya'), note: 'Mencetak Lainnya. Ini perintah terakhir di dalam switch.' }] }
    ] }
  ],
  summary: m => m.fall ? `Eksekusi jatuh ke ${m.fall} label berikutnya karena tidak ada <code>break</code>.` : 'Tidak ada fall-through: eksekusi berhenti di break atau di akhir switch.'
});

const P5 = lab([
  {
    label: 'x = 2 (normal)',
    intro: 'Kode dari slide yang sudah diperjelas. case 1 dan case 3 sengaja <strong>tidak punya break</strong>. Mulai dari kasus yang normal dulu.',
    panes: [sw(2)],
    asks: [
      { at: 'start', q: 'Dengan x = 2, tebak outputnya.', opts: ['Dua', 'Dua Tiga Lainnya', 'Satu Dua', 'Lainnya'], ans: 0, why: 'Masuk di case 2, mencetak Dua, lalu bertemu break dan keluar.' }
    ]
  },
  {
    label: 'x = 1 (tanpa break)',
    intro: 'case 1 tidak punya break. Lihat ke mana eksekusi berjalan setelahnya.',
    panes: [sw(1)],
    asks: [
      { at: 'start', q: 'Dengan x = 1, tebak outputnya.', opts: ['Satu', 'Satu Dua', 'Satu Dua Tiga Lainnya', 'Dua'], ans: 1, why: 'Masuk di case 1, tidak ada break, jadi jatuh ke case 2 dan mencetak Dua. break di case 2 menghentikannya.' },
      { at: 'fall-first', q: 'case 1 selesai tanpa break. Apa yang terjadi berikutnya?', opts: ['Keluar dari switch', 'Langsung menjalankan isi case 2', 'Mengecek dulu apakah x == 2'], ans: 1, why: 'Label case hanya dipakai untuk menentukan titik masuk. Setelah masuk, label lain tidak dicek lagi.' }
    ]
  },
  {
    label: 'x = 3 (sampai default)',
    intro: 'case 3 juga tidak punya break, dan tepat di bawahnya ada default.',
    panes: [sw(3)],
    asks: [
      { at: 'start', q: 'Dengan x = 3, tebak outputnya.', opts: ['Tiga', 'Tiga Lainnya', 'Lainnya', 'Satu Dua Tiga'], ans: 1, why: 'Masuk di case 3, lalu jatuh ke default karena tidak ada break.' }
    ]
  },
  {
    label: 'x = 7 (tidak ada yang cocok)',
    intro: 'Nilai yang tidak punya label case sama sekali.',
    panes: [sw(7)],
    asks: [
      { at: 'start', q: 'Dengan x = 7, tebak outputnya.', opts: ['Lainnya', '(tidak ada output)', 'Satu Dua', 'Tiga Lainnya'], ans: 0, why: 'Tidak ada label 7, jadi eksekusi lompat ke default.' }
    ]
  }
]);

module.exports = { P3, P4, P5, P6, P7 };
