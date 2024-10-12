const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String},
        projectId: {type: mongoose.Schema.ObjectId, ref: 'Project', required: true},
        assignedTo: {type: mongoose.Schema.ObjectId, ref: 'User'},
        status: {type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending'},
        dueDate: {type: Date, default: Date.now}
    },
    {timestamps: true}
)

module.exports = mongoose.model('Task', taskSchema)