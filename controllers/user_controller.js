const Usermodel = require('../models/users');
const Sequelize = require('sequelize');
const sequelize = require('../config/databaseConfig');
const User = new Usermodel(sequelize, Sequelize);

const signup = async (req, res, next) => {
	try {
		console.log(req.body);

		const checkUser = await Usermodel.findOne({ email: req.body.email });

		if (checkUser) {
			return res.status(404).json({
				status: 'Failure',
				message: 'This account already exists'
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
				status: 'Failure',
				message: 'Something went wrong, Your account cannot be created !'
			});
		}
		return res.status(200).json({
			user,
			status: 'success',
			message: 'Your account has been created successfully !'
		});
	} catch (error) {
		console.log(error);
		return next(error);
	}
};

//view user info by id
const viewInfo = async (req, res, next) => {
	try {
		var user = User.findById(req.params.userid);
		if (!user) {
			return res.status(404).json({
				message: 'error viewing info',
				data: user
			});
		} else {
			return res.status(200).json({
				message: 'info view success',
				data: user
			});
		}
	} catch (error) {
		console.log(error);

		return res.status(400).json({
			message: 'error'
		});
	}
};

module.exports = {
	signup,
	viewInfo
};
