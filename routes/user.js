const express = require('express');
const router = express.Router();
const users = require('../controllers/user_controller');
const User = require('../models/users');
var passport = require('passport');
require('../config/passport')(passport);

// Create a new user
router.get('/userInfo', passport.authenticate('jwt', { session: false }), users.getInfo);
router.post('/sign_up', users.signup);
router.post('/login', users.login);

module.exports = router;
