const Sequelize = require("sequelize");
const sequelize = require("../config/databaseConfig");
const { Model } = Sequelize;

const user = require("./users");
class Requests extends Model {}

Requests.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    sequelize,
    timestamps: false
  }
);

Requests.belongsTo(user, {
  foreignKey: "passenger_id",
  foreignKeyConstraint: true,
  targetKey: "id",
  onDelete: "cascade",
  hooks: true
});

Requests.belongsTo(user, {
  foreignKey: "driver_id",
  foreignKeyConstraint: true,
  targetKey: "id",
  onDelete: "cascade",
  hooks: true
});
module.exports = Requests;
