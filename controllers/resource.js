const { prisma } = require("../services/auth.service");

const getAll = async (req, res, next) => {
  try {
    const data = {
      kategori_pembaca: await prisma.readerCategory.findMany(),
      jenis_pustaka: await prisma.referenceType.findMany(),
      kategori_jenis: await prisma.typeCategory.findMany(),
      terbitan: await prisma.publication.findMany()
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll
}