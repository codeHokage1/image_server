const express = require('express');
const imageRoutes = express.Router();
const fileupload = require('express-fileupload')
const fileUploadControl = require('../middlewares/fileUploadControl')

const authAccess = require('../middlewares/authAccess');
const imageControllers = require('../controllers/imageControllers')

imageRoutes
    .get('/image/:id', authAccess, imageControllers.getImage)
    .post('/image/upload', authAccess, fileupload({createParentPath: true}), fileUploadControl, imageControllers.uploadImage)



module.exports = imageRoutes;