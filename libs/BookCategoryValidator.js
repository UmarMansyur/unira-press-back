const ErrorHandler = require("../utils/error");

class BookCategoryValidator {
  constructor() {
    this.errors = [];
  }

  validateName(name) {
    if (!name) {
      return ErrorHandler.badRequest('Nama kategori buku harus diisi!');
    }
  }

  static validate(bookCategory) {
    const instance = new BookCategoryValidator();
    instance.validateName(bookCategory.name);
  }
}

module.exports = BookCategoryValidator;