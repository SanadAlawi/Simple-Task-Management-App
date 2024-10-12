const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config()


const rateLimit = require('express-rate-limit')
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many requests from this IP, please try again after 15 minutes'
})

const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use('/uploads', express.static('uploads'))

const authRoute = require('./routes/auth')
app.use('/api/auth', authRoute, generalLimiter)

const projectRoute = require('./routes/project')
app.use('/api/project', projectRoute)

const taskRoute = require('./routes/Task')
app.use('/api/task', taskRoute)

app.use(errorHandler)
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGOOSE_SECRET_KEY)
        .then(() => console.log('Database connected successfully'))
        .catch(err => console.log(err))



const port = process.env.PORT || 4500
app.listen(port, () => {
    console.log('Backend is running')
})