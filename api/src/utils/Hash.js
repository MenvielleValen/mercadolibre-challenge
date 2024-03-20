const crypto = require("crypto");

class Hash {
  static createHash(value) {
    const hash = crypto.createHash("sha256");
    hash.update(value);
    return hash.digest("hex");
  }
}

module.exports = Hash;
