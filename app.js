const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.json({ message: 'Hello, world!' });
});

app.listen(8080);