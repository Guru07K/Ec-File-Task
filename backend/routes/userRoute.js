const express = require('express')
const path = require('path')
const { Signup,VerifyEmail, SignIn } = require('../controller/userController')
const multer = require('multer')
const router = express.Router()

const upload = multer({
    storage: multer.diskStorage({
                destination : function (req, file , cb){
                    cb(null, path.join(__dirname,'..', 'uploads/user'));
                },
                filename : function (req, file, cb){
                    cb(null, file.originalname)
                }
            })
})

router.route('/signup').post(upload.single('avatar'), Signup)
router.route('/verify/:id').get(VerifyEmail)
router.route('/signin').post(SignIn)

router.route('/getusers').post(SignIn)



module.exports = router