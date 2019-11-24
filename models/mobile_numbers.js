const Sequelize = require('sequelize');
const sequelize = require('../config/databaseConfig');
const { Model } = Sequelize;

class Mobile_number extends Model {}

Mobile_number.init({
	id: {
		type: type.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	user_id: {
		type: type.INTEGER,
		unique: true,
		allowNull: false
	},
	mobile_number: {
		type: type.INTEGER,
		unique: true,
		validate: {
			max: 11,
			notEmpty: true,
			isNumeric: true
		},
		allowNull: false
	}
});
