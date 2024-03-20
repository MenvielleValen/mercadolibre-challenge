const axios = require("axios");

class MercadoLibreApiSingleton {
  static instance = null;

  /**
   * Si ya se creo una instancia devuelve la instancia, de lo contrario la crea y la devuelve
   * @returns axios instance (MELI API)
   */
  static getInstance() {
    if (!MercadoLibreApiSingleton.instance) {
      MercadoLibreApiSingleton.instance = axios.create({
        baseURL: process.env.API_MELI_BASE_URL,
      });
    }

    return MercadoLibreApiSingleton.instance;
  }
}

module.exports = MercadoLibreApiSingleton;
