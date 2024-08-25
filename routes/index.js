const router = require('express').Router();

const bookCategory = require('./bookCategory');
const auth = require('./authentication');
const news = require('./news');
const roles = require('./roles');
const pengajuan = require('./pengajuan');

router.use('/auth', auth);
router.use('/news', news);
router.use('/book-categories', bookCategory);
router.use('/roles', roles);
router.use('/pengajuan', pengajuan);
module.exports = router;