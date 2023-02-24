const Expense = require("../models/expense");

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
  try {
    console.log(req.body);
    const expense_amount = req.body.expense_amount;
    const description = req.body.description;
    const category = req.body.category;
    const userid=req.user.id
    console.log("inside setExpense",req.user.id)
    result = await Expense.create({
      expense_amount: expense_amount,
      description: description,
      category: category,
      userId:userid
    });
    console.log('////////////////////////////////////////////////',req.user.total_amount,"/////////////////////",req.body.expense_amount)
    const total_amount =parseInt(req.user.total_amount) + parseInt(req.body.expense_amount)
    console.log("*************************************",total_amount)
    await req.user.update({total_amount:total_amount},{where:{id:req.user.id}})
    res.status(200).json(result);
    console.log(result);
    return res;
  } catch (err) {
    res.status(500).json([]);
    console.log(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    console.log("DELETE CALLED");

    console.log(req.body);
    id = req.body.id;
    console.log(id);
    result = await Expense.destroy({ where: { id: id ,userId:req.user.id} });

    res.status(200).json(result);
    console.log("DESTROYED Expense");
  } catch (err) {
    res.status(500).json([]);
  }
};


