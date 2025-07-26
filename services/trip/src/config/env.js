require('dotenv').config();

module.exports = {
  port:      process.env.PORT      || 3004,
  mongoUrl:  process.env.MONGO_URL || 'mongodb://localhost:27017/trip_db',
  redisUrl:  process.env.REDIS_URL || 'redis://localhost:6379',
  rabbitmqUrl: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
  jwtSecret: process.env.JWT_SECRET || 'devSecret',
};
