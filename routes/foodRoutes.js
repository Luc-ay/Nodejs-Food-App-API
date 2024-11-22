const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { createFood } = require('../controllers/foodControllers')

const foodRoute = express.Router()

// Food Routes

// Create Food
foodRoute.post('/create', authMiddleware, createFood)
