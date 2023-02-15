const path = require('path');
const cors = require('cors')
const Expense = require("./models/expense");
const User = require("./models/user");


const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const app = express();

const expenseRoutes = require('./routes/expense');
const userRoutes = require('./routes/user');


app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors( {
  origin: '*' 
}));

app.use('/expense', expenseRoutes);
app.use('/user', userRoutes);


User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

