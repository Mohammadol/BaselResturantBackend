const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Group =require('./group');
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
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    appearanceNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

// Define the many-to-many relationship between addons and groups
Addon.belongsToMany(Group, { through: 'addon_groups' });
Group.belongsToMany(Addon, { through: 'addon_groups' });

sequelize.sync().then(() => {
    console.log('Addons table created or updated!');
}).catch((error) => {
    console.error('Error creating addons table:', error);
});

module.exports = Addon;