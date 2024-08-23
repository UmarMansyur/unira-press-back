const router = require('express').Router();
const AuthenticationController = require('../controllers/authentication');

const auth = new AuthenticationController();

router.post('/register', auth.register.bind(auth));
router.get('/verify', auth.verifyEmail.bind(auth));
router.post('/login', auth.login.bind(auth));
router.post('/forgot-password', auth.forgotPassword.bind(auth));
router.post('/reset-password', auth.resetPassword.bind(auth));
router.post('/change-password', auth.changePassword.bind(auth));

module.exports = router;