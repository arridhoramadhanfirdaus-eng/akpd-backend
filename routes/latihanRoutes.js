const express = require('express');
const router = express.Router();
const latihanController = require('../controllers/latihanController');
const auth = require('../middleware/auth');

router.post('/simpan', auth, latihanController.simpanJawaban);
router.get('/jawaban', auth, latihanController.getJawaban);

module.exports = router;
