const express = require('express');
const router = express.Router();
const users = require('../controllers/user_controller');
const requests = require('../controllers/request_controller');
const PassengerRequesrs = require('../models/passengers_requests');
const User = require('../models/users');
const passengers_requests = require('../controllers/passenger_request_controller');
var passport = require('passport');

router.post(
	'/create_passenger_request/:driver_id',
	passport.authenticate('jwt', { session: false }),
	passengers_requests.create_requests
);

router.delete(
	'/cancel_passenger_request',
	passport.authenticate('jwt', { session: false }),
	passengers_requests.delete_request
);

router.get(
	'/view_passenger_request/:driver_id',
	passport.authenticate('jwt', { session: false }),
	passengers_requests.view_request
);

module.exports = router;
