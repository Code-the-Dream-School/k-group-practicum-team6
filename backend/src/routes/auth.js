const express = require('express');
const router = express.Router();
const authenticateUser = require("../middleware/authentication");

const { register, login, logout, me } = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticateUser, me);

module.exports = router;