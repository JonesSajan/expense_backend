const Expense = require("../models/expense");
const sequelize =require('../util/database')

exports.getExpenses = async (req, res, next) => {
  try {
    result = await Expense.findAll({where:{userid:req.user.id}});
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json([]);
  }
};

exports.getExpenseById = async (req, res, next) => {
    try {
        console.log("GET BY ID CALLED");
        id = req.body.id;
      result = await Expense.findAll({ where: { id: id } });
      console.log(result)
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json([]);
    }
  };
  

exports.setExpense = async (req, res, next) => {
  const t = await sequelize.transaction()

  try {
    const expense_amount = req.body.expense_amount;
    const description = req.body.description;
    const category = req.body.category;
    const userid=req.user.id


    result = await Expense.create({
      expense_amount: expense_amount,
      description: description,
      category: category,
      userId:userid
    },{transaction:t});


    const total_amount =parseInt(req.user.total_amount) + parseInt(req.body.expense_amount)
    result2 = await req.user.update({total_amount:total_amount},{where:{id:req.user.id},transaction:t})
    result2? await t.commit(): await t.rollback()
    res.status(200).json(result);
    console.log(result);
    return res;
  } catch (err) {
    console.log(err); 
    await t.rollback()
    res.status(500).json([]);
  }
};

exports.deleteExpense = async (req, res, next) => {
  const t = await sequelize.transaction()

  try {
    console.log("DELETE CALLED");


    console.log(req.body);
    id = req.body.id;
    console.log(id);
    const expense_amount= await Expense.findAll({attributes:['expense_amount'], where: { id: id ,userId:req.user.id},transaction:t })
    console.log("///////////////////////////////////////////////////",expense_amount[0].dataValues.expense_amount,req.user.total_amount)
    
    const total_amount =  parseInt(req.user.total_amount) -   parseInt(expense_amount[0].dataValues.expense_amount)
    console.log("*********************************************************",total_amount)
    result = await Expense.destroy({ where: { id: id ,userId:req.user.id},transaction:t });


    result2 = await req.user.update({total_amount:total_amount},{where:{id:req.user.id},transaction:t})

    result2? await t.commit(): await t.rollback()



    res.status(200).json(result);
    console.log("DESTROYED Expense");
  } catch (err) {
    await t.rollback()
    res.status(500).json([]);
  }
};


