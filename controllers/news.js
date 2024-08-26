const NewsService = require("../services/news");
const { responseSuccess } = require('../utils/response.handler');

class NewsController {
  async createNews(req, res, next) {
    try {
      const news = new NewsService();
      const result = await news.create(req);
      return responseSuccess(res, result, 'Berita berhasil ditambahkan!', 201)
    } catch (error) {
      next(error);
    }
  }

  async updateNews(req, res, next) {
    try {
      const news = new NewsService();
      const result = await news.update(req);
      return responseSuccess(res, result, 'Berita berhasil dirubah!')
    } catch (error) {
      next(error);
    }
  }

  async deleteNews(req, res, next) {
    try {
      const news = new NewsService();
      const result = await news.delete(req);
      return responseSuccess(res, result, 'Berita berhasil dihapus')
    } catch (error) {
      next(error);
    }
  }

  async findAllNews(req, res, next) {
    try {
      const news = new NewsService();
      const result = await news.findAll(req);
      return responseSuccess(res, result, 'Berita berhasil didapatkan!')
    } catch (error) {
      next(error);
    }
  }

  async updateViewCount(req, res, next) {
    try {
      const news = new NewsService();
      const result = await news.updateViewCount(Number(req.params.id));
      return responseSuccess(res, result, 'Berita berhasil dilihat!')
    } catch (error) {
      next(error);
    }
  }

  async findNewsById(req, res, next) {
    try {
      const news = new NewsService();
      const result = await news.findById(req);
      return responseSuccess(res, result, 'Berita berhasil didapatkan!')
    } catch (error) {
      next(error);
    }
  }
}

module.exports = NewsController;