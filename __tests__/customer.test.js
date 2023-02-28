const { it, expect, beforeAll } = require("@jest/globals");
const request = require("supertest");
const models = require('../models')
const db = require ('../models')
const queryInterface = db.sequelize.getQueryInterface()
const {User} = require('../models')

const app = require('../app')

beforeAll(async function(){
    await queryInterface.bulkDelete('Users', null, {
        truncate: true, 
        restartIdentity:true,
        cascade: true
    })

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
        console.log(response.body, ">>>>>>>>>>");
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

        console.log(response.body, ">>>>>>>>>>");
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

        console.log(response.body, ">>>>>>>>>>");
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
        console.log(response.body, ">>>>>>>>>>");
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
        console.log(response.body, ">>>>>>>>>>");
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
        console.log(response.body, ">>>>>>>>>>");
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
        console.log(response.body, ">>>>>>>>>>");
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toEqual("input must be email format")
     
     
    }) 

})