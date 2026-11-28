// Lab Struktur Data & Algoritma, bab "Dasar": perulangan (for, while, do-while, bersarang), Big-O, array 1D, array 2D, dan fungsi rekursif.
// Ditambahkan ke AL_ALGO dari algo-lab.js (dimuat sesudahnya), memakai alRec / alRec2 / alMover dari sana.

const alNums = (raw, min, max, lo, hi, contoh) => {
  const nums = raw.split(/[\s,;]+/).filter(Boolean).map(Number);
  if (nums.length < min || nums.length > max || nums.some(v => !Number.isInteger(v) || v < lo || v > hi)) return { err: `Isi ${min === max ? min : `${min} sampai ${max}`} bilangan bulat ${lo}–${hi}${max > 1 ? ', dipisah koma' : ''}. Contoh: ${contoh}` };
  return { data: nums };
};
const alRnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

Object.assign(AL_ALGO, {
  // ---------------- Perulangan: for, while, do-while ----------------
  // Ketiga fungsi menjumlah 1 sampai n. Yang ditelusuri: banyak putaran badan dan banyak cek kondisi.
  perulangan: {
    counters: ['Cek kondisi', 'Putaran'],
    vars: ['n', 'i', 'total', 'i <= n'],
    code: {
      cpp: ['int jumlahFor(int n) {', '    int total = 0;', '    for (int i = 1; i <= n; i++) {', '        total += i;', '    }', '    return total;', '}', '',
        'int jumlahWhile(int n) {', '    int total = 0, i = 1;', '    while (i <= n) {', '        total += i;', '        i++;', '    }', '    return total;', '}', '',
        'int jumlahDoWhile(int n) {', '    int total = 0, i = 1;', '    do {', '        total += i;', '        i++;', '    } while (i <= n);', '    return total;', '}'],
      ps: ['jumlah_for(n):', '    total ← 0', '    untuk i ← 1; selama i ≤ n; i ← i + 1:', '        total ← total + i', '    kembalikan total',
        'jumlah_while(n):', '    total ← 0; i ← 1', '    selama i ≤ n:', '        total ← total + i; i ← i + 1', '    kembalikan total',
        'jumlah_do_while(n):', '    total ← 0; i ← 1', '    ulangi:', '        total ← total + i; i ← i + 1', '    selama i ≤ n   (dicek di akhir)', '    kembalikan total']
    },
    lines: {
      cpp: { intro: [1, 9, 18], finit: [2, 3], fcek: [3], fbody: [4], fstep: [3], fret: [6], winit: [10], wcek: [11], wbody: [12, 13], wret: [15], dinit: [19], dbody: [20, 21, 22], dcek: [23], dret: [24], end: [1, 9, 18] },
      ps: { intro: [1, 6, 11], finit: [2, 3], fcek: [3], fbody: [4], fstep: [3], fret: [5], winit: [7], wcek: [8], wbody: [9], wret: [10], dinit: [12], dbody: [13, 14], dcek: [15], dret: [16], end: [1, 6, 11] }
    },
    input: {
      aria: 'Nilai n', hint: 'Satu bilangan bulat 0–6. Coba 0 untuk melihat kapan do-while memberi hasil berbeda. Contoh: 4',
      parse(raw) { return alNums(raw, 1, 1, 0, 6, '4'); },
      acak() { return { data: [alRnd(0, 6)] }; }
    },
    run(data) {
      const r = alRec2(), n = data[0], L = {}, sum = n * (n + 1) / 2;
      const S = o => Object.assign({ n, L: JSON.parse(JSON.stringify(L)) }, o);
      const K = (i, ok) => `${i} <= ${n} → ${ok ? 'true' : 'false'}`;
      const reset = () => { r.cnt['Cek kondisi'] = 0; r.cnt.Putaran = 0; };
      const isi = n ? `${Array.from({ length: n }, (_, k) => k + 1).join(' + ')} = ${sum}` : 'jumlah 1 sampai 0, yaitu 0 karena tidak ada angka yang dijumlah';
      reset();
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'intro', vars: { n }, S: S({}), title: `Tiga cara menjumlah 1 sampai ${n}`,
        body: `Ketiga fungsi menghitung ${isi}. Bedanya hanya bentuk perulangannya. Perhatikan dua hal: berapa kali <b>badan</b> dijalankan (putaran) dan berapa kali <b>kondisi</b> <code>i &lt;= n</code> dicek.`,
        note: ['Dasarnya', 'Sintaks dan latihan menelusuri ketiga perulangan ada di <a href="#/c/algoritma-pemrograman/m/p6">Algoritma P6</a> dan <a href="#/c/algoritma-pemrograman/m/p7">Algoritma P7</a>. Di sini fokusnya menghitung putaran, karena itulah dasar Big-O.'] });

      // ---- for ----
      const lf = L.f = { put: [], cek: 0, total: 0, ret: '' };
      let i = 1, total = 0;
      r.push({ grp: 'for', kind: 'Mulai', ln: 'finit', vars: { n, i, total }, S: S({ cur: 'f' }), title: 'total = 0, lalu int i = 1',
        body: 'Bagian pertama for (<code>int i = 1</code>) hanya dijalankan <b>sekali</b>, sebelum putaran pertama.' });
      for (;;) {
        const ok = i <= n; lf.cek++; r.cnt['Cek kondisi']++;
        r.push({ grp: 'for', kind: 'Periksa', ln: 'fcek', vars: { n, i, total, 'i <= n': K(i, ok) }, S: S({ cur: 'f', at: ok ? lf.put.length : -1 }), title: `Cek ${i} <= ${n}`,
          body: ok ? '<b>true</b>, jadi badan perulangan dijalankan.' : `<b>false</b>, perulangan selesai. Kondisi sudah dicek ${lf.cek} kali: ${lf.cek - 1} kali true dan sekali false.`,
          q: { t: `i = ${i}. Apakah i <= ${n} bernilai true?`, o: ['true, masuk badan', 'false, keluar'], a: ok ? 0 : 1 } });
        if (!ok) break;
        total += i; lf.put.push(i); lf.total = total; r.cnt.Putaran++;
        r.push({ grp: 'for', kind: 'Langkah', ln: 'fbody', vars: { n, i, total }, S: S({ cur: 'f', at: lf.put.length - 1 }), title: `total += ${i} → ${total}`, body: `Putaran ke-${lf.put.length}: total = ${total - i} + ${i} = <b>${total}</b>.` });
        i++;
        r.push({ grp: 'for', kind: 'Langkah', ln: 'fstep', vars: { n, i, total }, S: S({ cur: 'f', at: lf.put.length - 1 }), title: `i++ → i = ${i}`, body: 'Bagian ketiga for (<code>i++</code>) dijalankan <b>setelah</b> badan, lalu kembali ke cek kondisi.' });
      }
      lf.ret = total;
      r.push({ grp: 'for', kind: 'Hasil', ln: 'fret', vars: { n, i, total }, S: S({ cur: 'f' }), title: `jumlahFor(${n}) = ${total}`,
        body: `${lf.put.length} putaran, kondisi dicek ${lf.cek} kali (n + 1). Cek terakhir yang bernilai false itulah yang menghentikan perulangan.` });

      // ---- while ----
      reset();
      const lw = L.w = { put: [], cek: 0, total: 0, ret: '' };
      i = 1; total = 0;
      r.push({ grp: 'while', kind: 'Mulai', ln: 'winit', vars: { n, i, total }, S: S({ cur: 'w' }), title: 'total = 0, i = 1',
        body: 'Pada while, nilai awal ditulis <b>sebelum</b> perulangan dan <code>i++</code> ditulis sendiri di badan. Urutan kerjanya sama persis dengan for.' });
      for (;;) {
        const ok = i <= n; lw.cek++; r.cnt['Cek kondisi']++;
        r.push({ grp: 'while', kind: 'Periksa', ln: 'wcek', vars: { n, i, total, 'i <= n': K(i, ok) }, S: S({ cur: 'w', at: ok ? lw.put.length : -1 }), title: `Cek ${i} <= ${n}`,
          body: ok ? '<b>true</b>, badan dijalankan.' : `<b>false</b>, keluar dari while setelah ${lw.cek} kali cek.`,
          q: { t: `i = ${i}. Apakah while masih mengulang?`, o: ['Ya, i <= n true', 'Tidak, keluar'], a: ok ? 0 : 1 } });
        if (!ok) break;
        total += i; lw.put.push(i); lw.total = total; r.cnt.Putaran++; i++;
        r.push({ grp: 'while', kind: 'Langkah', ln: 'wbody', vars: { n, i, total }, S: S({ cur: 'w', at: lw.put.length - 1 }), title: `total += ${i - 1}, i++`,
          body: `Putaran ke-${lw.put.length}: total = <b>${total}</b>, i menjadi ${i}.${lw.put.length === 1 ? ' Kalau baris <code>i++</code> lupa ditulis, i tetap 1 dan kondisi selalu true: perulangan tidak pernah berhenti.' : ''}` });
      }
      lw.ret = total;
      r.push({ grp: 'while', kind: 'Hasil', ln: 'wret', vars: { n, i, total }, S: S({ cur: 'w' }), title: `jumlahWhile(${n}) = ${total}`,
        body: `Sama dengan for: ${lw.put.length} putaran dan ${lw.cek} kali cek kondisi.` });

      // ---- do-while ----
      reset();
      const ld = L.d = { put: [], cek: 0, total: 0, ret: '' }, runs = Math.max(n, 1);
      i = 1; total = 0;
      const opt = [...new Set([n, runs, n + 1])].sort((p, q) => p - q);
      r.push({ grp: 'do-while', kind: 'Mulai', ln: 'dinit', vars: { n, i, total }, S: S({ cur: 'd' }), title: 'total = 0, i = 1',
        body: `Pada do-while, kondisi baru dicek <b>di akhir</b>, setelah badan dijalankan. Jadi badan dijalankan ${runs} kali untuk n = ${n}.`,
        q: { t: `Dengan n = ${n}, berapa kali badan do-while dijalankan?`, o: opt.map(String), a: opt.indexOf(runs) } });
      for (;;) {
        total += i; ld.put.push(i); ld.total = total; r.cnt.Putaran++; i++;
        r.push({ grp: 'do-while', kind: 'Langkah', ln: 'dbody', vars: { n, i, total }, S: S({ cur: 'd', at: ld.put.length - 1 }), title: `total += ${i - 1}, i++`,
          body: `Putaran ke-${ld.put.length}: total = <b>${total}</b>, i menjadi ${i}.${ld.put.length === 1 ? ' Putaran pertama ini berjalan <b>tanpa</b> cek kondisi.' : ''}` });
        const ok = i <= n; ld.cek++; r.cnt['Cek kondisi']++;
        r.push({ grp: 'do-while', kind: 'Periksa', ln: 'dcek', vars: { n, i, total, 'i <= n': K(i, ok) }, S: S({ cur: 'd', at: ok ? -1 : ld.put.length - 1 }), title: `Cek ${i} <= ${n}`,
          body: ok ? '<b>true</b>, kembali ke <code>do</code> untuk putaran berikutnya.' : `<b>false</b>, perulangan selesai. Kondisi dicek ${ld.cek} kali, sama dengan banyak putarannya.`,
          q: { t: `i = ${i}. Apakah do-while mengulang lagi?`, o: ['Ya, kembali ke do', 'Tidak, selesai'], a: ok ? 0 : 1 } });
        if (!ok) break;
      }
      ld.ret = total;
      r.push({ grp: 'do-while', kind: 'Hasil', ln: 'dret', vars: { n, i, total }, S: S({ cur: 'd' }), title: `jumlahDoWhile(${n}) = ${total}`,
        body: n ? `${ld.put.length} putaran dan ${ld.cek} kali cek kondisi. Cek pertama baru terjadi setelah putaran pertama, jadi ceknya satu lebih sedikit daripada for dan while.`
          : 'Hasilnya <b>1</b>, padahal jumlah 1 sampai 0 seharusnya 0. Badan do-while sudah menambah 1 sebelum kondisi sempat dicek. do-while tidak cocok kalau ada kemungkinan perulangan tidak perlu berjalan sama sekali.' });

      reset(); r.cnt.Putaran = n; r.cnt['Cek kondisi'] = n + 1;
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'end', vars: { n, total: n ? sum : `${sum} / ${sum} / 1` }, S: S({}), title: n ? `Ketiganya menghasilkan ${sum}` : 'for dan while 0, do-while 1',
        body: `for dan while: ${n} putaran, kondisi dicek ${n + 1} kali. do-while: ${runs} putaran, dicek ${runs} kali. Pilih for kalau banyak putaran sudah diketahui, while kalau berhentinya bergantung pada keadaan, do-while kalau badan memang harus jalan minimal sekali (misalnya menu).`,
        note: ['Kaitannya dengan Big-O', 'Banyak putaran naik sebanding dengan n: n = 10 berarti 10 putaran, n = 1.000 berarti 1.000 putaran. Satu perulangan sampai n disebut <b>O(n)</b>. Lihat pelajaran <a href="#/c/struktur-data-algoritma/m/big-o">Big-O</a>.'] });
      return r.F;
    },
    view(A, s, f) {
      const S = f.S, n = S.n, W = 560, slots = Math.max(n, 1), gap = 8, bw = Math.min(52, (W - 150 - gap * (slots - 1)) / slots), x0 = 130;
      let g = '';
      [['f', 'for'], ['w', 'while'], ['d', 'do-while']].forEach(([k, nm], row) => {
        const y = 22 + row * 84, ln = S.L[k], on = S.cur === k;
        g += `<text class="al-lbl${ln ? '' : ' al-muted'}" x="20" y="${y + 23}">${on ? '▸ ' : ''}${nm}</text>`;
        for (let p = 0; p < slots; p++) {
          const done = ln && p < ln.put.length, cur = on && S.at === p;
          g += `<g class="al-box${cur ? ' al-cmp' : done ? ' al-done' : ' al-dim'}" transform="translate(${x0 + p * (bw + gap)},${y})"><rect width="${bw}" height="36" rx="6"/><text x="${bw / 2}" y="18">${done ? '+' + ln.put[p] : ''}</text></g>`;
        }
        g += `<text class="al-lbl${ln ? '' : ' al-muted'}" x="${x0}" y="${y + 58}">${ln ? `${ln.put.length} putaran · cek ${ln.cek} kali · total ${ln.total}${ln.ret !== '' ? ` → return ${ln.ret}` : ''}` : 'belum dijalankan'}</text>`;
      });
      const desc = ['f', 'w', 'd'].map(k => S.L[k] ? `${S.L[k].put.length} putaran` : 'belum').join(', ');
      return `<svg class="al-svg" viewBox="0 0 ${W} 270" role="img" aria-label="Putaran for, while, do-while untuk n = ${n}: ${esc(desc)}">${g}</svg>`;
    },
    program(s) {
      const n = s.data[0], sum = n * (n + 1) / 2;
      const L = ['#include <iostream>', 'using namespace std;', '', ...this.code.cpp, '', 'int main() {', `    int n = ${n};`, '    cout << "for      : " << jumlahFor(n) << endl;', '    cout << "while    : " << jumlahWhile(n) << endl;', '    cout << "do-while : " << jumlahDoWhile(n) << endl;', '    return 0;', '}'];
      return { code: L.join('\n'), out: [`for      : ${sum}`, `while    : ${sum}`, `do-while : ${n ? sum : 1}`].join('\n') };
    }
  },

  // ---------------- Perulangan bersarang: menghitung pasangan kembar ----------------
  kembar: {
    counters: ['Perbandingan'],
    vars: ['n', 'i', 'j', 'a[i]', 'a[j]', 'kembar'],
    code: {
      cpp: ['int hitungKembar(int a[], int n) {', '    int kembar = 0;', '    for (int i = 0; i < n - 1; i++) {', '        for (int j = i + 1; j < n; j++) {', '            if (a[i] == a[j]) {', '                kembar++;', '            }', '        }', '    }', '    return kembar;', '}'],
      ps: ['hitung_kembar(a, n):', '    kembar ← 0', '    untuk i dari 0 sampai n-2:', '        untuk j dari i+1 sampai n-1:', '            jika a[i] = a[j]: kembar ← kembar + 1', '    kembalikan kembar']
    },
    lines: { cpp: { sig: [1], init: [2], luar: [3], cmp: [4, 5], inc: [6], hit: [3, 4], ret: [10] }, ps: { sig: [1], init: [2], luar: [3], cmp: [4, 5], inc: [5], hit: [3, 4], ret: [6] } },
    input: {
      hint: '3 sampai 8 bilangan bulat 0–99, dipisah koma. Tulis angka yang sama lebih dari sekali supaya ada pasangan kembar.',
      acak() {
        const len = alRnd(4, 8), base = Array.from({ length: len - 2 }, () => alRnd(1, 60));
        const d = Array.from({ length: len }, (_, k) => k < base.length ? base[k] : base[alRnd(0, base.length - 1)]);
        for (let k = d.length - 1; k > 0; k--) { const m = alRnd(0, k); [d[k], d[m]] = [d[m], d[k]]; }
        return { data: d };
      }
    },
    run(data) {
      const r = alRec2(), a = data.slice(), n = a.length, tot = n * (n - 1) / 2, seen = [], hits = [];
      r.cnt.Perbandingan = 0;
      let kembar = 0;
      const S = o => Object.assign({ a, seen: seen.slice(), hits: hits.slice() }, o);
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'sig', vars: { n }, S: S({}), title: 'Bandingkan setiap pasangan',
        body: `Data: ${alList(a)}. Untuk menghitung pasangan angka yang sama, setiap angka dibandingkan dengan semua angka di <b>kanannya</b>. Perulangan luar memilih a[i], perulangan dalam berjalan dari j = i + 1 sampai n - 1.`,
        note: ['Kenapa j mulai dari i + 1?', 'Pasangan (0, 3) sama dengan (3, 0), dan angka tidak perlu dibandingkan dengan dirinya sendiri. Karena itu kotak di diagonal dan di bawahnya pada grid tidak pernah diperiksa.'] });
      r.push({ grp: 'Mulai', kind: 'Mulai', ln: 'init', vars: { n, kembar }, S: S({}), title: 'kembar = 0', body: 'Penghitung pasangan kembar dikosongkan dulu.' });
      for (let i = 0; i < n - 1; i++) {
        const g = `i = ${i}`;
        r.push({ grp: g, kind: 'Putaran', ln: 'luar', vars: { n, i, 'a[i]': a[i], kembar }, S: S({ i }), title: `Perulangan luar: i = ${i}`,
          body: `a[${i}] = ${a[i]} dibandingkan dengan ${n - 1 - i} angka di kanannya (j = ${i + 1} sampai ${n - 1}).${i ? ' Perulangan dalam dimulai lagi dari awal, tetapi awalnya ikut bergeser karena j = i + 1.' : ''}`,
          q: i ? { t: `Perulangan dalam dimulai lagi. Untuk i = ${i}, j mulai dari berapa?`, o: ['0', String(i), String(i + 1)], a: 2 } : undefined });
        for (let j = i + 1; j < n; j++) {
          r.cnt.Perbandingan++; seen.push([i, j]);
          const eq = a[i] === a[j];
          r.push({ grp: g, kind: 'Bandingkan', ln: 'cmp', vars: { n, i, j, 'a[i]': a[i], 'a[j]': a[j], kembar }, S: S({ i, j }), title: `a[${i}] == a[${j}]?`,
            body: eq ? `${a[i]} == ${a[j]}: <b>sama</b>, jadi kembar bertambah.` : `${a[i]} == ${a[j]}? Tidak.`,
            q: { t: `Apakah a[${i}] = ${a[i]} sama dengan a[${j}] = ${a[j]}?`, o: ['Ya, sama', 'Tidak'], a: eq ? 0 : 1 } });
          if (eq) {
            kembar++; hits.push([i, j]);
            r.push({ grp: g, kind: 'Hasil', ln: 'inc', vars: { n, i, j, 'a[i]': a[i], 'a[j]': a[j], kembar }, S: S({ i, j }), title: `kembar = ${kembar}`, body: `Pasangan indeks (${i}, ${j}) dicatat.` });
          }
        }
      }
      const opts = [...new Set([tot, n * n, n, 2 * n])].sort((p, q) => p - q);
      r.push({ grp: 'Hasil', kind: 'Periksa', ln: 'hit', vars: { n, kembar }, S: S({}), title: `${tot} perbandingan untuk ${n} data`,
        body: `Perulangan dalam berjalan ${Array.from({ length: n - 1 }, (_, k) => n - 1 - k).join(' + ')} = ${tot} kali. Rumusnya n(n-1)/2.`,
        q: { t: `Berapa total perbandingan untuk n = ${n}?`, o: opts.map(String), a: opts.indexOf(tot) } });
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'ret', vars: { n, kembar }, S: S({ end: true }), title: kembar ? `${kembar} pasangan kembar` : 'Tidak ada yang kembar',
        body: `Fungsi mengembalikan ${kembar}. Banyak perbandingannya selalu ${tot}, ada atau tidak ada yang kembar, karena kedua perulangan tidak pernah berhenti lebih awal.`,
        note: ['Kaitannya dengan Big-O', 'n(n-1)/2 = (n² - n)/2. Konstanta 1/2 dan suku -n dibuang, jadi <b>O(n²)</b>. Data 2 kali lipat, perbandingan sekitar 4 kali lipat: 8 data perlu 28 perbandingan, 16 data perlu 120.'] });
      return r.F;
    },
    view(A, s, f) {
      const S = f.S, a = S.a, n = a.length, W = 560, gap = 8, bw = Math.min(52, (W - 40 - gap * (n - 1)) / n), ax = (W - (bw * n + gap * (n - 1))) / 2;
      const cs = n <= 6 ? 34 : 28, gx = (W - n * cs) / 2 + 12, gy = 150, has = (L, i, j) => L.some(p => p[0] === i && p[1] === j);
      let g = '';
      a.forEach((v, p) => {
        const c = S.end ? (S.hits.some(h => h[0] === p || h[1] === p) ? ' al-found' : ' al-done') : p === S.i || p === S.j ? ' al-cmp' : '';
        const x = ax + p * (bw + gap), t = [p === S.i ? 'i' : '', p === S.j ? 'j' : ''].filter(Boolean).join(',');
        g += `<g class="al-box${c}" transform="translate(${x},16)"><rect width="${bw}" height="40" rx="6"/><text x="${bw / 2}" y="20">${v}</text></g><text class="al-idx" x="${x + bw / 2}" y="74">[${p}]</text>${t ? `<text class="al-lbl" x="${x + bw / 2}" y="94" text-anchor="middle">↑ ${t}</text>` : ''}`;
      });
      g += `<text class="al-lbl al-muted" x="${gx - 30}" y="${gy - 26}">grid pasangan: baris i, kolom j</text>`;
      for (let k = 0; k < n; k++) g += `<text class="al-idx" x="${gx + k * cs + cs / 2}" y="${gy - 8}">${k}</text><text class="al-idx" x="${gx - 14}" y="${gy + k * cs + cs / 2 + 4}">${k}</text>`;
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        const c = j <= i ? ' al-dim' : S.i === i && S.j === j ? ' al-cmp' : has(S.hits, i, j) ? ' al-found' : has(S.seen, i, j) ? ' al-done' : '';
        g += `<g class="al-box${c}" transform="translate(${gx + j * cs + 2},${gy + i * cs + 2})"><rect width="${cs - 4}" height="${cs - 4}" rx="4"/></g>`;
      }
      const H = gy + n * cs + 30;
      g += `<text class="al-lbl al-muted" x="${gx - 30}" y="${H - 8}">${S.seen.length} dari ${n * (n - 1) / 2} pasangan dibandingkan${S.hits.length ? ' · hijau = kembar' : ''}</text>`;
      return `<svg class="al-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Isi array: ${esc(a.join(', '))}. ${S.seen.length} dari ${n * (n - 1) / 2} pasangan sudah dibandingkan.">${g}</svg>`;
    },
    program(s) {
      const a = s.data, n = a.length; let k = 0;
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (a[i] === a[j]) k++;
      const L = ['#include <iostream>', 'using namespace std;', '', ...this.code.cpp, '', 'int main() {', `    int a[] = {${a.join(', ')}};`, '    int n = sizeof(a) / sizeof(a[0]);', '    cout << "Pasangan kembar: " << hitungKembar(a, n) << endl;', '    cout << "Perbandingan: " << n * (n - 1) / 2 << endl;', '    return 0;', '}'];
      return { code: L.join('\n'), out: `Pasangan kembar: ${k}\nPerbandingan: ${n * (n - 1) / 2}` };
    }
  },

  // ---------------- Big-O: menghitung langkah ----------------
  bigo: {
    counters: [],
    vars: ['n', 'langkah'],
    code: {
      cpp: ['int satuLangkah(int n) {        // O(1)', '    int c = 0;', '    c++;', '    return c;', '}', '',
        'int bagiDua(int n) {            // O(log n)', '    int c = 0;', '    for (int i = n; i > 1; i /= 2) c++;', '    return c;', '}', '',
        'int satuPutaran(int n) {        // O(n)', '    int c = 0;', '    for (int i = 0; i < n; i++) c++;', '    return c;', '}', '',
        'int putaranBersarang(int n) {   // O(n²)', '    int c = 0;', '    for (int i = 0; i < n; i++)', '        for (int j = 0; j < n; j++) c++;', '    return c;', '}'],
      ps: ['satuLangkah(n):         satu perintah saja          → O(1)', 'bagiDua(n):             i = n, bagi 2 sampai i ≤ 1   → O(log n)', 'satuPutaran(n):         i dari 0 sampai n-1          → O(n)', 'putaranBersarang(n):    i dari 0..n-1, j dari 0..n-1 → O(n²)']
    },
    lines: {
      cpp: { intro: [1, 7, 13, 19], o1: [1, 2, 3, 4], olog: [7, 8, 9, 10], on: [13, 14, 15, 16], on2: [19, 20, 21, 22, 23], end: [1, 7, 13, 19] },
      ps: { intro: [1, 2, 3, 4], o1: [1], olog: [2], on: [3], on2: [4], end: [1, 2, 3, 4] }
    },
    FN: [
      { k: 'o1', o: 'O(1)', f: 'satuLangkah', c: () => 1, why: 'Hanya ada satu perintah, tidak ada perulangan. Berapa pun n, langkahnya tetap 1.' },
      { k: 'olog', o: 'O(log n)', f: 'bagiDua', c: n => { let c = 0; for (let i = n; i > 1; i = Math.floor(i / 2)) c++; return c; }, why: 'i dibagi 2 setiap putaran, jadi n yang dua kali lipat hanya menambah 1 langkah. Pola ini muncul di pencarian biner.' },
      { k: 'on', o: 'O(n)', f: 'satuPutaran', c: n => n, why: 'Satu perintah untuk setiap data. n dua kali lipat, langkah juga dua kali lipat. Contohnya pencarian linear dan menjumlahkan isi array.' },
      { k: 'on2', o: 'O(n²)', f: 'putaranBersarang', c: n => n * n, why: 'Perulangan di dalam perulangan: untuk setiap i, j berjalan n kali. n dua kali lipat, langkah menjadi empat kali lipat. Contohnya bubble sort dan selection sort.' }
    ],
    input: {
      aria: 'Nilai n, dipisah koma',
      hint: '2 sampai 5 nilai n, masing-masing 1–64, dipisah koma. Urutannya dirapikan otomatis. Contoh: 4, 8, 16, 32',
      parse(raw) { const r = alNums(raw, 2, 5, 1, 64, '4, 8, 16, 32'); if (r.err) return r; const d = [...new Set(r.data)].sort((p, q) => p - q); return d.length < 2 ? { err: 'Isi minimal dua nilai n yang berbeda.' } : { data: d }; },
      acak() { const s = new Set(); const k = alRnd(3, 5); while (s.size < k) s.add(alRnd(1, 64)); return { data: [...s].sort((p, q) => p - q) }; }
    },
    run(data) {
      const r = alRec2(), FN = this.FN, done = [];
      const S = o => Object.assign({ ns: data.slice(), done: done.slice() }, o);
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'intro', vars: { n: data.join(', ') }, S: S({}), title: 'Menghitung langkah, bukan detik',
        body: `Kecepatan program tidak diukur dengan stopwatch, karena hasilnya berbeda di tiap komputer. Yang dihitung adalah <b>berapa langkah</b> yang dijalankan saat banyak data (n) bertambah. Keempat fungsi ini menghitung langkahnya sendiri di variabel <code>c</code>, untuk n = ${data.join(', ')}.` });
      FN.forEach(fn => {
        const n0 = data[data.length - 1], right = fn.c(n0);
        const opts = [...new Set([right, n0, n0 * n0, 1, FN[1].c(n0)])].sort((p, q) => p - q).slice(0, 4);
        if (!opts.includes(right)) opts[opts.length - 1] = right;
        opts.sort((p, q) => p - q);
        r.push({ grp: fn.o, kind: 'Periksa', ln: fn.k, vars: { n: n0 }, S: S({ cur: fn.k, hide: true }), title: `${fn.f}(${n0}): berapa langkah?`,
          body: `Baca kodenya: berapa kali <code>c++</code> dijalankan kalau n = ${n0}?`, q: { t: `Berapa nilai c yang dikembalikan ${fn.f}(${n0})?`, o: opts.map(String), a: opts.indexOf(right) } });
        done.push(fn.k);
        const counts = data.map(fn.c);
        r.push({ grp: fn.o, kind: 'Hasil', ln: fn.k, vars: { n: n0, langkah: right }, S: S({ cur: fn.k }), title: `${fn.o}: ${counts.join(', ')} langkah`, body: fn.why,
          note: data.length > 1 ? ['Dari n terkecil ke terbesar', `n naik dari ${data[0]} ke ${n0} (${(n0 / data[0]).toFixed(n0 % data[0] ? 1 : 0)} kali), langkah ${fn.c(data[0]) === right ? 'tetap' : `naik dari ${fn.c(data[0])} ke ${right}`}.`] : undefined });
      });
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'end', vars: { n: data.join(', ') }, S: S({ table: true }), title: 'Bandingkan keempatnya',
        body: `Untuk n = ${data[data.length - 1]}: O(1) = 1, O(log n) = ${FN[1].c(data[data.length - 1])}, O(n) = ${data[data.length - 1]}, O(n²) = ${data[data.length - 1] ** 2} langkah. Selisihnya makin jauh saat n membesar, jadi untuk data besar pilih algoritma dengan Big-O yang lebih kecil.`,
        note: ['Cara cepat menebak Big-O', 'Tidak ada perulangan → O(1). Satu perulangan sampai n → O(n). Dua perulangan bersarang yang masing-masing sampai n → O(n²). Perulangan yang membagi dua → O(log n).'] });
      return r.F;
    },
    view(A, s, f) {
      const S = f.S, FN = A.FN, ns = S.ns, W = 560, H = 300;
      if (S.table) {
        const cw = Math.min(90, 400 / ns.length), x0 = 130;
        let g = `<text class="al-lbl" x="20" y="40">n →</text>` + ns.map((n, i) => `<text class="al-lbl" x="${x0 + i * cw + cw / 2}" y="40" text-anchor="middle">${n}</text>`).join('');
        FN.forEach((fn, r) => { const y = 72 + r * 52;
          g += `<text class="al-lbl" x="20" y="${y + 4}">${fn.o}</text>` + ns.map((n, i) => { const v = fn.c(n), max = ns[ns.length - 1] ** 2, w = Math.max(3, (cw - 12) * Math.log2(v + 1) / Math.log2(max + 1));
            return `<rect class="al-heat" x="${x0 + i * cw + 6}" y="${y - 16}" width="${w}" height="10" rx="3"/><text class="al-lbl" x="${x0 + i * cw + 6}" y="${y + 14}">${v}</text>`; }).join(''); });
        return `<svg class="al-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Tabel banyak langkah untuk n = ${esc(ns.join(', '))}">${g}<text class="al-lbl al-muted" x="20" y="${H - 12}">Panjang garis memakai skala log supaya O(n²) tetap muat.</text></svg>`;
      }
      const fn = FN.find(x => x.k === S.cur) || FN[0], vals = ns.map(fn.c), max = Math.max(...vals, 1), bw = Math.min(70, 380 / ns.length), gap = 18, x0 = (W - ns.length * (bw + gap)) / 2, base = 240;
      let g = `<text class="al-lbl" x="20" y="30">${fn.o} · ${fn.f}(n)</text><line class="al-floor" x1="${x0 - 8}" x2="${x0 + ns.length * (bw + gap) - gap + 8}" y1="${base + .5}" y2="${base + .5}"/>`;
      ns.forEach((n, i) => { const h = S.hide ? 0 : Math.max(4, (vals[i] / max) * 170), x = x0 + i * (bw + gap);
        g += `<rect class="al-col${S.hide ? '' : ' is-on'}" x="${x}" y="${base - h}" width="${bw}" height="${h}" rx="4"/><text class="al-lbl" x="${x + bw / 2}" y="${base - h - 8}" text-anchor="middle">${S.hide ? '?' : vals[i]}</text><text class="al-idx" x="${x + bw / 2}" y="${base + 18}">n = ${n}</text>`; });
      return `<svg class="al-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Banyak langkah ${esc(fn.o)}: ${esc(S.hide ? 'belum dibuka' : vals.join(', '))}">${g}</svg>`;
    },
    program(s) {
      const L = ['#include <iostream>', 'using namespace std;', '', ...this.code.cpp, '', 'int main() {', `    int daftarN[] = {${s.data.join(', ')}};`, `    for (int k = 0; k < ${s.data.length}; k++) {`, '        int n = daftarN[k];',
        '        cout << "n = " << n << ": O(1) = " << satuLangkah(n) << ", O(log n) = " << bagiDua(n)', '             << ", O(n) = " << satuPutaran(n) << ", O(n^2) = " << putaranBersarang(n) << endl;', '    }', '    return 0;', '}'];
      const FN = this.FN, out = s.data.map(n => `n = ${n}: O(1) = 1, O(log n) = ${FN[1].c(n)}, O(n) = ${n}, O(n^2) = ${n * n}`);
      return { code: L.join('\n'), out: out.join('\n') };
    }
  },

  // ---------------- Array 1D: jumlah dan nilai terbesar ----------------
  array1d: {
    counters: ['Perbandingan'],
    vars: ['n', 'i', 'a[i]', 'total', 'maks', 'posisi'],
    code: {
      cpp: ['void jumlahDanMaks(int a[], int n) {', '    int total = 0, maks = a[0], posisi = 0;', '    for (int i = 0; i < n; i++) {', '        total += a[i];', '        if (a[i] > maks) {', '            maks = a[i];', '            posisi = i;', '        }', '    }',
        '    cout << "Jumlah: " << total << endl;', '    cout << "Terbesar: " << maks << " di indeks " << posisi << endl;', '}'],
      ps: ['jumlahDanMaks(a, n):', '    total = 0, maks = a[0], posisi = 0', '    untuk i dari 0 sampai n-1:', '        total = total + a[i]', '        jika a[i] > maks: maks = a[i], posisi = i', '    tampilkan total, maks, posisi']
    },
    lines: { cpp: { sig: [1], init: [2], loop: [3], add: [4], cmp: [5], set: [6, 7], out: [10, 11] }, ps: { sig: [1], init: [2], loop: [3], add: [4], cmp: [5], set: [5], out: [6] } },
    run(data) {
      const r = alRec(data), a = r.a, n = a.length; r.cnt.Perbandingan = 0;
      let total = 0, maks = a[0], posisi = 0;
      const cls = i => p => p === i ? 'cmp' : p === posisi ? 'found' : '';
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'sig', vars: { n }, title: 'Satu nama, banyak kotak', body: `Array <code>a</code> berisi ${n} angka: ${alList(a)}. Isinya disimpan berderet di memori dan diakses dengan indeks 0 sampai ${n - 1}. Kita akan menjumlahkan semuanya sekaligus mencari yang terbesar dalam <b>satu kali</b> perulangan.` });
      r.push({ grp: 'Mulai', kind: 'Mulai', ln: 'init', cls: cls(-1), vars: { n, total, maks, posisi }, ptrs: [{ x: 0, t: 'maks' }], title: 'Siapkan variabel', body: `<code>total = 0</code> karena belum ada yang dijumlah. <code>maks = a[0] = ${a[0]}</code>: angka pertama dianggap terbesar dulu, lalu dibandingkan dengan sisanya.`,
        note: ['Kenapa maks tidak diisi 0?', 'Kalau semua angka negatif, maks = 0 akan salah karena 0 tidak ada di array. Mengambil a[0] selalu aman.'] });
      for (let i = 0; i < n; i++) {
        const g = `i = ${i}`;
        total += a[i];
        r.push({ grp: g, kind: 'Langkah', ln: 'add', cls: cls(i), ptrs: [{ x: i, t: 'i' }], vars: { n, i, 'a[i]': a[i], total, maks, posisi }, title: `total += a[${i}]`, body: `total = ${total - a[i]} + ${a[i]} = <b>${total}</b>.` });
        r.cnt.Perbandingan++;
        const big = a[i] > maks;
        r.push({ grp: g, kind: 'Bandingkan', ln: 'cmp', cls: cls(i), ptrs: [{ x: i, t: 'i' }], vars: { n, i, 'a[i]': a[i], total, maks, posisi }, title: `${a[i]} > ${maks}?`,
          body: big ? `<b>Ya</b>, ${a[i]} lebih besar dari maks sekarang.` : `Tidak, maks tetap ${maks}.`, q: { t: `Apakah maks berubah menjadi ${a[i]}?`, o: ['Ya', 'Tidak'], a: big ? 0 : 1 } });
        if (big) { maks = a[i]; posisi = i;
          r.push({ grp: g, kind: 'Hasil', ln: 'set', cls: cls(i), ptrs: [{ x: i, t: 'i' }], vars: { n, i, 'a[i]': a[i], total, maks, posisi }, title: `maks = ${maks}, posisi = ${i}`, body: `Angka terbesar sejauh ini adalah ${maks} di indeks ${i}.` }); }
      }
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'out', cls: p => p === posisi ? 'found' : 'done', vars: { n, total, maks, posisi }, title: `Jumlah ${total}, terbesar ${maks}`,
        body: `Semua ${n} angka sudah dilewati: jumlahnya ${total} dan yang terbesar ${maks} di indeks ${posisi}. Perulangan berjalan n kali, jadi O(n).` });
      return r.F;
    },
    program(s) {
      const a = s.data, L = ['#include <iostream>', 'using namespace std;', '', ...this.code.cpp, '', 'int main() {', `    int a[] = {${a.join(', ')}};`, '    int n = sizeof(a) / sizeof(a[0]);', '    jumlahDanMaks(a, n);', '    return 0;', '}'];
      let m = 0; a.forEach((v, i) => { if (v > a[m]) m = i; });
      return { code: L.join('\n'), out: `Jumlah: ${a.reduce((p, q) => p + q, 0)}\nTerbesar: ${a[m]} di indeks ${m}` };
    }
  },

  // ---------------- Array 2D: jumlah per baris dan per kolom ----------------
  array2d: {
    counters: ['Penjumlahan'],
    vars: ['i', 'j', 'm[i][j]', 'total'],
    code: {
      cpp: ['const int MAXK = 5;', '', 'void jumlahBaris(int m[][MAXK], int baris, int kolom) {', '    for (int i = 0; i < baris; i++) {', '        int total = 0;', '        for (int j = 0; j < kolom; j++) {', '            total += m[i][j];', '        }', '        cout << "Baris " << i << ": " << total << endl;', '    }', '}', '',
        'void jumlahKolom(int m[][MAXK], int baris, int kolom) {', '    for (int j = 0; j < kolom; j++) {', '        int total = 0;', '        for (int i = 0; i < baris; i++) {', '            total += m[i][j];', '        }', '        cout << "Kolom " << j << ": " << total << endl;', '    }', '}'],
      ps: ['jumlahBaris(m):', '    untuk setiap baris i:', '        total = 0', '        untuk setiap kolom j: total = total + m[i][j]', '        tampilkan total baris i', 'jumlahKolom(m):', '    untuk setiap kolom j:', '        total = 0', '        untuk setiap baris i: total = total + m[i][j]', '        tampilkan total kolom j']
    },
    lines: { cpp: { decl: [1], rStart: [4, 5], rAdd: [6, 7], rOut: [9], cStart: [14, 15], cAdd: [16, 17], cOut: [19], end: [3, 13] }, ps: { decl: [1], rStart: [2, 3], rAdd: [4], rOut: [5], cStart: [7, 8], cAdd: [9], cOut: [10], end: [1, 6] } },
    input: {
      mode: 'text', aria: 'Isi matriks: baris dipisah titik koma, angka dipisah spasi atau koma',
      hint: '2–4 baris, tiap baris 2–5 angka 0–99 dengan jumlah kolom sama. Pisahkan baris dengan <b>;</b>. Contoh: 3 5 1; 2 8 4',
      fmt: d => (d || []).map(row => row.join(' ')).join('; '),
      parse(raw) {
        const rows = raw.split(/[;\n|\/]+/).map(x => x.trim()).filter(Boolean).map(x => x.split(/[\s,]+/).filter(Boolean).map(Number));
        if (rows.length < 2 || rows.length > 4) return { err: 'Isi 2 sampai 4 baris, dipisah titik koma. Contoh: 3 5 1; 2 8 4' };
        if (rows.some(rw => rw.length !== rows[0].length)) return { err: 'Setiap baris harus punya jumlah angka yang sama.' };
        if (rows[0].length < 2 || rows[0].length > 5) return { err: 'Tiap baris berisi 2 sampai 5 angka.' };
        if (rows.flat().some(v => !Number.isInteger(v) || v < 0 || v > 99)) return { err: 'Isi dengan bilangan bulat 0–99.' };
        return { data: rows };
      },
      acak() { const R = alRnd(2, 4), C = alRnd(2, 5); return { data: Array.from({ length: R }, () => Array.from({ length: C }, () => alRnd(0, 20))) }; }
    },
    run(m) {
      const r = alRec2(), R = m.length, C = m[0].length, rs = Array(R).fill(null), cs = Array(C).fill(null);
      r.cnt.Penjumlahan = 0;
      const S = o => Object.assign({ m, rs: rs.slice(), cs: cs.slice() }, o);
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'decl', vars: {}, S: S({}), title: 'Array dua dimensi = tabel', body: `Matriks <code>m</code> punya ${R} baris dan ${C} kolom. Satu isi ditulis <code>m[i][j]</code>: <b>i</b> nomor baris, <b>j</b> nomor kolom, keduanya mulai dari 0. Di C++, ukuran kolom wajib ditulis saat dikirim ke fungsi, makanya parameternya <code>m[][MAXK]</code>.` });
      for (let i = 0; i < R; i++) {
        let t = 0; const g = `Baris ${i}`;
        r.push({ grp: g, kind: 'Mulai', ln: 'rStart', vars: { i, total: 0 }, S: S({ row: i }), title: `Baris ${i}: total = 0`, body: `Perulangan luar memilih baris i = ${i}. total dikosongkan dulu supaya tidak terbawa dari baris sebelumnya.` });
        for (let j = 0; j < C; j++) { t += m[i][j]; r.cnt.Penjumlahan++;
          r.push({ grp: g, kind: 'Langkah', ln: 'rAdd', vars: { i, j, 'm[i][j]': m[i][j], total: t }, S: S({ row: i, cell: [i, j] }), title: `total += m[${i}][${j}]`, body: `total = ${t - m[i][j]} + ${m[i][j]} = <b>${t}</b>. j bergerak ke kanan, i tetap.` }); }
        rs[i] = t;
        r.push({ grp: g, kind: 'Hasil', ln: 'rOut', vars: { i, total: t }, S: S({ row: i, hiR: i }), title: `Jumlah baris ${i} = ${t}`, body: `Perulangan dalam selesai, total baris ${i} ditampilkan.`,
          q: i === 0 && R > 1 ? (() => { const sum = m[1].reduce((p, q) => p + q, 0); return { t: `Tebak jumlah baris berikutnya (${m[1].join(' + ')})`, o: [...new Set([sum, sum + 1 + m[1][0], sum + 2])].map(String), a: 0 }; })() : undefined });
      }
      for (let j = 0; j < C; j++) {
        let t = 0; const g = `Kolom ${j}`;
        r.push({ grp: g, kind: 'Mulai', ln: 'cStart', vars: { j, total: 0 }, S: S({ col: j }), title: `Kolom ${j}: total = 0`, body: 'Sekarang perulangan luar memakai j (kolom) dan perulangan dalam memakai i (baris). Urutan perulangan ditukar, isi yang dijumlah tetap <code>m[i][j]</code>.' });
        for (let i = 0; i < R; i++) { t += m[i][j]; r.cnt.Penjumlahan++;
          r.push({ grp: g, kind: 'Langkah', ln: 'cAdd', vars: { i, j, 'm[i][j]': m[i][j], total: t }, S: S({ col: j, cell: [i, j] }), title: `total += m[${i}][${j}]`, body: `total = ${t - m[i][j]} + ${m[i][j]} = <b>${t}</b>. i bergerak ke bawah, j tetap.` }); }
        cs[j] = t;
        r.push({ grp: g, kind: 'Hasil', ln: 'cOut', vars: { j, total: t }, S: S({ col: j, hiC: j }), title: `Jumlah kolom ${j} = ${t}`, body: `Total kolom ${j} ditampilkan.`,
          q: j === 0 && C > 1 ? { t: 'Saat menjumlah kolom, indeks mana yang bergerak di perulangan dalam?', o: ['i (baris)', 'j (kolom)'], a: 0 } : undefined });
      }
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'end', vars: {}, S: S({ end: true }), title: 'Selesai', body: `Jumlah per baris: ${rs.join(', ')}. Jumlah per kolom: ${cs.join(', ')}. Total semua isi: ${rs.reduce((p, q) => p + q, 0)}. Setiap isi dikunjungi sekali per fungsi, jadi ${R} × ${C} = ${R * C} langkah.` });
      // Pertanyaan baris 1 diacak urutannya supaya jawaban tidak selalu pertama
      r.F.forEach(f => { if (f.q && f.q.o.length > 2) { const right = f.q.o[f.q.a]; f.q.o.sort((p, q) => +p - +q); f.q.a = f.q.o.indexOf(right); } });
      return r.F;
    },
    view(A, s, f) {
      const S = f.S, m = S.m, R = m.length, C = m[0].length, cw = 64, ch = 46, x0 = 70, y0 = 46;
      let g = '';
      for (let j = 0; j < C; j++) g += `<text class="al-idx" x="${x0 + j * cw + cw / 2}" y="${y0 - 10}">[${j}]</text>`;
      for (let i = 0; i < R; i++) {
        g += `<text class="al-idx" x="${x0 - 22}" y="${y0 + i * ch + ch / 2 + 4}">[${i}]</text>`;
        for (let j = 0; j < C; j++) {
          const on = S.cell && S.cell[0] === i && S.cell[1] === j, line = S.row === i || S.col === j;
          g += `<g class="al-box${on ? ' al-cmp' : S.end ? ' al-done' : ''}${line && !on ? ' al-line' : ''}" transform="translate(${x0 + j * cw + 3},${y0 + i * ch + 3})"><rect width="${cw - 6}" height="${ch - 6}" rx="5"/><text x="${(cw - 6) / 2}" y="${(ch - 6) / 2}">${m[i][j]}</text></g>`;
        }
        if (S.rs[i] != null) g += `<text class="al-sum${S.hiR === i ? ' is-new' : ''}" x="${x0 + C * cw + 14}" y="${y0 + i * ch + ch / 2 + 5}">= ${S.rs[i]}</text>`;
      }
      for (let j = 0; j < C; j++) if (S.cs[j] != null) g += `<text class="al-sum${S.hiC === j ? ' is-new' : ''}" x="${x0 + j * cw + cw / 2}" y="${y0 + R * ch + 24}" text-anchor="middle">${S.cs[j]}</text>`;
      const H = y0 + R * ch + 44;
      return `<svg class="al-svg" viewBox="0 0 ${Math.max(420, x0 + C * cw + 80)} ${H}" role="img" aria-label="Matriks ${R} baris ${C} kolom: ${esc(m.map(rw => rw.join(' ')).join('; '))}">${g}</svg>`;
    },
    program(s) {
      const m = s.data, R = m.length, C = m[0].length;
      const L = ['#include <iostream>', 'using namespace std;', '', ...this.code.cpp, '', 'int main() {', `    int m[${R}][MAXK] = {`, ...m.map((rw, i) => `        {${rw.join(', ')}}${i < R - 1 ? ',' : ''}`), '    };', `    jumlahBaris(m, ${R}, ${C});`, `    jumlahKolom(m, ${R}, ${C});`, '    return 0;', '}'];
      const out = m.map((rw, i) => `Baris ${i}: ${rw.reduce((p, q) => p + q, 0)}`).concat(m[0].map((_, j) => `Kolom ${j}: ${m.reduce((p, rw) => p + rw[j], 0)}`));
      return { code: L.join('\n'), out: out.join('\n') };
    }
  },

  // ---------------- Fungsi rekursif: faktorial ----------------
  rekursi: {
    counters: ['Pemanggilan'],
    vars: ['n', 'hasil'],
    code: {
      cpp: ['int faktorial(int n) {', '    if (n <= 1) {', '        return 1;          // kasus dasar', '    }', '    return n * faktorial(n - 1);   // memanggil dirinya sendiri', '}'],
      ps: ['faktorial(n):', '    jika n ≤ 1: kembalikan 1          (kasus dasar)', '    kembalikan n × faktorial(n - 1)    (langkah rekursif)']
    },
    lines: { cpp: { sig: [1], chk: [2], base: [3], call: [5], ret: [5], end: [1] }, ps: { sig: [1], chk: [2], base: [2], call: [3], ret: [3], end: [1] } },
    input: {
      aria: 'Nilai n', hint: 'Satu bilangan bulat 1–7. Contoh: 4',
      parse(raw) { return alNums(raw, 1, 1, 1, 7, '4'); },
      acak() { return { data: [alRnd(2, 7)] }; }
    },
    run(data) {
      const r = alRec2(), N = data[0], st = [];
      r.cnt.Pemanggilan = 0;
      const S = o => Object.assign({ st: st.map(x => Object.assign({}, x)) }, o);
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'sig', vars: { n: N }, S: S({}), title: 'Fungsi yang memanggil dirinya sendiri',
        body: `${N}! = ${Array.from({ length: N }, (_, i) => N - i).join(' × ')}. Perhatikan bahwa ${N}! = ${N} × ${N - 1}!. Fungsi rekursif memakai pola ini: masalah besar diselesaikan dengan memanggil dirinya untuk masalah yang lebih kecil, sampai bertemu <b>kasus dasar</b> yang jawabannya langsung diketahui.`,
        note: ['Tumpukan pemanggilan', 'Setiap pemanggilan fungsi mendapat kotak memori sendiri (berisi n miliknya) yang ditumpuk di call stack. Kotak paling atas adalah yang sedang berjalan.'] });
      for (let n = N; ; n--) {
        st.push({ n, wait: false, ret: null }); r.cnt.Pemanggilan++;
        const g = `faktorial(${n})`;
        r.push({ grp: g, kind: 'Panggil', ln: 'sig', vars: { n }, S: S({ top: true }), title: `Panggil faktorial(${n})`, body: `Kotak baru ditumpuk dengan n = ${n}. Kotak di bawahnya ${st.length > 1 ? 'sedang menunggu hasil' : 'belum ada'}.` });
        const base = n <= 1;
        r.push({ grp: g, kind: 'Periksa', ln: 'chk', vars: { n }, S: S({ top: true }), title: `${n} <= 1?`, body: base ? '<b>Ya</b>, ini kasus dasar.' : `Tidak, jadi harus menghitung ${n} × faktorial(${n - 1}) dulu.`, q: { t: `Apakah faktorial(${n}) sudah bisa langsung menjawab?`, o: ['Ya, kasus dasar', `Belum, panggil faktorial(${n - 1})`], a: base ? 0 : 1 } });
        if (base) break;
        st[st.length - 1].wait = true;
        r.push({ grp: g, kind: 'Tunggu', ln: 'call', vars: { n }, S: S({}), title: `faktorial(${n}) menunggu`, body: `Baris <code>return ${n} * faktorial(${n - 1})</code> belum bisa selesai. faktorial(${n}) berhenti di tengah jalan dan memanggil faktorial(${n - 1}).` });
      }
      let hasil = 1;
      st[st.length - 1].ret = 1;
      r.push({ grp: 'faktorial(1)', kind: 'Hasil', ln: 'base', vars: { n: 1, hasil }, S: S({ top: true }), title: 'Kasus dasar: kembalikan 1', body: 'faktorial(1) langsung mengembalikan 1 tanpa memanggil siapa pun. Mulai sekarang tumpukan dibongkar dari atas.' });
      st.pop();
      while (st.length) {
        const f = st[st.length - 1], val = f.n * hasil;
        f.wait = false; f.ret = val;
        r.push({ grp: `kembali ke ${f.n}`, kind: 'Kembali', ln: 'ret', vars: { n: f.n, hasil: val }, S: S({ top: true, got: hasil }), title: `faktorial(${f.n}) = ${f.n} × ${hasil} = ${val}`,
          body: `Hasil ${hasil} diterima, jadi faktorial(${f.n}) bisa menyelesaikan barisnya dan mengembalikan ${val}.`,
          q: { t: `Berapa yang dikembalikan faktorial(${f.n})?`, o: [...new Set([val, f.n + hasil, hasil, f.n * f.n])].sort((p, q) => p - q).map(String), a: -1 } });
        hasil = val; st.pop();
      }
      r.F.forEach(x => { if (x.q && x.q.a === -1) x.q.a = x.q.o.indexOf(x.title.split('= ').pop()); });
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'end', vars: { n: N, hasil }, S: S({}), title: `${N}! = ${hasil}`,
        body: `Ada ${r.cnt.Pemanggilan} pemanggilan. Semuanya ditumpuk dulu sampai kasus dasar, lalu diselesaikan dari atas ke bawah.`,
        note: ['Tanpa kasus dasar', 'Fungsi akan memanggil dirinya terus sampai memori call stack habis (stack overflow) dan program berhenti.'] });
      return r.F;
    },
    view(A, s, f) {
      const S = f.S, mv = alMover(s), base = 300, h = 40, cx = 130, w = 300;
      let g = `<text class="al-lbl" x="${cx}" y="${base + 26}">call stack (bawah = yang pertama dipanggil)</text><line class="al-floor" x1="${cx - 10}" x2="${cx + w + 10}" y1="${base + .5}" y2="${base + .5}"/>`;
      S.st.forEach((fr, k) => {
        const top = k === S.st.length - 1, c = fr.ret != null ? 'found' : top && S.top ? 'cmp' : '';
        const txt = fr.ret != null ? `faktorial(${fr.n}) = ${fr.ret}` : fr.wait ? `faktorial(${fr.n}): ${fr.n} × ?` : `faktorial(${fr.n})`;
        g += `<g class="al-box al-mv${c ? ' al-' + c : ''}" ${mv('f' + fr.n, cx, base - (k + 1) * (h + 4))}><rect width="${w}" height="${h}" rx="6"/><text x="${w / 2}" y="${h / 2}">${txt}</text></g>`;
      });
      if (S.got != null) g += `<text class="al-lbl" x="${cx + w + 16}" y="${base - S.st.length * (h + 4) + h / 2 + 4}">← terima ${S.got}</text>`;
      const H = 340, top = Math.min(base - 4 * (h + 4), base - Math.max(1, s.data[0] || 1) * (h + 4)) - 16;
      return `<svg class="al-svg" viewBox="0 ${top} 560 ${H - top}" role="img" aria-label="Call stack: ${esc(S.st.map(x => 'faktorial(' + x.n + ')').join(', ') || 'kosong')}">${g}</svg>`;
    },
    program(s) {
      const n = s.data[0]; let v = 1; for (let i = 2; i <= n; i++) v *= i;
      const L = ['#include <iostream>', 'using namespace std;', '', ...this.code.cpp, '', 'int main() {', `    int n = ${n};`, '    cout << n << "! = " << faktorial(n) << endl;', '    return 0;', '}'];
      return { code: L.join('\n'), out: `${n}! = ${v}` };
    }
  }
});
