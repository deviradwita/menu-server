const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/users/checkLogin', Controller.checkLogin)


module.exports= router