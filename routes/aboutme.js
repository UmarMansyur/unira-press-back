const prisma = require('../utils/client');
const { responseSuccess } = require('../utils/response.handler');

const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await prisma.aboutMe.findFirst({
      where: {
        id: 1
      }
    });
    return responseSuccess(res, result, 'Berhasil mendapatkan data about me', 200);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const result = await prisma.aboutMe.update({
      where: {
        id: 1
      },
      data: {
        content: req.body.content
      }
    });
    return responseSuccess(res, result, 'Berhasil mengupdate data about me', 200);
  } catch (error) {
    next(error);
  }
})

module.exports = router;