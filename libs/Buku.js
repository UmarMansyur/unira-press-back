const KategoriBuku = require('./BookCategory');
class Buku {
  setJudul(judul) {
    this.judul = judul;
    return this;
  }
  
  setKategoriBuku(kategori) {
    const kategoriBuku = new KategoriBuku();
    kategoriBuku.setId(kategori);
    return this;
  }

  setPengarang(pengarang) {
    this.pengarang = pengarang;
    return this;
  }

  setSinopsis(sinopsis) {
    this.sinopsis = sinopsis;
    return this;
  }

  setTipeIdentifikasi(tipe_identifikasi) {
    this.tipe_identifikasi = tipe_identifikasi;
    return this;
  }

  setJumlahHalaman(jumlah_halaman) {
    this.jumlah_halaman = jumlah_halaman;
    return this;
  }

  setUkuran(ukuran) {
    this.ukuran = ukuran;
    return this;
  }

  setTipeKepenulisan(tipe_kepenulisan) {
    this.tipe_kepenulisan = tipe_kepenulisan;
    return this;
  }

  setPenanggungJawab(penanggung_jawab) {
    this.penanggung_jawab = penanggung_jawab;
    return this;
  }

  setDilihat(dilihat) {
    this.dilihat = Number(dilihat);
    return this;
  }

  setLayouter(layouter) {
    this.layouter = layouter;
    return this;
  }

  setProofreader(proofreader) {
    this.proofreader = proofreader;
    return this;
  }

  setEditor(editor) {
    this.editor = editor;
    return this;
  }

  setDesainer(desainier) {
    this.desainier = desainier;
    return this;
  }

  setNomorPenanggungJawab(nomor_hp_penanggung_jawab) {
    this.nomor_hp_penanggung_jawab = nomor_hp_penanggung_jawab;
    return this;
  }

  setSuratPernyataan(surat_pernyataan) {
    this.surat_pernyataan = surat_pernyataan;
    return this;
  }
  

}

module.exports = Buku;