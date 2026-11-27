// Lab Struktur Data & Algoritma (blok "algo-lab").
// Setiap algoritma di AL_ALGO menghasilkan daftar langkah (frame) dari data mana pun, sehingga pengguna bisa
// mengisi angkanya sendiri. Satu frame = keadaan batang, baris kode yang menyala, isi variabel, dan penjelasan.
// Blok: { type: "algo-lab", algo: "bubble", data: [5, 1, 4, 2, 8], target?: 4, label, title, desc }
// Algoritma dengan gambar selain batang (stack, linked list, pohon, graf, …) memberi sendiri:
//   view(A, s, f) → <svg>, input { hint, parse(teks, teksTarget) → {data, target} | {err}, fmt(data), acak() },
//   program(s) → { code, out } untuk "Program lengkap". Lihat algo-lab-linear.js dan seterusnya.

// ---------- Pencatat langkah ----------
// a = nilai per posisi, ids = identitas batang per posisi (supaya batang yang ditukar bisa bergerak)
function alRec(data) {
  const r = { a: data.slice(), ids: data.map((_, i) => i), F: [], cnt: {} };
  r.bars = (cls, extra) => {
    const out = [];
    r.ids.forEach((id, p) => { if (id != null) out.push({ id, v: r.val[id], x: p, row: 0, c: (cls && cls(p)) || '' }); });
    return out.concat(extra || []);
  };
  r.val = data.slice();
  r.push = o => r.F.push(Object.assign({ bars: r.bars(o.cls), ptrs: [], vars: {} }, o, { cnt: Object.assign({}, r.cnt) }));
  r.swap = (i, j) => { [r.a[i], r.a[j]] = [r.a[j], r.a[i]]; [r.ids[i], r.ids[j]] = [r.ids[j], r.ids[i]]; };
  return r;
}
const alList = a => '[' + a.join(', ') + ']';
// Pencatat langkah untuk gambar selain batang: tiap frame membawa keadaan gambarnya sendiri di S.
function alRec2() {
  const r = { F: [], cnt: {} };
  r.push = o => r.F.push(Object.assign({ ptrs: [], vars: {} }, o, { cnt: Object.assign({}, r.cnt) }));
  return r;
}
// Benda yang bisa bergerak di gambar: digambar di posisi langkah sebelumnya lalu digeser (lihat alSettle).
function alMover(s) {
  const prev = s.anim ? s.pos : null, pos = {}; s.anim = false; s.pos = pos;
  return (id, x, y) => { pos[id] = [x, y]; const f = prev && prev[id] ? prev[id] : [x, y];
    return `style="transform:translate(${f[0]}px,${f[1]}px)" data-tx="${x}" data-ty="${y}"`; };
}
const alNum = v => typeof v === 'number';

const AL_ALGO = {
  // ---------------- Pencarian linear ----------------
  linear: {
    call: 'linearSearch(a, n, x)',
    result: (a, x) => a.indexOf(x),
    target: true,
    counters: ['Perbandingan'],
    vars: ['n', 'x', 'i', 'a[i]'],
    code: {
      cpp: ['int linearSearch(int a[], int n, int x) {', '    for (int i = 0; i < n; i++) {', '        if (a[i] == x) {', '            return i;   // ketemu', '        }', '    }', '    return -1;          // tidak ketemu', '}'],
      ps: ['linear_search(a, n, x):', '    untuk i dari 0 sampai n-1:', '        jika a[i] = x:', '            kembalikan i', '    kembalikan -1']
    },
    lines: { cpp: { sig: [1], cmp: [2, 3], ret: [4], none: [7] }, ps: { sig: [1], cmp: [2, 3], ret: [4], none: [5] } },
    run(data, x) {
      const r = alRec(data), a = r.a, n = a.length; r.cnt.Perbandingan = 0;
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'sig', title: `Cari ${x} dari kiri ke kanan`, body: `Data: ${alList(a)}. Pencarian linear memeriksa data satu per satu mulai indeks 0, sampai ketemu atau data habis. Datanya <b>tidak perlu urut</b>.`, vars: { n, x } });
      for (let i = 0; i < n; i++) {
        r.cnt.Perbandingan++;
        const eq = a[i] === x;
        r.push({ grp: `i = ${i}`, kind: 'Bandingkan', ln: 'cmp', cls: p => p < i ? 'dim' : p === i ? 'cmp' : '', ptrs: [{ x: i, t: 'i' }], vars: { n, x, i, 'a[i]': a[i] },
          title: `Periksa a[${i}]`, body: eq ? `${a[i]} == ${x}? <b>Ya.</b> Ketemu di indeks ${i}.` : `${a[i]} == ${x}? Tidak. Lanjut ke indeks ${i + 1}.`,
          q: { t: `Apakah a[${i}] = ${a[i]} sama dengan x = ${x}?`, o: ['Ya, ketemu', 'Tidak, lanjut'], a: eq ? 0 : 1 } });
        if (eq) {
          r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'ret', cls: p => p === i ? 'found' : p < i ? 'dim' : '', ptrs: [{ x: i, t: 'i' }], vars: { n, x, i, 'a[i]': a[i] },
            title: `Ketemu: indeks ${i}`, body: `Fungsi langsung mengembalikan ${i}. Data di kanannya tidak diperiksa lagi.`,
            note: ['Jumlah langkah', `${i + 1} perbandingan untuk ${n} data. Kalau ${x} ada di paling kanan atau tidak ada sama sekali, perlu ${n} perbandingan. Itu sebabnya pencarian linear disebut O(n).`] });
          return r.F;
        }
      }
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'none', cls: () => 'dim', vars: { n, x }, title: `${x} tidak ada`, body: `Semua ${n} data sudah diperiksa dan tidak ada yang sama dengan ${x}. Fungsi mengembalikan <code>-1</code> sebagai tanda "tidak ketemu".`,
        note: ['Kenapa -1?', 'Indeks array selalu 0 atau lebih, jadi -1 tidak mungkin tertukar dengan posisi yang sah.'] });
      return r.F;
    }
  },

  // ---------------- Pencarian biner ----------------
  biner: {
    call: 'binarySearch(a, n, x)',
    result: (a, x) => { let lo = 0, hi = a.length - 1; while (lo <= hi) { const m = Math.floor((lo + hi) / 2); if (a[m] === x) return m; if (a[m] < x) lo = m + 1; else hi = m - 1; } return -1; },
    target: true, sorted: true,
    counters: ['Pemeriksaan'],
    vars: ['x', 'low', 'high', 'mid', 'a[mid]'],
    code: {
      cpp: ['int binarySearch(int a[], int n, int x) {', '    int low = 0, high = n - 1;', '    while (low <= high) {', '        int mid = (low + high) / 2;', '        if (a[mid] == x) return mid;', '        else if (a[mid] < x) low = mid + 1;', '        else high = mid - 1;', '    }', '    return -1;', '}'],
      ps: ['binary_search(a, n, x):', '    low ← 0; high ← n-1', '    selama low ≤ high:', '        mid ← (low + high) div 2', '        jika a[mid] = x: kembalikan mid', '        jika a[mid] < x: low ← mid + 1', '        selain itu: high ← mid - 1', '    kembalikan -1']
    },
    lines: { cpp: { init: [2], mid: [3, 4], found: [5], right: [6], left: [7], none: [9] }, ps: { init: [2], mid: [3, 4], found: [5], right: [6], left: [7], none: [8] } },
    run(data, x) {
      const r = alRec(data), a = r.a, n = a.length; r.cnt['Pemeriksaan'] = 0;
      let low = 0, high = n - 1, k = 0;
      const out = p => p < low || p > high ? 'dim' : '';
      const lh = () => [{ x: low, t: 'low' }, { x: high, t: 'high' }];
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'init', cls: out, ptrs: lh(), vars: { x, low, high }, title: `Cari ${x} di data yang sudah urut`, body: `Rentang pencarian awal adalah seluruh data: <code>low = 0</code> sampai <code>high = ${n - 1}</code>. Setiap putaran, lihat data di tengah lalu buang separuh yang pasti tidak berisi ${x}.`,
        note: ['Syarat', 'Pencarian biner hanya benar kalau data sudah urut. Pada data acak, separuh yang dibuang bisa saja berisi angka yang dicari.'] });
      while (low <= high) {
        k++; r.cnt['Pemeriksaan']++;
        const mid = Math.floor((low + high) / 2), v = a[mid];
        const ans = v === x ? 0 : v > x ? 1 : 2;
        r.push({ grp: `Putaran ${k}`, kind: 'Tengah', ln: 'mid', cls: p => p === mid ? 'cmp' : out(p), ptrs: [...lh(), { x: mid, t: 'mid' }], vars: { x, low, high, mid, 'a[mid]': v },
          title: `mid = (${low} + ${high}) / 2 = ${mid}`, body: `${(low + high) % 2 ? `${low + high} / 2 = ${(low + high) / 2}, dan pembagian bilangan bulat di C++ membuang pecahannya, jadi mid = ${mid}. ` : ''}Data di tengah rentang: a[${mid}] = ${v}.`,
          q: { t: `a[mid] = ${v}, sedangkan x = ${x}. Langkah berikutnya?`, o: ['Ketemu', 'Cari di kiri mid', 'Cari di kanan mid'], a: ans } });
        if (ans === 0) {
          r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'found', cls: p => p === mid ? 'found' : 'dim', ptrs: [{ x: mid, t: 'mid' }], vars: { x, low, high, mid, 'a[mid]': v }, title: `Ketemu: indeks ${mid}`, body: `a[${mid}] = ${x}. Fungsi mengembalikan ${mid}.`,
            note: ['Bandingkan', `Hanya ${k} pemeriksaan untuk ${n} data. Pencarian linear bisa butuh sampai ${n}. Untuk 1.000.000 data, pencarian biner paling banyak sekitar 20 pemeriksaan.`] });
          return r.F;
        }
        if (ans === 2) { low = mid + 1;
          r.push({ grp: `Putaran ${k}`, kind: 'Persempit', ln: 'right', cls: out, ptrs: lh(), vars: { x, low, high, mid, 'a[mid]': v }, title: 'Buang separuh kiri', body: `${v} < ${x}, jadi ${x} pasti ada di kanan mid. Geser <code>low = mid + 1 = ${low}</code>.` });
        } else { high = mid - 1;
          r.push({ grp: `Putaran ${k}`, kind: 'Persempit', ln: 'left', cls: out, ptrs: lh(), vars: { x, low, high, mid, 'a[mid]': v }, title: 'Buang separuh kanan', body: `${v} > ${x}, jadi ${x} pasti ada di kiri mid. Geser <code>high = mid - 1 = ${high}</code>.` });
        }
      }
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'none', cls: () => 'dim', vars: { x, low, high }, title: `${x} tidak ada`, body: `Sekarang low (${low}) lebih besar dari high (${high}): rentangnya kosong. Kondisi <code>low &lt;= high</code> bernilai false, perulangan berhenti, dan fungsi mengembalikan <code>-1</code>.` });
      return r.F;
    }
  },

  // ---------------- Bubble sort ----------------
  bubble: {
    call: 'bubbleSort(a, n)',
    counters: ['Perbandingan', 'Pertukaran'],
    vars: ['n', 'i', 'j', 'a[j]', 'a[j+1]', 'tmp'],
    code: {
      cpp: ['void bubbleSort(int a[], int n) {', '    for (int i = 0; i < n - 1; i++) {', '        for (int j = 0; j < n - 1 - i; j++) {', '            if (a[j] > a[j + 1]) {', '                int tmp = a[j];', '                a[j] = a[j + 1];', '                a[j + 1] = tmp;', '            }', '        }', '    }', '}'],
      ps: ['bubble_sort(a, n):', '    untuk i dari 0 sampai n-2:', '        untuk j dari 0 sampai n-2-i:', '            jika a[j] > a[j+1]:', '                tukar a[j] dan a[j+1]']
    },
    lines: { cpp: { sig: [1], pass: [2], cmp: [3, 4], swap: [5, 6, 7] }, ps: { sig: [1], pass: [2], cmp: [3, 4], swap: [5] } },
    run(data) {
      const r = alRec(data), a = r.a, n = a.length; r.cnt.Perbandingan = 0; r.cnt.Pertukaran = 0;
      let sorted = 0;
      const base = p => p >= n - sorted ? 'done' : '';
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'sig', vars: { n }, title: 'Yang besar naik ke kanan', body: `Data: ${alList(a)}. Bubble sort membandingkan dua angka yang <b>bersebelahan</b>. Kalau yang kiri lebih besar, keduanya ditukar. Satu putaran penuh membawa angka terbesar ke ujung kanan, seperti gelembung yang naik.`,
        note: ['Jumlah putaran', `Ada ${n} angka, jadi ada ${n - 1} putaran (i = 0 sampai ${n - 2}).`] });
      for (let i = 0; i < n - 1; i++) {
        r.push({ grp: `Putaran ${i + 1}`, kind: 'Putaran', ln: 'pass', cls: base, vars: { n, i }, title: `Putaran ${i + 1} dimulai`, body: `i = ${i}. Di putaran ini j berjalan dari 0 sampai ${n - 2 - i}${i ? `, karena ${i} angka paling kanan sudah di tempatnya` : ''}.` });
        for (let j = 0; j < n - 1 - i; j++) {
          r.cnt.Perbandingan++;
          const will = a[j] > a[j + 1], cmp = p => p === j || p === j + 1 ? 'cmp' : base(p), ptrs = [{ x: j, t: 'j' }, { x: j + 1, t: 'j+1' }];
          r.push({ grp: `Putaran ${i + 1}`, kind: 'Bandingkan', ln: 'cmp', cls: cmp, ptrs, vars: { n, i, j, 'a[j]': a[j], 'a[j+1]': a[j + 1] },
            title: `Bandingkan a[${j}] dan a[${j + 1}]`, body: `${a[j]} > ${a[j + 1]}? ${will ? '<b>Ya</b>, jadi keduanya ditukar.' : 'Tidak, urutannya dibiarkan.'}`,
            q: { t: `Apakah ${a[j]} dan ${a[j + 1]} ditukar?`, o: ['Ya, ditukar', 'Tidak'], a: will ? 0 : 1 } });
          if (will) {
            const t = a[j]; r.swap(j, j + 1); r.cnt.Pertukaran++;
            r.push({ grp: `Putaran ${i + 1}`, kind: 'Tukar', ln: 'swap', cls: cmp, ptrs, vars: { n, i, j, 'a[j]': a[j], 'a[j+1]': a[j + 1], tmp: t },
              title: `Tukar: ${t} pindah ke kanan`, body: `<code>tmp</code> menyimpan ${t} dulu, supaya nilainya tidak hilang saat a[${j}] ditimpa ${a[j]}.` });
          }
        }
        sorted++;
        r.push({ grp: `Putaran ${i + 1}`, kind: 'Hasil', ln: 'pass', cls: base, vars: { n, i }, title: `${a[n - 1 - i]} sudah di tempatnya`, body: `Putaran ${i + 1} selesai. Angka terbesar yang tersisa, ${a[n - 1 - i]}, sekarang di indeks ${n - 1 - i} dan tidak disentuh lagi.` });
      }
      sorted = n;
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'sig', cls: () => 'done', vars: { n }, title: 'Selesai: data terurut', body: `Hasil: ${alList(a)}. Total ${r.cnt.Perbandingan} perbandingan dan ${r.cnt.Pertukaran} pertukaran.`,
        note: ['Jumlah perbandingan', `Bubble sort selalu melakukan n(n-1)/2 = ${n * (n - 1) / 2} perbandingan untuk ${n} data, meskipun datanya sudah urut. Untuk 10.000 data itu hampir 50 juta perbandingan.`] });
      return r.F;
    }
  },

  // ---------------- Selection sort ----------------
  selection: {
    call: 'selectionSort(a, n)',
    counters: ['Perbandingan', 'Pertukaran'],
    vars: ['i', 'j', 'min', 'a[j]', 'a[min]'],
    code: {
      cpp: ['void selectionSort(int a[], int n) {', '    for (int i = 0; i < n - 1; i++) {', '        int min = i;', '        for (int j = i + 1; j < n; j++) {', '            if (a[j] < a[min]) {', '                min = j;', '            }', '        }', '        if (min != i) {', '            int tmp = a[i];', '            a[i] = a[min];', '            a[min] = tmp;', '        }', '    }', '}'],
      ps: ['selection_sort(a, n):', '    untuk i dari 0 sampai n-2:', '        min ← i', '        untuk j dari i+1 sampai n-1:', '            jika a[j] < a[min]: min ← j', '        jika min ≠ i: tukar a[i] dan a[min]']
    },
    lines: { cpp: { sig: [1], pass: [2, 3], cmp: [4, 5], set: [6], swap: [9, 10, 11, 12], keep: [9] }, ps: { sig: [1], pass: [2, 3], cmp: [4, 5], set: [5], swap: [6], keep: [6] } },
    run(data) {
      const r = alRec(data), a = r.a, n = a.length; r.cnt.Perbandingan = 0; r.cnt.Pertukaran = 0;
      let done = 0;
      const base = p => p < done ? 'done' : '';
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'sig', vars: {}, title: 'Pilih yang terkecil, taruh di depan', body: `Data: ${alList(a)}. Selection sort mencari angka <b>terkecil</b> di bagian yang belum urut, lalu menukarnya ke posisi paling depan bagian itu. Begitu terus sampai semua urut.` });
      for (let i = 0; i < n - 1; i++) {
        let min = i;
        const mk = j => p => p === j ? 'cmp' : p === min ? 'key' : base(p);
        r.push({ grp: `Putaran ${i + 1}`, kind: 'Putaran', ln: 'pass', cls: p => p === i ? 'key' : base(p), ptrs: [{ x: i, t: 'i' }, { x: min, t: 'min' }], vars: { i, min, 'a[min]': a[min] },
          title: `Putaran ${i + 1}: cari yang terkecil mulai indeks ${i}`, body: `Anggap dulu a[${i}] = ${a[i]} yang terkecil (<code>min = ${i}</code>), lalu bandingkan dengan semua angka di kanannya.` });
        for (let j = i + 1; j < n; j++) {
          r.cnt.Perbandingan++;
          const less = a[j] < a[min];
          r.push({ grp: `Putaran ${i + 1}`, kind: 'Bandingkan', ln: 'cmp', cls: mk(j), ptrs: [{ x: i, t: 'i' }, { x: j, t: 'j' }, { x: min, t: 'min' }], vars: { i, j, min, 'a[j]': a[j], 'a[min]': a[min] },
            title: `Bandingkan a[${j}] dengan a[min]`, body: `${a[j]} < ${a[min]}? ${less ? `<b>Ya</b>, jadi ${a[j]} menjadi minimum yang baru.` : `Tidak, minimum tetap ${a[min]}.`}`,
            q: { t: `Apakah a[${j}] = ${a[j]} lebih kecil dari minimum sementara (${a[min]})?`, o: ['Ya, min pindah', 'Tidak'], a: less ? 0 : 1 } });
          if (less) {
            min = j;
            r.push({ grp: `Putaran ${i + 1}`, kind: 'Catat', ln: 'set', cls: p => p === min ? 'key' : base(p), ptrs: [{ x: i, t: 'i' }, { x: j, t: 'j' }, { x: min, t: 'min' }], vars: { i, j, min, 'a[j]': a[j], 'a[min]': a[min] },
              title: `min = ${j}`, body: `Yang dicatat adalah <b>indeksnya</b> (${j}), bukan nilainya. Dengan indeks, nanti kita tahu posisi mana yang harus ditukar.` });
          }
        }
        if (min !== i) {
          const lo = a[min], hi = a[i];
          r.swap(i, min); r.cnt.Pertukaran++;
          r.push({ grp: `Putaran ${i + 1}`, kind: 'Tukar', ln: 'swap', cls: p => p === i ? 'done' : p === min ? 'cmp' : base(p), ptrs: [{ x: i, t: 'i' }, { x: min, t: 'min' }], vars: { i, min, 'a[min]': a[min] },
            title: `Tukar a[${i}] dan a[${min}]`, body: `Yang terkecil, ${lo}, pindah ke indeks ${i}. ${hi} pindah ke bekas tempatnya di indeks ${min}.` });
        } else {
          r.push({ grp: `Putaran ${i + 1}`, kind: 'Hasil', ln: 'keep', cls: p => p === i ? 'done' : base(p), ptrs: [{ x: i, t: 'i' }], vars: { i, min, 'a[min]': a[min] },
            title: 'Tidak perlu tukar', body: `min masih sama dengan i (${i}): ${a[i]} memang sudah yang terkecil, jadi tidak ada pertukaran.` });
        }
        done = i + 1;
      }
      done = n;
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'sig', cls: () => 'done', vars: {}, title: 'Selesai: data terurut', body: `Hasil: ${alList(a)}. Total ${r.cnt.Perbandingan} perbandingan, tetapi hanya ${r.cnt.Pertukaran} pertukaran.`,
        note: ['Ciri selection sort', `Perbandingannya selalu n(n-1)/2 = ${n * (n - 1) / 2}, sama seperti bubble sort. Bedanya, pertukarannya paling banyak satu per putaran (maksimal ${n - 1}).`] });
      return r.F;
    }
  },

  // ---------------- Insertion sort ----------------
  insertion: {
    call: 'insertionSort(a, n)',
    counters: ['Perbandingan', 'Pergeseran'],
    vars: ['i', 'j', 'key', 'a[j]'],
    code: {
      cpp: ['void insertionSort(int a[], int n) {', '    for (int i = 1; i < n; i++) {', '        int key = a[i];', '        int j = i - 1;', '        while (j >= 0 && a[j] > key) {', '            a[j + 1] = a[j];', '            j--;', '        }', '        a[j + 1] = key;', '    }', '}'],
      ps: ['insertion_sort(a, n):', '    untuk i dari 1 sampai n-1:', '        key ← a[i]; j ← i-1', '        selama j ≥ 0 dan a[j] > key:', '            a[j+1] ← a[j]; j ← j-1', '        a[j+1] ← key']
    },
    lines: { cpp: { sig: [1], take: [2, 3, 4], cmp: [5], shift: [6, 7], drop: [9] }, ps: { sig: [1], take: [2, 3], cmp: [4], shift: [5], drop: [6] } },
    run(data) {
      const r = alRec(data), n = r.a.length; r.cnt.Perbandingan = 0; r.cnt.Pergeseran = 0;
      const ids = r.ids, val = r.val, a = r.a;
      // Saat key diangkat, posisinya kosong (ids[p] = null); batang key digambar melayang di atas "lubang".
      const snap = (o, keyId, hole, cls) => r.push(Object.assign(o, { bars: r.bars(cls, keyId == null ? [] : [{ id: keyId, v: val[keyId], x: hole, row: 0, lift: true, c: 'key' }]) }));
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'sig', cls: p => p === 0 ? 'done' : '', vars: {}, title: 'Sisipkan satu per satu ke bagian yang sudah urut', body: `Data: ${alList(a)}. Seperti menyusun kartu di tangan: ambil kartu berikutnya, geser kartu yang lebih besar ke kanan, lalu selipkan kartunya di celah yang pas. Bagian kiri (mulai dari a[0] saja) selalu sudah urut.` });
      for (let i = 1; i < n; i++) {
        const key = a[i], keyId = ids[i]; ids[i] = null; let j = i - 1;
        const sortedL = p => p < i ? 'done' : '';
        snap({ grp: `i = ${i}`, kind: 'Ambil', ln: 'take', ptrs: [{ x: i, t: 'i' }, { x: j, t: 'j' }], vars: { i, j, key }, title: `Ambil key = a[${i}] = ${key}`, body: `${key} diangkat dulu (disimpan di <code>key</code>), sehingga posisi ${i} kosong dan bisa diisi angka yang digeser.` }, keyId, i, sortedL);
        while (true) {
          if (j < 0) {
            snap({ grp: `i = ${i}`, kind: 'Bandingkan', ln: 'cmp', ptrs: [], vars: { i, j, key }, title: 'j = -1: sudah di ujung kiri', body: `Tidak ada lagi angka di kiri. Kondisi <code>j &gt;= 0</code> false, jadi perulangan berhenti. ${key} adalah yang terkecil sejauh ini.` }, keyId, j + 1, sortedL);
            break;
          }
          r.cnt.Perbandingan++;
          const big = a[j] > key;
          snap({ grp: `i = ${i}`, kind: 'Bandingkan', ln: 'cmp', ptrs: [{ x: j, t: 'j' }], vars: { i, j, key, 'a[j]': a[j] }, title: `Bandingkan a[${j}] dengan key`, body: `${a[j]} > ${key}? ${big ? `<b>Ya</b>, ${a[j]} digeser satu langkah ke kanan.` : `Tidak, jadi ${key} berhenti di kanan ${a[j]}.`}`,
            q: { t: `Apakah a[${j}] = ${a[j]} lebih besar dari key (${key})?`, o: ['Ya, geser ke kanan', 'Tidak, berhenti'], a: big ? 0 : 1 } }, keyId, j + 1, p => p === j ? 'cmp' : sortedL(p));
          if (!big) break;
          a[j + 1] = a[j]; ids[j + 1] = ids[j]; ids[j] = null; r.cnt.Pergeseran++;
          j--;
          snap({ grp: `i = ${i}`, kind: 'Geser', ln: 'shift', ptrs: j >= 0 ? [{ x: j, t: 'j' }] : [], vars: { i, j, key, 'a[j]': j >= 0 ? a[j] : undefined }, title: `Geser ${a[j + 2]} ke a[${j + 2}]`, body: `<code>a[j + 1] = a[j]</code> menyalin ${a[j + 2]} ke kanan, lalu <code>j--</code> membuat j = ${j}. Celah kosong sekarang di indeks ${j + 1}.` }, keyId, j + 1, p => p === j + 2 ? 'cmp' : sortedL(p));
        }
        a[j + 1] = key; ids[j + 1] = keyId;
        snap({ grp: `i = ${i}`, kind: 'Sisipkan', ln: 'drop', ptrs: [], vars: { i, j, key }, title: `Sisipkan ${key} di a[${j + 1}]`, body: `<code>a[j + 1] = key</code>. Sekarang a[0..${i}] = ${alList(a.slice(0, i + 1))} sudah urut.` }, null, 0, p => p <= i ? 'done' : '');
      }
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'sig', cls: () => 'done', vars: {}, title: 'Selesai: data terurut', body: `Hasil: ${alList(a)}. Total ${r.cnt.Perbandingan} perbandingan dan ${r.cnt.Pergeseran} pergeseran.`,
        note: ['Kapan cepat?', `Kalau data hampir urut, hampir tidak ada yang digeser: cukup sekitar n perbandingan. Coba isi data yang sudah urut, misalnya 1, 2, 3, 4, 5.`] });
      return r.F;
    }
  },

  // ---------------- Merge sort ----------------
  merge: {
    call: 'mergeSort(a, 0, n - 1)',
    rows: 2,
    counters: ['Perbandingan'],
    vars: ['l', 'm', 'r', 'i', 'j', 'k'],
    code: {
      cpp: ['void merge(int a[], int l, int m, int r) {', '    int tmp[100], i = l, j = m + 1, k = 0;', '    while (i <= m && j <= r) {', '        if (a[i] <= a[j]) tmp[k++] = a[i++];', '        else tmp[k++] = a[j++];', '    }', '    while (i <= m) tmp[k++] = a[i++];', '    while (j <= r) tmp[k++] = a[j++];', '    for (k = 0; k < r - l + 1; k++) a[l + k] = tmp[k];', '}', '', 'void mergeSort(int a[], int l, int r) {', '    if (l >= r) return;', '    int m = (l + r) / 2;', '    mergeSort(a, l, m);', '    mergeSort(a, m + 1, r);', '    merge(a, l, m, r);', '}'],
      ps: ['merge_sort(a, l, r):', '    jika l ≥ r: selesai (1 data pasti urut)', '    m ← (l + r) div 2', '    merge_sort(a, l, m); merge_sort(a, m+1, r)', '    gabung(a, l, m, r)', 'gabung(a, l, m, r):', '    selama kiri dan kanan masih ada isinya:', '        ambil yang lebih kecil dari depan kiri/kanan ke tmp', '    salin sisa bagian yang belum habis ke tmp', '    salin tmp kembali ke a[l..r]']
    },
    lines: { cpp: { sig: [12], split: [13, 14, 15, 16], start: [17, 2], cmp: [3, 4, 5], takeL: [4], takeR: [5], restL: [7], restR: [8], copy: [9] }, ps: { sig: [1], split: [2, 3, 4], start: [5, 6], cmp: [7, 8], takeL: [8], takeR: [8], restL: [9], restR: [9], copy: [10] } },
    run(data) {
      const r = alRec(data), n = r.a.length; r.cnt.Perbandingan = 0;
      const a = r.a, ids = r.ids, val = r.val;
      let lo = 0, hi = n - 1, tmp = []; // tmp: [{ id, x }] di baris bawah
      const inR = p => p >= lo && p <= hi;
      const snap = o => r.push(Object.assign(o, { bars: r.bars(o.cls || (p => inR(p) ? '' : 'dim'), tmp.map(t => ({ id: t.id, v: val[t.id], x: t.x, row: 1, c: 'done' }))) }));
      snap({ grp: 'Mulai', kind: 'Konsep', ln: 'sig', cls: () => '', vars: { l: 0, r: n - 1 }, title: 'Bagi dua, urutkan, lalu gabungkan', body: `Data: ${alList(a)}. Merge sort membelah data menjadi dua terus-menerus sampai tiap bagian tinggal 1 angka (1 angka pasti urut). Lalu bagian-bagian itu <b>digabung</b> sambil diurutkan. Baris bawah adalah array bantu <code>tmp</code>.` });
      const sort = (l, rr) => {
        if (l >= rr) return;
        const m = Math.floor((l + rr) / 2);
        lo = l; hi = rr;
        snap({ grp: `Bagi ${l}–${rr}`, kind: 'Bagi', ln: 'split', cls: p => inR(p) ? (p <= m ? 'cmp' : 'key') : 'dim', vars: { l, m, r: rr }, title: `Bagi a[${l}..${rr}] menjadi dua`, body: `m = (${l} + ${rr}) / 2 = ${m}. Kiri: a[${l}..${m}] = ${alList(a.slice(l, m + 1))}. Kanan: a[${m + 1}..${rr}] = ${alList(a.slice(m + 1, rr + 1))}. Keduanya diurutkan dulu dengan cara yang sama (rekursif).` });
        sort(l, m); sort(m + 1, rr);
        lo = l; hi = rr; tmp = [];
        let i = l, j = m + 1, k = 0;
        const ptrs = () => [...(i <= m ? [{ x: i, t: 'i' }] : []), ...(j <= rr ? [{ x: j, t: 'j' }] : [])];
        const cls = p => !inR(p) ? 'dim' : (p === i && i <= m) || (p === j && j <= rr) ? 'cmp' : '';
        snap({ grp: `Gabung ${l}–${rr}`, kind: 'Gabung', ln: 'start', cls, ptrs: ptrs(), vars: { l, m, r: rr, i, j, k }, title: `Gabungkan ${alList(a.slice(l, m + 1))} dan ${alList(a.slice(m + 1, rr + 1))}`, body: `Kedua bagian sudah urut. i menunjuk depan bagian kiri, j menunjuk depan bagian kanan. Hasil gabungan ditulis ke <code>tmp</code>.` });
        const take = (side, kind) => {
          const p = side === 'L' ? i : j, id = ids[p];
          ids[p] = null; tmp.push({ id, x: l + k });
          if (side === 'L') i++; else j++; k++;
          return { id, v: val[id] };
        };
        while (i <= m && j <= rr) {
          r.cnt.Perbandingan++;
          const L = a[i], Rv = a[j], left = L <= Rv;
          snap({ grp: `Gabung ${l}–${rr}`, kind: 'Bandingkan', ln: 'cmp', cls, ptrs: ptrs(), vars: { l, m, r: rr, i, j, k }, title: `Bandingkan a[${i}] = ${L} dan a[${j}] = ${Rv}`, body: left ? `${L} <= ${Rv}, jadi yang diambil ${L} dari kiri.${L === Rv ? ' Saat sama besar, kiri didahulukan supaya urutan asli angka yang sama tetap terjaga.' : ''}` : `${Rv} lebih kecil, jadi yang diambil ${Rv} dari kanan.`,
            q: { t: `Mana yang masuk tmp lebih dulu?`, o: [`Kiri: ${L}`, `Kanan: ${Rv}`], a: left ? 0 : 1 } });
          const t = take(left ? 'L' : 'R');
          snap({ grp: `Gabung ${l}–${rr}`, kind: 'Ambil', ln: left ? 'takeL' : 'takeR', cls, ptrs: ptrs(), vars: { l, m, r: rr, i, j, k }, title: `${t.v} masuk tmp[${k - 1}]`, body: `${left ? 'i' : 'j'} maju satu dan k maju satu.` });
        }
        while (i <= m) { const t = take('L'); snap({ grp: `Gabung ${l}–${rr}`, kind: 'Sisa', ln: 'restL', cls, ptrs: ptrs(), vars: { l, m, r: rr, i, j, k }, title: `Bagian kanan habis: ${t.v} disalin`, body: 'Sisa bagian kiri sudah urut, jadi tinggal disalin ke tmp tanpa dibandingkan lagi.' }); }
        while (j <= rr) { const t = take('R'); snap({ grp: `Gabung ${l}–${rr}`, kind: 'Sisa', ln: 'restR', cls, ptrs: ptrs(), vars: { l, m, r: rr, i, j, k }, title: `Bagian kiri habis: ${t.v} disalin`, body: 'Sisa bagian kanan sudah urut, jadi tinggal disalin ke tmp tanpa dibandingkan lagi.' }); }
        tmp.forEach(t => { ids[t.x] = t.id; a[t.x] = val[t.id]; });
        tmp = [];
        snap({ grp: `Gabung ${l}–${rr}`, kind: 'Hasil', ln: 'copy', cls: p => inR(p) ? 'done' : 'dim', vars: { l, m, r: rr }, title: `a[${l}..${rr}] sekarang urut`, body: `Isi tmp disalin kembali: a[${l}..${rr}] = ${alList(a.slice(l, rr + 1))}.` });
      };
      sort(0, n - 1);
      lo = 0; hi = n - 1;
      snap({ grp: 'Hasil', kind: 'Hasil', ln: 'sig', cls: () => 'done', vars: {}, title: 'Selesai: data terurut', body: `Hasil: ${alList(a)} dengan ${r.cnt.Perbandingan} perbandingan.`,
        note: ['Kenapa cepat?', `Data dibelah dua sebanyak sekitar log₂ n kali, dan tiap tingkat penggabungan menyentuh n data. Totalnya sekitar n log n: untuk 10.000 data kira-kira 130 ribu langkah, jauh di bawah 50 juta milik bubble sort.`] });
      return r.F;
    }
  },

  // ---------------- Quick sort ----------------
  quick: {
    call: 'quickSort(a, 0, n - 1)',
    counters: ['Perbandingan', 'Pertukaran'],
    vars: ['low', 'high', 'pivot', 'i', 'j'],
    code: {
      cpp: ['int partition(int a[], int low, int high) {', '    int pivot = a[high];', '    int i = low - 1;', '    for (int j = low; j < high; j++) {', '        if (a[j] < pivot) {', '            i++;', '            swap(a[i], a[j]);', '        }', '    }', '    swap(a[i + 1], a[high]);', '    return i + 1;', '}', '', 'void quickSort(int a[], int low, int high) {', '    if (low < high) {', '        int p = partition(a, low, high);', '        quickSort(a, low, p - 1);', '        quickSort(a, p + 1, high);', '    }', '}'],
      ps: ['quick_sort(a, low, high):', '    jika low < high:', '        p ← partisi(a, low, high)', '        quick_sort(a, low, p-1); quick_sort(a, p+1, high)', 'partisi(a, low, high):', '    pivot ← a[high]; i ← low-1', '    untuk j dari low sampai high-1:', '        jika a[j] < pivot: i ← i+1; tukar a[i] dan a[j]', '    tukar a[i+1] dan a[high]; kembalikan i+1']
    },
    lines: { cpp: { sig: [14], start: [16, 2, 3], cmp: [4, 5], swap: [6, 7], place: [10, 11], rec: [17, 18] }, ps: { sig: [1], start: [3, 6], cmp: [7, 8], swap: [8], place: [9], rec: [4] } },
    run(data) {
      const r = alRec(data), a = r.a, n = a.length; r.cnt.Perbandingan = 0; r.cnt.Pertukaran = 0;
      const fixed = new Set();
      let lo = 0, hi = n - 1;
      const base = p => fixed.has(p) ? 'done' : p < lo || p > hi ? 'dim' : '';
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'sig', vars: {}, title: 'Pilih pivot, pisahkan kecil dan besar', body: `Data: ${alList(a)}. Quick sort memilih satu angka sebagai <b>pivot</b> (di sini angka paling kanan), lalu memindahkan semua angka yang lebih kecil ke kiri pivot. Setelah itu pivot pasti sudah di posisi akhirnya. Bagian kiri dan kanannya diurutkan dengan cara yang sama.` });
      const qs = (low, high) => {
        if (low > high) return;
        if (low === high) { fixed.add(low); return; }
        lo = low; hi = high;
        const pivot = a[high]; let i = low - 1;
        const g = `Partisi ${low}–${high}`;
        const ptrs = j => [...(i >= low ? [{ x: i, t: 'i' }] : []), ...(j != null ? [{ x: j, t: 'j' }] : [])];
        const cls = j => p => p === high ? 'key' : p === j ? 'cmp' : p > low - 1 && p <= i ? 'small' : base(p);
        r.push({ grp: g, kind: 'Pivot', ln: 'start', cls: cls(null), ptrs: ptrs(null), vars: { low, high, pivot, i }, title: `Pivot = a[${high}] = ${pivot}`, body: `Rentang a[${low}..${high}]. <code>i = low - 1 = ${i}</code> menandai batas akhir kelompok "lebih kecil dari pivot", yang sekarang masih kosong.` });
        for (let j = low; j < high; j++) {
          r.cnt.Perbandingan++;
          const less = a[j] < pivot;
          r.push({ grp: g, kind: 'Bandingkan', ln: 'cmp', cls: cls(j), ptrs: ptrs(j), vars: { low, high, pivot, i, j }, title: `Bandingkan a[${j}] = ${a[j]} dengan pivot`, body: `${a[j]} < ${pivot}? ${less ? '<b>Ya</b>, jadi masuk kelompok kiri.' : 'Tidak, dibiarkan di kanan.'}`,
            q: { t: `Apakah a[${j}] = ${a[j]} lebih kecil dari pivot (${pivot})?`, o: ['Ya, masuk kiri', 'Tidak, biarkan'], a: less ? 0 : 1 } });
          if (less) {
            i++;
            const same = i === j; r.swap(i, j); if (!same) r.cnt.Pertukaran++;
            r.push({ grp: g, kind: 'Tukar', ln: 'swap', cls: cls(j), ptrs: ptrs(j), vars: { low, high, pivot, i, j }, title: same ? `i = ${i}, a[${i}] tetap di tempat` : `i = ${i}, tukar a[${i}] dan a[${j}]`, body: same ? `i dan j menunjuk posisi yang sama, jadi "ditukar dengan dirinya sendiri" dan tidak ada yang berubah.` : `${a[i]} pindah ke a[${i}], ujung kelompok kiri. ${a[j]} pindah ke a[${j}].` });
          }
        }
        const p = i + 1;
        if (p !== high) r.cnt.Pertukaran++;
        r.swap(p, high); fixed.add(p);
        r.push({ grp: g, kind: 'Hasil', ln: 'place', cls: q => q === p ? 'done' : q >= low && q < p ? 'small' : base(q), ptrs: [{ x: p, t: 'p' }], vars: { low, high, pivot, i }, title: `Pivot ${pivot} masuk ke a[${p}]`, body: `<code>swap(a[i + 1], a[high])</code>. Semua angka di kiri ${pivot} lebih kecil, dan di kanannya tidak lebih kecil. ${pivot} sudah di posisi akhirnya dan tidak akan berpindah lagi.` });
        if (p - 1 > low || high > p + 1) r.push({ grp: g, kind: 'Rekursi', ln: 'rec', cls: q => q === p ? 'done' : base(q), vars: { low, high }, title: 'Urutkan kiri dan kanan pivot', body: `Berikutnya quickSort(a, ${low}, ${p - 1}) lalu quickSort(a, ${p + 1}, ${high}). Bagian yang isinya 0 atau 1 angka langsung dianggap urut.` });
        qs(low, p - 1); qs(p + 1, high);
      };
      qs(0, n - 1);
      lo = 0; hi = n - 1;
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'sig', cls: () => 'done', vars: {}, title: 'Selesai: data terurut', body: `Hasil: ${alList(a)}. Total ${r.cnt.Perbandingan} perbandingan dan ${r.cnt.Pertukaran} pertukaran.`,
        note: ['Hati-hati', 'Kalau pivot selalu angka terbesar atau terkecil (misalnya data sudah urut dan pivot diambil dari kanan), setiap partisi hanya mengurangi satu angka dan quick sort melambat menjadi O(n²). Coba isi 1, 2, 3, 4, 5, 6.'] });
      return r.F;
    }
  }
};

// ---------- Tampilan ----------
const AL_KIND = { Hasil: 'al-k-ok', Tukar: 'al-k-bad', Geser: 'al-k-bad', Pivot: 'al-k-bad' };
function alFrames(d, s) {
  const A = AL_ALGO[d.algo];
  if (!s.F) s.F = A.run(s.data, s.target);
  return s.F;
}
function alSvg(A, s, f) {
  const n = s.data.length, two = A.rows === 2;
  const W = 560, gap = n > 6 ? 8 : 12, bw = Math.min(56, (W - 40 - gap * (n - 1)) / n), x0 = (W - (bw * n + gap * (n - 1))) / 2;
  const G = two ? { base: [150, 320], hmax: 90, H: 350 } : { base: [200], hmax: 120, H: 268 };
  const max = Math.max(...s.data, 1), hOf = v => Math.round(22 + (v / max) * (G.hmax - 22));
  const X = x => x0 + x * (bw + gap);
  const prev = s.anim ? s.pos : null; s.anim = false;
  const pos = {};
  const bars = f.bars.map(b => {
    const tx = X(b.x), ty = G.base[b.row || 0] + (b.lift ? -46 : 0), h = hOf(b.v);
    pos[b.id] = [tx, ty];
    const from = prev && prev[b.id] ? prev[b.id] : [tx, ty];
    return `<g class="al-bar ${b.c ? 'al-' + b.c : ''}" style="transform:translate(${from[0]}px,${from[1]}px)" data-tx="${tx}" data-ty="${ty}"><rect x="0" y="${-h}" width="${bw}" height="${h}" rx="5"/><text x="${bw / 2}" y="${-h - 8}">${b.v}</text></g>`;
  }).join('');
  s.pos = pos;
  const idx = Array.from({ length: n }, (_, k) => `<text class="al-idx" x="${X(k) + bw / 2}" y="${G.base[0] + 18}">[${k}]</text>`).join('');
  const groups = {};
  (f.ptrs || []).forEach(p => { (groups[p.x] = groups[p.x] || []).push(p.t); });
  const ptrs = Object.entries(groups).map(([x, ts]) => { const cx = X(+x) + bw / 2, y = G.base[0] + 26;
    return `<g class="al-ptr"><path d="M${cx} ${y + 12} V${y} M${cx - 5} ${y + 6} L${cx} ${y} L${cx + 5} ${y + 6}"/><text x="${cx}" y="${y + 28}">${esc(ts.join(','))}</text></g>`; }).join('');
  const row2 = two ? `<line class="al-floor" x1="${x0 - 6}" x2="${X(n - 1) + bw + 6}" y1="${G.base[1] + 0.5}" y2="${G.base[1] + 0.5}"/><text class="al-tmp" x="${x0 - 6}" y="${G.base[1] + 18}">tmp</text>` : '';
  return `<svg class="al-svg" viewBox="0 0 ${W} ${G.H}" role="img" aria-label="Isi array: ${esc(f.bars.filter(b => !b.row && !b.lift).sort((p, q) => p.x - q.x).map(b => b.v).join(', '))}"><line class="al-floor" x1="${x0 - 6}" x2="${X(n - 1) + bw + 6}" y1="${G.base[0] + 0.5}" y2="${G.base[0] + 0.5}"/>${row2}${bars}${idx}${ptrs}</svg>`;
}
function alCode(A, s, f) {
  const lang = s.lang === 'ps' ? 'ps' : 'cpp', src = A.code[lang], on = (A.lines[lang] || {})[f.ln] || [];
  return `<pre class="trc-code al-code bg-slate-900 text-slate-100 rounded-xl py-2 text-[12px] sm:text-[13px] leading-6 font-mono overflow-x-auto" aria-label="Kode ${lang === 'cpp' ? 'C++' : 'pseudocode'}">${src.map((line, i) => {
    const cur = on.includes(i + 1);
    return `<div class="trc-line${cur ? ' trc-cur' : ''}"><span class="trc-no">${i + 1}</span><span>${(lang === 'cpp' ? hlCpp(line) : esc(line)) || ' '}</span></div>`;
  }).join('')}</pre>`;
}
// Di HP panel kode ada jauh di bawah, jadi baris yang sedang jalan juga ditampilkan di bawah penjelasan
function alNow(A, s, f) {
  const lang = s.lang === 'ps' ? 'ps' : 'cpp', on = (A.lines[lang] || {})[f.ln] || [];
  if (!on.length) return '';
  return `<pre class="al-now trc-code bg-slate-900 text-slate-100 rounded-xl py-1.5 text-[12px] leading-6 font-mono overflow-x-auto" aria-hidden="true">${on.map(i => `<div class="trc-line trc-cur"><span class="trc-no">${i}</span><span>${(lang === 'cpp' ? hlCpp(A.code[lang][i - 1].trim()) : esc(A.code[lang][i - 1].trim())) || ' '}</span></div>`).join('')}</pre>`;
}
// ---------- Program lengkap ----------
// Fungsi di panel kode sengaja tanpa #include dan main() supaya baris yang menyala tetap fokus.
// Di sini fungsi itu dibungkus jadi program utuh dengan data yang sedang dipakai di lab, beserta output yang seharusnya.
function alProgram(A, s) {
  if (A.program) return A.program(s);
  const data = s.data, n = data.length, isSearch = !!A.target;
  const L = ['#include <iostream>'];
  if (A.code.cpp.some(l => /\bswap\(/.test(l))) L.push('#include <utility>   // untuk swap()');
  L.push('using namespace std;', '', ...A.code.cpp, '');
  if (!isSearch) L.push('void cetak(int a[], int n) {', '    for (int i = 0; i < n; i++) cout << a[i] << " ";', '    cout << endl;', '}', '');
  L.push('int main() {', `    int a[] = {${data.join(', ')}};`, '    int n = sizeof(a) / sizeof(a[0]);   // jumlah elemen: ' + n);
  let out;
  if (isSearch) {
    const x = s.target, hasil = A.result(data, x);
    L.push(`    int x = ${x};`, '', `    int hasil = ${A.call};`, '    if (hasil != -1) cout << "Ditemukan di indeks " << hasil << endl;', '    else cout << "Tidak ditemukan" << endl;');
    out = [hasil !== -1 ? 'Ditemukan di indeks ' + hasil : 'Tidak ditemukan'];
  } else {
    L.push('', '    cout << "Sebelum: ";', '    cetak(a, n);', `    ${A.call};`, '    cout << "Sesudah: ";', '    cetak(a, n);');
    out = ['Sebelum: ' + data.join(' '), 'Sesudah: ' + data.slice().sort((p, q) => p - q).join(' ')];
  }
  L.push('    return 0;', '}');
  return { code: L.join('\n'), out: out.join('\n') };
}
function alFull(n, A, s) {
  const P = s.full ? alProgram(A, s) : null;
  return `<div class="al-full">
    <div class="flex flex-wrap items-center gap-2">
      <button type="button" ${act(n, 'full')} aria-expanded="${!!s.full}" class="al-btn">${s.full ? '▾' : '▸'} Program lengkap</button>
      ${s.full ? `<button type="button" ${act(n, 'salin')} class="al-btn">Salin kode</button>` : '<span class="text-xs text-slate-500">#include, main(), dan output</span>'}
    </div>
    ${P ? `<pre class="trc-code bg-slate-900 text-slate-100 rounded-xl py-2 text-[12px] sm:text-[13px] leading-6 font-mono overflow-x-auto" aria-label="Program C++ lengkap">${P.code.split('\n').map((l, i) => `<div class="trc-line"><span class="trc-no">${i + 1}</span><span>${hlCpp(l) || ' '}</span></div>`).join('')}</pre>
    <div class="text-xs font-bold uppercase tracking-wider text-slate-500">Output saat dijalankan</div>
    <pre class="al-out">${esc(P.out)}</pre>
    <p class="text-xs text-slate-500">Isi array mengikuti data yang sedang dipakai di lab. Salin, lalu jalankan di Dev-C++, Code::Blocks, atau OnlineGDB.</p>` : ''}
  </div>`;
}
// Langkah terjauh yang boleh dibuka. Di mode Tebak dulu, tebakan pertama yang belum dijawab mulai dari langkah sekarang menahan lompatan ke depan (mundur selalu boleh).
function alReach(F, s) {
  if (!s.tebak) return F.length - 1;
  for (let i = s.k; i < F.length; i++) if (F[i].q && s.ans[i] == null) return i;
  return F.length - 1;
}
const ALGO_LAB = {
  init: d => ({ data: (d.data || []).slice(), target: d.target, k: 0, lang: 'cpp', tebak: false, full: false, ans: {}, F: null, pos: null, anim: false, err: '', values: { data: alFmt(AL_ALGO[d.algo] || {}, d.data), target: d.target != null ? String(d.target) : '' } }),
  render(d, s, n) {
    const A = AL_ALGO[d.algo];
    if (!A) return `<p class="text-sm text-rose-700">Algoritma "${esc(d.algo)}" belum dikenal.</p>`;
    const F = alFrames(d, s), f = F[s.k], prev = F[s.k - 1];
    const locked = s.tebak && f.q && s.ans[s.k] == null;
    const seg = (name, opts, cur, label) => `<div class="al-seg" role="group" aria-label="${label}">${opts.map(([v, t]) => `<button type="button" ${act(n, name, v)} aria-pressed="${cur === v}">${t}</button>`).join('')}</div>`;
    // Rel: satu tombol per kelompok langkah
    const groups = []; F.forEach((x, i) => { if (!groups.length || groups[groups.length - 1].g !== x.grp) groups.push({ g: x.grp, i }); });
    const curG = groups.reduce((acc, g, gi) => g.i <= s.k ? gi : acc, 0);
    const reach = alReach(F, s);
    const rail = groups.map((g, gi) => `<button type="button" ${act(n, 'go', g.i)} class="al-rail ${gi === curG ? 'is-on' : gi < curG ? 'is-past' : ''}" ${gi === curG ? 'aria-current="step"' : ''}${g.i > reach ? ' disabled title="Jawab tebakan dulu"' : ''}>${esc(g.g)}</button>`).join('');
    const vars = A.vars.map(k => { const has = f.vars && f.vars[k] !== undefined, ch = has && (!prev || !prev.vars || prev.vars[k] !== f.vars[k]) && s.k > 0;
      return `<div class="al-var${ch ? ' is-ch' : ''}"><div class="al-var-k">${esc(k)}</div><div class="al-var-v">${has ? esc(f.vars[k]) : '–'}</div></div>`; }).join('');
    const cnt = A.counters.map(k => `<span>${esc(k)}: <b>${f.cnt[k] || 0}</b></span>`).join('') + (s.tebak ? `<span>Tebakan benar: <b>${Object.keys(s.ans).filter(i => s.ans[i] === F[i].q.a).length}/${Object.keys(s.ans).length}</b></span>` : '');
    let guess = '';
    if (s.tebak && f.q) {
      const got = s.ans[s.k];
      guess = `<div class="al-guess" role="group" aria-label="Tebak dulu"><p class="text-sm"><b>Tebak dulu:</b> ${esc(f.q.t)}</p>
        <div class="flex flex-wrap gap-2">${f.q.o.map((o, i) => `<button type="button" ${act(n, 'ans', i)} ${got != null ? 'disabled' : ''} class="al-btn ${got === i ? (i === f.q.a ? 'is-ok' : 'is-no') : got != null && i === f.q.a ? 'is-ok' : ''}">${esc(o)}</button>`).join('')}</div>
        ${got != null ? `<p class="text-sm font-bold ${got === f.q.a ? 'text-emerald-800' : 'text-rose-700'}">${got === f.q.a ? '✓ Tepat.' : '✗ Belum tepat. Lihat penjelasan di atas.'}</p>` : ''}</div>`;
    }
    const last = s.k >= F.length - 1, IN = A.input || {};
    return `<div class="al" data-al="${n}">
      <div class="al-top">${seg('lang', [['cpp', 'C++'], ['ps', 'Pseudocode']], s.lang, 'Bahasa kode')}${seg('mode', [['lihat', 'Lihat'], ['tebak', 'Tebak dulu']], s.tebak ? 'tebak' : 'lihat', 'Mode belajar')}</div>
      <div class="al-grid">
        <div class="al-col">
          <div class="al-stage">${(A.view || alSvg)(A, s, f)}</div>
          <div class="al-text" aria-live="polite">
            <div class="flex items-center justify-between gap-2"><span class="al-kind ${AL_KIND[f.kind] || ''}">${esc(f.kind)}</span><span class="text-xs text-slate-500 tabular-nums">Langkah ${s.k + 1} dari ${F.length}</span></div>
            <h4 class="font-display font-extrabold text-ink text-lg leading-snug">${locked ? 'Tebak dulu sebelum lanjut' : rich(f.title)}</h4>
            <p class="text-sm sm:text-[15px] text-slate-700 leading-relaxed rich">${locked ? 'Jawab pertanyaan di bawah. Penjelasan langkah ini muncul setelah kamu menjawab.' : rich(f.body)}</p>
            ${f.note && !locked ? `<div class="al-note"><b>${esc(f.note[0])}</b><span class="rich">${rich(f.note[1])}</span></div>` : ''}
          </div>
          ${alNow(A, s, f)}
          ${guess}
          <div class="flex flex-wrap items-center gap-2">
            <button type="button" ${act(n, 'prev')} ${s.k === 0 ? 'disabled' : ''} class="al-btn">← Kembali</button>
            <button type="button" ${act(n, 'next')} ${last || locked ? 'disabled' : ''} class="al-btn is-main">${last ? 'Selesai ✓' : 'Lanjut →'}</button>
            ${last ? `<button type="button" ${act(n, 'go', 0)} class="al-btn">↺ Ulang</button>` : ''}
            <span class="hidden sm:inline text-xs text-slate-500"><kbd>←</kbd> <kbd>→</kbd> pindah langkah</span>
          </div>
          <div class="al-rails" role="group" aria-label="Lompat ke bagian">${rail}</div>
        </div>
        <div class="al-col">
          ${alCode(A, s, f)}
          ${alFull(n, A, s)}
          <div><div class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Isi variabel</div><div class="al-vars">${vars}</div>
            <div class="al-cnt">${cnt}</div></div>
          <form class="al-own" data-al-form="${n}">
            <div class="text-xs font-bold uppercase tracking-wider text-slate-500">Coba datamu sendiri</div>
            <div class="flex flex-wrap gap-2">
              <input data-field="${n}" data-key="data" value="${esc(s.values.data)}" aria-label="${esc(IN.aria || 'Angka, dipisah koma')}" inputmode="${IN.mode || 'numeric'}" autocomplete="off" autocapitalize="off" spellcheck="false" class="al-in flex-[1_1_10rem] min-w-0">
              ${A.target ? `<label class="flex items-center gap-1.5 text-sm font-bold text-ink">${esc(IN.targetLabel || 'x =')}<input data-field="${n}" data-key="target" value="${esc(s.values.target)}" aria-label="${esc(IN.targetAria || 'Angka yang dicari')}" inputmode="numeric" autocomplete="off" class="al-in w-16"></label>` : ''}
            </div>
            <div class="flex flex-wrap gap-2">
              <button type="submit" class="al-btn is-main">Jalankan</button>
              <button type="button" ${act(n, 'acak')} class="al-btn">Acak</button>
              <button type="button" ${act(n, 'awal')} class="al-btn">Contoh awal</button>
            </div>
            <p class="text-xs text-slate-500">${IN.hint ? IN.hint : `3 sampai 8 bilangan bulat 0–99, dipisah koma.${A.sorted ? ' Data otomatis diurutkan dulu, karena pencarian biner butuh data urut.' : ''}`}</p>
            ${s.err ? `<p class="text-sm font-bold text-rose-700" role="alert">${esc(s.err)}</p>` : ''}
          </form>
        </div>
      </div>
    </div>`;
  },
  on: {
    next(d, s) { const F = alFrames(d, s), f = F[s.k]; if (s.k >= F.length - 1 || (s.tebak && f.q && s.ans[s.k] == null)) return false; s.k++; s.anim = true; alSettle(); },
    prev(d, s) { if (s.k <= 0) return false; s.k--; s.anim = true; alSettle(); },
    go(d, s, a) { const F = alFrames(d, s), k = Math.max(0, Math.min(F.length - 1, +a || 0)); if (k > alReach(F, s)) return false; s.k = k; s.anim = true; alSettle(); },
    lang(d, s, a) { s.lang = a === 'ps' ? 'ps' : 'cpp'; },
    mode(d, s, a) { s.tebak = a === 'tebak'; },
    full(d, s) { s.full = !s.full; },
    salin(d, s) { copyText(alProgram(AL_ALGO[d.algo], s).code).then(ok => showToast(ok ? 'Program disalin. Tempel di Dev-C++ atau OnlineGDB.' : 'Gagal menyalin. Pilih kodenya lalu salin manual.', ok ? 'success' : 'error')); return false; },
    ans(d, s, a) { const F = alFrames(d, s); if (!F[s.k].q || s.ans[s.k] != null) return false; s.ans[s.k] = +a; },
    awal(d, s) { const lang = s.lang, tebak = s.tebak, full = s.full; Object.assign(s, ALGO_LAB.init(d), { lang, tebak, full }); },
    acak(d, s) {
      const A = AL_ALGO[d.algo];
      if (A.input && A.input.acak) { const r = A.input.acak(); return void alUse(d, s, r.data, r.target); }
      const len = 6 + Math.floor(Math.random() * 3), pool = [];
      while (pool.length < len) { const v = 1 + Math.floor(Math.random() * 60); if (!pool.includes(v)) pool.push(v); }
      const data = A.sorted ? pool.slice().sort((p, q) => p - q) : pool;
      const target = A.target ? (Math.random() < 0.75 ? data[Math.floor(Math.random() * len)] : 61 + Math.floor(Math.random() * 30)) : undefined;
      alUse(d, s, data, target);
    },
    run(d, s) {
      const A = AL_ALGO[d.algo];
      if (A.input && A.input.parse) {
        const r = A.input.parse(String(s.values.data || ''), String(s.values.target || ''));
        if (r.err) { s.err = r.err; return; }
        return void alUse(d, s, r.data, r.target);
      }
      const raw = String(s.values.data || '').split(/[\s,;]+/).filter(Boolean);
      const nums = raw.map(Number);
      if (nums.length < 3 || nums.length > 8 || nums.some(v => !Number.isInteger(v) || v < 0 || v > 99)) { s.err = 'Isi 3 sampai 8 bilangan bulat dari 0 sampai 99, dipisah koma. Contoh: 7, 3, 9, 1'; return; }
      let target;
      if (A.target) { target = Number(String(s.values.target || '').trim()); if (String(s.values.target || '').trim() === '' || !Number.isInteger(target) || target < 0 || target > 99) { s.err = 'Isi angka yang dicari (x) dengan bilangan bulat 0–99.'; return; } }
      alUse(d, s, A.sorted ? nums.slice().sort((p, q) => p - q) : nums, target);
    }
  }
};
const alFmt = (A, data) => A.input && A.input.fmt ? A.input.fmt(data) : (data || []).join(', ');
function alUse(d, s, data, target) {
  s.data = data; s.target = target; s.F = null; s.k = 0; s.ans = {}; s.err = ''; s.pos = null; s.anim = false;
  s.values = { data: alFmt(AL_ALGO[d.algo] || {}, data), target: target != null ? String(target) : '' };
}
// Batang digambar di posisi lama lalu digeser ke posisi baru (CSS transition), sehingga pertukaran terlihat bergerak.
function alSettle() {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelectorAll('.al-svg [data-tx]').forEach(g => { g.style.transform = `translate(${g.dataset.tx}px,${g.dataset.ty}px)`; });
    // Rel yang bisa digeser (HP): tampilkan tombol bagian yang sedang aktif
    document.querySelectorAll('.al-rails').forEach(r => { const on = r.querySelector('.is-on'); if (!on || r.scrollWidth <= r.clientWidth) return;
      const a = r.getBoundingClientRect(), b = on.getBoundingClientRect(); r.scrollLeft += (b.left + b.width / 2) - (a.left + a.width / 2); });
  }));
}
// Kirim formulir "Coba datamu sendiri" (tombol Jalankan atau Enter)
document.addEventListener('submit', e => {
  const form = e.target.closest && e.target.closest('[data-al-form]'); if (!form) return;
  e.preventDefault();
  const n = +form.dataset.alForm, b = BLOCKS[n]; if (!b) return;
  form.querySelectorAll('[data-field]').forEach(el => { b.state.values[el.dataset.key] = el.value; });
  ALGO_LAB.on.run(b.def, b.state); markInteract(n); refreshBlock(n);
  const again = document.querySelector(`#blk-${n} [data-al-form] button[type="submit"]`); if (again) again.focus({ preventScroll: true });
});
// Tombol panah kiri/kanan saat fokus ada di dalam lab (kecuali sedang mengetik)
document.addEventListener('keydown', e => {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
  if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
  const t = e.target; if (!t || !t.closest || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
  const box = t.closest('[id^="blk-"]'), n = box && +box.id.slice(4), b = n && BLOCKS[n];
  if (!b || b.def.type !== 'algo-lab') return;
  e.preventDefault();
  const res = ALGO_LAB.on[e.key === 'ArrowRight' ? 'next' : 'prev'](b.def, b.state);
  if (res === false) return;
  markInteract(n); refreshBlock(n);
  box.tabIndex = -1; box.focus({ preventScroll: true });
});
// Setelah klik tombol, blok digambar ulang. Kembalikan fokus ke tombol yang sama supaya panah dan Tab tetap jalan.
document.addEventListener('click', e => {
  const el = e.target.closest && e.target.closest('.al [data-act]'); if (!el) return;
  const n = el.dataset.blk, a = el.dataset.act, arg = el.dataset.arg;
  setTimeout(() => {
    const box = document.getElementById('blk-' + n); if (!box || box.contains(document.activeElement) && document.activeElement !== document.body) return;
    const same = box.querySelector(`[data-act="${a}"][data-arg="${CSS.escape(arg)}"]:not([disabled])`);
    if (same) same.focus({ preventScroll: true }); else { box.tabIndex = -1; box.focus({ preventScroll: true }); }
  }, 0);
});
