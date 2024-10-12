const { projectSchema } = require('../config/validation')
const { createProject, getSpecificProject, getAllProjects, updateProject, deleteProject } = require('../controllers/projectController')
const { verifyToken } = require('../middlewares/AuthorizationMiddleware')
const { validateRequest, validateProjectExists } = require('../middlewares/validationMiddleware')

const router = require('express').Router()


// CREATE PROJECT
router.post('/create', verifyToken, validateRequest(projectSchema), createProject)

// GET ALL PROJECTS
router.get('/all', verifyToken, getAllProjects)

// READ SPECIFIC PROJECT
router.get('/:projectId', verifyToken, validateProjectExists, getSpecificProject)

// UPDATE PROJECT
router.put('/:projectId', verifyToken, validateProjectExists, updateProject)

// UPDATE PROJECT
router.delete('/:projectId', verifyToken, validateProjectExists, deleteProject)

module.exports = router