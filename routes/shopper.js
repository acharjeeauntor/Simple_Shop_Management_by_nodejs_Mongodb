const express = require('express')
const router = express.Router();

const sallerController = require('../controllers/shopper')

router.post('/invoice',sallerController.postSaleProduct)

module.exports = router