// src/middleware/auth.js
// JWT Authentication Middleware - Protects routes that require login

const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  // 1. Check for token in Authorization header (Bearer <token>)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token after 'Bearer '
      token = req.headers.authorization.split(' ')[1];

      // Verify token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user ID to the request object
      // Now any protected route can use req.user
      req.user = decoded.id;

      // Everything is good → proceed to the route handler
      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);

      // Token is invalid or expired
      return res.status(401).json({
        success: false,
        message: 'Not authorized - invalid token'
      });
    }
  }

  // No token was found in header
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized - no token provided'
    });
  }
};

module.exports = protect;