const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/histories', Controller.showHistories)


module.exports= router