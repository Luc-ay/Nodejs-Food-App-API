const express = require('express')
const {
  getUserController,
  updateUser,
  updatePassword,
  deleteUser,
} = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')
const routee = express.Router()

// GET USER DATA
routee.get('/getUSer', authMiddleware, getUserController)

// Update User Info
routee.put('/updateUser', authMiddleware, updateUser)

// Update User Password
routee.put('/updatePassword', authMiddleware, updatePassword)

// DELETE USER PASSWORD
routee.delete('/deleteUser/:id', deleteUser)

// EXPORT ROUTE
module.exports = routee
