const prisma = require("../utils/client");

class RoleRepository {
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

  async create(role) {
    return await this.prisma.role.create({
      data: role
    });
  }

  async update(id, role) {
    return await this.prisma.role.update({
      where: { id: Number(id) },
      data: role
    });
  }

  async delete(id) {
    return await this.prisma.role.delete({
      where: { id: Number(id) }
    });
  }

  async findAll() {
    return await this.prisma.role.findMany();
  }

  async findById(id) {
    return await this.prisma.role.findUnique({
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
    
    const data = await this.prisma.role.findMany({
      where,
      take: this.limit,
      skip: this.offset
    });

    const total = await this.prisma.role.count({ where });
    return { data, total };
  }
}

module.exports = RoleRepository;