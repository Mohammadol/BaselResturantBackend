const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const RestaurantTable= require('./restaurantTable');
RestaurantTable.sync();
const Order = sequelize.define('Order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  number: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tableId: {
    type: Sequelize.INTEGER,
    allowNull: true, 
    references: {
      model: 'RestaurantTables', 
      key: 'id'
    }
  },
  paymentType:{
    type: Sequelize.ENUM('cash','card'), 
    allowNull: false,
    defaultValue: 'cash'
  },
  paymentStatus: {
    type: Sequelize.ENUM('pending', 'paid', 'cancelled'), 
    allowNull: false,
    defaultValue: 'pending'
  },
  total: {
    type: Sequelize.INTEGER, 
    allowNull: false,
    defaultValue: 0
  },
  discount: {
    type: Sequelize.INTEGER, 
    allowNull: true,
    defaultValue: 0
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW 
  }
});

module.exports = Order;