const _ = require('lodash')
const axios = require('axios')
const config = require('../config')()

const callProductsData = (done) => {
  try {
    axios.get(`${config.api.url}:${config.api.port}/api/products`).then((response) => {
      if (response && response.data) {
        done(null, response.data)
      }
    }).catch((error) => {
      done(error, null)
    })
  } catch (error) {
    done(error, null)
  }
}

function dbSync(io) {
  return {
    checkNotification: (roomId) => {
      if (roomId === 'notification') {
        callProductsData((err, result) => {
          if (err) {
            console.error(err)
          } else if (result) {
            const lowLevelProd = _.filter(result, (product) => product.amount < 10)
            _.each(lowLevelProd, (prod) => {
              // TODO: add more details to notification content
              io.of('/').to('notification').emit('data', `${prod.amount} left for ${prod.name}`)
            })
          }
        })
      }
    },
  }
}

module.exports = dbSync
