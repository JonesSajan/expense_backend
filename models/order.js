const {Schema,model}= require("mongoose");

const Order = new Schema({
  paymentid: { type: String },
  orderid: { type: String },
  status: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  });

exports.Order=model("Order",Order);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");

// const order = sequelize.define('order', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   paymentid: { type: Sequelize.STRING},
//   orderid: { type: Sequelize.STRING },
//   status: { type: Sequelize.STRING },

// });

// module.exports=order;
