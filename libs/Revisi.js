class Revisi {
  constructor(pengajuan) {
    this.pengajuan = pengajuan;
  }

  setPengguna() {
    this.pengguna = this.pengajuan.pengguna;
  }

  setKomentar(komentar) {
    this.komentar = komentar;
    return this;
  }

  setEditor(isEditor) {
    this.isEditor = isEditor;
    return this;
  }

}

module.exports = Revisi;