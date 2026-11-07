// Manifest PWA: supaya aplikasi bisa dipasang ke layar utama HP/laptop
import { semester } from '../lib/library.mjs';
const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export const GET = () => new Response(JSON.stringify({
  name: `Aplikasi Belajar Interaktif — ${semester}`,
  short_name: 'Belajar',
  description: 'Materi, flashcard, dan kuis persiapan ujian, bisa dibuka tanpa internet.',
  lang: 'id',
  id: base,
  start_url: base,
  scope: base,
  display: 'standalone',
  background_color: '#f8fafc',
  theme_color: '#4f46e5',
  icons: [
    { src: `${base}icons/icon-192.png`, sizes: '192x192', type: 'image/png' },
    { src: `${base}icons/icon-512.png`, sizes: '512x512', type: 'image/png' },
    { src: `${base}icons/maskable-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' }
  ]
}, null, 2), { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } });
