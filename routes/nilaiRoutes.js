const express = require('express');
const router = express.Router();
const nilaiController = require('../controllers/nilaiController');
const auth = require('../middleware/auth');

router.get('/rekap', auth, nilaiController.getRekapNilai);

router.delete('/:id', auth, nilaiController.deleteNilai);

module.exports = router;
