// Aplikasi satu file (sama persis dengan hasil sumber/build.js), dipakai fitur "Unduh .html mandiri".
import { renderOffline } from '../lib/library.mjs';
export const GET = () => new Response(renderOffline(), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
