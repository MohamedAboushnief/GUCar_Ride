const Sequelize = require('sequelize');

const sequelize = require('../config/databaseConfig');

const { Model } = Sequelize;

class User extends Model {}

User.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		first_name: {
			validate: {
				max: 30,
				min: 2,
				notEmpty: true
			},
			type: Sequelize.STRING,
			allowNull: false
		},
		last_name: {
			validate: {
				max: 30,
				min: 2,
				notEmpty: true
			},
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			validate: {
				isEmail: true,
				max: 50,
				notEmpty: true
			},
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		password: {
			validate: {
				min: 4
			},
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		guc_id: {
			validate: {
				notEmpty: true
			},
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		date_of_birth: {
			validate: {
				notEmpty: true
			},
			type: Sequelize.DATE,
			allowNull: false
		},
		gender: {
			type: Sequelize.ENUM,
			values: [ 'male', 'female' ]
		},
		address: {
			type: Sequelize.STRING
		},
		rating: {
			type: Sequelize.FLOAT
		},
		push_token: {
			type: Sequelize.STRING
		}
	},
	{
		sequelize,
		timestamps: false
	}
);

module.exports = User;
