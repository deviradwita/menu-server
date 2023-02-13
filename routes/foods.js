const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.post('/foods', Controller.createFood)
router.get('/foods', Controller.showAllFoods)

router.get('/foods/:id', Controller.showFoodById)
router.delete('/foods/:id', Controller.deleteFood)

module.exports = router;