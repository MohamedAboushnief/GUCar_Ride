const express = require('express');
const router = express.Router();
const users = require('../controllers/user_controller');
const User = require('../models/users');

// Create a new user
router.post('/sign_up', users.signup);


module.exports = router;
