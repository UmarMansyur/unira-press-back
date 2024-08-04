const router = require('express').Router();
const pengajuanController = require('../controllers/Pengajuan');
const upload = require('../utils/multer');

router.post('/', pengajuanController.create);
router.put('/:id', pengajuanController.update);
router.delete('/:id', pengajuanController.destroy);
router.post('/:id', upload.single('file'), pengajuanController.uploadFile);

module.exports = router;

