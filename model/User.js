const mongoose = require('mongoose');
let validator = require('validator');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    scholarId: {
        type: String,
        required: true,
        unique: true,
        validate : (value) => {
            return (value.length == 9);
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value);
        }
    },
    userType: {
        type: String,
        required: true,
        default: 'student',
        enum: ['student', 'admin']
    },
    hostelAlloted: {
        type: String,
        required: true,
        unique: true,
        default: 'none',
    },  
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        validate: (value) => {
            return (value.length == 10);
        }
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);