const router = require('express').Router();
const BookCategoryController = require('../controllers/bookCategory');
const bookCategory = new BookCategoryController();

router.post('/', bookCategory.create.bind(bookCategory));
router.put('/:id', bookCategory.update.bind(bookCategory));
router.delete('/:id', bookCategory.delete.bind(bookCategory));
router.get('/', bookCategory.findAll.bind(bookCategory));
router.get('/:id', bookCategory.findById.bind(bookCategory));
router.get('/paginate', bookCategory.paginate.bind(bookCategory));



module.exports = router;