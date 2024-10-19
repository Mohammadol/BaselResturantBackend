const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Group = require('./group');

const Addon = sequelize.define('addon', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_ar: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name_en: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0 // Ensure price is not negative
        }
    },
    appearanceNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1 // Ensure appearanceNumber is at least 1
        }
    },
    groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Group,
            key: 'id',
        }
    }
});

sequelize.sync()


// Export the model
module.exports = Addon;
