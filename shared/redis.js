// shared/redis.js
const { createClient } = require('redis');

const url  = process.env.REDIS_URL  || 'redis://redis:6379';
const pass = process.env.REDIS_PASS || undefined;

let client;          // singleton

async function getClient () {
  if (client) return client;
  client = createClient({ url, password: pass });
  client.on('error', err => console.error('🔴 Redis', err));
  await client.connect();
  console.log('🟢 Redis connected');
  return client;
}

module.exports = { getClient };
