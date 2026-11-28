// Lab Struktur Data & Algoritma, bab "Teknik lanjut": greedy (uang kembalian), pemrograman dinamis
// (koin minimum dan knapsack 0/1), dan pencocokan string naif.
// Ditambahkan ke AL_ALGO dari algo-lab.js (dimuat sesudahnya), memakai alRec2 / alMover / alBox / alOutLines / alRnd.

// Nomor baris kode dicari dari isinya, supaya menambah satu baris tidak menggeser semua nomor.
const alLn = (code, ...parts) => parts.map(p => { const i = code.findIndex(l => l.includes(p)); if (i < 0) throw new Error('baris tidak ada: ' + p); return i + 1; });

// Cara terbaik membentuk jumlah j dari koin (pembanding greedy). null = tidak bisa pas.
function alKoinOpt(koin, j) {
  const dp = [0], from = [0];
  for (let x = 1; x <= j; x++) { dp[x] = Infinity; koin.forEach(c => { if (c <= x && dp[x - c] + 1 < dp[x]) { dp[x] = dp[x - c] + 1; from[x] = c; } }); }
  if (dp[j] === Infinity) return null;
  const pick = []; for (let x = j; x > 0; x -= from[x]) pick.push(from[x]);
  return pick.sort((a, b) => b - a);
}
const alSum = a => a.length > 5 ? `${a.length} koin` : a.join(' + ');

// Masukan koin: nilai koin berbeda (diurutkan dari besar) + jumlah uang yang dibentuk.
const alKoinInput = (maxK, maxV, maxJ, contoh, contohJ, sets) => ({
  mode: 'numeric', aria: 'Nilai koin, dipisah koma', targetLabel: 'jumlah', targetAria: 'Jumlah uang yang dibentuk',
  hint: `1 sampai ${maxK} nilai koin berbeda (1–${maxV}), dipisah koma. Kotak <b>jumlah</b> diisi uang yang mau dibentuk (1–${maxJ}). Contoh: koin ${contoh}, jumlah ${contohJ}`,
  parse(raw, rawT) {
    const nums = String(raw).split(/[\s,;]+/).filter(Boolean).map(Number);
    if (nums.length < 1 || nums.length > maxK || nums.some(v => !Number.isInteger(v) || v < 1 || v > maxV)) return { err: `Isi 1 sampai ${maxK} nilai koin, bilangan bulat 1–${maxV}, dipisah koma. Contoh: ${contoh}` };
    if (new Set(nums).size !== nums.length) return { err: 'Setiap nilai koin cukup ditulis sekali.' };
    const t = Number(String(rawT).trim());
    if (String(rawT).trim() === '' || !Number.isInteger(t) || t < 1 || t > maxJ) return { err: `Isi kotak jumlah dengan bilangan bulat 1–${maxJ}.` };
    return { data: nums.sort((a, b) => b - a), target: t };
  },
  acak() {
    if (Math.random() < 0.6) { const [k, j] = sets[alRnd(0, sets.length - 1)]; return { data: k.slice(), target: j() }; }
    const len = alRnd(2, maxK), d = [];
    while (d.length < len) { const v = alRnd(1, maxV); if (!d.includes(v)) d.push(v); }
    return { data: d.sort((a, b) => b - a), target: alRnd(1, maxJ) };
  }
});
const alKoinRow = (koin, S, y, extra) => {
  const k = koin.length, w = 66, x0 = 280 - k * 37;
  return koin.map((c, i) => { const cls = extra(i); return `<g class="al-box${cls ? ' al-' + cls : ''}" transform="translate(${x0 + i * 74},${y})"><rect width="${w}" height="38" rx="6"/><text x="${w / 2}" y="19">${c}</text></g>`; }).join('');
};

// ---------------- Greedy: uang kembalian ----------------
const AL_GREEDY_CPP = ['int koinGreedy(int koin[], int n, int jumlah) {   // koin urut dari besar', '    int banyak = 0;', '    for (int i = 0; i < n; i++) {', '        while (jumlah >= koin[i]) {', '            jumlah -= koin[i];', '            banyak++;', '            cout << koin[i] << " ";', '        }', '    }', '    if (jumlah > 0) return -1;   // ada sisa: tidak bisa pas', '    return banyak;', '}'];
const AL_GREEDY_PS = ['koin_greedy(koin urut dari besar, jumlah):', '    banyak ← 0', '    untuk setiap koin c, dari yang terbesar:', '        selama jumlah ≥ c:', '            ambil c: jumlah ← jumlah − c, banyak ← banyak + 1', '    jika jumlah > 0: gagal (tidak bisa pas)', '    kembalikan banyak'];

// ---------------- DP: koin minimum ----------------
const AL_KOINDP_CPP = ['const int INF = 9999;', 'int dp[100];                // dp[x] = koin paling sedikit untuk membentuk x', '', 'int koinMinimum(int koin[], int n, int jumlah) {', '    dp[0] = 0;', '    for (int x = 1; x <= jumlah; x++) {', '        dp[x] = INF;', '        for (int i = 0; i < n; i++) {', '            int c = koin[i];',
  '            if (c <= x && dp[x - c] + 1 < dp[x])', '                dp[x] = dp[x - c] + 1;', '        }', '    }', '    if (dp[jumlah] == INF) return -1;', '    return dp[jumlah];', '}'];
const AL_KOINDP_PS = ['dp[x] = koin paling sedikit untuk membentuk x', 'dp[0] ← 0', 'untuk x ← 1 sampai jumlah:', '    dp[x] ← ∞', '    untuk setiap koin c:', '        jika c ≤ x dan dp[x − c] + 1 < dp[x]:', '            dp[x] ← dp[x − c] + 1', 'jawaban: dp[jumlah] (∞ berarti tidak bisa pas)'];

Object.assign(AL_ALGO, {
  greedy: {
    target: true,
    counters: ['Pemeriksaan', 'Koin diambil'],
    vars: ['i', 'koin[i]', 'jumlah', 'banyak'],
    code: { cpp: AL_GREEDY_CPP, ps: AL_GREEDY_PS },
    lines: {
      cpp: { sig: alLn(AL_GREEDY_CPP, 'int koinGreedy', 'int banyak = 0'), next: alLn(AL_GREEDY_CPP, 'for (int i'), cek: alLn(AL_GREEDY_CPP, 'while (jumlah'), take: alLn(AL_GREEDY_CPP, 'jumlah -= koin', 'banyak++', 'cout << koin'), fail: alLn(AL_GREEDY_CPP, 'if (jumlah > 0)'), ret: alLn(AL_GREEDY_CPP, 'return banyak') },
      ps: { sig: [1, 2], next: [3], cek: [4], take: [5], fail: [6], ret: [7] }
    },
    input: alKoinInput(6, 99, 60, '25, 10, 5, 1', 30, [[[25, 10, 5, 1], () => alRnd(11, 60)], [[50, 20, 10, 5, 2, 1], () => alRnd(8, 60)], [[4, 3, 1], () => 6], [[10, 7, 1], () => 14], [[6, 4, 1], () => 8], [[5, 2], () => alRnd(6, 13)], [[9, 6, 1], () => 12]]),
    run(koin, J) {
      const r = alRec2(), cnt = koin.map(() => 0), opt = alKoinOpt(koin, J);
      let sisa = J, banyak = 0;
      r.cnt['Pemeriksaan'] = 0; r.cnt['Koin diambil'] = 0;
      const S = o => Object.assign({ koin, J, cnt: cnt.slice(), sisa, banyak }, o);
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'sig', vars: { jumlah: J, banyak: 0 }, S: S({ cur: -1 }), title: 'Selalu ambil koin terbesar yang masih muat',
        body: `Uang ${J} dibentuk dari koin ${koin.join(', ')} dengan koin sesedikit mungkin. Strategi <b>greedy</b> (rakus) mengambil pilihan yang terlihat paling bagus <b>saat ini</b>, yaitu koin terbesar yang tidak melebihi sisa uang, tanpa memikirkan langkah berikutnya. Pilihan yang sudah diambil tidak pernah dibatalkan.` });
      koin.forEach((c, i) => {
        const g = `koin ${c}`;
        for (;;) {
          const ok = sisa >= c; r.cnt['Pemeriksaan']++;
          r.push({ grp: g, kind: 'Periksa', ln: 'cek', vars: { i, 'koin[i]': c, jumlah: sisa, banyak }, S: S({ cur: i }), title: `Sisa ${sisa}: koin ${c} masih muat?`,
            body: ok ? `${sisa} ≥ ${c}, jadi koin ${c} diambil. Greedy tidak mencoba koin lain dulu: koin terbesar yang muat langsung dipakai.` : `${sisa} < ${c}, koin ${c} terlalu besar untuk sisa uang. Pindah ke koin berikutnya yang lebih kecil.${i === koin.length - 1 ? ' Ini koin terakhir, jadi perulangan selesai.' : ''}`,
            q: { t: `Sisa uang ${sisa}. Apakah koin ${c} diambil?`, o: ['Ya, diambil', 'Tidak, pindah ke koin berikutnya'], a: ok ? 0 : 1 } });
          if (!ok) break;
          sisa -= c; banyak++; cnt[i]++; r.cnt['Koin diambil']++;
          r.push({ grp: g, kind: 'Ambil', ln: 'take', vars: { i, 'koin[i]': c, jumlah: sisa, banyak }, S: S({ cur: i, took: i }), title: `Ambil ${c}, sisa ${sisa}`, body: `<code>jumlah -= ${c}</code> menjadi ${sisa}, dan <code>banyak</code> menjadi ${banyak}.${sisa === 0 ? ' Uangnya sudah pas.' : ''}` });
        }
      });
      const used = koin.flatMap((c, i) => Array(cnt[i]).fill(c)), same = opt && opt.length === banyak;
      const cmp = sisa > 0 ? (opt ? `Padahal sebenarnya bisa pas: ${opt.join(' + ')}. Greedy gagal karena koin besar yang sudah diambil tidak pernah dikembalikan.` : `Dengan koin ini, ${J} memang tidak bisa dibentuk dengan cara apa pun.`)
        : same ? `Ini juga cara terbaik: tidak ada cara lain dengan kurang dari ${banyak} koin.` : `Tapi ini <b>bukan</b> yang terbaik. Cara terbaik cuma ${opt.length} koin: ${opt.join(' + ')}. Greedy terkecoh karena mengambil ${used[0]} lebih dulu.`;
      if (sisa > 0) r.push({ grp: 'Hasil', kind: 'Gagal', ln: 'fail', vars: { jumlah: sisa, banyak }, S: S({ cur: -1, end: true, fail: true, opt }), title: `Gagal: sisa ${sisa} tidak bisa dibentuk`,
        body: `Semua koin sudah dicoba, tapi masih tersisa ${sisa}. Fungsi mengembalikan -1. ${cmp}`, note: ['Kapan greedy aman', 'Untuk pecahan uang sungguhan (1, 2, 5, 10, 20, 50, …) greedy selalu menghasilkan koin paling sedikit. Untuk pecahan sembarang tidak dijamin, dan di situlah pemrograman dinamis dipakai.'] });
      else r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'ret', vars: { jumlah: 0, banyak }, S: S({ cur: -1, end: true, opt }), title: `${banyak} koin: ${alSum(used)}`,
        body: `Uang ${J} pas dengan ${banyak} koin. ${cmp}`, note: ['Kapan greedy aman', 'Untuk pecahan uang sungguhan (1, 2, 5, 10, 20, 50, …) greedy selalu menghasilkan koin paling sedikit. Untuk pecahan sembarang tidak dijamin, dan di situlah pemrograman dinamis dipakai.'] });
      return r.F;
    },
    view(A, s, f) {
      const S = f.S, k = S.koin.length, x0 = 280 - k * 37;
      let g = `<text class="al-lbl" x="20" y="22">koin (besar → kecil)</text>`;
      g += alKoinRow(S.koin, S, 34, i => i === S.took ? 'found' : i === S.cur ? 'cmp' : S.end || i < S.cur ? 'done' : '');
      S.koin.forEach((c, i) => { if (S.cnt[i] || S.end || i < S.cur) g += `<text class="al-idx" x="${x0 + i * 74 + 33}" y="${96}">× ${S.cnt[i]}</text>`; });
      g += `<text class="al-lbl" x="20" y="144">sisa</text><g class="al-box${S.fail ? ' al-bad' : S.end ? ' al-found' : ''}" transform="translate(90,120)"><rect width="84" height="38" rx="6"/><text x="42" y="19">${S.sisa}</text></g>`;
      g += `<text class="al-lbl" x="232" y="144">banyak koin</text><g class="al-box" transform="translate(386,120)"><rect width="84" height="38" rx="6"/><text x="42" y="19">${S.banyak}</text></g>`;
      let H = 176;
      if (S.end) { g += `<text class="al-lbl" x="20" y="200">${S.opt ? `cara terbaik: ${S.opt.length} koin${S.opt.length <= 5 ? ` (${S.opt.join(' + ')})` : ''}` : 'tidak bisa pas dengan cara apa pun'}</text>`; H = 218; }
      return `<svg class="al-svg" viewBox="0 0 560 ${H}" role="img" aria-label="Koin ${esc(S.koin.join(', '))}. Sisa ${S.sisa}, ${S.banyak} koin diambil">${g}</svg>`;
    },
    program(s) {
      const koin = s.data, F = this.run(koin, s.target), last = F[F.length - 1].S;
      const L = ['#include <iostream>', 'using namespace std;', '', ...this.code.cpp, '', 'int main() {', `    int koin[] = {${koin.join(', ')}};`, `    int n = ${koin.length};`, '    cout << "Diambil: ";', `    int k = koinGreedy(koin, n, ${s.target});`, '    cout << endl;',
        '    if (k == -1) cout << "Tidak bisa pas" << endl;', '    else cout << "Banyak koin: " << k << endl;', '    return 0;', '}'];
      const used = koin.flatMap((c, i) => Array(last.cnt[i]).fill(c));
      return { code: L.join('\n'), out: alOutLines(['Diambil: ' + used.join(' '), last.fail ? 'Tidak bisa pas' : 'Banyak koin: ' + last.banyak]) };
    }
  },

  koindp: {
    target: true,
    counters: ['Percobaan', 'Pembaruan'],
    vars: ['x', 'c', 'dp[x - c]', 'dp[x]'],
    code: { cpp: AL_KOINDP_CPP, ps: AL_KOINDP_PS },
    lines: {
      cpp: { decl: alLn(AL_KOINDP_CPP, 'const int INF', 'int dp[100]'), base: alLn(AL_KOINDP_CPP, 'dp[0] = 0'), inf: alLn(AL_KOINDP_CPP, 'for (int x', 'dp[x] = INF'), skip: alLn(AL_KOINDP_CPP, 'int c = koin', 'if (c <= x'), try: alLn(AL_KOINDP_CPP, 'if (c <= x'), upd: alLn(AL_KOINDP_CPP, 'dp[x] = dp[x - c] + 1'), fail: alLn(AL_KOINDP_CPP, 'if (dp[jumlah] == INF)'), ret: alLn(AL_KOINDP_CPP, 'return dp[jumlah]') },
      ps: { decl: [1], base: [2], inf: [3, 4], skip: [5, 6], try: [5, 6], upd: [7], fail: [8], ret: [8] }
    },
    input: alKoinInput(4, 12, 12, '4, 3, 1', 6, [[[4, 3, 1], () => 6], [[5, 2], () => alRnd(6, 12)], [[6, 4, 1], () => 8], [[7, 5, 1], () => alRnd(9, 12)], [[5, 3], () => alRnd(7, 12)], [[10, 5, 2, 1], () => alRnd(8, 12)]]),
    run(koin, J) {
      const r = alRec2(), dp = [0];
      r.cnt.Percobaan = 0; r.cnt.Pembaruan = 0;
      const f = v => v === Infinity ? '∞' : v;
      const S = o => Object.assign({ koin, J, dp: dp.slice() }, o);
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'decl', vars: {}, S: S({ dp: [] }), title: 'Jawaban kecil dipakai untuk jawaban besar',
        body: `Bentuk uang ${J} dari koin ${koin.join(', ')} dengan koin paling sedikit. Pemrograman dinamis (DP) tidak menebak seperti greedy. Ia menghitung jawaban untuk <b>semua</b> jumlah dari 0 sampai ${J} dan menyimpannya di tabel <code>dp</code>. Jawaban yang sudah disimpan dipakai lagi, tidak dihitung ulang.`,
        note: ['Idenya', 'Kalau koin terakhir yang dipakai adalah c, sisanya x − c harus dibentuk dengan cara terbaik juga. Jadi dp[x] = dp[x − c] + 1 untuk koin c yang memberi hasil terkecil.'] });
      r.push({ grp: 'Mulai', kind: 'Mulai', ln: 'base', vars: { x: 0, 'dp[x]': 0 }, S: S({ cur: 0 }), title: 'dp[0] = 0', body: 'Uang 0 tidak butuh koin. Ini titik awal, dan semua isi tabel lain dibangun dari sini.' });
      for (let x = 1; x <= J; x++) {
        const g = `x = ${x}`; dp[x] = Infinity;
        r.push({ grp: g, kind: 'Mulai', ln: 'inf', vars: { x, 'dp[x]': '∞' }, S: S({ cur: x }), title: `Hitung dp[${x}]`, body: `Belum ada cara yang diketahui untuk ${x}, jadi <code>dp[${x}]</code> diisi INF (∞). Sekarang coba setiap koin sebagai koin terakhir.` });
        koin.forEach(c => {
          if (c > x) {
            r.push({ grp: g, kind: 'Lewati', ln: 'skip', vars: { x, c, 'dp[x]': f(dp[x]) }, S: S({ cur: x }), title: `Koin ${c} lebih besar dari ${x}`, body: `<code>c &lt;= x</code> bernilai false, jadi koin ${c} tidak bisa dipakai untuk membentuk ${x}.` });
            return;
          }
          const cand = dp[x - c] + 1, better = cand < dp[x]; r.cnt.Percobaan++;
          r.push({ grp: g, kind: 'Bandingkan', ln: 'try', vars: { x, c, 'dp[x - c]': f(dp[x - c]), 'dp[x]': f(dp[x]) }, S: S({ cur: x, ref: x - c }), title: `Koin ${c}: dp[${x - c}] + 1 = ${f(cand)}`,
            body: dp[x - c] === Infinity ? `${x - c} tidak bisa dibentuk (dp[${x - c}] = ∞), jadi koin ${c} sebagai koin terakhir juga tidak menghasilkan apa-apa.`
              : `Kalau koin terakhirnya ${c}, sisanya ${x - c} butuh ${dp[x - c]} koin (sudah tersimpan di tabel), jadi total ${cand} koin. ${better ? `${cand} lebih kecil dari ${f(dp[x])}, jadi dp[${x}] diganti.` : `${cand} tidak lebih kecil dari ${dp[x]}, jadi dp[${x}] tetap.`}`,
            q: { t: `dp[${x - c}] = ${f(dp[x - c])} dan dp[${x}] sekarang ${f(dp[x])}. Apakah dp[${x}] diganti?`, o: ['Ya, diganti', 'Tidak, tetap'], a: better ? 0 : 1 } });
          if (better) { dp[x] = cand; r.cnt.Pembaruan++;
            r.push({ grp: g, kind: 'Perbarui', ln: 'upd', vars: { x, c, 'dp[x - c]': dp[x - c], 'dp[x]': cand }, S: S({ cur: x, ref: x - c, hi: true }), title: `dp[${x}] = ${cand}`, body: `Sejauh ini cara terbaik untuk ${x} adalah ${cand} koin, dengan koin terakhir ${c}.` }); }
        });
      }
      const opt = alKoinOpt(koin, J), ok = dp[J] !== Infinity;
      r.push({ grp: 'Hasil', kind: ok ? 'Hasil' : 'Gagal', ln: ok ? 'ret' : 'fail', vars: { x: J, 'dp[x]': f(dp[J]) }, S: S({ end: true, opt }), title: ok ? `Paling sedikit ${dp[J]} koin` : `${J} tidak bisa dibentuk`,
        body: ok ? `dp[${J}] = ${dp[J]}, contohnya ${opt.join(' + ')}. Tabelnya diisi sekali saja: ${J} jumlah × ${koin.length} koin, jadi waktunya O(jumlah × banyak koin).` : `dp[${J}] tetap ∞: tidak ada kombinasi koin yang pas. Fungsi mengembalikan -1.`,
        note: ['Bandingkan dengan greedy', (() => { const G = AL_ALGO.greedy.run(koin, J), gs = G[G.length - 1].S; return gs.fail ? `Greedy gagal untuk data ini${ok ? `, padahal DP menemukan ${dp[J]} koin` : ''}.` : ok && gs.banyak > dp[J] ? `Greedy butuh ${gs.banyak} koin, DP cukup ${dp[J]}. DP selalu benar karena mencoba semua koin terakhir di setiap jumlah.` : 'Untuk data ini greedy kebetulan sama bagusnya. Coba koin 4, 3, 1 dengan jumlah 6 untuk melihat bedanya.'; })()] });
      return r.F;
    },
    view(A, s, f) {
      const S = f.S, n = S.J + 1, bw = 38, sp = 41, x0 = Math.round(280 - n * sp / 2), y = 122;
      let g = `<text class="al-lbl" x="20" y="22">koin</text>` + alKoinRow(S.koin, S, 34, () => S.end ? 'done' : '');
      g += `<text class="al-lbl" x="20" y="${y - 14}">dp[x] = koin paling sedikit untuk x</text>`;
      for (let x = 0; x < n; x++) {
        const v = S.dp[x], c = S.end ? (x === S.J ? (v === Infinity ? 'bad' : 'found') : 'done') : x === S.cur ? (S.hi ? 'found' : 'cmp') : x === S.ref ? 'done' : '';
        g += `<g class="al-box${c ? ' al-' + c : ''}" transform="translate(${x0 + x * sp},${y})"><rect width="${bw}" height="38" rx="6"/><text x="${bw / 2}" y="19">${v === undefined ? '' : v === Infinity ? '∞' : v}</text></g><text class="al-idx" x="${x0 + x * sp + bw / 2}" y="${y + 58}">${x}</text>`;
      }
      let H = y + 72;
      if (S.end) { g += `<text class="al-lbl" x="20" y="${y + 96}">${S.opt ? `${S.J} = ${S.opt.length > 6 ? S.opt.length + ' koin' : S.opt.join(' + ')}` : `${S.J} tidak bisa dibentuk`}</text>`; H = y + 112; }
      return `<svg class="al-svg" viewBox="0 0 560 ${H}" role="img" aria-label="Tabel dp untuk koin ${esc(S.koin.join(', '))}: ${esc(S.dp.map(v => v === Infinity ? 'tak hingga' : v).join(', '))}">${g}</svg>`;
    },
    program(s) {
      const koin = s.data, J = s.target, F = this.run(koin, J), dp = F[F.length - 1].S.dp;
      const L = ['#include <iostream>', 'using namespace std;', '', ...this.code.cpp, '', 'int main() {', `    int koin[] = {${koin.join(', ')}};`, `    int n = ${koin.length};`, `    int k = koinMinimum(koin, n, ${J});`, '    cout << "dp: ";', `    for (int x = 0; x <= ${J}; x++) {`, '        if (dp[x] == INF) cout << "- ";', '        else cout << dp[x] << " ";', '    }', '    cout << endl;',
        '    if (k == -1) cout << "Tidak bisa pas" << endl;', '    else cout << "Koin minimum: " << k << endl;', '    return 0;', '}'];
      return { code: L.join('\n'), out: alOutLines(['dp: ' + dp.map(v => v === Infinity ? '-' : v).join(' '), dp[J] === Infinity ? 'Tidak bisa pas' : 'Koin minimum: ' + dp[J]]) };
    }
  }
});

// ---------------- DP: knapsack 0/1 ----------------
const AL_RANSEL_CPP = ['const int MAXN = 5, MAXW = 9;', 'int berat[MAXN], nilai[MAXN];', 'int n = 0;                   // banyak barang', 'int dp[MAXN][MAXW];         // dp[i][w] = nilai terbaik dari i barang pertama, kapasitas w', '',
  'int ransel(int W) {', '    for (int w = 0; w <= W; w++) dp[0][w] = 0;', '    for (int i = 1; i <= n; i++) {', '        int b = berat[i - 1], v = nilai[i - 1];', '        for (int w = 0; w <= W; w++) {', '            dp[i][w] = dp[i - 1][w];                 // tidak diambil',
  '            if (b <= w && dp[i - 1][w - b] + v > dp[i][w])', '                dp[i][w] = dp[i - 1][w - b] + v;     // diambil', '        }', '    }', '    return dp[n][W];', '}', '',
  'void cetakPilihan(int W) {', '    int w = W;', '    for (int i = n; i >= 1; i--) {', '        if (dp[i][w] != dp[i - 1][w]) {', '            cout << "barang " << i << endl;', '            w -= berat[i - 1];', '        }', '    }', '}'];
const AL_RANSEL_PS = ['dp[i][w] = nilai terbaik dari barang 1..i dengan kapasitas w', 'baris 0 (belum ada barang) = 0', 'untuk setiap barang i (berat b, nilai v):', '    untuk w ← 0 sampai W:', '        tidak diambil: dp[i][w] ← dp[i−1][w]', '        jika b ≤ w dan dp[i−1][w−b] + v lebih besar:', '            diambil: dp[i][w] ← dp[i−1][w−b] + v', 'jawaban: dp[n][W]',
  'lacak pilihan dari dp[n][W] ke atas:', '    jika dp[i][w] ≠ dp[i−1][w]: barang i diambil, w ← w − b'];
const alRanselItems = d => d.map(e => { const [b, v] = e.split(':').map(Number); return { b, v }; });
Object.assign(AL_ALGO, {
  ransel: {
    target: true,
    counters: ['Sel dihitung', 'Pilihan ambil'],
    vars: ['i', 'w', 'b', 'v', 'dp[i][w]'],
    code: { cpp: AL_RANSEL_CPP, ps: AL_RANSEL_PS },
    lines: {
      cpp: { decl: alLn(AL_RANSEL_CPP, 'const int MAXN', 'int berat[MAXN]', 'int n = 0', 'int dp[MAXN]'), base: alLn(AL_RANSEL_CPP, 'dp[0][w] = 0'), row: alLn(AL_RANSEL_CPP, 'for (int i = 1', 'int b = berat'), copy: alLn(AL_RANSEL_CPP, 'for (int w = 0; w <= W; w++) {', 'dp[i][w] = dp[i - 1][w];'),
        cmp: alLn(AL_RANSEL_CPP, 'if (b <= w &&'), take: alLn(AL_RANSEL_CPP, 'dp[i][w] = dp[i - 1][w - b] + v'), ret: alLn(AL_RANSEL_CPP, 'return dp[n][W]'), back: alLn(AL_RANSEL_CPP, 'if (dp[i][w] != dp[i - 1][w])'), pick: alLn(AL_RANSEL_CPP, 'cout << "barang "', 'w -= berat') },
      ps: { decl: [1], base: [2], row: [3], copy: [4, 5], cmp: [6], take: [7], ret: [8], back: [9, 10], pick: [10] }
    },
    input: {
      mode: 'text', aria: 'Barang ditulis berat:nilai, dipisah koma', targetLabel: 'W =', targetAria: 'Kapasitas tas (1–8)',
      hint: '2 sampai 4 barang, dipisah koma, ditulis <b>berat:nilai</b> (berat 1–8, nilai 1–99). Kotak <b>W</b> diisi kapasitas tas, 1–8. Contoh: 1:1, 3:4, 4:5, 5:7 dengan W = 7',
      fmt: d => (d || []).join(', '),
      parse(raw, rawT) {
        const t = String(raw).split(/[\s,;]+/).filter(Boolean), data = [];
        for (const x of t) {
          const m = /^(\d+)[:/](\d+)$/.exec(x);
          if (!m) return { err: `"${x}" bukan barang. Tulis berat:nilai, misalnya 3:4 (berat 3, nilai 4).` };
          if (+m[1] < 1 || +m[1] > 8) return { err: `Berat ${m[1]} terlalu besar atau 0. Pakai berat 1–8.` };
          if (+m[2] < 1 || +m[2] > 99) return { err: `Nilai ${m[2]} harus 1–99.` };
          data.push(`${+m[1]}:${+m[2]}`);
        }
        if (data.length < 2 || data.length > 4) return { err: 'Isi 2 sampai 4 barang. Contoh: 1:1, 3:4, 4:5, 5:7' };
        const W = Number(String(rawT).trim());
        if (String(rawT).trim() === '' || !Number.isInteger(W) || W < 1 || W > 8) return { err: 'Isi kotak W dengan kapasitas 1–8.' };
        return { data, target: W };
      },
      acak() {
        if (Math.random() < 0.3) return [{ data: ['1:1', '3:4', '4:5', '5:7'], target: 7 }, { data: ['2:3', '3:4', '4:5', '5:6'], target: 5 }, { data: ['5:10', '4:7', '3:6'], target: 7 }][alRnd(0, 2)];
        const n = alRnd(2, 4); return { data: Array.from({ length: n }, () => `${alRnd(1, 6)}:${alRnd(1, 30)}`), target: alRnd(4, 8) };
      }
    },
    run(data, W) {
      const r = alRec2(), it = alRanselItems(data), n = it.length, dp = [Array(W + 1).fill(null)];
      for (let i = 1; i <= n; i++) dp.push(Array(W + 1).fill(null));
      r.cnt['Sel dihitung'] = 0; r.cnt['Pilihan ambil'] = 0;
      const S = o => Object.assign({ it, W, dp: dp.map(row => row.slice()) }, o);
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'decl', vars: {}, S: S({}), title: `Tas berkapasitas ${W}: pilih barang yang nilainya paling besar`,
        body: `Setiap barang hanya ada satu dan harus diambil utuh atau tidak sama sekali (karena itu disebut <b>0/1</b>). Total berat tidak boleh lebih dari ${W}. Mencoba semua kombinasi butuh 2<sup>n</sup> percobaan. DP mengisi tabel <code>dp[i][w]</code>: nilai terbaik kalau hanya boleh memakai barang 1 sampai i dan kapasitasnya w.` });
      for (let w = 0; w <= W; w++) dp[0][w] = 0;
      r.push({ grp: 'Mulai', kind: 'Mulai', ln: 'base', vars: { i: 0 }, S: S({ row: 0 }), title: 'Baris 0 diisi 0', body: 'Tanpa barang sama sekali, nilai yang bisa dibawa 0, berapa pun kapasitasnya. Baris ini menjadi dasar untuk baris berikutnya.' });
      for (let i = 1; i <= n; i++) {
        const { b, v } = it[i - 1], g = `barang ${i}`;
        for (let w = 0; w <= W; w++) {
          const up = dp[i - 1][w]; r.cnt['Sel dihitung']++;
          if (b > w) {
            dp[i][w] = up;
            r.push({ grp: g, kind: 'Salin', ln: 'copy', vars: { i, w, b, v, 'dp[i][w]': up }, S: S({ row: i, cur: [i, w], up: [i - 1, w] }), title: `w = ${w}: barang ${i} tidak muat`, body: `Berat barang ${i} (${b}) lebih dari kapasitas ${w}, jadi barang ini pasti tidak diambil. Nilainya sama dengan sel di atasnya: <code>dp[${i}][${w}] = dp[${i - 1}][${w}] = ${up}</code>.` });
            continue;
          }
          const take = dp[i - 1][w - b] + v, ambil = take > up;
          r.push({ grp: g, kind: 'Bandingkan', ln: 'cmp', vars: { i, w, b, v, 'dp[i][w]': up }, S: S({ row: i, cur: [i, w], up: [i - 1, w], dia: [i - 1, w - b] }), title: `w = ${w}: ambil barang ${i} atau tidak?`,
            body: `<b>Tidak diambil:</b> nilainya sama dengan sel di atas, ${up}. <b>Diambil:</b> sisa kapasitas ${w} − ${b} = ${w - b} diisi cara terbaik dari barang sebelumnya, dp[${i - 1}][${w - b}] = ${dp[i - 1][w - b]}, ditambah nilai barang ini ${v}, jadi ${take}. ${ambil ? `${take} > ${up}, jadi barang ${i} diambil.` : `${take} tidak lebih besar dari ${up}, jadi barang ${i} tidak diambil.`}`,
            q: { t: `Tidak diambil = ${up}, diambil = dp[${i - 1}][${w - b}] + ${v} = ${take}. Mana yang dipilih?`, o: ['Ambil barang ini', 'Tidak diambil'], a: ambil ? 0 : 1 } });
          dp[i][w] = ambil ? take : up; if (ambil) r.cnt['Pilihan ambil']++;
          r.push({ grp: g, kind: ambil ? 'Ambil' : 'Salin', ln: ambil ? 'take' : 'copy', vars: { i, w, b, v, 'dp[i][w]': dp[i][w] }, S: S({ row: i, cur: [i, w], hi: true }), title: `dp[${i}][${w}] = ${dp[i][w]}`, body: ambil ? `Dengan kapasitas ${w}, membawa barang ${i} lebih menguntungkan.` : `Dengan kapasitas ${w}, lebih baik barang ${i} ditinggal.` });
        }
      }
      r.push({ grp: 'Lacak', kind: 'Hasil', ln: 'ret', vars: { i: n, w: W, 'dp[i][w]': dp[n][W] }, S: S({ cur: [n, W], hi: true }), title: `Nilai terbaik: ${dp[n][W]}`, body: `Jawabannya ada di sel kanan bawah, <code>dp[${n}][${W}] = ${dp[n][W]}</code>. Tabel tidak menyimpan barang mana yang diambil, jadi pilihannya dilacak mundur dari sel ini.` });
      let w = W; const path = [[n, W]], pick = [];
      for (let i = n; i >= 1; i--) {
        const diff = dp[i][w] !== dp[i - 1][w];
        r.push({ grp: 'Lacak', kind: 'Lacak', ln: 'back', vars: { i, w, b: it[i - 1].b, v: it[i - 1].v, 'dp[i][w]': dp[i][w] }, S: S({ cur: [i, w], up: [i - 1, w], path: path.slice(), pick: pick.slice() }), title: `dp[${i}][${w}] = ${dp[i][w]}, di atasnya ${dp[i - 1][w]}`,
          body: diff ? `Nilainya berbeda dari sel di atas, artinya nilai ini hanya bisa didapat dengan membawa barang ${i}. Barang ${i} diambil, lalu kapasitas dikurangi beratnya: w = ${w} − ${it[i - 1].b} = ${w - it[i - 1].b}.` : `Nilainya sama dengan sel di atas, artinya barang ${i} tidak diperlukan. Naik satu baris dengan w tetap ${w}.`,
          q: { t: `dp[${i}][${w}] = ${dp[i][w]}, sel di atasnya ${dp[i - 1][w]}. Apakah barang ${i} diambil?`, o: ['Ya, diambil', 'Tidak'], a: diff ? 0 : 1 } });
        if (diff) { pick.push(i); w -= it[i - 1].b; }
        path.push([i - 1, w]);
      }
      const tb = pick.reduce((a, i) => a + it[i - 1].b, 0);
      r.push({ grp: 'Lacak', kind: 'Hasil', ln: 'pick', vars: { 'dp[i][w]': dp[n][W] }, S: S({ end: true, path, pick }), title: pick.length ? `Bawa barang ${pick.slice().reverse().join(', ')}` : 'Tidak ada barang yang muat',
        body: pick.length ? `Total berat ${tb} (kapasitas ${W}) dan total nilai ${dp[n][W]}. Tabelnya berukuran (n + 1) × (W + 1), jadi waktunya O(n × W), jauh lebih cepat dari mencoba 2<sup>n</sup> kombinasi saat barangnya banyak.` : `Semua barang lebih berat dari ${W}, jadi tas tetap kosong dan nilainya 0.`,
        note: ['Kenapa bukan greedy', 'Mengambil barang dengan nilai per berat tertinggi lebih dulu tidak selalu benar untuk 0/1, karena barang tidak bisa dipotong. Greedy hanya benar untuk fractional knapsack, saat barang boleh diambil sebagian.'] });
      return r.F;
    },
    view(A, s, f) {
      const S = f.S, it = S.it, n = it.length, W = S.W, cw = 46, sp = 50, cx0 = 96;
      let g = '';
      it.forEach((t, k) => { g += `<text class="al-lbl${S.row && S.row !== k + 1 && !S.end ? ' al-muted' : ''}" x="20" y="${22 + k * 28}">barang ${k + 1}: berat ${t.b}, nilai ${t.v}</text>`; });
      const y0 = 22 + n * 28 + 14;
      g += `<text class="al-lbl" x="20" y="${y0 + 6}">w →</text>`;
      for (let w = 0; w <= W; w++) g += `<text class="al-idx" x="${cx0 + w * sp + cw / 2}" y="${y0 + 6}">${w}</text>`;
      const eq = (p, i, w) => p && p[0] === i && p[1] === w, onPath = (i, w) => (S.path || []).some(p => p[0] === i && p[1] === w);
      for (let i = 0; i <= n; i++) {
        const y = y0 + 18 + i * 46;
        g += `<text class="al-lbl" x="20" y="${y + 24}">i = ${i}</text>`;
        for (let w = 0; w <= W; w++) {
          const v = S.dp[i][w], c = eq(S.cur, i, w) ? (S.hi ? 'found' : 'cmp') : eq(S.up, i, w) || eq(S.dia, i, w) ? 'done' : onPath(i, w) ? 'found' : '';
          g += `<g class="al-box${c ? ' al-' + c : ''}" transform="translate(${cx0 + w * sp},${y})"><rect width="${cw}" height="38" rx="6"/><text x="${cw / 2}" y="19">${v == null ? '' : v}</text></g>`;
        }
      }
      let H = y0 + 18 + (n + 1) * 46 + 4;
      if (S.pick && S.end) { g += `<text class="al-lbl" x="20" y="${H + 20}">${S.pick.length ? `dibawa: barang ${S.pick.slice().reverse().join(', ')}` : 'tidak ada yang dibawa'}</text>`; H += 34; }
      return `<svg class="al-svg" viewBox="0 0 560 ${H}" role="img" aria-label="Knapsack: ${esc(it.map((t, k) => `barang ${k + 1} berat ${t.b} nilai ${t.v}`).join(', '))}, kapasitas ${W}">${g}</svg>`;
    },
    program(s) {
      const it = alRanselItems(s.data), F = this.run(s.data, s.target), last = F[F.length - 1].S;
      const L = ['#include <iostream>', 'using namespace std;', '', ...this.code.cpp, '', 'void tambah(int b, int v) {', '    berat[n] = b;', '    nilai[n] = v;', '    n++;', '}', '', 'int main() {'];
      it.forEach(t => L.push(`    tambah(${t.b}, ${t.v});`));
      L.push(`    cout << "Nilai terbaik: " << ransel(${s.target}) << endl;`, '    cout << "Diambil:" << endl;', `    cetakPilihan(${s.target});`, '    return 0;', '}');
      return { code: L.join('\n'), out: alOutLines(['Nilai terbaik: ' + last.dp[it.length][s.target], 'Diambil:', ...last.pick.map(i => 'barang ' + i)]) };
    }
  }
});

// ---------------- Pencocokan string naif ----------------
const AL_COCOK_CPP = ['int cariPola(string teks, string pola) {', '    int n = teks.length(), m = pola.length();', '    int ketemu = 0;', '    for (int s = 0; s <= n - m; s++) {', '        int j = 0;', '        while (j < m && teks[s + j] == pola[j])', '            j++;', '        if (j == m) {', '            cout << "Ketemu di indeks " << s << endl;', '            ketemu++;', '        }', '    }', '    return ketemu;', '}'];
const AL_COCOK_PS = ['cari_pola(teks, pola):', '    untuk setiap geseran s dari 0 sampai n − m:', '        j ← 0', '        selama j < m dan teks[s + j] = pola[j]: j ← j + 1', '        jika j = m: pola ketemu di indeks s', '    kembalikan banyak yang ketemu'];
Object.assign(AL_ALGO, {
  cocok: {
    target: true,
    counters: ['Perbandingan', 'Geseran'],
    vars: ['s', 'j', 'teks[s + j]', 'pola[j]'],
    code: { cpp: AL_COCOK_CPP, ps: AL_COCOK_PS },
    lines: {
      cpp: { decl: alLn(AL_COCOK_CPP, 'int cariPola', 'int n = teks', 'int ketemu = 0'), shift: alLn(AL_COCOK_CPP, 'for (int s', 'int j = 0'), cmp: alLn(AL_COCOK_CPP, 'while (j < m'), step: alLn(AL_COCOK_CPP, 'j++'), found: alLn(AL_COCOK_CPP, 'if (j == m)', 'cout << "Ketemu', 'ketemu++'), ret: alLn(AL_COCOK_CPP, 'return ketemu') },
      ps: { decl: [1], shift: [2, 3], cmp: [4], step: [4], found: [5], ret: [6] }
    },
    input: {
      mode: 'text', aria: 'Teks (huruf atau angka tanpa spasi)', targetLabel: 'pola', targetAria: 'Pola yang dicari (1–5 huruf atau angka)', targetMode: 'text', targetWide: true, targetCaps: 'off',
      hint: 'Teks 3–16 huruf atau angka tanpa spasi, lalu kotak <b>pola</b> diisi 1–5 huruf atau angka yang dicari. Huruf besar dan kecil dianggap berbeda, seperti di C++. Contoh: teks ABABCABAB, pola ABAB',
      fmt: d => (d || []).join(''),
      parse(raw, rawT) {
        const t = String(raw).replace(/[\s,]+/g, ''), p = String(rawT).replace(/[\s,]+/g, '');
        if (!/^[A-Za-z0-9]+$/.test(t) || t.length < 3 || t.length > 16) return { err: 'Isi teks dengan 3 sampai 16 huruf atau angka, tanpa spasi atau tanda baca. Contoh: ABABCABAB' };
        if (!/^[A-Za-z0-9]+$/.test(p) || p.length > 5) return { err: 'Isi kotak pola dengan 1 sampai 5 huruf atau angka.' };
        if (p.length > t.length) return { err: 'Pola tidak boleh lebih panjang dari teksnya.' };
        return { data: t.split(''), target: p };
      },
      acak() {
        if (Math.random() < 0.3) return [{ data: 'ABABCABAB'.split(''), target: 'ABAB' }, { data: 'AAAAAB'.split(''), target: 'AAB' }, { data: 'SAYASUKASAYUR'.split(''), target: 'SAY' }][alRnd(0, 2)];
        const al = Math.random() < 0.5 ? 'AB' : 'ABC', n = alRnd(8, 14), t = Array.from({ length: n }, () => al[alRnd(0, al.length - 1)]).join(''), m = alRnd(2, 4), s0 = alRnd(0, n - m);
        return { data: t.split(''), target: Math.random() < 0.75 ? t.slice(s0, s0 + m) : Array.from({ length: m }, () => al[alRnd(0, al.length - 1)]).join('') };
      }
    },
    run(data, pola) {
      const r = alRec2(), t = data, P = pola.split(''), n = t.length, m = P.length, found = [];
      r.cnt.Perbandingan = 0; r.cnt.Geseran = 0;
      const S = o => Object.assign({ t, P, found: found.slice() }, o);
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'decl', vars: {}, S: S({ s: 0, pre: true }), title: `Cari "${esc(pola)}" di dalam teks`,
        body: `Pola ditaruh di bawah teks mulai indeks 0, lalu dicocokkan huruf demi huruf dari kiri. Kalau ada huruf yang berbeda, pola <b>digeser satu langkah</b> ke kanan dan dicocokkan lagi dari awal pola. Ada ${n} − ${m} + 1 = ${n - m + 1} posisi yang harus dicoba.` });
      for (let s = 0; s <= n - m; s++) {
        const g = `s = ${s}`; let j = 0; r.cnt.Geseran++;
        r.push({ grp: g, kind: 'Geser', ln: 'shift', vars: { s, j: 0 }, S: S({ s }), title: `Pola ditaruh di indeks ${s}`, body: s ? 'Pola digeser satu langkah ke kanan, dan <code>j = 0</code> lagi: pencocokan dimulai dari huruf pertama pola.' : 'Mulai dari posisi paling kiri, dengan <code>j = 0</code>.' });
        for (;;) {
          const a = t[s + j], b = P[j], eq = a === b; r.cnt.Perbandingan++;
          r.push({ grp: g, kind: 'Bandingkan', ln: 'cmp', vars: { s, j, 'teks[s + j]': `'${a}'`, 'pola[j]': `'${b}'` }, S: S({ s, j, cmp: true }), title: `teks[${s + j}] = ${esc(a)}, pola[${j}] = ${esc(b)}`,
            body: eq ? `Sama, jadi <code>j++</code> menjadi ${j + 1}.${j + 1 === m ? ' Semua huruf pola sudah cocok.' : ' Lanjut ke huruf berikutnya.'}` : `Berbeda. Posisi ${s} gagal, dan huruf sisanya tidak perlu dicek.`,
            q: { t: `Apakah teks[${s + j}] = '${a}' sama dengan pola[${j}] = '${b}'?`, o: ['Sama, lanjut', 'Beda, geser pola'], a: eq ? 0 : 1 } });
          if (!eq) break;
          j++;
          if (j === m) break;
        }
        if (j === m) {
          found.push(s);
          r.push({ grp: g, kind: 'Hasil', ln: 'found', vars: { s, j }, S: S({ s, j: m, ok: true }), title: `Ketemu di indeks ${s}`, body: `<code>j == m</code> (${m}), jadi seluruh pola cocok mulai teks[${s}]. Pencarian tetap lanjut, karena pola bisa muncul lagi.` });
        }
      }
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'ret', vars: {}, S: S({ s: null, end: true }), title: found.length ? `Ketemu ${found.length} kali` : 'Pola tidak ketemu',
        body: `${found.length ? `Pola muncul di indeks ${found.join(', ')}.` : 'Tidak ada posisi yang cocok.'} Total ${r.cnt.Perbandingan} perbandingan huruf. Paling buruk, setiap posisi mencocokkan hampir seluruh pola, jadi waktunya O((n − m + 1) × m), kira-kira O(n × m).`,
        note: ['Algoritma yang lebih cepat', 'KMP (Knuth-Morris-Pratt) tidak mengulang dari huruf pertama pola setelah gagal, karena ia sudah tahu bagian pola yang cocok. Waktunya O(n + m). Boyer-Moore mencocokkan dari kanan dan bisa melompati beberapa posisi sekaligus.'] });
      return r.F;
    },
    view(A, s, f) {
      const S = f.S, mv = alMover(s), n = S.t.length, x0 = 280 - n * 16;
      const cls = i => { if (S.end) return S.found.some(p => i >= p && i < p + S.P.length) ? 'found' : '';
        if (S.s == null || S.pre) return ''; const j = i - S.s; if (j < 0 || j >= S.P.length) return 'dim';
        if (S.ok) return 'found'; if (S.cmp && j === S.j) return 'cmp'; return j < (S.j || 0) ? 'done' : ''; };
      let g = `<text class="al-lbl" x="20" y="22">teks</text>`;
      S.t.forEach((c, i) => { const k = cls(i); g += `<g class="al-box${k ? ' al-' + k : ''}" transform="translate(${x0 + i * 32},34)"><rect width="28" height="36" rx="5"/><text x="14" y="18">${esc(c)}</text></g><text class="al-idx" x="${x0 + i * 32 + 14}" y="90">${i}</text>`; });
      if (!S.end) {
        g += `<text class="al-lbl" x="20" y="120">pola${S.pre ? '' : `, s = ${S.s}`}</text>`;
        S.P.forEach((c, j) => { const k = S.ok ? 'found' : S.cmp && j === S.j ? 'cmp' : S.cmp && j < S.j ? 'done' : '';
          g += alBox(mv, 'p' + j, esc(c), x0 + (S.s + j) * 32, 132, k, 28); });
      }
      const y = S.end ? 128 : 200;
      g += `<text class="al-lbl" x="20" y="${y}">ketemu di indeks: ${S.found.length ? S.found.join(', ') : '–'}</text>`;
      return `<svg class="al-svg" viewBox="0 0 560 ${y + 16}" role="img" aria-label="Teks ${esc(S.t.join(''))}, pola ${esc(S.P.join(''))}${S.s != null && !S.end ? ` di geseran ${S.s}` : ''}">${g}</svg>`;
    },
    program(s) {
      const F = this.run(s.data, s.target), found = F[F.length - 1].S.found;
      const L = ['#include <iostream>', '#include <string>', 'using namespace std;', '', ...this.code.cpp, '', 'int main() {', `    string teks = "${s.data.join('')}";`, `    string pola = "${s.target}";`, '    if (cariPola(teks, pola) == 0) cout << "Tidak ketemu" << endl;', '    return 0;', '}'];
      return { code: L.join('\n'), out: alOutLines(found.length ? found.map(p => 'Ketemu di indeks ' + p) : ['Tidak ketemu']) };
    }
  }
});
