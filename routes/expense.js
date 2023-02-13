const express = require('express');
const expenseController = require('../controllers/expense')

const router = express.Router();

router.get('/expenses',expenseController.getExpenses)
router.post('/expensebyid',expenseController.getExpenseById)
router.post('/addexpense',expenseController.setExpense)
router.post('/deleteexpense',expenseController.deleteExpense)


module.exports =router