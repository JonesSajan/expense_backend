const {Schema,model}= require("mongoose");

const Expense = new Schema({
  expense_amount: { type: String, required:true },
  description: { type: String, required:true },
  category: { type: String, required:true  },
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  });

exports.Expense=model("Expenses",Expense);



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");

// const expense = sequelize.define('expense', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   expense_amount: { type: Sequelize.STRING, allowNull: false },
//   description: { type: Sequelize.STRING, allowNull: false },
//   category: { type: Sequelize.STRING, allowNull: false },

// });

// module.exports=expense;
