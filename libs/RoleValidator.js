const ErrorHandler = require("../utils/error");

class RoleValidator {
  static validate(role) {
    if (!role.name) {
      return ErrorHandler.error('Nama role tidak boleh kosong', 400);
    }
  }
}

module.exports = RoleValidator;