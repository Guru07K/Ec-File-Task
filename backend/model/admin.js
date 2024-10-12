const mongoose  = require("mongoose");

const adminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
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
    }
})

const Admin = mongoose.model('Admin',adminSchema)
module.exports = Admin;