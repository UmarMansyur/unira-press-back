const BookService = require('../services/bookCategory');
const { responseSuccess } = require('../utils/response.handler');
class BookController {
  constructor() {
    this.bookService = new BookService();
  }

  async create(req, res, next) {
    try {
      const result = await this.bookService.create(req);
      return responseSuccess(res, result, 'Buku berhasil ditambahkan!', 201);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const result = await this.bookService.update(req);
      return responseSuccess(res, result, 'Buku berhasil dirubah!');
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await this.bookService.delete(req);
      return responseSuccess(res, result, 'Buku berhasil dihapus!');
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      if(req.query.limit && req.query.page){
        let result = await this.bookService.paginate(req);
        return responseSuccess(res, result, 'Daftar buku berhasil ditampilkan!');
      }
      let result = await this.bookService.findAll();
      return responseSuccess(res, result, 'Daftar buku berhasil ditampilkan!');
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const result = await this.bookService.findById(req);
      return responseSuccess(res, result, 'Detail buku berhasil ditampilkan!');
    } catch (error) {
      next(error);
    }
  }

  async paginate(req, res, next) {
    try {
      const result = await this.bookService.paginate(req);
      return responseSuccess(res, result, 'Daftar buku berhasil ditampilkan!');
    } catch (error) {
      next(error);
    }
  }

}

module.exports = BookController;

