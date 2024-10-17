// associations.js
const Addon = require('./models/addon');
const Group = require('./models/group');
const Material = require('./models/material');
const Department = require('./models/department');
const Restaurant = require('./models/restaurant');
const RestaurantTable = require('./models/restaurantTable');

// Addon can have many Groups and Groups can have many Addons
Addon.belongsToMany(Group, { through: 'addon_groups' });
Group.belongsToMany(Addon, { through: 'addon_groups' });

// Material can have many Groups and Groups can have many Materials
Material.belongsToMany(Group, { through: 'material_groups' });
Group.belongsToMany(Material, { through: 'material_groups' });

// Restaurant can have many Groups and Groups can have many Restaurants
Group.belongsToMany(Restaurant, { through: 'restaurant_groups' });
Restaurant.belongsToMany(Group, { through: 'restaurant_groups' });

// Department has many Materials (One-to-Many relationship)
Material.belongsTo(Department, { foreignKey: 'departmentId' });
Department.hasMany(Material, { foreignKey: 'departmentId' });

// Restaurant has many RestaurantTables (One-to-Many relationship)
Restaurant.hasMany(RestaurantTable, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });
RestaurantTable.belongsTo(Restaurant, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });

module.exports = {
    Addon,
    Group,
    Material,
    Department,
    Restaurant,
    RestaurantTable
};
