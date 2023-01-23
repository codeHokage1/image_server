const fileUploadControl = (req, res, next) => {
    if (!req.files) return res.status(400).send('Kindly choose an image to upload');
    
    const fileSize = req.files.image.size;
    const fileType = req.files.image.mimetype.split('/')[0];

    if (fileSize > 1 * 1024 * 1024) {
        return res.status(400).send('File cannot be more than 1mb');
    }
    if (fileType !== 'image') {
        return res.status(400).send('Kindly upload a valid image');
    }

    next();
}

module.exports = fileUploadControl;