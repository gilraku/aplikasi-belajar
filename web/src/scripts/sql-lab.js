// Model SQL terbatas untuk latihan Basis Data P4 dan P6–P8. Perintah diproses di browser.
// Mendukung DDL (CREATE/ALTER/DROP TABLE, VIEW, INDEX, kunci tamu), DML (INSERT/SELECT/UPDATE/DELETE),
// JOIN, subquery, fungsi agregat & bawaan, GROUP BY/HAVING, transaksi, dan DCL sederhana (CREATE USER/GRANT/REVOKE).
const SQL_SYSTEM = ['information_schema', 'mysql', 'performance_schema', 'sys'];
const sqlSession = () => ({ databases: [], active: '', transaction: null });
const sqlShow = v => v == null ? 'NULL' : String(v);
const sqlTable = (columns, rows) => rows.length ? [columns, ...rows].map(row => row.map(sqlShow).join(' | ')).join('\n') + '\n' + rows.length + ' baris' : 'Empty set (0 baris)';
const SQL_TYPE = String.raw`(?:char\(\d+\)|varchar\(\d+\)|decimal\(\d+,\s*\d+\)|int(?:eger)?(?:\(\d+\))?|year|datetime|date|text|float|double)`;
const SQL_FK_ACTION = String.raw`(?:CASCADE|SET\s+NULL|RESTRICT|NO\s+ACTION)`;
// Dialek: 'mysql' (bawaan, MySQL 8) atau 'mariadb' (MariaDB di MAMP, dipakai modul Basis Data P9–P14).
// Bedanya hanya pada nomor/pesan galat tertentu dan kolom non-agregat (MariaDB mengizinkan).
let SQL_DIALECT = 'mysql';
const sqlMaria = () => SQL_DIALECT === 'mariadb';
const sqlOk = n => `Query OK, ${n} row${n === 1 ? '' : 's'} affected`;

function runSqlLab(db, input) {
  SQL_DIALECT = db.dialect === 'mariadb' ? 'mariadb' : 'mysql';
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
    // DCL: pengguna dan hak akses (berlaku untuk seluruh server, bukan satu basis data)
    if (/^(CREATE\s+USER|DROP\s+USER|GRANT\s|REVOKE\s|SHOW\s+GRANTS)/i.test(command)) {
      const r = sqlDcl(db, command);
      if (r.error) return fail(r.code || 1064, r.error);
      db.transaction = null;
      ok(r.text || 'Query OK, 0 rows affected'); continue;
    }
    const noFrom = /^SELECT\s/i.test(command) && !/\bFROM\b/i.test(command.replace(/'(?:''|[^'])*'/g, "''"));
    if (!/^(SHOW\s+TABLES|SHOW\s+(?:INDEX|INDEXES|KEYS)\s+FROM\s|CREATE\s+TABLE|DROP\s+TABLE|ALTER\s+TABLE|RENAME\s+TABLE|CREATE\s+(?:OR\s+REPLACE\s+)?VIEW|DROP\s+VIEW|CREATE\s+(?:UNIQUE\s+)?INDEX|DROP\s+INDEX|DESCRIBE\s|DESC\s|INSERT\s+INTO|SELECT\s|UPDATE\s|DELETE\s+FROM\s|TRUNCATE\s)/i.test(command)) return fail(1064, 'Periksa sintaks. Lab hanya mendukung perintah latihan yang tersedia.');
    // SELECT tanpa FROM (mis. SELECT NOW();) boleh dijalankan sebelum memilih basis data
    const schema = db.databases.find(d => d.name === db.active) || (noFrom ? { name: '', tables: [] } : null);
    if (!schema) return fail(1046, 'Belum memilih basis data. Gunakan USE atau pilih basis data di sebelah kiri.');
    const views = schema.views || [];
    const findTable = name => schema.tables.find(t => t.name === name.toLowerCase());
    const isView = name => views.some(v => v.name === name.toLowerCase());
    if (/^SHOW\s+TABLES$/i.test(command)) {
      ok(sqlTable([`Tables_in_${schema.name}`], [...schema.tables, ...views].map(t => [t.name]))); continue;
    }
    // CREATE TABLE salinan AS SELECT …: membuat tabel baru dari hasil kueri (kunci primer tidak ikut tersalin)
    if ((m = /^CREATE\s+TABLE\s+(IF\s+NOT\s+EXISTS\s+)?([a-z_]\w*)\s+(?:AS\s+)?(SELECT\s[\s\S]+)$/i.exec(command))) {
      const name = m[2].toLowerCase();
      if (findTable(name) || isView(name)) {
        if (!m[1]) return fail(1050, `Tabel '${name}' sudah ada.`);
        ok('Query OK. Tabel sudah ada.'); continue;
      }
      const q = sqlQuery(schema, m[3]);
      if (q.error) return fail(q.code || 1064, q.error);
      const lower = q.labels.map(l => l.toLowerCase());
      if (lower.some((l, i) => lower.indexOf(l) !== i)) return fail(1060, 'Duplicate column name. Beri alias berbeda dengan AS.');
      const columns = lower.map((l, i) => {
        const c = q.meta && q.meta[i];
        if (c) return { name: l, type: c.type, required: !!c.required, ...(c.def !== undefined ? { def: c.def } : {}) };
        const vals = q.rows.map(r => r[i]).filter(v => v != null).map(String);
        return { name: l, type: vals.every(v => /^-?\d+$/.test(v)) && vals.length ? 'bigint' : vals.every(v => /^-?\d+(\.\d+)?$/.test(v)) ? 'decimal(20,4)' : 'varchar(255)' };
      });
      db.transaction = null;
      schema.tables.push({ name, columns, key: '', rows: q.rows.map(r => r.map(v => v == null ? null : String(v))) });
      ok(`Query OK, ${q.rows.length} row${q.rows.length === 1 ? '' : 's'} affected\nRecords: ${q.rows.length}  Duplicates: 0  Warnings: 0`); continue;
    }
    if ((m = /^CREATE\s+TABLE\s+(IF\s+NOT\s+EXISTS\s+)?([a-z_]\w*)\s*\(([\s\S]+)\)$/i.exec(command))) {
      const name = m[2].toLowerCase();
      if (findTable(name) || isView(name)) {
        if (!m[1]) return fail(1050, `Tabel '${name}' sudah ada.`);
        ok('Query OK. Tabel sudah ada.'); continue;
      }
      const t = { name, columns: [], key: '', rows: [] };
      const fks = [], uniques = [], indexes = [];
      for (const definition of sqlSplitTop(m[3])) {
        let d;
        if ((d = /^PRIMARY\s+KEY\s*\(\s*([a-z_]\w*)\s*\)$/i.exec(definition))) {
          if (t.key) return fail(1068, 'Hanya satu PRIMARY KEY yang didukung.');
          t.key = d[1].toLowerCase(); continue;
        }
        if ((d = sqlFkDef(definition))) { fks.push(d); continue; }
        if ((d = /^UNIQUE(?:\s+(?:KEY|INDEX))?(?:\s+([a-z_]\w*))?\s*\(\s*([a-z_]\w*)\s*\)$/i.exec(definition))) { uniques.push(d[2].toLowerCase()); continue; }
        if ((d = /^(?:KEY|INDEX)(?:\s+([a-z_]\w*))?\s*\(\s*([a-z_]\w*)\s*\)$/i.exec(definition))) { indexes.push({ name: (d[1] || d[2]).toLowerCase(), col: d[2].toLowerCase() }); continue; }
        const col = sqlColumnDef(definition);
        if (!col || col.first || col.after) return fail(1064, 'Definisi kolom tidak didukung. Ikuti bentuk CREATE TABLE pada contoh.');
        if (t.columns.some(c => c.name === col.column.name)) return fail(1060, `Kolom '${col.column.name}' sudah ada.`);
        if (col.primary) {
          if (t.key) return fail(1068, 'Hanya satu PRIMARY KEY yang didukung.');
          t.key = col.column.name;
        }
        t.columns.push(col.column);
      }
      if (!t.columns.length || (t.key && !t.columns.some(c => c.name === t.key))) return fail(1072, 'Kolom kunci primer tidak ditemukan.');
      for (const u of uniques) {
        const c = t.columns.find(x => x.name === u);
        if (!c) return fail(1072, `Key column '${u}' doesn't exist in table.`);
        c.unique = true;
      }
      for (const ix of indexes) {
        if (!t.columns.some(x => x.name === ix.col)) return fail(1072, `Key column '${ix.col}' doesn't exist in table.`);
        (t.indexes ||= []).push(ix);
      }
      const autos = t.columns.filter(c => c.auto);
      if (autos.length > 1 || autos.some(c => c.name !== t.key && !c.unique)) return fail(1075, 'Incorrect table definition; there can be only one auto column and it must be defined as a key. Kolom AUTO_INCREMENT harus menjadi PRIMARY KEY.');
      for (const fk of fks) {
        const r = sqlFkCheck(schema, t, fk);
        if (r.error) return fail(r.code, r.error);
        (t.fks ||= []).push({ ...fk, name: fk.name || `${name}_ibfk_${(t.fks || []).length + 1}` });
      }
      db.transaction = null;
      schema.tables.push(t); ok(); continue;
    }
    if ((m = /^DROP\s+TABLE\s+(IF\s+EXISTS\s+)?([a-z_]\w*)$/i.exec(command))) {
      const index = schema.tables.findIndex(t => t.name === m[2].toLowerCase());
      if (index < 0) {
        if (!m[1]) return fail(1051, `Tabel '${m[2]}' tidak ada.`);
        ok('Query OK. Tabel memang tidak ada.'); continue;
      }
      const child = sqlChildren(schema, schema.tables[index]).find(([c]) => c !== schema.tables[index]);
      if (child && sqlMaria()) return fail(1451, sqlFkMessage(schema, child[0], child[1], 'Cannot delete or update a parent row') + ` Tabel ${schema.tables[index].name} masih ditunjuk tabel ${child[0].name}; hapus dulu tabel anaknya.`);
      if (child) return fail(3730, `Cannot drop table '${schema.tables[index].name}' referenced by a foreign key constraint '${child[1].name}' on table '${child[0].name}'. Hapus dulu tabel ${child[0].name} (anak), baru tabel induknya.`);
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
    if ((m = /^CREATE\s+(OR\s+REPLACE\s+)?VIEW\s+([a-z_]\w*)\s+AS\s+(SELECT\s[\s\S]+)$/i.exec(command))) {
      const name = m[2].toLowerCase();
      if (findTable(name)) return fail(1050, `Table '${name}' already exists.`);
      if (isView(name) && !m[1]) return fail(1050, `Table '${name}' already exists. Pakai CREATE OR REPLACE VIEW untuk mengganti view.`);
      const q = sqlQuery(schema, m[3]);
      if (q.error) return fail(q.code || 1064, q.error);
      const lower = q.labels.map(l => l.toLowerCase());
      if (lower.some((l, i) => lower.indexOf(l) !== i)) return fail(1060, 'Duplicate column name di view. Beri alias berbeda dengan AS.');
      schema.views = views.filter(v => v.name !== name).concat({ name, sql: m[3] });
      db.transaction = null; ok(); continue;
    }
    if ((m = /^DROP\s+VIEW\s+(IF\s+EXISTS\s+)?([a-z_]\w*)$/i.exec(command))) {
      if (!isView(m[2])) {
        if (!m[1]) return fail(1051, `Unknown view '${schema.name}.${m[2]}'.`);
        ok('Query OK. View memang tidak ada.'); continue;
      }
      schema.views = views.filter(v => v.name !== m[2].toLowerCase());
      db.transaction = null; ok(); continue;
    }
    if ((m = /^CREATE\s+(UNIQUE\s+)?INDEX\s+([a-z_]\w*)\s+ON\s+([a-z_]\w*)\s*\(\s*([a-z_]\w*)\s*\)$/i.exec(command))) {
      const r = sqlAlter(schema, m[3], `ADD ${m[1] ? 'UNIQUE' : 'INDEX'} ${m[2]} (${m[4]})`);
      if (r.error) return fail(r.code || 1064, r.error);
      db.transaction = null; ok('Query OK, 0 rows affected\nRecords: 0  Duplicates: 0  Warnings: 0'); continue;
    }
    if ((m = /^DROP\s+INDEX\s+([a-z_]\w*)\s+ON\s+([a-z_]\w*)$/i.exec(command))) {
      const r = sqlAlter(schema, m[2], `DROP INDEX ${m[1]}`);
      if (r.error) return fail(r.code || 1064, r.error);
      db.transaction = null; ok('Query OK, 0 rows affected\nRecords: 0  Duplicates: 0  Warnings: 0'); continue;
    }
    if ((m = /^SHOW\s+(?:INDEX|INDEXES|KEYS)\s+FROM\s+([a-z_]\w*)$/i.exec(command))) {
      const t = findTable(m[1]);
      if (!t) return fail(1146, `Table '${schema.name}.${m[1]}' doesn't exist. Tabel itu belum dibuat atau namanya salah ketik.`);
      const rows = [];
      if (t.key) rows.push([t.name, '0', 'PRIMARY', t.key]);
      t.columns.filter(c => c.unique).forEach(c => rows.push([t.name, '0', c.name, c.name]));
      (t.indexes || []).forEach(ix => rows.push([t.name, '1', ix.name, ix.col]));
      (t.fks || []).filter(f => !(t.indexes || []).some(ix => ix.col === f.col) && f.col !== t.key).forEach(f => rows.push([t.name, '1', f.name, f.col]));
      ok(sqlTable(['Table', 'Non_unique', 'Key_name', 'Column_name'], rows)); continue;
    }
    if (/^SELECT\s/i.test(command)) {
      const r = sqlQuery(schema, command);
      if (r.error) return fail(r.code || 1064, r.error);
      ok(sqlTable(r.labels, r.rows)); continue;
    }
    const describe = /^DESC(?:RIBE)?\s+([a-z_]\w*)$/i.exec(command);
    const insert = /^INSERT\s+INTO\s+([a-z_]\w*)\s*(?:\(([^)]*)\))?\s*VALUES\s*([\s\S]+)$/i.exec(command);
    const update = /^UPDATE\s+([a-z_]\w*)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?$/i.exec(command);
    const remove = /^DELETE\s+FROM\s+([a-z_]\w*)(?:\s+WHERE\s+([\s\S]+))?$/i.exec(command);
    const truncate = /^TRUNCATE\s+(?:TABLE\s+)?([a-z_]\w*)$/i.exec(command);
    const name = describe?.[1] || insert?.[1] || update?.[1] || remove?.[1] || truncate?.[1];
    if (!name) return fail(1064, 'Periksa sintaks dan bentuk perintah pada contoh.');
    if (isView(name)) {
      if (!describe) return fail(1288, `View '${name}' di lab ini hanya bisa dibaca dengan SELECT. Ubah datanya lewat tabel aslinya.`);
      const q = sqlQuery(schema, views.find(v => v.name === name.toLowerCase()).sql);
      if (q.error) return fail(q.code || 1064, q.error);
      ok(sqlTable(['Field', 'Type', 'Null', 'Key'], q.labels.map(l => [l, '(view)', 'YES', '']))); continue;
    }
    const table = findTable(name);
    if (!table) return fail(1146, `Table '${schema.name}.${name}' doesn't exist. Tabel itu belum dibuat atau namanya salah ketik.`);
    const indexOf = field => {
      const [a, b] = field.toLowerCase().split('.');
      if (b && a !== table.name) return -1;
      return table.columns.findIndex(c => c.name === (b || a));
    };
    const where = text => sqlWhere(text, indexOf, i => table.columns[i], schema);
    if (describe) {
      const fkCols = new Set([...(table.fks || []).map(f => f.col), ...(table.indexes || []).map(ix => ix.col)]);
      ok(sqlTable(['Field', 'Type', 'Null', 'Key'], table.columns.map(c => [c.name, c.type, c.required || c.name === table.key ? 'NO' : 'YES', c.name === table.key ? 'PRI' : c.unique ? 'UNI' : fkCols.has(c.name) ? 'MUL' : ''])));
    } else if (insert) {
      const fields = insert[2] ? insert[2].split(',').map(f => f.trim()).filter(Boolean) : table.columns.map(c => c.name);
      const badField = fields.find(f => indexOf(f) < 0);
      if (badField) return fail(1054, `Unknown column '${badField}' in '${sqlMaria() ? 'INSERT INTO' : 'field list'}'. Periksa ejaan nama kolom dengan DESCRIBE ${table.name};`);
      // Seluruh bagian VALUES harus berupa (...), (...), ... tanpa sisa teks atau koma yang terlewat
      const groups = sqlSplitTop(insert[3].trim()).map(sqlInner);
      if (!groups.length || groups.some(g => g === null)) return fail(1064, 'Tulis nilai di dalam kurung dan pisahkan tiap baris dengan koma: VALUES (...), (...).');
      const added = [];
      let auto = table.auto || 0;
      for (const group of groups) {
        const parts = sqlSplitTop(group);
        if (parts.length !== fields.length) return fail(1136, "Column count doesn't match value count at row 1. Jumlah nilai harus sama dengan jumlah kolom.");
        const row = table.columns.map(c => c.def ?? null);
        for (const [i, raw] of parts.entries()) {
          let value = sqlValue(raw);
          if (value === undefined) {
            // Ekspresi tanpa kolom, misalnya NOW(), CURDATE(), 2 * 3
            const f = sqlCompile(raw, { ref: () => null, unknown: n => `Unknown column '${n}' in '${sqlMaria() ? 'VALUES' : 'field list'}'. Teks tanpa kutip dianggap nama kolom; apit dengan kutip tunggal: '${n}'.` });
            if (f.error) return fail(f.code || 1064, f.error);
            value = f.fn(null);
            value = value == null ? null : String(value);
          }
          row[indexOf(fields[i])] = sqlFit(table.columns[indexOf(fields[i])], value);
        }
        // Kolom wajib yang tidak disebut dan tidak punya nilai bawaan
        const missing = table.columns.find((c, i) => row[i] === null && (c.required || c.name === table.key) && !c.auto && !fields.some(f => indexOf(f) === i));
        if (missing) return fail(1364, `Field '${missing.name}' doesn't have a default value. Isi kolomnya, atau beri nilai bawaan (DEFAULT) dengan ALTER.`);
        const long = sqlTooLong(table, row);
        if (long) return fail(1406, long);
        table.columns.forEach((c, i) => {
          if (!c.auto) return;
          if (row[i] === null || row[i] === '0') row[i] = String(++auto);
          else auto = Math.max(auto, Number(row[i]) || 0);
        });
        const empty = table.columns.find((c, i) => row[i] === null && (c.required || c.name === table.key));
        if (empty) return fail(1048, `Kolom '${empty.name}' tidak boleh NULL.`);
        if (table.key && [...table.rows, ...added].some(r => r[indexOf(table.key)] === row[indexOf(table.key)])) return fail(1062, `Duplicate entry '${row[indexOf(table.key)]}' for key 'PRIMARY'. Nilai kunci primer sudah digunakan.`);
        const dup = sqlUniqueClash(table, [...table.rows, ...added], row);
        if (dup) return fail(1062, dup);
        const bad = sqlFkMissing(schema, table, row, added);
        if (bad) return fail(1452, bad);
        added.push(row);
      }
      table.auto = auto;
      table.rows.push(...added); ok(`Query OK, ${added.length} row${added.length > 1 ? 's' : ''} affected`);
    } else if (update) {
      const sets = [];
      for (const part of sqlSplitTop(update[2])) {
        const m2 = /^([a-z_]\w*(?:\.[a-z_]\w*)?)\s*=\s*([\s\S]+?)$/i.exec(part);
        if (!m2) return fail(1064, 'Bentuk SET: kolom = nilai.');
        const i = indexOf(m2[1]), value = sqlValue(m2[2]);
        if (i < 0) return fail(1054, `Unknown column '${m2[1]}' in '${sqlMaria() ? 'SET' : 'field list'}'. Periksa ejaan nama kolom dengan DESCRIBE ${table.name};`);
        const column = table.columns[i];
        if (value === undefined) {
          // SET stok = stok - 1, SET nama = UPPER(nama), dst.
          const f = sqlCompile(m2[2], sqlRowEnv(indexOf, j => table.columns[j], schema, n => `Unknown column '${n}' in '${sqlMaria() ? 'SET' : 'field list'}'. Kalau maksudnya teks, apit dengan kutip tunggal: '${n}'.`));
          if (f.error) return fail(f.code || 1064, f.error);
          sets.push([i, r => { const v = f.fn(r); return v == null ? { value: null } : sqlConvert(column, String(v)); }]);
          continue;
        }
        if (value === null && (column.required || column.name === table.key)) return fail(1048, `Kolom '${column.name}' tidak boleh NULL.`);
        const fixed = sqlFit(column, value);
        sets.push([i, () => ({ value: fixed })]);
      }
      const test = update[3] ? where(update[3]) : () => true;
      if (test.error) return fail(test.code || 1064, test.error);
      const hit = table.rows.filter(test);
      const next = new Map();
      for (const r of hit) {
        const copy = [...r];
        for (const [i, f] of sets) {
          const v = f(r);
          if (v.error) return fail(v.code, v.error);
          if (v.value === null && (table.columns[i].required || table.columns[i].name === table.key)) return fail(1048, `Kolom '${table.columns[i].name}' tidak boleh NULL.`);
          copy[i] = v.value;
        }
        next.set(r, copy);
      }
      const k = table.key ? indexOf(table.key) : -1;
      const after = table.rows.map(r => next.get(r) || r);
      if (k >= 0 && sets.some(([i]) => i === k) && new Set(after.map(r => String(r[k]).toLowerCase())).size < after.length) return fail(1062, 'Nilai kunci primer akan kembar. Perubahan dibatalkan.');
      for (const r of next.values()) {
        const long = sqlTooLong(table, r);
        if (long) return fail(1406, long);
        const dup = sqlUniqueClash(table, after.filter(x => x !== r), r);
        if (dup) return fail(1062, dup);
        const bad = sqlFkMissing(schema, table, r, after);
        if (bad) return fail(1452, bad);
      }
      // Induk yang nilai kuncinya diubah: tolak bila masih dirujuk, kecuali ON UPDATE CASCADE
      const cascade = [];
      for (const [r, copy] of next) {
        for (const [child, fk] of sqlChildren(schema, table)) {
          const p = indexOf(fk.refCol), c = child.columns.findIndex(x => x.name === fk.col);
          if (sqlCmp(r[p], copy[p]) === 0) continue;
          const refs = child.rows.filter(x => x[c] !== null && sqlCmp(x[c], r[p]) === 0);
          if (!refs.length) continue;
          if (fk.onUpdate === 'CASCADE') refs.forEach(x => cascade.push([x, c, copy[p]]));
          else if (fk.onUpdate === 'SET NULL') refs.forEach(x => cascade.push([x, c, null]));
          else return fail(1451, sqlFkMessage(schema, child, fk, 'Cannot delete or update a parent row') + ` Nilai '${r[p]}' masih dipakai di tabel ${child.name}.`);
        }
      }
      let changed = 0;
      for (const [r, copy] of next) { if (copy.some((v, i) => v !== r[i])) changed++; copy.forEach((v, i) => { r[i] = v; }); }
      cascade.forEach(([x, c, v]) => { x[c] = v; });
      ok(`Query OK, ${changed} row${changed === 1 ? '' : 's'} affected\nRows matched: ${hit.length}  Changed: ${changed}  Warnings: 0`);
    } else if (remove) {
      const test = remove[2] ? where(remove[2]) : () => true;
      if (test.error) return fail(test.code || 1064, test.error);
      const plan = sqlDeletePlan(schema, table, table.rows.filter(test));
      if (plan.error) return fail(plan.code, plan.error);
      plan.nulls.forEach(([x, c]) => { x[c] = null; });
      for (const [t, rows] of plan.remove) t.rows = t.rows.filter(r => !rows.has(r));
      ok(sqlOk(plan.remove.get(table)?.size || 0));
    } else {
      const child = sqlChildren(schema, table).find(([c]) => c !== table);
      if (child) return fail(1701, `Cannot truncate a table referenced in a foreign key constraint (${child[1].name} di tabel ${child[0].name}). Pakai DELETE FROM, atau kosongkan tabel anaknya dulu.`);
      db.transaction = null;
      table.rows = []; table.auto = 0; ok('Query OK, 0 rows affected');
    }
  }
  return { ok: true, text: output.join('\n\n') };
}

// ===== Nilai dan perbandingan =====
// Nilai literal SQL: 'teks', angka (boleh desimal), atau NULL. undefined = bentuk tidak dikenal.
// Kolom DECIMAL(p,s) menyimpan angka dengan s digit di belakang koma, seperti tampilan MySQL (3.7 → 3.70)
function sqlFit(column, value) {
  const m = /^decimal\(\d+,\s*(\d+)\)$/.exec(column.type);
  return m && value !== null && /^-?\d+(\.\d+)?$/.test(value) ? Number(value).toFixed(+m[1]) : value;
}
// Teks lebih panjang dari CHAR(n)/VARCHAR(n) ditolak (mode ketat MySQL/MariaDB)
function sqlTooLong(table, row) {
  const i = table.columns.findIndex((c, j) => { const m = /^(?:var)?char\((\d+)\)$/.exec(c.type); return m && row[j] != null && String(row[j]).length > +m[1]; });
  return i < 0 ? '' : `Data too long for column '${table.columns[i].name}' at row 1. Kolom ${table.columns[i].type.toUpperCase()} tidak muat untuk '${row[i]}'.`;
}
function sqlValue(raw) {
  const t = String(raw).trim();
  if (/^NULL$/i.test(t)) return null;
  if (/^'(?:''|[^'])*'$/.test(t)) return t.slice(1, -1).replace(/''/g, "'");
  if (/^-?\d+(\.\d+)?$/.test(t)) return t;
  return undefined;
}
const sqlNumType = column => !!column && /^(int|decimal|year|float|double)/.test(column.type);
// Angka hasil hitungan: n = nilai, scale = jumlah angka di belakang koma (null = float bebas).
// Teks tampilannya mengikuti MySQL: DECIMAL 3.10 tetap 3.10, AVG menambah 4 angka di belakang koma.
class SqlNum {
  constructor(n, scale) { this.n = n; this.scale = scale; }
  valueOf() { return this.n; }
  toString() { return this.scale == null ? String(+this.n.toFixed(10)) : this.n.toFixed(this.scale); }
}
const sqlIsNum = v => v instanceof SqlNum;
const sqlNumText = s => { const m = /^\s*(-?\d+)(?:\.(\d+))?\s*$/.exec(String(s)); return m ? new SqlNum(Number(s), m[2] ? m[2].length : 0) : null; };
const sqlInt = n => new SqlNum(n, 0);
const sqlBool = b => b == null ? null : sqlInt(b ? 1 : 0);
const sqlScale = v => sqlIsNum(v) ? v.scale : (sqlNumText(v)?.scale ?? 0);
const sqlToNum = v => sqlIsNum(v) ? v.n : (Number(String(v).trim()) || 0);
const sqlTruth = v => v == null ? null : sqlToNum(v) !== 0;
// Isi sel tabel menjadi nilai untuk dihitung: kolom angka → SqlNum, lainnya teks
function sqlCell(v, column) {
  if (v == null) return null;
  if (sqlIsNum(v) || !column || !sqlNumType(column)) return v;
  if (/^(float|double)/.test(column.type)) return new SqlNum(Number(v), null);
  return sqlNumText(v) || v;
}
// Bandingkan dua nilai: angka bila salah satunya angka, selain itu teks tanpa membedakan huruf besar/kecil
// (seperti collation bawaan MySQL). null bila salah satunya NULL.
function sqlCmp(a, b) {
  if (a == null || b == null) return null;
  if (sqlIsNum(a) || sqlIsNum(b)) { const x = sqlToNum(a), y = sqlToNum(b); return x < y ? -1 : x > y ? 1 : 0; }
  const p = String(a).toLowerCase(), q = String(b).toLowerCase();
  return p < q ? -1 : p > q ? 1 : 0;
}
// Urutan untuk ORDER BY: NULL paling depan saat ASC, seperti MySQL
const sqlSortCmp = (a, b) => a == null || b == null ? (a == null) - (b == null) ? (a == null ? -1 : 1) : 0 : sqlCmp(a, b);

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
// Isi "( … )" bila kurung pembukanya baru tertutup di karakter terakhir; selain itu null
function sqlInner(text) {
  if (!text.startsWith('(')) return null;
  let depth = 0, quote = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === "'") quote = !quote;
    if (quote) continue;
    if (ch === '(') depth++;
    else if (ch === ')' && --depth === 0) return i === text.length - 1 ? text.slice(1, -1) : null;
  }
  return null;
}

// ===== Ekspresi: kolom, angka, teks, + - * /, fungsi, perbandingan, AND/OR/NOT, kurung, subquery =====
const SQL_AGG_NAMES = new Set(['COUNT', 'SUM', 'AVG', 'MIN', 'MAX']);
const SQL_BARE_OK = new Set(['NULL', 'TRUE', 'FALSE', 'ESCAPE', 'EXISTS', 'ANY', 'ALL', 'SOME', 'XOR', 'REGEXP', 'RLIKE', 'INTERVAL', 'DAY', 'MONTH', 'YEAR', 'ASC', 'DESC']);
const SQL_RESERVED = new Set(['AND', 'OR', 'NOT', 'IS', 'IN', 'LIKE', 'BETWEEN', 'FROM', 'WHERE', 'SELECT', 'GROUP', 'ORDER', 'HAVING', 'LIMIT', 'ON', 'JOIN', 'AS', 'DIV', 'MOD', 'UNION']);
function sqlTokens(text) {
  const re = /\s*(?:('(?:''|[^'])*')|(\d+(?:\.\d+)?)|([a-z_]\w*(?:\.[a-z_]\w*)?)|"([^"]*)"|`([^`]*)`|(<=|>=|<>|!=|=|<|>|\+|-|\*|\/|%|\(|\)|,))/iy;
  const toks = [];
  let p = 0;
  while (p < text.length) {
    if (/^\s*$/.test(text.slice(p))) break;
    re.lastIndex = p;
    const m = re.exec(text);
    if (!m) throw { error: `Periksa sintaks di sekitar '${text.slice(p).trim().slice(0, 30)}'.`, code: 1064 };
    const s = m.index + m[0].length - m[0].trimStart().length;
    if (m[1] !== undefined) toks.push({ t: 'str', v: m[1].slice(1, -1).replace(/''/g, "'"), s, e: re.lastIndex });
    else if (m[2] !== undefined) toks.push({ t: 'num', v: m[2], s, e: re.lastIndex });
    else if (m[3] !== undefined) toks.push({ t: 'id', v: m[3], s, e: re.lastIndex });
    else if (m[4] !== undefined || m[5] !== undefined) toks.push({ t: 'qid', v: m[4] ?? m[5], s, e: re.lastIndex });
    else toks.push({ t: 'op', v: m[6], s, e: re.lastIndex });
    p = re.lastIndex;
  }
  return toks;
}
const sqlPad = n => String(n).padStart(2, '0');
const sqlToday = () => { const d = new Date(); return `${d.getFullYear()}-${sqlPad(d.getMonth() + 1)}-${sqlPad(d.getDate())}`; };
const sqlNow = () => { const d = new Date(); return `${sqlToday()} ${sqlPad(d.getHours())}:${sqlPad(d.getMinutes())}:${sqlPad(d.getSeconds())}`; };
const sqlDateParts = v => { const m = v == null ? null : /^(\d{4})-(\d{2})-(\d{2})/.exec(String(v)); return m ? m.slice(1).map(Number) : null; };
function sqlRound(v, d) {
  const x = sqlToNum(v), f = 10 ** d;
  const r = Math.sign(x) * Math.round(Math.abs(x) * f + 1e-9) / f;
  return new SqlNum(r, Math.max(d, 0));
}
// Fungsi bawaan: [jumlah argumen minimum, maksimum, fungsi]. Hampir semua menghasilkan NULL bila argumennya NULL.
const SQL_FUNCS = {
  CONCAT: [1, 99, a => a.some(v => v == null) ? null : a.map(String).join('')],
  CONCAT_WS: [2, 99, ([sep, ...a]) => sep == null ? null : a.filter(v => v != null).map(String).join(String(sep))],
  UPPER: [1, 1, ([s]) => s == null ? null : String(s).toUpperCase()],
  LOWER: [1, 1, ([s]) => s == null ? null : String(s).toLowerCase()],
  LENGTH: [1, 1, ([s]) => s == null ? null : sqlInt(unescape(encodeURIComponent(String(s))).length)],
  CHAR_LENGTH: [1, 1, ([s]) => s == null ? null : sqlInt([...String(s)].length)],
  TRIM: [1, 1, ([s]) => s == null ? null : String(s).trim()],
  LTRIM: [1, 1, ([s]) => s == null ? null : String(s).replace(/^\s+/, '')],
  RTRIM: [1, 1, ([s]) => s == null ? null : String(s).replace(/\s+$/, '')],
  LEFT: [2, 2, ([s, n]) => s == null || n == null ? null : String(s).slice(0, Math.max(0, sqlToNum(n)))],
  RIGHT: [2, 2, ([s, n]) => s == null || n == null ? null : (sqlToNum(n) > 0 ? String(s).slice(-sqlToNum(n)) : '')],
  SUBSTRING: [2, 3, ([s, p, n]) => {
    if (s == null || p == null) return null;
    const t = String(s), pos = sqlToNum(p), start = pos > 0 ? pos - 1 : pos < 0 ? t.length + pos : t.length;
    return t.substr(Math.max(0, start), n === undefined ? undefined : Math.max(0, sqlToNum(n)));
  }],
  REPLACE: [3, 3, ([s, a, b]) => [s, a, b].some(v => v == null) ? null : String(s).split(String(a)).join(String(b))],
  ROUND: [1, 2, ([x, d]) => x == null ? null : sqlRound(x, d === undefined ? 0 : sqlToNum(d))],
  FLOOR: [1, 1, ([x]) => x == null ? null : sqlInt(Math.floor(sqlToNum(x)))],
  CEIL: [1, 1, ([x]) => x == null ? null : sqlInt(Math.ceil(sqlToNum(x)))],
  ABS: [1, 1, ([x]) => x == null ? null : new SqlNum(Math.abs(sqlToNum(x)), sqlScale(x))],
  MOD: [2, 2, ([a, b]) => a == null || b == null || sqlToNum(b) === 0 ? null : new SqlNum(sqlToNum(a) % sqlToNum(b), Math.max(sqlScale(a) ?? 0, sqlScale(b) ?? 0))],
  IFNULL: [2, 2, ([a, b]) => a ?? b],
  COALESCE: [1, 99, a => a.find(v => v != null) ?? null],
  NULLIF: [2, 2, ([a, b]) => sqlCmp(a, b) === 0 ? null : a],
  IF: [3, 3, ([c, a, b]) => sqlTruth(c) ? a : b],
  NOW: [0, 0, () => sqlNow()],
  CURDATE: [0, 0, () => sqlToday()],
  CURTIME: [0, 0, () => sqlNow().slice(11)],
  YEAR: [1, 1, ([d]) => sqlDateParts(d) ? sqlInt(sqlDateParts(d)[0]) : null],
  MONTH: [1, 1, ([d]) => sqlDateParts(d) ? sqlInt(sqlDateParts(d)[1]) : null],
  DAY: [1, 1, ([d]) => sqlDateParts(d) ? sqlInt(sqlDateParts(d)[2]) : null],
  DATEDIFF: [2, 2, ([a, b]) => {
    const x = sqlDateParts(a), y = sqlDateParts(b);
    return x && y ? sqlInt(Math.round((Date.UTC(x[0], x[1] - 1, x[2]) - Date.UTC(y[0], y[1] - 1, y[2])) / 864e5)) : null;
  }]
};
Object.assign(SQL_FUNCS, { UCASE: SQL_FUNCS.UPPER, LCASE: SQL_FUNCS.LOWER, SUBSTR: SQL_FUNCS.SUBSTRING, MID: SQL_FUNCS.SUBSTRING, CEILING: SQL_FUNCS.CEIL, DAYOFMONTH: SQL_FUNCS.DAY, SYSDATE: SQL_FUNCS.NOW, CURRENT_TIMESTAMP: SQL_FUNCS.NOW, CURRENT_DATE: SQL_FUNCS.CURDATE });
function sqlArith(op, a, b) {
  if (a == null || b == null) return null;
  const x = sqlToNum(a), y = sqlToNum(b), sa = sqlScale(a), sb = sqlScale(b);
  const free = sa == null || sb == null;
  if (op === '+') return new SqlNum(x + y, free ? null : Math.max(sa, sb));
  if (op === '-') return new SqlNum(x - y, free ? null : Math.max(sa, sb));
  if (op === '*') return new SqlNum(x * y, free ? null : sa + sb);
  if (y === 0) return null; // MySQL: pembagian dengan nol menghasilkan NULL
  if (op === '/') return new SqlNum(x / y, free ? null : sa + 4);
  if (op === 'DIV') return sqlInt(Math.trunc(x / y));
  return new SqlNum(x % y, free ? null : Math.max(sa, sb)); // % atau MOD
}
// env: { ref(nama) → {get} | {error} | null, agg(teks) → {get} | {error}, sub(sql) → {labels, rows} | {error}, unknown(nama) → pesan }
function sqlCompile(text, env) {
  let toks;
  try { toks = sqlTokens(text); } catch (e) { return e; }
  // Syarat WHERE: dua kata polos berurutan (WHERE judul = Sistem Basis Data) = teks lupa dikutip
  // Subquery (SELECT …) dilewati: alias tabel/kolom di dalamnya sah dan diperiksa saat subquery itu dikompilasi
  if (env.bare) for (let k = 1, d = 0, sub = 0; k < toks.length; k++) {
    const a = toks[k - 1], b = toks[k], up = t => t.v.toUpperCase();
    if (a.t === 'op' && a.v === '(') { d++; if (!sub && b.t === 'id' && up(b) === 'SELECT') sub = d; }
    if (a.t === 'op' && a.v === ')') { if (sub === d) sub = 0; d--; }
    if (sub) continue;
    if (a.t === 'id' && b.t === 'id' && !SQL_RESERVED.has(up(a)) && !SQL_RESERVED.has(up(b)) && !SQL_BARE_OK.has(up(a)) && !SQL_BARE_OK.has(up(b)) && toks[k + 1]?.v !== '(')
      return { error: `You have an error in your SQL syntax near '${text.slice(b.s, b.s + 30)}'. Nilai teks harus diapit kutip tunggal.`, code: 1064 };
  }
  let p = 0;
  const kw = (w, k = 0) => toks[p + k]?.t === 'id' && toks[p + k].v.toUpperCase() === w;
  const sym = (s, k = 0) => toks[p + k]?.t === 'op' && toks[p + k].v === s;
  const fail = (error, code = 1064) => { throw { error, code }; };
  const near = () => toks[p] ? text.slice(toks[p].s, toks[p].s + 30) : 'akhir perintah';
  const expect = s => { if (!sym(s)) fail(`Periksa sintaks di sekitar '${near()}'. Mungkin kurang '${s}'.`); p++; };
  const closeOf = open => { let d = 0; for (let k = open; k < toks.length; k++) { if (toks[k].t !== 'op') continue; if (toks[k].v === '(') d++; else if (toks[k].v === ')' && --d === 0) return k; } fail('Kurung buka dan kurung tutup tidak seimbang.'); };
  const subquery = () => {
    const close = closeOf(p), sql = text.slice(toks[p + 1].s, toks[close].s);
    if (!env.sub) fail('Subquery tidak didukung di bagian ini.');
    const r = env.sub(sql);
    if (r.error) throw r;
    p = close + 1;
    return r;
  };
  const oneCol = r => { if (r.labels.length !== 1) fail('Operand should contain 1 column(s). Subquery di sini hanya boleh memilih satu kolom.', 1241); };
  const AND = (a, b) => r => { const x = sqlTruth(a(r)); if (x === false) return sqlInt(0); const y = sqlTruth(b(r)); return y === false ? sqlInt(0) : x === null || y === null ? null : sqlInt(1); };
  const OR = (a, b) => r => { const x = sqlTruth(a(r)); if (x === true) return sqlInt(1); const y = sqlTruth(b(r)); return y === true ? sqlInt(1) : x === null || y === null ? null : sqlInt(0); };
  const or = () => { let a = and(); while (kw('OR')) { p++; a = OR(a, and()); } return a; };
  const and = () => { let a = not(); while (kw('AND')) { p++; a = AND(a, not()); } return a; };
  const not = () => {
    if (kw('NOT')) { p++; const f = not(); return r => { const t = sqlTruth(f(r)); return t === null ? null : sqlBool(!t); }; }
    return pred();
  };
  const pred = () => {
    const a = add();
    if (kw('IS')) {
      p++;
      const neg = kw('NOT') ? (p++, true) : false;
      if (!kw('NULL')) fail(`Setelah IS${neg ? ' NOT' : ''} tulis NULL.`);
      p++;
      return r => sqlBool((a(r) == null) !== neg);
    }
    const neg = kw('NOT') && (kw('LIKE', 1) || kw('BETWEEN', 1) || kw('IN', 1)) ? (p++, true) : false;
    if (kw('LIKE')) {
      p++;
      const b = add(), cache = new Map();
      return r => {
        const x = a(r), y = b(r);
        if (x == null || y == null) return null;
        const pat = String(y);
        if (!cache.has(pat)) cache.set(pat, new RegExp('^' + pat.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '[\\s\\S]*').replace(/_/g, '[\\s\\S]') + '$', 'i'));
        return sqlBool(cache.get(pat).test(String(x)) !== neg);
      };
    }
    if (kw('BETWEEN')) {
      p++;
      const lo = add();
      if (!kw('AND')) fail('Bentuk BETWEEN: kolom BETWEEN nilai_awal AND nilai_akhir.');
      p++;
      const hi = add();
      return r => {
        const c1 = sqlCmp(a(r), lo(r)), c2 = sqlCmp(a(r), hi(r));
        return c1 === null || c2 === null ? null : sqlBool((c1 >= 0 && c2 <= 0) !== neg);
      };
    }
    if (kw('IN')) {
      p++;
      if (!sym('(')) fail("Bentuk IN: kolom IN ('nilai1', 'nilai2').");
      let list;
      if (kw('SELECT', 1)) { const res = subquery(); oneCol(res); list = res.rows.map(row => () => row[0]); }
      else {
        p++;
        list = [or()];
        while (sym(',')) { p++; list.push(or()); }
        expect(')');
      }
      // Seperti SQL: x NOT IN (…, NULL) tidak pernah benar, karena perbandingan dengan NULL hasilnya UNKNOWN
      return r => {
        const x = a(r);
        if (x == null) return null;
        const vals = list.map(f => f(r));
        if (vals.some(v => v != null && sqlCmp(x, v) === 0)) return sqlBool(!neg);
        return vals.some(v => v == null) ? null : sqlBool(neg);
      };
    }
    if (neg) fail(`Periksa sintaks di sekitar '${near()}'.`);
    const op = ['=', '<>', '!=', '<', '>', '<=', '>='].find(s => sym(s));
    if (!op) return a;
    p++;
    const b = add();
    return r => {
      const c = sqlCmp(a(r), b(r));
      if (c === null) return null;
      return sqlBool(op === '=' ? c === 0 : op === '<>' || op === '!=' ? c !== 0 : op === '<' ? c < 0 : op === '>' ? c > 0 : op === '<=' ? c <= 0 : c >= 0);
    };
  };
  const add = () => {
    let a = mul();
    while (sym('+') || sym('-')) { const op = toks[p++].v, x = a, y = mul(); a = r => sqlArith(op, x(r), y(r)); }
    return a;
  };
  const mul = () => {
    let a = unary();
    while (sym('*') || sym('/') || sym('%') || kw('DIV') || kw('MOD')) {
      const op = toks[p++].v.toUpperCase(), x = a, y = unary();
      a = r => sqlArith(op === 'MOD' ? '%' : op, x(r), y(r));
    }
    return a;
  };
  const unary = () => {
    if (sym('-')) { p++; const f = unary(); return r => { const v = f(r); return v == null ? null : new SqlNum(-sqlToNum(v), sqlScale(v)); }; }
    if (sym('+')) { p++; return unary(); }
    return primary();
  };
  const primary = () => {
    const t = toks[p];
    if (!t) fail('Perintah terpotong. Ada bagian yang belum ditulis.');
    if (t.t === 'str') { p++; return () => t.v; }
    if (t.t === 'num') { p++; const v = sqlNumText(t.v); return () => v; }
    if (sym('(')) {
      if (kw('SELECT', 1)) {
        const res = subquery();
        oneCol(res);
        if (res.rows.length > 1) fail('Subquery returns more than 1 row. Subquery yang dibandingkan dengan =, <, atau > harus menghasilkan satu nilai; pakai IN bila hasilnya banyak.', 1242);
        const v = res.rows[0]?.[0] ?? null;
        return () => v;
      }
      p++;
      const f = or();
      expect(')');
      return f;
    }
    if (t.t === 'id' || t.t === 'qid') {
      const up = t.v.toUpperCase();
      if (t.t === 'id' && up === 'NULL') { p++; return () => null; }
      if (t.t === 'id' && (up === 'TRUE' || up === 'FALSE')) { p++; return () => sqlBool(up === 'TRUE'); }
      if (t.t === 'id' && up === 'EXISTS' && sym('(', 1) && kw('SELECT', 2)) { p++; const res = subquery(); return () => sqlBool(res.rows.length > 0); }
      if (t.t === 'id' && sym('(', 1)) {
        if (SQL_AGG_NAMES.has(up)) {
          const close = closeOf(p + 1), raw = text.slice(t.s, toks[close].e);
          const r = env.agg ? env.agg(raw) : { error: 'Invalid use of group function.', code: 1111 };
          if (r.error) throw r;
          p = close + 1;
          return r.get;
        }
        const def = SQL_FUNCS[up];
        if (!def) fail(`FUNCTION ${up} does not exist. Fungsi ini belum dikenal di lab.`, 1305);
        p += 2;
        const args = [];
        if (!sym(')')) { args.push(or()); while (sym(',')) { p++; args.push(or()); } }
        expect(')');
        if (args.length < def[0] || args.length > def[1]) fail(`Incorrect parameter count in the call to native function '${up}'.`, 1582);
        return r => def[2](args.map(f => f(r)));
      }
      if (t.t === 'id' && (up === 'CURRENT_DATE' || up === 'CURRENT_TIMESTAMP')) { p++; return () => SQL_FUNCS[up][2]([]); }
      if (t.t === 'id' && SQL_RESERVED.has(up)) fail(`Periksa sintaks di sekitar '${near()}'.`);
      const r = env.ref ? env.ref(t.v) : null;
      if (r == null) fail(env.unknown ? env.unknown(t.v) : `Unknown column '${t.v}'.`, 1054);
      if (r.error) throw r;
      p++;
      return r.get;
    }
    fail(`Periksa sintaks di sekitar '${near()}'.`);
  };
  try {
    const fn = or();
    if (p < toks.length) fail(`Periksa sintaks di sekitar '${near()}'.`);
    return { fn };
  } catch (e) {
    if (e && e.error) return e;
    throw e;
  }
}
// Lingkungan ekspresi untuk satu tabel (WHERE pada UPDATE/DELETE): baris = array sel tabel
function sqlRowEnv(indexOf, columnAt, schema, unknown) {
  return {
    ref: name => { const i = indexOf(name); return typeof i === 'object' ? i : i < 0 ? null : { get: r => sqlCell(r[i], columnAt(i)) }; },
    agg: () => ({ error: 'Invalid use of group function. Fungsi agregat (COUNT, SUM, AVG, MIN, MAX) tidak boleh di WHERE; pakai HAVING setelah GROUP BY.', code: 1111 }),
    sub: schema ? sql => sqlQuery(schema, sql) : null,
    unknown: unknown || (name => `Kolom '${name}' tidak ditemukan. Kalau maksudnya teks, apit dengan kutip tunggal: '${name}'.`)
  };
}
// WHERE / ON: mengembalikan fungsi baris → benar/salah, atau { error, code }
function sqlWhere(text, indexOf, columnAt = () => null, schema = null) {
  const f = sqlCompile(text, { ...sqlRowEnv(indexOf, columnAt, schema, name => `Unknown column '${name}' in '${sqlMaria() ? 'WHERE' : 'where clause'}'. Kalau maksudnya teks, apit dengan kutip tunggal: '${name}'.`), bare: true });
  if (f.error) return f;
  return row => sqlTruth(f.fn(row)) === true;
}

// ===== Definisi kolom, kunci tamu, dan ALTER TABLE =====
function sqlColumnDef(text) {
  const m = new RegExp(String.raw`^([a-z_]\w*)\s+(${SQL_TYPE})((?:\s+(?:NOT\s+NULL|NULL|AUTO_INCREMENT|UNIQUE(?:\s+KEY)?|PRIMARY\s+KEY|DEFAULT\s+(?:'(?:''|[^'])*'|-?\d+(?:\.\d+)?|NULL)))*)(?:\s+(FIRST|AFTER\s+([a-z_]\w*)))?$`, 'i').exec(text.trim());
  if (!m) return null;
  const attrs = m[3] || '';
  const column = { name: m[1].toLowerCase(), type: m[2].toLowerCase().replace(/\s+/g, ''), required: /NOT\s+NULL/i.test(attrs) };
  const d = /DEFAULT\s+('(?:''|[^'])*'|-?\d+(?:\.\d+)?|NULL)/i.exec(attrs);
  if (d && !/^NULL$/i.test(d[1])) column.def = sqlFit(column, sqlValue(d[1]));
  if (/AUTO_INCREMENT/i.test(attrs)) column.auto = true;
  if (/UNIQUE/i.test(attrs)) column.unique = true;
  const primary = /PRIMARY\s+KEY/i.test(attrs);
  if (primary) column.required = true;
  return { column, primary, first: /^FIRST$/i.test(m[4] || ''), after: m[5]?.toLowerCase() };
}
// [CONSTRAINT nama] FOREIGN KEY (kolom) REFERENCES induk(kolom) [ON DELETE …] [ON UPDATE …]
function sqlFkDef(text) {
  const m = new RegExp(String.raw`^(?:CONSTRAINT\s+([a-z_]\w*)\s+)?FOREIGN\s+KEY\s*\(\s*([a-z_]\w*)\s*\)\s*REFERENCES\s+([a-z_]\w*)\s*\(\s*([a-z_]\w*)\s*\)((?:\s+ON\s+(?:DELETE|UPDATE)\s+${SQL_FK_ACTION})*)$`, 'i').exec(text.trim());
  if (!m) return null;
  const act = w => (new RegExp(String.raw`ON\s+${w}\s+(${SQL_FK_ACTION})`, 'i').exec(m[5])?.[1] || 'RESTRICT').toUpperCase().replace(/\s+/g, ' ');
  return { name: m[1]?.toLowerCase(), col: m[2].toLowerCase(), ref: m[3].toLowerCase(), refCol: m[4].toLowerCase(), onDelete: act('DELETE'), onUpdate: act('UPDATE') };
}
function sqlFkCheck(schema, table, fk) {
  const r = sqlFkCheckRaw(schema, table, fk);
  // MariaDB melaporkan semua kunci tamu yang tak dapat dibentuk sebagai galat 1005 errno 150
  if (sqlMaria() && [1822, 1824, 3780].includes(r.code)) return { error: `Can't create table \`${schema.name}\`.\`${table.name}\` (errno: 150 "Foreign key constraint is incorrectly formed"). ${r.error.replace(/^[^.]*\.\s*/, '')}`, code: 1005 };
  return r;
}
function sqlFkCheckRaw(schema, table, fk) {
  const c = table.columns.find(x => x.name === fk.col);
  if (!c) return { error: `Key column '${fk.col}' doesn't exist in table.`, code: 1072 };
  const parent = fk.ref === table.name ? table : schema.tables.find(t => t.name === fk.ref);
  if (!parent) return { error: `Failed to open the referenced table '${fk.ref}'. Tabel induk harus dibuat lebih dulu daripada tabel yang merujuknya.`, code: 1824 };
  const pc = parent.columns.find(x => x.name === fk.refCol);
  if (!pc || (parent.key !== fk.refCol && !pc.unique)) return { error: `Missing index for constraint in the referenced table '${fk.ref}'. Kolom ${fk.refCol} harus kunci primer (atau UNIQUE) di tabel ${fk.ref}.`, code: 1822 };
  if (sqlNumType(c) !== sqlNumType(pc)) return { error: `Referencing column '${fk.col}' and referenced column '${fk.refCol}' are incompatible. Tipe datanya harus sejenis.`, code: 3780 };
  if (fk.onDelete === 'SET NULL' && c.required) return { error: `Column '${fk.col}' cannot be NOT NULL: needed in a foreign key constraint SET NULL.`, code: 1830 };
  return { ok: true };
}
const sqlFkMessage = (schema, child, fk, head) => `${head}: a foreign key constraint fails (\`${schema.name}\`.\`${child.name}\`, CONSTRAINT \`${fk.name}\` FOREIGN KEY (\`${fk.col}\`) REFERENCES \`${fk.ref}\` (\`${fk.refCol}\`)).`;
// Tabel-tabel yang merujuk tabel ini: [[tabel anak, fk], …]
const sqlChildren = (schema, table) => schema.tables.flatMap(t => (t.fks || []).filter(f => f.ref === table.name).map(f => [t, f]));
// Pesan galat bila nilai kunci tamu baris ini tidak ada di tabel induknya; '' bila aman
function sqlFkMissing(schema, table, row, extra = []) {
  for (const fk of table.fks || []) {
    const v = row[table.columns.findIndex(c => c.name === fk.col)];
    if (v == null) continue;
    const parent = fk.ref === table.name ? { ...table, rows: [...table.rows, ...extra, row] } : schema.tables.find(t => t.name === fk.ref);
    const p = parent.columns.findIndex(c => c.name === fk.refCol);
    if (!parent.rows.some(r => sqlCmp(r[p], v) === 0)) return sqlFkMessage(schema, table, fk, 'Cannot add or update a child row') + ` Nilai '${v}' tidak ada di kolom ${fk.refCol} tabel ${fk.ref}; isi tabel induknya dulu.`;
  }
  return '';
}
function sqlUniqueClash(table, others, row) {
  for (const [i, c] of table.columns.entries()) {
    if (!c.unique || row[i] == null) continue;
    if (others.some(r => r[i] != null && String(r[i]).toLowerCase() === String(row[i]).toLowerCase())) return `Duplicate entry '${row[i]}' for key '${table.name}.${c.name}'. Kolom ${c.name} bersifat UNIQUE, jadi isinya tidak boleh kembar.`;
  }
  return '';
}
// Rencana DELETE yang memperhatikan kunci tamu: RESTRICT menolak, CASCADE ikut menghapus anak, SET NULL mengosongkan
function sqlDeletePlan(schema, table, rows) {
  const remove = new Map(), nulls = [];
  const visit = (t, victims) => {
    const set = remove.get(t) || new Set();
    const fresh = victims.filter(r => !set.has(r));
    if (!fresh.length) return null;
    fresh.forEach(r => set.add(r));
    remove.set(t, set);
    for (const [child, fk] of sqlChildren(schema, t)) {
      const p = t.columns.findIndex(c => c.name === fk.refCol), c = child.columns.findIndex(x => x.name === fk.col);
      const refs = child.rows.filter(x => x[c] != null && fresh.some(v => sqlCmp(x[c], v[p]) === 0) && !(remove.get(child)?.has(x)));
      if (!refs.length) continue;
      if (fk.onDelete === 'CASCADE') { const e = visit(child, refs); if (e) return e; }
      else if (fk.onDelete === 'SET NULL') refs.forEach(x => nulls.push([x, c]));
      else if (!(child === t && refs.every(x => fresh.includes(x)))) return { error: sqlFkMessage(schema, child, fk, 'Cannot delete or update a parent row') + ` Data ini masih dirujuk ${refs.length} baris di tabel ${child.name}; hapus baris anaknya dulu atau pakai ON DELETE CASCADE.`, code: 1451 };
    }
    return null;
  };
  const e = visit(table, rows);
  return e || { remove, nulls };
}
const sqlZero = c => sqlNumType(c) ? sqlFit(c, '0') : c.type === 'date' ? '0000-00-00' : c.type === 'datetime' ? '0000-00-00 00:00:00' : '';
// Ubah nilai agar cocok dengan tipe kolom (MODIFY/CHANGE, UPDATE dengan ekspresi). Mode ketat MySQL menolak data yang tidak muat.
function sqlConvert(column, value) {
  if (value === null) return { value };
  const len = /^(?:var)?char\((\d+)\)$/.exec(column.type);
  if (len && String(value).length > +len[1]) return { error: `Data truncated for column '${column.name}'. Ada isi yang lebih panjang dari ${len[1]} karakter, jadi tipe baru terlalu sempit.`, code: 1265 };
  if (sqlNumType(column)) {
    if (!/^-?\d+(\.\d+)?$/.test(String(value))) return { error: `Incorrect value '${value}' for column '${column.name}'. Teks ini tidak bisa diubah menjadi angka.`, code: 1366 };
    if (/^(int|year)/.test(column.type)) return { value: String(Math.round(Number(value))) };
  }
  return { value: sqlFit(column, String(value)) };
}
function sqlAlter(schema, name, actionsText) {
  const table = schema.tables.find(t => t.name === name.toLowerCase());
  if (!table) return { error: `Table '${schema.name}.${name}' doesn't exist. Tabel itu belum dibuat atau namanya salah ketik.`, code: 1146 };
  const t = JSON.parse(JSON.stringify(table)); // dikerjakan pada salinan: kalau satu aksi gagal, tabel tidak berubah
  const renames = []; // [kolom lama, kolom baru] untuk memperbarui rujukan tabel lain
  const idx = f => t.columns.findIndex(c => c.name === f.toLowerCase());
  const referenced = col => schema.tables.some(x => x !== table && (x.fks || []).some(f => f.ref === table.name && f.refCol === col));
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
      if (referenced(t.key)) return { error: `Cannot drop index 'PRIMARY': needed in a foreign key constraint. Kolom ${t.key} masih dirujuk tabel lain.`, code: 1553 };
      t.key = ''; continue;
    }
    if ((m = /^ADD\s+((?:CONSTRAINT\s+[a-z_]\w*\s+)?FOREIGN\s+KEY[\s\S]*)$/i.exec(action))) {
      const fk = sqlFkDef(m[1]);
      if (!fk) return { error: 'Bentuk: ALTER TABLE anak ADD FOREIGN KEY (kolom) REFERENCES induk(kolom);', code: 1064 };
      const ok = sqlFkCheck(schema, t, fk);
      if (ok.error) return ok;
      fk.name ||= `${t.name}_ibfk_${(t.fks || []).length + 1}`;
      if ((t.fks || []).some(f => f.name === fk.name)) return { error: `Duplicate foreign key constraint name '${fk.name}'.`, code: 1826 };
      const c = idx(fk.col), parent = fk.ref === t.name ? t : schema.tables.find(x => x.name === fk.ref), p = parent.columns.findIndex(x => x.name === fk.refCol);
      const orphan = t.rows.find(r => r[c] != null && !parent.rows.some(x => sqlCmp(x[p], r[c]) === 0));
      if (orphan) return { error: sqlFkMessage(schema, t, fk, 'Cannot add or update a child row') + ` Sudah ada baris dengan ${fk.col} = '${orphan[c]}' yang tidak ada di tabel ${fk.ref}.`, code: 1452 };
      (t.fks ||= []).push(fk); continue;
    }
    if ((m = /^DROP\s+FOREIGN\s+KEY\s+([a-z_]\w*)$/i.exec(action))) {
      const k = (t.fks || []).findIndex(f => f.name === m[1].toLowerCase());
      if (k < 0) return { error: `Can't DROP FOREIGN KEY \`${m[1]}\`; check that it exists. Lihat namanya dengan SHOW INDEX FROM ${t.name}.`, code: 1091 };
      t.fks.splice(k, 1); continue;
    }
    if ((m = /^ADD\s+(UNIQUE|INDEX|KEY)(?:\s+(?:KEY|INDEX))?(?:\s+([a-z_]\w*))?\s*\(\s*([a-z_]\w*)\s*\)$/i.exec(action))) {
      const i = idx(m[3]), ixName = (m[2] || m[3]).toLowerCase();
      if (i < 0) return { error: `Key column '${m[3]}' doesn't exist in table.`, code: 1072 };
      if ((t.indexes || []).some(x => x.name === ixName) || (/UNIQUE/i.test(m[1]) && t.columns[i].unique)) return { error: `Duplicate key name '${ixName}'.`, code: 1061 };
      if (/UNIQUE/i.test(m[1])) {
        const seen = new Set();
        for (const r of t.rows) {
          if (r[i] == null) continue;
          const v = String(r[i]).toLowerCase();
          if (seen.has(v)) return { error: `Duplicate entry '${r[i]}' for key '${t.name}.${ixName}'. Isi kolom ini sudah ada yang kembar, jadi belum bisa dijadikan UNIQUE.`, code: 1062 };
          seen.add(v);
        }
        t.columns[i].unique = true;
      } else (t.indexes ||= []).push({ name: ixName, col: t.columns[i].name });
      continue;
    }
    if ((m = /^DROP\s+(?:INDEX|KEY)\s+([a-z_]\w*)$/i.exec(action))) {
      const ixName = m[1].toLowerCase(), k = (t.indexes || []).findIndex(x => x.name === ixName), u = t.columns.find(c => c.unique && c.name === ixName);
      if (k >= 0) t.indexes.splice(k, 1);
      else if (u) delete u.unique;
      else return { error: `Can't DROP '${m[1]}'; check that column/key exists.`, code: 1091 };
      continue;
    }
    if (/^ADD\s+(CONSTRAINT|CHECK)\b/i.test(action)) return { error: 'Constraint jenis ini belum didukung di lab. Yang didukung: ADD kolom, ADD PRIMARY KEY, ADD FOREIGN KEY, ADD UNIQUE, ADD INDEX, DROP, MODIFY, CHANGE, RENAME.', code: 1064 };
    if ((m = /^ADD\s+(?:COLUMN\s+)?([\s\S]+)$/i.exec(action))) {
      const d = sqlColumnDef(m[1]);
      if (!d) return { error: 'Definisi kolom tidak dikenali. Contoh: ALTER TABLE buku ADD stok INT;', code: 1064 };
      if (idx(d.column.name) >= 0) return { error: `Duplicate column name '${d.column.name}'. Kolom itu sudah ada.`, code: 1060 };
      if (d.after && idx(d.after) < 0) return { error: `Unknown column '${d.after}' in '${t.name}'.`, code: 1054 };
      if (d.primary || d.column.auto) return { error: 'Tambahkan dulu kolomnya, lalu jadikan kunci dengan ADD PRIMARY KEY (kolom).', code: 1064 };
      if (d.column.unique && t.rows.length > 1 && d.column.def !== undefined) return { error: `Duplicate entry '${d.column.def}' for key '${t.name}.${d.column.name}'.`, code: 1062 };
      // Baris lama mendapat DEFAULT; tanpa DEFAULT: NULL, atau nilai kosong bawaan (0 / '') bila NOT NULL
      const fill = d.column.def !== undefined ? d.column.def : d.column.required ? sqlZero(d.column) : null;
      t.columns.push(d.column); t.rows.forEach(r => r.push(fill));
      move(t.columns.length - 1, d); continue;
    }
    if ((m = /^DROP\s+(?:COLUMN\s+)?([a-z_]\w*)$/i.exec(action))) {
      const i = idx(m[1]);
      if (i < 0) return { error: `Can't DROP '${m[1]}'; check that column/key exists.`, code: 1091 };
      if (t.columns.length === 1) return { error: "You can't delete all columns with ALTER TABLE; use DROP TABLE instead.", code: 1090 };
      const col = t.columns[i].name;
      if ((t.fks || []).some(f => f.col === col) || referenced(col)) return { error: `Cannot drop column '${col}': needed in a foreign key constraint. Hapus dulu kunci tamunya (DROP FOREIGN KEY).`, code: 1828 };
      if (col === t.key) t.key = '';
      if (t.indexes) t.indexes = t.indexes.filter(x => x.col !== col);
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
      const was = t.columns[i];
      if (was.name === t.key) d.column.required = true;
      if (was.unique) d.column.unique = true;
      if (was.auto && !d.column.auto) delete d.column.auto;
      const values = [];
      for (const r of t.rows) {
        if (r[i] === null && d.column.required) return { error: `Invalid use of NULL value. Masih ada baris yang kolom '${was.name}'-nya NULL, jadi kolom itu belum bisa dijadikan NOT NULL.`, code: 1138 };
        const v = sqlConvert(d.column, r[i]);
        if (v.error) return v;
        values.push(v.value);
      }
      if (was.name === t.key || was.unique) {
        // Nilai yang tadinya berbeda bisa menjadi kembar setelah diubah tipenya (mis. '1.1' dan '1.2' → INT 1)
        const seen = new Set();
        for (const v of values) {
          if (v == null) continue;
          const k = String(v).toLowerCase();
          if (seen.has(k)) return { error: `Duplicate entry '${v}' for key '${was.name === t.key ? 'PRIMARY' : t.name + '.' + was.name}'. Setelah tipe diubah, ada nilai yang menjadi kembar.`, code: 1062 };
          seen.add(k);
        }
      }
      if (was.name === t.key) t.key = d.column.name;
      if (was.name !== d.column.name) {
        (t.fks || []).forEach(f => { if (f.col === was.name) f.col = d.column.name; });
        (t.indexes || []).forEach(x => { if (x.col === was.name) x.col = d.column.name; });
        renames.push([was.name, d.column.name]);
      }
      t.columns[i] = d.column; t.rows.forEach((r, k) => { r[i] = values[k]; });
      move(i, d); continue;
    }
    if ((m = /^RENAME\s+COLUMN\s+([a-z_]\w*)\s+TO\s+([a-z_]\w*)$/i.exec(action))) {
      const i = idx(m[1]), to = m[2].toLowerCase();
      if (i < 0) return { error: `Unknown column '${m[1]}' in '${t.name}'.`, code: 1054 };
      if (idx(to) >= 0) return { error: `Duplicate column name '${to}'.`, code: 1060 };
      const was = t.columns[i].name;
      if (was === t.key) t.key = to;
      (t.fks || []).forEach(f => { if (f.col === was) f.col = to; });
      (t.indexes || []).forEach(x => { if (x.col === was) x.col = to; });
      renames.push([was, to]);
      t.columns[i].name = to; continue;
    }
    if ((m = /^RENAME\s+(?:TO\s+|AS\s+)?([a-z_]\w*)$/i.exec(action))) {
      const to = m[1].toLowerCase();
      if (to !== t.name && (schema.tables.some(x => x.name === to) || (schema.views || []).some(v => v.name === to))) return { error: `Table '${to}' already exists.`, code: 1050 };
      t.name = to; continue;
    }
    return { error: `Aksi ALTER tidak dikenali: ${action}. Yang didukung: ADD, DROP, MODIFY, CHANGE, RENAME, ADD/DROP PRIMARY KEY, ADD/DROP FOREIGN KEY, ADD UNIQUE, ADD/DROP INDEX.`, code: 1064 };
  }
  // Perbarui rujukan kunci tamu di tabel lain bila nama tabel/kolom induk berubah
  for (const other of schema.tables) {
    if (other === table) continue;
    for (const f of other.fks || []) {
      if (f.ref !== table.name) continue;
      for (const [a, b] of renames) if (f.refCol === a) f.refCol = b;
      f.ref = t.name;
    }
  }
  (t.fks || []).forEach(f => { if (f.ref === table.name) { f.ref = t.name; for (const [a, b] of renames) if (f.refCol === a) f.refCol = b; } });
  Object.keys(table).forEach(k => delete table[k]);
  Object.assign(table, t);
  return { ok: true };
}

// ===== DCL: CREATE USER, GRANT, REVOKE, SHOW GRANTS =====
const SQL_PRIVS = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 'ALTER', 'INDEX', 'REFERENCES', 'CREATE VIEW'];
function sqlDcl(db, command) {
  const users = db.users ||= [];
  const who = s => { const m = /^'([^']+)'(?:@'([^']+)')?$|^([a-z_]\w*)(?:@([a-z_.%]+))?$/i.exec(s.trim()); return m ? { name: m[1] ?? m[3], host: m[2] ?? m[4] ?? '%' } : null; };
  const label = u => `\`${u.name}\`@\`${u.host}\``;
  const find = u => users.find(x => x.name === u.name && x.host === u.host);
  let m;
  if ((m = /^CREATE\s+USER\s+(IF\s+NOT\s+EXISTS\s+)?(\S+?)(?:\s+IDENTIFIED\s+BY\s+'(?:''|[^'])*')?$/i.exec(command))) {
    const u = who(m[2]);
    if (!u) return { error: "Tulis nama pengguna seperti 'petugas'@'localhost'.", code: 1064 };
    if (find(u)) return m[1] ? { text: 'Query OK. Pengguna sudah ada.' } : { error: `Operation CREATE USER failed for '${u.name}'@'${u.host}'. Pengguna itu sudah ada.`, code: 1396 };
    users.push({ ...u, grants: {} }); return { ok: true };
  }
  if ((m = /^DROP\s+USER\s+(IF\s+EXISTS\s+)?(\S+)$/i.exec(command))) {
    const u = who(m[2]), k = u ? users.findIndex(x => x.name === u.name && x.host === u.host) : -1;
    if (k < 0) return m[1] ? { text: 'Query OK. Pengguna memang tidak ada.' } : { error: `Operation DROP USER failed for '${u?.name}'@'${u?.host}'.`, code: 1396 };
    users.splice(k, 1); return { ok: true };
  }
  if ((m = /^SHOW\s+GRANTS\s+FOR\s+(\S+)$/i.exec(command))) {
    const u = who(m[1]), x = u && find(u);
    if (!x) return { error: `There is no such grant defined for user '${u?.name}' on host '${u?.host}'.`, code: 1141 };
    const rows = [[`GRANT USAGE ON *.* TO ${label(x)}`], ...Object.entries(x.grants).filter(([, p]) => p.length).map(([on, p]) => [`GRANT ${p.includes('ALL PRIVILEGES') ? 'ALL PRIVILEGES' : SQL_PRIVS.filter(q => p.includes(q)).join(', ')} ON ${on} TO ${label(x)}`])];
    return { text: sqlTable([`Grants for ${x.name}@${x.host}`], rows) };
  }
  const g = /^(GRANT|REVOKE)\s+([\s\S]+?)\s+ON\s+(\*|[a-z_]\w*|\*\.\*|[a-z_]\w*\.\*|[a-z_]\w*\.[a-z_]\w*)\s+(TO|FROM)\s+(\S+)$/i.exec(command);
  if (!g || (g[1].toUpperCase() === 'GRANT') !== (g[4].toUpperCase() === 'TO')) return { error: "Bentuk: GRANT SELECT, INSERT ON perpustakaan.* TO 'petugas'@'localhost'; atau REVOKE … ON … FROM ….", code: 1064 };
  const privs = g[2].split(',').map(s => s.trim().toUpperCase().replace(/\s+/g, ' ')).map(s => s === 'ALL' ? 'ALL PRIVILEGES' : s);
  const unknown = privs.find(s => s !== 'ALL PRIVILEGES' && !SQL_PRIVS.includes(s));
  if (unknown) return { error: `Hak akses '${unknown}' tidak dikenal. Contoh: SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, ALTER, ALL PRIVILEGES.`, code: 1064 };
  const u = who(g[5]), x = u && find(u);
  const on = (g[3].includes('.') ? g[3] : (db.active || '*') + '.' + g[3]).split('.').map(s => s === '*' ? '*' : `\`${s.toLowerCase()}\``).join('.');
  if (!x) return g[1].toUpperCase() === 'GRANT'
    ? { error: "You are not allowed to create a user with GRANT. Buat dulu penggunanya: CREATE USER 'nama'@'localhost' IDENTIFIED BY 'sandi';", code: 1410 }
    : { error: `There is no such grant defined for user '${u?.name}' on host '${u?.host}'.`, code: 1141 };
  const have = x.grants[on] || [];
  if (g[1].toUpperCase() === 'GRANT') x.grants[on] = privs.includes('ALL PRIVILEGES') || have.includes('ALL PRIVILEGES') ? ['ALL PRIVILEGES'] : [...new Set([...have, ...privs])];
  else {
    if (!have.length || (!privs.includes('ALL PRIVILEGES') && !have.includes('ALL PRIVILEGES') && privs.some(p => !have.includes(p)))) return { error: `There is no such grant defined for user '${x.name}' on host '${x.host}' on ${on}.`, code: 1141 };
    x.grants[on] = privs.includes('ALL PRIVILEGES') ? [] : have.includes('ALL PRIVILEGES') ? SQL_PRIVS.filter(p => !privs.includes(p)) : have.filter(p => !privs.includes(p));
  }
  return { ok: true };
}

// ===== SELECT: tabel/view, JOIN, subquery, ekspresi, agregat, GROUP BY, HAVING, ORDER BY, LIMIT, UNION =====
const SQL_KEYWORDS = new Set(['join', 'inner', 'left', 'right', 'outer', 'cross', 'on', 'where', 'group', 'having', 'order', 'limit', 'as', 'using', 'natural', 'union']);
function sqlResolver(cols) {
  return ref => {
    const [a, b] = ref.toLowerCase().split('.');
    const hits = cols.map((c, i) => (b ? c.from === a && c.name === b : c.name === a) ? i : -1).filter(i => i >= 0);
    if (hits.length > 1) return { error: `Column '${ref}' is ambiguous. Kolom ${a} ada di lebih dari satu tabel; tulis nama tabel atau aliasnya di depan, misalnya ${cols[hits[0]].from}.${a}.`, code: 1052 };
    return hits.length ? hits[0] : -1;
  };
}
// 1052 menyebut klausanya: MariaDB (modul) "in SELECT", MySQL "in field list"
const sqlAmb = (e, maria, mysql) => e && e.code === 1052 ? { ...e, error: e.error.replace(/^(Column '[^']+') is ambiguous/, `$1 in ${sqlMaria() ? maria : mysql} is ambiguous`) } : e;
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
  // Tabel biasa, atau view yang dijalankan dulu query-nya
  const load = ref => {
    const t = schema.tables.find(x => x.name === ref.name);
    if (t) return t;
    const v = (schema.views || []).find(x => x.name === ref.name);
    if (!v) return { error: `Table '${schema.name}.${ref.name}' doesn't exist. Tabel itu belum dibuat atau namanya salah ketik.`, code: 1146 };
    const q = sqlQuery(schema, v.sql);
    if (q.error) return { error: `View '${v.name}' tidak bisa dijalankan: ${q.error}`, code: 1356 };
    return { name: v.name, columns: q.labels.map(l => ({ name: l.toLowerCase(), type: 'view' })), rows: q.rows };
  };
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
    let on = null;
    const head = /^\s+ON\s+/i.exec(rest);
    if (head) {
      let depth = 0, quote = false, end = rest.length;
      for (let k = head[0].length; k < rest.length; k++) {
        const ch = rest[k];
        if (ch === "'") quote = !quote;
        if (quote) continue;
        if (ch === '(') depth++;
        else if (ch === ')') depth--;
        else if (!depth && (ch === ',' || (/\s/.test(ch) && /^\s+(?:(?:INNER|CROSS|LEFT|RIGHT)(?:\s+OUTER)?\s+)?JOIN\b/i.test(rest.slice(k))))) { end = k; break; }
      }
      on = rest.slice(head[0].length, end).trim();
      rest = rest.slice(end);
    } else if (kind === 'LEFT' || kind === 'RIGHT') return { error: `${kind} JOIN wajib diikuti ON, misalnya ON p.id_buku = b.id_buku.`, code: 1064 };
    const right = t2.columns.map(c => ({ ...c, from: ref.alias })), all = cols.concat(right);
    const test = on ? sqlWhere(on, sqlResolver(all), i => all[i], schema) : () => true;
    if (test.error) return sqlAmb(test, 'ON', 'on clause');
    const emptyLeft = cols.map(() => null), emptyRight = right.map(() => null), out = [];
    // LEFT: semua baris kiri tetap muncul; RIGHT: semua baris kanan tetap muncul; pasangan yang tidak ada diisi NULL
    if (kind === 'RIGHT') t2.rows.forEach(r => { const hit = rows.filter(l => test(l.concat(r))); if (hit.length) hit.forEach(l => out.push(l.concat(r))); else out.push(emptyLeft.concat(r)); });
    else rows.forEach(l => { const hit = t2.rows.filter(r => test(l.concat(r))); if (hit.length) hit.forEach(r => out.push(l.concat(r))); else if (kind === 'LEFT') out.push(l.concat(emptyRight)); });
    cols = all; rows = out;
  }
  return { cols, rows };
}
// Fungsi agregat: COUNT(*), COUNT([DISTINCT] ekspresi), SUM, AVG, MIN, MAX
function sqlAgg(raw, rowEnv) {
  const m = /^(COUNT|SUM|AVG|MIN|MAX)\s*\(\s*(DISTINCT\s+)?([\s\S]*?)\s*\)$/i.exec(raw.trim());
  if (!m) return { error: `Periksa sintaks di sekitar '${raw}'.`, code: 1064 };
  const fn = m[1].toUpperCase();
  if (m[3] === '*') return fn === 'COUNT' && !m[2] ? { fn, star: true } : { error: `${fn}(*) tidak sah. Tulis nama kolomnya, misalnya ${fn}(ipk).`, code: 1064 };
  if (!m[3]) return { error: `Tulis kolom di dalam ${fn}( ).`, code: 1064 };
  const f = sqlCompile(m[3], { ...rowEnv, agg: () => ({ error: 'Invalid use of group function. Fungsi agregat tidak boleh berada di dalam fungsi agregat lain.', code: 1111 }) });
  if (f.error) return f;
  return { fn, distinct: !!m[2], f: f.fn };
}
function sqlAggRun(agg, rows) {
  if (agg.star) return sqlInt(rows.length);
  let vals = rows.map(agg.f).filter(v => v != null);
  if (agg.distinct) vals = vals.filter((v, i) => vals.findIndex(x => sqlCmp(x, v) === 0) === i);
  if (agg.fn === 'COUNT') return sqlInt(vals.length);
  if (!vals.length) return null;
  if (agg.fn === 'MIN' || agg.fn === 'MAX') return vals.reduce((a, b) => (sqlCmp(b, a) * (agg.fn === 'MIN' ? -1 : 1) > 0 ? b : a));
  const scales = vals.map(sqlScale), free = scales.some(s => s == null), scale = free ? null : Math.max(...scales);
  const sum = vals.reduce((a, v) => a + sqlToNum(v), 0);
  // Seperti MySQL: SUM mempertahankan jumlah desimal, AVG menambah 4 angka di belakang koma
  if (agg.fn === 'SUM') return new SqlNum(sum, scale);
  return new SqlNum(sum / vals.length, free ? null : scale + 4);
}
// Ganti isi kutip dan isi kurung dengan penanda supaya kata kunci di dalam subquery tidak ikut terbaca
function sqlMask(text) {
  const store = [];
  let safe = text.replace(/'(?:''|[^'])*'/g, m => { store.push(m); return `\u0000${store.length - 1}\u0000`; });
  let prev;
  do { prev = safe; safe = safe.replace(/\([^()]*\)/g, m => { store.push(m); return `\u0000${store.length - 1}\u0000`; }); } while (safe !== prev);
  const back = t => { if (t == null) return t; let s = t, before; do { before = s; s = s.replace(/\u0000(\d+)\u0000/g, (m, i) => store[+i]); } while (s !== before); return s; };
  return { safe, back };
}
// Pisahkan alias kolom: "COUNT(*) AS jumlah", "COUNT(*) jumlah", tetapi bukan "harga * stok"
function sqlAlias(raw) {
  let toks;
  try { toks = sqlTokens(raw); } catch (e) { return { expr: raw, alias: '' }; }
  const n = toks.length, last = toks[n - 1], prev = toks[n - 2];
  const isName = t => t && ((t.t === 'id' && !SQL_RESERVED.has(t.v.toUpperCase()) && !['NULL', 'TRUE', 'FALSE'].includes(t.v.toUpperCase()) && !t.v.includes('.')) || t.t === 'qid' || t.t === 'str');
  if (n >= 3 && prev.t === 'id' && prev.v.toUpperCase() === 'AS' && isName(last)) return { expr: raw.slice(0, prev.s).trim(), alias: last.v };
  if (n >= 2 && isName(last) && (prev.t === 'id' || prev.t === 'qid' || prev.t === 'num' || prev.t === 'str' || (prev.t === 'op' && prev.v === ')'))) {
    if (prev.t === 'id' && SQL_RESERVED.has(prev.v.toUpperCase())) return { expr: raw, alias: '' };
    return { expr: raw.slice(0, last.s).trim(), alias: last.v };
  }
  return { expr: raw, alias: '' };
}
const sqlNorm = s => s.replace(/\s+/g, '').toLowerCase();
function sqlQuery(schema, command) {
  const { safe, back } = sqlMask(command.trim());
  // UNION: gabungkan hasil beberapa SELECT (UNION membuang baris kembar, UNION ALL tidak)
  const parts = safe.split(/\s+UNION(\s+ALL)?\s+/i);
  if (parts.length > 1) {
    const pieces = [], alls = [];
    const re = /\s+UNION(\s+ALL)?\s+/gi;
    let mm, last = 0;
    while ((mm = re.exec(safe))) { pieces.push(safe.slice(last, mm.index)); alls.push(!!mm[1]); last = re.lastIndex; }
    pieces.push(safe.slice(last));
    let labels = null, rows = [];
    for (const [k, piece] of pieces.entries()) {
      const q = sqlQuery(schema, back(piece));
      if (q.error) return q;
      if (labels && q.labels.length !== labels.length) return { error: 'The used SELECT statements have a different number of columns. Setiap SELECT dalam UNION harus memilih jumlah kolom yang sama.', code: 1222 };
      labels ||= q.labels;
      rows = rows.concat(q.rows);
      if (k > 0 && !alls[k - 1]) rows = rows.filter((r, i) => rows.findIndex(x => x.map(sqlShow).join('\u0001').toLowerCase() === r.map(sqlShow).join('\u0001').toLowerCase()) === i);
    }
    return { labels, rows };
  }
  const neg = /\sLIMIT\s+(-\d+)/i.exec(safe);
  if (neg) return { error: `You have an error in your SQL syntax near '${neg[1]}'. LIMIT hanya menerima bilangan nol atau lebih.`, code: 1064 };
  const m = /^SELECT\s+(DISTINCT\s+)?([\s\S]+?)(?:\s+FROM\s+([\s\S]+?))?(?:\s+WHERE\s+([\s\S]+?))?(?:\s+GROUP\s+BY\s+([\s\S]+?))?(?:\s+HAVING\s+([\s\S]+?))?(?:\s+ORDER\s+BY\s+([\s\S]+?))?(?:\s+LIMIT\s+(\d+)(?:\s*,\s*(\d+)|\s+OFFSET\s+(\d+))?)?$/i.exec(safe);
  if (!m) return { error: 'Periksa sintaks. Urutan klausa: SELECT … FROM … JOIN … ON … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT …', code: 1064 };
  if (!m[3] && (m[4] || m[5] || m[6])) return { error: 'Tulis FROM nama_tabel sebelum WHERE / GROUP BY / HAVING.', code: 1064 };
  const src = m[3] ? sqlFrom(schema, back(m[3])) : { cols: [], rows: [[]] };
  if (src.error) return src;
  const { cols, rows } = src, resolve = sqlResolver(cols);
  const sub = sql => sqlQuery(schema, sql);
  // Pesan 1054 menyebut klausanya: MariaDB (modul) 'SELECT'/'WHERE'/…, MySQL 'field list'/'where clause'/…
  const unk = (maria, mysql) => name => `Unknown column '${name}' in '${sqlMaria() ? maria : mysql}'. Kolom ini tidak ada di tabel yang disebut pada FROM/JOIN; periksa ejaannya dengan DESCRIBE. Kalau maksudnya teks, apit dengan kutip tunggal.`;
  const unknown = unk('SELECT', 'field list');
  // Lingkungan baris mentah (hasil FROM/JOIN); get(r) dengan r = array sel
  const rowEnv = {
    ref: name => { const i = resolve(name); return typeof i === 'object' ? i : i < 0 ? null : { get: r => sqlCell(r[i], cols[i]) }; },
    agg: () => ({ error: 'Invalid use of group function. Fungsi agregat (COUNT, SUM, AVG, MIN, MAX) tidak boleh di WHERE; pakai HAVING setelah GROUP BY.', code: 1111 }),
    sub, unknown
  };
  for (const g of m[5] ? sqlSplitTop(back(m[5])) : []) if (!/^[a-z_][\w.]*$/i.test(g) && !/\(/.test(g)) return { error: `Periksa sintaks di sekitar '${g}'. Urutan klausa: … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT …`, code: 1064 };
  // Daftar kolom hasil
  const items = [];
  for (const raw of sqlSplitTop(back(m[2]))) {
    if (raw === '*' || /^[a-z_]\w*\.\*$/i.test(raw)) {
      if (!m[3]) return { error: 'SELECT * butuh FROM nama_tabel.', code: 1064 };
      const from = raw === '*' ? null : raw.slice(0, -2).toLowerCase();
      const list = cols.map((c, i) => [c, i]).filter(([c]) => !from || c.from === from);
      if (!list.length) return { error: `Unknown table '${from}'.`, code: 1051 };
      list.forEach(([c, i]) => items.push({ expr: `${c.from}.${c.name}`, label: c.name, alias: '', star: true }));
      continue;
    }
    const { expr, alias } = sqlAlias(raw);
    items.push({ expr, label: alias || (/^[a-z_]\w*\.[a-z_]\w*$/i.test(expr) ? expr.split('.').pop() : expr), alias: alias.toLowerCase() });
  }
  const where = m[4] ? sqlCompile(back(m[4]), { ...rowEnv, bare: true, unknown: unk('WHERE', 'where clause') }) : { fn: () => sqlInt(1) };
  if (where.error) return sqlAmb(where, 'WHERE', 'where clause');
  const base = rows.filter(r => sqlTruth(where.fn(r)) === true);
  // Apakah ini query berkelompok? (ada GROUP BY, HAVING, atau fungsi agregat di daftar kolom)
  let usesAgg = false;
  const probe = { ref: () => ({ get: () => null }), agg: () => { usesAgg = true; return { get: () => null }; }, sub, unknown };
  for (const it of items) { const f = sqlCompile(it.expr, probe); if (f.error) return f; }
  const order = m[7] ? sqlSplitTop(back(m[7])).map(part => { const o = /^([\s\S]+?)(?:\s+(ASC|DESC))?$/i.exec(part); return { text: o[1].trim(), dir: /DESC/i.test(o[2] || '') ? -1 : 1 }; }) : [];
  let out;
  if (m[5] || m[6] || usesAgg) {
    // Kunci GROUP BY: nama kolom, alias kolom hasil, atau ekspresi
    const keys = [];
    for (const g of m[5] ? sqlSplitTop(back(m[5])) : []) {
      const named = items.find(it => it.alias && it.alias === g.toLowerCase());
      const text = named ? named.expr : g;
      const f = sqlCompile(text, rowEnv);
      if (f.error) return f;
      const i = /^[a-z_]\w*(?:\.[a-z_]\w*)?$/i.test(text) ? resolve(text) : -1;
      keys.push({ f: f.fn, col: typeof i === 'number' ? i : -1, norm: sqlNorm(text) });
    }
    const extras = [];
    const extra = e => { extras.push(e); const k = extras.length - 1; return { get: c => c.ext[k] }; };
    // Lingkungan per kelompok: kolom hanya boleh bila ikut GROUP BY; fungsi agregat dihitung per kelompok
    const groupEnv = message => ({
      ref: name => {
        const i = resolve(name);
        if (typeof i === 'object' || i < 0) return i < 0 ? null : i;
        const k = keys.findIndex(x => x.col === i || x.norm === sqlNorm(name) || x.norm === sqlNorm(cols[i].name));
        if (k < 0 && sqlMaria()) return extra({ first: i });
        if (k < 0) return { error: message(name), code: m[5] ? 1055 : 1140 };
        return extra({ key: k });
      },
      agg: raw => { const a = sqlAgg(raw, rowEnv); return a.error ? a : extra({ agg: a }); },
      sub, unknown
    });
    const itemEnv = groupEnv(name => m[5]
      ? `Kolom '${name.split('.').pop()}' tidak ada di GROUP BY. Setiap kolom biasa di SELECT harus ikut ditulis di GROUP BY (aturan ONLY_FULL_GROUP_BY).`
      : `Kolom '${name.split('.').pop()}' dicampur dengan fungsi agregat tanpa GROUP BY. Tambahkan GROUP BY ${name.split('.').pop()}.`);
    for (const it of items) {
      const k = keys.findIndex(x => x.norm === sqlNorm(it.expr));
      if (k >= 0 && !it.star) { it.get = extra({ key: k }).get; continue; }
      const f = sqlCompile(it.expr, itemEnv);
      if (f.error) return sqlAmb(f, 'SELECT', 'field list');
      it.get = f.fn;
    }
    // HAVING dan ORDER BY boleh memakai alias kolom hasil
    const lateEnv = { ...groupEnv(name => `Kolom '${name}' tidak ada di GROUP BY, jadi tidak bisa dipakai di HAVING atau ORDER BY.`) };
    const baseRef = lateEnv.ref;
    lateEnv.ref = name => { const j = items.findIndex(it => it.alias && it.alias === name.toLowerCase()); return j >= 0 ? { get: c => c.out[j] } : baseRef(name); };
    const having = m[6] ? sqlCompile(back(m[6]), lateEnv) : { fn: () => sqlInt(1) };
    if (having.error) return { ...having, code: having.code === 1055 ? 1054 : having.code };
    const keysOrder = [];
    for (const o of order) {
      if (/^\d+$/.test(o.text)) { const n = +o.text; if (n < 1 || n > items.length) return { error: `Unknown column '${n}' in 'order clause'.`, code: 1054 }; keysOrder.push({ get: c => c.out[n - 1], dir: o.dir }); continue; }
      const f = sqlCompile(o.text, lateEnv);
      if (f.error) return { ...f, code: f.code === 1055 ? 1054 : f.code };
      keysOrder.push({ get: f.fn, dir: o.dir });
    }
    const map = new Map();
    for (const r of base) {
      const vals = keys.map(k => k.f(r));
      const id = JSON.stringify(vals.map(v => v == null ? null : String(v).toLowerCase()));
      if (!map.has(id)) map.set(id, { rows: [], keyVals: vals });
      map.get(id).rows.push(r);
    }
    const groups = keys.length ? [...map.values()] : [{ rows: base, keyVals: [] }];
    let ctxs = groups.map(g => {
      const c = { ext: extras.map(e => e.agg ? sqlAggRun(e.agg, g.rows) : e.first !== undefined ? (g.rows.length ? sqlCell(g.rows[0][e.first], cols[e.first]) : null) : g.keyVals[e.key]) };
      c.out = items.map(it => it.get(c));
      return c;
    }).filter(c => sqlTruth(having.fn(c)) === true);
    if (keysOrder.length) ctxs = ctxs.map(c => ({ c, k: keysOrder.map(o => o.get(c)) })).sort((a, b) => { for (const [i, o] of keysOrder.entries()) { const d = sqlSortCmp(a.k[i], b.k[i]); if (d) return d * o.dir; } return 0; }).map(x => x.c);
    out = ctxs.map(c => c.out);
  } else {
    for (const it of items) { const f = sqlCompile(it.expr, rowEnv); if (f.error) return sqlAmb(f, 'SELECT', 'field list'); it.get = f.fn; }
    const entries = base.map(r => ({ r, out: items.map(it => it.get(r)) }));
    // ORDER BY: alias / nomor kolom hasil, atau ekspresi apa pun pada baris sumber
    const keysOrder = [];
    for (const o of order) {
      if (/^\d+$/.test(o.text)) { const n = +o.text; if (n < 1 || n > items.length) return { error: `Unknown column '${n}' in 'order clause'.`, code: 1054 }; keysOrder.push({ get: e => e.out[n - 1], dir: o.dir }); continue; }
      const j = items.findIndex(it => it.alias && it.alias === o.text.toLowerCase());
      if (j >= 0) { keysOrder.push({ get: e => e.out[j], dir: o.dir }); continue; }
      if (!/^[\s\S]*[a-z_0-9')]$/i.test(o.text) || /\s(?:WHERE|FROM|GROUP|HAVING|LIMIT)\s/i.test(' ' + o.text + ' ')) return { error: `Periksa sintaks di sekitar '${o.text}'. Urutan klausa: … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT …`, code: 1064 };
      const f = sqlCompile(o.text, { ...rowEnv, unknown: unk('ORDER BY', 'order clause') });
      if (f.error) return f.code === 1064 ? { error: `Periksa sintaks di sekitar '${o.text}'. Urutan klausa: … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT …`, code: 1064 } : f;
      keysOrder.push({ get: e => f.fn(e.r), dir: o.dir });
    }
    const sorted = keysOrder.length ? entries.map(e => ({ e, k: keysOrder.map(o => o.get(e)) })).sort((a, b) => { for (const [i, o] of keysOrder.entries()) { const d = sqlSortCmp(a.k[i], b.k[i]); if (d) return d * o.dir; } return 0; }).map(x => x.e) : entries;
    out = sorted.map(e => e.out);
  }
  if (m[1]) out = out.filter((r, i) => out.findIndex(x => x.map(sqlShow).join('\u0001').toLowerCase() === r.map(sqlShow).join('\u0001').toLowerCase()) === i);
  if (m[8]) { const offset = m[9] !== undefined ? +m[8] : +(m[10] || 0), count = m[9] !== undefined ? +m[9] : +m[8]; out = out.slice(offset, offset + count); }
  // meta: kolom asal untuk item yang berupa kolom polos (dipakai CREATE TABLE … AS SELECT), selain itu null
  const meta = items.map(it => { const i = /^[a-z_]\w*(?:\.[a-z_]\w*)?$/i.test(it.expr) ? resolve(it.expr) : -1; return typeof i === 'number' && i >= 0 ? cols[i] : null; });
  return { labels: items.map(it => it.label), rows: out, meta };
}
