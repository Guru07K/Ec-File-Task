const express = require('express')
const { Signup,VerifyEmail, SignIn } = require('../controller/userController')
const router = express.Router()

router.route('/signup').post(Signup)
router.route('/verify/:id').get(VerifyEmail)
router.route('/signin').post(SignIn)

router.route('/getusers').post(SignIn)



module.exports = router