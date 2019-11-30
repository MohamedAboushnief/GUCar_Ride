const express = require('express');
const router = express.Router();
const users = require('../controllers/user_controller');
const requests = require('../controllers/request_controller');
const User = require('../models/users');
var passport = require('passport');

router.post('/create/:driver_id', passport.authenticate('jwt', { session: false }), requests.add_request);
router.get('/requests', passport.authenticate('jwt', { session: false }), requests.get_requests);
router.delete(
	'/cancel_request/:passenger_id',
	passport.authenticate('jwt', { session: false }),
	requests.delete_request
);
router.post('/accept_request/:passenger_id', passport.authenticate('jwt', { session: false }), requests.accept_request);
router.post(
	'/arrived_to_pickUp/:passenger_id',
	passport.authenticate('jwt', { session: false }),
	requests.arrived_to_pickUp
);
router.delete('/arrived_to_guc', passport.authenticate('jwt', { session: false }), requests.delete_all_requests);

module.exports = router;
