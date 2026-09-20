const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, checkEmail } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/check-email', checkEmail);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
