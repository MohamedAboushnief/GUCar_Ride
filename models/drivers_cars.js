const Sequelize = require("sequelize");
const sequelize = require("../config/databaseConfig");
const { Model } = Sequelize;

class Car extends Model {}

Car.init(
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
    },
    pricing: {
      type: Sequelize.FLOAT,
      validate: {
        max: 100,
        notEmpty: true
      }
    }
  },
  {
    sequelize,
    timestamps: false
  }
);

module.exports = Car;
