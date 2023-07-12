const { hash, compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { Op } = require("sequelize");
const { Food, User, Category, History, Bookmark} = require("../models");
const {OAuth2Client} = require('google-auth-library');
const  CLIENT_ID = process.env.CLIENT_ID
const  ACCESS_TOKEN = process.env.ACCESS_TOKEN
const axios = require('axios')


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
      // console.log(email, password, ">>>>>>>>>>>");
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
      // console.log(err, "errooor");
      next(err);
    }
  }

  static async fetchFoods(req, res, next) {
    try {
      console.log(req.query);
      const getPagingData = (data, page, limit) => {
        const { count: totalItems, rows: listFoods } = data;
        const currentPage = page ? +page : 1;
        const totalPages = Math.ceil(totalItems / limit);
      
        return { totalItems, totalPages, currentPage, listFoods  };
      };
      // const { filter, page, size, search } = req.query;
      const filter = req.query.filter
      const page = req.query.page
      const size = req.query.size
      const search = req.query.search
      
      let limit =8
      let offset= 0

      let option = {
        where : {
          status : "Active"
        },
        include: {
          model: User,
          attributes: ["id", "username", "email"], 
        }
      };

      // console.log( filter, ">>>>>> filter");
      // console.log(search, "ini search");
      if (filter) {
        // console.log("masuk filter");
        option.where = {
          // TagId: sort
          status : "Active",
          categoryId: { [Op.eq]: filter },
          // [Op.eq] : sort
        };
      }
      if (search) {
       
        option.where = {
          status : "Active",
          name : {[Op.iLike]: `%${search}%`}
        }
        // console.log(option,"masuk search");
      }

     
      // console.log(page);
      // console.log(option, ">>>>>>>>>");

    //  if (page) {
      // pagination
      if (page !== "" && typeof page !== "undefined") {
          offset = page * limit - limit;
          console.log(page, offset, "ini offset");
          option.offset = offset;
      } 
      if(size !== "" && typeof size !== "undefined"){
          limit = size;
          option.limit = limit;
      } else {
        // console.log("masuk else page");
        // limit = 6; // limit 6 item
        // offset = 0;
        // console.log(limit, "limit query else");
        option.limit = limit;
        option.offset = offset;
      }

    //  }

    
       console.log(">>>>>>",option, ">>>>>>>>>");
      // // console.log("masuk food public");
      const food = await Food.findAndCountAll(option);
      const response = getPagingData(food, page, 8)
      // console.log(response.listFoods.length);
      if (response.listFoods.length ===0) {
        throw {name : 'NotFound'}
      }
    
     
      // console.log(food);
      res.status(200).json(response);
    } catch (error) {
      console.log(error, "errror");
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
    const checkBookmark = await Bookmark.findOne({
      where: {
        [Op.and]: [
          { FoodId },
          { UserId }
        ]
      }
    })
    console.log(checkBookmark, "cheeek");
    if (checkBookmark) {
      throw {name : 'alreadyBook'}
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
      include : Food,
      where : {
        UserId
      }
    })
    res.status(200).json(bookmark)
    
  } catch (error) {
    // console.log(error);
    next(error)
  }
}

static async fetchCategories(req, res, next){
  try{
      const category= await Category.findAll()
      if(!category){
          throw {name : 'NotFound'}
      }
      res.status(200).json(category)
  }

  catch(err){
      // console.log(err);
      next(err)
      // res.status(404).json({
      //     message: 'Error not Found'
      // })
  }
}

static async getQrCode(req, res, next){
  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.qr-code-generator.com/v1/create?access-token=${ACCESS_TOKEN}
      `,
      data : {
        "frame_name": "no-frame",
        "qr_code_text": `https://midnight-cafe-f4013.web.app/foods/${req.params.id}`,
        "image_format": "SVG",
        "qr_code_logo": "scan-me-square"
    }
    })

    // console.log(data, "data qr");
    // res.status(200).json(data)
    res.send(data)
  } catch (error) {
    // console.log(error);
    next(error)
    
  }
}

}



module.exports = PublicController;
