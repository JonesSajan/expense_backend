const User =require('../models/user')

exports.getUsers=(req,res,next)=>{
    User.findAll().then((result)=>res.status(200).json(result)).catch((err)=>{res.status(500).json([])})
}

exports.setUser=(req,res,next)=>{
    // console.log("add user called")
    // console.log(req.body);
    const name=req.body.name;
    const email=req.body.email
    const password=req.body.password
    User.create({
        name:name,
        email:email,
        password:password
    }).then((result)=>
    {res.status(200).json(result)
        console.log(result)
    return res}).catch((err)=>{
        err.errors[0].type==='unique violation'?res.status(200).json(err.errors[0].type):res.status(500).json(err)
        console.log(err)})
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
        result[0].dataValues.password==password?res.status(200).json("Login Successfull"):res.status(200).json("incorrect password");
      }
      
    } catch (err) {
      console.log(err);
      res.status(200).json("User don't exist")
    }
  };


