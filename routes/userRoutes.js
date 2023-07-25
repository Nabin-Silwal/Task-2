const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/errorHandler');
const userController = require('../controllers/userController');

// Register a new user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

// Update user details
router.put('/update', authMiddleware, userController.updateUser);

module.exports = router;
