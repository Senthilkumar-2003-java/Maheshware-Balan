const { getPool } = require('../config/db');

let fallbackVolunteers = [
  { id: 1, full_name: 'Dr. Ramesh', email: 'ramesh@gmail.com', phone: '+91 98840 12300', preferred_area: 'Healthcare Support', availability: 'Weekends', status: 'Approved', created_at: new Date() },
  { id: 2, full_name: 'Sneha Patel', email: 'sneha@gmail.com', phone: '+91 61234 90123', preferred_area: 'Community Welfare', availability: 'Flexible', status: 'Pending', created_at: new Date() },
];

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

    if (pool) {
      const [result] = await pool.query(
        'INSERT INTO volunteers (full_name, email, phone, preferred_area, skills, availability, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [full_name, email, phone, preferred_area, skills, availability, 'Pending']
      );

      return res.status(201).json({
        success: true,
        message: 'Volunteer application submitted successfully! Welcome to the MBMCT family.',
        volunteerId: result.insertId,
      });
    } else {
      const newVol = {
        id: fallbackVolunteers.length + 1,
        full_name,
        email,
        phone,
        preferred_area,
        skills,
        availability,
        status: 'Pending',
        created_at: new Date(),
      };
      fallbackVolunteers.unshift(newVol);

      return res.status(201).json({
        success: true,
        message: 'Volunteer application submitted (cached).',
        volunteerId: newVol.id,
      });
    }
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

    if (pool) {
      const [rows] = await pool.query('SELECT * FROM volunteers ORDER BY created_at DESC');
      return res.status(200).json({
        success: true,
        count: rows.length,
        volunteers: rows,
      });
    } else {
      return res.status(200).json({
        success: true,
        count: fallbackVolunteers.length,
        volunteers: fallbackVolunteers,
      });
    }
  } catch (error) {
    console.error('Get volunteers error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch volunteers.',
    });
  }
}

async function updateVolunteerStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const pool = getPool();
    if (pool) {
      await pool.query('UPDATE volunteers SET status = ? WHERE id = ?', [status, id]);
    } else {
      const item = fallbackVolunteers.find((v) => v.id === parseInt(id));
      if (item) item.status = status;
    }

    return res.status(200).json({
      success: true,
      message: 'Volunteer status updated.',
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
