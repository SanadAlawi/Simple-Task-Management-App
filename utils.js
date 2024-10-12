const User = require('./models/User')
const Project = require('./models/Project')

const getUser = async (userId) => {
    const user = await User.findById(userId)
    return user
}

const getProject = async (projectInfo) => {
    const project = await Project.findOne(projectInfo)
    return project
}


class AppError extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = {getUser, getProject, AppError}