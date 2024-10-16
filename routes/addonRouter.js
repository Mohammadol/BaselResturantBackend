const express = require('express');
const addonController = require('../controllers/addonController');

const router = express.Router();

router.get('/', addonController.getAllAddons);
router.get('/:id', addonController.getAddonById);
router.post('/', addonController.createAddon);
router.put('/:id', addonController.updateAddon);
router.delete('/:id', addonController.deleteAddon);

module.exports = router;