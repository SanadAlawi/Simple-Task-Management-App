const Project = require('../models/Project')
const { getUser, getProject, AppError } = require('../utils')

const createProject = async (req, res, next) => {
    try {

        // PROJECT Exists
        const isProjectExist = await getProject({ name: req.body.name, owner: req.user.id })
        if (isProjectExist) return next(new AppError('Project name already exists!', 409))

        // SAVE THE PROJECT
        const savedProject = new Project({
            name: req.body.name,
            description: req.body.description,
            owner: req.user.id
        })
        await savedProject.save()
        //    SEND RESPONSE
        res.status(201).json(savedProject)
    } catch (error) {
        next(error)
    }
}

const getSpecificProject = async (req, res, next) => {
    try {
        // SEND RESPONSE
        res.status(200).json(req.project)
    } catch (error) {
        next(error)
    }
}

const getAllProjects = async (req, res, next) => {
    try {

        const {page = 1, limit = 10} = req.query
        // FETCH ALL PROJECT FOR THIS USER
        const projects = await Project.find({owner: req.user.id})
                                    .skip((page-1) * limit)
                                    .limit(Number(limit))
        res.status(200).json(projects)
    } catch (error) {
        next(error)
    }
}

const updateProject = async (req, res, next) => {
    try {
        // UPDATE PROJECT
        const updatedPRoject = await Project.findByIdAndUpdate(req.params.projectId, {$set: req.body},{new: true})
        
        // SEND RESPONSE
        res.status(200).json(updatedPRoject)
    } catch (error) {
        next(error)
    }
}

const deleteProject = async (req, res, next) => {
    try {
        // DELETE PROJECT
        const deletedPRoject = await Project.findByIdAndDelete(req.params.projectId)
        
        // SEND RESPONSE
        res.status(200).json(deletedPRoject)
    } catch (error) {
        next(error)
    }
}

module.exports = { createProject, getSpecificProject, getAllProjects, updateProject, deleteProject }