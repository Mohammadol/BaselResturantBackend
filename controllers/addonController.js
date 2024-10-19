const Addon = require('../models/addon');
const Group = require('../models/group');

const getAllAddons = async (req, res) => {
    try {
        const addons = await Addon.findAll();
        res.json(addons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve addons' });
    }
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
        const { name_ar, name_en, price, appearanceNumber, groupId } = req.body;

        // Validate input data
        if (!name_ar || !name_en || price === undefined || appearanceNumber === undefined || !groupId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newAddon = await Addon.create({ name_ar, name_en, price, appearanceNumber, groupId });

        res.status(201).json(newAddon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create addon' });
    }
};

const updateAddon = async (req, res) => {
    try {
        const id = req.params.id;
        const { name_ar, name_en, price, appearanceNumber, groupId } = req.body;

        const addon = await Addon.findByPk(id);

        if (!addon) {
            return res.status(404).json({ error: 'Addon not found' });
        }

        const updateFields = {
            name_ar: name_ar || addon.name_ar,
            name_en: name_en || addon.name_en,
            price: price || addon.price,
            appearanceNumber: appearanceNumber || addon.appearanceNumber,
            groupId: groupId || addon.groupId // Optional, if you allow updating groupId
        };

        await addon.update(updateFields);

        res.json({ message: 'Addon updated successfully', addon });
    } catch (error) {
        console.error(error);
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
