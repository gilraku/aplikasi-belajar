// Model SQL terbatas untuk latihan Basis Data P6–P8. Perintah diproses di browser.
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
    if (!/^(SHOW\s+TABLES|CREATE\s+TABLE|DROP\s+TABLE|DESCRIBE\s|INSERT\s+INTO|SELECT\s)/i.test(command)) return fail(1064, 'Periksa sintaks. Lab hanya mendukung perintah latihan yang tersedia.');
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
      for (const definition of m[3].split(',')) {
        const pk = /^\s*PRIMARY\s+KEY\s*\(\s*([a-z_]\w*)\s*\)\s*$/i.exec(definition);
        if (pk) {
          if (key) return fail(1068, 'Hanya satu PRIMARY KEY yang didukung.');
          key = pk[1].toLowerCase(); continue;
        }
        const col = /^\s*([a-z_]\w*)\s+(char\(\d+\)|varchar\(\d+\)|int|year|date)(\s+NOT\s+NULL)?\s*$/i.exec(definition);
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
    const insert = /^INSERT\s+INTO\s+([a-z_]\w*)\s+VALUES\s*\(([\s\S]*)\)$/i.exec(command);
    const select = /^SELECT\s+(\*|[a-z_]\w*)\s+FROM\s+([a-z_]\w*)(?:\s+WHERE\s+([a-z_]\w*)\s*=\s*'((?:''|[^'])*)')?$/i.exec(command);
    const name = describe?.[1] || insert?.[1] || select?.[2];
    if (!name) return fail(1064, 'Periksa sintaks dan bentuk perintah pada contoh.');
    const table = schema.tables.find(t => t.name === name.toLowerCase());
    if (!table) return fail(1146, `Tabel '${schema.name}.${name}' belum ada.`);
    const indexOf = field => table.columns.findIndex(c => c.name === field.toLowerCase());
    if (describe) {
      ok(sqlTable(['Field', 'Type', 'Null', 'Key'], table.columns.map(c => [c.name, c.type, c.required || c.name === table.key ? 'NO' : 'YES', c.name === table.key ? 'PRI' : ''])));
    } else if (insert) {
      const parts = insert[2].match(/(?:'(?:''|[^'])*'|[^,'])+/g)?.map(v => v.trim()) || [];
      if (parts.length !== table.columns.length) return fail(1136, 'Jumlah nilai harus sama dengan jumlah kolom.');
      const row = [];
      for (const [i, raw] of parts.entries()) {
        const col = table.columns[i];
        if (/^NULL$/i.test(raw)) {
          if (col.required || col.name === table.key) return fail(1048, `Kolom '${col.name}' tidak boleh NULL.`);
          row.push(null);
        } else if (/^'(?:''|[^'])*'$/.test(raw)) {
          row.push(raw.slice(1, -1).replace(/''/g, "'"));
        } else if (/^-?\d+$/.test(raw)) row.push(raw);
        else return fail(1064, 'Gunakan tanda kutip tunggal untuk teks.');
      }
      if (table.key && table.rows.some(r => r[indexOf(table.key)] === row[indexOf(table.key)])) return fail(1062, 'Nilai kunci primer sudah digunakan.');
      table.rows.push(row); ok('Query OK, 1 row affected');
    } else {
      const fields = select[1] === '*' ? table.columns.map(c => c.name) : [select[1]];
      const filterIndex = select[3] ? indexOf(select[3]) : -1;
      if (fields.some(c => indexOf(c) < 0) || (select[3] && filterIndex < 0)) return fail(1054, 'Nama kolom tidak ditemukan.');
      const rows = filterIndex < 0 ? table.rows : table.rows.filter(r => r[filterIndex] === select[4].replace(/''/g, "'"));
      ok(sqlTable(fields, rows.map(r => fields.map(c => r[indexOf(c)]))));
    }
  }
  return { ok: true, text: output.join('\n\n') };
}
