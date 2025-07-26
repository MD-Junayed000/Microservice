// services/auth/src/middleware/auth.js
const jwt = require('jsonwebtoken');
const cfg = require('../config/env');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);          // no token
  try {
    req.user = jwt.verify(token, cfg.jwtSecret);   // attach payload
    next();
  } catch {
    res.sendStatus(403);                           // invalid token
  }
};
