// models/associations.js or models/index.js
import Plan from './plans.model';
import Workout from './workouts.model';

Plan.hasMany(Workout, { foreignKey: 'planId' });
Workout.belongsTo(Plan, { foreignKey: 'planId' });