/**
 *
 * @param {string} stringValue
 * @returns {string}
 */
export const stringNormalize = (stringValue) => {
  return stringValue.trim().toLowerCase().replace(/\s+/g, " ");
};

/**
 * @param {string} text
 * @returns {string}
 */
export const capitalizeFirstLetter = (text) => {
  return text.toLowerCase().replace(/(^\w|\s\w)/g, function (match) {
    return match.toUpperCase();
  });
};
