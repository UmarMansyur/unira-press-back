const router = require('express').Router();
const Pengajuan = require('../controllers/pengajuan');
const upload = require('../utils/multer');
const auth = require('../middlewares/authorization');
const pengajuan = new Pengajuan();

router.post('/', auth(['Pengguna', 'Administrator']), upload.fields([
  { name: 'naskah', maxCount: 1 },
  { name: 'cover', maxCount: 1 },
  { name: 'surat', maxCount: 1 },
]), pengajuan.createPengajuan.bind(pengajuan));
router.get('/', auth(['Pengguna', 'Administrator', 'Desainer', 'Layouter', 'Editor']), pengajuan.findAll.bind(pengajuan));
router.put('/:id', auth(['Pengguna', 'Administrator']), pengajuan.updatePengajuanBuku.bind(pengajuan));
router.patch('/tolak/:id', auth(['Pengguna', 'Administrator']), pengajuan.tolakPengajuanBuku.bind(pengajuan));
router.patch('/:id', auth(['Administrator']), pengajuan.updatePengajuanISBN.bind(pengajuan));
router.delete('/:id', auth(['Pengguna']), pengajuan.deletePengajuanBuku.bind(pengajuan));
router.put('/buku/:id', auth(['Pengguna', 'Administrator']), pengajuan.updateBuku.bind(pengajuan));
router.delete('/buku/:id', auth(['Pengguna', 'Administrator']), pengajuan.deleteBuku.bind(pengajuan));
router.post('/file-naskah', auth(['Pengguna', 'Administrator']), upload.single('file_naskah'), pengajuan.createFileNaskah.bind(pengajuan));
router.post('/file-naskah/:id', auth(['Pengguna', 'Administrator']), upload.single('file_naskah'), pengajuan.updateFileNaskah.bind(pengajuan));
router.post('/file-naskah/:id', auth(['Pengguna', 'Administrator']), upload.single('file_naskah'), pengajuan.deleteFileNaskah.bind(pengajuan));
router.post('/file-cover', auth(['Pengguna', 'Administrator', 'Desainer', 'Layouter', 'Editor']), upload.single('file_cover'), pengajuan.uploadFileCover.bind(pengajuan));
router.post('/revisi-naskah', auth(['Pengguna', 'Administrator', 'Layouter', 'Editor']), pengajuan.createRevisi.bind(pengajuan));
router.post('/revisi-naskah/:id', auth(['Pengguna', 'Administrator', 'Layouter', 'Editor']), pengajuan.updateRevisi.bind(pengajuan));
router.post('/revisi-naskah/:id', auth(['Pengguna', 'Administrator', 'Layouter', 'Editor']), pengajuan.deleteRevisi.bind(pengajuan));
router.post('/invoice', auth(['Administrator', 'Desainer', 'Layouter', 'Editor']), pengajuan.createInvoice.bind(pengajuan));
router.put('/invoice/:id', auth(['Administrator', 'Desainer', 'Layouter', 'Editor']), pengajuan.updateInvoice.bind(pengajuan));
router.delete('/invoice/:id', auth(['Administrator', 'Desainer', 'Layouter', 'Editor']), pengajuan.deleteInvoice.bind(pengajuan));
router.get('/invoice', auth(['Administrator', 'Desainer', 'Layouter', 'Editor', 'Pengguna']), pengajuan.getInvoice.bind(pengajuan));

module.exports = router;




