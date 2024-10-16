const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Restaurant=require('./restaurant');
const Group = sequelize.define('group', {
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
    appearanceNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isDefault: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

Group.belongsToMany(Restaurant, { through: 'restaurant_groups' });

sequelize.sync().then(() => {
    console.log('Groups table created or updated!');
}).catch((error) => {
    console.error('Error creating groups table:', error);
});

module.exports = Group;