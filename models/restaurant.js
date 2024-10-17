// restaurant.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');


const Restaurant = sequelize.define('restaurant', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Restaurant;
