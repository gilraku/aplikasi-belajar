// Mesin aplikasi (src/scripts/engine.js) disajikan sebagai skrip klasik (bukan module),
// karena tombol-tombolnya memakai onclick="go(...)" yang butuh fungsi global.
// Diperkecil dengan esbuild dan diberi hash di nama file supaya cache browser aman.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { transform } from 'esbuild';

const SRC = path.resolve(process.cwd(), 'src/scripts/engine.js');
let cache = null;
export async function engine() {
  const raw = fs.readFileSync(SRC, 'utf8');
  if (cache && cache.raw === raw) return cache;
  const { code } = await transform(raw, { loader: 'js', minify: true, target: 'es2019', charset: 'utf8' });
  cache = { raw, code, hash: crypto.createHash('sha1').update(code).digest('hex').slice(0, 10) };
  return cache;
}
