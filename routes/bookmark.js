const express = require('express')
const PublicController = require('../controllers/userController')
const router = express.Router()

router.get('/public/bookmarks', PublicController.fetchBookmark)
router.post('/public/bookmarks/:foodId', PublicController.addBookmark)

module.exports= router