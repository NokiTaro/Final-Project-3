'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product, {
        foreignKey: "CategoryId"})
    }
  }
  Category.init({
    type: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          message: "Field type tidak boleh kosong"
        }
      }
    },
    sold_product_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notEmpty: {
          args: true,
          message: "Field type tidak boleh kosong"
        }
      },
      isInt: {
        args: true,
        message: "Field sold product amount harus bertipe data integer atau number.",
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
    hooks: {
      beforeCreate: (category) => {
        if (category.balance === undefined || category.balance === null) {
          category.balance = 0;
        }
      }
    }
  });
  return Category;
};