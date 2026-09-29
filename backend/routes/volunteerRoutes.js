const express = require('express');
const router = express.Router();
const {
  submitVolunteer,
  getAllVolunteers,
  updateVolunteerStatus,
} = require('../controllers/volunteerController');
const { authenticateAdmin } = require('../middleware/authMiddleware');

// Public route: submit volunteer application
router.post('/', submitVolunteer);

// Admin protected route: list all volunteers
router.get('/', authenticateAdmin, getAllVolunteers);

// Admin protected route: update volunteer status
router.patch('/:id/status', authenticateAdmin, updateVolunteerStatus);

module.exports = router;
