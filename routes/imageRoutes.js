const express = require('express');
const imageRoutes = express.Router();

const authAccess = require('../middlewares/authAccess')

const imageControllers = require('../controllers/imageControllers')

imageRoutes
    .get('/image/:id', authAccess, imageControllers.getImage)
    .post('/image/upload', authAccess, imageControllers.uploadImage)

module.exports = imageRoutes;