const { it, expect, beforeAll } = require("@jest/globals");
const request = require("supertest");
const models = require('../models')
const db = require ('../models')
const queryInterface = db.sequelize.getQueryInterface()
const {User} = require('../models')
const bulkInsertFoods= require('../lib/bulkInsertFoods')

const app = require('../app');
const { createToken } = require("../helpers/jwt");

let access_token;
beforeAll(async function(){
    await queryInterface.bulkDelete('Users', null, {
        truncate: true, 
        restartIdentity:true,
        cascade: true
    })
    // await queryInterface.bulkDelete('Bookmarks', null, {
    //     truncate: true, 
    //     restartIdentity:true,
    //     cascade: true
    // })

    await bulkInsertFoods()

    const user = await User.create({
        username : "jiso",
        email : "jiso@mail.com",
        password : "12345",
        phoneNumber : "21712", 
        address : "Jakarta"
    })

    access_token = createToken({id: user.id})



})

afterAll(async function(){
    models.sequelize.close()
})

describe('POST /public/register', function(){

    it("should send a response with 201 status code and the data type is object when register is success", async function (){
        const response = await request(app)
        .post('/public/register')
        .send({
            username : "lisa",
            email : "lalisa@mail.com",
            password : "12345",
            phoneNumber : "21712", 
            address : "Jakarta"
        })
        // console.log(response.body, ">>>>>>>>>> ini error");
        expect(response.status).toBe(201)
        expect(typeof response.body).toEqual('object')
       
       
        
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toHaveProperty('id')
        expect(response.body.message).toHaveProperty('email')
        expect(typeof response.body.message.id).toEqual('number')
        expect(typeof response.body.message.email).toEqual('string')
      
    })  


    it("should send a response with 400 status code when there's no email", async function (){
        const response = await request(app)
        .post('/public/register')
        .send({
            username : "lisa",
            // email : "lalisa@mail.com",
            password : "12345",
            phoneNumber : "21712", 
            address : "Jakarta",
        })

        // console.log(response.body, ">>>>>>>>>>");
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual({message: "Email is Required."})
     
    })  

    it("should send a response with 400 status code when there's no password", async function (){
        const response = await request(app)
        .post('/public/register')
        .send({
            username : "lisa",
            email : "lalisa@mail.com",
            // password : "12345",
            phoneNumber : "21712", 
            address : "Jakarta",
        })

        // console.log(response.body, ">>>>>>>>>>");
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual({message: "Password is Required."})
     
    })  

    it("should send a response with 400 status code when email already been used", async function (){
        const response = await request(app)
        .post('/public/register')
        .send({
            username : "lisa",
            email : "lalisa@mail.com",
            password : "12345",
            phoneNumber : "21712", 
            address : "Jakarta"
        })
        // console.log(response.body, ">>>>>>>>>>");
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toEqual("Email already been used.")
     
     
    }) 

    it("should send a response with 400 status code when email is empty string ", async function (){
        const response = await request(app)
        .post('/public/register')
        .send({
            username : "lisa",
            email : " ",
            password : "12345",
            phoneNumber : "21712", 
            address : "Jakarta"
        })
        // console.log(response.body, ">>>>>>>>>>");
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toEqual("Email cannot be empty string.")
     
     
    }) 

    it("should send a response with 400 status code when password is empty string ", async function (){
        const response = await request(app)
        .post('/public/register')
        .send({
            username : "lisa",
            email : "lalisa@mail.com",
            password : " ",
            phoneNumber : "21712", 
            address : "Jakarta"
        })
        // console.log(response.body, ">>>>>>>>>>");
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toEqual("Password cannot be empty string.")
     
     
    }) 

    it("should send a response with 400 status code when not using email formar", async function (){
        const response = await request(app)
        .post('/public/register')
        .send({
            username : "lisa",
            email : "lalisa@com",
            password : "12345",
            phoneNumber : "21712", 
            address : "Jakarta"
        })
        // console.log(response.body, ">>>>>>>>>>");
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toEqual("input must be email format")
     
     
    }) 

})

describe('POST /public/login', function(){

    it("should send a response with 200 status code and the data type is object when login is success", async function (){
        const response = await request(app)
        .post('/public/login')
        .send({
            email : "lalisa@mail.com",
            password : "12345"
        })
        // console.log(response.body.access_token, ">>>>>>>>>>");
        expect(response.status).toBe(200)
        expect(typeof response.body).toEqual('object')
       
       
        
        expect(response.body).toHaveProperty('access_token')
        expect(typeof response.body.access_token).toEqual('string')
      
    })
    
    it("should send a response with 401 status code when password is wrong", async function (){
        const response = await request(app)
        .post('/public/login')
        .send({
            email : "lalisa@mail.com",
            password : "123"
        })
        console.log(response.body, ">>>>>>>>>>");
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toEqual("Wrong Email or Password")
  
       
    
      
    })  


    it("should send a response with 401 status code when email not found", async function (){
        const response = await request(app)
        .post('/public/login')
        .send({
            email : "jennie@mail.com",
            password : "12345"
        })
        console.log(response.body, ">>>>>>>>>>");
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toEqual("Wrong Email or Password")
  
       
    
      
    })  



  


})

describe('GET /public/foods', function(){

    it("should send a response with 200 status code and the data type is array", async function (){
        const response = await request(app)
        .get('/public/foods')

        // console.log(response, ">>>>>>>>>>");
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toEqual(true)
        expect(response.body[0]).toHaveProperty("name")
        expect(response.body[0]).toHaveProperty("description")
        expect(response.body[0]).toHaveProperty("price")
        expect(response.body[0]).toHaveProperty("categoryId")
        expect(response.body[0].name).toEqual("burger")
        expect(response.body[0].description).toEqual("burger")
        expect(response.body[0].price).toEqual(25000)

    })

    it("should send a response with 200 status code when using filter", async function (){
        const response = await request(app)
        .get('/public/foods?filter=2')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toEqual(true)
        expect(response.body[0]).toHaveProperty("categoryId")
        expect(response.body[0].categoryId).toEqual(2)
      

    })

    it("should send a response with 200 status code when using pagination", async function (){
        const response = await request(app)
        .get('/public/foods?page[size]=3&page[number]=1')
        // console.log(response, ">>>>>>");
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toEqual(true)
        expect(response.body.length).toEqual(3)
      

    })

    it("should send a response with 200 status code when accessing food by id", async function (){
        const response = await request(app)
        .get('/public/foods/1')
        expect(response.status).toBe(200)
        expect(typeof response.body).toEqual('object')
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("description")
        expect(response.body).toHaveProperty("price")
        expect(response.body.name).toEqual("burger")
        expect(response.body.description).toEqual("burger")
        expect(response.body.price).toEqual(25000)
      

    })

    it("should send a response with 404 status code when failed accessing food by id", async function (){
        const response = await request(app)
        .get('/public/foods/100')
        expect(response.status).toBe(404)
        // console.log(response, ">>>>>>>>>");
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toEqual("Resource Not Found")
     

      

    })

    
   

    describe('POST /public/bookmarks/1', function(){

        it("should send a response with 201 status code and the data type is object when bookmark success", async function (){
            const response = await request(app)
            .post('/public/bookmarks/1')
            .send({
                FoodId : 1
            })
            .set('access_token', access_token)
            console.log(response.body, "ini add book>>>>>>>>>>");
            expect(response.status).toBe(201)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty("UserId")
            expect(response.body).toHaveProperty("FoodId")
            expect(response.body.FoodId).toEqual(1)
           
           
          
        })

        it("should send a response with 404 status code and the data type is object when food id not found", async function (){
            const response = await request(app)
            .post('/public/bookmarks/100')
            .send({
                FoodId : 100
            })
            .set('access_token', access_token)
            console.log(response.body, "ini add book>>>>>>>>>>");
            expect(response.status).toBe(404)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toEqual("Resource Not Found")
           
           
          
        })
       
      
    
    
    })

    describe('GET /public/bookmarks', function(){

        it("should send a response with 200 status code and the data type is object when fetch bookmark", async function (){
            const response = await request(app)
            .get('/public/bookmarks')
            // .send({
            //     UserId : 1,
            //     FoodId : 1
            // })
            .set('access_token', access_token)
            // console.log(response.body, "ini get book>>>>>>>>>>");
            expect(response.status).toBe(200)
            expect(Array.isArray(response.body)).toEqual(true)
            expect(response.body[0]).toHaveProperty("FoodId")
            expect(response.body[0].FoodId).toEqual(1)
           
           
          
        })

        it("should send a response with 401 when user not login when fetch bookmark", async function (){
            const response = await request(app)
            .get('/public/bookmarks')
            // .send({
            //     UserId : 1,
            //     FoodId : 1
            // })
            // .set('access_token', access_token)
            // console.log(response.body, "ini get book2>>>>>>>>>>");
            expect(response.status).toBe(401)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toEqual("Invalid Token")
           
           
          
        })

        it("should send a response with 401 when access token not valid when fetch bookmark", async function (){
            const response = await request(app)
            .get('/public/bookmarks')
            .set('access_token', 'hahahah')
            // console.log(response.body, "ini get book2>>>>>>>>>>");
            expect(response.status).toBe(401)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toEqual("Invalid Token")
           
           
          
        })
       
      
    
    
    })
    


   


  


})