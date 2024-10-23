const RestaurantTable = require('../models/restaurantTable');
const Restaurant = require('../models/restaurant');
const { ValidationError } = require('sequelize');

// Helper function for manual input validation
const validateRestaurantTableInput = (data) => {
    const { number, color, chairs, used, carier, restaurantId } = data;

    let errors = [];

    if (!number || typeof number !== 'number') errors.push('Number is required and must be an integer.');
    if (!color || typeof color !== 'string') errors.push('Color is required and must be a string.');
    if (!chairs || typeof chairs !== 'number') errors.push('Chairs are required and must be an integer.');
    if (typeof used !== 'boolean') errors.push('Used is required and must be a boolean.');
    if (!carier || typeof carier !== 'number') errors.push('Carier is required and must be an integer.');
    if (!restaurantId || typeof restaurantId !== 'number') errors.push('Restaurant ID is required and must be an integer.');

    return errors.length > 0 ? errors : null;
};

// GET Restaurant Table by ID
const getRestaurantTableById = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurantTable = await RestaurantTable.findByPk(id, {
            include: Restaurant // Include associated restaurant
        });

        if (!restaurantTable) {
            return res.status(404).json({ status: 'error', message: 'Restaurant table not found' });
        }

        res.json({ status: 'success', data: restaurantTable });
    } catch (error) {
        console.error('Error retrieving restaurant table:', error);
        res.status(500).json({ status: 'error', message: 'Failed to retrieve restaurant table' });
    }
};

// CREATE Restaurant Table
const createRestaurantTable = async (req, res) => {
    const transaction = await RestaurantTable.sequelize.transaction();

    try {
        const { number, color, chairs, used, carier, restaurantId } = req.body;

        // Manual input validation
        const validationErrors = validateRestaurantTableInput(req.body);
        if (validationErrors) {
            return res.status(400).json({ status: 'error', message: validationErrors });
        }

        // Check if the restaurant exists
        const restaurant = await Restaurant.findByPk(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ status: 'error', message: 'Restaurant not found' });
        }

        const newTable = await RestaurantTable.create({ number, color, chairs, used, carier, restaurantId }, { transaction });

        await transaction.commit();
        res.status(201).json({ status: 'success', data: newTable });
    } catch (error) {
        await transaction.rollback();

        if (error instanceof ValidationError) {
            return res.status(400).json({ status: 'error', message: error.errors.map(e => e.message) });
        }

        console.error('Error creating restaurant table:', error);
        res.status(500).json({ status: 'error', message: 'Failed to create restaurant table' });
    }
};

// UPDATE Restaurant Table
const updateRestaurantTable = async (req, res) => {
    const transaction = await RestaurantTable.sequelize.transaction();

    try {
        const { id } = req.params;
        const { number, color, chairs, used, carier, restaurantId } = req.body;

        const restaurantTable = await RestaurantTable.findByPk(id);
        if (!restaurantTable) {
            return res.status(404).json({ status: 'error', message: 'Restaurant table not found' });
        }

        // If restaurantId is provided, check if the restaurant exists
        if (restaurantId) {
            const restaurant = await Restaurant.findByPk(restaurantId);
            if (!restaurant) {
                return res.status(404).json({ status: 'error', message: 'Restaurant not found' });
            }
        }

        // Update only the fields provided in the request
        restaurantTable.number = number !== undefined ? number : restaurantTable.number;
        restaurantTable.color = color !== undefined ? color : restaurantTable.color;
        restaurantTable.chairs = chairs !== undefined ? chairs : restaurantTable.chairs;
        restaurantTable.used = used !== undefined ? used : restaurantTable.used;
        restaurantTable.carier = carier !== undefined ? carier : restaurantTable.carier;
        restaurantTable.restaurantId = restaurantId !== undefined ? restaurantId : restaurantTable.restaurantId;

        await restaurantTable.save({ transaction });

        await transaction.commit();
        res.json({ status: 'success', message: 'Restaurant table updated successfully', data: restaurantTable });
    } catch (error) {
        await transaction.rollback();

        console.error('Error updating restaurant table:', error);
        res.status(500).json({ status: 'error', message: 'Failed to update restaurant table' });
    }
};

// GET all Restaurant Tables
const getRestaurants = async (req, res) => {
    try {
        const restaurantTables = await RestaurantTable.findAll({
            include: {
                model: Restaurant,
                attributes: ['id', 'name'] // Only include the 'id' and 'name' of the associated restaurant
            }
        });
        res.json({ status: 'success', data: restaurantTables });
    } catch (error) {
        console.error('Error fetching restaurant tables:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch restaurant tables' });
    }
};


// DELETE Restaurant Table
const deleteRestaurantTable = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurantTable = await RestaurantTable.findByPk(id);

        if (!restaurantTable) {
            return res.status(404).json({ status: 'error', message: 'Restaurant table not found' });
        }

        await restaurantTable.destroy();
        res.json({ status: 'success', message: 'Restaurant table deleted successfully' });
    } catch (error) {
        console.error('Error deleting restaurant table:', error);
        res.status(500).json({ status: 'error', message: 'Failed to delete restaurant table' });
    }
};

module.exports = {
    getRestaurantTableById,
    createRestaurantTable,
    deleteRestaurantTable,
    getRestaurants,
    updateRestaurantTable,
};
