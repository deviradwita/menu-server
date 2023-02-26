const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/categories', Controller.showCategories)
router.post('/categories', Controller.createCategory)
router.get('/categories/:id', Controller.showCategorybById)
router.delete('/categories/:id', Controller.deleteCategory)
router.put('/categories/:id', Controller.editcategoryById)

module.exports= router