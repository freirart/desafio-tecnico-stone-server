const { format, transports } = require('winston');
const { combine, colorize, json, printf, timestamp } = format;
const expressWinston = require('express-winston');
const path = require('path');

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const myLogger = name => expressWinston.logger({
  format: combine (
    json(),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console({
      json: true,
      colorize: true,
      level: 'info',
      format: colorize(),
    }),
    // new transports.File({
    //   filename: path.resolve('..', '..', 'logs', name),
    //   level: 'debug',
    //   maxsize: 5242880,
    //   maxFiles: 10,
    // }),
    // new transports.MongoDB({
    //   db: process.env.MONGODB,
    //   collection: 'logger',
    //   options: { useUnifiedTopology: true },
    //   level: 'debug',
    // }),
  ],
});

module.exports = myLogger;

