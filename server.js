const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const soalRoutes = require('./routes/soalRoutes');
const latihanRoutes = require('./routes/latihanRoutes');
const nilaiRoutes = require('./routes/nilaiRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/soal', soalRoutes);
app.use('/api/latihan', latihanRoutes);
app.use('/api/nilai', nilaiRoutes);

app.get("/", (req, res) => {
  res.send("API aktif ✅");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Backend berjalan di port ${PORT}`));
