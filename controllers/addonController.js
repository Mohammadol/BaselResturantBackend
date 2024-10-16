const Addon = require('../models/addon');

const getAllAddons = async (req, res) => {
    try {
        const addons = await Addon.findAll({
            include: 'groups' // Include associated groups
        });
        res.json(addons);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve addons' });
    }
};

const getAddonById = async (req, res) => {
    try {
        const id = req.params.id;
        const addon = await Addon.findByPk(id, {
            include: 'groups' // Include associated groups
        });

        if (!addon) {
            return res.status(404).json({ error: 'Addon not found' });
        }

        res.json(addon);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve addon' });
    }
};

const createAddon = async (req, res) => {
    try {
        const { name_ar, name_en, price, appearanceNumber } = req.body;

        // Validate input data
        if (!name_ar || !name_en || price === undefined || appearanceNumber === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newAddon = await Addon.create({ name_ar, name_en, price, appearanceNumber });

        res.status(201).json(newAddon);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create addon' });
    }
};

const updateAddon = async (req, res) => {
    try {
        const id = req.params.id;
        const { name_ar, name_en, price, appearanceNumber } = req.body;

        const addon = await Addon.findByPk(id);

        if (!addon) {
            return res.status(404).json({ error: 'Addon not found' });
        }

        addon.name_ar = name_ar || addon.name_ar;
        addon.name_en = name_en || addon.name_en;
        addon.price = price || addon.price;
        addon.appearanceNumber = appearanceNumber || addon.appearanceNumber;

        await addon.save();

        res.json({ message: 'Addon updated successfully' });
    } catch (error) {
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