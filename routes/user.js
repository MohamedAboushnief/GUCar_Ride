const express = require("express");
const router = express.Router();
const users = require("../controllers/user_controller");
const User = require("../models/users");
var passport = require("passport");
require("../config/passport")(passport);

// Create a new user
<<<<<<< HEAD
router.get('/userInfo', passport.authenticate('jwt', { session: false }), users.getInfo);
router.post('/sign_up', users.signup);
router.post('/login', users.login);
router.put('/edit_info', passport.authenticate('jwt', { session: false }), users.editInfo);
router.delete('/delete_user', passport.authenticate('jwt', { session: false }), users.delete_user);
router.put('/change_password', passport.authenticate('jwt', { session: false }), users.change_password);
=======
router.get(
  "/userInfo",
  passport.authenticate("jwt", { session: false }),
  users.getInfo
);
router.post("/sign_up", users.signup);
router.post("/login", users.login);
router.put(
  "/edit_info",
  passport.authenticate("jwt", { session: false }),
  users.editInfo
);
router.delete(
  "/delete_user",
  passport.authenticate("jwt", { session: false }),
  users.delete_user
);
>>>>>>> 6902eb99f7bc7b330505e2a183b052a3660e2ecf

module.exports = router;
