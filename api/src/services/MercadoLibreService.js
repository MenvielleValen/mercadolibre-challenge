const Exception = require("../utils/Exception");
const errors = require("../constants/errors");
const MercadoLibreApiSingleton = require("../utils/MercadoLibreApiSingleton");
const endpoints = require("../constants/endpoints");

class MercadoLibreService {
  SEARCH_ENDPOINT = endpoints.MELI_SEARCH;
  GET_BY_ID_ENDPOINT = endpoints.MELI_GET_BY_ID;

  constructor() {
    this.api = MercadoLibreApiSingleton.getInstance();
  }

  /**
   * Busca productos llamando a la api de Mercado Libre
   * @param {string} query término a buscar
   * @param {number} limit (optional) default = 4
   * @returns result (productos []), filters[], available_filters[]
   */
  async searchItems(query, limit = 4) {
    try {
      const { data: response } = await this.api.get(this.SEARCH_ENDPOINT.url, {
        params: {
          q: query,
          limit,
        },
        timeout: this.SEARCH_ENDPOINT.timeout,
      });
      const { results, filters, available_filters } = response;

      return {
        results,
        filters,
        available_filters,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene un ítem enviando el id a la api de Mercado Libre
   * @param {string} id id del ítem
   * @returns item
   */
  async getItemById(id) {
    try {
      const { data: item } = await this.api(`${this.GET_BY_ID_ENDPOINT.url}/${id}`, {
        timeout: this.GET_BY_ID_ENDPOINT.timeout,
      });
      if (!item)
        throw new Exception("Producto no encontrado", errors.not_found, 404);

      return item;
    } catch (error) {
      switch (error?.response?.status) {
        case 404:
          throw new Exception("Producto no encontrado", errors.not_found, 404);
        default:
          throw error;
      }
    }
  }

  /**
   * Obtiene y retorna descripcion de item
   * @param {string} id id del item
   * @returns descripcion del item
   */
  async getDescriptionByItemId(id) {
    try {
      const { data: description } = await this.api(`/items/${id}/description`);
      return description;
    } catch (error) {
      switch (error?.response?.status) {
        case 404:
          return { plain_text: "Sin descripción." };
        default:
          throw error;
      }
    }
  }

  /**
   * Obtiene y retorna categoria
   * @param {string} id id de categoria
   * @returns categoria
   */
  async getCategoryById(id) {
    try {
      const { data } = await this.api.get(`/categories/${id}`);
      return data;
    } catch (error) {
      switch (error?.response?.status) {
        case 404:
          throw new Exception("Categoría no encontrada", errors.not_found, 404);
        default:
          throw error;
      }
    }
  }
}

module.exports = MercadoLibreService;
