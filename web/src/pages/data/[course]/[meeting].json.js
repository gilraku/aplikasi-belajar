// Satu file JSON per pertemuan: data/<id-matkul>/<id-pertemuan>.json
import { meetingPaths } from '../../../lib/library.mjs';
export const getStaticPaths = () => meetingPaths();
export const GET = ({ props }) => new Response(JSON.stringify(props.meeting), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
