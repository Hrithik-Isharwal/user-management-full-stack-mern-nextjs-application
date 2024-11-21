const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Get a paginated list of users
router.get('/users', userController.getUsers);

// Get all users
router.get('/users/all', userController.getAllUsers);

// Get a single user by ID
router.get('/users/:id', userController.getUserById);

// Create a new user
router.post('/users', userController.createUser);

// Update a user by ID
router.put('/users/:id', userController.updateUser);

// Delete a user by ID
router.delete('/users/:id', userController.deleteUser);

module.exports = router;