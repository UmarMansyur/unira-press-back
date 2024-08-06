const { prisma } = require("../services/pengajuan.service");

const create = async (req, res, next) => {
  try {
    const exist = await prisma.aboutMe.findFirst({
      orderBy: {
        id: 'desc',
      },
      take: 1,
    });
    let result = null;
    if (exist) {
      result = await prisma.aboutMe.update({
        where: {
          id: exist.id,
        },
        data: {
          ...req.body,
        }
      });
    } else {
      result = await prisma.aboutMe.create({
        data: {
          ...req.body,
        }
      });
    }
    return res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
}


const findOne = async (_req, res, next) => {
  try {
    const result = await prisma.aboutMe.findMany();
    if (result.length === 0) {
      return res.status(200).json({
        data: {
          content: '',
        },
      });
    }
    return res.status(200).json({
      data: result[0],
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  findOne
}