const router = require('express').Router();
const NewsController = require('../controllers/news');
const news = new NewsController();
const auth = require('../middlewares/authorization');
const upload = require('../utils/multer');

router.post('/', auth(['Administrator']), upload.single('image'), news.createNews);
router.put('/:id', auth(['Administrator']), upload.single('image'), news.updateNews);
router.delete('/:id', auth(['Administrator']), news.deleteNews);
router.get('/', news.findAllNews);
router.get('/:id', news.findNewsById);

module.exports = router;