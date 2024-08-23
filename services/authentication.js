const User = require('../libs/User.js');
const UserValidator = require('../libs/UserValidator.js');
const prisma = require('../utils/client.js');
const ErrorHandler = require('../utils/error.js');
const { sendMail } = require('../utils/nodemailer.js');
const { generateToken, decodeToken } = require('../utils/token.js');
const bcrypt = require('bcrypt');
class Authentication {
  constructor() {
    this.prisma = prisma;
  }

  async checkExistingUser(req) {
    return await prisma.pengguna.findFirst({
      where: {
        email: req.body.email,
      },
    });
  }

  async register(req) {
    UserValidator.validate(req);
    const user = new User(req);
    const existingUser = await this.checkExistingUser(req);
    if (existingUser) {
      return ErrorHandler.conflictError('User already exists');
    }

    const result = await prisma.pengguna.create({
      data: {
        username: user.username,
        password: user.generatePassword,
        email: user.email,
        nama: user.name,
        phone: user.phone,
        is_simat: user.isSimat,
        type: user.type,
        has_verified_email: false,
      },
    });

    const id = JSON.stringify(result.id);

    const token = generateToken({ id: `${id}` });

    if (!this.user.isSimat) {
      const link = process.env.BASE_URL + '/auth/verify?token=' + token;
      await sendMail(result.email, `Email Verification`, `Thank you for registering, click the link below to verify your email <a href="${link}">Verify Email</a>`);
    }
    return result;
  }

  async verifyEmail(req) {
    const token = req.query.token;
    const decode = decodeToken(token);
    const id = decode.id;


    const user = await this.getUser(req);
    if (user.has_verified_email) {
      return ErrorHandler.conflictError('Email already verified');
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        has_verified_email: true,
      },
    });

    return 'Email verified';
  }

  async login(req) {
    const { username, password, is_simat } = req.body;

    if (is_simat) {
      return this.loginSimat(req);
    }

    const user = await prisma.pengguna.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return ErrorHandler.notFound('User not found');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return ErrorHandler.unauthorized('Invalid password');
    }

    return generateToken({ id: user.id });
  }

  async loginSimat(req) {
    const { username, password } = req.body;
    await this.fetchSimat(username, password);
    const existUser = await prisma.pengguna.findFirst({
      where: {
        username: this.user.username,
      },
    });
    if (existUser) {
      this.user.id = existUser.id;
      await prisma.pengguna.update({
        where: {
          id: this.user.id,
        },
        data: {
          email: this.user.email,
          username: this.user.username,
          password: this.user.generatePassword,
          phone: this.user.phone,
          is_simat: this.user.isSimat,
          has_verified_email: this.user.has_verified_email,
          thumbnail: this.user.thumbnail,
        },
      });
    } else {
      req.body = this.user;
      const result = await this.register(req);
      this.user.id = result.id;
    }
    return generateToken({ id: this.user.id });
  }

  async fetchSimat(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    const result = await fetch('https://api.unira.ac.id/v1/token', {
      method: 'POST',
      body: formData,
    });
    const data = await result.json();
    const token = data.data.attributes.access;

    this.user.username = username;
    this.user.password = password;

    return await this.getDataFromSimat(token);
  }

  async getDataFromSimat(token) {
    const response = await fetch('https://api.unira.ac.id/v1/saya', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const result = data.data.attributes;
    // return {
    //   email: result.email,
    //   phone: null,
    //   name: result.nama,
    //   is_simat: true,
    //   generatePassword = 
    // }
    this.user.email = result.email;
    this.user.phone = null;
    this.user.name = result.nama;
    this.user.isSimat = true;
    this.user.generatePassword = bcrypt.hashSync(this.user.password, 10);
    this.user.has_verified_email = true;
    this.user.thumbnail = 'https://api.unira.ac.id/' + result.thumbnail;
  }

  async forgotPassword(req) {
    const { email } = req.body;
    const user = await prisma.pengguna.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return ErrorHandler.notFound('User not found');
    }

    if (user.is_simat) {
      return ErrorHandler.badRequest('Anda terdaftar sebagai pengguna SIMAT, silahkan reset password melalui SIMAT');
    }

    const token = generateToken({ id: user.id });

    await sendMail(user.email, 'Reset Password', 'Click the link below to reset your password <a href="http://localhost:3000/reset?token=' + token + '">Reset Password</a>');
    return 'Email sent';
  }

  async resetPassword(req) {
    const { token, password } = req.body;
    const decode = decodeToken(token);
    const id = decode.id;

    await prisma.pengguna.update({
      where: {
        id,
      },
      data: {
        password: bcrypt.hashSync(password, 10),
      },
    });

    return 'Password reset';
  }

  async changePassword(req) {
    const { id, oldPassword, newPassword } = req.body;
    const user = await this.getUser(req);

    if (user.is_simat) {
      return ErrorHandler.badRequest('Anda terdaftar sebagai pengguna SIMAT, silahkan reset password melalui SIMAT');
    }

    if (!bcrypt.compareSync(oldPassword, user.password)) {
      return ErrorHandler.unauthorized('Invalid password');
    }

    await prisma.pengguna.update({
      where: {
        id,
      },
      data: {
        password: bcrypt.hashSync(newPassword, 10),
      },
    });

    return 'Password changed';
  }

  async getUser(req) {
    const { id } = req.body;
    return await prisma.pengguna.findFirst({
      where: {
        id,
      },
    });
  }



}

module.exports = Authentication;