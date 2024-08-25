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
    this.dilihat = dilihat;
    return this;
  }

  setLayouter(layouter_id) {
    this.layouter_id = Number(layouter_id);
    return this;
  }

  setProofreader(proofreader_id) {
    this.proofreader_id = Number(proofreader_id);
    return this;
  }

  setEditor(editor_id) {
    this.editor_id = editor_id;
    return this;
  }
}

module.exports = Buku;