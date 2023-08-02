const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;

    // Check if the token version in the payload matches the user's token version
    if (decoded.user.tokenVersion !== req.user.tokenVersion) {
      throw new Error('Token version mismatch');
    }

    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
