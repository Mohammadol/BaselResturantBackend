// restaurant.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');


const Restaurant = sequelize.define('restaurants', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    notes: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isUsed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = Restaurant;
