const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const jwtAuth = require('../middleware/auth');

// Endpoint login
router.post('/login', auth.login);
// Endpoint register
router.post('/register', auth.register);
// Endpoint ganti password (TAMBAHKAN INI)
router.post('/change-password', jwtAuth, auth.gantiPassword);

module.exports = router;
