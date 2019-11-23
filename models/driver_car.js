module.exports = (sequelize, type) => {
	return sequelize.define('driver_car', {
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
		car_model: {
			type: type.STRING,
			validate: {
				min: 3,
				max: 10,
				notEmpty: true
			},
			allowNull: false
		},
		car_plate_number: {
			type: type.STRING,
			unique: true,
			validate: {
				min: 3,
				max: 10,
				notEmpty: true
			}
		},
		car_color: {
			type: type.STRING,
			validate: {
				min: 3,
				max: 12,
				notEmpty: true
			}
		},
		pricing: {
			type: type.FLOAT,
			validate: {
				max: 100,
				notEmpty: true
			}
		}
	});
};
