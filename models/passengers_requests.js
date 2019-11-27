const Sequelize = require('sequelize');
const sequelize = require('../config/databaseConfig');
const { Model } = Sequelize;

const user = require('./users');
class passenger_requests extends Model {}

passenger_requests.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		status: {
			type: Sequelize.ENUM,
			values: [ 'rejected', 'pending', 'on his way' ],
			allowNull: false,
			notEmpty: true
		}
	},
	{
		sequelize,
		timestamps: false
	}
);

passenger_requests.belongsTo(user, {
	foreignKey: 'passenger_id',
	foreignKeyConstraint: true,
	targetKey: 'id',
	onDelete: 'cascade',
	hooks: true,
	unique: true
});

module.exports = passenger_requests;
