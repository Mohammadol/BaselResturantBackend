const express = require('express');
const { body, validationResult, param } = require('express-validator');
const { getRestaurantTableById, createRestaurantTable, deleteRestaurantTable, getRestaurants, updateRestaurantTable } = require('../controllers/restaurantTableController'); // Import functions

const router = express.Router();

// Routes with imported controller functions
router.get('/:id', [
  param('id').isInt().notEmpty(), // Validate ID parameter
], getRestaurantTableById);

router.get('/', getRestaurants);
router.put('/:id', [
  param('id').isInt().notEmpty(), // Validate ID parameter
], updateRestaurantTable);

router.delete('/:id', [
  param('id').isInt().notEmpty(), // Validate ID parameter
], deleteRestaurantTable);

router.post('/', [
  body('number').isInt().notEmpty(),
  body('color').isString().notEmpty(),
  body('chairs').isInt().notEmpty(),
  body('used').isBoolean().notEmpty(),
  body('carier').isInt().notEmpty(),
  body('restaurant').isInt().notEmpty()
], createRestaurantTable);

module.exports = router;