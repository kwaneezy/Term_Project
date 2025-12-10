const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DB_DIR, 'phone-shop.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

fs.mkdirSync(DB_DIR, { recursive: true });

const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');
const db = new sqlite3.Database(DB_PATH);

db.exec(schema, (err) => {
  if (err) {
    console.error('Error running schema:', err);
  } else {
    console.log('Database initialized');
  }
  db.close();
});
