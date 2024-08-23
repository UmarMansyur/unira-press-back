const router = require('express').Router();

router.use('/auth', require('./authentication'));

module.exports = router;