const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findByUsername(username);
  if (!user) return res.status(401).json({ message: 'User tidak ditemukan' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Password salah' });
  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
};

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  // Cek user sudah ada atau belum
  const user = await User.findByUsername(username);
  if (user) return res.status(400).json({ message: 'Username sudah digunakan' });
  // Hash password
  const hashed = await bcrypt.hash(password, 10);
  // Simpan ke DB
  const userId = await User.create(username, hashed, role);
  res.json({ 
    message: "Register berhasil", 
    user: { id: userId, username, role }
  });
};

exports.gantiPassword = async (req, res) => {
  try {
    const { passwordLama, passwordBaru } = req.body;
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    // Tambahkan pengecekan!
    if (!passwordLama || !passwordBaru) {
      return res.status(400).json({ message: "Password lama & baru wajib diisi" });
    }

    // Kalau user.password undefined, error pasti terjadi di sini
    const match = await bcrypt.compare(passwordLama, user.password);
    if (!match) return res.status(400).json({ message: "Password lama salah" });

    const hashed = await bcrypt.hash(passwordBaru, 10);
    await User.updatePassword(userId, hashed);
    res.json({ message: "Password berhasil diubah!" });
  } catch (err) {
    console.error('Ganti password error:', err);
    res.status(500).json({ message: "Gagal ganti password", err });
  }
};

