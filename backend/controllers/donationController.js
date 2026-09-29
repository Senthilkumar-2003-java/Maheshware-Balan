const { getPool } = require('../config/db');

// In-memory fallback if MySQL is disconnected
let fallbackDonations = [
  { id: 1, donor_name: 'Arun Prakash', email: 'arun@gmail.com', phone: '+91 98401 23456', amount: 50000.00, cause: 'Education Support', payment_method: 'UPI', status: 'Completed', transaction_id: 'TXN_20260901_01', created_at: new Date() },
  { id: 2, donor_name: 'Priya Sundaram', email: 'priya@gmail.com', phone: '+91 87544 11223', amount: 25000.00, cause: 'Cancer Care', payment_method: 'Net Banking', status: 'Completed', transaction_id: 'TXN_20260902_02', created_at: new Date() },
  { id: 3, donor_name: 'Karthik Raja', email: 'karthik@gmail.com', phone: '+91 94431 88990', amount: 10000.00, cause: 'Old Age Support', payment_method: 'Credit Card', status: 'Completed', transaction_id: 'TXN_20260903_03', created_at: new Date() },
  { id: 4, donor_name: 'Deepa Manikandan', email: 'deepa@gmail.com', phone: '+91 91234 56780', amount: 5000.00, cause: 'Leprosy Support', payment_method: 'UPI', status: 'Completed', transaction_id: 'TXN_20260904_04', created_at: new Date() },
  { id: 5, donor_name: 'Manojkumar', email: 'manoj@gmail.com', phone: '+91 97890 12345', amount: 15000.00, cause: 'General Support', payment_method: 'UPI', status: 'Completed', transaction_id: 'TXN_20260905_05', created_at: new Date() },
];

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

    const transaction_id = 'TXN_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    const pool = getPool();

    if (pool) {
      const [result] = await pool.query(
        `INSERT INTO donations (donor_name, email, phone, pan_number, amount, cause, payment_method, transaction_id, status, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Completed', ?)`,
        [donor_name, email, phone, pan_number, amount, cause, payment_method, transaction_id, notes]
      );

      return res.status(201).json({
        success: true,
        message: 'Donation recorded successfully. Thank you for your generous support!',
        donationId: result.insertId,
        transaction_id,
      });
    } else {
      // Fallback
      const newDonation = {
        id: fallbackDonations.length + 1,
        donor_name,
        email,
        phone,
        pan_number,
        amount: parseFloat(amount),
        cause,
        payment_method,
        transaction_id,
        status: 'Completed',
        notes,
        created_at: new Date(),
      };
      fallbackDonations.unshift(newDonation);

      return res.status(201).json({
        success: true,
        message: 'Donation recorded successfully (cached).',
        donationId: newDonation.id,
        transaction_id,
      });
    }
  } catch (error) {
    console.error('Create donation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to record donation.',
    });
  }
}

async function getAllDonations(req, res) {
  try {
    const pool = getPool();

    if (pool) {
      const [rows] = await pool.query('SELECT * FROM donations ORDER BY created_at DESC');
      return res.status(200).json({
        success: true,
        count: rows.length,
        donations: rows,
      });
    } else {
      return res.status(200).json({
        success: true,
        count: fallbackDonations.length,
        donations: fallbackDonations,
      });
    }
  } catch (error) {
    console.error('Get donations error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch donations.',
    });
  }
}

async function getDonationStats(req, res) {
  try {
    const pool = getPool();

    if (pool) {
      const [[totalRow]] = await pool.query(
        'SELECT COALESCE(SUM(amount), 0) as totalRaised, COUNT(id) as totalDonations FROM donations'
      );
      const [causeBreakdown] = await pool.query(
        'SELECT cause, COUNT(id) as count, SUM(amount) as total FROM donations GROUP BY cause'
      );

      return res.status(200).json({
        success: true,
        stats: {
          totalRaised: totalRow.totalRaised,
          totalDonations: totalRow.totalDonations,
          causeBreakdown,
        },
      });
    } else {
      const totalRaised = fallbackDonations.reduce((sum, d) => sum + Number(d.amount), 0);
      return res.status(200).json({
        success: true,
        stats: {
          totalRaised,
          totalDonations: fallbackDonations.length,
          causeBreakdown: [],
        },
      });
    }
  } catch (error) {
    console.error('Stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to calculate stats.',
    });
  }
}

module.exports = {
  createDonation,
  getAllDonations,
  getDonationStats,
};
