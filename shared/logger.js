// shared/logger.js
const { createLogger, format, transports } = require('winston');

const level  = process.env.LOG_LEVEL || 'info';
const pretty = process.env.NODE_ENV !== 'production';

module.exports = createLogger({
  level,
  format: pretty
    ? format.combine(format.colorize(), format.simple())
    : format.json(),
  transports: [
    new transports.Console(),
  ],
});