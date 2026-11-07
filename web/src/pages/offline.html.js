// Distribusi HTML mandiri memakai mesin dan gaya yang sama dengan versi Astro.
import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { library, renderOffline } from '../lib/library.mjs';
import { engine } from '../lib/engine.mjs';

export async function GET() {
  const from = path.resolve('src/styles/global.css');
  const { css } = await postcss([tailwind(path.resolve('tailwind.config.cjs')), autoprefixer()])
    .process(fs.readFileSync(from, 'utf8'), { from });
  const { code } = await engine();
  return new Response(renderOffline({ library, css, code }), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
