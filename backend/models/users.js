const { DataTypes } = require('sequelize');
const sequelize = require('../config/index');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user', 'guest'),
    allowNull: false,
    defaultValue: 'user',
  },
  avatar: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;
