const { getPool } = require('../config/db');

async function submitContact(req, res) {
  try {
    const { name, email, phone = null, subject = 'General Inquiry', message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.',
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
      'INSERT INTO contacts (name, email, phone, subject, message, status) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, phone, subject, message, 'New']
    );

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully! Our trust team will contact you shortly.',
      contactId: result.insertId,
    });
  } catch (error) {
    console.error('Contact submit error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send contact message.',
    });
  }
}

async function getAllContacts(req, res) {
  try {
    const pool = getPool();

    if (!pool) {
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable.',
        contacts: [],
      });
    }

    const [rows] = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    return res.status(200).json({
      success: true,
      count: rows.length,
      contacts: rows,
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch contact inquiries.',
      contacts: [],
    });
  }
}

async function updateContactStatus(req, res) {
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

    await pool.query('UPDATE contacts SET status = ? WHERE id = ?', [status, id]);

    return res.status(200).json({
      success: true,
      message: 'Contact status updated successfully.',
    });
  } catch (error) {
    console.error('Update contact status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update contact status.',
    });
  }
}

module.exports = {
  submitContact,
  getAllContacts,
  updateContactStatus,
};
