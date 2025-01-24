const sqlite3 = require('sqlite3').verbose();

function connect_to_db(dbpath) {
  let db = new sqlite3.Database(dbpath, (err) => {
      if (err) {
        throw new Error("Failed to connect to the database");
      }
      else {
        if (dbpath === ':memory:') {
          console.log("Connected to an in-memory SQLite database.");
        } else {
          console.log(`Connected to SQLite database at ${dbpath}`);
        }
      }
    });
  
  db.serialize(() => {
    // Create tables
    
    db.run(`
      CREATE TABLE IF NOT EXISTS query(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullname TEXT NOT NULL,
        mobileno INTEGER NOT NULL,
        message TEXT NOT NULL,
        resolved INTEGER DEFAULT 0
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS user(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullname TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS news(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS admission(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullname TEXT NOT NULL,
        mobileno INTEGER NOT NULL,
        course TEXT NOT NULL,
        registerat TEXT NOT NULL
      )
    `);
  });

  return db;
}

function runAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
}

function getAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function allAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// Get the database path from .env, default to ':memory:' if not provided
const db_path = process.env.DB_PATH || ':memory:';
const db = connect_to_db(db_path);
module.exports = {
  runAsync,
  getAsync,
  allAsync
};
