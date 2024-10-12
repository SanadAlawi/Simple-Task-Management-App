const jwt = require('jsonwebtoken')
const { AppError } = require('../utils')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (!authHeader) return next(new AppError('You are not authenticated!', 403))

    const token = authHeader.split(' ')[1]
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return next(new AppError('Token is not valid!', 403))
        req.user = user
        next()
    })
}

module.exports = { verifyToken }