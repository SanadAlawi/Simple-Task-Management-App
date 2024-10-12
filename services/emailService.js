const transporter = require('../config/email')

const fs = require('fs')
const handlebar = require('handlebars')



const sendEmail = async (to, subject, text, data) => {
    
    try {
        const source = fs.readFileSync(__dirname + '/../templates/emailTemplate.html', 'utf8')
        const template = handlebar.compile(source)
        const html = template({username: data.username})
        
        await transporter.sendMail({
            from: process.env.EMAIL_USER, 
            to,
            subject,
            text,
            html
        })
        console.log('Email send successfully')
    } catch (error) {
        console.log('Error sending email:', error)
    }
}

module.exports = sendEmail