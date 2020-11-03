const Cargo = require('../models/cargo');

exports.fetchAll = (req, res, next) => {
  Cargo.findAll({ attributes: ['id', 'nome'] })
    .then(cargos => res.status(200).json({ cargos }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Couldn't bring data." });
    });
}

exports.createOne = (req, res, next) => {
  const { nome } = req.body;
  
  Cargo.create({ nome })
    .then(() => res.status(201).json({ message: 'Success!' }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Couldn't add new cargo." })
    });
}