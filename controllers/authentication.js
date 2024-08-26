const Authentication = require("../services/authentication");
const { responseSuccess } = require("../utils/response.handler");

class AuthenticationController {
  async register(req, res, next) {
    try {
      const auth = new Authentication(req);
      const result = await auth.register(req);
      return responseSuccess(res, result, 'Pengguna berhasil diregistrasi', 201);
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const auth = new Authentication();
      const result = await auth.refreshToken(req);
      return responseSuccess(res, result, 'Berhasil mendapatkan token baru', 200);
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req, res, next) {
    try {
      const auth = new Authentication(req);
      await auth.verifyEmail(req);
      return responseSuccess(res, null, 'Verifikasi Email berhasil', 200);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const auth = new Authentication(req);
      const result = await auth.login(req);
      return responseSuccess(res, result, 'Login berhasil', 200);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const auth = new Authentication();
      const result = await auth.forgotPassword(req);
      return responseSuccess(res, result, 'Link reset password berhasil dikirim ke email', 200);
    } catch (error) {
      next(error);
    }
  }

  async whoami(req, res, next) {
    try {
      const auth = new Authentication();
      const result = await auth.whoami(req);
      return responseSuccess(res, result, 'Berhasil mendapatkan data user', 200);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const auth = new Authentication();
      const result = await auth.resetPassword(req);
      return responseSuccess(res, result, 'Password berhasil direset', 200);
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const auth = new Authentication();
      const result = await auth.changePassword(req);
      return responseSuccess(res, result, 'Password berhasil diubah', 200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthenticationController;