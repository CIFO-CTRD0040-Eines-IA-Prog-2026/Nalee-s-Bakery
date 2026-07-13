const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

let db = null;

async function getDb() {
  if (db) return db;

  const SQL = await initSqlJs();
  const dbPath = path.resolve(process.env.DB_PATH || path.join(__dirname, '..', 'data', 'nalees_bakery.db'));
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run('PRAGMA foreign_keys = ON');

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    lang TEXT NOT NULL DEFAULT 'es',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS cookies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    name_es TEXT NOT NULL,
    name_en TEXT NOT NULL,
    desc_es TEXT NOT NULL,
    desc_en TEXT NOT NULL,
    price REAL NOT NULL,
    image TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    subtotal REAL NOT NULL,
    discount REAL NOT NULL DEFAULT 0,
    total REAL NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS order_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    cookie_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price REAL NOT NULL,
    subtotal REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (cookie_id) REFERENCES cookies(id)
  )`);

  const countResult = db.exec('SELECT COUNT(*) AS count FROM cookies');
  if (!countResult[0] || countResult[0].values[0][0] === 0) {
    const seed = [
      ['avena', 'Avena', 'Oatmeal', 'Galleta de avena con pasas y un toque de canela', 'Oatmeal cookie with raisins and a hint of cinnamon', 2.50, 'avena.jpg'],
      ['chocolate-chips', 'Chocolate Chips', 'Chocolate Chips', 'Galleta clásica con pepitas de chocolate', 'Classic cookie with chocolate chunks', 2.50, 'chocolate-chips.jpg'],
      ['red-velvet', 'Red Velvet', 'Red Velvet', 'Galleta suave de cacao con cobertura de queso', 'Soft cocoa cookie with cream cheese topping', 3.00, 'red-velvet.jpg'],
      ['mantequilla', 'Mantequilla', 'Butter', 'Galleta de mantequilla tradicional, crujiente y suave', 'Traditional butter cookie, crispy and soft', 2.00, 'mantequilla.jpg'],
      ['jengibre', 'Jengibre', 'Ginger', 'Galleta espejada de jengibre con un toque de canela', 'Spiced ginger cookie with a touch of cinnamon', 2.50, 'jengibre.jpg'],
      ['peanut-butter', 'Peanut Butter', 'Peanut Butter', 'Galleta cremosa de cacahuete', 'Creamy peanut butter cookie', 3.00, 'peanut-butter.jpg']
    ];
    const insertStmt = db.prepare(`INSERT INTO cookies (slug, name_es, name_en, desc_es, desc_en, price, image) VALUES (?, ?, ?, ?, ?, ?, ?)`);
    for (const row of seed) {
      insertStmt.bind(row);
      insertStmt.step();
      insertStmt.reset();
    }
    insertStmt.free();
  }

  const buf = db.export();
  fs.writeFileSync(dbPath, buf);

  return db;
}

function rowsFromExec(results) {
  if (!results || results.length === 0) return [];
  const { columns, values } = results[0];
  return values.map(vals => {
    const row = {};
    for (let i = 0; i < columns.length; i++) {
      row[columns[i]] = vals[i];
    }
    return row;
  });
}

class PoolWrapper {
  async query(sql, params = []) {
    const database = await getDb();
    const trimmed = sql.trim();
    const upper = trimmed.toUpperCase();

    if (upper.startsWith('SELECT') || upper.startsWith('WITH')) {
      const stmt = database.prepare(trimmed);
      if (params.length > 0) stmt.bind(params);
      const rows = [];
      while (stmt.step()) {
        rows.push(stmt.getAsObject());
      }
      stmt.free();
      return [rows];
    }

    database.run(trimmed, params);

    if (upper.startsWith('INSERT')) {
      const lastIdResult = database.exec('SELECT last_insert_rowid() AS id');
      const changesResult = database.exec('SELECT changes() AS changes');
      const insertId = lastIdResult[0] ? lastIdResult[0].values[0][0] : 0;
      const affectedRows = changesResult[0] ? changesResult[0].values[0][0] : 0;
      return [{ insertId: Number(insertId), affectedRows }];
    }

    const changesResult = database.exec('SELECT changes() AS changes');
    const affectedRows = changesResult[0] ? changesResult[0].values[0][0] : 0;
    return [{ affectedRows }];
  }

  async getConnection() {
    const database = await getDb();
    return new TransactionConnection(database);
  }

  async exec(sql) {
    const database = await getDb();
    return database.exec(sql);
  }
}

class TransactionConnection {
  constructor(database) {
    this.db = database;
    this.db.run('BEGIN');
    this._released = false;
  }

  query(sql, params = []) {
    const trimmed = sql.trim();
    const upper = trimmed.toUpperCase();

    if (upper.startsWith('SELECT') || upper.startsWith('WITH')) {
      const stmt = this.db.prepare(trimmed);
      if (params.length > 0) stmt.bind(params);
      const rows = [];
      while (stmt.step()) {
        rows.push(stmt.getAsObject());
      }
      stmt.free();
      return [rows];
    }

    this.db.run(trimmed, params);

    if (upper.startsWith('INSERT')) {
      const lastIdResult = this.db.exec('SELECT last_insert_rowid() AS id');
      const changesResult = this.db.exec('SELECT changes() AS changes');
      const insertId = lastIdResult[0] ? lastIdResult[0].values[0][0] : 0;
      const affectedRows = changesResult[0] ? changesResult[0].values[0][0] : 0;
      return [{ insertId: Number(insertId), affectedRows }];
    }

    const changesResult = this.db.exec('SELECT changes() AS changes');
    const affectedRows = changesResult[0] ? changesResult[0].values[0][0] : 0;
    return [{ affectedRows }];
  }

  commit() {
    if (!this._released) { this.db.run('COMMIT'); this._released = true; }
  }

  rollback() {
    if (!this._released) { this.db.run('ROLLBACK'); this._released = true; }
  }

  release() {
    if (!this._released) { this.db.run('ROLLBACK'); this._released = true; }
  }
}

let poolInstance = null;
function getPool() {
  if (!poolInstance) poolInstance = new PoolWrapper();
  return poolInstance;
}

module.exports = getPool();
