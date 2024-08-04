
const authService = require('../services/auth.service')

const login = async (req, res, next) => {
  try {
    if(req.body.client === "simat") {
      const data = await authService.loginSimat(req);
      return res.status(200).json({
        data: data
      });
    }
    const user = await authService.login(req);
    return res.status(200).json({
      data: user
    });
  } catch (error) {
    next(error);
  }
}

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req);
    return res.status(201).json({
        data: user
    });
  } catch (e) {
    next(e);
  }
}


const refreshToken = async (req, res, next) => {
  try {
    const user = await authService.refreshToken(req);
    return res.status(200).json({
      data: user
    });
  } catch (error) {
    next(error);
  }
}

const decodeToken = async (req, res, next) => {
  try {
    const user = await authService.decodeToken(req);
    return res.status(200).json({
      data: user
    });
  } catch (error) {
    next(error);
  }
}


module.exports = {
  login,
  register,
  decodeToken,
  refreshToken
}