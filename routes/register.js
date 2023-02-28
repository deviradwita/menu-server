const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const PublicController = require('../controllers/userController')


router.post('/register/admin', Controller.registerNewUser)
router.post('/public/register', PublicController.registerNewCustomer)

module.exports = router;