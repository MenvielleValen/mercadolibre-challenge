const StringNormalize = require("../utils/StringNormalize");

class ItemsController {
  constructor(itemsService) {
    this.itemsService = itemsService;
  }

  async searchItems(req, res, next) {
    const { q } = req.query;

    try {
      const normalizedQuery = StringNormalize.normalize(q);
      const response = await this.itemsService.searchItem(normalizedQuery);

      return res.status(200).json({
        author: req.author,
        ...response,
      });
    } catch (error) {
      next(error);
    }
  }

  async getItemById(req, res, next) {
    const { id } = req.params;

    try {
      const response = await this.itemsService.getItemById(id.trim());

      return res.status(200).json({
        author: req.author,
        ...response,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ItemsController;
