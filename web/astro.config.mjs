import { defineConfig } from 'astro/config';

// Situs utama: https://gilraku.github.io/aplikasi-belajar/ (dibangun & diterbitkan oleh .github/workflows/astro-pages.yml)
export default defineConfig({
  site: 'https://gilraku.github.io',
  base: process.env.ASTRO_BASE || '/aplikasi-belajar/',
  outDir: process.env.ASTRO_OUT || 'dist',
  trailingSlash: 'ignore',
  build: { format: 'directory', assets: '_astro' },
  devToolbar: { enabled: false }
});
