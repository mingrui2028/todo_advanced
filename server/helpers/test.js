import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { pool } from "./db.js";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initializeTestDb = () => {
  const sql = fs.readFileSync(path.resolve(__dirname, "../todo.sql"), "utf8");
  pool.query(sql);
};

const insertTestUser = (email, password) => {
  bcrypt.hash(password, 10, (error, hashedPassword) => {
    pool.query("insert into account (email,password) values ($1,$2)", [
      email,
      hashedPassword,
    ]);
  });
};

const getToken = (email) => {
  return jwt.sign({ user: email }, process.env.JWT_SECRET_KEY);
};

export { initializeTestDb, insertTestUser, getToken };
