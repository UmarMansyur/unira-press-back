const prisma = require('../utils/client');

class NewsRepository {
  constructor() {
    this.prisma = prisma;
  }

  setLimit(limit) {
    this.limit = Number(limit);
    return this;
  }

  setOffset(offset) {
    this.offset = Number(offset);
    return this;
  }

  setSearch(search) {
    this.search = search;
    return this;
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
        id: Number(id)
      }
    });
  }

  async update(id, news) {
    return await this.prisma.news.update({
      where: {
        id: Number(id)
      },
      data: news
    });
  }

  async delete(id) {
    return await this.prisma.news.delete({
      where: {
        id: Number(id)
      }
    });
  }

  async paginate() {
    const where = {};
    if (this.search) {
      where.OR = [
        {
          judul_berita: {
            contains: this.search
          }
        },
        {
          isi: {
            contains: this.search
          }
        }
      ];
    }
    const data = await this.prisma.news.findMany({
      where,
      skip: this.offset,
      take: this.limit,
      include: {
        penulis: {
          select: {
            nama: true
          }
        }
      },
      orderBy: {
        id: 'desc'
      }
    });
    const total = await this.prisma.news.count({
      where
    });
    return {
      data,
      total,
      total_page: Math.ceil(total / this.limit),
      current_page: this.offset / this.limit + 1,
      limit: this.limit
    };
  }
}

module.exports = NewsRepository;