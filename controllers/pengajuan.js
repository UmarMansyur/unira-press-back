const PengajuanBuku = require("../services/pengajuan");
const { responseSuccess } = require('../utils/response.handler');

class Pengajuan {
  constructor() {
    this.pengajuan = new PengajuanBuku();
  }

  async createPengajuan(req, res, next) {
    try {
      const response = await this.pengajuan.pengajuan(req);
      return responseSuccess(res, response, 'Pengajuan berhasil ditambahkan', 201);
    } catch (error) {
      next(error);
    }
  }

  async getBuku(req, res, next) {
    try {
      const response = await this.pengajuan.getBuku(req.params.id);
      return responseSuccess(res, response, 'Buku berhasil diambil');
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const response = await this.pengajuan.findAll(req);
      return responseSuccess(res, response, 'Pengajuan berhasil diambil');
    }
    catch (error) {
      next(error);
    }
  }

  async pengajuanKu(req, res, next) {
    try {
      const response = await this.pengajuan.pengajuanKu(req);
      return responseSuccess(res, response, 'Pengajuan berhasil diambil');
    } catch (error) {
      next(error);
    }
  }

  async pengajuanEditor(req, res, next) {
    try {
      const response = await this.pengajuan.pengajuanEditor(req);
      return responseSuccess(res, response, 'Pengajuan berhasil diambil');
    } catch (error) {
      next(error);
    }
  }

  async updatePengajuanBuku(req, res, next) {
    try {
      const response = await this.pengajuan.updatePengajuanBuku(req.params.id, req);
      return responseSuccess(res, response, 'Pengajuan berhasil diupdate');
    } catch (error) {
      next(error);
    }
  }

  async deletePengajuanBuku(req, res, next) {
    try {
      const response = await this.pengajuan.deletePengajuanBuku(req.params.id);
      return responseSuccess(res, response, 'Pengajuan berhasil dihapus');
    } catch (error) {
      next(error);
    }
  }

  async updateBuku(req, res, next) {
    try {
      const response = await this.pengajuan.updateBuku(req.params.id, req);
      return responseSuccess(res, response, 'Buku berhasil diupdate');
    } catch (error) {
      next(error);
    }
  }

  async deleteBuku(req, res, next) {
    try {
      const response = await this.pengajuan.deleteBuku(req.params.id);
      return responseSuccess(res, response, 'Buku berhasil dihapus');
    } catch (error) {
      next(error);
    }
  }

  async createFileNaskah(req, res, next) {
    try {
      const response = await this.pengajuan.fileNaskah(req);
      return responseSuccess(res, response, 'File naskah berhasil ditambahkan', 201);
    } catch (error) {
      next(error);
    }
  }

  async updateFileNaskah(req, res, next) {
    try {
      const response = await this.pengajuan.updateFileNaskah(req.params.id, req.file);
      return responseSuccess(res, response, 'File naskah berhasil diupdate');
    } catch (error) {
      next(error);
    }
  }

  async deleteFileNaskah(req, res, next) {
    try {
      const response = await this.pengajuan.deleteFileNaskah(req);
      return responseSuccess(res, response, 'File naskah berhasil dihapus');
    } catch (error) {
      next(error);
    }
  }

  async updatePengajuanISBN(req, res, next) {
    try {
      const response = await this.pengajuan.updatePengajuanISBN(req.params.id, req);
      return responseSuccess(res, response, 'Pengajuan berhasil diupdate');
    } catch (error) {
      next(error);
    }
  }

  async tolakPengajuanBuku(req, res, next) {
    try {
      const response = await this.pengajuan.tolakPengajuanBuku(req.params.id, req);
      return responseSuccess(res, response, 'Pengajuan berhasil ditolak');
    } catch (error) {
      next(error);
    }
  }

  async uploadFileCover(req, res, next) {
    try {
      const response = await this.pengajuan.uploadFileCover(req);
      return responseSuccess(res, response, 'File cover berhasil diupload', 201);
    } catch (error) {
      next(error);
    }
  }

  async createRevisi(req, res, next) {
    try {
      const response = await this.pengajuan.createRevisi(req);
      return responseSuccess(res, response, 'Revisi berhasil ditambahkan', 201);
    } catch (error) {
      next(error);
    }
  }

  async updateRevisi(req, res, next) {
    try {
      const response = await this.pengajuan.updateRevisi(req.params.id, req);
      return responseSuccess(res, response, 'Revisi berhasil diupdate');
    } catch (error) {
      next(error);
    }
  }

  async deleteRevisi(req, res, next) {
    try {
      const response = await this.pengajuan.deleteRevisi(req.params.id);
      return responseSuccess(res, response, 'Revisi berhasil dihapus');
    } catch (error) {
      next(error);
    }
  }

  async getRevisi(req, res, next) {
    try {
      const response = await this.pengajuan.getRevisi(req.params.id);
      return responseSuccess(res, response, 'Revisi berhasil diambil');
    } catch (error) {
      next(error);
    }
  }

  async createInvoice(req, res, next) {
    try {
      const response = await this.pengajuan.createInvoice(req);
      return responseSuccess(res, response, 'Invoice berhasil dibuat', 201);
    } catch (error) {
      next(error);
    }
  }

  async updateInvoice(req, res, next) {
    try {
      const response = await this.pengajuan.updateInvoice(req.params.id, req);
      return responseSuccess(res, response, 'Invoice berhasil diupdate');
    } catch (error) {
      next(error);
    }
  }

  async deleteInvoice(req, res, next) {
    try {
      const response = await this.pengajuan.deleteInvoice(req.params.id);
      return responseSuccess(res, response, 'Invoice berhasil dihapus');
    } catch (error) {
      next(error);
    }
  }

  async getInvoice(req, res, next) {
    try {
      const response = await this.pengajuan.getInvoice(req.params.id);
      return responseSuccess(res, response, 'Invoice berhasil diambil');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Pengajuan;