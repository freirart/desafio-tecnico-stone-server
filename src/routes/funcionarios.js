const express = require('express');

const router = express.Router();

const funcControllers = require('../controllers/funcionarios');

router.get('/page/:pageNumber', funcControllers.fetchEmployees);
router.get('/:employeeId', funcControllers.fetchSingleEmployee);
router.get('/', funcControllers.fetchEmployeesByFilter);

router.post('/', funcControllers.addEmployee);
router.put('/edit', funcControllers.updateEmployee);
router.delete('/delete/:employeeId', funcControllers.deleteEmployee);

module.exports = router;

