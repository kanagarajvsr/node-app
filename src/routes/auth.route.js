const router = require('express').Router(); 
const authController = require('../controllers/auth.controller');


router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

module.exports = router;