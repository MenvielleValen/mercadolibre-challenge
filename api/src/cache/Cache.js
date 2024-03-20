const RedisSingleton = require("./RedisSingleton");
const Logger = require("../utils/Logger");

class Cache {
  /**
   * Recibe una hash key
   * @param {string} key (required) Hash key
   */
  constructor(key) {
    if (!key) {
      throw new Error("Key is required");
    }
    this.key = key;
  }

  /**
   * Obtiene el registro almacenado en redis si es que existe, de lo contrario retorna null
   * @returns {Promise<object | null>}
   */
  async getItem() {
    if (process.env.DISABLED_REDIS_CACHE.toLowerCase().trim() === "true") {
      console.warn(
        "[WARN] el caché se encuentra deshabilitado, DISABLED_REDIS_CACHE=true"
      );
      return null;
    }

    try {
      const redis = await RedisSingleton.getInstance().connect();
      const dataFromCache = await redis.get(this.key);

      if (!dataFromCache) {
        await redis.disconnect();
        return null;
      }

      await redis.disconnect();
      return JSON.parse(dataFromCache);
    } catch (error) {
      Logger.logError(error);
      return null;
    }
  }

  /**
   * Almacena en caché un objeto
   * @param {object} data objeto a almacenar
   * @param {number} ttl (default 1000) tiempo de expiración en segundos
   */
  async setItem(data, ttl = 1000) {
    if (process.env.DISABLED_REDIS_CACHE.toLowerCase().trim() === "true") {
      console.warn(
        "[WARN] el caché se encuentra deshabilitado, DISABLED_REDIS_CACHE=true"
      );
      return;
    }

    try {
      const jsonData = JSON.stringify(data);
      const redis = await RedisSingleton.getInstance().connect();
      await redis.set(this.key, jsonData, { EX: ttl });
      await redis.disconnect();
    } catch (error) {
      Logger.logError(error);
    }
  }
}

module.exports = Cache;
