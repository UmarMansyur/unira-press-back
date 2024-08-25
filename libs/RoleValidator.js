const ErrorHandler = require("../utils/error");

class RoleValidator {
  static validate(role) {
    if (!role.name) {
      return ErrorHandler.badRequest('Nama role tidak boleh kosong');
    }
  }
}

module.exports = RoleValidator;