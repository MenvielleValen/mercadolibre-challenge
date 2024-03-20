const conditions = require("../constants/conditions");

class Item {
  constructor(item, description = null) {
    this.formatItem(item);

    //Agrega descripcion y cantidad de ventas
    if (description) {
      this.description = description?.plain_text || "Sin descripción.";
      //La propiedad [sold_quantity] no viene en la consulta a la api de Mercado Libre, pero formaba parte del response solicitado en el challenge
      this.sold_quantity = item?.sold_quantity || 0;
    }
  }

  /**
   * Obtiene los decimales de un número con formato EEEE.DD
   * @param {number} value número a formatear
   * @returns decimales del número recibido
   */
  getDecimals = (value) => {
    const decimals = value.toString().split(".")[1] || 0;
    return Number(decimals);
  };

  /**
   * Formatea un item específico
   * @param {*} item producto a formatear
   * @returns {void}
   */
  formatItem(item) {
    this.id = item.id;
    this.title = item.title;
    this.price = {
      currency: item.currency_id,
      amount: Math.trunc(item.price),
      decimals: this.getDecimals(item.price),
    };
    this.picture = item?.pictures?.[0]?.secure_url || item.thumbnail;
    this.condition = conditions[item.condition];
    this.free_shipping = item.shipping.free_shipping;
    this.location = item?.location?.city?.name || null;
  }
}

module.exports = Item;
