const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/categories', Controller.showCategories)
router.post('/categories', Controller.createCategory)
router.delete('/categories/:id', Controller.deleteCategory)


module.exports= router