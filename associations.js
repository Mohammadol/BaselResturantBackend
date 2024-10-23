const Addon = require('./models/addon');
const Group = require('./models/group');
const Material = require('./models/material');
const Department = require('./models/department');
const Restaurant = require('./models/restaurant');
const RestaurantTable = require('./models/restaurantTable');
const Captain = require('./models/captain');

// One-to-Many: Group has many Addons, and an Addon belongs to one Group
Addon.belongsToMany(Group, { through: 'addon_groups', onDelete: 'CASCADE' });
Group.belongsToMany(Addon, { through: 'addon_groups', onDelete: 'CASCADE' });

// Many-to-Many: Material and Group
Material.belongsToMany(Group, { through: 'material_groups', onDelete: 'CASCADE' });
Group.belongsToMany(Material, { through: 'material_groups', onDelete: 'CASCADE' });

// Many-to-Many: Restaurant and Group
Group.belongsToMany(Restaurant, { through: 'restaurant_groups', onDelete: 'CASCADE' });
Restaurant.belongsToMany(Group, { through: 'restaurant_groups', onDelete: 'CASCADE' });

// One-to-Many: Department has many Materials
Material.belongsTo(Department, { foreignKey: 'departmentId', onDelete: 'CASCADE' });
Department.hasMany(Material, { foreignKey: 'departmentId' });

// One-to-Many: Restaurant has many RestaurantTables
Restaurant.hasMany(RestaurantTable, { foreignKey: 'restaurantId' });
RestaurantTable.belongsTo(Restaurant, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });

// One-to-Many: Restaurant has many Captain
Restaurant.hasMany(Captain, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });
Captain.belongsTo(Restaurant, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });

module.exports = {
    Addon,
    Group,
    Material,
    Department,
    Restaurant,
    RestaurantTable,
    Captain,

};
