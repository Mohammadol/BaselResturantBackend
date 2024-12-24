const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const OrderItem = sequelize.define('OrderItem', { // Corrected model name
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  materialId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Materials', 
      key: 'id'
    },
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE'
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  note: {
    type: Sequelize.STRING,
    allowNull: true
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Orders',
      key: 'id'
    },
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE' 
  }
});

module.exports = OrderItem;