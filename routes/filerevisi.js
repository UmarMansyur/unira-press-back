const router = require('express').Router();
const filerevisiController = require('../controllers/Revisi');
const upload = require('../utils/multer');

router.post('/', upload.single('file'), filerevisiController.create);
router.post('/:id', upload.single('file'), filerevisiController.update);
router.delete('/:id', filerevisiController.destroy);

module.exports = router;