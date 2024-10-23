const Captain = require('../models/captain');

// CREATE Captain
const createCaptain = async (req, res) => {
    try {
        const { name, appearanceNumber, used, restaurantId } = req.body;

        // Basic validation
        if (!name || !appearanceNumber || used === undefined || !restaurantId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create a new Captain
        const newCaptain = await Captain.create({ name, appearanceNumber, used, restaurantId });
        res.status(201).json(newCaptain);
    } catch (error) {
        console.error('Error creating captain:', error);
        res.status(500).json({ error: 'Failed to create captain' });
    }
};

// GET Captain by ID
const getCaptainById = async (req, res) => {
    try {
        const id = req.params.id;
        const captain = await Captain.findByPk(id);

        if (!captain) {
            return res.status(404).json({ error: 'Captain not found' });
        }

        res.json(captain);
    } catch (error) {
        console.error('Error retrieving captain:', error);
        res.status(500).json({ error: 'Failed to retrieve captain' });
    }
};

// GET all Captains
const getCaptains = async (req, res) => {
    try {
        const captains = await Captain.findAll({
            include: { model: Restaurant, attributes: ['id', 'name'] }
        });
        res.json(captains);
    } catch (error) {
        console.error('Error fetching captains:', error);
        res.status(500).json({ error: 'Failed to fetch captains' });
    }
};

// UPDATE Captain by ID
const updateCaptain = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, appearanceNumber, used, restaurantId } = req.body;

        // Find the Captain by ID
        const captain = await Captain.findByPk(id);

        if (!captain) {
            return res.status(404).json({ error: 'Captain not found' });
        }

        // Update fields if provided
        captain.name = name || captain.name;
        captain.appearanceNumber = appearanceNumber || captain.appearanceNumber;
        captain.used = used !== undefined ? used : captain.used;
        captain.restaurantId = restaurantId || captain.restaurantId;

        await captain.save();
        res.json({ message: 'Captain updated successfully', captain });
    } catch (error) {
        console.error('Error updating captain:', error);
        res.status(500).json({ error: 'Failed to update captain' });
    }
};

// DELETE Captain by ID
const deleteCaptain = async (req, res) => {
    try {
        const id = req.params.id;

        // Find the Captain by ID
        const captain = await Captain.findByPk(id);

        if (!captain) {
            return res.status(404).json({ error: 'Captain not found' });
        }

        await captain.destroy();
        res.json({ message: 'Captain deleted successfully' });
    } catch (error) {
        console.error('Error deleting captain:', error);
        res.status(500).json({ error: 'Failed to delete captain' });
    }
};

module.exports = {
    createCaptain,
    getCaptainById,
    getCaptains,
    updateCaptain,
    deleteCaptain,
};
