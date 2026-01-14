// server.js - Main entry point for NearByAid Backend

require('dotenv').config();           // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import middleware
const protect = require('./middleware/auth');  // JWT protection

const app = express();

// === Middleware ===
app.use(cors());                      // Allow frontend (React/Vite) to connect
app.use(express.json());              // Parse incoming JSON request bodies

// === Connect to MongoDB Atlas ===
connectDB();

// === Routes ===
// Authentication routes (register + login)
app.use('/api/auth', require('./routes/auth'));

// Help points / Aid routes (create, future: search nearby)
app.use('/api/aid', require('./routes/aid'));

// === Public Routes ===
// Welcome page - anyone can see
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to NearByAid API!',
    status: 'running',
    mongodb: 'connected',
    time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  });
});

// Health check - useful for monitoring / deployment
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// === Protected Test Route ===
// Only logged-in users (with valid token) can access
app.get('/api/protected', protect, (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to protected route!',
    userId: req.user,  // Logged-in user's ID from JWT
    note: 'Only users with valid token can see this'
  });
});

// === Catch-all 404 - when someone hits wrong URL ===
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

// === Global Error Handler - catches any unexpected crashes ===
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server',
    // Only show full error in development mode
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// === Start the server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`╔════════════════════════════════════════════╗`);
  console.log(`║   NearByAid Backend is running!            ║`);
  console.log(`║   Port: ${PORT}                            ║`);
  console.log(`║   Environment: ${process.env.NODE_ENV || 'development'}          ║`);
  console.log(`║   Time: ${new Date().toLocaleString('en-IN')} ║`);
  console.log(`╚════════════════════════════════════════════╝`);
});