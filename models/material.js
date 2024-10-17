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
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    price2: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    price3: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    appearanceNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    departmentId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Material;
