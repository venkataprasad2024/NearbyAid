// src/routes/aid.js
const express = require('express');
const router = express.Router();

// Import controller and middleware
const aidController = require('../controllers/aidController');
const protect = require('../middleware/auth');

// POST /api/aid - Create new help point (only logged-in users)
router.post('/', protect, aidController.createAid);

// GET /api/aid/nearby - Search nearby help points (public)
router.get('/nearby', aidController.getNearbyAids);

module.exports = router;