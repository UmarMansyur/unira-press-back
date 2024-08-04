const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/error");

function authorize(roles = []) {
    if (typeof roles === "string") {
        roles = [roles];
    }
    return [
        (req, res, next) => {
            try {
                const token = req.headers["authorization"];
                if (!token) {
                    return ErrorHandler.unAuthorized('You are not authorized');
                }
                const bearerToken = token.split(" ")[1];
                const user = jwt.verify(bearerToken, process.env.JWT_SECRET);
                if (roles.length > 0) {
                    let valid = '';
                    if (typeof user.role === `string`) {
                        valid = roles.find((level) => level === user.role);
                    } else {
                        if (user.role.length > 0) {
                            valid = user.role.find((level) => roles.includes(level));
                        }
                    }
                    if (!valid) {
                        return ErrorHandler.unAuthorized('You are not authorized');
                    }
                }

                req.user = user;
                next();
            } catch (error) {
                if (error.message === "jwt malformed") {
                    return ErrorHandler.unAuthorized('You are not authorized');
                }
                next(error);
            }
        },
    ];
}

module.exports = authorize;