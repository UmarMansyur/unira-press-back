const router = require('express').Router();
const authController = require('../controllers/authentication');
const auth = require('../middlewares/authorization');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/refresh-token', authController.refreshToken);
router.get('/whoami', auth(['client', 'admin']), authController.decodeToken);

module.exports = router;