const Addon = require('../models/addon');
const Group = require('../models/group');

// CREATE a new Addon and associate it with Groups
const createAddon = async (req, res) => {
    try {
        const { name_ar, name_en, price, appearanceNumber, groupIds } = req.body;

        // Create the Addon
        const newAddon = await Addon.create({
            name_ar,
            name_en,
            price,
            appearanceNumber
        });

        // If groupIds are provided, associate the Addon with the Groups
        if (groupIds && groupIds.length > 0) {
            const groups = await Group.findAll({ where: { id: groupIds } });

            if (groups.length !== groupIds.length) {
                return res.status(400).json({ error: 'Some groups not found' });
            }

            // Associate groups with the addon
            await newAddon.addGroups(groups);
        }

        res.status(201).json(newAddon);
    } catch (error) {
        console.error('Error creating addon:', error);
        res.status(500).json({ error: 'Failed to create addon' });
    }
};

// GET all Addons with their associated Groups
const getAllAddons = async (req, res) => {
    try {
        const addons = await Addon.findAll({
            include: [{
                model: Group,
                through: { attributes: [] }, // Don't include the join table attributes
                attributes: ['id', 'name_ar', 'name_en']
            }]
        });

        res.status(200).json( addons );
    } catch (error) {
        console.error('Error fetching addons:', error);
        res.status(500).json({ error: 'Failed to fetch addons' });
    }
};

// GET a single Addon by ID with its associated Groups
const getAddonById = async (req, res) => {
    try {
        const { id } = req.params;

        const addon = await Addon.findByPk(id, {
            include: [{
                model: Group,
                through: { attributes: [] },
                attributes: ['id', 'name_ar', 'name_en']
            }]
        });

        if (!addon) {
            return res.status(404).json({ error: 'Addon not found' });
        }

        res.status(200).json({ addon });
    } catch (error) {
        console.error('Error fetching addon:', error);
        res.status(500).json({ error: 'Failed to fetch addon' });
    }
};

// UPDATE an Addon and its associated Groups
const updateAddon = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_ar, name_en, price, appearanceNumber, groupIds } = req.body;

        // Find the Addon
        const addon = await Addon.findByPk(id);

        if (!addon) {
            return res.status(404).json({ error: 'Addon not found' });
        }

        // Update addon fields
        if (name_ar) addon.name_ar = name_ar;
        if (name_en) addon.name_en = name_en;
        if (price) addon.price = price;
        if (appearanceNumber) addon.appearanceNumber = appearanceNumber;

        // Update associated groups if groupIds are provided
        if (groupIds && groupIds.length > 0) {
            const groups = await Group.findAll({ where: { id: groupIds } });

            if (groups.length !== groupIds.length) {
                return res.status(400).json({ error: 'Some groups not found' });
            }

            // Update the groups associated with the addon
            await addon.setGroups(groups);
        }

        // Save the updated addon
        await addon.save();

        res.json(addon);
    } catch (error) {
        console.error('Error updating addon:', error);
        res.status(500).json({ error: 'Failed to update addon' });
    }
};

// DELETE an Addon and clear its group associations
const deleteAddon = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the Addon
        const addon = await Addon.findByPk(id);

        if (!addon) {
            return res.status(404).json({ error: 'Addon not found' });
        }

        // Clear the associations with groups
        await addon.setGroups([]);

        // Delete the Addon
        await addon.destroy();

        res.json({ message: 'Addon deleted successfully' });
    } catch (error) {
        console.error('Error deleting addon:', error);
        res.status(500).json({ error: 'Failed to delete addon' });
    }
};

module.exports = {
    createAddon,
    getAllAddons,
    getAddonById,
    updateAddon,
    deleteAddon
};
