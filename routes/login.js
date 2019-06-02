const express = require('express')
const router = express.Router();

const loginController = require('../controllers/login')


router.get('/',loginController.getLoginPage)

router.get('/admin/admin-login',loginController.getAdminLogin)

router.get('/auth/auth-login',loginController.getAuthLogin)

router.get('/shopper/shopper-login',loginController.getShopperLogin)

router.post('/shopper/sale',loginController.postShopperLogin)

router.post('/adminLogin',loginController.postAdminLogin)

router.post('/authLogin',loginController.postAuthLogin)

module.exports = router