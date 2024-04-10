const config = require('../config')
const jwt = require('jsonwebtoken');
const cookies = require("cookie-parser")

function authMiddleware(req, res, next) {
  const token = req.cookies.token; // Extract token from cookie
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authMiddleware;
