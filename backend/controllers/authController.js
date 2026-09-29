const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getPool } = require('../config/db');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'mbmct_super_secret_jwt_key_2026_serve_with_love';
const DEFAULT_ADMIN_EMAIL = process.env.DEFAULT_ADMIN_EMAIL || 'senthilkumar@gmail.com';
const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD || 'Senthil@2003';

async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const pool = getPool();
    let admin = null;

    if (pool) {
      const [rows] = await pool.query('SELECT * FROM admin_users WHERE email = ?', [email]);
      if (rows.length > 0) {
        admin = rows[0];
      }
    }

    // Direct credential verification (with DB check or fallback)
    let isMatch = false;
    if (admin) {
      isMatch = await bcrypt.compare(password, admin.password);
    }

    // Also support fallback for instant seamless access
    if (!isMatch && email.toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase() && password === DEFAULT_ADMIN_PASSWORD) {
      isMatch = true;
      admin = {
        id: 1,
        full_name: 'Senthilkumar',
        email: DEFAULT_ADMIN_EMAIL,
        role: 'SuperAdmin',
      };
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password. Please check your credentials.',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: admin.role,
        fullName: admin.full_name,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Admin authentication successful.',
      token,
      admin: {
        id: admin.id,
        fullName: admin.full_name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.',
    });
  }
}

async function verifyToken(req, res) {
  return res.status(200).json({
    success: true,
    admin: req.admin,
  });
}

module.exports = {
  loginAdmin,
  verifyToken,
};
