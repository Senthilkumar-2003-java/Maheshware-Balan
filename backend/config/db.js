const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASSWORD = 'Senthil@2003',
  DB_NAME = 'mbmct_db',
  DB_PORT = 3306,
  DEFAULT_ADMIN_EMAIL = 'senthilkumar@gmail.com',
  DEFAULT_ADMIN_PASSWORD = 'Senthil@2003',
} = process.env;

let pool = null;

async function initDatabase() {
  try {
    // 1. Connect without database first to ensure DB exists
    const rootConnection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: Number(DB_PORT),
    });

    console.log('✅ Connected to MySQL server successfully.');

    // Create database if not exists
    await rootConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    console.log(`✅ Database "${DB_NAME}" is verified/created.`);
    await rootConnection.end();

    // 2. Create the shared connection pool
    pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: Number(DB_PORT),
      waitForConnections: true,
      connectionLimit: 15,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });

    // 3. Create necessary tables if not exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL DEFAULT 'Admin',
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'SuperAdmin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS donations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        donor_name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL,
        phone VARCHAR(25) NOT NULL,
        pan_number VARCHAR(20) DEFAULT NULL,
        amount DECIMAL(12, 2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'INR',
        cause VARCHAR(100) DEFAULT 'General Support',
        payment_method VARCHAR(50) DEFAULT 'UPI',
        transaction_id VARCHAR(100) UNIQUE,
        status ENUM('Completed', 'Pending', 'Failed') DEFAULT 'Completed',
        tax_exemption_requested BOOLEAN DEFAULT TRUE,
        notes TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL,
        phone VARCHAR(25) DEFAULT NULL,
        subject VARCHAR(200) DEFAULT 'General Inquiry',
        message TEXT NOT NULL,
        status ENUM('New', 'In Review', 'Resolved') DEFAULT 'New',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS volunteers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL,
        phone VARCHAR(25) NOT NULL,
        preferred_area VARCHAR(100) DEFAULT 'Community Welfare',
        skills TEXT DEFAULT NULL,
        availability VARCHAR(100) DEFAULT 'Weekends',
        status ENUM('Pending', 'Approved', 'Contacted', 'Inactive') DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS beneficiaries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(150) NOT NULL,
        program_area VARCHAR(100) NOT NULL,
        location VARCHAR(150) DEFAULT 'Tamil Nadu',
        assistance_amount DECIMAL(12, 2) DEFAULT 0.00,
        disbursed_date DATE DEFAULT NULL,
        status ENUM('Approved', 'Pending', 'In Progress', 'Rejected') DEFAULT 'Pending',
        notes TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Ensure default admin user exists
    const [adminCheck] = await pool.query('SELECT id FROM admin_users WHERE email = ?', [DEFAULT_ADMIN_EMAIL]);
    if (adminCheck.length === 0) {
      const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
      await pool.query(
        'INSERT INTO admin_users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Senthilkumar', DEFAULT_ADMIN_EMAIL, hashedPassword, 'SuperAdmin']
      );
      console.log(`✅ Default admin created: ${DEFAULT_ADMIN_EMAIL} with secure hash.`);
    }

    console.log('✅ All MySQL tables and schema initialized successfully.');
    return pool;
  } catch (error) {
    console.error('❌ MySQL Connection/Init Error:', error.message);
    console.log('👉 Please ensure MySQL service is running on localhost:3306 with password Senthil@2003');
    return null;
  }
}

function getPool() {
  return pool;
}

module.exports = {
  initDatabase,
  getPool,
};
