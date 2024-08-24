const NewsValidator = require("../libs/NewsValidator");
const NewsRepository = require("../repository/NewsRepository");

class NewsService {
  constructor() {
    this.news = new NewsRepository();
  }
  async create(req) {
    const user = req.user;
    const file = req.file;
    const news = new News();
    news.setJudulBerita(req.body.judul_berita).setIsi(req.body.isi).setCover(req.body.cover).setDilihat(req.body.dilihat).setPenulisId(user.id).setCover(file.path);
    NewsValidator.validateNews(news);
    return await NewsRepository.create(news);
  }

  async update(req) {
    const news = new News();
    const newsData = await this.news.findById(req.params.id);
    news.setId(req.params.id).setCover(newsData.cover || file.path).setJudulBerita(req.body.judul_berita || newsData.judul_berita).setIsi(req.body.isi || newsData.isi).setDilihat(req.body.dilihat || newsData.dilihat).setPenulisId(user.id || newsData.penulis_id);
    NewsValidator.validateNews(news);
    return await NewsRepository.update(req.params.id, news);
  }

  async delete(req) {
    const news = new News();
    news.setId(req.params.id);
    NewsValidator.validateId(news.id);
    return await NewsRepository.delete(news.id);
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