const Department = require('../models/department');
const Material = require('../models/material');

const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll({
            include: 'materials' // Include associated materials
        });
        res.json(departments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve departments' });
    }
};

const getDepartmentById = async (req, res) => {
    try {
        const id = req.params.id;
        const department = await Department.findByPk(id, {
            include: 'materials' // Include associated materials
        });

        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        res.json(department);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve department' });
    }
};

const createDepartment = async (req, res) => {
    try {
        const { name, type, printer } = req.body;

        // Validate input data
        if (!name || !type) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newDepartment = await Department.create({ name, type, printer });

        res.status(201).json(newDepartment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create department' });
    }
};

const updateDepartment = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, type, printer } = req.body;

        const department = await Department.findByPk(id);

        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        department.name = name || department.name;
        department.type = type || department.type;
        department.printer = printer || department.printer;

        await department.save();

        res.json({ message: 'Department updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update department' });
    }
};

const deleteDepartment = async (req, res) => {
    try {
        const id = req.params.id;
        const department = await Department.findByPk(id);

        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        await department.destroy();
        res.json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete department' });
    }
};

module.exports = {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment
};