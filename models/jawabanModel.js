const db = require('../db');

// Selalu pastikan 'jawaban' sudah string JSON sebelum simpan.
// Controller bertanggung jawab melakukan JSON.stringify jika perlu.

exports.saveOrUpdate = async (user_id, tipe, jawaban_json, skor) => {
  // Cek dulu apakah sudah pernah mengisi untuk tipe tersebut
  const [rows] = await db.query(
    "SELECT id FROM jawaban WHERE user_id = ? AND tipe = ?", [user_id, tipe]
  );
  if (rows.length) {
    // UPDATE
    await db.query(
      "UPDATE jawaban SET jawaban_json = ?, skor = ?, updated_at = NOW() WHERE user_id = ? AND tipe = ?",
      [jawaban_json, skor, user_id, tipe]
    );
  } else {
    // INSERT
    await db.query(
      "INSERT INTO jawaban (user_id, tipe, jawaban_json, skor, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
      [user_id, tipe, jawaban_json, skor]
    );
  }
};

// Ambil jawaban user tertentu
exports.getJawabanByUser = async (user_id, tipe) => {
  const [rows] = await db.query(
    'SELECT * FROM jawaban WHERE user_id=? AND tipe=?', [user_id, tipe]
  );
  // NOTE: rows is always array, can be empty
  return rows;
};
