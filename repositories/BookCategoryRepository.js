const prisma = require("../utils/client");

class BookCategoryRepository {
  constructor() {
    this.prisma = prisma;
  }

  setLimit(limit) {
    this.limit = limit;
    return this;
  }

  setOffset(offset) {
    this.offset = offset;
    return this;
  }

  setSearch(search) {
    this.search = search;
    return this;
  }

  async create(book) {
    return await this.prisma.bookCategory.create({
      data: book
    });
  }

  async update(id, book) {
    return await this.prisma.bookCategory.update({
      where: { id: Number(id) },
      data: book
    });
  }

  async delete(id) {
    return await this.prisma.bookCategory.delete({
      where: { id: Number(id) }
    });
  }

  async findAll() {
    return await this.prisma.bookCategory.findMany();
  }

  async findById(id) {
    return await this.prisma.bookCategory.findUnique({
      where: { id: Number(id) }
    });
  }

  async paginate() {
    const where = {};
    if (this.search) {
      where.OR = [
        { name: { contains: this.search } }
      ];
    }
    
    const data = await this.prisma.bookCategory.findMany({
      where,
      take: this.limit,
      skip: this.offset
    });

    const total = await this.prisma.bookCategory.count({ where });
    return { data, total };
  }

  async findByName(name) {
    return await this.prisma.bookCategory.findUnique({
      where: { name: name }
    });
  }
}

module.exports = BookCategoryRepository;