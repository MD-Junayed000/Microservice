// Mock Redis implementation - no actual Redis connection
const cfg = require('../config/env');

let isConnected = false;

const connect = async () => {
  console.log('⚠️ Redis disabled - service will work without caching');
  isConnected = false;
};

const get = async (key) => {
  // Always return null when Redis is disabled
  return null;
};

const set = async (key, value, ttl = 3600) => {
  // Do nothing when Redis is disabled
  return;
};

const del = async (key) => {
  // Do nothing when Redis is disabled
  return;
};

const exists = async (key) => {
  // Always return false when Redis is disabled
  return false;
};

module.exports = {
  connect,
  get,
  set,
  del,
  exists,
  client: () => null,
  isConnected: () => isConnected
};
