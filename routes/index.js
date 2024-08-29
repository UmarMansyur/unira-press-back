const router = require('express').Router();

const bookCategory = require('./bookCategory');
const auth = require('./authentication');
const news = require('./news');
const roles = require('./roles');
const pengajuan = require('./pengajuan');
const pengguna = require('./pengguna');
const pengajuanUser = require('./pengajuanUser');
const katalog = require('./katalog');

router.use('/auth', auth);
router.use('/news', news);
router.use('/book-categories', bookCategory);
router.use('/roles', roles);
router.use('/pengguna', pengguna);
router.use('/pengajuan', pengajuan);
router.use('/pengajuanku', pengajuanUser)
router.use('/katalog', katalog);
router.use('/about-me', require('./aboutme'));
module.exports = router;