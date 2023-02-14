const { hash, compare } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

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
                    message : err.errors[0].message
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

    //khusus REGISTER ADMIN
    static async registerNewUser(req, res){
        try {
            const {username, email, password, phoneNumber, address}= req.body
            const userCreated = await User.create ({
                username, email, password, phoneNumber, address
            })
            res.status(201).json({message : {id : userCreated.id, email } })
          
        } catch (err) {
            if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError"){
                res.status(400).json({
                    message : err.errors[0].message
                })
            } else{
                res.status(500).json({
                    message: 'Internal server error'
                })
            }
            
        }
    }

    static async login(req, res){
        try {
            const {email, password} = req.body
            if(!email || !password){
                throw {name : 'Email or Password required'}
            }
            const user = await User.findOne({where: {email}})
            if (!user){
                throw {name : 'Invalid Credential'}
            }

            const comparedPassword= compare(password, user.password)
            if(!comparedPassword){
                throw {name : 'Invalid Credential'}
            }

            const payload = {
                id :user.id
            }

            const access_token= createToken(payload)

            res.status(200).json({access_token})
        } catch (err) {
            // console.log(err);
            if( err.name === "Email or Password required"){
                res.status(400).json({
                    message :"Email or Password required"
                })
            } else if(err.name === "Invalid Credential"){
                res.status(401).json({
                    message : 'Wrong Email or Password'
                })
            } else{
                res.status(500).json({
                    message: 'Internal server error'
                })
            }
        }
    }

}

module.exports = Controller