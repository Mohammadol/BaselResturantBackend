const Material = require('../models/material');

const getAllMaterials = async (req, res) => {
    try {
        const materials = await Material.findAll({
            include: ['groups', 'department']
        });
        res.json(materials);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve materials' });
    }
};

const getMaterialById = async (req, res) => {
    try {
        const id = req.params.id;
        const material = await Material.findByPk(id, {
            include: ['groups', 'department']
        });

        if (!material) {
            return res.status(404).json({ error: 'Material not found' });
        }

        res.json(material);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve material' });
    }
};

const createMaterial = async (req, res) => {
    try {
        const { name_ar, name_en, price1, price2, price3, appearanceNumber, departmentId } = req.body;

        // Validate input data
        if (!name_ar || !name_en || price1 === undefined || price2 === undefined || price3 === undefined || appearanceNumber === undefined || departmentId === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newMaterial = await Material.create({ name_ar, name_en, price1, price2, price3, appearanceNumber, departmentId });

        res.status(201).json(newMaterial);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create material' });
    }
};

const updateMaterial = async (req, res) => {
    try {
        const id = req.params.id;
        const { name_ar, name_en, price1, price2, price3, appearanceNumber, departmentId } = req.body;

        const material = await Material.findByPk(id);

        if (!material) {
            return res.status(404).json({ error: 'Material not found' });
        }

        material.name_ar = name_ar || material.name_ar;
        material.name_en = name_en || material.name_en;
        material.price1 = price1 || material.price1;
        material.price2 = price2 || material.price2;
        material.price3 = price3 || material.price3;
        material.appearanceNumber = appearanceNumber || material.appearanceNumber;
        material.departmentId = departmentId || material.departmentId;

        await material.save();

        res.json({ message: 'Material updated successfully' });
    } catch (error) {
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