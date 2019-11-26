const express = require("express");
const router = express.Router();
const users = require("../controllers/user_controller");
const driver_car_controller = require("../controllers/driver_car_controller");
const User = require("../models/users");
var passport = require("passport");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  driver_car_controller.add_user_car_details
);

module.exports = router;
