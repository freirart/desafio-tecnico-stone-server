const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Cargo = sequelize.define('cargo', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
  },
});

module.exports = Cargo;