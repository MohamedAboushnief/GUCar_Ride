const UserModel = require('../models/users');
const MobileModel = require('../models/mobile_numbers');
const CarModel = require('../models/drivers_cars');
const TripModel = require('../models/trips');
const Sequelize = require('sequelize');
const sequelize = require('../config/keys_development');
const trip = new TripModel(sequelize, Sequelize);
const Car = new CarModel(sequelize, Sequelize);
const Mobile = new MobileModel(sequelize, Sequelize);
const User = new UserModel(sequelize, Sequelize);
const jwt = require('jsonwebtoken');
var passport = require('passport');
const bcrypt = require('bcrypt');

const view_available_drivers = async (req, res, next) => {
	try {
		const user = await UserModel.findByPk(req.user.id);

		const drivers = await UserModel.findAll({
			where: {
				address: user.address
			}
		});
		var arrayOfTrips = [];

		for (i = 0; i < drivers.length; i++) {
			const trip = await TripModel.findOne({
				where: {
					user_id: drivers[i].id
				}
			});

			//if (trip.user_id != user.id) {
			const mobile_numbers = await MobileModel.findAll({
				where: {
					user_id: user.id
				}
			});

			if (trip) {
				if (trip.user_id != user.id) {
					const t = {
						trip,
						first_name: drivers[i].first_name,
						last_name: drivers[i].last_name,
						rating: drivers[i].rating,
						mobile_numbers
					};
					arrayOfTrips.push(t);
				}
			}
		}

		return res.status(200).json({
			arrayOfTrips,
			status: 'success',
			message: 'View available drivers is made successfully !'
		});
	} catch (error) {
		return res.status(400).json({
			status: 'failure',
			message: 'Something went wrong !'
		});
	}
};

const create_trip = async (req, res, next) => {
	try {
		const car = await CarModel.findOne({
			where: {
				user_id: req.user.id
			}
		});
		if (!car) {
			return res.status(409).json({
				status: 'Failure',
				message: 'You cant create a trip while not having a car!'
			});
		}

		const checkTrip = await TripModel.findOne({
			where: {
				user_id: req.user.id
			}
		});

		if (checkTrip) {
			return res.status(409).json({
				status: 'Failure',
				message: 'You already created a Trip!'
			});
		}

		const trip = await TripModel.create({
			user_id: req.user.id,
			pricing: req.body.pricing,
			guc_slot: req.body.guc_slot
		});

		if (!trip) {
			return res.status(400).json({
				status: 'Failure',
				message: 'Something went wrong, Your trip cannot be created !'
			});
		} else {
			return res.status(200).json({
				status: 'success',
				message: 'Trip created successfully !'
			});
		}
	} catch (error) {
		next(error);
	}
};

const delete_trip = async (req, res, next) => {
	try {
		const trip = await TripModel.findOne({
			where: {
				user_id: req.user.id
			}
		});

		if (!trip) {
			return res.status(400).json({
				status: 'Failure',
				message: 'Could not find trip !'
			});
		}

		const deletedTrip = await TripModel.destroy({
			where: {
				id: trip.id
			}
		});
		if (!deletedTrip) {
			return res.status(400).json({
				status: 'Failure',
				message: 'Cannot delete trip !'
			});
		}
		return res.status(200).json({
			status: 'success',
			message: 'Trip deleted successfully !'
		});
	} catch (error) {
		return res.status(400).json({
			status: 'Failure',
			message: 'Something went wrong !'
		});
	}
};

module.exports = {
	create_trip,
	delete_trip,
	view_available_drivers
};
