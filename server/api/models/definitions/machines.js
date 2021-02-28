const { DataTypes } = require('sequelize')

const machines = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  lat: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  lng: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  name: {
    type: DataTypes.STRING,
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
  },
}

module.exports = machines
