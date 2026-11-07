// Identitas "Sinau": tinta hijau tua untuk aksi utama + kuning stabilo untuk sorotan.
// Palet `indigo` sengaja ditimpa supaya seluruh kelas indigo-* di engine ikut tema baru:
// tingkat 50–300 = kuning stabilo (latar lembut, sorotan), 400–950 = tinta hijau tua (tombol, teks aksen).
module.exports = {
  content: ['./src/**/*.{astro,js,mjs}'],
  safelist: ['md:grid-cols-1', 'md:grid-cols-2', 'md:grid-cols-3', 'md:grid-cols-4', 'md:grid-cols-5'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Atkinson Hyperlegible"', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', '"Atkinson Hyperlegible"', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      colors: {
        paper: '#fbfbf8',
        ink: '#17202a',
        indigo: {
          50: '#fff9db', 100: '#fff1a8', 200: '#f3df7a', 300: '#e4c94a',
          400: '#4f8f84', 500: '#2f7a6d', 600: '#1f5c52', 700: '#194a42',
          800: '#143b35', 900: '#102f2a', 950: '#0b201d'
        }
      }
    }
  }
};
