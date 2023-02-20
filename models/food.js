'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Food.belongsTo(models.User, {foreignKey: 'authorId'})
      Food.belongsTo(models.Category, {foreignKey: 'categoryId'})
    }
  }
  Food.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty:{
          msg: `Name is Required.`
        },
        notNull: {
          msg: `Name is Required.`
        }
      } 
     },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty:{
          msg: `Description is Required.`
        },
        notNull: {
          msg: `Description is Required.`
        }
      } 
     },
    price:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate :{
        notEmpty:{
          msg: `Price is Required.`
        },
        notNull: {
          msg: `Price is Required.`
        },
        min: {
          args: 10000,
          msg: "Minumum price is Rp.10.000"
        }
        
      } , 
      
     },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty:{
          msg: `ImgUrl is Required.`
        },
        notNull: {
          msg: `ImgUrl is Required.`
        }
      } 
     },
    authorId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Food',
  });

 
  Food.beforeCreate((Food, options)=>{
    Food.status = "Active"
  })
  return Food;
};