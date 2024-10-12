const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/userRoute');
const adminRouter = require('./routes/adminRoute');
const path = require('path')
const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use(express.static(path.join(__dirname, '..', 'client', 'dist'))); 


app.use('/ecfile/user', authRouter)
app.use('/ecfile/admin', adminRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html')); // Adjusted path
});

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    

   return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})


module.exports = app;