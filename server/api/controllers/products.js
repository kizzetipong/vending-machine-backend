const router = require('express').Router()
const model = require('../models/products').getInstance()

// TODO: add error handling for all methods
router.get('/', async (req, res) => {
  const allProducts = await model.getAll()
  res.json(allProducts)
})

router.get('/:id', async (req, res) => {
  const { params } = req
  const product = await model.find(params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404).send(`product id ${params.id} is not found`)
  }
})

router.post('/', async (req, res) => {
  const { body } = req
  const {
    machineId,
    machineSlot,
    name,
    amount,
  } = body
  const success = await model.add(machineId, machineSlot, name, amount)
  if (success) {
    res.status(200).send('Add Success')
  } else {
    res.status(500).send('product is failed to add')
  }
})

router.put('/:id', async (req, res) => {
  const { params, body } = req
  const success = await model.update(params.id, body)
  if (success) {
    res.status(200).send('Update Success')
  } else {
    res.status(500).send(`product id ${params.id} is failed to update`)
  }
})

router.delete('/:id', async (req, res) => {
  const { params } = req
  const delSuccess = await model.delete(params.id)
  if (delSuccess) {
    res.status(200).send('Delete Success')
  } else {
    res.status(500).send(`product id ${params.id} is failed to delete`)
  }
})

module.exports = router
