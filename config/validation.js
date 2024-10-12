const Joi = require('joi')

const registerSchema = Joi.object({
    username: Joi.string()
        .required()
        .min(6)
        .messages({
            'string.base': 'Username should be a type of text',
            'string.empty': 'Username cannot be an empty field',
            'string.min': 'Username should have a minimum length of 6',
            'any.required': 'Username is a required field'
        }),
    email: Joi.string()
        .required()
        .email()
        .messages({
            'string.base': 'Email should be a type of text',
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is a required field'
        }),
    password: Joi.string()
        .required()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .messages({
            'string.pattern.base': 'Password  must have at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character',
            'string.min': 'Password should have a minimum length of 8',
            'any.required': 'Password is a required field'
        })
})

const loginSchema = Joi.object({
    username: Joi.string()
        .min(6)
        .messages({
            'string.base': 'Username should be a type of text',
            'string.empty': 'Username cannot be an empty field',
            'string.min': 'Username should have a minimum length of 6',
            'any.required': 'Username is a required field'
        })
        .optional(),

    email: Joi.string()
        .email()
        .messages({
            'string.base': 'Email should be a type of text',
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is a required field'
        })
        .optional(),

    password: Joi.string()
        .required()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .messages({
            'string.pattern.base': 'Password  must have at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character',
            'string.min': 'Password should have a minimum length of 8',
            'any.required': 'Password is a required field'
        })
}).xor('username', 'email')

const projectSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            'string.empty': 'Name cannot be an empty field',
            'string.required': 'Name is a required field'
        }),
    description: Joi.string()
        .optional()
        .allow('')
})


const TaskSchema = Joi.object({
    title: Joi.string()
        .required()
        .messages({
            'string.base': 'Task title should be a type of text',
            'any.required': 'Task title is a required field'
        }),
    description: Joi.string()
        .optional(),
    assignedTo: Joi.string()
        .optional()
        .messages({
            'string.base': 'User Id should be a type of text',
            'string.pattern.base': 'User Id should be a valid ObjectId'
        }),
    status: Joi.string()
        .valid('pending', 'in-progress', 'completed')
        .default('pending')
        .messages({
            'string.base': 'Status should be a type of text',
            'any.only': 'Status must be one of the following values: pending, in-progress, completed',
        }),
    dueDate: Joi.date()
        .default(() => new Date())
        .optional()
        .messages({
            'date.base': 'Due Date must be a valid format: yyyy-mm-dd'
        })

})

module.exports = { registerSchema, loginSchema, projectSchema, TaskSchema }