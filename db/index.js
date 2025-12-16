const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, '..', 'data', 'phone-shop.db');
const db = new sqlite3.Database(DB_PATH);

db.exec('PRAGMA foreign_keys = ON;');

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

async function getActiveProducts() {
  return all("SELECT * FROM products WHERE is_active = 1 ORDER BY brand, name");
}

module.exports = {
  db,
  getActiveProducts
}；
