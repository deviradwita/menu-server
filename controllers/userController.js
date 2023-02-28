const { hash, compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { Food, User, Category, History } = require("../models");


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
        },
        // { hooks: false }
      );
    //   console.log(customerCreated);
      res.status(201).json({ message: { id: customerCreated.id, email } });
    } catch (err) {
      next(err);
    }
  }


  static async loginCustomer(req, res, next){
    try {
        const {email, password} = req.body
        console.log(email,password, ">>>>>>>>>>>");
        if(!email || !password){
            throw {name : 'Email or Password required'}
        }
        const user = await User.findOne({where: {email}})
        // console.log(user);
        if (!user){
            throw {name : 'Invalid Credential'}
        }

        const comparedPassword= compare(password, user.password)
        // console.log(comparedPassword);
        
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
        next(err)
      
    }
}
}

module.exports = PublicController;
