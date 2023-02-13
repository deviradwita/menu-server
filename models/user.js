'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Food, {foreignKey: 'authorId'})
    }
  }
  User.init({
    username: DataTypes.STRING,
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate :{
        notEmpty:{
          msg: `Email is Required.`
        },
        notNull: {
          msg: `Email is Required.`
        },
        isEmail: true
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
          args: [5, 15],
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
  return User;
};