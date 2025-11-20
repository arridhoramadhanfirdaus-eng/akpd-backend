const db = require('../db');

exports.findAllByTipe = async (tipe) => {
  const [rows] = await db.query('SELECT * FROM soal WHERE tipe = ?', [tipe]);
  return rows; // ← SEMUA soal untuk tipe itu!
};

exports.getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM soal WHERE id = ?', [id]);
  return rows[0];
};

exports.create = async (data) => {
  const { tipe, soal_json, kolom_json } = data;

  if (kolom_json) {
    // Jika kolom_json dikirim dari frontend
    await db.query(
      "INSERT INTO soal (tipe, soal_json, kolom_json) VALUES (?, ?, ?)",
      [tipe, soal_json, kolom_json]
    );
  } else {
    // Jika tidak ada kolom_json
    await db.query(
      "INSERT INTO soal (tipe, soal_json) VALUES (?, ?)",
      [tipe, soal_json]
    );
  }
};

exports.update = async (id, data) => {
  await db.query('UPDATE soal SET ? WHERE id = ?', [data, id]);
};

exports.delete = async (id) => {
  await db.query('DELETE FROM soal WHERE id = ?', [id]);
};
