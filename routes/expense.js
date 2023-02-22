const express = require('express');
const expenseController = require('../controllers/expense')
const auth =require('../middleware/auth')

const router = express.Router();

router.get('/expenses',auth.authenticate,expenseController.getExpenses)
router.post('/expensebyid',expenseController.getExpenseById)
router.post('/addexpense',auth.authenticate,expenseController.setExpense)
router.post('/deleteexpense',auth.authenticate,expenseController.deleteExpense)


module.exports =router