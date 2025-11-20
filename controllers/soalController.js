const Soal = require('../models/soalModel');

exports.getSoalByTipe = async (req, res) => {
  const tipe = req.params.tipe;
  const soalArr = await Soal.findAllByTipe(tipe); // HARUS array semua soal!
  res.json(soalArr); // langsung array!
};


exports.addSoal = async (req, res) => {
  const id = await Soal.create(req.body);
  res.json({ id });
};

exports.editSoal = async (req, res) => {
  await Soal.update(req.params.id, req.body);
  res.json({ message: 'Updated' });
};

exports.deleteSoal = async (req, res) => {
  await Soal.delete(req.params.id);
  res.json({ message: 'Deleted' });
};
