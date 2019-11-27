const express = require('express');
const router = express.Router();
const users = require('../controllers/user_controller');
const requests = require('../controllers/request_controller');
const User = require('../models/users');
var passport = require('passport');

router.post('/create/:driver_id', passport.authenticate('jwt', { session: false }), requests.add_request);
router.get('/requests', passport.authenticate('jwt', { session: false }), requests.get_requests);
router.delete('/request/:passenger_id', passport.authenticate('jwt', { session: false }), requests.delete_request);

module.exports = router;
