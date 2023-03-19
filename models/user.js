const {Schema,model}= require("mongoose");

const User = new Schema({
  name: { type: String, required:true },
  email: { type: String, required:true,unique: true  },
  password: { type: String, required:true  },
  total_amount: {type: Number, required:true, default:0 },
  ispremiumuser:{type: Boolean, required:true , default:false}});

exports.User=model("users",User);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");

// const user = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   name: { type: Sequelize.String, allowNull: false },
//   email: { type: Sequelize.STRING, allowNull: false,unique: true },
//   password: { type: Sequelize.STRING, allowNull: false },
//   total_amount: { type: Sequelize.INTEGER,defaultValue:0 },
//   ispremiumuser:Sequelize.BOOLEAN
// });

// module.exports=user;