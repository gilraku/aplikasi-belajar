// Tes "Cari cepat": untuk SETIAP potongan di indeks pencarian (semua matkul), lompat ke tujuannya
// dan pastikan teks hasil itu benar-benar terlihat di halaman (panel/tab/langkah/kartu yang tepat terbuka).
// Gagal (exit 1) kalau ada hasil yang tujuannya tidak menampilkan teksnya.
// Jalankan: npm run build && node tests/cari.mjs
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const DIST = path.resolve(process.cwd(), process.env.ASTRO_OUT || 'dist');
const BASE = (process.env.ASTRO_BASE || (process.env.VERCEL ? '/' : '/aplikasi-belajar/')).replace(/\/?$/, '/');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const CARI = path.join(DIST, 'data', 'cari');
if (!fs.existsSync(CARI)) { console.error('dist/data/cari belum ada. Jalankan "npm run build" dulu.'); process.exit(1); }

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
const TAB = { l: 'materi', c: 'cheatsheet', s: 'simulator', f: 'flashcard', q: 'quiz' };

const fails = [];
let total = 0;
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  const page = await ctx.newPage();
  page.on('pageerror', e => fails.push(`error JS: ${e.message}`));
  await page.goto(URL0);
  const only = process.env.CARI_COURSE;
  for (const file of fs.readdirSync(CARI).filter(f => f.endsWith('.json'))) {
    const cid = file.replace(/\.json$/, '');
    if (only && cid !== only) continue;
    const ix = JSON.parse(fs.readFileSync(path.join(CARI, file), 'utf8'));
    // Kelompokkan per pertemuan + tab supaya halaman cukup dibuka sekali
    const groups = new Map();
    ix.e.forEach(e => { const k = e[0] + '|' + e[1]; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(e); });
    let cf = 0;
    for (const [k, list] of groups) {
      const [mi, tab] = k.split('|'), mid = ix.m[mi][0];
      await page.goto(`${URL0}#/c/${encodeURIComponent(cid)}/m/${encodeURIComponent(mid)}/${TAB[tab]}`);
      await page.waitForFunction(() => !document.querySelector('#appMain .animate-spin') && document.querySelector('#appMain'), null, { timeout: 15000 });
      await page.waitForTimeout(150);
      const bad = await page.evaluate(({ list, tabName }) => {
        const sq = x => fold(String(x)).replace(/[^\p{L}\p{N}]+/gu, '');
        const shown = x => { const d = document.createElement('div'); d.innerHTML = rich(x || ''); return d.textContent; };
        const out = [];
        const orig = Element.prototype.scrollIntoView; Element.prototype.scrollIntoView = function () {};
        for (const e of list) {
          const text = e[3], words = fold(text).match(/[\p{L}\p{N}_]{4,}/gu) || [];
          // Kata kunci dari bagian akhir teks: paling mungkin hanya ada di sisi tersembunyi
          const terms = words.slice(-2);
          let el = null;
          if (e[1] === 'q') el = document.getElementById('qz-' + e[2]);
          else if (e[1] === 'f') el = document.getElementById('fc-' + e[2]);
          else { const ids = S.blockIds && S.blockIds[tabName], n = ids && ids[e[2]]; el = n != null ? document.getElementById('blk-' + n) : null; }
          if (!el) { out.push([e[2], 'tujuan tidak ada', text]); continue; }
          if (e[1] === 'f') el.classList.remove('flipped');
          jumpTo({ tab: tabName, kind: e[1], i: e[2], terms, text });
          el = e[1] === 'q' ? document.getElementById('qz-' + e[2]) : e[1] === 'f' ? document.getElementById('fc-' + e[2]) : el;
          let vis;
          if (e[1] === 'f') {
            // Kartu: sisi yang terlihat bergantung pada kelas flipped
            const f = S.meeting.flashcards[e[2]], side = el.classList.contains('flipped') ? f.a : f.q;
            vis = sq(shown(side));
            // Kata yang tidak ada di pertanyaan harus terlihat di sisi yang sedang tampil
            const fq = sq(shown(f.q));
            const need = terms.map(sq).filter(t => t && !fq.includes(t));
            if (need.length && !need.every(t => vis.includes(t))) out.push([e[2], 'kata kunci tidak di sisi yang tampil', text]);
            continue;
          }
          vis = sq(el.innerText);
          // Kuis: pertanyaannya harus tampil (pembahasan memang baru muncul setelah menjawab)
          if (e[1] === 'q') { const qs = sq(shown(S.meeting.quiz[e[2]].q)).slice(0, 40); if (!vis.includes(qs)) out.push([e[2], 'pertanyaan tidak terlihat', text]); continue; }
          // Cocokkan potongan awal ATAU akhir teks hasil (teks tabel/kode bisa dipecah berbeda di tampilan)
          const s = sq(text), head = s.slice(0, 40), tail = s.slice(-40);
          if (!(vis.includes(head) || vis.includes(tail))) {
            // Sebutkan jenis blok terdalam yang memuat teks ini, supaya mudah dilacak
            let where = e[1];
            if (e[1] !== 'q') { const w = (d, acc) => { if (!d || typeof d !== 'object') return acc; if (d.type && sq(JSON.stringify(d)).includes(head.slice(0, 20))) acc = d.type; Object.values(d).forEach(v => { if (v && typeof v === 'object') { const r = w(v, null); if (r) acc = r; } }); return acc; };
              const n = S.blockIds[tabName][e[2]]; where = w(BLOCKS[n].def, BLOCKS[n].def.type); }
            out.push([e[2], 'teks tidak terlihat [' + where + ']', text]);
          }
        }
        Element.prototype.scrollIntoView = orig;
        document.querySelectorAll('.cari-mark').forEach(m => m.replaceWith(...m.childNodes));
        return out;
      }, { list, tabName: TAB[tab] });
      total += list.length;
      bad.forEach(([i, why, text]) => { cf++; fails.push(`${cid} ${mid} ${TAB[tab]} #${i}: ${why}: ${text.slice(0, 110)}`); });
    }
    console.log(`  ${cid}: ${ix.e.length} hasil, ${cf} gagal`);
  }
  // Alur nyata lewat kotak Cari: ketik kata, pilih hasil, cek teksnya tersorot dan terlihat di layar
  const E2E = [
    ['sif002-basis-data', 'penghapus', 'P3'],
    ['sif002-basis-data', 'tanggal keluar', 'Konsep Sama'],
    ['sif002-basis-data', '1045 access denied', 'Delapan Langkah'],
    ['sif002-basis-data', 'dua ribu', 'Cheat Sheet'],
    ['sif002-basis-data', 'nilai cadangan', 'DESCRIBE'],
    ['sif002-basis-data', 'utf8mb4_general_ci', 'Flashcard'],
    ['sif002-basis-data', 'tidak ada tabel', 'Delapan Langkah'],
    ['aik', 'يُرِيدُ', 'Prinsip'],
    ['algoritma-pemrograman', 'masukkan nilai a', ''],
    ['algoritma-pemrograman', 'include iostream', 'Kuis'],
    ['bahasa-inggris', 'senang bertemu denganmu', ''],
  ];
  for (const [cid, q, pick] of E2E) {
    await page.goto(`${URL0}#/c/${cid}`);
    await page.waitForFunction(() => !document.querySelector('#appMain .animate-spin'), null, { timeout: 15000 });
    await page.evaluate(() => openSearch());
    await page.fill('#cariQ', q);
    await page.waitForSelector('[data-cari]', { timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(600);
    const items = await page.$$eval('[data-cari]', els => els.map(e => e.innerText.replace(/\s+/g, ' ')));
    const i = items.findIndex(x => x.includes(pick));
    if (i < 0) { fails.push(`cari "${q}" (${cid}): tidak ada hasil berisi "${pick}" (dapat: ${items.slice(0, 3).map(x => x.slice(0, 50)).join(" | ")})`); continue; }
    await page.click(`[data-cari="${i}"]`);
    // Tunggu halaman tujuan dimuat dan gulir halus selesai
    const seen = await page.waitForFunction(() => [...document.querySelectorAll('.cari-mark')].some(m => { const r = m.getBoundingClientRect(); return r.width > 0 && r.bottom > 0 && r.top < innerHeight; }), null, { timeout: 5000 }).then(() => true, () => false);
    if (!seen) fails.push(`cari "${q}" (${cid}) → "${items[i].slice(0, 60)}": tidak ada sorotan yang terlihat di layar`);
    total++;
  }
} finally {
  await browser.close();
  server.close();
}
fails.slice(0, process.env.CARI_ALL ? 1e9 : 80).forEach(f => console.log('  ✗ ' + f));
if (!process.env.CARI_ALL && fails.length > 80) console.log(`  … dan ${fails.length - 80} lainnya`);
console.log(fails.length ? `Gagal: ${fails.length} dari ${total} hasil pencarian.` : `Selesai: ${total} hasil pencarian, semua tujuannya menampilkan teksnya.`);
process.exit(fails.length ? 1 : 0);
