const Addon = require('../models/addon');
const Group = require('../models/group');

const getAllAddons = async (req, res) => {
    try {
        // Find all Addons and include related Restaurants' id and name
        const addons = await Addon.findAll({
            include: {
                model: Restaurant,
                attributes: ['id', 'name'], // Only include the restaurant's id and name
                through: { attributes: [] }  // Hide the join table details
            }
        });

        res.json(addons);
    } catch (error) {
        console.error('Error fetching addons:', error);
        res.status(500).json({ error: 'Failed to retrieve addons' });
    }
};

module.exports = {
    getAllAddons,
    // other controller methods...
};

const getAddonById = async (req, res) => {
    try {
        const id = req.params.id;
        const addon = await Addon.findByPk(id, {
            include: { model: Group, as: 'group' } // Include associated group
        });

        if (!addon) {
            return res.status(404).json({ error: 'Addon not found' });
        }

        res.json(addon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve addon' });
    }
};

const createAddon = async (req, res) => {
    try {
        const { name_ar, name_en, price, appearanceNumber, restaurantIds } = req.body;

        // Validate input data (ensure restaurantIds is an array of restaurant IDs)
        if (!name_ar || !name_en || !price || !appearanceNumber || !restaurantIds || !Array.isArray(restaurantIds)) {
            return res.status(400).json({ error: 'Missing required fields or invalid restaurantIds' });
        }

        // Create the new addon
        const newAddon = await Addon.create({ 
            name_ar, 
            name_en, 
            price, 
            appearanceNumber 
        });

        // Associate the addon with the restaurants by their IDs
        const restaurants = await Restaurant.findAll({ where: { id: restaurantIds } });
        if (restaurants.length !== restaurantIds.length) {
            return res.status(404).json({ error: 'One or more restaurants not found' });
        }

        await newAddon.setRestaurants(restaurants);

        // Fetch the addon with the associated restaurants
        const addonWithRestaurants = await Addon.findByPk(newAddon.id, {
            include: Restaurant
        });

        res.status(201).json(addonWithRestaurants);
    } catch (error) {
        console.error('Error creating addon:', error);
        res.status(500).json({ error: 'Failed to create addon' });
    }
};

module.exports = {
    createAddon,
    // other controller methods...
};

const updateAddon = async (req, res) => {
    try {
        const id = req.params.id;
        const { name_ar, name_en, price, appearanceNumber, restaurantIds } = req.body;

        // Find the addon by ID
        const addon = await Addon.findByPk(id);

        if (!addon) {
            return res.status(404).json({ error: 'Addon not found' });
        }

        // Update the addon fields if provided
        if (name_ar !== undefined) addon.name_ar = name_ar;
        if (name_en !== undefined) addon.name_en = name_en;
        if (price !== undefined) addon.price = price;
        if (appearanceNumber !== undefined) addon.appearanceNumber = appearanceNumber;

        // If restaurantIds are provided, update the associations
        if (restaurantIds && restaurantIds.length > 0) {
            const restaurants = await Restaurant.findAll({ where: { id: restaurantIds } });

            if (restaurants.length !== restaurantIds.length) {
                return res.status(400).json({ error: 'Some restaurants not found' });
            }

            // Set the new restaurants associated with the addon (this will replace the old associations)
            await addon.setRestaurants(restaurants);
        }

        // Save the updated addon
        await addon.save();

        res.json({ message: 'Addon updated successfully', addon });
    } catch (error) {
        console.error('Error updating addon:', error);
        res.status(500).json({ error: 'Failed to update addon' });
    }
};

const deleteAddon = async (req, res) => {
    try {
        const id = req.params.id;
        const addon = await Addon.findByPk(id);

        if (!addon) {
            return res.status(404).json({ error: 'Addon not found' });
        }

        await addon.destroy();
        res.json({ message: 'Addon deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete addon' });
    }
};

module.exports = {
    getAllAddons,
    getAddonById,
    createAddon,
    updateAddon,
    deleteAddon
};
