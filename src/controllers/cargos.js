const Cargo = require('../models/cargo');

exports.fetchAll = (req, res, next) => {
  Cargo.findAll()
    .then(cargos => res.status(200).json(cargos))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Couldn't bring data." });
    });
}

exports.create = (req, res, next) => {
  const { nome } = req.body;
  
  Cargo.create({ nome: nome })
    .then(() => res.status(201).json({ message: 'Success!' }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Couldn't add new cargo.", nome })
    });
}