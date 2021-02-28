const router = require('express').Router()
const Machine = require('../api/controllers/machines')
const Products = require('../api/controllers/products')
const Transactions = require('../api/controllers/transactions')

router.use('/machines', Machine)
router.use('/products', Products)
router.use('/transactions', Transactions)

module.exports = router
