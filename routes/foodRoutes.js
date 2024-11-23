const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const {
  createFood,
  getAllFoods,
  singleFood,
  resturantFood,
  updateFood,
} = require('../controllers/foodControllers')

const foodRoute = express.Router()

// Food Routes

// Create Food
foodRoute.post('/create', authMiddleware, createFood)

// Get all Food
foodRoute.get('/', getAllFoods)

// Get Single Food
foodRoute.get('/:id', singleFood)

// Get Food by Resturant
foodRoute.get('/resturant/:id', resturantFood)

// Update Food
foodRoute.get('/update/:id', authMiddleware, updateFood)

module.exports = foodRoute
