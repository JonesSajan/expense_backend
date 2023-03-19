const path = require('path');
const cors = require('cors')
const dotenv = require('dotenv');
const helmet = require('helmet')
const morgan = require('morgan')
const fs = require('fs')
const mongoConnect = require("./util/database").mongoConnect



const express = require('express');
const bodyParser = require('body-parser');


const app = express();
dotenv.config();

const expenseRoutes = require('./routes/expense');
const userRoutes = require('./routes/user');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium')
const resetPasswordRoutes = require('./routes/resetpassword')
const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
app.use(helmet())
app.use(morgan('combined',{stream:accessLogStream}))



app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors( {
  origin: '*' 
}));
mongoConnect();


app.use('/expense', expenseRoutes);
app.use('/user', userRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);
app.use('/password', resetPasswordRoutes);


var port = process.env.PORT || 3000;


  app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});

