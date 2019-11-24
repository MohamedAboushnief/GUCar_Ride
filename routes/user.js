const express = require('express');
const router = express.Router();
const users = require('../controllers/user_controller');
const User = require('../models/users');

// Create a new user
router.post('/sign_up', users.signup);

// Retrieve all user
// router.get('/users', users.findAll);

// // Retrieve a single user by Id
// router.get('/:userId', users.findById);

// // Update a user with Id
// router.put('/update_user/:userId', users.update);

// // Delete a user with Id
// router.delete('/delete_user/:userId', users.delete);

module.exports = router;
