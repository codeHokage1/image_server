const express = require('express');
const authRoutes = express.Router();

const authControllers = require('../controllers/authControllers')

authRoutes
    .post('/login', authControllers.login)
    .post('/signup', authControllers.signup)
    .get('/logout', authControllers.logout)

module.exports = authRoutes;