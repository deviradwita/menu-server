const { hash, compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { Op } = require("sequelize");
const { Food, User, Category, History, Bookmark} = require("../models");
const {OAuth2Client} = require('google-auth-library');
const  CLIENT_ID = process.env.CLIENT_ID


class PublicController {
  static async registerNewCustomer(req, res, next) {
    try {
      // console.log("MASUK REGISTER NEW CUST");
      const { username, email, password, phoneNumber, address } = req.body;
      const customerCreated = await User.create(
        {
          username,
          email,
          password,
          phoneNumber,
          address,
          role: "Customer",
        }
        // { hooks: false }
      );
      //   console.log(customerCreated);
      res.status(201).json({ message: { id: customerCreated.id, email } });
    } catch (err) {
      next(err);
    }
  }

  static async loginCustomer(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(email, password, ">>>>>>>>>>>");
      if (!email || !password) {
        throw { name: "Email or Password required" };
      }
      const user = await User.findOne({ where: { email } });
      // console.log(user);
      if (!user) {
        throw { name: "Invalid Credential" };
      }

      const comparedPassword = compare(password, user.password);
      // console.log(comparedPassword);

      if (!comparedPassword) {
        throw { name: "Invalid Credential" };
      }

      const payload = {
        id: user.id,
      };

      const access_token = createToken(payload);

      res.status(200).json({ access_token });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async fetchFoods(req, res, next) {
    try {
      const { filter, page } = req.query;
      let limit;
      let offset;

      let option = {
        include: {
          model: User,
          attributes: ["id", "username", "email"],
        },
      };

      // console.log(typeof filter, filter, ">>>>>>");
      if (filter) {
        option.where = {
          // TagId: sort
          categoryId: { [Op.eq]: filter },
          // [Op.eq] : sort
        };
      }
      // console.log(page);
      // console.log(option, ">>>>>>>>>");

     if (page) {
      // pagination
      if (page !== "" && typeof page !== "undefined") {
        if (page.size !== "" && typeof page.size !== "undefined") {
          limit = page.size;
          option.limit = limit;
        }

        if (page.number !== "" && typeof page.number !== "undefined") {
          offset = page.number * limit - limit;
          option.offset = offset;
        }
      } else {
        limit = 5; // limit 5 item
        offset = 0;
        option.limit = limit;
        option.offset = offset;
      }

     }
      //  console.log(option, ">>>>>>>>>");
      // // console.log("masuk food public");
      const food = await Food.findAll(option);
     
      // console.log(food);
      res.status(200).json(food);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async fetchFoodById(req, res, next) {
    try {
      const food = await Food.findByPk(req.params.id)
      
      if (!food){
        throw {name : 'NotFound'}
     }
  
     res.status(200).json(food);

    } catch (error) {
      next(error)
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
            // hooks: false
        })

        const access_token= createToken({
            id: user.id,
            email: user.email,
            username: user.username
        })
        res.status(201).json({access_token, email: payload.email, role: 'Staff', id: user.id})

      
  
    } catch (error) {
        next(error);
    }
}

static async addBookmark(req, res, next){
  try {
    let UserId = req.user.id
    let FoodId = req.params.foodId
    const food = await Food.findByPk(FoodId)
    if (!food) {
      throw {name : 'NotFound'}
    }
    const bookmark= await Bookmark.create({
      UserId, FoodId
    })
    // console.log({UserId, FoodId});
    res.status(201).json(bookmark)
    
  } catch (error) {
    // console.log(error);
    next(error)
  }
}

static async fetchBookmark(req, res, next){
  try {
    let UserId = req.user.id
    const bookmark= await Bookmark.findAll({
      where : {
        UserId
      }
    })
    res.status(200).json(bookmark)
    
  } catch (error) {
    console.log(error);
    next(error)
  }
}
}

module.exports = PublicController;
