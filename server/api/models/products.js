const _ = require('lodash')
const sequelize = require('../../../utils/sequelize').getInstance().get()
const productsDef = require('./definitions/products')

module.exports = (() => {
  let instance

  const init = () => {
    sequelize.define('products', productsDef)
    const Products = sequelize.models.products
    const thisObj = {
      getAll: async () => {
        const allProducts = Products.findAll()
        return allProducts
      },
      find: async (id) => {
        const prod = Products.findByPk(id)
        return prod
      },
      add: async (machineId, machineSlot, name, amount) => {
        // TODO: add input validation
        const createdProduct = Products.create({
          machineId,
          machineSlot,
          name,
          amount,
        })
        return createdProduct
      },
      update: async (id, paramsObj) => {
        // Pick only valid value
        let updateObj = _.pick(paramsObj, ['machineId', 'machineSlot', 'name', 'amount'])
        updateObj = _.pickBy(updateObj, _.identity)
        const result = Products.update(updateObj, {
          where: { id },
        })
        return result
      },
      buy: async (id, amount) => {
        const current = await Products.findByPk(id)
        if (current && +current.amount >= +amount) {
          const amountLeft = +current.amount - +amount
          const result = Products.update({ amount: amountLeft }, {
            where: { id },
            returning: true,
          })
          return result
        }
        return null
      },
      refill: async (id, amount) => {
        const current = await Products.findByPk(id)
        if (current) {
          const amountLeft = +current.amount + +amount
          const result = Products.update({ amount: amountLeft }, {
            where: { id },
          })
          return result
        }
        return null
      },
      delete: async (id) => {
        const result = Products.destroy({ where: { id } })
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
