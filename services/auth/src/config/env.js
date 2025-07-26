require('dotenv').config();

module.exports = {
  port:      process.env.PORT      || 3001,
  mongoUrl:  process.env.MONGO_URL || 'mongodb://localhost:27017/auth_db',
  jwtSecret: process.env.JWT_SECRET || 'devSecret',
};
// This file is used to configure environment variables for the auth service
// It reads from a .env file and exports the configuration as an object