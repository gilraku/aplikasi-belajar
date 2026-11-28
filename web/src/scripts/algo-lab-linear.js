// Lab Struktur Data & Algoritma, bab "Struktur linear": stack, queue, dan linked list.
// Ditambahkan ke AL_ALGO dari algo-lab.js (file ini dimuat sesudahnya). Tiap algoritma punya gambar (view),
// formulir data sendiri (input), dan program lengkap (program) sendiri. Frame membawa keadaan gambarnya di S.

// Perintah stack/queue: angka = masuk, kata `word` (pop / deq) = keluar.
function alOpsInput(word) {
  return {
    mode: 'text', aria: `Perintah dipisah koma: angka berarti masuk, ${word} berarti keluar`,
    hint: `3 sampai 10 perintah, dipisah koma. Angka 0–99 berarti masuk, <b>${word}</b> berarti keluar. Contoh: 5, 3, ${word}, 8`,
    fmt: d => (d || []).map(v => alNum(v) ? v : word).join(', '),
    parse(raw) {
      const t = raw.split(/[\s,;]+/).filter(Boolean);
      if (t.length < 3 || t.length > 10) return { err: `Isi 3 sampai 10 perintah, dipisah koma. Contoh: 5, 3, ${word}, 8` };
      const data = [];
      for (const x of t) {
        if (/^\d+$/.test(x) && +x <= 99) data.push(+x);
        else if (/^(-|pop|deq|dequeue|keluar|out)$/i.test(x)) data.push(word);
        else return { err: `"${x}" tidak dikenal. Pakai angka 0–99 untuk memasukkan dan "${word}" untuk mengeluarkan.` };
      }
      if (!data.some(alNum)) return { err: 'Minimal ada satu angka yang dimasukkan.' };
      return { data };
    },
    acak() {
      const len = 6 + Math.floor(Math.random() * 4), data = [];
      let size = 0;
      while (data.length < len) {
        if (size === 0 || Math.random() < 0.6) { data.push(1 + Math.floor(Math.random() * 60)); size++; }
        else { data.push(word); size--; }
      }
      return { data };
    }
  };
}
// Pilihan tebakan "angka berapa yang keluar": angka yang benar, angka di ujung lain, dan "kosong".
function alOutQ(right, other, empty, fallback) {
  const nums = [...new Set([right, other, fallback].filter(v => v != null))].sort((p, q) => p - q).slice(0, 2);
  if (!empty && !nums.includes(right)) nums[0] = right;
  const o = nums.map(String).concat('Tidak ada, kosong');
  return { o, a: empty ? o.length - 1 : o.indexOf(String(right)) };
}
const alBox = (mv, id, v, x, y, c, w = 84) => `<g class="al-box al-mv${c ? ' al-' + c : ''}" ${mv(id, x, y)}><rect width="${w}" height="38" rx="6"/><text x="${w / 2}" y="19">${v}</text></g>`;
const alPtr = (mv, id, x, y, label) => `<g class="al-ptr al-mv" ${mv(id, x, y)}><path d="M0 12 V0 M-5 6 L0 0 L5 6"/><text x="0" y="28">${esc(label)}</text></g>`;
const alOutLines = out => out.map(l => l.trimEnd()).join('\n');

Object.assign(AL_ALGO, {
  // ---------------- Stack ----------------
  stack: {
    counters: ['Push', 'Pop'],
    vars: ['MAX', 'top', 'x', 'st[top]'],
    code: {
      cpp: ['const int MAX = 5;', 'int st[MAX];', 'int top = -1;', '', 'void push(int x) {', '    if (top == MAX - 1) {', '        cout << "Stack penuh" << endl;', '        return;', '    }', '    top++;', '    st[top] = x;', '}', '',
        'int pop() {', '    if (top == -1) {', '        cout << "Stack kosong" << endl;', '        return -1;', '    }', '    int x = st[top];', '    top--;', '    return x;', '}'],
      ps: ['MAX = 5, top = -1   (stack kosong)', 'push(x):', '    jika top == MAX-1: tulis "Stack penuh", berhenti', '    top = top + 1', '    st[top] = x',
        'pop():', '    jika top == -1: tulis "Stack kosong", berhenti', '    x = st[top]', '    top = top - 1', '    kembalikan x']
    },
    lines: {
      cpp: { decl: [1, 2, 3], pushChk: [5, 6], full: [7, 8], push: [10, 11], popChk: [14, 15], empty: [16, 17], pop: [19, 20, 21], end: [3] },
      ps: { decl: [1], pushChk: [2, 3], full: [3], push: [4, 5], popChk: [6, 7], empty: [7], pop: [8, 9, 10], end: [1] }
    },
    input: alOpsInput('pop'),
    run(data) {
      const r = alRec2(), MAX = 5, st = [], out = [];
      let top = -1, uid = 0, lastOut = null;
      r.cnt.Push = 0; r.cnt.Pop = 0;
      const S = (o = {}) => Object.assign({ st: st.slice(), out: out.slice(), top }, o);
      const ops = data.map(v => alNum(v) ? `push(${v})` : 'pop()');
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'decl', vars: { MAX, top }, S: S(), title: 'Yang terakhir masuk, pertama keluar',
        body: `Stack (tumpukan) hanya bisa diisi dan diambil dari <b>atas</b>, seperti tumpukan piring. Stack ini dibuat dari array <code>st</code> berisi ${MAX} tempat. <code>top</code> menyimpan indeks isi paling atas, dan <code>top = -1</code> artinya stack masih kosong.`,
        note: ['Perintah yang dijalankan', ops.join(', ')] });
      data.forEach((v, k) => {
        const g = `${k + 1}. ${ops[k]}`;
        if (alNum(v)) {
          const e = { id: uid++, v }, full = top === MAX - 1;
          r.push({ grp: g, kind: 'Periksa', ln: 'pushChk', vars: { MAX, top, x: v, 'st[top]': top >= 0 ? st[top].v : undefined }, S: S({ inc: e }), title: `push(${v}): masih ada tempat?`,
            body: `Sebelum menaruh ${v}, cek dulu apakah stack penuh: <code>top == MAX - 1</code>, yaitu ${top} == ${MAX - 1}? ${full ? '<b>Ya</b>, kelima tempat sudah terisi.' : 'Tidak, masih ada tempat.'}`,
            q: { t: `Stack berisi ${top + 1} dari ${MAX} tempat. Apakah ${v} bisa masuk?`, o: ['Bisa masuk', 'Tidak, stack penuh'], a: full ? 1 : 0 } });
          if (full) {
            r.push({ grp: g, kind: 'Gagal', ln: 'full', vars: { MAX, top, x: v, 'st[top]': st[top].v }, S: S({ inc: Object.assign({}, e, { c: 'bad' }) }), title: 'Stack penuh (overflow)',
              body: `${v} ditolak. Program menulis "Stack penuh" lalu <code>return</code>, jadi <code>top</code> tetap ${top}. Tanpa pengecekan ini, <code>st[${top + 1}]</code> akan ditulis di luar array.` });
          } else {
            top++; st.push(e); r.cnt.Push++;
            r.push({ grp: g, kind: 'Masuk', ln: 'push', vars: { MAX, top, x: v, 'st[top]': v }, S: S({ hi: e.id }), title: `${v} masuk di st[${top}]`,
              body: `<code>top++</code> membuat top menjadi ${top}, lalu <code>st[${top}] = ${v}</code>. Sekarang ${v} berada paling atas.` });
          }
        } else {
          const empty = top === -1, topV = empty ? null : st[top].v, Q = alOutQ(topV, empty ? null : st[0].v, empty, lastOut != null ? lastOut : data.find(alNum));
          r.push({ grp: g, kind: 'Periksa', ln: 'popChk', vars: { MAX, top, 'st[top]': empty ? undefined : topV }, S: S({ hi: empty ? null : st[top].id }), title: 'pop(): ada isinya?',
            body: `pop selalu mengambil dari atas. Cek dulu <code>top == -1</code>, yaitu ${top} == -1? ${empty ? '<b>Ya</b>, stack kosong.' : `Tidak. Yang paling atas adalah st[${top}] = ${topV}.`}`,
            q: { t: 'Angka berapa yang keluar dari pop() ini?', o: Q.o, a: Q.a } });
          if (empty) {
            r.push({ grp: g, kind: 'Gagal', ln: 'empty', vars: { MAX, top }, S: S(), title: 'Stack kosong (underflow)', body: 'Tidak ada yang bisa diambil. Program menulis "Stack kosong" dan mengembalikan -1 sebagai tanda gagal.' });
          } else {
            const e = st.pop(); top--; out.push(e); r.cnt.Pop++; lastOut = e.v;
            r.push({ grp: g, kind: 'Keluar', ln: 'pop', vars: { MAX, top, x: e.v, 'st[top]': top >= 0 ? st[top].v : undefined }, S: S({ hi: e.id }), title: `${e.v} keluar`,
              body: `<code>x = st[${top + 1}]</code> menyimpan ${e.v}, lalu <code>top--</code> menjadi ${top}. ${top >= 0 ? `Sekarang yang paling atas adalah ${st[top].v}.` : 'Stack kembali kosong.'}`,
              note: ['Datanya tidak dihapus', `Angka ${e.v} sebenarnya masih tersimpan di st[${top + 1}]. Karena top sudah turun, tempat itu dianggap kosong dan akan ditimpa oleh push berikutnya.`] });
          }
        }
      });
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'end', vars: { MAX, top }, S: S({ end: true }), title: 'Selesai',
        body: `Isi stack dari bawah ke atas: ${st.length ? alList(st.map(e => e.v)) : 'kosong'}. Urutan yang keluar: ${out.length ? out.map(e => e.v).join(', ') : 'belum ada'}.`,
        note: ['LIFO', 'Last In, First Out: yang masuk paling akhir selalu keluar paling dulu. Contoh nyata: tombol Undo, tombol Back di browser, dan urutan pemanggilan fungsi.'] });
      return r.F;
    },
    view(A, s, f) {
      const S = f.S, mv = alMover(s), MAX = 5, cx = 120, cw = 100, sh = 46, base = 316, slotY = k => base - (k + 1) * sh;
      let g = '';
      for (let k = 0; k < MAX; k++) g += `<rect class="al-slot" x="${cx}" y="${slotY(k)}" width="${cw}" height="${sh}"/><text class="al-idx" x="${cx - 20}" y="${slotY(k) + sh / 2 + 4}">[${k}]</text>`;
      g += `<path class="al-wall" d="M${cx} ${slotY(MAX - 1) - 6} V${base} H${cx + cw} V${slotY(MAX - 1) - 6}"/>`;
      S.st.forEach((e, k) => { g += alBox(mv, 'e' + e.id, e.v, cx + 8, slotY(k) + 4, e.id === S.hi ? (f.kind === 'Periksa' ? 'cmp' : 'found') : (S.end ? 'done' : '')); });
      if (S.inc) g += alBox(mv, 'e' + S.inc.id, S.inc.v, cx + 8, 14, S.inc.c || 'cmp') + `<text class="al-lbl" x="${cx + cw + 10}" y="38">x = ${S.inc.v}</text>`;
      const ty = S.top >= 0 ? slotY(S.top) + sh / 2 : base + 14;
      g += `<g class="al-ptr al-mv" ${mv('top', cx + cw + 6, ty)}><path d="M0 0 H24 M6 -5 L0 0 L6 5"/><text x="62" y="4">top = ${S.top}</text></g>`;
      g += `<text class="al-lbl" x="340" y="34">Urutan keluar</text>`;
      S.out.forEach((e, i) => { g += alBox(mv, 'e' + e.id, e.v, 340 + (i % 4) * 50, 46 + Math.floor(i / 4) * 48, e.id === S.hi ? 'found' : 'done', 44); });
      if (!S.out.length) g += `<text class="al-lbl al-muted" x="340" y="68">belum ada</text>`;
      return `<svg class="al-svg" viewBox="0 0 560 348" role="img" aria-label="Isi stack dari bawah: ${esc(S.st.map(e => e.v).join(', ') || 'kosong')}">${g}</svg>`;
    },
    program(s) {
      const L = ['#include <iostream>', 'using namespace std;', '', ...this.code.cpp, '', 'int main() {'], out = [], st = [];
      if (s.data.some(v => !alNum(v))) L.push('    int x;');
      s.data.forEach(v => {
        if (alNum(v)) { L.push(`    push(${v});`); if (st.length === 5) out.push('Stack penuh'); else st.push(v); }
        else { L.push('    x = pop();', '    cout << "pop: " << x << endl;'); if (!st.length) out.push('Stack kosong', 'pop: -1'); else out.push('pop: ' + st.pop()); }
      });
      L.push('', '    cout << "Isi stack dari bawah: ";', '    for (int i = 0; i <= top; i++) cout << st[i] << " ";', '    cout << endl;', '    return 0;', '}');
      out.push('Isi stack dari bawah: ' + st.join(' '));
      return { code: L.join('\n'), out: alOutLines(out) };
    }
  },

  // ---------------- Queue (antrian melingkar) ----------------
  queue: {
    counters: ['Enqueue', 'Dequeue'],
    vars: ['MAX', 'front', 'rear', 'jumlah', 'x'],
    code: {
      cpp: ['const int MAX = 5;', 'int q[MAX];', 'int front = 0, rear = -1, jumlah = 0;', '', 'void enqueue(int x) {', '    if (jumlah == MAX) {', '        cout << "Antrian penuh" << endl;', '        return;', '    }', '    rear = (rear + 1) % MAX;', '    q[rear] = x;', '    jumlah++;', '}', '',
        'int dequeue() {', '    if (jumlah == 0) {', '        cout << "Antrian kosong" << endl;', '        return -1;', '    }', '    int x = q[front];', '    front = (front + 1) % MAX;', '    jumlah--;', '    return x;', '}'],
      ps: ['MAX = 5, front = 0, rear = -1, jumlah = 0', 'enqueue(x):', '    jika jumlah == MAX: tulis "Antrian penuh", berhenti', '    rear = (rear + 1) mod MAX', '    q[rear] = x, jumlah = jumlah + 1',
        'dequeue():', '    jika jumlah == 0: tulis "Antrian kosong", berhenti', '    x = q[front]', '    front = (front + 1) mod MAX, jumlah = jumlah - 1', '    kembalikan x']
    },
    lines: {
      cpp: { decl: [1, 2, 3], enqChk: [5, 6], full: [7, 8], enq: [10, 11, 12], deqChk: [15, 16], empty: [17, 18], deq: [20, 21, 22, 23], end: [3] },
      ps: { decl: [1], enqChk: [2, 3], full: [3], enq: [4, 5], deqChk: [6, 7], empty: [7], deq: [8, 9, 10], end: [1] }
    },
    input: alOpsInput('deq'),
    run(data) {
      const r = alRec2(), MAX = 5, q = Array(MAX).fill(null), out = [];
      let front = 0, rear = -1, jumlah = 0, uid = 0, lastOut = null;
      r.cnt.Enqueue = 0; r.cnt.Dequeue = 0;
      const S = (o = {}) => Object.assign({ q: q.slice(), out: out.slice(), front, rear, jumlah }, o);
      const V = o => Object.assign({ MAX, front, rear, jumlah }, o);
      const ops = data.map(v => alNum(v) ? `enqueue(${v})` : 'dequeue()');
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'decl', vars: V(), S: S(), title: 'Yang pertama masuk, pertama keluar',
        body: `Queue (antrian) diisi dari <b>belakang</b> dan diambil dari <b>depan</b>, seperti antrean kasir. <code>front</code> menunjuk isi paling depan, <code>rear</code> menunjuk isi paling belakang, dan <code>jumlah</code> mencatat banyaknya isi.`,
        note: ['Perintah yang dijalankan', ops.join(', ')] });
      data.forEach((v, k) => {
        const g = `${k + 1}. ${ops[k]}`;
        if (alNum(v)) {
          const e = { id: uid++, v }, full = jumlah === MAX;
          r.push({ grp: g, kind: 'Periksa', ln: 'enqChk', vars: V({ x: v }), S: S({ inc: e }), title: `enqueue(${v}): masih ada tempat?`,
            body: `Cek dulu <code>jumlah == MAX</code>, yaitu ${jumlah} == ${MAX}? ${full ? '<b>Ya</b>, antrian penuh.' : 'Tidak, masih ada tempat.'}`,
            q: { t: `Antrian berisi ${jumlah} dari ${MAX} tempat. Apakah ${v} bisa masuk?`, o: ['Bisa masuk', 'Tidak, antrian penuh'], a: full ? 1 : 0 } });
          if (full) {
            r.push({ grp: g, kind: 'Gagal', ln: 'full', vars: V({ x: v }), S: S({ inc: Object.assign({}, e, { c: 'bad' }) }), title: 'Antrian penuh', body: `${v} ditolak. Program menulis "Antrian penuh" lalu <code>return</code>. front, rear, dan jumlah tidak berubah.` });
          } else {
            const old = rear; rear = (rear + 1) % MAX; q[rear] = e; jumlah++; r.cnt.Enqueue++;
            const wrap = old === MAX - 1;
            r.push({ grp: g, kind: 'Masuk', ln: 'enq', vars: V({ x: v }), S: S({ hi: e.id }), title: `${v} masuk di q[${rear}]`,
              body: `<code>rear = (${old} + 1) % ${MAX} = ${rear}</code>, lalu <code>q[${rear}] = ${v}</code> dan jumlah menjadi ${jumlah}.${wrap ? ' rear kembali ke 0 karena tempat di depan sudah kosong.' : ''}`,
              note: wrap ? ['Antrian melingkar', `Operasi <code>% ${MAX}</code> membuat indeks setelah ${MAX - 1} kembali ke 0. Tempat yang sudah ditinggalkan dequeue bisa dipakai lagi, jadi array tidak cepat "penuh palsu".`] : undefined });
          }
        } else {
          const empty = jumlah === 0, fv = empty ? null : q[front].v, Q = alOutQ(fv, empty ? null : q[rear].v, empty, lastOut != null ? lastOut : data.find(alNum));
          r.push({ grp: g, kind: 'Periksa', ln: 'deqChk', vars: V(), S: S({ hi: empty ? null : q[front].id }), title: 'dequeue(): ada isinya?',
            body: `dequeue selalu mengambil dari depan. Cek dulu <code>jumlah == 0</code>, yaitu ${jumlah} == 0? ${empty ? '<b>Ya</b>, antrian kosong.' : `Tidak. Yang paling depan adalah q[${front}] = ${fv}.`}`,
            q: { t: 'Angka berapa yang keluar dari dequeue() ini?', o: Q.o, a: Q.a } });
          if (empty) {
            r.push({ grp: g, kind: 'Gagal', ln: 'empty', vars: V(), S: S(), title: 'Antrian kosong', body: 'Tidak ada yang bisa diambil. Program menulis "Antrian kosong" dan mengembalikan -1.' });
          } else {
            const e = q[front], old = front; q[front] = null; front = (front + 1) % MAX; jumlah--; out.push(e); r.cnt.Dequeue++; lastOut = e.v;
            r.push({ grp: g, kind: 'Keluar', ln: 'deq', vars: V({ x: e.v }), S: S({ hi: e.id }), title: `${e.v} keluar dari depan`,
              body: `<code>x = q[${old}]</code> menyimpan ${e.v}, lalu <code>front = (${old} + 1) % ${MAX} = ${front}</code> dan jumlah menjadi ${jumlah}.` });
          }
        }
      });
      const rest = []; for (let i = 0; i < jumlah; i++) rest.push(q[(front + i) % MAX].v);
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'end', vars: V(), S: S({ end: true }), title: 'Selesai',
        body: `Isi antrian dari depan ke belakang: ${rest.length ? alList(rest) : 'kosong'}. Urutan yang keluar: ${out.length ? out.map(e => e.v).join(', ') : 'belum ada'}.`,
        note: ['FIFO', 'First In, First Out: yang masuk paling dulu keluar paling dulu. Contoh nyata: antrean cetak printer, antrean pesan, dan antrean pelanggan.'] });
      return r.F;
    },
    view(A, s, f) {
      const S = f.S, mv = alMover(s), MAX = 5, x0 = 70, sw = 74, y0 = 92, X = k => x0 + k * sw;
      let g = '';
      for (let k = 0; k < MAX; k++) g += `<rect class="al-slot" x="${X(k)}" y="${y0}" width="${sw - 6}" height="46"/><text class="al-idx" x="${X(k) + (sw - 6) / 2}" y="${y0 + 62}">[${k}]</text>`;
      S.q.forEach((e, k) => { if (e) g += alBox(mv, 'e' + e.id, e.v, X(k) + 5, y0 + 4, e.id === S.hi ? (f.kind === 'Periksa' ? 'cmp' : 'found') : (S.end ? 'done' : ''), 58); });
      if (S.inc) g += `<text class="al-lbl" x="${X(MAX) + 12}" y="${y0 - 10}">x = ${S.inc.v}</text>` + alBox(mv, 'e' + S.inc.id, S.inc.v, X(MAX) + 12, y0 + 4, S.inc.c || 'cmp', 58);
      const fx = X(S.front) + (sw - 6) / 2, rx = S.rear >= 0 ? X(S.rear) + (sw - 6) / 2 : X(0) - 34;
      const same = S.rear >= 0 && S.front === S.rear;
      g += alPtr(mv, 'pf', fx - (same ? 12 : 0), y0 + 74, 'front');
      g += `<g class="al-ptr al-mv" ${mv('pr', rx + (same ? 12 : 0), y0 + 74)}><path d="M0 12 V0 M-5 6 L0 0 L5 6"/>${S.rear >= 0 ? `<text x="0" y="${same ? 70 : 46}">rear</text>` : '<text x="0" y="46">rear</text><text x="0" y="70">= -1</text>'}</g>`;
      g += `<text class="al-lbl" x="${x0}" y="262">Sudah keluar (urutan dequeue)</text>`;
      S.out.forEach((e, i) => { g += alBox(mv, 'e' + e.id, e.v, x0 + i * 50, 272, e.id === S.hi ? 'found' : 'done', 44); });
      if (!S.out.length) g += `<text class="al-lbl al-muted" x="${x0}" y="294">belum ada</text>`;
      return `<svg class="al-svg" viewBox="0 0 560 324" role="img" aria-label="Isi antrian per indeks: ${esc(S.q.map(e => e ? e.v : '-').join(', '))}">${g}</svg>`;
    },
    program(s) {
      const L = ['#include <iostream>', 'using namespace std;', '', ...this.code.cpp, '', 'int main() {'], out = [], q = [];
      if (s.data.some(v => !alNum(v))) L.push('    int x;');
      s.data.forEach(v => {
        if (alNum(v)) { L.push(`    enqueue(${v});`); if (q.length === 5) out.push('Antrian penuh'); else q.push(v); }
        else { L.push('    x = dequeue();', '    cout << "dequeue: " << x << endl;'); if (!q.length) out.push('Antrian kosong', 'dequeue: -1'); else out.push('dequeue: ' + q.shift()); }
      });
      L.push('', '    cout << "Isi antrian dari depan: ";', '    for (int i = 0; i < jumlah; i++) cout << q[(front + i) % MAX] << " ";', '    cout << endl;', '    return 0;', '}');
      out.push('Isi antrian dari depan: ' + q.join(' '));
      return { code: L.join('\n'), out: alOutLines(out) };
    }
  },

  // ---------------- Linked list ----------------
  linked: {
    target: true,
    counters: ['Pindah p'],
    vars: ['x', 'baru->data', 'p->data', 'head->data'],
    code: {
      cpp: ['struct Node {', '    int data;', '    Node* next;', '};', 'Node* head = NULL;', '', 'void tambahBelakang(int x) {', '    Node* baru = new Node;', '    baru->data = x;', '    baru->next = NULL;', '    if (head == NULL) {', '        head = baru;', '        return;', '    }', '    Node* p = head;', '    while (p->next != NULL) {', '        p = p->next;', '    }', '    p->next = baru;', '}', '',
        'void hapus(int x) {', '    if (head == NULL) return;', '    if (head->data == x) {', '        Node* h = head;', '        head = head->next;', '        delete h;', '        return;', '    }', '    Node* p = head;', '    while (p->next != NULL && p->next->data != x) {', '        p = p->next;', '    }', '    if (p->next != NULL) {', '        Node* h = p->next;', '        p->next = h->next;', '        delete h;', '    }', '}'],
      ps: ['node berisi data dan next; head = NULL', 'tambahBelakang(x):', '    buat node baru: data = x, next = NULL', '    jika head == NULL: head = baru, selesai', '    p = head', '    selama p.next != NULL: p = p.next', '    p.next = baru',
        'hapus(x):', '    jika head.data == x: head = head.next, buang node lama, selesai', '    p = head', '    selama p.next != NULL dan p.next.data != x: p = p.next', '    jika p.next != NULL: h = p.next, p.next = h.next, buang h']
    },
    lines: {
      cpp: { decl: [1, 2, 3, 4, 5], new: [8, 9, 10], chk: [11], headSet: [12, 13], pStart: [15], walk: [16], step: [17], link: [19], delHead: [24], delHeadDo: [25, 26], free1: [27, 28], pStart2: [30], delWalk: [31], delStep: [32], notFound: [34], unlink: [34, 35, 36], free2: [37], end: [5] },
      ps: { decl: [1], new: [2, 3], chk: [4], headSet: [4], pStart: [5], walk: [6], step: [6], link: [7], delHead: [8, 9], delHeadDo: [9], free1: [9], pStart2: [10], delWalk: [11], delStep: [11], notFound: [12], unlink: [12], free2: [12], end: [1] }
    },
    input: {
      mode: 'numeric', aria: 'Angka yang ditambahkan, dipisah koma', targetLabel: 'hapus', targetAria: 'Angka yang dihapus',
      hint: '2 sampai 6 bilangan bulat 0–99, dipisah koma. Semua ditambahkan di belakang, lalu angka di kotak <b>hapus</b> dibuang dari list.',
      parse(raw, rawT) {
        const nums = raw.split(/[\s,;]+/).filter(Boolean).map(Number);
        if (nums.length < 2 || nums.length > 6 || nums.some(v => !Number.isInteger(v) || v < 0 || v > 99)) return { err: 'Isi 2 sampai 6 bilangan bulat 0–99, dipisah koma. Contoh: 12, 7, 25' };
        const t = Number(rawT.trim());
        if (rawT.trim() === '' || !Number.isInteger(t) || t < 0 || t > 99) return { err: 'Isi angka yang dihapus dengan bilangan bulat 0–99.' };
        return { data: nums, target: t };
      },
      acak() {
        const len = 3 + Math.floor(Math.random() * 4), data = [];
        while (data.length < len) { const v = 1 + Math.floor(Math.random() * 60); if (!data.includes(v)) data.push(v); }
        return { data, target: Math.random() < 0.8 ? data[Math.floor(Math.random() * len)] : 61 + Math.floor(Math.random() * 30) };
      }
    },
    run(data, x) {
      const r = alRec2(), list = [];
      let uid = 0;
      r.cnt['Pindah p'] = 0;
      const S = (o = {}) => Object.assign({ list: list.slice(), low: null, p: null, hi: null }, o);
      const hd = () => list.length ? list[0].v : undefined;
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'decl', vars: { 'head->data': undefined }, S: S(), title: 'Node yang saling menunjuk',
        body: `Linked list menyimpan data di <b>node</b>. Tiap node berisi <code>data</code> dan <code>next</code>, yaitu alamat node berikutnya. <code>head</code> menunjuk node pertama, dan node terakhir punya <code>next = NULL</code>. Mula-mula list kosong, jadi <code>head = NULL</code>.`,
        note: ['Yang akan dijalankan', `tambahBelakang untuk ${data.join(', ')}, lalu hapus(${x}).`] });
      data.forEach(v => {
        const g = `tambah ${v}`, e = { id: uid++, v };
        r.push({ grp: g, kind: 'Buat', ln: 'new', vars: { x: v, 'baru->data': v, 'head->data': hd() }, S: S({ low: { e, at: list.length, t: 'baru' } }), title: `Buat node baru berisi ${v}`,
          body: `<code>new Node</code> menyiapkan node baru di memori. <code>data</code> diisi ${v} dan <code>next</code> diisi NULL, karena node ini akan menjadi yang paling belakang.` });
        const empty = !list.length;
        r.push({ grp: g, kind: 'Periksa', ln: 'chk', vars: { x: v, 'baru->data': v, 'head->data': hd() }, S: S({ low: { e, at: list.length, t: 'baru' } }), title: 'List masih kosong?',
          body: `Cek <code>head == NULL</code>. ${empty ? '<b>Ya</b>, belum ada node sama sekali.' : `Tidak, head menunjuk node ${list[0].v}.`}`,
          q: { t: 'Apakah head == NULL?', o: ['Ya', 'Tidak'], a: empty ? 0 : 1 } });
        if (empty) {
          list.push(e);
          r.push({ grp: g, kind: 'Sambung', ln: 'headSet', vars: { x: v, 'baru->data': v, 'head->data': v }, S: S({ hi: e.id }), title: `head menunjuk ${v}`, body: `<code>head = baru</code>. Node ${v} menjadi node pertama sekaligus terakhir, lalu fungsi selesai.` });
          return;
        }
        let p = 0;
        r.push({ grp: g, kind: 'Telusuri', ln: 'pStart', vars: { x: v, 'baru->data': v, 'p->data': list[0].v, 'head->data': hd() }, S: S({ low: { e, at: list.length, t: 'baru' }, p }), title: 'p mulai dari head',
          body: 'Node baru harus dipasang setelah node terakhir. Linked list tidak punya indeks, jadi node terakhir dicari dengan berjalan dari head memakai penunjuk <code>p</code>.' });
        for (;;) {
          const last = p === list.length - 1;
          r.push({ grp: g, kind: 'Periksa', ln: 'walk', vars: { x: v, 'baru->data': v, 'p->data': list[p].v, 'head->data': hd() }, S: S({ low: { e, at: list.length, t: 'baru' }, p, cmp: list[p].id }), title: `p di ${list[p].v}: sudah yang terakhir?`,
            body: `Cek <code>p->next != NULL</code>. ${last ? `next dari ${list[p].v} adalah NULL, jadi ${list[p].v} node terakhir. Perulangan berhenti.` : `next dari ${list[p].v} menunjuk ${list[p + 1].v}, jadi belum terakhir.`}`,
            q: { t: `Apakah ${list[p].v} node terakhir (p->next == NULL)?`, o: ['Ya', 'Belum'], a: last ? 0 : 1 } });
          if (last) break;
          p++; r.cnt['Pindah p']++;
          r.push({ grp: g, kind: 'Telusuri', ln: 'step', vars: { x: v, 'baru->data': v, 'p->data': list[p].v, 'head->data': hd() }, S: S({ low: { e, at: list.length, t: 'baru' }, p }), title: `p pindah ke ${list[p].v}`, body: `<code>p = p->next</code>. p sekarang menunjuk node ${list[p].v}.` });
        }
        const tail = list[p].v; list.push(e);
        r.push({ grp: g, kind: 'Sambung', ln: 'link', vars: { x: v, 'baru->data': v, 'p->data': tail, 'head->data': hd() }, S: S({ p, hi: e.id }), title: `${tail} disambung ke ${v}`,
          body: `<code>p->next = baru</code>. next dari ${tail} yang tadinya NULL sekarang menunjuk node ${v}, jadi ${v} menjadi node terakhir.` });
      });
      // Hapus x
      const g = `hapus(${x})`, headHit = list[0].v === x;
      r.push({ grp: g, kind: 'Periksa', ln: 'delHead', vars: { x, 'head->data': hd() }, S: S({ cmp: list[0].id }), title: `hapus(${x}): node pertama?`,
        body: `Node pertama ditangani khusus, karena yang berubah adalah head. Cek <code>head->data == x</code>, yaitu ${list[0].v} == ${x}? ${headHit ? '<b>Ya</b>.' : 'Tidak.'}`,
        q: { t: `Apakah node pertama (${list[0].v}) yang dihapus?`, o: ['Ya', 'Bukan'], a: headHit ? 0 : 1 } });
      if (headHit) {
        const h = list.shift();
        r.push({ grp: g, kind: 'Lepas', ln: 'delHeadDo', vars: { x, 'head->data': hd() }, S: S({ low: { e: h, at: 0, t: 'h', c: 'bad' } }), title: `head pindah ke ${list.length ? list[0].v : 'NULL'}`,
          body: `<code>h = head</code> menyimpan alamat node ${h.v} supaya bisa dibuang nanti, lalu <code>head = head->next</code>. ${list.length ? `Sekarang list dimulai dari ${list[0].v}.` : 'List menjadi kosong.'}` });
        r.push({ grp: g, kind: 'Hapus', ln: 'free1', vars: { x, 'head->data': hd() }, S: S(), title: `Node ${h.v} dibuang`, body: '<code>delete h</code> mengembalikan memori node itu. Tidak ada node lain yang perlu digeser.' });
      } else {
        let p = 0;
        r.push({ grp: g, kind: 'Telusuri', ln: 'pStart2', vars: { x, 'p->data': list[0].v, 'head->data': hd() }, S: S({ p }), title: 'p mulai dari head',
          body: `Untuk melepas node ${x}, kita perlu node <b>sebelum</b> node itu, karena next milik node sebelumnya yang harus diubah. Jadi yang diperiksa adalah <code>p->next</code>, bukan p.` });
        let found = false;
        for (;;) {
          const nx = list[p + 1], hit = nx && nx.v === x;
          r.push({ grp: g, kind: 'Periksa', ln: 'delWalk', vars: { x, 'p->data': list[p].v, 'head->data': hd() }, S: S({ p, cmp: nx ? nx.id : null }), title: nx ? `Node setelah p berisi ${nx.v}` : `p di ${list[p].v}, setelahnya NULL`,
            body: nx ? `Cek <code>p->next->data != x</code>, yaitu ${nx.v} != ${x}? ${hit ? '<b>Tidak</b>, ini node yang dicari. Perulangan berhenti dengan p tepat sebelumnya.' : 'Ya, jadi p maju.'}` : `<code>p->next</code> sudah NULL. Semua node sudah diperiksa dan ${x} tidak ada.`,
            q: nx ? { t: `Apakah ${nx.v} node yang dihapus?`, o: ['Ya', 'Bukan'], a: hit ? 0 : 1 } : undefined });
          if (!nx) break;
          if (hit) { found = true; break; }
          p++; r.cnt['Pindah p']++;
          r.push({ grp: g, kind: 'Telusuri', ln: 'delStep', vars: { x, 'p->data': list[p].v, 'head->data': hd() }, S: S({ p }), title: `p pindah ke ${list[p].v}`, body: '<code>p = p->next</code>.' });
        }
        if (!found) {
          r.push({ grp: g, kind: 'Hasil', ln: 'notFound', vars: { x, 'p->data': list[p].v, 'head->data': hd() }, S: S({ p }), title: `${x} tidak ada di list`, body: '<code>p->next</code> bernilai NULL, jadi bagian <code>if</code> dilewati dan list tidak berubah.' });
        } else {
          const h = list.splice(p + 1, 1)[0], prev = list[p].v, after = list[p + 1];
          r.push({ grp: g, kind: 'Lepas', ln: 'unlink', vars: { x, 'p->data': prev, 'head->data': hd() }, S: S({ p, low: { e: h, at: p + 1, t: 'h', c: 'bad' } }), title: `${prev} dihubungkan langsung ke ${after ? after.v : 'NULL'}`,
            body: `<code>h = p->next</code> menyimpan node ${h.v}, lalu <code>p->next = h->next</code>. Sekarang next dari ${prev} melompati ${h.v}${after ? ` dan langsung menunjuk ${after.v}` : ' dan menjadi NULL'}. Node lain tidak ada yang digeser.` });
          r.push({ grp: g, kind: 'Hapus', ln: 'free2', vars: { x, 'p->data': prev, 'head->data': hd() }, S: S({ p }), title: `Node ${h.v} dibuang`, body: '<code>delete h</code> mengembalikan memori node itu ke sistem.' });
        }
      }
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'end', vars: { x, 'head->data': hd() }, S: S({ end: true }), title: 'Selesai',
        body: `Isi list: ${list.length ? list.map(e => e.v).join(' → ') + ' → NULL' : 'kosong (head = NULL)'}. Total p berpindah ${r.cnt['Pindah p']} kali.`,
        note: ['Kenapa memakai linked list?', 'Menyisipkan atau menghapus cukup mengubah satu atau dua next, tanpa menggeser data seperti di array. Gantinya, untuk sampai ke node tertentu harus berjalan dari head satu per satu.'] });
      return r.F;
    },
    view(A, s, f) {
      const S = f.S, mv = alMover(s), x0 = 24, sw = 96, y0 = 84, yl = 196, X = k => x0 + k * sw;
      const node = (e, x, y, c, nul, arrow) => `<g class="al-box al-node al-mv${c ? ' al-' + c : ''}" ${mv('n' + e.id, x, y)}><rect width="44" height="40" rx="5"/><rect class="al-nx" x="44" width="26" height="40" rx="5"/><text x="22" y="20">${e.v}</text><circle class="al-dot" cx="57" cy="20" r="3"/>${
        nul ? '<path class="al-arw" d="M57 20 H76"/><text class="al-null" x="80" y="20">NULL</text>' : arrow ? '<path class="al-arw" d="M57 20 H94 M88 15 L94 20 L88 25"/>' : ''}</g>`;
      let g = '';
      S.list.forEach((e, k) => { const c = e.id === S.cmp ? 'cmp' : e.id === S.hi ? 'found' : S.end ? 'done' : ''; g += node(e, X(k), y0, c, k === S.list.length - 1, k < S.list.length - 1); });
      if (S.list.length) g += `<g class="al-ptr al-mv" ${mv('head', X(0) + 22, y0 - 6)}><path d="M0 0 V-16 M-5 -6 L0 0 L5 -6"/><text x="0" y="-22">head</text></g>`;
      else g += `<g class="al-ptr al-mv" ${mv('head', X(0) + 22, y0 - 6)}><text x="-22" y="-22" style="text-anchor:start">head = NULL</text></g>`;
      if (S.p != null) g += alPtr(mv, 'p', X(S.p) + 22, y0 + 46, 'p');
      if (S.low) { const L = S.low; g += node(L.e, X(L.at), yl, L.c || 'cmp', L.t === 'baru', false) + `<text class="al-lbl" x="${X(L.at) + 22}" y="${yl + 60}" text-anchor="middle">${L.t}</text>`; }
      return `<svg class="al-svg al-wide" viewBox="0 0 620 276" role="img" aria-label="Isi linked list: ${esc(S.list.map(e => e.v).join(' → ') || 'kosong')}">${g}</svg>`;
    },
    program(s) {
      const L = ['#include <iostream>', 'using namespace std;', '', ...this.code.cpp, '', 'void cetak() {', '    Node* p = head;', '    while (p != NULL) {', '        cout << p->data << " -> ";', '        p = p->next;', '    }', '    cout << "NULL" << endl;', '}', '', 'int main() {'];
      s.data.forEach(v => L.push(`    tambahBelakang(${v});`));
      L.push('    cetak();', `    hapus(${s.target});`, '    cetak();', '    return 0;', '}');
      const list = s.data.slice(), show = () => list.map(v => v + ' -> ').join('') + 'NULL', out = [show()];
      const i = list.indexOf(s.target); if (i >= 0) list.splice(i, 1);
      out.push(show());
      return { code: L.join('\n'), out: alOutLines(out) };
    }
  }
});

// ---------- Aplikasi stack: cek pasangan kurung dan menghitung postfix ----------
const AL_BUKA = { ')': '(', ']': '[', '}': '{' };
const alCharRow = (s, cur, y, cls) => s.map((c, i) => { const x = 280 - s.length * 16 + i * 32, k = cls(i);
  return `<g class="al-box${k ? ' al-' + k : ''}" transform="translate(${x},${y})"><rect width="28" height="36" rx="5"/><text x="14" y="18">${esc(c)}</text></g>${i === cur ? `<text class="al-idx" x="${x + 14}" y="${y + 56}">i = ${i}</text>` : ''}`; }).join('');

Object.assign(AL_ALGO, {
  // ---------------- Cek pasangan kurung ----------------
  kurung: {
    counters: ['Push', 'Pop'],
    vars: ['i', 'c', 'top', 'st[top]'],
    code: {
      cpp: ['bool seimbang(string s) {', '    char st[50];', '    int top = -1;', '    int n = s.length();', '    for (int i = 0; i < n; i++) {', '        char c = s[i];', "        if (c == '(' || c == '[' || c == '{') {", '            top++;', '            st[top] = c;',
        "        } else if (c == ')' || c == ']' || c == '}') {", '            if (top == -1) return false;', '            char buka = st[top];', '            top--;',
        "            if (c == ')' && buka != '(') return false;", "            if (c == ']' && buka != '[') return false;", "            if (c == '}' && buka != '{') return false;", '        }', '    }', '    return top == -1;', '}'],
      ps: ['seimbang(s):   stack st kosong', '    untuk setiap karakter c di s:', '        jika c kurung buka: push(c)', '        jika c kurung tutup:', '            jika stack kosong: tidak seimbang', '            buka = pop()', '            jika buka bukan pasangan c: tidak seimbang', '    seimbang jika stack kosong di akhir']
    },
    lines: {
      cpp: { decl: [1, 2, 3, 4], open: [6, 7, 8, 9], close: [6, 10, 11], empty: [11], pop: [12, 13, 14, 15, 16], bad: [14, 15, 16], end: [19] },
      ps: { decl: [1], open: [2, 3], close: [4, 5], empty: [5], pop: [6, 7], bad: [7], end: [8] }
    },
    input: {
      mode: 'text', aria: 'Teks berisi kurung, misalnya {[(a+b)*c]}',
      hint: '2 sampai 16 karakter: kurung <b>( ) [ ] { }</b>, huruf, angka, atau + - * /. Spasi diabaikan. Contoh: {[(a+b)*c]}',
      fmt: d => (d || []).join(''),
      parse(raw) {
        const s = String(raw).replace(/\s+/g, '').split('');
        if (s.length < 2 || s.length > 16) return { err: 'Isi 2 sampai 16 karakter. Contoh: {[(a+b)*c]}' };
        const badc = s.find(c => !/^[()[\]{}a-zA-Z0-9+\-*/]$/.test(c));
        if (badc) return { err: `Karakter "${badc}" tidak bisa dipakai. Pakai kurung ( ) [ ] { }, huruf, angka, atau + - * /.` };
        if (!s.some(c => '()[]{}'.includes(c))) return { err: 'Minimal ada satu kurung.' };
        return { data: s };
      },
      acak() {
        const P = ['()', '[]', '{}'], build = d => { if (d === 0 || Math.random() < 0.3) return ''; const p = P[alRnd(0, 2)]; return p[0] + build(d - 1) + p[1] + (Math.random() < 0.4 ? build(d - 1) : ''); };
        let s = ''; while (s.length < 4 || s.length > 14) s = build(3) + build(2);
        const a = s.split('');
        if (Math.random() < 0.5) { const i = alRnd(0, a.length - 1), k = '()[]{}'; a[i] = k[(k.indexOf(a[i]) + 2 + alRnd(0, 3)) % 6]; }
        return { data: a };
      }
    },
    run(data) {
      const r = alRec2(), st = [], txt = data.join('');
      let top = -1, uid = 0, ok = true;
      r.cnt.Push = 0; r.cnt.Pop = 0;
      const S = o => Object.assign({ s: data, st: st.slice() }, o);
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'decl', vars: { top }, S: S({}), title: 'Setiap kurung tutup harus menemukan pasangannya',
        body: `Teks <code>${esc(txt)}</code> dibaca dari kiri. Kurung buka disimpan di stack. Setiap kurung tutup harus cocok dengan kurung buka <b>yang paling akhir</b> disimpan, dan itulah isi paling atas stack. Huruf, angka, dan operator dilewati.` });
      for (let i = 0; i < data.length && ok; i++) {
        const c = data[i], g = `i = ${i}: ${c}`;
        if ('([{'.includes(c)) {
          top++; st.push({ id: uid++, c }); r.cnt.Push++;
          r.push({ grp: g, kind: 'Masuk', ln: 'open', vars: { i, c, top, 'st[top]': c }, S: S({ i, hi: st[top].id }), title: `${c} masuk stack`, body: `<code>${c}</code> kurung buka, jadi disimpan: <code>top++</code> menjadi ${top}, lalu <code>st[${top}] = '${c}'</code>.` });
        } else if (')]}'.includes(c)) {
          const empty = top === -1, buka = empty ? null : st[top].c, match = buka === AL_BUKA[c];
          r.push({ grp: g, kind: 'Periksa', ln: 'close', vars: { i, c, top, 'st[top]': empty ? undefined : buka }, S: S({ i, hi: empty ? null : st[top].id }), title: `${c} kurung tutup: cek atas stack`,
            body: empty ? '<code>top == -1</code>: stack kosong, padahal ada kurung tutup.' : `Isi paling atas adalah <code>${buka}</code>. Pasangan <code>${c}</code> seharusnya <code>${AL_BUKA[c]}</code>.`,
            q: { t: `Apa yang terjadi dengan ${c}?`, o: ['Cocok, pasangan dibuang', 'Tidak cocok, berhenti', 'Stack kosong, berhenti'], a: empty ? 2 : match ? 0 : 1 } });
          if (empty) { ok = false;
            r.push({ grp: g, kind: 'Gagal', ln: 'empty', vars: { i, c, top }, S: S({ i, badc: i }), title: 'Tidak seimbang: kurung tutup kelebihan', body: `<code>${c}</code> di indeks ${i} tidak punya kurung buka. Fungsi langsung <code>return false</code>.` }); break; }
          const e = st.pop(); top--; r.cnt.Pop++;
          if (match) r.push({ grp: g, kind: 'Keluar', ln: 'pop', vars: { i, c, top, 'st[top]': top >= 0 ? st[top].c : undefined }, S: S({ i, out: e, ok: true }), title: `${buka} dan ${c} berpasangan`, body: `<code>buka = st[top]</code> lalu <code>top--</code> menjadi ${top}. <code>${buka}</code> memang pasangan <code>${c}</code>, jadi keduanya selesai.` });
          else { ok = false;
            r.push({ grp: g, kind: 'Gagal', ln: 'bad', vars: { i, c, top }, S: S({ i, out: e, badc: i }), title: 'Tidak seimbang: pasangan salah', body: `Yang keluar <code>${buka}</code>, padahal <code>${c}</code> butuh <code>${AL_BUKA[c]}</code>. Kurungnya bersilang, jadi fungsi <code>return false</code>.` }); }
        }
      }
      if (ok) {
        const fine = top === -1;
        r.push({ grp: 'Akhir', kind: fine ? 'Hasil' : 'Gagal', ln: 'end', vars: { top }, S: S({ end: true, badEnd: !fine }), title: fine ? 'Seimbang' : 'Tidak seimbang: kurung buka tersisa',
          body: fine ? `Semua karakter sudah dibaca dan stack kosong (<code>top == -1</code>). Setiap kurung buka sudah bertemu pasangannya: <code>${esc(txt)}</code> seimbang.` : `Teks habis, tapi stack masih berisi ${st.map(e => e.c).join(' ')}. Kurung buka itu tidak pernah ditutup, jadi <code>top == -1</code> bernilai false.`,
          note: ['Mengapa stack', 'Kurung yang dibuka paling akhir harus ditutup paling dulu. Itu persis sifat LIFO, sehingga cukup melihat isi paling atas stack.'] });
      } else {
        r.push({ grp: 'Akhir', kind: 'Hasil', ln: 'end', vars: { top }, S: S({ end: true, badEnd: true }), title: 'Hasil: tidak seimbang', body: `<code>${esc(txt)}</code> tidak seimbang. Sisa teks tidak perlu dibaca lagi.` });
      }
      return r.F;
    },
    view(A, s, f) {
      const S = f.S, mv = alMover(s), y = 168;
      let g = `<text class="al-lbl" x="20" y="22">teks</text>` + alCharRow(S.s, S.end ? null : S.i, 34, i => i === S.badc ? 'bad' : S.end ? 'done' : i === S.i ? 'cmp' : S.i != null && i < S.i ? 'done' : '');
      g += `<text class="al-lbl" x="20" y="${y - 12}">stack (bawah → atas)</text><line class="al-floor" x1="16" x2="16" y1="${y - 2}" y2="${y + (S.st.length > 8 ? 88 : 42)}"/>`;
      // Lebih dari 8 kurung buka bertumpuk: lanjut di baris kedua supaya tetap di dalam gambar
      S.st.forEach((e, k) => { g += alBox(mv, 'e' + e.id, e.c, 24 + (k % 8) * 50, y + Math.floor(k / 8) * 46, e.id === S.hi ? 'cmp' : '', 44); });
      if (!S.st.length) g += `<text class="al-lbl al-muted" x="28" y="${y + 24}">kosong</text>`;
      if (S.out) g += alBox(mv, 'e' + S.out.id, S.out.c, 470, y, S.ok ? 'found' : 'bad', 44) + `<text class="al-lbl" x="470" y="${y - 12}">keluar</text>`;
      const y2 = y + (S.st.length > 8 ? 46 : 0);
      if (S.end) g += `<text class="al-lbl" x="20" y="${y2 + 74}">${S.badEnd ? 'tidak seimbang' : 'seimbang'}</text>`;
      return `<svg class="al-svg" viewBox="0 0 560 ${y2 + (S.end ? 88 : 56)}" role="img" aria-label="Teks ${esc(S.s.join(''))}. Isi stack: ${esc(S.st.map(e => e.c).join(' ') || 'kosong')}">${g}</svg>`;
    },
    program(s) {
      const txt = s.data.join(''), F = this.run(s.data), last = F[F.length - 1];
      const L = ['#include <iostream>', '#include <string>', 'using namespace std;', '', ...this.code.cpp, '', 'int main() {', `    string s = "${txt}";`,
        '    if (seimbang(s)) cout << s << ": seimbang" << endl;', '    else cout << s << ": tidak seimbang" << endl;', '    return 0;', '}'];
      return { code: L.join('\n'), out: `${txt}: ${last.S.badEnd ? 'tidak seimbang' : 'seimbang'}` };
    }
  },

  // ---------------- Menghitung ekspresi postfix ----------------
  postfix: {
    counters: ['Push', 'Pop'],
    vars: ['i', 't[i]', 'a', 'b', 'top'],
    code: {
      cpp: ['int st[20];', 'int top = -1;', '', 'void push(int x) {', '    top++;', '    st[top] = x;', '}', '', 'int pop() {', '    int x = st[top];', '    top--;', '    return x;', '}', '',
        'int hitung(string t[], int n) {', '    for (int i = 0; i < n; i++) {', '        if (t[i] == "+" || t[i] == "-" || t[i] == "*" || t[i] == "/") {', '            int b = pop();', '            int a = pop();',
        '            if (t[i] == "+") push(a + b);', '            else if (t[i] == "-") push(a - b);', '            else if (t[i] == "*") push(a * b);', '            else push(a / b);', '        } else {', '            push(stoi(t[i]));', '        }', '    }', '    return pop();', '}'],
      ps: ['hitung(t):   stack kosong', '    untuk setiap token t[i]:', '        jika t[i] angka: push(angka)', '        jika t[i] operator:', '            b = pop(), lalu a = pop()', '            push(a operator b)', '    hasil = pop()']
    },
    lines: {
      cpp: { decl: [1, 2], num: [16, 24, 25], op: [17, 18, 19], '+': [20], '-': [21], '*': [22], '/': [23], end: [28] },
      ps: { decl: [1], num: [2, 3], op: [4, 5], '+': [6], '-': [6], '*': [6], '/': [6], end: [7] }
    },
    calc: (a, op, b) => op === '+' ? a + b : op === '-' ? a - b : op === '*' ? a * b : Math.trunc(a / b),
    check(t) {
      let d = 0; const st = [];
      for (const x of t) {
        if (alNum(x)) { st.push(x); continue; }
        if (st.length < 2) return `Operator ${x} butuh dua angka di stack, tapi baru ada ${st.length}. Di postfix, operator ditulis sesudah kedua angkanya.`;
        const b = st.pop(), a = st.pop();
        if (x === '/' && b === 0) return 'Ada pembagian dengan 0. Ganti angkanya.';
        const v = this.calc(a, x, b); if (Math.abs(v) > 99999) return 'Hasil antaranya terlalu besar. Pakai angka yang lebih kecil.';
        st.push(v); d++;
      }
      if (st.length !== 1) return `Di akhir stack berisi ${st.length} angka. Ekspresi postfix yang benar menyisakan tepat satu angka (banyak operator = banyak angka − 1).`;
      return '';
    },
    input: {
      mode: 'text', aria: 'Ekspresi postfix, token dipisah spasi',
      hint: '3 sampai 11 token dipisah spasi: angka 0–99 dan operator <b>+ - * /</b>. Pembagian membuang sisa seperti int di C++ (7 / 2 = 3). Contoh: 5 3 + 2 *',
      fmt: d => (d || []).join(' '),
      parse(raw) {
        const t = String(raw).split(/[\s,;]+/).filter(Boolean);
        if (t.length < 3 || t.length > 11) return { err: 'Isi 3 sampai 11 token dipisah spasi. Contoh: 5 3 + 2 *' };
        const data = [];
        for (const x of t) { if (/^\d+$/.test(x) && +x <= 99) data.push(+x); else if (/^[+\-*/x×:]$/.test(x)) data.push({ x: '*', '×': '*', ':': '/' }[x] || x); else return { err: `"${x}" bukan angka 0–99 atau operator. Pisahkan setiap token dengan spasi, misalnya 5 3 +` }; }
        const e = AL_ALGO.postfix.check(data); if (e) return { err: e };
        return { data };
      },
      acak() {
        for (;;) {
          const t = [alRnd(1, 9), alRnd(1, 9)], ops = '+-*/'; let need = alRnd(1, 3), d = 2;
          t.push(ops[alRnd(0, 3)]); d--;
          while (need > 0) { t.push(alRnd(1, 9)); d++; if (Math.random() < 0.4 && t.length < 9) { t.push(alRnd(1, 9)); d++; } while (d > 1) { t.push(ops[alRnd(0, 3)]); d--; } need--; }
          if (t.length <= 11 && !AL_ALGO.postfix.check(t)) return { data: t };
        }
      }
    },
    run(data) {
      const r = alRec2(), st = [];
      let uid = 0;
      r.cnt.Push = 0; r.cnt.Pop = 0;
      const S = o => Object.assign({ t: data, st: st.slice() }, o), top = () => st.length - 1;
      r.push({ grp: 'Mulai', kind: 'Konsep', ln: 'decl', vars: { top: -1 }, S: S({}), title: 'Operator ditulis sesudah angkanya',
        body: `Pada <b>postfix</b> <code>${data.join(' ')}</code>, setiap operator bekerja pada dua angka yang muncul tepat sebelumnya. Tidak perlu kurung dan tidak perlu aturan "kali dulu". Cukup baca dari kiri dengan satu stack: angka di-push, operator mem-pop dua angka lalu mem-push hasilnya.` });
      data.forEach((x, i) => {
        const g = `${i + 1}. ${x}`;
        if (alNum(x)) {
          st.push({ id: uid++, v: x }); r.cnt.Push++;
          r.push({ grp: g, kind: 'Masuk', ln: 'num', vars: { i, 't[i]': x, top: top() }, S: S({ i, hi: st[top()].id }), title: `${x} masuk stack`, body: `Token ${x} adalah angka, jadi <code>push(${x})</code>. Angka menunggu di stack sampai ada operator yang memakainya.` });
          return;
        }
        const B = st.pop(), Aa = st.pop(), v = this.calc(Aa.v, x, B.v); r.cnt.Pop += 2;
        const wrong = this.calc(B.v, x, Aa.v), alt = x === '+' ? Aa.v * B.v : Aa.v + B.v, o = [...new Set([v, wrong, alt, v + 1])].slice(0, 3).sort((p, q) => p - q).map(String);
        r.push({ grp: g, kind: 'Periksa', ln: 'op', vars: { i, 't[i]': x, a: Aa.v, b: B.v, top: top() }, S: S({ i, a: Aa, b: B }), title: `${x}: ambil dua angka teratas`,
          body: `<code>b = pop()</code> mengambil ${B.v} (paling atas), lalu <code>a = pop()</code> mengambil ${Aa.v}. Urutannya penting: yang keluar pertama adalah angka <b>kanan</b>.`,
          q: { t: `Berapa hasil yang di-push?`, o, a: o.indexOf(String(v)) } });
        st.push({ id: uid++, v }); r.cnt.Push++;
        r.push({ grp: g, kind: 'Masuk', ln: x, vars: { i, 't[i]': x, a: Aa.v, b: B.v, top: top() }, S: S({ i, hi: st[top()].id, expr: `${Aa.v} ${x} ${B.v} = ${v}` }), title: `${Aa.v} ${x} ${B.v} = ${v}`,
          body: `Hasilnya, ${v}, di-push kembali. ${x === '/' && Aa.v % B.v ? 'Pembagian int di C++ membuang sisa (dibulatkan ke arah 0). ' : ''}${x === '-' || x === '/' ? `Kalau urutan a dan b tertukar, hasilnya salah: ${B.v} ${x} ${Aa.v} = ${wrong}.` : 'Angka ini bisa menjadi bahan untuk operator berikutnya.'}` });
      });
      const res = st[0].v;
      r.push({ grp: 'Hasil', kind: 'Hasil', ln: 'end', vars: { top: -1 }, S: S({ end: true, hi: st[0].id }), title: `Hasil: ${res}`,
        body: `Token habis dan stack berisi satu angka, ${res}. <code>return pop()</code> mengembalikannya.`,
        note: ['Dari mana postfix?', 'Ekspresi biasa (infix) seperti (5 + 3) * 2 diubah dulu menjadi postfix 5 3 + 2 *, juga memakai stack. Komputer lebih mudah menghitung postfix karena tidak perlu memikirkan kurung dan urutan operator.'] });
      return r.F;
    },
    view(A, s, f) {
      const S = f.S, mv = alMover(s), y = 168, n = S.t.length;
      let g = `<text class="al-lbl" x="20" y="22">token</text>`;
      S.t.forEach((x, i) => { const w = 42, gx = 280 - n * 24 + i * 48, k = i === S.i && !S.end ? 'cmp' : (S.i != null && i < S.i) || S.end ? 'done' : '';
        g += `<g class="al-box${k ? ' al-' + k : ''}" transform="translate(${gx},34)"><rect width="${w}" height="36" rx="5"/><text x="${w / 2}" y="18">${esc(String(x))}</text></g>${i === S.i && !S.end ? `<text class="al-idx" x="${gx + w / 2}" y="90">i = ${i}</text>` : ''}`; });
      g += `<text class="al-lbl" x="20" y="${y - 12}">stack (bawah → atas)</text><line class="al-floor" x1="16" x2="16" y1="${y - 2}" y2="${y + 42}"/>`;
      S.st.forEach((e, k) => { g += alBox(mv, 'e' + e.id, e.v, 24 + k * 74, y, e.id === S.hi ? (S.end ? 'found' : 'cmp') : '', 68); });
      if (!S.st.length && !S.a) g += `<text class="al-lbl al-muted" x="28" y="${y + 24}">kosong</text>`;
      if (S.a) g += `<text class="al-lbl" x="330" y="${y - 12}">a</text><text class="al-lbl" x="444" y="${y - 12}">b</text>` + alBox(mv, 'e' + S.a.id, S.a.v, 330, y, 'cmp', 68) + alBox(mv, 'e' + S.b.id, S.b.v, 444, y, 'cmp', 68);
      if (S.expr) g += `<text class="al-ord" x="20" y="${y + 76}">${esc(S.expr)}</text>`;
      return `<svg class="al-svg" viewBox="0 0 560 ${y + 90}" role="img" aria-label="Postfix ${esc(S.t.join(' '))}. Isi stack: ${esc(S.st.map(e => e.v).join(', ') || 'kosong')}">${g}</svg>`;
    },
    program(s) {
      const t = s.data.map(String), F = this.run(s.data), res = F[F.length - 1].S.st[0].v;
      const L = ['#include <iostream>', '#include <string>', 'using namespace std;', '', ...this.code.cpp, '', 'int main() {', `    string t[] = {${t.map(x => `"${x}"`).join(', ')}};`,
        `    cout << "Hasil: " << hitung(t, ${t.length}) << endl;`, '    return 0;', '}'];
      return { code: L.join('\n'), out: `Hasil: ${res}` };
    }
  }
});
