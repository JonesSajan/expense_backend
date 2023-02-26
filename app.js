const path = require('path');
const cors = require('cors')
const dotenv = require('dotenv');
const Expense = require("./models/expense");
const User = require("./models/user");
const Order =require('./models/order')
const Forgotpassword = require('./models/forgotpassword');


const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const app = express();
dotenv.config();

const expenseRoutes = require('./routes/expense');
const userRoutes = require('./routes/user');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium')
const resetPasswordRoutes = require('./routes/resetpassword')


app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors( {
  origin: '*' 
}));

app.use('/expense', expenseRoutes);
app.use('/user', userRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);
app.use('/password', resetPasswordRoutes);


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);


sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

