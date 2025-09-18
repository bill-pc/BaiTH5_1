const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/register', authController.getRegister);
router.post('/register', authController.register);
router.get('/login', authController.getLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/forgot', authController.getForgot);
router.post('/forgot', authController.forgot);
router.get('/reset/:token', authController.getReset);
router.post('/reset/:token', authController.reset);

module.exports = router;