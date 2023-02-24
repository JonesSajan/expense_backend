const Expense = require("../models/expense");
const User =require('../models/user')
const sequelize = require("../util/database");


exports.getLeaderboard = async (req, res, next) => {
    try {
      const result = await User.findAll()
      console.log("//////////////////////////////////////////",result)
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json([]);
    }
  };
  
