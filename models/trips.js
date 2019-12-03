const Sequelize = require('sequelize');
const sequelize = require('../config/databaseConfig');
const { Model } = Sequelize;

const user = require('./users');
class Trip extends Model {}

Trip.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		pricing: {
			type: Sequelize.STRING,
			validate: {
				max: 100,
				notEmpty: true,
				allowNull: false
			}
		},
		guc_slot: {
			type: Sequelize.ENUM,
			values: ['1st slot', '2nd slot', '3rd slot', '4rth slot', '5th slot'],
			notEmpty: true,
			allowNull: false
		}
	},
	{
		sequelize,
		timestamps: false
	}
);

Trip.belongsTo(user, { foreignKey: 'user_id', targetKey: 'id' });
module.exports = Trip;
