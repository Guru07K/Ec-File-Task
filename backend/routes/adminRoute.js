const express = require('express')
const { isAuthenticated } = require('../middleware/isAuthenticated')
const { GetUsers, createAdmin, AdminSignin } = require('../controller/adminController')
const router = express.Router()



router.route('/create-admin').post(createAdmin)
router.route('/signin-admin').post(AdminSignin)
router.route('/getusers').get(isAuthenticated, GetUsers)



module.exports = router