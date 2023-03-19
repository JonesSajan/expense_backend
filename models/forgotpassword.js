const {Schema,model}= require("mongoose");

const Forgotpassword = new Schema({
  active: { type: Boolean },
  expiresby: { type: Date },
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  });

exports.Forgotpassword=model("Forgotpassword",Forgotpassword);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// //id, name , password, phone number, role

// const Forgotpassword = sequelize.define('forgotpassword', {
//     id: {
//         type: Sequelize.UUID,
//         allowNull: false,
//         primaryKey: true
//     },
//     active: Sequelize.BOOLEAN,
//     expiresby: Sequelize.DATE
// })

// module.exports = Forgotpassword;