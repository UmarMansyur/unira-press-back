const User = require('../libs/User.js');
const UserValidator = require('../libs/UserValidator.js');
const UserRepository = require('../repositories/UserRepository.js');
const prisma = require('../utils/client.js');
const ErrorHandler = require('../utils/error.js');
const { sendMail } = require('../utils/nodemailer.js');
const { generateToken, decodeToken, decodeTokenRefresh, refreshToken } = require('../utils/token.js');
const bcrypt = require('bcrypt');
class Authentication {
  constructor() {
    this.user = new UserRepository();
    this.prisma = prisma;
  }

  async refreshToken(req) {
    const token = decodeTokenRefresh(req.body.refresh_token);
    if(!token) {
      return ErrorHandler.badRequest('Invalid token');
    }
    delete token.iat;
    delete token.exp;
    const newToken = generateToken(token);
    const newTokenRefresh = refreshToken(token);
    return {
      access: newToken,
      refresh: newTokenRefresh,
    }
  }

  async register(req) {
    const user = new User();
    user.setUsername(req.body.username).setEmail(req.body.email).setName(req.body.nama).setPassword(req.body.password).setPhone(req.body.phone).setIsSimat(req.body.is_simat);
    UserValidator.validate(user);

    const existingUser = await this.user.findByEmail(user.email);

    if (existingUser) {
      return ErrorHandler.conflictError('User already exists');
    }

    const result = await this.user.create(user);
    await this.prisma.userPrivillege.create({
      data: {
        user_id: result.id,
        role_id: 2,
      },
    });

    const token = generateToken({ id: result.id });

    if (!user.isSimat) {
      const link = process.env.BASE_URL + '/auth/verify?token=' + token;
      await sendMail(result.email, `Email Verification`, `Thank you for registering, click the link below to verify your email <a href="${link}">Verify Email</a>`);
    }
    return result;
  }

  async verifyEmail(req) {
    const { token } = req.query;
    
    if(!token) {
      return ErrorHandler.badRequest('Token not found');
    }

    const tokenDecode = decodeToken(token);
    const id = tokenDecode.id;

    const user = await this.user.findById(id);

    if (user.has_verified_email) {
      return ErrorHandler.conflictError('Email already verified');
    }
    
    await this.user.update(id, { has_verified_email: true });

    return 'Email verified';
  }

  async login(req) {
    const { username, password } = req.body;

    const existUser = await this.user.findByUsername(username);

    if (!existUser || existUser.is_simat) {
      return this.loginSimat(req);
    }

    const user = await this.user.findByUsername(username);

    if (!user) {
      return ErrorHandler.notFound('Pengguna tidak ditemukan');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return ErrorHandler.unAuthorized('Password tidak sesuai!');
    }

    if(!user.has_verified_email) {
      await sendMail(user.email, 'Email Verification', 'Click the link below to verify your email <a href="' + link + '">Verify Email</a>');
      return ErrorHandler.unAuthorized('Email belum diverifikasi, silahkan cek email anda');
    }

    const payload = {
      id: user.id,
      roles: user.UserPrivillege.map(role => role.role.name)
    }

    const token = generateToken(payload);
    const refresh = refreshToken(payload);
    return {
      access: token,
      refresh: refresh,
    }
  }

  async loginSimat(req) {
    const { username, password } = req.body;
    const user = await this.fetchSimat(username, password);
    const roles = [];
    const existUser = await this.user.findByUsername(username);
    if(existUser && existUser.UserPrivillege) {
      existUser.UserPrivillege.forEach(role => {
        roles.push(role.role.name);
      });
    }
    let payload = {};
    if (existUser) {
      await this.user.update(existUser.id, {
        email: user.email,
        username: user.username,
        password: user.generatePassword,
        phone: user.phone,
        is_simat: user.isSimat,
        has_verified_email: user.has_verified_email,
        thumbnail: user.thumbnail,
      });
      payload = {
        id: existUser.id,
        roles: roles,
      }
    } else {
      user.password = password;
      user.generatePassword = bcrypt.hashSync(password, 10);
      user.isSimat = true;
      user.has_verified_email = true;
      user.thumbnail = user.thumbnail;
      const result = await this.user.create(user);
      await this.prisma.userPrivillege.create({
        data: {
          user_id: result.id,
          role_id: 2,
        },
      });
      roles.push('Pengguna');
      payload = {
        id: result.id,
        roles: roles,
      }
    }
    

    return {
      access: generateToken(payload),
      refresh: refreshToken(payload),
    }
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
    if(!result.ok) {
      return ErrorHandler.unAuthorized('Username atau password tidak sesuai');
    }
    const token = data.data.attributes.access;

    const user = await this.getDataFromSimat(token);
    return user;
  }

  async getDataFromSimat(token) {
    const response = await fetch('https://api.unira.ac.id/v1/saya', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    const result = data.data.attributes;
    const user = new User();
    user.setUsername(data.data.id).setEmail(result.email).setName(result.nama).setIsSimat(true).setThumbnail('https://api.unira.ac.id/' + result.thumbnail);
    return user;
  }

  async forgotPassword(req) {
    const user = await this.user.findByEmail(req.body.email);

    if (!user) {
      return ErrorHandler.notFound('User not found');
    }

    if (user.is_simat) {
      return ErrorHandler.badRequest('Anda terdaftar sebagai pengguna SIMAT, silahkan reset password melalui SIMAT');
    }

    const token = generateToken({ id: user.id });
    const link = process.env.CLIENT_URL + '/reset?token=' + token;
    await sendMail(user.email, 'Reset Password', 'Click the link below to reset your password <a href="' + link + '">Reset Password</a>');
    return 'Email sent';
  }

  async whoami(req) {
    const { id } = req.user;
    const user = await this.user.findById(id);
    return user;
  }

  async resetPassword(req) {
    const { token, password } = req.body;
    const decode = decodeToken(token);
    const id = decode.id;

    if (!id) {
      return ErrorHandler.badRequest('Invalid token');
    }

    await this.user.update(id, { password: bcrypt.hashSync(password, 10) });
    return 'Password reset';
  }

  async changePassword(req) {
    const { id, password } = req.body;
    const user = await this.user.findById(id);

    if (user.is_simat) {
      return ErrorHandler.badRequest('Anda terdaftar sebagai pengguna SIMAT, silahkan reset password melalui SIMAT');
    }

    await this.user.update(id, { password: bcrypt.hashSync(password, 10) });
    return 'Password changed';
  }
}

module.exports = Authentication;