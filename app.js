const express = require('express');

const sequelize = require('./src/utils/database');

const app = express();

let connectionResult;

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    connectionResult = true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    connectionResult = false;
  }
}

connect();

app.get('/', (req, res, next) => {
  console.log("Server Running!");
  res.json({ message: 'Hello, world!', bdConnection: connectionResult });
});

app.listen(process.env.PORT || 8080);