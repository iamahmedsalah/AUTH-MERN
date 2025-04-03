const mongoose = require('mongoose');


// Create a schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please add a name"],
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [20, "Name must be at most 20 characters"],
    },
    email:{
        type: String,
        required: [true, "Please add an email"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Please add a password"],
        minlength: [8, "Password must be at least 8 characters"],
    },
    lastLogin:{
        type: Date,
        default: Date.now,
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpireAt: Date,
    verficationToken: String,
    verficationTokenExpireAt: Date,
},
{ timestamps: true });


// Create a model
const User = mongoose.model('User', userSchema);

module.exports = User;