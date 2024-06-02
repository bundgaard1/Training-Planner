
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');
const Plan = require('./Plan');

class Workout extends Model {}

Workout.init({
  workoutType: DataTypes.ENUM('Rest', 'GenAerobic', 'Workout'),
  distance: DataTypes.INTEGER,
  description: DataTypes.STRING,
  day: DataTypes.INTEGER,
  planId: {
    type: DataTypes.INTEGER,
    references: {
      model: Plan,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'workouts'
});


module.exports = Workout;