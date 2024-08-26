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
        thumbnail: user.thumbnail || null,
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
      include: {
        UserPrivillege: {
          include: {
            role: true,
          }
        },
      }
    });
  }
  findByUsername(username) {
    return this.prisma.pengguna.findFirst({
      where: {
        username,
      },
      include: {
        UserPrivillege: {
          include: {
            role: true,
          }
        },
      }
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