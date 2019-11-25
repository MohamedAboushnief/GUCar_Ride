const UserModel = require("../models/users");
const Sequelize = require("sequelize");
const sequelize = require("../config/keys_development");
const User = new UserModel(sequelize, Sequelize);
const jwt = require("jsonwebtoken");
var passport = require("passport");
const MobileModel = require("../models/mobile_numbers");
const Mobile = new MobileModel(sequelize, Sequelize);
const bcrypt = require("bcrypt");
const { checkEncryptedEqualVal } = require("../helpers/encryption_helper");

const signup = async (req, res, next) => {
  try {
    console.log(req.body);

    const checkUser = await UserModel.findOne({ email: req.body.email });

    if (checkUser) {
      return res.status(404).json({
        status: "Failure",
        message: "This account already exists"
      });
    }
    const salt = await bcrypt.genSalt(10);
    encryptedPassword = await bcrypt.hash(req.body.password, salt);

    var user = await UserModel.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: encryptedPassword,
      guc_id: req.body.guc_id,
      age: req.body.age,
      gender: req.body.gender,
      address: req.body.address,
      rating: req.body.rating
    });

    var mobile = await MobileModel.create({
      user_id: user.id,
      mobile_number: req.body.mobile_number
    });

    if (!user && !mobile) {
      return res.status(404).json({
        status: "Failure",
        message: "Something went wrong, Your account cannot be created !"
      });
    } else {
      return res.status(200).json({
        user,
        mobile,
        status: "success",
        message: "Your account has been created successfully !"
      });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const login = async (req, res, next) => {
  const valid = req.body && req.body.email && req.body.password;

  if (!valid) {
    return res.status(422).json({
      status: "Failure",
      message: "Missing email or password"
    });
  }
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(405).json({
        status: "Failure",
        message: "Email not found"
      });
    }

    
    const match = await checkEncryptedEqualVal(password, user.password);

    if (!match) {
      return res.status(422).json({
        status: "Failure",
        message: "Password doesnt match"
      });
    }

    const jwt_data = { user_id: user.id, email: user.email };

    const token = jwt.sign(jwt_data, sequelize.secretOrKey, {
      expiresIn: "1h"
    });

    if (match) {
      return res.status(200).json({
        id: user.id,
        email: user.email,
        token: `Bearer ${token}`,
        message: "logged in successfully"
      });
    } else {
      return res.status(422).json({
        message: "login failed",
        status: "Failure"
      });
    }
  } catch (e) {
    next(e);
  }
};

const generateJWT = async function(payload, secret, options) {
  return new Promise(function(resolve) {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        throw err;
      }
      resolve(token);
    });
  });
};

module.exports = {
  signup,
  login,
  generateJWT
};
