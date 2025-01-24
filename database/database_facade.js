const sqlite3 = require('sqlite3').verbose();

// Get the database path from .env, default to ':memory:' if not provided
let db = undefined;

async function connect_to_db(dbpath) {
  database = new sqlite3.Database(dbpath, (err) => {
      if (err) {
        console.error(err.message);
        throw new Error("Failed to connect to the database at: " + dbpath);
      }
      else {
        if (dbpath === ':memory:') {
          console.log("Connected to an in-memory SQLite database.");
        } else {
          console.log(`Connected to SQLite database at ${dbpath}`);
        }
      }
    });
  
  database.serialize(() => {
    // Create tables
    
    database.run(`
      CREATE TABLE IF NOT EXISTS query(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullname TEXT NOT NULL,
        mobileno INTEGER NOT NULL,
        message TEXT NOT NULL,
        resolved INTEGER DEFAULT 0
      )
    `);

    database.run(`
      CREATE TABLE IF NOT EXISTS user(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullname TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `);

    database.run(`
      CREATE TABLE IF NOT EXISTS news(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL
      )
    `);

    database.run(`
      CREATE TABLE IF NOT EXISTS admission(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullname TEXT NOT NULL,
        mobileno INTEGER NOT NULL,
        course TEXT NOT NULL,
        registerat TEXT NOT NULL
      )
    `);
  });

  return database;
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

async function setupdatabase(db_path) {
  db = await connect_to_db(db_path);
}

module.exports = {
  setupdatabase,
  runAsync,
  getAsync,
  allAsync
};
