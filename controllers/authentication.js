const Authentication = require("../services/authentication");
const { responseSuccess, responseError } = require("../utils/response.handler");

class AuthenticationController {

  async register(req, res) {
    try {
      const auth = new Authentication(req);
      const result = await auth.register(req);
      return responseSuccess(res, result, 'User registered successfully', 201);
    } catch (error) {
      return responseError(res, error, error.message, error.code);
    }
  }

  async verifyEmail(req, res, next) {
    try {
      const auth = new Authentication(req);
      await auth.verifyEmail(req);
      return responseSuccess(res, null, 'Email verified successfully');
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const auth = new Authentication(req);
      const result = await auth.login(req);
      return responseSuccess(res, result, 'User logged in successfully');
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res) {
    await this.auth.forgotPassword(req);
    return responseSuccess(res, null, 'Email sent successfully');
  }

  async resetPassword(req, res) {
    await this.auth.resetPassword(req);
    return responseSuccess(res, null, 'Password reset successfully');
  }

  async changePassword(req, res) {
    await this.auth.changePassword(req);
    return responseSuccess(res, null, 'Password changed successfully');
  }
}

module.exports = AuthenticationController;