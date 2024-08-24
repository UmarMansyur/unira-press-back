const ErrorHandler = require('../utils/error');

class NewsValidator {
  validateJudulBerita(judul) {
    if (!judul) {
      return ErrorHandler.badRequest('Judul berita harus diisi');
    }
    return this;
  }
  validateIsi(isi) {
    if (!isi) {
      return ErrorHandler.badRequest('Isi berita harus diisi');
    }
    return this;
  }

  validateCover(cover) {
    if (!cover) {
      return ErrorHandler.badRequest('Cover berita harus diisi');
    }
    return this;
  }

  validateDilihat(dilihat) {
    if (!dilihat) {
      return ErrorHandler.badRequest('Dilihat berita harus diisi');
    }
    return this;
  }

  validatePenulisId(penulis_id) {
    if (!penulis_id) {
      return ErrorHandler.badRequest('Penulis berita harus diisi');
    }
    return this;
  }

  validateId(id) {
    if (!id) {
      return ErrorHandler.badRequest('Id berita harus diisi');
    }
    return this;
  }

  static validateNews(news) {
    const validator = new NewsValidator();
    validator.validateJudulBerita(news.judul_berita)
      .validateIsi(news.isi)
      .validateCover(news.cover)
      .validateDilihat(news.dilihat)
      .validatePenulisId(news.penulis_id);
  }



}

module.exports = NewsValidator;