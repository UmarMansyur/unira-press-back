const Authentication = require("../services/authentication");
const { responseSuccess, responseError } = require("../utils/response.handler");

class AuthenticationController {
  async register(req, res, next) {
    try {
      const auth = new Authentication(req);
      const result = await auth.register(req);
      return responseSuccess(res, result, 'User registered successfully', 201);
    } catch (error) {
      next(error);
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

  async forgotPassword(req, res, next) {
    try {
      const auth = new Authentication();
      const result = await auth.forgotPassword(req);
      return responseSuccess(res, result, 'Email sent successfully');
    } catch (error) {
      next(error); 
    }
  }

  async resetPassword(req, res, next) {
    try {
      const auth = new Authentication();
      const result = await auth.resetPassword(req);
      return responseSuccess(res, result, 'Password reset successfully');
    } catch (error) {
      next(error)
    }
  }

  async changePassword(req, res, next) {
    try {
      const auth = new Authentication();
      const result = await auth.changePassword(req);
      return responseSuccess(res, result, 'Password changed successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthenticationController;