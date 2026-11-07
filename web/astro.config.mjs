import { defineConfig } from 'astro/config';

// Versi uji diterbitkan di folder ../beta → https://gilraku.github.io/aplikasi-belajar/beta/
// (situs utama index.html tidak disentuh). Saat pindah penuh: ASTRO_BASE=/aplikasi-belajar/ ASTRO_OUT=dist
export default defineConfig({
  site: 'https://gilraku.github.io',
  base: process.env.ASTRO_BASE || '/aplikasi-belajar/beta/',
  outDir: process.env.ASTRO_OUT || '../beta',
  trailingSlash: 'ignore',
  build: { format: 'directory', assets: '_astro' },
  devToolbar: { enabled: false }
});
