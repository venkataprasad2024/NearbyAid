// src/controllers/aidController.js
const Aid = require('../models/Aid');

// 1. Create new help point (protected - called by logged-in user)
exports.createAid = async (req, res) => {
  try {
    const { title, type, description, lat, lng, contact } = req.body;

    // Basic validation
    if (!title || !type || !lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Title, type, latitude, and longitude are required'
      });
    }

    const aid = new Aid({
      title,
      type,
      description: description || '',
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)] // MongoDB: [longitude, latitude]
      },
      provider: req.user,  // From protect middleware (logged-in user ID)
      contact: contact || ''
    });

    await aid.save();

    res.status(201).json({
      success: true,
      message: 'Help point created successfully',
      aid
    });
  } catch (err) {
    console.error('Create Aid Error:', err.message);
    res.status(500).json({
      success: false,
      message: 'Server error while creating help point'
    });
  }
};

// 2. Find nearby help points (public - no login required)
exports.getNearbyAids = async (req, res) => {
  try {
    const { lat, lng, maxDistance = 10000 } = req.query; // maxDistance in meters, default 10km

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required (query params: lat & lng)'
      });
    }

    const latFloat = parseFloat(lat);
    const lngFloat = parseFloat(lng);
    const maxDistFloat = parseFloat(maxDistance);

    // Geospatial $near query
    const aids = await Aid.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lngFloat, latFloat] },
          $maxDistance: maxDistFloat
        }
      }
    })
      .populate('provider', 'name email') // Show who added it
      .select('-__v -location.type');     // Clean response (hide internal fields)

    res.json({
      success: true,
      count: aids.length,
      data: aids
    });
  } catch (err) {
    console.error('Nearby Search Error:', err.message);
    res.status(500).json({
      success: false,
      message: 'Server error during nearby search'
    });
  }
};