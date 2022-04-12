const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    pn: {
        type: String,
        required: true,
        min: 6, 
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 10, 
        max:13
    },
    telnumber: {
        type: String,
        required: false,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);