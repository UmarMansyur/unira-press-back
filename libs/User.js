const { Type } = require('@prisma/client');
const bcrypt = require('bcrypt');
class User {
    constructor(data) {
      this.id = data.id;
      this.username = data.username;
      this.name = data.nama;
      this.password = data.password;
      this.generatePassword = bcrypt.hashSync(data.password, 10);
      this.email = data.email;
      this.thumbnail = data.thumbnail;
      this.type = data.type || Type.USER;
      this.phone = data.phone;
      this.isSimat = data.isSimat || false;
      this.has_verified_email = data.has_verified_email;
    }
}

module.exports = User;