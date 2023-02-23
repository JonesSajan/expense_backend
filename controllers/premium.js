const Expense = require("../models/expense");
const User =require('../models/user')
const sequelize = require("../util/database");


exports.getLeaderboard = async (req, res, next) => {
    try {
      result = await sequelize.query('SELECT sum(expense_amount)  as total_amount,name FROM expenses inner join users on expenses.userId=users.id group by userid;');
      console.log(result)
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json([]);
    }
  };
  
