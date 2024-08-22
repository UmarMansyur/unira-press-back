const prisma = require('../utils/client.js');
const ErrorHandler = require('../utils/error.js');
class Authentication {
  constructor() {
    this.prisma = prisma;
  }

  async validateUsername(req) {
    if(!req.body.username || req.body.username === "") {
      ErrorHandler.badRequest("Username is required");
    }
    this.validatePassword(req);
  }

  async validatePassword(req) {
    if(!req.body.password || req.body.password === "") {
      ErrorHandler.badRequest("Password is required");
    }
  }

  async 

  async registerUser(data) {
    return await this.prisma.pengguna.create({
      data: data
    });
  }
}