const User = require("../model/user")
const ErrorHandler = require("../utils/errorhandler")
const bcrypt = require('bcryptjs')
const sendEmail = require("../utils/sendEmail")


exports.Signup = async(req, res, next)=>{
    const {name, password, email, mobileNo} = req.body

    const userExsist = await User.findOne({email})
    if(userExsist){
        return next(new ErrorHandler('user already exists', 400))
    }
 
    const mobileNumber = mobileNo.toString()
   
    let avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7tyEA8rRXZabfLf_AwxDy-vQ91ecjMJjxVw&s';
    let publicId;
    // if(req.body.avatar){
    //     avatar = req.body.avatar
    //     publicId = req.body.publicId
    // }

    if(req.file){
        avatar = `http://127.0.0.1:8000/uploads/user/${req.file.originalname}`
        // avatar = `https://ec-file-task.onrender.com/uploads/user/${req.file.originalname}`
    }

    const regaxCheckfirstChar = /^[6-9]/
    const regaxCheckCount = /\d{10}/

    if(!regaxCheckfirstChar.test(mobileNumber))
        return next(new ErrorHandler('Mobile number should start with 6 - 9 ', 400))
    
    if(!regaxCheckCount.test(mobileNumber))
        return next(new ErrorHandler('Mobile should be 10 digits ', 400))
    

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        email,
        password: hashedPassword,
        name,
        mobileNo,
        image : {
            public_id : publicId,
            url : avatar
        }
    })
    const {password:removedPssword, ...rest} = user.toObject()


    const verifyUrl = `https://ec-file-task.onrender.com/verifyemail/${user._id}`
    sendEmail(email, verifyUrl)

    res.status(200).json({
        success: true,
        message: 'User registered successfully',
        rest
    })

}

exports.VerifyEmail = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {isEmailverified: true})
    if(!user){
        return next(new ErrorHandler('User not found', 404))
    }
    res.status(200).json({
        success: true,
        message: 'Email verified successfully'
    })
}

exports.SignIn = async (req, res,next) =>{
    const {mobileNo, password} = req.body
    if(!mobileNo)
        return next(new ErrorHandler('Mobile number is required', 400))
    if(!password)
        return next(new ErrorHandler('Password is required', 400))


    const user = await User.findOne({mobileNo}).select('+password')


    if(!user)
        return next(new ErrorHandler('User not found', 404))

    if(user.isEmailverified === false)
        return next(new ErrorHandler('Email is not verified', 401))

    const verifypassword =await bcrypt.compare(password, user.password);

    if(!verifypassword)
        return next(new ErrorHandler('Invalid password', 401))

    

    res.status(200)
       .json({
            success: true,
            message: 'User signed in successfully'
        })
}