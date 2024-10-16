const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Group =require('./group');
const Department=require('./department');
const Material = sequelize.define('material', {
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
    price1: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    price2: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    price3: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    appearanceNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    departmentId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Define the many-to-many relationship between materials and groups
Material.belongsToMany(Group, { through: 'material_groups' });
Group.belongsToMany(Material, { through: 'material_groups' });

// Define the one-to-many relationship between materials and departments
Material.belongsTo(Department, { foreignKey: 'departmentId' });
Department.hasMany(Material, { foreignKey: 'departmentId' });

sequelize.sync().then(() => {
    console.log('Materials table created or updated!');
}).catch((error) => {
    console.error('Error creating materials table:', error);
});

module.exports = Material;