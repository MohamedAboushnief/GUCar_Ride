const Usermodel = require("../models/users");
const Sequelize = require("sequelize");
const sequelize = require("../config/databaseConfig");
const User = new Usermodel(sequelize, Sequelize);
const jwt = require("jsonwebtoken");
var passport = require('passport');

const { checkEncryptedEqualVal } = require("../helpers/encryption_helper");

const signup = async (req, res, next) => {
  try {
    const checkUser = await Usermodel.findOne({ email: req.body.email });

    if (checkUser) {
      return res.status(404).json({
        status: "Failure",
        message: "This account already exists"
      });
    }

    var user = await Usermodel.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      guc_id: req.body.guc_id,
      age: req.body.age,
      gender: req.body.gender,
      address: req.body.address,
      rating: req.body.rating
    });
    if (!user) {
      return res.status(404).json({
        status: "Failure",
        message: "Something went wrong, Your account cannot be created !"
      });
    }
    return res.status(200).json({
      user,
      status: "success",
      message: "Your account has been created successfully !"
    });
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
    const user = await Usermodel.findOne({ email: email });
    if (!user) {
      return res.status(405).json({
        status: "Failure",
        message: "Email not found"
      });
	}
	
	console.log(password + '   ' + user.password)
	const match = checkEncryptedEqualVal(password,user.password)

    if (!match) {
      return res.status(422).json({
        status: "Failure",
        message: "Password doesnt match"
      });
    }

    const jwt_data = { user_id: user.id, email: user.email };
    const jwt_token = await generateJWT(jwt_data, sequelize.secret, {});


    if (success) {
      return res.status(200).json({
        id: user.id,
        email: user.email,
        token: `Bearer ${jwt_token}`
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
