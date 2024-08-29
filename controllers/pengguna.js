const prisma = require("../utils/client");
const { responseSuccess } = require("../utils/response.handler");
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

const paginate = async(req, res, next) => {
  try {
    const { limit = 10,page = 1, search = '' } = req.query;
    const offset = (page - 1) * limit;
    const response = await prisma.pengguna.findMany({
      where: {
        nama: {
          contains: search
        }
      },
      include: {
        UserPrivillege: {
          include: {
            role: true
          }
        }
      },
      skip: Number(offset),
      take: Number(limit)
    });

    const total = await prisma.pengguna.count({
      where: {
        nama: {
          contains: search
        }
      }
    });

    
    const data = {
      data: response,
      page: Number(page),
      limit: Number(limit),
      total: total,
      total_page: Math.ceil(total / limit),
      current_page: Number(page),

    }
    return responseSuccess(res, data, 'Data pengguna berhasil diambil');
  } catch (error) {
    next(error);
  }
}

const hapusPrivillege = async(req, res, next) => {
  try {
    const { id } = req.params;
    const response = await prisma.userPrivillege.delete({
      where: {
        id: Number(id)
      }
    });
    return responseSuccess(res, response, 'Privillege berhasil dihapus');
  } catch (error) {
    next(error);
  }
}

const tambahPrivillege = async(req, res, next) => {
  try {
    const { user_id, role_id } = req.body;
    const exist = await prisma.userPrivillege.findFirst({
      where: {
        user_id: Number(user_id),
        role_id: Number(role_id)
      }
    });

    if (exist) {
      return responseSuccess(res, exist, 'Hak akses sudah ada', 200);
    }

    const response = await prisma.userPrivillege.create({
      data: {
        user_id: Number(user_id),
        role_id: Number(role_id)
      }
    });
    return responseSuccess(res, response, 'Privillege berhasil ditambahkan', 201);
  } catch (error) {
    next(error);
  }
}

const hapusUser = async(req, res, next) => {
  try {
    const { id } = req.params;
    const response = await prisma.pengguna.delete({
      where: {
        id: Number(id)
      }
    });
    return responseSuccess(res, response, 'Pengguna berhasil dihapus');
  } catch (error) {
    next(error);
  }
}

const updateProfile = async(req, res, next) => {
  try {
    const file = req.file;
    const data = {
      nama: req.body.nama,
      email: req.body.email,
      phone: req.body.phone,
    }
    const existUser = await prisma.pengguna.findFirst({
      where: {
        id: Number(req.user.id)
      }
    });

    if(!existUser) {
      return responseSuccess(res, null, 'User tidak ditemukan', 404);
    }



    if(file && existUser.thumbnail) {
      if(fs.existsSync(path.join(__dirname, `../${existUser.thumbnail}`))) {
        fs.unlinkSync(path.join(__dirname, `../${existUser.thumbnail}`));
      }
    }

    if(file) {
      data.thumbnail = process.env.BASE_URL + '/' + file.path;
    }

    const response = await prisma.pengguna.update({
      data: {
        ...data
      },
      where: {
        id: Number(req.user.id)
      }
    });
    return responseSuccess(res, response, 'Profile berhasil diupdate');
  } catch (error) {
    next(error)
  }
}
const updateAkun = async(req, res, next) => {
  try {
    const exist = await prisma.pengguna.findFirst({
      where: {
        id: Number(req.params.id)
      }
    });

    const data = {
      username: req.body.username,
      password: req.body.password
    }
    data.password = await bcrypt.hash(data.password, 10);
    const result = await prisma.pengguna.update({
      data: {
        ...data
      },
      where: {
        id: Number(req.params.id)
      }
    });
    return responseSuccess(res, result, 'Akun berhasil diupdate');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  paginate,
  hapusPrivillege,
  tambahPrivillege,
  hapusUser,
  updateProfile,
  updateAkun
}
