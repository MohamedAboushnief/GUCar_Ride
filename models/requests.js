const Sequelize = require('sequelize');
const sequelize = require('../config/databaseConfig');
const { Model } = Sequelize;

const user = require('./users');
class Requests extends Model {}

Requests.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		pick_up_location: {
			type: Sequelize.STRING,
			allowNull: false
		}
	},
	{
		sequelize,
		timestamps: false
	}
);

Requests.belongsTo(user, {
	foreignKey: 'passenger_id',
	foreignKeyConstraint: true,
	targetKey: 'id',
	onDelete: 'cascade',
	hooks: true,
	unique: true,
	allowNull: false
});

Requests.belongsTo(user, {
	foreignKey: 'driver_id',
	foreignKeyConstraint: true,
	targetKey: 'id',
	onDelete: 'cascade',
	hooks: true,
	allowNull: false
});
module.exports = Requests;
