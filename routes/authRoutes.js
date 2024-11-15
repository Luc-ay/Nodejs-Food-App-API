const express = require('express');
const { authRegisterUser, authLoginUser } = require('../controllers/authControllers');

const route = express.Router();

// Routes
// Register Routes
route.post('/register', authRegisterUser)

// Register Routes
route.post('/login', authLoginUser)


// EXPORT ROUTE
module.exports = route