const mongoose = require('mongoose');
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email address"],
        unique: true,
        validate: [isEmail, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Password must be at least 6 characters"],
    }
})

module.exports = mongoose.model('User', userSchema);