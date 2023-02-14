const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()


router.post('/login', Controller.login)


module.exports = router;