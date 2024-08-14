const mongoose = require('mongoose');

const connectDB = (url) => {
    try {
        mongoose.connect(url);
        console.log('Connected to DB...')
    } catch (error) {
        console.log(error);
    }    
}

module.exports = connectDB;