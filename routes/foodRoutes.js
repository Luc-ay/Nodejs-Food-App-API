const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const {
  createFood,
  getAllFoods,
  singleFood,
  resturantFood,
  updateFood,
  deleteFood,
  orderFood,
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
foodRoute.put('/update/:id', authMiddleware, updateFood)

// Delete Food
foodRoute.delete('/delete/:id', authMiddleware, deleteFood)

// Place Order
foodRoute.post('/order', authMiddleware, orderFood)

module.exports = foodRoute
