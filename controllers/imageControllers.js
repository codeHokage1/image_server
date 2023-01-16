const short = require('short-uuid');
const multer = require('multer')
// const upload = multer({ dest: 'uploads' }); // upload without local storage 1

const upload = multer({ dest: 'uploads', limits: { fileSize: 1024 * 1024 } }).single('image'); // upload without local storage 2

const path = require('path')

const Image = require('../models/Image')


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]) 
//     }
//   })
  
// const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 } }).single('image')

exports.getImage = async (req, res) => {
    const { id } = req.params;
    try {
        const foundImage = await Image.findOne({ imageId: id });
        if (!foundImage) {
            return res.status(404).send("Image not found")
        }

        res.sendFile(path.join(__dirname, '..', foundImage.path))
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal error",
            error
        })
    }
}

exports.uploadImage = async (req, res) => {
    // res.send("Uploaded image")

    // upload without local storage 1
    // try {
    //     if (req.uploadError) {
    //         return res.send("Multer Error don dey:" + req.uploadError)
    //     }
    //     const newImage = {
    //         imageId: short.generate(),
    //         originalName: req.file.originalname,
    //         path: req.file.path
    //     }
    //     const sentImage = await Image.create(newImage);
    //     return res.status(201).json({
    //         message: "Image uploaded successfully",
    //         sentImage
    //     })
    // } catch (error) {
    //     console.log(error)
    //     return res.status(500).json({
    //         "message": "Error uploading image",
    //         "error": error
    //     })
    // }

    // upload without local storage 2

    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {

          // A Multer error occurred when uploading.
            return res.status(400).send("File must not be more than 1mb")
        } else if (err) {

          // An unknown error occurred when uploading.
          return res.status(400).send("Another unknown Error" + err)
        }

        // Everything went fine.
        const newImage = {
            imageId: short.generate(),
            originalName: req.file.originalname,
            path: req.file.path
        }
        try {
            const sentImage = await Image.create(newImage);
            return res.status(201).json({
                message: "Image uploaded successfully",
                sentImage
            })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                message: "Internal error",
                error
            })
        }
    })
}


