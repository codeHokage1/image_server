const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageId: {
        type: String,
        required: [true, "File doesn't have a valid Image ID"]
    },
    originalName: {
        type: String,
        required: [true, "File doesn't have a name or doesn't exist"]
    },
    path: {
        type: String,
        required: [true, "File doesn't exist"]
    }
})

module.exports = mongoose.model('Image', imageSchema);