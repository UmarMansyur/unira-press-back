const router = require('express').Router();
const pengajuanController = require('../controllers/Pengajuan');
const upload = require('../utils/multer');
const authorize = require('../middlewares/authorization');

router.post('/', pengajuanController.create);
router.put('/:id', pengajuanController.update);
router.delete('/:id', pengajuanController.destroy);
router.post('/cover/:id', upload.single('file'), pengajuanController.cover);
router.get('/', authorize(['client', 'admin']), pengajuanController.getAll);
router.get('/:id', pengajuanController.getOne);
module.exports = router;

