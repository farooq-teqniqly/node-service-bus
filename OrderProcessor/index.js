const Redis = require('ioredis');

const redisConfig = {
  host: process.env.REDIS_HOST_NAME,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  database: 0,
  keyPrefix: process.env.CACHE_KEY_PREFIX,
};

const useTls = process.env.USE_TLS || false;

if (useTls === true) {
  redisConfig.tls = {
    servername: process.env.REDIS_HOST_NAME,
  };
}

const redisClient = new Redis(redisConfig);

module.exports = async function (context, mySbMsg) {
  context.log(
    'JavaScript ServiceBus topic trigger function processed message',
    mySbMsg
  );

  var cacheResponse = await redisClient.set(
    mySbMsg.orderId,
    JSON.stringify(mySbMsg)
  );
  context.log(`Cache response: ${cacheResponse}`);
};
