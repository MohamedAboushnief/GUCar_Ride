const UserModel = require('../models/users');
const RequestModel = require('../models/requests');
const CarDriverModel = require('../models/drivers_cars');
const Sequelize = require('sequelize');
const sequelize = require('../config/keys_development');
const User = new UserModel(sequelize, Sequelize);
var passport = require('passport');

const add_request = async (req, res, next) => {
	try {
		if (req.user.id != req.params.driver_id) {
			const checkExist = await RequestModel.findOne({ where: { passenger_id: req.user.id } });

			if (checkExist) {
				return res.status(400).json({
					status: 'failure',
					message: 'You have already requested a driver !'
				});
			}
			const driver = await CarDriverModel.findOne({
				where: { user_id: req.params.driver_id }
			});

			if (!driver) {
				return res.status(400).json({
					status: 'failure',
					message: 'Driver doesnt exist'
				});
			}

			const newRequest = await RequestModel.create({
				passenger_id: req.user.id,
				driver_id: driver.id
			});
			if (!newRequest) {
				return res.status(400).json({
					status: 'failure',
					message: 'Could not create request !'
				});
			}
			return res.status(200).json({
				status: 'success',
				message: 'Request sent successfully !'
			});
		}
	} catch (error) {
		next(error);
		// return res.status(400).json({
		// 	status: 'failure',
		// 	message: 'Something went wrong !'
		// });
	}
};

module.exports = {
	add_request
};
