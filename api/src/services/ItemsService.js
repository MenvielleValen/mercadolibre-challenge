const Cache = require("../cache/Cache");
const errors = require("../constants/errors");
const Exception = require("../utils/Exception");
const Hash = require("../utils/Hash");
const Item = require("../utils/Item");

class ItemsService {
  constructor(meliService) {
    this.meliService = meliService;
  }

  /**
   * Busca producto por término y las categorías más relevantes de la búsqueda.
   * @param {string} query término de búsqueda
   * @returns items (productos encontrados), categories (path de categoría más relevante) y author.
   */
  async searchItem(query) {
    if (!query)
      throw new Exception(
        "Debe definir el término de búsqueda",
        errors.undefined_field,
        400
      );

    try {
      const hashKey = Hash.createHash(`search:${query}`);
      const cache = new Cache(hashKey);
      const dataFromCache = await cache.getItem();

      //Si se encuentra almacenado en caché, lo devuevlo
      if (dataFromCache) {
        return dataFromCache;
      }

      const { results, filters, available_filters } =
        await this.meliService.searchItems(query);

      let categories = [];

      if (filters.length > 0) {
        const categoryInFilters = filters.find(({ id }) => id === "category");

        if (categoryInFilters) {
          categories = categoryInFilters.values[0].path_from_root.map(
            (category) => category.name
          );
        }
      } else {
        const categoryInAvailableFilters = available_filters.find(
          ({ id }) => id === "category"
        );

        if (categoryInAvailableFilters) {
          const bestCatId = this.getBestCategoryId(categoryInAvailableFilters);
          const bestCategory = await this.meliService.getCategoryById(
            bestCatId
          );
          const { path_from_root } = bestCategory;
          categories = path_from_root.map((category) => category.name);
        }
      }

      const response = {
        items: results.map((item) => new Item(item)),
        categories,
      };

      //Almaceno response en caché con un TTL de 3600s
      await cache.setItem(response, 3600);

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene el producto por ID, luego la descripción y la categoría del mismo.
   * @param {string} itemId express request
   * @returns author, item (producto), categories (path de categorías).
   */
  async getItemById(itemId) {
    if (!itemId)
      throw new Exception(
        "Debe definir el itemId",
        errors.undefined_field,
        400
      );

    try {
      const hashKey = Hash.createHash(`itemId:${itemId}`);
      const cache = new Cache(hashKey);
      const dataFromCache = await cache.getItem();

      if (dataFromCache) {
        return dataFromCache;
      }

      const itemMeli = await this.meliService.getItemById(itemId);
      const description = await this.meliService.getDescriptionByItemId(itemId);
      const category = await this.meliService.getCategoryById(
        itemMeli.category_id
      );

      const item = new Item(itemMeli, description);
      const categories = category.path_from_root.map(({ name }) => name);

      const response = {
        item,
        categories,
      };

      await cache.setItem(response, 3600);

      return response;
    } catch (error) {
      throw error;
    }
  }

  //#region HELPERS

  /**
   * Obtiene el path de categorías desde los available filters, ordenándolos por relevancia de resultados y obteniendo el primero
   * @param {*} category
   * @returns id de la categoría más relevante
   */
  getBestCategoryId = (category) => {
    const sortedCategories = category.values.sort((a, b) => {
      return b.results - a.results;
    });
    return sortedCategories[0].id;
  };

  //#endregion
}

module.exports = ItemsService;
