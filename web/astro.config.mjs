import { defineConfig } from 'astro/config';

// Situs ini bisa diterbitkan di dua tempat dari kode yang sama:
// - GitHub Pages: https://gilraku.github.io/aplikasi-belajar/ (.github/workflows/astro-pages.yml), base /aplikasi-belajar/
// - Vercel: https://<nama-proyek>.vercel.app/ (vercel.json di akar repo), base /
// Vercel mengisi variabel VERCEL=1 saat build, jadi base dan alamat situs otomatis menyesuaikan.
// ASTRO_BASE / ASTRO_SITE tetap bisa dipakai untuk memaksa nilai tertentu (misalnya domain sendiri).
const onVercel = !!process.env.VERCEL;
const vercelHost = process.env.VERCEL_ENV === 'production' ? process.env.VERCEL_PROJECT_PRODUCTION_URL : process.env.VERCEL_URL;

export default defineConfig({
  site: process.env.ASTRO_SITE || (onVercel && vercelHost ? `https://${vercelHost}` : 'https://gilraku.github.io'),
  base: process.env.ASTRO_BASE || (onVercel ? '/' : '/aplikasi-belajar/'),
  outDir: process.env.ASTRO_OUT || 'dist',
  trailingSlash: 'ignore',
  build: { format: 'directory', assets: '_astro' },
  devToolbar: { enabled: false }
});
