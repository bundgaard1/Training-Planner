
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');
const Plan = require('./Plan');

class Workout extends Model {}

Workout.init({
  workoutType: DataTypes.ENUM('Rest', 'GeneralAerobic', 'Workout', 'LongRun', 'Race'),
  distance: DataTypes.INTEGER,
  description: DataTypes.STRING,

  isCompleted: DataTypes.BOOLEAN,
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