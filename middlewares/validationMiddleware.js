const Project = require("../models/Project");
const User = require("../models/User");
const { AppError } = require("../utils");

const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(err => err.message); // Collect all validation error messages
        return next(new AppError(errorMessages, 400));
    }
    next();
};

const validateUsernameTaken = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if (user) return next(new AppError('Username Already Taken!', 400))

        next()
    } catch (error) {
        next(error)
    }
}
const validateProjectExists = async (req, res, next) => {
    try {
        const project = await Project.findOne({ _id: req.params.projectId, owner: req.user.id })
        if (!project) return next(new AppError('Project not found!', 404))

        req.project = project
        next()
    } catch (error) {
        next(error)
    }
}


module.exports = { validateRequest, validateUsernameTaken, validateProjectExists }