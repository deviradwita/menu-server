const express = require('express')
const PublicController = require('../controllers/userController')
const router = express.Router()



router.get('/public/foods', PublicController.fetchFoods)
router.get('/public/foods/:id', PublicController.fetchFoodById)
router.get('/public/categories', PublicController.fetchCategories)
router.post('/public/qrcode/:id', PublicController.getQrCode)

module.exports= router