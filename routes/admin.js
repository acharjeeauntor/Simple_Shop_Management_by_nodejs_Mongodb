const express = require('express')
const router = express.Router();

const adminController = require('../controllers/admin')
//const { body } = require('express-validator/check');
const isAuth = require('../middleware/is-auth')


router.post('/entryProduct',isAuth,adminController.postAddProduct)

router.get('/entry-product',adminController.getNewProductForm)

router.get('/edit-product',isAuth,adminController.getEditProductForm)

router.get('/delete-product',isAuth,adminController.getDeleteProductForm)

router.post('/editProduct',isAuth,adminController.postEditProduct)

router.post('/deleteProduct',isAuth,adminController.deleteProduct)

module.exports = router