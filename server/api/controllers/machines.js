const router = require('express').Router()
const model = require('../models/machines').getInstance()

// TODO: add error handling for all methods
router.get('/', async (req, res) => {
  const allMachines = await model.getAll()
  res.json(allMachines)
})

router.get('/:id', async (req, res) => {
  const { params } = req
  const machine = await model.find(params.id)
  if (machine) {
    res.json(machine)
  } else {
    res.status(404).send(`machine id ${params.id} is not found`)
  }
})

router.post('/', async (req, res) => {
  const { body } = req
  const { lat, lng, name } = body
  const success = await model.add(lat, lng, name)
  if (success) {
    res.status(200).send('Add Success')
  } else {
    res.status(500).send('machine is failed to add')
  }
})

router.put('/:id', async (req, res) => {
  const { params, body } = req
  const success = await model.update(params.id, body)
  if (success) {
    res.status(200).send('Update Success')
  } else {
    res.status(500).send(`machine id ${params.id} is failed to update`)
  }
})

router.delete('/:id', async (req, res) => {
  const { params } = req
  const delSuccess = await model.delete(params.id)
  if (delSuccess) {
    res.status(200).send('Delete Success')
  } else {
    res.status(500).send(`machine id ${params.id} is failed to delete`)
  }
})

module.exports = router
