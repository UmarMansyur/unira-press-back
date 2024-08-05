const router = require('express').Router();

const { getAll } = require('../controllers/resource');


router.get('/', getAll);

module.exports = router;