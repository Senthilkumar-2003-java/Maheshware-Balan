const express = require('express');
const router = express.Router();
const {
  createDonation,
  getAllDonations,
  getDonationStats,
} = require('../controllers/donationController');
const { authenticateAdmin } = require('../middleware/authMiddleware');

// Public route: submit donation
router.post('/', createDonation);

// Public or Admin stats
router.get('/stats', getDonationStats);

// Admin protected route: list all donations
router.get('/', authenticateAdmin, getAllDonations);

module.exports = router;
