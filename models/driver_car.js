const Sequelize = require('sequelize');
const sequelize = require('../config/databaseConfig');
const { Model } = Sequelize;

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
			validate: {
				min: 3,
				max: 10,
				notEmpty: true
			},
			allowNull: false
		},
		car_plate_number: {
			type: Sequelize.STRING,
			unique: true,
			validate: {
				min: 3,
				max: 10,
				notEmpty: true
			}
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
Car.belongsTo(user, { foreignKey: 'user_id', targetKey: 'id' });
module.exports = Car;
