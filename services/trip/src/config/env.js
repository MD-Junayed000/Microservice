require('dotenv').config();

module.exports = {
  port:      process.env.PORT      || 3003,
  mongoUrl:  process.env.MONGO_URL || 'mongodb://localhost:27017/trip_db',
  jwtSecret: process.env.JWT_SECRET || 'devSecret',
};
