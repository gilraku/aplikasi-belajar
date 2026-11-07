module.exports = {
  content: ['./src/**/*.{astro,js,mjs}'],
  safelist: ['md:grid-cols-1', 'md:grid-cols-2', 'md:grid-cols-3', 'md:grid-cols-4', 'md:grid-cols-5'],
  theme: { extend: { fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] } } }
};
