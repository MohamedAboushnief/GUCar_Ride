const UserModel = require('../models/users');
const MobileModel = require('../models/mobile_numbers');
const CarModel = require('../models/driver_car');
const Sequelize = require('sequelize');
const sequelize = require('../config/keys_development');
const Car = new CarModel(sequelize, Sequelize);
const Mobile = new MobileModel(sequelize, Sequelize);
const User = new UserModel(sequelize, Sequelize);
const jwt = require('jsonwebtoken');
var passport = require('passport');
const bcrypt = require('bcrypt');
const { checkEncryptedEqualVal } = require('../helpers/encryption_helper');

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

		if (req.body.mobile_number == null) {
			return res.status(404).json({
				status: 'Failure',
				message: 'Something went wrong!'
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

		if (!mobile) {
			return res.status(404).json({
				status: 'Failure',
				message: 'Something went wrong, Your account cannot be created !'
			});
		}
		if (!user) {
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

const login = async (req, res, next) => {
	const valid = req.body && req.body.email && req.body.password;

	if (!valid) {
		return res.status(422).json({
			status: 'Failure',
			message: 'Missing email or password'
		});
	}
	const email = req.body.email;
	const password = req.body.password;
	try {
		const user = await UserModel.findOne({ where: { email } });
		if (!user) {
			return res.status(405).json({
				status: 'Failure',
				message: 'Email not found'
			});
		}

		const match = await checkEncryptedEqualVal(password, user.password);

		if (!match) {
			return res.status(422).json({
				status: 'Failure',
				message: 'Password doesnt match'
			});
		}

		const jwt_data = { user_id: user.id, email: user.email };

		const token = jwt.sign(jwt_data, sequelize.secretOrKey, {
			expiresIn: '1h'
		});

		if (match) {
			return res.status(200).json({
				id: user.id,
				email: user.email,
				token: `Bearer ${token}`,
				message: 'logged in successfully'
			});
		} else {
			return res.status(422).json({
				message: 'login failed',
				status: 'Failure'
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
		const car = await CarModel.findOne({ user_id: req.params.id });
		if (!user) {
			console.log(user.params);
			return res.status(400).json({
				status: 'failure',
				message: 'Something went wrong !'
			});
		} else {
			return res.status(200).json({
				user,
				mobile,
				car,
				status: 'success',
				message: 'Info retrieved successfully !'
			});
		}
	} catch (error) {
		return res.status(400).json({
			status: 'failure',
			message: 'Something went wrong !'
		});
	}
};

module.exports = {
	signup,
	login,
	generateJWT,
	getInfo
};
