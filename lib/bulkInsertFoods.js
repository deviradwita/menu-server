const {Food, Category, Bookmark, User} = require('../models')
const db = require('../models')
const queryInterface= db.sequelize.getQueryInterface()


async function bulkInsertFoods(){
    // try {
        //delete categories
        await queryInterface.bulkDelete('Users', null, {
            truncate: true, 
            restartIdentity:true,
            cascade: true
        })

        let dataUser = 
        [
            {
                "username": "choco123",
                "email" : "cocolate@mail.com", 
                "password" : "hereChocolate",
                "role" : "Customer", 
                "phoneNumber": "081234567",
                "address" : "Bekasi"
            },
            {
                "username": "pika007",
                "email" : "pikachu@mail.com", 
                "password" : "pikapika",
                "role" : "Customer", 
                "phoneNumber": "081332123",
                "address" : "Jakarta"
            }
        
        ]

        await User.bulkCreate(dataUser)

        await queryInterface.bulkDelete('Categories', null, {
            truncate: true, 
            restartIdentity:true,
            cascade: true
        })

        //ADD categories
        let dataCategories= [
            {
                "name": "Western Food"
            },
            {
                "name": "Chinese Food"
            }, 
            {
                "name": "Indonesian Food"
            },
            {
                "name": "Indian Food"
            }
        
        ]

        await Category.bulkCreate(dataCategories)

        //delete foods
        await queryInterface.bulkDelete('Food', null, {
            truncate: true, 
            restartIdentity:true,
            cascade: true
        })
    
        //add foods
        let data = [
            {
                "name": "burger",
                "description": "burger",
                "price": 25000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 1
            },
            {
                "name": "samyang",
                "description": "samyang",
                "price": 20000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 2
        
            }, 
            {
                "name": "tomyang",
                "description": "tomyang",
                "price": 20000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 1
        
            },
            {
                "name": "sushi",
                "description": "sushi",
                "price": 20000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 2
        
            },
            {
                "name": "steak",
                "description": "steak",
                "price": 20000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 1
        
            },
            {
                "name": "nori",
                "description": "nori",
                "price": 20000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 2
        
            },
            {
                "name": "ayam pop",
                "description": "ayam",
                "price": 20000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 3
        
            },
            {
                "name": "kfc",
                "description": "kfc",
                "price": 20000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 3
        
            },
            {
                "name": "mcd",
                "description": "mcd",
                "price": 20000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 3
        
            },
            {
                "name": "pizza",
                "description": "pizza",
                "price": 20000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 1
        
            },
            {
                "name": "ramen",
                "description": "ramen",
                "price": 20000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 1
        
            },
            {
                "name": "burger1",
                "description": "burger",
                "price": 25000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 1
            },
            {
                "name": "samyang1",
                "description": "samyang",
                "price": 20000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 2
        
            }, 
            {
                "name": "tomyang1",
                "description": "tomyang",
                "price": 20000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 1
        
            },
            {
                "name": "sushi1",
                "description": "sushi",
                "price": 20000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 2
        
            },
            {
                "name": "steak1",
                "description": "steak",
                "price": 20000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 1
        
            },
            {
                "name": "nori1",
                "description": "nori",
                "price": 20000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 2
        
            },
            {
                "name": "ayam pop1",
                "description": "ayam",
                "price": 20000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 3
        
            },
            {
                "name": "kfc1",
                "description": "kfc",
                "price": 20000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 3
        
            },
            {
                "name": "mcd1",
                "description": "mcd",
                "price": 20000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 3
        
            },
            {
                "name": "pizza1",
                "description": "pizza1",
                "price": 20000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 1
        
            },
            {
                "name": "ramen1",
                "description": "ramen",
                "price": 20000,
                "imgUrl": "https://tinyurl.com/27p8pv7w",
                "categoryId": 1
        
            }
        
        ]
        // const dataToInsert = data.map(el=>{
        //     return {
        //         ...el,
        //         // updatedAt: new Date(),
        //         // createdAt: new Date()
        //     }
        // })
        await Food.bulkCreate(data)

        await queryInterface.bulkDelete('Bookmarks', null, {
            truncate: true, 
            restartIdentity:true,
            cascade: true
        })

        let dataBookmark= [
            {
                UserId: 1,
                FoodId: 2
            },
            {
                UserId: 1,
                FoodId: 3
            }
        ]

        await Bookmark.bulkCreate(dataBookmark)
        
    // } catch (error) {
    //     console.log(error, "---------eroor")
    // }
}

module.exports= bulkInsertFoods