const express = require('express');
const router = express.Router();
const trips = require('../controllers/trip_controller');
const User = require('../models/trips');
var passport = require('passport');
require('../config/passport')(passport);

// Create a new user
router.post('/create_trip', passport.authenticate('jwt', { session: false }), trips.create_trip);
router.delete('/delete_trip', passport.authenticate('jwt', { session: false }), trips.delete_trip);
router.get('/view_available_drivers', passport.authenticate('jwt', { session: false }), trips.view_available_drivers);
module.exports = router;
