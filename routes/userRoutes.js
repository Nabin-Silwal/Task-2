const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/errorHandler');
const userController = require('../controllers/userController');

// Register a new user
router.post('/user/register', userController.registerUser);

// Login user
router.post('/user/login', userController.loginUser);

//Logout user
router.post('/user/logout', authMiddleware, userController.logoutUser);

// Get All User
router.get('/user/profile', authMiddleware, userController.getUser);

// Get User By id
router.get('/user/profile/:userId', authMiddleware, userController.getUserById);

// Update user details
router.put('/user/update/:userId', authMiddleware, userController.updateUser);

module.exports = router;
