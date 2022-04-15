const boolean = require('@hapi/joi/lib/types/boolean');
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
    datein: {
        type: Date,
        default: Date.now
    },
    dateout: {
        type: Date,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('User', userSchema);