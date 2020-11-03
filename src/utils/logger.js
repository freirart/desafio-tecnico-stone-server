const { format, transports } = require('winston');
const { combine, json, timestamp, colorize } = format;
const expressWinston = require('express-winston');
require('winston-mongodb');

const path = require('path');

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

const db = process.env.MONGODB_URL || process.env.MONGODB;

const myLogger = expressWinston.logger({
  format: combine(
    json(),
    colorize(),
    timestamp(),
  ),
  transports: [
    new transports.Console({level: 'info'}),
    new transports.File({
      filename: path.resolve('logs', 'desafio-tecnico-stone-logs.json'),
      level: 'debug',
      maxsize: 5242880,
      maxFiles: 10,
    }),
    new transports.MongoDB({
      db,
      collection: 'logdb',
      level: 'debug',
      format: combine(timestamp(), json())
    }),
  ],
  colorize: false,
});

module.exports = myLogger;

