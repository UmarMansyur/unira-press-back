const RoleService = require('../services/role');
const { responseSuccess } = require('../utils/response.handler');

class RoleController {
  constructor() {
    this.roleService = new RoleService()
  }
  
  async create(req, res, next) {
    try {
      const result = await this.roleService.create(req);
      return responseSuccess(res, result, 'Role berhasil ditambahkan!', 201)
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const result = await this.roleService.update(req);
      return responseSuccess(res, result, 'Role berhasil dirubah!')
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await this.roleService.delete(req);
      return responseSuccess(res, result, 'Role berhasil dihapus');
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      let result = null;
      if(req.query.limit && req.query.page) {
        result = await this.roleService.paginate(req);
      } else {
        result = await this.roleService.findAll();
      }
      return responseSuccess(res, result, 'Role berhasil didapatkan!')
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const result = await this.roleService.findById(req);
      return responseSuccess(res, result, 'Role berhasil didapatkan!')
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RoleController;