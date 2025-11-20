const express = require('express');
const router = express.Router();
const soalController = require('../controllers/soalController');
const auth = require('../middleware/auth');

router.get('/:tipe', auth, soalController.getSoalByTipe);
router.post('/', auth, soalController.addSoal);
router.put('/:id', auth, soalController.editSoal);
router.delete('/:id', auth, soalController.deleteSoal);

module.exports = router;
