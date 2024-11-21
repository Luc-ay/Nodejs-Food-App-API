const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController')

const categoryRoutes = express.Router()

// Category Routes
// Get all Category
categoryRoutes.get('/', getCategory)

// Create Category
categoryRoutes.post('/create', authMiddleware, createCategory)

// Update Category
categoryRoutes.put('/update/:id', authMiddleware, updateCategory)

// Delete Category
categoryRoutes.put('/delete/:id', authMiddleware, deleteCategory)

module.exports = categoryRoutes
