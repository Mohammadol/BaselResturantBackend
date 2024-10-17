const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const RestaurantTable = sequelize.define('restaurantTable', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false
    },
    chairs: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    used: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    carier: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = RestaurantTable;
