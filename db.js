const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    host: 'database.sqlite',
    dialect: 'sqlite',
  });

module.exports = sequelize;