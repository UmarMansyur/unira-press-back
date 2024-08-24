const router = require('express').Router();

const bookCategory = require('./bookCategory');

router.use('/auth', require('./authentication'));
router.use('/news', require('./news'));
router.use('/book-categories', bookCategory);

module.exports = router;