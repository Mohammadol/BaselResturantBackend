
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Captain = sequelize.define('captain', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    appearanceNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    used: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    restaurantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'restaurants', // Reference to the 'Restaurant' table
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
});

module.exports = Captain;
