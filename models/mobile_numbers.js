const Sequelize = require('sequelize');
const sequelize = require('../config/databaseConfig');
const { Model } = Sequelize;

class Mobile_number extends Model {}

Mobile_number.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: Sequelize.INTEGER,
			unique: true,
			allowNull: false
		},
		mobile_number: {
			type: Sequelize.ARRAY(Sequelize.STRING),
			unique: true,
			validate: {
				notEmpty: true
			},
			allowNull: false
		}
	},
	{
		sequelize,
		timestamps: false
	}
);
module.exports = Mobile_number;
