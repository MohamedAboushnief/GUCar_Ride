const UserModel = require('../models/users');
const MobileModel = require('../models/mobile_numbers');
const Sequelize = require('sequelize');
const sequelize = require('../config/databaseConfig');
const User = new UserModel(sequelize, Sequelize);
const Mobile = new MobileModel(sequelize, Sequelize);

const bcrypt = require('bcrypt');

const signup = async (req, res, next) => {
	try {
		console.log(req.body);

		const checkUser = await UserModel.findOne({ email: req.body.email });

		if (checkUser) {
			return res.status(404).json({
				status: 'Failure',
				message: 'This account already exists'
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
				status: 'Failure',
				message: 'Something went wrong, Your account cannot be created !'
			});
		} else {
			return res.status(200).json({
				user,
				mobile,
				status: 'success',
				message: 'Your account has been created successfully !'
			});
		}
	} catch (error) {
		console.log(error);
		return next(error);
	}
};

const getInfo = async (req, res, next) => {
	try {
		const user = await UserModel.findByPk(req.params.id);
		const mobile = await MobileModel.findOne({ user_id: req.params.id });
		if (user) {
			return res.status(200).json({
				user,
				mobile,
				status: 'success',
				message: 'Info retrieved successfully !'
			});
		} else {
			console.log(user.params);
			return res.status(400).json({
				status: 'failure',
				message: 'Something went wrong !'
			});
		}
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	signup,
	getInfo
};
