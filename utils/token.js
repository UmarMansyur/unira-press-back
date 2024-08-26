const jwt = require('jsonwebtoken');
const { token } = require('morgan');


const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

const refreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_REFRESH, { expiresIn: '1d' });
}

const decodeTokenRefresh = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_REFRESH);
}

const decodeToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}


module.exports = {
    generateToken,
    refreshToken,
    decodeToken,
    decodeTokenRefresh
}