const prisma = require('../utils/client');

const getAllResource = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const categories = await prisma.typeCategory.findMany();

    const resource = await prisma.submission.findMany({
      include: {
        category_type: true,
        category_reader: true,
      },
      where: {
        status_publish: "Diterbitkan",
        typeCategoryId: parseInt(req.query.category) || undefined,
      },
      orderBy: [
        {
          createdAt: 'desc'
        },
        {
          id: 'desc'
        }
      ],
      take: limit,
      skip: offset
    });


    const total = await prisma.submission.count({
      where: {
        status_publish: "Diterbitkan",
        typeCategoryId: parseInt(req.query.category) || undefined,
      }
    });

    const result = resource.map((item) => {
      return {
        ...item,
        cover: `${process.env.BASE_URL}/uploads/${item.cover}`
      }
    });
    res.status(200).json({
      data: {
        kategori: categories,
        total_data: total,
        data: result
      }
    });
  } catch (error) {
    next(error);
  }
}

const getResource = async (req, res, next) => {
  try {
    const resource = await prisma.submission.findMany({
      where: {
        status_publish: "Diterbitkan"
      },
      orderBy: [
        {
          createdAt: 'desc'
        },
        {
          id: 'desc'
        }
      ],
      take: 6
    });

    const resource2 = await prisma.submission.findMany({
      take: 4,
      where: {
        status_publish: "Diterbitkan"
      },
      orderBy: {
        view_count: 'desc'
      },
      take: 4
    });
    res.status(200).json({
      data: {
        rilis_new: resource,
        rilis_populer: resource2
      }
    });
  } catch (error) {
    next(error);
  }
};

const updateViewCount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resource = await prisma.submission.update({
      where: {
        id: parseInt(id)
      },
      data: {
        view_count: {
          increment: 1
        }
      }
    });
    res.status(200).json({
      data: resource
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getResource,
  updateViewCount,
  getAllResource
};