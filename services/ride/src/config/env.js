require('dotenv').config();

module.exports = {
  port:     process.env.PORT      || 3002,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/ride_db',
  jwtSecret: process.env.JWT_SECRET || 'devSecret',
};