const router = require('express').Router();
const upload = require('../utils/multer');
const { hapusPrivillege, paginate, tambahPrivillege, hapusUser, updateProfile, updateAkun } = require('../controllers/pengguna');
const auth = require('../middlewares/authorization');
router.get('/', auth(['Administrator']), paginate);
router.put('/:id', auth(['Pengguna', 'Administrator', 'Editor', 'Layouter', 'Proofreader', 'Desainer']), upload.single('thumbnail'), updateProfile);
router.put('/:id/akun', auth(['Pengguna', 'Administrator', 'Editor', 'Layouter', 'Proofreader', 'Desainer']), updateAkun);
router.post('/', auth(['Administrator']), tambahPrivillege);
router.delete('/akun/:id', auth(['Administrator']), hapusUser);
router.delete('/:id', auth(['Administrator']), hapusPrivillege);

module.exports = router;