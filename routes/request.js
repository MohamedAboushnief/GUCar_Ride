const express = require("express");
const router = express.Router();
const users = require("../controllers/user_controller");
const requests = require("../controllers/request_controller");
const User = require("../models/users");
var passport = require("passport");

router.post(
  "/create/:driver_id",
  passport.authenticate("jwt", { session: false }),
  requests.add_request
);

module.exports = router;
