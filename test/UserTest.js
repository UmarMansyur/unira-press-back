const prisma = require("../utils/client");
const bcrypt = require("bcrypt");
class UserTest {
  constructor() {
    this.prisma = prisma;
  }

  static async delete() {
    const userTest = new UserTest();
    await userTest.prisma.pengguna.deleteMany({
      where: {
        id: {
          not: 1
        }
      }
    });
    userTest.prisma.$disconnect();
  }

  static async create() {
    const userTest = new UserTest();
    const result = await userTest.prisma.pengguna.create({
      data: {
        username: "2020520018",
        password: bcrypt.hashSync("158666", 10),
        is_simat: false,
        email: "umar.ovie@gmail.com",
        nama: "Muhammad Umar Mansyur",
        phone: "081234567891",
        has_verified_email: true
      }
    });
    userTest.prisma.$disconnect();
    return result;
  }
}

module.exports = UserTest;