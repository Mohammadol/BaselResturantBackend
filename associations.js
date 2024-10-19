const Addon = require('./models/addon');
const Group = require('./models/group');
const Material = require('./models/material');
const Department = require('./models/department');
const Restaurant = require('./models/restaurant');
const RestaurantTable = require('./models/restaurantTable');

// One-to-Many: Group has many Addons, and an Addon belongs to one Group
Addon.belongsTo(Group, { foreignKey: 'groupId' });
Group.hasMany(Addon, { foreignKey: 'groupId' });
// Many-to-Many: Material and Group
Material.belongsToMany(Group, { through: 'material_groups' });
Group.belongsToMany(Material, { through: 'material_groups' });

// Many-to-Many: Restaurant and Group
Group.belongsToMany(Restaurant, { through: 'restaurant_groups' });
Restaurant.belongsToMany(Group, { through: 'restaurant_groups' });

// One-to-Many: Department has many Materials
Material.belongsTo(Department, { foreignKey: 'departmentId' });
Department.hasMany(Material, { foreignKey: 'departmentId' });

// One-to-Many: Restaurant has many RestaurantTables
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
