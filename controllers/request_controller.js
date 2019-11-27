const UserModel = require('../models/users');
const RequestModel = require('../models/requests');
const CarDriverModel = require('../models/drivers_cars');
const Sequelize = require('sequelize');
const sequelize = require('../config/keys_development');
const TripModel = require('../models/trips');
const pass_req = require('../models/passengers_requests');
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
				passenger_id: req.params.passenger_id,
				driver_id: req.user.id
			}
		});
		if (!deletedRequest) {
			return res.status(400).json({
				status: 'failure',
				message: 'Cannot delete request !'
			});
		}
		const status = await pass_req.update(
			{
				status: 'rejected'
			},
			{ where: { passenger_id: req.params.passenger_id } }
		);
		return res.status(200).json({
			status: 'success',
			message: 'Request deleted successfully !',
			requestStatus: 'rejected'
		});
	} catch (error) {
		next(error);
		// return res.status(400).json({
		// 	status: 'failure',
		// 	message: 'Something went wrong !'
		// });
	}
};

const delete_all_requests = async (req, res, next) => {
	try {
		const deletedRequest = await RequestModel.destroy({
			where: {
				driver_id: req.user.id
			}
		});
		if (!deletedRequest) {
			return res.status(400).json({
				status: 'failure',
				message: 'Cannot delete all requests !'
			});
		}

		return res.status(200).json({
			status: 'success',
			message: 'Requests deleted successfully !'
		});
	} catch (error) {
		next(error);
	}
};

const accept_request = async (req, res, next) => {
	try {
		const checkDriver = await RequestModel.findOne({
			where: {
				passenger_id: req.params.passenger_id,
				driver_id: req.user.id
			}
		});
		if (!checkDriver) {
			return res.status(400).json({
				status: 'failure',
				message: 'Something went wrong !'
			});
		}
		const request = await pass_req.findOne({
			where: {
				passenger_id: req.params.passenger_id
			}
		});
		if (!request) {
			return res.status(400).json({
				status: 'failure',
				message: 'Cannot accept request !'
			});
		}
		const status = await pass_req.update(
			{
				status: 'on his way'
			},
			{ where: { passenger_id: req.params.passenger_id } }
		);
		return res.status(200).json({
			status: 'success',
			message: 'Request accepted successfully !',
			requestStatus: 'accepted'
		});
	} catch (error) {
		next(error);
	}
};

const arrived_to_pickUp = async (req, res, next) => {
	try {
		const checkDriver = await RequestModel.findOne({
			where: {
				passenger_id: req.params.passenger_id,
				driver_id: req.user.id
			}
		});
		if (!checkDriver) {
			return res.status(400).json({
				status: 'failure',
				message: 'Something went wrong !'
			});
		}
		const request = await pass_req.findOne({
			where: {
				passenger_id: req.params.passenger_id
			}
		});
		if (!request) {
			return res.status(400).json({
				status: 'failure',
				message: 'Cannot accept request !'
			});
		}
		const status = await pass_req.update(
			{
				status: 'arrived to pickup location'
			},
			{ where: { passenger_id: req.params.passenger_id } }
		);
		return res.status(200).json({
			status: 'success',
			message: 'Notification to passenger sent successfully !',
			requestStatus: 'arrived to pickup location'
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	add_request,
	get_requests,
	delete_request,
	accept_request,
	arrived_to_pickUp,
	delete_all_requests
};
