const _ = require('lodash')
const router = require('express').Router()
const model = require('../models/transactions').getInstance()
const productsModel = require('../models/products').getInstance()

const ACTION_ENUM = ['BUY', 'REFILL']

// TODO: add error handling for all methods
router.get('/', async (req, res) => {
  const allTransactions = await model.getAll()
  res.json(allTransactions)
})

router.get('/:id', async (req, res) => {
  const { params } = req
  const transaction = await model.find(params.id)
  if (transaction) {
    res.json(transaction)
  } else {
    res.status(404).send(`transaction id ${params.id} is not found`)
  }
})

router.post('/', async (req, res) => {
  const { body } = req
  const {
    machineId,
    productId,
    action,
    amount,
  } = body

  if (ACTION_ENUM.indexOf(action) > -1) {
    if (action === 'BUY') {
      const buyResult = await productsModel.buy(productId, amount)
      if (buyResult) {
        const updateItem = _.get(buyResult, '[1][0]')
        if (updateItem && updateItem.amount < 10) {
          const io = req.app.get('socketIo')
          // TODO: add more details to notification content
          io.of('/').to('notification').emit('data', `${updateItem.amount} left for ${updateItem.name}`)
        }
        const success = await model.add(machineId, productId, action, amount)
        if (success) {
          res.status(200).send('Add Success')
        } else {
          res.status(500).send('transaction is failed to add')
        }
      } else {
        res.status(500).send('buy transaction is failed')
      }
    } else if (action === 'REFILL') {
      const refillSuccess = await productsModel.refill(productId, amount)
      if (refillSuccess) {
        const success = await model.add(machineId, productId, action, amount)
        if (success) {
          res.status(200).send('Add Success')
        } else {
          res.status(500).send('transaction is failed to add')
        }
      } else {
        res.status(500).send('refill transaction is failed')
      }
    }
  } else {
    res.status(404).send(`action ${action} is not support`)
  }
})

router.put('/:id', async (req, res) => {
  const { params, body } = req
  const success = await model.update(params.id, body)
  if (success) {
    res.status(200).send('Update Success')
  } else {
    res.status(500).send(`transaction id ${params.id} is failed to update`)
  }
})

router.delete('/:id', async (req, res) => {
  const { params } = req
  const delSuccess = await model.delete(params.id)
  if (delSuccess) {
    res.status(200).send('Delete Success')
  } else {
    res.status(500).send(`transaction id ${params.id} is failed to delete`)
  }
})

module.exports = router
