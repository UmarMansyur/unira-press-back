const prisma = require("../utils/client");
const errorHandler = require('../utils/error');
const { validatePassword, generatePassword } = require("../utils/checker");
const { generateToken, refreshToken } = require("../utils/token");
const jwt = require('jsonwebtoken');

class AuthService {
    constructor() {
        this.prisma = prisma;
    }

    async getSaya(token) {
        try {
            const result = await fetch('https://api.unira.ac.id/v1/saya', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await result.json();
            if (!result.ok) {
                return errorHandler.unAuthorized(data.message);
            }
            const payload = {
                id: data.data.id,
                username: data.data.attributes.nama,
                thumbnail: 'https://api.unira.ac.id/' + data.data.attributes.thumbnail,
                email: data.data.attributes.email,
                role: 'client'
            };
            return {
                access: generateToken(payload),
                refresh: refreshToken(payload)
            };
        } catch (e) {

        }
    }

    async loginSimat(req) {
        const { username, password } = req.body;
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        const result = await fetch('https://api.unira.ac.id/v1/token', {
            method: 'POST',
            body: formData
        });
        const data = await result.json();

        if (!result.ok) {
            return errorHandler.unAuthorized(data.message);
        }
        return this.getSaya(data.data.attributes.access);
    }

    async login(req) {
        try {
            const { username, password } = req.body;

            const user = await this.prisma.admin.findUnique({
                where: {
                    username: username
                }
            });

            if (!user) {
                return errorHandler.unAuthorized('Invalid username or password');
            }

            const valid = await validatePassword(password, user.password);

            if (!valid) {
                return errorHandler.unAuthorized('Invalid username or password');
            }

            const payload = {
                id: user.username,
                username: user.username,
                thumbnail: user.thumbnail,
                email: user.email,
                role: 'admin'
            };

            return {
                access: generateToken(payload),
                refresh: refreshToken(payload)
            };
        } catch (error) {
            throw error;
        }
    }

    async register(req) {
        try {
            const { username, password, email } = req.body;

            return await this.prisma.admin.create({
                data: {
                    email: email,
                    username: username,
                    password: await generatePassword(password)
                }
            });

        } catch (error) {
            throw error;
        }
    }

    async refreshToken(req) {
        try {
            const { refresh_token } = req.body;
            const valid = jwt.verify(refresh_token, process.env.JWT_SECRET_REFRESH);
            if (!valid) {
                return errorHandler.unAuthorized('Invalid refresh token');
            }
            const payload = {
                id: valid.id,
                username: valid.username,
                thumbnail: valid.thumbnail,
                email: valid.email,
                role: valid.role
            };
            return {
                access: generateToken(payload),
                refresh: refreshToken(payload)
            };
        } catch (error) {
            throw error;
        }

    }

    async decodeToken(req) {
        try {
            const user = req.user;
            if (!user) {
                return errorHandler.unAuthorized('Invalid token');
            }
            return user;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new AuthService();