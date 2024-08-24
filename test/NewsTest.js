const prisma = require("../utils/client");

class NewsTest {
  constructor() {
    this.prisma = prisma;
  }

  static delete() {
    const newsTest = new NewsTest();
    return newsTest.prisma.news.deleteMany();
  }

  static create(penulis_id) {
    return this.prisma.news.create({
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