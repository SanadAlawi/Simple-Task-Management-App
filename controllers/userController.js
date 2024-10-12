const User = require('../models/User')
const bcrypt = require('bcrypt')
const generateToken = require('../config/token')
const sendEmail = require('../services/emailService')
const { AppError } = require('../utils')


const registerUser = async (req, res, next) => {
    try {

        // HASH THE PASSWORD
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        // ADD USER
        const savedUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        await savedUser.save()

        // GENERATE ACCESS TOKEN
        const token = generateToken(savedUser)

        // SEND VERIFICATION EMAIL
        await sendEmail(savedUser.email, 'Register Verification', 'Hello World', { username: savedUser.username })

        // SEND RESPONSE
        const { password, ...others } = savedUser._doc
        res.status(201).json({ token, ...others })
    } catch (error) {
        next(error)
    }

}

const loginUser = async (req, res, next) => {

    try {
        // CHECK IF THE USER EXIST
        const userExist = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        })
        if (!userExist) return next(new AppError('Username or Password went wrong', 401))

        // COMPARE THE PASSWORDS
        const matchPassword = await bcrypt.compare(req.body.password, userExist.password)
        if (!matchPassword) return next(new AppError('Username or Password went wrong', 401))

        // GENERATE TOKEN
        const token = generateToken(userExist)

        // SEND RESPONSE
        const {password, ...others} = userExist._doc
        res.status(201).json({token, ...others})
    } catch (error) {
        next(error)
    }
}


const uploadImage = async (req, res, next) => {
    try {
        const avatarUrl = `/uploads/${req.file.filename}`

        // UPLOAD IMAGE
        await User.findByIdAndUpdate(req.user.id, {avatar: avatarUrl}, {new: true})
        
        // SEND RESPONSE
        res.status(200).json(avatarUrl)

    } catch (error) {
        next(error)
    }
}

module.exports = { registerUser, loginUser, uploadImage }