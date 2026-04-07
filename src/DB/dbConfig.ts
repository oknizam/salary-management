import Database from "better-sqlite3";
import path from "path";

export const db = new Database(path.resolve(__dirname, "./database.sqlite"));

export const initDB = () => {
  db.prepare(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    jobTitle TEXT NOT NULL,
    country TEXT NOT NULL,
    salary REAL NOT NULL
  )
`).run();
}