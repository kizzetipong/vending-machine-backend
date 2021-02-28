const _ = require('lodash')
const sequelize = require('../../../utils/sequelize').getInstance().get()
const machinesDef = require('./definitions/machines')

module.exports = (() => {
  let instance

  const init = () => {
    sequelize.define('machines', machinesDef)
    const Machines = sequelize.models.machines
    const thisObj = {
      getAll: async () => {
        const allMachines = Machines.findAll()
        return allMachines
      },
      find: async (id) => {
        const mach = Machines.findByPk(id)
        return mach
      },
      add: async (lat, lng, name) => {
        // TODO: add input validation
        const createdMachine = Machines.create({ lat, lng, name })
        return createdMachine
      },
      update: async (id, paramsObj) => {
        // Pick only valid value
        let updateObj = _.pick(paramsObj, ['lat', 'lng', 'name'])
        updateObj = _.pickBy(updateObj, _.identity)
        const result = Machines.update(updateObj, {
          where: { id },
        })
        return result
      },
      delete: async (id) => {
        const result = Machines.destroy({ where: { id } })
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
