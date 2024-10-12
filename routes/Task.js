const router = require('express').Router()
const { TaskSchema } = require('../config/validation')
const { createTask, getAllTask, updateTask, deleteTask } = require('../controllers/taskController')
const { verifyToken } = require('../middlewares/AuthorizationMiddleware')
const { validateProjectExists, validateRequest } = require('../middlewares/validationMiddleware')

// CREATE TASK
router.post('/:projectId', verifyToken, validateRequest(TaskSchema), validateProjectExists, createTask)

// GET ALL TASKS
router.get('/:projectId', verifyToken, validateProjectExists, getAllTask)

// UPDATE TASK
router.put('/:projectId/:taskId', verifyToken, validateProjectExists, validateRequest(TaskSchema), updateTask)

// DELETE TASK
router.delete('/:projectId/:taskId', verifyToken, validateProjectExists, deleteTask)

// STATUS TRACKING
router.post('/:projectId/:taskId', verifyToken, validateProjectExists, updateTask)

module.exports = router