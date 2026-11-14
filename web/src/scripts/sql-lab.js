// Model SQL terbatas untuk latihan Basis Data P4 dan P6–P8. Perintah diproses di browser.
const SQL_SYSTEM = ['information_schema', 'mysql', 'performance_schema', 'sys'];
const sqlSession = () => ({ databases: [], active: '', transaction: null });
const sqlTable = (columns, rows) => rows.length ? [columns, ...rows].map(row => row.map(v => v ?? 'NULL').join(' | ')).join('\n') + '\n' + rows.length + ' baris' : 'Empty set (0 baris)';
function runSqlLab(db, input) {
  const output = [];
  const commands = input.match(/(?:'(?:''|[^'])*'|[^;'])+|'/g)?.map(s => s.trim()).filter(Boolean) || [];
  const ok = (text = 'Query OK, 0 rows affected') => output.push(text);
  const fail = (code, text) => {
    output.push(`ERROR ${code}: ${text}`);
    return { ok: false, text: output.join('\n\n') };
  };
  if (!commands.length) return { ok: false, text: 'Tulis perintah SQL terlebih dahulu.' };
  for (const command of commands) {
    let m;
    if (/^SHOW\s+DATABASES$/i.test(command)) {
      ok(sqlTable(['Database'], [...SQL_SYSTEM, ...db.databases.map(d => d.name)].sort().map(n => [n])));
      continue;
    }
    if ((m = /^CREATE\s+DATABASE\s+(IF\s+NOT\s+EXISTS\s+)?([a-z_][a-z0-9_]*)$/i.exec(command))) {
      const name = m[2].toLowerCase();
      if (SQL_SYSTEM.includes(name) || db.databases.some(d => d.name === name)) {
        if (!m[1]) return fail(1007, `Basis data '${name}' sudah ada.`);
        ok('Query OK. Basis data sudah ada.'); continue;
      }
      db.transaction = null;
      db.databases.push({ name, tables: [] }); ok('Query OK, 1 row affected'); continue;
    }
    if ((m = /^DROP\s+DATABASE\s+(IF\s+EXISTS\s+)?([a-z_][a-z0-9_]*)$/i.exec(command))) {
      const name = m[2].toLowerCase();
      if (SQL_SYSTEM.includes(name)) return fail(1044, 'Basis data sistem dilindungi dalam latihan ini.');
      const index = db.databases.findIndex(d => d.name === name);
      if (index < 0) {
        if (!m[1]) return fail(1008, `Basis data '${name}' tidak ada.`);
        ok('Query OK. Basis data memang tidak ada.'); continue;
      }
      db.transaction = null;
      db.databases.splice(index, 1);
      if (db.active === name) db.active = '';
      ok(); continue;
    }
    if ((m = /^USE\s+([a-z_][a-z0-9_]*)$/i.exec(command))) {
      const name = m[1].toLowerCase();
      if (!db.databases.some(d => d.name === name)) return fail(1049, `Basis data '${name}' belum tersedia di lab.`);
      db.active = name; ok(`Database changed: ${name}`); continue;
    }
    if (/^START TRANSACTION$/i.test(command)) {
      db.transaction = JSON.stringify(db.databases); ok(); continue;
    }
    if (/^(ROLLBACK|COMMIT)$/i.test(command)) {
      if (/^ROLLBACK$/i.test(command) && db.transaction) db.databases = JSON.parse(db.transaction);
      db.transaction = null; ok(); continue;
    }
    if (!/^(SHOW\s+TABLES|CREATE\s+TABLE|DROP\s+TABLE|ALTER\s+TABLE|RENAME\s+TABLE|DESCRIBE\s|INSERT\s+INTO|SELECT\s|UPDATE\s|DELETE\s+FROM\s|TRUNCATE\s)/i.test(command)) return fail(1064, 'Periksa sintaks. Lab hanya mendukung perintah latihan yang tersedia.');
    const schema = db.databases.find(d => d.name === db.active);
    if (!schema) return fail(1046, 'Belum memilih basis data. Gunakan USE atau pilih basis data di sebelah kiri.');
    if (/^SHOW\s+TABLES$/i.test(command)) {
      ok(sqlTable([`Tables_in_${schema.name}`], schema.tables.map(t => [t.name]))); continue;
    }
    if ((m = /^CREATE\s+TABLE\s+(IF\s+NOT\s+EXISTS\s+)?([a-z_]\w*)\s*\(([\s\S]+)\)$/i.exec(command))) {
      const name = m[2].toLowerCase();
      if (schema.tables.some(t => t.name === name)) {
        if (!m[1]) return fail(1050, `Tabel '${name}' sudah ada.`);
        ok('Query OK. Tabel sudah ada.'); continue;
      }
      const columns = [];
      let key = '';
      for (const definition of m[3].split(/,(?![^(]*\))/)) {
        const pk = /^\s*PRIMARY\s+KEY\s*\(\s*([a-z_]\w*)\s*\)\s*$/i.exec(definition);
        if (pk) {
          if (key) return fail(1068, 'Hanya satu PRIMARY KEY yang didukung.');
          key = pk[1].toLowerCase(); continue;
        }
        const col = new RegExp(String.raw`^\s*([a-z_]\w*)\s+(${SQL_TYPE})(\s+NOT\s+NULL)?\s*$`, 'i').exec(definition);
        if (!col) return fail(1064, 'Definisi kolom tidak didukung. Ikuti bentuk CREATE TABLE pada contoh.');
        const field = col[1].toLowerCase();
        if (columns.some(c => c.name === field)) return fail(1060, `Kolom '${field}' sudah ada.`);
        columns.push({ name: field, type: col[2].toLowerCase().replace(/\s+/g, ''), required: !!col[3] });
      }
      if (!columns.length || (key && !columns.some(c => c.name === key))) return fail(1072, 'Kolom kunci primer tidak ditemukan.');
      db.transaction = null;
      schema.tables.push({ name, columns, key, rows: [] }); ok(); continue;
    }
    if ((m = /^DROP\s+TABLE\s+(IF\s+EXISTS\s+)?([a-z_]\w*)$/i.exec(command))) {
      const index = schema.tables.findIndex(t => t.name === m[2].toLowerCase());
      if (index < 0) {
        if (!m[1]) return fail(1051, `Tabel '${m[2]}' tidak ada.`);
        ok('Query OK. Tabel memang tidak ada.'); continue;
      }
      db.transaction = null;
      schema.tables.splice(index, 1); ok(); continue;
    }
    if ((m = /^ALTER\s+TABLE\s+([a-z_]\w*)\s+([\s\S]+)$/i.exec(command)) || (m = /^RENAME\s+TABLE\s+([a-z_]\w*)\s+(TO\s+[a-z_]\w*)$/i.exec(command))) {
      const r = sqlAlter(schema, m[1], /^RENAME/i.test(command) ? 'RENAME ' + m[2] : m[2]);
      if (r.error) return fail(r.code || 1064, r.error);
      // ALTER termasuk DDL: di MySQL perintah ini otomatis menyimpan (COMMIT) transaksi yang sedang berjalan
      db.transaction = null;
      ok('Query OK, 0 rows affected\nRecords: 0  Duplicates: 0  Warnings: 0'); continue;
    }
    if (/^SELECT\s/i.test(command)) {
      const r = sqlSelect(schema, command);
      if (r.error) return fail(r.code || 1064, r.error);
      ok(r.text); continue;
    }
    const describe = /^DESCRIBE\s+([a-z_]\w*)$/i.exec(command);
    const insert = /^INSERT\s+INTO\s+([a-z_]\w*)\s*(?:\(([^)]*)\))?\s*VALUES\s*([\s\S]+)$/i.exec(command);
    const update = /^UPDATE\s+([a-z_]\w*)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?$/i.exec(command);
    const remove = /^DELETE\s+FROM\s+([a-z_]\w*)(?:\s+WHERE\s+([\s\S]+))?$/i.exec(command);
    const truncate = /^TRUNCATE\s+(?:TABLE\s+)?([a-z_]\w*)$/i.exec(command);
    const name = describe?.[1] || insert?.[1] || update?.[1] || remove?.[1] || truncate?.[1];
    if (!name) return fail(1064, 'Periksa sintaks dan bentuk perintah pada contoh.');
    const table = schema.tables.find(t => t.name === name.toLowerCase());
    if (!table) return fail(1146, `Tabel '${schema.name}.${name}' belum ada.`);
    const indexOf = field => table.columns.findIndex(c => c.name === field.toLowerCase());
    const where = text => sqlWhere(text, indexOf, i => table.columns[i]);
    if (describe) {
      ok(sqlTable(['Field', 'Type', 'Null', 'Key'], table.columns.map(c => [c.name, c.type, c.required || c.name === table.key ? 'NO' : 'YES', c.name === table.key ? 'PRI' : ''])));
    } else if (insert) {
      const fields = insert[2] ? insert[2].split(',').map(f => f.trim()).filter(Boolean) : table.columns.map(c => c.name);
      if (fields.some(f => indexOf(f) < 0)) return fail(1054, 'Nama kolom tidak ditemukan.');
      // Seluruh bagian VALUES harus berupa (...), (...), ... tanpa sisa teks atau koma yang terlewat
      const tuple = String.raw`\(((?:'(?:''|[^'])*'|[^()'])*)\)`;
      if (!new RegExp(`^${tuple}(?:\\s*,\\s*${tuple})*$`).test(insert[3].trim())) return fail(1064, 'Tulis nilai di dalam kurung dan pisahkan tiap baris dengan koma: VALUES (...), (...).');
      const groups = [...insert[3].matchAll(new RegExp(tuple, 'g'))].map(g => g[1]);
      const added = [];
      for (const group of groups) {
        const parts = group.match(/(?:'(?:''|[^'])*'|[^,'])+/g)?.map(v => v.trim()) || [];
        if (parts.length !== fields.length) return fail(1136, 'Jumlah nilai harus sama dengan jumlah kolom.');
        const row = table.columns.map(c => c.def ?? null);
        for (const [i, raw] of parts.entries()) {
          const value = sqlValue(raw);
          if (value === undefined) return fail(1064, 'Gunakan tanda kutip tunggal untuk teks.');
          row[indexOf(fields[i])] = sqlFit(table.columns[indexOf(fields[i])], value);
        }
        const empty = table.columns.find((c, i) => row[i] === null && (c.required || c.name === table.key));
        if (empty) return fail(1048, `Kolom '${empty.name}' tidak boleh NULL.`);
        if (table.key && [...table.rows, ...added].some(r => r[indexOf(table.key)] === row[indexOf(table.key)])) return fail(1062, `Duplicate entry '${row[indexOf(table.key)]}' for key 'PRIMARY'. Nilai kunci primer sudah digunakan.`);
        added.push(row);
      }
      table.rows.push(...added); ok(`Query OK, ${added.length} row${added.length > 1 ? 's' : ''} affected`);
    } else if (update) {
      const sets = [];
      for (const part of update[2].match(/(?:'(?:''|[^'])*'|[^,'])+/g) || []) {
        const m2 = /^\s*([a-z_]\w*)\s*=\s*([\s\S]+?)\s*$/i.exec(part);
        if (!m2) return fail(1064, 'Bentuk SET: kolom = nilai.');
        const i = indexOf(m2[1]), value = sqlValue(m2[2]);
        if (i < 0) return fail(1054, 'Nama kolom tidak ditemukan.');
        if (value === undefined) return fail(1064, 'Gunakan tanda kutip tunggal untuk teks.');
        if (value === null && (table.columns[i].required || table.columns[i].name === table.key)) return fail(1048, `Kolom '${table.columns[i].name}' tidak boleh NULL.`);
        sets.push([i, sqlFit(table.columns[i], value)]);
      }
      const test = update[3] ? where(update[3]) : () => true;
      if (test.error) return fail(test.code || 1064, test.error);
      const hit = table.rows.filter(test);
      const k = table.key ? indexOf(table.key) : -1;
      if (k >= 0 && sets.some(([i]) => i === k) && (hit.length > 1 || table.rows.some(r => !hit.includes(r) && sets.some(([i, v]) => i === k && r[k] === v)))) return fail(1062, 'Nilai kunci primer akan kembar. Perubahan dibatalkan.');
      let changed = 0;
      hit.forEach(r => { if (sets.some(([i, v]) => r[i] !== v)) changed++; sets.forEach(([i, v]) => { r[i] = v; }); });
      ok(`Query OK, ${changed} row${changed === 1 ? '' : 's'} affected\nRows matched: ${hit.length}  Changed: ${changed}  Warnings: 0`);
    } else if (remove) {
      const test = remove[2] ? where(remove[2]) : () => true;
      if (test.error) return fail(test.code || 1064, test.error);
      const before = table.rows.length;
      table.rows = table.rows.filter(r => !test(r));
      const n = before - table.rows.length;
      ok(`Query OK, ${n} row${n === 1 ? '' : 's'} affected`);
    } else {
      db.transaction = null;
      table.rows = []; ok('Query OK, 0 rows affected');
    }
  }
  return { ok: true, text: output.join('\n\n') };
}

// Nilai literal SQL: 'teks', angka (boleh desimal), atau NULL. undefined = bentuk tidak dikenal.
// Kolom DECIMAL(p,s) menyimpan angka dengan s digit di belakang koma, seperti tampilan MySQL (3.7 → 3.70)
function sqlFit(column, value) {
  const m = /^decimal\(\d+,\s*(\d+)\)$/.exec(column.type);
  return m && value !== null && /^-?\d+(\.\d+)?$/.test(value) ? Number(value).toFixed(+m[1]) : value;
}
function sqlValue(raw) {
  const t = String(raw).trim();
  if (/^NULL$/i.test(t)) return null;
  if (/^'(?:''|[^'])*'$/.test(t)) return t.slice(1, -1).replace(/''/g, "'");
  if (/^-?\d+(\.\d+)?$/.test(t)) return t;
  return undefined;
}
const sqlNumType = column => !!column && /^(int|decimal|year|float|double)/.test(column.type);
// Bandingkan dua nilai sel. numeric = true (kolom angka, atau kolom teks dibandingkan dengan angka tanpa kutip):
// bandingkan sebagai angka. Selain itu sebagai teks tanpa membedakan huruf besar/kecil (seperti collation bawaan MySQL),
// jadi nim CHAR '02301001' tidak sama dengan '2301001'.
function sqlCompare(a, b, numeric) {
  if (a === null || b === null) return a === b ? 0 : a === null ? -1 : 1;
  const x = Number(a), y = Number(b);
  if (numeric && a !== '' && b !== '' && !Number.isNaN(x) && !Number.isNaN(y)) return x - y;
  const p = String(a).toLowerCase(), q = String(b).toLowerCase();
  return p < q ? -1 : p > q ? 1 : 0;
}
// Kolom boleh ditulis dengan nama tabel/alias di depannya (b.judul). Fungsi agregat dipakai di HAVING/ORDER BY.
const SQL_REF = String.raw`[a-z_]\w*(?:\.[a-z_]\w*)?`;
const SQL_AGG = String.raw`(?:COUNT|SUM|AVG|MIN|MAX)\s*\(\s*(?:DISTINCT\s+)?(?:\*|${SQL_REF})\s*\)`;
const SQL_OPERAND = `(?:${SQL_AGG}|${SQL_REF})`;
const SQL_TYPE = String.raw`(?:char\(\d+\)|varchar\(\d+\)|decimal\(\d+,\s*\d+\)|int(?:eger)?(?:\(\d+\))?|year|datetime|date|text|float|double)`;
// WHERE / ON / HAVING sederhana: syarat "kolom operator nilai" (atau kolom = kolom) yang digabung AND / OR (AND lebih kuat),
// plus LIKE, BETWEEN, IN, dan IS [NOT] NULL. indexOf mengembalikan indeks, -1 (tidak ada), atau { error, code }.
function sqlWhere(text, indexOf, columnAt = () => null) {
  const quoted = [];
  const safe = text.replace(/'(?:''|[^'])*'/g, m => { quoted.push(m); return `\u0000${quoted.length - 1}\u0000`; })
    .replace(/\bBETWEEN\s+(\S+)\s+AND\s+(\S+)/gi, 'BETWEEN $1 \u0001 $2');
  const back = t => t.replace(/\u0000(\d+)\u0000/g, (m, i) => quoted[+i]);
  const pick = name => {
    const i = indexOf(name);
    return typeof i === 'object' ? i : i < 0 ? { error: `Kolom '${name}' tidak ditemukan.`, code: 1054 } : i;
  };
  const groups = [];
  for (const orPart of safe.split(/\s+OR\s+/i)) {
    const group = [];
    for (const raw of orPart.split(/\s+AND\s+/i)) {
      const part = back(raw.trim());
      let m, i;
      if ((m = new RegExp(`^(${SQL_OPERAND})\\s+IS\\s+(NOT\\s+)?NULL$`, 'i').exec(part))) {
        if (typeof (i = pick(m[1])) === 'object') return i;
        const not = !!m[2]; group.push(r => (r[i] === null) !== not); continue;
      }
      if ((m = new RegExp(`^(${SQL_OPERAND})\\s+(NOT\\s+)?LIKE\\s+('(?:''|[^'])*')$`, 'i').exec(part))) {
        if (typeof (i = pick(m[1])) === 'object') return i;
        const pattern = sqlValue(m[3]).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '[\\s\\S]*').replace(/_/g, '[\\s\\S]');
        const re = new RegExp('^' + pattern + '$', 'i'), not = !!m[2];
        group.push(r => r[i] !== null && re.test(r[i]) !== not); continue;
      }
      if ((m = new RegExp(`^(${SQL_OPERAND})\\s+(NOT\\s+)?BETWEEN\\s+(\\S+)\\s+\\u0001\\s+(\\S+)$`, 'i').exec(part))) {
        if (typeof (i = pick(m[1])) === 'object') return i;
        const lo = sqlValue(m[3]), hi = sqlValue(m[4]), not = !!m[2];
        if (lo == null || hi == null) return { error: 'Bentuk BETWEEN: kolom BETWEEN nilai_awal AND nilai_akhir.' };
        const numeric = sqlNumType(columnAt(i)) || !/^'/.test(m[3]);
        group.push(r => r[i] !== null && (sqlCompare(r[i], lo, numeric) >= 0 && sqlCompare(r[i], hi, numeric) <= 0) !== not); continue;
      }
      if ((m = new RegExp(`^(${SQL_OPERAND})\\s+(NOT\\s+)?IN\\s*\\(([\\s\\S]*)\\)$`, 'i').exec(part))) {
        if (typeof (i = pick(m[1])) === 'object') return i;
        const raws = m[3].match(/(?:'(?:''|[^'])*'|[^,'])+/g)?.map(v => v.trim()) || [];
        const list = raws.map(sqlValue);
        if (!list.length || list.some(v => v === undefined)) return { error: "Bentuk IN: kolom IN ('nilai1', 'nilai2'). Teks pakai kutip tunggal." };
        const numeric = sqlNumType(columnAt(i)) || raws.every(v => !/^'/.test(v)), not = !!m[2];
        // Seperti SQL: x NOT IN (…, NULL) tidak pernah benar, karena perbandingan dengan NULL hasilnya UNKNOWN
        const hasNull = list.includes(null);
        group.push(r => { if (r[i] === null) return false; const hit = list.some(v => v !== null && sqlCompare(r[i], v, numeric) === 0); return not ? !hit && !hasNull : hit; }); continue;
      }
      if ((m = new RegExp(`^(${SQL_OPERAND})\\s*(<=|>=|<>|!=|=|<|>)\\s*([\\s\\S]+)$`, 'i').exec(part))) {
        if (typeof (i = pick(m[1])) === 'object') return i;
        const op = m[2], right = m[3].trim(), value = sqlValue(right);
        const test = c => op === '=' ? c === 0 : op === '<>' || op === '!=' ? c !== 0 : op === '<' ? c < 0 : op === '>' ? c > 0 : op === '<=' ? c <= 0 : c >= 0;
        if (value === undefined) {
          // Ruas kanan berupa kolom, misalnya ON p.id_buku = b.id_buku
          const j = new RegExp(`^${SQL_OPERAND}$`, 'i').test(right) ? indexOf(right) : -1;
          if (typeof j === 'object') return j;
          if (j < 0) return { error: 'Gunakan tanda kutip tunggal untuk teks pada WHERE.' };
          const numeric = sqlNumType(columnAt(i)) && sqlNumType(columnAt(j));
          group.push(r => r[i] !== null && r[j] !== null && test(sqlCompare(r[i], r[j], numeric)));
          continue;
        }
        const numeric = sqlNumType(columnAt(i)) || !/^'/.test(right);
        // Sama seperti MySQL: perbandingan dengan NULL (mis. ipk = NULL) tidak pernah benar, gunakan IS NULL
        if (value === null) { group.push(() => false); continue; }
        group.push(r => r[i] !== null && test(sqlCompare(r[i], value, numeric)));
        continue;
      }
      return { error: `Syarat tidak dikenali: ${part}` };
    }
    groups.push(group);
  }
  return row => groups.some(g => g.every(t => t(row)));
}

// Pisahkan daftar dengan koma di tingkat teratas (tidak di dalam kurung atau kutip)
function sqlSplitTop(text) {
  const out = []; let depth = 0, quote = false, cur = '';
  for (const ch of text) {
    if (ch === "'") quote = !quote;
    if (!quote) {
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      else if (ch === ',' && !depth) { out.push(cur); cur = ''; continue; }
    }
    cur += ch;
  }
  out.push(cur);
  return out.map(t => t.trim()).filter(Boolean);
}

// ===== ALTER TABLE: mengubah struktur tabel yang sudah ada =====
function sqlColumnDef(text) {
  const m = new RegExp(String.raw`^([a-z_]\w*)\s+(${SQL_TYPE})(\s+NOT\s+NULL|\s+NULL)?(?:\s+DEFAULT\s+('(?:''|[^'])*'|-?\d+(?:\.\d+)?|NULL))?(?:\s+(FIRST|AFTER\s+([a-z_]\w*)))?$`, 'i').exec(text.trim());
  if (!m) return null;
  const column = { name: m[1].toLowerCase(), type: m[2].toLowerCase().replace(/\s+/g, ''), required: /NOT/i.test(m[3] || '') };
  if (m[4] && !/^NULL$/i.test(m[4])) column.def = sqlFit(column, sqlValue(m[4]));
  return { column, first: /^FIRST$/i.test(m[5] || ''), after: m[6]?.toLowerCase() };
}
const sqlZero = c => sqlNumType(c) ? sqlFit(c, '0') : c.type === 'date' ? '0000-00-00' : c.type === 'datetime' ? '0000-00-00 00:00:00' : '';
// Ubah nilai lama agar cocok dengan tipe baru (MODIFY/CHANGE). Mode ketat MySQL menolak data yang tidak muat.
function sqlConvert(column, value) {
  if (value === null) return { value };
  const len = /^(?:var)?char\((\d+)\)$/.exec(column.type);
  if (len && String(value).length > +len[1]) return { error: `Data truncated for column '${column.name}'. Ada isi yang lebih panjang dari ${len[1]} karakter, jadi tipe baru terlalu sempit.`, code: 1265 };
  if (sqlNumType(column)) {
    if (!/^-?\d+(\.\d+)?$/.test(String(value))) return { error: `Incorrect value '${value}' for column '${column.name}'. Teks ini tidak bisa diubah menjadi angka.`, code: 1366 };
    if (/^int/.test(column.type)) return { value: String(Math.round(Number(value))) };
  }
  return { value: sqlFit(column, String(value)) };
}
function sqlAlter(schema, name, actionsText) {
  const table = schema.tables.find(t => t.name === name.toLowerCase());
  if (!table) return { error: `Tabel '${schema.name}.${name}' belum ada.`, code: 1146 };
  const t = JSON.parse(JSON.stringify(table)); // dikerjakan pada salinan: kalau satu aksi gagal, tabel tidak berubah
  const idx = f => t.columns.findIndex(c => c.name === f.toLowerCase());
  const move = (i, d) => {
    if (!d.first && !d.after) return;
    const [col] = t.columns.splice(i, 1), vals = t.rows.map(r => r.splice(i, 1)[0]);
    const at = d.first ? 0 : idx(d.after) + 1;
    t.columns.splice(at, 0, col); t.rows.forEach((r, k) => r.splice(at, 0, vals[k]));
  };
  for (const action of sqlSplitTop(actionsText)) {
    let m;
    if ((m = /^ADD\s+PRIMARY\s+KEY\s*\(\s*([a-z_]\w*)\s*\)$/i.exec(action))) {
      if (t.key) return { error: 'Multiple primary key defined. Tabel ini sudah punya kunci primer.', code: 1068 };
      const i = idx(m[1]);
      if (i < 0) return { error: `Key column '${m[1]}' doesn't exist in table.`, code: 1072 };
      if (t.rows.some(r => r[i] === null)) return { error: `Kolom '${t.columns[i].name}' masih berisi NULL, jadi belum bisa menjadi kunci primer.`, code: 1138 };
      const seen = new Set();
      for (const r of t.rows) {
        const v = String(r[i]).toLowerCase();
        if (seen.has(v)) return { error: `Duplicate entry '${r[i]}' for key 'PRIMARY'. Ada nilai kembar, jadi kolom ini belum bisa menjadi kunci primer.`, code: 1062 };
        seen.add(v);
      }
      t.key = t.columns[i].name; t.columns[i].required = true; continue;
    }
    if (/^DROP\s+PRIMARY\s+KEY$/i.test(action)) {
      if (!t.key) return { error: "Can't DROP 'PRIMARY'; check that column/key exists.", code: 1091 };
      t.key = ''; continue;
    }
    if (/^ADD\s+(CONSTRAINT|FOREIGN|INDEX|KEY|UNIQUE)\b/i.test(action)) return { error: 'Kunci tamu dan indeks belum didukung di lab ini. Yang didukung: ADD kolom, ADD PRIMARY KEY, DROP, MODIFY, CHANGE, RENAME.', code: 1064 };
    if ((m = /^ADD\s+(?:COLUMN\s+)?([\s\S]+)$/i.exec(action))) {
      const d = sqlColumnDef(m[1]);
      if (!d) return { error: 'Definisi kolom tidak dikenali. Contoh: ALTER TABLE buku ADD stok INT;', code: 1064 };
      if (idx(d.column.name) >= 0) return { error: `Duplicate column name '${d.column.name}'. Kolom itu sudah ada.`, code: 1060 };
      if (d.after && idx(d.after) < 0) return { error: `Unknown column '${d.after}' in '${t.name}'.`, code: 1054 };
      // Baris lama mendapat DEFAULT; tanpa DEFAULT: NULL, atau nilai kosong bawaan (0 / '') bila NOT NULL
      const fill = d.column.def !== undefined ? d.column.def : d.column.required ? sqlZero(d.column) : null;
      t.columns.push(d.column); t.rows.forEach(r => r.push(fill));
      move(t.columns.length - 1, d); continue;
    }
    if ((m = /^DROP\s+(?:COLUMN\s+)?([a-z_]\w*)$/i.exec(action))) {
      const i = idx(m[1]);
      if (i < 0) return { error: `Can't DROP '${m[1]}'; check that column/key exists.`, code: 1091 };
      if (t.columns.length === 1) return { error: "You can't delete all columns with ALTER TABLE; use DROP TABLE instead.", code: 1090 };
      if (t.columns[i].name === t.key) t.key = '';
      t.columns.splice(i, 1); t.rows.forEach(r => r.splice(i, 1)); continue;
    }
    const modify = /^MODIFY\s+(?:COLUMN\s+)?([\s\S]+)$/i.exec(action), change = /^CHANGE\s+(?:COLUMN\s+)?([a-z_]\w*)\s+([\s\S]+)$/i.exec(action);
    if (modify || change) {
      const d = sqlColumnDef(modify ? modify[1] : change[2]);
      if (!d) return { error: `Definisi kolom tidak dikenali. Contoh: ALTER TABLE buku ${modify ? 'MODIFY judul VARCHAR(150)' : 'CHANGE stok jumlah INT'};`, code: 1064 };
      const old = modify ? d.column.name : change[1], i = idx(old);
      if (i < 0) return { error: `Unknown column '${old}' in '${t.name}'.`, code: 1054 };
      if (d.column.name !== t.columns[i].name && idx(d.column.name) >= 0) return { error: `Duplicate column name '${d.column.name}'.`, code: 1060 };
      if (d.after && idx(d.after) < 0) return { error: `Unknown column '${d.after}' in '${t.name}'.`, code: 1054 };
      if (t.columns[i].name === t.key) d.column.required = true;
      const values = [];
      for (const r of t.rows) {
        if (r[i] === null && d.column.required) return { error: `Invalid use of NULL value. Masih ada baris yang kolom '${t.columns[i].name}'-nya NULL, jadi kolom itu belum bisa dijadikan NOT NULL.`, code: 1138 };
        const v = sqlConvert(d.column, r[i]);
        if (v.error) return v;
        values.push(v.value);
      }
      if (t.columns[i].name === t.key) {
        // Nilai kunci yang tadinya berbeda bisa menjadi kembar setelah diubah tipenya (mis. '1.1' dan '1.2' → INT 1)
        const seen = new Set();
        for (const v of values) {
          const k = String(v).toLowerCase();
          if (seen.has(k)) return { error: `Duplicate entry '${v}' for key 'PRIMARY'. Setelah tipe diubah, ada nilai kunci primer yang menjadi kembar.`, code: 1062 };
          seen.add(k);
        }
        t.key = d.column.name;
      }
      t.columns[i] = d.column; t.rows.forEach((r, k) => { r[i] = values[k]; });
      move(i, d); continue;
    }
    if ((m = /^RENAME\s+COLUMN\s+([a-z_]\w*)\s+TO\s+([a-z_]\w*)$/i.exec(action))) {
      const i = idx(m[1]);
      if (i < 0) return { error: `Unknown column '${m[1]}' in '${t.name}'.`, code: 1054 };
      if (idx(m[2]) >= 0) return { error: `Duplicate column name '${m[2].toLowerCase()}'.`, code: 1060 };
      if (t.columns[i].name === t.key) t.key = m[2].toLowerCase();
      t.columns[i].name = m[2].toLowerCase(); continue;
    }
    if ((m = /^RENAME\s+(?:TO\s+|AS\s+)?([a-z_]\w*)$/i.exec(action))) {
      const to = m[1].toLowerCase();
      if (to !== t.name && schema.tables.some(x => x.name === to)) return { error: `Table '${to}' already exists.`, code: 1050 };
      t.name = to; continue;
    }
    return { error: `Aksi ALTER tidak dikenali: ${action}. Yang didukung: ADD, DROP, MODIFY, CHANGE, RENAME, ADD/DROP PRIMARY KEY.`, code: 1064 };
  }
  Object.keys(table).forEach(k => delete table[k]);
  Object.assign(table, t);
  return { ok: true };
}

// ===== SELECT: satu tabel atau beberapa tabel (JOIN), fungsi agregat, GROUP BY, HAVING =====
const SQL_KEYWORDS = new Set(['join', 'inner', 'left', 'right', 'outer', 'cross', 'on', 'where', 'group', 'having', 'order', 'limit', 'as', 'using', 'natural']);
function sqlResolver(cols) {
  return ref => {
    const [a, b] = ref.toLowerCase().split('.');
    const hits = cols.map((c, i) => (b ? c.from === a && c.name === b : c.name === a) ? i : -1).filter(i => i >= 0);
    if (hits.length > 1) return { error: `Column '${ref}' is ambiguous. Kolom ${a} ada di lebih dari satu tabel; tulis nama tabel atau aliasnya di depan, misalnya ${cols[hits[0]].from}.${a}.`, code: 1052 };
    return hits.length ? hits[0] : -1;
  };
}
function sqlFrom(schema, text) {
  let rest = text.trim();
  const take = () => {
    const t = /^\s*([a-z_]\w*)(?:\s+(?:AS\s+)?([a-z_]\w*))?/i.exec(rest);
    if (!t) return null;
    let alias = t[2], used = t[0];
    if (alias && SQL_KEYWORDS.has(alias.toLowerCase())) { alias = undefined; used = /^\s*[a-z_]\w*/i.exec(rest)[0]; }
    rest = rest.slice(used.length);
    return { name: t[1].toLowerCase(), alias: (alias || t[1]).toLowerCase() };
  };
  const load = ref => schema.tables.find(t => t.name === ref.name) || { error: `Tabel '${schema.name}.${ref.name}' belum ada.`, code: 1146 };
  const first = take();
  if (!first) return { error: 'Tulis nama tabel setelah FROM.', code: 1064 };
  const t1 = load(first);
  if (t1.error) return t1;
  let cols = t1.columns.map(c => ({ ...c, from: first.alias })), rows = t1.rows.map(r => [...r]);
  const aliases = [first.alias];
  while (rest.trim()) {
    const j = /^\s*(?:(,)|(?:(INNER|CROSS|LEFT|RIGHT)(?:\s+OUTER)?\s+)?JOIN\b)/i.exec(rest);
    if (!j) return { error: `Bagian FROM tidak dikenali: ${rest.trim()}`, code: 1064 };
    rest = rest.slice(j[0].length);
    const kind = j[1] ? 'CROSS' : (j[2] || 'INNER').toUpperCase();
    const ref = take();
    if (!ref) return { error: 'Tulis nama tabel setelah JOIN.', code: 1064 };
    if (aliases.includes(ref.alias)) return { error: `Not unique table/alias: '${ref.alias}'. Beri alias yang berbeda untuk tiap tabel.`, code: 1066 };
    aliases.push(ref.alias);
    const t2 = load(ref);
    if (t2.error) return t2;
    // Syarat ON berakhir pada koma atau JOIN berikutnya di tingkat teratas (bukan di dalam kurung atau kutip)
    let o = null;
    const on = /^\s+ON\s+/i.exec(rest);
    if (on) {
      let depth = 0, quote = false, end = rest.length;
      for (let k = on[0].length; k < rest.length; k++) {
        const ch = rest[k];
        if (ch === "'") quote = !quote;
        if (quote) continue;
        if (ch === '(') depth++;
        else if (ch === ')') depth--;
        else if (!depth && (ch === ',' || (/\s/.test(ch) && /^\s+(?:(?:INNER|CROSS|LEFT|RIGHT)(?:\s+OUTER)?\s+)?JOIN\b/i.test(rest.slice(k))))) { end = k; break; }
      }
      o = [rest.slice(0, end), rest.slice(on[0].length, end).trim()];
      rest = rest.slice(end);
    }
    else if (kind === 'LEFT' || kind === 'RIGHT') return { error: `${kind} JOIN wajib diikuti ON, misalnya ON p.id_buku = b.id_buku.`, code: 1064 };
    const right = t2.columns.map(c => ({ ...c, from: ref.alias })), all = cols.concat(right);
    const test = o ? sqlWhere(o[1], sqlResolver(all), i => all[i]) : () => true;
    if (test.error) return test;
    const emptyLeft = cols.map(() => null), emptyRight = right.map(() => null), out = [];
    // LEFT: semua baris kiri tetap muncul; RIGHT: semua baris kanan tetap muncul; pasangan yang tidak ada diisi NULL
    if (kind === 'RIGHT') t2.rows.forEach(r => { const hit = rows.filter(l => test(l.concat(r))); if (hit.length) hit.forEach(l => out.push(l.concat(r))); else out.push(emptyLeft.concat(r)); });
    else rows.forEach(l => { const hit = t2.rows.filter(r => test(l.concat(r))); if (hit.length) hit.forEach(r => out.push(l.concat(r))); else if (kind === 'LEFT') out.push(l.concat(emptyRight)); });
    cols = all; rows = out;
  }
  return { cols, rows };
}
function sqlAgg(expr, pick) {
  const m = /^(COUNT|SUM|AVG|MIN|MAX)\s*\(\s*(DISTINCT\s+)?(\*|[a-z_]\w*(?:\.[a-z_]\w*)?)\s*\)$/i.exec(expr.trim());
  if (!m) return null;
  const fn = m[1].toUpperCase();
  if (m[3] === '*' && fn !== 'COUNT') return { error: `${fn}(*) tidak sah. Tulis nama kolomnya, misalnya ${fn}(ipk).`, code: 1064 };
  const col = m[3] === '*' ? -1 : pick(m[3]);
  if (typeof col === 'object') return col;
  return { fn, distinct: !!m[2], col };
}
function sqlAggRun(agg, rows, cols) {
  if (agg.col < 0) return String(rows.length);
  let vals = rows.map(r => r[agg.col]).filter(v => v !== null);
  if (agg.distinct) vals = vals.filter((v, i) => vals.findIndex(x => String(x).toLowerCase() === String(v).toLowerCase()) === i);
  if (agg.fn === 'COUNT') return String(vals.length);
  if (!vals.length) return null;
  const c = cols[agg.col];
  if (agg.fn === 'MIN' || agg.fn === 'MAX') return vals.reduce((a, b) => sqlCompare(b, a, sqlNumType(c)) * (agg.fn === 'MIN' ? -1 : 1) > 0 ? b : a);
  const dec = /^decimal\(\d+,\s*(\d+)\)$/.exec(c.type), scale = dec ? +dec[1] : 0, float = /^(float|double)/.test(c.type);
  const sum = vals.reduce((a, v) => a + (Number(v) || 0), 0);
  // Seperti MySQL: SUM mempertahankan jumlah desimal kolom, AVG menambah 4 angka di belakang koma
  if (agg.fn === 'SUM') return float ? String(sum) : sum.toFixed(scale);
  return float ? String(sum / vals.length) : (sum / vals.length).toFixed(scale + 4);
}
function sqlOrder(text, resolve, colAt, position) {
  if (!text) return { keys: [] };
  const keys = [];
  for (const part of sqlSplitTop(text)) {
    const m = /^([\s\S]+?)(?:\s+(ASC|DESC))?$/i.exec(part);
    if (!new RegExp(`^(?:\\d+|${SQL_OPERAND})$`, 'i').test(m[1].trim())) return { error: `Periksa sintaks di sekitar '${part}'. Urutan klausa: … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT …`, code: 1064 };
    const i = /^\d+$/.test(m[1]) ? position(+m[1]) : resolve(m[1].trim());
    if (typeof i === 'object') return i;
    if (i < 0) return { error: `Unknown column '${m[1]}' in 'order clause'.`, code: 1054 };
    keys.push({ i, dir: /DESC/i.test(m[2] || '') ? -1 : 1, numeric: sqlNumType(colAt(i)) });
  }
  return { keys };
}
const sqlSort = (rows, keys) => keys.length ? [...rows].sort((a, b) => { for (const k of keys) { const c = sqlCompare(a[k.i], b[k.i], k.numeric); if (c) return c * k.dir; } return 0; }) : rows;
function sqlSelect(schema, command) {
  const quoted = [];
  const safe = command.replace(/'(?:''|[^'])*'/g, m => { quoted.push(m); return `\u0000${quoted.length - 1}\u0000`; });
  const back = t => t == null ? t : t.replace(/\u0000(\d+)\u0000/g, (m, i) => quoted[+i]);
  const m = /^SELECT\s+(DISTINCT\s+)?([\s\S]+?)\s+FROM\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+?))?(?:\s+GROUP\s+BY\s+([\s\S]+?))?(?:\s+HAVING\s+([\s\S]+?))?(?:\s+ORDER\s+BY\s+([\s\S]+?))?(?:\s+LIMIT\s+(\d+))?$/i.exec(safe);
  if (!m) return { error: 'Periksa sintaks. Urutan klausa: SELECT … FROM … JOIN … ON … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT …', code: 1064 };
  const src = sqlFrom(schema, back(m[3]));
  if (src.error) return src;
  const { cols, rows } = src, resolve = sqlResolver(cols);
  const pick = ref => { const i = resolve(ref); return typeof i === 'object' ? i : i < 0 ? { error: `Unknown column '${ref}'. Kolom ini tidak ada di tabel yang disebut pada FROM/JOIN.`, code: 1054 } : i; };
  const items = [];
  for (const raw of sqlSplitTop(back(m[2]))) {
    const it = new RegExp(String.raw`^(\*|[a-z_]\w*\.\*|${SQL_AGG}|${SQL_REF})(?:\s+(?:AS\s+)?([a-z_]\w*|'(?:''|[^'])*'|"[^"]*"|\x60[^\x60]*\x60))?$`, 'i').exec(raw);
    if (!it || (it[2] && SQL_KEYWORDS.has(it[2].toLowerCase()))) return { error: `Bagian SELECT tidak dikenali: ${raw}`, code: 1064 };
    const expr = it[1], alias = it[2] ? it[2].replace(/^['"\x60]|['"\x60]$/g, '') : '';
    if (expr === '*' || /\.\*$/.test(expr)) {
      const from = expr === '*' ? null : expr.slice(0, -2).toLowerCase();
      const list = cols.map((c, i) => [c, i]).filter(([c]) => !from || c.from === from);
      if (!list.length) return { error: `Unknown table '${from}'.`, code: 1051 };
      list.forEach(([c, i]) => items.push({ col: i, label: c.name }));
      continue;
    }
    const agg = sqlAgg(expr, pick);
    if (agg?.error) return agg;
    if (agg) { items.push({ agg, label: alias || expr, key: expr.replace(/\s+/g, '').toLowerCase(), alias: alias.toLowerCase() }); continue; }
    const i = pick(expr);
    if (typeof i === 'object') return i;
    items.push({ col: i, label: alias || expr.split('.').pop(), alias: alias.toLowerCase() });
  }
  const where = m[4] ? sqlWhere(back(m[4]), ref => sqlAgg(ref, () => 0) ? { error: 'Invalid use of group function. Fungsi agregat (COUNT, SUM, AVG, MIN, MAX) tidak boleh di WHERE; pakai HAVING setelah GROUP BY.', code: 1111 } : resolve(ref), i => cols[i]) : () => true;
  if (where.error) return where;
  const base = rows.filter(where);
  let out;
  if (m[5] || m[6] || items.some(it => it.agg)) {
    const keys = [];
    for (const g of m[5] ? sqlSplitTop(back(m[5])) : []) {
      if (!new RegExp(`^${SQL_REF}$`, 'i').test(g)) return { error: `Periksa sintaks di sekitar '${g}'. Urutan klausa: … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT …`, code: 1064 };
      const named = items.find(it => !it.agg && it.alias && it.alias === g.toLowerCase());
      const i = named ? named.col : pick(g);
      if (typeof i === 'object') return i;
      keys.push(i);
    }
    const bad = items.find(it => !it.agg && !keys.includes(it.col));
    if (bad) return m[5]
      ? { error: `Kolom '${bad.label}' tidak ada di GROUP BY. Setiap kolom biasa di SELECT harus ikut ditulis di GROUP BY (aturan ONLY_FULL_GROUP_BY).`, code: 1055 }
      : { error: `Kolom '${bad.label}' dicampur dengan fungsi agregat tanpa GROUP BY. Tambahkan GROUP BY ${bad.label}.`, code: 1140 };
    const extras = [], all = () => [...items, ...extras];
    const colAt = i => { const e = all()[i]; return !e ? null : !e.agg ? cols[e.col] : e.agg.fn === 'COUNT' ? { type: 'int' } : e.agg.fn === 'MIN' || e.agg.fn === 'MAX' ? cols[e.agg.col] : { type: 'decimal' }; };
    // HAVING dan ORDER BY membaca hasil per kelompok: alias, fungsi agregat, atau kolom GROUP BY
    const gres = ref => {
      const low = ref.replace(/\s+/g, '').toLowerCase();
      const k = items.findIndex(it => (it.alias && it.alias === ref.toLowerCase()) || (it.agg && it.key === low));
      if (k >= 0) return k;
      const a = sqlAgg(ref, pick);
      if (a?.error) return a;
      if (a) { extras.push({ agg: a }); return all().length - 1; }
      const i = resolve(ref);
      if (typeof i === 'object' || i < 0) return i;
      if (!keys.includes(i)) return { error: `Kolom '${ref}' tidak ada di GROUP BY, jadi tidak bisa dipakai di HAVING atau ORDER BY.`, code: 1054 };
      extras.push({ col: i }); return all().length - 1;
    };
    const having = m[6] ? sqlWhere(back(m[6]), gres, colAt) : () => true;
    if (having.error) return having;
    const order = sqlOrder(back(m[7]), gres, colAt, n => n >= 1 && n <= items.length ? n - 1 : { error: `Unknown column '${n}' in 'order clause'.`, code: 1054 });
    if (order.error) return order;
    const map = new Map();
    for (const r of base) {
      const k = JSON.stringify(keys.map(i => r[i] === null ? null : String(r[i]).toLowerCase()));
      if (!map.has(k)) map.set(k, []);
      map.get(k).push(r);
    }
    const groups = keys.length ? [...map.values()] : [base];
    const virtual = groups.map(g => all().map(e => e.agg ? sqlAggRun(e.agg, g, cols) : g.length ? g[0][e.col] : null)).filter(having);
    out = sqlSort(virtual, order.keys).map(v => v.slice(0, items.length));
  } else {
    const ores = ref => { const named = items.find(it => it.alias && it.alias === ref.toLowerCase()); return named ? named.col : resolve(ref); };
    const order = sqlOrder(back(m[7]), ores, i => cols[i], n => n >= 1 && n <= items.length ? items[n - 1].col : { error: `Unknown column '${n}' in 'order clause'.`, code: 1054 });
    if (order.error) return order;
    out = sqlSort(base, order.keys).map(r => items.map(it => r[it.col]));
  }
  if (m[1]) out = out.filter((r, i) => out.findIndex(x => JSON.stringify(x) === JSON.stringify(r)) === i);
  if (m[8]) out = out.slice(0, +m[8]);
  return { text: sqlTable(items.map(it => it.label), out) };
}
