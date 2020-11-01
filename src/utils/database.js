const pg = require('pg');
pg.defaults.ssl = true;

const { Sequelize } = require('sequelize');

const connectString = process.env.DATABASE_URL || process.env.DATABASE_URI;

const sequelize = new Sequelize(connectString, {
  dialect: "postgres", 
  ssl: true, 
  dialectOptions: {
    "ssl": {
      "require": true,
      rejectUnauthorized: false
    } 
  }
});

module.exports = sequelize;