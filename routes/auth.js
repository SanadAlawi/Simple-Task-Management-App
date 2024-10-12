const router = require('express').Router()
const path = require('path')
const multer = require('multer')
const { validateRequest, validateUsernameTaken } = require('../middlewares/validationMiddleware')
const { verifyToken } = require('../middlewares/AuthorizationMiddleware')

const { registerUser, loginUser, uploadImage } = require('../controllers/userController')
const { loginSchema, registerSchema } = require('../config/validation')


// REGISTER
router.post('/register', validateUsernameTaken, validateRequest(registerSchema), registerUser)

// LOGIN
router.post('/login', validateRequest(loginSchema), loginUser)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage })

// UPLOAD IMAGE
router.put('/upload', verifyToken, upload.single('avatar'), uploadImage)

module.exports = router