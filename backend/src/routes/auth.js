const express = require('express');
const router = express.Router();
const authenticateUser = require("../middleware/authentication");

const { register, login, logout, me, forgotPassword } = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticateUser, me);
router.route("/forgotPassword").post(forgotPassword);

module.exports = router;