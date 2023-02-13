const {Food, User, Category} = require('../models')

class Controller {

    //membuat entitas utama (create/post)
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

    //mengambil semua data entitas utama (read/get)
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

    //mengambil detail entitas utama berdasarkan id(read/get)

    static async showFoodById(req, res){
        try{
            const food= await Food.findByPk(req.params.id)
            res.status(200).json(food)
        }

        catch(err){
            res.status(404).json({
                message: 'Error not Found'
            })
        }
    }

    static async deleteFood(req, res){
        try{
            const food= await Food.findByPk(req.params.id)
            if(!food){
                throw {name : 'NotFound'}
            }

            await Food.destroy({where:{
                id:req.params.id}
            })

            res.status(200).json({
                message : `${food.name} success to delete`
            })

        }

        catch(err){
            if(err.name === 'NotFound'){
                res.status(404).json({
                    message: 'Error not Found'
                })
            } else{
                res.status(500).json({
                    message: 'Internal server error'
                })
            }
            
        }
    }

    static async showCategories(req, res){
        try{
            const food= await Category.findAll()
            res.status(200).json(food)
        }

        catch(err){
            console.log(err);
            res.status(404).json({
                message: 'Error not Found'
            })
        }
    }

}

module.exports = Controller