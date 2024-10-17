const express = require('express');
const router = express.Router();
const departmentsController = require('../controllers/departmentController');

// Define routes using the controller functions
router.get('/', departmentsController.getAllDepartments);
router.get('/:id', departmentsController.getDepartmentById);
router.post('/', departmentsController.createDepartment);
router.put('/:id', departmentsController.updateDepartment);
router.delete('/:id', departmentsController.deleteDepartment);

module.exports = router;