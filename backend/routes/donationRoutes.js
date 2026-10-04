const express = require('express');
const router = express.Router();
const {
  createDonation,
  getAllDonations,
  getDonationStats,
  getRazorpayKey,
} = require('../controllers/donationController');
const { authenticateAdmin } = require('../middleware/authMiddleware');

// Public route: get Razorpay Key ID
router.get('/razorpay-key', getRazorpayKey);

// Public route: submit donation
router.post('/', createDonation);

// Public or Admin stats
router.get('/stats', getDonationStats);

// Admin protected route: list all donations
router.get('/', authenticateAdmin, getAllDonations);

module.exports = router;
