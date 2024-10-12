const Admin = require("../model/admin");
const ErrorHandler = require("../utils/errorhandler")
const jwt = require('jsonwebtoken')


exports.isAuthenticated = async(req, res, next) => {
    const token = req.cookies.token

    if(!token)
        return next(new ErrorHandler('Only admin can view this', 401))
    
    next()

}