const Task = require('../models/Task')
const { AppError } = require('../utils')

const createTask = async (req, res, next) => {
    try {
        // CREATE TASK
        const task = new Task({
            ...req.body,
            projectId: req.params.projectId
        })
        await task.save()
        // SEND RESPONSE
        res.status(201).json(task)
    } catch (error) {
        next(error)
    }
}

const getAllTask = async (req, res, next) => {
    try {
        //  IMPLEMENT FILTER OPTIONS
        const { status, dueDate } = req.query
        const filter = { projectId: req.params.projectId }
        
        if (status) filter.status = status
        if (dueDate) filter.dueDate = { $lte: new Date(dueDate) }

        // FETCH ALL THE TASKS
        const tasks = await Task.find(filter)
        
        // SEND RESPONSE
        res.status(200).json(tasks)
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {
    try {
        // UPDATE TASK
        const task = await Task.findByIdAndUpdate(req.params.taskId, { $set: req.body }, { new: true })

        // SEND RESPONSE
        res.status(200).json(task)
    } catch (error) {
        next(error)
    }
}
const deleteTask = async (req, res, next) => {
    try {
        // UPDATE TASK
        const task = await Task.findByIdAndDelete(req.params.taskId)

        // SEND RESPONSE
        res.status(200).json(task)
    } catch (error) {
        next(error)
    }
}

const updateStatus = async (req, res, next) => {
    try {
        // VALIDATE STATUS FORMAT
        const {error} = TaskSchema.extract('status').validate(req.body.status)
        if(error) next(new AppError(error.details[0].message, 400))

        // UPDATE TASK STATUS
        const task = await Task.findByIdAndUpdate(req.params.taskId, {status: req.body.status}, {new: true})

        // SEND RESPONSE
        res.status(200).json(task)
    } catch (error) {
        next(error)
    }
}

module.exports = { createTask, getAllTask, updateTask, deleteTask, updateStatus }