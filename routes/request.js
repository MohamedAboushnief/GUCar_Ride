const express = require("express");
const router = express.Router();
const users = require("../controllers/user_controller");
const User = require("../models/users");

router.post("/create", users.signup);

module.exports = router;
