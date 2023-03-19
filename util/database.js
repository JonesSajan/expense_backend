const mongoose = require('mongoose')

const mongoConnect = ()=>{
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to database!')
      return;
    })
    .catch((error) => {
      console.error('Error connecting to database:', error);
      return;
    });
}

exports.mongoConnect =mongoConnect


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('expense', 'root', 'password', {
//   dialect: 'mysql',
//   host: 'localhost'
// });

// module.exports = sequelize;


