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
        allowNull: false,
        references: {
            model: 'restaurants', // Replace 'restaurants' with the actual name of your restaurants table
            key: 'id' // Assuming the primary key of the restaurants table is 'id'
        },
        onDelete: 'CASCADE' // This will delete associated restaurant tables when the corresponding restaurant is deleted
    }
});
sequelize.sync().then(() => {
    console.log('Restaurant table created or updated!');
}).catch((error) => {
    console.error('Error creating restaurant table:', error);
});


module.exports = RestaurantTable;