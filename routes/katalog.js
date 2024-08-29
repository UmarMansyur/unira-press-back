const prisma = require('../utils/client');
const { responseSuccess } = require('../utils/response.handler');

const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const { category = "", limit = 10, page = 1 } = req.query;
    const kategori = await prisma.bookCategory.findMany();
    const where = {};
    if (category !== undefined && category !== '') {
      where.kategori_buku_id = parseInt(category);
    }
    if (limit !== undefined || limit !== '') {
      where.PengajuanBuku = {
        some: {
          status_pengajuan: 'diterbitkan'
        }
      }
    }
    const buku = await prisma.book.findMany({
      include: {
        kategori_buku: true
      },
      where,
      orderBy: {
        tanggal_pengajuan: 'desc'
      }
    });
    const total = await prisma.book.count({
      where
    });

    const data = {
      total_data: total,
      total_page: Math.ceil(total / limit),
      current_page: page,
      data: buku,
      kategori: kategori
    };

    return responseSuccess(res, {
      ...data
    }, 'Buku berhasil diambil');
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const exist = await prisma.book.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    if (!exist) {
      return responseError(res, 'Buku tidak ditemukan', 404);
    }
    const response = await prisma.book.update({
      where: {
        id: parseInt(id)
      },
      data: {
        dilihat: exist.dilihat + 1
      }
    })
    return responseSuccess(res, response, 'Buku berhasil diupdate');
  } catch (error) {
    next(error);
  }
});
module.exports = router;