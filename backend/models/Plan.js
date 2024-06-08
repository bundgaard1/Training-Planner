
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Plan extends Model {}

Plan.init({
  name: DataTypes.STRING,
  weeks: DataTypes.INTEGER,
  date: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'plans'
});


module.exports = Plan;