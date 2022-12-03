const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    scholarId: {
        type: String,
        required: true
    },
    hostel: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    inTime: {
        type: Date,
        required: true,
        default: Date.now()
    },
    outTime: {
        type: Date,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('Record', RecordSchema);