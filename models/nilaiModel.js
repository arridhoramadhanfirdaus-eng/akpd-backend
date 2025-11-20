// models/nilaiModel.js
const db = require('../db');

// 🔎 Dipakai di GET /api/nilai/rekap
exports.rekapNilai = async () => {
  // JOIN ke tabel users, ambil id jawaban & tanggal untuk filter/sort
  const [rows] = await db.query(`
    SELECT 
      MIN(j.id)           AS id,              -- id jawaban (dipakai utk delete)
      u.username          AS nama_mahasiswa,  -- nama/username mahasiswa
      j.tipe              AS tipe,           -- tipe lembar kerja
      SUM(j.skor)         AS total_skor,     -- total skor per user+tipe
      MAX(j.created_at)   AS created_at      -- tanggal terakhir mengerjakan
    FROM jawaban j
    LEFT JOIN users u ON j.user_id = u.id
    WHERE u.role = 'mahasiswa'
    GROUP BY j.user_id, j.tipe, u.username
    ORDER BY nama_mahasiswa, j.tipe
  `);

  return rows || [];
};

// 🗑 Dipakai di DELETE /api/nilai/:id
exports.deleteById = async (id) => {
  const [result] = await db.query(
    'DELETE FROM jawaban WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
};
