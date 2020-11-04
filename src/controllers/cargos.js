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

exports.deleteById = (req, res, next) => {
  const { idCargo } = req.params;

  Cargo.findByPk(idCargo)
    .then(cargo => cargo.destroy())
    .then(() => res.status(200).json({ message: 'Success! Cargo removed from database.' }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'DELETE request failed.' });
    });
}

exports.updateCargo = (req, res, next) => {
  const { id, nome } = req.body;
  
  Cargo.findByPk(id)
    .then(cargo => {
      cargo.nome = nome;
      return cargo.save();
    })
    .then(() => res.status(200).json({ message: 'Success! Cargo updated.' }))
    .catch(err => {
      console.log(err);
      res.status(304).json({ error: "PUT request failed." });
    });
}
