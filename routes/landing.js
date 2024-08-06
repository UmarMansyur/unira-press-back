const router = require('express').Router();

const { getResource, updateViewCount, getAllResource } = require('../controllers/landing');


router.get('/', getResource);
router.get('/katalog', getAllResource);
router.put('/:id', updateViewCount);

module.exports = router;