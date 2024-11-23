const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const connectDb = require('./data/db')
const routee = require('./routes/userRoutes')
const route = require('./routes/authRoutes')
const resturantRoutes = require('./routes/resturantRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const foodRoute = require('./routes/foodRoutes')

const app = express()

// DOTENV CONFIGURATION
dotenv.config()

// DB CONNECTION
connectDb()

// middleware
app.use(express.json())

// ROutes
app.use('/auth', route)
app.use('/user', routee)
app.use('/resturant', resturantRoutes)
app.use('/category', categoryRoutes)
app.use('/food', foodRoute)
app.get('/', (req, res) => {
  res.status(200).send(`<h1>Welcome to Food App Server</h1>`)
})

// PORT FOR LISTENING
const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server is Listening on port: ${port}`)
})
