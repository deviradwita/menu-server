const { hash, compare } = require('../helpers/bcrypt')
const { createToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const  CLIENT_ID = process.env.CLIENT_ID

const {Food, User, Category, History} = require('../models')


class Controller {
    static async createCategory(req, res, next){
        try{
         
            const category= await Category.create({
                name: req.body.name
            })
            // console.log(category);
            
            const user= await User.findOne({
                where: {
                    id: req.user.id
                },
                attributes : ['id','username', 'email']
            })


            let description = `New Category - ${req.body.name} added`
            const history = await History.create({
                title: req.body.name,
                description,
                updatedBy : user.username
            })

            res.status(201).json(category)
        }
    
        catch (err){
            // console.log(err);
            next(err)
            // if(err.name === "SequelizeValidationError"){
            //     res.status(400).json({
            //         message : err.errors[0].message
            //     })
            // } else{
            //     res.status(500).json({
            //         message: 'Internal server error'
            //     })
            // }
           
        }
    }

    //membuat entitas utama (create/post)
    static async createFood(req, res, next){
        try{
            // console.log(req.user, ">>>>>>>>>>>");
            const authorId =req.user.id
            const food= await Food.create({
                name: req.body.name,
                description : req.body.description,
                price: req.body.price,
                imgUrl: req.body.imgUrl,
                authorId,
                categoryId: req.body.categoryId
            })

            const user= await User.findOne({
                where: {
                    id: req.user.id
                },
                attributes : ['id','username', 'email']
            })

            // console.log(user.username);

            let description = `New Food - ${req.body.name} with ID ${food.id} added`
            const history = await History.create({
                title: req.body.name,
                description,
                updatedBy : user.username
            })

            // console.log(food);
    
            res.status(201).json(food)
        }
    
        catch (err){
            // console.log(err);
            next(err)
            // if(err.name === "SequelizeValidationError"){
            //     res.status(400).json({
            //         message : err.errors[0].message
            //     })
            // } else{
            //     res.status(500).json({
            //         message: 'Internal server error'
            //     })
            // }
           
        }
    }

    //mengambil semua data entitas utama (read/get)
    static async showAllFoods(req, res, next){

        try{
            const food= await Food.findAll({
                include : {
                    model : User,
                    attributes : ['id','username', 'email', 'address', 'role']
                }
            })
            res.status(200).json(food)
        }

        catch(err){
            next(err)
            // res.status(500).json({
            //     message: 'Internal server error'
            // })
        }
    }

    //mengambil detail entitas utama berdasarkan id(read/get)

    static async showFoodById(req, res, next){
        try{
            const food= await Food.findByPk(req.params.id)
            if(!food){
                throw {name : 'NotFound'}
            }
            res.status(200).json(food)
            
        }
        

        catch(err){
            next(err)
            // res.status(404).json({
            //     message: 'Error not Found'
            // })
        }
    }

    static async editFoodById (req, res, next){
        try {
            const food = await Food.update({
                name : req.body.name,
                description : req.body.description,
                price : req.body.price,
                imgUrl: req.body.imgUrl, 
                categoryId : req.body.categoryId

            },
            {
                where : {
                    id : req.params.id
                }
            })
            // console.log(food);
            if(!food){
                throw {name : 'NotFound'}
            }
            const user= await User.findOne({
                where: {
                    id: req.user.id
                },
                attributes : ['id','username', 'email']
            })

            // console.log(user.username);

            let description = `Product with ID ${food} updated`
            const history = await History.create({
                title: req.body.name,
                description,
                updatedBy : user.username
            })
            res.status(200).json({message : "sucessfuly edit food"})

            
        } catch (err) {
            // console.log(err);
            next(err)
            
        }
    }

    static async editFoodStatusById (req, res, next){
        try {

            const beforeFood= await Food.findByPk(req.params.id)
            // console.log(beforeFood.status);
            let statusBeforeUpdate =beforeFood.status
            const food = await Food.update({
                status : req.body.status
            },
            {
                where : {
                    id : req.params.id
                }
            })

            if(!food){
                throw {name : 'NotFound'}
            }

            const user= await User.findOne({
                where: {
                    id: req.user.id
                },
                attributes : ['id','username', 'email']
            })

            // console.log(user.username);

            let description = `Product status with ID ${food} has been update from ${statusBeforeUpdate} to ${req.body.status}`
            const history = await History.create({
                title: beforeFood.name,
                description,
                updatedBy : user.username
            })

            res.status(200).json({message : "sucessfuly edit status"})
            
        } catch (err) {
            
        }
    }

    static async deleteFood(req, res, next){
        try{
            const food= await Food.findByPk(req.params.id)
            
            await Food.destroy({where:{
                id:req.params.id}
            })

            res.status(200).json({
                message : `${food.name} success to delete`
            })

        }

        catch(err){
            next(err)
            
        }
    }
    

    static async deleteCategory(req, res, next){
        try{
    
            const category= await Category.findByPk(req.params.id)
            if (!category){
                throw {name : 'NotFound'}
            }
            await Category.destroy({where:{
                id:req.params.id}
            })
            // console.log(category);

            res.status(200).json({
                message : `${category.name} success to delete`
            })

        }

        catch(err){
            // console.log(err);
            next(err)
            
        }
    }
    static async showCategories(req, res, next){
        try{
            const food= await Category.findAll()
            if(!food){
                throw {name : 'NotFound'}
            }
            res.status(200).json(food)
        }

        catch(err){
            // console.log(err);
            next(err)
            // res.status(404).json({
            //     message: 'Error not Found'
            // })
        }
    }

    //khusus REGISTER ADMIN
    static async registerNewUser(req, res, next){
        try {
            const {username, email, password, phoneNumber, address}= req.body
            const userCreated = await User.create ({
                username, email, password, phoneNumber, address
            })
            res.status(201).json({message : {id : userCreated.id, email } })
          
        } catch (err) {
            next(err)
            
        }
    }

    static async login(req, res, next){
        try {
            const {email, password} = req.body
            if(!email || !password){
                throw {name : 'Email or Password required'}
            }
            const user = await User.findOne({where: {email}})
            // console.log(user);
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

            res.status(200).json({access_token, email, role: user.role, id : user.id})
        } catch (err) {
            // console.log(err);
            next(err)
          
        }
    }

    static async checkLogin(req, res, next){
        // console.log(req.user);
        try {
            const user = await User.findOne({
                where : {
                    id: req.user.id
                }, attributes : ['username', 'email', 'address', 'role']
            })
            //pake attributes
            // console.log(user);
            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
       
    }

    static async loginGoogle(req, res, next){

        try {
            const client = new OAuth2Client(CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: req.headers.token,
                audience: CLIENT_ID, 
            });
            const payload = ticket.getPayload()
            // console.log(payload);

            const [user, created] = await User.findOrCreate({
                where: { email: payload.email},
                defaults: {
                  username: payload.name, 
                  email : payload.email,
                  password: 'generalPassword',
                  role: 'Staff'
                },
                hooks: false
            })

            const access_token= createToken({
                id: user.id,
                email: user.email,
                username: user.username
            })
            res.status(201).json({access_token, email: payload.email, role: 'Staff', id: user.id})

          
      
        } catch (err) {
            next(err);
            
        }

       

    }

}

module.exports = Controller