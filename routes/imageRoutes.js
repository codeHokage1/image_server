const express = require('express');
const imageRoutes = express.Router();

const multer = require('multer')
const upload = multer({ dest: 'uploads', limits: { fileSize: 1024 * 1024 } }); // upload without local storage


const authAccess = require('../middlewares/authAccess')

const imageControllers = require('../controllers/imageControllers')

imageRoutes
    .get('/image/:id', authAccess, imageControllers.getImage)
    .post('/image/upload', authAccess, upload.single('image'), imageControllers.uploadImage)

module.exports = imageRoutes;