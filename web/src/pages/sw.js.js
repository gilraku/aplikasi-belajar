// Service worker: menyimpan aplikasi + semua materi supaya tetap bisa dibuka tanpa internet.
// Isinya memuat hash mesin, versi data, dan hash CSS, jadi setiap kali ada yang berubah
// browser otomatis memasang versi baru dan membuang cache lama.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { library, dataVersion } from '../lib/library.mjs';
import { engine } from '../lib/engine.mjs';

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export async function GET() {
  const { hash } = await engine();
  const css = fs.readFileSync(path.resolve(process.cwd(), 'src/styles/global.css'), 'utf8');
  const version = crypto.createHash('sha1').update([hash, dataVersion, css, fs.readFileSync(path.resolve(process.cwd(), 'tailwind.config.cjs'), 'utf8')].join('|')).digest('hex').slice(0, 10);
  const data = library.flatMap(c => c.meetings.map(m => `${base}data/${encodeURIComponent(c.id)}/${encodeURIComponent(m.id)}.json?v=${dataVersion}`));
  const precache = [base, `${base}app-${hash}.js`, `${base}manifest.webmanifest`, `${base}icons/icon-192.png`, ...data];
  const code = `// Dibuat otomatis oleh web/src/pages/sw.js.js
const VERSION = ${JSON.stringify(version)};
const BASE = ${JSON.stringify(base)};
const CACHE = 'belajar-' + VERSION, FONTS = 'belajar-fonts';
const PRECACHE = ${JSON.stringify(precache)};

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(PRECACHE);
    // CSS hasil build (/_astro/...) namanya ber-hash; ambil dari halaman utama
    const html = await (await cache.match(BASE)).text();
    const assets = [...html.matchAll(/(?:href|src)="([^"]*\\/_astro\\/[^"]+)"/g)].map(m => m[1]);
    if (assets.length) await cache.addAll(assets);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('belajar-') && k !== CACHE && k !== FONTS) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Font Google: pakai yang tersimpan, perbarui di belakang layar
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONTS).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== location.origin || !url.pathname.startsWith(BASE)) return;
  // Unduh .html mandiri selalu dari jaringan (berkasnya besar dan jarang dipakai)
  if (url.pathname === BASE + 'offline.html') return;

  // Halaman utama: coba jaringan dulu (supaya materi terbaru), kalau offline pakai simpanan
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const r = await fetch(req);
        if (r.ok && url.pathname === BASE) (await caches.open(CACHE)).put(BASE, r.clone());
        return r;
      } catch (err) {
        return (await caches.match(BASE)) || Response.error();
      }
    })());
    return;
  }

  // Berkas lain (skrip ber-hash, CSS, materi ber-versi, ikon): simpanan dulu, lalu jaringan
  e.respondWith((async () => {
    const hit = await caches.match(req);
    if (hit) return hit;
    const r = await fetch(req);
    if (r.ok) (await caches.open(CACHE)).put(req, r.clone());
    return r;
  })());
});
`;
  return new Response(code, { headers: { 'Content-Type': 'text/javascript; charset=utf-8' } });
}
