const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Material = sequelize.define('material', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_ar: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name_en: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price1: {
        type: Sequelize.INTEGER, // Keeping integer as you requested
        allowNull: false
    },
    price2: {
        type: Sequelize.INTEGER, // Keeping integer
        allowNull: false
    },
    price3: {
        type: Sequelize.INTEGER, // Keeping integer
        allowNull: false
    },
    appearanceNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    departmentId: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {
            model: 'departments', // Reference to the 'Department' table
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Material;
