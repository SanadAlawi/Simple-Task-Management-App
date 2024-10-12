# Simple Task Management App

## Description
A Node.js backend task management application with user authentication, project management, and task tracking.

## Features
- User registration and login
- Project creation and management
- Task assignment and tracking
- Email verification and notification
- JWT-based authentication

## Setup
1. Clone the repository.
2. Install dependencies: `npm install`
3. Setup `.env` file with:
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
JWT_SECRET_KEY=your-secret-key
MONGODB_URI=mongodb://localhost:27017/your-database-name
4. Start the server: `npm start`

## Dependencies
- bcrypt
- dotenv
- express
- express-rate-limit
- handlebars
- joi
- jsonwebtoken
- mongoose
- multer
- nodemailer
- nodemon
- winston
