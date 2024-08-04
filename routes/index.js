const express = require('express');
const router = express.Router();
const authenticationRouter = require('./authentication');
const commentRouter = require('./comment');
const fileRevisiRouter = require('./filerevisi');
const pengajuanRouter = require('./pengajuan');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    status: true,
    message: 'Selamat datang'
  })
});


router.use('/auth', authenticationRouter);
router.use('/comment', commentRouter);
router.use('/filerevisi', fileRevisiRouter);
router.use('/pengajuan', pengajuanRouter);
module.exports = router;
