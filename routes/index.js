const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const food= require('../routes/foods')
const category = require ('../routes/category')
const register = require ('../routes/register')
const login = require ('../routes/login')
const authentication = require('../middleware/authentication')




router.use(login)
router.use(register);
router.use(authentication)

router.use(food);
router.use(category);



module.exports= router