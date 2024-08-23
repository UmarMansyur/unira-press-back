const ErrorHandler = require("../utils/error");

class UserValidator {
  constructor() {
    this.errors = [];
  }

  isUsername(username) {
    if (!username) {
      return ErrorHandler.badRequest('Username is required');
    }

    if(typeof username !== 'string') {
      return ErrorHandler.badRequest('Username is not valid');
    }

    const usernameBody = username.toString();

    if (usernameBody.length < 4) {
      return ErrorHandler.badRequest('Username is too short');
    }

    return this;
  }

  isPhone(phone) {
    if (!phone) {
      return this;
    }
    if (phone.length < 10) {
      return ErrorHandler.badRequest('Phone number is not valid');
    }
    return this;
  }

  isSimat(isSimat) {
    if (isSimat === null || isSimat === undefined) {
      return ErrorHandler.badRequest('Simat is required');
    }
    return this;
  }


  isEmail(email) {
    if (!email.includes('@')) {
      return ErrorHandler.badRequest('Email is not valid');
    }
    return this;
  }

  isPassword(password) {
    if (password.length < 4) {
      return ErrorHandler.badRequest('Password is too short');
    }
    return this;
  }

  static validate(user) {
    const validator = new UserValidator();
    validator.isUsername(user.username).isEmail(user.email).isPassword(user.password).isPhone(user.phone).isSimat(user.isSimat);
  }
}

module.exports = UserValidator;