const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const connectDb = require('./data/db')
const routee = require('./routes/userRoutes')
const route = require('./routes/authRoutes')
const resturantRoutes = require('./routes/resturantRoutes')

const app = express()

// DOTENV CONFIGURATION
dotenv.config()

// DB CONNECTION
connectDb()

// middleware
app.use(express.json())

// ROutes
app.use('/api/v1/auth', route)
app.use('/api/v1/user', routee)
app.use('/api/v1/resturant', resturantRoutes)
app.get('/', (req, res) => {
  res.status(200).send(`<h1>Welcome to Food App Server</h1>`)
})

// PORT FOR LISTENING
const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server is Listening on port: ${port}`)
})
