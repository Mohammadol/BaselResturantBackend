const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Department = sequelize.define('department', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    printer: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Department;
