class StringNormalize{
    /**
     * Normaliza string quitandole espacios al inicio, al final, espacios dobles y convierte a minúscula
     * @param {string} stringValue string a normalizar 
     * @returns {string} string normalizado
     */
    static normalize(stringValue){
        return stringValue.trim().toLowerCase().replace(/\s+/g, " ");
    }
}

module.exports = StringNormalize;