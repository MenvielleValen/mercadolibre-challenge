const fs = require("fs");
const path = require("path");

class Logger {
  static logFolderPath = path.join(__dirname, "../logs");
  static logFilePath = path.join(Logger.logFolderPath, "app.log");

  /**
   * Función para validar la existencia del directorio de logs.
   * Si el directorio no existe, se crea.
   */
  static ensureLogsFolderExists() {
    if (!fs.existsSync(Logger.logFolderPath)) {
      try {
        fs.mkdirSync(Logger.logFolderPath);
      } catch (err) {
        console.error("Error al crear directorio de logs:", err);
        throw err;
      }
    }
  }

  /**
   * Función para registrar mensajes de información en el archivo de logs.
   * @param {string} message Mensaje de información a registrar.
   */
  static logInfo(message) {
    Logger.ensureLogsFolderExists(); // Verifica que el directorio de logs exista
    const logMessage = `[INFO] ${Logger.getCurrentTimestamp()} - ${message}\n\n`;
    console.log(errorMessage);
    fs.appendFile(Logger.logFilePath, logMessage, (err) => {
      if (err) {
        console.error("Error al escribir en el archivo de logs:", err);
      }
    });
  }

  /**
   * Función para registrar mensajes de error en el archivo de logs.
   * @param {string} message Mensaje de error a registrar.
   */
  static logError(message) {
    Logger.ensureLogsFolderExists(); // Verifica que el directorio de logs exista
    const errorMessage = `[ERROR] ${Logger.getCurrentTimestamp()} - ${message}\n\n`;
    console.error(errorMessage);
    fs.appendFile(Logger.logFilePath, errorMessage, (err) => {
      if (err) {
        console.error("Error al escribir en el archivo de logs:", err);
      }
    });
  }

  static getCurrentTimestamp() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
}

module.exports = Logger;
