const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const http = require('http');

const sequelize = require('./src/utils/database');
const routes = require('./src/routes/routes');
const myLogger = require('./src/utils/logger');

const Cargo = require('./src/models/cargo');
const Funcionario = require('./src/models/funcionario');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(myLogger);

app.use('/', routes);

app.use((req, res, next) => res.status(404).json({ error: "This route does not exist." }));

Cargo.hasMany(Funcionario, {
  foreignKey: {
    name: 'cargoId',
    allowNull: false
  }
});

const port = process.env.PORT || 8080;
const server = http.createServer(app);

sequelize.sync()
  .then(() => {
    console.log("Listening on port:", port);
    server.listen(port);
  })
  .catch(err => {
    console.log(err)
    return -1;
  });