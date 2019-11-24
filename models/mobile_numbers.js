module.exports = (sequelize, type) => {
	return sequelize.define('mobile_numbers', {
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
};
