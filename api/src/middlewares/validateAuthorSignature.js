const errors = require("../constants/errors");
const Exception = require("../utils/Exception");

const validateAuthorSignature = (req, res, next) => {
  const receivedAuthorSignature = req.headers["author"];

  if (!receivedAuthorSignature) {
    throw new Exception(
      "No se ha especificado la firma en la solicitud.",
      errors.forbidden,
      403
    );
  }

  const authorSignature = JSON.parse(receivedAuthorSignature);

  if(!authorSignature.name || !authorSignature.lastname){
    throw new Exception(
      "La firma es inválida.",
      errors.forbidden,
      403
    );
  }

  req.author = authorSignature;
  next();
};

module.exports = {
  validateAuthorSignature,
};
