const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const app = express();

const authRoutes = require('./routes/authRoutes')
const imageRoutes = require('./routes/imageRoutes')

const connectDBAndListen = require('./config/dbConfig')

app.use(express.json());
app.use(express.static('uploads'))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.use('/auth', authRoutes)
app.use(imageRoutes)


connectDBAndListen(app)