const express = require("express");
const ItemsController = require("../controllers/ItemsController");
const {
  responseErrorMiddleware,
} = require("../middlewares/responseErrorMiddleware");
const {
  validateAuthorSignature,
} = require("../middlewares/validateAuthorSignature");
const ItemsService = require("../services/ItemsService");
const MercadoLibreService = require("../services/MercadoLibreService");

class ItemsRouter {
  static router() {
    const router = express.Router();

    // Crear una instancia de MercadoLibreService
    const meliService = new MercadoLibreService();

    // Crear una instancia de ItemsService
    const itemsService = new ItemsService(meliService);

    // Crear una instancia de ItemsController con la dependencia inyectada
    const itemsController = new ItemsController(itemsService);

    // Asignar los métodos de instancia del controlador a las rutas
    router.get("/", validateAuthorSignature, (req, res, next) =>
      itemsController.searchItems(req, res, next)
    );
    router.get("/:id", validateAuthorSignature, (req, res, next) =>
      itemsController.getItemById(req, res, next)
    );

    // Middleware de manejo de errores
    router.use(responseErrorMiddleware);

    return router;
  }
}

module.exports = ItemsRouter;
