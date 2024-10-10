const Sequelize = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a database configuration file

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
        allowNull: false,
    },
    carier: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    restaurant: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
 RestaurantTable.sync(),


module.exports = RestaurantTable;