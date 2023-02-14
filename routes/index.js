const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const food= require('../routes/foods')
const category = require ('../routes/category')
const register = require ('../routes/register')


router.use(food);
router.use(category);
router.use(register);



module.exports= router