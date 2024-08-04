const bcrypt = require('bcrypt');

const validatePassword = async (password, hasPassword) => {
    return bcrypt.compareSync(password, hasPassword);
}

const generatePassword = async (password) => {
    return await bcrypt.hashSync(password, 10);
}

module.exports = {
    validatePassword, generatePassword
}