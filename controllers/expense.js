const Expense =require('../models/expense')

exports.getExpenses=(req,res,next)=>{
    Expense.findAll().then((result)=>res.status(200).json(result)).catch((err)=>{res.status(500).json([])})
}

exports.setExpense=(req,res,next)=>{
    console.log(req.body);
    const expense_amount=req.body.expense_amount;
    const description=req.body.description
    const category=req.body.category
    Expense.create({
        expense_amount:expense_amount,
        description:description,
        category:category
    }).then((result)=>
    {res.status(200).json(result)
        console.log(result)
    return res}).catch((err)=>{
        res.status(500).json([])
        console.log(err)})
}

exports.deleteExpense=(req,res,next)=>{
    console.log('DELETE CALLED')
    
    console.log(req.body)
    id=req.body.id;
    console.log(id)
    Expense.destroy({where:{id:id}}).then(result => {
        res.status(200).json(result)
        console.log('DESTROYED Expense');
      }).catch((err)=>{res.status(500).json([])})


    
}