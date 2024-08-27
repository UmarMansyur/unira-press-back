const { IdentificationType, Status } = require("@prisma/client");
const Buku = require("../libs/Buku");
const Pengajuan = require("../libs/Pengajuan");
const PengajuanRepository = require("../repositories/PengajuanRepository");
const path = require('path');
const fs = require('fs');
const ErrorHandler = require("../utils/error");

class PengajuanBuku {
  constructor() {
    this.pengajuanRepository = new PengajuanRepository();
  }

  async findAll(req) {
    const result = await this.pengajuanRepository.findAll(req);
    return result;
  }

  async pengajuan(req) {
    const buku = new Buku();
    buku.setJudul(req.body.judul).setKategoriBuku(req.body.kategori_buku_id).setPengarang(req.body.pengarang).setSinopsis(req.body.sinopsis).setTipeIdentifikasi(req.body.tipe_identifikasi).setJumlahHalaman(req.body.jumlah_halaman).setUkuran(req.body.ukuran).setTipeKepenulisan(req.body.tipe_kepenulisan);
    if (req.body.harga) {
      buku.setHarga(req.body.harga);
    }
    if (req.body.editor) {
      buku.setEditor(req.body.editor);
    }
    if (req.body.layouter) {
      buku.setLayouter(req.body.layouter);
    }
    if (req.body.proofreader) {
      buku.setProofreader(req.body.proofreader);
    }
    if (req.body.desainer) {
      buku.setDesainer(req.body.desainer);
    }
    if (req.body.penanggung_jawab) {
      buku.setPenanggungJawab(req.body.penanggung_jawab);
    }
    if(req.body.nomor_penanggung_jawab) {
      buku.setNomorPenanggungJawab(req.body.nomor_penanggung_jawab);
    }

    const files = req.files;

    if (files && files.naskah && files.naskah.length > 0) {
      buku.setNaskah(files.naskah[0].path);
    }
    if (files && files.cover && files.cover.length > 0) {
      buku.setCover(files.cover[0].path);
    }
    if (files && files.surat && files.surat.length > 0) {
      buku.setSurat(files.surat[0].path);
    }

    const pengajuan = new Pengajuan();
    const user = req.user;
    pengajuan.setBuku(buku).setPengguna(user.id);

    let result = null;

    if (buku.tipe_identifikasi === IdentificationType.ISBN) {
      result = await this.pengajuanRepository.pengajuanISBN(pengajuan);
    } else {
      result = await this.pengajuanRepository.pengajuan(pengajuan);
    }
    return result;
  }

  async updatePengajuanBuku(id, req) {
    const result = await this.pengajuanRepository.updatePengajuanBuku(id, req.body);
    return result;
  }


  async deletePengajuanBuku(id) {
    const exist = await this.pengajuanRepository.getPengajuanBuku(id);
    if (!exist) {
      return ErrorHandler.notFound('Pengajuan buku tidak ditemukan');
    }
    await Promise.all(
      exist.buku.FileNaskah.map(async (file) => {
        await this.deleteFileNaskah(file.file_naskah);
      })
    );
    const result = await this.pengajuanRepository.deletePengajuanBuku(id);
    return result;
  }

  async updateBuku(id, req) {
    const result = await this.pengajuanRepository.updateBuku(id, req.body);
    return result;
  }

  async deleteBuku(id) {
    const exist = await this.pengajuanRepository.getBuku(id);
    if (!exist) {
      return ErrorHandler.notFound('Buku tidak ditemukan');
    }
    if(exist.file_cover) {
      await this.deleteFile(exist.file_cover);
    }
    if(exist.surat_pernyataan) {
      await this.deleteFile(exist.surat_pernyataan);
    }
    await Promise.all(
      exist.FileNaskah.map(async (file) => {
        await this.deleteFile(file.file_naskah);
      })
    );
    const result = await this.pengajuanRepository.deleteBuku(id);
    return result;
  }

  async fileNaskah(req) {
    const file = req.file;
    const result = await this.pengajuanRepository.uploadFileNaskah(file);
    return result;
  }

  async deleteFile(filePath) {
    if (fs.existsSync(path.join(__dirname, '../', filePath))) {
      fs.unlinkSync(path.join(__dirname, '../', filePath));
    }
  }

  async updateFileNaskah(id, req) {
    const file = req.file;

    const naskah = await this.pengajuanRepository.getFileNaskah(id);

    if (!naskah) {
      return ErrorHandler.notFound('File naskah tidak ditemukan');
    }

    if (naskah.file_naskah) {
      this.deleteFileNaskah(naskah.file_naskah);
    }

    const result = await this.pengajuanRepository.updateUploadFileNaskah(id, file);
    return result;
  }

  async deleteFileNaskah(id) {
    const naskah = await this.pengajuanRepository.getFileNaskah(id);

    if (!naskah) {
      return ErrorHandler.notFound('File naskah tidak ditemukan');
    }

    if (naskah.file_naskah) {
      this.deleteFileNaskah(naskah.file_naskah);
    }
    const result = await this.pengajuanRepository.deleteFileNaskah(id);
    return result;
  }

  async updatePengajuanISBN(id, req) {
    let data = {
      status: req.body.status,
    };

    if (req.body.status === Status.ditolak) {
      data = {
        ...data,
        alasan_penolakan: req.body.alasan_penolakan,
      };
    }

    const result = await this.pengajuanRepository.updatePengajuanISBN(id, data);
    return result;
  }

  async tolakPengajuanBuku(id, req) {
    const result = await this.pengajuanRepository.tolakPengajuanBuku(id, req.body.alasan_penolakan);
    return result;
  }

  async uploadFileCover(req) {
    const file = req.file;
    const exist = await this.pengajuanRepository.getBuku(req.body.buku_id);
    if (!exist) {
      return ErrorHandler.notFound('Buku tidak ditemukan');
    }
    const result = await this.pengajuanRepository.uploadFileCover(req.body.buku_id, file);
    return result;
  }

  async createRevisi(req) {
    const exist = await this.pengajuanRepository.getPengajuanBuku(req.body.pengajuan_id);
    if (!exist) {
      return ErrorHandler.notFound('Pengajuan buku tidak ditemukan');
    }
    const result = await this.pengajuanRepository.createRevisi(req.body.pengajuan_id, req.body);
    return result;
  }

  async updateRevisi(id, req) {
    const exist = await this.pengajuanRepository.getRevisi(id);
    if (!exist) {
      return ErrorHandler.notFound('Revisi tidak ditemukan');
    }
    const result = await this.pengajuanRepository.updateRevisi(id, req.body);
    return result;
  }

  async deleteRevisi(id) {
    const exist = await this.pengajuanRepository.getRevisi(id);
    if (!exist) {
      return ErrorHandler.notFound('Revisi tidak ditemukan');
    }
    const result = await this.pengajuanRepository.deleteRevisi(id);
    return result;
  }

  async getRevisi(id) {
    const result = await this.pengajuanRepository.getRevisi(id);
    return result;
  }

  async createInvoice(req) {
    const exist = await this.pengajuanRepository.getBuku(req.body.buku_id);
    if (!exist) {
      return ErrorHandler.notFound('Buku tidak ditemukan');
    }
    const result = await this.pengajuanRepository.createInvoice(req.body.buku_id, req.body);
    return result;
  }

  async updateInvoice(id, req) {
    const exist = await this.pengajuanRepository.getInvoice(id);
    if (!exist) {
      return ErrorHandler.notFound('Invoice tidak ditemukan');
    }
    const result = await this.pengajuanRepository.updateInvoice(id, req.body);
    return result;
  }

  async deleteInvoice(id) {
    const exist = await this.pengajuanRepository.getInvoice(id);
    if (!exist) {
      return ErrorHandler.notFound('Invoice tidak ditemukan');
    }
    const result = await this.pengajuanRepository.deleteInvoice(id);
    return result;
  }

  async getInvoice(id) {
    const result = await this.pengajuanRepository.getInvoice(id);
    return result;
  }

}

module.exports = PengajuanBuku;