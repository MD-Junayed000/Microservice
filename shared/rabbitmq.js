// shared/rabbitmq.js
const amqp = require('amqplib');

const url = process.env.RABBIT_URL || 'amqp://rabbitmq:5672';

let conn, channel;

async function connect () {
  if (channel) return channel;
  conn    = await amqp.connect(url);
  channel = await conn.createChannel();
  console.log('🟢 RabbitMQ connected');
  return channel;
}

async function publish (exchange, routingKey, msgObj) {
  const ch = await connect();
  await ch.assertExchange(exchange, 'topic', { durable: true });
  ch.publish(exchange, routingKey, Buffer.from(JSON.stringify(msgObj)));
}

async function subscribe (exchange, routingKey, cb) {
  const ch = await connect();
  await ch.assertExchange(exchange, 'topic', { durable: true });
  const q  = await ch.assertQueue('', { exclusive: true });
  await ch.bindQueue(q.queue, exchange, routingKey);
  ch.consume(q.queue, msg => {
    const parsed = JSON.parse(msg.content.toString());
    cb(parsed);
    ch.ack(msg);
  });
}

module.exports = { publish, subscribe };
