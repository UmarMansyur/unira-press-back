const prisma = require("../utils/client");
const path = require('path');
const fs = require('fs');
class NewsTest {
  constructor() {
    this.prisma = prisma;
  }

  static async delete() {
    const newsTest = new NewsTest();
    const getAllNews = await newsTest.prisma.news.findMany();
    await Promise.all(getAllNews.map(async (news) => {
      if (news.cover) {
        if (fs.existsSync(path.join(__dirname, news.cover))) {
          fs.unlinkSync(path.join(__dirname, news.cover));
        }
      }
    }));
    const result = await newsTest.prisma.news.deleteMany();
    return result;
  }

  static async create(penulis_id) {
    const newsTest = new NewsTest();
    return await newsTest.prisma.news.create({
      data: {
        isi: 'isi berita',
        cover: 'cover.jpg',
        judul_berita: 'judul berita',
        dilihat: 0,
        penulis_id: Number(penulis_id),
        tanggal_publish: new Date()
      }
    });
  }
}

module.exports = NewsTest;