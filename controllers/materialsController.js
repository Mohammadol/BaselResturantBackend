const Material = require('../models/material');
const Group = require('../models/group');
const Department = require('../models/department');

const getAllMaterials = async (req, res) => {
    try {
        const materials = await Material.findAll({
            include: [
                { model: Group },
                { model: Department }
            ]
        });
        res.json(materials);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve materials' });
    }
};

const getMaterialById = async (req, res) => {
    try {
        const id = req.params.id;
        const material = await Material.findByPk(id, {
            include: [
                { model: Group },
                { model: Department }
            ]
        });

        if (!material) {
            return res.status(404).json({ error: 'Material not found' });
        }

        res.json(material);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve material' });
    }
};

const createMaterial = async (req, res) => {
    try {
        const { name_ar, name_en, price1, price2, price3, appearanceNumber, departmentId, type, groupIds } = req.body;

        if (!name_ar || !name_en || price1 === undefined || price2 === undefined || price3 === undefined || appearanceNumber === undefined || departmentId === undefined || !type) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newMaterial = await Material.create({ name_ar, name_en, price1, price2, price3, appearanceNumber, departmentId, type });

        if (groupIds && groupIds.length > 0) {
            const groups = await Group.findAll({ where: { id: groupIds } });
            await newMaterial.setGroups(groups);
        }
        const materialWithGroups = await Material.findByPk(newMaterial.id, {
            include: {
                model: Group,
                as: 'groups',
                attributes: ['id', 'name_ar','name_en'],
                through: { attributes: [] },
            }
        });

        res.status(201).json(materialWithGroups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create material' });
    }
};

const updateMaterial = async (req, res) => {
    try {
        const id = req.params.id;
        const { name_ar, name_en, price1, price2, price3, appearanceNumber, departmentId, type, groupIds } = req.body;

        const material = await Material.findByPk(id);

        if (!material) {
            return res.status(404).json({ error: 'Material not found' });
        }

        material.name_ar = name_ar !== undefined ? name_ar : material.name_ar;
        material.name_en = name_en !== undefined ? name_en : material.name_en;
        material.price1 = price1 !== undefined ? price1 : material.price1;
        material.price2 = price2 !== undefined ? price2 : material.price2;
        material.price3 = price3 !== undefined ? price3 : material.price3;
        material.appearanceNumber = appearanceNumber !== undefined ? appearanceNumber : material.appearanceNumber;
        material.departmentId = departmentId !== undefined ? departmentId : material.departmentId;
        material.type = type !==undefined? type:material.type;

        await material.save();

        if (groupIds && groupIds.length > 0) {
            const groups = await Group.findAll({ where: { id: groupIds } });
            await material.setGroups(groups); // Update the related groups
        }

        // Return the updated material with the associated groups
        const updatedMaterial = await Material.findByPk(material.id, {
            include: {
                model: Group,
                as: 'groups',
                attributes: ['id', 'name']
            }
        });

        res.json(updatedMaterial);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update material' });
    }
};

const deleteMaterial = async (req, res) => {
    try {
        const id = req.params.id;
        const material = await Material.findByPk(id);

        if (!material) {
            return res.status(404).json({ error: 'Material not found' });
        }

        await material.destroy();
        res.json({ message: 'Material deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete material' });
    }
};

module.exports = {
    getAllMaterials,
    getMaterialById,
    createMaterial,
    updateMaterial,
    deleteMaterial
};
