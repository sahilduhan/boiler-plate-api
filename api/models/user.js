const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please enter your name"],
        trim: true,
        maxLength: [30, "Your name cannot exceed 30 characters"]
    },
    email:{
        type: String,
        required: [true, "Please enter your email"],
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Your password must be longer than 6 characters"],
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User',userSchema);