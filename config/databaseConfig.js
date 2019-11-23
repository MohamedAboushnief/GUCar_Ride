const Sequelize = require('sequelize');
const keys = require('./keys_development');
const sequelize = new Sequelize(keys.pgDB);

module.exports = sequelize;
