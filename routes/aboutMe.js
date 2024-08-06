const router = require('express').Router();
const aboutMeController = require('../controllers/aboutMe');

router.post('/', aboutMeController.create);
router.get('/', aboutMeController.findOne);

module.exports = router;