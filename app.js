require('dotenv').config()
require('express-async-errors')
// express

const express = require('express')
const app = express()

// rest of the packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')


// routes
const AuthRouter = require('./src/routes/AuthRouter')

// db
const connectDB = require('./src/db/connect')

// middleware
const notFoundMiddlewareError = require('./src/middleware/notFoundMiddleware')
const errohMiddlewareError = require('./src/middleware/errorHandlerMiddleware')





const port = process.env.PORT || 5000;

app.use(express.static('./public'))

app.use(express.json())
app.use(morgan('tiny'))
app.use(cookieParser(process.env.JWT_SECRET))


app.use('/api/v1/auth', AuthRouter)

app.use(notFoundMiddlewareError)
app.use(errohMiddlewareError)



const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log('E-COMMERCE API')
        })
    } catch (error) {
        console.log('unable to connect to db');
    }
}

start()