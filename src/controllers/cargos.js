const Cargo = require('../models/cargo');

const logger = require('../utils/logger');

exports.fetchAll = (req, res, next) => {
  Cargo.findAll({ attributes: ['id', 'nome'] })
    .then(cargos => res.status(200).json({ cargos }))
    .catch(err => {
      logger.error(err);
      res.status(500).json({ error: "Couldn't bring data." });
    });
}

exports.createOne = (req, res, next) => {
  const { nome } = req.body;
  
  Cargo.create({ nome })
    .then(() => res.status(201).json({ message: 'Success!' }))
    .catch(err => {
      logger.error(err);
      res.status(500).json({ error: "Couldn't add new cargo." })
    });
}

exports.deleteById = (req, res, next) => {
  const { id } = req.params;

  Cargo.findByPk(id)
    .then(cargo => cargo.destroy())
    .then(() => res.status(201).json({ message: 'Success! Cargo removed from database.' }))
    .catch(err => {
      logger.error(err);
      res.status(500).json({ error: 'DELETE request failed.' });
    });
}