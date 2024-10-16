const Sequelize = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a database configuration file

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
        allowNull: true // Assuming printer is optional
    }
});

sequelize.sync().then(() => {
    console.log('Departments table created or updated!');
}).catch((error) => {
    console.error('Error creating departments table:', error);
});

module.exports = Department;