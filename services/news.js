const NewsValidator = require("../libs/NewsValidator");
const NewsRepository = require("../repositories/NewsRepository");
const News = require("../libs/News");
const fs = require("fs");
const path = require("path");
const ErrorHandler = require("../utils/error");
class NewsService {
  constructor() {
    this.news = new NewsRepository();
  }

  async updateViewCount(id) {
    const newsData = await this.news.findById(id);
    if(!newsData) {
      return ErrorHandler.badRequest("Berita tidak ditemukan");
    }
    const news = new News();
    news.setId(id).setDilihat(newsData.dilihat + 1);
    return await this.news.update(id, news);
  }

  async create(req) {
    const user = req.user;
    const file = req.file;
    const news = new News();
    news.setJudulBerita(req.body.judul_berita).setIsi(req.body.isi).setDilihat(req.body.dilihat).setPenulisId(user.id);
    if (file) {
      news.setCover(file.path);
    }
    NewsValidator.validateNews(news);
    return await this.news.create(news);
  }

  async deleteFile(filePath) {
    if (fs.existsSync(path.join(__dirname, '../', filePath))) {
      fs.unlinkSync(path.join(__dirname, '../', filePath));
    }
  }

  async update(req) {
    const news = new News();

    const newsData = await this.news.findById(req.params.id);
    if (!newsData) {
      return ErrorHandler.badRequest("Berita tidak ditemukan");
    }

    if (req.user.id !== newsData.penulis_id) {
      return ErrorHandler.forbidden("Anda tidak memiliki akses untuk mengupdate berita ini");
    }

    const file = req.file;

    news.setId(req.params.id).setCover(newsData.cover || file.path).setJudulBerita(req.body.judul_berita || newsData.judul_berita).setIsi(req.body.isi || newsData.isi).setDilihat(req.body.dilihat || newsData.dilihat).setPenulisId(req.user.id);

    if (file) {
      news.setCover(file.path);
      if (newsData.cover) {
        this.deleteFile(newsData.cover);
      }
    }

    NewsValidator.validateNews(news);
    delete news.id;

    return await this.news.update(req.params.id, news);
  }

  async delete(req) {
    const news = new News();
    news.setId(req.params.id);
    const newsValidator = new NewsValidator();
    newsValidator.validateId(news.id);
    const newsData = await this.news.findById(news.id);

    if (!newsData) {
      return ErrorHandler.badRequest("Berita tidak ditemukan");
    }

    if (req.user.id !== newsData.penulis_id) {
      return ErrorHandler.forbidden("Anda tidak memiliki akses untuk menghapus berita ini");
    }

    if (newsData.cover) {
      this.deleteFile(newsData.cover);
    }
    
    return await this.news.delete(news.id);
  }

  async findAll(req) {
    const { limit = 10, page = 1, search = "" } = req.query;
    const offset = (page - 1) * limit;
    return await this.news.setLimit(limit).setOffset(offset).setSearch(search).paginate();
  }

  async findById(req) {
    const news = new News();
    news.setId(req.params.id);
    NewsValidator.validateId(news.id);
    return await this.news.findById(news.id);
  }
}

module.exports = NewsService;