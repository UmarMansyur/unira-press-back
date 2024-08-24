const router = require('express').Router();
const NewsController = require('../controllers/news');
const news = new NewsController();
const auth = require('../middlewares/authorization');
const upload = require('../utils/multer');

router.post('/', auth, upload.single('image'), news.createNews.bind(news));
router.put('/:id', auth, upload.single('image'), news.updateNews.bind(news));
router.delete('/:id', auth, news.deleteNews.bind(news));
router.get('/', auth, news.findAllNews.bind(news));
router.get('/:id', auth, news.findNewsById.bind(news));



module.exports = router;