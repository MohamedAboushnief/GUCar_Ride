const Sequelize = require("sequelize");
const sequelize = require("../config/databaseConfig");
const { Model } = Sequelize;

const user = require("./users");
class Mobile_number extends Model {}

Mobile_number.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    mobile_number: {
      type: Sequelize.STRING,
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

Mobile_number.belongsTo(user, { foreignKey: "user_id", targetKey: "id" });
module.exports = Mobile_number;
