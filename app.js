const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./src/utils/database');
const routes = require('./src/routes/routes');

const Cargo = require('./src/models/cargo');
const Funcionario = require('./src/models/funcionario');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

Cargo.hasMany(Funcionario, {
  foreignKey: {
    name: 'cargoId',
    allowNull: false
  }
});

sequelize.sync()
  .then(() => app.listen(process.env.PORT || 8080))
  .catch(err => {
    console.log(err)
    return -1;
  });