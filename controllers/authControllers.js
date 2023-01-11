const jwt = require('jsonwebtoken')
const User = require('../models/User');
const bcrypt = require('bcrypt')

const handleErrors = error => {
    console.log(error.message, error.code)
    let errors = ''

    if (error.code === 11000) {
        errors = 'User already exists'
        return errors;
    }
    if (error.errors) {
        if (error.errors.email) {
            errors += `${error.errors.email.message}\n`
        }
        if (error.errors.password) {
            errors += `${error.errors.password.message}\n`
        }
    }

    return errors;
}


exports.signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = await User.create({ email: email, password: await bcrypt.hash(password, 10) })
        return res.status(201).json(newUser)
    } catch (error) {
        res.status(500).send(handleErrors(error))
    }
}

exports.login = async (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    try {
        const foundUser = await User.findOne({ email: userEmail });
        if (!foundUser) {
            return res.status(404).send("User not found")
        }
        if (!await bcrypt.compare(userPassword, foundUser.password)) {
            return res.status(400).send("Passwords do not match")
        }
        const authToken = jwt.sign(
            { email: foundUser.email },
            process.env.AUTH_TOKEN,
            { expiresIn: 60 }
        )
        res.cookie('jwt', authToken, {httpOnly: true, maxAge: 60 * 1000})
        res.status(200).json({foundUser, jwt: authToken});
    } catch (error) {
        res.status(500).send(handleErrors(error));
    }
}

exports.logout = (req, res) => {
    const authToken = req.cookies && req.cookies.jwt;
    if (!authToken) {
        return res.status(400).send('User was not logged in. Kindly login')
    }
    res.clearCookie('jwt', { httpOnly: true }) // option1
    // res.cookie('jwt', '', {maxAge: 1})   //option2
    res.status(201).send("User logged out successfully")
}