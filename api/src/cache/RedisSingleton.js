const Logger = require("../utils/Logger");
const redis = require("redis");

class RedisSingleton {
  static instance = null;

  /**
   * Si ya se creo un cliente lo devuelve, de lo contrario crea el cliente en redis.
   * @returns {RedisClientType} redis client
   */
  static getInstance() {
    if (!RedisSingleton.instance) {
      const client = redis.createClient({
        password: process.env.REDIS_CONNECTION_PASSWORD,
        socket: {
          host: process.env.REDIS_CONNECTION_HOST,
          port: process.env.REDIS_CONNECTION_PORT,
        },
      });

      client.on("error", (err) => {
        Logger.logError(`Redis create client error\n${err}`);
      });

      RedisSingleton.instance = client;
    }

    return RedisSingleton.instance;
  }
}

module.exports = RedisSingleton;
