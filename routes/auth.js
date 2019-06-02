const express = require('express')
const router = express.Router();

const authController = require('../controllers/auth')

router.post('/createAccount',authController.postCreateAccountInfo)

module.exports = router