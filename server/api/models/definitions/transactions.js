const { DataTypes } = require('sequelize')

const transactions = {
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
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.STRING,
  },
  action: {
    allowNull: false,
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

module.exports = transactions
