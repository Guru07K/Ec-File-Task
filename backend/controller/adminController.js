const Admin = require("../model/admin")
const User = require("../model/user")
const jwt= require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const ErrorHandler = require("../utils/errorhandler")


exports.createAdmin = async(req, res,next) => {
    const {name, password, email, mobileNo} = req.body

    const adminExsist = await Admin.findOne({mobileNo: mobileNo})
    if(adminExsist){
        return next(new ErrorHandler('user already exists', 400))
    }

    const mobileNumber = mobileNo.toString()
    const regaxFirst = /^[6-9]/
    const regaxCount = /\d{10}/

    if(!regaxFirst.test(mobileNumber))
        return next(new ErrorHandler('Mobile number should start with 6 to 9 ', 400))
    
    if(!regaxCount.test(mobileNumber))
        return next(new ErrorHandler('Mobile should be 10 digits ', 400))

    const hashedPassword = await bcrypt.hash(password, 10);

    let avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7tyEA8rRXZabfLf_AwxDy-vQ91ecjMJjxVw&s';
    let publicId;
    if(req.body.avatar){
        avatar = req.body.avatar
        publicId = req.body.publicId
    }

    const admin = await Admin.create({
        email,
        password: hashedPassword,
        name,
        mobileNo,
        image : {
            public_id : publicId,
            url : avatar
        }
    })

    res.status(200).json({
        success: true,
        message: 'Admin registered successfully',
        admin
    })
}

exports.AdminSignin = async(req, res,next) => {
    const {mobileNo, password} = req.body;

    if(!mobileNo)
        return next(new ErrorHandler('Mobile number is required', 400))
    if(!password)
        return next(new ErrorHandler('Password is required', 400))


    const admin = await Admin.findOne({mobileNo}).select('+password')
    if(!admin)
        return next(new ErrorHandler('admin not found', 404))

    const verifypassword =await bcrypt.compare(password, admin.password);
    if(!verifypassword)
        return next(new ErrorHandler('Invalid password', 401))

    const token = jwt.sign({id:admin._id}, process.env.SECRET_KEY)

    res.cookie('token', token, {httpOnly :true})
    .status(200)
    .json({
         success: true,
         message: 'Admin Loged in successfully',
         token
     })
}


exports.GetUsers = async(req, res,next) => {
    const users = await User.find()

    const verifiedUsers = users.filter(user => user.isEmailverified === true)
    
    res.json({
        success: true,
        verifiedUsers
    })  

}