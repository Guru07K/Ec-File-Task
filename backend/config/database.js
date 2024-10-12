const mongoose = require('mongoose');

const connectDb = () =>{
    mongoose.connect(process.env.DB_CONNECTION)
            .then(() => console.log('MongoDB Connected...'))
            .catch(err => console.error('Failed to connect to MongoDB', err));
}

module.exports = connectDb;