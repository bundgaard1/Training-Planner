// models/associations.js or models/index.js

const Plan = require('./Plan');
const Workout = require('./Workout');

Plan.hasMany(Workout, { foreignKey: 'planId' });
Workout.belongsTo(Plan, { foreignKey: 'planId' });