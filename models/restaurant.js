const Sequelize = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a database configuration file

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
    },
    // Add other relevant fields as needed
});

sequelize.sync().then(() => {
    console.log('Restaurant table created or updated!');
}).catch((error) => {
    console.error('Error creating restaurant table:', error);
});

module.exports = Restaurant;