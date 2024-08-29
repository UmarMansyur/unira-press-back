const router = require('express').Router();
const Pengajuan = require('../controllers/pengajuan');
const auth = require('../middlewares/authorization');
const pengajuan = new Pengajuan();
router.get('/', auth(['Pengguna', 'Administrator', 'Desainer', 'Layouter', 'Editor']), pengajuan.pengajuanKu.bind(pengajuan));
router.get('/editor', auth(['Editor', 'Desainer', 'Layouter', 'Editor']), pengajuan.pengajuanEditor.bind(pengajuan));
module.exports = router;




