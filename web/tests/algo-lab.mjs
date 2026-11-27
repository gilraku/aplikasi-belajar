// Tes lab Struktur Data & Algoritma (blok "algo-lab").
// 1) Jejak tiap algoritma dihitung untuk ribuan data acak: hasil akhir harus urut / pencarian harus benar,
//    jumlah batang tetap, tidak ada dua batang di tempat yang sama, jawaban "Tebak dulu" ada di pilihan,
//    dan setiap langkah menyalakan baris kode (C++ dan pseudocode).
// 2) Di browser: semua pelajaran tampil, tombol Lanjut / panah / Tebak dulu / data sendiri bekerja, tanpa galat.
// Jalankan: npm run build && node tests/algo-lab.mjs
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

let fail = 0;
const bad = (...m) => { fail++; if (fail < 20) console.error('✗', ...m); };

// ---------- 1. Jejak ----------
const ctx = { esc: s => String(s), hlCpp: s => s, document: { addEventListener() {} }, Math, JSON };
vm.createContext(ctx);
vm.runInContext(['algo-lab.js', 'algo-lab-linear.js', 'algo-lab-dasar.js', 'algo-lab-cabang.js'].map(f => fs.readFileSync(path.resolve('src/scripts', f), 'utf8')).join('\n') + ';this.AL = AL_ALGO; this.alProgram = alProgram; this.alSvg = alSvg;', ctx);
const AL = ctx.AL;
const SORTS = ['bubble', 'selection', 'insertion', 'merge', 'quick'];
let seed = 7; const rnd = k => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed % k; };
const cases = [[1, 2, 3], [3, 2, 1], [5, 5, 5], [0, 99, 0, 99], [1, 2, 3, 4, 5, 6, 7, 8], [8, 7, 6, 5, 4, 3, 2, 1]];
for (let t = 0; t < 3000; t++) { const n = 3 + rnd(6); cases.push(Array.from({ length: n }, () => rnd(t % 2 ? 10 : 100))); }
const check = (name, F, n) => F.forEach((f, i) => {
  if (f.bars.length !== n) bad(name, 'jumlah batang', i, f.bars.length);
  const at = f.bars.map(b => `${b.row}:${b.x}:${b.lift ? 1 : 0}`); if (new Set(at).size !== at.length) bad(name, 'batang bertumpuk', i, f.title);
  if (f.q && !(Number.isInteger(f.q.a) && f.q.a >= 0 && f.q.a < f.q.o.length)) bad(name, 'jawaban tebakan', i);
  ['cpp', 'ps'].forEach(l => { const ln = AL[name].lines[l][f.ln]; if (!ln || !ln.length || ln.some(k => !AL[name].code[l][k - 1] || !AL[name].code[l][k - 1].trim())) bad(name, 'baris kode', l, f.ln); });
  if (!f.title || !f.body || !f.grp) bad(name, 'teks kosong', i);
});
for (const d of cases) {
  for (const k of SORTS) {
    const F = AL[k].run(d);
    check(k, F, d.length);
    const got = F[F.length - 1].bars.filter(b => !b.row).sort((p, q) => p.x - q.x).map(b => b.v);
    if (JSON.stringify(got) !== JSON.stringify(d.slice().sort((p, q) => p - q))) bad(k, 'hasil tidak urut', d.join(','), '→', got.join(','));
  }
  const s = d.slice().sort((p, q) => p - q);
  for (const x of [d[rnd(d.length)], 100 - rnd(3), -0 + rnd(100)]) {
    for (const [k, data] of [['linear', d], ['biner', s]]) {
      const F = AL[k].run(data, x), last = F[F.length - 1];
      check(k, F, data.length);
      const m = /^Ketemu: indeks (\d+)$/.exec(last.title);
      if (!!m !== data.includes(x)) bad(k, 'hasil pencarian', data.join(','), x);
      if (m && data[+m[1]] !== x) bad(k, 'indeks salah', data.join(','), x);
      if (k === 'linear' && m && +m[1] !== data.indexOf(x)) bad(k, 'bukan kemunculan pertama', data.join(','), x);
      // Output "Program lengkap" harus sama dengan akhir jejak
      if (AL[k].result(data, x) !== (m ? +m[1] : -1)) bad(k, 'hasil program lengkap beda dengan jejak', data.join(','), x);
    }
  }
}
console.log(`jejak: ${cases.length} data × ${SORTS.length + 2} algoritma diperiksa`);

// ---------- 1a. Struktur linear: jejak dibandingkan dengan simulasi sederhana ----------
const frameOk = (name, F, s) => F.forEach((f, i) => {
  if (f.q && !(Number.isInteger(f.q.a) && f.q.a >= 0 && f.q.a < f.q.o.length && new Set(f.q.o).size === f.q.o.length)) bad(name, 'tebakan rusak', i, JSON.stringify(f.q));
  ['cpp', 'ps'].forEach(l => { const ln = AL[name].lines[l][f.ln]; if (!ln || !ln.length || ln.some(k => !AL[name].code[l][k - 1] || !AL[name].code[l][k - 1].trim())) bad(name, 'baris kode', l, f.ln); });
  if (!f.title || !f.body || !f.grp) bad(name, 'teks kosong', i);
  if (/undefined|NaN|null/.test(f.title + f.body + (f.note ? f.note.join('') : ''))) bad(name, 'teks berisi undefined/NaN', i, f.title);
  const svg = (AL[name].view || ctx.alSvg)(AL[name], s, f); s.anim = true;
  if (/undefined|NaN/.test(svg)) bad(name, 'gambar berisi undefined/NaN', i, f.title);
  Object.values(f.vars || {}).forEach(v => { if (typeof v === 'number' && !Number.isFinite(v)) bad(name, 'variabel NaN', i); });
});
let linCases = 0;
for (let t = 0; t < 1500; t++) {
  for (const [k, word, cap] of [['stack', 'pop', 5], ['queue', 'deq', 5]]) {
    const len = 3 + rnd(8), data = [];
    for (let i = 0; i < len; i++) data.push(rnd(10) < 6 ? rnd(100) : word);
    if (!data.some(v => typeof v === 'number')) data[0] = 1;
    const F = AL[k].run(data), last = F[F.length - 1].S, model = [], outs = [];
    data.forEach(v => { if (typeof v === 'number') { if (model.length < cap) model.push(v); } else if (model.length) outs.push(k === 'stack' ? model.pop() : model.shift()); });
    const got = k === 'stack' ? last.st.map(e => e.v) : Array.from({ length: last.jumlah }, (_, i) => last.q[(last.front + i) % cap].v);
    if (JSON.stringify(got) !== JSON.stringify(model)) bad(k, 'isi akhir salah', data.join(','), got.join(','), '≠', model.join(','));
    if (JSON.stringify(last.out.map(e => e.v)) !== JSON.stringify(outs)) bad(k, 'urutan keluar salah', data.join(','));
    if (t < 300) frameOk(k, F, { data });
    linCases++;
  }
  const n = 2 + rnd(5), data = Array.from({ length: n }, () => rnd(t % 2 ? 8 : 100)), x = rnd(3) ? data[rnd(n)] : rnd(100);
  const F = AL.linked.run(data, x), model = data.slice(), i = model.indexOf(x); if (i >= 0) model.splice(i, 1);
  const got = F[F.length - 1].S.list.map(e => e.v);
  if (JSON.stringify(got) !== JSON.stringify(model)) bad('linked', 'isi akhir salah', data.join(','), x, got.join(','));
  if (t < 300) frameOk('linked', F, { data, target: x });
  linCases++;
}
// Formulir data sendiri: yang sah diterima, yang salah ditolak, dan hasil fmt bisa dibaca ulang
for (const [k, ok, no] of [['stack', ['5, 3, pop, 8', 'pop, 4, 2', '1 2 3', '-, 7, keluar'], ['5, 3', 'pop, pop, pop', '5, abc, 3', '100, 1, 2', '1,2,3,4,5,6,7,8,9,10,11']],
  ['queue', ['4, 9, deq, 2', 'deq, deq, 1', '7 7 7'], ['1', 'deq, deq, deq', '4, -3, 2']]]) {
  ok.forEach(t => { const r = AL[k].input.parse(t); if (r.err) bad(k, 'input sah ditolak', t, r.err); else if (JSON.stringify(AL[k].input.parse(AL[k].input.fmt(r.data)).data) !== JSON.stringify(r.data)) bad(k, 'fmt tidak bisa dibaca ulang', t); });
  no.forEach(t => { if (!AL[k].input.parse(t).err) bad(k, 'input salah diterima', t); });
  for (let i = 0; i < 200; i++) { const r = AL[k].input.acak(); if (AL[k].input.parse(AL[k].input.fmt(r.data)).err) bad(k, 'acak menghasilkan data tidak sah', r.data.join(',')); }
}
[['12, 7, 25', '7', true], ['5', '5', false], ['1, 2, 3, 4, 5, 6, 7', '1', false], ['3, 4', '', false], ['3, 4', '100', false]].forEach(([d, t, ok]) => { if (!AL.linked.input.parse(d, t).err !== ok) bad('linked', 'parse', d, t); });
for (let i = 0; i < 200; i++) { const r = AL.linked.input.acak(); if (AL.linked.input.parse(AL.linked.input.fmt ? AL.linked.input.fmt(r.data) : r.data.join(', '), String(r.target)).err) bad('linked', 'acak tidak sah'); }
console.log(`struktur linear: ${linCases} jejak stack/queue/linked list cocok dengan simulasi`);

// ---------- 1a'. Bab Dasar ----------
let dasar = 0;
const fact = n => n <= 1 ? 1 : n * fact(n - 1);
for (let t = 0; t < 400; t++) {
  const ns = [...new Set(Array.from({ length: 2 + rnd(4) }, () => 1 + rnd(64)))].sort((p, q) => p - q);
  if (ns.length >= 2) { frameOk('bigo', AL.bigo.run(ns), { data: ns }); dasar++; }
  const a = Array.from({ length: 3 + rnd(6) }, () => rnd(t % 3 ? 100 : 5)), F1 = AL.array1d.run(a), v1 = F1[F1.length - 1].vars;
  const mi = a.indexOf(Math.max(...a));
  if (v1.total !== a.reduce((p, q) => p + q, 0) || v1.maks !== a[mi] || v1.posisi !== mi) bad('array1d', 'hasil salah', a.join(','), JSON.stringify(v1));
  frameOk('array1d', F1, { data: a }); check('array1d', F1, a.length);
  const R = 2 + rnd(3), C = 2 + rnd(4), m = Array.from({ length: R }, () => Array.from({ length: C }, () => rnd(100))), F2 = AL.array2d.run(m), S2 = F2[F2.length - 1].S;
  if (JSON.stringify(S2.rs) !== JSON.stringify(m.map(r => r.reduce((p, q) => p + q, 0))) || JSON.stringify(S2.cs) !== JSON.stringify(m[0].map((_, j) => m.reduce((p, r) => p + r[j], 0)))) bad('array2d', 'jumlah salah', JSON.stringify(m));
  frameOk('array2d', F2, { data: m });
  const n = 1 + rnd(7), F3 = AL.rekursi.run([n]);
  if (F3[F3.length - 1].vars.hasil !== fact(n)) bad('rekursi', 'hasil salah', n);
  frameOk('rekursi', F3, { data: [n] });
  dasar += 3;
}
[['bigo', ['4, 8, 16', '64 1', '2, 2, 3'], ['5', '0, 4', '1, 2, 3, 4, 5, 6', '65, 2', '3, 3']], ['array2d', ['3 5 1; 2 8 4', '1,2;3,4;5,6;7,8', '0 99\n99 0'], ['1 2 3', '1 2; 3', '1;2', '1 2 3 4 5 6; 1 2 3 4 5 6', '1 2; 3 100']], ['rekursi', ['4', '1', '7'], ['0', '8', '3, 4', 'x']]].forEach(([k, ok, no]) => {
  ok.forEach(t => { const r = AL[k].input.parse(t); if (r.err) bad(k, 'input sah ditolak', t, r.err); else { const f = AL[k].input.fmt ? AL[k].input.fmt(r.data) : r.data.join(', '); if (JSON.stringify(AL[k].input.parse(f).data) !== JSON.stringify(r.data)) bad(k, 'fmt tidak bisa dibaca ulang', t); } });
  no.forEach(t => { if (!AL[k].input.parse(t).err) bad(k, 'input salah diterima', t); });
  for (let i = 0; i < 200; i++) { const r = AL[k].input.acak(), f = AL[k].input.fmt ? AL[k].input.fmt(r.data) : r.data.join(', '); if (AL[k].input.parse(f).err) bad(k, 'acak tidak sah', f); }
});
console.log(`dasar: ${dasar} jejak Big-O/array/rekursi diperiksa`);

// ---------- 1a''. Bab Bercabang ----------
let cab = 0;
const LET = 'ABCDEFGH';
const refAdj = E => { const a = {}; E.forEach(e => { const [x, y] = e.split('-'); (a[x] = a[x] || []).push(y); (a[y] = a[y] || []).push(x); }); Object.keys(a).forEach(k => a[k] = [...new Set(a[k])].sort()); return a; };
const refBfs = (E, st) => { const a = refAdj(E), vis = new Set([st]), q = [st], o = []; while (q.length) { const u = q.shift(); o.push(u); a[u].forEach(v => { if (!vis.has(v)) { vis.add(v); q.push(v); } }); } return o; };
const refDfs = (E, st) => { const a = refAdj(E), vis = new Set(), o = []; const go = u => { vis.add(u); o.push(u); a[u].forEach(v => { if (!vis.has(v)) go(v); }); }; go(st); return o; };
for (let t = 0; t < 500; t++) {
  const n = 3 + rnd(6), keys = Array.from({ length: n }, () => rnd(t % 2 ? 20 : 100)), x = rnd(3) ? keys[rnd(n)] : rnd(100);
  const F1 = AL.bst.run(keys, x), L1 = F1[F1.length - 2];
  if ((L1.ln === 'sFound') !== keys.includes(x)) bad('bst', 'hasil cari salah', keys.join(','), x);
  const ino = F1[0].S.T.slice().sort((a, b) => a.rank - b.rank).map(q => q.v);
  if (JSON.stringify(ino) !== JSON.stringify(keys.slice().sort((p, q) => p - q))) bad('bst', 'inorder tidak urut', keys.join(','));
  if (t < 150) frameOk('bst', F1, { data: keys, target: x });
  const F2 = AL.hash.run(keys, x), tb = F2[F2.length - 1].S.tb, model = Array(10).fill(null);
  keys.forEach(k => { let i = k % 10; while (model[i] != null) i = (i + 1) % 10; model[i] = k; });
  if (JSON.stringify(tb.map(e => e ? e.k : null)) !== JSON.stringify(model)) bad('hash', 'isi tabel salah', keys.join(','));
  const L2 = F2[F2.length - 2];
  if ((L2.ln === 'sfound') !== keys.includes(x)) bad('hash', 'hasil cari salah', keys.join(','), x);
  if (t < 150) frameOk('hash', F2, { data: keys, target: x });
  const k = 2 + rnd(7), E = new Set(); for (let i = 0; i < 2 + rnd(11); i++) { const a = rnd(k), b = rnd(k); if (a !== b) E.add(LET[Math.min(a, b)] + '-' + LET[Math.max(a, b)]); }
  if (E.size >= 2) { const edges = [...E], st = edges[rnd(edges.length)][0];
    const Fb = AL.bfs.run(edges, st), Fd = AL.dfs.run(edges, st);
    if (JSON.stringify(Fb[Fb.length - 1].S.ord) !== JSON.stringify(refBfs(edges, st))) bad('bfs', 'urutan salah', edges.join(','), st);
    if (JSON.stringify(Fd[Fd.length - 1].S.ord) !== JSON.stringify(refDfs(edges, st))) bad('dfs', 'urutan salah', edges.join(','), st);
    if (t < 150) { frameOk('bfs', Fb, { data: edges, target: st }); frameOk('dfs', Fd, { data: edges, target: st }); }
    cab += 2; }
  cab += 2;
}
[['bst', [['50, 30, 70', '30'], ['1, 1, 1, 1, 1, 1, 1, 1', '0']], [['50, 30', '30'], ['1, 2, 3', ''], ['1, 2, 3', '100'], ['a, b, c', '1']]],
 ['hash', [['25, 35, 41', '15']], [['25', '5'], ['1,2,3,4,5,6,7,8,9', '1']]],
 ['bfs', [['A-B, B-C', 'A'], ['AB ac', 'c'], ['A-B, B-A, B-C', 'B']], [['A-B', 'A'], ['A-B, B-C', 'D'], ['A-A, B-C', 'B'], ['A-I, B-C', 'A'], ['A-B, B-C', ''], ['A-B, B-C', 'AB']]]].forEach(([k, ok, no]) => {
  ok.forEach(([d, t]) => { const r = AL[k].input.parse(d, t); if (r.err) bad(k, 'input sah ditolak', d, t, r.err); else { const f = AL[k].input.fmt ? AL[k].input.fmt(r.data) : r.data.join(', '); const r2 = AL[k].input.parse(f, String(r.target)); if (JSON.stringify(r2.data) !== JSON.stringify(r.data)) bad(k, 'fmt tidak bisa dibaca ulang', d); } });
  no.forEach(([d, t]) => { if (!AL[k].input.parse(d, t).err) bad(k, 'input salah diterima', d, t); });
  for (let i = 0; i < 200; i++) { const r = AL[k].input.acak(), f = AL[k].input.fmt ? AL[k].input.fmt(r.data) : r.data.join(', '); if (AL[k].input.parse(f, String(r.target)).err) bad(k, 'acak tidak sah', f, r.target); }
});
console.log(`bercabang: ${cab} jejak BST/hash/BFS/DFS cocok dengan simulasi`);

// ---------- 1b. Program lengkap: dikompilasi g++ dan output-nya dicocokkan ----------
{
  const { execFileSync } = await import('node:child_process');
  const os = await import('node:os');
  let gpp = true; try { execFileSync('g++', ['--version'], { stdio: 'ignore' }); } catch (e) { gpp = false; }
  if (!gpp) console.log('program lengkap: g++ tidak ada, kompilasi dilewati');
  else {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'al-cpp-'));
    let runs = 0;
    const OWN = { stack: [['5, 3, -, 8', ''], ['1, 2, 3, 4, 5, 6, -, -', ''], ['-, 4, -, -', '']], queue: [['4, 9, -, 2', ''], ['1, 2, 3, 4, 5, 6, -, 7, 8', ''], ['-, 4, -, -', '']],
      linked: [['12, 7, 25', '7'], ['12, 7', '12'], ['3, 3, 9', '42'], ['8, 1', '1']],
      bigo: [['1, 2, 64', ''], ['4, 8, 16, 32', '']], array2d: [['3 5 1; 2 8 4', ''], ['0 99; 99 0; 5 5; 1 2', ''], ['1 2 3 4 5; 6 7 8 9 10', '']], rekursi: [['1', ''], ['7', ''], ['4', '']],
      bst: [['50, 30, 70, 20, 40, 60, 80', '60'], ['10, 20, 30', '5'], ['5, 5, 3', '5']], hash: [['25, 35, 41, 15, 9, 19', '15'], ['25, 35, 5', '45'], ['9, 19, 29, 39', '39']],
      bfs: [['A-B, A-C, B-D, C-D, C-E, D-F, E-F', 'A'], ['H-A, G-H, B-C', 'B']], dfs: [['A-B, A-C, B-D, C-D, C-E, D-F, E-F', 'A'], ['A-H, H-B, B-G', 'G']] };
    for (const k of Object.keys(AL)) {
      const sample = OWN[k] ? OWN[k].map(([d, t]) => AL[k].input.parse(d, t)) : [[5, 1, 4, 2, 8], [7, 7, 3], [0, 99, 0, 99, 50, 1, 2, 3], [3, 1, 2]].flatMap(d0 => {
        const data = AL[k].sorted ? d0.slice().sort((p, q) => p - q) : d0;
        return (AL[k].target ? [data[1], 42] : [undefined]).map(target => ({ data, target }));
      });
      for (const { data, target, err } of sample) {
        if (err) { bad(k, 'contoh program tidak sah', err); continue; }
        {
          const P = ctx.alProgram(AL[k], { data, target });
          if (!/^#include <iostream>/.test(P.code) || !/int main\(\)/.test(P.code)) bad(k, 'program lengkap tanpa include/main');
          const src = path.join(dir, `${k}.cpp`), bin = path.join(dir, k);
          fs.writeFileSync(src, P.code);
          try {
            execFileSync('g++', ['-std=c++11', '-Wall', '-Werror', '-o', bin, src], { stdio: 'pipe' });
            const out = execFileSync(bin, { encoding: 'utf8' }).split('\n').map(l => l.trimEnd()).join('\n').trim();
            if (out !== P.out) bad(k, 'output program beda', JSON.stringify(out), '≠', JSON.stringify(P.out));
          } catch (e) { bad(k, 'gagal kompilasi', String(e.stderr || e.message).slice(0, 400)); }
          runs++;
        }
      }
    }
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`program lengkap: ${runs} program dikompilasi g++ dan output-nya cocok`);
  }
}

// ---------- 2. Browser ----------
const DIST = path.resolve(process.cwd(), process.env.ASTRO_OUT || 'dist');
const BASE = (process.env.ASTRO_BASE || (process.env.VERCEL ? '/' : '/aplikasi-belajar/')).replace(/\/?$/, '/');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json' };
if (!fs.existsSync(path.join(DIST, 'index.html'))) { console.error('dist/ belum ada. Jalankan "npm run build" dulu.'); process.exit(1); }
const server = http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split('?')[0]);
  if (!u.startsWith(BASE)) { res.writeHead(404); return res.end(); }
  let f = path.join(DIST, u.slice(BASE.length));
  if (!f.startsWith(DIST)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(0);
const URL0 = `http://127.0.0.1:${server.address().port}${BASE}`;
const { lib } = createRequire(path.resolve('../sumber/build.js'))('./build.js');
const sda = lib.find(c => c.jalur);
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await page.goto(URL0 + '#/'); await page.waitForSelector('#mk-' + sda.id);
  const rows = await page.$$eval(`#mk-${sda.id} li`, l => l.length);
  if (rows !== sda.meetings.length) bad('beranda: jumlah pelajaran', rows);
  if (await page.$(`.peta th button:text("${sda.nama}")`)) bad('section ikut peta P1–P16');
  for (const m of sda.meetings) {
    await page.goto(URL0 + `#/c/${sda.id}/m/${m.id}`); await page.waitForSelector('.al');
    const step = () => page.$eval('.al .tabular-nums', e => e.textContent);
    await page.click('.al [data-act="next"]');
    if (!/Langkah 2 dari/.test(await step())) bad(m.id, 'Lanjut', await step());
    // Fokus dikembalikan ke blok lewat setTimeout setelah klik; tunggu dulu supaya tes panah tidak balapan.
    await page.waitForFunction(() => document.activeElement && document.activeElement.closest('[id^="blk-"]'));
    await page.keyboard.press('ArrowRight');
    if (!/Langkah 3 dari/.test(await step())) bad(m.id, 'panah kanan', await step());
    await page.keyboard.press('ArrowLeft');
    if (!/Langkah 2 dari/.test(await step())) bad(m.id, 'panah kiri', await step());
    await page.click('.al [data-act="lang"][data-arg="ps"]');
    if (await page.$$eval('.al .al-code .trc-cur', l => l.length) === 0) bad(m.id, 'pseudocode tidak menyala');
    // Tebak dulu: Lanjut terkunci sampai dijawab
    await page.click('.al [data-act="mode"][data-arg="tebak"]');
    for (let i = 0; i < 60; i++) {
      if (await page.$('.al .al-guess [data-act="ans"]:not([disabled])')) {
        if (!(await page.$eval('.al [data-act="next"]', e => e.disabled))) bad(m.id, 'Lanjut tidak terkunci saat menebak');
        // Rel juga terkunci: tombol kelompok setelah langkah ini tidak bisa dipakai melompat
        const cur = +(await step()).match(/Langkah (\d+)/)[1] - 1;
        const rails = await page.$$eval('.al .al-rail', l => l.map(e => ({ i: +e.dataset.arg, off: e.disabled })));
        if (rails.some(r => r.i > cur && !r.off)) bad(m.id, 'rel bisa melompati tebakan', JSON.stringify(rails));
        if (rails.some(r => r.i <= cur && r.off)) bad(m.id, 'rel ke belakang ikut terkunci');
        const later = rails.filter(r => r.i > cur).pop();
        if (later) {
          await page.$eval(`.al .al-rail[data-arg="${later.i}"]`, e => { e.disabled = false; e.click(); });
          if (+(await step()).match(/Langkah (\d+)/)[1] - 1 !== cur) bad(m.id, 'lompat paksa lewat rel tidak ditahan');
        }
        await page.click('.al .al-guess [data-act="ans"]'); break;
      }
      if (await page.$eval('.al [data-act="next"]', e => e.disabled)) break;
      await page.click('.al [data-act="next"]');
    }
    // Program lengkap: dibuka, berisi include + main + output, tetap terbuka saat pindah langkah
    await page.click('.al [data-act="full"]');
    const full = await page.$eval('.al .al-full', e => e.textContent);
    if (!/#include <iostream>/.test(full) || !/int main\(\)/.test(full) || !(await page.$('.al .al-out'))) bad(m.id, 'program lengkap tidak tampil');
    await page.click('.al [data-act="prev"]');
    if (!(await page.$('.al .al-out'))) bad(m.id, 'program lengkap tertutup saat pindah langkah');
    // Data sendiri: [isi, target, teks yang harus ada di program lengkap, isi yang harus ditolak]
    const algo = (m.materi.find(b => b.type === 'algo-lab') || {}).algo;
    const OWNS = {
      bigo: ['4, 8, 16', '', ['daftarN[] = {4, 8, 16}'], '5'],
      array2d: ['3 5 1; 2 8 4', '', ['{3, 5, 1}', '{2, 8, 4}'], '1 2 3'],
      rekursi: ['5', '', ['int n = 5;'], '9'],
      bst: ['9, 4, 7, 1', '7', ['akar = sisip(akar, 9);', 'cari(akar, 7)'], '9'],
      hash: ['9, 4, 7, 1', '7', ['sisip(9);', 'cari(7)'], '9'],
      bfs: ['A-B, B-C, C-D', 'B', ["sambung('A', 'B');", "bfs('B' - 'A');"], 'A-A, B-C'],
      dfs: ['A-B, B-C, C-D', 'B', ["sambung('C', 'D');", "dfs('B' - 'A');"], 'A-B'],
      stack: ['9, 4, pop, 1', '', ['push(9);', 'push(4);', 'x = pop();', 'push(1);'], 'pop, pop, pop'],
      queue: ['9, 4, deq, 1', '', ['enqueue(9);', 'enqueue(4);', 'x = dequeue();', 'enqueue(1);'], '9, abc, 1'],
      linked: ['9, 4, 7, 1', '7', ['tambahBelakang(9);', 'hapus(7);'], '9']
    }, OWN = OWNS[algo] || ['9, 4, 7, 1', '7', [m.id === 'pencarian-biner' ? '{1, 4, 7, 9}' : '{9, 4, 7, 1}'], '1, 2'];
    // Keyboard HP harus bisa mengetik isi yang sah: ada huruf → inputmode wajib text
    for (const [key, val] of [['data', OWN[0]], ['target', OWN[1]]]) {
      const im = await page.$eval(`.al input[data-key="${key}"]`, e => e.getAttribute('inputmode')).catch(() => null);
      if (im && /[A-Za-z]/.test(val) && im !== 'text') bad(m.id, `kotak ${key} memakai inputmode=${im} padahal isinya huruf`);
    }
    await page.fill('.al input[data-key="data"]', OWN[0]);
    if (await page.$('.al input[data-key="target"]')) await page.fill('.al input[data-key="target"]', OWN[1]);
    await page.press('.al input[data-key="data"]', 'Enter');
    if (!/Langkah 1 dari/.test(await step())) bad(m.id, 'data sendiri tidak dimulai ulang');
    if (await page.$('.al [role="alert"]')) bad(m.id, 'data sendiri yang sah ditolak', await page.$eval('.al [role="alert"]', e => e.textContent));
    if (!OWNS[algo]) { if (!(await page.$eval('.al svg', e => e.getAttribute('aria-label'))).includes(m.id === 'pencarian-biner' ? '1, 4, 7, 9' : '9, 4, 7, 1')) bad(m.id, 'data sendiri tidak dipakai'); }
    const fullTxt = await page.$eval('.al .al-full', e => e.textContent);
    OWN[2].forEach(t => { if (!fullTxt.includes(t)) bad(m.id, 'program lengkap tidak ikut data sendiri', t); });
    if (await page.$eval('.al input[data-key="data"]', e => e.value) !== (m.id === 'pencarian-biner' ? '1, 4, 7, 9' : OWN[0])) bad(m.id, 'isian data berubah setelah dijalankan', await page.$eval('.al input[data-key="data"]', e => e.value));
    await page.fill('.al input[data-key="data"]', OWN[3]);
    await page.click('.al button[type="submit"]');
    if (!(await page.$('.al [role="alert"]'))) bad(m.id, 'data salah tidak ditolak');
    // Acak menghasilkan data yang sah
    await page.click('.al [data-act="acak"]');
    if (await page.$('.al [role="alert"]') || !/Langkah 1 dari/.test(await step())) bad(m.id, 'Acak gagal');
    // Sampai selesai
    for (let i = 0; i < 400 && !(await page.$eval('.al [data-act="next"]', e => e.disabled)); i++) await page.click('.al [data-act="next"]');
  }
  const hp = await browser.newPage({ viewport: { width: 375, height: 800 } });
  hp.on('pageerror', e => errs.push(e.message));
  for (const m of sda.meetings) {
    await hp.goto(URL0 + `#/c/${sda.id}/m/${m.id}`); await hp.waitForSelector('.al');
    const w = await hp.evaluate(() => document.documentElement.scrollWidth);
    if (w > 375) bad(m.id, 'HP melebar', w);
  }
  if (errs.length) bad('galat di browser', errs.slice(0, 5));
} finally { await browser.close(); server.close(); }
if (fail) { console.error(`algo-lab: ${fail} masalah`); process.exit(1); }
console.log('algo-lab: semua lolos');
