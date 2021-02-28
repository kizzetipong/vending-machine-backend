const _ = require('lodash')
const sequelize = require('../../../utils/sequelize').getInstance().get()
const transactionsDef = require('./definitions/transactions')

module.exports = (() => {
  let instance

  const init = () => {
    sequelize.define('transactions', transactionsDef)
    const Transactions = sequelize.models.transactions
    const thisObj = {
      getAll: async () => {
        const allTransactions = Transactions.findAll()
        return allTransactions
      },
      find: async (id) => {
        const tran = Transactions.findByPk(id)
        return tran
      },
      add: async (machineId, productId, action, amount) => {
        // TODO: add input validation
        const createdTransaction = Transactions.create({
          machineId,
          productId,
          action,
          amount,
        })
        return createdTransaction
      },
      update: async (id, paramsObj) => {
        // Pick only valid value
        let updateObj = _.pick(paramsObj, ['machineId', 'productId', 'action', 'amount'])
        updateObj = _.pickBy(updateObj, _.identity)
        const result = Transactions.update(updateObj, {
          where: { id },
        })
        return result
      },
      delete: async (id) => {
        const result = Transactions.destroy({ where: { id } })
        return result
      },
    }

    return thisObj
  }

  return {
    getInstance: () => {
      if (!instance) { instance = init() }
      return instance
    },
  }
})()
