const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
        unique: true,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},{
    timestamps: true,
})

module.exports = mongoose.model('Contact', contactSchema);