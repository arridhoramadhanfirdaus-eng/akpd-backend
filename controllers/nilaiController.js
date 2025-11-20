const Nilai = require('../models/nilaiModel');

exports.getRekapNilai = async (req, res) => {
  try {
    const data = await Nilai.rekapNilai();
    res.json(data); // data bisa [] kalau tidak ada jawaban
  } catch (err) {
    console.error('Error rekap nilai:', err);
    res.status(500).json({ message: "Gagal memuat rekap nilai" });
  }
};

exports.deleteNilai = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Nilai.deleteById(id);   // kita buat di model

    if (!deleted) {
      return res.status(404).json({ message: "Nilai tidak ditemukan" });
    }

    res.json({ message: "Nilai berhasil dihapus" });
  } catch (err) {
    console.error("Error delete nilai:", err);
    res.status(500).json({ message: "Gagal menghapus nilai" });
  }
};