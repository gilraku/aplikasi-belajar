// Lab Struktur Data & Algoritma, bab "Bercabang": binary search tree, BFS, DFS, dan hash table.
// Ditambahkan ke AL_ALGO dari algo-lab.js (dimuat sesudahnya), memakai alRec2 / alMover / alBox / alOutLines.

// ---------- Masukan bersama ----------
const alKeysInput = (min, max, label, aria, contoh) => ({
  mode: 'numeric', aria: 'Angka yang disisipkan, dipisah koma', targetLabel: label, targetAria: aria,
  hint: `${min} sampai ${max} bilangan bulat 0–99, dipisah koma. Semua disisipkan berurutan, lalu angka di kotak <b>${label}</b> dicari.`,
  parse(raw, rawT) {
    const nums = raw.split(/[\s,;]+/).filter(Boolean).map(Number);
    if (nums.length < min || nums.length > max || nums.some(v => !Number.isInteger(v) || v < 0 || v > 99)) return { err: `Isi ${min} sampai ${max} bilangan bulat 0–99, dipisah koma. Contoh: ${contoh}` };
    const t = Number(String(rawT).trim());
    if (String(rawT).trim() === '' || !Number.isInteger(t) || t < 0 || t > 99) return { err: `Isi angka di kotak ${label} dengan bilangan bulat 0–99.` };
    return { data: nums, target: t };
  },
  acak() {
    const len = alRnd(Math.max(min, 5), max), data = [];
    while (data.length < len) { const v = alRnd(1, 99); if (!data.includes(v)) data.push(v); }
    return { data, target: Math.random() < 0.75 ? data[alRnd(0, len - 1)] : alRnd(1, 99) };
  }
});
const AL_LET = 'ABCDEFGH';
const alGraphInput = {
  mode: 'text', aria: 'Sisi graf, misalnya A-B, A-C', targetLabel: 'mulai', targetAria: 'Simpul awal (huruf)', targetMode: 'text',
  hint: '2 sampai 12 sisi berupa pasangan huruf A–H, dipisah koma (A-B atau AB). Kotak <b>mulai</b> diisi huruf simpul awal.',
  fmt: d => (d || []).join(', '),
  parse(raw, rawT) {
    const t = raw.split(/[\s,;]+/).filter(Boolean), seen = new Set(), data = [];
    for (const x of t) {
      const m = /^([A-Ha-h])-?([A-Ha-h])$/.exec(x);
      if (!m) return { err: `"${x}" bukan sisi. Tulis pasangan huruf A–H, misalnya A-B.` };
      const a = m[1].toUpperCase(), b = m[2].toUpperCase();
      if (a === b) return { err: `${a}-${b} menghubungkan simpul ke dirinya sendiri. Pakai dua huruf berbeda.` };
      const key = [a, b].sort().join('');
      if (!seen.has(key)) { seen.add(key); data.push(a + '-' + b); }
    }
    if (data.length < 2 || data.length > 12) return { err: 'Isi 2 sampai 12 sisi yang berbeda. Contoh: A-B, A-C, B-D' };
    const s = String(rawT).trim().toUpperCase();
    if (!/^[A-H]$/.test(s) || !data.some(e => e.includes(s))) return { err: 'Isi kotak mulai dengan satu huruf simpul yang ada di sisi-sisi tadi.' };
    return { data, target: s };
  },
  acak() {
    const k = alRnd(5, 8), L = AL_LET.slice(0, k).split(''), E = new Set();
    for (let i = 1; i < k; i++) { const j = alRnd(0, i - 1); E.add([L[j], L[i]].sort().join('-')); }
    const extra = alRnd(1, 3); for (let t = 0; t < 20 && E.size < k - 1 + extra; t++) { const a = alRnd(0, k - 1), b = alRnd(0, k - 1); if (a !== b) E.add([L[a], L[b]].sort().join('-')); }
    return { data: [...E], target: L[alRnd(0, k - 1)] };
  }
};
// Tetangga berurutan abjad, seperti perulangan v = 0..N-1 di kode
function alAdj(edges) {
  const adj = {}; edges.forEach(e => { const [a, b] = e.split('-'); (adj[a] = adj[a] || new Set()).add(b); (adj[b] = adj[b] || new Set()).add(a); });
  const nodes = Object.keys(adj).sort(), nb = {}; nodes.forEach(n => { nb[n] = [...adj[n]].sort(); });
  return { nodes, nb };
}
const alEdgeKey = (a, b) => [a, b].sort().join('-');
// Urutan simpul di lingkaran dengan sisi bersilang paling sedikit (simpul pertama tetap di atas).
// Simpul paling banyak 8, jadi semua urutan (7! = 5040) bisa dicoba; hasilnya disimpan per graf.
const AL_GRAPH_ORDER = {};
function alGraphOrder(nodes, edges) {
  const key = nodes.join('') + '|' + edges.join(',');
  if (AL_GRAPH_ORDER[key]) return AL_GRAPH_ORDER[key];
  const E = edges.map(e => e.split('-')), k = nodes.length;
  // Dua tali busur di lingkaran bersilang jika ujung-ujungnya berselang-seling.
  const cross = pos => { let c = 0; for (let i = 0; i < E.length; i++) for (let j = i + 1; j < E.length; j++) {
    let [a, b] = [pos[E[i][0]], pos[E[i][1]]], [p, q] = [pos[E[j][0]], pos[E[j][1]]];
    if (a > b) [a, b] = [b, a]; if (p > q) [p, q] = [q, p];
    if (a === p || a === q || b === p || b === q) continue;
    if ((a < p && p < b) !== (a < q && q < b)) c++; } return c; };
  let best = nodes, bestC = Infinity;
  const rest = nodes.slice(1), used = new Array(rest.length).fill(false), cur = [nodes[0]];
  const walk = () => {
    if (bestC === 0) return;
    if (cur.length === k) { const pos = {}; cur.forEach((n, i) => { pos[n] = i; }); const c = cross(pos); if (c < bestC) { bestC = c; best = cur.slice(); } return; }
    for (let i = 0; i < rest.length; i++) if (!used[i]) { used[i] = true; cur.push(rest[i]); walk(); cur.pop(); used[i] = false; }
  };
  if (k > 3) walk();
  return (AL_GRAPH_ORDER[key] = best);
}
function alGraphView(s, f, strip) {
  const S = f.S, mv = alMover(s), { nodes } = alAdj(s.data), k = nodes.length, cx = 280, cy = 128, rx = 200, ry = 100;
  const P = {}; alGraphOrder(nodes, s.data).forEach((n, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / k; P[n] = [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; });
  let g = '';
  s.data.forEach(e => { const [a, b] = e.split('-'), key = alEdgeKey(a, b), on = S.chk && alEdgeKey(S.cur, S.chk) === key, tree = (S.tree || []).includes(key);
    g += `<line class="al-edge${on ? ' is-on' : tree ? ' is-tree' : ''}" x1="${P[a][0]}" y1="${P[a][1]}" x2="${P[b][0]}" y2="${P[b][1]}"/>`; });
  nodes.forEach(n => { const c = n === S.cur ? 'cmp' : n === S.chk ? 'chk' : (S.wait || []).includes(n) ? 'found' : (S.vis || []).includes(n) ? 'done' : '';
    g += `<g class="al-gn${c ? ' al-' + c : ''}" transform="translate(${P[n][0]},${P[n][1]})"><circle r="19"/><text>${n}</text></g>`; });
  const y = 262;
  g += `<text class="al-lbl" x="20" y="${y}">${strip.label}</text>`;
  strip.items.forEach((it, i) => { g += alBox(mv, 'q' + it, it, 20 + i * 46, y + 10, '', 40); });
  if (!strip.items.length) g += `<text class="al-lbl al-muted" x="20" y="${y + 32}">kosong</text>`;
  // Urutan kunjungan di baris sendiri: antrian/stack bisa berisi sampai 8 simpul dan memakai lebar penuh
  g += `<text class="al-lbl" x="20" y="${y + 80}">Urutan kunjungan</text><text class="al-ord" x="20" y="${y + 112}">${(S.ord || []).join(' → ') || '–'}</text>`;
  return `<svg class="al-svg" viewBox="0 0 560 ${y + 136}" role="img" aria-label="Graf ${esc(s.data.join(', '))}. Urutan kunjungan: ${esc((S.ord || []).join(', ') || 'belum ada')}">${g}</svg>`;
}
function alGraphProgram(A, s, call, label) {
  const L = ['#include <iostream>', 'using namespace std;', '', ...A.code.cpp, '', 'void sambung(char a, char b) {', "    adj[a - 'A'][b - 'A'] = true;", "    adj[b - 'A'][a - 'A'] = true;", '}', '', 'int main() {'];
  s.data.forEach(e => { const [a, b] = e.split('-'); L.push(`    sambung('${a}', '${b}');`); });
  L.push(`    cout << "${label}: ";`, `    ${call}('${s.target}' - 'A');`, '    cout << endl;', '    return 0;', '}');
  const F = A.run(s.data, s.target), ord = F[F.length - 1].S.ord;
  return { code: L.join('\n'), out: `${label}: ${ord.join(' ')}` };
}
const alGraphCode = ['const int N = 8;            // simpul A–H = 0–7', 'bool adj[N][N];             // adj[u][v] = true jika ada sisi u–v', 'bool dikunjungi[N];', ''];

Object.assign(AL_ALGO, {
  // ---------------- Binary search tree ----------------
  bst: {
    target: true,
    counters: ['Perbandingan'],
    vars: ['x', 'p->data', 'arah'],
    code: {
      cpp: ['struct Node {', '    int data;', '    Node* kiri;', '    Node* kanan;', '};', '', 'Node* sisip(Node* akar, int x) {', '    if (akar == NULL) {', '        Node* baru = new Node;', '        baru->data = x;', '        baru->kiri = baru->kanan = NULL;', '        return baru;', '    }',
        '    if (x < akar->data) akar->kiri = sisip(akar->kiri, x);', '    else akar->kanan = sisip(akar->kanan, x);', '    return akar;', '}', '',
        'bool cari(Node* akar, int x) {', '    Node* p = akar;', '    while (p != NULL) {', '        if (x == p->data) return true;', '        if (x < p->data) p = p->kiri;', '        else p = p->kanan;', '    }', '    return false;', '}'],
      ps: ['node berisi data, kiri, kanan', 'sisip(akar, x):', '    jika akar kosong: buat node baru berisi x', '    jika x < akar.data: sisip ke subpohon kiri', '    selain itu: sisip ke subpohon kanan',
        'cari(akar, x):', '    p = akar', '    selama p tidak kosong:', '        jika x == p.data: ketemu', '        jika x < p.data: p = p.kiri, selain itu p = p.kanan', '    tidak ketemu']
    },
    lines: {
      cpp: { decl: [1, 2, 3, 4, 5], new: [8, 9, 10, 11, 12], cmpIns: [14, 15], left: [14], right: [15], sStart: [20], sCmp: [21, 22], sFound: [22], sLeft: [23], sRight: [24], sNone: [26], end: [7, 19] },
      ps: { decl: [1], new: [2, 3], cmpIns: [4, 5], left: [4], right: [5], sStart: [6, 7], sCmp: [8, 9], sFound: [9], sLeft: [10], sRight: [10], sNone: [11], end: [2, 6] }
    },
    input: alKeysInput(3, 8, 'cari', 'Angka yang dicari', '50, 30, 70, 20, 40'),
    // Pohon akhir dihitung dulu supaya posisi tiap node tetap (urutan inorder = posisi mendatar, kedalaman = baris)
    shape(data) {
      const T = []; let root = null;
      data.forEach((v, id) => { const n = { id, v, l: null, r: null, d: 0, par: null }; T.push(n);
        if (root == null) { root = id; return; }
        let p = root; for (;;) { const P = T[p]; n.d++; if (v < P.v) { if (P.l == null) { P.l = id; n.par = p; break; } p = P.l; } else { if (P.r == null) { P.r = id; n.par = p; break; } p = P.r; } } });
      const order = []; (function ino(i) { if (i == null) return; ino(T[i].l); order.push(i); ino(T[i].r); })(root);
      order.forEach((id, rank) => { T[id].rank = rank; });
      return { T, root };
    },
    run(data, x) {
      const r = alRec2(), { T, root } = this.shape(data), on = new Set();
      r.cnt.Perbandingan = 0;
      const S = o => Object.assign({ on: [...on], n: data.length }, o);
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'decl', vars: { x: undefined }, S: S({}), title: 'Kiri lebih kecil, kanan lebih besar',
        body: `Binary search tree (BST) adalah pohon yang setiap node-nya punya paling banyak dua anak. Aturannya: semua isi di <b>subpohon kiri lebih kecil</b> dari node itu, dan di <b>kanan lebih besar atau sama</b>. Angka ${data.join(', ')} akan disisipkan berurutan, lalu ${x} dicari.` });
      data.forEach((v, id) => {
        const g = `sisip ${v}`;
        if (id === root) { on.add(id);
          r.push({ grp: g, kind: 'Buat', ln: 'new', vars: { x: v }, S: S({ hi: id, msg: `sisip ${v}` }), title: `${v} menjadi akar`, body: 'Pohon masih kosong (<code>akar == NULL</code>), jadi node baru langsung menjadi akar (root).' }); return; }
        let p = root;
        for (;;) {
          const P = T[p], left = v < P.v; r.cnt.Perbandingan++;
          r.push({ grp: g, kind: 'Bandingkan', ln: 'cmpIns', vars: { x: v, 'p->data': P.v }, S: S({ p, msg: `sisip ${v}` }), title: `${v} < ${P.v}?`,
            body: `Bandingkan ${v} dengan node ${P.v}. ${left ? `<b>Ya</b>, ${v} lebih kecil, jadi turun ke kiri.` : `Tidak, ${v} ${v === P.v ? 'sama dengan' : 'lebih besar dari'} ${P.v}, jadi turun ke kanan.`}`,
            q: { t: `${v} turun ke arah mana dari ${P.v}?`, o: ['Kiri', 'Kanan'], a: left ? 0 : 1 } });
          const next = left ? P.l : P.r;
          if (next === id) { on.add(id);
            r.push({ grp: g, kind: 'Buat', ln: 'new', vars: { x: v, 'p->data': P.v, arah: left ? 'kiri' : 'kanan' }, S: S({ hi: id, p, msg: `sisip ${v}` }), title: `${v} menjadi anak ${left ? 'kiri' : 'kanan'} ${P.v}`,
              body: `Anak ${left ? 'kiri' : 'kanan'} dari ${P.v} masih kosong (NULL), jadi node baru dipasang di situ. Node yang sudah ada tidak berpindah.` });
            break; }
          r.push({ grp: g, kind: 'Telusuri', ln: left ? 'left' : 'right', vars: { x: v, 'p->data': T[next].v, arah: left ? 'kiri' : 'kanan' }, S: S({ p: next, msg: `sisip ${v}` }), title: `Turun ke ${T[next].v}`, body: `Anak ${left ? 'kiri' : 'kanan'} dari ${P.v} sudah terisi ${T[next].v}, jadi pemeriksaan diulang dari sana (pemanggilan rekursif).` });
          p = next;
        }
      });
      // Cari x
      const g = `cari ${x}`;
      let p = root, steps = 0;
      r.push({ grp: g, kind: 'Mulai', ln: 'sStart', vars: { x, 'p->data': T[root].v }, S: S({ p, msg: `cari ${x}` }), title: `Cari ${x}: mulai dari akar`, body: 'p mulai dari akar. Di setiap node cukup memilih satu arah, sehingga setengah pohon bisa langsung diabaikan.' });
      for (;;) {
        const P = T[p], hit = x === P.v, left = x < P.v; steps++; r.cnt.Perbandingan++;
        r.push({ grp: g, kind: 'Bandingkan', ln: 'sCmp', vars: { x, 'p->data': P.v }, S: S({ p, msg: `cari ${x}` }), title: `Bandingkan ${x} dengan ${P.v}`,
          body: hit ? `${x} == ${P.v}. <b>Ketemu.</b>` : `${x} ${left ? '<' : '>'} ${P.v}, jadi lanjut ke ${left ? 'kiri' : 'kanan'}.`, q: { t: `Apa langkah berikutnya di node ${P.v}?`, o: ['Ketemu', 'Ke kiri', 'Ke kanan'], a: hit ? 0 : left ? 1 : 2 } });
        if (hit) { r.push({ grp: g, kind: 'Hasil', ln: 'sFound', vars: { x, 'p->data': P.v }, S: S({ found: p, msg: `cari ${x}` }), title: `Ketemu setelah ${steps} perbandingan`, body: `${x} ada di pohon. Dengan ${data.length} data, pencarian hanya memeriksa ${steps} node.` }); break; }
        const next = left ? P.l : P.r;
        if (next == null) { r.push({ grp: g, kind: 'Hasil', ln: 'sNone', vars: { x, 'p->data': P.v, arah: left ? 'kiri' : 'kanan' }, S: S({ p, msg: `cari ${x}` }), title: `${x} tidak ada`, body: `Anak ${left ? 'kiri' : 'kanan'} dari ${P.v} kosong. Kalau ${x} ada, pasti di situ, jadi pencarian berhenti dan <code>cari</code> mengembalikan false.` }); break; }
        r.push({ grp: g, kind: 'Telusuri', ln: left ? 'sLeft' : 'sRight', vars: { x, 'p->data': T[next].v, arah: left ? 'kiri' : 'kanan' }, S: S({ p: next, msg: `cari ${x}` }), title: `p pindah ke ${T[next].v}`, body: `<code>p = p->${left ? 'kiri' : 'kanan'}</code>.` });
        p = next;
      }
      const depth = Math.max(...T.map(n => n.d)) + 1;
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'end', vars: { x }, S: S({ end: true }), title: 'Selesai',
        body: `Dibaca inorder (kiri, node, kanan), isi pohon selalu urut: ${T.slice().sort((a, b) => a.rank - b.rank).map(n => n.v).join(', ')}. Tinggi pohon ini ${depth} tingkat.`,
        note: ['Pohon miring', 'Kalau data disisipkan sudah urut (misalnya 10, 20, 30, 40), setiap node hanya punya anak kanan dan pohonnya seperti linked list. Pencarian jadi O(n), bukan O(log n).'] });
      r.F.forEach(f => { f.S.T = T; });
      return r.F;
    },
    view(A, s, f) {
      const S = f.S, T = S.T, n = S.n, depth = Math.max(...T.map(x => x.d));
      const X = t => n === 1 ? 280 : 36 + t.rank * (488 / (n - 1)), Y = t => 64 + t.d * 58, on = new Set(S.on);
      let g = `<text class="al-lbl" x="16" y="22">${esc(S.msg || '')}</text>`;
      T.forEach(t => { if (on.has(t.id) && t.par != null) g += `<line class="al-edge is-tree" x1="${X(T[t.par])}" y1="${Y(T[t.par])}" x2="${X(t)}" y2="${Y(t)}"/>`; });
      T.forEach(t => { if (!on.has(t.id)) return; const c = t.id === S.found ? 'found' : t.id === S.hi ? 'found' : t.id === S.p ? 'cmp' : S.end ? 'done' : '';
        g += `<g class="al-gn${c ? ' al-' + c : ''}" transform="translate(${X(t)},${Y(t)})"><circle r="19"/><text>${t.v}</text></g>`; });
      // Label p di kanan atas node; node paling kanan diberi label di kirinya supaya tidak keluar gambar
      if (S.p != null) { const t = T[S.p], R = X(t) > 470; g += `<text class="al-lbl" x="${X(t) + (R ? -24 : 24)}" y="${Y(t) - 16}"${R ? ' style="text-anchor:end"' : ''}>p</text>`; }
      return `<svg class="al-svg" viewBox="0 0 560 ${64 + depth * 58 + 34}" role="img" aria-label="Pohon berisi ${esc(T.filter(t => on.has(t.id)).map(t => t.v).join(', ') || 'kosong')}">${g}</svg>`;
    },
    program(s) {
      const L = ['#include <iostream>', 'using namespace std;', '', ...this.code.cpp, '', 'void inorder(Node* akar) {', '    if (akar == NULL) return;', '    inorder(akar->kiri);', '    cout << akar->data << " ";', '    inorder(akar->kanan);', '}', '', 'int main() {', '    Node* akar = NULL;'];
      s.data.forEach(v => L.push(`    akar = sisip(akar, ${v});`));
      L.push('    cout << "Inorder: ";', '    inorder(akar);', '    cout << endl;', `    if (cari(akar, ${s.target})) cout << "${s.target} ada di pohon" << endl;`, `    else cout << "${s.target} tidak ada" << endl;`, '    return 0;', '}');
      return { code: L.join('\n'), out: alOutLines([`Inorder: ${s.data.slice().sort((p, q) => p - q).join(' ')}`, s.data.includes(s.target) ? `${s.target} ada di pohon` : `${s.target} tidak ada`]) };
    }
  },

  // ---------------- BFS ----------------
  bfs: {
    target: true,
    counters: ['Cek tetangga'],
    vars: ['u', 'v', 'depan', 'belakang'],
    code: {
      cpp: [...alGraphCode, 'void bfs(int mulai) {', '    int antri[N], depan = 0, belakang = 0;', '    antri[belakang++] = mulai;', '    dikunjungi[mulai] = true;', '    while (depan < belakang) {', '        int u = antri[depan++];', "        cout << char('A' + u) << \" \";",
        '        for (int v = 0; v < N; v++) {', '            if (adj[u][v] && !dikunjungi[v]) {', '                dikunjungi[v] = true;', '                antri[belakang++] = v;', '            }', '        }', '    }', '}'],
      ps: ['bfs(mulai):', '    masukkan mulai ke antrian, tandai dikunjungi', '    selama antrian tidak kosong:', '        u = ambil dari depan antrian, tampilkan u', '        untuk setiap tetangga v dari u:', '            jika v belum dikunjungi: tandai, masukkan ke belakang antrian']
    },
    lines: {
      cpp: { decl: [1, 2, 3], init: [6, 7, 8], take: [9, 10, 11], chk: [12, 13], push: [14, 15], end: [9] },
      ps: { decl: [1], init: [2], take: [3, 4], chk: [5, 6], push: [6], end: [3] }
    },
    input: alGraphInput,
    run(edges, start) {
      const r = alRec2(), { nb } = alAdj(edges), vis = [start], q = [start], ord = [], tree = [];
      let head = 0; r.cnt['Cek tetangga'] = 0;
      const S = o => Object.assign({ vis: vis.slice(), wait: q.slice(head), ord: ord.slice(), tree: tree.slice() }, o);
      const V = o => Object.assign({ depan: head, belakang: q.length }, o);
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'decl', vars: V({}), S: S({ wait: [], vis: [] }), title: 'Melebar dulu, lapis demi lapis',
        body: `BFS (Breadth-First Search) mengunjungi semua tetangga simpul awal dulu, baru tetangga dari tetangga, dan seterusnya. Urutan itu dijaga oleh <b>antrian</b> (queue): simpul yang ditemukan lebih dulu dikunjungi lebih dulu. Graf disimpan sebagai <code>adj[u][v]</code>: true jika u dan v terhubung.` });
      r.push({ grp: 'Mulai', kind: 'Mulai', ln: 'init', vars: V({}), S: S({}), title: `${start} masuk antrian`, body: `Simpul awal ${start} dimasukkan ke antrian dan langsung ditandai dikunjungi, supaya tidak dimasukkan dua kali.` });
      while (head < q.length) {
        const u = q[head++]; ord.push(u);
        const g = `Kunjungi ${u}`;
        r.push({ grp: g, kind: 'Ambil', ln: 'take', vars: V({ u }), S: S({ cur: u }), title: `Ambil ${u} dari depan antrian`, body: `${u} dikeluarkan dari antrian dan ditampilkan. Sekarang semua tetangganya diperiksa: ${nb[u].join(', ')}.` });
        for (const v of nb[u]) {
          const fresh = !vis.includes(v); r.cnt['Cek tetangga']++;
          r.push({ grp: g, kind: 'Periksa', ln: 'chk', vars: V({ u, v }), S: S({ cur: u, chk: v }), title: `Tetangga ${v}: sudah dikunjungi?`,
            body: fresh ? `${v} belum pernah ditandai.` : `${v} sudah ditandai sebelumnya, jadi dilewati.`, q: { t: `Apakah ${v} dimasukkan ke antrian?`, o: ['Ya, masuk antrian', 'Tidak, sudah ditandai'], a: fresh ? 0 : 1 } });
          if (fresh) { vis.push(v); q.push(v); tree.push(alEdgeKey(u, v));
            r.push({ grp: g, kind: 'Masuk', ln: 'push', vars: V({ u, v }), S: S({ cur: u }), title: `${v} masuk ke belakang antrian`, body: `${v} ditandai dikunjungi lalu dimasukkan ke antrian. Ia akan diambil setelah simpul-simpul yang sudah antre lebih dulu.` }); }
        }
      }
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'end', vars: V({}), S: S({}), title: `Urutan BFS: ${ord.join(' ')}`,
        body: `Antrian kosong, semua simpul yang terhubung dengan ${start} sudah dikunjungi. Garis hijau adalah jalur penemuan tiap simpul: jalur itu sekaligus jalan terpendek (jumlah sisi paling sedikit) dari ${start}.`,
        note: ['Kapan memakai BFS', 'Mencari jalur terpendek pada graf tanpa bobot, misalnya jumlah transit paling sedikit atau "teman dari teman" di media sosial.'] });
      return r.F;
    },
    view(A, s, f) { return alGraphView(s, f, { label: 'Antrian (depan di kiri)', items: f.S.wait || [] }); },
    program(s) { return alGraphProgram(this, s, 'bfs', 'Urutan BFS'); }
  },

  // ---------------- DFS ----------------
  dfs: {
    target: true,
    counters: ['Cek tetangga'],
    vars: ['u', 'v', 'kedalaman'],
    code: {
      cpp: [...alGraphCode, 'void dfs(int u) {', '    dikunjungi[u] = true;', "    cout << char('A' + u) << \" \";", '    for (int v = 0; v < N; v++) {', '        if (adj[u][v] && !dikunjungi[v]) {', '            dfs(v);', '        }', '    }', '}'],
      ps: ['dfs(u):', '    tandai u dikunjungi, tampilkan u', '    untuk setiap tetangga v dari u:', '        jika v belum dikunjungi: dfs(v)', '    selesai, kembali ke pemanggil']
    },
    lines: {
      cpp: { decl: [1, 2, 3], call: [5, 6, 7], chk: [8, 9], rec: [10], back: [12, 13], end: [5] },
      ps: { decl: [1], call: [1, 2], chk: [3, 4], rec: [4], back: [5], end: [1] }
    },
    input: alGraphInput,
    run(edges, start) {
      const r = alRec2(), { nb } = alAdj(edges), vis = [], ord = [], tree = [], st = [];
      r.cnt['Cek tetangga'] = 0;
      const S = o => Object.assign({ vis: vis.slice(), wait: st.slice(0, -1), ord: ord.slice(), tree: tree.slice(), stack: st.slice() }, o);
      const V = o => Object.assign({ kedalaman: st.length }, o);
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'decl', vars: V({}), S: S({}), title: 'Masuk sedalam mungkin dulu',
        body: 'DFS (Depth-First Search) dari sebuah simpul langsung masuk ke tetangga pertama yang belum dikunjungi, lalu ke tetangganya lagi, sedalam mungkin. Kalau buntu, ia <b>mundur</b> ke simpul sebelumnya dan mencoba tetangga berikutnya. Mundur itu terjadi otomatis karena DFS ditulis rekursif: call stack mengingat jalan pulang.' });
      const go = u => {
        st.push(u); vis.push(u); ord.push(u);
        const g = `dfs(${u})`;
        r.push({ grp: g, kind: 'Panggil', ln: 'call', vars: V({ u }), S: S({ cur: u }), title: `dfs(${u}): kunjungi ${u}`, body: `${u} ditandai dan ditampilkan. Call stack sekarang: ${st.join(' → ')}.` });
        for (const v of nb[u]) {
          const fresh = !vis.includes(v); r.cnt['Cek tetangga']++;
          r.push({ grp: g, kind: 'Periksa', ln: 'chk', vars: V({ u, v }), S: S({ cur: u, chk: v }), title: `Tetangga ${v}: sudah dikunjungi?`,
            body: fresh ? `${v} belum dikunjungi, jadi DFS langsung masuk ke ${v}. Sisa tetangga ${u} menunggu sampai dfs(${v}) selesai.` : `${v} sudah dikunjungi, lewati.`,
            q: { t: `Apakah dfs(${v}) dipanggil sekarang?`, o: ['Ya, masuk ke ' + v, 'Tidak, sudah dikunjungi'], a: fresh ? 0 : 1 } });
          if (fresh) { tree.push(alEdgeKey(u, v)); go(v);
            r.push({ grp: g, kind: 'Kembali', ln: 'rec', vars: V({ u, v }), S: S({ cur: u }), title: `Kembali ke ${u}`, body: `dfs(${v}) selesai dan dikeluarkan dari call stack. ${u} melanjutkan pemeriksaan tetangga berikutnya.` }); }
        }
        r.push({ grp: g, kind: 'Selesai', ln: 'back', vars: V({ u }), S: S({ cur: u }), title: `dfs(${u}) selesai`, body: `Semua tetangga ${u} sudah diperiksa. ${st.length > 1 ? `Kembali ke ${st[st.length - 2]}.` : 'Ini pemanggilan pertama, jadi DFS selesai.'}` });
        st.pop();
      };
      go(start);
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'end', vars: V({}), S: S({}), title: `Urutan DFS: ${ord.join(' ')}`,
        body: `Semua simpul yang terhubung dengan ${start} sudah dikunjungi. Garis hijau menunjukkan jalur masuk DFS. Bandingkan dengan urutan BFS di pelajaran sebelumnya untuk graf yang sama.`,
        note: ['Kapan memakai DFS', 'Mengecek apakah dua simpul terhubung, mencari jalan keluar labirin, mendeteksi siklus, dan menelusuri semua kemungkinan (backtracking).'] });
      return r.F;
    },
    view(A, s, f) { return alGraphView(s, f, { label: 'Call stack (kiri=bawah)', items: f.S.stack || [] }); },
    program(s) { return alGraphProgram(this, s, 'dfs', 'Urutan DFS'); }
  },

  // ---------------- Hash table (linear probing) ----------------
  hash: {
    target: true,
    counters: ['Tabrakan', 'Probe cari'],
    vars: ['k', 'k % M', 'i'],
    code: {
      cpp: ['const int M = 10;', 'int tabel[M];               // -1 berarti kosong', '', 'int hitungHash(int k) {', '    return k % M;', '}', '', 'void sisip(int k) {', '    int i = hitungHash(k);', '    while (tabel[i] != -1) {', '        i = (i + 1) % M;        // tabrakan: coba tempat berikutnya', '    }', '    tabel[i] = k;', '}', '',
        'int cari(int k) {', '    int i = hitungHash(k);', '    for (int coba = 0; coba < M && tabel[i] != -1; coba++) {', '        if (tabel[i] == k) return i;', '        i = (i + 1) % M;', '    }', '    return -1;', '}'],
      ps: ['M = 10, semua tempat tabel kosong', 'sisip(k):', '    i = k mod M', '    selama tabel[i] terisi: i = (i + 1) mod M', '    tabel[i] = k', 'cari(k):', '    i = k mod M', '    selama tabel[i] terisi (paling banyak M kali):', '        jika tabel[i] == k: ketemu di i', '        i = (i + 1) mod M', '    tidak ketemu']
    },
    lines: {
      cpp: { decl: [1, 2], h: [9, 5], probe: [10], next: [11], put: [13], sh: [17, 5], sprobe: [18, 19], sfound: [19], snext: [20], snone: [22], end: [1] },
      ps: { decl: [1], h: [2, 3], probe: [4], next: [4], put: [5], sh: [6, 7], sprobe: [8, 9], sfound: [9], snext: [10], snone: [11], end: [1] }
    },
    input: alKeysInput(3, 8, 'cari', 'Angka yang dicari', '25, 35, 41, 15'),
    run(keys, x) {
      const r = alRec2(), M = 10, tb = Array(M).fill(null);
      r.cnt.Tabrakan = 0; r.cnt['Probe cari'] = 0;
      const S = o => Object.assign({ tb: tb.slice() }, o);
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'decl', vars: {}, S: S({}), title: 'Alamat dihitung dari isinya',
        body: `Hash table menyimpan data di array, tetapi tempatnya tidak dicari satu per satu: tempatnya <b>dihitung</b> dari datanya dengan fungsi hash. Di sini <code>hitungHash(k) = k % 10</code>, yaitu angka satuan dari k. Kalau tempatnya sudah terisi (<b>tabrakan</b>), coba tempat berikutnya. Cara ini disebut <i>linear probing</i>.` });
      keys.forEach((k, id) => {
        const g = `sisip ${k}`, h = k % M;
        const ho = [...new Set([h, (h + 1) % M, Math.floor(k / 10) % M])].sort((p, q) => p - q);
        r.push({ grp: g, kind: 'Hitung', ln: 'h', vars: { k, 'k % M': h, i: h }, S: S({ inc: { id, k, at: h }, i: h }), title: `${k} % 10 = ${h}`,
          body: `Tempat awal untuk ${k} adalah indeks ${h}.`, q: { t: `Berapa hitungHash(${k})?`, o: ho.map(String), a: ho.indexOf(h) } });
        let i = h;
        for (;;) {
          const full = tb[i] != null;
          r.push({ grp: g, kind: 'Periksa', ln: 'probe', vars: { k, 'k % M': h, i }, S: S({ inc: { id, k, at: i }, i, chk: i }), title: `tabel[${i}] kosong?`,
            body: full ? `tabel[${i}] sudah berisi ${tb[i].k}. Tabrakan.` : `tabel[${i}] masih kosong.`, q: { t: `Apakah ${k} bisa ditaruh di tabel[${i}]?`, o: ['Bisa, kosong', 'Tidak, sudah terisi'], a: full ? 1 : 0 } });
          if (!full) break;
          r.cnt.Tabrakan++; const old = i; i = (i + 1) % M;
          r.push({ grp: g, kind: 'Geser', ln: 'next', vars: { k, 'k % M': h, i }, S: S({ inc: { id, k, at: i }, i }), title: `Coba indeks ${i}`, body: `<code>i = (${old} + 1) % 10 = ${i}</code>.${old === M - 1 ? ' Setelah indeks 9 kembali ke 0.' : ''}` });
        }
        tb[i] = { id, k };
        r.push({ grp: g, kind: 'Masuk', ln: 'put', vars: { k, 'k % M': h, i }, S: S({ hi: id, i }), title: `${k} disimpan di tabel[${i}]`, body: i === h ? `${k} masuk tepat di tempat awalnya.` : `${k} bergeser ${(i - h + M) % M} tempat dari tempat awalnya (${h}).` });
      });
      // Cari x
      const g = `cari ${x}`, h = x % M; let i = h, at = -1;
      r.push({ grp: g, kind: 'Hitung', ln: 'sh', vars: { k: x, 'k % M': h, i }, S: S({ i, look: x }), title: `Cari ${x}: mulai di ${x} % 10 = ${h}`, body: `Kalau ${x} ada, ia pasti disimpan di indeks ${h} atau sesudahnya, sebelum bertemu tempat kosong.` });
      for (let coba = 0; coba < M && tb[i] != null; coba++) {
        const hit = tb[i].k === x; r.cnt['Probe cari']++;
        r.push({ grp: g, kind: 'Periksa', ln: 'sprobe', vars: { k: x, 'k % M': h, i }, S: S({ i, chk: i, look: x }), title: `tabel[${i}] = ${tb[i].k}`,
          body: hit ? `Sama dengan ${x}. <b>Ketemu.</b>` : `Bukan ${x}, coba tempat berikutnya.`, q: { t: `tabel[${i}] berisi ${tb[i].k}. Langkah berikutnya?`, o: ['Ketemu', 'Coba tempat berikutnya'], a: hit ? 0 : 1 } });
        if (hit) { at = i; break; }
        const old = i; i = (i + 1) % M;
        r.push({ grp: g, kind: 'Geser', ln: 'snext', vars: { k: x, 'k % M': h, i }, S: S({ i, look: x }), title: `Coba indeks ${i}`, body: `<code>i = (${old} + 1) % 10 = ${i}</code>.` });
      }
      if (at >= 0) r.push({ grp: g, kind: 'Hasil', ln: 'sfound', vars: { k: x, 'k % M': h, i }, S: S({ found: tb[at].id, i, look: x }), title: `${x} ada di indeks ${at}`, body: `Ditemukan setelah memeriksa ${r.cnt['Probe cari']} tempat. Tanpa tabrakan, hash table hanya perlu 1 pemeriksaan: O(1).` });
      else r.push({ grp: g, kind: 'Hasil', ln: 'snone', vars: { k: x, 'k % M': h, i }, S: S({ i, look: x }), title: `${x} tidak ada`, body: `tabel[${i}] kosong. Kalau ${x} pernah disisipkan, ia pasti sudah ditaruh di tempat kosong ini atau sebelumnya. Jadi pencarian berhenti dan mengembalikan -1.` });
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'end', vars: {}, S: S({ end: true }), title: 'Selesai', body: `Terjadi ${r.cnt.Tabrakan} tabrakan saat menyisipkan ${keys.length} angka.`,
        note: ['Mengurangi tabrakan', 'Pakai ukuran tabel yang lebih besar dari banyak data (biasanya terisi paling banyak sekitar 70%), dan pilih M bilangan prima supaya sisa bagi lebih merata.'] });
      return r.F;
    },
    view(A, s, f) {
      const S = f.S, mv = alMover(s), M = 10, x0 = 30, sw = 50, y0 = 120, X = i => x0 + i * sw;
      let g = '';
      for (let i = 0; i < M; i++) g += `<rect class="al-slot${S.chk === i ? ' is-chk' : ''}" x="${X(i)}" y="${y0}" width="${sw - 4}" height="46"/><text class="al-idx" x="${X(i) + (sw - 4) / 2}" y="${y0 + 62}">[${i}]</text>`;
      S.tb.forEach((e, i) => { if (e) g += alBox(mv, 'h' + e.id, e.k, X(i) + 3, y0 + 4, e.id === S.hi || e.id === S.found ? 'found' : S.chk === i ? 'cmp' : S.end ? 'done' : '', 40); });
      if (S.inc) g += alBox(mv, 'h' + S.inc.id, S.inc.k, X(S.inc.at) + 3, y0 - 66, 'cmp', 40) + `<text class="al-lbl" x="16" y="26">sisip ${S.inc.k}: ${S.inc.k} % 10 = ${S.inc.k % 10}</text>`;
      if (S.look != null) g += `<text class="al-lbl" x="16" y="26">cari ${S.look}: ${S.look} % 10 = ${S.look % 10}</text>`;
      if (S.i != null) g += alPtr(mv, 'pi', X(S.i) + (sw - 4) / 2, y0 + 70, 'i');
      return `<svg class="al-svg" viewBox="0 0 560 236" role="img" aria-label="Isi tabel hash: ${esc(S.tb.map((e, i) => e ? i + ':' + e.k : '').filter(Boolean).join(', ') || 'kosong')}">${g}</svg>`;
    },
    program(s) {
      const L = ['#include <iostream>', 'using namespace std;', '', ...this.code.cpp, '', 'int main() {', '    for (int i = 0; i < M; i++) tabel[i] = -1;'];
      s.data.forEach(k => L.push(`    sisip(${k});`));
      L.push('    for (int i = 0; i < M; i++)', '        if (tabel[i] != -1) cout << "tabel[" << i << "] = " << tabel[i] << endl;', `    int hasil = cari(${s.target});`, `    if (hasil != -1) cout << "${s.target} ada di indeks " << hasil << endl;`, `    else cout << "${s.target} tidak ada" << endl;`, '    return 0;', '}');
      const M = 10, tb = Array(M).fill(-1), out = [];
      s.data.forEach(k => { let i = k % M; while (tb[i] !== -1) i = (i + 1) % M; tb[i] = k; });
      tb.forEach((k, i) => { if (k !== -1) out.push(`tabel[${i}] = ${k}`); });
      let i = s.target % M, at = -1;
      for (let coba = 0; coba < M && tb[i] !== -1; coba++) { if (tb[i] === s.target) { at = i; break; } i = (i + 1) % M; }
      out.push(at >= 0 ? `${s.target} ada di indeks ${at}` : `${s.target} tidak ada`);
      return { code: L.join('\n'), out: out.join('\n') };
    }
  }
});

// ---------- Lanjutan pohon: traversal dan hapus node ----------
// Masukan: angka berbeda yang disisipkan berurutan ke BST (supaya setiap node bisa disebut dengan angkanya).
const alTreeInput = (target, contoh) => ({
  mode: 'numeric', aria: 'Angka berbeda yang disisipkan ke pohon, dipisah koma', targetLabel: target ? 'hapus' : undefined, targetAria: 'Angka yang dihapus',
  hint: `3 sampai 8 bilangan bulat 0–99 yang <b>berbeda</b>, dipisah koma, disisipkan berurutan ke BST.${target ? ' Angka di kotak <b>hapus</b> lalu dihapus dari pohon.' : ''}`,
  parse(raw, rawT) {
    const nums = raw.split(/[\s,;]+/).filter(Boolean).map(Number);
    if (nums.length < 3 || nums.length > 8 || nums.some(v => !Number.isInteger(v) || v < 0 || v > 99)) return { err: `Isi 3 sampai 8 bilangan bulat 0–99, dipisah koma. Contoh: ${contoh}` };
    if (new Set(nums).size !== nums.length) return { err: 'Ada angka yang kembar. Pakai angka yang berbeda semua.' };
    if (!target) return { data: nums };
    const t = Number(String(rawT).trim());
    if (String(rawT).trim() === '' || !Number.isInteger(t) || t < 0 || t > 99) return { err: 'Isi angka di kotak hapus dengan bilangan bulat 0–99.' };
    return { data: nums, target: t };
  },
  acak() {
    const len = alRnd(5, 8), data = [];
    while (data.length < len) { const v = alRnd(1, 99); if (!data.includes(v)) data.push(v); }
    if (!target) return { data };
    // Utamakan node yang punya dua anak, karena kasus itu yang paling perlu dilihat
    const T = AL_ALGO.bst.shape(data).T, two = T.filter(n => n.l != null && n.r != null);
    const pick = two.length && Math.random() < 0.5 ? two[alRnd(0, two.length - 1)].v : Math.random() < 0.85 ? data[alRnd(0, len - 1)] : alRnd(1, 99);
    return { data, target: pick };
  }
});
// Gambar pohon dari daftar node {id, v, l, r}: posisi mendatar = urutan inorder, baris = kedalaman.
function alTreeSvg(nodes, root, opt) {
  const by = {}; nodes.forEach(t => { by[t.id] = t; });
  const pos = {}, ord = []; let depth = 0;
  (function walk(i, d) { if (i == null) return; walk(by[i].l, d + 1); ord.push(i); pos[i] = { d }; depth = Math.max(depth, d); walk(by[i].r, d + 1); })(root, 0);
  const n = ord.length, top = opt.top || 52;
  ord.forEach((id, k) => { pos[id].x = n === 1 ? 280 : 36 + k * (488 / (n - 1)); pos[id].y = top + pos[id].d * 58; });
  let g = '';
  ord.forEach(id => { const t = by[id]; [t.l, t.r].forEach(c => { if (c != null) g += `<line class="al-edge${(opt.edge || []).includes(c) ? ' is-on' : ' is-tree'}" x1="${pos[id].x}" y1="${pos[id].y}" x2="${pos[c].x}" y2="${pos[c].y}"/>`; }); });
  ord.forEach(id => { const c = (opt.cls && opt.cls(id)) || '';
    g += `<g class="al-gn${c ? ' al-' + c : ''}" transform="translate(${pos[id].x},${pos[id].y})"><circle r="19"/><text>${by[id].v}</text></g>`; });
  // Label penunjuk di kanan atas node; node paling kanan diberi label di kirinya supaya tidak keluar gambar
  (opt.tags || []).forEach(([id, label]) => { if (!pos[id]) return; const R = pos[id].x > 470;
    g += `<text class="al-lbl" x="${pos[id].x + (R ? -24 : 24)}" y="${pos[id].y - 16}"${R ? ' style="text-anchor:end"' : ''}>${esc(label)}</text>`; });
  return { g, h: top + depth * 58 + 30, ord };
}
const alTreeStruct = ['struct Node {', '    int data;', '    Node* kiri;', '    Node* kanan;', '};'];
// Fungsi sisip dari lab BST (baris "Node* sisip" sampai "}" penutupnya)
const alSisipCode = () => { const c = AL_ALGO.bst.code.cpp, a = c.indexOf('Node* sisip(Node* akar, int x) {'); return c.slice(a, c.indexOf('}', a + 12) + 1); };

Object.assign(AL_ALGO, {
  // ---------------- Traversal preorder / inorder / postorder ----------------
  traversal: {
    counters: ['Dicetak'],
    vars: ['p->data', 'urutan', 'sudah dicetak'],
    code: {
      cpp: [...alTreeStruct, '', 'void preorder(Node* p) {', '    if (p == NULL) return;', '    cout << p->data << " ";', '    preorder(p->kiri);', '    preorder(p->kanan);', '}', '',
        'void inorder(Node* p) {', '    if (p == NULL) return;', '    inorder(p->kiri);', '    cout << p->data << " ";', '    inorder(p->kanan);', '}', '',
        'void postorder(Node* p) {', '    if (p == NULL) return;', '    postorder(p->kiri);', '    postorder(p->kanan);', '    cout << p->data << " ";', '}'],
      ps: ['preorder(p):        (berhenti jika p kosong)', '    cetak p.data', '    preorder(p.kiri), lalu preorder(p.kanan)',
        'inorder(p):', '    inorder(p.kiri)', '    cetak p.data', '    inorder(p.kanan)',
        'postorder(p):', '    postorder(p.kiri), lalu postorder(p.kanan)', '    cetak p.data']
    },
    lines: {
      cpp: { decl: [1, 2, 3, 4, 5], preS: [7, 8], preV: [9], inS: [14, 15], inV: [17], postS: [21, 22], postV: [25], end: [7, 14, 21] },
      ps: { decl: [1, 4, 8], preS: [1], preV: [2], inS: [4, 5], inV: [6], postS: [8, 9], postV: [10], end: [1, 4, 8] }
    },
    input: alTreeInput(false, '50, 30, 70, 20, 40'),
    ORD: [['pre', 'Preorder', 'node, kiri, kanan'], ['in', 'Inorder', 'kiri, node, kanan'], ['post', 'Postorder', 'kiri, kanan, node']],
    seq(T, root) {
      const q = { pre: [], in: [], post: [] };
      (function w(i) { if (i == null) return; q.pre.push(i); w(T[i].l); q.in.push(i); w(T[i].r); q.post.push(i); })(root);
      return q;
    },
    run(data) {
      const r = alRec2(), { T, root } = AL_ALGO.bst.shape(data), Q = this.seq(T, root), out = { pre: [], in: [], post: [] };
      r.cnt.Dicetak = 0;
      const S = o => Object.assign({ T, root, out: { pre: out.pre.slice(), in: out.in.slice(), post: out.post.slice() } }, o);
      const V = id => T[id].v;
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'decl', vars: {}, S: S({}), title: 'Tiga cara mengunjungi semua node',
        body: `Angka ${data.join(', ')} sudah disisipkan ke BST. <b>Traversal</b> berarti mengunjungi setiap node tepat satu kali. Ketiganya sama-sama turun ke kiri dulu lalu ke kanan. Bedanya hanya <b>kapan node dicetak</b>: sebelum anak-anaknya (preorder), di antara kiri dan kanan (inorder), atau sesudah keduanya (postorder).` });
      this.ORD.forEach(([k, name, rule]) => {
        const seq = Q[k], first = V(seq[0]);
        r.push({ grp: name, kind: 'Mulai', ln: k + 'S', vars: { urutan: rule }, S: S({ k }), title: `${name}: ${rule}`,
          body: k === 'pre' ? `Cetak node begitu sampai, baru turun ke kiri, lalu ke kanan. Jadi yang pertama dicetak selalu akar, ${first}.`
            : k === 'in' ? `Turun ke kiri sejauh mungkin dulu. Node baru dicetak setelah seluruh subpohon kirinya selesai. Yang pertama dicetak adalah node paling kiri, ${first}.`
            : `Node baru dicetak setelah subpohon kiri <b>dan</b> kanannya selesai. Yang pertama dicetak adalah daun paling kiri, ${first}, dan akar selalu paling akhir.`,
          q: { t: `Angka berapa yang dicetak pertama pada ${name.toLowerCase()}?`, ...this.opts(T, seq, 0) } });
        seq.forEach((id, j) => {
          const t = T[id], kids = [t.l, t.r].filter(c => c != null).map(V);
          out[k].push(id); r.cnt.Dicetak++;
          const why = k === 'pre' ? `Sampai di ${t.v}, langsung dicetak. ${kids.length ? `Berikutnya turun ke ${t.l != null ? 'kiri (' + V(t.l) + ')' : 'kanan (' + V(t.r) + ')'}.` : `${t.v} tidak punya anak, jadi kembali ke node di atasnya yang subpohon kanannya belum dikunjungi.`}`
            : k === 'in' ? `${t.l != null ? `Subpohon kiri ${t.v} (mulai dari ${V(t.l)}) sudah selesai` : `${t.v} tidak punya anak kiri`}, jadi sekarang ${t.v} dicetak. ${t.r != null ? `Berikutnya subpohon kanannya (mulai dari ${V(t.r)}).` : 'Lalu kembali ke atas.'}`
            : `${kids.length ? `Anak ${t.v} (${kids.join(' dan ')}) sudah dicetak semua` : `${t.v} adalah daun (tanpa anak)`}, jadi ${t.v} dicetak sekarang.`;
          const done = j === seq.length - 1;
          r.push({ grp: name, kind: 'Cetak', ln: k + 'V', vars: { 'p->data': t.v, urutan: rule, 'sudah dicetak': out[k].length }, S: S({ k, cur: id }), title: `Cetak ${t.v}`,
            body: why + (done ? ` ${name} selesai: <b>${seq.map(V).join(' ')}</b>.` : ''),
            q: done ? undefined : { t: `Angka berapa yang dicetak berikutnya?`, ...this.opts(T, seq, j + 1) } });
        });
      });
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'end', vars: {}, S: S({ end: true }), title: 'Tiga urutan dari pohon yang sama',
        body: `Preorder ${Q.pre.map(V).join(' ')}. Inorder ${Q.in.map(V).join(' ')}, selalu urut naik pada BST. Postorder ${Q.post.map(V).join(' ')}.`,
        note: ['Kapan dipakai', 'Preorder untuk menyalin pohon (akar dibuat dulu). Inorder untuk mencetak isi BST secara urut. Postorder untuk menghapus seluruh pohon (anak dibuang dulu sebelum induknya).'] });
      return r.F;
    },
    // Pilihan tebakan: jawaban yang benar + dua node lain yang belum dicetak (atau node lain mana saja)
    opts(T, seq, j) {
      const right = T[seq[j]].v, rest = seq.slice(j + 1).map(i => T[i].v), other = T.map(t => t.v).filter(v => v !== right && !rest.includes(v));
      const pool = [...rest.slice(0, 2), ...other].filter(v => v !== right).slice(0, 2), o = [right, ...pool].sort((a, b) => a - b).map(String);
      return { o, a: o.indexOf(String(right)) };
    },
    view(A, s, f) {
      const S = f.S, T = S.T, cur = S.cur, k = S.k, printed = new Set(k ? S.out[k] : []);
      const tr = alTreeSvg(T, S.root, { cls: id => id === cur ? 'cmp' : S.end ? 'done' : printed.has(id) ? 'done' : '', tags: cur != null ? [[cur, 'p']] : [] });
      let g = tr.g, y = tr.h + 6;
      A.ORD.forEach(([key, name]) => { const on = key === k || S.end, vals = S.out[key].map(i => T[i].v).join(' ');
        g += `<text class="al-lbl${on ? '' : ' al-muted'}" x="16" y="${y + 20}">${name}</text><text class="al-ord" x="150" y="${y + 21}">${vals || '–'}</text>`; y += 32; });
      return `<svg class="al-svg" viewBox="0 0 560 ${y + 10}" role="img" aria-label="Pohon ${esc(T.map(t => t.v).join(', '))}. ${esc(A.ORD.map(([key, name]) => name + ': ' + (S.out[key].map(i => T[i].v).join(' ') || 'belum')).join('. '))}">${g}</svg>`;
    },
    program(s) {
      const L = ['#include <iostream>', 'using namespace std;', '', ...this.code.cpp, '', ...alSisipCode(), '', 'int main() {', '    Node* akar = NULL;'];
      s.data.forEach(v => L.push(`    akar = sisip(akar, ${v});`));
      L.push('    cout << "Preorder : "; preorder(akar); cout << endl;', '    cout << "Inorder  : "; inorder(akar); cout << endl;', '    cout << "Postorder: "; postorder(akar); cout << endl;', '    return 0;', '}');
      const { T, root } = AL_ALGO.bst.shape(s.data), Q = this.seq(T, root), w = q => q.map(i => T[i].v).join(' ');
      return { code: L.join('\n'), out: alOutLines([`Preorder : ${w(Q.pre)}`, `Inorder  : ${w(Q.in)}`, `Postorder: ${w(Q.post)}`]) };
    }
  },

  // ---------------- Hapus node di BST ----------------
  bsthapus: {
    target: true,
    counters: ['Perbandingan'],
    vars: ['x', 'akar->data', 's->data'],
    code: {
      cpp: [...alTreeStruct, '', 'Node* hapus(Node* akar, int x) {', '    if (akar == NULL) return NULL;', '    if (x < akar->data) akar->kiri = hapus(akar->kiri, x);', '    else if (x > akar->data) akar->kanan = hapus(akar->kanan, x);', '    else {',
        '        if (akar->kiri == NULL) {', '            Node* t = akar->kanan;', '            delete akar;', '            return t;', '        }',
        '        if (akar->kanan == NULL) {', '            Node* t = akar->kiri;', '            delete akar;', '            return t;', '        }',
        '        Node* s = akar->kanan;', '        while (s->kiri != NULL) s = s->kiri;', '        akar->data = s->data;', '        akar->kanan = hapus(akar->kanan, s->data);', '    }', '    return akar;', '}'],
      ps: ['hapus(akar, x):', '    jika akar kosong: x tidak ada', '    jika x < akar.data: hapus di subpohon kiri', '    jika x > akar.data: hapus di subpohon kanan', '    ketemu:',
        '        tanpa anak kiri: ganti node dengan anak kanannya', '        tanpa anak kanan: ganti node dengan anak kirinya', '        dua anak: s = node terkecil di subpohon kanan', '            salin s.data ke node ini', '            hapus s dari subpohon kanan']
    },
    lines: {
      cpp: { decl: [1, 2, 3, 4, 5], none: [8], left: [9], right: [10], found: [11], noL: [12, 13, 14, 15], noR: [17, 18, 19, 20], succ: [22, 23], copy: [24], recDel: [25], end: [27] },
      ps: { decl: [1], none: [2], left: [3], right: [4], found: [5], noL: [6], noR: [7], succ: [8], copy: [9], recDel: [10], end: [1] }
    },
    input: alTreeInput(true, '50, 30, 70, 20, 40'),
    run(data, x) {
      const r = alRec2(), { T: T0, root: R0 } = AL_ALGO.bst.shape(data), N = T0.map(t => ({ id: t.id, v: t.v, l: t.l, r: t.r }));
      let root = R0;
      r.cnt.Perbandingan = 0;
      const S = o => Object.assign({ nodes: N.filter(t => !t.gone).map(t => Object.assign({}, t)), root }, o);
      const kid = t => [t.l, t.r].filter(c => c != null).length;
      const relink = (par, side, to) => { if (par == null) root = to; else N[par][side] = to; };
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'decl', vars: { x }, S: S({}), title: `Hapus ${x} dari BST`,
        body: `Pohon dibuat dari ${data.join(', ')}. Menghapus dimulai seperti mencari: turun ke kiri atau kanan sampai ${x} ketemu. Setelah itu ada tiga kasus, tergantung berapa anak yang dimiliki node tersebut.` });
      let p = root, par = null, side = null;
      for (;;) {
        if (p == null) {
          r.push({ grp: `cari ${x}`, kind: 'Hasil', ln: 'none', vars: { x }, S: S({ path: [] }), title: `${x} tidak ada`, body: `Penelusuran sampai di NULL. ${x} tidak ada di pohon, jadi tidak ada yang dihapus dan pohon tetap sama.` });
          break;
        }
        const t = N[p], hit = x === t.v, left = x < t.v; r.cnt.Perbandingan++;
        const nk = kid(t), kase = nk === 2 ? 2 : nk;
        r.push({ grp: `cari ${x}`, kind: 'Bandingkan', ln: hit ? 'found' : left ? 'left' : 'right', vars: { x, 'akar->data': t.v }, S: S({ p, tag: [[p, 'akar']] }), title: hit ? `${x} ketemu` : `${x} ${left ? '<' : '>'} ${t.v}`,
          body: hit ? `${x} == ${t.v}. Node ini yang dihapus. Anaknya ${nk === 0 ? 'tidak ada (daun)' : nk === 1 ? 'hanya satu' : 'ada dua'}.` : `Turun ke ${left ? 'kiri' : 'kanan'} lewat <code>akar-&gt;${left ? 'kiri' : 'kanan'} = hapus(akar-&gt;${left ? 'kiri' : 'kanan'}, x)</code>. Hasil pemanggilan itu disimpan kembali ke pointer yang sama.`,
          q: hit ? { t: `Node ${t.v} punya berapa anak?`, o: ['Tidak ada (daun)', 'Satu anak', 'Dua anak'], a: kase } : { t: `Dari ${t.v}, ${x} dicari ke mana?`, o: ['Ke kiri', 'Ke kanan'], a: left ? 0 : 1 } });
        if (!hit) { par = p; side = left ? 'l' : 'r'; p = left ? t.l : t.r; continue; }
        const g = nk === 0 ? 'Kasus 1: daun' : nk === 1 ? 'Kasus 2: satu anak' : 'Kasus 3: dua anak';
        if (nk < 2) {
          const ch = t.l == null ? t.r : t.l, ln = t.l == null ? 'noL' : 'noR', parV = par == null ? null : N[par].v;
          r.push({ grp: g, kind: 'Periksa', ln, vars: { x, 'akar->data': t.v }, S: S({ p, bad: p, tag: [[p, 'akar']], edge: ch != null ? [ch] : [] }), title: nk === 0 ? `${t.v} tidak punya anak` : `Anak ${t.v} naik menggantikannya`,
            body: nk === 0 ? `<code>akar-&gt;kiri == NULL</code>, jadi <code>t = akar-&gt;kanan</code>, yaitu NULL juga. Node ${t.v} dibuang dengan <code>delete</code>, dan ${parV == null ? 'pohon menjadi kosong' : `pointer ${side === 'l' ? 'kiri' : 'kanan'} milik ${parV} diisi NULL`}.`
              : `${t.l == null ? 'Anak kiri kosong' : 'Anak kanan kosong'}, jadi <code>t</code> menyimpan satu-satunya anak, ${N[ch].v}. ${t.v} dibuang, lalu ${N[ch].v} beserta seluruh subpohonnya ${parV == null ? 'menjadi akar baru' : `tersambung langsung ke ${parV}`}.` });
          t.gone = true; relink(par, side, ch);
          r.push({ grp: g, kind: 'Hapus', ln: 'end', vars: { x }, S: S({ hi: ch }), title: `${x} terhapus`, body: `Pohon tinggal ${N.filter(n => !n.gone).length} node. Urutan inorder tetap urut: ${this.ino(N, root).join(', ') || 'kosong'}.` });
        } else {
          let sp = t.r, spar = p, sside = 'r';
          r.push({ grp: g, kind: 'Periksa', ln: 'succ', vars: { x, 'akar->data': t.v, 's->data': N[sp].v }, S: S({ p, tag: [[p, 'akar'], [sp, 's']], s: sp }), title: 'Cari pengganti di subpohon kanan',
            body: `${t.v} punya dua anak, jadi tidak bisa langsung dibuang. Penggantinya adalah <b>angka terkecil di subpohon kanan</b> (successor): angka itu lebih besar dari semua isi kiri dan lebih kecil dari sisa isi kanan. Mulai dari <code>s = akar-&gt;kanan</code> = ${N[sp].v}.`,
            q: { t: 'Dari s, ke mana mencari angka terkecil?', o: ['Terus ke kiri', 'Terus ke kanan', 'Kembali ke akar'], a: 0 } });
          while (N[sp].l != null) { spar = sp; sside = 'l'; sp = N[sp].l;
            r.push({ grp: g, kind: 'Telusuri', ln: 'succ', vars: { x, 'akar->data': t.v, 's->data': N[sp].v }, S: S({ p, tag: [[p, 'akar'], [sp, 's']], s: sp }), title: `s turun ke ${N[sp].v}`, body: `<code>s-&gt;kiri</code> masih ada, jadi <code>s = s-&gt;kiri</code>. Angka yang lebih kecil selalu di kiri.` }); }
          const sv = N[sp].v;
          r.push({ grp: g, kind: 'Periksa', ln: 'succ', vars: { x, 'akar->data': t.v, 's->data': sv }, S: S({ p, tag: [[p, 'akar'], [sp, 's']], s: sp }), title: `Pengganti: ${sv}`,
            body: `${sv} tidak punya anak kiri, jadi ${sv} adalah angka terkecil di subpohon kanan ${t.v}.`,
            q: { t: `Setelah dihapus, angka berapa yang menempati posisi ${t.v}?`, ...AL_ALGO.traversal.opts(N, [sp, ...N.filter(n => !n.gone && n.id !== sp && n.id !== p).map(n => n.id)], 0) } });
          t.v = sv;
          r.push({ grp: g, kind: 'Salin', ln: 'copy', vars: { x, 'akar->data': sv, 's->data': sv }, S: S({ p, hi: p, bad: sp, tag: [[p, 'akar'], [sp, 's']] }), title: `${x} ditimpa ${sv}`,
            body: `<code>akar-&gt;data = s-&gt;data</code>. Node di posisi ${x} sekarang berisi ${sv}, jadi ${x} sudah hilang dari pohon. Tapi sekarang ${sv} ada dua: yang lama harus dibuang.` });
          const ch = N[sp].r;
          N[sp].gone = true; N[spar][sside] = ch;
          r.push({ grp: g, kind: 'Hapus', ln: 'recDel', vars: { x, 'akar->data': sv }, S: S({ hi: p, edge: ch != null ? [ch] : [] }), title: `${sv} yang lama dibuang`,
            body: `<code>hapus(akar-&gt;kanan, ${sv})</code> membuang node ${sv} yang lama. Node itu tidak punya anak kiri, jadi ini selalu kasus 1 atau 2 ${ch != null ? `(anak kanannya, ${N[ch].v}, naik menggantikan)` : '(daun, langsung dibuang)'}. Inorder sekarang: ${this.ino(N, root).join(', ')}.` });
        }
        break;
      }
      const ino = this.ino(N, root);
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'end', vars: { x }, S: S({ end: true }), title: 'Selesai',
        body: `Isi pohon dibaca inorder: ${ino.length ? ino.join(', ') : 'kosong'}. Aturan BST (kiri lebih kecil, kanan lebih besar) tetap terjaga.`,
        note: ['Bisa juga dari kiri', 'Selain angka terkecil di subpohon kanan (successor), pengganti boleh angka terbesar di subpohon kiri (predecessor). Hasil pohonnya berbeda, tapi keduanya benar. Lihat soal: dosen biasanya menyebut mana yang dipakai.'] });
      return r.F;
    },
    ino(N, root) { const o = []; (function w(i) { if (i == null) return; w(N[i].l); o.push(N[i].v); w(N[i].r); })(root); return o; },
    view(A, s, f) {
      const S = f.S;
      if (S.root == null) return `<svg class="al-svg" viewBox="0 0 560 90" role="img" aria-label="Pohon kosong"><text class="al-lbl al-muted" x="280" y="50" style="text-anchor:middle">pohon kosong (akar = NULL)</text></svg>`;
      const tr = alTreeSvg(S.nodes, S.root, { top: 40, edge: S.edge, tags: S.tag, cls: id => id === S.bad ? 'bad' : id === S.hi ? 'found' : id === S.p || id === S.s ? 'cmp' : S.end ? 'done' : '' });
      return `<svg class="al-svg" viewBox="0 0 560 ${tr.h}" role="img" aria-label="Pohon berisi ${esc(tr.ord.map(i => S.nodes.find(t => t.id === i).v).join(', '))}">${tr.g}</svg>`;
    },
    program(s) {
      const L = ['#include <iostream>', 'using namespace std;', '', ...this.code.cpp, '', ...alSisipCode(), '',
        'void inorder(Node* akar) {', '    if (akar == NULL) return;', '    inorder(akar->kiri);', '    cout << akar->data << " ";', '    inorder(akar->kanan);', '}', '', 'int main() {', '    Node* akar = NULL;'];
      s.data.forEach(v => L.push(`    akar = sisip(akar, ${v});`));
      L.push('    cout << "Sebelum: "; inorder(akar); cout << endl;', `    akar = hapus(akar, ${s.target});`, `    cout << "Sesudah hapus ${s.target}: "; inorder(akar); cout << endl;`, '    return 0;', '}');
      const F = this.run(s.data, s.target), last = F[F.length - 1].S, ino = this.ino(Object.fromEntries(last.nodes.map(t => [t.id, t])), last.root);
      return { code: L.join('\n'), out: alOutLines([`Sebelum: ${s.data.slice().sort((a, b) => a - b).join(' ')}`, `Sesudah hapus ${s.target}: ${ino.join(' ')}`]) };
    }
  }
});

// ---------- Heap (max-heap dari array) ----------
// Perintah: angka = sisip, "ambil" = keluarkan yang terbesar.
const alHeapInput = {
  mode: 'text', aria: 'Perintah dipisah koma: angka berarti sisip, ambil berarti keluarkan yang terbesar',
  hint: '3 sampai 10 perintah, dipisah koma. Angka 0–99 berarti <b>sisip</b>, kata <b>ambil</b> berarti keluarkan angka terbesar. Contoh: 40, 25, 60, ambil, 50',
  fmt: d => (d || []).join(', '),
  parse(raw) {
    const t = String(raw).split(/[\s,;]+/).filter(Boolean);
    if (t.length < 3 || t.length > 10) return { err: 'Isi 3 sampai 10 perintah, dipisah koma. Contoh: 40, 25, 60, ambil, 50' };
    const data = [];
    for (const x of t) {
      if (/^\d+$/.test(x) && +x <= 99) data.push(+x);
      else if (/^(ambil|-|pop|keluar|hapus)$/i.test(x)) data.push('ambil');
      else return { err: `"${x}" tidak dikenal. Pakai angka 0–99 untuk menyisipkan dan "ambil" untuk mengeluarkan yang terbesar.` };
    }
    if (!data.some(alNum)) return { err: 'Minimal ada satu angka yang disisipkan.' };
    return { data };
  },
  acak() {
    const len = alRnd(6, 10), data = []; let size = 0;
    while (data.length < len) { if (size < 2 || Math.random() < 0.7) { data.push(alRnd(1, 99)); size++; } else { data.push('ambil'); size--; } }
    return { data };
  }
};
Object.assign(AL_ALGO, {
  heap: {
    counters: ['Perbandingan', 'Pertukaran'],
    vars: ['n', 'x', 'i', 'h[i]', 'induk / anak'],
    code: {
      cpp: ['const int MAX = 15;', 'int h[MAX];', 'int n = 0;', '', 'void sisip(int x) {', '    int i = n;', '    h[i] = x;', '    n++;', '    while (i > 0 && h[(i - 1) / 2] < h[i]) {', '        swap(h[i], h[(i - 1) / 2]);', '        i = (i - 1) / 2;', '    }', '}', '',
        'int ambil() {', '    if (n == 0) return -1;', '    int akar = h[0];', '    n--;', '    h[0] = h[n];', '    int i = 0;', '    while (true) {', '        int kiri = 2 * i + 1, kanan = 2 * i + 2, besar = i;', '        if (kiri < n && h[kiri] > h[besar]) besar = kiri;', '        if (kanan < n && h[kanan] > h[besar]) besar = kanan;', '        if (besar == i) break;', '        swap(h[i], h[besar]);', '        i = besar;', '    }', '    return akar;', '}'],
      ps: ['heap disimpan di array h, n = banyak isi', 'sisip(x):', '    taruh x di h[n], n = n + 1', '    selama x lebih besar dari induknya (indeks (i-1)/2):', '        tukar x dengan induknya, naik satu tingkat',
        'ambil():', '    simpan h[0] (yang terbesar)', '    pindahkan isi terakhir ke h[0], n = n - 1', '    selama ada anak yang lebih besar:', '        tukar dengan anak yang paling besar, turun satu tingkat', '    kembalikan yang disimpan tadi']
    },
    lines: {
      cpp: { decl: [1, 2, 3], put: [6, 7, 8], upCmp: [9], upSwap: [10, 11], upEnd: [9], empty: [16], take: [17, 18, 19], downCmp: [21, 22, 23, 24], downSwap: [26, 27], downEnd: [25], ret: [29], end: [3] },
      ps: { decl: [1], put: [2, 3], upCmp: [4], upSwap: [5], upEnd: [4], empty: [6], take: [7, 8], downCmp: [9], downSwap: [10], downEnd: [9], ret: [11], end: [1] }
    },
    input: alHeapInput,
    run(data) {
      const r = alRec2(), h = [], out = [];
      r.cnt.Perbandingan = 0; r.cnt.Pertukaran = 0;
      const S = o => Object.assign({ h: h.slice(), out: out.slice() }, o);
      const ops = data.map(v => alNum(v) ? `sisip(${v})` : 'ambil()');
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'decl', vars: { n: 0 }, S: S({}), title: 'Induk selalu lebih besar dari anaknya',
        body: '<b>Max-heap</b> adalah pohon biner lengkap yang disimpan di array. Aturannya: setiap induk <b>lebih besar atau sama</b> dengan anak-anaknya, jadi angka terbesar selalu di <code>h[0]</code>. Anak dari indeks i ada di <code>2i + 1</code> dan <code>2i + 2</code>, induknya di <code>(i - 1) / 2</code>.',
        note: ['Perintah yang dijalankan', ops.join(', ')] });
      data.forEach((v, k) => {
        const g = `${k + 1}. ${ops[k]}`;
        if (alNum(v)) {
          let i = h.length; h.push(v);
          r.push({ grp: g, kind: 'Masuk', ln: 'put', vars: { n: h.length, x: v, i, 'h[i]': v }, S: S({ cur: i }), title: `${v} ditaruh di h[${i}]`,
            body: `Angka baru selalu ditaruh di tempat kosong pertama, yaitu <code>h[${i}]</code>, supaya pohonnya tetap lengkap. ${i ? 'Sekarang dicek apakah ia lebih besar dari induknya.' : 'Heap tadinya kosong, jadi ia langsung menjadi akar.'}` });
          while (i > 0) {
            const p = (i - 1) >> 1, up = h[p] < h[i]; r.cnt.Perbandingan++;
            r.push({ grp: g, kind: 'Bandingkan', ln: 'upCmp', vars: { n: h.length, x: v, i, 'h[i]': h[i], 'induk / anak': h[p] }, S: S({ cur: i, other: p }), title: `${h[i]} lebih besar dari induk ${h[p]}?`,
              body: `Induk dari indeks ${i} adalah <code>(${i} - 1) / 2 = ${p}</code>, isinya ${h[p]}. ${up ? `${h[i]} > ${h[p]}, aturan heap dilanggar, jadi keduanya ditukar.` : `${h[i]} tidak lebih besar, jadi ${h[i]} berhenti di sini.`}`,
              q: { t: `Apakah ${h[i]} ditukar dengan induknya (${h[p]})?`, o: ['Ya, naik', 'Tidak, berhenti'], a: up ? 0 : 1 } });
            if (!up) break;
            [h[i], h[p]] = [h[p], h[i]]; r.cnt.Pertukaran++;
            r.push({ grp: g, kind: 'Tukar', ln: 'upSwap', vars: { n: h.length, x: v, i: p, 'h[i]': h[p] }, S: S({ cur: p, other: i, sw: true }), title: `${v} naik ke h[${p}]`, body: `<code>swap</code> menukar isi h[${i}] dan h[${p}], lalu <code>i = ${p}</code>.${p === 0 ? ` ${v} sekarang di akar, jadi perulangan berhenti.` : ''}` });
            i = p;
          }
          return;
        }
        if (!h.length) {
          r.push({ grp: g, kind: 'Gagal', ln: 'empty', vars: { n: 0 }, S: S({}), title: 'Heap kosong', body: 'Tidak ada yang bisa diambil. Fungsi mengembalikan -1 sebagai tanda gagal.' });
          out.push(-1); return;
        }
        const top = h[0], last = h.pop(); out.push(top);
        if (h.length) h[0] = last;
        r.push({ grp: g, kind: 'Keluar', ln: 'take', vars: { n: h.length, x: top, i: 0, 'h[i]': h.length ? last : undefined }, S: S({ cur: h.length ? 0 : null, took: top }), title: `${top} diambil dari akar`,
          body: h.length ? `Yang terbesar selalu di <code>h[0]</code>, yaitu ${top}. Tempatnya diisi angka paling akhir, ${last}, lalu <code>n--</code>. Akar baru ini kemungkinan terlalu kecil, jadi harus turun.` : `${top} adalah satu-satunya isi heap. Sekarang heap kosong.` });
        if (!h.length) return;
        let i = 0;
        for (;;) {
          const L = 2 * i + 1, R = 2 * i + 2; let b = i;
          if (L < h.length) { r.cnt.Perbandingan++; if (h[L] > h[b]) b = L; }
          if (R < h.length) { r.cnt.Perbandingan++; if (h[R] > h[b]) b = R; }
          const kids = [L, R].filter(c => c < h.length);
          if (!kids.length) { r.push({ grp: g, kind: 'Selesai', ln: 'downEnd', vars: { n: h.length, i, 'h[i]': h[i] }, S: S({ cur: i, took: top }), title: `${h[i]} sampai di daun`, body: `h[${i}] tidak punya anak, jadi ${h[i]} berhenti di sini.` }); break; }
          const kv = kids.map(c => h[c]), o = [...kids.map(c => `Tukar dengan ${h[c]}`), 'Tidak ditukar'];
          r.push({ grp: g, kind: 'Bandingkan', ln: 'downCmp', vars: { n: h.length, i, 'h[i]': h[i], 'induk / anak': kv.join(' / ') }, S: S({ cur: i, kids, took: top }), title: `Bandingkan ${h[i]} dengan anak ${kv.join(' dan ')}`,
            body: b === i ? `Tidak ada anak yang lebih besar dari ${h[i]}, jadi aturan heap sudah terpenuhi.` : `Anak terbesar adalah ${h[b]} di h[${b}], dan ${h[b]} > ${h[i]}. Yang dinaikkan harus <b>anak yang paling besar</b>, supaya ia lebih besar dari saudaranya juga.`,
            q: { t: `Apa yang dilakukan pada ${h[i]}?`, o, a: b === i ? o.length - 1 : kids.indexOf(b) } });
          if (b === i) { r.push({ grp: g, kind: 'Selesai', ln: 'downEnd', vars: { n: h.length, i, 'h[i]': h[i] }, S: S({ cur: i, took: top }), title: `${h[i]} berhenti di h[${i}]`, body: '<code>besar == i</code>, jadi perulangan berhenti dengan <code>break</code>.' }); break; }
          [h[i], h[b]] = [h[b], h[i]]; r.cnt.Pertukaran++;
          r.push({ grp: g, kind: 'Tukar', ln: 'downSwap', vars: { n: h.length, i: b, 'h[i]': h[b] }, S: S({ cur: b, other: i, sw: true, took: top }), title: `${h[b]} turun ke h[${b}]`, body: `${h[i]} naik ke h[${i}] dan ${h[b]} turun ke h[${b}], lalu <code>i = ${b}</code>.` });
          i = b;
        }
      });
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'end', vars: { n: h.length }, S: S({ end: true }), title: 'Selesai',
        body: `Isi array heap: ${h.length ? alList(h) : 'kosong'}. Urutan yang diambil: ${out.length ? out.join(', ') : 'belum ada'}.${out.filter(x => x >= 0).length > 1 ? ' Perhatikan bahwa yang keluar selalu yang terbesar saat itu.' : ''}`,
        note: ['Priority queue', 'Heap adalah cara paling umum membuat priority queue: antrian yang selalu melayani prioritas tertinggi lebih dulu, bukan yang datang lebih dulu. Sisip dan ambil sama-sama O(log n), karena hanya menyusuri satu jalur dari akar ke daun.'] });
      return r.F;
    },
    view(A, s, f) {
      const S = f.S, h = S.h, n = h.length;
      let g = '', y = 40;
      if (n) {
        const nodes = h.map((v, i) => ({ id: i, v, l: 2 * i + 1 < n ? 2 * i + 1 : null, r: 2 * i + 2 < n ? 2 * i + 2 : null }));
        const tr = alTreeSvg(nodes, 0, { top: 40, cls: i => i === S.cur ? (S.sw ? 'found' : 'cmp') : i === S.other || (S.kids || []).includes(i) ? 'chk' : S.end ? 'done' : '' });
        g += tr.g; y = tr.h + 14;
      } else g += `<text class="al-lbl al-muted" x="280" y="58" style="text-anchor:middle">heap kosong (n = 0)</text>`, y = 84;
      const bw = 46, x0 = 280 - Math.max(n, 1) * 25;
      g += `<text class="al-lbl" x="20" y="${y + 6}">array h</text>`;
      h.forEach((v, i) => { const c = i === S.cur ? (S.sw ? 'found' : 'cmp') : i === S.other || (S.kids || []).includes(i) ? 'chk' : '';
        g += `<g class="al-box${c === 'chk' ? ' al-done' : c ? ' al-' + c : ''}" transform="translate(${x0 + i * 50},${y + 16})"><rect width="${bw}" height="38" rx="6"/><text x="${bw / 2}" y="19">${v}</text></g><text class="al-idx" x="${x0 + i * 50 + bw / 2}" y="${y + 74}">${i}</text>`; });
      y += 104;
      g += `<text class="al-lbl" x="20" y="${y + 6}">diambil: ${S.out.length ? S.out.join(', ') : '–'}</text>`;
      return `<svg class="al-svg" viewBox="0 0 560 ${y + 18}" role="img" aria-label="Heap: ${esc(h.join(', ') || 'kosong')}. Diambil: ${esc(S.out.join(', ') || 'belum ada')}">${g}</svg>`;
    },
    program(s) {
      const L = ['#include <iostream>', '#include <algorithm>', 'using namespace std;', '', ...this.code.cpp, '', 'int main() {'], out = [], h = [];
      const up = () => { let i = h.length - 1; while (i > 0 && h[(i - 1) >> 1] < h[i]) { const p = (i - 1) >> 1; [h[i], h[p]] = [h[p], h[i]]; i = p; } };
      const down = () => { let i = 0; for (;;) { const a = 2 * i + 1, b = 2 * i + 2; let m = i; if (a < h.length && h[a] > h[m]) m = a; if (b < h.length && h[b] > h[m]) m = b; if (m === i) break; [h[i], h[m]] = [h[m], h[i]]; i = m; } };
      s.data.forEach(v => {
        if (alNum(v)) { L.push(`    sisip(${v});`); h.push(v); up(); }
        else { L.push('    cout << "ambil: " << ambil() << endl;'); if (!h.length) out.push('ambil: -1'); else { const t = h[0], last = h.pop(); if (h.length) { h[0] = last; down(); } out.push('ambil: ' + t); } }
      });
      L.push('    cout << "Isi heap: ";', '    for (int i = 0; i < n; i++) cout << h[i] << " ";', '    cout << endl;', '    return 0;', '}');
      out.push('Isi heap: ' + h.join(' '));
      return { code: L.join('\n'), out: alOutLines(out) };
    }
  }
});

// ---------- Dijkstra (graf berbobot, matriks bobot) ----------
const AL_DLET = 'ABCDEF';
const alWGraphInput = {
  mode: 'text', aria: 'Sisi berbobot, misalnya A-B:4, A-C:2', targetLabel: 'mulai', targetAria: 'Simpul awal (huruf)', targetMode: 'text',
  hint: '2 sampai 10 sisi berbobot, dipisah koma, ditulis <b>A-B:4</b> (huruf A–F, bobot 1–20). Kotak <b>mulai</b> diisi huruf simpul awal.',
  fmt: d => (d || []).join(', '),
  parse(raw, rawT) {
    const t = String(raw).split(/[\s,;]+/).filter(Boolean), seen = new Set(), data = [];
    for (const x of t) {
      const m = /^([A-Fa-f])-?([A-Fa-f])[:=](\d+)$/.exec(x);
      if (!m) return { err: `"${x}" bukan sisi berbobot. Tulis seperti A-B:4 (huruf A–F, lalu titik dua dan bobotnya).` };
      const a = m[1].toUpperCase(), b = m[2].toUpperCase(), w = +m[3];
      if (a === b) return { err: `${a}-${b} menghubungkan simpul ke dirinya sendiri. Pakai dua huruf berbeda.` };
      if (w < 1 || w > 20) return { err: `Bobot ${a}-${b} harus 1 sampai 20.` };
      const key = [a, b].sort().join('');
      if (seen.has(key)) return { err: `Sisi ${a}-${b} ditulis dua kali. Tulis setiap pasangan sekali saja.` };
      seen.add(key); data.push(`${a}-${b}:${w}`);
    }
    if (data.length < 2 || data.length > 10) return { err: 'Isi 2 sampai 10 sisi. Contoh: A-B:4, A-C:2, B-C:1' };
    const st = String(rawT).trim().toUpperCase();
    if (!/^[A-F]$/.test(st) || !data.some(e => e.slice(0, 3).includes(st))) return { err: 'Isi kotak mulai dengan satu huruf simpul yang ada di sisi-sisi tadi.' };
    return { data, target: st };
  },
  acak() {
    const k = alRnd(4, 6), L = AL_DLET.slice(0, k).split(''), E = new Map();
    for (let i = 1; i < k; i++) { const j = alRnd(0, i - 1); E.set(L[j] + '-' + L[i], alRnd(1, 12)); }
    for (let t = 0; t < 12 && E.size < Math.min(10, k + alRnd(1, 3)); t++) { const a = alRnd(0, k - 1), b = alRnd(0, k - 1); if (a !== b) { const key = [L[a], L[b]].sort().join('-'); if (!E.has(key)) E.set(key, alRnd(1, 12)); } }
    return { data: [...E].map(([e, w]) => `${e}:${w}`), target: 'A' };
  }
};
const alWEdges = data => data.map(e => { const [ab, w] = e.split(':'), [a, b] = ab.split('-'); return { a, b, w: +w }; });
Object.assign(AL_ALGO, {
  dijkstra: {
    target: true,
    counters: ['Pemeriksaan sisi', 'Pembaruan'],
    vars: ['u', 'v', 'jarak[u]', 'w[u][v]', 'jarak[v]'],
    code: {
      cpp: ['const int N = 6;            // simpul A–F = 0–5', 'const int INF = 9999;', 'int w[N][N];                // w[u][v] = bobot, 0 = tidak ada sisi', 'int jarak[N];', 'bool selesai[N];', '',
        'void dijkstra(int awal) {', '    for (int i = 0; i < N; i++) {', '        jarak[i] = INF;', '        selesai[i] = false;', '    }', '    jarak[awal] = 0;',
        '    for (int k = 0; k < N; k++) {', '        int u = -1;', '        for (int i = 0; i < N; i++)', '            if (!selesai[i] && (u == -1 || jarak[i] < jarak[u])) u = i;', '        if (jarak[u] == INF) break;', '        selesai[u] = true;',
        '        for (int v = 0; v < N; v++) {', '            if (w[u][v] > 0 && jarak[u] + w[u][v] < jarak[v])', '                jarak[v] = jarak[u] + w[u][v];', '        }', '    }', '}'],
      ps: ['dijkstra(awal):', '    semua jarak = ∞, jarak[awal] = 0', '    ulangi:', '        u = simpul belum selesai dengan jarak terkecil', '        jika jarak[u] = ∞: berhenti (sisanya tak terjangkau)', '        tandai u selesai',
        '        untuk setiap tetangga v dari u:', '            jika jarak[u] + w(u,v) < jarak[v]:', '                jarak[v] = jarak[u] + w(u,v)']
    },
    lines: {
      cpp: { decl: [1, 2, 3, 4, 5], init: [8, 9, 10, 11, 12], pick: [13, 14, 15, 16, 18], stop: [17], relax: [19, 20], upd: [21], end: [24] },
      ps: { decl: [1], init: [2], pick: [3, 4, 6], stop: [5], relax: [7, 8], upd: [9], end: [1] }
    },
    input: alWGraphInput,
    run(data, start) {
      const r = alRec2(), E = alWEdges(data), nodes = [...new Set(E.flatMap(e => [e.a, e.b]))].sort(), W = {};
      nodes.forEach(n => { W[n] = {}; }); E.forEach(e => { W[e.a][e.b] = e.w; W[e.b][e.a] = e.w; });
      const D = {}, prev = {}, done = new Set(); nodes.forEach(n => { D[n] = Infinity; }); D[start] = 0;
      r.cnt['Pemeriksaan sisi'] = 0; r.cnt.Pembaruan = 0;
      const fmt = x => x === Infinity ? '∞' : x;
      const S = o => Object.assign({ D: Object.assign({}, D), done: [...done], prev: Object.assign({}, prev) }, o);
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'decl', vars: {}, S: S({ pre: true }), title: `Jarak terpendek dari ${start}`,
        body: `Setiap sisi punya <b>bobot</b> (misalnya jarak dalam km). Dijkstra mencari total bobot terkecil dari ${start} ke setiap simpul. Idenya: selalu kerjakan simpul yang jaraknya <b>paling kecil</b> dan belum selesai. Jarak simpul itu sudah pasti, lalu dipakai untuk memperbaiki jarak tetangganya.` });
      r.push({ grp: 'Mulai', kind: 'Mulai', ln: 'init', vars: { 'jarak[u]': 0 }, S: S({}), title: `jarak[${start}] = 0, lainnya ∞`, body: `Belum ada jalur yang diketahui, jadi semua jarak diisi INF (∞, ditulis 9999 di kode). Hanya ${start} yang jaraknya 0, karena kita mulai dari sana.` });
      for (;;) {
        const left = nodes.filter(n => !done.has(n)); if (!left.length) break;
        const u = left.reduce((m, n) => D[n] < D[m] ? n : m, left[0]);
        if (D[u] === Infinity) {
          r.push({ grp: 'Berhenti', kind: 'Hasil', ln: 'stop', vars: { u }, S: S({}), title: 'Sisanya tidak terjangkau', body: `Simpul yang belum selesai (${left.join(', ')}) semuanya masih ∞. Tidak ada jalur dari ${start} ke sana, jadi perulangan berhenti dengan <code>break</code>.` });
          break;
        }
        const g = `pilih ${u}`, others = left.filter(n => n !== u).sort((a, b) => D[a] - D[b] || (a < b ? -1 : 1)).slice(0, 2), o = [u, ...others].sort();
        r.push({ grp: g, kind: 'Pilih', ln: 'pick', vars: { u, 'jarak[u]': D[u] }, S: S({ u }), title: `${u} selesai, jaraknya ${D[u]}`,
          body: `Di antara simpul yang belum selesai, jarak terkecil milik ${u} (${D[u]}).${left.length > 1 ? ` Tidak mungkin ada jalur lebih pendek ke ${u} lewat simpul lain, karena simpul lain jaraknya sudah ${D[u]} atau lebih dan bobot tidak pernah negatif.` : ''} ${u} ditandai selesai.`,
          q: left.length > 1 ? { t: 'Simpul mana yang dikerjakan berikutnya?', o, a: o.indexOf(u) } : undefined });
        done.add(u);
        Object.keys(W[u]).sort().forEach(v => {
          if (done.has(v)) return;
          const w = W[u][v], cand = D[u] + w, better = cand < D[v]; r.cnt['Pemeriksaan sisi']++;
          r.push({ grp: g, kind: 'Periksa', ln: 'relax', vars: { u, v, 'jarak[u]': D[u], 'w[u][v]': w, 'jarak[v]': fmt(D[v]) }, S: S({ u, v }), title: `Lewat ${u} ke ${v}: ${D[u]} + ${w} = ${cand}`,
            body: `Jarak ke ${v} kalau lewat ${u} adalah ${D[u]} + ${w} = ${cand}. Jarak ${v} yang tercatat sekarang ${fmt(D[v])}. ${better ? `${cand} lebih kecil, jadi jalur lewat ${u} lebih pendek.` : `${cand} tidak lebih kecil, jadi jarak ${v} tetap.`}`,
            q: { t: `Apakah jarak[${v}] diganti menjadi ${cand}?`, o: ['Ya, lebih pendek', 'Tidak, tetap'], a: better ? 0 : 1 } });
          if (better) { const old = D[v]; D[v] = cand; prev[v] = u; r.cnt.Pembaruan++;
            r.push({ grp: g, kind: 'Perbarui', ln: 'upd', vars: { u, v, 'jarak[u]': D[u], 'w[u][v]': w, 'jarak[v]': cand }, S: S({ u, v, hi: v }), title: `jarak[${v}] = ${cand}`, body: `${fmt(old)} diganti ${cand}. Untuk sementara, jalur terbaik ke ${v} datang dari ${u}. Nilai ini masih bisa diperbaiki lagi sampai ${v} sendiri dipilih.` }); }
        });
      }
      const path = n => { const p = [n]; while (prev[p[0]]) p.unshift(prev[p[0]]); return p; };
      const far = nodes.filter(n => n !== start && D[n] < Infinity).sort((a, b) => D[b] - D[a])[0];
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'end', vars: {}, S: S({ end: true }), title: 'Jarak terpendek dari ' + start,
        body: nodes.map(n => `${n} = ${fmt(D[n])}`).join(', ') + '.' + (far ? ` Contoh rute: ke ${far} lewat ${path(far).join(' → ')}.` : ''),
        note: ['Bobot negatif', 'Dijkstra hanya benar untuk bobot yang tidak negatif. Kalau ada bobot negatif, simpul yang sudah "selesai" ternyata masih bisa diperpendek, dan dipakai algoritma lain (Bellman-Ford).'] });
      r.F.forEach(f => { f.S.nodes = nodes; f.S.E = E; f.S.start = start; });
      return r.F;
    },
    view(A, s, f) {
      const S = f.S, nodes = S.nodes, k = nodes.length, cx = 280, cy = 128, rx = 200, ry = 92;
      const P = {}; alGraphOrder(nodes, S.E.map(e => e.a + '-' + e.b)).forEach((n, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / k; P[n] = [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; });
      const tree = new Set(Object.entries(S.prev).map(([v, u]) => [u, v].sort().join('')));
      let g = '';
      S.E.forEach(e => { const on = S.u && S.v && [e.a, e.b].sort().join('') === [S.u, S.v].sort().join(''), tr = tree.has([e.a, e.b].sort().join(''));
        g += `<line class="al-edge${on ? ' is-on' : tr ? ' is-tree' : ''}" x1="${P[e.a][0]}" y1="${P[e.a][1]}" x2="${P[e.b][0]}" y2="${P[e.b][1]}"/>`; });
      // Bobot di tengah sisi, digeser sedikit tegak lurus supaya tidak menimpa garis
      S.E.forEach(e => { const [x1, y1] = P[e.a], [x2, y2] = P[e.b], L = Math.hypot(x2 - x1, y2 - y1) || 1, nx = -(y2 - y1) / L, ny = (x2 - x1) / L, sg = (cx - (x1 + x2) / 2) * nx + (cy - (y1 + y2) / 2) * ny > 0 ? -1 : 1;
        g += `<text class="al-idx al-w" x="${((x1 + x2) / 2 + sg * nx * 14).toFixed(1)}" y="${((y1 + y2) / 2 + sg * ny * 14 + 5).toFixed(1)}">${e.w}</text>`; });
      nodes.forEach(n => { const c = n === S.u ? 'cmp' : n === S.v ? (S.hi ? 'found' : 'chk') : S.done.includes(n) || S.end ? 'done' : '';
        g += `<g class="al-gn${c ? ' al-' + c : ''}" transform="translate(${P[n][0]},${P[n][1]})"><circle r="19"/><text>${n}</text></g>`; });
      const y = 290, bw = 66, x0 = 280 - k * 37;
      g += `<text class="al-lbl" x="20" y="${y - 30}">jarak dari ${S.start}</text>`;
      nodes.forEach((n, i) => { const c = n === S.hi ? 'found' : n === S.u ? 'cmp' : S.done.includes(n) || S.end ? 'done' : '', d = S.pre ? '' : S.D[n] === Infinity ? '∞' : S.D[n];
        g += `<text class="al-lbl" x="${x0 + i * 74 + bw / 2}" y="${y + 6}" style="text-anchor:middle">${n}</text><g class="al-box${c ? ' al-' + c : ''}" transform="translate(${x0 + i * 74},${y + 14})"><rect width="${bw}" height="38" rx="6"/><text x="${bw / 2}" y="19">${d}</text></g>`; });
      return `<svg class="al-svg" viewBox="0 0 560 ${y + 64}" role="img" aria-label="Graf berbobot ${esc(S.E.map(e => e.a + '-' + e.b + ' ' + e.w).join(', '))}. Jarak: ${esc(nodes.map(n => n + ' ' + (S.D[n] === Infinity ? 'tak hingga' : S.D[n])).join(', '))}">${g}</svg>`;
    },
    program(s) {
      const L = ['#include <iostream>', 'using namespace std;', '', ...this.code.cpp, '', 'void sambung(char a, char b, int bobot) {', "    w[a - 'A'][b - 'A'] = bobot;", "    w[b - 'A'][a - 'A'] = bobot;", '}', '', 'int main() {'];
      alWEdges(s.data).forEach(e => L.push(`    sambung('${e.a}', '${e.b}', ${e.w});`));
      const F = this.run(s.data, s.target), last = F[F.length - 1].S;
      L.push(`    dijkstra('${s.target}' - 'A');`, `    char simpul[] = {${last.nodes.map(n => `'${n}'`).join(', ')}};`, `    for (int i = 0; i < ${last.nodes.length}; i++) {`, "        int j = jarak[simpul[i] - 'A'];",
        '        cout << simpul[i] << ": ";', '        if (j == INF) cout << "tidak terjangkau" << endl;', '        else cout << j << endl;', '    }', '    return 0;', '}');
      return { code: L.join('\n'), out: alOutLines(last.nodes.map(n => `${n}: ${last.D[n] === Infinity ? 'tidak terjangkau' : last.D[n]}`)) };
    }
  }
});
