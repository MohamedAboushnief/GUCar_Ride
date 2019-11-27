const UserModel = require('../models/users');
const RequestModel = require('../models/requests');
const CarDriverModel = require('../models/drivers_cars');
const Sequelize = require('sequelize');
const sequelize = require('../config/keys_development');
const TripModel = require('../models/trips');
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
				driver_id: driver.id,
				pick_up_location: req.body.pick_up_location
			});
			if (!newRequest) {
				return res.status(400).json({
					status: 'failure',
					message: 'Could not create request !'
				});
			}

			const status = await TripModel.update(
				{
					status: 'pending'
				},
				{ where: { user_id: req.params.driver_id } }
			);

			return res.status(200).json({
				status: 'success',
				message: 'Request sent successfully !',
				tripStatus: 'pending'
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

const get_requests = async (req, res, next) => {
	try {
		const passengers = await RequestModel.findAll({ where: { driver_id: req.user.id } });

		if (passengers.length == 0) {
			return res.json({
				message: 'No requests sent yet'
			});
		}
		console.log(passengers);

		const available_passengers = [];
		for (var i = 0; i < passengers.length; i++) {
			const details = await UserModel.findOne({ where: { id: passengers[i].passenger_id } });
			const appendDetails = {
				first_name: details.first_name,
				last_name: details.last_name,
				guc_id: details.guc_id,
				pick_up_location: passengers[i].pick_up_location
			};
			available_passengers.push(appendDetails);
		}
		if (available_passengers.length == 0) {
			return res.status(400).json({
				status: 'failure',
				message: 'Something went wrong !'
			});
		}
		return res.status(200).json({
			status: 'success',
			message: 'Available requests ...',
			available_passengers
		});
	} catch (error) {
		next(error);
	}
};

const delete_request = async (req, res, next) => {
	try {
		const deletedRequest = await RequestModel.destroy({
			where: {
				passenger_id: req.params.passenger_id
			}
		});
		if (!deletedRequest) {
			return res.status(400).json({
				status: 'failure',
				message: 'Cannot delete request !'
			});
		}
		return res.status(200).json({
			status: 'success',
			message: 'Request deleted successfully !'
		});
	} catch (error) {
		next(error);
		// return res.status(400).json({
		// 	status: 'failure',
		// 	message: 'Something went wrong !'
		// });
	}
};

module.exports = {
	add_request,
	get_requests,
	delete_request
};
