class UserValidator {
  constructor() {
    this.errors = [];
  }

  isUsername(username) {
    if (!username) {
      this.errors.push('Username is required');
    }
  }

  isPhone(phone) {
    if (phone.length < 10) {
      this.errors.push('Phone number is not valid');
    }
  }

  isSimat(isSimat) {
    if(isSimat === null || isSimat === undefined) {
      this.errors.push('Simat is required');
    }
  }


  isEmail(email) {
    if (!email.includes('@')) {
      this.errors.push('Email is not valid');
    }
  }

  isPassword(password) {
    if (password.length < 8) {
      this.errors.push('Password is too short');
    }
  }

  getErrors() {
    return this.errors;
  }
}