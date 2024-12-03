const Sequelize = require('sequelize');
const sequelize = require('../config/database');

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
    isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

// Export the model

module.exports = Addon;
