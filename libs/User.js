const { Type } = require('@prisma/client');
const bcrypt = require('bcrypt');
class User {
    setId(id) {
      this.id = id;
      return this;
    }

    setUsername(username) {
      this.username = username;
      return this;
    }

    setName(name) {
      this.name = name;
      return this;
    }

    setPassword(password) {
      this.password = password;
      this.generatePassword = bcrypt.hashSync(password, 10);
      return this;
    }

    setEmail(email) {
      this.email = email;
      return this;
    }

    setThumbnail(thumbnail) {
      this.thumbnail = thumbnail;
      return this;
    }

    setType(type) {
      this.type = type;
      return this;
    }

    setPhone(phone) {
      this.phone = phone;
      return this;
    }

    setIsSimat(isSimat) {
      this.isSimat = isSimat;
      return this;
    }

    setHasVerifiedEmail(hasVerifiedEmail) {
      this.has_verified_email = hasVerifiedEmail;
      return this;
    }

    toObject() {
      return {
        id: this.id,
        username: this.username,
        name: this.name,
        email: this.email,
        thumbnail: this.thumbnail,
        type: this.type,
        phone: this.phone,
        is_simat: this.isSimat,
        has_verified_email: this.has_verified_email,
      };
    }
}

module.exports = User;