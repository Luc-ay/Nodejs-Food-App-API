const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const {
  createResturant,
  getAllResturantController,
  getResturantByID,
  deleteResturant,
} = require('../controllers/resturantControllers')

const resturantRoutes = express.Router()

// Routes
// Create Rusturant
resturantRoutes.post('/createResturant', authMiddleware, createResturant)

// Get All Rusturant
resturantRoutes.get('/getAll', getAllResturantController)

// Get Resturant By ID
resturantRoutes.get('/get/:id', getResturantByID)

// DELETE RESTURANT
resturantRoutes.delete('/delete/:id', authMiddleware, deleteResturant)

module.exports = resturantRoutes
