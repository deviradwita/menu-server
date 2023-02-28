const { hash } = require("../helpers/bcrypt");
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
}

module.exports = PublicController;
