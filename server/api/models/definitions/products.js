const { DataTypes } = require('sequelize')

const machines = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  machineId: {
    field: 'machine_id',
    allowNull: false,
    type: DataTypes.STRING,
  },
  machineSlot: {
    field: 'machine_slot',
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
  amount: {
    type: DataTypes.INTEGER,
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
