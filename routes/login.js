const express = require('express')
const Controller = require('../controllers/controller')
const PublicController = require('../controllers/userController')
const router = express.Router()


router.post('/login', Controller.login)
router.post('/googleLogin', Controller.loginGoogle)
router.post('/public/login', PublicController.loginCustomer)


module.exports = router;