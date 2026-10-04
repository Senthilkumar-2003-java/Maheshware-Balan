const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initDatabase } = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const donationRoutes = require('./routes/donationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const beneficiaryRoutes = require('./routes/beneficiaryRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Maheswari & Balan Memorial Charitable Trust Backend API',
    database: 'MySQL',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/beneficiaries', beneficiaryRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found.`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Unhandled Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error occurred.',
  });
});

// Start Server and Database
async function startServer() {
  console.log('🚀 Starting MBMCT Node.js + Express Backend Server...');
  await initDatabase();

  app.listen(PORT, () => {
    console.log(`
============================================================
🌟 MBMCT CHARITABLE TRUST BACKEND API IS RUNNING!
📍 Port: http://localhost:${PORT}
🩺 Health Check: http://localhost:${PORT}/api/health
🔐 Admin Auth: http://localhost:${PORT}/api/auth/login
❤️ Donations API: http://localhost:${PORT}/api/donations
✉️ Contact API: http://localhost:${PORT}/api/contacts
🤝 Volunteer API: http://localhost:${PORT}/api/volunteers
🗄️ Database: MySQL (localhost:3306 / mbmct_db)
👤 Default Admin: senthilkumar@gmail.com / Senthil@2003
============================================================
    `);
  });
}

startServer();
