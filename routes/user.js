const express = require('express');
const router = express.Router();
const users = require('../controllers/user_controller');
const User = require('../models/users');

// Create a new user
router.post('/sign_up', users.signup);

//view user info
router.get('/view_info/:userid', users.viewInfo);

module.exports = router;
