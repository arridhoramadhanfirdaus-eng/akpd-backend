const db = require('../db');

exports.findByUsername = async (username) => {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

exports.create = async (username, password, role) => {
  const [result] = await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role]);
  return result.insertId;
};

exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

exports.updatePassword = async (id, hashed) => {
  await db.query('UPDATE users SET password = ? WHERE id = ?', [hashed, id]);
};