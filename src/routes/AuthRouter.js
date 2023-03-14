const express = require('express')
const router = express.Router()

const {auth} = require('../middleware/auth')

const {
    register,
    login,
    verifyAccount,
    logout,
    forgotPassword,
    resetPassword
} = require('../controllers/authControllers')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/verify-account').post(verifyAccount)
router.route('/logout').delete(auth, logout)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password').post(resetPassword)



module.exports = router