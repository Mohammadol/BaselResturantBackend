const Restaurant = require('../models/restaurant');

const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve restaurants' });
    }
};

const getAllDeletedRestaurants = async (req, res) => {
    try {
        const deletedRestaurants = await Restaurant.findAll({
            where: {
                isDeleted: true
            }
        });
        res.json(deletedRestaurants);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve deleted restaurants' });
    }
};

const getAllActiveRestaurants = async (req, res) => {
    try {
        const activeRestaurants = await Restaurant.findAll({
            where: {
                isDeleted: false
            }
        });
        res.status(200).json(activeRestaurants);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve active restaurants' });
    }
};

const getRestaurantById = async (req, res) => {
    try {
        const id = req.params.id;
        const restaurant = await Restaurant.findByPk(id);

        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve restaurant' });
    }
};

const createRestaurant = async (req, res) => {
    try {
        const { name, notes } = req.body;

        // Validate input data (you can add more validation as needed)
        if (!name || !notes || !isUsed) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newRestaurant = await Restaurant.create({ name, address, isUsed });

        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create restaurant' });
    }
};

const updateRestaurant = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, address } = req.body;

        const restaurant = await Restaurant.findByPk(id);

        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        restaurant.name = name || restaurant.name;
        restaurant.notes = notes || restaurant.notes;

        await restaurant.save();

        res.json({ message: 'Restaurant updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update restaurant' });
    }
};

const deleteRestaurant = async (req, res) => {
    try {
        const id = req.params.id;
        const restaurant = await Restaurant.findByPk(id);

        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        await restaurant.destroy();
        res.json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete restaurant' });
    }
};
const softDeleteRestaurant = async (req, res) => {
    try {
        const id = req.params.id;
        const restaurant = await Restaurant.findByPk(id);

        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        // Update the isDeleted flag to true
        restaurant.isDeleted = true;
        await restaurant.save();

        res.json({ message: 'Restaurant marked as deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete restaurant' });
    }
};

module.exports = {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getAllActiveRestaurants,
    getAllDeletedRestaurants,
    softDeleteRestaurant
};