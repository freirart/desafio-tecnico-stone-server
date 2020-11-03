const express = require('express');

const router = express.Router();

const funcControllers = require('../controllers/funcionarios');
const cargoControllers = require('../controllers/cargos.js');

router.get('/employee/page/:pageNumber', funcControllers.fetchEmployees);
router.get('/employee/:employeeId', funcControllers.fetchSingleEmployee);
router.get('/employee', funcControllers.fetchEmployeesByFilter);
router.get('/cargos', cargoControllers.fetchAll);

router.post('/cargos', cargoControllers.createOne);
router.post('/employee', funcControllers.addEmployee);
router.put('/employee/edit/:employeeId', funcControllers.updateEmployee);
router.delete('/employee/delete/:employeeId', funcControllers.deleteEmployee);

module.exports = router;

