const express = require('express');
const router = express.Router();
const users = require('../controllers/user_controller');
const User = require('../models/users');

// Create a new user
router.get('/userInfo/:id', users.getInfo);
router.post('/sign_up', users.signup);
router.post('/login', users.login);
router.put('/edit_info/:id', users.editInfo);


module.exports = router;
