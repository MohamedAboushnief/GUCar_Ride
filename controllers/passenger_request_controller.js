const UserModel = require('../models/users');
const MobileModel = require('../models/mobile_numbers');
const CarModel = require('../models/drivers_cars');
const TripModel = require('../models/trips');
const PassengerRequestModel = require('../models/passengers_requests');
const Sequelize = require('sequelize');
const sequelize = require('../config/keys_development');
const trip = new TripModel(sequelize, Sequelize);
const Car = new CarModel(sequelize, Sequelize);
const Mobile = new MobileModel(sequelize, Sequelize);
const User = new UserModel(sequelize, Sequelize);
const Passenger = new PassengerRequestModel(sequelize, Sequelize);

const jwt = require('jsonwebtoken');
var passport = require('passport');
const bcryptjs = require('bcryptjs');

const create_requests = async (req, res, next) => {
	try {
		const checkTrip = await TripModel.findOne({ where: { user_id: req.user.id } });
		if (checkTrip) {
			return res.status(400).json({
				status: 'failure',
				message: 'You cannot request a driver while you have a trip !'
			});
		}

		const checkDriverTrip = await TripModel.findOne({ where: { user_id: req.params.driver_id } });

		if (!checkDriverTrip) {
			return res.status(400).json({
				status: 'failure',
				message: 'Trip is not available anymore !'
			});
		}

		const checkExist = await PassengerRequestModel.findAll({ where: { passenger_id: req.user.id } });
		var exist = false;
		if (checkExist) {
			for (i = 0; i < checkExist.length; i++) {
				if (checkExist[i].status !== 'rejected') {
					exist = true;
				}
			}
		}
		if (exist) {
			return res.status(409).json({
				status: 'failure',
				message: 'You have already requested a driver !'
			});
		}

		const newRequest = await PassengerRequestModel.create({
			passenger_id: req.user.id,
			driver_id: req.params.driver_id,
			status: 'pending'
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
			newRequest
		});
	} catch (error) {
		next(error);
	}
};

const delete_all_request = async (req, res, next) => {
	try {
		const deletedRequest = await PassengerRequestModel.destroy({
			where: {
				driver_id: req.user.id
			}
		});
		if (!deletedRequest) {
			return res.status(400).json({
				status: 'failure',
				message: 'Cannot delete requests !'
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

const delete_request = async (req, res, next) => {
	try {
		const request = await PassengerRequestModel.findOne({ where: { passenger_id: req.user.id } });
		if (!request) {
			return res.status(400).json({
				status: 'failure',
				message: 'No requests to delete!'
			});
		}

		const deletedRequest = await PassengerRequestModel.destroy({
			where: {
				passenger_id: req.user.id
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
	}
};

const view_request = async (req, res, next) => {
	try {
		const request = await PassengerRequestModel.findOne({
			where: { passenger_id: req.user.id }
		});

		if (!request || request == null) {
			return res.status(200).json({
				status: 'Success',
				message: 'No request found !'
			});
		}
		const driver = await UserModel.findByPk(req.params.driver_id);
		if (!driver || driver == null) {
			return res.status(409).json({
				status: 'Failure',
				message: 'No driver found !'
			});
		}

		return res.status(200).json({
			request,
			driverName: driver.first_name,
			driverLastname: driver.last_name,
			driverMobileNumber: driver.mobile_number,
			status: 'Success',
			message: 'request retrieved successfully !'
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	create_requests,
	delete_request,
	view_request,
	delete_all_request
};
