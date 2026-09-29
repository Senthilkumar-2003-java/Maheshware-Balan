const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  updateContactStatus,
} = require('../controllers/contactController');
const { authenticateAdmin } = require('../middleware/authMiddleware');

// Public route: submit contact message
router.post('/', submitContact);

// Admin protected route: list all contact inquiries
router.get('/', authenticateAdmin, getAllContacts);

// Admin protected route: update contact status
router.patch('/:id/status', authenticateAdmin, updateContactStatus);

module.exports = router;
