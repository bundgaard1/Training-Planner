// models/associations.js or models/index.js
import Plan from './Plan';
import Workout from './Workout';

Plan.hasMany(Workout, { foreignKey: 'planId' });
Workout.belongsTo(Plan, { foreignKey: 'planId' });