const errors = require("../constants/errors");
const Logger = require("../utils/Logger");

const responseErrorMiddleware = (error, req, res, next) => {
  if (error?.code === "ECONNABORTED") {
    error.type = errors.timeout;
    error.status = 408;
    error.message =
      "La solicitud a la API externa tomó demasiado tiempo y fue abortada.";
  }

  const responseError = {
    type: error?.type || errors.unknow_error,
    message: error?.message || "Oucrrió un error, por favor, intente de nuevo.",
    status: error?.status || 500,
  };

  Logger.logError(
    `${responseError.message} - [STATUS]: ${responseError.status}\n${error.stack}`
  );

  res.status(error?.status || 500).json(responseError);
};

module.exports = {
  responseErrorMiddleware,
};
