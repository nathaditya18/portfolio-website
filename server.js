// ============================================================
// server.js — Full Stack Portfolio Backend
// Node.js + Express + MySQL
// ============================================================

require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// ─── MySQL Connection Pool ────────────────────────────────────
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'tiger',
    database: process.env.DB_NAME || 'portfolio_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const db = pool.promise();

// Test DB connection on startup
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        console.log('⚠️  Make sure MySQL is running and portfolio_db is set up.');
    } else {
        console.log('✅ Connected to MySQL database successfully!');
        connection.release();
    }
});

// ─── API Routes ───────────────────────────────────────────────

// GET /api/profile — Fetch profile info
app.get('/api/profile', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM profile LIMIT 1');
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// GET /api/skills — Fetch all skills grouped by category
app.get('/api/skills', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM skills ORDER BY category, level DESC');

        // Group by category
        const grouped = rows.reduce((acc, skill) => {
            if (!acc[skill.category]) acc[skill.category] = [];
            acc[skill.category].push(skill);
            return acc;
        }, {});

        res.json({ success: true, data: rows, grouped });
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// GET /api/projects — Fetch all projects (featured first)
app.get('/api/projects', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM projects ORDER BY featured DESC, id DESC');
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// POST /api/contact — Save contact form submission
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Name, email and message are required.'
        });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address.'
        });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
            [name.trim(), email.trim(), subject?.trim() || '', message.trim()]
        );
        res.json({
            success: true,
            message: 'Thank you! Your message has been received.',
            id: result.insertId
        });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
});

// GET /api/contacts — View all contact submissions (admin)
app.get('/api/contacts', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM contacts ORDER BY submitted_at DESC');
        res.json({ success: true, data: rows, count: rows.length });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── Catch-all: Serve index.html for SPA Routing ─────────────
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📁 Serving static files from /public`);
    console.log(`🗄️  Database: ${process.env.DB_NAME || 'portfolio_db'}`);
});

module.exports = app;
