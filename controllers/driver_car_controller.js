const UserModel = require('../models/users');
const CarDriverModel = require('../models/drivers_cars');
const Sequelize = require('sequelize');
const sequelize = require('../config/keys_development');
const User = new UserModel(sequelize, Sequelize);
var passport = require('passport');

const add_user_car_details = async (req, res, next) => {
	try {
		const driver = await CarDriverModel.findOne({
			where: { user_id: req.user.id }
		});
		if (driver) {
			return res.status(400).json({
				status: 'failure',
				message: 'You could not have more than one car'
			});
		}
		console.log(req.body.car_model + req.body.car_plate_number + req.body.car_color + req.user.id);

		const car_details = await CarDriverModel.create({
			car_model: req.body.car_model,
			car_plate_number: req.body.car_plate_number,
			car_color: req.body.car_color,
			user_id: req.user.id
		});

		console.log('CHEEHSHSHSHHHS');
		if (!car_details) {
			return res.status(400).json({
				status: 'failure',
				message: 'Could not add car details !'
			});
		}
		return res.status(200).json({
			status: 'success',
			message: 'Car details added successfully !'
		});
	} catch (err) {
		next(err);
		// return res.status(400).json({
		// 	status: 'failure',
		// 	message: 'Something went wrong !'
		// });
	}
};

module.exports = {
	add_user_car_details
};
