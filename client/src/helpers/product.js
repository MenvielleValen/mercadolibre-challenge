//Diccionario de monedas
const currencies = {
  USD: {
    symbol: "US$"
  },
  ARS: {
    symbol: "$"
  },
};

/**
 * Formatea precio devolviendo el símbolo correspondiente y el formato es-AR
 * @param {{amount: number; currency: string}} price {amount: monto entero, currency: tipo de moneda}
 * @returns {string} precio formateado. ej. $ 1.0000 || US$ 1.0000
 */
export const formatPrice = ({ amount, currency }) => {
  const { symbol } = currencies[currency] || { symbol: '$' };
  return `${symbol} ${amount.toLocaleString("es-AR")}`;
};

/**
 * Devuelve los decimales desde el parámetro price, si es 0 devuelve string vacio (no se muestran los decimales), de lo contrario lo formatea para devolver dos caracteres.
 * @param {number} price {decimals: monto decimal en entero}
 * @returns {string} decimales. ej. 02 || 95 (siempre formateando a dos caracteres)
 */
export const getDecimals = ({decimals}) => {
    return  decimals < 10 ? '0' + decimals : '' + decimals;
}