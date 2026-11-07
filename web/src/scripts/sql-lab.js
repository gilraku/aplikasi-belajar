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
    if (!/^(SHOW\s+TABLES|CREATE\s+TABLE|DROP\s+TABLE|DESCRIBE\s|INSERT\s+INTO|SELECT\s|UPDATE\s|DELETE\s+FROM\s|TRUNCATE\s)/i.test(command)) return fail(1064, 'Periksa sintaks. Lab hanya mendukung perintah latihan yang tersedia.');
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
        const col = /^\s*([a-z_]\w*)\s+(char\(\d+\)|varchar\(\d+\)|decimal\(\d+,\s*\d+\)|int|year|date)(\s+NOT\s+NULL)?\s*$/i.exec(definition);
        if (!col) return fail(1064, 'Definisi kolom tidak didukung. Ikuti bentuk CREATE TABLE pada contoh.');
        const field = col[1].toLowerCase();
        if (columns.some(c => c.name === field)) return fail(1060, `Kolom '${field}' sudah ada.`);
        columns.push({ name: field, type: col[2].toLowerCase(), required: !!col[3] });
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
    const describe = /^DESCRIBE\s+([a-z_]\w*)$/i.exec(command);
    const insert = /^INSERT\s+INTO\s+([a-z_]\w*)\s*(?:\(([^)]*)\))?\s*VALUES\s*([\s\S]+)$/i.exec(command);
    const select = /^SELECT\s+(DISTINCT\s+)?([\s\S]+?)\s+FROM\s+([a-z_]\w*)(?:\s+WHERE\s+([\s\S]+?))?(?:\s+ORDER\s+BY\s+([a-z_]\w*)(?:\s+(ASC|DESC))?)?(?:\s+LIMIT\s+(\d+))?$/i.exec(command);
    const update = /^UPDATE\s+([a-z_]\w*)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?$/i.exec(command);
    const remove = /^DELETE\s+FROM\s+([a-z_]\w*)(?:\s+WHERE\s+([\s\S]+))?$/i.exec(command);
    const truncate = /^TRUNCATE\s+(?:TABLE\s+)?([a-z_]\w*)$/i.exec(command);
    const name = describe?.[1] || insert?.[1] || select?.[3] || update?.[1] || remove?.[1] || truncate?.[1];
    if (!name) return fail(1064, 'Periksa sintaks dan bentuk perintah pada contoh.');
    const table = schema.tables.find(t => t.name === name.toLowerCase());
    if (!table) return fail(1146, `Tabel '${schema.name}.${name}' belum ada.`);
    const indexOf = field => table.columns.findIndex(c => c.name === field.toLowerCase());
    const where = text => sqlWhere(text, indexOf);
    if (describe) {
      ok(sqlTable(['Field', 'Type', 'Null', 'Key'], table.columns.map(c => [c.name, c.type, c.required || c.name === table.key ? 'NO' : 'YES', c.name === table.key ? 'PRI' : ''])));
    } else if (insert) {
      const fields = insert[2] ? insert[2].split(',').map(f => f.trim()).filter(Boolean) : table.columns.map(c => c.name);
      if (fields.some(f => indexOf(f) < 0)) return fail(1054, 'Nama kolom tidak ditemukan.');
      const groups = [...insert[3].matchAll(/\(((?:'(?:''|[^'])*'|[^()'])*)\)/g)].map(g => g[1]);
      if (!groups.length) return fail(1064, 'Tulis nilai di dalam kurung: VALUES (...).');
      const added = [];
      for (const group of groups) {
        const parts = group.match(/(?:'(?:''|[^'])*'|[^,'])+/g)?.map(v => v.trim()) || [];
        if (parts.length !== fields.length) return fail(1136, 'Jumlah nilai harus sama dengan jumlah kolom.');
        const row = table.columns.map(() => null);
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
    } else if (select) {
      const list = select[2].trim();
      const count = /^COUNT\(\s*\*\s*\)$/i.test(list);
      const fields = list === '*' ? table.columns.map(c => c.name) : count ? [] : list.split(',').map(f => f.trim());
      if (fields.some(c => indexOf(c) < 0) || (select[5] && indexOf(select[5]) < 0)) return fail(1054, 'Nama kolom tidak ditemukan.');
      const test = select[4] ? where(select[4]) : () => true;
      if (test.error) return fail(test.code || 1064, test.error);
      let rows = table.rows.filter(test);
      if (count) { ok(sqlTable(['COUNT(*)'], [[String(rows.length)]])); continue; }
      if (select[5]) { const i = indexOf(select[5]), dir = /DESC/i.test(select[6] || '') ? -1 : 1; rows = [...rows].sort((a, b) => sqlCompare(a[i], b[i]) * dir); }
      let out = rows.map(r => fields.map(c => r[indexOf(c)]));
      if (select[1]) out = out.filter((r, i) => out.findIndex(x => JSON.stringify(x) === JSON.stringify(r)) === i);
      if (select[7]) out = out.slice(0, +select[7]);
      ok(sqlTable(fields, out));
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
// Bandingkan dua nilai sel: angka dengan angka, selain itu teks tanpa membedakan huruf besar/kecil (seperti collation bawaan MySQL)
function sqlCompare(a, b) {
  if (a === null || b === null) return a === b ? 0 : a === null ? -1 : 1;
  const x = Number(a), y = Number(b);
  if (a !== '' && b !== '' && !Number.isNaN(x) && !Number.isNaN(y)) return x - y;
  const p = String(a).toLowerCase(), q = String(b).toLowerCase();
  return p < q ? -1 : p > q ? 1 : 0;
}
// WHERE sederhana: syarat "kolom operator nilai" yang digabung AND / OR (AND lebih kuat), plus LIKE dan IS [NOT] NULL
function sqlWhere(text, indexOf) {
  const quoted = [];
  const safe = text.replace(/'(?:''|[^'])*'/g, m => { quoted.push(m); return `\u0000${quoted.length - 1}\u0000`; });
  const back = t => t.replace(/\u0000(\d+)\u0000/g, (m, i) => quoted[+i]);
  const groups = [];
  for (const orPart of safe.split(/\s+OR\s+/i)) {
    const group = [];
    for (const raw of orPart.split(/\s+AND\s+/i)) {
      const part = back(raw.trim());
      let m;
      if ((m = /^([a-z_]\w*)\s+IS\s+(NOT\s+)?NULL$/i.exec(part))) {
        const i = indexOf(m[1]); if (i < 0) return { error: 'Nama kolom tidak ditemukan.', code: 1054 };
        const not = !!m[2]; group.push(r => (r[i] === null) !== not); continue;
      }
      if ((m = /^([a-z_]\w*)\s+(NOT\s+)?LIKE\s+('(?:''|[^'])*')$/i.exec(part))) {
        const i = indexOf(m[1]); if (i < 0) return { error: 'Nama kolom tidak ditemukan.', code: 1054 };
        const pattern = sqlValue(m[3]).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '.*').replace(/_/g, '.');
        const re = new RegExp('^' + pattern + '$', 'i'), not = !!m[2];
        group.push(r => r[i] !== null && re.test(r[i]) !== not); continue;
      }
      if ((m = /^([a-z_]\w*)\s*(<=|>=|<>|!=|=|<|>)\s*([\s\S]+)$/i.exec(part))) {
        const i = indexOf(m[1]); if (i < 0) return { error: 'Nama kolom tidak ditemukan.', code: 1054 };
        const value = sqlValue(m[3]);
        if (value === undefined) return { error: 'Gunakan tanda kutip tunggal untuk teks pada WHERE.' };
        const op = m[2];
        // Sama seperti MySQL: perbandingan dengan NULL (mis. ipk = NULL) tidak pernah benar, gunakan IS NULL
        if (value === null) { group.push(() => false); continue; }
        group.push(r => {
          if (r[i] === null) return false;
          const c = sqlCompare(r[i], value);
          return op === '=' ? c === 0 : op === '<>' || op === '!=' ? c !== 0 : op === '<' ? c < 0 : op === '>' ? c > 0 : op === '<=' ? c <= 0 : c >= 0;
        });
        continue;
      }
      return { error: `Syarat WHERE tidak dikenali: ${part}` };
    }
    groups.push(group);
  }
  return row => groups.some(g => g.every(t => t(row)));
}

