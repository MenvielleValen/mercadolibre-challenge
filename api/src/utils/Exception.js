class Exception extends Error {
  constructor(message, type = "internal_error", status = 500) {
    super(message);
    this.type = type;
    this.status = status;
  }
}

module.exports = Exception;
