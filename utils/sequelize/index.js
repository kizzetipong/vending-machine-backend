const { Sequelize } = require('sequelize')
const { database } = require('../../server/config')()

module.exports = (() => {
  let instance

  const init = () => {
    const sqInstance = new Sequelize(database.uri, database.options)

    return {
      get: () => sqInstance,
    }
  }

  return {
    getInstance: () => {
      if (!instance) { instance = init() }
      return instance
    },
  }
})()
