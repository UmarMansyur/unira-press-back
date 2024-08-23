const prisma = require("../utils/client");

class UserRepository {
  constructor() {
    this.prisma = prisma;
  }
  create(user) {
    return this.prisma.pengguna.create({
      data: {
        username: user.username,
        password: user.generatePassword,
        email: user.email,
        nama: user.name,
        phone: user.phone,
        is_simat: user.isSimat,
        type: user.type,
        has_verified_email: user.has_verified_email,
      }
    });
  };
  update(id, data) {
    return this.prisma.pengguna.update({
      where: {
        id,
      },
      data,
    });
  };
  destroy(id) {
    return this.prisma.pengguna.delete({
      where: {
        id,
      },
    });
  }
  findAll() {
    return this.prisma.pengguna.findMany();
  }
  findById(id) {
    return this.prisma.pengguna.findUnique({
      where: {
        id,
      },
    });
  }
  findByUsername(username) {
    return this.prisma.pengguna.findFirst({
      where: {
        username,
      },
    });
  }
  findByEmail(email) {
    return this.prisma.pengguna.findFirst({
      where: {
        email,
      },
    });
  }
}

module.exports = UserRepository;