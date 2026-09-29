-- ========================================================
-- Maheswari & Balan Memorial Charitable Trust (MBMCT)
-- MySQL Database Initialization Script
-- ========================================================

CREATE DATABASE IF NOT EXISTS mbmct_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE mbmct_db;

-- 1. Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL DEFAULT 'Admin',
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'SuperAdmin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Donations Table (Stores all donations received from public)
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

-- 3. Contact Inquiries Table (Stores contact us form submissions)
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

-- 4. Volunteers Table (Stores volunteer signups)
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

-- 5. Beneficiaries Table (Beneficiary cases managed by admin)
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

-- ========================================================
-- Initial Seed Data
-- ========================================================

-- Insert Initial Admin User
INSERT IGNORE INTO admin_users (full_name, email, password, role)
VALUES ('Senthilkumar', 'senthilkumar@gmail.com', '$2a$10$w82Jz7rQe.kH3wZ5m9eXk.B5E8v7Y6q8w3f6z7q9w2f7z6y8w2f7', 'SuperAdmin');

-- Insert Sample Real-world Donations
INSERT INTO donations (donor_name, email, phone, amount, cause, payment_method, transaction_id, status)
VALUES 
('Arun Prakash', 'arun@gmail.com', '+91 98401 23456', 50000.00, 'Education Support', 'UPI', 'TXN_20260901_01', 'Completed'),
('Priya Sundaram', 'priya@gmail.com', '+91 87544 11223', 25000.00, 'Cancer Care', 'Net Banking', 'TXN_20260902_02', 'Completed'),
('Karthik Raja', 'karthik@gmail.com', '+91 94431 88990', 10000.00, 'Old Age Support', 'Credit Card', 'TXN_20260903_03', 'Completed'),
('Deepa Manikandan', 'deepa@gmail.com', '+91 91234 56780', 5000.00, 'Leprosy Support', 'UPI', 'TXN_20260904_04', 'Completed'),
('Manojkumar', 'manoj@gmail.com', '+91 97890 12345', 15000.00, 'General Support', 'UPI', 'TXN_20260905_05', 'Completed')
ON DUPLICATE KEY UPDATE id=id;

-- Insert Sample Contact Messages
INSERT INTO contacts (name, email, phone, subject, message, status)
VALUES 
('Rajesh V', 'rajesh@gmail.com', '+91 98410 99887', 'Child Education Sponsorship', 'I would like to sponsor 3 government school students for the upcoming academic year.', 'New'),
('Meena Kumari', 'meena@gmail.com', '+91 80560 33445', 'Volunteer for Cancer Camp', 'Can our medical team volunteer in your upcoming rural health checkup camp?', 'New')
ON DUPLICATE KEY UPDATE id=id;

-- Insert Sample Volunteers
INSERT INTO volunteers (full_name, email, phone, preferred_area, availability, status)
VALUES
('Dr. Ramesh', 'ramesh@gmail.com', '+91 98840 12300', 'Healthcare Support', 'Weekends', 'Approved'),
('Sneha Patel', 'sneha@gmail.com', '+91 61234 90123', 'Community Welfare', 'Flexible', 'Pending')
ON DUPLICATE KEY UPDATE id=id;

-- Insert Sample Beneficiaries
INSERT INTO beneficiaries (full_name, program_area, assistance_amount, status)
VALUES
('Kavitha S', 'Education', 12000.00, 'Approved'),
('Ravi Kumar', 'Cancer Care', 45000.00, 'Approved'),
('Lakshmi Ammal', 'Elderly Care', 8000.00, 'Pending'),
('Selvam P', 'Leprosy Support', 15000.00, 'Approved')
ON DUPLICATE KEY UPDATE id=id;
