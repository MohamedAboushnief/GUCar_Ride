const UserModel = require("../models/users");
const MobileModel = require("../models/mobile_numbers");
const CarModel = require("../models/driver_car");
const Sequelize = require("sequelize");
const sequelize = require("../config/keys_development");
const Car = new CarModel(sequelize, Sequelize);
const Mobile = new MobileModel(sequelize, Sequelize);
const User = new UserModel(sequelize, Sequelize);
const jwt = require("jsonwebtoken");
var passport = require("passport");
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

    if (req.body.mobile_number == null) {
      return res.status(404).json({
        status: "Failure",
        message: "Something went wrong!"
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
      date_of_birth: new Date(req.body.date_of_birth),
      gender: req.body.gender,
      address: req.body.address,
      rating: req.body.rating
    });

    for (var i = 0; i < req.body.mobile_number.length; i++) {
      await MobileModel.create({
        user_id: user.id,
        mobile_number: req.body.mobile_number[i]
      });
    }

    // if (!mobile) {
    //   return res.status(404).json({
    //     status: "Failure",
    //     message: "Something went wrong, Your account cannot be created !"
    //   });
    // }
    if (!user) {
      return res.status(404).json({
        status: "Failure",
        message: "Something went wrong, Your account cannot be created !"
      });
    } else {
      return res.status(200).json({
        user,
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

const getInfo = async (req, res, next) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    const mobile = await MobileModel.findOne({ user_id: req.params.id });
    if (user) {
      return res.status(200).json({
        user,
        mobile,
        status: "success",
        message: "Info retrieved successfully !"
      });
    } else {
      console.log(user.params);
      return res.status(400).json({
        status: "failure",
        message: "Something went wrong !"
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "failure",
      message: "Something went wrong !"
    });
  }
};

const editInfo = async (req, res, next) => {
  try {
    console.log("llllllllllllllllllllllllllllllllll");
    const user = await UserModel.findByPk(req.params.id);

    console.log(user);
    if (!user || user == null) {
      return res.status(400).json({
        status: "failure",
        message: "Something went wrong, could not find user !"
      });
    }

    const updatedUser = await UserModel.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        guc_id: req.body.guc_id,
        date_of_birth: req.body.date_of_birth,
        gender: req.body.gender,
        address: req.body.address
      },
      { where: { id: user.id } }
    );

    if (!updatedUser) {
      return res.status(400).json({
        status: "failure",
        message: "Something went wrong, cannot update your info !"
      });
    }

    if (req.body.mobile_number) {
      const mobile = await MobileModel.findAll({ user_id: req.params.id });

      var count = 0;
      for (let i = 0; i <= req.body.mobile_number.length; i++) {
        for (let j = 0; j <= mobile.length; j++) {
          if (count === mobile.length && i < req.body.mobile_number.length) {
            const newMobNo = await MobileModel.create({
              user_id: user.id,
              mobile_number: req.body.mobile_number[i]
            });
            count = -1;
          } else if (
            j < mobile.length &&
            req.body.mobile_number[i] === mobile[j].mobile_number
          ) {
            count = -1;
          } else if (
            j === mobile.length ||
            i === req.body.mobile_number.length
          ) {
            count = -1;
          }

          count++;
        }
      }
      var count2 = 0;
      for (let i = 0; i <= mobile.length; i++) {
        for (let j = 0; j <= req.body.mobile_number.length; j++) {
          if (count2 === req.body.mobile_number.length && i < mobile.length) {
            const deleteMobNo = await MobileModel.destroy({
              where: { mobile_number: mobile[i].mobile_number }
            });

            count2 = -1;
          } else if (
            i < mobile.length &&
            req.body.mobile_number[j] === mobile[i].mobile_number
          ) {
            count2 = -1;
          } else if (
            i === mobile.length ||
            j === req.body.mobile_number.length
          ) {
            count2 = -1;
          }
          count2++;
        }
      }
    }

    const updatedOne = await UserModel.findByPk(req.params.id);

    return res.status(200).json({
      status: "success",
      message: "Your info has been updated successfully !",
      updatedOne
    });
  } catch (error) {
    return res.status(400).json({
      status: "failure",
      message: "Something went wrong !"
    });
  }
};

module.exports = {
  signup,
  login,
  generateJWT,
  getInfo,
  editInfo
};
