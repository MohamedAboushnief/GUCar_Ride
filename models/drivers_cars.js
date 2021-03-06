const Sequelize = require('sequelize');
const sequelize = require('../config/databaseConfig');
const { Model } = Sequelize;
const user = require('./users');

class Car extends Model {}

Car.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},

		car_model: {
			type: Sequelize.STRING,

			allowNull: false
		},
		car_plate_number: {
			type: Sequelize.STRING,
			unique: true
		},
		car_color: {
			type: Sequelize.STRING,
			validate: {
				min: 3,
				max: 12,
				notEmpty: true
			}
		}
	},
	{
		sequelize,
		timestamps: false
	}
);
Car.belongsTo(user, { foreignKey: 'user_id', targetKey: 'id', unique: true });
module.exports = Car;
