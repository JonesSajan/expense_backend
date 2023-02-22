const path = require('path');
const cors = require('cors')
const dotenv = require('dotenv');
const Expense = require("./models/expense");
const User = require("./models/user");
const Order =require('./models/order')


const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const app = express();
dotenv.config();

const expenseRoutes = require('./routes/expense');
const userRoutes = require('./routes/user');
const purchaseRoutes = require('./routes/purchase');


app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors( {
  origin: '*' 
}));

app.use('/expense', expenseRoutes);
app.use('/user', userRoutes);
app.use('/purchase', purchaseRoutes);


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

