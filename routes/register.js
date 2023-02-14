const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.post('/register/admin', Controller.registerNewUser)

module.exports = router;