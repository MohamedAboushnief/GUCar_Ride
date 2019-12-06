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
				max: 100
			}
		},
		guc_slot: {
			type: Sequelize.ENUM,
			values: [ 'First', 'Second', 'Third', 'Fourth', 'Fifth' ]
		}
	},
	{
		sequelize,
		timestamps: false
	}
);

Trip.belongsTo(user, { foreignKey: 'user_id', targetKey: 'id' });
module.exports = Trip;
