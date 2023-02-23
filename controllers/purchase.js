const razorpay = require('razorpay');
const Order = require('../models/order')
const jwt=require('jsonwebtoken')

const generateToken=(id,name,ispremium)=>{
    return jwt.sign({id:id,name:name,ispremium:ispremium},'8770903047')
}

exports.premium = async(req,res)=>{
    try{
        var rzp = new razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })

        const amount = 5000;

        rzp.orders.create({amount,currency:"INR"},async (err,order)=>{
            if(err){
                console.log(err)
            }

             req.user.createOrder({orderid:order.id,status:"Pending"})
            return res.status(201).json({order,key_id:rzp.key_id})
        })
    }catch(err){
        console.log(err);
    }
}


exports.updateTransaction = async(req,res)=>{
    try{
        const userId = req.user.id;
        const { payment_id, order_id} = req.body;
        const order = await Order.findOne({where:{orderid:order_id}})
        const p1= order.update({paymentid: payment_id, status:"Success"})
        const p2= req.user.update({ispremiumuser: true})
        Promise.all([p1,p2]).then(()=>{
            console.log("///////////////////////////////////////////////////////",req.user)
        return res.status(202).json({success:true,message:"transaction successfull",token:generateToken(req.user.id,req.user.name,req.user.ispremiumuser)});
   }).catch((error ) => {
            throw new Error(error)
        })               
           
        
    }catch(err){console.log(err)}
}