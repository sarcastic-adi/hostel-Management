const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    scholarId: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        required: true,
        default: 'Not Paid',
        unique: true
    },
    hostel: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('Room', roomSchema);