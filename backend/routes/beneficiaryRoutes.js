const express = require('express');
const router = express.Router();
const {
  getAllBeneficiaries,
  addBeneficiary,
  updateBeneficiaryStatus,
} = require('../controllers/beneficiaryController');
const { authenticateAdmin } = require('../middleware/authMiddleware');

// All beneficiary routes are protected by admin authentication
router.get('/', authenticateAdmin, getAllBeneficiaries);
router.post('/', authenticateAdmin, addBeneficiary);
router.patch('/:id/status', authenticateAdmin, updateBeneficiaryStatus);

module.exports = router;
