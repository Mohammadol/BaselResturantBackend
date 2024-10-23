const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captainController');

// Create a new Captain
router.post('/', captainController.createCaptain);

// Get all Captains
router.get('/', captainController.getCaptains);

// Get Captain by ID
router.get('/:id', captainController.getCaptainById);

// Update Captain by ID
router.put('/:id', captainController.updateCaptain);

// Delete Captain by ID
router.delete('/:id', captainController.deleteCaptain);

module.exports = router;
