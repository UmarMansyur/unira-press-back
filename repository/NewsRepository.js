const prisma = require('../utils/client');

class NewsRepository {
  constructor() {
    this.prisma = prisma;
  }

  async create(news) {
    return await this.prisma.news.create({
      data: news
    });
  }

  async findAll() {
    return await this.prisma.news.findMany();
  }

  async findById(id) {
    return await this.prisma.news.findUnique({
      where: {
        id: id
      }
    });
  }

  async update(id, news) {
    return await this.prisma.news.update({
      where: {
        id: id
      },
      data: news
    });
  }
  
  async delete(id) {
    return await this.prisma.news.delete({
      where: {
        id: id
      }
    });
  }
}

module.exports = NewsRepository;