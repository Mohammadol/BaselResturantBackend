const Group = require('../models/group');
const Restaurant = require('../models/restaurant');


const getAllGroups = async (req, res) => {
    try {
        const groups = await sequelize.query(
            `SELECT g.id, g.name_ar, g.name_en, r.name
             FROM groups AS g
             LEFT JOIN restaurant_groups AS rg ON g.id = rg.groupId
             LEFT JOIN restaurants AS r ON r.id = rg.restaurantId
             WHERE g.id = :groupId`,
            {
                replacements: { groupId: req.params.id },
                type: QueryTypes.SELECT
            }
        );
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
    const { name_ar, name_en, appearanceNumber, isDefault, restaurantIds } = req.body;

    try {
        const newGroup = await Group.create({
            name_ar,
            name_en,
            appearanceNumber,
            isDefault
        });

        await newGroup.setRestaurants(restaurantIds);

        res.status(201).json(newGroup);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create group' });
    }
};

const updateGroup = async (req, res) => {
    try {
        const id = req.params.id;
        const { name_ar, name_en, appearanceNumber, isDefault, restaurantIds } = req.body;

        const group = await Group.findByPk(id);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        await group.update({
            name_ar,
            name_en,
            appearanceNumber,
            isDefault
        });

        if (restaurantIds) {
            await group.setRestaurants(restaurantIds);
        }

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

        await group.setRestaurants([]);

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