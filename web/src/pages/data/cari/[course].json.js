// Indeks "Cari cepat" per mata kuliah: data/cari/<id-matkul>.json (dimuat saat kotak cari dibuka)
import { searchPaths, courseIndex } from '../../../lib/search.mjs';
export const getStaticPaths = () => searchPaths();
export const GET = ({ props }) => new Response(JSON.stringify(courseIndex(props.course)), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
