const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const food= require('../routes/foods')
const category = require ('../routes/category')
const register = require ('../routes/register')
const login = require ('../routes/login')
const authentication = require('../middleware/authentication')
const user = require ('../routes/user')
const history = require('../routes/history')
const PublicController = require('../controllers/userController')
const bookmark = require('./bookmark')




router.use(login)
router.use(register);
router.get('/public/foods', PublicController.fetchFoods)
router.get('/public/foods/:id', PublicController.fetchFoodById)
router.use(authentication);
router.use(user);
router.use(history)
router.use(bookmark)
router.use(food);
router.use(category);



module.exports= router