const express = require('express');
const router = express.Router();
const { loginAdmin, verifyToken } = require('../controllers/authController');
const { authenticateAdmin } = require('../middleware/authMiddleware');

// POST /api/auth/login
router.post('/login', loginAdmin);

// GET /api/auth/verify
router.get('/verify', authenticateAdmin, verifyToken);

module.exports = router;

