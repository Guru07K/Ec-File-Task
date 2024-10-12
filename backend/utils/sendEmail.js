const nodemailer = require('nodemailer');
require('dotenv').config(); 

const sendEmail = async(email, verifyUrl) => {

    
    const transporter = nodemailer.createTransport({
        host : 'smtp.gmail.com',
        service:'gmail',
        port : 587,
        secure: true, 
        auth: {
            user: process.env.EMAIL,
            pass:  process.env.EMAIL_PASSWORD
    }
})


await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: 'Verification Email',
    text:`Click the link to verify : ${verifyUrl}` 
})

}

module.exports = sendEmail;