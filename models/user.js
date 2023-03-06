'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Food, {foreignKey: 'authorId'})
      User.hasMany(models.Bookmark)

    }
  }
  User.init({
    username: DataTypes.STRING,
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
          msg: "Email already been used."
      },
      validate :{
        notEmpty:{
          msg: `Email is Required.`
        },
        notNull: {
          msg: `Email is Required.`
        },
        isEmail: {
          args: true,
          msg: "input must be email format"
        }
      } 
     },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty:{
          msg: `Password is Required.`
        },
        notNull: {
          msg: `Password is Required.`
        },  
        len: {
          args: [5, Infinity],
          msg: "Minimal Password is 5 Characters."
        }
        
      }
      
     },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeBulkCreate((user, options)=>{
    user.forEach(el=>{
      el.password = hash(el.password)
    })
  })

  User.beforeCreate((user, options)=>{
    user.password = hash(user.password)
  })
  

  
  // User.beforeCreate((user, options)=>{
  //   user.role = "Admin"
  // })
  return User;
};