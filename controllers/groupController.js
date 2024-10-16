const Group = require('../models/group');
const Restaurant = require('../models/restaurant');

const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.findAll({
            include: 'restaurants' // Include associated restaurants
        });
        res.json(groups);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve groups' });
    }
};

const getGroupById = async (req, res) => {
    try {
        const id = req.params.id;
        const group = await Group.findByPk(id, {
            include: 'restaurants' // Include associated restaurants
        });

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        res.json(group);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve group' });
    }
};

const createGroup = async (req, res) => {
    try {
        const { name_ar, name_en, appearanceNumber, isDefault, restaurantId } = req.body;

        // Validate input data
        if (!name_ar || !name_en || appearanceNumber === undefined || restaurantId === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newGroup = await Group.create({ name_ar, name_en, appearanceNumber, isDefault, restaurantId });

        res.status(201).json(newGroup);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create group' });
    }
};

const updateGroup = async (req, res) => {
    try {
        const id = req.params.id;
        const { name_ar, name_en, appearanceNumber, isDefault, restaurantId } = req.body;

        const group = await Group.findByPk(id);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        group.name_ar = name_ar || group.name_ar;
        group.name_en = name_en || group.name_en;
        group.appearanceNumber = appearanceNumber || group.appearanceNumber;
        group.isDefault = isDefault || group.isDefault;
        group.restaurantId = restaurantId || group.restaurantId;

        await group.save();

        res.json({ message: 'Group updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update group' });
    }
};

const deleteGroup = async (req, res) => {
    try {
        const id = req.params.id;
        const group = await Group.findByPk(id);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        await group.destroy();
        res.json({ message: 'Group deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete group' });
    }
};

module.exports = {
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup
};