// database.js
const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false, 
});



export default db;