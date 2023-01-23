const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageId: {
        type: String,
        required: [true, "File doesn't have a valid Image ID"]
    },
    imageName: {
        type: String,
        required: [true, "File doesn't have a name or doesn't exist"]
    },
    imageSize: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Image', imageSchema);