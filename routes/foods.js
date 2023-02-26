const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const { verifyToken } = require('../helpers/jwt')
const authorizationDelete = require('../middleware/authorizationDelete')
const authorizationEdit = require('../middleware/authorizationEdit')



router.post('/foods', Controller.createFood)
router.get('/foods', Controller.showAllFoods)
router.put('/foods/:id', authorizationEdit, Controller.editFoodById)
router.patch('/foods/:id', authorizationEdit, Controller.editFoodStatusById)
router.get('/foods/:id', Controller.showFoodById)
router.delete('/foods/:id', authorizationDelete, Controller.deleteFood)

module.exports = router;