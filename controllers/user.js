const User =require('../models/user')
const bcrypt=require('bcrypt')
const saltrounds=10;
const jwt=require('jsonwebtoken')

const generateToken=(id,name,ispremium)=>{
    return jwt.sign({id:id,name:name,ispremium:ispremium},'8770903047')
}

exports.getUsers=(req,res,next)=>{
    User.findAll().then((result)=>res.status(200).json(result)).catch((err)=>{res.status(500).json([])})
}

exports.setUser=(req,res,next)=>{
    // console.log("add user called")
    // console.log(req.body);
    const name=req.body.name;
    const email=req.body.email
    const password=req.body.password
 bcrypt.hash(password,saltrounds,(err,hash)=>{

    User.create({
        name:name,
        email:email,
        password:hash
    }).then((result)=>
    {res.status(200).json(result)
        console.log(result)
    return res}).catch((err)=>{
        err.errors[0].type==='unique violation'?res.status(200).json(err.errors[0].type):res.status(500).json(err)
        console.log(err)})
    })

}

exports.deleteUser=(req,res,next)=>{
    console.log('DELETE CALLED')
    
    console.log(req.body)
    id=req.body.id;
    console.log(id)
    User.destroy({where:{id:id}}).then(result => {
        res.status(200).json(result)
        console.log('DESTROYED PRODUCT');
      }).catch((err)=>{res.status(500).json([])})


}

exports.loginUser = async (req, res, next) => {
    try {
        console.log("GET BY ID CALLED");
        email = req.body.email;
        password = req.body.password;
      result = await User.findAll({ where: { email: email } });

      console.log(result[0].dataValues.password)
      if(result){
       const response= await bcrypt.compare(password,result[0].dataValues.password) ;
    //    console.log(result[0].name);    
       response?res.status(200).json({msg:"Login Successfull",premium:result[0].ispremiumuser,token:generateToken(result[0].id,result[0].name,result[0].ispremium)}):res.status(401).json("incorrect password");
      }
      
    } catch (err) {
      console.log(err);
      res.status(404).send({msg:"User don't exist"})
    }
    

  };


