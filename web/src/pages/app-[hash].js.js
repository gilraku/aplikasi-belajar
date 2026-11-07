import { engine } from '../lib/engine.mjs';
export async function getStaticPaths() { const { hash } = await engine(); return [{ params: { hash } }]; }
export async function GET() { const { code } = await engine(); return new Response(code, { headers: { 'Content-Type': 'text/javascript; charset=utf-8' } }); }
