const { getPool } = require('../config/db');

let fallbackContacts = [
  { id: 1, name: 'Rajesh V', email: 'rajesh@gmail.com', phone: '+91 98410 99887', subject: 'Child Education Sponsorship', message: 'I would like to sponsor 3 government school students for the upcoming academic year.', status: 'New', created_at: new Date() },
  { id: 2, name: 'Meena Kumari', email: 'meena@gmail.com', phone: '+91 80560 33445', subject: 'Volunteer for Cancer Camp', message: 'Can our medical team volunteer in your upcoming rural health checkup camp?', status: 'In Review', created_at: new Date() },
];

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

    if (pool) {
      const [result] = await pool.query(
        'INSERT INTO contacts (name, email, phone, subject, message, status) VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, phone, subject, message, 'New']
      );

      return res.status(201).json({
        success: true,
        message: 'Message sent successfully! Our trust team will contact you shortly.',
        contactId: result.insertId,
      });
    } else {
      const newContact = {
        id: fallbackContacts.length + 1,
        name,
        email,
        phone,
        subject,
        message,
        status: 'New',
        created_at: new Date(),
      };
      fallbackContacts.unshift(newContact);

      return res.status(201).json({
        success: true,
        message: 'Message sent successfully (cached).',
        contactId: newContact.id,
      });
    }
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

    if (pool) {
      const [rows] = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
      return res.status(200).json({
        success: true,
        count: rows.length,
        contacts: rows,
      });
    } else {
      return res.status(200).json({
        success: true,
        count: fallbackContacts.length,
        contacts: fallbackContacts,
      });
    }
  } catch (error) {
    console.error('Get contacts error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch contact inquiries.',
    });
  }
}

async function updateContactStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const pool = getPool();
    if (pool) {
      await pool.query('UPDATE contacts SET status = ? WHERE id = ?', [status, id]);
    } else {
      const item = fallbackContacts.find((c) => c.id === parseInt(id));
      if (item) item.status = status;
    }

    return res.status(200).json({
      success: true,
      message: 'Contact status updated.',
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
