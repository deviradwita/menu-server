const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const { verifyToken } = require('../helpers/jwt')
const authorizationDelete = require('../middleware/authorizationDelete')



router.post('/foods', Controller.createFood)
router.get('/foods', Controller.showAllFoods)
router.get('/foods/:id', Controller.showFoodById)
router.delete('/foods/:id', authorizationDelete, Controller.deleteFood)

module.exports = router;