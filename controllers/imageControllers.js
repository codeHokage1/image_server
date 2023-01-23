const short = require('short-uuid');
const path = require('path')
const Image = require('../models/Image')


exports.getImage = async (req, res) => {
    const { id } = req.params;
    try {
        const foundImage = await Image.findOne({ imageId: id });
        if (!foundImage) {
            return res.status(404).send("Image not found")
        }

        res.sendFile(path.join(__dirname, '..', 'uploads', foundImage.imageName))
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal error",
            error
        })
    }
}

exports.uploadImage = async (req, res) => {

    const filePath = path.join(__dirname, '..', 'uploads', req.files.image.name);
    req.files.image.mv(filePath, err => {
        if (err) {
            return res.status(500).send('Server error: ' + err.message)
        }
    })
    const newImage = {
        imageId: short.generate(),
        imageName: req.files.image.name,
        imageSize: req.files.image.size
    }
    try {            
        const sentImage = await Image.create(newImage);
        return res.status(201).json({
            message: "Image uploaded successfully",
            image: {
                imageId: sentImage.imageId,
                imageName: sentImage.imageName,
                imageSize: req.files.image.size
            }
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal error",
            error
        })
    }
}


