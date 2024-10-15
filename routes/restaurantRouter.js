const express = require('express');

const restaurantController = require('../controllers/restaurantController');

const router = express.Router();

router.get('/', restaurantController.getAllRestaurants, (err, req, res, next) => {
    if (err) {
        console.error('Error retrieving restaurants:', err);
        res.status(500).json({ error: 'Failed to retrieve restaurants' });
    }
});

router.get('/:id', restaurantController.getRestaurantById, (err, req, res, next) => {
    if (err) {
        console.error('Error retrieving restaurant:', err);
        if (err.name === 'Sequelize.NotFoundError') { // Handle specific error for not found
            res.status(404).json({ error: 'Restaurant not found' });
        } else {
            res.status(500).json({ error: 'Failed to retrieve restaurant' });
        }
    }
});

router.post('/', restaurantController.createRestaurant, (err, req, res, next) => {
    if (err) {
        console.error('Error creating restaurant:', err);
        res.status(500).json({ error: 'Failed to create restaurant' });
    }
});

router.put('/:id', restaurantController.updateRestaurant, (err, req, res, next) => {
    if (err) {
        console.error('Error updating restaurant:', err);
        if (err.name === 'Sequelize.NotFoundError') { // Handle specific error for not found
            res.status(404).json({ error: 'Restaurant not found' });
        } else {
            res.status(500).json({ error: 'Failed to update restaurant' });
        }
    }
});

router.delete('/:id', restaurantController.deleteRestaurant, (err, req, res, next) => {
    if (err) {
        console.error('Error deleting restaurant:', err);
        if (err.name === 'Sequelize.ForeignKeyConstraintError') { // Handle specific error for foreign key constraints
            res.status(409).json({ error: 'Restaurant cannot be deleted due to dependencies' });
        } else {
            res.status(500).json({ error: 'Failed to delete restaurant' });
        }
    }
});

module.exports = router;