const prisma = require('../utils/client');

class BookCategoryTest {
  constructor() {
    this.prisma = prisma;
  }

  static async create() {
    const bookCategoryTest = new BookCategoryTest();
    return await bookCategoryTest.prisma.bookCategory.create({
      data: {
        name: 'Terjemahan Fiksi',
      }
    });
  }

  static async delete() {
    const bookCategoryTest = new BookCategoryTest();
    await bookCategoryTest.prisma.bookCategory.deleteMany({
      where: {
        id: {
          notIn: [1, 2, 3, 4, 5]
        }
      }
    });
  }
}

module.exports = BookCategoryTest

