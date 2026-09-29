const { getPool } = require('../config/db');

async function submitVolunteer(req, res) {
  try {
    const { full_name, email, phone, preferred_area = 'Community Welfare', skills = '', availability = 'Weekends' } = req.body;

    if (!full_name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone number are required.',
      });
    }

    const pool = getPool();

    if (!pool) {
      return res.status(503).json({
        success: false,
        message: 'Database service unavailable. Please check backend server and MySQL.',
      });
    }

    const [result] = await pool.query(
      'INSERT INTO volunteers (full_name, email, phone, preferred_area, skills, availability, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [full_name, email, phone, preferred_area, skills, availability, 'Pending']
    );

    return res.status(201).json({
      success: true,
      message: 'Volunteer application submitted successfully! Welcome to the MBMCT family.',
      volunteerId: result.insertId,
    });
  } catch (error) {
    console.error('Volunteer submit error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit volunteer application.',
    });
  }
}

async function getAllVolunteers(req, res) {
  try {
    const pool = getPool();

    if (!pool) {
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable.',
        volunteers: [],
      });
    }

    const [rows] = await pool.query('SELECT * FROM volunteers ORDER BY created_at DESC');
    return res.status(200).json({
      success: true,
      count: rows.length,
      volunteers: rows,
    });
  } catch (error) {
    console.error('Get volunteers error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch volunteers from database.',
      volunteers: [],
    });
  }
}

async function updateVolunteerStatus(req, res) {
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

    await pool.query('UPDATE volunteers SET status = ? WHERE id = ?', [status, id]);

    return res.status(200).json({
      success: true,
      message: 'Volunteer status updated successfully.',
    });
  } catch (error) {
    console.error('Update volunteer status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update volunteer status.',
    });
  }
}

module.exports = {
  submitVolunteer,
  getAllVolunteers,
  updateVolunteerStatus,
};
