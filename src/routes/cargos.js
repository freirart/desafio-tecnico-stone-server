const express = require('express');

const router = express.Router();

const cargoControllers = require('../controllers/cargos.js');

router.get('/', cargoControllers.fetchAll);
router.post('/', cargoControllers.createOne);
router.delete('/delete/:idCargo', cargoControllers.deleteById);

module.exports = router;
