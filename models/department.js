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
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Department name cannot be empty' }
        }
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['kitchen', 'bar', 'service']], // Example of department types
                msg: 'Type must be either kitchen, bar, or service'
            }
        }
    },
    printer: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            is: {
                args: /^[a-zA-Z0-9\s\-]*$/, // Alphanumeric and spaces
                msg: 'Printer name can only contain letters, numbers, and spaces'
            }
        }
    }
});

module.exports = Department;
