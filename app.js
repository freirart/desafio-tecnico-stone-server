const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  console.log("Server Running!");
  res.json({message: 'Hello, world!'});
});

app.listen(process.env.PORT || 8080);