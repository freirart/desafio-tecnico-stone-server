const Funcionario = require('../models/funcionario');
const Cargo = require('../models/cargo');
const { Op } = require('sequelize');

exports.fetchEmployees = (req, res, next) => {
  const { pageNumber } = req.params;
  const limit = 20;
  const offset = pageNumber * limit;

  Funcionario.findAll({
      include: {
        model: Cargo,
        attributes: ['id', 'nome']
      },
      attributes: { exclude: ['createdAt', 'updatedAt', 'cargoId'] },
      limit,
      offset,
      order: [ ['id'] ]
    })
    .then(listaFuncionarios => res.status(200).json({ listaFuncionarios }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Couldn't bring any data." });
    });
}

exports.fetchSingleEmployee = (req, res, next) => {
  const { employeeId } = req.params;

  Funcionario.findByPk(employeeId, {
    include: {
      model: Cargo,
      attributes: ['id', 'nome']
    },
    attributes: { exclude: ['createdAt', 'updatedAt', 'cargoId'] },
  })
    .then(funcionario => res.status(200).json({ funcionario }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Couldn't bring any data." });
    });
}

exports.fetchEmployeesByFilter = (req, res, next) => {
  const { cargoId, filtroIdade, nome } = req.query;

  if (!cargoId && !filtroIdade && !nome) {
    return res.status(400).json({ error: "No filters applied!" });
  }

  let whereFilter = {};

  function getIdadeFilterByOption(option) {
    let retorno;
    switch(option) {
      case '1':
        retorno = { [Op.lt]: 20 };
        break;
      case '2':
        retorno = { [Op.between]: [20, 30] };
        break;
      case '3':
        retorno = { [Op.between]: [31, 40] };
        break;
      case '4':
        retorno = { [Op.gt]: 40 }
        break;
    }
    return retorno;
  }

  if (cargoId) whereFilter.cargoId = cargoId;
  if (filtroIdade) whereFilter.idade = getIdadeFilterByOption(filtroIdade);
  if (nome) whereFilter.nome = { [Op.iLike]: `${nome}%` };

  Funcionario.findAll({
    include: {
      model: Cargo,
      attributes: ['id', 'nome']
    },
    attributes: { exclude: ['createdAt', 'updatedAt', 'cargoId'] },
    where: whereFilter,
    order: [ ['id'] ]
   })
    .then(funcionarios => res.status(200).json({ funcionarios }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Couldn't bring any data." })
    });
}

exports.addEmployee = (req, res, next) => {
  const { nome, idade, cargoId } = req.body;

  Funcionario.create({ nome, idade, cargoId })
    .then(() => res.status(201).json({ message: 'Success!' }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Couldn't add employee." });
    });
}

exports.updateEmployee = (req, res, next) => {
  const { id, nome, idade, cargoId } = req.body;

  Funcionario.findByPk(id)
    .then(funcionario => {
      funcionario.nome = nome;
      funcionario.idade = idade;
      funcionario.cargoId = cargoId;
      return funcionario.save();
    })
    .then(() => res.status(200).json({ message: 'Success! Employee info updated.' }))
    .catch(err => {
      console.log(err);
      res.status(304).json({ error: "PUT request failed." });
    });
}

exports.deleteEmployee = (req, res, next) => {
  const { employeeId } = req.params;

  Funcionario.findByPk(employeeId)
    .then(funcionario => funcionario.destroy())
    .then(() => res.status(200).json({ message: 'Success! Employee removed from database.' }))
    .catch(err => {
      console.log(err);
      res.status(304).json({ error: "DELETE request failed." });
    });
}
