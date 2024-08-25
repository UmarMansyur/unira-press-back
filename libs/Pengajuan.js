class Pengajuan {
  setBuku(buku) {
    this.buku = buku;
    return this;
  }

  setPengguna(pengguna) {
    this.pengguna = pengguna;
    return this;
  }

  setStatusPengajuan(status_pengajuan) {
    this.status_pengajuan = status_pengajuan;
    return this;
  }

  setAlasanPenolakan(alasan_penolakan) {
    this.alasan_penolakan = alasan_penolakan;
    return this;
  }

  setTanggalPengajuan(tanggal_pengajuan) {
    this.tanggal_pengajuan = tanggal_pengajuan;
    return this;
  }

  setTanggalPenolakan(tanggal_penolakan) {
    this.tanggal_penolakan = tanggal_penolakan;
    return this;
  }

  setTanggalDiterima(tanggal_diterima) {
    this.tanggal_diterima = tanggal_diterima;
    return this;
  }

  setTanggalDirevisi(tanggal_direvisi) {
    this.tanggal_direvisi = tanggal_direvisi;
    return this;
  }

  setTanggalDitolak(tanggal_ditolak) {
    this.tanggal_ditolak = tanggal_ditolak;
    return this;
  }
  
  setTanggalDicetak(tanggal_dicetak) {
    this.tanggal_dicetak = tanggal_dicetak;
    return this;
  }

  setTanggalDiproses(tanggal_diproses) {
    this.tanggal_proses = tanggal_diproses;
    return this;
  }

  setTanggalCetak(tanggal_cetak) {
    this.tanggal_cetak = tanggal_cetak;
    return this;
  }

  setTanggalTerbit(tanggal_terbit) {
    this.tanggal_terbit = tanggal_terbit;
    return this;
  }

}

module.exports = Pengajuan; 