const express = require('express');
const imageRoutes = express.Router();
const multer = require('multer');
// const upload = multer({ dest: '/uploads', limits: { fileSize: 1024 * 1024 } }).single('image')


const imageControllers = require('../controllers/imageControllers')

imageRoutes
    .get('/image/:id', imageControllers.getImage)
    // .post('/image/upload', upload, imageControllers.uploadImage)
    .post('/image/upload', imageControllers.uploadImage)


module.exports = imageRoutes;