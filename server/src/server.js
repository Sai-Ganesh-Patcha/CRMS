/**
 * CRMS Backend - Express Server
 * Production-grade College Result Management System
 */

require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const routes = require('./routes');
const { errorHandler } = require('./middleware');

// Initialize Express
const app = express();

// ======================
// Database
// ======================
connectDB();

// ======================
// Security Middleware
// ======================
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for simple static serving to avoid script blocking
}));

// CORS (safe even for same-origin)
app.use(cors({
    origin: true,
    credentials: true
}));

// ======================
// Rate Limiting
// ======================
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use('/api', limiter);

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10
});
app.use('/api/auth/login', authLimiter);

// ======================
// Body Parsing
// ======================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ======================
// Logging
// ======================
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ======================
// 🚨 FRONTEND SERVING (THIS FIXES NOT FOUND)
// ======================
// Logic:
// 1. Production: expect files in '../public' (copied during build)
// 2. Development: expect files in '../../client' (monorepo structure)
let publicPath = path.join(__dirname, '../public');

// Check if production build exists, otherwise use dev client folder
const fs = require('fs');
if (!fs.existsSync(publicPath)) {
    publicPath = path.join(__dirname, '../../client');
}

console.log('📂 Serving frontend from:', publicPath);
app.use(express.static(publicPath));

// ======================
// API Routes
// ======================
app.use('/api', routes);

// ======================
// Frontend Fallback (CRITICAL)
// ======================
// This handles any non-API route by sending index.html (SPA-like behavior if needed)
app.get('*', (req, res) => {
    // If asking for API that doesn't exist, generic 404 handled by middleware below
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ success: false, message: 'API Endpoint Not Found' });
    }
    res.sendFile(path.join(publicPath, 'index.html'));
});

// ======================
// Error Handling
// ======================
app.use(errorHandler.notFound);
app.use(errorHandler.errorHandler);

// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════╗
║   🎓 CRMS Fullstack Server (Frontend + Backend)       ║
║                                                       ║
║   Environment: ${process.env.NODE_ENV || 'development'}                          ║
║   Port: ${PORT}                                          ║
║   URL: http://localhost:${PORT}                         ║
║   API: /api                                             ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
    `);
    console.log('🚀 SYSTEM UPDATE v3: Fullstack Server Mode Active');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => process.exit(0));
});

module.exports = app;
