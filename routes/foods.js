const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const { verifyToken } = require('../helpers/jwt')
const {User} = require('../models')
const {Food} = require('../models')

router.post('/foods', Controller.createFood)
router.get('/foods', Controller.showAllFoods)
router.get('/foods/:id', Controller.showFoodById)

async function authorizationDelete(req, res, next){
    try {
        const food= await Food.findByPk(req.params.id)
       
        if (!food){
            throw {name : 'NotFound'}
        }
      

        if (req.user.role === "Admin" ) {
            next()
        } else {
            if (food.authorId === req.user.id) {
                next()
            } else {
                throw {name : 'forbidden'}
            }
        }
        
    } catch (err) {
        if (err.name === "forbidden") {
            res.status(403).json({
                message: 'Not Allowed'
            })
        } else if (err.name === "NotFound"){
            res.status(404).json({
                message: 'Resource Not Found'
            })
        } else {
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }
}
router.delete('/foods/:id', authorizationDelete, Controller.deleteFood)

module.exports = router;