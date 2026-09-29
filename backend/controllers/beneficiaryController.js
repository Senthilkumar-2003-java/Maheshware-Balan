const { getPool } = require('../config/db');

let fallbackBeneficiaries = [
  { id: 1, full_name: 'Kavitha S', program_area: 'Education', location: 'Salem, TN', assistance_amount: 12000.00, status: 'Approved', created_at: new Date() },
  { id: 2, full_name: 'Ravi Kumar', program_area: 'Cancer Care', location: 'Madurai, TN', assistance_amount: 45000.00, status: 'Approved', created_at: new Date() },
  { id: 3, full_name: 'Lakshmi Ammal', program_area: 'Elderly Care', location: 'Chennai, TN', assistance_amount: 8000.00, status: 'Pending', created_at: new Date() },
  { id: 4, full_name: 'Selvam P', program_area: 'Leprosy Support', location: 'Trichy, TN', assistance_amount: 15000.00, status: 'Approved', created_at: new Date() },
  { id: 5, full_name: 'Anbu M', program_area: 'Education', location: 'Vellore, TN', assistance_amount: 10000.00, status: 'Rejected', created_at: new Date() },
];

async function getAllBeneficiaries(req, res) {
  try {
    const pool = getPool();
    if (pool) {
      const [rows] = await pool.query('SELECT * FROM beneficiaries ORDER BY created_at DESC');
      return res.status(200).json({
        success: true,
        count: rows.length,
        beneficiaries: rows,
      });
    } else {
      return res.status(200).json({
        success: true,
        count: fallbackBeneficiaries.length,
        beneficiaries: fallbackBeneficiaries,
      });
    }
  } catch (error) {
    console.error('Get beneficiaries error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch beneficiaries.',
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
    if (pool) {
      const [result] = await pool.query(
        'INSERT INTO beneficiaries (full_name, program_area, location, assistance_amount, status, notes) VALUES (?, ?, ?, ?, ?, ?)',
        [full_name, program_area, location, assistance_amount, status, notes]
      );
      return res.status(201).json({
        success: true,
        message: 'Beneficiary enrolled successfully.',
        beneficiaryId: result.insertId,
      });
    } else {
      const newB = {
        id: fallbackBeneficiaries.length + 1,
        full_name,
        program_area,
        location,
        assistance_amount: parseFloat(assistance_amount),
        status,
        notes,
        created_at: new Date(),
      };
      fallbackBeneficiaries.unshift(newB);
      return res.status(201).json({
        success: true,
        message: 'Beneficiary enrolled (cached).',
        beneficiaryId: newB.id,
      });
    }
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
    if (pool) {
      await pool.query('UPDATE beneficiaries SET status = ? WHERE id = ?', [status, id]);
    } else {
      const item = fallbackBeneficiaries.find((b) => b.id === parseInt(id));
      if (item) item.status = status;
    }

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
