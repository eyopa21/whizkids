const express = require('express');
const router = express.Router();
const {
    login,
    signUp,
    verify,
    changePassword,
    forgotPassword
} = require('../controllers/auth')

router.route('/login').post(login)
router.route('/signup').post(signUp)
router.route('/verify').post(verify)
router.route('/forgotpassword').post(forgotPassword)
router.route('/changepassword').post(changePassword)

//router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp)

module.exports = router;