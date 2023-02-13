const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const food= require('../routes/foods')
const category = require ('../routes/category')


router.use(food);
router.use(category);


module.exports= router