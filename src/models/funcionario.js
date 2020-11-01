const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Funcionario = sequelize.define('funcionario', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  idade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Funcionario;