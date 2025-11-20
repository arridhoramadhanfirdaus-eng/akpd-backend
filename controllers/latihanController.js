const Jawaban = require('../models/jawabanModel');

// Simpan atau update jawaban
exports.simpanJawaban = async (req, res) => {
  try {
    // Pastikan middleware auth sudah menyisipkan req.user
    const user_id = req.user?.userId;
    if (!user_id) return res.status(401).json({ message: "Unauthorized" });

    const { tipe, jawaban, skor } = req.body;

    // Validasi input
    if (!tipe || !Array.isArray(jawaban)) {
      return res.status(400).json({ message: "Format data salah" });
    }

    // Simpan ke DB (pastikan jawaban disimpan dalam format string JSON)
    await Jawaban.saveOrUpdate(user_id, tipe, JSON.stringify(jawaban), skor);

    res.json({ message: "Jawaban berhasil disimpan!" });
  } catch (err) {
    console.error("Error simpanJawaban:", err); 
    res.status(500).json({ message: "Gagal simpan jawaban", error: err.message });
  }
};

// Ambil jawaban mahasiswa (optional, tergantung kebutuhan)
exports.getJawaban = async (req, res) => {
  try {
    // Bisa juga pakai req.user.userId kalau GET pribadi
    const { user_id, tipe } = req.query;
    if (!user_id || !tipe) {
      return res.status(400).json({ message: "user_id dan tipe harus diisi" });
    }
    const data = await Jawaban.getJawabanByUser(user_id, tipe);
    res.json(data);
  } catch (err) {
    console.error("Error getJawaban:", err);
    res.status(500).json({ message: "Gagal mengambil jawaban" });
  }
};
