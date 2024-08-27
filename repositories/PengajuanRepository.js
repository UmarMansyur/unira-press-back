const { IdentificationType, TypeWriting } = require("@prisma/client");
const prisma = require("../utils/client");

class PengajuanRepository {
  constructor() {
    this.prisma = prisma;
  }

  async pengajuan(pengajuan) {
    const data = {
      judul: pengajuan.buku.judul,
      kategori_buku_id: pengajuan.buku.kategori_buku_id,
      pengarang: pengajuan.buku.pengarang,
      sinopsis: pengajuan.buku.sinopsis,
      tipe_identifikasi: pengajuan.buku.tipe_identifikasi,
      jumlah_halaman: pengajuan.buku.jumlah_halaman,
      ukuran: pengajuan.buku.ukuran,
      tanggal_pengajuan: new Date(),
      tipe_kepenulisan: pengajuan.buku.tipe_kepenulisan,
      penanggung_jawab: pengajuan.buku.penanggung_jawab || null,
      dilihat: 0,
      PengajuanBuku: {
        create: {
          pengguna_id: pengajuan.pengguna_id,
          tanggal_pengajuan: new Date(),
        }
      }
    };
    if(pengajuan.buku.editor) {
      data.editor = pengajuan.buku.editor;
    }
    if(pengajuan.buku.layouter) {
      data.layouter = pengajuan.buku.layouter;
    }
    if(pengajuan.buku.proofreader) {
      data.proofreader = pengajuan.buku.proofreader;
    }
    if(pengajuan.buku.desainier) {
      data.desainier = pengajuan.buku.desainier;
    }
    if(pengajuan.buku.nomor_hp_penanggung_jawab) {
      data.nomor_hp_penanggung_jawab = pengajuan.buku.nomor_hp_penanggung_jawab;
    }

    const result = await this.prisma.book.create({
      data: data
    });
    return result;
  }
  

  async pengajuanISBN(pengajuan) {
  const result = await this.prisma.book.create({
    data: {
      judul: pengajuan.buku.judul,
      kategori_buku_id: pengajuan.buku.kategori_buku_id,
      pengarang: pengajuan.buku.pengarang,
      sinopsis: pengajuan.buku.sinopsis,
      tipe_identifikasi: pengajuan.buku.tipe_identifikasi,
      jumlah_halaman: pengajuan.buku.jumlah_halaman,
      ukuran: pengajuan.buku.ukuran,
      tanggal_pengajuan: new Date(),
      tipe_kepenulisan: pengajuan.buku.tipe_kepenulisan,
      penanggung_jawab: pengajuan.buku.penanggung_jawab || null,
      dilihat: 0,
      PengajuanBuku: {
        create: {
          pengguna_id: pengajuan.pengguna_id,
          tanggal_pengajuan: new Date(),
        }
      },
      PengajuanISBN: {
        create: {
          status: "proses",
        }
      }
    }
  });
  return result;
}

  async updateBuku(id, data) {
  const result = await this.prisma.book.update({
    where: {
      id: Number(id),
    },
    data: data,
  });
  return result;
}

  async getBuku(id) {
  return await this.prisma.book.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      FileNaskah: true
    }
  });
}

  async deleteBuku(id) {
  const result = await this.prisma.book.delete({
    where: {
      id: Number(id),
    }
  });
  return result;
}

  async updatePengajuanBuku(id, data) {
  const result = await this.prisma.pengajuanBuku.update({
    where: {
      id: Number(id),
    },
    data: data,
  });
  return result;
}

  async getPengajuanBuku(id) {
  return await this.prisma.pengajuanBuku.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      buku: {
        include: {
          FileNaskah: true,
        }
      },
    }
  });
}

  async deletePengajuanBuku(id) {
  const result = await this.prisma.pengajuanBuku.delete({
    where: {
      id: Number(id),
    }
  });
  return result;
}

  async tolakPengajuanBuku(id, data) {
  const result = await this.prisma.pengajuanBuku.update({
    where: {
      id: Number(id),
    },
    data: {
      status_pengajuan: "ditolak",
      alasan_penolakan: data.alasan_penolakan,
      tanggal_ditolak: new Date(),
    }
  });

  return result;
}

  async updatePengajuanISBN(id, data) {
  const result = await this.prisma.pengajuanISBN.update({
    where: {
      id: Number(id),
    },
    data,
  });
  return result;
}

  async uploadFileNaskah(buku_id, file) {
  const result = await this.prisma.fileNaskah.create({
    data: {
      buku_id: Number(buku_id),
      file_naskah: file,
    }
  });
  return result;
}

  async updateUploadFileNaskah(id, file) {
  const result = await this.prisma.fileNaskah.update({
    where: {
      id: Number(id),
    },
    data: {
      file_naskah: file,
    }
  });
  return result;
}

  async getFileNaskah(id) {
  return await this.prisma.fileNaskah.findFirst({
    where: {
      id: Number(id),
    }
  });
}

  async deleteFileNaskah(id) {
  const result = await this.prisma.fileNaskah.delete({
    where: {
      id: Number(id),
    }
  });
  return result;
}

  async uploadFileCover(buku_id, file) {
  const result = await this.prisma.book.update({
    where: {
      id: Number(buku_id),
    },
    data: {
      file_cover: file.path,
    }
  });
  return result;
}

  async createRevisiNaskah(pengajuan_id, data) {
  const result = await this.prisma.revisiNaskah.create({
    data: {
      pengajuan_buku_id: Number(pengajuan_id),
      is_editor: data.is_editor,
      komentar: data.komentar,
      pengguna_id: data.pengguna_id,
    }
  });
  return result;
}

  async updateRevisiNaskah(id, data) {
  const result = await this.prisma.revisiNaskah.update({
    where: {
      id: Number(id),
    },
    data: data,
  });
  return result;
}

  async deleteRevisiNaskah(id) {
  const result = await this.prisma.revisiNaskah.delete({
    where: {
      id: Number(id),
    }
  });
  return result;
}

  async createInvoice(data) {
  const result = await this.prisma.invoice.create({
    data: {
      buku_id: Number(data.buku_id),
      total_pembayaran: data.total_pembayaran,
      keterangan: data.keterangan,
      status: data.status
    }
  });
  return result;
}

  async updateInvoice(id, data) {
  const result = await this.prisma.invoice.update({
    where: {
      id: Number(id),
    },
    data: data,
  });
  return result;
}

  async deleteInvoice(id) {
  const result = await this.prisma.invoice.delete({
    where: {
      id: Number(id),
    }
  });
  return result;
}

  async getInvoice(id) {
  return await this.prisma.invoice.findFirst({
    where: {
      id: Number(id),
    }
  });
}

}

module.exports = PengajuanRepository;
