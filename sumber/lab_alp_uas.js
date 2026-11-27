// Lab Algoritma P9–P15 (menuju UAS): penelusur C++ langkah demi langkah (blok "trace-lab").
// Memakai mesin yang sama dengan P3–P7 (lab_alp.js): jejak dibekukan saat build, tidak menjalankan compiler sungguhan.
// Array disimpan di luar v (closure) lalu ditampilkan sebagai teks {a, b, c} supaya panel Keadaan mudah dibaca.
const { lab, out } = require('./lab_alp.js');

const fmt = a => '{' + a.map(x => (x === undefined ? '?' : x)).join(', ') + '}';

// ---------- P9: array ----------
function salinArray() {
  const a = [undefined, undefined, undefined, undefined, undefined], b = [1, 2, 3, 4, 5];
  return {
    kind: 'for', vars: {},
    code: ['unsigned int a[5], b[5] = {1, 2, 3, 4, 5};', 'int i;', 'for (i = 0; i < 5; i++)', '{', '    a[ i ] = b[ i ];', '}'],
    before: [
      { line: 0, part: 'a[5], b[5] = {1, 2, 3, 4, 5}', run: () => ({ set: { a: fmt(a), b: fmt(b) } }), note: '<code>a</code> hanya dideklarasikan, isinya belum ditentukan (ditandai ?). <code>b</code> langsung diinisialisasi.' },
      { line: 1, part: 'int i;', run: () => ({}), note: 'Penghitung loop sekaligus indeks.' },
      { line: 2, part: 'i = 0', run: () => ({ set: { i: 0 } }), note: 'Indeks pertama array selalu 0.' }
    ],
    cond: { line: 2, part: 'i < 5', text: v => `${v.i} < 5`, test: v => v.i < 5 },
    body: [{ line: 4, part: 'a[ i ] = b[ i ];', run: v => { a[v.i] = b[v.i]; return { set: { a: fmt(a) } }; }, note: v => `Elemen <code>b[${v.i}]</code> (${b[v.i]}) disalin ke <code>a[${v.i}]</code>. Satu putaran = satu elemen.` }],
    step: { line: 2, part: 'i++', run: v => { v.i++; } }
  };
}

function vektor() {
  const a = [1, 3, 5, 7, 9], b = [2, 4, 6, 8, 10], c = [undefined, undefined, undefined, undefined, undefined];
  return {
    kind: 'for', vars: {},
    code: ['int a[5] = {1, 3, 5, 7, 9};', 'int b[5] = {2, 4, 6, 8, 10};', 'int c[5];', 'for (int j = 0; j < 5; j++)', '{', '    c[ j ] = b[ j ] + a[ j ];', '    cout << c[ j ] << " ";   // ➕ supaya hasilnya terlihat', '}'],
    before: [
      { line: 0, part: 'int a[5] = {1, 3, 5, 7, 9};', run: () => ({ set: { a: fmt(a) } }), note: 'Vektor a dari slide.' },
      { line: 1, part: 'int b[5] = {2, 4, 6, 8, 10};', run: () => ({ set: { b: fmt(b) } }), note: 'Vektor b dari slide.' },
      { line: 2, part: 'int c[5];', run: () => ({ set: { c: fmt(c) } }), note: 'Tempat hasil. Ukurannya harus sama, 5 elemen.' },
      { line: 3, part: 'int j = 0', run: () => ({ set: { j: 0 } }), note: 'Mulai dari indeks 0.' }
    ],
    cond: { line: 3, part: 'j < 5', text: v => `${v.j} < 5`, test: v => v.j < 5 },
    body: [
      { line: 5, part: 'c[ j ] = b[ j ] + a[ j ];', run: v => { c[v.j] = b[v.j] + a[v.j]; return { set: { c: fmt(c) } }; }, note: v => `c[${v.j}] = b[${v.j}] + a[${v.j}] = ${b[v.j]} + ${a[v.j]} = <strong>${c[v.j]}</strong>.` },
      { line: 6, part: 'cout << c[ j ] << " ";', run: v => out(c[v.j] + ' '), note: v => `Mencetak ${c[v.j]}.` }
    ],
    step: { line: 3, part: 'j++', run: v => { v.j++; } }
  };
}

function luarBatas() {
  const l = [];
  const show = () => ({ set: { larik: fmt(l.slice(0, 10)) } });
  return {
    kind: 'seq', vars: {},
    code: ['int larik[10];        // indeks 0 – 9', 'larik[2] = 7;', 'larik[8] = 1;          // benar', 'larik[9] = larik[2];   // benar', 'larik[10] = 2;         // SALAH: indeks 10 tidak ada'],
    before: [
      { line: 0, part: 'int larik[10];', run: () => { for (let i = 0; i < 10; i++) l[i] = undefined; return show(); }, note: 'Sepuluh elemen: indeksnya 0 sampai 9, bukan 1 sampai 10.' },
      { line: 1, part: 'larik[2] = 7;', run: () => { l[2] = 7; return show(); }, note: '➕ Diisi dulu supaya baris berikutnya punya nilai untuk disalin.' },
      { line: 2, part: 'larik[8] = 1;', run: () => { l[8] = 1; return show(); }, note: 'Indeks 8 masih di dalam 0–9: aman.' },
      { line: 3, part: 'larik[9] = larik[2];', run: () => { l[9] = l[2]; return show(); }, note: 'Indeks 9 adalah elemen <strong>terakhir</strong>. Nilai larik[2] (7) disalin ke sana.', tag: 'akhir' },
      { line: 4, part: 'larik[10] = 2;', run: () => ({}), note: 'Indeks 10 berada <strong>di luar</strong> array. Compiler C++ tidak menolaknya, tetapi angka 2 ditulis ke memori milik variabel lain (perilaku tak terdefinisi): program bisa tampak normal, menghasilkan nilai aneh, atau crash.', tag: 'luar' }
    ],
    summary: () => 'Array berukuran 10 punya indeks 0–9. Menulis ke indeks 10 tidak dicegah compiler, jadi batasnya harus dijaga sendiri, misalnya dengan <code>i &lt; 10</code> di loop.'
  };
}

const P9 = lab([
  {
    label: 'Salin array b ke a',
    intro: 'Masalah 1 dari slide: <code>a = b;</code> tidak boleh, jadi elemen disalin satu per satu dengan for.',
    panes: [salinArray()],
    asks: [
      { at: 'body-first', q: 'Putaran pertama, i = 0. Elemen mana yang disalin?', opts: ['b[0] → a[0], nilai 1', 'b[1] → a[1], nilai 2', 'Semua elemen sekaligus'], ans: 0, why: 'Indeks dimulai dari 0. Satu putaran menyalin satu elemen.' },
      { at: 'cond-last', q: 'i sudah 5. Kondisi i < 5 bernilai?', opts: ['true', 'false'], ans: 1, why: 'Indeks terakhir array 5 elemen adalah 4. Kalau kondisinya i <= 5, loop akan menyentuh a[5] yang berada di luar array.' }
    ]
  },
  {
    label: 'Penjumlahan vektor',
    intro: 'Masalah 2 dari slide: <code>c = b + a</code> juga harus dikerjakan per elemen.',
    panes: [vektor()],
    asks: [
      { at: 'start', q: 'Tebak isi c setelah loop selesai.', opts: ['3 7 11 15 19', '1 3 5 7 9 2 4 6 8 10', '55', '2 4 6 8 10'], ans: 0, why: 'Elemen yang indeksnya sama dijumlahkan: 2+1, 4+3, 6+5, 8+7, 10+9.' }
    ]
  },
  {
    label: 'Indeks di luar batas',
    intro: 'Contoh slide <code>int larik[10];</code>: mana pengaksesan yang benar dan mana yang salah.',
    panes: [luarBatas()],
    asks: [
      { at: 'luar', q: 'Baris berikutnya: larik[10] = 2;. Apa yang terjadi?', opts: ['Error kompilasi', 'Compiler membiarkannya; menulis ke memori di luar array', 'Array otomatis membesar jadi 11'], ans: 1, why: 'C++ tidak memeriksa batas indeks. Itu sebabnya slide menyebutnya pengaksesan yang salah, padahal programnya tetap bisa dikompilasi. Ukuran array tidak bisa berubah.' }
    ]
  }
]);

// ---------- P10: struct ----------
function structIsi() {
  return {
    kind: 'seq', vars: {},
    code: ['struct siswa {', '    int no_induk;', '    string nama;', '    float nilai;', '};', 'siswa budi, tono;', 'budi.no_induk = 1;', 'budi.nama = "Budi Januar";', 'budi.nilai = 75.5;', 'tono.no_induk = 2;', 'tono.nama = "Tono Laksono";', 'tono.nilai = 89.9;', 'cout << budi.nama << " mendapatkan nilai " << budi.nilai << endl;', 'cout << tono.nama << " mendapatkan nilai " << tono.nilai << endl;'],
    before: [
      { line: 0, part: 'struct siswa {', run: () => ({}), note: 'Hanya <strong>rancangan</strong> tipe data baru bernama <code>siswa</code>. Belum ada memori untuk data siapa pun.', tag: 'rancang' },
      { line: 5, part: 'siswa budi, tono;', run: () => ({ set: { 'budi.no_induk': '?', 'budi.nama': '""', 'budi.nilai': '?', 'tono.no_induk': '?', 'tono.nama': '""', 'tono.nilai': '?' } }), note: 'Dua <strong>object</strong> dibuat. Masing-masing punya salinan tiga member sendiri. <code>string</code> otomatis kosong, int dan float belum ditentukan (?).', tag: 'object' },
      { line: 6, part: 'budi.no_induk = 1;', run: () => ({ set: { 'budi.no_induk': 1 } }), note: 'Operator titik <code>.</code> (member access) memilih member milik object <code>budi</code>.' },
      { line: 7, part: 'budi.nama = "Budi Januar";', run: () => ({ set: { 'budi.nama': '"Budi Januar"' } }), note: 'Member string diisi teks.' },
      { line: 8, part: 'budi.nilai = 75.5;', run: () => ({ set: { 'budi.nilai': 75.5 } }), note: 'Member float diisi bilangan pecahan.' },
      { line: 9, part: 'tono.no_induk = 2;', run: () => ({ set: { 'tono.no_induk': 2 } }), note: 'Object <code>tono</code> punya member sendiri. Mengisi tono tidak mengubah budi.', tag: 'tono' },
      { line: 10, part: 'tono.nama = "Tono Laksono";', run: () => ({ set: { 'tono.nama': '"Tono Laksono"' } }) },
      { line: 11, part: 'tono.nilai = 89.9;', run: () => ({ set: { 'tono.nilai': 89.9 } }) },
      { line: 12, part: 'cout << budi.nama', run: () => out('Budi Januar mendapatkan nilai 75.5\n'), note: 'Member dibaca dengan cara yang sama: nama object, titik, nama member.' },
      { line: 13, part: 'cout << tono.nama', run: () => out('Tono Laksono mendapatkan nilai 89.9\n') }
    ],
    summary: () => 'Satu rancangan <code>struct siswa</code>, dua object. Setiap object menyimpan no_induk, nama, dan nilai miliknya sendiri.'
  };
}

function structAwal() {
  return {
    kind: 'seq', vars: {},
    code: ['struct siswa {', '    int no_induk = 0;', '    string nama = "kosong";', '    float nilai = 0;', '};', 'siswa budi{1, "Budi Januar", 75.5};  // C++14 ke atas', 'siswa tono;', 'cout << budi.nama << " mendapatkan nilai " << budi.nilai << endl;', 'cout << tono.nama << " mendapatkan nilai " << tono.nilai << endl;'],
    before: [
      { line: 1, part: 'int no_induk = 0;', run: () => ({}), note: '<strong>Non-static member initialization</strong>: nilai awal ditulis langsung di rancangan, jadi berlaku untuk <em>semua</em> object yang tidak diberi nilai lain.' },
      { line: 5, part: 'siswa budi{1, "Budi Januar", 75.5};', run: () => ({ set: { 'budi.no_induk': 1, 'budi.nama': '"Budi Januar"', 'budi.nilai': 75.5 } }), note: '<strong>Uniform initialization</strong> (tanpa =) menimpa nilai bawaan, hanya untuk object budi. Menggabungkan cara ini dengan nilai bawaan di rancangan baru boleh sejak C++14.', tag: 'budi' },
      { line: 6, part: 'siswa tono;', run: () => ({ set: { 'tono.no_induk': 0, 'tono.nama': '"kosong"', 'tono.nilai': 0 } }), note: 'tono tidak diberi nilai apa pun, jadi memakai nilai bawaan dari rancangan.', tag: 'tono' },
      { line: 7, part: 'cout << budi.nama', run: () => out('Budi Januar mendapatkan nilai 75.5\n') },
      { line: 8, part: 'cout << tono.nama', run: () => out('kosong mendapatkan nilai 0\n') }
    ],
    summary: () => 'Nilai di dalam rancangan = nilai bawaan semua object. Nilai di kurung kurawal saat membuat object = khusus object itu.'
  };
}

const P10 = lab([
  {
    label: 'Isi member satu per satu',
    intro: 'Contoh program slide: rancangan <code>siswa</code>, dua object, lalu member diisi dengan operator titik.',
    panes: [structIsi()],
    asks: [
      { at: 'object', q: 'Baris struct siswa { … }; sudah dibaca. Berapa data siswa yang sudah tersimpan di memori?', opts: ['Belum ada, struct hanya rancangan', 'Satu', 'Tiga, sesuai jumlah member'], ans: 0, why: 'Memori baru disiapkan saat object dibuat: siswa budi, tono;' },
      { at: 'tono', q: 'Setelah tono.no_induk = 2;, berapa nilai budi.no_induk?', opts: ['1', '2', '0'], ans: 0, why: 'Tiap object punya member sendiri. Mengubah tono tidak menyentuh budi.' }
    ]
  },
  {
    label: 'Nilai awal di rancangan',
    intro: 'Gabungan non-static member initialization dan uniform initialization.',
    panes: [structAwal()],
    asks: [
      { at: 'start', q: 'Tebak baris kedua output (milik tono).', opts: ['kosong mendapatkan nilai 0', 'Budi Januar mendapatkan nilai 75.5', 'Error: tono belum diisi', 'mendapatkan nilai'], ans: 0, why: 'tono tidak diberi nilai, jadi memakai nilai bawaan dari rancangan: "kosong" dan 0.' }
    ]
  }
]);

// ---------- P11: rekursi ----------
// Membangun jejak rekursi menjadi daftar statement berurutan (setiap panggilan dan setiap kembali = satu langkah).
function faktorial(N) {
  const st = [], stack = [];
  const tumpuk = () => (stack.length ? stack.map(k => `factorial(${k})`).join(' → ') : '(kosong)');
  st.push({ line: 6, part: 'int n = 3;', run: () => ({ set: { tumpukan: 'main', n: N } }), note: `main menyiapkan n = ${N}.` });
  const call = k => {
    stack.push(k);
    const snap = tumpuk(), first = stack.length === 1;
    st.push({ line: first ? 7 : 2, part: first ? 'factorial(n)' : 'factorial(n-1)', run: () => ({ set: { tumpukan: 'main → ' + snap, n: k } }),
      note: `Memanggil <code>factorial(${k})</code>. Panggilan baru ditumpuk di atas yang lama; ${stack.length > 1 ? `factorial(${stack[stack.length - 2]}) <strong>menunggu</strong> hasilnya.` : 'main menunggu hasilnya.'}`, tag: first ? 'panggil-1' : 'panggil' });
    const base = k === 0;
    st.push({ line: 1, part: 'n == 0', run: () => ({}), c: { text: () => `${k} == 0`, test: () => base }, note: base ? `${k} == 0 benar: <strong>base case</strong>. Tidak ada panggilan lagi, kembalikan 1.` : `${k} == 0 salah, jadi lanjut ke rekursive case di baris berikutnya.`, tag: base ? 'base' : 'cek' });
    let hasil;
    if (base) hasil = 1;
    else { const r = call(k - 1); hasil = k * r;
      st.push({ line: 2, part: 'n * factorial(n-1)', run: () => ({ set: { tumpukan: 'main → ' + stack.slice(0, stack.indexOf(k) + 1).map(x => `factorial(${x})`).join(' → '), n: k, kembali: hasil } }), note: `Hasil factorial(${k - 1}) = ${r} sudah datang. factorial(${k}) menghitung ${k} × ${r} = <strong>${hasil}</strong> lalu mengembalikannya.`, tag: k === N ? 'akhir' : 'balik' }); }
    if (base) st.push({ line: 1, part: 'return 1;', run: () => ({ set: { kembali: 1 } }), note: 'factorial(0) mengembalikan 1 ke pemanggilnya dan dikeluarkan dari tumpukan.' });
    stack.pop();
    return hasil;
  };
  const h = call(N);
  st.push({ line: 7, part: 'cout << n << "! = " << factorial(n) << endl;', run: () => ({ set: { tumpukan: 'main', n: N }, out: `${N}! = ${h}\n` }), note: 'Semua panggilan sudah selesai, tumpukan kembali hanya berisi main. Hasilnya dicetak.' });
  return {
    kind: 'seq', vars: {},
    code: ['int factorial(int n) {', '    if (n == 0) return 1;', '    return n * factorial(n-1);', '}', '', 'int main() {', '    int n = 3;', '    cout << n << "! = " << factorial(n) << endl;', '    return 0;', '}'],
    before: st,
    summary: () => `${N + 1} panggilan (factorial(${N}) sampai factorial(0)). Turun dulu sampai base case, lalu hasilnya dikalikan saat kembali naik: ${Array.from({ length: N }, (_, i) => N - i).join(' × ')} × 1 = ${h}.`
  };
}

function fibonacci(N) {
  const st = []; let calls = 0;
  const go = (k, depth, dari) => {
    calls++;
    const nomor = calls;
    st.push({ line: depth ? 3 : 8, part: depth ? 'fibonacci(n-' + dari + ')' : 'fibonacci(4)', run: () => ({ set: { n: k, panggilan: nomor } }), note: `Panggilan ke-${nomor}: <code>fibonacci(${k})</code>${depth ? '' : ' dari main'}.`, tag: nomor === 1 ? 'mulai' : 'panggil' });
    if (k <= 1) {
      st.push({ line: 2, part: 'if (n <= 1) return n;', run: () => ({ set: { kembali: k } }), c: { text: () => `${k} <= 1`, test: () => true }, note: `${k} <= 1: base case, langsung kembalikan ${k}.`, tag: 'base' });
      return k;
    }
    st.push({ line: 2, part: 'n <= 1', run: () => ({}), c: { text: () => `${k} <= 1`, test: () => false }, note: `${k} <= 1 salah. Fungsi akan memanggil fibonacci(${k - 1}) dulu, baru fibonacci(${k - 2}).` });
    const a = go(k - 1, depth + 1, 1), b = go(k - 2, depth + 1, 2);
    st.push({ line: 3, part: 'fibonacci(n-1) + fibonacci(n-2)', run: () => ({ set: { n: k, kembali: a + b } }), note: `fibonacci(${k}) = fibonacci(${k - 1}) + fibonacci(${k - 2}) = ${a} + ${b} = <strong>${a + b}</strong>.` });
    return a + b;
  };
  const h = go(N, 0);
  st.push({ line: 8, part: 'cout << fibonacci(4);', run: () => ({ out: String(h) }), note: `Hasil akhir ${h}, setelah ${calls} kali pemanggilan.`, tag: 'akhir' });
  return {
    kind: 'seq', vars: {},
    code: ['int fibonacci(int n) {', '    // base case', '    if (n <= 1) return n;', '    return fibonacci(n-1) + fibonacci(n-2);', '}', '', 'int main() {', '    // ➕ satu panggilan saja supaya jejaknya pendek', '    cout << fibonacci(4);', '}'],
    before: st,
    summary: () => `fibonacci(4) = ${h}, tetapi butuh ${calls} pemanggilan. fibonacci(2) dihitung 2 kali, fibonacci(1) 3 kali, fibonacci(0) 2 kali: inilah sebab fibonacci rekursif lambat untuk n besar.`
  };
}

const P11 = lab([
  {
    label: 'factorial(3)',
    intro: 'Contoh "Factorial (Stacking)" dari slide. Perhatikan baris <strong>tumpukan</strong>: panggilan menumpuk saat turun, lalu dibongkar saat kembali.',
    panes: [faktorial(3)],
    asks: [
      { at: 'start', q: 'Tebak output program.', opts: ['3! = 6', '3! = 3', '3! = 0', 'Program tidak berhenti'], ans: 0, why: '3 × 2 × 1 × 1 = 6. Base case n == 0 menghentikan rekursi.' },
      { at: 'base', q: 'Sekarang n = 0. Apa yang terjadi?', opts: ['Base case: kembalikan 1, rekursi berhenti', 'Memanggil factorial(-1)', 'Kembalikan 0'], ans: 0, why: 'if (n == 0) return 1; adalah base case. Kalau ditulis return 0, semua hasil perkalian ikut menjadi 0.' },
      { at: 'akhir', q: 'factorial(3) menerima hasil factorial(2). Berapa yang dikembalikannya?', opts: ['6', '3', '2'], ans: 0, why: '3 × factorial(2) = 3 × 2 = 6.' }
    ]
  },
  {
    label: 'fibonacci(4)',
    intro: 'Contoh "Fibonacci (Branching)": setiap panggilan yang bukan base case bercabang menjadi dua.',
    panes: [fibonacci(4)],
    asks: [
      { at: 'start', q: 'Berapa kali fungsi fibonacci dipanggil untuk menghitung fibonacci(4)?', opts: ['9 kali', '4 kali', '5 kali', '16 kali'], ans: 0, why: 'Pohon panggilan: fib(4) → fib(3), fib(2); fib(3) → fib(2), fib(1); dan seterusnya. Totalnya 9.' }
    ]
  }
]);

// ---------- P12: parameter dan variabel static ----------
function parameter() {
  return {
    kind: 'seq', vars: {},
    code: ['int jumlah(int a, int b);     // prototipe', 'int a, b, c;                  // variabel global', 'int main() {', '    a = 4; b = 6;             // anggap ini hasil scanf', '    c = jumlah(a, b);         // a, b = parameter aktual', '    printf("Hasil Penjumlahan= %d", c);', '}', 'int jumlah(int x, int y) {   // x, y = parameter formal', '    return (x + y);', '}'],
    before: [
      { line: 0, part: 'int jumlah(int a, int b);', run: () => ({}), note: '<strong>Prototipe</strong>: memberi tahu compiler nama fungsi, tipe parameter, dan tipe hasilnya, karena definisinya baru ada di bawah main.' },
      { line: 1, part: 'int a, b, c;', run: () => ({ set: { a: 0, b: 0, c: 0 } }), note: 'Variabel global (di luar semua fungsi) otomatis bernilai 0.' },
      { line: 3, part: 'a = 4; b = 6;', run: () => ({ set: { a: 4, b: 6 } }), note: 'Pengguna mengetik 4 dan 6.' },
      { line: 4, part: 'jumlah(a, b)', run: () => ({}), note: 'Pemanggilan. <code>a</code> dan <code>b</code> di sini adalah <strong>parameter aktual</strong>: nilai yang dikirim.', tag: 'panggil' },
      { line: 7, part: 'int x, int y', run: () => ({ set: { x: 4, y: 6 } }), note: 'Nilai aktual <strong>disalin</strong> ke parameter formal: x = 4, y = 6. x dan y hanya hidup selama fungsi berjalan.', tag: 'salin' },
      { line: 8, part: 'return (x + y);', run: () => ({ set: { kembali: 10 } }), note: 'Fungsi mengembalikan 10 ke tempat pemanggilannya.' },
      { line: 4, part: 'c = jumlah(a, b);', run: () => ({ set: { c: 10, x: '—', y: '—' } }), note: 'Nilai kembali disimpan di c. Fungsi selesai, jadi x dan y sudah tidak ada (—).' },
      { line: 5, part: 'printf("Hasil Penjumlahan= %d", c);', run: () => out('Hasil Penjumlahan= 10') }
    ],
    summary: () => 'Parameter aktual (a, b) = yang ditulis saat memanggil. Parameter formal (x, y) = yang ditulis di definisi fungsi. Nilainya disalin, jadi namanya boleh berbeda.'
  };
}

function statik(pakaiStatic) {
  let f = 1;
  const line = pakaiStatic ? '    static long int fakto = 1;' : '    long int fakto = 1;          // tanpa static';
  return {
    title: pakaiStatic ? 'Dengan static (slide)' : 'Tanpa static',
    kind: 'for', vars: {},
    code: ['long int faktorial(int n) {', line, '    fakto = fakto * n;', '    return (fakto);', '}', '// di main, bil = 4:', 'for (i = 1; i <= bil; i++)', '    hasil = faktorial(i);'],
    before: [{ line: 6, part: 'i = 1', run: () => ({ set: { i: 1, fakto: pakaiStatic ? 1 : '—' } }), note: pakaiStatic ? 'Variabel static dibuat <strong>sekali</strong> saat program mulai, bernilai 1.' : 'Belum ada fakto: variabel lokal baru dibuat saat fungsi dipanggil.' }],
    cond: { line: 6, part: 'i <= bil', text: v => `${v.i} <= 4`, test: v => v.i <= 4 },
    body: [
      { line: 1, part: pakaiStatic ? 'static long int fakto = 1;' : 'long int fakto = 1;', run: () => { if (!pakaiStatic) f = 1; return { set: { fakto: f } }; }, note: pakaiStatic ? v => (v.i === 1 ? 'Inisialisasi static hanya berlaku sekali, di panggilan pertama.' : `Baris ini <strong>dilewati</strong>: fakto tetap ${f} dari panggilan sebelumnya.`) : 'Setiap panggilan membuat fakto baru bernilai 1.' },
      { line: 2, part: 'fakto = fakto * n;', run: v => { f = f * v.i; return { set: { fakto: f } }; }, note: v => `fakto = fakto × ${v.i} = ${f}.` },
      { line: 7, part: 'hasil = faktorial(i);', run: () => ({ set: { hasil: f } }), note: v => `faktorial(${v.i}) mengembalikan ${f}.` }
    ],
    step: { line: 6, part: 'i++', run: v => { v.i++; } },
    after: [{ line: 7, part: 'hasil', run: v => ({ out: `Faktorial 4 = ${v.hasil}` }), note: pakaiStatic ? 'Hasil benar: 4! = 24.' : 'Hasil salah: hanya 4, karena fakto selalu mulai lagi dari 1.' }]
  };
}

const P12 = lab([
  {
    label: 'Parameter formal & aktual',
    intro: 'Program penjumlahan dari slide. Perhatikan kapan x dan y muncul dan hilang.',
    panes: [parameter()],
    asks: [
      { at: 'salin', q: 'Masuk ke fungsi jumlah. Berapa nilai x dan y?', opts: ['x = 4, y = 6', 'x = 0, y = 0', 'x dan y belum ada'], ans: 0, why: 'Nilai parameter aktual (a = 4, b = 6) disalin ke parameter formal sesuai urutannya.' }
    ]
  },
  {
    label: 'static vs lokal biasa',
    intro: 'Contoh variabel static dari slide (bil = 4), dibandingkan dengan versi tanpa <code>static</code>.',
    panes: [statik(true), statik(false)],
    asks: [
      { at: 'start', q: 'Tebak hasil akhir masing-masing: dengan static | tanpa static.', opts: ['24 | 4', '24 | 24', '4 | 24', '1 | 1'], ans: 0, why: 'static menyimpan fakto antarpanggilan: 1, 2, 6, 24. Tanpa static, fakto mulai dari 1 setiap panggilan, jadi hasilnya hanya 1 × n = 4.' }
    ]
  }
]);

// ---------- P13: algoritma Euclid (FPB) ----------
function euclid(m0, n0) {
  return {
    kind: 'while', vars: {},
    code: ['// Algoritma Euclidean(m, n)', 'while (n != 0) {', '    r = m % n;', '    m = n;', '    n = r;', '}', 'cout << m;   // FPB'],
    before: [{ line: 0, part: '// Algoritma Euclidean(m, n)', run: () => ({ set: { m: m0, n: n0 } }), note: `Masukan: m = ${m0}, n = ${n0}.` }],
    cond: { line: 1, part: 'n != 0', text: v => `${v.n} != 0`, test: v => v.n !== 0 },
    body: [
      { line: 2, part: 'r = m % n;', run: v => ({ set: { r: v.m % v.n } }), note: v => `Sisa bagi ${v.m} : ${v.n} adalah ${v.m % v.n}.` },
      { line: 3, part: 'm = n;', run: v => ({ set: { m: v.n } }), note: 'Nilai n pindah ke m.' },
      { line: 4, part: 'n = r;', run: v => ({ set: { n: v.r } }), note: 'Sisa bagi menjadi n yang baru.' }
    ],
    after: [{ line: 6, part: 'cout << m;', run: v => out(String(v.m)), note: v => `n sudah 0, jadi FPB = m = <strong>${v.m}</strong>.` }]
  };
}

const P13 = lab([
  {
    label: 'FPB(60, 24)',
    intro: 'Contoh algoritma di awal slide P13: langkah 1–3 Euclid ditulis sebagai while.',
    panes: [euclid(60, 24)],
    asks: [
      { at: 'start', q: 'Tebak FPB(60, 24).', opts: ['12', '6', '24', '4'], ans: 0, why: '60 mod 24 = 12, lalu 24 mod 12 = 0. Saat n = 0, m = 12.' },
      { at: 'cond-last', q: 'n sekarang 0. Loop berhenti?', opts: ['Ya, FPB adalah nilai m', 'Tidak, bagi lagi dengan 0'], ans: 0, why: 'Langkah 1 Euclid: jika n = 0, FPB adalah m. Membagi dengan 0 tidak boleh.' }
    ]
  }
]);

// ---------- P14–P15: sequential search ----------
function seqSearch(A, K, opt = {}) {
  const n = A.length;
  return {
    title: opt.title,
    kind: 'while', vars: {},
    code: ['// SequentialSearch(A[0..n-1], K)', `int A[${n}] = ${fmt(A)}; int n = ${n}, K = ${K};`, 'int i = 0;', 'while (i < n && A[i] != K)', '    i = i + 1;', 'if (i < n) cout << i;', 'else cout << -1;'],
    before: [
      { line: 1, part: `int A[${n}]`, run: () => ({ set: { A: fmt(A), K } }), note: `Data ${fmt(A)}, kunci K = ${K}.` },
      { line: 2, part: 'int i = 0;', run: () => ({ set: { i: 0 } }), note: 'Mulai dari elemen pertama.' }
    ],
    cond: { line: 3, part: 'i < n && A[i] != K', text: v => (v.i < n ? `${v.i} < ${n} && ${A[v.i]} != ${K}` : `${v.i} < ${n}`), test: v => v.i < n && A[v.i] !== K },
    body: [{ line: 4, part: 'i = i + 1;', run: v => ({ set: { i: v.i + 1 } }), note: v => `A[${v.i}] = ${A[v.i]} bukan ${K}. Geser ke elemen berikutnya.` }],
    after: [
      { line: 5, part: 'i < n', if: { text: v => `${v.i} < ${n}`, test: v => v.i < n }, then: [{ line: 5, part: 'cout << i;', run: v => out(String(v.i)), note: v => `Ketemu di indeks ${v.i}.` }], else: [{ line: 6, part: 'cout << -1;', run: () => out('-1'), note: 'i sampai n: semua elemen sudah dibandingkan dan tidak ada yang cocok.' }] }
    ]
  };
}

function seqSentinel(A, K, opt = {}) {
  const n = A.length, T = A.concat([undefined]);
  return {
    title: opt.title,
    kind: 'while', vars: {},
    code: ['// Sequential search dengan sentinel', `int A[${n + 1}] = ${fmt(A)}; int n = ${n}, K = ${K};  // 1 tempat cadangan`, 'A[n] = K;          // sentinel', 'int i = 0;', 'while (A[i] != K)', '    i = i + 1;', 'if (i < n) cout << i;', 'else cout << -1;'],
    before: [
      { line: 1, part: `int A[${n + 1}]`, run: () => ({ set: { A: fmt(T), K } }), note: `Array disiapkan ${n + 1} tempat: ${n} data + 1 tempat untuk sentinel.` },
      { line: 2, part: 'A[n] = K;', run: () => { T[n] = K; return { set: { A: fmt(T) } }; }, note: `K ditaruh di A[${n}], setelah elemen terakhir. Sekarang pencarian <strong>pasti</strong> berhenti.`, tag: 'sentinel' },
      { line: 3, part: 'int i = 0;', run: () => ({ set: { i: 0 } }) }
    ],
    cond: { line: 4, part: 'A[i] != K', text: v => `${T[v.i]} != ${K}`, test: v => T[v.i] !== K },
    body: [{ line: 5, part: 'i = i + 1;', run: v => ({ set: { i: v.i + 1 } }), note: v => `A[${v.i}] = ${T[v.i]} bukan ${K}. Geser.` }],
    after: [
      { line: 6, part: 'i < n', if: { text: v => `${v.i} < ${n}`, test: v => v.i < n }, then: [{ line: 6, part: 'cout << i;', run: v => out(String(v.i)), note: v => `Cocok di indeks ${v.i}, masih di dalam data asli: ketemu.` }], else: [{ line: 7, part: 'cout << -1;', run: () => out('-1'), note: `Yang cocok hanyalah sentinel di A[${n}], jadi K sebenarnya tidak ada.` }], tag: 'cek-posisi' }
    ]
  };
}

function seqUrut(A, K) {
  const n = A.length;
  return {
    kind: 'while', vars: {},
    code: ['// ➕ Data sudah diurutkan naik (Latihan 2)', `int A[${n}] = ${fmt(A)}; int n = ${n}, K = ${K};`, 'int i = 0;', 'while (i < n && A[i] < K)', '    i = i + 1;', 'if (i < n && A[i] == K) cout << i;', 'else cout << -1;'],
    before: [
      { line: 1, part: `int A[${n}]`, run: () => ({ set: { A: fmt(A), K } }), note: `Data sudah urut naik, kunci K = ${K}.` },
      { line: 2, part: 'int i = 0;', run: () => ({ set: { i: 0 } }) }
    ],
    cond: { line: 3, part: 'i < n && A[i] < K', text: v => (v.i < n ? `${v.i} < ${n} && ${A[v.i]} < ${K}` : `${v.i} < ${n}`), test: v => v.i < n && A[v.i] < K },
    body: [{ line: 4, part: 'i = i + 1;', run: v => ({ set: { i: v.i + 1 } }), note: v => `${A[v.i]} masih lebih kecil dari ${K}, lanjut.` }],
    after: [
      { line: 5, part: 'i < n && A[i] == K', if: { text: v => (v.i < n ? `${A[v.i]} == ${K}` : `${v.i} < ${n}`), test: v => v.i < n && A[v.i] === K }, then: [{ line: 5, part: 'cout << i;', run: v => out(String(v.i)), note: v => `Ketemu di indeks ${v.i}.` }], else: [{ line: 6, part: 'cout << -1;', run: () => out('-1'), note: v => (v.i < n ? `A[${v.i}] = ${A[v.i]} sudah lebih besar dari ${K}. Karena data urut, sisa data di kanan pasti juga lebih besar: berhenti lebih awal.` : 'Semua data lebih kecil dari K.') }], tag: 'putus' }
    ]
  };
}

const P14 = lab([
  {
    label: 'Latihan 1a: K = 5',
    intro: 'Pseudocode slide ditulis dalam C++. Tabel {3, 1, 2, 4, 6}, kunci 5.',
    panes: [seqSearch([3, 1, 2, 4, 6], 5)],
    asks: [
      { at: 'start', q: 'Tebak outputnya.', opts: ['-1', '4', '5', '3'], ans: 0, why: '5 tidak ada di tabel. Semua elemen dibandingkan, i berhenti di 5 (= n), lalu dikembalikan -1.' },
      { at: 'cond-last', q: 'i = 5. Kenapa A[5] tidak ikut dibandingkan?', opts: ['Karena i < n sudah false, bagian && berikutnya tidak dicek', 'Karena A[5] bernilai 0', 'A[5] tetap dibandingkan'], ans: 0, why: '&& berhenti di syarat pertama yang false (short-circuit). Urutan i < n di depan inilah yang mencegah akses di luar array.' }
    ]
  },
  {
    label: 'Latihan 1b: K = 9',
    intro: 'Tabel {10, 12, 9, 7, 20}, kunci 9: pencarian berhenti begitu ketemu (Case 2 di slide).',
    panes: [seqSearch([10, 12, 9, 7, 20], 9)],
    asks: [
      { at: 'start', q: 'Tebak outputnya.', opts: ['2', '3', '9', '-1'], ans: 0, why: 'A[2] = 9. Outputnya indeks, bukan nilainya. Elemen 7 dan 20 tidak perlu diperiksa.' }
    ]
  }
]);

const P15 = lab([
  {
    label: 'Latihan 3: biasa vs sentinel',
    intro: 'Tabel {3, 1, 2, 4, 6}, kunci 5, dengan dua versi berdampingan. Hitung berapa kali masing-masing mengecek kondisi.',
    panes: [seqSearch([3, 1, 2, 4, 6], 5, { title: 'Tanpa sentinel' }), seqSentinel([3, 1, 2, 4, 6], 5, { title: 'Dengan sentinel' })],
    asks: [
      { at: 'start', q: 'Versi sentinel tidak punya syarat i < n di while. Apakah bisa keluar dari array?', opts: ['Tidak, karena A[n] = K pasti cocok', 'Ya, bisa jalan terus', 'Ya, kalau K tidak ada'], ans: 0, why: 'Sentinel menjamin loop berhenti paling jauh di A[n]. Setelah loop, posisi i dicek: i < n berarti ketemu sungguhan.' },
      { at: 'cek-posisi', pane: 1, q: 'Loop berhenti di i = 5. Ketemu atau tidak?', opts: ['Tidak ketemu, outputnya -1', 'Ketemu di indeks 5'], ans: 0, why: 'Indeks 5 = n adalah tempat sentinel, bukan data asli.' }
    ]
  },
  {
    label: 'Sentinel, K = 9',
    intro: 'Tabel {10, 12, 9, 7, 20}, kunci 9. Sentinel tetap dipasang, tetapi data asli sudah cocok lebih dulu.',
    panes: [seqSentinel([10, 12, 9, 7, 20], 9)],
    asks: [
      { at: 'cek-posisi', q: 'Loop berhenti di i = 2. Outputnya?', opts: ['2', '-1', '5'], ans: 0, why: '2 < 5, jadi yang cocok adalah data asli.' }
    ]
  },
  {
    label: 'Data urut: berhenti lebih awal',
    intro: 'Latihan 2: tabel diurutkan dulu menjadi {1, 2, 3, 4, 6}. Pada data urut, pencarian boleh berhenti begitu bertemu nilai yang lebih besar dari K.',
    panes: [seqUrut([1, 2, 3, 4, 6], 5)],
    asks: [
      { at: 'putus', q: 'A[4] = 6 > 5. Perlu memeriksa elemen setelahnya?', opts: ['Tidak, sisanya pasti lebih besar', 'Ya, siapa tahu ada 5 di kanan'], ans: 0, why: 'Data urut naik: semua nilai di kanan 6 minimal 6.' }
    ]
  }
]);

// Ringkasan perbandingan: hitung perbandingan sebenarnya (&& berhenti di syarat pertama yang false)
{
  const [biasa, sentinel] = P15[0].panes;
  const b = biasa.sum, s = sentinel.sum;
  biasa.sum = { ...b, text: `kondisi while dicek <strong>${b.checks} kali</strong>, dan tiap cek berisi dua perbandingan (<code>i &lt; n</code> lalu <code>A[i] != K</code>). Cek terakhir berhenti di <code>i &lt; n</code>, lalu ada satu cek <code>i &lt; n</code> lagi sesudah loop: <strong>${b.checks * 2} perbandingan</strong>.` };
  sentinel.sum = { ...s, text: `kondisi while dicek <strong>${s.checks} kali</strong> dengan satu perbandingan saja, ditambah satu cek <code>i &lt; n</code> sesudah loop: <strong>${s.checks + 1} perbandingan</strong>. Inilah keuntungan sentinel.` };
}

module.exports = { P9, P10, P11, P12, P13, P14, P15 };
