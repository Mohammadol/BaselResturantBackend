const Sequelize = require('sequelize');
const sequelize = require('../config/database');

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
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    hooks: {
      beforeCreate: async (group, options) => {
        if (group.isDefault) {
          await Group.update({ isDefault: false }, { where: { isDefault: true } });
        }
      },
      beforeUpdate: async (group, options) => {
        if (group.changed('isDefault') && group.isDefault) {
          await Group.update({ isDefault: false }, { where: { isDefault: true, id: { [Sequelize.ne]: group.id } } });
        }
      }
    }
  });

module.exports = Group;
