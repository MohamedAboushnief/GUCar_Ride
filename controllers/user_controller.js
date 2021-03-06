const UserModel = require('../models/users');
const MobileModel = require('../models/mobile_numbers');
const CarModel = require('../models/drivers_cars');
const Sequelize = require('sequelize');
const sequelize = require('../config/keys_development');
const Car = new CarModel(sequelize, Sequelize);
const Mobile = new MobileModel(sequelize, Sequelize);
const User = new UserModel(sequelize, Sequelize);
const jwt = require('jsonwebtoken');
var passport = require('passport');
const bcryptjs = require('bcryptjs');
const { checkEncryptedEqualVal } = require('../helpers/encryption_helper');

const signup = async (req, res, next) => {
	try {
		pushToken = req.body.token;
		console.log(pushToken);
		const checkUser = await UserModel.findOne({
			where: {
				email: req.body.email
			}
		});

		if (checkUser) {
			console.log(checkUser);
			return res.status(404).json({
				status: 'Failure',
				message: 'This account already exists'
			});
		}

		const salt = await bcryptjs.genSalt(10);
		encryptedPassword = await bcryptjs.hash(req.body.password, salt);

		var user = await UserModel.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: encryptedPassword,
			guc_id: req.body.guc_id,
			date_of_birth: new Date(req.body.date_of_birth),
			gender: req.body.gender,
			address: req.body.address,
			rating: req.body.rating,
			push_token: pushToken,
			mobile_number: req.body.mobile_number
		});

		if (!user) {
			return res.status(404).json({
				status: 'Failure',
				message: 'Something went wrong, Your account cannot be created !'
			});
		} else {
			const jwt_data = { user_id: user.id, email: user.email };

			const token = jwt.sign(jwt_data, sequelize.secretOrKey, {
				expiresIn: '1h'
			});
			console.log('Push token is set successfully in the server');
			return res.status(200).json({
				user,
				token: `Bearer ${token}`,
				status: 'success',
				message: 'Your account has been created successfully !'
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(404).json({
			status: 'Failure',
			message: 'Something went wrong!'
		});
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
		const user = await UserModel.findByPk(req.user.id);
		if (!user) {
			return res.status(400).json({
				status: 'failure',
				message: 'Something went wrong !'
			});
		} else {
			return res.status(200).json({
				user,
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

const editInfo = async (req, res, next) => {
	try {
		const user = await UserModel.findByPk(req.user.id);

		console.log(user);
		if (!user || user == null) {
			return res.status(400).json({
				status: 'failure',
				message: 'Something went wrong, could not find user !'
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
				address: req.body.address,
				mobile_number: req.body.mobile_number
			},
			{ where: { id: user.id } }
		);

		if (!updatedUser) {
			return res.status(400).json({
				status: 'failure',
				message: 'Something went wrong, cannot update your info !'
			});
		}

		const updatedOne = await UserModel.findByPk(req.user.id);

		return res.status(200).json({
			status: 'success',
			message: 'Your info has been updated successfully !',
			updatedOne
		});
	} catch (error) {
		return res.status(400).json({
			status: 'failure',
			message: 'Something went wrong !'
		});
	}
};

const delete_user = async (req, res, next) => {
	try {
		const user = await UserModel.findByPk(req.user.id);

		if (!user) {
			return res.status(400).json({
				status: 'failure',
				message: 'Could not find user !'
			});
		}

		const deletedUser = await UserModel.destroy({
			where: {
				id: user.id
			}
		});
		if (!deletedUser) {
			return res.status(400).json({
				status: 'failure',
				message: 'Cannot delete user !'
			});
		}
		return res.status(200).json({
			status: 'success',
			message: 'User account deleted successfully !'
		});
	} catch (error) {
		return res.status(400).json({
			status: 'failure',
			message: 'Something went wrong !'
		});
	}
};

const change_password = async (req, res, next) => {
	try {
		const user = await UserModel.findByPk(req.user.id);
		if (!user || user == null) {
			return res.status(400).json({
				status: 'failure',
				message: 'Something went wrong, could not find user !'
			});
		}
		const oldPassword = req.body.oldPassword;
		const newPassword = req.body.newPassword;
		const confirmPassword = req.body.confirmPassword;
		const match = await checkEncryptedEqualVal(oldPassword, user.password);
		if (match) {
			if (newPassword === confirmPassword) {
				const salt = await bcryptjs.genSalt(10);
				encryptedPassword = await bcryptjs.hash(newPassword, salt);
				const updatedUser = await UserModel.update(
					{
						password: encryptedPassword
					},
					{ where: { id: user.id } }
				);
				if (!updatedUser) {
					return res.status(400).json({
						status: 'Failure',
						message: 'Something went wrong while updating your password!'
					});
				} else {
					return res.status(200).json({
						status: 'Success',
						message: 'Password changed successfully!'
					});
				}
			} else {
				return res.status(400).json({
					status: 'Failure',
					message: 'New Password and confirm password does not match !'
				});
			}
		} else {
			return res.status(400).json({
				status: 'Failure',
				message: 'Old password doesnt match with current password !'
			});
		}
	} catch (error) {
		return res.status(400).json({
			status: 'Failure',
			message: 'Something went wrong !'
		});
	}
};

const googleLogin = async (req, res, next) => {
	try {
		console.log(req.body);
		const checkUser = await UserModel.findOne({
			where: {
				email: req.body.email
			}
		});
		if (!checkUser) {
			pushToken = req.body.token;
			const guc_id = req.body.guc_id;
			const address = req.body.address;
			if (!guc_id) {
				return res.status(422).json({
					status: 'Failure',
					message: 'Please enter your GUC ID'
				});
			}
			if (!address) {
				return res.status(422).json({
					status: 'Failure',
					message: 'Please enter your address'
				});
			}
			console.log('fffffffffffffffffff');

			var user = await UserModel.create({
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				password: 'google account',
				guc_id: guc_id,
				date_of_birth: '1998-1-1',
				address: req.body.address,
				mobile_number: req.body.mobile_number,
				push_token: pushToken
			});

			const jwt_data = { user_id: user.id, email: user.email };
			const token = jwt.sign(jwt_data, sequelize.secretOrKey, {
				expiresIn: '1h'
			});
			return res.status(200).json({
				id: user.id,
				email: user.email,
				token: `Bearer ${token}`,
				message: 'logged in successfully'
			});
		} else {
			const jwt_data = { user_id: checkUser.id, email: checkUser.email };
			const token = jwt.sign(jwt_data, sequelize.secretOrKey, {
				expiresIn: '1h'
			});
			return res.status(200).json({
				id: checkUser.id,
				email: checkUser.email,
				token: `Bearer ${token}`,
				message: 'logged in successfully'
			});
		}
	} catch (e) {
		next(e);
	}
};

module.exports = {
	signup,
	login,
	generateJWT,
	getInfo,
	editInfo,
	delete_user,
	change_password,
	googleLogin
};
