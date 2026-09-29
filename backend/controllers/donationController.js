const { getPool } = require('../config/db');

async function createDonation(req, res) {
  try {
    const {
      donor_name,
      email,
      phone,
      pan_number = null,
      amount,
      cause = 'General Support',
      payment_method = 'UPI',
      notes = null,
    } = req.body;

    if (!donor_name || !email || !phone || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone and amount are required.',
      });
    }

    const transaction_id = 'TXN_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    const pool = getPool();

    if (!pool) {
      return res.status(503).json({
        success: false,
        message: 'Database service is currently unreachable. Please verify MySQL service.',
      });
    }

    const [result] = await pool.query(
      `INSERT INTO donations (donor_name, email, phone, pan_number, amount, cause, payment_method, transaction_id, status, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Completed', ?)`,
      [donor_name, email, phone, pan_number, parseFloat(amount), cause, payment_method, transaction_id, notes]
    );

    return res.status(201).json({
      success: true,
      message: 'Donation recorded successfully. Thank you for your generous support!',
      donationId: result.insertId,
      transaction_id,
    });
  } catch (error) {
    console.error('Create donation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to record donation in database.',
    });
  }
}

async function getAllDonations(req, res) {
  try {
    const pool = getPool();

    if (!pool) {
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable.',
        donations: [],
      });
    }

    const [rows] = await pool.query('SELECT * FROM donations ORDER BY created_at DESC');
    return res.status(200).json({
      success: true,
      count: rows.length,
      donations: rows,
    });
  } catch (error) {
    console.error('Get donations error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch donations from database.',
      donations: [],
    });
  }
}

async function getDonationStats(req, res) {
  try {
    const pool = getPool();

    if (!pool) {
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable.',
        stats: null,
      });
    }

    const [[totalRow]] = await pool.query(
      'SELECT COALESCE(SUM(amount), 0) as totalRaised, COUNT(id) as totalDonations FROM donations'
    );
    const [causeBreakdown] = await pool.query(
      'SELECT cause, COUNT(id) as count, SUM(amount) as total FROM donations GROUP BY cause'
    );
    const [[volunteerRow]] = await pool.query('SELECT COUNT(id) as count FROM volunteers');
    const [[contactRow]] = await pool.query('SELECT COUNT(id) as count FROM contacts');
    const [[beneficiaryRow]] = await pool.query('SELECT COUNT(id) as count FROM beneficiaries');

    return res.status(200).json({
      success: true,
      stats: {
        totalRaised: Number(totalRow.totalRaised) || 0,
        totalDonations: Number(totalRow.totalDonations) || 0,
        causeBreakdown: causeBreakdown || [],
        totalVolunteers: Number(volunteerRow.count) || 0,
        totalContacts: Number(contactRow.count) || 0,
        totalBeneficiaries: Number(beneficiaryRow.count) || 0,
      },
    });
  } catch (error) {
    console.error('Stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to calculate stats.',
      stats: null,
    });
  }
}

module.exports = {
  createDonation,
  getAllDonations,
  getDonationStats,
};
