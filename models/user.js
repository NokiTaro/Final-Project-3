'use strict';
const {
  Model
} = require('sequelize');
const {
  hashPassword
} =require("../utils/bcrypt")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          message: "Field full_name tidak boleh kosong"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          message: "Field email tidak boleh kosong"
        },
        isEmail: {
          message: "Email harus valid"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: "Field password tidak boleh kosong."
        },
        len: {
          args: [6, 10],
          message: "Panjang password harus antara 6 sampai 10 karakter."
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Field gender tidak boleh kosong."
        },
        isIn: {
          args: [["male", "female"]],
          message: "Field gender harus diisi dengan nilai male atau female"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: "Field role tidak boleh kosong."
        },
        isIn: {
          args: [["admin", "customer"]],
          message: "Field role harus diisi dengan nilai admin atau customer."
        }
      }
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
        validate: {
          notEmpty: {
            args: true,
            message: "Field balance tidak boleh kosong.",
          },
          isInt: {
            args: true,
            message: "Field balance harus bertipe data integer atau number.",
          },
          min: {
            args: [0],
            message: "Field balance tidak boleh kurang dari angka 0.",
          },
          max: {
            args: 100000000,
            message: "Field balance tidak boleh melebihi angka 10000000.",
          }
        }
      }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate: (user) => {

        if (user.balance === undefined || user.balance === null) {
          user.balance = 0;
        }
        const hashedPassword = hashPassword(user.password)
        user.password = hashedPassword
      }
    }
  });
  return User;
};