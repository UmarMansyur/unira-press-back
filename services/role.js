const RoleRepository = require('../repositories/RoleRepository');
const Role = require('../libs/Role');
const RoleValidator = require('../libs/RoleValidator');
class RoleService {
  constructor() {
    this.roleRepository = new RoleRepository();
  }

  async create(req) {
    const { name } = req.body;
    const role = new Role(name);
    RoleValidator.validate(role);
    return await this.roleRepository.create(role);
  }

  async update(req) {
    const { id } = req.params;
    const { name } = req.body;
    const role = new Role(name);
    RoleValidator.validate(role);
    return await this.roleRepository.update(id, role);
  }

  async delete(req) {
    const { id } = req.params;
    return await this.roleRepository.delete(id);
  }

  async findAll() {
    return await this.roleRepository.findAll();
  }

  async findById(req) {
    const { id } = req.params;
    return await this.roleRepository.findById(id);
  }

  async paginate(req) {
    const { limit = 10, page = 1, search } = req.query;
    const offset = (page - 1) * limit;
    return await this.roleRepository.setLimit(limit)
      .setOffset(offset)
      .setSearch(search)
      .paginate();
  }
}

module.exports = RoleService;