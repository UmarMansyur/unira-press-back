const BookCategoryRepository = require('../repositories/BookCategoryRepository');
const BookCategory = require('../libs/BookCategory');
const BookCategoryValidator = require('../libs/BookCategoryValidator');

class BookCategoryService {
  constructor() {
    this.bookCategoryRepository = new BookCategoryRepository();
  }

  async checkDuplicateName(name, id = null) {
    const bookCategory = await this.bookCategoryRepository.findByName(name);
    if (bookCategory && !id) {
      throw new Error('Nama kategori buku sudah digunakan!');
    }
    if (bookCategory && id !== bookCategory.id) {
      throw new Error('Nama kategori buku sudah digunakan!');
    }
  }

  async create(req) {
    const { name } = req.body;
    const bookCategory = new BookCategory(null, name);
    BookCategoryValidator.validate(bookCategory);
    await this.checkDuplicateName(name);
    delete bookCategory.id;
    return await this.bookCategoryRepository.create(bookCategory);
  }

  async update(req) {
    const { id } = req.params;
    const { name } = req.body;

    const bookCategory = new BookCategory(id, name);
    BookCategoryValidator.validate(bookCategory);
    await this.checkDuplicateName(name, id);
    return await this.bookCategoryRepository.update(id, bookCategory);
  }

  async delete(req) {
    const { id } = req.params;
    return await this.bookCategoryRepository.delete(id);
  }

  async findAll() {
    return await this.bookCategoryRepository.findAll();
  }

  async findById(req) {
    const { id } = req.params;
    return await this.bookCategoryRepository.findById(id);
  }

  async paginate(req) {
    const { limit = 10, page = 1, search } = req.query;
    const offset = (page - 1) * limit;
    return await this.bookCategoryRepository.setLimit(limit)
      .setOffset(offset)
      .setSearch(search)
      .paginate();
  }
}

module.exports = BookCategoryService;