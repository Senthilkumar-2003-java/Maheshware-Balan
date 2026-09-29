const { getPool } = require('../config/db');

async function getAllBeneficiaries(req, res) {
  try {
    const pool = getPool();
    if (!pool) {
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable.',
        beneficiaries: [],
      });
    }

    const [rows] = await pool.query('SELECT * FROM beneficiaries ORDER BY created_at DESC');
    return res.status(200).json({
      success: true,
      count: rows.length,
      beneficiaries: rows,
    });
  } catch (error) {
    console.error('Get beneficiaries error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch beneficiaries from database.',
      beneficiaries: [],
    });
  }
}

async function addBeneficiary(req, res) {
  try {
    const { full_name, program_area, location = 'Tamil Nadu', assistance_amount = 0, status = 'Pending', notes = '' } = req.body;

    if (!full_name || !program_area) {
      return res.status(400).json({
        success: false,
        message: 'Name and program area are required.',
      });
    }

    const pool = getPool();
    if (!pool) {
      return res.status(503).json({
        success: false,
        message: 'Database service unavailable.',
      });
    }

    const [result] = await pool.query(
      'INSERT INTO beneficiaries (full_name, program_area, location, assistance_amount, status, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [full_name, program_area, location, parseFloat(assistance_amount) || 0, status, notes]
    );

    return res.status(201).json({
      success: true,
      message: 'Beneficiary enrolled successfully in database.',
      beneficiaryId: result.insertId,
    });
  } catch (error) {
    console.error('Add beneficiary error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to add beneficiary.',
    });
  }
}

async function updateBeneficiaryStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const pool = getPool();
    if (!pool) {
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable.',
      });
    }

    await pool.query('UPDATE beneficiaries SET status = ? WHERE id = ?', [status, id]);

    return res.status(200).json({
      success: true,
      message: 'Beneficiary status updated successfully.',
    });
  } catch (error) {
    console.error('Update beneficiary status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update beneficiary status.',
    });
  }
}

module.exports = {
  getAllBeneficiaries,
  addBeneficiary,
  updateBeneficiaryStatus,
};
