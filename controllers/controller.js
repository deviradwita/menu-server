const {Food, User, Category} = require('../models')

class Controller {

    static async createFood(req, res){
        try{
            const food= await Food.create({
                name: req.body.name,
                description : req.body.description,
                price: req.body.price,
                imgUrl: req.body.imgUrl,
                authorId: req.body.authorId,
                categoryId: req.body.categoryId
            })
    
            res.status(201).json(food)
        }
    
        catch (err){
            // console.log(err);
            if(err.name === "SequelizeValidationError"){
                res.status(400).json({
                    message : err.errors.map(el=> el.message)
                })
            } else{
                res.status(500).json({
                    message: 'Internal server error'
                })
            }
           
        }
    }

    static async showAllFoods(req, res){

        try{
            const food= await Food.findAll()
            res.status(200).json(food)
        }

        catch(err){
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }
    


}

module.exports = Controller