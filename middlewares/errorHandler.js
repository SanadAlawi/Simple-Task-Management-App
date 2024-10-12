const logger = require("../config/logger")

const errorHandler = (err, req, res, next) => {
    logger.error(`${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    res.status(err.statusCode || 500).json({message: err.message})
}

module.exports = errorHandler