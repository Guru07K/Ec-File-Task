const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique : true   
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    mobileNo : {
        type : Number,
        required : true,
        unique : true  
    },
    image : {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    isEmailverified :{
        type : Boolean,
        default : false
    }
})

const User = mongoose.model('User',userSchema)
module.exports = User;