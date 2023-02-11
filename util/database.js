const Sequelize = require('sequelize');

const sequelize = new Sequelize('express', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
